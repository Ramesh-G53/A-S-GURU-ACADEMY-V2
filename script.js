// DOM Elements
const hamburger = document.getElementById('hamburger');
const moreBtn = document.getElementById('moreBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

// Hamburger toggle (works for both mobile hamburger and desktop dropdown)
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    dropdownMenu.classList.toggle('show');
});

// Desktop dropdown toggle
moreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    // Close dropdown if clicking outside
    if (!hamburger.contains(e.target) && !moreBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

// Close dropdown when clicking on dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
        hamburger.classList.remove('active');
    });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close dropdown when resizing
    dropdownMenu.classList.remove('show');
    hamburger.classList.remove('active');
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close dropdown on Escape
        dropdownMenu.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

// Hover effects for desktop dropdown
const dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('mouseenter', function() {
    // Only show on hover if not on mobile
    if (window.innerWidth > 768) {
        dropdownMenu.classList.add('show');
    }
});

dropdown.addEventListener('mouseleave', function() {
    // Only hide on mouse leave if not on mobile
    if (window.innerWidth > 768) {
        dropdownMenu.classList.remove('show');
    }
});

// Prevent dropdown from closing when clicking inside it
dropdownMenu.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
});

// Enhanced logo hover effects
const heroLogoCircle = document.querySelector('.hero-logo-circle');

if (heroLogoCircle) {
    heroLogoCircle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 16px rgba(255, 107, 53, 0.4)';
    });
    
    heroLogoCircle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 8px rgba(255, 107, 53, 0.2)';
    });
}

// Subtle parallax effect for hero section (reduced intensity)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');
    
    if (hero && heroLogo && scrolled < window.innerHeight) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
        
        // Subtle parallax for logo
        heroLogo.style.transform = `translateY(${scrolled * -0.1}px) scale(1)`;
    }
});

// Add loading states and smooth transitions
window.addEventListener('load', function() {
    // Remove any loading classes if present
    document.body.classList.add('loaded');
    
    // Trigger any remaining animations
    setTimeout(() => {
        const elementsToAnimate = document.querySelectorAll('[data-animate]');
        elementsToAnimate.forEach(el => {
            el.classList.add('animated');
        });
    }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');
    
    // Navbar effects
    if (scrolled > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    // Subtle parallax effects (only when hero is visible)
    if (hero && heroLogo && scrolled < window.innerHeight) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
        heroLogo.style.transform = `translateY(${scrolled * -0.1}px) scale(1)`;
    }
}, 16); // ~60fps

// Replace the scroll event listeners with throttled version
window.addEventListener('scroll', throttledScroll);