/* ================================
   MÓDULO: UTILIDADES
   Funciones opcionales y helpers
   ================================ */

// ================================
// Cuenta Regresiva
// ================================
export function initCountdown(targetDate, elementId = 'countdown') {
    // Fecha de la boda
    const weddingDate = new Date(targetDate).getTime();
    
    // Actualizar cada segundo
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Mostrar resultado
        const countdownElement = document.getElementById(elementId);
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Días</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Horas</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutos</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Segundos</span>
                </div>
            `;
        }
        
        // Si la cuenta regresiva terminó
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (countdownElement) {
                countdownElement.innerHTML = '¡Es hoy!';
            }
        }
    }, 1000);
    
    return countdownInterval;
}

// ================================
// Lazy Loading de Imágenes
// ================================
export function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ================================
// Scroll to Top Button
// ================================
export function initScrollToTop() {
    // Crear botón
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
    
    // Agregar estilos en línea (o mejor, agrégalos al CSS)
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    // Mostrar/ocultar según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Click para scroll to top
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    return scrollBtn;
}

// ================================
// Prevención de envío múltiple
// ================================
let formSubmitting = false;

export function preventMultipleSubmit(form) {
    form.addEventListener('submit', function(e) {
        if (formSubmitting) {
            e.preventDefault();
            return false;
        }
        formSubmitting = true;
        setTimeout(() => formSubmitting = false, 3000);
    });
}

// ================================
// Console Message
// ================================
export function showConsoleMessage() {
    console.log('%c¡Feliz Boda! 💍', 'font-size: 30px; color: #BFA77D; font-weight: bold;');
    console.log('%cSitio web creado con amor y código ♥', 'font-size: 14px; color: #666;');
}

