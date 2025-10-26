# 🚀 Guía Rápida - Sitio Modular

## 📍 ¿Qué Quieres Modificar?

### 🎨 **CAMBIAR COLORES**
```
Archivo: css/base.css
Líneas: 5-11

:root {
    --primary-color: #BFA77D;      ← Cambiar aquí
    --secondary-color: #C97A57;    ← Cambiar aquí
    --accent-color: #A9A17A;       ← Cambiar aquí
}
```

---

### 📝 **MODIFICAR SECCIONES ESPECÍFICAS**

| Quiero cambiar... | Editar este archivo... |
|---|---|
| **🧭 Menú de navegación** | `css/sections/navigation.css` |
| **📸 Carousel de fotos** | `css/sections/hero.css` |
| **💌 Invitación** | `css/sections/invitation.css` |
| **⏰ Timeline del día** | `css/sections/timeline.css` |
| **🚗 Info de transporte** | `css/sections/info.css` |
| **✉️ Formulario RSVP** | `css/sections/rsvp.css` |
| **🎁 Mesa de regalos** | `css/sections/gifts.css` |
| **🎥 Subir videos** | `css/sections/video.css` |
| **👣 Footer** | `css/sections/footer.css` |
| **📱 Responsive/Móvil** | `css/sections/responsive.css` |

---

### ⚙️ **CONFIGURAR FUNCIONALIDADES**

#### 🖼️ Cambiar velocidad del carousel
```
Archivo: js/modules/swiper-init.js
Línea: 22

autoplay: {
    delay: 5000,    ← Cambiar tiempo en milisegundos
}
```

#### 📧 Conectar formulario RSVP
```
Archivo: js/modules/rsvp-form.js
Líneas: 38-48

// Descomentar y configurar:
fetch('https://formsubmit.co/tu-email@ejemplo.com', {
    method: 'POST',
    body: JSON.stringify(data)
})
```

#### ⏱️ Activar cuenta regresiva
```
Archivo: js/app.js
Línea: 28

// Descomentar:
import { initCountdown } from './modules/utils.js';

// Y en línea 40:
initCountdown('2026-06-15T17:00:00', 'countdown');
```

---

## 📦 Estructura de Archivos

```
wedding/
│
├── 📄 index.html              ← Estructura HTML
│
├── 🎨 CSS
│   ├── base.css               ← Variables y estilos base
│   └── sections/              ← Una sección = un archivo
│       ├── navigation.css
│       ├── hero.css
│       ├── invitation.css
│       ├── timeline.css
│       ├── info.css
│       ├── rsvp.css
│       ├── gifts.css
│       ├── video.css
│       ├── footer.css
│       └── responsive.css
│
├── ⚙️ JAVASCRIPT
│   ├── app.js                 ← Archivo principal
│   └── modules/               ← Funcionalidades separadas
│       ├── swiper-init.js     → Carousel
│       ├── navigation.js      → Menú
│       ├── scroll-effects.js  → Animaciones
│       ├── rsvp-form.js       → Formulario
│       └── utils.js           → Extras opcionales
│
└── 📚 DOCUMENTACIÓN
    ├── README.md              ← Documentación completa
    ├── ESTRUCTURA.md          ← Guía detallada
    └── GUIA_RAPIDA.md         ← Este archivo
```

---

## 🔥 Modificaciones Más Comunes

### 1️⃣ Cambiar Nombres
```html
Archivo: index.html

Buscar: "Yose & Benito"
Reemplazar con: tus nombres
```

### 2️⃣ Cambiar Fecha
```html
Archivo: index.html

Buscar: "15 de Junio, 2026"
Reemplazar con: tu fecha
```

### 3️⃣ Cambiar Lugar
```html
Archivo: index.html

Buscar: "Hacienda Los Jardines"
Reemplazar con: tu lugar
```

### 4️⃣ Actualizar Google Maps
```html
Archivo: index.html
Línea: ~380

<iframe src="TU_URL_DE_GOOGLE_MAPS"></iframe>
```

### 5️⃣ Cambiar Tipografía
```css
Archivo: css/base.css
Líneas: 20-21

--font-heading: 'Tu Fuente', serif;
--font-body: 'Tu Fuente', sans-serif;
```

---

## 🎯 Workflow de Edición

```
1. Identificar qué quieres cambiar
   ↓
2. Abrir el archivo correspondiente
   ↓
3. Hacer los cambios
   ↓
4. Guardar
   ↓
5. Recargar navegador (Cmd+R o F5)
   ↓
6. ✅ ¡Listo!
```

---

## 💡 Tips Pro

### ✅ Editar una sección a la vez
Modifica un archivo CSS de sección y recarga para ver los cambios. Así evitas romper todo el sitio.

### ✅ Usa las variables CSS
En lugar de cambiar colores en múltiples lugares, modifica las variables en `base.css`.

### ✅ Comenta antes de borrar
Si no estás seguro de un cambio, comenta el código (/* ... */) en lugar de borrarlo.

### ✅ Usa la consola del navegador
Presiona F12 para ver errores de JavaScript o CSS.

### ✅ Prueba en varios dispositivos
Usa el modo responsive del navegador (F12 → ícono de móvil).

---

## 🆘 Problemas Comunes

### ❌ "El sitio se ve sin estilos"
**Solución:** Verifica que las rutas en `index.html` sean correctas.

### ❌ "JavaScript no funciona"
**Solución:** Necesitas un servidor local. Usa:
```bash
python3 -m http.server 8000
```

### ❌ "El carousel no se mueve"
**Solución:** Verifica que Swiper.js esté cargando correctamente.

### ❌ "Los cambios no se ven"
**Solución:** Limpia la caché del navegador (Ctrl+Shift+R o Cmd+Shift+R).

---

## 📋 Checklist de Personalización

- [ ] Cambiar nombres en `index.html`
- [ ] Actualizar fecha y hora
- [ ] Modificar lugar del evento
- [ ] Cambiar paleta de colores en `base.css`
- [ ] Actualizar Google Maps
- [ ] Configurar mesa de regalos
- [ ] Conectar formulario RSVP
- [ ] Agregar tus fotos al carousel
- [ ] Probar en móvil
- [ ] Publicar el sitio

---

## 🎓 Archivos para Aprender Más

- **Principiante:** Empieza con `README.md`
- **Intermedio:** Lee `ESTRUCTURA.md` completo
- **Avanzado:** Explora el código con comentarios

---

## 🎉 ¡Listo para Empezar!

1. Abre `css/base.css` y cambia un color
2. Recarga el navegador
3. ¡Ve la magia! ✨

**¿Necesitas ayuda?** Todos los archivos tienen comentarios explicativos. ¡Lee el código! 💻

---

*Última actualización: Octubre 2024*

