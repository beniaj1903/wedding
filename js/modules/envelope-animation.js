/* ================================
   MÓDULO: ANIMACIÓN DE SOBRE
   Maneja la apertura y cierre del sobre de invitación
   ================================ */

/**
 * Personaliza el sobre con el nombre del invitado
 */
export function personalizarSobre(nombreInvitado = null) {
    const envelopeName = document.getElementById('envelopeName');
    if (!envelopeName) return;
    
    if (nombreInvitado) {
        envelopeName.textContent = nombreInvitado;
        console.log('📨 Sobre personalizado para:', nombreInvitado);
    } else {
        envelopeName.textContent = 'Invitado Especial';
    }
}

export function initEnvelopeAnimation() {
    const envelope = document.getElementById('envelope');
    const invitationDetails = document.getElementById('invitationDetails');
    const closeButton = document.getElementById('closeEnvelope');
    
    if (!envelope || !invitationDetails || !closeButton) {
        console.warn('Envelope elements not found');
        return;
    }
    
    // Personalizar con el nombre del invitado si está disponible
    personalizarSobre();
    
    // Abrir sobre al hacer click
    envelope.addEventListener('click', function() {
        openEnvelope();
    });
    
    // Cerrar sobre al hacer click en el botón
    closeButton.addEventListener('click', function() {
        closeEnvelope();
    });
    
    /**
     * Abre el sobre con animación
     */
    function openEnvelope() {
        // Animar la apertura del sobre
        envelope.classList.add('opened');
        
        // Después de la animación del sobre, mostrar los detalles
        setTimeout(() => {
            invitationDetails.classList.add('show');
        }, 400);
        
        // Pequeña vibración para feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
    }
    
    /**
     * Cierra el sobre y vuelve al estado inicial
     */
    function closeEnvelope() {
        // Ocultar detalles primero
        invitationDetails.classList.remove('show');
        
        // Después de que los detalles se oculten, cerrar el sobre
        setTimeout(() => {
            envelope.classList.remove('opened');
        }, 400);
        
        // Scroll suave hacia el sobre
        setTimeout(() => {
            envelope.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 800);
    }
    
    // Permitir cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && invitationDetails.classList.contains('show')) {
            closeEnvelope();
        }
    });
}
