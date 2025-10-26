/**
 * MÓDULO: GIFTS
 * Maneja la interacción de apertura/cierre de los detalles de contribución
 */

export function initGifts() {
    const btnOpen = document.getElementById('btnOpenGift');
    const btnClose = document.getElementById('btnCloseGift');
    const cardInitial = document.getElementById('giftCardInitial');
    const giftDetails = document.getElementById('giftDetails');

    if (!btnOpen || !btnClose || !cardInitial || !giftDetails) {
        console.warn('Elementos de gifts no encontrados');
        return;
    }

    // Abrir detalles de contribución
    btnOpen.addEventListener('click', () => {
        cardInitial.classList.add('hidden');
        giftDetails.classList.add('show');
        
        // Scroll suave a la sección
        setTimeout(() => {
            giftDetails.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    });

    // Cerrar detalles y volver a la tarjeta inicial
    btnClose.addEventListener('click', () => {
        giftDetails.classList.remove('show');
        cardInitial.classList.remove('hidden');
        
        // Scroll suave a la sección
        setTimeout(() => {
            cardInitial.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    });
}

