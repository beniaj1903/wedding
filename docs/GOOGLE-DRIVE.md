# Integración con Google Drive (Netlify Function)

## Objetivo

Subir fotos y videos desde la página **Mi Mesa** sin exponer la carpeta de Drive ni depender de un servidor dedicado. La Function `/.netlify/functions/upload` recibe el archivo en base64, valida un token y lo almacena en la carpeta compartida utilizando OAuth2 (Refresh Token) de tu cuenta personal.

## Componentes

| Componente | Rol |
| --- | --- |
| `netlify/functions/upload.js` | Maneja la petición, crea el `Readable` y llama a Google Drive API. |
| OAuth2 Web Client | Credenciales (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`). |
| Refresh Token | Generado una vez para tu cuenta (permite usar tu cuota personal). |
| Carpeta `179moh_1aiXIjE17kXNK_oqvVoYqj-_Oa` | Destino de las fotos (mantén acceso privado). |
| `window.__MI_MESA_CONFIG__` | Configuración del front (`driveUploadUrl`, token y folder opcional). |

## Paso a paso

1. **Crear credenciales OAuth**
   - Google Cloud Console → APIs & Services → Credentials → “Create credentials” → “OAuth client ID”.
   - Tipo: “Desktop” (para generar el Refresh Token fácilmente).
   - Descarga `client_secret.json`.

2. **Obtener el Refresh Token**
   - Crea un archivo `generate_token.py` localmente (ver sección “Utilidades” en este repo).
   - Ejecuta: `python generate_token.py`.
   - Autoriza con tu cuenta personal de Google y copia los valores mostrados:
     ```
     GOOGLE_CLIENT_ID=...
     GOOGLE_CLIENT_SECRET=...
     GOOGLE_REFRESH_TOKEN=...
     ```

3. **Configurar variables en Netlify**
   - En *Site settings → Build & deploy → Environment* agrega:
     ```
     GOOGLE_CLIENT_ID=...
     GOOGLE_CLIENT_SECRET=...
     GOOGLE_REFRESH_TOKEN=...
     GOOGLE_DRIVE_FOLDER_ID=179moh_1aiXIjE17kXNK_oqvVoYqj-_Oa
     BACKEND_UPLOAD_TOKEN=MI_MESA_2026      # cualquier string seguro
     ALLOWED_ORIGINS=https://bodalosnenes.netlify.app
     ```
     (Si trabajas con `netlify dev`, agrega `http://localhost:8888` a `ALLOWED_ORIGINS`.)

4. **Frontend**
   - `mi-mesa.html` ya apunta a `/.netlify/functions/upload`, sólo actualiza `driveAuthToken` si cambias el valor.
   - `js/mi-mesa-main.js` convierte cada archivo a base64 y lo envía junto con la metadata (nombre del invitado, mesa, etc.).

5. **Deployment**
   - `netlify/functions/upload.js` se empaqueta con esbuild (ver `netlify.toml`).
   - No se requiere backend externo ni hooks adicionales.

## Seguridad

- El token (`driveAuthToken`) viaja en el header `X-Upload-Token`. Cámbialo periódicamente.
- Las credenciales OAuth viven sólo en variables de entorno de Netlify.
- Los archivos se crean con `drive.file` (solo tu cuenta puede verlos).
- Usa `ALLOWED_ORIGINS` para limitar quién puede invocar la Function.

## Utilidades

- `generate_token.py` (executa localmente) abre el flujo de OAuth y muestra los valores para `.env`.
- Si quieres resetear el Refresh Token, vuelve a correr el script con el mismo cliente OAuth.

## Alternativas rápidas

Si prefieres no manejar OAuth/Functions:

1. **Google Forms con Upload** – simple, pero la UI es la de Google.
2. **Firebase Storage** – ya estás en Firebase; podrías guardar las fotos ahí.
3. **Cloudinary** – widget listo para subir y optimizar imágenes automáticamente.

Sin embargo, la Function en Netlify ofrece el mejor balance: UI integrada + tu cuota personal de Drive + sin servidores extras.

