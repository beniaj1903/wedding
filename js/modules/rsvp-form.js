/* ================================
   MÓDULO: FORMULARIO RSVP
   Validación y envío de confirmaciones
   ================================ */

export function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        if (!validateForm(form)) {
            showMessage('Por favor completa todos los campos obligatorios.', 'error');
            return;
        }
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Mostrar loading
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        // Simular envío (aquí deberías integrar con tu backend o servicio)
        setTimeout(function() {
            // Aquí puedes agregar tu lógica de envío real
            // Por ejemplo: fetch a tu API, Google Sheets, Formspree, etc.
            
            console.log('Datos del formulario:', data);
            
            // EJEMPLO: Integración con FormSubmit.co (servicio gratuito)
            // Descomenta y configura con tu email:
            /*
            fetch('https://formsubmit.co/tu-email@ejemplo.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                showMessage('¡Gracias por confirmar! Nos vemos pronto.', 'success');
                form.reset();
            })
            .catch(error => {
                showMessage('Hubo un error. Por favor intenta de nuevo.', 'error');
            });
            */
            
            // Por ahora, solo mostramos mensaje de éxito
            showMessage('¡Gracias por confirmar tu asistencia! Nos vemos pronto. 💕', 'success');
            form.reset();
            
            // Restaurar botón
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Scroll al mensaje
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    });
}

// Validación de formulario
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#dc3545';
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    // Validar email
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = '#dc3545';
        }
    }
    
    return isValid;
}

// Mostrar mensajes
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(function() {
        formMessage.style.display = 'none';
    }, 5000);
}

