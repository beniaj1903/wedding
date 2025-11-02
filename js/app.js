/* ================================
   ARCHIVO PRINCIPAL - APP.JS
   Carga componentes y ejecuta módulos
   ================================ */

// Importar módulos
import { loadAllComponents } from './modules/component-loader.js';
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

// Funciones opcionales (descomenta para usar):
// import { initCountdown, initLazyLoading, initScrollToTop } from './modules/utils.js';

/* ================================
   INICIALIZACIÓN
   ================================ */

// 1. Primero: Cargar todos los componentes HTML
loadAllComponents().then(() => {
    console.log('✅ Componentes HTML cargados');
    
    // 2. Después: Inicializar funcionalidades cuando los componentes estén en el DOM
    initializeApp();
});

/**
 * Inicializa todas las funcionalidades de la aplicación
 * Se ejecuta después de que los componentes HTML estén cargados
 */
function initializeApp() {
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
    
    /* ====== FUNCIONES OPCIONALES ======
       Descomenta las que quieras usar:
    
    // Cuenta regresiva (necesitas agregar <div id="countdown"></div> en el HTML)
    // initCountdown('2026-06-15T17:00:00', 'countdown');
    
    // Lazy loading de imágenes (usa data-src en lugar de src)
    // initLazyLoading();
    
    // Botón scroll to top
    // initScrollToTop();
    */
    
    console.log('✅ Aplicación inicializada correctamente');
}

/* ================================
   CONFIGURACIÓN PERSONALIZADA
   ================================ */

// Puedes agregar configuraciones adicionales aquí
// Por ejemplo, cambiar el delay del autoplay del carousel:
// En modules/swiper-init.js, modifica la línea 'delay: 5000'
