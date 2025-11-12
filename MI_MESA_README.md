# 🪑 Mi Mesa - Documentación Completa

## 📋 Descripción

"Mi Mesa" es una página personalizada donde los invitados pueden:
1. **Identificarse** usando el mismo sistema del modal de bienvenida
2. **Ver su mesa asignada** con toda la información relevante
3. **Conocer a sus compañeros** de mesa
4. **Subir fotos** de la boda a una carpeta compartida

## 🎯 Flujo de Usuario

### Desde el Sitio Principal (index.html)

1. Usuario abre `index.html`
2. Se muestra el **Modal de Bienvenida**
3. Usuario busca y selecciona su nombre
4. Aparecen **2 opciones**:
   - 🏠 **"Entrar al sitio"** → Continúa en index.html
   - 🪑 **"Ver Mi Mesa"** → Va a mi-mesa.html

### Acceso Directo

1. Usuario va directamente a `mi-mesa.html`
2. Se muestra el modal de identificación
3. Después de identificarse, ve su información personalizada

## 📁 Archivos Creados

### HTML
- ✅ **`mi-mesa.html`** (409 líneas)
  - Modal de bienvenida/identificación
  - Navegación
  - Hero personalizado con nombre del invitado
  - Sección de información de la mesa
  - Sección de subida de fotos
  - Footer

### CSS
- ✅ **`css/sections/mi-mesa.css`** (538 líneas)
  - Hero personalizado con gradiente
  - Cards de información de mesa
  - Área de subida de fotos con drag & drop
  - Preview de archivos
  - Barras de progreso
  - Mensajes de éxito/error
  - Completamente responsive

### JavaScript
- ✅ **`js/mi-mesa-main.js`** (450+ líneas)
  - Manejo del modal de identificación
  - Búsqueda de invitados (integrado con Firebase)
  - Carga de información de mesas desde localStorage
  - Sistema de selección de archivos (drag & drop)
  - Preview de fotos/videos
  - Simulación de subida (listo para integrar con Google Drive)
  - Gestión de estado del usuario

### Documentación
- ✅ **`GOOGLE_DRIVE_INTEGRATION.md`** (500+ líneas)
  - Guía completa para integrar Google Drive API
  - Paso a paso con código
  - Alternativas (Firebase Storage, Cloudinary)
  - Configuración de seguridad
  - Ejemplos de código

- ✅ **`MI_MESA_README.md`** (este archivo)

## 🔧 Archivos Modificados

### `index.html`
- ✅ Agregado botón "Ver Mi Mesa" en el modal de bienvenida
- ✅ Aparece después de identificarse

### `css/sections/welcome-modal.css`
- ✅ Estilos para botón secundario `.welcome-btn-secondary`
- ✅ Gradientes y animaciones

### `js/modules/welcome-modal.js`
- ✅ Lógica para mostrar/ocultar botón "Mi Mesa"
- ✅ Integración con el flujo de identificación

## 🎨 Características Implementadas

### 1. Identificación de Invitados
- ✅ Búsqueda en tiempo real
- ✅ Autocompletado con sugerencias
- ✅ Integración con Firebase
- ✅ Persistencia en localStorage
- ✅ Opción de cambiar de invitado

### 2. Información de Mesa
- ✅ Nombre personalizado de la mesa
- ✅ Descripción de la mesa
- ✅ Capacidad total
- ✅ Asientos ocupados
- ✅ Área del evento
- ✅ Lista de compañeros de mesa con nombres
- ✅ Mensaje cuando no hay mesa asignada

### 3. Subida de Fotos
- ✅ **Drag & drop** de archivos
- ✅ Botón de selección manual
- ✅ **Preview** de imágenes antes de subir
- ✅ Soporte para **fotos y videos**
- ✅ Posibilidad de eliminar archivos del preview
- ✅ **Barra de progreso** durante la subida
- ✅ Contador de archivos
- ✅ Mensaje de éxito después de subir
- ✅ Opción de subir más archivos
- ✅ Instrucciones y consejos

### 4. Diseño
- ✅ Hero personalizado con nombre del invitado
- ✅ Animaciones suaves
- ✅ Gradientes de la paleta de colores
- ✅ Cards con sombras y efectos hover
- ✅ Iconos de Font Awesome
- ✅ **Completamente responsive** (móvil, tablet, desktop)

## 🚀 Cómo Usar

### Para Desarrollo

1. **Asegúrate de que el servidor esté corriendo:**
   ```bash
   python3 -m http.server 8000
   ```

2. **Accede a Mi Mesa:**
   ```
   http://localhost:8000/mi-mesa.html
   ```

3. **O desde el sitio principal:**
   ```
   http://localhost:8000/
   ```
   - Identifícate
   - Haz clic en "Ver Mi Mesa"

### Para Producción

1. **Subir todos los archivos nuevos:**
   - `mi-mesa.html`
   - `css/sections/mi-mesa.css`
   - `js/mi-mesa-main.js`
   - `GOOGLE_DRIVE_INTEGRATION.md`
   - `MI_MESA_README.md`

2. **Configurar Google Drive API** (ver `GOOGLE_DRIVE_INTEGRATION.md`)

3. **O usar alternativas:**
   - Firebase Storage (recomendado, ya tienes Firebase)
   - Cloudinary
   - Form de Google Forms

## 📊 Integración con Sitting Tables

La página "Mi Mesa" está **completamente integrada** con el sistema de mesas (`sitting-tables.html`):

- Lee los datos de `localStorage` donde `sitting-tables` guarda las mesas
- Busca automáticamente la mesa del invitado identificado
- Muestra los compañeros de mesa actualizados en tiempo real
- Si no hay mesa asignada, muestra mensaje apropiado

### Flujo de Datos

```
sitting-tables.html → localStorage ('weddingTables')
                            ↓
                     mi-mesa-main.js
                            ↓
                    Muestra en mi-mesa.html
```

## 🎯 Próximos Pasos

### Para Completar la Integración de Fotos

Tienes 3 opciones (en orden de facilidad):

#### Opción 1: Firebase Storage (Recomendada) ⭐
- Ya tienes Firebase configurado
- Más simple de implementar
- Mejor rendimiento para fotos
- Ver sección en `GOOGLE_DRIVE_INTEGRATION.md`

#### Opción 2: Google Drive API
- Permite a invitados ver todas las fotos en Drive
- Más complejo de configurar
- Guía completa en `GOOGLE_DRIVE_INTEGRATION.md`

#### Opción 3: Google Forms
- Solución más simple sin código
- Crear un form con campo de subida
- Incrustar en la página
- Ver sección en `GOOGLE_DRIVE_INTEGRATION.md`

### Mejoras Futuras (Opcionales)

- [ ] Galería de fotos ya subidas por otros invitados
- [ ] Filtros y efectos para fotos antes de subir
- [ ] Notificaciones cuando alguien sube una foto
- [ ] Comentarios en las fotos
- [ ] Descarga masiva de todas las fotos
- [ ] Integración con redes sociales
- [ ] QR code para acceso rápido a Mi Mesa

## 🎨 Personalización

### Cambiar Colores

Los colores se adaptan automáticamente a la paleta seleccionada en el selector de paletas.

### Modificar Textos

Edita `mi-mesa.html` directamente:
- Línea 48: Título del modal
- Línea 49: Subtítulo
- Línea 135: Título del hero
- Línea 143-145: Títulos de secciones

### Ajustar Estilos

Edita `css/sections/mi-mesa.css`:
- `.hero-personal`: Hero con nombre
- `.table-card-display`: Card de información de mesa
- `.upload-area`: Área de subida de fotos

## 📱 Responsive Design

La página está completamente optimizada para:

- 📱 **Móviles** (< 480px)
  - Layout de una columna
  - Botones full-width
  - Textos adaptados

- 📱 **Móviles grandes / Tablets** (480px - 768px)
  - Grid de 2 columnas para previews
  - Espaciado optimizado

- 💻 **Desktop** (> 768px)
  - Grid de múltiples columnas
  - Layout completo

## 🔒 Seguridad

### Actualmente Implementado
- ✅ Validación de tipos de archivo (solo imágenes/videos)
- ✅ Identificación de invitado requerida
- ✅ Datos guardados en localStorage (solo cliente)

### Para Producción (Recomendado)
- [ ] Validación de tamaño de archivos (ej: max 10MB)
- [ ] Rate limiting (limitar uploads por usuario/tiempo)
- [ ] Autenticación con backend
- [ ] Sanitización de nombres de archivo
- [ ] Virus scan antes de subir

## 📈 Analytics

Para seguimiento de uso, podrías agregar:

```javascript
// En mi-mesa-main.js
function trackEvent(event, data) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', event, data);
    }
    
    // O tu sistema de analytics preferido
}

// Ejemplos
trackEvent('page_view', { page: 'mi-mesa' });
trackEvent('photo_upload', { count: selectedFiles.length });
trackEvent('table_view', { table_name: guestTable.name });
```

## 🐛 Troubleshooting

### El modal no aparece
- Verifica que `welcome-modal.css` esté cargado
- Revisa la consola por errores de JavaScript

### No se muestra la mesa
- Verifica que haya datos en localStorage: `weddingTables`
- Asegúrate de que el invitado esté asignado a una mesa en `sitting-tables.html`

### Las fotos no se suben
- Por ahora es una simulación
- Implementa una de las opciones en `GOOGLE_DRIVE_INTEGRATION.md`

### El botón "Mi Mesa" no aparece en index.html
- Asegúrate de haber guardado los cambios en `index.html`
- Verifica que `welcome-modal.js` se haya actualizado
- Recarga con Ctrl+Shift+R (hard refresh)

## 📞 Soporte

Para más información sobre:
- **Google Drive**: Ver `GOOGLE_DRIVE_INTEGRATION.md`
- **Paletas de colores**: Ver `GUIA_SELECTOR_PALETAS.md`
- **Firebase**: Ver `FIREBASE_SETUP.md`
- **Mesas**: Ver archivos en `sitting_tables.html`

## ✅ Checklist de Implementación

- [x] Crear página HTML
- [x] Crear estilos CSS
- [x] Crear lógica JavaScript
- [x] Integrar con modal de bienvenida
- [x] Agregar botón en index.html
- [x] Integrar con sistema de mesas
- [x] Crear documentación
- [ ] Configurar subida real de fotos (pendiente - elegir opción)
- [ ] Testing en diferentes dispositivos
- [ ] Deploy a producción

---

**Creado para:** Boda Yose & Benito  
**Fecha:** 10 de Octubre, 2026  
**Última actualización:** Hoy

¡La página "Mi Mesa" está lista para usar! 🎉

