const { app, BrowserWindow, globalShortcut, ipcMain, dialog, Menu } = require('electron'); 
const path = require('path');
const fs = require('fs');

let mainWindow;
let soundHotkeys = {};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#0a0a0a',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Register global hotkey for stopping all sounds
  globalShortcut.register('Space', () => {
    if (mainWindow) {
      mainWindow.webContents.send('stop-all-sounds');
    }
  });
}

// Handle custom window controls
ipcMain.on('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window-close', () => {
  if (mainWindow) mainWindow.close();
});

// Handle file selection
ipcMain.handle('select-audio-files', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'webm'] }
    ]
  });
  
  if (result.canceled) return [];
  
  const files = [];
  for (const filePath of result.filePaths) {
    try {
      const buffer = fs.readFileSync(filePath);
      const base64 = buffer.toString('base64');
      const ext = path.extname(filePath).toLowerCase();
      let mimeType = 'audio/mpeg';
      
      if (ext === '.wav') mimeType = 'audio/wav';
      else if (ext === '.ogg') mimeType = 'audio/ogg';
      else if (ext === '.m4a') mimeType = 'audio/mp4';
      else if (ext === '.flac') mimeType = 'audio/flac';
      else if (ext === '.webm') mimeType = 'audio/webm';
      
      files.push({
        name: path.basename(filePath),
        path: filePath,
        data: `data:${mimeType};base64,${base64}`
      });
    } catch (err) {
      console.error('Error reading file:', filePath, err);
    }
  }
  
  return files;
});

// Handle hotkey registration
ipcMain.on('register-hotkey', (event, { hotkey, soundId }) => {
  try {
    // Unregister if already registered
    if (soundHotkeys[hotkey]) {
      globalShortcut.unregister(hotkey);
    }
    
    // Register new hotkey
    const success = globalShortcut.register(hotkey, () => {
      if (mainWindow) {
        mainWindow.webContents.send('play-sound', soundId);
      }
    });
    
    if (success) {
      soundHotkeys[hotkey] = soundId;
      event.reply('hotkey-registered', { hotkey, soundId, success: true });
    } else {
      event.reply('hotkey-registered', { hotkey, soundId, success: false });
    }
  } catch (err) {
    console.error('Error registering hotkey:', err);
    event.reply('hotkey-registered', { hotkey, soundId, success: false });
  }
});

// Handle hotkey unregistration
ipcMain.on('unregister-hotkey', (event, hotkey) => {
  try {
    if (soundHotkeys[hotkey]) {
      globalShortcut.unregister(hotkey);
      delete soundHotkeys[hotkey];
    }
    event.reply('hotkey-unregistered', { hotkey, success: true });
  } catch (err) {
    console.error('Error unregistering hotkey:', err);
    event.reply('hotkey-unregistered', { hotkey, success: false });
  }
});

// Handle config export
ipcMain.handle('export-config', async (event, config) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: 'brutalmod-config.json',
    filters: [
      { name: 'JSON', extensions: ['json'] }
    ]
  });
  
  if (result.canceled) return false;
  
  try {
    fs.writeFileSync(result.filePath, JSON.stringify(config, null, 2));
    return true;
  } catch (err) {
    console.error('Error exporting config:', err);
    return false;
  }
});

// Handle config import
ipcMain.handle('import-config', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'JSON', extensions: ['json'] }
    ]
  });
  
  if (result.canceled) return null;
  
  try {
    const content = fs.readFileSync(result.filePaths[0], 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error importing config:', err);
    return null;
  }
});

// Get app version
ipcMain.handle('get-version', () => {
  return app.getVersion();
});

// App ready
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Re-register shortcuts on focus
app.on('browser-window-focus', () => {
  // Shortcuts should still work, but this ensures they're active
});
