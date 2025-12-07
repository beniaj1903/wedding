# Mi Mesa

Vista QR donde los invitados:

1. Se identifican con el mismo buscador del modal principal.
2. Ven la imagen/localización de su mesa.
3. Pueden subir fotos y videos a Google Drive mediante la Netlify Function `/.netlify/functions/upload`.

## Flujo

1. El modal (`welcome-modal.js`) se reutiliza en `mi-mesa.html` para validar al invitado.
2. `js/mi-mesa-main.js` obtiene la mesa asociada desde Firestore (`tables`).
3. La imagen de la mesa se cargas desde `media/table-images/{slug}.png`.
4. El área “Comparte tus fotos” gestiona drag & drop, validación y progreso.

## Imágenes de mesa

- Ubicación: `media/table-images/`.
- Formato recomendado: PNG 800x1200px exportado desde Canva.
- Nombre del archivo = `normalizeTableName(nombreMesa)` → minúsculas, sin acentos ni espacios (ej. “Mesa Sol” → `sol.png`).
- Si no existe la imagen, se muestra `#noImageMessage`.

## Subida de fotos

### Configuración en el frontend

En `mi-mesa.html` define (o sobrescribe) los valores:

```html
<script>
window.__MI_MESA_CONFIG__ = {
  driveUploadUrl: '/.netlify/functions/upload',
  driveFolderId: '179moh_1aiXIjE17kXNK_oqvVoYqj-_Oa',
  driveAuthToken: 'MI_MESA_2026'
};
</script>
```

El JS leerá esta configuración al iniciar y validará que exista `driveUploadUrl` antes de subir archivos.

### Validaciones

- Tipos permitidos: `image/*`, `video/*`.
- Tamaño máximo: 15 MB por archivo (configurable en `MAX_FILE_SIZE_MB`).
- Se normaliza el nombre final (`timestamp-table-slug-original.ext`) para evitar colisiones/acentos.
- Sin acceso de lectura: la Function no expone enlaces públicos, sólo crea el archivo en Drive.

### Backend serverless

- La Function espera un JSON con el archivo en base64 más metadata (el propio `js/mi-mesa-main.js` se encarga de armarlo).
- Debes definir las variables en Netlify:
  ```
  GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET
  GOOGLE_REFRESH_TOKEN
  GOOGLE_DRIVE_FOLDER_ID
  BACKEND_UPLOAD_TOKEN
  ALLOWED_ORIGINS
  ```
- El token viaja en `X-Upload-Token`; si no coincide, la Function devuelve 401.
- Los archivos se crean en la carpeta configurada y no generan enlace público.

## Personalización

- Puedes ajustar los textos y la UI en `css/sections/mi-mesa.css`.
- Si necesitas campos extra por invitado/mesa, amplía `buildUploadMetadata()` y el payload enviado a la Function.

