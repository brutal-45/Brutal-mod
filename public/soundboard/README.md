<div align="center">

<img src="https://raw.githubusercontent.com/brutal-45/Brutal-mod/main/public/brutalmod-logo.png" alt="Brutal-Mod Logo" width="180" height="180">

# 🔥 BrutalMod

### *The Ultimate Soundboard for Gamers & Streamers*

**Play sounds through your microphone like a pro**

[![Version](https://img.shields.io/badge/version-1.0.0-red.svg?style=for-the-badge)](https://github.com/brutal-45/Brutal-mod/releases)
[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=for-the-badge)](https://github.com/brutal-45/Brutal-mod/blob/main/LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows-blue.svg?style=for-the-badge)](https://github.com/brutal-45/Brutal-mod)
[![Stars](https://img.shields.io/github/stars/brutal-45/Brutal-mod?color=yellow&style=for-the-badge)](https://github.com/brutal-45/Brutal-mod/stargazers)

<a href="https://github.com/brutal-45/Brutal-mod/releases"><strong>Download</strong></a> • 
<a href="#-documentation"><strong>Docs</strong></a> • 
<a href="#-features"><strong>Features</strong></a> • 
<a href="#-installation"><strong>Install</strong></a> • 
<a href="#-contributing"><strong>Contribute</strong></a>

<img src="https://raw.githubusercontent.com/brutal-45/Brutal-mod/main/public/brutalmod-hero.png" alt="BrutalMod Preview" width="100%">

---

### 🏴 **DEVELOPED UNDER BRUTALTOOLS** 🏴

</div>

---

## 📖 About

**BrutalMod** is a lightweight, professional soundboard application for Windows. Play any sound effect, music, or audio clip directly through your microphone input - perfect for Discord, games, streams, and more.

### 🎯 Why Choose BrutalMod?

| Feature | BrutalMod | Others |
|---------|:---------:|:------:|
| **Download Size** | ~50 MB | 100MB+ |
| **RAM Usage** | < 50 MB | 300MB+ |
| **Hotkeys** | ✅ 50+ Keys | ❌ Limited |
| **Categories** | ✅ Unlimited | ❌ Fixed |
| **UI Design** | ✅ Modern Glass | ❌ Outdated |
| **Price** | ✅ 100% Free | 💰 Paid |
| **Open Source** | ✅ MIT License | ❌ Closed |

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[📖 Complete User Guide](GUIDE.md)** | A to Z guide: Installation, Setup, Usage, Troubleshooting |
| **[🔧 Build Guide](#️-building-from-source)** | How to build from source code |

### Quick Links

- [Installation Guide](GUIDE.md#installation)
- [Adding Sounds](GUIDE.md#adding-sounds)
- [Setting Up Hotkeys](GUIDE.md#setting-up-hotkeys)
- [Microphone Output Setup](GUIDE.md#microphone-output-setup)
- [Troubleshooting](GUIDE.md#troubleshooting)
- [FAQ](GUIDE.md#faq)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎛️ Core Features

- 🎙️ **Mic Output** - Route audio to microphone input
- ⌨️ **Global Hotkeys** - F1-F12, A-Z, 0-9 support
- 📁 **Drag & Drop** - Add sounds instantly
- 🗂️ **Categories** - Organize your sounds
- 🔊 **Volume Control** - Individual + Master
- 💾 **Auto-Save** - Settings persist

</td>
<td width="50%">

### 🎨 Design & Tech

- 🌙 **Dark Gaming Theme** - Eye-friendly
- 💎 **Glassmorphism UI** - Modern design
- ⚡ **Smooth Animations** - 60fps effects
- 🖥️ **Native Windows App** - Fast & responsive
- 🪶 **Ultra Lightweight** - Minimal resources
- 🔒 **Fully Offline** - No data collection

</td>
</tr>
</table>

---

## 🚀 Installation

### Download EXE (Recommended)

1. Go to [Releases](https://github.com/brutal-45/Brutal-mod/releases)
2. Download the latest `BrutalMod-Setup-x.x.x.exe`
3. Run the installer
4. Follow the setup wizard

### ⚠️ "Unknown Publisher" Warning

Since BrutalMod is free and open source, the EXE is not digitally signed. When you run the installer, Windows may show a warning.

**How to proceed:**
1. Click **"More info"**
2. Click **"Run anyway"**

> 🔒 **Security**: All code is open source on GitHub. You can build from source to verify!

### Build from Source (Recommended for Security)

```bash
# Clone the repository
git clone https://github.com/brutal-45/Brutal-mod.git

# Navigate to the soundboard folder
cd Brutal-mod/public/soundboard

# Install dependencies
npm install

# Build Windows EXE
npm run build:win
```

---

## 🎮 Quick Start

### Step 1: Install VB-Cable

To play sounds through your microphone, install [VB-Cable](https://vb-audio.com/Cable/) (free virtual audio cable).

### Step 2: Configure Audio

1. Set **"CABLE Input"** as Windows default playback device
2. Set **"CABLE Output"** as microphone in Discord/Games

### Step 3: Add Sounds

- Drag audio files onto the soundboard
- Or click "Add Sound" button

### Step 4: Set Hotkeys

- Right-click sound → Edit Hotkey → Press key → Save

---

## ⌨️ Keyboard Shortcuts

| Keys | Action |
|:----:|--------|
| `F1` - `F12` | Play sounds (assignable) |
| `A` - `Z` | Play sounds (assignable) |
| `0` - `9` | Play sounds (assignable) |
| `Space` | Stop all sounds |

---

## 🛠️ Building from Source

### Prerequisites

- **Node.js** 16+
- **npm** or **yarn**

### Build Commands

```bash
# Clone repository
git clone https://github.com/brutal-45/Brutal-mod.git
cd Brutal-mod/public/soundboard

# Install dependencies
npm install

# Development mode
npm start

# Build for Windows
npm run build:win
# Output: dist/BrutalMod-Setup-1.0.0.exe
```

---

## 📁 Project Structure

```
Brutal-mod/
├── 📄 index.html          # Main application UI
├── 🎨 styles.css          # Glassmorphism styles
├── ⚙️ app.js              # Core functionality
├── 📦 package.json        # Electron config
├── 🔧 main.js             # Electron main process
├── 🌉 preload.js          # IPC bridge
├── 📝 README.md           # This file
├── 📚 GUIDE.md            # Complete user guide
└── 📁 sounds/             # Your sound files
```

---

## 🤝 Contributing

Contributions are welcome!

| Type | How |
|------|-----|
| 🐛 **Bug Reports** | [Open an Issue](https://github.com/brutal-45/Brutal-mod/issues) |
| 💡 **Feature Ideas** | [Request a Feature](https://github.com/brutal-45/Brutal-mod/issues) |
| 🔨 **Code** | Submit Pull Requests |

### Contribution Process

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📜 License

```
MIT License

Copyright (c) 2024 brutal-45

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🔗 Links

| Resource | Link |
|----------|------|
| **Repository** | [github.com/brutal-45/Brutal-mod](https://github.com/brutal-45/Brutal-mod) |
| **Releases** | [github.com/brutal-45/Brutal-mod/releases](https://github.com/brutal-45/Brutal-mod/releases) |
| **Issues** | [github.com/brutal-45/Brutal-mod/issues](https://github.com/brutal-45/Brutal-mod/issues) |
| **Complete Guide** | [GUIDE.md](GUIDE.md) |

---

<div align="center">

## 🔥 BrutalMod

**Made with ❤️ by [brutal-45](https://github.com/brutal-45)**

### 🏴 DEVELOPED UNDER BRUTALTOOLS 🏴

[![Star](https://img.shields.io/github/stars/brutal-45/Brutal-mod?style=social)](https://github.com/brutal-45/Brutal-mod/stargazers)
[![Fork](https://img.shields.io/github/forks/brutal-45/Brutal-mod?style=social)](https://github.com/brutal-45/Brutal-mod/fork)

**[⬆ Back to Top](#-brutalmod)**

</div>
