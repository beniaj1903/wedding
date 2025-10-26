# 🧩 HTML Modular - Guía de Componentes

## 🎯 Concepto

El HTML ahora está completamente modularizado. Cada sección de tu página está en su propio archivo HTML que se carga dinámicamente.

## 📁 Estructura de Componentes

```
wedding/
├── index.html                     # Shell mínimo (solo <head> y scripts)
└── components/                    # Componentes HTML modulares
    ├── navigation.html            # Menú de navegación
    ├── hero.html                  # Carousel de fotos
    ├── invitation.html            # Sección de invitación
    ├── timeline.html              # Programa del día
    ├── info.html                  # Información práctica
    ├── rsvp.html                  # Formulario RSVP
    ├── gifts.html                 # Mesa de regalos
    ├── video.html                 # Subir videos
    └── footer.html                # Pie de página
```

---

## 🎨 Cómo Funciona

### 1. **index.html** - El Shell
Es un archivo mínimo que contiene:
- ✅ Etiquetas `<head>` con CSS y fuentes
- ✅ Etiqueta `<body>` vacía
- ✅ Scripts que cargan los componentes

```html
<body>
    <!-- Los componentes se cargan aquí dinámicamente -->
    <script type="module" src="js/app.js"></script>
</body>
```

### 2. **component-loader.js** - El Cargador
Módulo JavaScript que:
- Carga cada archivo HTML de `components/`
- Los inserta en el `<body>` en orden
- Dispara evento cuando todo está listo

### 3. **app.js** - Coordinador
```javascript
// 1. Carga componentes HTML
loadAllComponents().then(() => {
    // 2. Inicializa funcionalidades
    initializeApp();
});
```

---

## ✏️ Cómo Editar Componentes

### 🧭 Navegación
**Archivo:** `components/navigation.html`

**Qué puedes modificar:**
- Logo/nombres de los novios
- Links del menú
- Items de navegación

**Ejemplo:**
```html
<div class="nav-logo">Y & B</div>
<!-- Cambiar por tus iniciales -->
<div class="nav-logo">M & J</div>
```

---

### 📸 Hero / Carousel
**Archivo:** `components/hero.html`

**Qué puedes modificar:**
- Nombres de los novios
- Fecha de la boda
- Número de slides
- Colores de gradientes
- Textos de cada slide

**Ejemplo para agregar un slide:**
```html
<div class="swiper-slide">
    <div class="slide-content" style="background: linear-gradient(135deg, #color1 0%, #color2 100%);">
        <div class="hero-text">
            <h2 class="slide-title">Tu Título</h2>
            <p class="slide-text">Tu texto aquí</p>
        </div>
    </div>
</div>
```

---

### 💌 Invitación
**Archivo:** `components/invitation.html`

**Qué puedes modificar:**
- Nombres de los novios
- Fecha y hora
- Lugar del evento
- Dirección
- Código de vestimenta

**Ejemplo:**
```html
<h3 class="names">Tu Nombre</h3>
<p class="ampersand">&</p>
<h3 class="names">Nombre Pareja</h3>
```

---

### ⏰ Timeline / Programa
**Archivo:** `components/timeline.html`

**Qué puedes modificar:**
- Horarios de eventos
- Descripciones de actividades
- Número de eventos

**Para agregar un evento:**
```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <h3>8:00 PM</h3>
        <h4>Nombre del Evento</h4>
        <p>Descripción del evento</p>
    </div>
</div>
```

**Para eliminar un evento:**
Borra todo el bloque `<div class="timeline-item">...</div>`

---

### 🚗 Información
**Archivo:** `components/info.html`

**Qué puedes modificar:**
- Puntos de transporte
- Información de hoteles
- URL de Google Maps
- Dirección del lugar

**Cambiar Google Maps:**
1. Ve a Google Maps
2. Busca tu ubicación
3. Click en "Compartir" → "Insertar un mapa"
4. Copia el código del iframe
5. Reemplaza en `components/info.html`

---

### ✉️ Formulario RSVP
**Archivo:** `components/rsvp.html`

**Qué puedes modificar:**
- Campos del formulario
- Fecha límite de confirmación
- Opciones de transporte
- Preguntas adicionales

**Para agregar un campo:**
```html
<div class="form-group">
    <label for="nuevo-campo">Etiqueta del Campo</label>
    <input type="text" id="nuevo-campo" name="nuevo-campo">
</div>
```

---

### 🎁 Mesa de Regalos
**Archivo:** `components/gifts.html`

**Qué puedes modificar:**
- Tiendas de regalos
- Números de evento
- Información bancaria
- Enlaces externos

**Ejemplo para cambiar info bancaria:**
```html
<div class="bank-info">
    <p><strong>Banco:</strong> Tu Banco</p>
    <p><strong>Cuenta:</strong> Tu Cuenta</p>
    <p><strong>CLABE:</strong> Tu CLABE</p>
</div>
```

---

### 🎥 Videos
**Archivo:** `components/video.html`

**Qué puedes modificar:**
- URL del iframe
- Instrucciones para videos
- Tips de grabación

---

### 👣 Footer
**Archivo:** `components/footer.html`

**Qué puedes modificar:**
- Nombres finales
- Fecha
- Enlaces a redes sociales
- Hashtag de la boda

**Ejemplo:**
```html
<a href="https://instagram.com/tu-cuenta" aria-label="Instagram">
    <i class="fab fa-instagram"></i>
</a>
```

---

## 🎯 Ventajas del HTML Modular

### ✅ Organización
```
Antes: 1 archivo de 463 líneas
Ahora: 9 archivos de ~30-80 líneas cada uno
```

### ✅ Edición Fácil
- Encuentra rápido qué modificar
- Edita una sección sin buscar en 400+ líneas
- Cada archivo tiene un propósito claro

### ✅ Mantenimiento
- Cambios localizados
- Menos riesgo de romper otras secciones
- Más fácil trabajar en equipo

### ✅ Reutilización
- Usa componentes en otras páginas
- Duplica o elimina secciones fácilmente
- Crea variaciones de componentes

---

## 🔧 Casos de Uso Comunes

### ➕ Agregar una Nueva Sección

1. **Crea el archivo HTML:**
```bash
touch components/mi-seccion.html
```

2. **Agrega el contenido:**
```html
<!-- COMPONENTE: MI SECCIÓN -->
<section id="mi-seccion" class="mi-seccion-class">
    <div class="container">
        <h2>Mi Nueva Sección</h2>
        <p>Contenido aquí...</p>
    </div>
</section>
```

3. **Crea el CSS (opcional):**
```bash
touch css/sections/mi-seccion.css
```

4. **Agrega el CSS al index.html:**
```html
<link rel="stylesheet" href="css/sections/mi-seccion.css">
```

5. **Registra el componente en component-loader.js:**
```javascript
const components = [
    // ... otros componentes
    { name: 'mi-seccion', target: 'body' }
];
```

---

### ❌ Eliminar una Sección

1. Elimina el archivo de `components/`
2. Quita el link CSS del `index.html`
3. Elimina la entrada de `component-loader.js`

---

### 🔄 Cambiar el Orden de Secciones

Edita el orden en `js/modules/component-loader.js`:

```javascript
const components = [
    { name: 'navigation', target: 'body' },
    { name: 'hero', target: 'body' },
    // Cambia el orden aquí
    { name: 'timeline', target: 'body' },  // Antes: 4to
    { name: 'invitation', target: 'body' }, // Antes: 3ro
    // ...
];
```

---

### 📋 Duplicar una Sección

1. **Copia el archivo:**
```bash
cp components/timeline.html components/timeline-2.html
```

2. **Modifica el ID y clases:**
```html
<section id="programa-2" class="timeline-section">
```

3. **Registra en component-loader.js:**
```javascript
{ name: 'timeline-2', target: 'body' }
```

---

## 🚀 Workflow de Edición

```
1. Identificar qué sección modificar
   ↓
2. Abrir components/[nombre-seccion].html
   ↓
3. Hacer cambios en el HTML
   ↓
4. Guardar archivo
   ↓
5. Recargar navegador
   ↓
6. ✅ Ver cambios aplicados
```

---

## ⚠️ Importante

### ⚡ Requiere Servidor Local

Los componentes HTML se cargan vía `fetch()`, lo que requiere un servidor web:

```bash
# Python 3
python3 -m http.server 8000

# O Node.js con npx
npx http-server -p 8000

# O Live Server en VS Code
```

**No funcionará** abriendo directamente `index.html` en el navegador (file://)

---

### 🔍 Depuración

Si los componentes no cargan:

1. **Abre la consola** (F12)
2. **Busca errores** en rojo
3. **Verifica rutas** de archivos
4. **Confirma** que estás usando servidor local

Mensaje en consola cuando funciona:
```
✅ Componentes HTML cargados
✅ Aplicación inicializada correctamente
```

---

## 📊 Comparación

### Antes (Monolítico)
```
index.html  ───────────────  463 líneas
                             ❌ Difícil de navegar
                             ❌ Riesgo de errores
                             ❌ Mezcla de contenido
```

### Ahora (Modular)
```
index.html                    40 líneas (shell)
components/
├── navigation.html          20 líneas
├── hero.html                40 líneas
├── invitation.html          50 líneas
├── timeline.html            60 líneas
├── info.html                70 líneas
├── rsvp.html                90 líneas
├── gifts.html               55 líneas
├── video.html               35 líneas
└── footer.html              15 líneas

✅ Fácil de encontrar
✅ Edición independiente
✅ Bien organizado
```

---

## 🎓 Próximos Pasos

1. ✅ Familiarízate con la carpeta `components/`
2. ✅ Abre un archivo y haz un cambio pequeño
3. ✅ Recarga para ver el cambio
4. ✅ Practica agregando/eliminando secciones
5. ✅ Explora `component-loader.js` para entender el flujo

---

## 💡 Tips Pro

### ✅ Nombres descriptivos
```html
<!-- Bien -->
<section id="galeria-fotos">

<!-- Mal -->
<section id="sec1">
```

### ✅ Comentarios útiles
```html
<!-- IMPORTANTE: No eliminar este contenedor -->
<div class="swiper-wrapper">
```

### ✅ Mantén estructura consistente
Todos los componentes siguen el mismo patrón:
```html
<!-- COMPONENTE: NOMBRE -->
<section id="id" class="clase">
    <div class="container">
        <!-- contenido -->
    </div>
</section>
```

---

## 🆘 Solución de Problemas

### Problema: "Componentes no se cargan"
**Solución:** Verifica que uses un servidor local, no `file://`

### Problema: "Estilos no se aplican"
**Solución:** Verifica que el CSS esté vinculado en `index.html`

### Problema: "JavaScript no funciona"
**Solución:** Los scripts se ejecutan después de cargar componentes

### Problema: "Orden incorrecto de secciones"
**Solución:** Cambia el orden en `component-loader.js`

---

## 📚 Recursos

- **Ver ejemplo:** Abre cualquier archivo en `components/`
- **Entender flujo:** Lee `js/modules/component-loader.js`
- **Personalizar:** Edita el archivo del componente que necesites

---

**¡Tu HTML ahora es completamente modular y fácil de editar!** 🎉

Cada sección en su propio archivo, carga automática, y edición independiente.

¿Necesitas modificar la invitación? → `components/invitation.html`
¿Cambiar el timeline? → `components/timeline.html`
¿Actualizar regalos? → `components/gifts.html`

**Simple, organizado, y eficiente.** 💍✨

