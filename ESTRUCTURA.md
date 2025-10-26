# 📐 Estructura Modular del Proyecto

## 🎯 Visión General

El proyecto ha sido modularizado para facilitar la edición y mantenimiento. Cada sección tiene sus propios archivos CSS y JavaScript, lo que te permite modificar una parte específica sin afectar al resto.

## 📁 Estructura de Carpetas

```
wedding/
├── index.html                          # Archivo HTML principal
│
├── css/
│   ├── base.css                        # Estilos base y variables
│   ├── styles.css                      # (ANTIGUO - puede eliminarse)
│   └── sections/                       # Estilos por sección
│       ├── navigation.css              # Menú de navegación
│       ├── hero.css                    # Carousel de fotos
│       ├── invitation.css              # Sección de invitación
│       ├── timeline.css                # Programa del día
│       ├── info.css                    # Información práctica
│       ├── rsvp.css                    # Formulario RSVP
│       ├── gifts.css                   # Mesa de regalos
│       ├── video.css                   # Subir videos
│       ├── footer.css                  # Pie de página
│       └── responsive.css              # Media queries
│
├── js/
│   ├── app.js                          # Archivo principal JS
│   ├── main.js                         # (ANTIGUO - puede eliminarse)
│   └── modules/                        # Módulos JavaScript
│       ├── swiper-init.js              # Configuración del carousel
│       ├── navigation.js               # Menú y smooth scroll
│       ├── scroll-effects.js           # Animaciones de scroll
│       ├── rsvp-form.js                # Lógica del formulario
│       └── utils.js                    # Utilidades opcionales
│
├── README.md                           # Documentación general
├── ESTRUCTURA.md                       # Este archivo
└── .gitignore                          # Archivos ignorados por git
```

---

## 🎨 CSS Modular

### 📄 `css/base.css`
**Propósito:** Variables CSS, reset y estilos base.

**Qué modificar aquí:**
```css
/* Cambiar colores del sitio */
:root {
    --primary-color: #BFA77D;
    --secondary-color: #C97A57;
    --accent-color: #A9A17A;
    /* ... más colores */
}

/* Cambiar tipografías */
:root {
    --font-heading: 'Cormorant Garamond', serif;
    --font-body: 'Montserrat', sans-serif;
}
```

**Cuándo editarlo:**
- ✅ Cambiar paleta de colores global
- ✅ Modificar tipografías
- ✅ Ajustar sombras y transiciones
- ✅ Cambiar estilos de botones

---

### 📄 `css/sections/navigation.css`
**Propósito:** Estilos del menú superior y navegación móvil.

**Qué modificar aquí:**
- Logo y texto del menú
- Colores de links
- Efecto hover de navegación
- Menú hamburguesa (móvil)

**Ejemplo de modificación:**
```css
.nav-logo {
    font-size: 2rem;        /* Tamaño del logo */
    color: var(--primary-color);
}

.nav-link {
    font-size: 0.9rem;      /* Tamaño de links */
}
```

---

### 📄 `css/sections/hero.css`
**Propósito:** Carousel de fotos principal.

**Qué modificar aquí:**
- Tamaño de títulos
- Animaciones de entrada
- Colores del texto sobre fotos
- Posición del scroll indicator

**Ejemplo de modificación:**
```css
.hero-title {
    font-size: 5rem;        /* Tamaño título principal */
}

.hero-subtitle {
    letter-spacing: 5px;    /* Espaciado de subtítulo */
}
```

---

### 📄 `css/sections/invitation.css`
**Propósito:** Sección de invitación con detalles del evento.

**Qué modificar aquí:**
- Tamaño de nombres
- Diseño de tarjetas de información
- Código de vestimenta
- Espaciado entre elementos

**Ejemplo de modificación:**
```css
.names {
    font-size: 3rem;        /* Tamaño de nombres */
    color: var(--primary-color);
}

.event-item {
    padding: 2rem;          /* Espacio interno de tarjetas */
    border-radius: 15px;    /* Bordes redondeados */
}
```

---

### 📄 `css/sections/timeline.css`
**Propósito:** Línea de tiempo del programa del día.

**Qué modificar aquí:**
- Posición de la línea central
- Diseño de puntos del timeline
- Tarjetas de eventos
- Animaciones hover

**Ejemplo de modificación:**
```css
.timeline::before {
    width: 3px;             /* Grosor de línea central */
    background: var(--primary-color);
}

.timeline-dot {
    width: 20px;            /* Tamaño de puntos */
    height: 20px;
}
```

---

### 📄 `css/sections/info.css`
**Propósito:** Información de traslado y hospedaje.

**Qué modificar aquí:**
- Diseño de tarjetas informativas
- Íconos circulares
- Mapa de Google
- Información de hoteles

**Ejemplo de modificación:**
```css
.info-card {
    padding: 2.5rem;        /* Espacio interno */
    border-radius: 15px;
}

.info-icon {
    width: 80px;            /* Tamaño de íconos */
    height: 80px;
}
```

---

### 📄 `css/sections/rsvp.css`
**Propósito:** Formulario de confirmación de asistencia.

**Qué modificar aquí:**
- Diseño de campos de formulario
- Botones de radio
- Mensajes de éxito/error
- Espaciado del formulario

**Ejemplo de modificación:**
```css
.rsvp-form-container {
    max-width: 700px;       /* Ancho del formulario */
    padding: 3rem;
}

.form-group input {
    border-radius: 10px;    /* Bordes de inputs */
}
```

---

### 📄 `css/sections/gifts.css`
**Propósito:** Mesa de regalos y opciones de regalo.

**Qué modificar aquí:**
- Tarjetas de tiendas
- Íconos de regalos
- Información bancaria
- Grid de regalos

**Ejemplo de modificación:**
```css
.gift-card {
    padding: 2.5rem;
    border-radius: 20px;
}

.gift-icon {
    width: 100px;           /* Tamaño de íconos */
    height: 100px;
}
```

---

### 📄 `css/sections/video.css`
**Propósito:** Sección para subir videos.

**Qué modificar aquí:**
- Layout del contenedor de video
- Diseño de tips
- Iframe del formulario
- Notas informativas

**Ejemplo de modificación:**
```css
.video-container {
    grid-template-columns: 1fr 2fr;  /* Proporción de columnas */
}

.video-upload iframe {
    min-height: 600px;      /* Altura mínima del iframe */
}
```

---

### 📄 `css/sections/footer.css`
**Propósito:** Pie de página con redes sociales.

**Qué modificar aquí:**
- Gradiente de fondo
- Redes sociales
- Hashtag de la boda
- Tamaños de texto

**Ejemplo de modificación:**
```css
.footer {
    background: linear-gradient(135deg, ...);
}

.footer-social a {
    width: 50px;            /* Tamaño de botones sociales */
    height: 50px;
}
```

---

### 📄 `css/sections/responsive.css`
**Propósito:** Media queries para diferentes dispositivos.

**Qué modificar aquí:**
- Breakpoints de responsive
- Ajustes para tablet
- Ajustes para móvil
- Menú hamburguesa

**Breakpoints actuales:**
- 1024px (Tablet)
- 768px (Móvil)
- 480px (Móvil pequeño)

---

## ⚙️ JavaScript Modular

### 📄 `js/app.js`
**Propósito:** Archivo principal que importa y ejecuta todos los módulos.

**Qué modificar aquí:**
- Activar/desactivar módulos
- Orden de inicialización
- Funciones opcionales

**Ejemplo de uso:**
```javascript
// Para desactivar un módulo, comenta la línea:
// initScrollEffects();

// Para activar funciones opcionales, descomenta:
// initCountdown('2026-06-15T17:00:00', 'countdown');
```

---

### 📄 `js/modules/swiper-init.js`
**Propósito:** Configuración del carousel de fotos.

**Qué modificar aquí:**
```javascript
export function initSwiper() {
    const swiper = new Swiper('.hero-swiper', {
        loop: true,
        speed: 1000,              // Velocidad de transición
        autoplay: {
            delay: 5000,          // Tiempo entre slides (ms)
            disableOnInteraction: false,
        },
        effect: 'fade',           // Efecto: 'fade', 'slide', 'cube'
        // ... más opciones
    });
}
```

**Opciones populares:**
- `speed`: Velocidad de transición (en ms)
- `autoplay.delay`: Tiempo de espera entre slides
- `effect`: 'fade', 'slide', 'cube', 'flip', 'coverflow'
- `loop`: true/false para loop infinito

---

### 📄 `js/modules/navigation.js`
**Propósito:** Menú móvil y smooth scroll.

**Qué modificar aquí:**
- Comportamiento del menú hamburguesa
- Punto de cambio del navbar (scroll)
- Velocidad de smooth scroll

**Ejemplo:**
```javascript
// Cambiar el punto donde el navbar se reduce
if (window.scrollY > 100) {  // Cambia 100 por tu valor
    navbar.classList.add('scrolled');
}
```

---

### 📄 `js/modules/scroll-effects.js`
**Propósito:** Animaciones al hacer scroll.

**Qué modificar aquí:**
- Elementos a animar
- Umbral de visibilidad (threshold)
- Active state de navegación

**Ejemplo:**
```javascript
const observerOptions = {
    threshold: 0.1,              // 0 a 1 (10% visible)
    rootMargin: '0px 0px -100px 0px'
};
```

---

### 📄 `js/modules/rsvp-form.js`
**Propósito:** Validación y envío del formulario RSVP.

**Qué modificar aquí:**
- Integración con backend
- Validaciones personalizadas
- Mensajes de confirmación
- Timeout de loading

**Para integrar con tu backend:**
```javascript
// Descomenta y configura en la línea ~38:
fetch('https://formsubmit.co/tu-email@ejemplo.com', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    showMessage('¡Gracias por confirmar!', 'success');
    form.reset();
})
.catch(error => {
    showMessage('Error al enviar.', 'error');
});
```

---

### 📄 `js/modules/utils.js`
**Propósito:** Funciones opcionales y utilidades.

**Funciones disponibles:**
- `initCountdown()` - Cuenta regresiva
- `initLazyLoading()` - Carga diferida de imágenes
- `initScrollToTop()` - Botón para subir
- `preventMultipleSubmit()` - Prevenir doble envío

**Cómo activarlas:**
En `js/app.js`, descomenta:
```javascript
import { initCountdown, initScrollToTop } from './modules/utils.js';

// Dentro de DOMContentLoaded:
initCountdown('2026-06-15T17:00:00', 'countdown');
initScrollToTop();
```

---

## 🔧 Guía de Edición por Caso de Uso

### 🎨 Cambiar Colores
1. Edita `css/base.css` → Variables CSS (líneas 5-11)
2. Recarga la página

### 📝 Modificar una Sección Específica
1. Identifica la sección (hero, invitation, timeline, etc.)
2. Edita el archivo correspondiente en `css/sections/`
3. Los cambios solo afectarán esa sección

### ⚡ Cambiar Comportamiento de Carousel
1. Edita `js/modules/swiper-init.js`
2. Modifica las opciones del Swiper

### 📧 Integrar Formulario con Backend
1. Edita `js/modules/rsvp-form.js`
2. Descomenta y configura el fetch (línea ~38)
3. Reemplaza la URL con tu endpoint

### 📱 Ajustar Responsive
1. Edita `css/sections/responsive.css`
2. Modifica los breakpoints existentes o agrega nuevos

### ➕ Agregar Nueva Funcionalidad
1. Crea un nuevo archivo en `js/modules/`
2. Exporta tu función: `export function miFuncion() {...}`
3. Impórtala en `js/app.js`: `import { miFuncion } from './modules/archivo.js'`
4. Ejecútala en `DOMContentLoaded`

---

## 🚀 Ventajas de la Modularización

### ✅ Organización
- Cada archivo tiene un propósito específico
- Fácil de encontrar qué modificar
- Código más limpio y legible

### ✅ Mantenimiento
- Cambios localizados no afectan otras secciones
- Más fácil detectar y corregir errores
- Puedes deshabilitar módulos sin romper el sitio

### ✅ Escalabilidad
- Agregar nuevas secciones es simple
- Reutilizar módulos en otros proyectos
- Trabajar en equipo sin conflictos

### ✅ Performance
- Puedes eliminar módulos no utilizados
- Cargar solo lo necesario
- Más fácil optimizar código

---

## 📦 Archivos Antiguos (Pueden Eliminarse)

Después de verificar que todo funciona correctamente:

- `css/styles.css` → Reemplazado por archivos modulares
- `js/main.js` → Reemplazado por `js/app.js` + módulos

**Para eliminarlos:**
```bash
rm css/styles.css
rm js/main.js
```

---

## 🆘 Solución de Problemas

### El sitio no carga
- **Problema:** Navegador no soporta ES6 modules
- **Solución:** Usa navegadores modernos (Chrome, Firefox, Safari, Edge actualizados)

### Los estilos no se aplican
- **Problema:** Ruta incorrecta en `index.html`
- **Solución:** Verifica que las rutas sean: `css/base.css`, `css/sections/navigation.css`, etc.

### JavaScript no funciona
- **Problema:** Error en importación de módulos
- **Solución:** Abre la consola del navegador (F12) y revisa los errores

### Algunos módulos no cargan
- **Problema:** Servidor local necesario para ES6 modules
- **Solución:** Usa Python: `python3 -m http.server 8000` o un servidor local

---

## 📚 Recursos Adicionales

### Documentación
- **Swiper.js:** https://swiperjs.com/swiper-api
- **CSS Variables:** https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **ES6 Modules:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

### Tutoriales
- [Guía de CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Guía de Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [JavaScript Modules](https://javascript.info/modules-intro)

---

## ✨ Próximos Pasos

1. ✅ Familiarízate con la estructura de carpetas
2. ✅ Modifica los colores en `css/base.css`
3. ✅ Personaliza una sección a tu gusto
4. ✅ Prueba desactivar/activar módulos en `js/app.js`
5. ✅ Integra el formulario con tu backend
6. ✅ Elimina los archivos antiguos cuando te sientas cómodo

---

**¿Necesitas ayuda?** Consulta el `README.md` principal o revisa los comentarios en cada archivo del código. ¡Cada archivo está bien documentado! 📖

¡Disfruta personalizando tu sitio web de boda! 💍✨

