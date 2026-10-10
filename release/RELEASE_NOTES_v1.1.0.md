# 🎙️ v1.1.0 - Real-Time Voice Changer for BrutalMod

> ⚠️ **Maintainer checklist (delete before publishing):**
> 1. Bump `version` in `soundboard-app/package.json` from `1.0.0` to `1.1.0`. The installer name is built from it.
> 2. Build the Windows installer on Windows (`npm run build:win`). The macOS `.dmg` target exists but has **not** been verified; only publish a macOS build after testing on a Mac.
> 3. Test the voice changer on real hardware with VB-Cable before publishing (see *Known limitations*). The code is covered by unit tests and a simulated UI test, but not yet by a real microphone test.
> 4. Mobile (Android/iOS) is **not** in this release. It's listed only as roadmap.

---

## 📖 Release Overview

BrutalMod **v1.1.0** adds a **Real-Time Voice Changer**. Shift your pitch by up to 12 semitones, add robot, radio, drive, and reverb effects, and save your own presets. Send your processed voice, along with your soundboard clips, to a virtual audio cable so your call hears them. This release also fixes the **Audio Output** setting, which previously did nothing.

---

## 🆕 What's New

### 🎙️ Voice Changer
- 🎚️ **Pitch control:** -12 to +12 semitones, using a phase-vocoder shifter that runs in an AudioWorklet.
- 🤖 **Robot:** ring-modulation amount and frequency, from a subtle shimmer to full robot.
- 📻 **Radio Filter:** band-limits your voice to sound like comms radio.
- 🔥 **Drive:** adds grit and distortion.
- 🏛️ **Reverb:** adds a room-style tail.
- 🎛️ **Effect Mix and Bypass:** blend from dry to fully processed, or hear your raw voice with one switch.
- 💾 **Presets:** six built-in voices (Natural, Deep Giant, Chipmunk, Radio Comms, Robot, Cathedral) plus your own, saved in the app.
- 👂 **Hear Myself:** monitor your processed voice through your speakers.
- 🔗 **Soundboard integration:** clips you play while the voice changer is on go through the same processing chain, so your call hears them.

### 💻 PC Specifics (Windows)
- 🔌 **Virtual Mic Output selector:** choose "CABLE Input" (VB-Cable) directly in the app, so you don't have to change your system default device.
- 🎚️ **Microphone selector:** pick your real input device, with fallback to the default if it's unplugged.
- 🔄 **Device list refreshes** when devices are plugged in or removed.
- ⚠️ **Not in this release:** system-wide hotkeys for sounds or presets. Only **Escape** (stop all sounds) works globally.

### 📱 Mobile
- Not included in v1.1.0. See the roadmap.

### ⚡ Improvements & Bug Fixes
- 🔊 **Fixed:** the **Audio Output** setting was never applied. Clips now play on the device you select.
- ⏱️ **Latency:** about 21 ms of added processing latency, plus your audio driver's buffer.
- 🎨 **UI:** the voice changer lives in its own Settings card, with status messages for start, stop, and errors.
- 🧪 **Tests:** the DSP core has automated tests (`node --test test/voice-core.test.js`).

---

## 📥 Download & Installation

| Platform | Build | Link |
|---|---|---|
| 🪟 Windows | `BrutalMod-Setup-1.1.0.exe` (installer) | [Release page](https://github.com/brutal-45/Brutal-mod/releases/tag/v1.1.0) |
| 🌐 Anywhere (no install) | `soundboard-app/index.html` in a browser (Chrome or Edge recommended) | [Repository](https://github.com/brutal-45/Brutal-mod) |
| 🍎 macOS | Not yet verified; see the checklist above | — |
| 🤖 Android / 🍏 iOS | Not available yet | — |

**Quick Start (Windows):**
- Run the installer. SmartScreen may warn about an unsigned app. Choose *More info → Run anyway*.

### 💡 Setup Tip: Enabling the Voice Changer on PC
1. Install **VB-Cable** from [vb-audio.com/Cable](https://vb-audio.com/Cable/) and restart.
2. In BrutalMod, open **Settings → 🎙️ Voice Changer**.
3. Set **Microphone** to your real mic and **Virtual Mic Output** to **CABLE Input**.
4. Turn on **Enable Voice Changer** and pick a preset.
5. In Discord, Zoom, or Teams, set the **microphone** to **CABLE Output**.

> Tip: Use headphones with **Hear Myself**, or it will echo.

---

## ⚠️ Known Limitations

- 🔬 **Not tested on real hardware yet:** the voice changer has been checked with automated tests and a simulated browser environment. Test it with your mic before relying on it live.
- 📉 **Loudness varies a little:** pitch shifting can change loudness by a few dB on dense sounds. Adjust the master volume if needed.
- 🌐 **Browser engine:** the voice changer uses the Web Audio API. Use a recent Chromium-based version (Electron or Chrome/Edge).
- 🔈 **Local playback:** soundboard clips play on your default speakers while the voice changer is on. The virtual mic output only carries the processed voice and clips.

---

## 🗳️ Roadmap: Shape the Voice Changer

What should we build next? **Vote with a 👍 on the matching comment in [GitHub Discussions](https://github.com/brutal-45/Brutal-mod/discussions), or reply with your own idea.**

| Option | Description | Vote |
|---|---|---|
| 🤖 **AI voice clones** | Create and use a voice model from a short sample | 👍 |
| 🌧️ **Ambient background loops** | Rain, café, and office loops mixed into your mic | 👍 |
| 🏛️ **Better reverb** | Room, hall, and plate reverb with adjustable decay | 👍 |
| ⌨️ **System-wide hotkeys** | Trigger sounds and presets from any app | 👍 |
| 📱 **Mobile companion** | Android and iOS soundboard with background playback | 👍 |

💬 *Have another idea? Open a Discussion in the **Ideas** category.*

---

## 🤝 Assets & Contribution

- 🐛 **Found a bug?** [Open an Issue](https://github.com/brutal-45/Brutal-mod/issues/new/choose) with your OS, app version, and steps to reproduce.
- 🔧 **Want to contribute?** Pull requests are welcome. Read [CONTRIBUTING.md](../CONTRIBUTING.md) to get started.
- 💬 **Feedback and questions:** join the conversation in [GitHub Discussions](https://github.com/brutal-45/Brutal-mod/discussions).
- 🎨 **Presets:** share your favourite voice presets in Discussions.

Thanks to everyone who shared ideas and feedback. 💀🔥

**🔥 DEVELOPED UNDER [BRUTALTOOLS](https://github.com/brutal-45) 🔥**

---

<details>
<summary>📝 Full Changelog</summary>

**Compare:** [v1.0.0...v1.1.0](https://github.com/brutal-45/Brutal-mod/compare/v1.0.0...v1.1.0)

</details>
