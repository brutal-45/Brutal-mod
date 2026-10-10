/**
 * BrutalMod Voice Changer - core (pure, no DOM / Web Audio dependencies).
 *
 * Contains:
 *  - PitchShifter: real-time granular pitch shifter (two overlapping Hann-windowed
 *    read heads over a delay line). Runs inside an AudioWorklet and in Node tests.
 *  - Preset definitions and parameter normalisation.
 *
 * This file is loaded as a classic <script> in the renderer and via require() in tests.
 * PitchShifter must stay self-contained: its source text is copied into the worklet.
 */

class PitchShifter {
    /**
     * Phase-vocoder pitch shifter (STFT analysis/synthesis with phase locking).
     * Latency is fftSize samples (~21 ms at 48 kHz with the defaults), measured in tests.
     *
     * @param {number} sampleRate  Audio sample rate in Hz.
     * @param {number} fftSize     FFT frame size, power of two.
     * @param {number} osamp       Overlap factor (hop = fftSize / osamp).
     */
    constructor(sampleRate = 48000, fftSize = 1024, osamp = 4) {
        this.sampleRate = sampleRate;
        this.N = fftSize;
        this.osamp = osamp;
        this.H = fftSize / osamp;                 // hop size
        this.half = fftSize / 2;
        this.ratio = 1;                            // pitch ratio = 2^(semitones / 12)
        this.inLatency = fftSize - this.H;

        const N = this.N;
        this.window = new Float64Array(N);
        for (let k = 0; k < N; k++) this.window[k] = -0.5 * Math.cos((2 * Math.PI * k) / N) + 0.5;

        this.cosT = new Float64Array(N);
        this.sinT = new Float64Array(N);
        for (let k = 0; k < N; k++) {
            this.cosT[k] = Math.cos((2 * Math.PI * k) / N);
            this.sinT[k] = Math.sin((2 * Math.PI * k) / N);
        }

        this.inFifo = new Float64Array(N);
        this.outFifo = new Float64Array(N);
        this.outAccum = new Float64Array(N);
        this.re = new Float64Array(N);
        this.im = new Float64Array(N);
        this.lastPhase = new Float64Array(this.half + 1);
        this.sumPhase = new Float64Array(this.half + 1);
        this.anaMag = new Float64Array(this.half + 1);
        this.anaFreq = new Float64Array(this.half + 1);
        this.synMag = new Float64Array(this.half + 1);
        this.synFreq = new Float64Array(this.half + 1);
        this.rover = this.inLatency;
    }

    /** Set the pitch shift in semitones (clamped to +/-24). */
    setSemitones(semitones) {
        const st = Math.max(-24, Math.min(24, Number(semitones) || 0));
        this.ratio = Math.pow(2, st / 12);
    }

    /** In-place iterative radix-2 FFT on this.re / this.im. Inverse is unscaled. */
    fft(inverse) {
        const N = this.N, re = this.re, im = this.im, cosT = this.cosT, sinT = this.sinT;
        for (let i = 1, j = 0; i < N; i++) {
            let bit = N >> 1;
            for (; j & bit; bit >>= 1) j ^= bit;
            j ^= bit;
            if (i < j) {
                let t = re[i]; re[i] = re[j]; re[j] = t;
                t = im[i]; im[i] = im[j]; im[j] = t;
            }
        }
        for (let len = 2; len <= N; len <<= 1) {
            const half = len >> 1;
            const step = N / len;
            for (let i = 0; i < N; i += len) {
                for (let k = 0; k < half; k++) {
                    const wr = cosT[k * step];
                    const wi = inverse ? sinT[k * step] : -sinT[k * step];
                    const a = i + k, b = a + half;
                    const xr = re[b] * wr - im[b] * wi;
                    const xi = re[b] * wi + im[b] * wr;
                    re[b] = re[a] - xr; im[b] = im[a] - xi;
                    re[a] += xr; im[a] += xi;
                }
            }
        }
    }

    /** Analyse the current input frame, shift it, and overlap-add the result. */
    frame() {
        const N = this.N, H = this.H, half = this.half, osamp = this.osamp;
        const re = this.re, im = this.im, win = this.window;
        const freqPerBin = this.sampleRate / N;
        const expct = (2 * Math.PI * H) / N;

        for (let k = 0; k < N; k++) { re[k] = this.inFifo[k] * win[k]; im[k] = 0; }
        this.fft(false);

        for (let k = 0; k <= half; k++) {
            const amp = 2 * Math.hypot(re[k], im[k]);
            const phase = Math.atan2(im[k], re[k]);
            let tmp = phase - this.lastPhase[k];
            this.lastPhase[k] = phase;
            tmp -= k * expct;
            let qpd = Math.trunc(tmp / Math.PI);
            qpd = qpd >= 0 ? qpd + (qpd & 1) : qpd - (qpd & 1);
            tmp -= Math.PI * qpd;
            tmp = (osamp * tmp) / (2 * Math.PI);
            this.anaMag[k] = amp;
            this.anaFreq[k] = k * freqPerBin + tmp * freqPerBin;
        }

        this.synMag.fill(0);
        this.synFreq.fill(0);
        for (let k = 0; k <= half; k++) {
            const idx = Math.floor(k * this.ratio);
            if (idx <= half) {
                this.synMag[idx] += this.anaMag[k];
                this.synFreq[idx] = this.anaFreq[k] * this.ratio;
            }
        }

        for (let k = 0; k <= half; k++) {
            const amp = this.synMag[k];
            let tmp = this.synFreq[k];
            tmp -= k * freqPerBin;
            tmp /= freqPerBin;
            tmp = (2 * Math.PI * tmp) / osamp;
            tmp += k * expct;
            this.sumPhase[k] += tmp;
            const ph = this.sumPhase[k];
            re[k] = amp * Math.cos(ph);
            im[k] = amp * Math.sin(ph);
        }
        for (let k = 1; k < half; k++) {
            re[N - k] = re[k];
            im[N - k] = -im[k];
        }

        this.fft(true);

        // Normalise by the Hann analysis/synthesis overlap sum (0.375 * osamp) so unity gain is preserved.
        const scale = 1 / (half * 0.375 * osamp * osamp);
        for (let k = 0; k < N; k++) this.outAccum[k] += scale * win[k] * re[k];
        for (let k = 0; k < H; k++) this.outFifo[k] = this.outAccum[k];
        this.outAccum.copyWithin(0, H);
        this.outAccum.fill(0, N - H);
        this.inFifo.copyWithin(0, H);
    }

    /** Process one block. input and output are Float32Array of equal length (mono). */
    process(input, output) {
        const N = this.N, H = this.H, inLat = this.inLatency;
        for (let i = 0; i < input.length; i++) {
            this.inFifo[this.rover] = input[i];
            output[i] = this.outFifo[this.rover - inLat];
            this.rover++;
            if (this.rover >= N) {
                this.rover = inLat;
                this.frame();
            }
        }
    }
}

/** Parameter ranges used for validation and UI sliders. */
const VOICE_LIMITS = {
    semitones: { min: -12, max: 12, step: 1 },
    ring:      { min: 0, max: 100, step: 1 },     // percent
    ringHz:    { min: 20, max: 400, step: 1 },
    reverb:    { min: 0, max: 100, step: 1 },     // percent
    drive:     { min: 0, max: 100, step: 1 },     // percent
    mix:       { min: 0, max: 100, step: 1 },     // percent of processed voice
};

const DEFAULT_VOICE_PARAMS = Object.freeze({
    semitones: 0,
    ring: 0,
    ringHz: 50,
    reverb: 0,
    drive: 0,
    radio: false,
    mix: 100,
});

/** Built-in presets. Missing keys fall back to DEFAULT_VOICE_PARAMS. */
const VOICE_PRESETS = Object.freeze({
    natural:   { label: 'Natural', params: {} },
    deep:      { label: 'Deep Giant', params: { semitones: -5 } },
    chipmunk:  { label: 'Chipmunk', params: { semitones: 6 } },
    radio:     { label: 'Radio Comms', params: { radio: true, drive: 35 } },
    robot:     { label: 'Robot', params: { ring: 100, ringHz: 50 } },
    cathedral: { label: 'Cathedral', params: { semitones: -2, reverb: 70 } },
});

function clampNumber(value, min, max, fallback) {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
}

/**
 * Return a complete, validated parameter object from any input.
 * Unknown keys are dropped; out-of-range numbers are clamped.
 */
function normalizeVoiceParams(input = {}) {
    const src = input && typeof input === 'object' ? input : {};
    const out = { ...DEFAULT_VOICE_PARAMS };
    for (const key of Object.keys(VOICE_LIMITS)) {
        const lim = VOICE_LIMITS[key];
        const fallback = DEFAULT_VOICE_PARAMS[key];
        out[key] = clampNumber(src[key], lim.min, lim.max, fallback);
    }
    out.radio = src.radio === true;
    return out;
}

/** Resolve a built-in preset id to full parameters, or null if unknown. */
function getBuiltInPreset(id) {
    const preset = VOICE_PRESETS[id];
    if (!preset) return null;
    return normalizeVoiceParams({ ...preset.params });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PitchShifter,
        VOICE_LIMITS,
        DEFAULT_VOICE_PARAMS,
        VOICE_PRESETS,
        normalizeVoiceParams,
        getBuiltInPreset,
    };
}
