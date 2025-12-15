// Haros Parfüm - Common JavaScript
(function () {
    // Theme Management
    const THEME_KEY = 'haros-theme';
    const themeToggle = document.querySelector('.theme-toggle');

    // Get saved theme or default to dark
    function getTheme() {
        return localStorage.getItem(THEME_KEY) || 'dark';
    }

    // Set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateThemeIcon(theme);
    }

    // Update theme toggle icon
    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç');
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Initialize theme
    const savedTheme = getTheme();
    setTheme(savedTheme);

    // Add event listener to theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
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
