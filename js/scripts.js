'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Remove preload class to enable transitions after page load
    // Use requestAnimationFrame to ensure the removal happens after the first paint
    requestAnimationFrame(() => {
        document.body.classList.remove('preload');
    });


    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');
    const siteHeader = document.querySelector('.site-header');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isActive = navList.classList.toggle('is-active');
            menuToggle.setAttribute('aria-expanded', isActive);
            menuToggle.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');
            // Use class for body lock to avoid direct style manipulation conflict
            document.body.classList.toggle('no-scroll', isActive);
            if (siteHeader) {
                siteHeader.classList.toggle('menu-is-open', isActive);
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('is-active')) {
                    navList.classList.remove('is-active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Abrir menu');
                    document.body.classList.remove('no-scroll');
                    if (siteHeader) {
                       siteHeader.classList.remove('menu-is-open');
                    }
                }
            });
        });
    }

    // --- Header Scroll Effect ---
    let lastScrollTop = 0;
    const scrollThreshold = 50;

    const handleScroll = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (siteHeader) {
            // Add scrolled class based on threshold
            siteHeader.classList.toggle('is-scrolled', scrollTop > scrollThreshold);

            // Optional: Hide header on scroll down, show on scroll up (more complex)
            // if (scrollTop > lastScrollTop && scrollTop > var(--header-height, 75)) {
            //     // Scrolling Down
            //     siteHeader.classList.add('header-hidden');
            // } else {
            //     // Scrolling Up
            //     siteHeader.classList.remove('header-hidden');
            // }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    }, { passive: true });

    handleScroll(); // Initial check


    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully in view
            threshold: 0.1
        };

        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
                if (!motionQuery || !motionQuery.matches) {
                     if (entry.isIntersecting) {
                        // Use setTimeout to slightly delay adding the class,
                        // allows the element to be painted first in some cases
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, 50); // Small delay
                        observer.unobserve(entry.target);
                    }
                } else {
                     entry.target.classList.add('is-visible'); // Make visible immediately if reduced motion
                     observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });

    } else {
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // --- Lightbox Options (Optional - Configure if needed) ---
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
          'resizeDuration': 400, // Slightly longer fade
          'fadeDuration': 500,
          'wrapAround': true, // Navigate from last image to first
          'albumLabel': "Imagem %1 de %2" // Translate labels
          // 'disableScrolling': true // Prevent background scrolling when open
        });
    } else {
        console.warn("Lightbox library not loaded or initialized.");
    }

}); // End DOMContentLoaded

// Add body lock class style to CSS
/*
body.no-scroll {
    overflow: hidden;
}
*/