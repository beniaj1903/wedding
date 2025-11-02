/* ================================
   MÓDULO: COMPONENT LOADER
   Carga componentes HTML dinámicamente
   ================================ */

/**
 * Carga un componente HTML desde la carpeta components/
 * @param {string} componentName - Nombre del archivo (sin .html)
 * @param {string} targetSelector - Selector CSS donde insertar el componente
 * @returns {Promise<boolean>} - true si se cargó correctamente
 */
export async function loadComponent(componentName, targetSelector) {
    try {
        // Agregar timestamp para evitar caché
        const timestamp = new Date().getTime();
        const response = await fetch(`components/${componentName}.html?v=${timestamp}`, {
            cache: 'no-store'
        });
        
        if (!response.ok) {
            throw new Error(`Error loading ${componentName}: ${response.status}`);
        }
        
        const html = await response.text();
        const targetElement = document.querySelector(targetSelector);
        
        if (!targetElement) {
            throw new Error(`Target element "${targetSelector}" not found`);
        }
        
        targetElement.innerHTML += html;
        return true;
        
    } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
        return false;
    }
}

/**
 * Carga múltiples componentes en orden
 * @param {Array<{name: string, target: string}>} components - Array de componentes a cargar
 * @returns {Promise<void>}
 */
export async function loadComponents(components) {
    for (const component of components) {
        await loadComponent(component.name, component.target);
    }
}

/**
 * Carga todos los componentes de la página en el orden especificado
 * Nota: welcome-modal ya está incluido directamente en index.html
 */
export async function loadAllComponents() {
    const components = [
        { name: 'navigation', target: 'body' },
        { name: 'hero', target: 'body' },
        { name: 'invitation', target: 'body' },
        { name: 'timeline', target: 'body' },
        { name: 'rsvp', target: 'body' },
        { name: 'info', target: 'body' },
        { name: 'gifts', target: 'body' },
        { name: 'live-stream', target: 'body' },
        { name: 'video', target: 'body' },
        { name: 'footer', target: 'body' },
        { name: 'music-player', target: 'body' }
    ];
    
    await loadComponents(components);
    
    // Disparar evento personalizado cuando todos los componentes están cargados
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

