/**
 * MÓDULO: MUSIC PLAYER
 * Reproductor de música de fondo con YouTube API
 */

let player;
let isPlayerReady = false;
let hasUserInteracted = false;

export function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const musicTooltip = document.getElementById('musicTooltip');
    
    if (!musicToggle) {
        console.warn('Elemento musicToggle no encontrado');
        return;
    }
    
    // Cargar la API de YouTube
    loadYouTubeAPI();
    
    // Click en el botón
    musicToggle.addEventListener('click', () => {
        hasUserInteracted = true;
        musicTooltip.classList.remove('show');
        
        if (!isPlayerReady) {
            musicToggle.classList.add('loading');
            return;
        }
        
        toggleMusic();
    });
    
    // ✨ Reproducir con primera interacción del usuario
    let hasTriedPlay = false;
    const startMusicOnInteraction = () => {
        if (!hasTriedPlay && isPlayerReady) {
            hasTriedPlay = true;
            playMusic();
            console.log('🎵 Música iniciada con interacción del usuario');
        }
    };
    
    // Escuchar primera interacción: click, scroll o touch
    window.addEventListener('click', startMusicOnInteraction, { once: true });
    window.addEventListener('scroll', startMusicOnInteraction, { once: true });
    window.addEventListener('touchstart', startMusicOnInteraction, { once: true });
}

/**
 * Cargar la API de YouTube
 */
function loadYouTubeAPI() {
    // Si ya está cargada, crear el player
    if (window.YT && window.YT.Player) {
        createPlayer();
        return;
    }
    
    // Crear el callback global
    window.onYouTubeIframeAPIReady = () => {
        createPlayer();
    };
    
    // Cargar el script de la API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

/**
 * Crear el reproductor de YouTube
 */
function createPlayer() {
    player = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: '95kYsVOf_sw', // ID del video de YouTube
        playerVars: {
            autoplay: 0, // No autoplay - esperar interacción
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            loop: 1,
            playlist: '95kYsVOf_sw' // Para que se repita
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
        }
    });
}

/**
 * Cuando el player está listo
 */
function onPlayerReady(event) {
    isPlayerReady = true;
    const musicToggle = document.getElementById('musicToggle');
    
    if (musicToggle) {
        musicToggle.classList.remove('loading');
    }
    
    // Configurar volumen inicial (50%)
    player.setVolume(50);
    
    console.log('🎵 Reproductor de música listo - esperando interacción del usuario');
}

/**
 * Cuando cambia el estado del player
 */
function onPlayerStateChange(event) {
    const musicToggle = document.getElementById('musicToggle');
    const musicTooltip = document.getElementById('musicTooltip');
    
    if (!musicToggle) return;
    
    // YT.PlayerState.PLAYING === 1
    // YT.PlayerState.PAUSED === 2
    // YT.PlayerState.ENDED === 0
    
    if (event.data === YT.PlayerState.PLAYING) {
        musicToggle.classList.add('playing');
        musicToggle.classList.remove('paused');
        musicToggle.querySelector('.music-icon i').className = 'fas fa-pause';
        
        // ✨ Mostrar tooltip solo cuando empieza a reproducir
        if (musicTooltip && !hasUserInteracted) {
            hasUserInteracted = true;
            musicTooltip.classList.add('show');
            setTimeout(() => {
                musicTooltip.classList.remove('show');
            }, 5000);
        }
    } else if (event.data === YT.PlayerState.PAUSED) {
        musicToggle.classList.remove('playing');
        musicToggle.classList.add('paused');
        musicToggle.querySelector('.music-icon i').className = 'fas fa-music';
    } else if (event.data === YT.PlayerState.ENDED) {
        // Reiniciar si termina (aunque loop debería manejarlo)
        player.playVideo();
    }
}

/**
 * Manejo de errores
 */
function onPlayerError(event) {
    console.error('Error en el reproductor de YouTube:', event.data);
    const musicToggle = document.getElementById('musicToggle');
    
    if (musicToggle) {
        musicToggle.classList.remove('loading', 'playing');
        musicToggle.style.opacity = '0.5';
    }
}

/**
 * Reproducir música
 */
function playMusic() {
    if (!player || !isPlayerReady) return;
    
    try {
        player.playVideo();
    } catch (error) {
        console.error('Error al reproducir música:', error);
    }
}

/**
 * Pausar música
 */
function pauseMusic() {
    if (!player || !isPlayerReady) return;
    
    try {
        player.pauseVideo();
    } catch (error) {
        console.error('Error al pausar música:', error);
    }
}

/**
 * Toggle play/pause
 */
function toggleMusic() {
    if (!player || !isPlayerReady) return;
    
    const state = player.getPlayerState();
    
    // YT.PlayerState.PLAYING === 1
    if (state === YT.PlayerState.PLAYING) {
        pauseMusic();
    } else {
        playMusic();
    }
}

/**
 * Exportar funciones públicas
 */
export { playMusic, pauseMusic, toggleMusic };

