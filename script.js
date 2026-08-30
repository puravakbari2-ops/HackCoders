/* ============================================
   JanSahay AI - Main JavaScript
   ============================================ */

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

const FORM_STEPS = [
    {
        label: '<span style="color: var(--red-500);">*</span>Tell us about yourself, you are a...',
        type: 'options',
        field: 'gender',
        options: [
            { label: 'Male', icon: 'fas fa-mars', value: 'male' },
            { label: 'Female', icon: 'fas fa-venus', value: 'female' },
            { label: 'Transgender', icon: 'fas fa-transgender', value: 'transgender' }
        ],
        extra: {
            label: '<span style="color: var(--red-500);">*</span>and your age is',
            type: 'select',
            field: 'age',
            options: Array.from({ length: 83 }, (_, i) => ({ label: `${i + 18}`, value: i + 18 })),
            suffix: 'years'
        }
    },
    {
        label: '<span style="color: var(--red-500);">*</span>Which state do you belong to?',
        type: 'select',
        field: 'state',
        options: [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
            "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
            "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
            "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
            "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
            "Uttar Pradesh", "Uttarakhand", "West Bengal",
            "Andaman & Nicobar", "Chandigarh", "Dadra & Nagar Haveli",
            "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
        ].map(s => ({ label: s, value: s.toLowerCase() })),
        extra: {
            label: '<span style="color: var(--red-500);">*</span>Your area of residence is',
            type: 'options',
            field: 'area',
            options: [
                { label: 'Urban', icon: 'fas fa-city', value: 'urban' },
                { label: 'Rural', icon: 'fas fa-tree', value: 'rural' }
            ]
        }
    },
    {
        label: '<span style="color: var(--red-500);">*</span>Your social category is',
        type: 'options',
        field: 'category',
        options: [
            { label: 'General', icon: 'fas fa-user', value: 'general' },
            { label: 'SC', icon: 'fas fa-users', value: 'sc' },
            { label: 'ST', icon: 'fas fa-users', value: 'st' },
            { label: 'OBC', icon: 'fas fa-users', value: 'obc' },
        ],
        extra: {
            label: '<span style="color: var(--red-500);">*</span>Are you differently abled?',
            type: 'options',
            field: 'disability',
            options: [
                { label: 'Yes', icon: 'fas fa-wheelchair', value: 'yes' },
                { label: 'No', icon: 'fas fa-check', value: 'no' }
            ]
        }
    },
    {
        label: '<span style="color: var(--red-500);">*</span>Your annual family income is',
        type: 'select',
        field: 'income',
        options: [
            { label: 'Below ₹1 Lakh', value: 'below-1l' },
            { label: '₹1 Lakh - ₹2.5 Lakh', value: '1l-2.5l' },
            { label: '₹2.5 Lakh - ₹5 Lakh', value: '2.5l-5l' },
            { label: '₹5 Lakh - ₹8 Lakh', value: '5l-8l' },
            { label: '₹8 Lakh - ₹10 Lakh', value: '8l-10l' },
            { label: 'Above ₹10 Lakh', value: 'above-10l' }
        ],
        extra: {
            label: '<span style="color: var(--red-500);">*</span>Your occupation is',
            type: 'select',
            field: 'occupation',
            options: [
                { label: 'Student', value: 'student' },
                { label: 'Farmer', value: 'farmer' },
                { label: 'Self-employed', value: 'self-employed' },
                { label: 'Salaried', value: 'salaried' },
                { label: 'Business Owner', value: 'business-owner' },
                { label: 'Unemployed', value: 'unemployed' },
                { label: 'Retired', value: 'retired' },
                { label: 'Homemaker', value: 'homemaker' }
            ]
        }
    },
    {
        label: '<span style="color: var(--red-500);">*</span>Your education level is',
        type: 'select',
        field: 'education',
        options: [
            { label: 'Below 10th', value: 'below-10th' },
            { label: '10th Pass', value: '10th' },
            { label: '12th Pass', value: '12th' },
            { label: 'Diploma', value: 'diploma' },
            { label: 'Graduate', value: 'graduate' },
            { label: 'Post Graduate', value: 'post-graduate' },
            { label: 'Doctorate', value: 'doctorate' },
        ],
        extra: {
            label: '<span style="color: var(--red-500);">*</span>Marital status',
            type: 'options',
            field: 'maritalStatus',
            options: [
                { label: 'Single', icon: 'fas fa-user', value: 'single' },
                { label: 'Married', icon: 'fas fa-ring', value: 'married' },
                { label: 'Widowed', icon: 'fas fa-user', value: 'widowed' }
            ]
        }
    }
];

const SAMPLE_SCHEMES = [
    {
        title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
        ministry: "Ministry of Finance",
        type: "central",
        tags: ["Banking", "Financial Inclusion"],
        eligibility: "98%",
        benefits: "Zero balance bank account with RuPay card, ₹2 lakh accident insurance"
    },
    {
        title: "PM-KISAN Samman Nidhi Yojana",
        ministry: "Ministry of Agriculture & Farmers Welfare",
        type: "central",
        tags: ["Agriculture", "Direct Transfer"],
        eligibility: "95%",
        benefits: "₹6,000 per year in 3 installments to small farmers"
    },
    {
        title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
        ministry: "Ministry of Health & Family Welfare",
        type: "central",
        tags: ["Health", "Insurance"],
        eligibility: "92%",
        benefits: "Health insurance cover of ₹5 lakh per family per year"
    },
    {
        title: "National Scholarship Portal Schemes",
        ministry: "Ministry of Education",
        type: "central",
        tags: ["Education", "Scholarship"],
        eligibility: "88%",
        benefits: "Various scholarships for students from pre-matric to post-doctoral level"
    },
    {
        title: "PM Awas Yojana (PMAY)",
        ministry: "Ministry of Housing & Urban Affairs",
        type: "central",
        tags: ["Housing", "Subsidy"],
        eligibility: "85%",
        benefits: "Financial assistance up to ₹2.67 lakh for house construction"
    },
    {
        title: "Sukanya Samriddhi Yojana",
        ministry: "Ministry of Finance",
        type: "central",
        tags: ["Women", "Savings"],
        eligibility: "90%",
        benefits: "High interest savings scheme for girl child with tax benefits"
    },
    {
        title: "Mahatma Gandhi National Rural Employment Guarantee Act",
        ministry: "Ministry of Rural Development",
        type: "central",
        tags: ["Employment", "Rural"],
        eligibility: "82%",
        benefits: "100 days guaranteed employment per year per household"
    },
    {
        title: "State Scholarship for SC/ST Students",
        ministry: "State Government",
        type: "state",
        tags: ["Education", "SC/ST"],
        eligibility: "78%",
        benefits: "Full tuition fee waiver and monthly stipend for eligible students"
    }
];

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
    renderCategories();
    renderFAQs();
    renderStepper();
    renderFormSteps();
    initScrollEffects();
    initCountAnimation();
});

// ============================================
// Theme Toggle
// ============================================
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// ============================================
// Navbar Scroll
// ============================================
function initScrollEffects() {
    window.addEventListener('scroll', () => {
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
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close on link click
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ============================================
// Categories
// ============================================
function renderCategories() {
    categoriesGrid.innerHTML = CATEGORIES.map(cat => `
        <div class="category-card" tabindex="0" role="button" aria-label="${cat.name}">
            <div class="category-icon" style="color: ${cat.color};">
                <i class="${cat.icon}"></i>
            </div>
            <div class="category-count">${cat.count} Schemes</div>
            <div class="category-name">${cat.name}</div>
        </div>
    `).join('');
}

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
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

// Form Steps
function renderFormSteps() {
    formSteps.innerHTML = FORM_STEPS.map((step, i) => {
        let html = `<div class="form-step ${i === 0 ? 'active' : ''}" id="form-step-${i}">`;
        html += `<div class="form-label">${step.label}</div>`;

        if (step.type === 'options') {
            html += `<div class="form-options">`;
            step.options.forEach(opt => {
                html += `<div class="form-option" data-field="${step.field}" data-value="${opt.value}" onclick="selectOption(this, '${step.field}', '${opt.value}')">
                    <i class="${opt.icon}"></i>
                    <span>${opt.label}</span>
                </div>`;
            });
            html += `</div>`;
        } else if (step.type === 'select') {
            html += `<div class="form-select-wrapper">
                <select class="form-select" onchange="formData['${step.field}']=this.value">
                    <option value="">-- Select --</option>
                    ${step.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                </select>
            </div>`;
        }

        // Extra field
        if (step.extra) {
            html += `<div class="form-label" style="margin-top: 8px;">${step.extra.label}</div>`;
            if (step.extra.type === 'options') {
                html += `<div class="form-options">`;
                step.extra.options.forEach(opt => {
                    html += `<div class="form-option" data-field="${step.extra.field}" data-value="${opt.value}" onclick="selectOption(this, '${step.extra.field}', '${opt.value}')">
                        <i class="${opt.icon}"></i>
                        <span>${opt.label}</span>
                    </div>`;
                });
                html += `</div>`;
            } else if (step.extra.type === 'select') {
                let suffix = step.extra.suffix ? `<span style="margin-left:8px; font-weight:500;">${step.extra.suffix}</span>` : '';
                html += `<div class="form-select-wrapper" style="display:flex;align-items:center;gap:8px;">
                    <select class="form-select" style="max-width: 200px;" onchange="formData['${step.extra.field}']=this.value">
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

window.selectOption = function(el, field, value) {
    // Deselect siblings
    el.parentElement.querySelectorAll('.form-option').forEach(opt => opt.classList.remove('selected'));
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
        // Submit - show results
        closeModal();
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

resetFormBtn.addEventListener('click', () => {
    currentStep = 0;
    formData = {};
    
    document.querySelectorAll('.form-step').forEach((el, i) => {
        el.classList.toggle('active', i === 0);
    });
    
    document.querySelectorAll('.form-option').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.form-select').forEach(el => el.value = '');
    
    prevBtn.style.display = 'none';
    nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right-long"></i>';
    updateStepper();
});

// ============================================
// Results Page
// ============================================
function showResults() {
    document.querySelector('main').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    resultsPage.style.display = 'block';
    window.scrollTo(0, 0);
    renderResults();
}

backToHome.addEventListener('click', () => {
    resultsPage.style.display = 'none';
    document.querySelector('main').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
});

function renderResults() {
    const summary = document.getElementById('resultsSummary');
    summary.innerHTML = `
        <div class="results-count">${SAMPLE_SCHEMES.length} Schemes Found</div>
        <div class="results-filters">
            <div class="filter-chip">All Schemes</div>
            <div class="filter-chip">Central</div>
            <div class="filter-chip">State</div>
        </div>
    `;

    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = SAMPLE_SCHEMES.map(scheme => `
        <div class="result-card">
            <div class="result-card-header">
                <div>
                    <div class="result-card-badge ${scheme.type === 'central' ? 'badge-central' : 'badge-state'}">
                        ${scheme.type === 'central' ? 'Central' : 'State'}
                    </div>
                </div>
            </div>
            <div class="result-card-title">${scheme.title}</div>
            <div class="result-card-ministry"><i class="fas fa-building-columns"></i> ${scheme.ministry}</div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.5;">
                ${scheme.benefits}
            </p>
            <div class="result-card-tags">
                ${scheme.tags.map(t => `<span class="result-tag">${t}</span>`).join('')}
            </div>
            <div class="result-card-footer">
                <a href="#" class="result-card-link">View Details <i class="fas fa-arrow-right"></i></a>
                <div class="result-eligibility"><i class="fas fa-check-circle"></i> ${scheme.eligibility} Match</div>
            </div>
        </div>
    `).join('');
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
// Sign In Alert
// ============================================
if (signInBtn) {
    signInBtn.addEventListener('click', () => {
        alert('Sign In functionality will be integrated with MeriPehchaan (National Single Sign-On) in the production version.');
    });
}

// ============================================
// Search Functionality
// ============================================
const heroSearchInput = document.getElementById('heroSearchInput');
const navSearchInput = document.getElementById('navSearchInput');

function handleSearch(input) {
    const query = input.value.trim();
    if (query) {
        showResults();
    }
}

document.querySelector('.hero-search-btn')?.addEventListener('click', () => handleSearch(heroSearchInput));
heroSearchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch(heroSearchInput);
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

document.querySelectorAll('.category-card, .step-card, .stat-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(el);
});
