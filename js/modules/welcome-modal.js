/**
 * MÓDULO: WELCOME MODAL
 * Modal de bienvenida que se muestra al entrar al sitio
 * Al cerrarlo, inicia la música automáticamente
 */

let onModalCloseCallback = null;

export function initWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    const enterBtn = document.getElementById('welcomeEnterBtn');
    
    if (!modal || !enterBtn) {
        console.warn('Elementos del modal de bienvenida no encontrados');
        return;
    }
    
    // Verificar si ya se mostró el modal antes (usar sessionStorage para que se muestre una vez por sesión)
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    
    if (hasSeenWelcome) {
        // Ya vio el modal, ocultarlo inmediatamente
        modal.classList.add('hidden');
        return;
    }
    
    // Click en el botón "Entrar"
    enterBtn.addEventListener('click', () => {
        closeModal();
    });
    
    // También permitir cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

/**
 * Cerrar el modal con animación
 */
function closeModal() {
    const modal = document.getElementById('welcomeModal');
    
    if (!modal) return;
    
    // Marcar como visto
    sessionStorage.setItem('hasSeenWelcome', 'true');
    
    // Animar salida
    modal.classList.add('hidden');
    
    // Ejecutar callback después de la animación (si existe)
    setTimeout(() => {
        if (onModalCloseCallback) {
            onModalCloseCallback();
        }
    }, 500); // Después de la animación de fade out
    
    console.log('🎉 Modal de bienvenida cerrado');
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

