/**
 * MÓDULO: WELCOME MODAL
 * Modal de bienvenida con identificación de invitado
 * Al cerrarlo, inicia la música automáticamente
 */

import { buscarInvitados } from './firebase-guests.js';

let onModalCloseCallback = null;
let selectedGuest = null;
let searchTimeout = null;
let userSkipped = false; // Flag para saber si el usuario continuó sin identificarse

export function initWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    const searchInput = document.getElementById('welcomeGuestSearch');
    const suggestions = document.getElementById('welcomeGuestSuggestions');
    const searchLoader = document.getElementById('welcomeSearchLoader');
    const guestSelected = document.getElementById('welcomeGuestSelected');
    const enterBtn = document.getElementById('welcomeEnterBtn');
    const skipBtn = document.getElementById('welcomeSkipBtn');
    const changeBtn = document.getElementById('welcomeChangeGuest');
    
    if (!modal) {
        console.warn('Modal de bienvenida no encontrado');
        return;
    }
    
    // Modal SIEMPRE visible al cargar la página (no hay persistencia)
    // Bloquear scroll mientras el modal está abierto
    document.body.classList.add('modal-open');
    
    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                suggestions.style.display = 'block';
            }
        });
    }
    
    if (enterBtn) {
        enterBtn.addEventListener('click', handleEnter);
    }
    
    if (skipBtn) {
        skipBtn.addEventListener('click', handleSkip);
    }
    
    if (changeBtn) {
        changeBtn.addEventListener('click', handleChangeGuest);
    }
    
    // Cerrar sugerencias al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.welcome-guest-form')) {
            if (suggestions) suggestions.style.display = 'none';
        }
    });
    
    // Permitir ESC para cerrar modal (solo si ya seleccionó o saltó)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden') && selectedGuest) {
            closeModal();
        }
    });
    
    console.log('✅ Welcome Modal con identificación inicializado');
}

/**
 * Manejar búsqueda de invitados
 */
async function handleSearch(e) {
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

/**
 * Mostrar sugerencias de invitados
 */
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

/**
 * Seleccionar un invitado
 */
function selectGuest(guest) {
    selectedGuest = guest;
    userSkipped = false; // Se identificó correctamente
    
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

/**
 * Cambiar invitado seleccionado
 */
function handleChangeGuest() {
    selectedGuest = null;
    userSkipped = false; // Resetear flag al cambiar
    
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

/**
 * Entrar al sitio con invitado seleccionado
 */
function handleEnter() {
    if (!selectedGuest) return;
    
    userSkipped = false; // Se identificó correctamente
    console.log('👤 Usuario identificado:', selectedGuest.nombreCompleto);
    
    // Cerrar modal (no guardamos nada)
    closeModal();
}

/**
 * Continuar sin identificarse
 */
function handleSkip() {
    userSkipped = true; // Marcamos que continuó sin identificarse
    selectedGuest = null; // No hay invitado seleccionado
    console.log('⏭️ Usuario continuó sin identificarse');
    
    // Cerrar modal (no guardamos nada)
    closeModal();
}

/**
 * Cerrar el modal con animación
 */
function closeModal() {
    const modal = document.getElementById('welcomeModal');
    
    if (!modal) return;
    
    // Animar salida del modal
    modal.classList.add('hidden');
    
    // Remover clase de carga y agregar clase de página cargada
    // Esto hará visible el contenido principal con animación
    setTimeout(() => {
        document.body.classList.remove('loading-page');
        document.body.classList.remove('modal-open'); // Desbloquear scroll
        document.body.classList.add('page-loaded');
        console.log('📄 Contenido principal mostrado');
    }, 300); // Después de que comience la animación del modal
    
    // Ejecutar callback después de la animación (si existe)
    setTimeout(() => {
        if (onModalCloseCallback) {
            onModalCloseCallback();
        }
    }, 500); // Después de la animación de fade out
    
    console.log('🎉 Modal de bienvenida cerrado');
}

/**
 * Obtener invitado actual (para usar en otros módulos)
 * Solo disponible durante la navegación actual (en memoria)
 */
export function getCurrentGuest() {
    return selectedGuest;
}

/**
 * Verificar si el usuario saltó la identificación
 */
export function isGuestSkipped() {
    return userSkipped;
}

/**
 * Limpiar invitado actual (resetear estado)
 */
export function clearCurrentGuest() {
    selectedGuest = null;
    userSkipped = false;
    console.log('🗑️ Estado limpiado');
}

/**
 * Registrar callback para cuando se cierre el modal
 * @param {Function} callback - Función a ejecutar cuando se cierre el modal
 */
export function onModalClose(callback) {
    onModalCloseCallback = callback;
}

/**
 * Forzar cierre del modal (para debugging o casos especiales)
 */
export function forceCloseModal() {
    closeModal();
}
