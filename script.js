// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Navigation
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        
        // Animate Links
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinksAll = document.querySelectorAll('nav a[href^="#"]');
    
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                navLinksItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });

    // CTA Button Smooth Scroll
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        const offsetTop = aboutSection.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });

    // Scroll Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sectionsToAnimate = document.querySelectorAll('.about, .gallery, .contact');
    sectionsToAnimate.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Gallery Item Hover Effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Click event for gallery items
        item.addEventListener('click', function() {
            // Create a simple lightbox effect
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const content = document.createElement('div');
            content.style.cssText = `
                background: linear-gradient(135deg, #a8edea, #fed6e3);
                width: 80%;
                max-width: 500px;
                height: 400px;
                border-radius: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 1.5rem;
                font-weight: bold;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            `;
            content.textContent = this.querySelector('.image-placeholder').textContent;
            
            overlay.appendChild(content);
            document.body.appendChild(overlay);
            
            // Animate in
            setTimeout(() => {
                content.style.transform = 'scale(1)';
            }, 10);
            
            // Close on click
            overlay.addEventListener('click', function() {
                content.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            });
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (name && email && message) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #e91e63, #f06292);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            `;
            successMessage.innerHTML = `
                <h3>Thank you, ${name}!</h3>
                <p>Your message has been sent with love.</p>
            `;
            
            document.body.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 3000);
        }
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Header background opacity based on scroll
        const header = document.querySelector('header');
        const scrollPercent = Math.min(scrolled / 100, 1);
        header.style.background = `rgba(255, 255, 255, ${0.95 * scrollPercent})`;
    });

    // Dynamic Heart Generation
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        const floatingHearts = document.querySelector('.floating-hearts');
        if (floatingHearts) {
            floatingHearts.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 6000);
        }
    }

    // Create new hearts periodically
    setInterval(createFloatingHeart, 2000);

    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0px);
            }
        }
    `;
    document.head.appendChild(style);

    // Typing Effect for Hero Title
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

    // Initialize typing effect after page load
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    }, 1000);
});