# 🔥 Configuración Firebase - Sistema RSVP

## ✅ Estado Actual

✔️ Firebase configurado
✔️ Firestore Database habilitado
✔️ Formulario RSVP con autocompletado
✔️ Panel de administración

---

## 📋 Estructura de la Base de Datos

### Colección: `invitados`

Contiene la lista maestra de todos los invitados.

```javascript
{
  nombreCompleto: "Rodrigo Harcha",
  cuposAsignados: 1,
  email: "rodrigo@email.com",
  telefono: "+56912345678",
  grupo: "Amigos",
  invitadoPor: "Benito",
  createdAt: timestamp
}
```

### Colección: `confirmaciones`

Contiene todas las respuestas RSVP.

```javascript
{
  invitadoId: "abc123",
  nombreCompleto: "Rodrigo Harcha",
  email: "rodrigo@email.com",
  telefono: "+56912345678",
  confirmado: true,
  cuposConfirmados: 1,
  necesitaTransporte: false,
  restriccionesAlimenticias: "Sin gluten",
  mensaje: "¡Felicidades!",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 🚀 Cómo Usar

### 1. Agregar Invitados

**Opción A: Panel de Administración**

1. Abre `http://localhost:8000/admin.html` (o tu URL de Netlify + `/admin.html`)
2. Rellena el formulario "Agregar Nuevo Invitado"
3. Haz clic en "Agregar Invitado"

**Opción B: Consola de Firebase**

1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Selecciona tu proyecto `boda-yoselyn-benito`
3. Ve a "Firestore Database"
4. Crea documentos en la colección `invitados`

**Opción C: Importar desde Excel/CSV (Recomendado para muchos invitados)**

1. Prepara un archivo CSV con columnas:
   - nombreCompleto
   - cuposAsignados
   - email
   - telefono
   - grupo

2. Usa la consola de Firebase o un script para importar

---

### 2. Ver Confirmaciones

**Panel de Administración:**
- Abre `http://localhost:8000/admin.html`
- Verás estadísticas en tiempo real
- Lista completa de confirmaciones
- Exporta a Excel si necesitas

**Firebase Console:**
- Ve a Firestore Database → `confirmaciones`
- Verás todas las respuestas

---

## 🔒 Seguridad (IMPORTANTE)

### Reglas de Firestore Actuales

Por defecto está en **"modo de prueba"** (cualquiera puede leer/escribir).

### ⚠️ ANTES DE LANZAR, cambia las reglas:

1. Ve a Firebase Console → Firestore Database → Reglas
2. Reemplaza con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Invitados: Solo lectura pública (para el autocompletado)
    match /invitados/{invitado} {
      allow read: if true;
      allow write: if false; // Solo tú puedes agregar invitados
    }
    
    // Confirmaciones: Solo escritura pública (para el RSVP)
    match /confirmaciones/{confirmacion} {
      allow read: if false; // Solo tú puedes ver las confirmaciones
      allow create: if true; // Cualquiera puede crear (enviar RSVP)
      allow update: if true; // Pueden actualizar su propia confirmación
      allow delete: if false;
    }
  }
}
```

3. Haz clic en "Publicar"

---

## 📊 Estadísticas en Tiempo Real

El panel de administración muestra:

- **Total Invitados:** Personas en tu lista
- **Cupos Totales:** Suma de todos los cupos asignados
- **Confirmados (Sí):** Invitados que confirmaron asistencia
- **Personas Confirmadas:** Número real de asistentes
- **No Asistirán:** Invitados que no pueden asistir
- **Sin Responder:** Invitados sin respuesta aún

---

## 💡 Consejos

### Agregar Invitados Masivamente

Si tienes muchos invitados, crea un script:

```javascript
import { agregarInvitado } from './js/modules/firebase-guests.js';

const listaInvitados = [
  { nombreCompleto: "Juan Pérez", cuposAsignados: 2, email: "juan@email.com" },
  { nombreCompleto: "María García", cuposAsignados: 1, email: "maria@email.com" },
  // ... más invitados
];

async function importarInvitados() {
  for (const invitado of listaInvitados) {
    await agregarInvitado(invitado);
    console.log(`✓ ${invitado.nombreCompleto}`);
  }
}

importarInvitados();
```

### Exportar Confirmaciones

Desde el panel de Firebase Console:
1. Ve a la colección `confirmaciones`
2. Clic en "Export to JSON"
3. Importa en Excel o Google Sheets

---

## 🆘 Solución de Problemas

### El autocompletado no funciona

1. Verifica que tengas invitados en Firestore
2. Abre la consola del navegador (F12)
3. Busca errores de Firebase

### "Permission denied"

- Verifica las reglas de Firestore
- En modo de prueba, las reglas expiran en 30 días

### Invitados no aparecen

- Refresca la página
- Verifica la consola de Firebase

---

## 📱 URLs Importantes

- **Sitio Principal:** `http://localhost:8000` o `bodalosnenes.netlify.app`
- **Panel Admin:** `http://localhost:8000/admin.html`
- **Firebase Console:** https://console.firebase.google.com
- **Repositorio GitHub:** https://github.com/beniaj1903/wedding

---

## 🎯 Próximos Pasos

1. ✅ Agregar tus invitados
2. ✅ Probar el formulario RSVP
3. ✅ Ajustar las reglas de seguridad
4. ✅ Subir a Netlify
5. ✅ Compartir con invitados

---

## 📞 Soporte

Si tienes problemas, revisa:
1. Consola del navegador (F12)
2. Firebase Console → Firestore
3. Netlify Deploy logs

