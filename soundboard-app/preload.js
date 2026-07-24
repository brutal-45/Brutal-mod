const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to renderer
contextBridge.exposeInMainWorld('electron', {
    // Window controls
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),  
    close: () => ipcRenderer.send('window-close'),
    
    // Platform info
    platform: process.platform,
    
    // Listen for global events
    onGlobalStop: (callback) => {
        ipcRenderer.on('global-stop', callback);
    }
});
