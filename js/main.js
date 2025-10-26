// ================================
// Inicialización cuando el DOM está listo
// ================================
document.addEventListener('DOMContentLoaded', function() {
    initSwiper();
    initNavigation();
    initScrollEffects();
    initRSVPForm();
    initSmoothScroll();
});

// ================================
// Swiper Carousel
// ================================
function initSwiper() {
    const swiper = new Swiper('.hero-swiper', {
        // Configuración básica
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        // Paginación
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        // Navegación
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Keyboard control
        keyboard: {
            enabled: true,
        },
    });
}

// ================================
// Navegación Móvil
// ================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ================================
// Efectos de Scroll
// ================================
function initScrollEffects() {
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.event-item, .timeline-item, .info-card, .gift-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Active nav link según sección visible
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ================================
// Smooth Scroll
// ================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Formulario RSVP
// ================================
function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const formMessage = document.getElementById('formMessage');
    
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
            
            // Ejemplo de integración con FormSubmit.co (servicio gratuito)
            // fetch('https://formsubmit.co/tu-email@ejemplo.com', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     showMessage('¡Gracias por confirmar! Nos vemos pronto.', 'success');
            //     form.reset();
            // })
            // .catch(error => {
            //     showMessage('Hubo un error. Por favor intenta de nuevo.', 'error');
            // });
            
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

// ================================
// Validación de Formulario
// ================================
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

// ================================
// Mostrar Mensajes
// ================================
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(function() {
        formMessage.style.display = 'none';
    }, 5000);
}

// ================================
// Cuenta Regresiva (Opcional)
// ================================
function initCountdown() {
    // Fecha de la boda (ajusta según tu fecha)
    const weddingDate = new Date('2026-06-15T17:00:00').getTime();
    
    // Actualizar cada segundo
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Mostrar resultado (necesitas agregar un elemento en el HTML)
        const countdownElement = document.getElementById('countdown');
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
}

// Descomentar si quieres usar la cuenta regresiva
// initCountdown();

// ================================
// Lazy Loading de Imágenes (Opcional)
// ================================
function initLazyLoading() {
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
// Scroll to Top Button (Opcional)
// ================================
function initScrollToTop() {
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
}

// Descomentar si quieres el botón de scroll to top
// initScrollToTop();

// ================================
// Prevención de envío de formulario múltiple
// ================================
let formSubmitting = false;

function preventMultipleSubmit(form) {
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
console.log('%c¡Feliz Boda! 💍', 'font-size: 30px; color: #d4a574; font-weight: bold;');
console.log('%cSitio web creado con amor y código ♥', 'font-size: 14px; color: #666;');

