/* ================================
   ARCHIVO PRINCIPAL - APP.JS
   Contenido estático - Sin component-loader
   ================================ */

// Importar módulos
import { initSwiper } from './modules/swiper-init.js';
import { initNavigation, initSmoothScroll } from './modules/navigation.js';
import { initScrollEffects } from './modules/scroll-effects.js';
import { initRSVPForm } from './modules/rsvp-form.js';
import { initEnvelopeAnimation, personalizarSobre } from './modules/envelope-animation.js';
import { initGifts } from './modules/gifts.js';
import { initLiveStream } from './modules/live-stream.js';
import { initMusicPlayer, startMusicFromExternalTrigger } from './modules/music-player.js';
import { initWelcomeModal, onModalClose, getCurrentGuest, isGuestSkipped } from './modules/welcome-modal.js';
import { showConsoleMessage } from './modules/utils.js';
import { loadSavedPalette } from './modules/color-palette.js';

/* ================================
   INICIALIZACIÓN
   ================================ */

// Como todo el HTML ya está en la página, inicializamos directamente
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM cargado - Inicializando aplicación...');
    initializeApp();
});

/**
 * Inicializa todas las funcionalidades de la aplicación
 */
function initializeApp() {
    // Cargar paleta de colores guardada (si existe)
    loadSavedPalette();
    
    // Módulos esenciales
    initSwiper();
    initNavigation();
    initScrollEffects();
    initRSVPForm();
    initSmoothScroll();
    initEnvelopeAnimation();
    initGifts();
    initLiveStream();
    initMusicPlayer();
    initWelcomeModal();
    
    // Conectar cierre del modal con acciones posteriores
    onModalClose(() => {
        console.log('🎵 Modal cerrado, iniciando música...');
        startMusicFromExternalTrigger();
        
        // Verificar si el usuario continuó sin identificarse
        if (isGuestSkipped()) {
            console.log('⏭️ Usuario no identificado - Mostrando mensaje remoto en RSVP');
            // Mostrar mensaje de invitado remoto para evitar que llenen información de otros
            if (window.mostrarMensajeInvitadoRemoto) {
                window.mostrarMensajeInvitadoRemoto();
            }
            return; // No personalizar nada más
        }
        
        // Personalizar contenido después de cerrar el modal
        const guestFromModal = getCurrentGuest();
        if (guestFromModal) {
            // Personalizar sobre con nombre del invitado
            console.log('📨 Personalizando sobre para:', guestFromModal.nombreCompleto);
            personalizarSobre(guestFromModal.nombreCompleto);
            
            // Personalizar RSVP
            if (window.preSeleccionarInvitadoRSVP) {
                console.log('🎯 Personalizando RSVP con:', guestFromModal.nombreCompleto);
                window.preSeleccionarInvitadoRSVP(guestFromModal);
            }
        }
    });
    
    // Mensaje en consola
    showConsoleMessage();
    
    console.log('✅ Aplicación inicializada correctamente');
}
