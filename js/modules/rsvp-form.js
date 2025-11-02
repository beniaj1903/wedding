// Formulario RSVP con integración Firebase y personalización
import { buscarInvitados, obtenerInvitado, guardarConfirmacion, buscarConfirmacion, eliminarConfirmacion } from './firebase-guests.js';
import { getCurrentGuest } from './welcome-modal.js';

let invitadoSeleccionado = null;
let confirmacionExistente = null;
let timeoutBusqueda = null;
let formElements = null; // Guardar referencias a elementos del formulario
let modoEdicion = false; // Para saber si estamos editando una confirmación existente

export function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const buscarInput = document.getElementById('buscarInvitado');
    const autocompleteResults = document.getElementById('autocompleteResults');
    const invitadoInfo = document.getElementById('invitadoSeleccionado');
    
    if (!form || !buscarInput) return;
    
    // Guardar referencias para uso posterior
    formElements = {
        form,
        buscarInput,
        autocompleteResults,
        invitadoInfo
    };
    
    // ================================
    // PERSONALIZACIÓN AUTOMÁTICA
    // Se ejecutará desde app.js después de cerrar el modal
    // ================================
    
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
    // PRE-SELECCIONAR INVITADO (desde modal de bienvenida)
    // Función interna para uso del módulo
    // ================================
    async function preSeleccionarInvitadoInterno(guest) {
        invitadoSeleccionado = guest;
        
        console.log('🎯 Pre-llenando RSVP con:', guest.nombreCompleto);
        
        // Actualizar UI
        buscarInput.value = guest.nombreCompleto;
        buscarInput.disabled = true; // Deshabilitar para evitar confusión
        buscarInput.style.backgroundColor = '#f0f4ff';
        buscarInput.style.cursor = 'not-allowed';
        document.getElementById('invitadoId').value = guest.id;
        
        // Mostrar información del invitado
        invitadoInfo.querySelector('.invitado-nombre').textContent = `✓ ${guest.nombreCompleto}`;
        invitadoInfo.querySelector('.invitado-cupos').textContent = `Tienes ${guest.cuposAsignados} cupo${guest.cuposAsignados > 1 ? 's' : ''} asignado${guest.cuposAsignados > 1 ? 's' : ''}`;
        invitadoInfo.style.display = 'block';
        
        // Pre-llenar email si existe
        if (guest.email) {
            document.getElementById('email').value = guest.email;
        }
        
        // Pre-llenar teléfono si existe
        if (guest.telefono) {
            document.getElementById('telefono').value = guest.telefono;
        }
        
        // Agregar botón para cambiar invitado
        const cambiarBtn = document.createElement('button');
        cambiarBtn.type = 'button';
        cambiarBtn.className = 'btn-cambiar-invitado';
        cambiarBtn.innerHTML = '<i class="fas fa-edit"></i> Cambiar invitado';
        cambiarBtn.onclick = () => {
            buscarInput.disabled = false;
            buscarInput.style.backgroundColor = '';
            buscarInput.style.cursor = '';
            buscarInput.value = '';
            buscarInput.focus();
            invitadoSeleccionado = null;
            confirmacionExistente = null;
            invitadoInfo.style.display = 'none';
            cambiarBtn.remove();
            // Limpiar mensaje de confirmación existente
            const existingAlert = document.getElementById('confirmacionExistente');
            if (existingAlert) existingAlert.remove();
            // Mostrar formulario normal
            document.getElementById('rsvpForm').style.display = 'block';
        };
        
        // Agregar botón si no existe
        if (!invitadoInfo.querySelector('.btn-cambiar-invitado')) {
            invitadoInfo.appendChild(cambiarBtn);
        }
        
        // Verificar si el invitado es remoto
        if (guest.categoria === 'remoto') {
            mostrarModalInvitadoRemoto();
            return;
        }
        
        // Buscar si ya tiene confirmación
        await verificarConfirmacionExistente(guest.id);
    }
    
    // ================================
    // MODAL INVITADO REMOTO
    // ================================
    function mostrarModalInvitadoRemoto() {
        // Crear overlay si no existe
        let overlay = document.getElementById('remotoModalOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'remotoModalOverlay';
            overlay.className = 'remoto-modal-overlay';
            overlay.innerHTML = `
                <div class="remoto-modal-content">
                    <div class="remoto-modal-icon">
                        <i class="fas fa-video"></i>
                    </div>
                    <h3>¡Gracias por tu interés!</h3>
                    <p class="remoto-modal-message">
                        Entendemos que no podrás asistir a celebrar presencialmente con nosotros.
                    </p>
                    <p class="remoto-modal-invite">
                        Te invitamos a acompañarnos en la <strong>transmisión en vivo</strong>, 
                        que podrás encontrar al final de la página.
                    </p>
                    <p class="remoto-modal-thanks">
                        Gracias por estar allí 💕
                    </p>
                    <button class="btn btn-primary" onclick="cerrarModalRemoto()">
                        <i class="fas fa-heart"></i> Entendido
                    </button>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        overlay.style.display = 'flex';
        
        // Ocultar formulario RSVP
        document.getElementById('rsvpForm').style.display = 'none';
    }
    
    // Función global para cerrar el modal
    window.cerrarModalRemoto = function() {
        const overlay = document.getElementById('remotoModalOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        // Scroll hacia la sección de live stream
        const liveStreamSection = document.getElementById('live-stream');
        if (liveStreamSection) {
            setTimeout(() => {
                liveStreamSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
    
    // ================================
    // VERIFICAR CONFIRMACIÓN EXISTENTE
    // ================================
    async function verificarConfirmacionExistente(invitadoId) {
        try {
            console.log('🔍 Buscando confirmación existente para:', invitadoId);
            confirmacionExistente = await buscarConfirmacion(invitadoId);
            
            if (confirmacionExistente) {
                console.log('✅ Confirmación encontrada:', confirmacionExistente);
                mostrarConfirmacionExistente(confirmacionExistente);
            } else {
                console.log('📝 No hay confirmación previa');
            }
        } catch (error) {
            console.error('Error buscando confirmación:', error);
        }
    }
    
    // ================================
    // MOSTRAR CONFIRMACIÓN EXISTENTE
    // ================================
    function mostrarConfirmacionExistente(confirmacion) {
        // Ocultar formulario
        form.style.display = 'none';
        
        // Crear mensaje de confirmación existente
        let existingAlert = document.getElementById('confirmacionExistente');
        if (!existingAlert) {
            existingAlert = document.createElement('div');
            existingAlert.id = 'confirmacionExistente';
            existingAlert.className = 'confirmacion-existente';
            form.parentElement.insertBefore(existingAlert, form);
        }
        
        // Asegurarse de que esté visible (puede tener display: none de edición previa)
        existingAlert.style.display = 'block';
        
        const estadoIcon = confirmacion.confirmado ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>';
        const estadoTexto = confirmacion.confirmado ? 'Confirmaste tu asistencia' : 'Indicaste que NO asistirás';
        const estadoClass = confirmacion.confirmado ? 'confirmado' : 'no-confirmado';
        
        existingAlert.innerHTML = `
            <div class="confirmacion-header ${estadoClass}">
                <h3>${estadoIcon} ${estadoTexto}</h3>
                <p class="confirmacion-fecha">Registrado el ${new Date(confirmacion.timestamp?.seconds * 1000 || Date.now()).toLocaleDateString('es-CL')}</p>
            </div>
            
            <div class="confirmacion-detalles">
                <div class="detalle-item">
                    <strong><i class="fas fa-user"></i> Nombre:</strong> ${confirmacion.nombreCompleto}
                </div>
                <div class="detalle-item">
                    <strong><i class="fas fa-envelope"></i> Email:</strong> ${confirmacion.email || 'No proporcionado'}
                </div>
                <div class="detalle-item">
                    <strong><i class="fas fa-phone"></i> Teléfono:</strong> ${confirmacion.telefono || 'No proporcionado'}
                </div>
                <div class="detalle-item">
                    <strong><i class="fas fa-users"></i> Cupos:</strong> ${confirmacion.cuposConfirmados || 0} ${confirmacion.cuposConfirmados === 1 ? 'persona' : 'personas'}
                </div>
                <div class="detalle-item">
                    <strong><i class="fas fa-car"></i> Transporte:</strong> ${confirmacion.necesitaTransporte ? 'Sí' : 'No'}
                </div>
                ${confirmacion.restriccionesAlimenticias ? `
                    <div class="detalle-item">
                        <strong><i class="fas fa-utensils"></i> Restricciones:</strong> ${confirmacion.restriccionesAlimenticias}
                    </div>
                ` : ''}
                ${confirmacion.mensaje ? `
                    <div class="detalle-item">
                        <strong><i class="fas fa-comment"></i> Mensaje:</strong> ${confirmacion.mensaje}
                    </div>
                ` : ''}
            </div>
            
            <div class="confirmacion-acciones">
                <button type="button" class="btn btn-edit" onclick="window.editarConfirmacionRSVP()">
                    <i class="fas fa-edit"></i> Editar mi confirmación
                </button>
                <button type="button" class="btn btn-delete" onclick="window.eliminarConfirmacionRSVP()">
                    <i class="fas fa-trash"></i> Eliminar confirmación
                </button>
            </div>
        `;
    }
    
    // ================================
    // EDITAR CONFIRMACIÓN
    // ================================
    window.editarConfirmacionRSVP = function() {
        modoEdicion = true;
        
        // Mostrar formulario
        form.style.display = 'block';
        
        // Ocultar alerta
        const existingAlert = document.getElementById('confirmacionExistente');
        if (existingAlert) existingAlert.style.display = 'none';
        
        // Pre-llenar con datos existentes
        if (confirmacionExistente) {
            document.getElementById('email').value = confirmacionExistente.email || '';
            document.getElementById('telefono').value = confirmacionExistente.telefono || '';
            
            // Seleccionar asistencia
            const asistenciaRadios = document.querySelectorAll('input[name="asistencia"]');
            asistenciaRadios.forEach(radio => {
                if ((radio.value === 'si' && confirmacionExistente.confirmado) ||
                    (radio.value === 'no' && !confirmacionExistente.confirmado)) {
                    radio.checked = true;
                }
            });
            
            // Transporte
            const transporteRadios = document.querySelectorAll('input[name="transporte"]');
            transporteRadios.forEach(radio => {
                if ((radio.value === 'si' && confirmacionExistente.necesitaTransporte) ||
                    (radio.value === 'no' && !confirmacionExistente.necesitaTransporte)) {
                    radio.checked = true;
                }
            });
            
            document.getElementById('alergias').value = confirmacionExistente.restriccionesAlimenticias || '';
            document.getElementById('mensaje').value = confirmacionExistente.mensaje || '';
        }
        
        // Cambiar texto del botón
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar Confirmación';
        
        // Crear contenedor para botones si no existe
        let buttonsRow = submitBtn.parentElement.querySelector('.form-buttons-row');
        if (!buttonsRow) {
            buttonsRow = document.createElement('div');
            buttonsRow.className = 'form-buttons-row';
            
            // Mover el botón submit al contenedor
            submitBtn.parentElement.insertBefore(buttonsRow, submitBtn);
            buttonsRow.appendChild(submitBtn);
        }
        
        // Agregar botón cancelar
        let cancelBtn = document.getElementById('cancelEditBtn');
        if (!cancelBtn) {
            cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.id = 'cancelEditBtn';
            cancelBtn.className = 'btn btn-secondary btn-large';
            cancelBtn.innerHTML = '<i class="fas fa-times"></i> Cancelar';
            cancelBtn.onclick = () => {
                modoEdicion = false;
                form.style.display = 'none';
                const existingAlert = document.getElementById('confirmacionExistente');
                if (existingAlert) existingAlert.style.display = 'block';
                
                // Restaurar botón original
                submitBtn.innerHTML = originalBtnHTML;
                
                // Sacar el submitBtn del contenedor de botones si existe
                if (buttonsRow && buttonsRow.parentElement) {
                    buttonsRow.parentElement.insertBefore(submitBtn, buttonsRow);
                    buttonsRow.remove();
                }
                
                cancelBtn.remove();
            };
            buttonsRow.appendChild(cancelBtn);
        }
    };
    
    // ================================
    // ELIMINAR CONFIRMACIÓN
    // ================================
    window.eliminarConfirmacionRSVP = async function() {
        if (!confirmacionExistente) return;
        
        const confirmar = confirm('¿Estás seguro de que quieres eliminar tu confirmación? Esta acción no se puede deshacer.');
        
        if (!confirmar) return;
        
        try {
            await eliminarConfirmacion(confirmacionExistente.id);
            
            // Limpiar estado
            confirmacionExistente = null;
            modoEdicion = false;
            
            // Ocultar alerta y mostrar formulario limpio
            const existingAlert = document.getElementById('confirmacionExistente');
            if (existingAlert) existingAlert.remove();
            
            form.style.display = 'block';
            form.reset();
            
            mostrarMensaje('Tu confirmación ha sido eliminada correctamente', 'success');
        } catch (error) {
            console.error('Error eliminando confirmación:', error);
            mostrarMensaje('Hubo un error al eliminar tu confirmación. Por favor intenta de nuevo.', 'error');
        }
    };
    
    // Exponer función pública para uso externo
    window.preSeleccionarInvitadoRSVP = preSeleccionarInvitadoInterno;
    
    // ================================
    // SELECCIONAR INVITADO (desde búsqueda manual)
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
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        try {
            await guardarConfirmacion(datosConfirmacion);
            
            // Mostrar mensaje de éxito
            const mensajeExito = modoEdicion
                ? '¡Tu confirmación ha sido actualizada correctamente!'
                : (confirmado 
                    ? '¡Gracias por confirmar! Nos vemos en la boda' 
                    : 'Gracias por avisarnos. ¡Te extrañaremos!');
            
            mostrarMensaje(mensajeExito, 'success');
            
            // Recargar la confirmación desde Firebase (tanto para nueva como para edición)
            if (modoEdicion) {
                modoEdicion = false;
                
                // Restaurar estructura de botones si estaba en modo edición
                const buttonsRow = submitBtn.parentElement;
                if (buttonsRow && buttonsRow.classList.contains('form-buttons-row')) {
                    buttonsRow.parentElement.insertBefore(submitBtn, buttonsRow);
                    buttonsRow.remove();
                }
                
                // Restaurar texto original del botón
                submitBtn.innerHTML = originalText;
                
                // Remover botón cancelar si existe
                const cancelBtn = document.getElementById('cancelEditBtn');
                if (cancelBtn) cancelBtn.remove();
            }
            
            // Buscar la confirmación desde Firebase (para nueva confirmación o actualización)
            const confirmacionActualizada = await buscarConfirmacion(invitadoSeleccionado.id);
            if (confirmacionActualizada) {
                confirmacionExistente = confirmacionActualizada;
                form.style.display = 'none';
                mostrarConfirmacionExistente(confirmacionExistente);
                
                // Scroll suave hacia la confirmación
                const confirmacionEl = document.getElementById('confirmacionExistente');
                if (confirmacionEl) {
                    confirmacionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            
        } catch (error) {
            console.error('Error guardando confirmación:', error);
            mostrarMensaje('Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
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
