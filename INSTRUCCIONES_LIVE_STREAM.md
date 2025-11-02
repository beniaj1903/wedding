# 📺 Instrucciones: Transmisión en Vivo

Esta guía explica cómo configurar y activar la transmisión en vivo de YouTube para el día de la boda.

## 📋 Tabla de Contenidos
- [Antes del Evento](#antes-del-evento)
- [Configuración del Video ID](#configuración-del-video-id)
- [Activar el Live Stream](#activar-el-live-stream)
- [Durante el Evento](#durante-el-evento)
- [Después del Evento](#después-del-evento)

---

## 🎬 Antes del Evento

### 1. Crear el Live Stream en YouTube

1. Ve a [YouTube Studio](https://studio.youtube.com)
2. Click en **"Crear"** → **"Transmitir en vivo"**
3. Configura:
   - Título: "Boda Yoselyn y Benito - En Vivo"
   - Descripción
   - Privacidad: **Público** o **No listado** (recomendado)
   - Programación: 10 de Octubre, 2026 a las 19:00h
4. Click en **"Crear transmisión"**
5. **Copia el ID del video** (explicado abajo)

### 2. Obtener el Video ID

El Video ID es la parte del link después de `v=` o `watch?v=`

**Ejemplos:**
```
https://www.youtube.com/watch?v=ABC123xyz789
                                 └─────────┘
                                  VIDEO ID

https://youtube.com/live/ABC123xyz789
                         └─────────┘
                          VIDEO ID
```

---

## ⚙️ Configuración del Video ID

### Opción 1: Editar el archivo JavaScript (Recomendado)

Edita el archivo: `js/modules/live-stream.js`

```javascript
const LIVE_STREAM_CONFIG = {
    // Cambiar a true cuando el live stream esté activo
    isLive: false,  // ← Cambiar a true el día del evento
    
    // ID del video de YouTube (cambiar cuando tengas el link)
    videoId: 'TU_VIDEO_ID_AQUI',  // ← Reemplazar con tu Video ID
    
    // Fecha del evento
    eventDate: new Date('2026-10-10T19:00:00-03:00')
};
```

**Pasos:**
1. Reemplaza `'VIDEO_ID_AQUI'` con tu Video ID real
2. Cambia `isLive: false` a `isLive: true`
3. Guarda el archivo
4. Sube los cambios a GitHub:
   ```bash
   git add js/modules/live-stream.js
   git commit -m "feat: Activar live stream con Video ID"
   git push
   ```
5. Netlify desplegará automáticamente en 1-2 minutos

### Opción 2: Activar desde la Consola del Navegador (Rápido, Temporal)

Si necesitas activar el stream RÁPIDAMENTE sin hacer deploy:

1. Abre el sitio web
2. Presiona `F12` para abrir la consola
3. Ejecuta este comando (reemplaza `ABC123xyz789` con tu Video ID):

```javascript
import('./js/modules/live-stream.js').then(module => {
    module.activateLiveStream('ABC123xyz789');
});
```

⚠️ **Nota:** Esta opción es TEMPORAL. Se revertirá cuando los usuarios recarguen la página. Usa la Opción 1 para una solución permanente.

---

## 🔴 Activar el Live Stream

### El Día del Evento

**1 hora antes del evento (18:00h):**

1. **Método Automático** (si ya configuraste el Video ID):
   - El reproductor se mostrará automáticamente si `isLive: true`
   - Los usuarios verán el contador de YouTube esperando el inicio

2. **Método Manual** (consola):
   ```javascript
   import('./js/modules/live-stream.js').then(module => {
       module.activateLiveStream('TU_VIDEO_ID');
   });
   ```

---

## 📺 Durante el Evento

### Lo que Verán los Invitados

**Antes de activar (placeholder):**
- ✨ Mensaje "¡Próximamente!"
- 📅 Fecha y hora del evento
- ℹ️ Información sobre la transmisión

**Después de activar:**
- 📺 Reproductor de YouTube embebido
- 🔴 Indicador "EN VIVO" de YouTube
- 💬 Chat en vivo disponible
- 🔗 Botón "Ver en YouTube" para abrir en app
- 🔔 Botón "Activar Recordatorio"

### Probar la Transmisión

1. Abre el sitio en **modo incógnito**
2. Navega a la sección "En Vivo"
3. Verifica que el reproductor esté visible
4. Prueba el chat y controles

---

## ✅ Después del Evento

### Opción A: Mantener el Video Disponible

Si quieres que la grabación siga disponible:

1. No cambies nada
2. YouTube convertirá automáticamente el live en un video normal
3. Los invitados podrán seguir viéndolo

### Opción B: Desactivar la Sección

Si quieres ocultar la transmisión:

**Método 1: Ocultar completamente**
```javascript
// En js/modules/live-stream.js
const LIVE_STREAM_CONFIG = {
    isLive: false,  // ← Cambiar de nuevo a false
    videoId: 'TU_VIDEO_ID',
    eventDate: new Date('2026-10-10T19:00:00-03:00')
};
```

**Método 2: Desde consola (temporal)**
```javascript
import('./js/modules/live-stream.js').then(module => {
    module.deactivateLiveStream();
});
```

---

## 🛠️ Solución de Problemas

### El Reproductor No Aparece

**Verificar:**
1. ¿`isLive` está en `true`?
2. ¿El Video ID es correcto?
3. ¿La transmisión está configurada como "Pública" o "No listada"?
4. ¿Netlify terminó el deploy? (espera 2-3 minutos)

**Debugging:**
```javascript
// Abrir consola (F12) y ejecutar:
console.log(window.location.href);  // Verificar que estés en el sitio correcto
```

### El Video Dice "Video Privado"

- Cambia la privacidad del video a **"No listado"** o **"Público"** en YouTube Studio

### Los Invitados No Pueden Ver el Chat

- Asegúrate de que el chat esté habilitado en la configuración del live stream en YouTube

---

## 📱 Compartir con Invitados

### Mensaje Sugerido:

```
🎉 ¡No puedes asistir presencialmente? ¡No te lo pierdas!

Transmitiremos nuestra boda EN VIVO el 10 de Octubre a las 19:00h

🔗 Ver transmisión: [TU-SITIO-WEB.netlify.app]

💡 Guarda el link y únete el día de la boda
💬 Podrás dejarnos mensajes en el chat en vivo
```

---

## 🎯 Resumen Rápido

```bash
# 1. Obtén tu Video ID de YouTube
https://youtube.com/watch?v=ABC123xyz789
                           └─────────┘
                            Copiar esto

# 2. Edita js/modules/live-stream.js
videoId: 'ABC123xyz789',
isLive: true,

# 3. Sube cambios
git add .
git commit -m "feat: Activar live stream"
git push

# 4. Espera 2 minutos → ¡Listo! 🎉
```

---

## 📞 Soporte

Si tienes problemas, revisa:
- [YouTube Help - Live Streaming](https://support.google.com/youtube/topic/9257891)
- Consola del navegador (F12) para mensajes de error

---

**¡Disfruta tu transmisión en vivo!** 📺✨

