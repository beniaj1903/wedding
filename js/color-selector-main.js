/**
 * COLOR SELECTOR - MAIN
 * Maneja la interacción del selector de paletas
 */

import { applyPalette, getCurrentPalette, palettes } from './modules/color-palette.js';

// ================================
// INICIALIZACIÓN
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Selector de Paletas iniciado');
    
    // Cargar paleta actual
    const currentPalette = getCurrentPalette();
    applyPalette(currentPalette);
    
    // Marcar la paleta activa
    updateActiveCard(currentPalette);
    
    // Configurar event listeners
    setupEventListeners();
});

// ================================
// EVENT LISTENERS
// ================================
function setupEventListeners() {
    // Botones de selección de paleta
    const selectButtons = document.querySelectorAll('.btn-select-palette');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const paletteKey = e.currentTarget.dataset.palette;
            handlePaletteSelection(paletteKey);
        });
    });
    
    // Click en las cards completas (opcional)
    const paletteCards = document.querySelectorAll('.palette-card');
    
    paletteCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Solo si no se hizo click en el botón
            if (!e.target.closest('.btn-select-palette')) {
                const paletteKey = card.dataset.palette;
                handlePaletteSelection(paletteKey);
            }
        });
    });
}

// ================================
// MANEJO DE SELECCIÓN DE PALETA
// ================================
function handlePaletteSelection(paletteKey) {
    console.log(`🎨 Aplicando paleta: ${paletteKey}`);
    
    // Aplicar la paleta
    applyPalette(paletteKey);
    
    // Actualizar UI
    updateActiveCard(paletteKey);
    
    // Mostrar feedback visual
    showSelectionFeedback(paletteKey);
}

// ================================
// ACTUALIZAR CARD ACTIVA
// ================================
function updateActiveCard(paletteKey) {
    // Remover clase active de todas las cards
    const allCards = document.querySelectorAll('.palette-card');
    allCards.forEach(card => card.classList.remove('active'));
    
    // Agregar clase active a la card seleccionada
    const selectedCard = document.querySelector(`.palette-card[data-palette="${paletteKey}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
    
    // Actualizar texto de los botones
    const allButtons = document.querySelectorAll('.btn-select-palette');
    allButtons.forEach(button => {
        if (button.dataset.palette === paletteKey) {
            button.innerHTML = '<i class="fas fa-check"></i> Seleccionada';
        } else {
            button.innerHTML = '<i class="fas fa-check"></i> Seleccionar';
        }
    });
}

// ================================
// FEEDBACK VISUAL
// ================================
function showSelectionFeedback(paletteKey) {
    const palette = palettes[paletteKey];
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'palette-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Paleta "${palette.name}" aplicada correctamente</span>
    `;
    
    // Estilos inline para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: 'var(--primary-color)',
        color: 'var(--white)',
        padding: '1rem 2rem',
        borderRadius: '50px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        fontSize: '1rem',
        fontWeight: '600',
        zIndex: '10000',
        animation: 'slideInUp 0.3s ease',
        fontFamily: 'var(--font-body)'
    });
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ================================
// ANIMACIONES CSS DINÁMICAS
// ================================
// Agregar estilos de animación si no existen
if (!document.getElementById('palette-animations')) {
    const style = document.createElement('style');
    style.id = 'palette-animations';
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOutDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ================================
// NAVEGACIÓN
// ================================
// Manejar el botón de volver al sitio principal
const backButton = document.querySelector('a[href="index.html"]');
if (backButton) {
    backButton.addEventListener('click', (e) => {
        // La paleta ya está guardada en localStorage
        console.log('🔄 Volviendo al sitio principal con la paleta seleccionada');
    });
}

// ================================
// DEBUG INFO
// ================================
console.log('📋 Paletas disponibles:', Object.keys(palettes));
console.log('🎯 Paleta actual:', getCurrentPalette());

