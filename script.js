document.addEventListener('DOMContentLoaded', () => {

    // --- Effect 1: Scroll Fade-In Animation ---
    const fadeElems = document.querySelectorAll('section');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after it's visible once
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    fadeElems.forEach(elem => {
        elem.classList.add('fade-in-section'); // Add initial hidden state
        fadeObserver.observe(elem);
    });


    // --- Effect 2: Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px' // Trigger at the vertical center of the viewport
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

});