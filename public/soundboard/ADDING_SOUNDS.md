# 🎵 Adding & Managing Sounds - Complete Guide

> **Everything you need to know about adding, organizing, and managing your sound library in BrutalMod**

---

## 📋 Quick Navigation
 
1. [Adding Sounds](#-adding-sounds)
2. [Sound File Formats](#-sound-file-formats)
3. [Managing Your Sound Library](#-managing-your-sound-library)
4. [Editing Sounds](#-editing-sounds)
5. [Categories & Organization](#-categories--organization)
6. [Importing & Exporting](#-importing--exporting-sound-packs)
7. [Best Practices](#-best-practices)
8. [Troubleshooting](#-troubleshooting)

---

## ➕ Adding Sounds

### Method 1: Drag & Drop (Easiest!)

**The fastest way to add sounds:**

1. Open File Explorer (`Win + E`)
2. Navigate to your audio files folder
3. Select one or more audio files
4. **Drag** them onto the soundboard grid
5. **Drop** to add them instantly!

```
┌─────────────────────────────────────────┐
│                                         │
│   📁 File Explorer          BrutalMod   │
│   ┌──────────────┐          ┌─────────┐ │
│   │ 🎵 airhorn.mp3│  ─────►  │ + Add   │ │
│   │ 🎵 bruh.mp3   │          │ Sound   │ │
│   │ 🎵 vine.mp3   │          │ Here    │ │
│   └──────────────┘          └─────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

**Tips:**
- ✅ You can drag **multiple files at once** (hold `Ctrl` to select multiple)
- ✅ Works with **folders** too - all audio files inside will be added
- ✅ Files are **copied** to BrutalMod's library (original files stay in place)

---

### Method 2: Add Sound Button

**Step-by-step:**

1. Look at the **sidebar** on the left
2. Click the **"➕ Add Sound"** button
3. A file picker window opens
4. Navigate to your audio folder
5. Select one or more files
6. Click **"Open"**

```
Sidebar:
┌──────────────┐
│              │
│  💀 BRUTAL   │
│              │
│  ➕ Add Sound│  ← Click this
│  📥 Import   │
│  📤 Export   │
│              │
│  MASTER      │
│  VOLUME      │
│  ████████░░  │
│              │
└──────────────┘
```

---

### Method 3: Click Empty Pad

**For quick single additions:**

1. Find an **empty sound pad** (shows `+` icon)
2. **Click** on the empty pad
3. File picker opens
4. Select your audio file
5. Click **"Open"**

```
Empty Pads:
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│      │ │      │ │  +   │ │      │
│ 🎵   │ │ 🎵   │ │CLICK │ │ 🎵   │
│Sound │ │Sound │ │ HERE │ │Sound │
└──────┘ └──────┘ └──────┘ └──────┘
```

---

## 🎧 Sound File Formats

### Supported Formats

| Format | Extension | Quality | File Size | Recommended |
|--------|-----------|---------|-----------|-------------|
| **MP3** | `.mp3` | Good | Small | ⭐ **BEST** |
| **WAV** | `.wav` | Excellent | Large | ✅ Good |
| **OGG** | `.ogg` | Good | Small | ✅ Good |
| **M4A** | `.m4a` | Good | Small | ✅ Good |
| **FLAC** | `.flac` | Excellent | Large | ⚠️ Large files |
| **WEBM** | `.webm` | Good | Small | ✅ Good |

### Format Recommendations

```
🏆 RECOMMENDED: MP3
   - Smallest file size
   - Good quality for sound effects
   - Fast loading
   - Universal compatibility

⚠️ USE SPARINGLY: WAV, FLAC
   - Large file sizes
   - Longer loading times
   - Better quality (not noticeable for short sounds)

✅ GOOD ALTERNATIVES: OGG, M4A
   - Similar to MP3
   - Good compression
   - Fast loading
```

### Converting Audio Files

**If your file isn't supported, convert it:**

1. **Online (Free):**
   - [cloudconvert.com](https://cloudconvert.com)
   - [online-audio-converter.com](https://online-audio-converter.com)
   - [convertio.co](https://convertio.co)

2. **Software:**
   - [Audacity](https://www.audacityteam.org/) (Free)
   - [Format Factory](https://www.pcfreetime.com/) (Free)

---

## 📚 Managing Your Sound Library

### Viewing All Sounds

Your sounds appear in the **main grid area**:

```
┌───────────────────────────────────────────────────────┐
│  SOUNDBOARD                      🔍 Search  📂 Filter │
├───────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │   🎵     │  │   🎵     │  │   🎵     │            │
│  │  Airhorn │  │  Bruh    │  │  Vine    │            │
│  │  [F1]    │  │  [F2]    │  │  [F3]    │            │
│  │  🔊███░░ │  │  🔊████░ │  │  🔊██░░░ │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │   🎵     │  │   🎵     │  │   🎵     │            │
│  │  Quack   │  │  Wow     │  │  Sad     │            │
│  │  [F4]    │  │  [F5]    │  │  [F6]    │            │
│  │  🔊█████ │  │  🔊███░░ │  │  🔊████░ │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Sound Card Information

Each sound card shows:

| Element | Description |
|---------|-------------|
| **🎵 Icon** | Visual indicator |
| **Name** | Sound name (click to rename) |
| **[F-key]** | Assigned hotkey |
| **🔊 Bar** | Volume level indicator |

---

## ✏️ Editing Sounds

### Opening the Editor

**Right-click** on any sound card:

```
Right-click menu:
┌────────────────────┐
│ ▶️  Play           │
│ ✏️  Edit           │  ← Click this
│ ⌨️  Set Hotkey     │
│ 🗑️  Delete         │
└────────────────────┘
```

### Edit Options

```
┌─────────────────────────────────────────┐
│           ✏️ EDIT SOUND                 │
├─────────────────────────────────────────┤
│                                         │
│  Name:                                  │
│  ┌─────────────────────────────────┐   │
│  │ Airhorn Effect                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Category:                              │
│  ┌─────────────────────────────────┐   │
│  │ 🔥 Effects                    ▼ │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Volume:                                │
│  ◜──────────────────●─────────────◝    │
│  75%                                    │
│                                         │
│  Hotkey:                                │
│  ┌─────────────────────────────────┐   │
│  │ F1 (Click to change)            │   │
│  └─────────────────────────────────┘   │
│                                         │
│     ┌──────────┐    ┌──────────┐       │
│     │ 🗑️ Delete │    │ 💾 Save  │       │
│     └──────────┘    └──────────┘       │
│                                         │
└─────────────────────────────────────────┘
```

### What You Can Edit

| Property | Options |
|----------|---------|
| **Name** | Any custom name |
| **Category** | All, Memes, Effects, Music, Gaming |
| **Volume** | 0% - 100% |
| **Hotkey** | F1-F12, A-Z, 0-9, Numpad |

---

## 📂 Categories & Organization

### Available Categories

| Category | Icon | Description |
|----------|------|-------------|
| **All** | 🔥 | Shows all sounds |
| **Memes** | 😂 | Meme sounds, viral audio |
| **Effects** | 💥 | Sound effects, impacts, whooshes |
| **Music** | 🎵 | Music clips, intros, outros |
| **Gaming** | 🎮 | Game sounds, alerts |

### Assigning Categories

1. **Right-click** on a sound
2. Select **"Edit"**
3. Choose category from dropdown
4. Click **"Save"**

### Filtering by Category

Click on the **category chips** at the top of the soundboard:

```
┌───────────────────────────────────────────────────────┐
│  🔥 All  😂 Memes  💥 Effects  🎵 Music  🎮 Gaming   │
│    ↑                                                 │
│  Click to filter                                     │
└───────────────────────────────────────────────────────┘
```

### Organizing Tips

```
💡 BEST PRACTICES FOR ORGANIZATION:

1. NAME YOUR SOUNDS CLEARLY
   ❌ Bad:  "sound1.mp3", "untitled"
   ✅ Good: "Airhorn - Loud", "Bruh - Short"

2. USE CONSISTENT NAMING
   ✅ "Meme - Bruh"
   ✅ "Meme - Wow"
   ✅ "Effect - Explosion"

3. GROUP SIMILAR SOUNDS
   - Put all meme sounds in Memes category
   - Put gaming alerts in Gaming category
   - Put music clips in Music category

4. VOLUME NORMALIZE
   - Keep all sounds at similar volume levels
   - Prevents loud sounds from surprising you
```

---

## 📦 Importing & Exporting Sound Packs

### Exporting Your Sound Pack

**Share your setup with friends:**

1. Click **"📤 Export Pack"** in the sidebar
2. Choose where to save the file
3. Name your pack (e.g., "MyMemePack.json")
4. Click **"Save"**

**What gets exported:**
- ✅ All sound files
- ✅ Sound names
- ✅ Categories
- ✅ Hotkey assignments
- ✅ Volume settings

### Importing a Sound Pack

**Load someone else's setup:**

1. Get the `.json` pack file
2. Click **"📥 Import Pack"** in the sidebar
3. Navigate to the pack file
4. Select it and click **"Open"**
5. All sounds will be added!

```
⚠️ NOTE: Importing ADDS sounds to your library.
   It does NOT replace your existing sounds.
```

### Creating Shareable Packs

**For content creators and communities:**

1. **Organize** your sounds into categories
2. **Name** all sounds clearly
3. **Set** consistent volumes
4. **Assign** recommended hotkeys
5. **Export** the pack
6. **Share** the `.json` file

---

## 💡 Best Practices

### Sound Quality Tips

| Tip | Why |
|-----|-----|
| Use **MP3** format | Smallest size, good quality |
| Keep sounds **under 30 seconds** | Faster loading, less memory |
| **Normalize volume** | Consistent playback levels |
| Remove **silence** from start/end | Instant playback |

### Performance Tips

| Recommendation | Benefit |
|----------------|---------|
| Keep under **100 sounds** | Faster app loading |
| Use **compressed formats** | Less memory usage |
| **Remove unused sounds** | Cleaner library |
| **Export backup** | Don't lose your setup |

### Gaming Setup Tips

```
🎮 RECOMMENDED GAMING SETUP:

Hotkey Layout:
┌─────────────────────────────┐
│  F1  F2  F3  F4  │  Memes
│  F5  F6  F7  F8  │  Effects
│  F9  F10 F11 F12 │  Music
└─────────────────────────────┘

⚠️ Avoid:
- Keys used for game controls (WASD)
- Keys used for other apps
- Common shortcuts (Ctrl+C, Alt+Tab)

✅ Best:
- F-keys (F1-F12)
- Numpad keys
- Uncommon letters (Q, X, Z)
```

### Streaming Setup Tips

```
🎬 FOR STREAMERS:

1. ORGANIZE BY PURPOSE:
   - "Follow Alert" sounds
   - "Sub Alert" sounds  
   - "Donation" sounds
   - "Just for fun" sounds

2. VOLUME LEVELS:
   - Alert sounds: 80-100%
   - Background music: 30-50%
   - Effect sounds: 60-80%

3. HOTKEY PLANNING:
   - Write down your hotkey layout
   - Keep a reference nearby
   - Test before going live
```

---

## 🔧 Troubleshooting

### Sound Not Adding

**Problem:** Sound file won't add to soundboard

**Solutions:**

1. ✅ Check file format (must be MP3, WAV, OGG, M4A, FLAC, or WEBM)
2. ✅ Check file isn't corrupted (try playing in another app)
3. ✅ Check file size isn't too large (under 50MB recommended)
4. ✅ Restart BrutalMod and try again
5. ✅ Try a different file

### Sound Not Playing

**Problem:** Sound added but won't play

**Solutions:**

1. ✅ Check master volume isn't muted
2. ✅ Check individual sound volume
3. ✅ Check Windows system volume
4. ✅ Try clicking the sound again
5. ✅ Remove and re-add the sound

### Sound Sounds Distorted

**Problem:** Audio quality is poor or distorted

**Solutions:**

1. ✅ Lower the sound volume in edit menu
2. ✅ Lower master volume
3. ✅ Check original file quality
4. ✅ Re-convert the file to MP3
5. ✅ Check Windows audio drivers

### Sound Files Disappeared

**Problem:** Sounds are missing from library

**Solutions:**

1. ✅ Check if you're filtering by category
2. ✅ Click "All" category to show all sounds
3. ✅ Import your backup pack
4. ✅ Check app data folder for saved files

### Can't Delete Sounds

**Problem:** Delete button not working

**Solutions:**

1. ✅ Right-click → Edit → Delete
2. ✅ Restart BrutalMod
3. ✅ Clear app data and re-import

---

## 📝 Quick Reference Card

```
╔═══════════════════════════════════════════════════════════╗
║           BRUTALMOD SOUND MANAGEMENT CHEATSHEET           ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  ADD SOUNDS:                                              ║
║  • Drag & Drop files onto grid                           ║
║  • Click "➕ Add Sound" button                           ║
║  • Click empty pad (+)                                   ║
║                                                           ║
║  EDIT SOUNDS:                                             ║
║  • Right-click → Edit                                    ║
║                                                           ║
║  DELETE SOUNDS:                                           ║
║  • Right-click → Edit → Delete                           ║
║                                                           ║
║  FORMATS: MP3, WAV, OGG, M4A, FLAC, WEBM                 ║
║                                                           ║
║  CATEGORIES: 🔥All 😂Memes 💥Effects 🎵Music 🎮Gaming    ║
║                                                           ║
║  EXPORT: Click "📤 Export Pack"                          ║
║  IMPORT: Click "📥 Import Pack"                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

---

<div align="center">

**Made with ❤️ by [brutal-45](https://github.com/brutal-45)**

### 🏴 DEVELOPED UNDER BRUTALTOOLS 🏴

[GitHub](https://github.com/brutal-45/Brutal-mod) • [Issues](https://github.com/brutal-45/Brutal-mod/issues) • [Guide](https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/GUIDE.md)

</div>
