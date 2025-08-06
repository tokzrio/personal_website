document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggler ---
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const themeIcon = themeToggleButton.querySelector('i');

    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', savedTheme);
        
        if (savedTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    applySavedTheme();


    // --- Scroll Fade-In Animation ---
    const fadeElems = document.querySelectorAll('section');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElems.forEach(elem => {
        elem.classList.add('fade-in-section');
        fadeObserver.observe(elem);
    });


    // --- Active Navigation Link Highlighting ---
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
        rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    
    // --- ✨ NEW: Binary Particle Mouse Effect ---
    
    // Throttling function to limit how often the particle creation function runs
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Function to create a single particle
    function createParticle(e) {
        const isDarkTheme = body.getAttribute('data-theme') === 'dark';
        
        // Define color palettes for light and dark themes
        const particleColors = isDarkTheme
            ? ['#ffffff', '#a0a0a0', '#555555'] // Colors for dark mode
            : ['#000000', '#6c757d', '#aaaaaa']; // Colors for light mode

        // Create the particle element
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        // Randomize properties for a dynamic look
        const fontSize = Math.random() * 12 + 8; // Font size between 8px and 20px
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        const binaryDigit = Math.random() > 0.5 ? '1' : '0';

        // Apply styles
        particle.innerHTML = binaryDigit; // Set content to '0' or '1'
        particle.style.fontSize = `${fontSize}px`;
        particle.style.color = color;
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        // Define random end position for the particle's movement
        const xEnd = (Math.random() - 0.5) * 75;
        const yEnd = (Math.random() - 0.5) * 75;

        // Use the Web Animations API for better performance
        const animation = particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${xEnd}px), calc(-50% + ${yEnd}px)) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 500, // Random duration
            easing: 'ease-out',
            fill: 'forwards'
        });

        // Remove the particle from the DOM after the animation completes
        animation.onfinish = () => {
            particle.remove();
        };
    }

    // Attach the throttled event listener to the document
    document.addEventListener('mousemove', throttle(createParticle, 50));

});