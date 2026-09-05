/* ============================================
   JanSahay AI - Main JavaScript
   ============================================ */

// ============================================
// Hero Particle Canvas Animation
// ============================================
(function initParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [], animId;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    class Particle {
        constructor() { this.reset(true); }
        reset(init) {
            this.x  = Math.random() * W;
            this.y  = init ? Math.random() * H : H + 10;
            this.r  = Math.random() * 1.5 + 0.3;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = -(Math.random() * 0.6 + 0.2);
            this.alpha = Math.random() * 0.5 + 0.1;
            const colors = ['124,58,237', '6,182,212', '236,72,153', '16,185,129'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < -10) this.reset(false);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }
    }

    function drawConnections() {
        const maxDist = 100;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / maxDist)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        drawConnections();
        particles.forEach(p => { p.update(); p.draw(); });
        animId = requestAnimationFrame(loop);
    }

    function init() {
        resize();
        particles = Array.from({ length: 80 }, () => new Particle());
        if (animId) cancelAnimationFrame(animId);
        loop();
    }

    window.addEventListener('resize', () => { resize(); });
    // Wait for layout
    setTimeout(init, 100);
})();

// ============================================
// Data
// ============================================
const CATEGORIES = [
    { name: "Agriculture, Rural & Environment", icon: "fas fa-seedling", count: 862, color: "#166534" },
    { name: "Banking, Financial Services & Insurance", icon: "fas fa-building-columns", count: 336, color: "#92400e" },
    { name: "Business & Entrepreneurship", icon: "fas fa-handshake", count: 772, color: "#1e40af" },
    { name: "Education & Learning", icon: "fas fa-graduation-cap", count: 1110, color: "#dc2626" },
    { name: "Health & Wellness", icon: "fas fa-heart-pulse", count: 286, color: "#0d9488" },
    { name: "Housing & Shelter", icon: "fas fa-house", count: 136, color: "#0369a1" },
    { name: "Public Safety, Law & Justice", icon: "fas fa-scale-balanced", count: 34, color: "#b91c1c" },
    { name: "Science, IT & Communications", icon: "fas fa-atom", count: 121, color: "#7c3aed" },
    { name: "Skills & Employment", icon: "fas fa-chart-line", count: 401, color: "#c2410c" },
    { name: "Social Welfare & Empowerment", icon: "fas fa-people-group", count: 1453, color: "#dc2626" },
    { name: "Sports & Culture", icon: "fas fa-futbol", count: 127, color: "#7c3aed" },
    { name: "Transport & Infrastructure", icon: "fas fa-bus", count: 79, color: "#b45309" },
    { name: "Travel & Tourism", icon: "fas fa-compass", count: 19, color: "#047857" },
    { name: "Utility & Sanitation", icon: "fas fa-droplet", count: 128, color: "#0e7490" },
    { name: "Women & Child", icon: "fas fa-hand-holding-heart", count: 612, color: "#be185d" },
];

const STATES = [
    { name: "Andaman and Nicobar Islands", icon: "fas fa-map-marker-alt", count: 42, color: "#0891b2" },
    { name: "Andhra Pradesh",             icon: "fas fa-map-marker-alt", count: 268, color: "#1e40af" },
    { name: "Arunachal Pradesh",          icon: "fas fa-map-marker-alt", count: 86,  color: "#059669" },
    { name: "Assam",                      icon: "fas fa-map-marker-alt", count: 154, color: "#0d9488" },
    { name: "Bihar",                      icon: "fas fa-map-marker-alt", count: 197, color: "#b91c1c" },
    { name: "Chandigarh",                 icon: "fas fa-map-marker-alt", count: 68,  color: "#4f46e5" },
    { name: "Chhattisgarh",               icon: "fas fa-map-marker-alt", count: 164, color: "#b45309" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", icon: "fas fa-map-marker-alt", count: 39, color: "#c2410c" },
    { name: "Delhi",                      icon: "fas fa-map-marker-alt", count: 184, color: "#0369a1" },
    { name: "Goa",                        icon: "fas fa-map-marker-alt", count: 92,  color: "#0284c7" },
    { name: "Gujarat",                    icon: "fas fa-map-marker-alt", count: 298, color: "#0d9488" },
    { name: "Haryana",                    icon: "fas fa-map-marker-alt", count: 176, color: "#166534" },
    { name: "Himachal Pradesh",           icon: "fas fa-map-marker-alt", count: 132, color: "#2563eb" },
    { name: "Jammu and Kashmir",          icon: "fas fa-map-marker-alt", count: 145, color: "#7c3aed" },
    { name: "Jharkhand",                  icon: "fas fa-map-marker-alt", count: 158, color: "#d97706" },
    { name: "Karnataka",                  icon: "fas fa-map-marker-alt", count: 328, color: "#7c3aed" },
    { name: "Kerala",                     icon: "fas fa-map-marker-alt", count: 254, color: "#be185d" },
    { name: "Ladakh",                     icon: "fas fa-map-marker-alt", count: 37,  color: "#0891b2" },
    { name: "Lakshadweep",                icon: "fas fa-map-marker-alt", count: 29,  color: "#059669" },
    { name: "Madhya Pradesh",             icon: "fas fa-map-marker-alt", count: 275, color: "#166534" },
    { name: "Maharashtra",                icon: "fas fa-map-marker-alt", count: 387, color: "#0369a1" },
    { name: "Manipur",                    icon: "fas fa-map-marker-alt", count: 74,  color: "#dc2626" },
    { name: "Meghalaya",                  icon: "fas fa-map-marker-alt", count: 69,  color: "#059669" },
    { name: "Mizoram",                    icon: "fas fa-map-marker-alt", count: 61,  color: "#d97706" },
    { name: "Nagaland",                   icon: "fas fa-map-marker-alt", count: 58,  color: "#7c3aed" },
    { name: "Odisha",                     icon: "fas fa-map-marker-alt", count: 215, color: "#c2410c" },
    { name: "Puducherry",                 icon: "fas fa-map-marker-alt", count: 53,  color: "#4f46e5" },
    { name: "Punjab",                     icon: "fas fa-map-marker-alt", count: 231, color: "#92400e" },
    { name: "Rajasthan",                  icon: "fas fa-map-marker-alt", count: 354, color: "#b45309" },
    { name: "Sikkim",                     icon: "fas fa-map-marker-alt", count: 52,  color: "#0d9488" },
    { name: "Tamil Nadu",                 icon: "fas fa-map-marker-alt", count: 341, color: "#047857" },
    { name: "Telangana",                  icon: "fas fa-map-marker-alt", count: 218, color: "#dc2626" },
    { name: "Tripura",                    icon: "fas fa-map-marker-alt", count: 77,  color: "#2563eb" },
    { name: "Uttar Pradesh",              icon: "fas fa-map-marker-alt", count: 412, color: "#b91c1c" },
    { name: "Uttarakhand",                icon: "fas fa-map-marker-alt", count: 148, color: "#0284c7" },
    { name: "West Bengal",                icon: "fas fa-map-marker-alt", count: 303, color: "#c2410c" }
];

const MINISTRIES = [
    { name: "Comptroller and Auditor General of India", icon: "fas fa-calculator", count: 2, color: "#0f766e" },
    { name: "Ministry of Agriculture and Farmers Welfare", icon: "fas fa-seedling", count: 41, color: "#166534" },
    { name: "Ministry of Ayush", icon: "fas fa-leaf", count: 10, color: "#059669" },
    { name: "Ministry of Chemicals and Fertilizers", icon: "fas fa-flask", count: 10, color: "#0d9488" },
    { name: "Ministry of Commerce and Industry", icon: "fas fa-industry", count: 56, color: "#b45309" },
    { name: "Ministry of Communication", icon: "fas fa-tower-broadcast", count: 11, color: "#2563eb" },
    { name: "Ministry of Consumer Affairs, Food and Public Distribution", icon: "fas fa-cart-shopping", count: 1, color: "#c2410c" },
    { name: "Ministry of Corporate Affairs", icon: "fas fa-briefcase", count: 3, color: "#4f46e5" },
    { name: "Ministry of Culture", icon: "fas fa-monument", count: 20, color: "#be185d" },
    { name: "Ministry of Defence", icon: "fas fa-shield-halved", count: 15, color: "#1e3a8a" },
    { name: "Ministry of Development of North Eastern Region", icon: "fas fa-compass", count: 1, color: "#047857" },
    { name: "Ministry of Earth Sciences", icon: "fas fa-globe-asia", count: 1, color: "#0891b2" },
    { name: "Ministry of Education", icon: "fas fa-graduation-cap", count: 85, color: "#dc2626" },
    { name: "Ministry of Electronics and Information Technology", icon: "fas fa-laptop-code", count: 22, color: "#7c3aed" },
    { name: "Ministry of Environment, Forest and Climate Change", icon: "fas fa-tree", count: 4, color: "#15803d" },
    { name: "Ministry of External Affairs", icon: "fas fa-passport", count: 5, color: "#0369a1" },
    { name: "Ministry of Finance", icon: "fas fa-building-columns", count: 19, color: "#b45309" },
    { name: "Ministry of Fisheries, Animal Husbandry and Dairying", icon: "fas fa-fish", count: 13, color: "#0284c7" },
    { name: "Ministry of Food Processing Industries", icon: "fas fa-utensils", count: 3, color: "#ea580c" },
    { name: "Ministry of Health & Family Welfare", icon: "fas fa-heart-pulse", count: 15, color: "#0d9488" },
    { name: "Ministry of Heavy Industries", icon: "fas fa-gears", count: 4, color: "#64748b" },
    { name: "Ministry of Home Affairs", icon: "fas fa-landmark", count: 18, color: "#b91c1c" },
    { name: "Ministry of Housing & Urban Affairs", icon: "fas fa-city", count: 5, color: "#047857" },
    { name: "Ministry of Information and Broadcasting", icon: "fas fa-bullhorn", count: 1, color: "#9333ea" },
    { name: "Ministry of Jal Shakti", icon: "fas fa-droplet", count: 6, color: "#0284c7" },
    { name: "Ministry of Labour and Employment", icon: "fas fa-people-carry-box", count: 13, color: "#c2410c" },
    { name: "Ministry of Law and Justice", icon: "fas fa-scale-balanced", count: 5, color: "#475569" },
    { name: "Ministry of Micro, Small and Medium Enterprises (MSME)", icon: "fas fa-handshake", count: 31, color: "#1e40af" },
    { name: "Ministry of Mines", icon: "fas fa-gem", count: 1, color: "#a16207" },
    { name: "Ministry of Minority Affairs", icon: "fas fa-hands-praying", count: 12, color: "#7c3aed" },
    { name: "Ministry of New and Renewable Energy", icon: "fas fa-solar-panel", count: 7, color: "#16a34a" },
    { name: "Ministry of Panchayati Raj", icon: "fas fa-users-rectangle", count: 2, color: "#b45309" },
    { name: "Ministry of Personnel, Public Grievances and Pensions", icon: "fas fa-user-tie", count: 5, color: "#2563eb" },
    { name: "Ministry of Petroleum and Natural Gas", icon: "fas fa-gas-pump", count: 3, color: "#d97706" },
    { name: "Ministry of Ports, Shipping and Waterways", icon: "fas fa-ship", count: 5, color: "#0369a1" },
    { name: "Ministry of Power", icon: "fas fa-bolt", count: 1, color: "#eab308" },
    { name: "Ministry of Railways", icon: "fas fa-train", count: 1, color: "#b91c1c" },
    { name: "Ministry of Road Transport & Highways", icon: "fas fa-road", count: 2, color: "#475569" },
    { name: "Ministry of Rural Development", icon: "fas fa-house", count: 10, color: "#0369a1" },
    { name: "Ministry of Science and Technology", icon: "fas fa-atom", count: 68, color: "#92400e" },
    { name: "Ministry of Skill Development and Entrepreneurship", icon: "fas fa-chart-line", count: 11, color: "#b91c1c" },
    { name: "Ministry of Social Justice and Empowerment", icon: "fas fa-people-group", count: 85, color: "#be185d" },
    { name: "Ministry of Statistics and Programme Implementation", icon: "fas fa-chart-column", count: 3, color: "#4f46e5" },
    { name: "Ministry of Steel", icon: "fas fa-cubes", count: 3, color: "#64748b" },
    { name: "Ministry of Textiles", icon: "fas fa-shirt", count: 24, color: "#db2777" },
    { name: "Ministry of Tourism", icon: "fas fa-umbrella-beach", count: 7, color: "#0891b2" },
    { name: "Ministry of Tribal Affairs", icon: "fas fa-campground", count: 10, color: "#ca8a04" },
    { name: "Ministry of Water Resources, River Development & Ganga Rejuvenation", icon: "fas fa-water", count: 2, color: "#0284c7" },
    { name: "Ministry of Women and Child Development", icon: "fas fa-hand-holding-heart", count: 8, color: "#7c3aed" },
    { name: "Ministry of Youth Affairs & Sports", icon: "fas fa-medal", count: 22, color: "#ea580c" },
    { name: "NITI Aayog (National Institution for Transforming India)", icon: "fas fa-diagram-project", count: 1, color: "#0284c7" },
    { name: "The Lokpal of India", icon: "fas fa-gavel", count: 1, color: "#475569" }
];

const FAQS = [
    {
        q: "What is JanSahay AI, and how does it work?",
        a: "JanSahay AI is an AI-powered government scheme recommendation platform. Users provide basic details such as age, location, income, occupation, and education. Our AI engine analyzes this information against eligibility criteria of thousands of government schemes and provides a personalized list of schemes they may be eligible for."
    },
    {
        q: "How is JanSahay AI different from other government portals?",
        a: "Unlike traditional government portals where users must manually search through hundreds of schemes, JanSahay AI uses artificial intelligence to automatically match your profile with relevant schemes. It brings together Central and State/UT schemes on a single platform with personalized recommendations."
    },
    {
        q: "What information do I need to provide?",
        a: "You need to provide basic demographic details such as gender, age, state, income level, social category, occupation, education level, and other relevant details. This information is used solely to match you with eligible schemes."
    },
    {
        q: "Does JanSahay AI support both Central and State schemes?",
        a: "Yes, JanSahay AI provides access to over 4,700 schemes from both Central Government and State/UT Governments. We continuously add new schemes as they are announced."
    },
    {
        q: "Can I apply for schemes directly through JanSahay AI?",
        a: "JanSahay AI provides direct application links to the respective scheme's official portal. You can view complete details including benefits, eligibility, required documents, and then navigate to the official application page."
    },
    {
        q: "Is my personal information safe?",
        a: "Yes, we take data privacy seriously. Your personal information is used only for scheme matching and is not shared with any third party. All data transmission is encrypted and secure."
    }
];

// Use enhanced 7-step form from rule-engine.js
const FORM_STEPS = typeof ENHANCED_FORM_STEPS !== 'undefined' ? ENHANCED_FORM_STEPS : [];


// All 432 real schemes loaded from schemes-data.js or backend/data/schemes.json
var ALL_SCHEMES = (typeof window !== 'undefined' && Array.isArray(window.ALL_SCHEMES) && window.ALL_SCHEMES.length > 0)
    ? window.ALL_SCHEMES
    : (typeof ALL_SCHEMES !== 'undefined' ? ALL_SCHEMES : []);

// Try fetching dynamically if hosted on server
if (typeof fetch !== 'undefined') {
    const endpoints = ['/api/schemes?limit=500', 'backend/data/schemes.json'];
    (async () => {
        for (const ep of endpoints) {
            try {
                const r = await fetch(ep);
                if (r.ok) {
                    const j = await r.json();
                    const list = Array.isArray(j) ? j : (j.data || []);
                    if (list.length > 0) { ALL_SCHEMES = list; break; }
                }
            } catch(e) {}
        }
    })();
}

// Keep SAMPLE_SCHEMES as alias for backward compat with AI eligibility form
const SAMPLE_SCHEMES = ALL_SCHEMES;

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const findSchemesBtn = document.getElementById('findSchemesBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const stepper = document.getElementById('stepper');
const formSteps = document.getElementById('formSteps');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetFormBtn = document.getElementById('resetFormBtn');
const categoriesGrid = document.getElementById('categoriesGrid');
const faqList = document.getElementById('faqList');
const aiChatBtn = document.getElementById('aiChatBtn');
const aiChatWindow = document.getElementById('aiChatWindow');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBody = document.getElementById('chatBody');
const resultsPage = document.getElementById('resultsPage');
const backToHome = document.getElementById('backToHome');
const signInBtn = document.getElementById('signInBtn');

let currentStep = 0;
let formData = {};

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderCategories(CATEGORIES);
    renderFAQs();
    renderStepper();
    renderFormSteps();
    initScrollEffects();
    initCountAnimation();
    // Animate step and stat cards after DOM render
    setTimeout(() => {
        document.querySelectorAll('.step-card, .stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            if (typeof animationObserver !== 'undefined' && animationObserver.observe) {
                animationObserver.observe(el);
            }
        });
    }, 100);

    // Auto-search or category filter from URL params (e.g. from scheme-details.html back/search)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const catParam = urlParams.get('category');
        if (searchParam) {
            if (heroSearchInput) heroSearchInput.value = searchParam;
            if (navSearchInput) navSearchInput.value = searchParam;
            setTimeout(() => showResults(searchParam, false), 150);
        } else if (catParam) {
            setTimeout(() => showResults(catParam, false), 150);
        }
    } catch(e) {}
});

// ============================================
// Theme Toggle
// ============================================
themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme && themeToggle) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// ============================================
// Navbar Scroll
// ============================================
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// Mobile Menu
// ============================================
mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.add('active');
    mobileMenuOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeMobileMenu() {
    mobileMenu?.classList.remove('active');
    mobileMenuOverlay?.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuClose?.addEventListener('click', closeMobileMenu);
mobileMenuOverlay?.addEventListener('click', closeMobileMenu);

// Close on link click
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ============================================
// Categories
// ============================================
const sectionTitle = document.querySelector('.categories-section .section-title');

function renderCategories(data) {
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = data.map(cat => `
        <div class="category-card" tabindex="0" role="button" aria-label="${cat.name}" data-name="${cat.name}">
            <div class="category-icon" style="color: ${cat.color};">
                <i class="${cat.icon}"></i>
            </div>
            <div class="category-count">${cat.count} Schemes</div>
            <div class="category-name">${cat.name}</div>
        </div>
    `).join('');

    // Attach click & keyboard handlers to each card
    categoriesGrid.querySelectorAll('.category-card').forEach((card, idx) => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            if (window.showToast) window.showToast(`Showing schemes for: ${name}`, 'info');
            showResults(name);
        });
        card.addEventListener('keypress', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
        // Entrance animation
        const delay = Math.min(idx * 20, 350);
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = `opacity 0.35s ease ${delay / 1000}s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${delay / 1000}s`;
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 40 + delay);
    });
}

// Tab switching — renders correct data for each tab
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        if (tab === 'categories') {
            if (sectionTitle) sectionTitle.innerHTML = 'Find schemes based on <span class="gradient-text">categories</span>';
            renderCategories(CATEGORIES);
        } else if (tab === 'states') {
            if (sectionTitle) sectionTitle.innerHTML = 'Find schemes based on <span class="gradient-text">States/UTs</span>';
            renderCategories(STATES);
        } else if (tab === 'ministries') {
            if (sectionTitle) sectionTitle.innerHTML = 'Find schemes by <span class="gradient-text">Central Ministries</span>';
            renderCategories(MINISTRIES);
        }
    });
});

// ============================================
// FAQs
// ============================================
function renderFAQs() {
    faqList.innerHTML = FAQS.map((faq, i) => `
        <div class="faq-item" id="faq-item-${i}">
            <div class="faq-question" onclick="toggleFAQ(${i})">
                <span>${faq.q}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-inner">${faq.a}</div>
            </div>
        </div>
    `).join('');
}

function toggleFAQ(index) {
    const item = document.getElementById(`faq-item-${index}`);
    const wasActive = item.classList.contains('active');
    
    // Close all
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
    
    // Toggle current
    if (!wasActive) {
        item.classList.add('active');
    }
}

// ============================================
// Count Animation
// ============================================
function initCountAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
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
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// Find Schemes Modal
// ============================================
findSchemesBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

window.openModal = openModal;
window.closeModal = closeModal;

// Stepper
function renderStepper() {
    let html = '';
    for (let i = 0; i < FORM_STEPS.length; i++) {
        html += `<div class="stepper-dot ${i === 0 ? 'active' : ''}" id="step-dot-${i}">${i + 1}</div>`;
        if (i < FORM_STEPS.length - 1) {
            html += `<div class="stepper-line" id="step-line-${i}"></div>`;
        }
    }
    stepper.innerHTML = html;
}

function updateStepper() {
    for (let i = 0; i < FORM_STEPS.length; i++) {
        const dot = document.getElementById(`step-dot-${i}`);
        const line = i < FORM_STEPS.length - 1 ? document.getElementById(`step-line-${i}`) : null;

        dot.classList.remove('active', 'completed');
        if (i < currentStep) {
            dot.classList.add('completed');
            dot.innerHTML = '<i class="fas fa-check" style="font-size:0.6rem;"></i>';
        } else if (i === currentStep) {
            dot.classList.add('active');
            dot.textContent = i + 1;
        } else {
            dot.textContent = i + 1;
        }

        if (line) {
            line.classList.toggle('completed', i < currentStep);
        }
    }
}

// renderFormSteps: uses data-field on select instead of inline onchange
function renderFormSteps() {
    formSteps.innerHTML = FORM_STEPS.map((step, i) => {
        let html = `<div class="form-step ${i === 0 ? 'active' : ''}" id="form-step-${i}">`;
        html += `<div class="form-label">${step.label}</div>`;

        if (step.type === 'options') {
            html += `<div class="form-options" data-group="${step.field}">`;
            step.options.forEach(opt => {
                html += `<div class="form-option" data-field="${step.field}" data-value="${opt.value}">
                    <i class="${opt.icon}"></i>
                    <span>${opt.label}</span>
                </div>`;
            });
            html += `</div>`;
        } else if (step.type === 'select') {
            html += `<div class="form-select-wrapper">
                <select class="form-select" data-field="${step.field}">
                    <option value="">-- Select --</option>
                    ${step.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                </select>
            </div>`;
        }

        // Extra field
        if (step.extra) {
            html += `<div class="form-label" style="margin-top: 8px;">${step.extra.label}</div>`;
            if (step.extra.type === 'options') {
                html += `<div class="form-options" data-group="${step.extra.field}">`;
                step.extra.options.forEach(opt => {
                    html += `<div class="form-option" data-field="${step.extra.field}" data-value="${opt.value}">
                        <i class="${opt.icon}"></i>
                        <span>${opt.label}</span>
                    </div>`;
                });
                html += `</div>`;
            } else if (step.extra.type === 'select') {
                let suffix = step.extra.suffix ? `<span style="margin-left:8px; font-weight:500;">${step.extra.suffix}</span>` : '';
                html += `<div class="form-select-wrapper" style="display:flex;align-items:center;gap:8px;">
                    <select class="form-select" style="max-width: 200px;" data-field="${step.extra.field}">
                        <option value="">--</option>
                        ${step.extra.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                    </select>
                    ${suffix}
                </div>`;
            }
        }

        html += `</div>`;
        return html;
    }).join('');
}

// Event delegation for form-option clicks — handles clicks on child icons/spans too
formSteps && formSteps.addEventListener('click', e => {
    const option = e.target.closest('.form-option');
    if (!option) return;
    const field = option.getAttribute('data-field');
    const value = option.getAttribute('data-value');
    if (!field || !value) return;
    const group = option.closest('.form-options');
    if (group) group.querySelectorAll('.form-option').forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    formData[field] = value;
});

// Event delegation for form-select changes
formSteps && formSteps.addEventListener('change', e => {
    const select = e.target.closest('.form-select');
    if (!select) return;
    const field = select.getAttribute('data-field');
    if (field) formData[field] = select.value;
});

// Keep legacy global for backward compat
window.selectOption = function(el, field, value) {
    const group = el.closest ? el.closest('.form-options') : el.parentElement;
    if (group) group.querySelectorAll('.form-option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    formData[field] = value;
};

// Navigation
nextBtn.addEventListener('click', () => {
    if (currentStep < FORM_STEPS.length - 1) {
        document.getElementById(`form-step-${currentStep}`).classList.remove('active');
        currentStep++;
        document.getElementById(`form-step-${currentStep}`).classList.add('active');
        updateStepper();
        prevBtn.style.display = 'inline-flex';
        
        if (currentStep === FORM_STEPS.length - 1) {
            nextBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Find Schemes <i class="fas fa-arrow-right-long"></i>';
        }
    } else {
        // Submit - use rule engine for personalized matching
        closeModal();
        applyRuleEngineScoring();
        showResults();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        document.getElementById(`form-step-${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`form-step-${currentStep}`).classList.add('active');
        updateStepper();
        
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right-long"></i>';
        
        if (currentStep === 0) {
            prevBtn.style.display = 'none';
        }
    }
});

resetFormBtn?.addEventListener('click', () => {
    currentStep = 0;
    formData = {};
    try { localStorage.removeItem('jansahay_profile'); } catch(e) {}
    
    document.querySelectorAll('.form-step').forEach((el, i) => {
        el.classList.toggle('active', i === 0);
    });
    
    document.querySelectorAll('.form-option').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.form-select').forEach(el => el.value = '');
    
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right-long"></i>';
    updateStepper();
});

// ============================================
// Results Page & Rule Engine Matching
// ============================================
let currentResultsQuery = '';    // tracks last search query
let currentResultsFilter = 'all'; // 'all' | 'central' | 'state'
let lastMatchedSchemes = [];
let isProfileSearch = false;

function applyRuleEngineScoring() {
    if (!formData || Object.keys(formData).length === 0) return;
    isProfileSearch = true;
    try { localStorage.setItem('jansahay_profile', JSON.stringify(formData)); } catch(e) {}

    if (typeof RuleEngine !== 'undefined' && typeof RuleEngine.matchSchemes === 'function') {
        lastMatchedSchemes = RuleEngine.matchSchemes(formData, ALL_SCHEMES, {
            minScore: 40,
            maxResults: 200
        });
    } else {
        // Fallback scoring
        const ageNum = parseInt(formData.age) || 25;
        const gender = (formData.gender || '').toLowerCase();
        const area = (formData.area || '').toLowerCase();
        const category = (formData.category || '').toLowerCase();
        const income = formData.income;
        const occupation = (formData.occupation || '').toLowerCase();

        ALL_SCHEMES.forEach(scheme => {
            let score = 0;
            const e = scheme.eligibility;
            if (!e) return;

            if (ageNum >= e.minAge && ageNum <= e.maxAge) score += 25;
            if (gender && e.gender && e.gender.includes(gender)) score += 15;
            if (area && e.area && e.area.includes(area)) score += 10;
            if (category && e.category && e.category.includes(category)) score += 15;
            if (income && e.income && e.income.includes(income)) score += 15;
            if (occupation && e.occupation && e.occupation.includes(occupation)) score += 15;

            const matchPercent = Math.min(Math.round((score / 95) * 100), 99);
            scheme.matchScore = Math.max(matchPercent, 35);
            scheme.matchQuality = scheme.matchScore >= 85 ? 'Excellent Match' : (scheme.matchScore >= 65 ? 'Good Match' : (scheme.matchScore >= 50 ? 'Partial Match' : 'Low Match'));
        });

        lastMatchedSchemes = ALL_SCHEMES.filter(s => (s.matchScore || 0) >= 40)
            .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }
}

function getFilteredSchemes(query, typeFilter) {
    const rawQ = (query || '').toLowerCase().trim();
    const sourcePool = (isProfileSearch && lastMatchedSchemes.length > 0)
        ? lastMatchedSchemes
        : ALL_SCHEMES;

    if (!rawQ) {
        return sourcePool.filter(scheme => {
            if (typeFilter === 'central' && scheme.type !== 'central') return false;
            if (typeFilter === 'state'   && scheme.type !== 'state')   return false;
            return true;
        });
    }

    const q = rawQ.replace(/&/g, 'and');
    const cleanQ = q.replace(/\([^)]*\)/g, '').trim();
    const coreName = cleanQ.replace(/^ministry of\s+/, '').trim();

    return sourcePool.filter(scheme => {
        // Type filter
        if (typeFilter === 'central' && scheme.type !== 'central') return false;
        if (typeFilter === 'state'   && scheme.type !== 'state')   return false;

        // Text search — title, ministry, category, tags, benefits, eligibility_summary
        const haystack = [
            scheme.title,
            scheme.ministry,
            scheme.state || '',
            scheme.category || '',
            (scheme.tags || []).join(' '),
            scheme.benefits,
            scheme.eligibility_summary || ''
        ].join(' ').toLowerCase().replace(/&/g, 'and');

        return haystack.includes(rawQ) || 
               haystack.includes(q) || 
               (cleanQ.length > 3 && haystack.includes(cleanQ)) ||
               (coreName.length > 3 && haystack.includes(coreName));
    });
}

function showResults(query, fromProfile = false) {
    currentResultsQuery  = query || '';
    currentResultsFilter = 'all';
    if (!fromProfile && !query && !isProfileSearch) {
        isProfileSearch = false;
    }
    document.querySelector('main').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    resultsPage.style.display = 'block';
    window.scrollTo(0, 0);

    const schemes = getFilteredSchemes(currentResultsQuery, currentResultsFilter);
    renderResults(schemes);
}

backToHome?.addEventListener('click', () => {
    if (resultsPage) resultsPage.style.display = 'none';
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.style.display = 'block';
    const footerEl = document.getElementById('footer');
    if (footerEl) footerEl.style.display = 'block';
    currentResultsQuery  = '';
    currentResultsFilter = 'all';
    isProfileSearch = false;
});

function renderResults(schemes) {
    if (!schemes) schemes = getFilteredSchemes(currentResultsQuery, currentResultsFilter);

    const summary = document.getElementById('resultsSummary');
    const queryLabel = currentResultsQuery
        ? ` for "<strong>${currentResultsQuery}</strong>"`
        : '';

    let profileBannerHtml = '';
    if (isProfileSearch && formData && Object.keys(formData).length > 0) {
        const chips = [];
        if (formData.gender) {
            const icon = formData.gender === 'male' ? 'mars' : (formData.gender === 'female' ? 'venus' : 'transgender');
            chips.push(`<span class="profile-chip"><i class="fas fa-${icon}"></i> ${formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</span>`);
        }
        if (formData.age) {
            chips.push(`<span class="profile-chip"><i class="fas fa-calendar-days"></i> ${formData.age} yrs</span>`);
        }
        if (formData.state) {
            const stateCapitalized = formData.state.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            chips.push(`<span class="profile-chip"><i class="fas fa-location-dot"></i> ${stateCapitalized}</span>`);
        }
        if (formData.area) {
            chips.push(`<span class="profile-chip"><i class="fas fa-${formData.area === 'rural' ? 'tree' : 'city'}"></i> ${formData.area.charAt(0).toUpperCase() + formData.area.slice(1)}</span>`);
        }
        if (formData.category) {
            chips.push(`<span class="profile-chip"><i class="fas fa-users"></i> ${formData.category.toUpperCase()}</span>`);
        }
        if (formData.occupation) {
            const occLabel = formData.occupation.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            chips.push(`<span class="profile-chip"><i class="fas fa-briefcase"></i> ${occLabel}</span>`);
        }
        if (formData.income) {
            const incMap = {
                'below-1l': 'Below ₹1L',
                '1l-2.5l': '₹1L–₹2.5L',
                '2.5l-5l': '₹2.5L–₹5L',
                '5l-8l': '₹5L–₹8L',
                '8l-10l': '₹8L–₹10L',
                'above-10l': 'Above ₹10L'
            };
            chips.push(`<span class="profile-chip"><i class="fas fa-indian-rupee-sign"></i> ${incMap[formData.income] || formData.income}</span>`);
        }
        if (formData.disability === 'yes') {
            chips.push(`<span class="profile-chip"><i class="fas fa-wheelchair"></i> Differently Abled</span>`);
        }
        if (formData.minority === 'yes') {
            chips.push(`<span class="profile-chip"><i class="fas fa-mosque"></i> Minority</span>`);
        }
        if (formData.maritalStatus) {
            chips.push(`<span class="profile-chip"><i class="fas fa-heart"></i> ${formData.maritalStatus.charAt(0).toUpperCase() + formData.maritalStatus.slice(1)}</span>`);
        }

        profileBannerHtml = `
            <div class="results-profile-banner">
                <div class="results-profile-info">
                    <div class="results-profile-title">
                        <i class="fas fa-sliders"></i> Schemes matched to your citizen profile:
                    </div>
                    <div class="results-profile-chips">
                        ${chips.join('')}
                    </div>
                </div>
                <button class="btn-edit-profile" id="editProfileBtn"><i class="fas fa-pen-to-square"></i> Modify Profile</button>
            </div>
        `;
    }

    summary.innerHTML = `
        ${profileBannerHtml}
        <div class="results-count">${schemes.length} Scheme${schemes.length !== 1 ? 's' : ''} Found${queryLabel}</div>
        <div class="results-filters">
            <div class="filter-chip ${currentResultsFilter==='all'?'active':''}" data-filter="all">All Schemes (${schemes.length})</div>
            <div class="filter-chip ${currentResultsFilter==='central'?'active':''}" data-filter="central">Central</div>
            <div class="filter-chip ${currentResultsFilter==='state'?'active':''}" data-filter="state">State</div>
        </div>
    `;

    // Attach edit profile button event
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            resultsPage.style.display = 'none';
            document.querySelector('main').style.display = 'block';
            document.getElementById('footer').style.display = 'block';
            openModal();
        });
    }

    // Attach filter chip events
    summary.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            currentResultsFilter = chip.getAttribute('data-filter');
            renderResults(getFilteredSchemes(currentResultsQuery, currentResultsFilter));
        });
    });

    const grid = document.getElementById('resultsGrid');

    if (schemes.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--text-secondary);">
                <i class="fas fa-search" style="font-size:2.5rem; margin-bottom:16px; display:block; opacity:0.4;"></i>
                <div style="font-size:1.1rem; font-weight:600; margin-bottom:8px; color:var(--text-primary);">No schemes found</div>
                <div>Try modifying your profile filters or search with a different keyword like <em>"kisan"</em>, <em>"scholarship"</em>, <em>"housing"</em>, or <em>"pension"</em></div>
            </div>`;
        return;
    }

    grid.innerHTML = schemes.map(scheme => {
        const score = scheme.matchScore || scheme.baseMatchScore || 0;
        let qualityBadge = '';
        const qualityText = typeof scheme.matchQuality === 'object'
            ? (scheme.matchQuality?.label || '')
            : (scheme.matchQuality || '');
        if (qualityText) {
            let badgeClass = 'quality-partial';
            let iconClass = 'fa-circle-info';
            if (qualityText.includes('Excellent')) {
                badgeClass = 'quality-excellent';
                iconClass = 'fa-star';
            } else if (qualityText.includes('Good')) {
                badgeClass = 'quality-good';
                iconClass = 'fa-circle-check';
            } else if (qualityText.includes('Low')) {
                badgeClass = 'quality-low';
                iconClass = 'fa-circle-exclamation';
            } else if (qualityText.includes('Partial')) {
                badgeClass = 'quality-partial';
                iconClass = 'fa-circle-info';
            }
            qualityBadge = `<span class="match-quality-badge ${badgeClass}"><i class="fas ${iconClass}"></i> ${qualityText}</span>`;
        } else if (score >= 80) {
            qualityBadge = `<span class="match-quality-badge quality-excellent"><i class="fas fa-star"></i> High Match</span>`;
        }

        let scoreColor = 'var(--emerald)';
        if (qualityText.includes('Low') || (score > 0 && score < 50)) {
            scoreColor = '#ef4444';
        } else if (qualityText.includes('Partial') || (score >= 50 && score < 70)) {
            scoreColor = '#fbbf24';
        } else if (qualityText.includes('Good') || (score >= 70 && score < 90)) {
            scoreColor = '#38bdf8';
        }

        const scoreDisplay = score > 0 ? `<div class="result-eligibility" style="color:${scoreColor};"><i class="fas fa-check-circle" style="color:${scoreColor};"></i> ${score}% Match</div>` : '';

        return `
        <div class="result-card" onclick="if(!event.target.closest('.result-card-link')) window.location.href='scheme-details.html?id=${scheme.id}';" style="cursor:pointer;" tabindex="0" role="button" aria-label="View details for ${scheme.title}">
            <div class="result-card-header">
                <div class="result-card-badge ${scheme.type === 'central' ? 'badge-central' : 'badge-state'}">
                    ${scheme.type === 'central' ? 'Central' : (scheme.state || 'State')}
                </div>
                ${qualityBadge}
            </div>
            <a href="scheme-details.html?id=${scheme.id}" class="result-card-title-link" style="text-decoration:none; color:inherit;" onclick="event.stopPropagation();">
                <div class="result-card-title">${scheme.title}</div>
            </a>
            <div class="result-card-ministry"><i class="fas fa-building-columns"></i> ${scheme.ministry || 'Government of India'}</div>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:12px; line-height:1.55;">
                ${scheme.benefits || 'Financial assistance and welfare support provided under government guidelines.'}
            </p>
            <div class="result-card-tags">
                ${(scheme.tags||[]).map(t => `<span class="result-tag">${t}</span>`).join('')}
            </div>
            <div class="result-card-footer">
                <div class="result-card-actions">
                    <a href="scheme-details.html?id=${scheme.id}" class="result-card-view-btn" onclick="event.stopPropagation();">
                        <i class="fas fa-circle-info"></i> View Details
                    </a>
                    <a href="${scheme.applyLink || 'https://www.myscheme.gov.in/'}" target="_blank" rel="noopener noreferrer" class="result-card-link" onclick="event.stopPropagation();">
                        Apply Now <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                ${scoreDisplay}
            </div>
        </div>`;
    }).join('');
}

// ============================================
// AI Chat
// ============================================
aiChatBtn.addEventListener('click', () => {
    const isOpen = aiChatWindow.style.display !== 'none';
    aiChatWindow.style.display = isOpen ? 'none' : 'flex';
});

chatClose.addEventListener('click', () => {
    aiChatWindow.style.display = 'none';
});

const chatResponses = [
    "I can help you find the right government schemes! Try clicking the 'Find Schemes For You' button to get personalized recommendations based on your profile. 🎯",
    "There are over 4,700 Central and State Government schemes available. Tell me about yourself and I'll help narrow down the best options for you! 📋",
    "The most popular schemes include PM-KISAN for farmers (₹6,000/year), Ayushman Bharat for health coverage (₹5 lakh), and PM Awas Yojana for housing assistance. Would you like to know more about any of these? 🏠",
    "To check your eligibility, I'd need to know your age, gender, state, income level, occupation, and education. You can provide these details through our 'Find Schemes' feature! 📝",
    "Great question! JanSahay AI uses artificial intelligence to match your profile against thousands of schemes instantly. Unlike other portals, you don't need to search manually — we bring the relevant schemes to you! 🤖",
    "Documents commonly required include Aadhaar Card, Income Certificate, Domicile Certificate, Bank Passbook, and Passport Size Photos. Specific requirements vary by scheme. 📄"
];

let chatResponseIndex = 0;

function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // User message
    chatBody.innerHTML += `
        <div class="chat-message user">
            <div class="message-content">${text}</div>
        </div>
    `;
    chatInput.value = '';

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Bot response after delay
    setTimeout(() => {
        const response = chatResponses[chatResponseIndex % chatResponses.length];
        chatResponseIndex++;
        chatBody.innerHTML += `
            <div class="chat-message bot">
                <div class="message-content"><p>${response}</p></div>
            </div>
        `;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

chatSend.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
});

// ============================================
// Citizen Authentication & Session Management
// ============================================
function initAuthSession() {
    const userProfileMenu = document.getElementById('userProfileMenu');
    const mobileUserProfile = document.getElementById('mobileUserProfile');
    const userChipDropdownBtn = document.getElementById('userChipDropdownBtn');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    const navUserName = document.getElementById('navUserName');
    const navUserAvatar = document.getElementById('navUserAvatar');
    const dropdownFullName = document.getElementById('dropdownFullName');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const mobileUserName = document.getElementById('mobileUserName');
    const mobileUserAvatar = document.getElementById('mobileUserAvatar');
    const mobileSignInBtn = document.querySelector('.mobile-sign-in');

    function checkUser() {
        try {
            const rawUser = localStorage.getItem('jansahay_user');
            if (rawUser) {
                const user = JSON.parse(rawUser);
                if (signInBtn) signInBtn.style.display = 'none';
                if (mobileSignInBtn) mobileSignInBtn.style.display = 'none';
                if (userProfileMenu) userProfileMenu.style.display = 'inline-block';
                if (mobileUserProfile) mobileUserProfile.style.display = 'block';

                if (navUserName) navUserName.textContent = user.name || 'Citizen';
                if (dropdownFullName) dropdownFullName.textContent = user.name || 'Citizen';
                if (dropdownEmail) dropdownEmail.textContent = user.email || 'citizen@jansahay.gov.in';
                if (mobileUserName) mobileUserName.textContent = user.name || 'Citizen';

                if (user.avatar) {
                    if (navUserAvatar) navUserAvatar.src = user.avatar;
                    if (mobileUserAvatar) mobileUserAvatar.src = user.avatar;
                }
            } else {
                if (signInBtn) signInBtn.style.display = 'inline-flex';
                if (mobileSignInBtn) mobileSignInBtn.style.display = 'block';
                if (userProfileMenu) userProfileMenu.style.display = 'none';
                if (mobileUserProfile) mobileUserProfile.style.display = 'none';
            }
        } catch (e) {
            console.error('Error reading citizen session:', e);
        }
    }

    // Toggle dropdown
    if (userChipDropdownBtn && userProfileMenu) {
        userChipDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userProfileMenu.classList.toggle('open');
        });
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (userProfileMenu && !userProfileMenu.contains(e.target)) {
            userProfileMenu.classList.remove('open');
        }
    });

    // Logout handlers
    function handleLogout() {
        localStorage.removeItem('jansahay_user');
        if (userProfileMenu) userProfileMenu.classList.remove('open');
        checkUser();
        if (window.showToast) {
            window.showToast('You have been signed out successfully.', 'info');
        }
    }

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);

    // Direct redirection to login.html
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
    if (mobileSignInBtn) {
        mobileSignInBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    checkUser();
}

initAuthSession();

// ============================================
// Search Functionality
// ============================================
const heroSearchInput = document.getElementById('heroSearchInput');
const navSearchInput  = document.getElementById('navSearchInput');

function handleSearch(input) {
    const query = (input.value || '').trim();
    isProfileSearch = false;
    showResults(query, false);   // pass query — works even if empty (shows all)
}

// Hero search
document.querySelector('.hero-search-btn')?.addEventListener('click', () => handleSearch(heroSearchInput));
heroSearchInput?.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSearch(heroSearchInput);
});

// Navbar search
document.querySelector('.search-btn')?.addEventListener('click', () => handleSearch(navSearchInput));
navSearchInput?.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSearch(navSearchInput);
});

// Results-page live search (filters as you type)
const resultsSearchInput = document.getElementById('resultsSearchInput');
resultsSearchInput?.addEventListener('input', () => {
    currentResultsQuery = resultsSearchInput.value.trim();
    renderResults(getFilteredSchemes(currentResultsQuery, currentResultsFilter));
});
document.querySelector('.results-search button')?.addEventListener('click', () => {
    currentResultsQuery = resultsSearchInput.value.trim();
    renderResults(getFilteredSchemes(currentResultsQuery, currentResultsFilter));
});

// ============================================
// Intersection Observer for Animations
// ============================================
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// ── Toast Notification ──────────────────────────────────────
window.showToast = function(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas fa-info-circle"></i> ${msg}`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
};

