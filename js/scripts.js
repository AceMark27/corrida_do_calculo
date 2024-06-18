// scripts.js
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});

// Fun animations for elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.card, .welcome-content, .feature-card, .detail-card, .download-button');
    elements.forEach((el, index) => {
        el.style.opacity = 0;
        el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        el.style.transform = 'translateY(20px)';
    });
    
    window.addEventListener('scroll', () => {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }
        });
    });
});
