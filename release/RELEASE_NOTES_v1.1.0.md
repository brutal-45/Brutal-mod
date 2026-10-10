# 🎙️ v1.1.0 - Real-Time Voice Changer & Cross-Platform Support

> ⚠️ **Maintainer checklist (delete before publishing):** This is a draft. The
> repository currently contains **no voice changer, no mobile app, and no macOS
> build**. Every item marked 🚧 must be implemented and verified (or removed)
> before this release is published. Version number is a proposal: a new feature
> set is a SemVer minor bump from `1.0.0`. Use `2.0.0` instead if mobile ships
> in this release, since the changelog currently reserves mobile for 2.0.0.

---

## 📖 Release Overview

BrutalMod **v1.1.0** takes your soundboard beyond playback: the new **Real-Time Voice Changer** lets you shift pitch, apply voice filters, and fire sound effects straight into your mic during live calls and voice chats. Pair it with the existing global hotkeys and virtual audio cable support to turn every sound into a live performance. This release also expands BrutalMod to **Windows, macOS, Android, and iOS**, with the desktop and mobile experiences tuned for speed and low latency.

---

## 🆕 What's New

### 🎙️ Voice Changer
- 🎚️ **Pitch control:** Shift your voice up or down with a fine-grained slider and semitone steps.
- 🧪 **Live voice effects:** Apply filters and effects (e.g., robot, deep, chipmunk, radio) in real time with no perceptible delay.
- 💾 **Custom presets:** Save, name, rename, and delete your own voice setups; switch between them with a click or hotkey.
- 🔗 **Sound effects integration:** Trigger soundboard clips while the voice changer is active, so your effects run through the same processed mic chain.
- 🎛️ **Per-preset controls:** Each preset stores its own pitch, effect, and mix level.
- 🚧 **Mix / bypass toggle:** Instantly compare processed and raw voice with one shortcut.

### 💻 PC Specifics (Windows & macOS)
- 🖥️ **Desktop optimizations:** Reduced idle CPU and RAM use while the voice changer is running.
- ⌨️ **System-wide hotkeys:** Trigger sounds, presets, and bypass from any app, including full-screen games.
- 🔌 **Virtual audio cable integration:** Route processed audio into Discord, Zoom, Teams, OBS, and other apps through VB-Cable (Windows) or a virtual device such as BlackHole (macOS). 🚧 *macOS support to be verified.*
- 🍎 **macOS build:** Native `.dmg` package. 🚧 *Not yet in the repository.*

### 📱 Mobile Specifics (Android & iOS)
- 👆 **Touch controls:** Larger sound pads, swipe gestures, and haptic feedback on each trigger. 🚧
- 🎧 **Background audio playback:** Keep sounds playing when the app is minimized or the screen is locked. 🚧
- ⚡ **Low-latency performance:** Optimized audio engine for faster sound triggering. 🚧
- 📲 **Platforms:** Android (`.apk`) and iOS (TestFlight / App Store). 🚧 *Mobile is not yet in the repository.*

### ⚡ Improvements & Bug Fixes
- 🛡️ **Stability:** Hardened audio device handling, so switching devices no longer requires a restart.
- 🎨 **UI tweaks:** Refined dark and light themes with improved contrast on sound pads and the now-playing bar.
- ⏱️ **Audio latency reduction:** Faster trigger-to-sound response on desktop.
- 🐞 **Fixes:** Corrected hotkey conflicts, progress-bar drift on long clips, and config export edge cases. 🚧 *Confirm against the final commit list.*

---

## 📥 Download & Installation

| Platform | Build | Link |
|---|---|---|
| 🪟 Windows | `BrutalMod-1.1.0-Setup.exe` | [Download](https://github.com/brutal-45/Brutal-mod/releases/tag/v1.1.0) |
| 🍎 macOS | `BrutalMod-1.1.0.dmg` 🚧 | [Download](https://github.com/brutal-45/Brutal-mod/releases/tag/v1.1.0) |
| 🤖 Android | `BrutalMod-1.1.0.apk` 🚧 | [Download](https://github.com/brutal-45/Brutal-mod/releases/tag/v1.1.0) |
| 🍏 iOS | TestFlight / App Store 🚧 | `[INSERT TESTFLIGHT OR APP STORE LINK]` |
| 🌐 HTML (no install) | `soundboard-app/index.html` | [Repository](https://github.com/brutal-45/Brutal-mod) |

**Quick Start:**
- 🪟 **Windows:** Run the `.exe` installer. SmartScreen may warn about an unsigned app; choose *More info → Run anyway*.
- 🍎 **macOS:** Open the `.dmg` and drag BrutalMod to *Applications*. On first launch, approve it under *System Settings → Privacy & Security* if prompted.
- 🤖 **Android:** Enable *Install unknown apps* for your browser or file manager, then open the `.apk`.
- 🍏 **iOS:** Join TestFlight, or install from the App Store once it is live.

### 💡 Setup Tip: Enabling the Voice Changer on PC
1. Install a virtual audio cable (for example, **VB-Cable** on Windows or **BlackHole** on macOS).
2. In BrutalMod, set **Microphone Input** to your real mic and **Output** to the virtual cable.
3. In your call app (Discord, Zoom, Teams), set the **Microphone** to the virtual cable's *Output* device, not your physical mic.
4. Turn on the Voice Changer, pick a preset, and test with a quick call or recording.

> Tip: Keep sample rates matched (48 kHz is a safe default) to avoid crackling.

---

## 🗳️ Roadmap: Shape the Future of the Voice Changer

What should we build next? **Vote with a 👍 reaction on the matching comment in [GitHub Discussions](https://github.com/brutal-45/Brutal-mod/discussions), or reply with your own idea.**

| Option | Description | Vote |
|---|---|---|
| 🤖 **AI voice clones** | Create and use a voice model from a short sample | 👍 |
| 🌧️ **Ambient background loops** | Rain, café, and office loops mixed into your mic | 👍 |
| 🏛️ **Custom reverb** | Room, hall, and plate reverb with adjustable decay | 👍 |
| 🎵 **Auto-tune / pitch-lock** | Snap your pitch to a chosen key or scale | 👍 |
| 🌐 **OBS Studio integration** | Control the soundboard and voice presets from OBS | 👍 |

💬 *Have another idea? Open a Discussion in the **Ideas** category.*

---

## 🤝 Assets & Contribution

- 🐛 **Found a bug?** [Open an Issue](https://github.com/brutal-45/Brutal-mod/issues/new/choose) with your OS, app version, and steps to reproduce.
- 🔧 **Want to contribute?** Pull requests are welcome. Read [CONTRIBUTING.md](../CONTRIBUTING.md) to get started.
- 💬 **Feedback and questions:** Join the conversation in [GitHub Discussions](https://github.com/brutal-45/Brutal-mod/discussions).
- 🎨 **Assets:** Screenshots, sound packs, and presets are welcome in the community sections.

Thank you to everyone who tested betas, reported issues, and shared ideas. Your feedback made this release possible. 💀🔥

**🔥 DEVELOPED UNDER [BRUTALTOOLS](https://github.com/brutal-45) 🔥**

---

<details>
<summary>📝 Full Changelog</summary>

**Compare:** [v1.0.0...v1.1.0](https://github.com/brutal-45/Brutal-mod/compare/v1.0.0...v1.1.0)

</details>
