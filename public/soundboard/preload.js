const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),
  
  // File operations
  selectAudioFiles: () => ipcRenderer.invoke('select-audio-files'),
  
  // Hotkey management
  registerHotkey: (hotkey, soundId) => {
    ipcRenderer.send('register-hotkey', { hotkey, soundId });
  },
  unregisterHotkey: (hotkey) => {
    ipcRenderer.send('unregister-hotkey', hotkey);
  },
  onHotkeyRegistered: (callback) => {
    ipcRenderer.on('hotkey-registered', (event, data) => callback(data));
  },
  onHotkeyUnregistered: (callback) => {
    ipcRenderer.on('hotkey-unregistered', (event, data) => callback(data));
  },
  
  // Sound events from main process
  onPlaySound: (callback) => {
    ipcRenderer.on('play-sound', (event, soundId) => callback(soundId));
  },
  onStopAllSounds: (callback) => {
    ipcRenderer.on('stop-all-sounds', () => callback());
  },
  
  // Config management
  exportConfig: (config) => ipcRenderer.invoke('export-config', config),
  importConfig: () => ipcRenderer.invoke('import-config'),
  
  // App info
  getVersion: () => ipcRenderer.invoke('get-version')
});
