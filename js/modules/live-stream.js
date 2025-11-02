/**
 * MÓDULO: LIVE STREAM
 * Maneja la funcionalidad de la transmisión en vivo
 */

// Configuración del live stream
const LIVE_STREAM_CONFIG = {
    // Live stream activo - YouTube mostrará contador hasta que inicie
    isLive: true,
    
    // ID del video de YouTube
    videoId: 'EEOn36Ia2Oo',
    
    // Fecha del evento (para calcular si ya pasó)
    eventDate: new Date('2026-10-10T19:00:00-03:00') // Formato: YYYY-MM-DDTHH:mm:ss-timezone
};

export function initLiveStream() {
    const placeholder = document.getElementById('liveStreamPlaceholder');
    const player = document.getElementById('liveStreamPlayer');
    const notifyBtn = document.getElementById('notifyBtn');
    
    if (!placeholder || !player) {
        console.warn('Elementos del live stream no encontrados');
        return;
    }
    
    // Verificar si el live stream está activo
    checkLiveStatus();
    
    // Event listener para el botón de notificación
    if (notifyBtn) {
        notifyBtn.addEventListener('click', handleNotification);
    }
    
    console.log('✅ Live Stream inicializado');
}

/**
 * Verificar estado del live stream
 */
function checkLiveStatus() {
    const placeholder = document.getElementById('liveStreamPlaceholder');
    const player = document.getElementById('liveStreamPlayer');
    
    if (LIVE_STREAM_CONFIG.isLive) {
        // Mostrar reproductor
        placeholder.style.display = 'none';
        player.style.display = 'block';
        
        // Actualizar iframe con el video ID correcto
        updateVideoIframe();
        
        console.log('🔴 Live stream ACTIVO');
    } else {
        // Mostrar placeholder
        placeholder.style.display = 'block';
        player.style.display = 'none';
        
        console.log('⏰ Live stream en espera');
    }
}

/**
 * Actualizar iframe con el video ID correcto
 */
function updateVideoIframe() {
    const iframe = document.getElementById('liveStreamIframe');
    const links = document.querySelectorAll('.btn-live');
    
    if (iframe && LIVE_STREAM_CONFIG.videoId !== 'VIDEO_ID_AQUI') {
        const embedUrl = `https://www.youtube.com/embed/${LIVE_STREAM_CONFIG.videoId}`;
        iframe.src = embedUrl;
        
        // Actualizar links
        links.forEach(link => {
            link.href = `https://www.youtube.com/watch?v=${LIVE_STREAM_CONFIG.videoId}`;
        });
    }
}

/**
 * Manejar notificación/recordatorio
 */
function handleNotification() {
    // Verificar soporte de notificaciones
    if (!('Notification' in window)) {
        alert('Tu navegador no soporta notificaciones');
        return;
    }
    
    // Solicitar permiso
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            showNotificationSuccess();
        } else {
            showNotificationFallback();
        }
    });
}

/**
 * Mostrar confirmación de notificación
 */
function showNotificationSuccess() {
    const notifyBtn = document.getElementById('notifyBtn');
    
    if (notifyBtn) {
        notifyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Recordatorio Activado!';
        notifyBtn.style.background = 'var(--secondary-color)';
        notifyBtn.style.color = 'var(--white)';
        notifyBtn.style.border = 'none';
        notifyBtn.disabled = true;
        
        // Crear notificación de prueba
        new Notification('¡Recordatorio Activado!', {
            body: 'Te notificaremos cuando comience la transmisión en vivo de la boda',
            icon: 'https://via.placeholder.com/192x192.png?text=💒'
        });
    }
}

/**
 * Fallback si no se permiten notificaciones
 */
function showNotificationFallback() {
    alert('Para activar recordatorios, por favor permite las notificaciones en la configuración de tu navegador.');
}

/**
 * Activar live stream (función para usar cuando empiece el evento)
 * Llamar desde consola: activateLiveStream('VIDEO_ID')
 */
export function activateLiveStream(videoId) {
    if (videoId && videoId !== 'VIDEO_ID_AQUI') {
        LIVE_STREAM_CONFIG.isLive = true;
        LIVE_STREAM_CONFIG.videoId = videoId;
        checkLiveStatus();
        console.log('🔴 Live stream ACTIVADO con ID:', videoId);
    } else {
        console.error('❌ Video ID inválido');
    }
}

/**
 * Desactivar live stream
 */
export function deactivateLiveStream() {
    LIVE_STREAM_CONFIG.isLive = false;
    checkLiveStatus();
    console.log('⏸️ Live stream DESACTIVADO');
}

