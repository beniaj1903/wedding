/**
 * MI MESA - MAIN
 * Lógica principal para la página de Mi Mesa
 */

import { loadSavedPalette } from './modules/color-palette.js';
import { buscarInvitados } from './modules/firebase-guests.js';
import { db } from './firebase-config.js';
import { 
    collection, 
    getDocs, 
    doc, 
    getDoc,
    query,
    where
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Estado global
let currentGuest = null;
let selectedFiles = [];
let currentTable = null;
const DRIVE_UPLOAD_CONFIG = {
    uploadUrl: window.__MI_MESA_CONFIG__?.driveUploadUrl || '/.netlify/functions/upload',
    folderId: window.__MI_MESA_CONFIG__?.driveFolderId || '',
    authToken: window.__MI_MESA_CONFIG__?.driveAuthToken || ''
};
const MAX_FILE_SIZE_MB = 15;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// ================================
// INICIALIZACIÓN
// ================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎯 Página Mi Mesa iniciada');
    
    // Cargar paleta de colores
    loadSavedPalette();
    
    // Verificar si hay un invitado guardado
    await checkSavedGuest();
    
    // Configurar event listeners
    setupEventListeners();
});

// ================================
// VERIFICAR INVITADO GUARDADO
// ================================
async function checkSavedGuest() {
    // La página Mi Mesa siempre requiere identificación
    // No guardamos invitados en localStorage
    showWelcomeModal();
}

// ================================
// MODAL DE BIENVENIDA
// ================================
function showWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    document.body.classList.add('modal-open');
    modal.classList.remove('hidden');
}

function hideWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    document.body.classList.remove('modal-open');
    document.body.classList.add('page-loaded');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// ================================
// EVENT LISTENERS
// ================================
function setupEventListeners() {
    // Búsqueda de invitados (usando los mismos IDs que welcome-modal.js)
    const searchInput = document.getElementById('welcomeGuestSearch');
    const enterBtn = document.getElementById('welcomeEnterBtn');
    const skipBtn = document.getElementById('welcomeSkipBtn');
    const changeGuestBtn = document.getElementById('welcomeChangeGuest');
    
    searchInput?.addEventListener('input', handleGuestSearch);
    searchInput?.addEventListener('focus', () => {
        const suggestions = document.getElementById('welcomeGuestSuggestions');
        if (searchInput.value.trim()) {
            suggestions.style.display = 'block';
        }
    });
    enterBtn?.addEventListener('click', handleEnter);
    skipBtn?.addEventListener('click', () => window.location.href = 'index.html');
    changeGuestBtn?.addEventListener('click', handleChangeGuest);
    
    // Cerrar sugerencias al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.welcome-guest-form')) {
            const suggestions = document.getElementById('welcomeGuestSuggestions');
            if (suggestions) suggestions.style.display = 'none';
        }
    });
    
    // Subida de archivos
    const uploadArea = document.getElementById('uploadArea');
    const selectFilesBtn = document.getElementById('selectFilesBtn');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadMoreBtn = document.getElementById('uploadMoreBtn');
    
    uploadArea?.addEventListener('click', () => fileInput?.click());
    selectFilesBtn?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', handleFileSelect);
    uploadBtn?.addEventListener('click', handleUpload);
    cancelUploadBtn?.addEventListener('click', handleCancelUpload);
    uploadMoreBtn?.addEventListener('click', handleUploadMore);
    
    // Drag and drop
    uploadArea?.addEventListener('dragover', handleDragOver);
    uploadArea?.addEventListener('drop', handleDrop);
}

// ================================
// BÚSQUEDA DE INVITADOS (Mismo método que welcome-modal.js)
// ================================
let searchTimeout;
async function handleGuestSearch(e) {
    const searchTerm = e.target.value.trim();
    const suggestions = document.getElementById('welcomeGuestSuggestions');
    const searchLoader = document.getElementById('welcomeSearchLoader');
    
    // Limpiar timeout anterior
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    // Si está vacío, ocultar sugerencias
    if (!searchTerm) {
        suggestions.style.display = 'none';
        return;
    }
    
    // Mostrar loader
    searchLoader.style.display = 'block';
    
    // Debounce: esperar 300ms antes de buscar
    searchTimeout = setTimeout(async () => {
        try {
            const results = await buscarInvitados(searchTerm);
            displaySuggestions(results);
        } catch (error) {
            console.error('Error en búsqueda:', error);
            displaySuggestions([]);
        } finally {
            searchLoader.style.display = 'none';
        }
    }, 300);
}

function displaySuggestions(guests) {
    const suggestions = document.getElementById('welcomeGuestSuggestions');
    
    if (!suggestions) return;
    
    // Limpiar sugerencias previas
    suggestions.innerHTML = '';
    
    if (guests.length === 0) {
        suggestions.innerHTML = `
            <div class="guest-suggestion-item" style="cursor: default; opacity: 0.6;">
                <i class="fas fa-info-circle"></i>
                <div class="guest-suggestion-info">
                    <div class="guest-suggestion-name">No se encontraron resultados</div>
                    <div class="guest-suggestion-guests">Intenta con otro nombre</div>
                </div>
            </div>
        `;
        suggestions.style.display = 'block';
        return;
    }
    
    // Crear elementos de sugerencia
    guests.forEach(guest => {
        const item = document.createElement('div');
        item.className = 'guest-suggestion-item';
        item.innerHTML = `
            <i class="fas fa-user"></i>
            <div class="guest-suggestion-info">
                <div class="guest-suggestion-name">${guest.nombreCompleto}</div>
                <div class="guest-suggestion-guests">
                    ${guest.cuposAsignados} ${guest.cuposAsignados === 1 ? 'invitado' : 'invitados'}
                </div>
            </div>
        `;
        
        // Click en sugerencia
        item.addEventListener('click', () => selectGuest(guest));
        
        suggestions.appendChild(item);
    });
    
    suggestions.style.display = 'block';
}

function selectGuest(guest) {
    currentGuest = guest;
    
    const searchInput = document.getElementById('welcomeGuestSearch');
    const suggestions = document.getElementById('welcomeGuestSuggestions');
    const guestSelected = document.getElementById('welcomeGuestSelected');
    const enterBtn = document.getElementById('welcomeEnterBtn');
    const skipBtn = document.getElementById('welcomeSkipBtn');
    const selectedName = document.getElementById('welcomeSelectedName');
    const selectedGuests = document.getElementById('welcomeSelectedGuests');
    
    // Ocultar búsqueda y sugerencias
    if (searchInput) searchInput.style.display = 'none';
    if (suggestions) suggestions.style.display = 'none';
    
    // Mostrar invitado seleccionado
    if (selectedName) selectedName.textContent = guest.nombreCompleto;
    if (selectedGuests) {
        selectedGuests.textContent = `${guest.cuposAsignados} ${guest.cuposAsignados === 1 ? 'invitado' : 'invitados'}`;
    }
    if (guestSelected) guestSelected.style.display = 'flex';
    
    // Mostrar botón de entrada y ocultar skip
    if (enterBtn) enterBtn.style.display = 'inline-flex';
    if (skipBtn) skipBtn.style.display = 'none';
    
    console.log('👤 Invitado seleccionado:', guest.nombreCompleto);
}

function handleChangeGuest() {
    currentGuest = null;
    
    const searchInput = document.getElementById('welcomeGuestSearch');
    const guestSelected = document.getElementById('welcomeGuestSelected');
    const enterBtn = document.getElementById('welcomeEnterBtn');
    const skipBtn = document.getElementById('welcomeSkipBtn');
    
    // Mostrar búsqueda de nuevo
    if (searchInput) {
        searchInput.style.display = 'block';
        searchInput.value = '';
        searchInput.focus();
    }
    
    // Ocultar invitado seleccionado
    if (guestSelected) guestSelected.style.display = 'none';
    
    // Ocultar botón de entrada y mostrar skip
    if (enterBtn) enterBtn.style.display = 'none';
    if (skipBtn) skipBtn.style.display = 'block';
}

function handleEnter() {
    if (!currentGuest) return;
    
    console.log('👤 Usuario identificado:', currentGuest.nombreCompleto);
    
    hideWelcomeModal();
    showGuestContent();
}

// ================================
// MOSTRAR CONTENIDO DEL INVITADO
// ================================
async function showGuestContent() {
    if (!currentGuest) return;
    
    console.log('👤 Mostrando contenido para:', currentGuest.nombreCompleto);
    
    // Cargar y mostrar información de la mesa
    await loadAndDisplayTable();
}

async function loadAndDisplayTable() {
    const tableDisplayContent = document.getElementById('tableDisplayContent');
    const noTableMessage = document.getElementById('noTableMessage');
    
    try {
        // Verificar si el invitado tiene mesa asignada
        if (!currentGuest.tableId) {
            console.log('⚠️ Invitado sin mesa asignada');
            tableDisplayContent.style.display = 'none';
            noTableMessage.style.display = 'block';
            return;
        }
        
        // Cargar datos de la mesa desde Firebase
        const tableRef = doc(db, 'tables', currentGuest.tableId);
        const tableDoc = await getDoc(tableRef);
        
        if (!tableDoc.exists()) {
            console.log('⚠️ Mesa no encontrada en Firebase');
            tableDisplayContent.style.display = 'none';
            noTableMessage.style.display = 'block';
            return;
        }
        
        currentTable = {
            id: tableDoc.id,
            ...tableDoc.data()
        };
        
        console.log('✅ Mesa cargada:', currentTable);
        
        // Mostrar información de la mesa
        displayTableInfo(currentTable);
        
    } catch (error) {
        console.error('Error cargando mesa:', error);
        tableDisplayContent.style.display = 'none';
        noTableMessage.style.display = 'block';
    }
}

function displayTableInfo(table) {
    const tableDisplayContent = document.getElementById('tableDisplayContent');
    const noTableMessage = document.getElementById('noTableMessage');
    const noImageMessage = document.getElementById('noImageMessage');
    
    // Normalizar nombre de mesa para buscar imagen local
    const tableName = table.name || '';
    const normalizedName = normalizeTableName(tableName);
    
    if (!normalizedName) {
        console.log('⚠️ Mesa sin nombre válido');
        tableDisplayContent.style.display = 'none';
        noTableMessage.style.display = 'none';
        noImageMessage.style.display = 'block';
        return;
    }
    
    // Construir ruta de imagen local
    const imagePath = `media/table-images/${normalizedName}.png`;
    
    // Mostrar imagen local
    const imageElement = document.getElementById('tableDisplayImage');
    imageElement.src = imagePath;
    imageElement.alt = `Mesa ${tableName}`;
    
    // Manejar error si la imagen no existe
    imageElement.onerror = function() {
        console.log('⚠️ Imagen no encontrada:', imagePath);
        tableDisplayContent.style.display = 'none';
        noTableMessage.style.display = 'none';
        noImageMessage.style.display = 'block';
    };
    
    // Ocultar mensajes y mostrar contenido
    tableDisplayContent.style.display = 'block';
    noTableMessage.style.display = 'none';
    noImageMessage.style.display = 'none';
    
    console.log('✅ Cargando imagen de mesa:', imagePath);
}

/**
 * Normalizar nombre de mesa para buscar imagen
 * Convierte a lowercase y remueve espacios/acentos
 */
function normalizeTableName(name) {
    if (!name) return '';
    
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/\s+/g, '-') // Espacios a guiones
        .replace(/[^a-z0-9-]/g, ''); // Solo letras, números y guiones
}

// ================================
// MANEJO DE ARCHIVOS
// ================================
function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    addFiles(files);
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.style.borderColor = 'var(--secondary-color)';
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.style.borderColor = 'var(--primary-color)';
    
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
}

function addFiles(files) {
    const validFiles = [];
    const rejectedTypes = [];
    const rejectedSizes = [];
    
    files.forEach(file => {
        const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
        if (!isValidType) {
            rejectedTypes.push(file.name);
            return;
        }
        
        const isValidSize = file.size <= MAX_FILE_SIZE_BYTES;
        if (!isValidSize) {
            rejectedSizes.push(file.name);
            return;
        }
        
        validFiles.push(file);
    });
    
    if (rejectedTypes.length || rejectedSizes.length) {
        let message = '';
        if (rejectedTypes.length) {
            message += `Los siguientes archivos no son imágenes o videos soportados:\n- ${rejectedTypes.join('\n- ')}\n\n`;
        }
        if (rejectedSizes.length) {
            message += `Estos archivos superan el límite de ${MAX_FILE_SIZE_MB}MB:\n- ${rejectedSizes.join('\n- ')}\n\n`;
        }
        message += 'Por favor selecciona otros archivos.';
        alert(message);
    }
    
    if (validFiles.length === 0) return;
    
    selectedFiles = [...selectedFiles, ...validFiles];
    displayFilesPreview();
}

function displayFilesPreview() {
    const filesPreview = document.getElementById('filesPreview');
    const previewGrid = document.getElementById('previewGrid');
    const fileCount = document.getElementById('fileCount');
    const uploadArea = document.getElementById('uploadArea');
    
    if (selectedFiles.length === 0) {
        filesPreview.style.display = 'none';
        uploadArea.style.display = 'block';
        return;
    }
    
    uploadArea.style.display = 'none';
    filesPreview.style.display = 'block';
    fileCount.textContent = selectedFiles.length;
    
    previewGrid.innerHTML = selectedFiles.map((file, index) => {
        const isVideo = file.type.startsWith('video/');
        const icon = isVideo ? 'fa-video' : 'fa-image';
        
        return `
            <div class="preview-item">
                <div class="preview-item-placeholder">
                    <i class="fas ${icon}"></i>
                </div>
                <button class="preview-item-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }).join('');
    
    // Event listeners para remover archivos
    previewGrid.querySelectorAll('.preview-item-remove').forEach(btn => {
        btn.addEventListener('click', () => removeFile(parseInt(btn.dataset.index)));
    });
    
    // Crear previews de imágenes
    selectedFiles.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = previewGrid.children[index].querySelector('.preview-item-placeholder');
                if (img) {
                    img.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    displayFilesPreview();
}

function handleCancelUpload() {
    selectedFiles = [];
    document.getElementById('fileInput').value = '';
    displayFilesPreview();
}

function handleUploadMore() {
    document.getElementById('uploadSuccess').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'block';
    selectedFiles = [];
    document.getElementById('fileInput').value = '';
}

function updateUploadProgress(processed, total, progressBar, progressText) {
    const percent = Math.round((processed / total) * 100);
    progressBar.style.width = `${percent}%`;
    progressBar.textContent = `${percent}%`;
    progressText.textContent = `${processed} de ${total} archivos subidos`;
}

function ensureDriveConfig() {
    if (!DRIVE_UPLOAD_CONFIG.uploadUrl) {
        alert('La subida a Google Drive aún no está configurada. Por favor define driveUploadUrl en mi-mesa.html.');
        return false;
    }
    if (!DRIVE_UPLOAD_CONFIG.folderId) {
        alert('Falta configurar el ID de la carpeta de Google Drive.');
        return false;
    }
    return true;
}

function buildUploadMetadata(file, index) {
    const sanitizedFileName = sanitizeFileName(file.name, index);
    
    return {
        fileName: sanitizedFileName,
        guestName: currentGuest?.nombreCompleto || 'Invitado anónimo',
        guestId: currentGuest?.id || currentGuest?.uid || currentGuest?.documento || 'sin-id',
        tableName: currentTable?.name || currentGuest?.tableName || 'Sin mesa',
        tableId: currentTable?.id || currentGuest?.tableId || 'sin-mesa',
        uploadedAt: new Date().toISOString(),
        originalName: file.name,
        originalSize: file.size,
        mimeType: file.type,
        isVideo: file.type.startsWith('video/'),
        source: 'mi-mesa'
    };
}

function sanitizeFileName(fileName, index) {
    const extension = fileName && fileName.includes('.') ? fileName.substring(fileName.lastIndexOf('.')).toLowerCase() : '';
    const baseName = fileName
        .replace(extension, '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'recuerdo';
    const tableSlug = currentTable?.name ? normalizeTableName(currentTable.name) : 'sin-mesa';
    return `${Date.now()}-${index}-${tableSlug}-${baseName}${extension}`;
}

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result?.toString() || '';
            const base64 = result.split(',').pop();
            resolve(base64);
        };
        reader.onerror = () => reject(new Error('No pudimos leer el archivo seleccionado.'));
        reader.readAsDataURL(file);
    });
}

async function uploadFileToBackend(file, metadata) {
    const base64Data = await readFileAsBase64(file);
    
    const payload = {
        fileName: metadata.fileName,
        mimeType: metadata.mimeType || 'application/octet-stream',
        data: base64Data,
        metadata,
        folderId: DRIVE_UPLOAD_CONFIG.folderId || undefined
    };
    
    const headers = {
        'Content-Type': 'application/json'
    };
    if (DRIVE_UPLOAD_CONFIG.authToken) {
        headers['X-Upload-Token'] = DRIVE_UPLOAD_CONFIG.authToken;
    }
    
    const response = await fetch(DRIVE_UPLOAD_CONFIG.uploadUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    });
    
    let result = null;
    try {
        result = await response.json();
    } catch (error) {
        console.error('Respuesta inválida del servidor', error);
    }
    
    if (!response.ok || !result?.success) {
        throw new Error(result?.message || 'El servidor rechazó la subida.');
    }
    
    return result;
}

// ================================
// SUBIDA DE ARCHIVOS
// ================================
async function handleUpload() {
    if (selectedFiles.length === 0) return;
    if (!ensureDriveConfig()) return;
    
    const filesPreview = document.getElementById('filesPreview');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    filesPreview.style.display = 'none';
    uploadProgress.style.display = 'block';
    
    let uploaded = 0;
    const total = selectedFiles.length;
    const errors = [];
    
    for (let i = 0; i < total; i++) {
        const file = selectedFiles[i];
        const metadata = buildUploadMetadata(file, i);
        
        try {
            await uploadFileToBackend(file, metadata);
            uploaded++;
        } catch (error) {
            console.error(`Error subiendo ${file.name}:`, error);
            errors.push({ file: file.name, message: error.message });
        }
        
        updateUploadProgress(i + 1, total, progressBar, progressText);
    }
    
    if (errors.length) {
        uploadProgress.style.display = 'none';
        filesPreview.style.display = 'block';
        const errorList = errors.map(err => `• ${err.file}: ${err.message}`).join('\n');
        alert(`Algunos archivos no se pudieron subir:\n${errorList}`);
        return;
    }
    
    setTimeout(() => {
        uploadProgress.style.display = 'none';
        uploadSuccess.style.display = 'block';
        selectedFiles = [];
        document.getElementById('fileInput').value = '';
    }, 400);
}

// ================================
// UTILIDADES
// ================================
console.log('✅ Mi Mesa módulo cargado');

