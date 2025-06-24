// about section start
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('About');
    const scrollableContent = document.getElementById('scrollableContent');
    
    // Intersection Observer for section visibility and animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger slide animations when section comes into view
                const slideElements = entry.target.querySelectorAll('.slide-left, .slide-right');
                slideElements.forEach(element => {
                    element.style.animationPlayState = 'running';
                });
            }
        });
    }, observerOptions);
    
    // Start observing the About section
    if (aboutSection) {
        sectionObserver.observe(aboutSection);
    }
    
    // Enhanced touch scroll support for mobile
    if (scrollableContent) {
        scrollableContent.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        });
        
        scrollableContent.addEventListener('touchmove', function(e) {
            e.stopPropagation();
        });
    }
});
// about ends