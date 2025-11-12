# 🎨 Guía del Selector de Paletas de Colores

## 📋 Descripción

El sistema de selector de paletas permite probar diferentes combinaciones de colores para el sitio web de la boda en tiempo real. Es una herramienta de diseño que facilita la elección de la paleta perfecta antes de aplicarla permanentemente.

## 🚀 Cómo Usar

### Acceso al Selector

Hay dos formas de acceder al selector de paletas:

1. **Desde el sitio principal:**
   - Haz clic en el botón flotante con el ícono de paleta (🎨) ubicado en la esquina inferior derecha
   - Este botón está disponible en todas las páginas del sitio

2. **Acceso directo:**
   - Navega a: `color-selector.html`
   - URL: `http://localhost:8000/color-selector.html` (en desarrollo local)

### Seleccionar una Paleta

1. En la página del selector, verás 4 paletas disponibles:
   - **Original**: La paleta actual con tonos cálidos y terrosos
   - **Boho Constelaciones**: Inspirada en cielos nocturnos y estrellas
   - **Cuarzo Rosa**: Tonos rosados suaves y elegantes
   - **Natural Celestial**: Tonos naturales con detalles dorados y constelaciones ⭐ NUEVA

2. Cada paleta muestra:
   - **Nombre y descripción**
   - **Muestra de colores** con códigos hexadecimales
   - **Preview de componentes** (botones, cards, gradientes)

3. Haz clic en el botón **"Seleccionar"** de la paleta que desees probar

4. La paleta se aplica inmediatamente:
   - Todos los colores del selector cambian en tiempo real
   - La sección "Vista Previa en Vivo" muestra cómo se verán los elementos
   - La selección se guarda automáticamente en el navegador

5. Haz clic en **"Volver al sitio"** para ver cómo se ve la paleta en el sitio completo

## 🎯 Características

### Vista Previa en Tiempo Real

- Los cambios se aplican instantáneamente
- No requiere recargar la página
- La paleta seleccionada persiste entre sesiones (usando localStorage)

### Colores Modificados

Cada paleta modifica las siguientes variables CSS:

- `--primary-color`: Color principal
- `--secondary-color`: Color secundario
- `--accent-color`: Color de acento
- `--text-dark`: Color de texto oscuro
- `--text-light`: Color de texto claro
- `--white`: Color blanco/claro
- `--background`: Color de fondo principal
- `--gradient-1`, `--gradient-2`, `--gradient-3`: Gradientes

### Componentes Afectados

La paleta seleccionada afecta a:

- ✅ Navegación
- ✅ Hero/Carousel
- ✅ Modal de bienvenida
- ✅ Sección de invitación (sobre)
- ✅ Timeline
- ✅ Cards de información
- ✅ Formulario RSVP
- ✅ Sección de regalos
- ✅ Sección de video
- ✅ Footer
- ✅ Botones y enlaces
- ✅ Todos los gradientes

## 📝 Paletas Disponibles

### 1. Original (Actual)

```css
Primary:    #BFA77D  /* Dorado/Beige */
Secondary:  #C97A57  /* Terracota */
Accent:     #A9A17A  /* Verde oliva */
Text Dark:  #7C3F44  /* Vino */
Background: #EAD7B6  /* Champagne */
```

**Estilo:** Elegante, cálido, terroso, romántico
**Ideal para:** Bodas clásicas, ambiente acogedor

### 2. Boho Constelaciones

```css
Primary:    #D4AF37  /* Dorado estelar */
Secondary:  #2C3E50  /* Azul noche */
Accent:     #34495E  /* Gris azulado */
Text Dark:  #1A252F  /* Casi negro */
Background: #455A64  /* Gris piedra */
```

**Estilo:** Místico, nocturno, natural, bohemio
**Ideal para:** Bodas bajo las estrellas, ambiente mágico, bodas al aire libre nocturnas

### 3. Cuarzo Rosa

```css
Primary:    #E8B4B8  /* Rosa cuarzo */
Secondary:  #C89FA3  /* Rosa polvo */
Accent:     #F4E4E5  /* Rosa muy claro */
Text Dark:  #6B4C4C  /* Marrón rosado */
Background: #FFF0F0  /* Rosa pálido */
```

**Estilo:** Suave, romántico, contemporáneo, delicado
**Ideal para:** Bodas primaverales, ambiente dulce y romántico, estética minimalista

### 4. Natural Celestial ⭐ NUEVA

```css
Primary:    #D9B57B  /* Dorado suave */
Secondary:  #C78B7B  /* Rosa coral */
Accent:     #9A9E7E  /* Verde oliva */
Text Dark:  #2C2E3E  /* Gris azulado */
Background: #E8DCC5  /* Beige cálido */
```

**Estilo:** Natural, celestial, orgánico, cálido, elegante
**Ideal para:** Bodas al aire libre, eventos bajo las estrellas, ceremonias en jardines o viñedos, bodas con temática natural o boho-chic

**Ver documentación completa:** `PALETA_NATURAL_CELESTIAL.md`

## 🛠️ Para Desarrolladores

### Estructura de Archivos

```
wedding/
├── color-selector.html                 # Página del selector
├── DOCUMENTACION_COLORES.md           # Documentación completa de colores
├── GUIA_SELECTOR_PALETAS.md          # Esta guía
├── css/
│   ├── base.css                       # Variables CSS y estilos base
│   └── sections/
│       └── color-selector.css         # Estilos del selector
└── js/
    ├── color-selector-main.js         # Lógica del selector
    └── modules/
        └── color-palette.js           # Definición de paletas y funciones
```

### Cómo Agregar una Nueva Paleta

1. Edita `js/modules/color-palette.js`
2. Agrega un nuevo objeto en `palettes`:

```javascript
nombrePaleta: {
    name: 'Nombre Visible',
    description: 'Descripción de la paleta',
    colors: {
        '--primary-color': '#HEXCODE',
        '--secondary-color': '#HEXCODE',
        // ... más colores
    },
    gradients: {
        '--gradient-1': 'linear-gradient(...)',
        // ... más gradientes
    }
}
```

3. Agrega la card correspondiente en `color-selector.html`
4. Actualiza los estilos si es necesario

### Aplicar Permanentemente una Paleta

Para aplicar permanentemente una paleta seleccionada:

1. Copia los valores de colores de la paleta elegida
2. Edita `/css/base.css`
3. Reemplaza los valores en la sección `:root`:

```css
:root {
    --primary-color: #NUEVO_COLOR;
    --secondary-color: #NUEVO_COLOR;
    /* ... etc */
}
```

4. Guarda y haz commit de los cambios
5. Deploy del sitio actualizado

### API del Sistema de Paletas

```javascript
import { 
    applyPalette,      // Aplica una paleta
    getCurrentPalette, // Obtiene la paleta actual
    loadSavedPalette,  // Carga paleta guardada
    resetToOriginal,   // Resetea a original
    palettes           // Objeto con todas las paletas
} from './modules/color-palette.js';

// Aplicar paleta
applyPalette('boho');

// Obtener paleta actual
const current = getCurrentPalette();

// Resetear
resetToOriginal();
```

## 🔧 Personalización

### Modificar Colores de una Paleta Existente

Edita `js/modules/color-palette.js` y ajusta los valores hexadecimales:

```javascript
original: {
    // ...
    colors: {
        '--primary-color': '#TU_COLOR',
        // ...
    }
}
```

### Cambiar la Posición del Botón Flotante

Edita `css/base.css` en la sección `.color-selector-fab`:

```css
.color-selector-fab {
    bottom: 6rem;  /* Distancia desde abajo */
    right: 2rem;   /* Distancia desde derecha */
}
```

### Ocultar el Botón del Selector

Si no quieres que el botón sea visible para los invitados:

```css
.color-selector-fab {
    display: none;
}
```

O elimina el HTML del botón en `index.html`.

## 💡 Tips y Mejores Prácticas

1. **Prueba en diferentes dispositivos**: Asegúrate de que la paleta se vea bien en móvil, tablet y desktop
2. **Verifica el contraste**: Usa herramientas como WebAIM para verificar la accesibilidad
3. **Prueba con las imágenes reales**: Los colores deben complementar las fotos del carousel
4. **Considera el ambiente**: La paleta debe reflejar el estilo y ubicación de la boda
5. **Guarda screenshots**: Toma capturas de cada paleta para compararlas después

## 🐛 Solución de Problemas

### La paleta no se guarda

- Verifica que localStorage esté habilitado en el navegador
- Revisa la consola del navegador por errores

### Los colores no cambian al volver al sitio principal

- Asegúrate de que `app.js` esté importando y llamando `loadSavedPalette()`
- Verifica que no haya errores de JavaScript en la consola

### El botón flotante interfiere con otros elementos

- Ajusta la propiedad `z-index` en `.color-selector-fab`
- Modifica las posiciones `bottom` y `right` según necesites

## 📞 Soporte

Para preguntas o problemas con el selector de paletas:
- Revisa `DOCUMENTACION_COLORES.md` para información técnica
- Consulta la consola del navegador (F12) para ver mensajes de debug
- Revisa los archivos en `/js/modules/color-palette.js`

---

**Nota:** Este sistema está diseñado para pruebas y visualización. Para aplicar los cambios permanentemente, debes editar manualmente los archivos CSS como se describe en la sección "Para Desarrolladores".

