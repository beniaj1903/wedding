# 💍 Boda Yose & Benito

Sitio web oficial de la boda (10.10.2026) con selector de paletas, modal de bienvenida, vista “Mi Mesa” y subida serverless a Google Drive (Netlify Function).

## 🌐 Producción

- Sitio + Functions: [bodalosnenes.netlify.app](https://bodalosnenes.netlify.app)

## ✨ Características principales

- Diseño boho “Champagne Celestial” con selector de paletas.
- Modal de bienvenida con buscador conectado a Firestore.
- Animación del sobre y timeline completo del evento.
- Vista **Mi Mesa** con imágenes personalizadas y subida de fotos (sin exponer Drive).
- Live stream embebido, reproductor musical y sección de regalos.

## 📁 Carpetas clave

| Ruta | Descripción |
| --- | --- |
| `/index.html` | Landing completa (todas las secciones en un solo archivo). |
| `/mi-mesa.html` | Vista QR para invitados. |
| `/js/app.js` | Entrypoint del sitio principal (ES modules). |
| `/js/mi-mesa-main.js` | Lógica de identificación, mesas y uploads. |
| `/css/base.css` | Variables globales (paletas). |
| `/css/sections/` | Estilos por sección. |
| `/netlify/functions/upload.js` | Netlify Function que sube a Drive vía OAuth2. |
| `/docs/` | Documentación consolidada. |

## 🚀 Desarrollo local

```bash
# Servir los archivos estáticos (opción simple)
python -m http.server 8001
# http://localhost:8001

# Netlify Dev (para probar la Function /upload)
npm install
npm run dev   # inicia http://localhost:8888 y proxya /.netlify/functions/upload

# Configura tus variables
cp env.example .env   # completa los valores Firebase + Google OAuth
source .env && bash ./scripts/netlify-build.sh   # genera env.js (si sirves con python)
```

En `mi-mesa.html`, `driveUploadUrl` apunta por defecto a `/.netlify/functions/upload`, por lo que no necesitas cambios para local si usas `netlify dev`.

## 📚 Documentación

- [`docs/README.md`](docs/README.md) – índice de guías activas.
- [`docs/FRONTEND.md`](docs/FRONTEND.md) – arquitectura, módulos y CSS.
- [`docs/COLOR-PALETTES.md`](docs/COLOR-PALETTES.md) – sistema de temas.
- [`docs/MI-MESA.md`](docs/MI-MESA.md) – flujo completo de la vista QR.
- [`docs/GOOGLE-DRIVE.md`](docs/GOOGLE-DRIVE.md) – integración serverless con Drive.
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) – Netlify (sitio + Functions).

## ⚙️ Deploy

Netlify construye el sitio y empaqueta la Function `/upload` con esbuild (`scripts/netlify-build.sh`). Configura las variables de entorno (OAuth y token) en el panel de Netlify siguiendo `docs/DEPLOYMENT.md`.

## 💕 Hecho con amor

Yose & Benito · `#bodalosnenes`
