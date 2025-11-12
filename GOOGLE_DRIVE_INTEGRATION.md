# 📤 Integración con Google Drive API

## Descripción

Esta guía explica cómo integrar Google Drive API para permitir que los invitados suban fotos directamente a una carpeta compartida de Google Drive desde la página "Mi Mesa".

## 🎯 Objetivo

Permitir que los invitados suban sus fotos y videos de la boda a una carpeta centralizada de Google Drive sin necesidad de que inicien sesión con sus cuentas de Google.

## 📋 Requisitos Previos

1. **Cuenta de Google** con Google Drive
2. **Proyecto en Google Cloud Console**
3. **API Key** para Google Drive API
4. **Carpeta de Drive** donde se guardarán las fotos

## 🚀 Paso 1: Crear Proyecto en Google Cloud

### 1.1 Acceder a Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombra el proyecto: "Boda-Yose-Benito" (o similar)

### 1.2 Habilitar Google Drive API

1. En el menú lateral, ve a **"APIs & Services"** → **"Library"**
2. Busca **"Google Drive API"**
3. Haz clic en **"Enable"**

### 1.3 Crear Credenciales

1. Ve a **"APIs & Services"** → **"Credentials"**
2. Haz clic en **"Create Credentials"** → **"API Key"**
3. Copia la API Key generada (la necesitarás más tarde)
4. Haz clic en **"Restrict Key"** para configurar restricciones:
   - **Application restrictions**: HTTP referrers
   - Agrega tu dominio: `https://tudominio.com/*`
   - **API restrictions**: Solo Google Drive API

### 1.4 Configurar OAuth 2.0 (Opcional pero recomendado)

1. Ve a **"OAuth consent screen"**
2. Configura como **"External"**
3. Completa la información requerida
4. En **"Credentials"**, crea **"OAuth 2.0 Client ID"**
5. Tipo: **Web application**
6. Agrega authorized JavaScript origins y redirect URIs

## 🗂️ Paso 2: Preparar Carpeta de Google Drive

### 2.1 Crear Carpeta

1. Ve a [Google Drive](https://drive.google.com/)
2. Crea una carpeta llamada **"Fotos Boda - Yose & Benito"**
3. Haz clic derecho → **"Compartir"**
4. Configura permisos:
   - **Cualquier persona con el enlace** → **Editor** (para permitir subidas)
5. Copia el **ID de la carpeta** de la URL:
   ```
   https://drive.google.com/drive/folders/FOLDER_ID_AQUI
   ```

## 💻 Paso 3: Implementar en el Código

### 3.1 Crear Módulo de Google Drive

Crea el archivo: `js/modules/google-drive-upload.js`

```javascript
/**
 * GOOGLE DRIVE UPLOAD MODULE
 * Maneja la subida de archivos a Google Drive
 */

const API_KEY = 'TU_API_KEY_AQUI';
const FOLDER_ID = 'TU_FOLDER_ID_AQUI';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let gapiInited = false;
let gisInited = false;
let tokenClient;
let accessToken = null;

/**
 * Inicializar Google API
 */
export async function initGoogleDrive() {
    try {
        await loadGoogleAPI();
        return true;
    } catch (error) {
        console.error('Error al inicializar Google Drive:', error);
        return false;
    }
}

/**
 * Cargar Google API
 */
function loadGoogleAPI() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
            gapi.load('client', async () => {
                await gapi.client.init({
                    apiKey: API_KEY,
                    discoveryDocs: DISCOVERY_DOCS,
                });
                gapiInited = true;
                resolve();
            });
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Subir archivo a Google Drive
 * @param {File} file - Archivo a subir
 * @param {Function} onProgress - Callback para progreso
 */
export async function uploadToDrive(file, onProgress) {
    if (!gapiInited) {
        throw new Error('Google Drive API no inicializada');
    }
    
    const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: [FOLDER_ID]
    };
    
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    
    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable && onProgress) {
                const percentComplete = (e.loaded / e.total) * 100;
                onProgress(percentComplete);
            }
        });
        
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error('Error al subir archivo'));
            }
        });
        
        xhr.addEventListener('error', () => reject(new Error('Error de red')));
        
        xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
        xhr.setRequestHeader('Authorization', `Bearer ${API_KEY}`);
        xhr.send(form);
    });
}

/**
 * Subir múltiples archivos
 * @param {File[]} files - Archivos a subir
 * @param {Function} onFileProgress - Callback para progreso de cada archivo
 * @param {Function} onTotalProgress - Callback para progreso total
 */
export async function uploadMultipleFiles(files, onFileProgress, onTotalProgress) {
    const results = [];
    let completed = 0;
    
    for (let i = 0; i < files.length; i++) {
        try {
            const result = await uploadToDrive(files[i], (progress) => {
                if (onFileProgress) {
                    onFileProgress(i, progress);
                }
            });
            results.push({ success: true, file: files[i], result });
            completed++;
            
            if (onTotalProgress) {
                onTotalProgress(completed, files.length);
            }
        } catch (error) {
            console.error(`Error al subir ${files[i].name}:`, error);
            results.push({ success: false, file: files[i], error });
        }
    }
    
    return results;
}
```

### 3.2 Actualizar mi-mesa-main.js

Reemplaza la función `handleUpload` en `js/mi-mesa-main.js`:

```javascript
import { uploadMultipleFiles, initGoogleDrive } from './modules/google-drive-upload.js';

// Al inicio del archivo, después de DOMContentLoaded
await initGoogleDrive();

// Reemplazar función handleUpload
async function handleUpload() {
    if (selectedFiles.length === 0) return;
    
    const filesPreview = document.getElementById('filesPreview');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    filesPreview.style.display = 'none';
    uploadProgress.style.display = 'block';
    
    try {
        await uploadMultipleFiles(
            selectedFiles,
            (index, progress) => {
                // Progreso individual
                console.log(`Archivo ${index}: ${progress}%`);
            },
            (completed, total) => {
                // Progreso total
                const percent = Math.round((completed / total) * 100);
                progressBar.style.width = `${percent}%`;
                progressBar.textContent = `${percent}%`;
                progressText.textContent = `${completed} de ${total} archivos subidos`;
            }
        );
        
        // Mostrar éxito
        uploadProgress.style.display = 'none';
        uploadSuccess.style.display = 'block';
        selectedFiles = [];
        document.getElementById('fileInput').value = '';
        
    } catch (error) {
        console.error('Error en subida:', error);
        alert('Hubo un error al subir los archivos. Por favor intenta de nuevo.');
        uploadProgress.style.display = 'none';
        filesPreview.style.display = 'block';
    }
}
```

### 3.3 Agregar Script de Google API al HTML

En `mi-mesa.html`, antes del cierre de `</body>`:

```html
<!-- Google API -->
<script src="https://apis.google.com/js/api.js"></script>
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

## 🔐 Paso 4: Configurar Variables de Entorno

### 4.1 Crear archivo de configuración

Crea `js/config.js`:

```javascript
export const GOOGLE_DRIVE_CONFIG = {
    API_KEY: 'TU_API_KEY_AQUI',
    FOLDER_ID: 'TU_FOLDER_ID_AQUI',
    CLIENT_ID: 'TU_CLIENT_ID_AQUI' // Opcional
};
```

### 4.2 Gitignore

Agrega a `.gitignore`:

```
js/config.js
```

### 4.3 Usar variables

Importa en `google-drive-upload.js`:

```javascript
import { GOOGLE_DRIVE_CONFIG } from '../config.js';

const API_KEY = GOOGLE_DRIVE_CONFIG.API_KEY;
const FOLDER_ID = GOOGLE_DRIVE_CONFIG.FOLDER_ID;
```

## 🎨 Alternativa: Usar Form de Google Forms

Si prefieres una solución más simple sin código:

1. Crea un **Google Form** con campo de subida de archivos
2. Configura para guardar en Drive
3. Incrusta el form en `mi-mesa.html`:

```html
<iframe 
    src="https://docs.google.com/forms/d/e/TU_FORM_ID/viewform?embedded=true" 
    width="100%" 
    height="800" 
    frameborder="0">
    Cargando…
</iframe>
```

## 📊 Alternativa: Cloudinary o Firebase Storage

### Cloudinary (Recomendado para fotos)

Más simple y optimizado para imágenes:

```javascript
// Configurar Cloudinary
const cloudinary = window.cloudinary;
const widget = cloudinary.createUploadWidget({
    cloudName: 'tu-cloud-name',
    uploadPreset: 'tu-preset'
}, (error, result) => {
    if (!error && result.event === "success") {
        console.log('Subido:', result.info);
    }
});

// Abrir widget
widget.open();
```

### Firebase Storage

Ya tienes Firebase configurado, puedes usar Storage:

```javascript
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase-config.js';

async function uploadToFirebase(file) {
    const storageRef = ref(storage, `fotos-boda/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Progreso:', progress);
            },
            (error) => reject(error),
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
            }
        );
    });
}
```

## ✅ Verificación

1. Abre `mi-mesa.html`
2. Identifícate como invitado
3. Intenta subir una foto
4. Verifica en Google Drive que aparezca en la carpeta

## 🔒 Seguridad

- Limita el tamaño de archivos (ej: 10MB)
- Valida tipos de archivo
- Implementa rate limiting
- Usa HTTPS siempre
- No expongas la API Key en el código cliente (usa backend)

## 📝 Notas

- Para producción, es mejor usar un **backend** que maneje las credenciales
- Google Drive API tiene límites de cuota
- Considera **Firebase Storage** o **Cloudinary** para mejor rendimiento
- Implementa validación de archivos antes de subir

---

**Creado para:** Boda Yose & Benito  
**Fecha:** 10 de Octubre, 2026

