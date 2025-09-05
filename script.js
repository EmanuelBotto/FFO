// Funcionalidad del menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Efecto de scroll en el header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(139, 0, 0, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(139, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.producto-card, .valor, .contacto-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Formulario de contacto
const contactoForm = document.querySelector('.contacto-form');
if (contactoForm) {
    contactoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactoForm);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const mensaje = formData.get('mensaje');
        
        // Validación básica
        if (!nombre || !email || !mensaje) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }
        
        // Simular envío del formulario
        showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        contactoForm.reset();
    });
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    // Colores según el tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
        notification.style.color = '#8B0000';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #DC143C, #8B0000)';
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.plant-illustration');
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Contador animado para estadísticas (opcional)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Efecto de typing en el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar efectos cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    // Efecto de escritura en el título (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Comentar esta línea si no quieres el efecto de escritura
        // typeWriter(heroTitle, originalText, 50);
    }
    
    // Agregar clase de animación a elementos visibles
    const animatedElements = document.querySelectorAll('.producto-card, .valor, .contacto-item');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de hover mejorado para las tarjetas de productos
document.querySelectorAll('.producto-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading para imágenes (si se agregan en el futuro)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Chatbot functionality
class Chatbot {
    constructor() {
        this.chatbot = document.getElementById('chatbot');
        this.chatbotButton = document.getElementById('chatbot-button');
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.inputField = document.getElementById('chatbot-input-field');
        this.sendButton = document.getElementById('chatbot-send');
        this.quickQuestions = document.querySelectorAll('.quick-question');
        
        this.isOpen = false;
        this.responses = {
            '¿qué es ffo?': 'FFO SA es una empresa argentina especializada en enmiendas biológicas líquidas para la agricultura. Nuestro producto mejora la fertilidad del suelo de forma natural, promoviendo el crecimiento de microorganismos beneficiosos.',
            '¿cómo se aplica?': 'FFO se aplica mediante pulverización foliar o al suelo. Debe agitarse 24hs antes, usar presión inferior a 2 Kg, mantener pH entre 6-8.9, y evitar sol fuerte y viento. Consulta las instrucciones detalladas para más información.',
            '¿cuál es la dosis?': 'La dosis debe ser indicada por un técnico especializado según el tipo de cultivo, etapa fenológica y condiciones del suelo. Es importante respetar las recomendaciones técnicas para obtener los mejores resultados.',
            '¿dónde comprar?': 'Puedes contactarnos a través de nuestro teléfono +54 11 1234-5678, email info@ffo.com.ar, o visitar nuestra ubicación en San Carlos Sur, Argentina. Nuestro equipo te asesorará sobre la disponibilidad y distribución.',
            'precio': 'Para conocer precios actualizados y condiciones comerciales, te recomendamos contactar directamente con nuestro equipo de ventas al +54 11 1234-5678 o escribir a info@ffo.com.ar',
            'contacto': 'Puedes contactarnos de las siguientes formas:\n• Teléfono: +54 11 1234-5678\n• Email: info@ffo.com.ar\n• Ubicación: San Carlos Sur, Argentina\n• Web: https://ffo-sa.com',
            'aplicación': 'Para la correcta aplicación de FFO:\n• Agitar 24hs antes y antes de usar\n• Presión máxima 2 Kg\n• pH del caldo entre 6-8.9\n• Evitar sol fuerte y viento\n• No mezclar con otros productos\n• Usar agua de pozo o filtrada',
            'almacenamiento': 'FFO debe almacenarse en lugar oscuro y fresco, entre 15-25°C, evitando cambios bruscos de temperatura. Mantener el envase bien cerrado y alejado de la luz solar directa.',
            'mezclar': 'FFO NO debe mezclarse con:\n• Fungicidas\n• Herbicidas\n• Insecticidas químicos\n• Fertilizantes químicos\n• Agua de red (clorada)\nEs conveniente aplicarlo solo para máxima efectividad.',
            'beneficios': 'FFO ofrece múltiples beneficios:\n• Mejora la fertilidad del suelo\n• Activa microorganismos beneficiosos\n• Aumenta el rendimiento de cultivos\n• Mejora la absorción de nutrientes\n• Es 100% biológico y sostenible',
            'tiempo': 'El mejor momento para aplicar FFO es temprano en la mañana (6-10 AM) o al atardecer (6-8 PM), con temperatura entre 15-25°C, humedad 60-80%, y viento máximo de 15 km/h.',
            'frecuencia': 'La frecuencia de aplicación depende del cultivo y condiciones. Generalmente se recomienda aplicar cada 15-30 días durante el período de crecimiento activo. Consulta con nuestro técnico para recomendaciones específicas.'
        };
        
        this.init();
    }
    
    init() {
        this.chatbotButton.addEventListener('click', () => this.toggleChatbot());
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        this.quickQuestions.forEach(button => {
            button.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                this.inputField.value = question;
                this.sendMessage();
            });
        });
        
        // Handle window resize to keep chatbot in view
        window.addEventListener('resize', () => {
            this.ensureChatbotInView();
        });
    }
    
    toggleChatbot() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatbot.classList.add('show');
            this.chatbotButton.classList.add('hide');
            this.inputField.focus();
        } else {
            this.chatbot.classList.remove('show');
            this.chatbotButton.classList.remove('hide');
        }
    }
    
    sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.inputField.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
        
        // Ensure chatbot stays in view
        this.ensureChatbotInView();
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (sender === 'bot') {
            const icon = document.createElement('i');
            icon.className = 'fas fa-leaf';
            contentDiv.appendChild(icon);
        }
        
        const textP = document.createElement('p');
        textP.textContent = text;
        contentDiv.appendChild(textP);
        
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom with smooth animation
        setTimeout(() => {
            this.messagesContainer.scrollTo({
                top: this.messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }
    
    getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for exact matches first
        for (const [key, response] of Object.entries(this.responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Check for keywords
        if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('valor')) {
            return this.responses['precio'];
        }
        
        if (lowerMessage.includes('contacto') || lowerMessage.includes('teléfono') || lowerMessage.includes('email')) {
            return this.responses['contacto'];
        }
        
        if (lowerMessage.includes('aplicar') || lowerMessage.includes('usar') || lowerMessage.includes('utilizar')) {
            return this.responses['aplicación'];
        }
        
        if (lowerMessage.includes('guardar') || lowerMessage.includes('conservar') || lowerMessage.includes('almacenar')) {
            return this.responses['almacenamiento'];
        }
        
        if (lowerMessage.includes('mezclar') || lowerMessage.includes('combinar') || lowerMessage.includes('juntar')) {
            return this.responses['mezclar'];
        }
        
        if (lowerMessage.includes('beneficio') || lowerMessage.includes('ventaja') || lowerMessage.includes('ayuda')) {
            return this.responses['beneficios'];
        }
        
        if (lowerMessage.includes('cuándo') || lowerMessage.includes('momento') || lowerMessage.includes('hora')) {
            return this.responses['tiempo'];
        }
        
        if (lowerMessage.includes('frecuencia') || lowerMessage.includes('cada cuánto') || lowerMessage.includes('intervalo')) {
            return this.responses['frecuencia'];
        }
        
        // Default response
        return 'Gracias por tu consulta. Para información más específica sobre FFO, te recomiendo contactar directamente con nuestro equipo técnico al +54 11 1234-5678 o escribir a info@ffo.com.ar. También puedes revisar las instrucciones detalladas en nuestra página.';
    }
    
    ensureChatbotInView() {
        if (this.isOpen) {
            // Ensure chatbot is visible in viewport
            const rect = this.chatbot.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.bottom > windowHeight) {
                this.chatbot.style.bottom = '20px';
                this.chatbot.style.top = 'auto';
            }
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
