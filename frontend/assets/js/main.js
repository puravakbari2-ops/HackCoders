/* ============================================================
   JanSahay AI - Main Application Module
   Orchestrates: navbar, theme, mobile menu, categories,
   FAQs, stats counter, search, and scroll animations
   ============================================================ */

(function () {
    'use strict';

    const { CATEGORIES, STATES, MINISTRIES, FAQS, SAMPLE_SCHEMES, API_BASE } = window.AppData;

    // ── DOM References ────────────────────────────────────────
    const navbar            = document.getElementById('navbar');
    const themeToggle       = document.getElementById('themeToggle');
    const mobileMenuBtn     = document.getElementById('mobileMenuBtn');
    const mobileMenuClose   = document.getElementById('mobileMenuClose');
    const mobileMenu        = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const categoriesGrid    = document.getElementById('categoriesGrid');
    const faqList           = document.getElementById('faqList');
    const heroSearchInput   = document.getElementById('heroSearchInput');
    const navSearchInput    = document.getElementById('navSearchInput');
    const sectionTitle      = document.querySelector('.categories-section .section-title');

    // ── Theme ─────────────────────────────────────────────────
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeToggle) {
            themeToggle.innerHTML = savedTheme === 'dark'
                ? '<i class="fas fa-moon"></i>'
                : '<i class="fas fa-sun"></i>';
        }
    }

    themeToggle && themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    // ── Navbar Scroll ─────────────────────────────────────────
    window.addEventListener('scroll', () => {
        navbar && navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── Mobile Menu ───────────────────────────────────────────
    function closeMobileMenu() {
        mobileMenu && mobileMenu.classList.remove('active');
        mobileMenuOverlay && mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuBtn && mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    mobileMenuClose  && mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay && mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    document.querySelectorAll('.mobile-nav-links a').forEach(l => l.addEventListener('click', closeMobileMenu));

    // ── User Profile Dropdown ─────────────────────────────────
    const userChipBtn    = document.getElementById('userChipDropdownBtn');
    const userDropdown   = document.getElementById('userDropdownMenu');
    const logoutBtn      = document.getElementById('logoutBtn');
    const mobileLogoutBtn= document.getElementById('mobileLogoutBtn');

    userChipBtn && userChipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown && userDropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => {
        userDropdown && userDropdown.classList.remove('open');
    });

    function doLogout() {
        localStorage.removeItem('jansahay_user');
        sessionStorage.clear();
        document.getElementById('userProfileMenu') && (document.getElementById('userProfileMenu').style.display = 'none');
        document.getElementById('signInBtn')       && (document.getElementById('signInBtn').style.display = '');
        document.getElementById('mobileUserProfile') && (document.getElementById('mobileUserProfile').style.display = 'none');
        document.querySelector('.mobile-sign-in') && (document.querySelector('.mobile-sign-in').style.display = '');
        showToast('Signed out successfully.', 'info');
    }
    logoutBtn       && logoutBtn.addEventListener('click', doLogout);
    mobileLogoutBtn && mobileLogoutBtn.addEventListener('click', doLogout);

    // ── Categories/States/Ministries Renderer ────────────────
    let currentTabData  = CATEGORIES;
    let currentTabLabel = 'categories';

    function renderCategories(data) {
        if (!categoriesGrid) return;
        categoriesGrid.innerHTML = data.map(cat => `
            <div class="category-card" tabindex="0" role="button" aria-label="${cat.name}" data-name="${cat.name}">
                <div class="category-icon" style="color:${cat.color};">
                    <i class="${cat.icon}"></i>
                </div>
                <div class="category-count">${cat.count} Schemes</div>
                <div class="category-name">${cat.name}</div>
            </div>
        `).join('');

        categoriesGrid.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => handleCategoryClick(card.getAttribute('data-name')));
            card.addEventListener('keypress', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(card.getAttribute('data-name'));
                }
            });
        });

        requestAnimationFrame(() => {
            categoriesGrid.querySelectorAll('.category-card').forEach((el, i) => {
                el.style.opacity   = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
                setTimeout(() => {
                    el.style.opacity   = '1';
                    el.style.transform = 'translateY(0)';
                }, 50 + i * 50);
            });
        });
    }

    function handleCategoryClick(name) {
        showToast(`Searching schemes for: ${name}`, 'info');
        localSearch(name);
    }

    // ── Tab switching ─────────────────────────────────────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tab = btn.getAttribute('data-tab');
            currentTabLabel = tab;

            if (tab === 'categories') {
                currentTabData = CATEGORIES;
                if (sectionTitle) sectionTitle.innerHTML = 'Find schemes based on <span class="gradient-text">categories</span>';
                renderCategories(CATEGORIES);
            } else if (tab === 'states') {
                currentTabData = STATES;
                if (sectionTitle) sectionTitle.innerHTML = 'Find schemes based on <span class="gradient-text">States/UTs</span>';
                renderCategories(STATES);
            } else if (tab === 'ministries') {
                currentTabData = MINISTRIES;
                if (sectionTitle) sectionTitle.innerHTML = 'Find schemes by <span class="gradient-text">Central Ministries</span>';
                renderCategories(MINISTRIES);
            }
        });
    });

    // ── FAQs ──────────────────────────────────────────────────
    function renderFAQs() {
        if (!faqList) return;
        faqList.innerHTML = FAQS.map((faq, i) => `
            <div class="faq-item" id="faq-item-${i}">
                <div class="faq-question" data-faq="${i}">
                    <span>${faq.q}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <div class="faq-answer-inner">${faq.a}</div>
                </div>
            </div>
        `).join('');

        faqList.addEventListener('click', e => {
            const question = e.target.closest('.faq-question');
            if (!question) return;
            const index = parseInt(question.getAttribute('data-faq'));
            const item  = document.getElementById(`faq-item-${index}`);
            const wasActive = item.classList.contains('active');
            faqList.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    }

    window.toggleFAQ = function (index) {
        const item = document.getElementById(`faq-item-${index}`);
        if (!item) return;
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    };

    // ── Stats Counter Animation ───────────────────────────────
    function initCountAnimation() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el     = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    animateCount(el, target);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
    }

    function animateCount(el, target) {
        const duration = 2000;
        const start    = performance.now();
        function update(now) {
            const p     = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (p < 1) requestAnimationFrame(update);
            else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(update);
    }

    // ── Intersection Observer for Animations ──────────────────
    const animationObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // ── Local Search (no backend needed) ─────────────────────
    function localSearch(query) {
        if (!query || !query.trim()) return;
        const q          = query.toLowerCase().trim();
        const qClean     = q.replace(/&/g, 'and');
        const isMinistry = MINISTRIES.some(m => m.name.toLowerCase().replace(/&/g, 'and') === qClean);
        const isState    = STATES.some(s => s.name.toLowerCase() === q);
        const isCategory = CATEGORIES.some(c => c.name.toLowerCase() === q);

        let filtered;
        if (isMinistry) {
            filtered = SAMPLE_SCHEMES.filter(s =>
                (s.ministry || '').toLowerCase().replace(/&/g, 'and') === qClean
            );
        } else if (isState) {
            filtered = SAMPLE_SCHEMES.filter(s =>
                (s.state || '').toLowerCase() === q || (s.state || '') === 'All India'
            );
        } else if (isCategory) {
            filtered = SAMPLE_SCHEMES.filter(s =>
                (s.category || '').toLowerCase() === q
            );
        } else {
            filtered = SAMPLE_SCHEMES.filter(s =>
                s.title.toLowerCase().includes(q) ||
                (s.ministry  && s.ministry.toLowerCase().includes(q))  ||
                (s.category  && s.category.toLowerCase().includes(q))  ||
                (s.state     && s.state.toLowerCase().includes(q))     ||
                (s.eligibility_summary && s.eligibility_summary.toLowerCase().includes(q)) ||
                (s.tags || []).some(t => t.toLowerCase().includes(q))
            );
        }

        document.dispatchEvent(new CustomEvent('jansahay:showResults', { detail: filtered }));
    }

    // ── Search (tries API first, falls back to local) ─────────
    async function handleSearch(query) {
        if (!query || !query.trim()) {
            showToast('Please enter a search term.', 'info');
            return;
        }

        const isLocal = window.location.protocol === 'file:' ||
                        window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1';

        if (!isLocal) {
            // Try API only when hosted
            try {
                const res  = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
                const json = await res.json();
                if (json.success && json.data && json.data.length > 0) {
                    document.dispatchEvent(new CustomEvent('jansahay:showResults', { detail: json.data }));
                    return;
                }
            } catch { /* fall through to local search */ }
        }

        localSearch(query);
    }

    // ── Bind All Search Bars ──────────────────────────────────
    // Hero search
    const heroSearchBtn = document.querySelector('.hero-search-btn');
    heroSearchBtn && heroSearchBtn.addEventListener('click', () => {
        handleSearch(heroSearchInput ? heroSearchInput.value : '');
    });
    heroSearchInput && heroSearchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') handleSearch(heroSearchInput.value);
    });

    // Navbar search
    const navSearchBtn = document.querySelector('#navbarSearch .search-btn');
    navSearchBtn && navSearchBtn.addEventListener('click', () => {
        if (navSearchInput) handleSearch(navSearchInput.value);
    });
    navSearchInput && navSearchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') handleSearch(navSearchInput.value);
    });

    // Mobile search
    const mobileSearchInput = document.querySelector('.mobile-search input');
    const mobileSearchBtn   = document.querySelector('.mobile-search button');
    mobileSearchBtn && mobileSearchBtn.addEventListener('click', () => {
        if (mobileSearchInput) { handleSearch(mobileSearchInput.value); closeMobileMenu(); }
    });
    mobileSearchInput && mobileSearchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') { handleSearch(mobileSearchInput.value); closeMobileMenu(); }
    });

    // ── Toast Notification ────────────────────────────────────
    function showToast(msg, type = 'info') {
        const icons = { info: 'fa-info-circle', success: 'fa-check-circle', error: 'fa-exclamation-circle' };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${msg}`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }
    window.showToast = showToast;

    // ── Init ─────────────────────────────────────────────────
    // Scripts load at end of <body>, so DOM is already ready.
    // We use a helper that calls immediately if DOM is ready,
    // or waits for DOMContentLoaded if somehow not yet ready.
    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    onReady(() => {
        renderCategories(CATEGORIES);
        renderFAQs();
        initCountAnimation();

        document.querySelectorAll('.step-card, .stat-card').forEach(el => {
            el.style.opacity    = '0';
            el.style.transform  = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(el);
        });
    });

    // ── Listen for search results event ──────────────────────
    document.addEventListener('jansahay:showResults', e => {
        const resultsPage = document.getElementById('resultsPage');
        if (!resultsPage) return;
        document.querySelector('main').style.display  = 'none';
        document.getElementById('footer').style.display = 'none';
        resultsPage.style.display = 'block';
        window.scrollTo(0, 0);
        if (window._renderResults) window._renderResults(e.detail);
    });

})();
