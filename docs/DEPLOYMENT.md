# Deployment & Entornos

## Desarrollo local

### Sitio estático

```bash
python -m http.server 8001
# http://localhost:8001
```

### Netlify Dev (sitio + Function)

```bash
npm install
npm run dev   # levanta http://localhost:8888 y proxya /.netlify/functions/upload
```

Agrega estas variables en un archivo `.env` (Netlify CLI las leerá si usas `netlify dev`):

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_DRIVE_FOLDER_ID=179moh_1aiXIjE17kXNK_oqvVoYqj-_Oa
BACKEND_UPLOAD_TOKEN=MI_MESA_2026
ALLOWED_ORIGINS=http://localhost:8888
```

## Netlify (Producción)

El sitio se publica desde la raíz. `netlify.toml` configura:

```toml
[build]
  publish = "."
  command = "bash ./scripts/netlify-build.sh"

[functions]
  node_bundler = "esbuild"
  external_node_modules = ["googleapis"]
```

En *Site settings → Build & deploy → Environment* define:

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_DRIVE_FOLDER_ID=179moh_1aiXIjE17kXNK_oqvVoYqj-_Oa
BACKEND_UPLOAD_TOKEN=MI_MESA_2026
ALLOWED_ORIGINS=https://bodalosnenes.netlify.app
```

Con esto la Function `/.netlify/functions/upload` queda desplegada junto con el sitio.

### Generar el Refresh Token

Ejecuta `python generate_token.py` (con `client_secret.json` en la raíz). Al finalizar, copia los valores mostrados en las variables de entorno de Netlify.

### Variables de Firebase

Define las credenciales de tu proyecto para que la Function `firebase-config` pueda exponer `window.__FIREBASE_CONFIG__`:

```
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
```

Estas variables sólo viven en Netlify (o en tu `.env` cuando ejecutes `netlify dev`). No se generan archivos con secretos durante el build.

## Entornos y configuración

| Variable | Dónde se usa | Descripción |
| --- | --- | --- |
| `driveUploadUrl` | `mi-mesa.html` | URL de la Function (default `/.netlify/functions/upload`). |
| `driveAuthToken` | `mi-mesa.html` | Debe coincidir con `BACKEND_UPLOAD_TOKEN`. |
| `FIREBASE_*` | Netlify env / Function `firebase-config` | Credenciales de Firebase (ver lista anterior). |
| `GOOGLE_CLIENT_ID`/`SECRET` | Netlify env | Credenciales OAuth (cuenta personal). |
| `GOOGLE_REFRESH_TOKEN` | Netlify env | Refresh token obtenido con `generate_token.py`. |
| `GOOGLE_DRIVE_FOLDER_ID` | Netlify env | Carpeta destino (puede variar por entorno). |
| `ALLOWED_ORIGINS` | Netlify env | Dominios autorizados para la Function. |

## Flujo recomendado

1. `git push main`.
2. Netlify ejecuta `scripts/netlify-build.sh` (sin pasos adicionales).
3. Esbuild empaqueta `netlify/functions/upload.js`.
4. El sitio queda disponible y `mi-mesa.html` consume `/.netlify/functions/upload` automáticamente.

