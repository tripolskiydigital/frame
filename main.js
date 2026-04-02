document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        ".fade-in-up, .fade-in-left, .fade-in-right"
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Smooth Scrolling for Anchor Links (Browsers without scroll-behavior: smooth support fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 4. Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('problems').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 5. Active Navbar Linking
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserverOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
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
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 6. Mobile Burger Menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navbarElement = document.querySelector('.navbar');

    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
            if(navbarElement) navbarElement.classList.toggle('menu-open');
        });

        // Close menu on link click
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('nav-active');
                if(navbarElement) navbarElement.classList.remove('menu-open');
            });
        });
    }

    // 7. Floating CTA scroll behavior
    const floatingCta = document.querySelector('.mobile-floating-cta');
    if (floatingCta) {
        window.addEventListener('scroll', () => {
            // Show after scrolling past the first window height
            if (window.scrollY > window.innerHeight * 0.7) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }
});
