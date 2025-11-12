# Mi Mesa - Sistema de Imágenes Locales

## ✅ Sistema Actualizado

Las imágenes de las mesas ahora se cargan **automáticamente desde el proyecto**, eliminando la necesidad de URLs externas.

---

## 📂 Estructura de Archivos

```
wedding/
├── media/
│   └── table-images/
│       ├── sol.png      ✅ Ya existe
│       ├── luna.png     ← Agregar
│       ├── estrella.png ← Agregar
│       ├── venus.png    ← Agregar
│       └── ...
```

---

## 🎯 Cómo Funciona

### 1. **Nombre de la Mesa**
Cuando creas una mesa con el nombre **"SOL"**

### 2. **Normalización Automática**
El sistema convierte el nombre:
- `"SOL"` → `"sol"`
- `"LUNA"` → `"luna"`
- `"La Estrella"` → `"la-estrella"`
- `"Júpiter"` → `"jupiter"`

### 3. **Búsqueda de Imagen**
El sistema busca: `media/table-images/{nombre-normalizado}.png`

Ejemplo:
- Mesa "SOL" → busca `media/table-images/sol.png`
- Mesa "LUNA" → busca `media/table-images/luna.png`

---

## 📋 Reglas de Normalización

El nombre de la mesa se normaliza automáticamente:

| Mesa Original | Archivo Buscado |
|--------------|-----------------|
| SOL          | sol.png         |
| LUNA         | luna.png        |
| La Estrella  | la-estrella.png |
| Júpiter      | jupiter.png     |
| Mesa 1       | mesa-1.png      |

**Transformaciones:**
- ✅ Minúsculas
- ✅ Espacios → guiones (`-`)
- ✅ Acentos removidos (é → e, ñ → n)
- ✅ Caracteres especiales removidos

---

## 🎨 Preparar tus Imágenes

### Paso 1: Diseñar en Canva
1. Crea diseño vertical: **800x1200px** (o similar)
2. Incluye:
   - Nombre de la mesa
   - Frases personalizadas
   - Iconografía temática
   - Tu diseño completo

### Paso 2: Exportar
1. Descarga como **PNG** (mejor calidad) o JPG
2. Peso recomendado: < 1MB
3. Nombre del archivo: **nombre de la mesa en minúsculas**

### Paso 3: Colocar en el Proyecto
1. Guarda la imagen en: `/media/table-images/`
2. Nombre del archivo debe coincidir con el nombre de la mesa
3. Formato: `.png` (recomendado)

---

## 📝 Ejemplos Completos

### Ejemplo 1: Mesa SOL
```
1. Nombre de mesa: "SOL"
2. Diseñar imagen en Canva
3. Exportar como PNG
4. Guardar en: media/table-images/sol.png
5. ✅ Listo - se mostrará automáticamente
```

### Ejemplo 2: Mesa LUNA
```
1. Nombre de mesa: "LUNA"
2. Diseñar imagen en Canva
3. Exportar como PNG
4. Guardar en: media/table-images/luna.png
5. ✅ Listo
```

### Ejemplo 3: Mesa con Espacio
```
1. Nombre de mesa: "LA ESTRELLA"
2. Diseñar imagen en Canva
3. Exportar como PNG
4. Guardar en: media/table-images/la-estrella.png
5. ✅ Listo
```

---

## 🪐 Nombres Sugeridos de Mesas

### Planetas:
- ☀️ **SOL** → `sol.png`
- 🌙 **LUNA** → `luna.png`
- 🪐 **VENUS** → `venus.png`
- 🔴 **MARTE** → `marte.png`
- 🟡 **JÚPITER** → `jupiter.png`
- 🟠 **SATURNO** → `saturno.png`
- 🔵 **NEPTUNO** → `neptuno.png`
- ⚪ **URANO** → `urano.png`

### Estrellas y Constelaciones:
- ⭐ **ESTRELLA** → `estrella.png`
- 🌟 **SIRIO** → `sirio.png`
- ✨ **ANDRÓMEDA** → `andromeda.png`
- 💫 **COSMOS** → `cosmos.png`

---

## 🔄 Flujo Completo

```
1. Crea mesa "SOL" en sitting_tables.html
         ↓
2. Diseña imagen en Canva (800x1200px)
         ↓
3. Exporta como sol.png
         ↓
4. Guarda en media/table-images/sol.png
         ↓
5. Asigna invitados a mesa SOL
         ↓
6. Invitado escanea QR → mi-mesa.html
         ↓
7. Se identifica
         ↓
8. Sistema busca: media/table-images/sol.png
         ↓
9. ✅ Imagen se muestra automáticamente
```

---

## ⚠️ Qué Pasa Si...

### ❌ La imagen no existe
```
Mesa: "SOL"
Archivo esperado: media/table-images/sol.png
Estado: ❌ No existe

Resultado: Se muestra mensaje:
"Imagen en preparación
Estamos preparando algo especial..."
```

### ✅ La imagen existe
```
Mesa: "SOL"
Archivo: media/table-images/sol.png ✅
Resultado: Imagen se muestra correctamente
```

### ⚠️ Nombre no coincide
```
Mesa: "SOL"
Archivo: media/table-images/Sol.png ❌ (mayúscula)
Resultado: No se encuentra (debe ser minúscula)

Solución: Renombrar a sol.png
```

---

## 🛠️ Verificación Técnica

### En el navegador (Console):
```javascript
// Ver qué imagen está buscando
✅ Cargando imagen de mesa: media/table-images/sol.png

// Si no encuentra la imagen
⚠️ Imagen no encontrada: media/table-images/luna.png
```

---

## 📐 Especificaciones de Imagen

### Dimensiones Recomendadas:
- **Ancho**: 800-1000px
- **Alto**: 1000-1400px
- **Formato**: PNG (preferido) o JPG
- **Peso**: < 1MB
- **Aspect Ratio**: Vertical o cuadrado

### Diseño Sugerido:
```
┌─────────────────────┐
│   NOMBRE MESA       │ ← Grande, elegante
│                     │
│  Frase principal    │ ← Cursiva/script
│  sobre la mesa      │
│                     │
│   [ICONO GRANDE]    │ ← Ilustración temática
│                     │
│ "Estas en esta      │
│  mesa porque..."    │
│                     │
│  [Icono pequeño]    │
│                     │
│  Característica     │
│  personalizada      │
└─────────────────────┘
```

---

## ✅ Ventajas del Sistema Local

✅ **Simplicidad** - No necesitas hosting externo
✅ **Velocidad** - Carga más rápida (archivos locales)
✅ **Control** - Todo en tu proyecto
✅ **Sin URLs** - No más links largos
✅ **Automático** - Solo nombra el archivo correctamente

---

## 🔧 Solución de Problemas

### Problema 1: Imagen no se muestra
**Verifica:**
1. ✅ Archivo existe en `media/table-images/`
2. ✅ Nombre es minúsculas (ej: `sol.png` no `Sol.png`)
3. ✅ Formato es `.png`
4. ✅ Nombre de archivo coincide con nombre de mesa

### Problema 2: Imagen se ve pixelada
**Solución:**
- Exporta en mayor resolución desde Canva
- Mínimo 800x1000px
- Usa PNG en lugar de JPG

### Problema 3: Archivo muy pesado
**Solución:**
- Optimiza con TinyPNG: https://tinypng.com/
- Mantén peso < 1MB

---

## 📋 Checklist por Mesa

Para cada mesa:
- [ ] Crear mesa en `sitting_tables.html` con nombre
- [ ] Diseñar imagen en Canva (800x1200px)
- [ ] Exportar como PNG
- [ ] Renombrar archivo a nombre de mesa en minúsculas
- [ ] Guardar en `media/table-images/`
- [ ] Verificar que el nombre coincida exactamente
- [ ] Asignar invitados a la mesa
- [ ] Probar en `mi-mesa.html`

---

## 📱 Vista en Dispositivos

### Desktop:
- Imagen max 700px ancho
- Centrada con padding
- Border radius elegante
- Sombra suave

### Tablet:
- Imagen 100% ancho
- Padding reducido

### Mobile:
- Full width con padding mínimo
- Border radius suave
- Optimizada para pantallas pequeñas

---

## 🎨 Paleta de Colores Sugerida

Para consistencia visual en tus diseños:

```css
Fondo principal: #EAD7B6 (Champagne)
Texto oscuro: #7C3F44 (Vinotinto)
Dorado/Beige: #BFA77D
Terracota: #C97A57
Verde oliva: #A9A17A
Crema: #F8F4EC
```

---

## 📚 Archivos del Sistema

**Archivos modificados:**
- ✅ `js/mi-mesa-main.js` - Lógica de carga local
- ✅ `sitting_tables.html` - Información actualizada
- ✅ `js/modules/sitting-tables.js` - Sin campo imageUrl

**Estructura de datos:**
```javascript
// Firebase - Mesa
{
  id: "table_123",
  name: "SOL",      // ← Importante: determina la imagen
  capacity: 8,
  type: "round",
  notes: "Mesa cerca de la pista"
}

// El sistema automáticamente busca:
// media/table-images/sol.png
```

---

## 🚀 Estado Actual

✅ **Sistema implementado y funcionando**
✅ **Imagen SOL ya agregada** (`sol.png`)
✅ **Normalización automática funcionando**
✅ **Manejo de errores implementado**

**Pendiente:**
- [ ] Diseñar y agregar imágenes para otras mesas
- [ ] Probar con diferentes nombres de mesas

---

**Última actualización**: 12 de noviembre de 2025
**Versión**: 4.0 - Imágenes Locales Automáticas

