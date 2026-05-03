/**
 * BrutalMod - Professional Soundboard
 * Version: 1.0
 * 
 * A beautiful, professional soundboard application
 * with hotkey support and virtual audio cable integration.
 */

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
    sounds: [],
    hotkeys: {},
    currentlyPlaying: null,
    masterVolume: 0.8,
    currentCategory: 'all',
    isAssigningHotkey: false,
    pendingHotkeySound: null,
    editingSound: null,
    settings: {
        theme: 'dark',
        animations: true,
        stopHotkey: 'Escape'
    }
};

// ============================================
// DOM ELEMENTS
// ============================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    loadFromStorage();
    setupEventListeners();
    renderSounds();
    updateUI();
    loadAudioDevices();
    checkElectron();
});

function initElements() {
    // Navigation
    elements.navItems = $$('.nav-item');
    elements.tabContents = $$('.tab-content');
    
    // Sounds
    elements.soundGrid = $('#soundGrid');
    elements.emptyState = $('#emptyState');
    elements.searchInput = $('#searchInput');
    elements.categoryChips = $$('.category-chip');
    
    // Controls
    elements.masterVolume = $('#masterVolume');
    elements.masterVolumeValue = $('#masterVolumeValue');
    elements.stopAllBtn = $('#stopAllBtn');
    elements.addSoundBtn = $('#addSoundBtn');
    elements.fileInput = $('#fileInput');
    
    // Hotkeys
    elements.hotkeyList = $('#hotkeyList');
    elements.hotkeyModal = $('#hotkeyModal');
    elements.hotkeyPreview = $('#hotkeyPreview');
    elements.hotkeySoundName = $('#hotkeySoundName');
    
    // Edit Modal
    elements.editModal = $('#editModal');
    elements.editSoundName = $('#editSoundName');
    elements.editSoundCategory = $('#editSoundCategory');
    elements.editSoundVolume = $('#editSoundVolume');
    elements.editVolumeValue = $('#editVolumeValue');
    
    // Now Playing
    elements.nowPlayingBar = $('#nowPlayingBar');
    elements.nowPlayingTitle = $('#nowPlayingTitle');
    elements.progressBar = $('#progressBar');
    
    // Stats
    elements.totalSounds = $('#totalSounds');
    elements.totalHotkeys = $('#totalHotkeys');
    elements.totalSize = $('#totalSize');
    
    // Toast
    elements.toastContainer = $('#toastContainer');
}

function checkElectron() {
    // Check if running in Electron
    if (typeof require !== 'undefined') {
        try {
            const { ipcRenderer } = require('electron');
            
            // Title bar controls
            $('#minimizeBtn')?.addEventListener('click', () => {
                ipcRenderer.send('window-minimize');
            });
            
            $('#maximizeBtn')?.addEventListener('click', () => {
                ipcRenderer.send('window-maximize');
            });
            
            $('#closeBtn')?.addEventListener('click', () => {
                ipcRenderer.send('window-close');
            });
            
            // Show titlebar
            $('.titlebar').style.display = 'flex';
        } catch (e) {
            console.log('Not running in Electron');
        }
    }
}

// ============================================
// STORAGE
// ============================================
function loadFromStorage() {
    try {
        const savedSounds = localStorage.getItem('brutalmod_sounds');
        if (savedSounds) state.sounds = JSON.parse(savedSounds);
        
        const savedHotkeys = localStorage.getItem('brutalmod_hotkeys');
        if (savedHotkeys) state.hotkeys = JSON.parse(savedHotkeys);
        
        const savedSettings = localStorage.getItem('brutalmod_settings');
        if (savedSettings) state.settings = { ...state.settings, ...JSON.parse(savedSettings) };
    } catch (e) {
        console.error('Failed to load from storage:', e);
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('brutalmod_sounds', JSON.stringify(state.sounds));
        localStorage.setItem('brutalmod_hotkeys', JSON.stringify(state.hotkeys));
        localStorage.setItem('brutalmod_settings', JSON.stringify(state.settings));
    } catch (e) {
        console.error('Failed to save to storage:', e);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => switchTab(item.dataset.tab));
    });
    
    // Category chips
    elements.categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            elements.categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.currentCategory = chip.dataset.category;
            renderSounds();
        });
    });
    
    // Master volume
    elements.masterVolume?.addEventListener('input', (e) => {
        state.masterVolume = e.target.value / 100;
        elements.masterVolumeValue.textContent = `${e.target.value}%`;
    });
    
    // Stop all
    elements.stopAllBtn?.addEventListener('click', stopAllSounds);
    
    // Add sound
    elements.addSoundBtn?.addEventListener('click', () => elements.fileInput?.click());
    $('#emptyAddBtn')?.addEventListener('click', () => elements.fileInput?.click());
    elements.fileInput?.addEventListener('change', handleFileSelect);
    
    // Search
    elements.searchInput?.addEventListener('input', (e) => {
        renderSounds(e.target.value);
    });
    
    // Global keyboard
    document.addEventListener('keydown', handleKeyPress);
    
    // Modal controls
    $('#closeHotkeyModal')?.addEventListener('click', closeHotkeyModal);
    $('#cancelHotkeyBtn')?.addEventListener('click', closeHotkeyModal);
    $('#clearHotkeyBtn')?.addEventListener('click', clearHotkey);
    
    $('#closeEditModal')?.addEventListener('click', closeEditModal);
    $('#saveSoundBtn')?.addEventListener('click', saveSoundEdit);
    $('#deleteSoundBtn')?.addEventListener('click', deleteSound);
    
    // Edit volume slider
    elements.editSoundVolume?.addEventListener('input', (e) => {
        elements.editVolumeValue.textContent = `${e.target.value}%`;
    });
    
    // Now playing stop
    $('#npStopBtn')?.addEventListener('click', stopAllSounds);
    
    // Export/Import
    $('#exportBtn')?.addEventListener('click', exportConfig);
    $('#importBtn')?.addEventListener('click', importConfig);
    $('#exportSettingsBtn')?.addEventListener('click', exportConfig);
    $('#clearDataBtn')?.addEventListener('click', clearAllData);
    
    // Click outside modal to close
    $$('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            $$('.modal').forEach(m => m.classList.remove('show'));
        });
    });
}

// ============================================
// TAB NAVIGATION
// ============================================
function switchTab(tabId) {
    elements.navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.tab === tabId);
    });
    
    elements.tabContents.forEach(content => {
        content.classList.toggle('active', content.id === `${tabId}Tab`);
    });
}

// ============================================
// SOUND MANAGEMENT
// ============================================
function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        if (file.type.startsWith('audio/')) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const sound = {
                    id: generateId(),
                    name: file.name.replace(/\.[^/.]+$/, ''),
                    data: event.target.result,
                    type: file.type,
                    volume: 1,
                    hotkey: null,
                    category: 'all',
                    size: event.target.result.length
                };
                
                state.sounds.push(sound);
                saveToStorage();
                renderSounds();
                updateUI();
                showToast(`Added "${sound.name}"`, 'success');
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    e.target.value = '';
}

function renderSounds(searchQuery = '') {
    if (!elements.soundGrid) return;
    
    let filteredSounds = state.sounds;
    
    // Filter by category
    if (state.currentCategory !== 'all') {
        filteredSounds = filteredSounds.filter(s => s.category === state.currentCategory);
    }
    
    // Filter by search
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredSounds = filteredSounds.filter(s => 
            s.name.toLowerCase().includes(query)
        );
    }
    
    elements.soundGrid.innerHTML = '';
    
    if (filteredSounds.length === 0) {
        elements.emptyState?.classList.add('show');
        elements.soundGrid.style.display = 'none';
        return;
    }
    
    elements.emptyState?.classList.remove('show');
    elements.soundGrid.style.display = 'grid';
    
    filteredSounds.forEach(sound => {
        const card = createSoundCard(sound);
        elements.soundGrid.appendChild(card);
    });
}

function createSoundCard(sound) {
    const card = document.createElement('div');
    card.className = `sound-card ${state.currentlyPlaying?.id === sound.id ? 'playing' : ''}`;
    card.dataset.id = sound.id;
    
    card.innerHTML = `
        <div class="sound-card-content">
            <div class="sound-visual">
                <span class="sound-visual-icon">🎵</span>
            </div>
            <div class="sound-info">
                <div class="sound-name" title="${sound.name}">${sound.name}</div>
                <div class="sound-meta">
                    ${sound.hotkey ? `<span class="sound-hotkey">${sound.hotkey}</span>` : '<span class="sound-hotkey" style="opacity:0.5">No Key</span>'}
                    <span class="sound-volume">${Math.round(sound.volume * 100)}%</span>
                </div>
            </div>
            <div class="sound-actions">
                <button class="sound-action-btn play" data-action="play">▶</button>
                <button class="sound-action-btn" data-action="hotkey">⌨</button>
                <button class="sound-action-btn" data-action="edit">✏</button>
            </div>
        </div>
    `;
    
    // Click to play
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('sound-action-btn')) {
            playSound(sound.id);
        }
    });
    
    // Action buttons
    card.querySelectorAll('.sound-action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            
            switch (action) {
                case 'play':
                    playSound(sound.id);
                    break;
                case 'hotkey':
                    openHotkeyModal(sound);
                    break;
                case 'edit':
                    openEditModal(sound);
                    break;
            }
        });
    });
    
    return card;
}

// ============================================
// AUDIO PLAYBACK
// ============================================
function playSound(soundId) {
    const sound = state.sounds.find(s => s.id === soundId);
    if (!sound) return;
    
    // Stop current sound
    if (state.currentlyPlaying) {
        stopSound(state.currentlyPlaying.id);
    }
    
    // Create audio
    const audio = new Audio(sound.data);
    audio.volume = sound.volume * state.masterVolume;
    
    state.currentlyPlaying = {
        id: soundId,
        audio: audio,
        startTime: Date.now()
    };
    
    // Update UI
    updateSoundCardState(soundId, true);
    showNowPlaying(sound);
    
    // Progress tracking
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        elements.progressBar.style.width = `${progress}%`;
    });
    
    // Handle end
    audio.addEventListener('ended', () => {
        stopSound(soundId);
    });
    
    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        showToast('Failed to play sound', 'error');
        stopSound(soundId);
    });
    
    // Play
    audio.play().catch(err => {
        console.error('Play error:', err);
        showToast('Failed to play sound', 'error');
        stopSound(soundId);
    });
}

function stopSound(soundId) {
    if (state.currentlyPlaying?.id === soundId) {
        state.currentlyPlaying.audio.pause();
        state.currentlyPlaying.audio.currentTime = 0;
        state.currentlyPlaying = null;
        
        updateSoundCardState(soundId, false);
        hideNowPlaying();
    }
}

function stopAllSounds() {
    if (state.currentlyPlaying) {
        const soundId = state.currentlyPlaying.id;
        state.currentlyPlaying.audio.pause();
        state.currentlyPlaying.audio.currentTime = 0;
        state.currentlyPlaying = null;
        
        updateSoundCardState(soundId, false);
        hideNowPlaying();
    }
}

function updateSoundCardState(soundId, isPlaying) {
    const card = document.querySelector(`.sound-card[data-id="${soundId}"]`);
    if (card) {
        card.classList.toggle('playing', isPlaying);
    }
}

// ============================================
// HOTKEYS
// ============================================
function handleKeyPress(e) {
    // Hotkey assignment mode
    if (state.isAssigningHotkey && state.pendingHotkeySound) {
        e.preventDefault();
        
        const key = getKeyName(e);
        const validKeys = getValidKeys();
        
        if (validKeys.includes(key)) {
            assignHotkey(key);
        }
        return;
    }
    
    // Global hotkeys
    const key = getKeyName(e);
    
    // Stop all with Escape
    if (key === state.settings.stopHotkey) {
        stopAllSounds();
        return;
    }
    
    // Trigger sound
    if (state.hotkeys[key]) {
        e.preventDefault();
        playSound(state.hotkeys[key]);
    }
}

function getKeyName(e) {
    const specialKeys = {
        ' ': 'Space',
        'ArrowUp': 'Up',
        'ArrowDown': 'Down',
        'ArrowLeft': 'Left',
        'ArrowRight': 'Right',
        'Escape': 'Escape',
        'Enter': 'Enter',
        'Tab': 'Tab',
        'Backspace': 'Backspace',
        'Delete': 'Delete'
    };
    
    if (specialKeys[e.key]) return specialKeys[e.key];
    if (e.key.length === 1) return e.key.toUpperCase();
    return e.key;
}

function getValidKeys() {
    return [
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'Space', 'Enter', 'Escape'
    ];
}

function openHotkeyModal(sound) {
    state.isAssigningHotkey = true;
    state.pendingHotkeySound = sound;
    
    elements.hotkeySoundName.textContent = sound.name;
    elements.hotkeyPreview.innerHTML = '<span class="key-display">Press a key...</span>';
    elements.hotkeyModal.classList.add('show');
}

function closeHotkeyModal() {
    state.isAssigningHotkey = false;
    state.pendingHotkeySound = null;
    elements.hotkeyModal?.classList.remove('show');
}

function assignHotkey(key) {
    if (!state.pendingHotkeySound) return;
    
    // Remove old hotkey
    if (state.pendingHotkeySound.hotkey) {
        delete state.hotkeys[state.pendingHotkeySound.hotkey];
    }
    
    // Remove if key already assigned
    const existingSoundId = state.hotkeys[key];
    if (existingSoundId) {
        const existingSound = state.sounds.find(s => s.id === existingSoundId);
        if (existingSound) existingSound.hotkey = null;
    }
    
    // Assign new hotkey
    state.pendingHotkeySound.hotkey = key;
    state.hotkeys[key] = state.pendingHotkeySound.id;
    
    saveToStorage();
    renderSounds();
    updateHotkeyList();
    updateUI();
    closeHotkeyModal();
    
    showToast(`Assigned ${key} to "${state.pendingHotkeySound.name}"`, 'success');
}

function clearHotkey() {
    if (!state.pendingHotkeySound) return;
    
    if (state.pendingHotkeySound.hotkey) {
        delete state.hotkeys[state.pendingHotkeySound.hotkey];
        state.pendingHotkeySound.hotkey = null;
        
        saveToStorage();
        renderSounds();
        updateHotkeyList();
        updateUI();
    }
    
    closeHotkeyModal();
}

function updateHotkeyList() {
    if (!elements.hotkeyList) return;
    
    const entries = Object.entries(state.hotkeys);
    
    if (entries.length === 0) {
        elements.hotkeyList.innerHTML = '<div class="hotkey-empty">No hotkeys assigned</div>';
        return;
    }
    
    elements.hotkeyList.innerHTML = entries.map(([key, soundId]) => {
        const sound = state.sounds.find(s => s.id === soundId);
        return sound ? `
            <div class="hotkey-item">
                <span class="hotkey-item-name">${sound.name}</span>
                <span class="hotkey-item-key">${key}</span>
            </div>
        ` : '';
    }).join('');
}

// ============================================
// EDIT MODAL
// ============================================
function openEditModal(sound) {
    state.editingSound = sound;
    
    elements.editSoundName.value = sound.name;
    elements.editSoundCategory.value = sound.category || 'all';
    elements.editSoundVolume.value = sound.volume * 100;
    elements.editVolumeValue.textContent = `${Math.round(sound.volume * 100)}%`;
    
    elements.editModal.classList.add('show');
}

function closeEditModal() {
    state.editingSound = null;
    elements.editModal?.classList.remove('show');
}

function saveSoundEdit() {
    if (!state.editingSound) return;
    
    state.editingSound.name = elements.editSoundName.value;
    state.editingSound.category = elements.editSoundCategory.value;
    state.editingSound.volume = elements.editSoundVolume.value / 100;
    
    saveToStorage();
    renderSounds();
    updateUI();
    closeEditModal();
    
    showToast('Sound updated', 'success');
}

function deleteSound() {
    if (!state.editingSound) return;
    
    const name = state.editingSound.name;
    
    // Remove hotkey
    if (state.editingSound.hotkey) {
        delete state.hotkeys[state.editingSound.hotkey];
    }
    
    // Remove sound
    state.sounds = state.sounds.filter(s => s.id !== state.editingSound.id);
    
    saveToStorage();
    renderSounds();
    updateHotkeyList();
    updateUI();
    closeEditModal();
    
    showToast(`Deleted "${name}"`, 'success');
}

// ============================================
// NOW PLAYING
// ============================================
function showNowPlaying(sound) {
    elements.nowPlayingTitle.textContent = sound.name;
    elements.nowPlayingBar.classList.add('show');
    elements.progressBar.style.width = '0%';
}

function hideNowPlaying() {
    elements.nowPlayingBar?.classList.remove('show');
}

// ============================================
// UI UPDATES
// ============================================
function updateUI() {
    // Stats
    if (elements.totalSounds) {
        elements.totalSounds.textContent = state.sounds.length;
    }
    
    if (elements.totalHotkeys) {
        elements.totalHotkeys.textContent = Object.keys(state.hotkeys).length;
    }
    
    if (elements.totalSize) {
        const totalBytes = state.sounds.reduce((acc, s) => acc + (s.size || 0), 0);
        elements.totalSize.textContent = formatSize(totalBytes);
    }
}

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ============================================
// IMPORT/EXPORT
// ============================================
function exportConfig() {
    const config = {
        version: '1.0',
        exported: new Date().toISOString(),
        sounds: state.sounds.map(s => ({
            name: s.name,
            data: s.data,
            volume: s.volume,
            hotkey: s.hotkey,
            category: s.category
        })),
        settings: state.settings
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `brutalmod-backup-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('Configuration exported', 'success');
}

function importConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const config = JSON.parse(event.target.result);
                
                if (config.sounds) {
                    config.sounds.forEach(sound => {
                        sound.id = generateId();
                        state.sounds.push(sound);
                        if (sound.hotkey) {
                            state.hotkeys[sound.hotkey] = sound.id;
                        }
                    });
                    
                    saveToStorage();
                    renderSounds();
                    updateHotkeyList();
                    updateUI();
                    showToast(`Imported ${config.sounds.length} sounds`, 'success');
                }
            } catch (err) {
                showToast('Failed to import configuration', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function clearAllData() {
    if (confirm('Are you sure you want to delete all sounds and settings? This cannot be undone.')) {
        localStorage.clear();
        state.sounds = [];
        state.hotkeys = {};
        state.currentlyPlaying = null;
        
        renderSounds();
        updateHotkeyList();
        updateUI();
        hideNowPlaying();
        
        showToast('All data cleared', 'success');
    }
}

// ============================================
// AUDIO DEVICES
// ============================================
async function loadAudioDevices() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const outputSelect = $('#outputDevice');
        
        if (outputSelect) {
            const audioOutputs = devices.filter(d => d.kind === 'audiooutput');
            outputSelect.innerHTML = '<option>Default Device</option>';
            
            audioOutputs.forEach(device => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.textContent = device.label || `Device ${device.deviceId.slice(0, 8)}`;
                outputSelect.appendChild(option);
            });
        }
    } catch (e) {
        console.log('Could not enumerate audio devices');
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || 'ℹ'}</span>
        <span class="toast-message">${message}</span>
    `;
    
    elements.toastContainer?.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// UTILITIES
// ============================================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// ============================================
// DRAG & DROP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const content = $('.content');
    
    content?.addEventListener('dragover', (e) => {
        e.preventDefault();
        content.style.background = 'rgba(255, 51, 102, 0.05)';
    });
    
    content?.addEventListener('dragleave', () => {
        content.style.background = '';
    });
    
    content?.addEventListener('drop', (e) => {
        e.preventDefault();
        content.style.background = '';
        
        const files = Array.from(e.dataTransfer.files);
        files.forEach(file => {
            if (file.type.startsWith('audio/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const sound = {
                        id: generateId(),
                        name: file.name.replace(/\.[^/.]+$/, ''),
                        data: event.target.result,
                        type: file.type,
                        volume: 1,
                        hotkey: null,
                        category: 'all',
                        size: event.target.result.length
                    };
                    
                    state.sounds.push(sound);
                    saveToStorage();
                    renderSounds();
                    updateUI();
                    showToast(`Added "${sound.name}"`, 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    });
});

// ============================================
// GLOBAL EXPOSE
// ============================================
window.BrutalMod = {
    state,
    playSound,
    stopSound,
    stopAllSounds,
    exportConfig,
    importConfig,
    showToast
};

console.log('%c💀 BrutalMod v1.0', 'color: #ff3366; font-size: 20px; font-weight: bold;');
console.log('%cProfessional Soundboard for Gamers', 'color: #a0a0b0; font-size: 14px;');
