# 📚 BrutalMod Complete User Guide 

> **Everything you need to know to use BrutalMod like a pro**

---

## ⚠️ IMPORTANT: How to Run This App

**DO NOT double-click `app.js` directly!** This will cause an error because this is an **Electron application** that requires Node.js and Electron to run.

### ✅ Correct Way to Run:

| Method | Steps |
|--------|-------|
| **Easy Way** | Double-click `START_HERE.bat` and choose option 1 |
| **Alternative** | Double-click `RUN.bat` |
| **Command Line** | Open terminal in this folder and run `npm install` then `npm start` |

### 📋 Prerequisites:
1. **Install Node.js** from https://nodejs.org (LTS version recommended)
2. Run `START_HERE.bat` or `RUN.bat`
3. The app will automatically install dependencies and launch!

> 💡 **First run may take a minute** to download Electron (~50MB) 

---

## 📑 Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Initial Setup](#initial-setup)
4. [Adding Sounds](#adding-sounds)
5. [Playing Sounds](#playing-sounds)
6. [Setting Up Hotkeys](#setting-up-hotkeys)
7. [Microphone Output Setup](#microphone-output-setup)
8. [Managing Your Library](#managing-your-library)
9. [Settings & Configuration](#settings--configuration)
10. [Troubleshooting](#troubleshooting)
11. [Tips & Tricks](#tips--tricks)
12. [FAQ](#faq)

---

## Introduction

### What is BrutalMod?

BrutalMod is a professional soundboard application for Windows that allows you to play audio files through your microphone input. This means you can play sound effects, music, or any audio during voice calls in Discord, games, Zoom, Teams, and more.

### Key Features 

| Feature | Description |
|---------|-------------|
| 🎙️ **Mic Output** | Play sounds through your microphone |
| ⌨️ **Global Hotkeys** | Trigger sounds from any application |
| 📁 **Drag & Drop** | Easy sound file management |
| 🗂️ **Categories** | Organize sounds by type |
| 🔊 **Volume Control** | Individual and master volume |
| 💾 **Auto-Save** | Settings persist automatically |

### System Requirements

| Requirement | Minimum |
|-------------|---------|
| **OS** | Windows 7, 8, 10, 11 |
| **RAM** | 50 MB |
| **Storage** | 50 MB |
| **CPU** | Any processor |

---

## Installation

### Step 1: Download

1. Go to [GitHub Releases](https://github.com/brutal-45/Brutal-mod/releases)
2. Download the latest `BrutalMod-Setup-x.x.x.exe`
3. Save to your Downloads folder

### Step 2: Run Installer

**If you see "Windows protected your PC":**

1. Click **"More info"**
2. Click **"Run anyway"**
3. This warning appears because the app isn't digitally signed (signing costs $200-500/year)

> 💡 **Tip**: The app is completely safe. You can verify by checking the [source code](https://github.com/brutal-45/Brutal-mod) or building from source.

### Step 3: Installation Wizard

1. **Welcome Screen** - Click "Next"
2. **License Agreement** - Read and accept the MIT license
3. **Installation Folder** - Choose where to install (default is fine)
4. **Additional Tasks** - Check "Create desktop shortcut" if desired
5. **Install** - Click "Install"
6. **Finish** - Launch BrutalMod

### Step 4: First Launch

When you first open BrutalMod:

1. The main window will appear with an empty soundboard
2. You'll see the sidebar with navigation options
3. The app is ready for you to add sounds!

---

## Initial Setup

### Understanding the Interface

```
┌─────────────────────────────────────────────────────────┐
│  BRUTALMOD                                    ─ □ ✕   │
├────────────┬────────────────────────────────────────────┤
│            │                                            │
│  💀 LOGO   │   SOUNDBOARD                               │
│  BRUTALMOD │   Press hotkeys or click to play sounds   │
│            │                                            │
│  ┌────────┐│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│  │🎵 Sounds││   │      │ │      │ │      │ │      │    │
│  └────────┘│   │Sound │ │Sound │ │Sound │ │Sound │    │
│  ┌────────┐│   │  1   │ │  2   │ │  3   │ │  4   │    │
│  │📚 Library│   └──────┘ └──────┘ └──────┘ └──────┘    │
│  └────────┘│                                            │
│  ┌────────┐│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│  │⚙️ Settings│   │      │ │      │ │      │ │      │    │
│  └────────┘│   │Sound │ │Sound │ │Sound │ │Sound │    │
│            │   │  5   │ │  6   │ │  7   │ │  8   │    │
│  QUICK     │   └──────┘ └──────┘ └──────┘ └──────┘    │
│  ACTIONS   │                                            │
│  ➕ Add    │                                            │
│  📥 Import │                                            │
│  📤 Export │                                            │
│            │                                            │
│  MASTER    │                                            │
│  VOLUME    │                                            │
│  ████████░ │                                            │
│            │                                            │
│  ⏹ STOP   │                                            │
│  ALL      │                                            │
└────────────┴────────────────────────────────────────────┘
```

### Sidebar Sections

| Section | Purpose |
|---------|---------|
| **Navigation** | Switch between Soundboard, Library, and Settings |
| **Quick Actions** | Add sounds, import/export configs |
| **Hotkey List** | View all assigned hotkeys |
| **Master Volume** | Control overall volume |
| **Stop All** | Immediately stop all playing sounds |

---

## Adding Sounds

> 📘 **See [ADDING_SOUNDS.md](https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/ADDING_SOUNDS.md) for the complete detailed guide on adding, editing, and managing sounds!**

### Method 1: Drag & Drop (Recommended)

1. Open File Explorer and navigate to your audio files
2. Select one or more audio files
3. Drag them onto the soundboard grid area
4. Release to add them

**Supported Formats:** MP3, WAV, OGG, M4A, FLAC, WEBM

### Method 2: Add Sound Button

1. Click the **"➕ Add Sound"** button in the sidebar
2. A file picker dialog will open
3. Navigate to your audio files
4. Select one or more files
5. Click **"Open"**

### Method 3: Click Empty Pad

1. Click any empty sound pad (square with + icon)
2. A file picker will open
3. Select your audio file
4. Click **"Open"**

### After Adding Sounds

Each sound will appear as a card showing:
- **Name** (filename or custom name)
- **Hotkey** (if assigned)
- **Volume** indicator

---

## Playing Sounds

### Method 1: Click to Play

1. Find the sound you want to play
2. Click on the sound card
3. The sound will play immediately

### Method 2: Use Hotkeys

1. Press the assigned hotkey (e.g., F1, F2, etc.)
2. The sound plays instantly
3. Works from any application (globally)

### During Playback

When a sound is playing:
- The card will glow/pulse
- A "Now Playing" bar appears at the bottom
- Progress is shown
- You can stop it anytime

### Stopping Sounds

| Action | How |
|--------|-----|
| **Stop One Sound** | Click the sound card again |
| **Stop All Sounds** | Click "⏹ STOP ALL" button |
| **Stop via Hotkey** | Press `Space` (default) |

---

## Setting Up Hotkeys

### Assigning a Hotkey

1. **Right-click** on any sound card
2. Select **"Edit Hotkey"** from the menu
3. A modal will appear asking you to press a key
4. **Press the key** you want to assign (F1-F12, A-Z, 0-9)
5. Click **"Save"**

### Best Hotkey Practices

| Recommended | Avoid |
|-------------|-------|
| F1 - F12 | Keys used for typing (A-Z) when gaming |
| Numpad keys | System shortcuts (Alt+Tab, Ctrl+C) |
| Uncommon letters (Q, X, Z) | Essential game controls |

### Managing Hotkeys

**View All Hotkeys:**
- Check the "ACTIVE HOTKEYS" section in the sidebar
- Shows all sounds with assigned hotkeys

**Clear a Hotkey:**
1. Right-click on the sound
2. Select "Edit Hotkey"
3. Click "Clear Hotkey"

### Global vs. Local Hotkeys

| Type | Description |
|------|-------------|
| **Global** | Works from any application, even when BrutalMod is minimized |
| **Local** | Only works when BrutalMod window is focused |

> ⚡ BrutalMod uses **Global Hotkeys** in the EXE version, so they work everywhere!

---

## Microphone Output Setup

### Why Do I Need This?

By default, sounds only play through your speakers. To make them play through your microphone (so others in Discord/games can hear), you need a **Virtual Audio Cable**.

### Step 1: Install VB-Cable

1. Go to [vb-audio.com/Cable](https://vb-audio.com/Cable/)
2. Download VB-Cable (it's free)
3. Run the installer
4. **Restart your PC** (important!)

### Step 2: Configure Windows Audio

1. Right-click the **speaker icon** in your taskbar
2. Click **"Sounds"** or **"Open Sound settings"**
3. Go to **"Playback"** tab
4. Find **"CABLE Input"**
5. Right-click and select **"Set as Default Device"**

### Step 3: Configure Your Voice App

**For Discord:**
```
1. Open Discord Settings (gear icon)
2. Go to Voice & Video
3. Input Device → Select "CABLE Output"
4. Done! Now BrutalMod sounds go to Discord
```

**For Zoom:**
```
1. Open Zoom Settings
2. Go to Audio
3. Microphone → Select "CABLE Output"
4. Done!
```

**For Games:**
```
1. Open game settings
2. Find Audio/Voice settings
3. Microphone/Input → Select "CABLE Output"
4. Save settings
```

### How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  BrutalMod  │ ──► │ CABLE Input │ ──► │CABLE Output │
│  (Sounds)   │     │ (Virtual)   │     │  (To Apps)  │
└─────────────┘     └─────────────┘     └─────────────┘
                                                │
                                                ▼
                                        ┌─────────────┐
                                        │   Discord   │
                                        │   Games     │
                                        │   Zoom      │
                                        └─────────────┘
```

### Using Your Real Mic + Sounds

To use your actual microphone AND play sounds:

1. Install **VB-Cable** (as above)
2. In your voice app, set microphone to "CABLE Output"
3. Use a tool like **VoiceMeeter** to mix your real mic with BrutalMod

Or simpler:
- Use a second device for voice chat
- Play sounds from your main PC

---

## Managing Your Library

> 📘 **See [ADDING_SOUNDS.md](https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/ADDING_SOUNDS.md) for complete details on library management!**

### Organizing Sounds

**Using Categories:**

1. Right-click on a sound
2. Select **"Edit"**
3. Choose a category:
   - 🔥 All
   - 😂 Memes
   - 💥 Effects
   - 🎵 Music
   - 🎮 Gaming

**Filter by Category:**
- Click on category chips at the top of the soundboard
- Only sounds in that category will show

### Editing Sound Properties

1. Right-click on a sound
2. Select **"Edit"**
3. Change:
   - **Name**: Custom display name
   - **Category**: Organization
   - **Volume**: Individual volume level
4. Click **"Save"**

### Deleting Sounds

1. Right-click on the sound
2. Select **"Edit"**
3. Click **"🗑️ Delete"**
4. Confirm deletion

### Exporting Your Config

To backup or share your setup:

1. Click **"📤 Export Config"** in the sidebar
2. Choose where to save the `.json` file
3. This saves:
   - All sound files (as base64)
   - Hotkey assignments
   - Volume settings
   - Categories

### Importing a Config

To load someone else's setup:

1. Click **"📥 Import Pack"** in the sidebar
2. Select the `.json` config file
3. All sounds and settings will be imported

---

## Settings & Configuration

### Accessing Settings

1. Click **"⚙️ Settings"** in the sidebar
2. The settings panel will open

### Audio Setup

| Setting | Description |
|---------|-------------|
| **Virtual Audio Cable** | Link to download VB-Cable |
| **Audio Output** | Select which device plays sounds |
| **Master Volume** | Overall volume control |

### Appearance

| Setting | Options |
|---------|---------|
| **Theme** | Dark (Brutal), Blood Red, Cyber Purple |
| **Animations** | Enable/disable UI animations |

### Hotkeys

| Setting | Description |
|---------|-------------|
| **Stop All Sounds** | Default: Escape key |
| **Custom Hotkeys** | View and manage all hotkeys |

### Data Management

| Action | Description |
|--------|-------------|
| **Export Configuration** | Save all settings and sounds |
| **Clear All Data** | Delete everything and start fresh |

---

## Troubleshooting

### Sound Not Playing Through Mic

**Symptoms:** Others can't hear your sounds in Discord/games

**Solutions:**

1. ✅ Verify VB-Cable is installed
2. ✅ Check Windows default playback is "CABLE Input"
3. ✅ Check your voice app input is "CABLE Output"
4. ✅ Restart your PC
5. ✅ Check BrutalMod master volume isn't muted

### No Sound at All

**Symptoms:** You can't hear anything

**Solutions:**

1. ✅ Check Windows system volume
2. ✅ Check BrutalMod master volume
3. ✅ Verify audio files are valid (play in another app)
4. ✅ Try a different output device in Settings
5. ✅ Restart BrutalMod

### Hotkeys Not Working

**Symptoms:** Pressing keys doesn't trigger sounds

**Solutions:**

1. ✅ Make sure BrutalMod is running (check system tray)
2. ✅ Verify hotkey is assigned (check sidebar list)
3. ✅ Check if another app is using that hotkey
4. ✅ Try a different hotkey
5. ✅ Run BrutalMod as Administrator

### App Won't Start

**Symptoms:** BrutalMod crashes or doesn't open

**Solutions:**

1. ✅ Restart your PC
2. ✅ Reinstall BrutalMod
3. ✅ Run as Administrator
4. ✅ Check Windows Defender isn't blocking it
5. ✅ Clear app data (uninstall and reinstall)

### "Unknown Publisher" Warning

**Why:** Code signing certificates cost $200-500/year, not feasible for a free app

**Solution:**
1. Click "More info"
2. Click "Run anyway"
3. The app is safe - source code is on GitHub

### High Memory Usage

**Solutions:**
1. Reduce number of loaded sounds
2. Use smaller audio files
3. Clear unused sounds
4. Restart the app periodically

---

## Tips & Tricks

### Performance Tips

| Tip | Benefit |
|-----|---------|
| Use MP3 instead of WAV | Smaller file size |
| Keep library under 100 sounds | Faster loading |
| Close unused apps | More RAM for BrutalMod |
| Use SSD | Faster sound loading |

### Gaming Tips

| Tip | How |
|-----|-----|
| **Don't conflict with game keys** | Use F-keys (F1-F12) for hotkeys |
| **Quick stop** | Set Space to stop all sounds |
| **Lower volume** | Keep master at 70-80% for headroom |
| **Test first** | Test sounds in a private Discord channel |

### Streaming Tips

| Tip | How |
|-----|-----|
| **Separate audio** | Route sounds differently for stream vs. game |
| **Sound alerts** | Use specific sounds for follower/sub alerts |
| **Hotkey planning** | Plan your hotkey layout before streaming |
| **Backup config** | Export config before major changes |

### Content Creation Tips

| Tip | How |
|-----|-----|
| **Organize by category** | Keep memes, effects, music separate |
| **Name sounds clearly** | Easy to find what you need |
| **Volume consistency** | Normalize all sounds to similar levels |
| **Export backup** | Regular backups of your config |

---

## FAQ

### General Questions

**Q: Is BrutalMod free?**
> A: Yes! 100% free and open source under MIT license.

**Q: Is BrutalMod safe?**
> A: Yes! The source code is available on GitHub. You can verify it yourself or build from source.

**Q: Does it work on Mac/Linux?**
> A: Currently optimized for Windows. Mac/Linux support may come in future versions.

**Q: Can I use this with any game?**
> A: Yes! Any game that supports voice chat will work with BrutalMod.

### Technical Questions

**Q: Why do I need VB-Cable?**
> A: Windows doesn't allow routing audio to microphone input by default. VB-Cable creates a virtual bridge.

**Q: How many sounds can I add?**
> A: There's no hard limit, but we recommend staying under 100 for optimal performance.

**Q: Can I use my real microphone AND BrutalMod?**
> A: You need a mixer tool like VoiceMeeter, or use a second device.

**Q: Where are my sounds saved?**
> A: Sounds are stored locally in the app's data folder and in localStorage.

### Troubleshooting Questions

**Q: Why does Windows say "Unknown Publisher"?**
> A: Code signing costs $200-500/year. We're a free open-source project. The app is safe.

**Q: My hotkeys stopped working. What do I do?**
> A: Restart BrutalMod and check if another app is using those keys.

**Q: Can other apps detect BrutalMod?**
> A: No, BrutalMod just plays audio. Other apps see it as regular audio output.

---

## Need More Help?

### Resources

| Resource | Link |
|----------|------|
| **GitHub Repository** | [github.com/brutal-45/Brutal-mod](https://github.com/brutal-45/Brutal-mod) |
| **Report Issues** | [GitHub Issues](https://github.com/brutal-45/Brutal-mod/issues) |
| **Source Code** | Available on GitHub |

### Support

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Search [GitHub Issues](https://github.com/brutal-45/Brutal-mod/issues)
3. Open a new issue with details about your problem

---

<div align="center">

**Made with ❤️ by [brutal-45](https://github.com/brutal-45)**

### 🏴 DEVELOPED UNDER BRUTALTOOLS 🏴

[GitHub](https://github.com/brutal-45/Brutal-mod) • [Issues](https://github.com/brutal-45/Brutal-mod/issues) • [Stargazers](https://github.com/brutal-45/Brutal-mod/stargazers)

</div>
