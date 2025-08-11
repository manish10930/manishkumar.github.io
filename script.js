// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic',
    offset: 100
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

// Mobile menu toggle functions
function openmenu() {
    const sideMenu = document.getElementById('sidemenu');
    sideMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closemenu() {
    const sideMenu = document.getElementById('sidemenu');
    sideMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closemenu();
        }
    });
});

// Close menu when clicking outside on mobile
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('sidemenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (window.innerWidth <= 768 && 
        !navMenu.contains(event.target) && 
        !navToggle.contains(event.target) && 
        navMenu.classList.contains('active')) {
        closemenu();
    }
});

// Professional typing animation for hero section
const typingText = document.querySelector('.typing-text');
const texts = [
    'Full Stack Developer',
    'React.js Expert',
    'Node.js Developer',
    'UI/UX Enthusiast',
    'Problem Solver'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = 120;
    
    if (isDeleting) {
        typeSpeed /= 2;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeWriter, 1500);
});

// Enhanced skill card interactions
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced contact form submission
const scriptURL = "https://script.google.com/macros/s/AKfycbybHgClwdk2Hm4gzjHjlJ-lnMbkPE-CmY6JxdlaFOjXMBNg1HL2eTXliNvMPkQ_vok3/exec";
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');
const submitBtn = form?.querySelector('button[type="submit"]');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Show loading state
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        }
        
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "✓ Message sent successfully! I'll get back to you soon.";
                msg.classList.add('show');
                setTimeout(() => {
                    msg.classList.remove('show');
                }, 5000);
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                msg.innerHTML = "✗ Something went wrong. Please try again.";
                msg.style.background = "rgba(239, 68, 68, 0.1)";
                msg.style.color = "#dc2626";
                msg.style.borderColor = "rgba(239, 68, 68, 0.2)";
                msg.classList.add('show');
            })
            .finally(() => {
                // Reset button state
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.disabled = false;
                }
            });
    });
}

// Subtle parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px)';
        this.style.boxShadow = '0 25px 50px -12px rgba(0, 212, 255, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// Page loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Intersection Observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add counter animation for stats
            if (entry.target.classList.contains('stat-item')) {
                const numberElement = entry.target.querySelector('h3');
                const finalNumber = parseInt(numberElement.textContent);
                animateNumber(numberElement, 0, finalNumber, 2000);
            }
        }
    });
}, observerOptions);

// Observe stat items for counter animation
document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

// Number counter animation
function animateNumber(element, start, end, duration) {
    let startTime = null;
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (end > 99 ? '%' : '+');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form validation enhancement
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
    
    input.addEventListener('focus', function() {
        this.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.classList.remove('focused');
    });
});

// Hamburger animation
document.querySelector('.nav-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
});

// Add this CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
.nav-toggle.active .bar:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}
.nav-toggle.active .bar:nth-child(2) {
    opacity: 0;
}
.nav-toggle.active .bar:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}
`;
document.head.append(style);
