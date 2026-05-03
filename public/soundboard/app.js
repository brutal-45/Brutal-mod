// BrutalMod - Professional Soundboard Application
// Version 1.0.0 - https://github.com/brutal-45/Brutal-mod

class BrutalMod {
  constructor() {
    this.sounds = [];
    this.currentlyPlaying = [];
    this.masterVolume = 0.8;
    this.currentCategory = 'all';
    this.audioContext = null;
    this.editingSoundId = null;
    this.searchQuery = '';
    this.isLooping = false;
    this.loopingSoundId = null;
    
    this.init();
  }
  
  async init() {
    // Load saved data
    this.loadFromStorage();
    
    // Initialize audio context
    this.initAudio();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Setup Electron IPC
    this.setupElectronIPC();
    
    // Render UI
    this.renderSounds();
    this.updateHotkeysList();
    this.updateVersion();
    this.updateStats();
    
    // Restore hotkeys
    this.restoreHotkeys();
    
    console.log('🎵 BrutalMod initialized!');
  }
  
  initAudio() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.error('AudioContext not supported:', e);
    }
  }
  
  setupEventListeners() {
    // Window controls
    document.getElementById('minimize-btn')?.addEventListener('click', () => {
      if (window.electronAPI) window.electronAPI.minimizeWindow();
    });
    
    document.getElementById('maximize-btn')?.addEventListener('click', () => {
      if (window.electronAPI) window.electronAPI.maximizeWindow();
    });
    
    document.getElementById('close-btn')?.addEventListener('click', () => {
      if (window.electronAPI) window.electronAPI.closeWindow();
    });
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        this.switchView(view);
      });
    });
    
    // Add sound button
    document.getElementById('add-sound-btn')?.addEventListener('click', () => {
      this.selectAudioFiles();
    });
    
    // Search input
    document.getElementById('search-input')?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderSounds();
    });
    
    // Import/Export
    document.getElementById('import-btn')?.addEventListener('click', () => {
      this.importConfig();
    });
    
    document.getElementById('export-btn')?.addEventListener('click', () => {
      this.exportConfig();
    });
    
    // Settings buttons
    document.getElementById('export-config-btn')?.addEventListener('click', () => {
      this.exportConfig();
    });
    
    document.getElementById('import-config-btn')?.addEventListener('click', () => {
      this.importConfig();
    });
    
    document.getElementById('clear-data-btn')?.addEventListener('click', () => {
      this.clearAllData();
    });
    
    // Master volume
    document.getElementById('master-volume')?.addEventListener('input', (e) => {
      this.masterVolume = e.target.value / 100;
      document.getElementById('volume-value').textContent = `${e.target.value}%`;
      this.saveToStorage();
      
      // Update all playing sounds
      this.currentlyPlaying.forEach(p => {
        const sound = this.sounds.find(s => s.id === p.soundId);
        if (sound && p.audio) {
          p.audio.volume = (sound.volume / 100) * this.masterVolume;
        }
      });
    });
    
    // Stop all
    document.getElementById('stop-all-btn')?.addEventListener('click', () => {
      this.stopAllSounds();
    });
    
    // Loop toggle
    document.getElementById('loop-toggle')?.addEventListener('click', (e) => {
      this.isLooping = e.target.checked;
      this.showToast(this.isLooping ? 'Loop enabled' : 'Loop disabled', 'info');
    });
    
    // Category chips
    document.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentCategory = chip.dataset.category;
        this.renderSounds();
      });
    });
    
    // Modal controls
    document.getElementById('modal-close')?.addEventListener('click', () => {
      this.closeModal();
    });
    
    document.getElementById('cancel-edit-btn')?.addEventListener('click', () => {
      this.closeModal();
    });
    
    document.getElementById('save-edit-btn')?.addEventListener('click', () => {
      this.saveSoundEdit();
    });
    
    document.getElementById('delete-sound-btn')?.addEventListener('click', () => {
      this.deleteSound();
    });
    
    document.getElementById('clear-hotkey-btn')?.addEventListener('click', () => {
      document.getElementById('edit-hotkey').value = '';
    });
    
    // Edit volume slider
    document.getElementById('edit-volume')?.addEventListener('input', (e) => {
      document.getElementById('edit-volume-value').textContent = `${e.target.value}%`;
    });
    
    // Hotkey input
    document.getElementById('edit-hotkey')?.addEventListener('keydown', (e) => {
      e.preventDefault();
      const validKeys = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        '0','1','2','3','4','5','6','7','8','9',
        'NUMPAD0','NUMPAD1','NUMPAD2','NUMPAD3','NUMPAD4','NUMPAD5','NUMPAD6','NUMPAD7','NUMPAD8','NUMPAD9'];
      
      if (validKeys.includes(e.key.toUpperCase())) {
        document.getElementById('edit-hotkey').value = e.key.toUpperCase();
      }
    });
    
    // Drag and drop
    const soundGrid = document.getElementById('sound-grid');
    
    document.body.addEventListener('dragover', (e) => {
      e.preventDefault();
      document.body.classList.add('drag-over');
    });
    
    document.body.addEventListener('dragleave', (e) => {
      if (!e.relatedTarget || !document.body.contains(e.relatedTarget)) {
        document.body.classList.remove('drag-over');
      }
    });
    
    document.body.addEventListener('drop', (e) => {
      e.preventDefault();
      document.body.classList.remove('drag-over');
      
      const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('audio/') || 
        ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'webm'].includes(file.name.split('.').pop().toLowerCase())
      );
      
      if (files.length > 0) {
        this.processFiles(files);
      }
    });
    
    // Click on empty grid to add sound
    soundGrid?.addEventListener('click', (e) => {
      if (e.target.closest('.sound-card') || e.target.closest('.empty-state')) return;
      this.selectAudioFiles();
    });
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Space to stop all
      if (e.code === 'Space' && !e.target.closest('input, textarea, select')) {
        e.preventDefault();
        this.stopAllSounds();
      }
      
      // Escape to close modal
      if (e.code === 'Escape') {
        this.closeModal();
      }
    });
    
    // Modal overlay click to close
    document.getElementById('edit-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'edit-modal') {
        this.closeModal();
      }
    });
  }
  
  setupElectronIPC() {
    if (!window.electronAPI) return;
    
    // Play sound event from main process (hotkey triggered)
    window.electronAPI.onPlaySound((soundId) => {
      this.playSound(soundId);
    });
    
    // Stop all sounds event
    window.electronAPI.onStopAllSounds(() => {
      this.stopAllSounds();
    });
    
    // Hotkey registration result
    window.electronAPI.onHotkeyRegistered((data) => {
      if (!data.success) {
        this.showToast(`Failed to register hotkey: ${data.hotkey}`, 'error');
      }
    });
  }
  
  async selectAudioFiles() {
    if (!window.electronAPI) {
      // Fallback for browser
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = 'audio/*,.mp3,.wav,.ogg,.m4a,.flac,.webm';
      
      input.onchange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
          await this.processFiles(files);
        }
      };
      
      input.click();
      return;
    }
    
    const files = await window.electronAPI.selectAudioFiles();
    if (files && files.length > 0) {
      for (const file of files) {
        this.addSound(file.name, file.data);
      }
    }
  }
  
  async processFiles(files) {
    this.showToast(`Adding ${files.length} file(s)...`, 'info');
    
    for (const file of files) {
      try {
        const data = await this.readFileAsDataURL(file);
        this.addSound(file.name, data);
      } catch (err) {
        console.error('Error processing file:', file.name, err);
        this.showToast(`Failed to load: ${file.name}`, 'error');
      }
    }
  }
  
  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  addSound(name, data, category = 'all', hotkey = '', volume = 100) {
    const sound = {
      id: this.generateId(),
      name: name.replace(/\.[^/.]+$/, ''), // Remove extension
      data: data,
      category: category,
      hotkey: hotkey,
      volume: volume,
      addedAt: Date.now(),
      playCount: 0
    };
    
    this.sounds.push(sound);
    this.saveToStorage();
    this.renderSounds();
    this.updateHotkeysList();
    this.updateStats();
    this.showToast(`Added: ${sound.name}`, 'success');
    
    return sound;
  }
  
  playSound(soundId, fromHotkey = false) {
    const sound = this.sounds.find(s => s.id === soundId);
    if (!sound) return;
    
    // Stop if already playing
    const existingIndex = this.currentlyPlaying.findIndex(p => p.soundId === soundId);
    if (existingIndex !== -1) {
      const existing = this.currentlyPlaying[existingIndex];
      existing.audio.pause();
      existing.audio.currentTime = 0;
      this.currentlyPlaying.splice(existingIndex, 1);
      this.updateNowPlaying();
      this.updateSoundCardState(soundId, false);
      return;
    }
    
    // Create audio element
    const audio = new Audio(sound.data);
    audio.volume = (sound.volume / 100) * this.masterVolume;
    audio.loop = this.isLooping;
    
    // Play the audio
    audio.play().catch(err => {
      console.error('Error playing sound:', err);
      this.showToast('Failed to play sound', 'error');
      return;
    });
    
    // Track playing sound
    const playingSound = {
      soundId: soundId,
      audio: audio
    };
    this.currentlyPlaying.push(playingSound);
    
    // Update play count
    sound.playCount = (sound.playCount || 0) + 1;
    this.saveToStorage();
    
    // Update UI
    this.updateNowPlaying();
    this.updateSoundCardState(soundId, true);
    
    // Handle audio end
    audio.onended = () => {
      const index = this.currentlyPlaying.findIndex(p => p.soundId === soundId);
      if (index !== -1) {
        this.currentlyPlaying.splice(index, 1);
      }
      this.updateNowPlaying();
      this.updateSoundCardState(soundId, false);
    };
    
    // Update progress bar
    audio.ontimeupdate = () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        this.updateProgressBar(progress, audio.currentTime, audio.duration);
      }
    };
  }
  
  stopAllSounds() {
    if (this.currentlyPlaying.length === 0) {
      this.showToast('No sounds playing', 'info');
      return;
    }
    
    this.currentlyPlaying.forEach(p => {
      p.audio.pause();
      p.audio.currentTime = 0;
      p.audio.loop = false;
      this.updateSoundCardState(p.soundId, false);
    });
    this.currentlyPlaying = [];
    this.updateNowPlaying();
    this.showToast('Stopped all sounds', 'info');
  }
  
  updateSoundCardState(soundId, isPlaying) {
    const card = document.querySelector(`[data-sound-id="${soundId}"]`);
    if (card) {
      card.classList.toggle('playing', isPlaying);
    }
  }
  
  updateNowPlaying() {
    const npBar = document.getElementById('now-playing');
    const npTitle = document.getElementById('np-title');
    
    if (this.currentlyPlaying.length > 0) {
      const sound = this.sounds.find(s => s.id === this.currentlyPlaying[0].soundId);
      npTitle.textContent = sound ? `🎵 ${sound.name}` : 'Playing...';
      npBar.classList.add('visible');
    } else {
      npTitle.textContent = 'No sound playing';
      npBar.classList.remove('visible');
    }
  }
  
  updateProgressBar(progress, current, duration) {
    const progressBar = document.getElementById('np-progress-bar');
    const npTime = document.getElementById('np-time');
    
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    
    if (npTime && current !== undefined && duration !== undefined) {
      const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, '0')}`;
      };
      npTime.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    }
  }
  
  updateStats() {
    const totalSounds = document.getElementById('total-sounds');
    const totalHotkeys = document.getElementById('total-hotkeys');
    const totalPlays = document.getElementById('total-plays');
    
    if (totalSounds) totalSounds.textContent = this.sounds.length;
    if (totalHotkeys) totalHotkeys.textContent = this.sounds.filter(s => s.hotkey).length;
    if (totalPlays) totalPlays.textContent = this.sounds.reduce((sum, s) => sum + (s.playCount || 0), 0);
  }
  
  renderSounds() {
    const grid = document.getElementById('sound-grid');
    if (!grid) return;
    
    // Filter by category and search
    let filteredSounds = this.sounds;
    
    if (this.currentCategory !== 'all') {
      filteredSounds = filteredSounds.filter(s => s.category === this.currentCategory);
    }
    
    if (this.searchQuery) {
      filteredSounds = filteredSounds.filter(s => 
        s.name.toLowerCase().includes(this.searchQuery)
      );
    }
    
    // Sort by name
    filteredSounds.sort((a, b) => a.name.localeCompare(b.name));
    
    // Clear grid
    grid.innerHTML = '';
    
    if (filteredSounds.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" id="empty-state">
          <div class="empty-icon">🎵</div>
          <h3>${this.searchQuery ? 'No sounds found' : 'No sounds yet'}</h3>
          <p>${this.searchQuery ? 'Try a different search term' : 'Drag audio files here or click "Add Sound"'}</p>
          <p class="supported-formats">Supported: MP3, WAV, OGG, M4A, FLAC, WEBM</p>
        </div>
      `;
      return;
    }
    
    // Render sound cards
    filteredSounds.forEach(sound => {
      const card = document.createElement('div');
      card.className = 'sound-card';
      card.dataset.soundId = sound.id;
      card.dataset.category = sound.category;
      
      const isPlaying = this.currentlyPlaying.some(p => p.soundId === sound.id);
      if (isPlaying) card.classList.add('playing');
      
      card.innerHTML = `
        ${sound.hotkey ? `<span class="sound-hotkey">${sound.hotkey}</span>` : ''}
        <button class="sound-card-menu" data-action="menu" title="Menu">⋮</button>
        <span class="sound-icon">🎵</span>
        <span class="sound-name" title="${this.escapeHtml(sound.name)}">${this.escapeHtml(sound.name)}</span>
        <div class="sound-volume">
          <div class="sound-volume-bar" style="width: ${sound.volume}%"></div>
        </div>
        ${sound.playCount ? `<span class="play-count" title="Played ${sound.playCount} times">${sound.playCount} plays</span>` : ''}
      `;
      
      // Play on click
      card.addEventListener('click', (e) => {
        if (e.target.closest('.sound-card-menu')) return;
        this.playSound(sound.id);
      });
      
      // Menu button
      card.querySelector('.sound-card-menu')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showContextMenu(sound.id, e);
      });
      
      // Right click to edit
      card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this.openEditModal(sound.id);
      });
      
      grid.appendChild(card);
    });
  }
  
  showContextMenu(soundId, event) {
    // For now, just open edit modal
    this.openEditModal(soundId);
  }
  
  openEditModal(soundId) {
    const sound = this.sounds.find(s => s.id === soundId);
    if (!sound) return;
    
    this.editingSoundId = soundId;
    
    document.getElementById('edit-sound-id').value = soundId;
    document.getElementById('edit-name').value = sound.name;
    document.getElementById('edit-category').value = sound.category;
    document.getElementById('edit-hotkey').value = sound.hotkey || '';
    document.getElementById('edit-volume').value = sound.volume;
    document.getElementById('edit-volume-value').textContent = `${sound.volume}%`;
    
    document.getElementById('edit-modal').classList.add('active');
    document.getElementById('edit-name').focus();
  }
  
  closeModal() {
    document.getElementById('edit-modal')?.classList.remove('active');
    this.editingSoundId = null;
  }
  
  saveSoundEdit() {
    const soundId = document.getElementById('edit-sound-id')?.value;
    const sound = this.sounds.find(s => s.id === soundId);
    if (!sound) return;
    
    const oldHotkey = sound.hotkey;
    
    // Update sound properties
    sound.name = document.getElementById('edit-name')?.value || sound.name;
    sound.category = document.getElementById('edit-category')?.value || 'all';
    sound.hotkey = document.getElementById('edit-hotkey')?.value.toUpperCase() || '';
    sound.volume = parseInt(document.getElementById('edit-volume')?.value) || 100;
    
    // Handle hotkey change
    if (oldHotkey !== sound.hotkey) {
      // Unregister old hotkey
      if (oldHotkey && window.electronAPI) {
        window.electronAPI.unregisterHotkey(oldHotkey);
      }
      
      // Register new hotkey
      if (sound.hotkey && window.electronAPI) {
        window.electronAPI.registerHotkey(sound.hotkey, sound.id);
      }
    }
    
    this.saveToStorage();
    this.renderSounds();
    this.updateHotkeysList();
    this.updateStats();
    this.closeModal();
    this.showToast('Sound updated', 'success');
  }
  
  deleteSound() {
    if (!this.editingSoundId) return;
    
    const sound = this.sounds.find(s => s.id === this.editingSoundId);
    if (!sound) return;
    
    // Unregister hotkey
    if (sound.hotkey && window.electronAPI) {
      window.electronAPI.unregisterHotkey(sound.hotkey);
    }
    
    // Stop if playing
    const playingIndex = this.currentlyPlaying.findIndex(p => p.soundId === this.editingSoundId);
    if (playingIndex !== -1) {
      this.currentlyPlaying[playingIndex].audio.pause();
      this.currentlyPlaying.splice(playingIndex, 1);
    }
    
    // Remove from array
    this.sounds = this.sounds.filter(s => s.id !== this.editingSoundId);
    
    this.saveToStorage();
    this.renderSounds();
    this.updateHotkeysList();
    this.updateStats();
    this.closeModal();
    this.showToast('Sound deleted', 'success');
  }
  
  updateHotkeysList() {
    const list = document.getElementById('hotkeys-list');
    if (!list) return;
    
    const soundsWithHotkeys = this.sounds.filter(s => s.hotkey);
    
    if (soundsWithHotkeys.length === 0) {
      list.innerHTML = '<p class="empty-text">No hotkeys assigned</p>';
      return;
    }
    
    list.innerHTML = soundsWithHotkeys.map(sound => `
      <div class="hotkey-item" data-sound-id="${sound.id}">
        <span class="hotkey-key">${sound.hotkey}</span>
        <span class="hotkey-name" title="${this.escapeHtml(sound.name)}">${this.escapeHtml(sound.name)}</span>
        <button class="hotkey-play" title="Play">▶</button>
      </div>
    `).join('');
    
    // Add click handlers
    list.querySelectorAll('.hotkey-item').forEach(item => {
      const soundId = item.dataset.soundId;
      item.querySelector('.hotkey-play')?.addEventListener('click', () => {
        this.playSound(soundId);
      });
    });
  }
  
  async restoreHotkeys() {
    if (!window.electronAPI) return;
    
    for (const sound of this.sounds) {
      if (sound.hotkey) {
        window.electronAPI.registerHotkey(sound.hotkey, sound.id);
        await new Promise(r => setTimeout(r, 50));
      }
    }
  }
  
  switchView(viewName) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewName);
    });
    
    // Update views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.toggle('active', view.id === `${viewName}-view`);
    });
    
    // Render library if switching to it
    if (viewName === 'library') {
      this.renderLibrary();
    }
  }
  
  renderLibrary() {
    const list = document.getElementById('library-list');
    if (!list) return;
    
    if (this.sounds.length === 0) {
      list.innerHTML = '<p class="empty-text">No sounds in library</p>';
      return;
    }
    
    // Sort by name
    const sorted = [...this.sounds].sort((a, b) => a.name.localeCompare(b.name));
    
    list.innerHTML = sorted.map(sound => `
      <div class="library-item" data-sound-id="${sound.id}">
        <span class="library-item-icon">🎵</span>
        <div class="library-item-info">
          <div class="library-item-name">${this.escapeHtml(sound.name)}</div>
          <div class="library-item-meta">
            ${sound.hotkey ? `<span class="meta-hotkey">${sound.hotkey}</span>` : ''}
            <span>Vol: ${sound.volume}%</span>
            <span>${sound.playCount || 0} plays</span>
          </div>
        </div>
        <div class="library-item-actions">
          <button class="action-btn small" data-action="play">▶ Play</button>
          <button class="action-btn small" data-action="edit">✏ Edit</button>
          <button class="action-btn small danger" data-action="delete">🗑</button>
        </div>
      </div>
    `).join('');
    
    // Add event listeners
    list.querySelectorAll('.library-item').forEach(item => {
      const soundId = item.dataset.soundId;
      
      item.querySelector('[data-action="play"]')?.addEventListener('click', () => {
        this.playSound(soundId);
      });
      
      item.querySelector('[data-action="edit"]')?.addEventListener('click', () => {
        this.openEditModal(soundId);
      });
      
      item.querySelector('[data-action="delete"]')?.addEventListener('click', () => {
        this.editingSoundId = soundId;
        this.deleteSound();
      });
    });
  }
  
  async exportConfig() {
    const config = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      sounds: this.sounds.map(s => ({
        id: s.id,
        name: s.name,
        data: s.data,
        category: s.category,
        hotkey: s.hotkey,
        volume: s.volume,
        playCount: s.playCount
      })),
      masterVolume: this.masterVolume
    };
    
    if (window.electronAPI) {
      const success = await window.electronAPI.exportConfig(config);
      if (success) {
        this.showToast('Config exported!', 'success');
      } else {
        this.showToast('Export cancelled', 'info');
      }
    } else {
      // Browser fallback
      const dataStr = JSON.stringify(config, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `brutalmod-config-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('Config exported!', 'success');
    }
  }
  
  async importConfig() {
    let config = null;
    
    if (window.electronAPI) {
      config = await window.electronAPI.importConfig();
    } else {
      // Browser fallback
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      config = await new Promise((resolve) => {
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (!file) {
            resolve(null);
            return;
          }
          
          try {
            const text = await file.text();
            resolve(JSON.parse(text));
          } catch (err) {
            console.error('Error parsing config:', err);
            resolve(null);
          }
        };
        
        input.click();
      });
    }
    
    if (!config) {
      this.showToast('Import cancelled', 'info');
      return;
    }
    
    // Validate config
    if (!config.sounds || !Array.isArray(config.sounds)) {
      this.showToast('Invalid config file', 'error');
      return;
    }
    
    // Import sounds
    const existingIds = new Set(this.sounds.map(s => s.id));
    let imported = 0;
    
    for (const s of config.sounds) {
      if (!s.data) continue; // Skip sounds without data
      
      const newId = existingIds.has(s.id) ? this.generateId() : s.id;
      this.sounds.push({
        id: newId,
        name: s.name || 'Unknown',
        data: s.data,
        category: s.category || 'all',
        hotkey: s.hotkey || '',
        volume: s.volume !== undefined ? s.volume : 100,
        playCount: s.playCount || 0
      });
      imported++;
    }
    
    // Import master volume
    if (config.masterVolume !== undefined) {
      this.masterVolume = config.masterVolume;
      const masterVol = document.getElementById('master-volume');
      const volValue = document.getElementById('volume-value');
      if (masterVol) masterVol.value = this.masterVolume * 100;
      if (volValue) volValue.textContent = `${Math.round(this.masterVolume * 100)}%`;
    }
    
    this.saveToStorage();
    this.renderSounds();
    this.updateHotkeysList();
    this.updateStats();
    this.restoreHotkeys();
    this.showToast(`Imported ${imported} sounds!`, 'success');
  }
  
  clearAllData() {
    if (!confirm('Are you sure you want to delete ALL sounds and settings?\n\nThis cannot be undone!')) {
      return;
    }
    
    // Stop all sounds
    this.stopAllSounds();
    
    // Unregister all hotkeys
    if (window.electronAPI) {
      this.sounds.forEach(sound => {
        if (sound.hotkey) {
          window.electronAPI.unregisterHotkey(sound.hotkey);
        }
      });
    }
    
    // Clear data
    this.sounds = [];
    this.masterVolume = 0.8;
    
    const masterVol = document.getElementById('master-volume');
    const volValue = document.getElementById('volume-value');
    if (masterVol) masterVol.value = 80;
    if (volValue) volValue.textContent = '80%';
    
    this.saveToStorage();
    this.renderSounds();
    this.updateHotkeysList();
    this.updateStats();
    this.showToast('All data cleared', 'success');
  }
  
  saveToStorage() {
    try {
      const data = {
        sounds: this.sounds,
        masterVolume: this.masterVolume
      };
      localStorage.setItem('brutalmod-data', JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to storage:', e);
      
      // Handle quota exceeded
      if (e.name === 'QuotaExceededError') {
        this.showToast('Storage full! Remove some sounds.', 'error');
      }
    }
  }
  
  loadFromStorage() {
    try {
      const data = localStorage.getItem('brutalmod-data');
      if (data) {
        const parsed = JSON.parse(data);
        this.sounds = parsed.sounds || [];
        this.masterVolume = parsed.masterVolume !== undefined ? parsed.masterVolume : 0.8;
        
        // Update UI
        const masterVol = document.getElementById('master-volume');
        const volValue = document.getElementById('volume-value');
        if (masterVol) masterVol.value = this.masterVolume * 100;
        if (volValue) volValue.textContent = `${Math.round(this.masterVolume * 100)}%`;
      }
    } catch (e) {
      console.error('Error loading from storage:', e);
    }
  }
  
  async updateVersion() {
    if (window.electronAPI) {
      const version = await window.electronAPI.getVersion();
      const versionEl = document.getElementById('version');
      const appVersion = document.getElementById('app-version');
      if (versionEl) versionEl.textContent = `v${version}`;
      if (appVersion) appVersion.textContent = version;
    }
  }
  
  showToast(message, type = 'info') {
    const toasts = document.getElementById('toasts');
    if (!toasts) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toasts.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
  
  generateId() {
    return 'sound_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.brutalMod = new BrutalMod();
});
