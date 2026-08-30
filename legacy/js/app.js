// ===========================
// Portfolio Landing Page JS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initDropdowns();
    initSearchModal();
    initSmoothScroll();
    initProjectTabs();
    initLanguageDropdown();
    initTimeline();
});

/**
 * Navbar shadow on scroll
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

/**
 * Mobile hamburger menu toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
    });
}

/**
 * Dropdown menus for nav items
 */
function initDropdowns() {
    document.querySelectorAll('[data-dropdown]').forEach(trigger => {
        const targetId = trigger.dataset.dropdown;
        const dropdown = document.getElementById(targetId);
        if (!dropdown) return;

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other dropdowns
            document.querySelectorAll('.dropdown-panel').forEach(d => {
                if (d !== dropdown) d.classList.add('hidden');
            });
            dropdown.classList.toggle('hidden');
            if (!dropdown.classList.contains('hidden')) {
                dropdown.classList.add('dropdown-enter');
            }
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-panel').forEach(d => {
            d.classList.add('hidden');
        });
    });
}

/**
 * Search modal with ⌘K / Ctrl+K shortcut
 */
function initSearchModal() {
    const modal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchTrigger = document.getElementById('search-trigger');
    if (!modal) return;

    function openSearch() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (searchInput) searchInput.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    // ⌘K / Ctrl+K shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (modal.classList.contains('hidden')) {
                openSearch();
            } else {
                closeSearch();
            }
        }
        if (e.key === 'Escape') {
            closeSearch();
        }
    });

    // Click trigger
    if (searchTrigger) {
        searchTrigger.addEventListener('click', openSearch);
    }

    // Click overlay to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSearch();
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if(href === '#') return; // Skip dummy links
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.add('hidden');
            }
        });
    });
}

/**
 * Project grid tab filtering
 */
function initProjectTabs() {
    const tabs = document.querySelectorAll('[data-tab]');
    const cards = document.querySelectorAll('[data-category]');
    if (!tabs.length || !cards.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.tab;

            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('tab-active', 'text-laravel');
                t.classList.add('text-muted');
            });
            tab.classList.add('tab-active', 'text-laravel');
            tab.classList.remove('text-muted');

            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.4s ease-out forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Language dropdown toggle
 */
function initLanguageDropdown() {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    if (!langToggle || !langDropdown) return;

    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('hidden');
        if (!langDropdown.classList.contains('hidden')) {
            langDropdown.classList.add('dropdown-enter');
        }
    });

    document.addEventListener('click', () => {
        langDropdown.classList.add('hidden');
    });
}

/**
 * Timeline scroll animation
 */
function initTimeline() {
    const wrap = document.getElementById('tlWrap');
    const path = document.getElementById('tlPath');
    const dot  = document.getElementById('tlDot');
    const items = document.querySelectorAll('.tl-item');
    const markers = [
        document.getElementById('tlMarker0'),
        document.getElementById('tlMarker1'),
        document.getElementById('tlMarker2'),
    ];
    const markerAt = [0.10, 0.42, 0.72];

    if (!wrap || !path || !dot) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = len;

    // Position milestone markers on the path
    markers.forEach((marker, i) => {
        if (marker) {
            const pt = path.getPointAtLength(len * markerAt[i]);
            marker.setAttribute('cx', pt.x);
            marker.setAttribute('cy', pt.y);
        }
    });

    function onScroll() {
        const rect = wrap.getBoundingClientRect();
        const total = wrap.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const progress = total > 0 ? scrolled / total : 0;

        // Draw path progressively
        path.style.strokeDashoffset = len * (1 - progress);

        // Move dot along path
        const pt = path.getPointAtLength(len * progress);
        dot.setAttribute('cx', pt.x);
        dot.setAttribute('cy', pt.y);

        // Show items and activate markers at milestones
        items.forEach(item => {
            const at = parseFloat(item.dataset.at);
            item.classList.toggle('is-visible', progress >= at);
        });

        markers.forEach((marker, i) => {
            if (marker) {
                marker.classList.toggle('is-active', progress >= markerAt[i]);
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
}
