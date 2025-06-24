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

// Handle window resize
window.addEventListener('resize', function() {
    dropdownMenu.classList.remove('show');
    hamburger.classList.remove('active');
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        dropdownMenu.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

// Hover effects for desktop dropdown
const dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('mouseenter', function() {
    if (window.innerWidth > 768) {
        dropdownMenu.classList.add('show');
    }
});

dropdown.addEventListener('mouseleave', function() {
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

// Image Slideshow Functionality - Fixed to show all 6 images
let currentSlide = 0;
let slides = [];
let slideshowInterval = null;

function initializeSlideshow() {
    // Get all slide images fresh each time
    slides = document.querySelectorAll('.slide-image');
    
    if (slides.length === 0) {
        console.warn('No slide images found');
        return;
    }
    
    console.log(`Found ${slides.length} slides`); // Debug log
    
    // Reset all slides
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'zoom-out');
        slide.style.opacity = '0';
        slide.style.transform = 'scale(1.1)';
    });
    
    // Set first slide as active
    currentSlide = 0;
    if (slides[0]) {
        slides[0].classList.add('active');
        slides[0].style.opacity = '1';
        
        // Add zoom-out effect after a brief delay
        setTimeout(() => {
            if (slides[0]) {
                slides[0].classList.add('zoom-out');
                slides[0].style.transform = 'scale(1)';
            }
        }, 100);
    }
    
    // Clear any existing interval
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    // Start automatic slideshow every 3 seconds
    slideshowInterval = setInterval(showNextSlide, 3000);
}

function showNextSlide() {
    if (slides.length === 0) {
        console.warn('No slides available for transition');
        return;
    }
    
    // Remove active and zoom-out classes from current slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.remove('active', 'zoom-out');
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.transform = 'scale(1.1)';
    }
    
    // Move to next slide (loop back to first if at end)
    currentSlide = (currentSlide + 1) % slides.length;
    
    console.log(`Switching to slide ${currentSlide + 1} of ${slides.length}`); // Debug log
    
    // Add active class to new slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.opacity = '1';
        
        // Add zoom-out class after a brief delay to ensure smooth transition
        setTimeout(() => {
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('zoom-out');
                slides[currentSlide].style.transform = 'scale(1)';
            }
        }, 50);
    }
}

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

// Navbar scroll effects with parallax
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

// Apply throttled scroll listener
window.addEventListener('scroll', throttledScroll, { passive: true });

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Close dropdown when resizing
    dropdownMenu.classList.remove('show');
    hamburger.classList.remove('active');
});

// Page load initialization
window.addEventListener('load', function() {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize slideshow
    initializeSlideshow();
    
    // Clear will-change properties after animations complete
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.hero-logo, .hero-text, .hero-description, .hero-slideshow');
        animatedElements.forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 2000);
});

// DOM Content Loaded for immediate setup
document.addEventListener('DOMContentLoaded', function() {
    // Ensure smooth scrolling is enabled
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload critical animations
    const criticalElements = document.querySelectorAll('.hero-logo, .hero-text, .get-started-btn');
    criticalElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
});

// Touch event optimization for mobile
if ('ontouchstart' in window) {
    // Add touch-specific optimizations
    document.body.style.webkitTouchCallout = 'none';
    document.body.style.webkitUserSelect = 'none';
    
    // Optimize touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
}

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}