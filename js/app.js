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
import { initEnvelopeAnimation } from './modules/envelope-animation.js';
import { initGifts } from './modules/gifts.js';
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
