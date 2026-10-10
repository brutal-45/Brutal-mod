# Changelog

All notable changes to BrutalMod will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- 🎙️ Real-time Voice Changer (Settings → Voice Changer)
  - Pitch shift from -12 to +12 semitones (phase vocoder running in an AudioWorklet)
  - Robot ring modulation with adjustable frequency, Radio filter, Drive, and Reverb
  - Effect Mix, Bypass, and Hear Myself monitoring
  - Built-in presets plus saved custom presets
  - Processed voice and soundboard clips sent to a selected virtual cable output
- Soundboard clips play through the voice changer when it is on, so calls hear them

### Fixed
- The "Audio Output" setting in Settings was never applied; clips now play on the selected device

### Notes
- Mobile (Android/iOS) and macOS builds are not included in this entry. The macOS `.dmg` target exists in `package.json` but has not been verified.

---

## [1.0.0] - 2024-03-26

### Added
- 🎉 Initial release of BrutalMod
- 💀 Beautiful glassmorphism UI with dark gaming aesthetic
- 🎵 Sound management with drag & drop support
- ⌨️ Custom hotkey system (F1-F12, A-Z, 0-9)
- 🔊 Master volume and individual sound volume controls
- 📁 Category organization (Memes, Effects, Music, Gaming)
- 🔍 Search and filter sounds
- 💾 Import/Export configuration
- 🖥️ Both HTML and EXE versions available
- 🎤 Virtual audio cable integration for mic output
- 📊 Library statistics dashboard
- 🎨 Theme customization (Dark, Blood Red, Cyber Purple)
- ⚡ Now playing bar with progress indicator
- 🔔 Toast notifications for actions
- 🌙 Dark mode optimized UI

### Features
- Play sounds through microphone with VB-Cable
- Global hotkeys (EXE version)
- Auto-save to localStorage
- Responsive design for all screen sizes
- No installation required (HTML version)
- Lightweight (~500KB HTML, ~80MB EXE with Electron)

### Technical
- Pure HTML/CSS/JavaScript (no frameworks)
- Electron for desktop app
- Next.js landing page
- Tailwind CSS for styling

---

## Upcoming Features

### [1.1.0] - Planned
- Sound waveform visualization
- Sound editing (trim, fade in/out)
- Multi-output device support
- Sound packs import/export

### [1.2.0] - Planned
- Online sound library browser
- OBS Studio integration
- Discord Rich Presence
- Sound categories customization

### [2.0.0] - Future
- Mobile companion app
- Cloud sync for sounds
- Collaborative sound packs
- AI-powered sound recommendations

---

**🔥 DEVELOPED UNDER BRUTALTOOLS 🔥**
