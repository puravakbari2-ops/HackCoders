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

    // ── User Profile Dropdown & Session Management ───────────
    function toggleUserDropdown(e) {
        if (e) e.stopPropagation();
        const menu = document.getElementById('userProfileMenu');
        const dropdown = document.getElementById('userDropdownMenu');
        if (menu) menu.classList.toggle('open');
        if (dropdown) dropdown.classList.toggle('open');
    }

    function closeUserDropdown() {
        const menu = document.getElementById('userProfileMenu');
        const dropdown = document.getElementById('userDropdownMenu');
        if (menu) menu.classList.remove('open');
        if (dropdown) dropdown.classList.remove('open');
    }

    function doLogout() {
        localStorage.removeItem('jansahay_user');
        sessionStorage.clear();
        closeUserDropdown();
        checkUserSession();
        if (typeof showToast === 'function') {
            showToast('Signed out successfully.', 'info');
        }
    }

    // Event delegation for user dropdown, logout, and sign-in buttons
    document.addEventListener('click', (e) => {
        const chip = e.target.closest('#userChipDropdownBtn');
        if (chip) {
            e.stopPropagation();
            toggleUserDropdown();
            return;
        }

        if (e.target.closest('#logoutBtn') || e.target.closest('#mobileLogoutBtn')) {
            e.preventDefault();
            doLogout();
            return;
        }

        if (e.target.closest('#signInBtn') || e.target.closest('.mobile-sign-in')) {
            if (!window.location.pathname.endsWith('login.html')) {
                window.location.href = 'login.html';
            }
            return;
        }

        if (!e.target.closest('#userDropdownMenu')) {
            closeUserDropdown();
        }
    });

    function checkUserSession() {
        try {
            const rawUser = localStorage.getItem('jansahay_user');
            const signInBtn = document.getElementById('signInBtn');
            const mobileSignInBtn = document.querySelector('.mobile-sign-in');
            let userProfileMenu = document.getElementById('userProfileMenu');
            let mobileUserProfile = document.getElementById('mobileUserProfile');

            if (rawUser) {
                let user;
                try {
                    user = JSON.parse(rawUser);
                } catch (pe) {
                    console.warn('Corrupted citizen session, clearing:', pe);
                    localStorage.removeItem('jansahay_user');
                    checkUserSession();
                    return;
                }

                if (signInBtn) signInBtn.style.display = 'none';
                if (mobileSignInBtn) mobileSignInBtn.style.display = 'none';

                // Resilient dynamic injection if markup is missing on any page
                if (!userProfileMenu && signInBtn && signInBtn.parentNode) {
                    const menuDiv = document.createElement('div');
                    menuDiv.className = 'user-profile-menu';
                    menuDiv.id = 'userProfileMenu';
                    menuDiv.innerHTML = `
                        <div class="user-chip" id="userChipDropdownBtn">
                            <img src="" alt="Citizen Avatar" class="user-avatar-img" id="navUserAvatar">
                            <div class="user-info-text">
                                <span class="user-name" id="navUserName">Citizen</span>
                                <span class="user-badge" id="navUserBadge"><i class="fas fa-circle-check"></i> Verified</span>
                            </div>
                            <i class="fas fa-chevron-down user-caret"></i>
                        </div>
                        <div class="user-dropdown-menu" id="userDropdownMenu">
                            <div class="dropdown-header">
                                <strong id="dropdownFullName">Citizen</strong>
                                <small id="dropdownEmail">citizen@jansahay.gov.in</small>
                            </div>
                            <a href="javascript:void(0)" class="dropdown-item" onclick="if(window.showToast) window.showToast('Your active eligibility profile has matching schemes!', 'info');"><i class="fas fa-user-check"></i> Eligibility Profile</a>
                            <a href="javascript:void(0)" class="dropdown-item" onclick="if(window.showToast) window.showToast('Your schemes are saved in your vault.', 'info');"><i class="fas fa-bookmark"></i> Saved Schemes</a>
                            <a href="javascript:void(0)" class="dropdown-item" onclick="if(window.showToast) window.showToast('Application tracking active at Ministry.', 'info');"><i class="fas fa-file-lines"></i> Track Applications</a>
                            <div class="dropdown-divider"></div>
                            <button type="button" class="dropdown-item text-danger" id="logoutBtn"><i class="fas fa-arrow-right-from-bracket"></i> Sign Out</button>
                        </div>
                    `;
                    signInBtn.parentNode.insertBefore(menuDiv, signInBtn.nextSibling);
                    userProfileMenu = menuDiv;
                }

                if (!mobileUserProfile && mobileSignInBtn && mobileSignInBtn.parentNode) {
                    const mobDiv = document.createElement('div');
                    mobDiv.className = 'mobile-user-profile';
                    mobDiv.id = 'mobileUserProfile';
                    mobDiv.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                            <img src="" id="mobileUserAvatar" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #a855f7; object-fit: cover;" alt="Citizen Avatar">
                            <div>
                                <div id="mobileUserName" style="font-weight: 600; color: #f8fafc; font-size: 0.92rem;">Citizen</div>
                                <div style="font-size: 0.72rem; color: #10b981;"><i class="fas fa-circle-check"></i> Verified Citizen</div>
                            </div>
                        </div>
                        <button type="button" id="mobileLogoutBtn" class="dropdown-item text-danger" style="width: 100%; border-radius: 8px; justify-content: center; background: rgba(239,68,68,0.12); padding: 10px;">
                            <i class="fas fa-arrow-right-from-bracket"></i> Sign Out
                        </button>
                    `;
                    mobileSignInBtn.parentNode.appendChild(mobDiv);
                    mobileUserProfile = mobDiv;
                }

                if (userProfileMenu) userProfileMenu.style.display = 'inline-block';
                if (mobileUserProfile) mobileUserProfile.style.display = 'block';

                const displayName = user.name || 'Citizen';
                const navUserName = document.getElementById('navUserName');
                const dropdownFullName = document.getElementById('dropdownFullName');
                const dropdownEmail = document.getElementById('dropdownEmail');
                const mobileUserName = document.getElementById('mobileUserName');
                const navUserAvatar = document.getElementById('navUserAvatar');
                const mobileUserAvatar = document.getElementById('mobileUserAvatar');

                if (navUserName) navUserName.textContent = displayName;
                if (dropdownFullName) dropdownFullName.textContent = displayName;
                if (dropdownEmail) dropdownEmail.textContent = user.email || 'citizen@jansahay.gov.in';
                if (mobileUserName) mobileUserName.textContent = displayName;

                const avatarUrl = user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`;
                if (navUserAvatar) navUserAvatar.src = avatarUrl;
                if (mobileUserAvatar) mobileUserAvatar.src = avatarUrl;
            } else {
                if (signInBtn) signInBtn.style.display = '';
                if (mobileSignInBtn) mobileSignInBtn.style.display = '';
                if (userProfileMenu) {
                    userProfileMenu.style.display = 'none';
                    userProfileMenu.classList.remove('open');
                }
                if (mobileUserProfile) mobileUserProfile.style.display = 'none';
            }
        } catch (e) {
            console.error('Error reading citizen session:', e);
        }
    }

    // Run check on initialization & on storage event (multi-tab sync)
    checkUserSession();
    window.addEventListener('storage', checkUserSession);

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
