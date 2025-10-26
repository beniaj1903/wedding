# 💌 Animación de Sobre - Guía

## 🎯 ¿Qué hace?

La sección de invitación ahora tiene una **animación elegante de sobre** que:

1. ✅ Muestra un sobre cerrado con los nombres y texto de invitación
2. ✅ Al hacer **click**, el sobre se abre con animación
3. ✅ Revela los detalles del evento: fecha, hora, lugar y código de vestimenta
4. ✅ Incluye un botón para cerrar y volver al sobre
5. ✅ Responsive y funciona en móviles

---

## 🎨 Cómo Funciona

### **Estados del Sobre:**

#### **Estado 1: Cerrado** 🔒
```
┌────────────────────────┐
│    SOBRE CERRADO       │
│                        │
│  Con la bendición de   │
│  Dios y nuestras...    │
│                        │
│   Yoselyn Moreno       │
│         &              │
│   Benito Sánchez       │
│                        │
│  👆 Click para abrir   │
└────────────────────────┘
```

#### **Estado 2: Abierto** 📬
```
      (Solapa animada)
         
┌────────────────────────┐
│  📅 Fecha: 15 Junio    │
│  🕐 Hora: 5:00 PM      │
│  📍 Lugar: Hacienda    │
│                        │
│  👔 Código: Formal     │
│                        │
│  [❌ Cerrar]           │
└────────────────────────┘
```

---

## 📂 Archivos Modificados

### 1. **components/invitation.html**
- Estructura del sobre con solapa
- Contenido inicial (nombres e invitación)
- Detalles del evento (fecha, lugar, vestimenta)

### 2. **css/sections/invitation.css**
- Estilos del sobre y solapa
- Animaciones de apertura/cierre
- Efectos hover y transiciones

### 3. **js/modules/envelope-animation.js** ⭐ NUEVO
- Lógica de apertura al click
- Lógica de cierre con botón
- Cierre con tecla ESC

### 4. **js/app.js**
- Importa y ejecuta `initEnvelopeAnimation()`

---

## ✏️ Personalización

### **Cambiar el Texto Inicial (Sobre Cerrado)**

Edita `components/invitation.html` líneas 16-25:

```html
<p class="invitation-text">
    Tu texto personalizado aquí
</p>
<h3 class="names">Tu Nombre</h3>
<p class="ampersand">&</p>
<h3 class="names">Nombre de tu pareja</h3>
```

---

### **Cambiar los Detalles del Evento**

Edita `components/invitation.html` líneas 35-60:

```html
<div class="event-item">
    <i class="fas fa-calendar-alt"></i>
    <h4>Fecha</h4>
    <p>Tu fecha aquí</p>
</div>
```

---

### **Cambiar Colores del Sobre**

Edita `css/sections/invitation.css`:

**Color de la solapa:**
```css
.envelope-flap {
    border-top: 150px solid var(--primary-color);
    /* Cambia var(--primary-color) por tu color */
}
```

**Fondo del sobre:**
```css
.envelope-body {
    background: linear-gradient(135deg, 
        var(--accent-color) 0%, 
        rgba(191, 167, 125, 0.1) 100%);
    border: 3px solid var(--primary-color);
}
```

---

### **Cambiar Velocidad de Animación**

Edita `css/sections/invitation.css`:

```css
.envelope-flap {
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    /* Cambia 0.8s a tu preferencia:
       0.5s = más rápido
       1.2s = más lento */
}
```

---

### **Cambiar Texto del Botón**

Edita `components/invitation.html` línea 68:

```html
<button class="close-envelope" id="closeEnvelope">
    <i class="fas fa-times"></i> Cerrar
    <!-- Cambia "Cerrar" por tu texto -->
</button>
```

---

## 🎮 Interacciones

### **Click en el Sobre**
```javascript
envelope.addEventListener('click', function() {
    openEnvelope();
});
```
→ Abre el sobre con animación

### **Click en Botón Cerrar**
```javascript
closeButton.addEventListener('click', function() {
    closeEnvelope();
});
```
→ Cierra y vuelve al sobre

### **Tecla ESC**
```javascript
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEnvelope();
    }
});
```
→ Cierra con teclado

---

## 🎨 Efectos Visuales

### **1. Hover en el Sobre**
```css
.envelope:hover {
    transform: scale(1.02);
}
```
→ Crece ligeramente al pasar el mouse

### **2. Animación de "Click para abrir"**
```css
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
}
```
→ Pulsa suavemente para llamar atención

### **3. Entrada de Detalles**
```css
@keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
```
→ Los detalles suben suavemente

---

## 📱 Responsive

### **Tablet (768px)**
- Solapa más pequeña
- Nombres reducidos
- Padding ajustado

### **Móvil (480px)**
- Solapa compacta
- Texto más pequeño
- Grid a una columna

---

## 🎯 Casos de Uso

### **Agregar Más Detalles del Evento**

En `components/invitation.html`, dentro de `.event-details`:

```html
<div class="event-item">
    <i class="fas fa-music"></i>
    <h4>DJ</h4>
    <p>Música en vivo</p>
</div>
```

---

### **Cambiar Iconos**

Usa [Font Awesome](https://fontawesome.com/icons):

```html
<!-- Calendario -->
<i class="fas fa-calendar-alt"></i>

<!-- Reloj -->
<i class="fas fa-clock"></i>

<!-- Ubicación -->
<i class="fas fa-map-marker-alt"></i>

<!-- Música -->
<i class="fas fa-music"></i>

<!-- Cámara -->
<i class="fas fa-camera"></i>

<!-- Comida -->
<i class="fas fa-utensils"></i>
```

---

### **Agregar Más Información**

Después del código de vestimenta:

```html
<div class="extra-info">
    <h4>🎁 Mesa de Regalos</h4>
    <p>Consulta la sección de regalos</p>
</div>
```

---

## 🐛 Solución de Problemas

### **El sobre no se abre**
**Causa:** JavaScript no está cargado
**Solución:** Abre consola (F12) y busca errores

### **La animación es muy rápida/lenta**
**Solución:** Ajusta `transition: transform 0.8s` en `.envelope-flap`

### **Los colores no coinciden**
**Solución:** Verifica las variables en `css/base.css`:
```css
--primary-color: #BFA77D;
--accent-color: #A9A17A;
```

### **No funciona en móvil**
**Solución:** Revisa media queries en `invitation.css`

---

## 💡 Tips Pro

### ✅ **Agregar sonido al abrir**
```javascript
function openEnvelope() {
    const audio = new Audio('sounds/paper.mp3');
    audio.play();
    envelope.classList.add('opened');
}
```

### ✅ **Partículas al abrir**
Usa una librería como [particles.js](https://vincentgarreau.com/particles.js/)

### ✅ **Confeti al abrir**
Usa [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🎨 Variaciones de Diseño

### **Estilo Vintage**
```css
.envelope-body {
    background: #f4e4d7;
    border: 3px dashed var(--primary-color);
    font-family: 'Courier New', monospace;
}
```

### **Estilo Minimalista**
```css
.envelope-body {
    background: white;
    border: 1px solid #ccc;
    box-shadow: none;
}
```

### **Estilo Elegante con Sombra**
```css
.envelope {
    filter: drop-shadow(0 20px 50px rgba(0,0,0,0.3));
}
```

---

## 📋 Checklist de Personalización

- [ ] Cambiar nombres en el sobre
- [ ] Actualizar fecha del evento
- [ ] Modificar lugar de la boda
- [ ] Ajustar hora de inicio
- [ ] Personalizar código de vestimenta
- [ ] Cambiar colores del sobre
- [ ] Ajustar velocidad de animación
- [ ] Probar en móvil
- [ ] Verificar en diferentes navegadores

---

## 🎉 ¡Listo!

Tu invitación ahora tiene una animación elegante y profesional que impresionará a tus invitados.

**Para verla:**
1. Recarga el navegador: http://localhost:8000
2. Scroll hasta la sección "Invitación"
3. Click en el sobre
4. ¡Disfruta la animación! 💌✨

---

*Última actualización: Octubre 2024*

