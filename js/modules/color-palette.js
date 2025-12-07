/**
 * SISTEMA DE PALETAS DE COLORES
 * Define las paletas disponibles y permite cambiar entre ellas
 */

// Definición de las 4 paletas
export const palettes = {
    original: {
        name: 'Original',
        description: 'Paleta elegante con tonos cálidos y terrosos',
        colors: {
            '--primary-color': '#BFA77D',      // Dorado/Beige
            '--secondary-color': '#C97A57',    // Terracota
            '--accent-color': '#A9A17A',       // Verde oliva
            '--text-dark': '#7C3F44',          // Vino/Marrón oscuro
            '--text-light': '#F8F4EC',         // Crema
            '--white': '#F8F4EC',              // Crema
            '--background': '#EAD7B6',         // Champagne
        },
        gradients: {
            '--gradient-1': 'linear-gradient(135deg, #C97A57 0%, #7C3F44 100%)',
            '--gradient-2': 'linear-gradient(135deg, #E889A0 0%, #C97A57 100%)',
            '--gradient-3': 'linear-gradient(135deg, #BFA77D 0%, #A9A17A 100%)',
        }
    },
    
    boho: {
        name: 'Boho Constelaciones',
        description: 'Inspirada en cielos nocturnos, estrellas y naturaleza mística',
        colors: {
            '--primary-color': '#D4AF37',      // Dorado estelar
            '--secondary-color': '#2C3E50',    // Azul noche profundo
            '--accent-color': '#34495E',       // Gris azulado
            '--text-dark': '#1A252F',          // Casi negro azulado
            '--text-light': '#ECF0F1',         // Blanco lunar
            '--white': '#FDFEFE',              // Blanco estrella
            '--background': '#455A64',         // Gris piedra
        },
        gradients: {
            '--gradient-1': 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)',
            '--gradient-2': 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)',
            '--gradient-3': 'linear-gradient(135deg, #D4AF37 0%, #B8960D 100%)',
        }
    },
    
    rose: {
        name: 'Cuarzo Rosa',
        description: 'Inspirada en minerales, tonos rosados suaves y elegancia contemporánea',
        colors: {
            '--primary-color': '#E8B4B8',      // Rosa cuarzo
            '--secondary-color': '#C89FA3',    // Rosa polvo
            '--accent-color': '#F4E4E5',       // Rosa muy claro
            '--text-dark': '#6B4C4C',          // Marrón rosado
            '--text-light': '#FFF5F5',         // Casi blanco rosado
            '--white': '#FFFFFF',              // Blanco puro
            '--background': '#FFF0F0',         // Rosa pálido
        },
        gradients: {
            '--gradient-1': 'linear-gradient(135deg, #E8B4B8 0%, #C89FA3 100%)',
            '--gradient-2': 'linear-gradient(135deg, #F4C5C9 0%, #E8B4B8 100%)',
            '--gradient-3': 'linear-gradient(135deg, #F4E4E5 0%, #E8D4D5 100%)',
        }
    },
    
    celestial: {
        name: 'Natural Celestial',
        description: 'Tonos naturales con detalles dorados y constelaciones. Elegancia terrestre y celestial',
        colors: {
            '--primary-color': '#D9B57B',      // Dorado suave (constelaciones/íconos)
            '--secondary-color': '#C78B7B',    // Rosa coral (botones/enlaces)
            '--accent-color': '#9A9E7E',       // Verde oliva natural (elementos/sombras)
            '--text-dark': '#2C2E3E',          // Gris azulado oscuro (texto principal)
            '--text-light': '#F9F5F0',         // Beige muy claro (texto sobre oscuro)
            '--white': '#F9F5F0',              // Beige crema
            '--background': '#E8DCC5',         // Beige cálido (fondo principal)
        },
        gradients: {
            '--gradient-1': 'linear-gradient(135deg, #C78B7B 0%, #2C2E3E 100%)',
            '--gradient-2': 'linear-gradient(135deg, #D9B57B 0%, #C78B7B 100%)',
            '--gradient-3': 'linear-gradient(135deg, #E8DCC5 0%, #9A9E7E 100%)',
        }
    },
    
    champagne: {
        name: 'Champagne Celestial',
        description: 'Base champagne con acentos dusty rose y vino apagado, elegante y boho-celestial',
        colors: {
            '--primary-color': '#C9A3A7',      // Dusty rose cálido (botones / detalles)
            '--secondary-color': '#B76B50',    // Terracota suave (secundario)
            '--accent-color': '#D6C2A8',       // Champagne dorado (acento)
            '--text-dark': '#6F2C3F',          // Vino apagado (títulos)
            '--text-light': '#F2E7D8',         // Champagne claro (texto sobre fondos oscuros)
            '--white': '#F2E7D8',              // Base clara
            '--background': '#F2E7D8',         // Fondo general
        },
        gradients: {
            '--gradient-1': 'linear-gradient(135deg, #C9A3A7 0%, #B76B50 100%)',
            '--gradient-2': 'linear-gradient(135deg, #B76B50 0%, #6F2C3F 100%)',
            '--gradient-3': 'linear-gradient(135deg, #D6C2A8 0%, #C9A3A7 100%)',
        }
    }
};

/**
 * Aplica una paleta al documento
 * @param {string} paletteKey - Clave de la paleta a aplicar
 */
export function applyPalette(paletteKey) {
    const palette = palettes[paletteKey];
    
    if (!palette) {
        console.error(`Paleta "${paletteKey}" no encontrada`);
        return;
    }
    
    const root = document.documentElement;
    
    // Aplicar colores base
    Object.entries(palette.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    
    // Aplicar gradientes
    Object.entries(palette.gradients).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    
    // Guardar la paleta seleccionada en localStorage
    localStorage.setItem('selectedPalette', paletteKey);
    
    console.log(`✅ Paleta "${palette.name}" aplicada`);
}

/**
 * Carga la paleta guardada en localStorage o aplica la original
 */
const DEFAULT_PALETTE = 'champagne';

export function loadSavedPalette() {
    const savedPalette = localStorage.getItem('selectedPalette') || DEFAULT_PALETTE;
    applyPalette(savedPalette);
    return savedPalette;
}

/**
 * Obtiene la paleta actualmente seleccionada
 */
export function getCurrentPalette() {
    return localStorage.getItem('selectedPalette') || DEFAULT_PALETTE;
}

/**
 * Resetea a la paleta original
 */
export function resetToOriginal() {
    applyPalette(DEFAULT_PALETTE);
}

