// Formulario RSVP con integración Firebase
import { buscarInvitados, obtenerInvitado, guardarConfirmacion } from './firebase-guests.js';

let invitadoSeleccionado = null;
let timeoutBusqueda = null;

export function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const buscarInput = document.getElementById('buscarInvitado');
    const autocompleteResults = document.getElementById('autocompleteResults');
    const invitadoInfo = document.getElementById('invitadoSeleccionado');
    
    if (!form || !buscarInput) return;
    
    // ================================
    // AUTOCOMPLETADO DE INVITADOS
    // ================================
    buscarInput.addEventListener('input', (e) => {
        const texto = e.target.value.trim();
        
        // Limpiar timeout anterior
        if (timeoutBusqueda) {
            clearTimeout(timeoutBusqueda);
        }
        
        // Si el texto es muy corto, limpiar resultados
        if (texto.length < 2) {
            autocompleteResults.innerHTML = '';
            autocompleteResults.style.display = 'none';
            return;
        }
        
        // Buscar con un pequeño delay (debounce)
        timeoutBusqueda = setTimeout(async () => {
            const resultados = await buscarInvitados(texto);
            mostrarResultadosAutocompletado(resultados);
        }, 300);
    });
    
    // Cerrar autocompletado al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.autocomplete-wrapper')) {
            autocompleteResults.style.display = 'none';
        }
    });
    
    // ================================
    // MOSTRAR RESULTADOS
    // ================================
    function mostrarResultadosAutocompletado(resultados) {
        if (resultados.length === 0) {
            autocompleteResults.innerHTML = '<div class="autocomplete-item no-results">No se encontraron invitados</div>';
            autocompleteResults.style.display = 'block';
            return;
        }
        
        autocompleteResults.innerHTML = resultados.map(invitado => `
            <div class="autocomplete-item" data-id="${invitado.id}">
                <span class="invitado-nombre-resultado">${invitado.nombreCompleto}</span>
                <span class="invitado-cupos-resultado">${invitado.cuposAsignados} cupo${invitado.cuposAsignados > 1 ? 's' : ''}</span>
            </div>
        `).join('');
        
        autocompleteResults.style.display = 'block';
        
        // Agregar event listeners a cada resultado
        autocompleteResults.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', async () => {
                const invitadoId = item.dataset.id;
                await seleccionarInvitado(invitadoId);
            });
        });
    }
    
    // ================================
    // SELECCIONAR INVITADO
    // ================================
    async function seleccionarInvitado(invitadoId) {
        invitadoSeleccionado = await obtenerInvitado(invitadoId);
        
        if (!invitadoSeleccionado) {
            alert('Error al cargar información del invitado');
            return;
        }
        
        // Actualizar UI
        buscarInput.value = invitadoSeleccionado.nombreCompleto;
        document.getElementById('invitadoId').value = invitadoSeleccionado.id;
        
        // Mostrar información del invitado
        invitadoInfo.querySelector('.invitado-nombre').textContent = `✓ ${invitadoSeleccionado.nombreCompleto}`;
        invitadoInfo.querySelector('.invitado-cupos').textContent = `Tienes ${invitadoSeleccionado.cuposAsignados} cupo${invitadoSeleccionado.cuposAsignados > 1 ? 's' : ''} asignado${invitadoSeleccionado.cuposAsignados > 1 ? 's' : ''}`;
        invitadoInfo.style.display = 'block';
        
        // Pre-llenar email si existe
        if (invitadoSeleccionado.email) {
            document.getElementById('email').value = invitadoSeleccionado.email;
        }
        
        // Pre-llenar teléfono si existe
        if (invitadoSeleccionado.telefono) {
            document.getElementById('telefono').value = invitadoSeleccionado.telefono;
        }
        
        // Ocultar resultados
        autocompleteResults.style.display = 'none';
    }
    
    // ================================
    // ENVIAR FORMULARIO
    // ================================
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validar que se haya seleccionado un invitado
        if (!invitadoSeleccionado) {
            mostrarMensaje('Por favor selecciona tu nombre de la lista', 'error');
            return;
        }
        
        // Recopilar datos del formulario
        const formData = new FormData(form);
        const asistencia = formData.get('asistencia');
        const confirmado = asistencia === 'si';
        
        // Usar automáticamente los cupos asignados al invitado
        const cuposConfirmados = confirmado ? invitadoSeleccionado.cuposAsignados : 0;
        
        const datosConfirmacion = {
            invitadoId: invitadoSeleccionado.id,
            nombreCompleto: invitadoSeleccionado.nombreCompleto,
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            confirmado: confirmado,
            cuposConfirmados: cuposConfirmados,
            necesitaTransporte: formData.get('transporte') === 'si',
            restriccionesAlimenticias: formData.get('alergias') || '',
            mensaje: formData.get('mensaje') || ''
        };
        
        // Deshabilitar botón
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        try {
            await guardarConfirmacion(datosConfirmacion);
            
            // Mostrar mensaje de éxito
            mostrarMensaje(
                confirmado 
                    ? '¡Gracias por confirmar! Nos vemos en la boda 🎉' 
                    : 'Gracias por avisarnos. Te extrañaremos 💔',
                'success'
            );
            
            // Limpiar formulario
            form.reset();
            invitadoSeleccionado = null;
            invitadoInfo.style.display = 'none';
            buscarInput.value = '';
            
        } catch (error) {
            console.error('Error guardando confirmación:', error);
            mostrarMensaje('Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Confirmación';
        }
    });
    
    // ================================
    // MOSTRAR MENSAJES
    // ================================
    function mostrarMensaje(texto, tipo) {
        const messageDiv = document.getElementById('formMessage');
        messageDiv.textContent = texto;
        messageDiv.className = `form-message ${tipo}`;
        messageDiv.style.display = 'block';
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}
