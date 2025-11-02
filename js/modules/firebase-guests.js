// Módulo para gestionar invitados con Firebase
import { db } from '../firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    orderBy,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// ================================
// COLECCIONES
// ================================
const INVITADOS_COLLECTION = 'invitados';
const CONFIRMACIONES_COLLECTION = 'confirmaciones';

// ================================
// BÚSQUEDA DE INVITADOS
// ================================
export async function buscarInvitados(textoBusqueda) {
    try {
        const invitadosRef = collection(db, INVITADOS_COLLECTION);
        const snapshot = await getDocs(invitadosRef);
        
        const invitados = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            invitados.push({
                id: doc.id,
                ...data
            });
        });
        
        // Filtrar localmente para búsqueda flexible
        const textoBusquedaLower = textoBusqueda.toLowerCase();
        return invitados.filter(invitado => 
            invitado.nombreCompleto.toLowerCase().includes(textoBusquedaLower)
        );
    } catch (error) {
        console.error('Error buscando invitados:', error);
        return [];
    }
}

// ================================
// OBTENER INVITADO POR ID
// ================================
export async function obtenerInvitado(invitadoId) {
    try {
        const docRef = doc(db, INVITADOS_COLLECTION, invitadoId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            console.error('Invitado no encontrado');
            return null;
        }
    } catch (error) {
        console.error('Error obteniendo invitado:', error);
        return null;
    }
}

// ================================
// AGREGAR NUEVO INVITADO
// ================================
export async function agregarInvitado(datosInvitado) {
    try {
        const invitadosRef = collection(db, INVITADOS_COLLECTION);
        const docRef = await addDoc(invitadosRef, {
            nombreCompleto: datosInvitado.nombreCompleto,
            cuposAsignados: datosInvitado.cuposAsignados || 1,
            email: datosInvitado.email || '',
            telefono: datosInvitado.telefono || '',
            grupo: datosInvitado.grupo || 'General',
            categoria: datosInvitado.categoria || 'presencial', // 'presencial' o 'remoto'
            invitadoPor: datosInvitado.invitadoPor || '',
            createdAt: serverTimestamp()
        });
        
        console.log('Invitado agregado con ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error agregando invitado:', error);
        throw error;
    }
}

// ================================
// ACTUALIZAR INVITADO
// ================================
export async function actualizarInvitado(invitadoId, datosInvitado) {
    try {
        const docRef = doc(db, INVITADOS_COLLECTION, invitadoId);
        await updateDoc(docRef, {
            nombreCompleto: datosInvitado.nombreCompleto,
            cuposAsignados: datosInvitado.cuposAsignados,
            email: datosInvitado.email || '',
            telefono: datosInvitado.telefono || '',
            grupo: datosInvitado.grupo || 'General',
            categoria: datosInvitado.categoria || 'presencial', // 'presencial' o 'remoto'
            updatedAt: serverTimestamp()
        });
        
        console.log('Invitado actualizado:', invitadoId);
        return invitadoId;
    } catch (error) {
        console.error('Error actualizando invitado:', error);
        throw error;
    }
}

// ================================
// ELIMINAR INVITADO
// ================================
export async function eliminarInvitado(invitadoId) {
    try {
        const docRef = doc(db, INVITADOS_COLLECTION, invitadoId);
        await deleteDoc(docRef);
        
        console.log('Invitado eliminado:', invitadoId);
        return invitadoId;
    } catch (error) {
        console.error('Error eliminando invitado:', error);
        throw error;
    }
}

// ================================
// ELIMINAR CONFIRMACIÓN
// ================================
export async function eliminarConfirmacion(confirmacionId) {
    try {
        const docRef = doc(db, CONFIRMACIONES_COLLECTION, confirmacionId);
        await deleteDoc(docRef);
        
        console.log('Confirmación eliminada:', confirmacionId);
        return confirmacionId;
    } catch (error) {
        console.error('Error eliminando confirmación:', error);
        throw error;
    }
}

// ================================
// BUSCAR CONFIRMACIÓN DE UN INVITADO
// ================================
export async function buscarConfirmacion(invitadoId) {
    try {
        const confirmacionesRef = collection(db, CONFIRMACIONES_COLLECTION);
        const q = query(confirmacionesRef, where('invitadoId', '==', invitadoId));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return {
                id: doc.id,
                ...doc.data()
            };
        }
        
        return null;
    } catch (error) {
        console.error('Error buscando confirmación:', error);
        return null;
    }
}

// ================================
// GUARDAR CONFIRMACIÓN (RSVP)
// ================================
export async function guardarConfirmacion(datosConfirmacion) {
    try {
        const confirmacionesRef = collection(db, CONFIRMACIONES_COLLECTION);
        
        // Verificar si ya existe una confirmación para este invitado
        const q = query(confirmacionesRef, where('invitadoId', '==', datosConfirmacion.invitadoId));
        const existentes = await getDocs(q);
        
        if (!existentes.empty) {
            // Actualizar confirmación existente
            const docRef = existentes.docs[0].ref;
            await updateDoc(docRef, {
                ...datosConfirmacion,
                updatedAt: serverTimestamp()
            });
            console.log('Confirmación actualizada');
            return docRef.id;
        } else {
            // Crear nueva confirmación
            const docRef = await addDoc(confirmacionesRef, {
                ...datosConfirmacion,
                timestamp: serverTimestamp(),
                createdAt: serverTimestamp()
            });
            console.log('Confirmación guardada con ID:', docRef.id);
            return docRef.id;
        }
    } catch (error) {
        console.error('Error guardando confirmación:', error);
        throw error;
    }
}

// ================================
// OBTENER TODOS LOS INVITADOS
// ================================
export async function obtenerTodosInvitados() {
    try {
        const invitadosRef = collection(db, INVITADOS_COLLECTION);
        const snapshot = await getDocs(invitadosRef);
        
        const invitados = [];
        snapshot.forEach((doc) => {
            invitados.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        // Ordenar alfabéticamente
        invitados.sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
        
        return invitados;
    } catch (error) {
        console.error('Error obteniendo invitados:', error);
        return [];
    }
}

// ================================
// OBTENER TODAS LAS CONFIRMACIONES
// ================================
export async function obtenerConfirmaciones() {
    try {
        const confirmacionesRef = collection(db, CONFIRMACIONES_COLLECTION);
        const snapshot = await getDocs(confirmacionesRef);
        
        const confirmaciones = [];
        snapshot.forEach((doc) => {
            confirmaciones.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return confirmaciones;
    } catch (error) {
        console.error('Error obteniendo confirmaciones:', error);
        return [];
    }
}

// ================================
// OBTENER ESTADÍSTICAS
// ================================
export async function obtenerEstadisticas() {
    try {
        const [invitados, confirmaciones] = await Promise.all([
            getDocs(collection(db, INVITADOS_COLLECTION)),
            getDocs(collection(db, CONFIRMACIONES_COLLECTION))
        ]);
        
        let totalInvitados = 0;
        let totalCuposAsignados = 0;
        
        invitados.forEach(doc => {
            totalInvitados++;
            totalCuposAsignados += doc.data().cuposAsignados || 1;
        });
        
        let confirmadosAsistiran = 0;
        let confirmadosNoAsistiran = 0;
        let totalCuposConfirmados = 0;
        
        confirmaciones.forEach(doc => {
            const data = doc.data();
            if (data.confirmado) {
                confirmadosAsistiran++;
                totalCuposConfirmados += data.cuposConfirmados || 0;
            } else {
                confirmadosNoAsistiran++;
            }
        });
        
        return {
            totalInvitados,
            totalCuposAsignados,
            confirmadosAsistiran,
            confirmadosNoAsistiran,
            totalCuposConfirmados,
            sinResponder: totalInvitados - confirmadosAsistiran - confirmadosNoAsistiran
        };
    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        return null;
    }
}

