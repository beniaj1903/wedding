# 👤 Sistema de Personalización por Invitado

Este documento explica cómo funciona el sistema de identificación de invitados y cómo usar la información personalizada en diferentes secciones del sitio.

---

## 📋 Tabla de Contenidos
- [Cómo Funciona](#cómo-funciona)
- [Uso en Otras Secciones](#uso-en-otras-secciones)
- [Ejemplos de Personalización](#ejemplos-de-personalización)
- [API del Módulo](#api-del-módulo)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Cómo Funciona

### 1. **Modal de Bienvenida**
Cuando un usuario entra al sitio, ve el modal de bienvenida con:
- 🔍 Campo de búsqueda para encontrar su nombre
- 📝 Lista de sugerencias con autocompletado
- ✅ Confirmación del invitado seleccionado
- ⏭️ Opción para continuar sin identificarse

### 2. **Búsqueda en Firebase**
- Los invitados se buscan en la colección `invitados` de Firestore
- La búsqueda es en tiempo real con debounce de 300ms
- Muestra nombre completo y número de cupos asignados

### 3. **Almacenamiento**
Una vez seleccionado:
- Se guarda en **localStorage** (persiste entre sesiones)
- Incluye toda la información del invitado:
  - `id`: ID del documento en Firebase
  - `nombreCompleto`: Nombre del invitado
  - `cuposAsignados`: Número de personas
  - Cualquier otro campo personalizado

### 4. **Acceso Global**
Cualquier módulo puede acceder a la información del invitado actual usando las funciones exportadas.

---

## 🛠️ Uso en Otras Secciones

### Importar el Módulo

```javascript
import { getCurrentGuest, isGuestSkipped } from './modules/welcome-modal.js';
```

### Obtener Información del Invitado

```javascript
// Obtener invitado actual
const guest = getCurrentGuest();

if (guest) {
    console.log('Invitado:', guest.nombreCompleto);
    console.log('Cupos:', guest.cuposAsignados);
    console.log('ID:', guest.id);
} else {
    console.log('No hay invitado identificado');
}
```

### Verificar Si Saltó la Identificación

```javascript
if (isGuestSkipped()) {
    console.log('Usuario decidió no identificarse');
}
```

---

## 💡 Ejemplos de Personalización

### Ejemplo 1: Personalizar Mensaje de Bienvenida

```javascript
// En algún módulo (ejemplo: hero.js)
import { getCurrentGuest } from './modules/welcome-modal.js';

function showPersonalizedGreeting() {
    const guest = getCurrentGuest();
    const greetingElement = document.getElementById('greeting');
    
    if (guest) {
        greetingElement.textContent = `¡Hola ${guest.nombreCompleto}! Nos alegra que estés aquí`;
    } else {
        greetingElement.textContent = '¡Bienvenidos a nuestra boda!';
    }
}
```

### Ejemplo 2: Pre-llenar Formulario RSVP

```javascript
// En rsvp-form.js
import { getCurrentGuest } from './modules/welcome-modal.js';

function initRSVPForm() {
    const guest = getCurrentGuest();
    
    if (guest) {
        // Pre-llenar campos
        document.getElementById('nombreInvitado').value = guest.nombreCompleto;
        document.getElementById('cuposConfirmados').max = guest.cuposAsignados;
        
        // Deshabilitar campo de nombre (ya está identificado)
        document.getElementById('nombreInvitado').disabled = true;
        
        // Mensaje personalizado
        const infoText = document.getElementById('rsvpInfo');
        infoText.textContent = `Tienes ${guest.cuposAsignados} invitaciones asignadas`;
    }
}
```

### Ejemplo 3: Mostrar Sección Solo Para Ciertos Invitados

```javascript
// Ejemplo: Mostrar mesa VIP solo para ciertos invitados
import { getCurrentGuest } from './modules/welcome-modal.js';

function showVIPSection() {
    const guest = getCurrentGuest();
    const vipSection = document.getElementById('vipSection');
    
    if (guest && guest.categoria === 'VIP') {
        vipSection.style.display = 'block';
        vipSection.querySelector('.table-number').textContent = `Mesa ${guest.numeroMesa}`;
    } else {
        vipSection.style.display = 'none';
    }
}
```

### Ejemplo 4: Contador Personalizado de Cupos

```javascript
// Mostrar cupos restantes
import { getCurrentGuest } from './modules/welcome-modal.js';
import { buscarConfirmacion } from './modules/firebase-guests.js';

async function showRemainingSlots() {
    const guest = getCurrentGuest();
    
    if (!guest) return;
    
    // Buscar si ya confirmó
    const confirmation = await buscarConfirmacion(guest.id);
    
    if (confirmation) {
        const remaining = guest.cuposAsignados - confirmation.cuposConfirmados;
        document.getElementById('remainingSlots').textContent = 
            `Te quedan ${remaining} cupos disponibles`;
    }
}
```

### Ejemplo 5: Información Específica por Invitado

```javascript
// Ejemplo: Transporte asignado
import { getCurrentGuest } from './modules/welcome-modal.js';

function showTransportInfo() {
    const guest = getCurrentGuest();
    const transportSection = document.getElementById('transportInfo');
    
    if (guest && guest.transporteAsignado) {
        transportSection.innerHTML = `
            <h3>Tu transporte</h3>
            <p>Bus: ${guest.transporteAsignado}</p>
            <p>Hora de salida: ${guest.horaSalida}</p>
            <p>Punto de encuentro: ${guest.puntoEncuentro}</p>
        `;
    } else {
        transportSection.innerHTML = '<p>Consulta las opciones de transporte disponibles</p>';
    }
}
```

---

## 📚 API del Módulo

### Funciones Exportadas

#### `getCurrentGuest()`
Obtiene el invitado actualmente identificado.

**Returns:**
- `Object | null`: Objeto con información del invitado o `null` si no hay ninguno

**Ejemplo:**
```javascript
const guest = getCurrentGuest();
if (guest) {
    console.log(guest.nombreCompleto);
}
```

---

#### `isGuestSkipped()`
Verifica si el usuario decidió no identificarse.

**Returns:**
- `boolean`: `true` si saltó la identificación, `false` en caso contrario

**Ejemplo:**
```javascript
if (isGuestSkipped()) {
    console.log('Usuario anónimo');
}
```

---

#### `clearCurrentGuest()`
Limpia el invitado guardado (útil para testing o cerrar sesión).

**Ejemplo:**
```javascript
// Botón de cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
    clearCurrentGuest();
    location.reload();
});
```

---

#### `onModalClose(callback)`
Registra una función para ejecutar cuando se cierre el modal.

**Parámetros:**
- `callback` (Function): Función a ejecutar

**Ejemplo:**
```javascript
onModalClose(() => {
    console.log('Modal cerrado, iniciar música');
    startMusic();
});
```

---

## 🎨 Estructura del Objeto Guest

```javascript
{
    id: "abc123",                    // ID del documento en Firebase
    nombreCompleto: "Juan Pérez",    // Nombre del invitado
    cuposAsignados: 2,              // Número de invitaciones
    
    // Campos personalizados (ejemplos)
    email: "juan@example.com",
    telefono: "+56912345678",
    categoria: "VIP",
    numeroMesa: 5,
    transporteAsignado: "Bus A",
    horaSalida: "18:00",
    puntoEncuentro: "Plaza de Armas",
    // ... cualquier otro campo que agregues en Firebase
}
```

---

## 🔧 Integración con Secciones Existentes

### RSVP (Ya integrado en `rsvp-form.js`)

El formulario de RSVP ya debería tener integración básica. Para mejorarla:

```javascript
// En rsvp-form.js
import { getCurrentGuest } from './welcome-modal.js';

export function initRSVPForm() {
    const guest = getCurrentGuest();
    
    if (guest) {
        // Auto-llenar campos
        prePopulateForm(guest);
        
        // Validar con datos del invitado
        validateWithGuestData(guest);
    }
    
    // ... resto del código
}
```

---

## 🐛 Troubleshooting

### El modal se muestra siempre
**Problema:** El modal aparece cada vez, incluso después de identificarse.

**Solución:**
```javascript
// Verificar que localStorage esté funcionando
console.log(localStorage.getItem('currentGuest'));

// Si es null, el almacenamiento no funciona
// Verificar permisos del navegador
```

---

### No se cargan los invitados
**Problema:** La búsqueda no muestra resultados.

**Solución:**
1. Verificar conexión a Firebase
2. Verificar que la colección `invitados` existe
3. Verificar permisos de lectura en Firestore

```javascript
// Debugging en consola
import { buscarInvitados } from './modules/firebase-guests.js';

buscarInvitados('test').then(results => {
    console.log('Resultados:', results);
});
```

---

### Borrar datos de prueba

```javascript
// Abrir consola del navegador (F12) y ejecutar:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

## 📝 Notas Importantes

1. **Privacidad:** La información se guarda en el navegador del usuario (localStorage), no se comparte.

2. **Persistencia:** Los datos persisten entre sesiones hasta que:
   - El usuario borre el caché
   - Se llame a `clearCurrentGuest()`
   - El usuario use modo incógnito

3. **Seguridad:** No almacenes información sensible como contraseñas o datos bancarios.

4. **Mobile:** Funciona perfectamente en dispositivos móviles con la misma persistencia.

---

## 🎯 Próximos Pasos Sugeridos

1. **Personalizar Timeline:** Mostrar horarios específicos según el invitado
2. **Personalizar Info:** Transporte y hospedaje según ubicación del invitado
3. **Dashboard Personal:** Crear una sección "Mi Información" con todos los detalles
4. **Notificaciones:** Enviar recordatorios personalizados
5. **Fotos:** Permitir que cada invitado suba sus fotos de la boda

---

**¿Necesitas más ejemplos o tienes preguntas?** 💬

Contacta al equipo de desarrollo o revisa los módulos existentes en `js/modules/`.

