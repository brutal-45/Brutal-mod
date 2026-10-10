// Run with: node --test soundboard-app/test/
const test = require('node:test');
const assert = require('node:assert/strict');
const {
    PitchShifter,
    normalizeVoiceParams,
    getBuiltInPreset,
    VOICE_PRESETS,
} = require('../voice-core.js');

const SR = 48000;

function sine(freq, seconds) {
    const n = Math.round(SR * seconds);
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) out[i] = 0.5 * Math.sin((2 * Math.PI * freq * i) / SR);
    return out;
}

// Process in 128-sample blocks, like an AudioWorklet render quantum.
function run(shifter, input) {
    const out = new Float32Array(input.length);
    const block = 128;
    for (let i = 0; i < input.length; i += block) {
        const inBlock = input.subarray(i, Math.min(i + block, input.length));
        const outBlock = out.subarray(i, i + inBlock.length);
        shifter.process(inBlock, outBlock);
    }
    return out;
}

// Estimate frequency by counting rising zero crossings over a steady-state window.
function estimateFreq(signal, fromSec, toSec) {
    const a = Math.round(fromSec * SR);
    const b = Math.round(toSec * SR);
    let crossings = 0;
    for (let i = a + 1; i < b; i++) {
        if (signal[i - 1] <= 0 && signal[i] > 0) crossings++;
    }
    return crossings / ((b - a) / SR);
}

function rms(signal, fromSec, toSec) {
    const a = Math.round(fromSec * SR);
    const b = Math.round(toSec * SR);
    let s = 0;
    for (let i = a; i < b; i++) s += signal[i] * signal[i];
    return Math.sqrt(s / (b - a));
}

test('passthrough at 0 semitones reconstructs input at unity gain (phase vocoder latency)', () => {
    const shifter = new PitchShifter(SR);
    shifter.setSemitones(0);
    const input = new Float32Array(SR);
    for (let i = 0; i < input.length; i++) {
        input[i] = 0.4 * Math.sin((2 * Math.PI * 440 * i) / SR) + 0.2 * Math.sin((2 * Math.PI * 1234 * i) / SR + 1);
    }
    const out = run(shifter, input);
    // Find the latency by correlation over a range covering fftSize - hop (768) up to fftSize (1024) + margin.
    let bestLag = -1, bestCorr = -Infinity;
    for (let L = 600; L <= 1200; L++) {
        let num = 0, d1 = 0, d2 = 0;
        for (let i = 20000; i < input.length; i++) {
            num += out[i] * input[i - L];
            d1 += out[i] * out[i];
            d2 += input[i - L] * input[i - L];
        }
        const c = num / Math.sqrt(d1 * d2);
        if (c > bestCorr) { bestCorr = c; bestLag = L; }
    }
    assert.ok(bestCorr > 0.999, `corr ${bestCorr} at lag ${bestLag}`);
    assert.ok(bestLag >= 768 && bestLag <= 1100, `lag ${bestLag}`);
    let num = 0, den = 0;
    for (let i = 20000; i < input.length; i++) { num += out[i] * input[i - bestLag]; den += input[i - bestLag] ** 2; }
    assert.ok(Math.abs(num / den - 1) < 0.01, `gain ${num / den}`);
});

test('+7 semitones raises a 220 Hz tone to ~330 Hz', () => {
    const shifter = new PitchShifter(SR);
    shifter.setSemitones(7);
    const out = run(shifter, sine(220, 1.0));
    const f = estimateFreq(out, 0.5, 0.95);
    const expected = 220 * Math.pow(2, 7 / 12);
    assert.ok(Math.abs(f - expected) / expected < 0.03, `got ${f}, expected ~${expected}`);
});

test('-5 semitones lowers a 330 Hz tone to ~236 Hz', () => {
    const shifter = new PitchShifter(SR);
    shifter.setSemitones(-5);
    const out = run(shifter, sine(330, 1.0));
    const f = estimateFreq(out, 0.5, 0.95);
    const expected = 330 * Math.pow(2, -5 / 12);
    assert.ok(Math.abs(f - expected) / expected < 0.03, `got ${f}, expected ~${expected}`);
});

test('shifted harmonic (voice-like) signal keeps level within a few dB, no blow-up', () => {
    // Phase-vocoder bin mapping varies level by a few dB on dense spectra (known limitation).
    const harmonic = new Float32Array(SR);
    for (let i = 0; i < harmonic.length; i++) {
        let v = 0;
        for (let h = 1; h * 150 < 8000; h++) v += Math.sin((2 * Math.PI * h * 150 * i) / SR) / h;
        harmonic[i] = 0.2 * v;
    }
    const inLevel = rms(harmonic, 0.5, 0.95);
    for (const st of [-12, -5, 5, 7, 12]) {
        const shifter = new PitchShifter(SR);
        shifter.setSemitones(st);
        const out = run(shifter, harmonic);
        const ratio = rms(out, 0.5, 0.95) / inLevel;
        assert.ok(ratio > 0.4 && ratio < 1.3, `semitones ${st}: level ratio ${ratio}`);
        for (const v of out) assert.ok(Number.isFinite(v));
    }
});

test('setSemitones clamps to +/-24 and ignores garbage', () => {
    const shifter = new PitchShifter(SR);
    shifter.setSemitones(100);
    assert.ok(Math.abs(shifter.ratio - 4) < 1e-9);
    shifter.setSemitones(-100);
    assert.ok(Math.abs(shifter.ratio - 0.25) < 1e-9);
    shifter.setSemitones('abc');
    assert.equal(shifter.ratio, 1);
});

test('normalizeVoiceParams clamps numbers and fills defaults', () => {
    const p = normalizeVoiceParams({ semitones: 99, ring: -5, reverb: 'x', radio: 'yes', extra: 1 });
    assert.equal(p.semitones, 12);
    assert.equal(p.ring, 0);
    assert.equal(p.reverb, 0);
    assert.equal(p.radio, false);
    assert.equal(p.mix, 100);
    assert.equal(p.extra, undefined);
});

test('normalizeVoiceParams tolerates null input', () => {
    assert.equal(normalizeVoiceParams(null).mix, 100);
});

test('every built-in preset resolves to valid parameters', () => {
    for (const id of Object.keys(VOICE_PRESETS)) {
        const p = getBuiltInPreset(id);
        assert.ok(p, id);
        assert.ok(p.semitones >= -12 && p.semitones <= 12, id);
    }
    assert.equal(getBuiltInPreset('does-not-exist'), null);
});
