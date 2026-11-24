/* ============================================
   MATERIAL DESIGN 3 - Eliott Legal Portfolio Scripts
   ============================================ */

(function() {
    'use strict';

    // --- Theme Toggle (Dark/Light Mode) ---
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function initTheme() {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved) {
            htmlEl.setAttribute('data-theme', saved);
        } else {
            htmlEl.setAttribute('data-theme', getSystemTheme());
        }
    }

    function toggleTheme() {
        const current = htmlEl.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
    }

    themeToggle.addEventListener('click', toggleTheme);
    initTheme();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            htmlEl.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // --- Navbar Scroll Shadow ---
    const topAppBar = document.getElementById('mainNav');

    function handleScroll() {
        if (window.scrollY > 10) {
            topAppBar.classList.add('scrolled');
        } else {
            topAppBar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Scroll to Top FAB ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    function updateScrollButton() {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateScrollButton, { passive: true });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    let menuOpen = false;

    function toggleMobileMenu() {
        menuOpen = !menuOpen;
        if (menuOpen) {
            mobileMenuOverlay.classList.add('active');
            mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'close';
        } else {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when a link is clicked
    mobileMenuOverlay.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (menuOpen) toggleMobileMenu();
        });
    });

    // --- Smooth Scroll for js-scroll-trigger links ---
    document.querySelectorAll('.js-scroll-trigger').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80; // account for fixed navbar
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            }
        });
    });

})();