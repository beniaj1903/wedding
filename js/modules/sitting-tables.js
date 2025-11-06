/* ================================
   MÓDULO: SITTING TABLES
   Gestión de organización de mesas
   ================================ */

import { db } from '../firebase-config.js';
import { 
    collection, 
    getDocs, 
    doc, 
    setDoc, 
    updateDoc, 
    deleteDoc,
    getDoc,
    query,
    where
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

console.log('🪑 Módulo sitting-tables cargado');

// Estado Global
let guests = [];
let tables = [];
let draggedGuest = null;
let currentFilter = 'all';
let searchTerm = '';
let editingTableId = null;

// Referencias DOM
const guestsList = document.getElementById('guestsList');
const tablesGrid = document.getElementById('tablesGrid');
const emptyState = document.getElementById('emptyState');
const tableModal = document.getElementById('tableModal');
const tableForm = document.getElementById('tableForm');
const guestSearchInput = document.getElementById('guestSearchInput');
const assignedCount = document.getElementById('assignedCount');
const unassignedCount = document.getElementById('unassignedCount');

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    await initializeTables();
    setupEventListeners();
});

/**
 * Inicializar datos
 */
async function initializeTables() {
    showLoading();
    try {
        await loadGuests();
        await loadTables();
        renderGuests();
        renderTables();
        updateStats();
        console.log('✅ Sistema de mesas inicializado');
    } catch (error) {
        console.error('Error inicializando mesas:', error);
        showToast('Error al cargar datos', 'error');
    }
}

/**
 * Cargar invitados presenciales desde Firebase
 */
async function loadGuests() {
    try {
        // Obtener todos los invitados presenciales
        const invitadosRef = collection(db, 'invitados');
        const invitadosQuery = query(invitadosRef, where('categoria', '==', 'presencial'));
        const invitadosSnapshot = await getDocs(invitadosQuery);
        
        guests = [];
        invitadosSnapshot.forEach((doc) => {
            const data = doc.data();
            const cuposAsignados = data.cuposAsignados || 1;
            guests.push({
                id: doc.id,
                invitadoId: doc.id,
                nombre: data.nombreCompleto || 'Sin nombre',
                acompanantes: cuposAsignados - 1,
                totalPersonas: cuposAsignados,
                email: data.email || '',
                telefono: data.telefono || '',
                tableId: data.tableId || null
            });
        });
        
        console.log(`📋 ${guests.length} invitados presenciales cargados para organización de mesas`);
    } catch (error) {
        console.error('Error cargando invitados:', error);
        throw error;
    }
}

/**
 * Cargar mesas desde Firebase
 */
async function loadTables() {
    try {
        const tablesRef = collection(db, 'tables');
        const querySnapshot = await getDocs(tablesRef);
        
        tables = [];
        querySnapshot.forEach((doc) => {
            tables.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        // Ordenar por número de mesa
        tables.sort((a, b) => a.number - b.number);
        
        console.log(`🪑 ${tables.length} mesas cargadas`);
    } catch (error) {
        console.error('Error cargando mesas:', error);
        throw error;
    }
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
    // Botones principales
    document.getElementById('addTableBtn').addEventListener('click', openAddTableModal);
    document.getElementById('saveTablesBtn').addEventListener('click', saveTables);
    document.getElementById('autoAssignBtn').addEventListener('click', autoAssignGuests);
    
    // Formulario de mesa
    tableForm.addEventListener('submit', handleTableFormSubmit);
    
    // Búsqueda
    guestSearchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderGuests();
    });
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderGuests();
        });
    });
    
    // Cerrar modal al hacer clic fuera
    tableModal.addEventListener('click', (e) => {
        if (e.target === tableModal) {
            closeTableModal();
        }
    });
}

/**
 * Renderizar lista de invitados
 */
function renderGuests() {
    const filteredGuests = guests.filter(guest => {
        // Filtro por categoría
        if (currentFilter === 'assigned' && !guest.tableId) return false;
        if (currentFilter === 'unassigned' && guest.tableId) return false;
        
        // Filtro por búsqueda
        if (searchTerm && !guest.nombre.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    if (filteredGuests.length === 0) {
        guestsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
                <p>No se encontraron invitados</p>
            </div>
        `;
        return;
    }
    
    guestsList.innerHTML = filteredGuests.map(guest => {
        const table = guest.tableId ? tables.find(t => t.id === guest.tableId) : null;
        
        return `
            <div class="guest-card ${guest.tableId ? 'assigned' : ''}" 
                 draggable="true" 
                 data-guest-id="${guest.id}">
                <div class="guest-card-header">
                    <span class="guest-name">${guest.nombre}</span>
                    <i class="fas fa-grip-vertical guest-icon"></i>
                </div>
                <div class="guest-details">
                    <div class="guest-detail-item">
                        <i class="fas fa-users"></i>
                        <span>${guest.totalPersonas} persona${guest.totalPersonas > 1 ? 's' : ''}</span>
                    </div>
                    ${guest.email ? `
                        <div class="guest-detail-item">
                            <i class="fas fa-envelope"></i>
                            <span>${guest.email}</span>
                        </div>
                    ` : ''}
                </div>
                ${table ? `
                    <div class="guest-table-badge">
                        <i class="fas fa-chair"></i>
                        Mesa ${table.number}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
    
    // Setup drag & drop para cada card
    document.querySelectorAll('.guest-card').forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
}

/**
 * Renderizar mesas
 */
function renderTables() {
    if (tables.length === 0) {
        emptyState.classList.add('show');
        tablesGrid.style.display = 'none';
        return;
    }
    
    emptyState.classList.remove('show');
    tablesGrid.style.display = 'grid';
    
    tablesGrid.innerHTML = tables.map(table => {
        const tableGuests = guests.filter(g => g.tableId === table.id);
        const occupiedSeats = tableGuests.reduce((sum, g) => sum + g.totalPersonas, 0);
        const availableSeats = table.capacity - occupiedSeats;
        const isFull = availableSeats <= 0;
        
        return `
            <div class="table-card" data-table-id="${table.id}">
                <div class="table-header">
                    <span class="table-number">Mesa ${table.number}</span>
                    <div class="table-actions-menu">
                        <button class="table-action-btn" onclick="editTable('${table.id}')" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="table-action-btn" onclick="deleteTable('${table.id}')" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="table-info">
                    <div class="table-info-item">
                        <i class="fas fa-chair"></i>
                        <span class="table-capacity ${isFull ? 'capacity-full' : 'capacity-available'}">
                            ${occupiedSeats}/${table.capacity} lugares
                            ${!isFull ? `(${availableSeats} disponibles)` : '(LLENA)'}
                        </span>
                    </div>
                    <div class="table-info-item">
                        <i class="fas fa-shapes"></i>
                        <span class="table-type-badge">${getTableTypeLabel(table.type)}</span>
                    </div>
                    ${table.notes ? `
                        <div class="table-info-item">
                            <i class="fas fa-sticky-note"></i>
                            <span>${table.notes}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="table-guests ${tableGuests.length > 0 ? 'has-guests' : ''}" data-table-id="${table.id}">
                    ${tableGuests.length > 0 ? tableGuests.map(guest => `
                        <div class="table-guest-item">
                            <span class="table-guest-name">
                                <i class="fas fa-user"></i>
                                ${guest.nombre}
                                ${guest.acompanantes > 0 ? ` (+${guest.acompanantes})` : ''}
                            </span>
                            <button class="remove-guest-btn" onclick="removeGuestFromTable('${guest.id}')" title="Quitar">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `).join('') : `
                        <div class="table-guests-placeholder">
                            <i class="fas fa-users-slash"></i>
                            <p>Arrastra invitados aquí</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }).join('');
    
    // Setup drop zones
    document.querySelectorAll('.table-guests').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
    });
}

/**
 * Actualizar estadísticas
 */
function updateStats() {
    const assignedGuests = guests.filter(g => g.tableId).length;
    const unassignedGuests = guests.length - assignedGuests;
    
    assignedCount.textContent = `${assignedGuests} Asignados`;
    unassignedCount.textContent = `${unassignedGuests} Sin Mesa`;
}

/**
 * Drag & Drop Handlers
 */
function handleDragStart(e) {
    const guestId = e.currentTarget.dataset.guestId;
    draggedGuest = guests.find(g => g.id === guestId);
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    draggedGuest = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const tableCard = e.currentTarget.closest('.table-card');
    if (tableCard) {
        tableCard.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const tableCard = e.currentTarget.closest('.table-card');
    if (tableCard) {
        tableCard.classList.remove('drag-over');
    }
}

async function handleDrop(e) {
    e.preventDefault();
    
    const tableCard = e.currentTarget.closest('.table-card');
    if (tableCard) {
        tableCard.classList.remove('drag-over');
    }
    
    if (!draggedGuest) return;
    
    const tableId = e.currentTarget.dataset.tableId;
    const table = tables.find(t => t.id === tableId);
    
    if (!table) return;
    
    // Verificar capacidad
    const tableGuests = guests.filter(g => g.tableId === tableId);
    const occupiedSeats = tableGuests.reduce((sum, g) => sum + g.totalPersonas, 0);
    const availableSeats = table.capacity - occupiedSeats;
    
    if (draggedGuest.totalPersonas > availableSeats) {
        showToast(`No hay suficiente espacio en la Mesa ${table.number}. Disponibles: ${availableSeats}, Necesarios: ${draggedGuest.totalPersonas}`, 'error');
        return;
    }
    
    // Asignar invitado a la mesa
    try {
        await assignGuestToTable(draggedGuest.id, tableId);
        showToast(`${draggedGuest.nombre} asignado a Mesa ${table.number}`, 'success');
    } catch (error) {
        console.error('Error asignando invitado:', error);
        showToast('Error al asignar invitado', 'error');
    }
}

/**
 * Asignar invitado a mesa
 */
async function assignGuestToTable(guestId, tableId) {
    const guestIndex = guests.findIndex(g => g.id === guestId);
    if (guestIndex === -1) return;
    
    guests[guestIndex].tableId = tableId;
    
    renderGuests();
    renderTables();
    updateStats();
}

/**
 * Quitar invitado de mesa
 */
window.removeGuestFromTable = async function(guestId) {
    const guestIndex = guests.findIndex(g => g.id === guestId);
    if (guestIndex === -1) return;
    
    const guestName = guests[guestIndex].nombre;
    guests[guestIndex].tableId = null;
    
    renderGuests();
    renderTables();
    updateStats();
    
    showToast(`${guestName} removido de la mesa`, 'success');
};

/**
 * Abrir modal para nueva mesa
 */
function openAddTableModal() {
    editingTableId = null;
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Nueva Mesa';
    
    // Sugerir siguiente número de mesa
    const maxTableNumber = tables.length > 0 ? Math.max(...tables.map(t => t.number)) : 0;
    document.getElementById('tableNumber').value = maxTableNumber + 1;
    document.getElementById('tableCapacity').value = 8;
    document.getElementById('tableType').value = 'round';
    document.getElementById('tableNotes').value = '';
    
    tableModal.classList.add('show');
}

/**
 * Editar mesa
 */
window.editTable = function(tableId) {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;
    
    editingTableId = tableId;
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> Editar Mesa';
    document.getElementById('tableNumber').value = table.number;
    document.getElementById('tableCapacity').value = table.capacity;
    document.getElementById('tableType').value = table.type;
    document.getElementById('tableNotes').value = table.notes || '';
    
    tableModal.classList.add('show');
};

/**
 * Eliminar mesa
 */
window.deleteTable = async function(tableId) {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;
    
    const tableGuests = guests.filter(g => g.tableId === tableId);
    
    let confirmMessage = `¿Eliminar Mesa ${table.number}?`;
    if (tableGuests.length > 0) {
        confirmMessage += `\n\nTiene ${tableGuests.length} invitado(s) asignado(s) que quedarán sin mesa.`;
    }
    
    if (!confirm(confirmMessage)) return;
    
    try {
        // Remover invitados de la mesa
        tableGuests.forEach(guest => {
            const guestIndex = guests.findIndex(g => g.id === guest.id);
            if (guestIndex !== -1) {
                guests[guestIndex].tableId = null;
            }
        });
        
        // Eliminar mesa del estado local
        const tableIndex = tables.findIndex(t => t.id === tableId);
        if (tableIndex !== -1) {
            tables.splice(tableIndex, 1);
        }
        
        renderGuests();
        renderTables();
        updateStats();
        
        showToast(`Mesa ${table.number} eliminada`, 'success');
    } catch (error) {
        console.error('Error eliminando mesa:', error);
        showToast('Error al eliminar mesa', 'error');
    }
};

/**
 * Cerrar modal
 */
window.closeTableModal = function() {
    tableModal.classList.remove('show');
    tableForm.reset();
    editingTableId = null;
};

/**
 * Manejar submit del formulario
 */
async function handleTableFormSubmit(e) {
    e.preventDefault();
    
    const tableData = {
        number: parseInt(document.getElementById('tableNumber').value),
        capacity: parseInt(document.getElementById('tableCapacity').value),
        type: document.getElementById('tableType').value,
        notes: document.getElementById('tableNotes').value.trim()
    };
    
    try {
        if (editingTableId) {
            // Editar mesa existente
            const tableIndex = tables.findIndex(t => t.id === editingTableId);
            if (tableIndex !== -1) {
                tables[tableIndex] = { ...tables[tableIndex], ...tableData };
            }
            showToast(`Mesa ${tableData.number} actualizada`, 'success');
        } else {
            // Crear nueva mesa
            const newTable = {
                id: `table_${Date.now()}`,
                ...tableData,
                createdAt: new Date().toISOString()
            };
            tables.push(newTable);
            showToast(`Mesa ${tableData.number} creada`, 'success');
        }
        
        tables.sort((a, b) => a.number - b.number);
        renderTables();
        closeTableModal();
        
    } catch (error) {
        console.error('Error guardando mesa:', error);
        showToast('Error al guardar mesa', 'error');
    }
}

/**
 * Asignar invitados automáticamente
 */
window.autoAssignGuests = async function() {
    if (tables.length === 0) {
        showToast('Crea mesas primero', 'error');
        return;
    }
    
    const unassignedGuests = guests.filter(g => !g.tableId);
    
    if (unassignedGuests.length === 0) {
        showToast('Todos los invitados ya están asignados', 'success');
        return;
    }
    
    if (!confirm(`¿Asignar automáticamente ${unassignedGuests.length} invitado(s) a las mesas disponibles?`)) {
        return;
    }
    
    try {
        // Ordenar invitados por número de personas (más grande primero)
        const sortedGuests = [...unassignedGuests].sort((a, b) => b.totalPersonas - a.totalPersonas);
        
        let assigned = 0;
        
        for (const guest of sortedGuests) {
            // Buscar mesa con espacio suficiente
            let tableFound = false;
            
            for (const table of tables) {
                const tableGuests = guests.filter(g => g.tableId === table.id);
                const occupiedSeats = tableGuests.reduce((sum, g) => sum + g.totalPersonas, 0);
                const availableSeats = table.capacity - occupiedSeats;
                
                if (guest.totalPersonas <= availableSeats) {
                    await assignGuestToTable(guest.id, table.id);
                    assigned++;
                    tableFound = true;
                    break;
                }
            }
            
            if (!tableFound) {
                console.warn(`No se encontró mesa para ${guest.nombre} (${guest.totalPersonas} personas)`);
            }
        }
        
        if (assigned > 0) {
            showToast(`${assigned} invitado(s) asignado(s) automáticamente`, 'success');
        } else {
            showToast('No hay espacio suficiente en las mesas', 'error');
        }
        
    } catch (error) {
        console.error('Error en asignación automática:', error);
        showToast('Error en la asignación automática', 'error');
    }
};

/**
 * Guardar configuración en Firebase
 */
window.saveTables = async function() {
    if (tables.length === 0) {
        showToast('No hay mesas para guardar', 'error');
        return;
    }
    
    if (!confirm('¿Guardar toda la configuración de mesas en Firebase?')) {
        return;
    }
    
    try {
        showLoading();
        
        // Guardar mesas
        for (const table of tables) {
            const tableRef = doc(db, 'tables', table.id);
            await setDoc(tableRef, {
                number: table.number,
                capacity: table.capacity,
                type: table.type,
                notes: table.notes || '',
                createdAt: table.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }
        
        // Actualizar invitados con tableId
        for (const guest of guests) {
            const invitadoRef = doc(db, 'invitados', guest.id);
            await updateDoc(invitadoRef, {
                tableId: guest.tableId || null,
                updatedAt: new Date().toISOString()
            });
        }
        
        showToast('✅ Configuración guardada correctamente en Firebase', 'success');
        console.log('✅ Configuración de mesas guardada en Firebase');
        
    } catch (error) {
        console.error('Error guardando en Firebase:', error);
        showToast('Error al guardar en Firebase', 'error');
    }
};

/**
 * Obtener label del tipo de mesa
 */
function getTableTypeLabel(type) {
    const labels = {
        round: 'Redonda',
        rectangular: 'Rectangular',
        square: 'Cuadrada'
    };
    return labels[type] || type;
}

/**
 * Mostrar toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Mostrar loading (placeholder)
 */
function showLoading() {
    console.log('⏳ Cargando...');
}

console.log('✅ Módulo sitting-tables.js cargado');

