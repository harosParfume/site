// Haros Parfüm - Common JavaScript
(function () {
    // Theme Management
    const THEME_KEY = 'haros-theme';
    const themeToggle = document.querySelector('.theme-toggle');

    // Get theme - always start with dark, but allow temporary toggle
    function getTheme() {
        // Always return 'dark' on page load (ignore localStorage)
        return 'dark';
    }

    // Set theme (only for current session, don't save to localStorage)
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // Don't save to localStorage - we want dark mode on every page load
        updateThemeIcon(theme);
    }

    // Update theme toggle icon
    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç');
        }
    }

    // Toggle theme (temporary, only for current session)
    let currentTheme = 'dark'; // Start with dark
    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    }

    // Initialize theme - always start with dark
    setTheme('dark');

    // Add event listener to theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when scrolling
        let lastScrollPosition = 0;
        window.addEventListener('scroll', () => {
            const currentScrollPosition = window.pageYOffset;

            // Close menu if scrolled more than 50px
            if (Math.abs(currentScrollPosition - lastScrollPosition) > 50) {
                if (navLinks.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
                lastScrollPosition = currentScrollPosition;
            }
        }, { passive: true });
    }

    // Active navigation link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkPath = new URL(href, window.location.origin + currentPath).pathname;
        if (currentPath.endsWith('/') ? linkPath === currentPath : linkPath === currentPath.replace(/\\/g, '/')) {
            link.classList.add('active');
        }
    });

    // Update footer year
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Auto-hide navbar on scroll (mobile)
    let lastScrollTop = 0;
    let scrollThreshold = 10; // Minimum scroll distance to trigger
    let isScrolling = false;
    const header = document.querySelector('.site-header');

    function handleScroll() {
        if (!header) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDiff = Math.abs(scrollTop - lastScrollTop);

        // Only trigger if scrolled more than threshold
        if (scrollDiff < scrollThreshold) return;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past 100px
            header.classList.add('header-hidden');
        } else {
            // Scrolling up
            header.classList.remove('header-hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Throttle scroll event for better performance
    window.addEventListener('scroll', function () {
        if (!isScrolling) {
            window.requestAnimationFrame(function () {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
})();
