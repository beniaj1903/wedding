/* ================================
   MÓDULO: SWIPER CAROUSEL
   Configuración del slider de fotos infinito
   ================================ */

export function initSwiper() {
    const swiper = new Swiper('.hero-swiper', {
        // Loop infinito
        loop: true,
        
        // Velocidad de transición (slide más rápido que fade)
        speed: 1000,
        
        // Autoplay continuo restaurado
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        
        // Efecto de slide (deslizamiento hacia la izquierda)
        effect: 'slide',
        
        // Sin paginación
        pagination: false,
        
        // Sin botones de navegación
        navigation: false,
        
        // Permitir control con teclado (opcional)
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        
        // Preload de imágenes
        preloadImages: true,
        lazy: {
            loadPrevNext: true,
        },
        
        // Callbacks opcionales
        on: {
            init: function() {
                console.log('✅ Carousel inicializado con', this.slides.length, 'fotos');
            },
            slideChange: function() {
                // Puedes agregar efectos adicionales aquí si lo deseas
            }
        }
    });

    return swiper;
}
