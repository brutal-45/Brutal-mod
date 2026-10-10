/**
 * BrutalMod Voice Changer - Web Audio engine and settings UI.
 *
 * Signal flow while active:
 *
 *   mic -> [pitch shifter (AudioWorklet)] -> [robot ring mod] -> [radio filter]
 *       -> [drive] -> wet -> voiceBus
 *                         -> [reverb] ----------------------------> voiceBus
 *   mic -> dry ----------------------------------------------------> voiceBus
 *
 *   voiceBus  -> streamDest (MediaStream) -> hidden <audio> -> virtual cable output
 *   voiceBus  -> monitorGain -> speakers           (only when "Hear myself" is on)
 *   soundboard clips -> sfxBus -> streamDest (call hears them) and -> speakers (local)
 *
 * Depends on voice-core.js (PitchShifter, presets) being loaded first.
 */
(function () {
    'use strict';

    const SETTINGS_KEY = 'brutalmod_voice';
    const CUSTOM_PRESETS_KEY = 'brutalmod_voice_presets';
    const WORKLET_NAME = 'brutal-vc-pitch';

    const engine = {
        ctx: null,
        running: false,
        micStream: null,
        micSource: null,
        pitchNode: null,
        nodes: null,
        outAudio: null,
        params: null,
        bypass: false,
        monitor: false,
    };

    // ------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------
    function setStatus(text, kind) {
        const el = document.getElementById('vcStatus');
        if (!el) return;
        el.textContent = text;
        el.dataset.kind = kind || 'info';
    }

    function notify(message, type) {
        if (typeof showToast === 'function') showToast(message, type);
    }

    function buildWorkletSource() {
        // PitchShifter is copied as source text so the worklet has no imports.
        return `${PitchShifter.toString()}
class VCPitchProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.shifter = new PitchShifter(sampleRate);
        this.port.onmessage = (e) => {
            if (e.data && typeof e.data.semitones === 'number') this.shifter.setSemitones(e.data.semitones);
        };
    }
    process(inputs, outputs) {
        const input = inputs[0] && inputs[0][0];
        const output = outputs[0] && outputs[0][0];
        if (!output) return true;
        if (!input) { output.fill(0); return true; }
        this.shifter.process(input, output);
        return true;
    }
}
registerProcessor('${WORKLET_NAME}', VCPitchProcessor);`;
    }

    function makeReverbImpulse(ctx, seconds = 2.2) {
        const length = Math.floor(ctx.sampleRate * seconds);
        const ir = ctx.createBuffer(1, length, ctx.sampleRate);
        const data = ir.getChannelData(0);
        for (let i = 0; i < length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
        }
        return ir;
    }

    function makeDriveCurve(amount) {
        // amount in [0, 1]; 0 gives a straight line (no distortion).
        const n = 1024;
        const curve = new Float32Array(n);
        const k = 1 + 15 * amount;
        const norm = amount > 0 ? Math.tanh(k) : 1;
        for (let i = 0; i < n; i++) {
            const x = (i / (n - 1)) * 2 - 1;
            curve[i] = amount > 0 ? Math.tanh(k * x) / norm : x;
        }
        return curve;
    }

    // ------------------------------------------------------------
    // Engine
    // ------------------------------------------------------------
    async function loadPitchWorklet(ctx) {
        if (!ctx.audioWorklet) return false;
        const blob = new Blob([buildWorkletSource()], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        try {
            await ctx.audioWorklet.addModule(url);
            return true;
        } catch (err) {
            console.warn('Pitch worklet unavailable, pitch shift disabled:', err);
            return false;
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    function buildGraph(ctx, pitchNode) {
        const n = {};
        n.dry = ctx.createGain();
        n.wet = ctx.createGain();
        n.voiceBus = ctx.createGain();

        n.ringNode = ctx.createGain();            // gain = (1 - depth) + depth * oscillator
        n.ringOsc = ctx.createOscillator();
        n.ringOsc.type = 'sine';
        n.ringDepth = ctx.createGain();
        n.ringOsc.connect(n.ringDepth);
        n.ringDepth.connect(n.ringNode.gain);
        n.ringOsc.start();

        n.hp = ctx.createBiquadFilter();
        n.hp.type = 'highpass';
        n.lp = ctx.createBiquadFilter();
        n.lp.type = 'lowpass';
        n.shaper = ctx.createWaveShaper();
        n.shaper.oversample = '2x';
        n.chainOut = ctx.createGain();

        n.convolver = ctx.createConvolver();
        n.convolver.buffer = makeReverbImpulse(ctx);
        n.reverbGain = ctx.createGain();

        n.monitorGain = ctx.createGain();
        n.sfxBus = ctx.createGain();
        n.streamDest = ctx.createMediaStreamDestination();

        // Voice path
        const head = pitchNode || null;
        if (head) head.connect(n.ringNode);
        n.ringNode.connect(n.hp);
        n.hp.connect(n.lp);
        n.lp.connect(n.shaper);
        n.shaper.connect(n.chainOut);
        n.chainOut.connect(n.wet);
        n.wet.connect(n.voiceBus);
        n.chainOut.connect(n.convolver);
        n.convolver.connect(n.reverbGain);
        n.reverbGain.connect(n.voiceBus);
        n.voiceBus.connect(n.streamDest);
        n.voiceBus.connect(n.monitorGain);
        n.monitorGain.connect(ctx.destination);

        // Soundboard path: call hears it via streamDest, and the user hears it locally.
        n.sfxBus.connect(n.streamDest);
        n.sfxBus.connect(ctx.destination);

        n.dry.connect(n.voiceBus);
        return n;
    }

    /** Apply a validated parameter object to the running graph. */
    function applyParams(p) {
        engine.params = p;
        const n = engine.nodes;
        if (!n || !engine.ctx) return;
        const t = engine.ctx.currentTime;

        if (engine.pitchNode) engine.pitchNode.port.postMessage({ semitones: p.semitones });

        const depth = p.ring / 100;
        n.ringNode.gain.setTargetAtTime(1 - depth, t, 0.02);
        n.ringDepth.gain.setTargetAtTime(depth, t, 0.02);
        n.ringOsc.frequency.setTargetAtTime(p.ringHz, t, 0.02);

        if (p.radio) {
            n.hp.frequency.setTargetAtTime(350, t, 0.02);
            n.lp.frequency.setTargetAtTime(3400, t, 0.02);
            n.hp.Q.value = 0.7;
            n.lp.Q.value = 0.7;
        } else {
            n.hp.frequency.setTargetAtTime(20, t, 0.02);
            n.lp.frequency.setTargetAtTime(20000, t, 0.02);
        }

        n.shaper.curve = makeDriveCurve(p.drive / 100);
        n.reverbGain.gain.setTargetAtTime(p.reverb / 100, t, 0.05);

        applyMix();
        n.monitorGain.gain.setTargetAtTime(engine.monitor ? 1 : 0, t, 0.02);
    }

    function applyMix() {
        const n = engine.nodes;
        if (!n || !engine.ctx || !engine.params) return;
        const t = engine.ctx.currentTime;
        const mix = engine.bypass ? 0 : engine.params.mix / 100;
        n.wet.gain.setTargetAtTime(mix, t, 0.02);
        n.dry.gain.setTargetAtTime(1 - mix, t, 0.02);
    }

    async function startEngine(opts) {
        if (engine.running) return;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC || !navigator.mediaDevices?.getUserMedia) {
            throw new Error('Web Audio or microphone access is not available here.');
        }

        const ctx = new AC({ latencyHint: 'interactive' });
        engine.ctx = ctx;
        await ctx.resume();

        const hasPitch = await loadPitchWorklet(ctx);

        const baseAudio = { echoCancellation: false, noiseSuppression: false, autoGainControl: false };
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: opts.micId ? { ...baseAudio, deviceId: { exact: opts.micId } } : baseAudio,
            });
        } catch (err) {
            if (opts.micId) {
                // Saved microphone may have been unplugged: fall back to the default device.
                stream = await navigator.mediaDevices.getUserMedia({ audio: baseAudio });
                notify('Saved microphone not found, using default.', 'info');
            } else {
                throw err;
            }
        }
        engine.micStream = stream;

        engine.micSource = ctx.createMediaStreamSource(stream);
        if (hasPitch) {
            engine.pitchNode = new AudioWorkletNode(ctx, WORKLET_NAME, {
                numberOfInputs: 1,
                numberOfOutputs: 1,
                outputChannelCount: [1],
                channelCount: 1,
                channelCountMode: 'explicit',
                channelInterpretation: 'speakers',
            });
        } else {
            engine.pitchNode = null;
        }

        engine.nodes = buildGraph(ctx, engine.pitchNode);
        engine.micSource.connect(engine.nodes.dry);
        // Pitch shifter (if available) feeds the effect chain; otherwise the mic feeds it directly.
        engine.micSource.connect(engine.pitchNode || engine.nodes.ringNode);

        // Send the processed stream to the chosen output (virtual cable) via a hidden element.
        const outAudio = new Audio();
        outAudio.autoplay = true;
        outAudio.srcObject = engine.nodes.streamDest.stream;
        engine.outAudio = outAudio;
        if (opts.outputId && typeof outAudio.setSinkId === 'function') {
            try {
                await outAudio.setSinkId(opts.outputId);
            } catch (err) {
                console.warn('setSinkId failed, using default output:', err);
                notify('Could not use the selected virtual output. Using default.', 'error');
            }
        }
        await outAudio.play().catch(() => {});

        engine.running = true;
        applyParams(opts.params);
        setStatus(hasPitch
            ? 'Running. Select the virtual cable as your mic in your call app.'
            : 'Running without pitch shifting (AudioWorklet unavailable).', hasPitch ? 'ok' : 'warn');
    }

    function stopEngine() {
        if (!engine.running && !engine.ctx) return;
        engine.running = false;
        try { engine.micStream?.getTracks().forEach(t => t.stop()); } catch (_) { /* ignore */ }
        try { engine.outAudio?.pause(); engine.outAudio && (engine.outAudio.srcObject = null); } catch (_) { /* ignore */ }
        try { engine.pitchNode?.disconnect(); engine.micSource?.disconnect(); } catch (_) { /* ignore */ }
        try { engine.ctx?.close(); } catch (_) { /* ignore */ }
        engine.ctx = null;
        engine.micStream = null;
        engine.micSource = null;
        engine.pitchNode = null;
        engine.nodes = null;
        engine.outAudio = null;
        setStatus('Off.', 'info');
    }

    /**
     * Route a soundboard clip through the voice-changer graph.
     * Returns a cleanup function, or null when the engine is not running.
     */
    function attachSound(audio, volume) {
        if (!engine.running || !engine.ctx || !engine.nodes) return null;
        try {
            const ctx = engine.ctx;
            if (ctx.state === 'suspended') ctx.resume();
            const source = ctx.createMediaElementSource(audio);
            const gain = ctx.createGain();
            gain.gain.value = volume;
            source.connect(gain);
            gain.connect(engine.nodes.sfxBus);
            audio.volume = 1;
            return () => {
                try { source.disconnect(); gain.disconnect(); } catch (_) { /* ignore */ }
            };
        } catch (err) {
            console.warn('Could not route sound through voice changer:', err);
            return null;
        }
    }

    // ------------------------------------------------------------
    // Presets and persistence
    // ------------------------------------------------------------
    function loadJSON(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (_) {
            return fallback;
        }
    }

    function loadCustomPresets() {
        const list = loadJSON(CUSTOM_PRESETS_KEY, []);
        if (!Array.isArray(list)) return [];
        return list
            .filter(p => p && typeof p.id === 'string' && typeof p.label === 'string')
            .map(p => ({ id: p.id, label: p.label.slice(0, 40), params: normalizeVoiceParams(p.params) }));
    }

    function saveCustomPresets(list) {
        try { localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(list)); } catch (_) { /* quota */ }
    }

    function getPresetById(id, customs) {
        if (id && id.startsWith('custom:')) {
            const c = customs.find(p => p.id === id);
            return c ? c.params : null;
        }
        return getBuiltInPreset(id);
    }

    const ui = {};
    let customPresets = [];
    let saved = {
        micId: '',
        outputId: '',
        presetId: 'natural',
        params: normalizeVoiceParams({}),
        monitor: false,
        bypass: false,
    };

    function persist() {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(saved));
        } catch (_) { /* quota */ }
    }

    function readControlsIntoParams() {
        return normalizeVoiceParams({
            semitones: Number(ui.pitch.value),
            ring: Number(ui.ring.value),
            ringHz: Number(ui.ringHz.value),
            reverb: Number(ui.reverb.value),
            drive: Number(ui.drive.value),
            radio: ui.radio.checked,
            mix: Number(ui.mix.value),
        });
    }

    function writeParamsToControls(p) {
        ui.pitch.value = p.semitones;
        ui.ring.value = p.ring;
        ui.ringHz.value = p.ringHz;
        ui.reverb.value = p.reverb;
        ui.drive.value = p.drive;
        ui.radio.checked = p.radio;
        ui.mix.value = p.mix;
        refreshLabels();
    }

    function refreshLabels() {
        ui.pitchValue.textContent = `${Number(ui.pitch.value) > 0 ? '+' : ''}${ui.pitch.value} st`;
        ui.ringValue.textContent = `${ui.ring.value}%`;
        ui.ringHzValue.textContent = `${ui.ringHz.value} Hz`;
        ui.reverbValue.textContent = `${ui.reverb.value}%`;
        ui.driveValue.textContent = `${ui.drive.value}%`;
        ui.mixValue.textContent = `${ui.mix.value}%`;
    }

    function rebuildPresetOptions(selectedId) {
        const sel = ui.preset;
        sel.innerHTML = '';
        const builtGroup = document.createElement('optgroup');
        builtGroup.label = 'Built-in';
        Object.keys(VOICE_PRESETS).forEach(id => {
            const o = document.createElement('option');
            o.value = id;
            o.textContent = VOICE_PRESETS[id].label;
            builtGroup.appendChild(o);
        });
        sel.appendChild(builtGroup);

        if (customPresets.length) {
            const customGroup = document.createElement('optgroup');
            customGroup.label = 'My presets';
            customPresets.forEach(p => {
                const o = document.createElement('option');
                o.value = p.id;
                o.textContent = p.label;
                customGroup.appendChild(o);
            });
            sel.appendChild(customGroup);
        }

        const modified = document.createElement('option');
        modified.value = 'modified';
        modified.textContent = 'Custom (modified)';
        modified.hidden = true;
        sel.appendChild(modified);
        ui.modifiedOpt = modified;

        sel.value = selectedId;
    }

    function fillDeviceSelect(select, devices, kind, emptyLabel, selectedId) {
        if (!select) return;
        select.innerHTML = '';
        const first = document.createElement('option');
        first.value = '';
        first.textContent = emptyLabel;
        select.appendChild(first);
        devices.filter(d => d.kind === kind).forEach(d => {
            const o = document.createElement('option');
            o.value = d.deviceId;
            o.textContent = d.label || `Device ${d.deviceId.slice(0, 8)}`;
            select.appendChild(o);
        });
        select.value = selectedId || '';
        if (select.value !== (selectedId || '')) select.value = '';
    }

    async function refreshDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            fillDeviceSelect(ui.mic, devices, 'audioinput', 'Default microphone', saved.micId);
            fillDeviceSelect(ui.output, devices, 'audiooutput', 'Default output (set a virtual cable here)', saved.outputId);
        } catch (_) {
            setStatus('Could not list audio devices.', 'warn');
        }
    }

    function onParamsChanged() {
        const p = readControlsIntoParams();
        refreshLabels();
        const builtInMatch = findMatchingPreset(p);
        if (builtInMatch) {
            ui.preset.value = builtInMatch;
            ui.modifiedOpt.hidden = true;
        } else {
            ui.preset.value = 'modified';
            ui.modifiedOpt.hidden = false;
        }
        if (ui.preset.value !== 'modified') saved.presetId = ui.preset.value;
        saved.params = p;
        persist();
        applyParams(p);
    }

    function findMatchingPreset(p) {
        const ids = [...Object.keys(VOICE_PRESETS), ...customPresets.map(c => c.id)];
        for (const id of ids) {
            const candidate = getPresetById(id, customPresets);
            if (candidate && JSON.stringify(candidate) === JSON.stringify(p)) return id;
        }
        return null;
    }

    function onPresetChanged() {
        const id = ui.preset.value;
        if (id === 'modified') return;
        const p = getPresetById(id, customPresets);
        if (!p) return;
        writeParamsToControls(p);
        saved.presetId = id;
        saved.params = p;
        ui.modifiedOpt.hidden = true;
        persist();
        applyParams(p);
    }

    function onSavePreset() {
        const name = (ui.presetName.value || '').trim().slice(0, 40);
        if (!name) {
            notify('Type a name for your preset first.', 'error');
            return;
        }
        const p = readControlsIntoParams();
        const id = `custom:${Date.now().toString(36)}`;
        customPresets.push({ id, label: name, params: p });
        saveCustomPresets(customPresets);
        ui.presetName.value = '';
        saved.presetId = id;
        rebuildPresetOptions(id);
        ui.modifiedOpt.hidden = true;
        persist();
        notify(`Saved preset "${name}"`, 'success');
    }

    function onDeletePreset() {
        const id = ui.preset.value;
        if (!id || !id.startsWith('custom:')) {
            notify('Only your own presets can be deleted.', 'error');
            return;
        }
        customPresets = customPresets.filter(p => p.id !== id);
        saveCustomPresets(customPresets);
        saved.presetId = 'natural';
        rebuildPresetOptions('natural');
        onPresetChanged();
        notify('Preset deleted', 'info');
    }

    async function onToggleEnabled() {
        if (ui.enabled.checked) {
            ui.enabled.disabled = true;
            setStatus('Starting... allow microphone access if prompted.', 'info');
            try {
                await startEngine({
                    micId: saved.micId,
                    outputId: saved.outputId,
                    params: readControlsIntoParams(),
                });
                notify('Voice changer is on', 'success');
            } catch (err) {
                console.error(err);
                ui.enabled.checked = false;
                stopEngine();
                setStatus(`Could not start: ${err.message || err.name}`, 'error');
                notify('Could not start the voice changer', 'error');
            } finally {
                ui.enabled.disabled = false;
            }
        } else {
            stopEngine();
            notify('Voice changer is off', 'info');
        }
    }

    function init() {
        const get = (id) => document.getElementById(id);
        ui.enabled = get('vcEnabled');
        if (!ui.enabled) return; // Settings card not present; nothing to wire.

        ui.mic = get('vcMicSelect');
        ui.output = get('vcOutputSelect');
        ui.preset = get('vcPreset');
        ui.presetName = get('vcPresetName');
        ui.pitch = get('vcPitch');
        ui.pitchValue = get('vcPitchValue');
        ui.ring = get('vcRing');
        ui.ringValue = get('vcRingValue');
        ui.ringHz = get('vcRingHz');
        ui.ringHzValue = get('vcRingHzValue');
        ui.reverb = get('vcReverb');
        ui.reverbValue = get('vcReverbValue');
        ui.drive = get('vcDrive');
        ui.driveValue = get('vcDriveValue');
        ui.radio = get('vcRadio');
        ui.mix = get('vcMix');
        ui.mixValue = get('vcMixValue');
        ui.monitor = get('vcMonitor');
        ui.bypass = get('vcBypass');

        const stored = loadJSON(SETTINGS_KEY, null);
        if (stored && typeof stored === 'object') {
            saved = {
                micId: typeof stored.micId === 'string' ? stored.micId : '',
                outputId: typeof stored.outputId === 'string' ? stored.outputId : '',
                presetId: typeof stored.presetId === 'string' ? stored.presetId : 'natural',
                params: normalizeVoiceParams(stored.params),
                monitor: stored.monitor === true,
                bypass: stored.bypass === true,
            };
        }
        customPresets = loadCustomPresets();
        rebuildPresetOptions(saved.presetId);
        writeParamsToControls(saved.params);
        ui.monitor.checked = saved.monitor;
        ui.bypass.checked = saved.bypass;
        engine.monitor = saved.monitor;
        engine.bypass = saved.bypass;
        const match = findMatchingPreset(saved.params);
        ui.preset.value = match || 'modified';
        ui.modifiedOpt.hidden = match !== null;

        refreshDevices();
        if (navigator.mediaDevices?.addEventListener) {
            navigator.mediaDevices.addEventListener('devicechange', refreshDevices);
        }

        ui.enabled.addEventListener('change', onToggleEnabled);
        ui.mic.addEventListener('change', () => { saved.micId = ui.mic.value; persist(); setStatus('Microphone change applies when you turn the voice changer on again.', 'info'); });
        ui.output.addEventListener('change', async () => {
            saved.outputId = ui.output.value;
            persist();
            if (engine.outAudio && typeof engine.outAudio.setSinkId === 'function') {
                try { await engine.outAudio.setSinkId(saved.outputId); } catch (_) { notify('Could not switch output device', 'error'); }
            }
        });
        ui.preset.addEventListener('change', onPresetChanged);
        [ui.pitch, ui.ring, ui.ringHz, ui.reverb, ui.drive, ui.mix, ui.radio].forEach(el => el.addEventListener('input', onParamsChanged));
        ui.radio.addEventListener('change', onParamsChanged);
        get('vcSavePreset')?.addEventListener('click', onSavePreset);
        get('vcDeletePreset')?.addEventListener('click', onDeletePreset);
        ui.monitor.addEventListener('change', () => {
            engine.monitor = ui.monitor.checked;
            saved.monitor = engine.monitor;
            persist();
            if (engine.nodes) engine.nodes.monitorGain.gain.setTargetAtTime(engine.monitor ? 1 : 0, engine.ctx.currentTime, 0.02);
        });
        ui.bypass.addEventListener('change', () => {
            engine.bypass = ui.bypass.checked;
            saved.bypass = engine.bypass;
            persist();
            applyMix();
        });

        if (!(window.AudioContext || window.webkitAudioContext)) {
            ui.enabled.disabled = true;
            setStatus('Web Audio is not supported in this environment.', 'error');
        } else {
            setStatus('Off.', 'info');
        }
    }

    window.VoiceChanger = {
        init,
        attachSound,
        isActive: () => engine.running,
        buildWorkletSource,   // exposed for tests
    };

    document.addEventListener('DOMContentLoaded', init);
})();
