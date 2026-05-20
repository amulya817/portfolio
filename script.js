document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Mobile Navigation Menu
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    });

    /* ==========================================================================
       Sticky Navbar Scroll Handler
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       Typing Text Effect
       ========================================================================== */
    const typingSpan = document.getElementById('typing-text');
    const professions = [
        "AI-Powered Applications",
        "Full-Stack Web Systems",
        "Healthcare Technology",
        "Intelligent IoT Monitoring",
        "Route Optimization Algorithms"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typingSpan) return;

        const currentWord = professions[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            // Add character
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Standard typing speed
        }

        // Handle transitions between states
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at full word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % professions.length;
            // Short pause before starting new word
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    type();

    /* ==========================================================================
       Active Link Highlighting on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset to trigger early
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    /* ==========================================================================
       Scroll Reveal Animation (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.about-card, .highlight-card, .skills-category, .interests-container, .project-card, .timeline-content, .edu-card, .sub-card, .achievements-banner, .contact-info, .contact-form-container');
    
    // Add the reveal class to prepare elements for animation
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Stagger list elements optionally
        if (el.classList.contains('highlight-card') || el.classList.contains('skills-category') || el.classList.contains('project-card')) {
            const staggerDelay = (index % 3) + 1;
            el.classList.add(`reveal-delay-${staggerDelay}`);
        }
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once triggered
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is in viewport
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       Contact Form Handling
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            formStatus.className = 'form-status';
            formStatus.textContent = '';
            
            const nameInput = document.getElementById('form-name').value;
            const emailInput = document.getElementById('form-email').value;
            const messageInput = document.getElementById('form-message').value;

            // Mock API sending
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                
                // Form feedback validation
                if (nameInput.trim() && emailInput.trim() && messageInput.trim()) {
                    formStatus.textContent = "Thank you! Your message has been sent successfully.";
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Please fill in all fields correctly.";
                    formStatus.classList.add('error');
                }
            }, 1500); // 1.5 second simulated latency
        });
    }

});
