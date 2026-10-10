# 💀 BrutalMod 

> Professional Soundboard for Gamers
> **🔥 Developed Under BRUTALTOOLS 🔥**

--- 

## Quick Start
 
### HTML Version (No Installation)
1. Open `index.html` in any modern browser
2. Add your sounds using the "Add Sound" button
3. Set hotkeys and start playing!

### EXE Version (Windows App)
```bash
# Prerequisites: Node.js 18+
npm install
npm run build:win
# Find exe in 'dist' folder
```

---

## Features

- ✅ Play sounds through microphone
- ✅ Custom hotkeys (F1-F12, A-Z, 0-9)
- ✅ Beautiful glassmorphism UI
- ✅ Ultra lightweight (~500KB)
- ✅ Works with Discord, Zoom, Teams
- ✅ No installation required (HTML version)
- ✅ Native EXE build included
- ✅ Real-time Voice Changer (pitch, robot, radio, drive, reverb, custom presets)
- ✅ Send sounds and your processed voice to a virtual cable

---

## Mic Setup

To play sounds through your microphone:

1. **Install VB-Cable** (free) from https://vb-audio.com/Cable/
2. **Set playback device** to "CABLE Input"
3. **Set voice app mic** to "CABLE Output"
4. **Done!** Sounds now play through your mic

---

## Voice Changer

Turn on **Settings → 🎙️ Voice Changer** to process your mic in real time.

1. Install a virtual cable (VB-Cable on Windows, BlackHole on macOS).
2. In **Microphone**, pick your real mic.
3. In **Virtual Mic Output**, pick "CABLE Input" (or BlackHole).
4. Turn on **Enable Voice Changer**.
5. In your call app, set the microphone to "CABLE Output" (or BlackHole).

Your call now hears the processed voice, plus any sounds you play while the voice changer is on. Sounds also play locally.

- **Pitch:** -12 to +12 semitones.
- **Effects:** Robot (ring modulation and frequency), Reverb, Drive, Radio filter.
- **Effect Mix** and **Bypass** let you compare with the raw voice.
- **Presets:** built-in (Natural, Deep Giant, Chipmunk, Radio Comms, Robot, Cathedral) plus your own, saved in the browser.
- **Hear Myself** plays the processed voice through your speakers. It can echo, so use headphones.

Pitch processing adds about 21 ms of latency, plus your audio driver's buffer. Pitch shifting can change loudness by a few dB on dense sounds.

The voice changer is in `voice-core.js` (DSP and presets, with tests in `test/`) and `voice-changer.js` (Web Audio engine and UI).

Run the tests with `node --test test/voice-core.test.js`.

---

## Supported Formats

MP3 • WAV • OGG • M4A • FLAC

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F1-F12 | Play assigned sounds |
| A-Z | Play assigned sounds |
| 0-9 | Play assigned sounds |
| Escape | Stop all sounds |

---

## Build Commands

```bash
npm run build:win    # Windows EXE
npm run build:mac    # macOS DMG
npm run build:linux  # Linux AppImage
```

---

## Tech Stack

- HTML5 + CSS3 + JavaScript
- Electron (for EXE version)
- No frameworks, pure performance

---

## License

MIT License - 100% Free & Open Source

---

<div align="center">

**💀 DOMINATE VOICE CHAT! 💀**

**🔥 DEVELOPED UNDER BRUTALTOOLS 🔥**

</div>
