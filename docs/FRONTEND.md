# Frontend Overview

## Estructura general

```
.
├── index.html             # Landing principal (secciones completas en HTML)
├── css/
│   ├── base.css           # Variables globales, reset y helpers
│   ├── sections/          # Estilos por sección (hero, timeline, info, etc.)
│   └── styles.css         # Estilos legacy (se mantiene por compatibilidad)
├── js/
│   ├── app.js             # Punto de entrada (ESM)
│   ├── mi-mesa-main.js    # Lógica específica de la vista Mi Mesa
│   ├── color-selector-main.js
│   └── modules/           # Módulos reutilizables (Swiper, live stream, gifts…)
├── media/                 # Imágenes locales (incluye `table-images/`)
└── docs/                  # Documentación
```

El HTML ya incluye todas las secciones, de modo que los módulos sólo inicializan comportamiento. Los componentes dinámicos y el antiguo `component-loader` fueron removidos.

## Entrypoints

| Archivo | Rol |
| --- | --- |
| `js/app.js` | Inicializa Swiper, navegación, música, modal de bienvenida, etc. |
| `js/mi-mesa-main.js` | Identificación de invitados, carga de mesa y subida de fotos. |
| `js/color-selector-main.js` | Vista de comparación de paletas. |

## CSS

- **Variables:** definidas en `css/base.css` (`--color-champagne-light`, etc.).
- **Secciones:** cada sección mayor tiene su propio archivo dentro de `css/sections/`.
- **Paletas:** `color-palette.js` actualiza todas las variables CSS.

## JS Modules destacados

| Módulo | Descripción |
| --- | --- |
| `modules/navigation.js` | Menú fijo + hamburguesa móvil. |
| `modules/welcome-modal.js` | Identificación de invitados y almacenamiento temporal. |
| `modules/envelope-animation.js` | Apertura/cierre del sobre en la invitación. |
| `modules/music-player.js` | Control del reproductor flotante. |
| `modules/live-stream.js` | Configuración del embed de YouTube (ver `INSTRUCCIONES_LIVE_STREAM` incorporado aquí). |

## Firebase

El proyecto usa Firestore únicamente para:

- `buscarInvitados` (autocompletado del modal y de Mi Mesa).
- `sitting_tables` (admin y asociación invitado/mesa).

La configuración está en `js/firebase-config.js`; asegúrate de definir las variables de entorno cuando generes el build (ver `docs/DEPLOYMENT.md`).

## Assets locales

- `media/table-images/` → imágenes PNG una por mesa (`sol.png`, `luna.png`, …).
- `media/envelope/*` → assets de la animación del sobre.

Usa `docs/MI-MESA.md` para conocer la convención exacta de nombres.

