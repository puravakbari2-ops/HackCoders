/* ============================================================
   JanSahay AI - Static Data
   Fallback / seed data for when backend API is unavailable
   ============================================================ */

const CATEGORIES = [
    { name: "Agriculture, Rural & Environment",          icon: "fas fa-seedling",           count: 862,  color: "#166534" },
    { name: "Banking, Financial Services & Insurance",   icon: "fas fa-building-columns",   count: 336,  color: "#92400e" },
    { name: "Business & Entrepreneurship",               icon: "fas fa-handshake",          count: 772,  color: "#1e40af" },
    { name: "Education & Learning",                      icon: "fas fa-graduation-cap",     count: 1110, color: "#dc2626" },
    { name: "Health & Wellness",                         icon: "fas fa-heart-pulse",        count: 286,  color: "#0d9488" },
    { name: "Housing & Shelter",                         icon: "fas fa-house",              count: 136,  color: "#0369a1" },
    { name: "Public Safety, Law & Justice",              icon: "fas fa-scale-balanced",     count: 34,   color: "#b91c1c" },
    { name: "Science, IT & Communications",              icon: "fas fa-atom",               count: 121,  color: "#7c3aed" },
    { name: "Skills & Employment",                       icon: "fas fa-chart-line",         count: 401,  color: "#c2410c" },
    { name: "Social Welfare & Empowerment",              icon: "fas fa-people-group",       count: 1453, color: "#dc2626" },
    { name: "Sports & Culture",                          icon: "fas fa-futbol",             count: 127,  color: "#7c3aed" },
    { name: "Transport & Infrastructure",                icon: "fas fa-bus",                count: 79,   color: "#b45309" },
    { name: "Travel & Tourism",                          icon: "fas fa-compass",            count: 19,   color: "#047857" },
    { name: "Utility & Sanitation",                      icon: "fas fa-droplet",            count: 128,  color: "#0e7490" },
    { name: "Women & Child",                             icon: "fas fa-hand-holding-heart", count: 612,  color: "#be185d" },
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
        type:  'options',
        field: 'gender',
        options: [
            { label: 'Male',        icon: 'fas fa-mars',        value: 'male'        },
            { label: 'Female',      icon: 'fas fa-venus',       value: 'female'      },
            { label: 'Transgender', icon: 'fas fa-transgender', value: 'transgender' }
        ],
        extra: {
            label:   '<span style="color: var(--red-500);">*</span>and your age is',
            type:    'select',
            field:   'age',
            options: Array.from({ length: 83 }, (_, i) => ({ label: `${i + 18}`, value: i + 18 })),
            suffix:  'years'
        }
    },
    {
        label: '<span style="color: var(--red-500);">*</span>Which state do you belong to?',
        type:  'select',
        field: 'state',
        options: [
            "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
            "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
            "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
            "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
            "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
            "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
            "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
        ].map(s => ({ label: s, value: s.toLowerCase() })),
        extra: {
            label:   '<span style="color: var(--red-500);">*</span>Your area of residence is',
            type:    'options',
            field:   'area',
            options: [
                { label: 'Urban', icon: 'fas fa-city', value: 'urban' },
                { label: 'Rural', icon: 'fas fa-tree', value: 'rural' }
            ]
        }
    },
    {
        label: '<span style="color: var(--red-500);">*</span>Your social category is',
        type:  'options',
        field: 'category',
        options: [
            { label: 'General', icon: 'fas fa-user',  value: 'general' },
            { label: 'SC',      icon: 'fas fa-users', value: 'sc'      },
            { label: 'ST',      icon: 'fas fa-users', value: 'st'      },
            { label: 'OBC',     icon: 'fas fa-users', value: 'obc'     },
        ],
        extra: {
            label:   '<span style="color: var(--red-500);">*</span>Are you differently abled?',
            type:    'options',
            field:   'disability',
            options: [
                { label: 'Yes', icon: 'fas fa-wheelchair', value: 'yes' },
                { label: 'No',  icon: 'fas fa-check',      value: 'no'  }
            ]
        }
    },
    {
        label: '<span style="color: var(--red-500);">*</span>Your annual family income is',
        type:  'select',
        field: 'income',
        options: [
            { label: 'Below ₹1 Lakh',        value: 'below-1l'  },
            { label: '₹1 Lakh – ₹2.5 Lakh',  value: '1l-2.5l'  },
            { label: '₹2.5 Lakh – ₹5 Lakh',  value: '2.5l-5l'  },
            { label: '₹5 Lakh – ₹8 Lakh',    value: '5l-8l'    },
            { label: '₹8 Lakh – ₹10 Lakh',   value: '8l-10l'   },
            { label: 'Above ₹10 Lakh',        value: 'above-10l'}
        ],
        extra: {
            label:   '<span style="color: var(--red-500);">*</span>Your occupation is',
            type:    'select',
            field:   'occupation',
            options: [
                { label: 'Student',        value: 'student'        },
                { label: 'Farmer',         value: 'farmer'         },
                { label: 'Self-employed',  value: 'self-employed'  },
                { label: 'Salaried',       value: 'salaried'       },
                { label: 'Business Owner', value: 'business-owner' },
                { label: 'Unemployed',     value: 'unemployed'     },
                { label: 'Retired',        value: 'retired'        },
                { label: 'Homemaker',      value: 'homemaker'      }
            ]
        }
    },
    {
        label: '<span style="color: var(--red-500);">*</span>Your education level is',
        type:  'select',
        field: 'education',
        options: [
            { label: 'Below 10th',   value: 'below-10th'  },
            { label: '10th Pass',    value: '10th'         },
            { label: '12th Pass',    value: '12th'         },
            { label: 'Diploma',      value: 'diploma'      },
            { label: 'Graduate',     value: 'graduate'     },
            { label: 'Post Graduate',value: 'post-graduate'},
            { label: 'Doctorate',    value: 'doctorate'    },
        ],
        extra: {
            label:   '<span style="color: var(--red-500);">*</span>Marital status',
            type:    'options',
            field:   'maritalStatus',
            options: [
                { label: 'Single',  icon: 'fas fa-user', value: 'single'  },
                { label: 'Married', icon: 'fas fa-ring', value: 'married' },
                { label: 'Widowed', icon: 'fas fa-user', value: 'widowed' }
            ]
        }
    }
];

// Fallback sample schemes for offline mode (432 Govt. of India & State Schemes)
const SAMPLE_SCHEMES = [
    {
        "id": "1",
        "title": "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "Banking",
            "Financial Inclusion",
            "Insurance",
            "Zero Balance"
        ],
        "benefits": "Zero balance savings account, RuPay debit card, ₹2 lakh accidental insurance cover, ₹10,000 overdraft facility for eligible account holders, direct benefit transfer (DBT) enabled.",
        "eligibility_summary": "Any Indian citizen aged 10 years or older who does not already have a bank account.",
        "eligibility": {
            "minAge": 10,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "PAN Card (or Form 60)",
            "Passport size photo",
            "Mobile number"
        ],
        "applyLink": "https://pmjdy.gov.in/",
        "baseMatchScore": 95,
        "state": "All India"
    },
    {
        "id": "2",
        "title": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "Life Insurance",
            "Term Insurance",
            "Financial Security"
        ],
        "benefits": "₹2 lakh life insurance cover for death due to any cause at an annual premium of just ₹436 auto-debited from bank account.",
        "eligibility_summary": "Indian citizens aged 18 to 50 years having an active bank or post office savings account.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 50,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bank Account Passbook",
            "Auto-debit consent form"
        ],
        "applyLink": "https://jansuraksha.gov.in/",
        "baseMatchScore": 90,
        "state": "All India"
    },
    {
        "id": "3",
        "title": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "Accidental Insurance",
            "Disability Cover",
            "Affordable"
        ],
        "benefits": "₹2 lakh accidental death and permanent total disability cover, and ₹1 lakh for permanent partial disability at a nominal premium of ₹20 per year.",
        "eligibility_summary": "Indian citizens aged 18 to 70 years with an active savings bank or post office account.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bank Savings Account",
            "Auto-debit consent form"
        ],
        "applyLink": "https://jansuraksha.gov.in/",
        "baseMatchScore": 92,
        "state": "All India"
    },
    {
        "id": "4",
        "title": "Atal Pension Yojana (APY)",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "Pension",
            "Retirement",
            "Unorganised Sector",
            "Social Security"
        ],
        "benefits": "Guaranteed monthly pension between ₹1,000 and ₹5,000 after reaching 60 years of age, with same pension to spouse upon subscriber's death and return of corpus to nominee.",
        "eligibility_summary": "Citizens aged 18 to 40 years holding a savings bank account, who are not income tax payers.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 40,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Active Savings Bank Account",
            "Mobile number"
        ],
        "applyLink": "https://enps.nsdl.com/",
        "baseMatchScore": 88,
        "state": "All India"
    },
    {
        "id": "5",
        "title": "Mahila Samman Savings Certificate (MSSC)",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "Women Savings",
            "High Interest",
            "Investment"
        ],
        "benefits": "Fixed interest rate of 7.5% per annum compounded quarterly on deposits up to ₹2 lakh for a 2-year tenure with partial withdrawal facility after 1 year.",
        "eligibility_summary": "Women of any age, or guardian on behalf of a minor girl child.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "PAN Card",
            "KYC documents",
            "Post office/bank account"
        ],
        "applyLink": "https://www.indiapost.gov.in/Financial/Pages/Content/Mahila-Samman-Savings-Certificate.aspx",
        "baseMatchScore": 87,
        "state": "All India"
    },
    {
        "id": "6",
        "title": "Senior Citizens Savings Scheme (SCSS)",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "Senior Citizens",
            "Retirement Income",
            "High Interest",
            "Tax Benefit"
        ],
        "benefits": "Guaranteed quarterly interest rate of 8.2% per annum on deposits up to ₹30 lakh for 5 years, eligible for Section 80C tax deduction.",
        "eligibility_summary": "Indian individuals aged 60 years or above, or retired defense personnel aged 50+.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "PAN Card",
            "Age proof / Retirement proof",
            "Passport photos"
        ],
        "applyLink": "https://www.indiapost.gov.in/Financial/Pages/Content/Senior-Citizens-Savings-Scheme.aspx",
        "baseMatchScore": 90,
        "state": "All India"
    },
    {
        "id": "7",
        "title": "Public Provident Fund (PPF) Scheme",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "Long Term Savings",
            "Tax Free",
            "Retirement",
            "Safe Investment"
        ],
        "benefits": "Government-backed 15-year savings scheme offering 7.1% tax-free interest, deposit between ₹500 and ₹1.5 lakh annually with EEE (Exempt-Exempt-Exempt) tax status.",
        "eligibility_summary": "Any Indian resident citizen; accounts can also be opened on behalf of minors.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "PAN Card",
            "Passport size photograph",
            "Address proof"
        ],
        "applyLink": "https://www.indiapost.gov.in/Financial/Pages/Content/Public-Provident-Fund.aspx",
        "baseMatchScore": 84,
        "state": "All India"
    },
    {
        "id": "8",
        "title": "PM-KISAN Samman Nidhi Yojana",
        "ministry": "Ministry of Agriculture & Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Agriculture",
            "Direct Benefit Transfer",
            "Small Farmers",
            "Income Support"
        ],
        "benefits": "₹6,000 per year paid in 3 four-monthly installments of ₹2,000 each directly transferred to eligible landholding farmer families.",
        "eligibility_summary": "All landholding farmer families with cultivable landholding in their names.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Land ownership documents (Khasra/Khatauni)",
            "Bank Account details"
        ],
        "applyLink": "https://pmkisan.gov.in/",
        "baseMatchScore": 98,
        "state": "All India"
    },
    {
        "id": "9",
        "title": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "ministry": "Ministry of Agriculture & Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Crop Insurance",
            "Agriculture",
            "Weather Risk",
            "Farmers"
        ],
        "benefits": "Comprehensive risk insurance covering yield losses due to non-preventable risks like flood, drought, pests; premium capped at only 2% for Kharif, 1.5% for Rabi, and 5% for commercial crops.",
        "eligibility_summary": "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Land records / Tenancy agreement",
            "Sowing certificate",
            "Bank Passbook"
        ],
        "applyLink": "https://pmfby.gov.in/",
        "baseMatchScore": 94,
        "state": "All India"
    },
    {
        "id": "10",
        "title": "Kisan Credit Card (KCC) Scheme",
        "ministry": "Ministry of Agriculture & Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Credit",
            "Crop Loan",
            "Animal Husbandry",
            "Low Interest"
        ],
        "benefits": "Short-term credit for crop production and allied activities up to ₹3 lakh at an effective interest rate of 4% per annum upon prompt repayment.",
        "eligibility_summary": "All farmers, individual/joint borrowers, tenant farmers, oral lessees, and Self Help Groups (SHGs).",
        "eligibility": {
            "minAge": 18,
            "maxAge": 75,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Land Record copies",
            "Passport size photograph",
            "Application form"
        ],
        "applyLink": "https://agricoop.nic.in/",
        "baseMatchScore": 92,
        "state": "All India"
    },
    {
        "id": "11",
        "title": "PM KUSUM Yojana (Solar Pumps for Farmers)",
        "ministry": "Ministry of New and Renewable Energy",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Solar Energy",
            "Irrigation",
            "Subsidy",
            "Renewable"
        ],
        "benefits": "Up to 60% government subsidy for standalone solar agricultural pumps and solarisation of grid-connected agricultural pumps, plus option to sell surplus solar power to DISCOMs.",
        "eligibility_summary": "Individual farmers, groups of farmers, cooperatives, Panchayats, Farmer Producer Organisations (FPOs).",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Land ownership papers",
            "Bank details",
            "Electricity connection bill (if applicable)"
        ],
        "applyLink": "https://pmkusum.mnre.gov.in/",
        "baseMatchScore": 89,
        "state": "All India"
    },
    {
        "id": "12",
        "title": "Soil Health Card Scheme",
        "ministry": "Ministry of Agriculture & Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Soil Testing",
            "Nutrient Management",
            "Farming Efficiency"
        ],
        "benefits": "Free soil test reports issued every 3 years containing nutrient status (12 parameters) and customized fertilizer recommendations to boost farm yields and save input costs.",
        "eligibility_summary": "All farmers possessing farm land across all states and Union Territories.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Land details",
            "Soil sample collection slip"
        ],
        "applyLink": "https://soilhealth.dac.gov.in/",
        "baseMatchScore": 85,
        "state": "All India"
    },
    {
        "id": "13",
        "title": "Paramparagat Krishi Vikas Yojana (PKVY) - Organic Farming",
        "ministry": "Ministry of Agriculture & Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Organic Farming",
            "Certification",
            "Subsidy",
            "Sustainable"
        ],
        "benefits": "Financial assistance of ₹50,000 per hectare for 3 years, of which ₹31,000 is directly provided for organic inputs like seeds, bio-fertilizers, and botanical extracts.",
        "eligibility_summary": "Farmers forming clusters of 20 or more farmers with a minimum of 20 hectares total land for organic farming.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Land ownership record",
            "Bank account passbook",
            "Cluster registration"
        ],
        "applyLink": "https://pgsindia-ncof.gov.in/",
        "baseMatchScore": 82,
        "state": "All India"
    },
    {
        "id": "14",
        "title": "Sub-Mission on Agricultural Mechanization (SMAM)",
        "ministry": "Ministry of Agriculture & Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Farm Machinery",
            "Tractor Subsidy",
            "Mechanization"
        ],
        "benefits": "Subsidy of 40% to 50% for purchase of agricultural machinery such as tractors, rotavators, power tillers, and harvesters, with special incentives for SC/ST and women farmers.",
        "eligibility_summary": "Small, marginal, SC/ST, and women farmers seeking modern farm machinery.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 75,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Land records",
            "Caste Certificate (if applicable)",
            "Bank Passbook"
        ],
        "applyLink": "https://agrimachinery.nic.in/",
        "baseMatchScore": 84,
        "state": "All India"
    },
    {
        "id": "15",
        "title": "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
        "ministry": "Ministry of Health & Family Welfare",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Health Insurance",
            "Cashless Hospitalization",
            "Universal Health"
        ],
        "benefits": "Free secondary and tertiary healthcare coverage of up to ₹5 lakh per family per year across over 27,000 empannelled public and private hospitals nationwide, covering 1,949 medical procedures.",
        "eligibility_summary": "Vulnerable and low-income families identified under Socio-Economic Caste Census (SECC 2011) and all senior citizens aged 70+ irrespective of income.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ration Card / PMJAY Letter",
            "Mobile Number"
        ],
        "applyLink": "https://beneficiary.nha.gov.in/",
        "baseMatchScore": 96,
        "state": "All India"
    },
    {
        "id": "16",
        "title": "Pradhan Mantri Bharatiya Janaushadhi Pariyojana (PMBJP)",
        "ministry": "Ministry of Chemicals and Fertilizers",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Affordable Medicines",
            "Generic Drugs",
            "Healthcare Savings"
        ],
        "benefits": "Quality generic medicines and surgical products available at 50% to 90% lower prices compared to branded medicines through over 10,000 Janaushadhi Kendras.",
        "eligibility_summary": "Open to all Indian citizens without any income or demographic restriction.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Doctor's Prescription"
        ],
        "applyLink": "https://janaushadhi.gov.in/",
        "baseMatchScore": 90,
        "state": "All India"
    },
    {
        "id": "17",
        "title": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
        "ministry": "Ministry of Women and Child Development",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Maternity Benefit",
            "Nutrition",
            "Pregnant Women",
            "Cash Incentive"
        ],
        "benefits": "Cash incentive of ₹5,000 in two installments for first child, and ₹6,000 in single installment if the second child is a girl, directly credited to mother's bank account to cover nutrition and wage loss.",
        "eligibility_summary": "Pregnant women and lactating mothers aged 19 and above belonging to socially/economically disadvantaged sections.",
        "eligibility": {
            "minAge": 19,
            "maxAge": 50,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card of mother & husband",
            "Mother-Child Protection (MCP) card",
            "Bank passbook"
        ],
        "applyLink": "https://pmmvy.wcd.gov.in/",
        "baseMatchScore": 93,
        "state": "All India"
    },
    {
        "id": "18",
        "title": "Janani Suraksha Yojana (JSY)",
        "ministry": "Ministry of Health & Family Welfare",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Institutional Delivery",
            "Maternal Health",
            "Safe Motherhood"
        ],
        "benefits": "Cash assistance of ₹1,400 (rural) and ₹1,000 (urban) for institutional deliveries in Low Performing States, and ₹700 (rural) / ₹600 (urban) in High Performing States.",
        "eligibility_summary": "Pregnant women who deliver in government health centres or accredited private hospitals.",
        "eligibility": {
            "minAge": 19,
            "maxAge": 50,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "MCP Card",
            "BPL/Ration Card",
            "Bank passbook"
        ],
        "applyLink": "https://nhm.gov.in/",
        "baseMatchScore": 89,
        "state": "All India"
    },
    {
        "id": "19",
        "title": "Ni-kshay Poshan Yojana (Nutritional Support for TB Patients)",
        "ministry": "Ministry of Health & Family Welfare",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Tuberculosis",
            "Nutrition Support",
            "Direct Benefit Transfer"
        ],
        "benefits": "₹1,000 per month financial assistance for nutritional support to all notified TB patients for the entire duration of their anti-TB treatment.",
        "eligibility_summary": "All diagnosed and notified tuberculosis patients registered on the Ni-kshay portal.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bank Account Details",
            "Medical test report confirming TB"
        ],
        "applyLink": "https://www.nikshay.in/",
        "baseMatchScore": 86,
        "state": "All India"
    },
    {
        "id": "20",
        "title": "Mission Indradhanush (Universal Immunization)",
        "ministry": "Ministry of Health & Family Welfare",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Vaccination",
            "Child Health",
            "Immunization",
            "Free Healthcare"
        ],
        "benefits": "Free life-saving vaccines against 12 vaccine-preventable diseases for all children up to 2 years of age and all pregnant women across India.",
        "eligibility_summary": "Children under 2 years of age and pregnant women who are partially vaccinated or unvaccinated.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 2,
            "gender": [
                "male",
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "unemployed",
                "homemaker"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Child Immunization Card / MCP Card",
            "Parent Aadhaar Card"
        ],
        "applyLink": "https://nhm.gov.in/",
        "baseMatchScore": 91,
        "state": "All India"
    },
    {
        "id": "21",
        "title": "National Scholarship Portal - Pre-Matric Scholarship",
        "ministry": "Ministry of Education",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Scholarship",
            "School Students",
            "SC/ST/OBC",
            "Tuition Aid"
        ],
        "benefits": "Full tuition fee waiver, day scholar allowance of ₹2,250/year or hosteller allowance of ₹4,500/year, and book grants for students studying in Class 1 to 10.",
        "eligibility_summary": "Students belonging to SC, ST, OBC, or minority communities studying in Classes 1 to 10 with family annual income under ₹2.5 Lakh.",
        "eligibility": {
            "minAge": 6,
            "maxAge": 17,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Previous Year Marksheet",
            "Income Certificate",
            "Caste Certificate",
            "Bank Passbook"
        ],
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 92,
        "state": "All India"
    },
    {
        "id": "22",
        "title": "National Scholarship Portal - Post-Matric Scholarship",
        "ministry": "Ministry of Education",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Scholarship",
            "College",
            "Higher Education",
            "Financial Assistance"
        ],
        "benefits": "Reimbursement of compulsory non-refundable fees (tuition, exam fees) plus monthly maintenance allowance up to ₹1,200/month for college and professional courses.",
        "eligibility_summary": "Students from SC/ST/OBC/EBC categories studying in Class 11, 12, ITI, Diploma, Undergraduate, or Postgraduate courses with family income below ₹2.5 Lakh.",
        "eligibility": {
            "minAge": 15,
            "maxAge": 30,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Admission Fee Receipt",
            "Marksheets",
            "Caste Certificate",
            "Income Certificate"
        ],
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 94,
        "state": "All India"
    },
    {
        "id": "23",
        "title": "PM-YASASVI Scholarship Scheme",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Merit Scholarship",
            "Top Schools",
            "OBC",
            "EBC"
        ],
        "benefits": "Scholarship up to ₹75,000 per year for Class 9 & 10 students, and up to ₹1,25,000 per year for Class 11 & 12 students covering school fees and hostel expenses.",
        "eligibility_summary": "Meritorious students belonging to OBC, EBC, and DNT categories studying in designated top-class schools whose family income is below ₹2.5 lakh/year.",
        "eligibility": {
            "minAge": 13,
            "maxAge": 19,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Caste Certificate",
            "Income Certificate",
            "Class 8/10 Marksheet"
        ],
        "applyLink": "https://yet.nta.ac.in/",
        "baseMatchScore": 90,
        "state": "All India"
    },
    {
        "id": "24",
        "title": "Prime Minister's Research Fellowship (PMRF)",
        "ministry": "Ministry of Education",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Ph.D.",
            "Research",
            "Fellowship",
            "Innovation"
        ],
        "benefits": "Prestigious monthly fellowship of ₹70,000 to ₹80,000 per month for Ph.D. scholars plus research contingency grant of ₹2 lakh per annum for 5 years.",
        "eligibility_summary": "Top students graduating with B.Tech, M.Tech, or M.Sc from recognized Indian institutes admitted to Ph.D. programs in IITs, IISc, or IISERs.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 32,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "GATE/CEED scorecard or CGPA transcript",
            "Research Proposal",
            "Institute recommendation"
        ],
        "applyLink": "https://www.pmrf.in/",
        "baseMatchScore": 82,
        "state": "All India"
    },
    {
        "id": "25",
        "title": "AICTE Pragati Scholarship for Girl Students",
        "ministry": "Ministry of Education",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Girls",
            "Technical Education",
            "Engineering",
            "Polytechnic"
        ],
        "benefits": "₹50,000 per year towards tuition fees, computer purchase, books, and competitive exam preparation for the entire duration of technical degree/diploma.",
        "eligibility_summary": "Girl students admitted to 1st year of AICTE-approved Degree or Diploma technical programs with family income less than ₹8 lakh per annum.",
        "eligibility": {
            "minAge": 17,
            "maxAge": 26,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "10th/12th Marksheet",
            "Admission allotment letter",
            "Income certificate",
            "Bank account"
        ],
        "applyLink": "https://www.aicte-pragati-saksham-gov.in/",
        "baseMatchScore": 91,
        "state": "All India"
    },
    {
        "id": "26",
        "title": "AICTE Saksham Scholarship for Differently Abled Students",
        "ministry": "Ministry of Education",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Divyangjan",
            "Disability",
            "Technical Education",
            "Empowerment"
        ],
        "benefits": "₹50,000 per year assistance for differently-abled students admitted to technical degree or diploma courses across AICTE recognized institutions.",
        "eligibility_summary": "Specially-abled students with disability of not less than 40% admitted to 1st year technical courses with family income under ₹8 lakh.",
        "eligibility": {
            "minAge": 17,
            "maxAge": 30,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Disability Certificate (min 40%)",
            "Admission Letter",
            "Income Certificate",
            "Aadhaar"
        ],
        "applyLink": "https://www.aicte-pragati-saksham-gov.in/",
        "baseMatchScore": 88,
        "state": "All India"
    },
    {
        "id": "27",
        "title": "National Means-cum-Merit Scholarship Scheme (NMMSS)",
        "ministry": "Ministry of Education",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "School Dropout Prevention",
            "Merit",
            "Monthly Stipend"
        ],
        "benefits": "Scholarship of ₹12,000 per year (₹1,000/month) from Class 9 to 12 to reduce dropout rates at secondary stage for meritorious students from economically weaker sections.",
        "eligibility_summary": "Students enrolled in government/aided schools having scored at least 55% in Class 7, with parental annual income not exceeding ₹3.5 lakh.",
        "eligibility": {
            "minAge": 12,
            "maxAge": 18,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Class 7/8 Marksheet",
            "Income Certificate",
            "Bank Account in student's name",
            "Aadhaar"
        ],
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 90,
        "state": "All India"
    },
    {
        "id": "28",
        "title": "PM Awas Yojana - Gramin (PMAY-G)",
        "ministry": "Ministry of Rural Development",
        "type": "central",
        "category": "Housing & Shelter",
        "tags": [
            "Housing",
            "Pucca House",
            "Rural Housing",
            "Financial Aid"
        ],
        "benefits": "Direct financial assistance of ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly/difficult/northeastern states to construct a disaster-resilient pucca house with toilet (extra ₹12,000 via SBM).",
        "eligibility_summary": "Homeless rural families and families living in kutcha/dilapidated houses as verified through Awaas+ survey and SECC.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bank Account Passbook",
            "MGNREGA Job Card number",
            "Land ownership proof"
        ],
        "applyLink": "https://pmayg.nic.in/",
        "baseMatchScore": 95,
        "state": "All India"
    },
    {
        "id": "29",
        "title": "PM Awas Yojana - Urban 2.0 (PMAY-U)",
        "ministry": "Ministry of Housing & Urban Affairs",
        "type": "central",
        "category": "Housing & Shelter",
        "tags": [
            "Urban Housing",
            "Home Loan Subsidy",
            "Affordable Housing",
            "EWS/LIG"
        ],
        "benefits": "Interest subsidy up to ₹1.80 lakh on home loans under Credit Linked Subsidy Scheme (CLSS) and central assistance of ₹1.5 lakh for construction/enhancement of pucca house.",
        "eligibility_summary": "Urban families belonging to EWS (income up to ₹3 lakh), LIG (income ₹3–6 lakh), or MIG categories who do not own a pucca house anywhere in India.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Income Certificate / ITR",
            "Affidavit certifying no pucca house",
            "Bank statement"
        ],
        "applyLink": "https://pmaymis.gov.in/",
        "baseMatchScore": 92,
        "state": "All India"
    },
    {
        "id": "30",
        "title": "Affordable Rental Housing Complexes (ARHCs)",
        "ministry": "Ministry of Housing & Urban Affairs",
        "type": "central",
        "category": "Housing & Shelter",
        "tags": [
            "Rental Housing",
            "Migrant Workers",
            "Urban Poor"
        ],
        "benefits": "Subsidized, dignified, and safe rental accommodation close to workplaces with clean water, sanitation, and electricity for urban migrants and poor.",
        "eligibility_summary": "Urban migrants, industrial workers, street vendors, rickshaw pullers, and hospitality workers living in municipal areas.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Workplace ID / Vendor Card",
            "Income declaration"
        ],
        "applyLink": "https://arhc.mohua.gov.in/",
        "baseMatchScore": 85,
        "state": "All India"
    },
    {
        "id": "31",
        "title": "Pradhan Mantri MUDRA Yojana (PMMY)",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Business Loan",
            "Collateral Free",
            "MSME",
            "Self Employment"
        ],
        "benefits": "Collateral-free business loans up to ₹20 lakh in three categories: Shishu (up to ₹50,000), Kishore (₹50,001–₹5 lakh), and Tarun (₹5 lakh–₹20 lakh) at competitive interest rates.",
        "eligibility_summary": "Any Indian citizen engaged in or planning non-farm income generating micro/small business activity.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 65,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "PAN Card",
            "Business proposal / Quotations",
            "Bank statement (past 6 months)"
        ],
        "applyLink": "https://www.mudra.org.in/",
        "baseMatchScore": 96,
        "state": "All India"
    },
    {
        "id": "32",
        "title": "Stand-Up India Scheme",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "SC/ST Entrepreneurs",
            "Women Entrepreneurs",
            "Bank Loan",
            "Greenfield"
        ],
        "benefits": "Bank loans between ₹10 lakh and ₹1 crore for setting up greenfield enterprises in manufacturing, services, agri-allied activities, or trading.",
        "eligibility_summary": "SC/ST and/or women entrepreneurs aged 18 years and above; for non-individual enterprises, at least 51% shareholding must be held by SC/ST or woman.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "gender": [
                "female",
                "male",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "sc",
                "st",
                "general",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "PAN Card",
            "Caste Certificate (if SC/ST)",
            "Project report",
            "Bank statements"
        ],
        "applyLink": "https://www.standupmitra.in/",
        "baseMatchScore": 91,
        "state": "All India"
    },
    {
        "id": "33",
        "title": "Prime Minister's Employment Generation Programme (PMEGP)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Subsidy",
            "New Enterprise",
            "Self Employment",
            "Manufacturing"
        ],
        "benefits": "Credit-linked government subsidy of 15% to 35% on project cost up to ₹50 lakh for manufacturing units and up to ₹20 lakh for service units.",
        "eligibility_summary": "Individuals aged 18+ who have passed at least 8th standard for projects above ₹10 lakh in manufacturing and ₹5 lakh in service.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 65,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "self-employed"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "8th pass marksheet",
            "Detailed Project Report (DPR)",
            "Caste/Special category proof"
        ],
        "applyLink": "https://www.kviconline.gov.in/pmegpeportal/",
        "baseMatchScore": 93,
        "state": "All India"
    },
    {
        "id": "34",
        "title": "PM Vishwakarma Kaushal Samman Yojana",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Artisans",
            "Craftsmen",
            "Traditional Trades",
            "Toolkit Incentive",
            "Low Interest Loan"
        ],
        "benefits": "PM Vishwakarma Certificate & ID Card, basic skill training with ₹500/day stipend, modern toolkit incentive of ₹15,000, and collateral-free enterprise loans up to ₹3 lakh at concessional 5% interest.",
        "eligibility_summary": "Artisans and craftspeople working with hands and tools in 18 traditional trades (carpenters, blacksmiths, potters, cobblers, tailors, weavers, masons, etc.).",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "farmer"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mobile number linked to Aadhaar",
            "Bank passbook",
            "Trade verification"
        ],
        "applyLink": "https://pmvishwakarma.gov.in/",
        "baseMatchScore": 95,
        "state": "All India"
    },
    {
        "id": "35",
        "title": "Startup India Seed Fund Scheme (SISFS)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Startups",
            "Seed Funding",
            "Grants",
            "Proof of Concept"
        ],
        "benefits": "Financial assistance up to ₹20 lakh as grant for Proof of Concept, prototype development, and product trials, and up to ₹50 lakh through debt/convertible debentures for commercialization.",
        "eligibility_summary": "DPIIT-recognized startups incorporated not more than 2 years ago with innovative product/idea.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "DPIIT Recognition Certificate",
            "Business Plan",
            "Pitch Deck",
            "Certificate of Incorporation"
        ],
        "applyLink": "https://seedfund.startupindia.gov.in/",
        "baseMatchScore": 88,
        "state": "All India"
    },
    {
        "id": "36",
        "title": "Credit Guarantee Fund Trust for Micro & Small Enterprises (CGTMSE)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Credit Guarantee",
            "Collateral Free",
            "MSME Scaleup"
        ],
        "benefits": "Credit guarantee cover up to 85% for collateral-free bank loans up to ₹5 crore to micro and small enterprises.",
        "eligibility_summary": "New and existing Micro and Small Enterprises in manufacturing and service sectors.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Udyam Registration",
            "PAN Card",
            "Business Financial Statements",
            "Project Report"
        ],
        "applyLink": "https://www.cgtmse.in/",
        "baseMatchScore": 86,
        "state": "All India"
    },
    {
        "id": "37",
        "title": "Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)",
        "ministry": "Ministry of Rural Development",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Rural Employment",
            "Guaranteed Work",
            "100 Days",
            "Wage Support"
        ],
        "benefits": "Legal guarantee of at least 100 days of wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work, with wages paid directly into bank accounts.",
        "eligibility_summary": "Adult members of rural households willing to do unskilled manual work.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 75,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "farmer"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ration Card",
            "Bank/Post Office Passbook",
            "Passport size photo"
        ],
        "applyLink": "https://nrega.nic.in/",
        "baseMatchScore": 97,
        "state": "All India"
    },
    {
        "id": "38",
        "title": "PM SVANidhi - PM Street Vendor's AtmaNirbhar Nidhi",
        "ministry": "Ministry of Housing & Urban Affairs",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Street Vendors",
            "Working Capital",
            "Cashback",
            "Urban Livelihood"
        ],
        "benefits": "Collateral-free working capital loan of ₹10,000 (1st tranche), ₹20,000 (2nd tranche), and ₹50,000 (3rd tranche) with 7% interest subsidy and up to ₹1,200/year cashback on digital transactions.",
        "eligibility_summary": "All street vendors engaged in vending in urban areas on or before March 24, 2020.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Vending Certificate / Urban Local Body Recommendation Letter",
            "Bank Account Passbook"
        ],
        "applyLink": "https://pmsvanidhi.mohua.gov.in/",
        "baseMatchScore": 94,
        "state": "All India"
    },
    {
        "id": "39",
        "title": "Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY)",
        "ministry": "Ministry of Skill Development and Entrepreneurship",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Free Skill Training",
            "Certification",
            "Job Placement",
            "Industry 4.0"
        ],
        "benefits": "100% free short-term skill training in emerging technologies (AI, Robotics, Drone tech, IoT) and traditional sectors, government-recognized NSDC certification, placement assistance, and ₹8,000 reward.",
        "eligibility_summary": "Indian youth aged 15 to 45 years who are school/college dropouts or unemployed seeking industry-relevant job skills.",
        "eligibility": {
            "minAge": 15,
            "maxAge": 45,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bank Account Details",
            "Educational Marksheets (if any)"
        ],
        "applyLink": "https://www.pmkvyofficial.org/",
        "baseMatchScore": 93,
        "state": "All India"
    },
    {
        "id": "40",
        "title": "National Apprenticeship Promotion Scheme (NAPS)",
        "ministry": "Ministry of Skill Development and Entrepreneurship",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Apprenticeship",
            "Stipend",
            "On-the-job Training",
            "Youth"
        ],
        "benefits": "Monthly stipend sharing by Government of India up to ₹1,500/month per apprentice with hands-on industrial training across leading corporate companies.",
        "eligibility_summary": "Candidates aged 14+ having completed 5th/8th/10th/12th/ITI/Diploma or Degree interested in apprenticeship training.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Educational Marksheet",
            "Bank Passbook"
        ],
        "applyLink": "https://www.apprenticeshipindia.gov.in/",
        "baseMatchScore": 88,
        "state": "All India"
    },
    {
        "id": "41",
        "title": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
        "ministry": "Ministry of Rural Development",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Rural Youth",
            "Placement Guarantee",
            "Skill Training"
        ],
        "benefits": "Free residential skill development courses with free boarding, lodging, books, uniforms, and guaranteed placement with minimum 70% certified candidates placed in formal sector jobs.",
        "eligibility_summary": "Rural youth between 15 and 35 years belonging to poor households (up to 45 years for SC/ST/Women/PWD).",
        "eligibility": {
            "minAge": 15,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "BPL/Ration Card",
            "School Marksheet",
            "Bank Passbook"
        ],
        "applyLink": "http://ddugky.gov.in/",
        "baseMatchScore": 90,
        "state": "All India"
    },
    {
        "id": "42",
        "title": "Antyodaya Anna Yojana (AAY)",
        "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Food Security",
            "Free Ration",
            "Subsidized Grain",
            "Poorest Families"
        ],
        "benefits": "35 kg of foodgrains per family per month completely free of cost under PMGKAY through Fair Price Shops.",
        "eligibility_summary": "Poorest of the poor families identified by State Governments: landless labourers, marginal farmers, rural artisans, widows, terminally ill, and disabled individuals.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "farmer",
                "homemaker"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "AAY Yellow/Red Ration Card",
            "Aadhaar Card",
            "Income Certificate"
        ],
        "applyLink": "https://nfsa.gov.in/",
        "baseMatchScore": 96,
        "state": "All India"
    },
    {
        "id": "43",
        "title": "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)",
        "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Free Ration",
            "Food Security",
            "Direct Benefit"
        ],
        "benefits": "5 kg of foodgrains (wheat/rice) per person per month completely free of cost to over 80 crore beneficiaries covered under NFSA.",
        "eligibility_summary": "All Priority Household (PHH) and Antyodaya Anna Yojana (AAY) ration card holders.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Ration Card",
            "Aadhaar Card"
        ],
        "applyLink": "https://dfpd.gov.in/",
        "baseMatchScore": 95,
        "state": "All India"
    },
    {
        "id": "44",
        "title": "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
        "ministry": "Ministry of Rural Development",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Old Age Pension",
            "Senior Citizens",
            "BPL Pension"
        ],
        "benefits": "Monthly pension assistance (central component ₹200/month for age 60-79 and ₹500/month for age 80+, enhanced by matching state contributions up to ₹1,000–₹2,500/month).",
        "eligibility_summary": "Senior citizens aged 60 years or above living below the poverty line (BPL).",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Age Proof",
            "BPL Certificate / Ration Card",
            "Bank Account Passbook"
        ],
        "applyLink": "https://nsap.nic.in/",
        "baseMatchScore": 92,
        "state": "All India"
    },
    {
        "id": "45",
        "title": "Indira Gandhi National Widow Pension Scheme (IGNWPS)",
        "ministry": "Ministry of Rural Development",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Widow Pension",
            "Women Welfare",
            "Social Assistance"
        ],
        "benefits": "Monthly pension directly credited to widow's bank account with central and state contributions to ensure dignified survival.",
        "eligibility_summary": "Widows aged 40 to 79 years belonging to households living below the poverty line (BPL).",
        "eligibility": {
            "minAge": 40,
            "maxAge": 79,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "homemaker"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Death Certificate of Husband",
            "Aadhaar Card",
            "BPL Ration Card",
            "Bank Passbook"
        ],
        "applyLink": "https://nsap.nic.in/",
        "baseMatchScore": 91,
        "state": "All India"
    },
    {
        "id": "46",
        "title": "Indira Gandhi National Disability Pension Scheme (IGNDPS)",
        "ministry": "Ministry of Rural Development",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Disability Pension",
            "Divyangjan",
            "Financial Aid"
        ],
        "benefits": "Monthly pension for persons with severe and multiple disabilities living in BPL households.",
        "eligibility_summary": "Persons with 80% or more disability aged 18 to 79 years living below the poverty line.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 79,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "homemaker"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Disability Certificate (min 80%)",
            "Aadhaar Card",
            "BPL Proof",
            "Bank Details"
        ],
        "applyLink": "https://nsap.nic.in/",
        "baseMatchScore": 90,
        "state": "All India"
    },
    {
        "id": "47",
        "title": "Rashtriya Vayoshri Yojana (RVY)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Senior Citizens",
            "Assisted Living",
            "Free Equipment",
            "Walking Aids"
        ],
        "benefits": "Free distribution of assisted living devices and physical aids: wheelchairs, walking sticks, hearing aids, crutches, artificial dentures, and spectacles to senior citizens.",
        "eligibility_summary": "Senior citizens aged 60+ belonging to BPL category or with monthly family income below ₹15,000 suffering from age-related disabilities.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "BPL Card / Income Certificate",
            "Medical Certificate of age-related infirmity"
        ],
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 89,
        "state": "All India"
    },
    {
        "id": "48",
        "title": "Sukanya Samriddhi Yojana (SSY)",
        "ministry": "Ministry of Finance",
        "type": "central",
        "category": "Women & Child",
        "tags": [
            "Girl Child",
            "High Interest",
            "Higher Education",
            "Tax Free"
        ],
        "benefits": "Government-backed savings account for girl children with an attractive 8.2% annual interest rate, exempt under 80C, partial withdrawal at age 18 for higher education.",
        "eligibility_summary": "Parents or legal guardians can open an account for any girl child up to 10 years of age (maximum two girl children per family).",
        "eligibility": {
            "minAge": 0,
            "maxAge": 10,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Birth Certificate of Girl Child",
            "Guardian's Aadhaar & PAN Card",
            "Passport photos"
        ],
        "applyLink": "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx",
        "baseMatchScore": 96,
        "state": "All India"
    },
    {
        "id": "49",
        "title": "Pradhan Mantri Ujjwala Yojana 2.0 (PMUY)",
        "ministry": "Ministry of Petroleum and Natural Gas",
        "type": "central",
        "category": "Women & Child",
        "tags": [
            "Free LPG",
            "Clean Cooking",
            "Women Health",
            "Cylinder Subsidy"
        ],
        "benefits": "Free LPG gas connection with deposit-free cylinder, pressure regulator, safety hose, first refill and hotplate stove completely free, plus ₹300 per cylinder subsidy on ongoing refills.",
        "eligibility_summary": "Adult woman belonging to poor households (SC/ST, PMAY beneficiaries, AAY, tea garden workers, forest dwellers, or verified under 14-point SECC declaration).",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "farmer",
                "unemployed"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card of applicant & family members",
            "Ration Card",
            "Bank Account Passbook"
        ],
        "applyLink": "https://www.pmuy.gov.in/",
        "baseMatchScore": 95,
        "state": "All India"
    },
    {
        "id": "50",
        "title": "Beti Bachao Beti Padhao (BBBP)",
        "ministry": "Ministry of Women and Child Development",
        "type": "central",
        "category": "Women & Child",
        "tags": [
            "Girl Child Protection",
            "Education",
            "Gender Equality"
        ],
        "benefits": "Multi-sectoral intervention ensuring protection, survival, education, and equal inheritance rights for girl children, elimination of sex-selection, and subsidized schooling.",
        "eligibility_summary": "All girl children and their parents across all districts in India.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 18,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Birth Certificate of Girl Child",
            "Parent Aadhaar Card"
        ],
        "applyLink": "https://wcd.nic.in/bbbp-schemes",
        "baseMatchScore": 90,
        "state": "All India"
    },
    {
        "id": "51",
        "title": "Mission Shakti - Sambal & Samarthya",
        "ministry": "Ministry of Women and Child Development",
        "type": "central",
        "category": "Women & Child",
        "tags": [
            "Women Safety",
            "One Stop Centre",
            "Shelter",
            "Women Empowerment"
        ],
        "benefits": "Integrated umbrella scheme providing 24/7 emergency toll-free helpline (181), One Stop Centres (OSC) for legal/medical support, Working Women Hostels (Sakhi Niwas), and Palna creches.",
        "eligibility_summary": "All women and girls who are victims of violence or seeking shelter, safe accommodation, or workplace child-care.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 80,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "self-employed",
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Application / Incident Report"
        ],
        "applyLink": "https://wcd.nic.in/",
        "baseMatchScore": 88,
        "state": "All India"
    },
    {
        "id": "52",
        "title": "Working Women Hostel Scheme (Sakhi Niwas)",
        "ministry": "Ministry of Women and Child Development",
        "type": "central",
        "category": "Women & Child",
        "tags": [
            "Hostel",
            "Safe Stay",
            "Working Women",
            "Childcare"
        ],
        "benefits": "Safe, secure, and affordable hostel accommodation with daycare/creche facility for children of working women in urban and semi-urban locations.",
        "eligibility_summary": "Working women (single, widowed, divorced, separated, married whose spouse does not reside in the same city) with consolidated income up to ₹50,000/month (metropolitan) or ₹35,000/month (other areas).",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Employment Certificate / Salary Slip",
            "Passport size photo"
        ],
        "applyLink": "https://wcd.nic.in/",
        "baseMatchScore": 84,
        "state": "All India"
    },
    {
        "id": "53",
        "title": "PM Surya Ghar: Muft Bijli Yojana",
        "ministry": "Ministry of New and Renewable Energy",
        "type": "central",
        "category": "Utility & Sanitation",
        "tags": [
            "Solar Rooftop",
            "Free Electricity",
            "Subsidy",
            "Green Energy"
        ],
        "benefits": "Central financial subsidy of ₹30,000 for 1 kW systems, ₹60,000 for 2 kW systems, and ₹78,000 for 3 kW or higher systems, providing up to 300 units of free electricity every month.",
        "eligibility_summary": "Indian households having a suitable roof and valid residential grid-connected electricity connection.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Electricity Bill (last 6 months)",
            "Aadhaar Card",
            "Roof ownership proof / Consent",
            "Bank Passbook"
        ],
        "applyLink": "https://pmsuryaghar.gov.in/",
        "baseMatchScore": 95,
        "state": "All India"
    },
    {
        "id": "54",
        "title": "Swachh Bharat Mission - Gramin (Individual Household Toilet Subsidy)",
        "ministry": "Ministry of Jal Shakti",
        "type": "central",
        "category": "Utility & Sanitation",
        "tags": [
            "Sanitation",
            "Toilet Subsidy",
            "Cleanliness",
            "Open Defecation Free"
        ],
        "benefits": "Direct incentive of ₹12,000 per eligible rural household for the construction of an Individual Household Latrine (IHHL) with twin pit technology.",
        "eligibility_summary": "Rural households without a functional toilet, with priority to BPL, SC/ST, small & marginal farmers, landless labourers, and female-headed households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bank Account Passbook",
            "Photograph of applicant with toilet construction site"
        ],
        "applyLink": "https://sbm.gov.in/sbmgramin/",
        "baseMatchScore": 93,
        "state": "All India"
    },
    {
        "id": "55",
        "title": "Jal Jeevan Mission (Har Ghar Nal Se Jal)",
        "ministry": "Ministry of Jal Shakti",
        "type": "central",
        "category": "Utility & Sanitation",
        "tags": [
            "Tap Water",
            "Drinking Water",
            "Rural Health"
        ],
        "benefits": "Providing functional household tap connections (FHTC) with assured supply of 55 litres of safe potable water per capita per day to every rural household.",
        "eligibility_summary": "All rural households across all villages and habitations in India.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gram Panchayat household registration"
        ],
        "applyLink": "https://jaljeevanmission.gov.in/",
        "baseMatchScore": 91,
        "state": "All India"
    },
    {
        "id": "56",
        "title": "Digital India Internship Scheme",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "IT Internship",
            "Tech Students",
            "Government Projects",
            "Monthly Stipend"
        ],
        "benefits": "2-month paid internship with ₹10,000/month stipend, hands-on exposure to national e-governance, cyber security, AI, and digital public infrastructure, and certificate of completion.",
        "eligibility_summary": "Students pursuing B.Tech/B.E., M.Tech, MCA, or M.Sc (CS/IT) with at least 60% marks from recognized universities.",
        "eligibility": {
            "minAge": 19,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "College Bonafide Certificate",
            "Academic Marksheets",
            "Resume",
            "Aadhaar Card"
        ],
        "applyLink": "https://meity.gov.in/",
        "baseMatchScore": 87,
        "state": "All India"
    },
    {
        "id": "57",
        "title": "PM Gramin Digital Saksharta Abhiyan (PMGDISHA)",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "Digital Literacy",
            "Computer Training",
            "Rural Empowerment",
            "Free Course"
        ],
        "benefits": "Free 20-hour digital training enabling rural citizens to operate smartphones, tablets, send emails, browse internet, make UPI digital payments, and access government e-services.",
        "eligibility_summary": "Digitally illiterate rural citizens aged 14 to 60 years (one member per eligible rural household).",
        "eligibility": {
            "minAge": 14,
            "maxAge": 60,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "unemployed",
                "homemaker"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ration Card / Voter ID"
        ],
        "applyLink": "https://www.pmgdisha.in/",
        "baseMatchScore": 92,
        "state": "All India"
    },
    {
        "id": "58",
        "title": "INSPIRE Scholarship for Higher Education (SHE)",
        "ministry": "Ministry of Science and Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "Pure Science",
            "Merit Scholarship",
            "Innovation",
            "Research"
        ],
        "benefits": "Scholarship of ₹80,000 per year (₹60,000 stipend + ₹20,000 summer research mentorship) for students pursuing B.Sc./M.Sc. in natural and basic sciences.",
        "eligibility_summary": "Top 1% meritorious students in Class 12 board exams or top rankers in JEE/NEET pursuing regular B.Sc./Integrated M.Sc. in natural or basic sciences.",
        "eligibility": {
            "minAge": 17,
            "maxAge": 22,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Class 12 Marksheet",
            "Advisory note from board",
            "College Admission Proof",
            "Bank details"
        ],
        "applyLink": "https://online-inspire.gov.in/",
        "baseMatchScore": 89,
        "state": "All India"
    },
    {
        "id": "59",
        "title": "Tele-Law: Reaching the Unreached",
        "ministry": "Ministry of Law and Justice",
        "type": "central",
        "category": "Public Safety, Law & Justice",
        "tags": [
            "Legal Aid",
            "Free Lawyer Advice",
            "Justice",
            "Common Service Centre"
        ],
        "benefits": "Free legal advice and consultation from panel lawyers via video conferencing and telephone through Common Service Centres (CSCs) or mobile app.",
        "eligibility_summary": "Free for women, children, SC/ST, victims of trafficking, disabled persons, and low-income citizens under Section 12 of Legal Services Authorities Act.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mobile number",
            "Case details (if any)"
        ],
        "applyLink": "https://www.tele-law.in/",
        "baseMatchScore": 91,
        "state": "All India"
    },
    {
        "id": "60",
        "title": "Nyaya Bandhu (Pro Bono Legal Services)",
        "ministry": "Ministry of Law and Justice",
        "type": "central",
        "category": "Public Safety, Law & Justice",
        "tags": [
            "Free Legal Aid",
            "Advocacy",
            "Court Representation"
        ],
        "benefits": "Connects marginalized litigants eligible for free legal aid with voluntary practicing advocates across High Courts and Supreme Court for pro bono representation.",
        "eligibility_summary": "Marginalized sections eligible under Section 12 of LSA Act: women, children, SC/ST, disabled persons, and industrial workmen.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "homemaker"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Proof of eligibility (BPL/SC/ST/Disability card)",
            "Case papers"
        ],
        "applyLink": "https://www.probono-doj.in/",
        "baseMatchScore": 86,
        "state": "All India"
    },
    {
        "id": "61",
        "title": "Central Victim Compensation Scheme (CVCF)",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Public Safety, Law & Justice",
        "tags": [
            "Victim Compensation",
            "Rehabilitation",
            "Legal Relief"
        ],
        "benefits": "Financial compensation between ₹3 lakh and ₹10 lakh to victims or their dependents who have suffered loss or injury as a result of crimes (such as acid attacks, rape, or grievous hurt).",
        "eligibility_summary": "Victims of crime or their legal dependents where offender is untraced or unable to compensate.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "FIR copy",
            "Medical legal certificate / Post-mortem report",
            "Bank account details"
        ],
        "applyLink": "https://www.mha.gov.in/",
        "baseMatchScore": 85,
        "state": "All India"
    },
    {
        "id": "62",
        "title": "Khelo India National Programme for Development of Sports",
        "ministry": "Ministry of Youth Affairs and Sports",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "Athletics",
            "Sports Scholarship",
            "Coaching",
            "Youth Talent"
        ],
        "benefits": "Annual financial assistance of ₹5 lakh per annum for 8 years to 1,000 talented young athletes identified in priority sports disciplines, covering training, boarding, and equipment.",
        "eligibility_summary": "Young sporting talent aged 10 to 21 years demonstrating exceptional performance in national and school games.",
        "eligibility": {
            "minAge": 10,
            "maxAge": 21,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Age Proof / Birth Certificate",
            "Sports achievement certificates",
            "Aadhaar Card"
        ],
        "applyLink": "https://kheloindia.gov.in/",
        "baseMatchScore": 92,
        "state": "All India"
    },
    {
        "id": "63",
        "title": "Target Olympic Podium Scheme (TOPS)",
        "ministry": "Ministry of Youth Affairs and Sports",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "Olympics",
            "World Class Coaching",
            "Elite Athlete",
            "Monthly Out of Pocket Allowance"
        ],
        "benefits": "Customized elite coaching, international competition exposure, sports science support, and an out-of-pocket allowance of ₹50,000 per month for selected athletes preparing for Olympics/Paralympics.",
        "eligibility_summary": "Elite athletes selected by the Mission Olympic Cell based on medal potential in Olympics, Paralympics, and Asian Games.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 38,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Passport",
            "National/International Sports Record Transcripts",
            "Aadhaar Card"
        ],
        "applyLink": "https://sportsauthorityofindia.nic.in/",
        "baseMatchScore": 84,
        "state": "All India"
    },
    {
        "id": "64",
        "title": "Kala Sanskriti Vikas Yojana (Financial Assistance for Artists)",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "Artists",
            "Folk Art",
            "Monthly Pension",
            "Cultural Preservation"
        ],
        "benefits": "Financial assistance of up to ₹6,000 per month to veteran artists and their dependents who are in indigent circumstances.",
        "eligibility_summary": "Traditional artists aged 60 years and above whose annual income does not exceed ₹48,000.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "self-employed"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Artist bio-data and newspaper clippings/record of art contribution",
            "Income Certificate"
        ],
        "applyLink": "https://indiaculture.gov.in/",
        "baseMatchScore": 82,
        "state": "All India"
    },
    {
        "id": "65",
        "title": "PM E-DRIVE / FAME II Electric Vehicle Subsidy",
        "ministry": "Ministry of Heavy Industries",
        "type": "central",
        "category": "Transport & Infrastructure",
        "tags": [
            "Electric Vehicle",
            "EV Subsidy",
            "Clean Mobility",
            "Two Wheeler EV"
        ],
        "benefits": "Upfront purchase discount up to ₹10,000 for electric two-wheelers and ₹50,000 for electric three-wheelers directly deducted by EV dealerships from invoice price.",
        "eligibility_summary": "All Indian citizens purchasing registered eligible high-speed electric 2-wheelers or 3-wheelers.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Driving License",
            "Pan Card"
        ],
        "applyLink": "https://fame2.heavyindustries.gov.in/",
        "baseMatchScore": 90,
        "state": "All India"
    },
    {
        "id": "66",
        "title": "UDAN (Ude Desh ka Aam Nagrik) Regional Air Travel",
        "ministry": "Ministry of Civil Aviation",
        "type": "central",
        "category": "Transport & Infrastructure",
        "tags": [
            "Affordable Flight",
            "Regional Connectivity",
            "Air Travel Subsidy"
        ],
        "benefits": "Capped airfares at ₹2,500 for 1-hour flight (approx. 500 km) connecting unserved and underserved regional airports across tier-2 and tier-3 cities.",
        "eligibility_summary": "All citizens booking flights on designated regional UDAN routes.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Valid Government ID (Aadhaar, Passport, Voter ID)"
        ],
        "applyLink": "https://www.civilaviation.gov.in/",
        "baseMatchScore": 86,
        "state": "All India"
    },
    {
        "id": "67",
        "title": "Pradhan Mantri Gram Sadak Yojana (PMGSY)",
        "ministry": "Ministry of Rural Development",
        "type": "central",
        "category": "Transport & Infrastructure",
        "tags": [
            "All Weather Road",
            "Rural Connectivity",
            "Highway"
        ],
        "benefits": "Connecting eligible unconnected rural habitations (population 500+ in plain areas and 250+ in hill states) with all-weather blacktopped roads.",
        "eligibility_summary": "Rural habitations currently lacking all-weather connectivity.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed"
            ],
            "area": [
                "rural"
            ]
        },
        "documents": [
            "Village resolution / Gram Sabha request"
        ],
        "applyLink": "http://omms.nic.in/",
        "baseMatchScore": 88,
        "state": "All India"
    },
    {
        "id": "68",
        "title": "Dekho Apna Desh Scheme",
        "ministry": "Ministry of Tourism",
        "type": "central",
        "category": "Travel & Tourism",
        "tags": [
            "Domestic Travel",
            "Heritage",
            "Tourism Incentive",
            "Travel Pledge"
        ],
        "benefits": "Financial incentives, certificates, and travel reimbursement awards for citizens who travel to at least 15 domestic tourist destinations outside their home state within one year.",
        "eligibility_summary": "All Indian citizens undertaking domestic travel to promote India's cultural and natural heritage.",
        "eligibility": {
            "minAge": 16,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Travel tickets / Photos / Location geo-tagging",
            "Aadhaar Card"
        ],
        "applyLink": "https://tourism.gov.in/",
        "baseMatchScore": 86,
        "state": "All India"
    },
    {
        "id": "69",
        "title": "PRASHAD (Pilgrimage Rejuvenation and Spiritual Augmentation Drive)",
        "ministry": "Ministry of Tourism",
        "type": "central",
        "category": "Travel & Tourism",
        "tags": [
            "Pilgrimage",
            "Spiritual Tourism",
            "Heritage Facilities"
        ],
        "benefits": "World-class tourist facilitation centres, accessible pathways, drinking water, lighting, and safe amenities at designated pilgrimage and heritage sites across India.",
        "eligibility_summary": "All pilgrims and travellers visiting designated national spiritual tourism sites.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "None (Public Infrastructure Initiative)"
        ],
        "applyLink": "https://tourism.gov.in/",
        "baseMatchScore": 82,
        "state": "All India"
    },
    {
        "id": "70",
        "title": "PM Scholarship Scheme for Central Armed Police Forces (CAPF)",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Defence",
            "CAPF",
            "Martyrs Wards",
            "Scholarship"
        ],
        "benefits": "Monthly scholarship of ₹3,000 for boys and ₹3,500 for girls pursuing technical and professional degree courses (engineering, medicine, dental, management).",
        "eligibility_summary": "Dependent wards and widows of Central Armed Police Forces (CRPF, BSF, CISF, ITBP, SSB, Assam Rifles) and State Police personnel martyred or disabled in action.",
        "eligibility": {
            "minAge": 17,
            "maxAge": 25,
            "gender": [
                "male",
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Service / Discharge Certificate",
            "Martyrdom proof / PPO",
            "12th Marksheet",
            "College Admission Proof"
        ],
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 87,
        "state": "All India"
    },
    {
        "id": "71",
        "title": "National Apprenticeship Training Scheme (NATS)",
        "ministry": "Ministry of Education",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Technical Apprenticeship",
            "Engineers",
            "Diploma Holders",
            "Monthly Stipend"
        ],
        "benefits": "One-year on-the-job training with government stipend sharing (₹9,000/month for graduates and ₹8,000/month for diploma holders) in leading central PSUs and private industries.",
        "eligibility_summary": "Students holding Engineering Degree or Diploma obtained within the last 3 years who have not undergone prior training.",
        "eligibility": {
            "minAge": 19,
            "maxAge": 30,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Degree/Diploma Provisional Certificate",
            "Aadhaar Card",
            "Bank Account in nationalized bank"
        ],
        "applyLink": "https://nats.education.gov.in/",
        "baseMatchScore": 86,
        "state": "All India"
    },
    {
        "id": "72",
        "title": "Dr. Ambedkar Scheme of Interest Subsidy on Educational Loans",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Overseas Study",
            "Interest Subsidy",
            "Higher Education",
            "OBC/EBC"
        ],
        "benefits": "100% interest subsidy on education loans availed by OBC and EBC students for overseas Masters, M.Phil, and Ph.D. programs during the moratorium period.",
        "eligibility_summary": "OBC students with family income under ₹8 lakh or EBC students with income under ₹5 lakh who have secured admission into eligible overseas universities.",
        "eligibility": {
            "minAge": 20,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Caste Certificate",
            "Income Certificate",
            "Overseas Admission Letter",
            "Bank Loan sanction letter"
        ],
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 83,
        "state": "All India"
    },
    {
        "id": "73",
        "title": "Andaman Fishermen Marine Livelihood Scheme (ANITA)",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Directorate of Fisheries, Andaman & Nicobar Administration",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Fisheries",
            "Marine Livelihood",
            "Deep Sea",
            "Subsidy"
        ],
        "benefits": "Up to 50% capital subsidy on mechanized boats, GPS-enabled navigation, safety jackets, and insulated ice boxes for local fishermen families.",
        "eligibility_summary": "Traditional marine fishermen and members of Fisheries Cooperative Societies in Andaman & Nicobar Islands.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 65,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Island Domicile Certificate",
            "Fishermen Biometric Card",
            "Bank Passbook"
        ],
        "applyLink": "https://edistrict.andaman.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "74",
        "title": "Andaman Island Student Mainland Higher Education Scholarship",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Department of Higher Education, A&N Administration",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Higher Education",
            "Mainland Study",
            "Scholarship",
            "Travel Allowance"
        ],
        "benefits": "Annual scholarship of ₹45,000 plus subsidized ship/air passage fare for island students pursuing approved degree courses in mainland Indian universities.",
        "eligibility_summary": "Permanent resident students of Andaman & Nicobar Islands admitted to recognized mainland institutions.",
        "eligibility": {
            "minAge": 17,
            "maxAge": 25,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "12th Marksheet",
            "Islander Certificate",
            "Admission Letter",
            "Bank Details"
        ],
        "applyLink": "https://edistrict.andaman.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "75",
        "title": "Andaman & Nicobar Tribal Health Assistance Scheme",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Directorate of Health Services, A&N Administration",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Tribal Health",
            "Medical Referral",
            "Cashless",
            "Emergency Care"
        ],
        "benefits": "100% cashless medical treatment and sponsored air-ambulance evacuation to mainland super-specialty hospitals for indigenous tribes and island residents.",
        "eligibility_summary": "Indigenous tribal residents and vulnerable BPL families of Andaman & Nicobar Islands requiring emergency tertiary medical care.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "st",
                "general",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Tribal Card / Islander Certificate",
            "Medical Referral Board Certificate",
            "Aadhaar Card"
        ],
        "applyLink": "https://dhs.andaman.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "76",
        "title": "Andaman Girl Child Protection & Welfare Scheme",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Department of Social Welfare, A&N Administration",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Girl Child",
            "Fixed Deposit",
            "Maturity Grant",
            "Empowerment"
        ],
        "benefits": "Fixed deposit of ₹30,000 opened in the name of the girl child at birth, maturing with compound interest at age 18 for graduation or vocational pursuits.",
        "eligibility_summary": "Girl children born to island resident families with annual parental income below ₹2 lakh.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 18,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "unemployed"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Birth Certificate",
            "Parent Islander Card",
            "Income Certificate",
            "Aadhaar Card"
        ],
        "applyLink": "https://edistrict.andaman.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "77",
        "title": "Andaman Port Blair Urban Shelter & Housing Assistance",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Port Blair Municipal Council (PBMC)",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Urban Housing",
            "Disaster Resilient",
            "Port Blair",
            "Pucca Home"
        ],
        "benefits": "Grant of up to ₹1.75 lakh for coastal cyclone-resilient home construction or structural repair of damaged houses in urban municipal wards.",
        "eligibility_summary": "EWS and lower income residents holding lawful municipal house site leases in Port Blair.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban"
            ]
        },
        "documents": [
            "Municipal Lease / Allotment Order",
            "Islander Certificate",
            "Income Certificate"
        ],
        "applyLink": "https://pbmc.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "78",
        "title": "Andaman Island Self-Employment Assistance Programme",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Department of Industries, A&N Administration",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Self Employment",
            "Island MSME",
            "Eco-Tourism",
            "Low Interest Loan"
        ],
        "benefits": "Composite loans up to ₹10 lakh with 25% capital subsidy for setting up micro-enterprises in eco-tourism, coconut processing, and handicraft units.",
        "eligibility_summary": "Educated unemployed youth resident in Andaman & Nicobar Islands.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 45,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "self-employed"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Educational Certificate",
            "Islander Certificate",
            "Project Report",
            "Aadhaar Card"
        ],
        "applyLink": "https://edistrict.andaman.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "79",
        "title": "Andaman Youth Vocational Skill Development Mission",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Labour & Employment Department, A&N Administration",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Vocational Training",
            "Maritime Trades",
            "Hospitality",
            "Stipend"
        ],
        "benefits": "Free 6-month certified training in maritime navigation, diving, hospitality, and IT skills with ₹3,000 monthly stipend and job placement.",
        "eligibility_summary": "Youth resident in A&N Islands between 18 and 35 years who have cleared at least 10th standard.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "10th Marksheet",
            "Aadhaar Card",
            "Employment Exchange Card"
        ],
        "applyLink": "https://edistrict.andaman.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "80",
        "title": "Andaman Senior Citizen & Destitute Pension Scheme",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Department of Social Welfare, A&N Administration",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Old Age Pension",
            "Destitute Support",
            "Direct Benefit"
        ],
        "benefits": "Monthly pension of ₹2,500 transferred directly to bank account of senior citizens aged 60+ and widows with no independent source of income.",
        "eligibility_summary": "Senior citizens aged 60+ resident in Andaman & Nicobar Islands without living earning adult sons/support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Age Proof",
            "Islander Certificate",
            "BPL Ration Card",
            "Bank Passbook"
        ],
        "applyLink": "https://edistrict.andaman.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "81",
        "title": "Andaman Island E-Vehicle & Green Mobility Grant",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Transport Department, A&N Administration",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Green Mobility",
            "Electric Auto",
            "Clean Island",
            "Subsidy"
        ],
        "benefits": "Subsidy of ₹35,000 on purchase of electric 2-wheelers and ₹75,000 on electric passenger autos to phase out fossil fuels in fragile island zones.",
        "eligibility_summary": "Residents and commercial permit holders purchasing electric vehicles registered in Andaman & Nicobar.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Islander Certificate",
            "Driving License",
            "Bank Account",
            "Vehicle Invoice"
        ],
        "applyLink": "https://transport.andaman.gov.in/",
        "baseMatchScore": 87
    },
    {
        "id": "82",
        "title": "Andaman Rooftop Solar & Micro-Grid Subsidy Scheme",
        "state": "Andaman and Nicobar Islands",
        "ministry": "Electricity Department, A&N Administration",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Andaman and Nicobar Islands",
            "State Scheme",
            "Solar Power",
            "Clean Energy",
            "Island Microgrid",
            "Subsidy"
        ],
        "benefits": "Special island subsidy of 60% on grid-connected and battery-backed rooftop solar installations up to 5 kW for residential consumers.",
        "eligibility_summary": "Domestic electricity consumers with legal land/building ownership in Andaman & Nicobar.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l",
                "8l-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "rural",
                "urban"
            ]
        },
        "documents": [
            "Electricity Connection Number",
            "Islander Certificate",
            "Bank Account"
        ],
        "applyLink": "https://vidyut.andaman.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "83",
        "title": "YSR Rythu Bharosa Scheme",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ysrrythubharosa.ap.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "84",
        "title": "Jagananna Amma Vodi",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jaganannaammavodi.ap.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "85",
        "title": "Dr. YSR Aarogyasri Scheme",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.ysraarogyasri.ap.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "86",
        "title": "YSR Cheyutha Scheme",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jaganannaammavodi.ap.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "87",
        "title": "YSR Pedalandariki Illu Housing",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://housing.ap.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "88",
        "title": "YSR Aasara Pension Scheme",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://navasakam.ap.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "89",
        "title": "YSR Vahana Mitra Scheme",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://navasakam.ap.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "90",
        "title": "Jagananna Vidya Deevena",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://navasakam.ap.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "91",
        "title": "AP Free Power for Agriculture",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://navasakam.ap.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "92",
        "title": "AP Electric Auto Subsidy Scheme",
        "state": "Andhra Pradesh",
        "ministry": "Government of Andhra Pradesh - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Andhra Pradesh",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Andhra Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://navasakam.ap.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "93",
        "title": "Chief Minister Krishi Samuh Yojana",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://agri.arunachal.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "94",
        "title": "Chief Minister Vidya Scheme",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservice.arunachal.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "95",
        "title": "Chief Minister Arogya Arunachal Yojana (CMAAY)",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://cmaay.com/",
        "baseMatchScore": 90
    },
    {
        "id": "96",
        "title": "Dulari Kanya Scheme",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservice.arunachal.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "97",
        "title": "CM Golden Jubilee Rural Housing",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservice.arunachal.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "98",
        "title": "Arunachal State Social Security Pension",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservice.arunachal.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "99",
        "title": "Deen Dayal Upadhyaya Swavalamban Yojana",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservice.arunachal.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "100",
        "title": "Arunachal Weaver Mudra Scheme",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservice.arunachal.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "101",
        "title": "CM Tourist Vehicle Scheme",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservice.arunachal.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "102",
        "title": "Arunachal Solar Lighting Drive",
        "state": "Arunachal Pradesh",
        "ministry": "Government of Arunachal Pradesh - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Arunachal Pradesh",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Arunachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservice.arunachal.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "103",
        "title": "Mukhya Mantri Krishi Sa-Sajuli Yojana",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Assam",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sewasetu.assam.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "104",
        "title": "Pragyan Bharati Free Scooty Scheme",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Assam",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sewasetu.assam.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "105",
        "title": "Atal Amrit Abhiyan / Mukhyamantri Lok Sevak Arogya",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Assam",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://atalamritabhiyan.assam.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "106",
        "title": "Orunodoi 3.0 Scheme",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Assam",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://orunodoi.assam.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "107",
        "title": "Assam PMAY Beneficiary Top-up Scheme",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Assam",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sewasetu.assam.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "108",
        "title": "Chah Bagicha Dhan Puraskar Scheme",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Assam",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sewasetu.assam.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "109",
        "title": "Assam Youth Commission Skill Scheme",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Assam",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sewasetu.assam.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "110",
        "title": "Swami Vivekananda Youth Empowerment Scheme",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Assam",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sewasetu.assam.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "111",
        "title": "Assam Free ASTC Bus Travel for Women",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Assam",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://astc.assam.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "112",
        "title": "Assam Solar Powered Tube Well Scheme",
        "state": "Assam",
        "ministry": "Government of Assam - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Assam",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Assam Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sewasetu.assam.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "113",
        "title": "Bihar Mukhyamantri Krishi Yantra Subsidy",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Bihar",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://dbtagriculture.bihar.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "114",
        "title": "Bihar Student Credit Card Scheme",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Bihar",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.7nishchay-yuvaupmission.bihar.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "115",
        "title": "Bihar Mukhyamantri Chikitsa Sahayata",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Bihar",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://serviceonline.bihar.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "116",
        "title": "Mukhyamantri Kanya Utthan Yojana",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Bihar",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://medhasoft.bih.nic.in/",
        "baseMatchScore": 91
    },
    {
        "id": "117",
        "title": "Saat Nischay - Har Ghar Pucca Makan",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Bihar",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://serviceonline.bihar.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "118",
        "title": "Mukhyamantri Vridhjan Pension Yojana",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Bihar",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://elabharthi.bih.nic.in/",
        "baseMatchScore": 93
    },
    {
        "id": "119",
        "title": "Kushal Yuva Program (KYP)",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Bihar",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://serviceonline.bihar.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "120",
        "title": "Mukhyamantri Mahila Udyami Yojana",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Bihar",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://udyami.bihar.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "121",
        "title": "Mukhyamantri Gram Parivahan Yojana",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Bihar",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://transport.bihar.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "122",
        "title": "Saat Nischay - Har Ghar Nal Ka Jal",
        "state": "Bihar",
        "ministry": "Government of Bihar - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Bihar",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Bihar Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://serviceonline.bihar.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "123",
        "title": "Chandigarh Farmer Input Assistance",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://chandigarh.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "124",
        "title": "Chandigarh Meritorious Student Higher Scholarship",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://serviceonline.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "125",
        "title": "Chandigarh Health Golden Card Scheme",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://chandigarh.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "126",
        "title": "Chandigarh Beti Padhao Grant Scheme",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://chandigarh.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "127",
        "title": "Chandigarh Urban Slum Rehabilitation Housing",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://chandigarh.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "128",
        "title": "Chandigarh Senior Citizen & Widow Pension",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://chandigarh.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "129",
        "title": "Chandigarh Youth Skill Development Mission",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://chandigarh.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "130",
        "title": "Chandigarh Self-Employment Assistance",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://chandigarh.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "131",
        "title": "Chandigarh EV Fleet Subsidy Scheme",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://chdctu.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "132",
        "title": "Chandigarh Solar City Rooftop Top-up",
        "state": "Chandigarh",
        "ministry": "Government of Chandigarh - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Chandigarh",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chandigarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://crestchd.org.in/",
        "baseMatchScore": 89
    },
    {
        "id": "133",
        "title": "Rajiv Gandhi Kisan Nyay Yojana",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://agridept.cg.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "134",
        "title": "Swami Atmanand English Medium Scholarship",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.cgstate.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "135",
        "title": "Dr. Khubchand Baghel Swasthya Sahayata",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://dkbssy.cg.nic.in/",
        "baseMatchScore": 90
    },
    {
        "id": "136",
        "title": "Mahtari Vandan Yojana",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mahtarivandan.cgstate.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "137",
        "title": "Mor Makaan Mor Aas Housing Scheme",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.cgstate.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "138",
        "title": "Mukhyamantri Pension Yojana",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.cgstate.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "139",
        "title": "Chhattisgarh Yuva Mitan Skill Challenge",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.cgstate.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "140",
        "title": "Mukhyamantri Noni Sashaktikaran Sahayata",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.cgstate.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "141",
        "title": "Chhattisgarh Gramin Parivahan Yojana",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.cgstate.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "142",
        "title": "Godhan Nyay Bio-Energy Scheme",
        "state": "Chhattisgarh",
        "ministry": "Government of Chhattisgarh - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Chhattisgarh",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Chhattisgarh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.cgstate.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "143",
        "title": "DNH & DD Farmer Seed & Tractor Subsidy",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ddd.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "144",
        "title": "UT Saraswati Higher Education Grant",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://daman.nic.in/",
        "baseMatchScore": 89
    },
    {
        "id": "145",
        "title": "Daman Diu Health Relief Card Scheme",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ddd.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "146",
        "title": "UT Mother & Child Kalyan Scheme",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ddd.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "147",
        "title": "DNH Coastal Housing Assistance",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ddd.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "148",
        "title": "UT Senior Citizen Samman Pension",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ddd.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "149",
        "title": "Daman Youth Vocational Apprenticeship",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ddd.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "150",
        "title": "UT Self-Employment Sahayata Scheme",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ddd.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "151",
        "title": "UT Electric Vehicle Incentive Drive",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ddd.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "152",
        "title": "DNH Solar Energy Mission Scheme",
        "state": "Dadra and Nagar Haveli and Daman and Diu",
        "ministry": "Government of Dadra and Nagar Haveli and Daman and Diu - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Dadra and Nagar Haveli and Daman and Diu",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Dadra and Nagar Haveli and Daman and Diu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ddd.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "153",
        "title": "Delhi Farmer Polyhouse Subsidy Scheme",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Delhi",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.delhigovt.nic.in/",
        "baseMatchScore": 88
    },
    {
        "id": "154",
        "title": "Mukhyamantri Vidyarthi Pratibha Yojana",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Delhi",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.delhigovt.nic.in/",
        "baseMatchScore": 89
    },
    {
        "id": "155",
        "title": "Delhi Arogya Kosh & Farishte Scheme",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Delhi",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://dshm.delhi.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "156",
        "title": "Delhi Ladli Scheme",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Delhi",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.delhigovt.nic.in/",
        "baseMatchScore": 91
    },
    {
        "id": "157",
        "title": "Delhi Slum In-situ Housing Scheme",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Delhi",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.delhigovt.nic.in/",
        "baseMatchScore": 92
    },
    {
        "id": "158",
        "title": "Delhi Pension Scheme for Senior Citizens",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Delhi",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.delhigovt.nic.in/",
        "baseMatchScore": 93
    },
    {
        "id": "159",
        "title": "Jai Bhim Mukhyamantri Pratibha Vikas",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Delhi",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.delhigovt.nic.in/",
        "baseMatchScore": 94
    },
    {
        "id": "160",
        "title": "Delhi Mukhyamantri Start-up Policy",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Delhi",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.delhigovt.nic.in/",
        "baseMatchScore": 95
    },
    {
        "id": "161",
        "title": "Delhi Free Pink Ticket Bus Travel Scheme",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Delhi",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "http://dtc.delhi.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "162",
        "title": "Delhi 200 Units Free Electricity & Solar Mission",
        "state": "Delhi",
        "ministry": "Government of Delhi - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Delhi",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Delhi Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ev.delhi.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "163",
        "title": "Goa Farmer Tractor & Equipment Subsidy",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Goa",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://goaonline.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "164",
        "title": "Goa Vidyaprasarak Higher Education Aid",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Goa",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://goaonline.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "165",
        "title": "Deen Dayal Swasthya Seva Yojana (DDSSY)",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Goa",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.goa.gov.in/departments/health/",
        "baseMatchScore": 90
    },
    {
        "id": "166",
        "title": "Griha Aadhar Scheme",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Goa",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://goaonline.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "167",
        "title": "Goa Rural Housing Subsidy Scheme",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Goa",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://goaonline.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "168",
        "title": "Dayanand Social Security Scheme",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Goa",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://goaonline.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "169",
        "title": "Goa Chief Minister Apprenticeship Policy",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Goa",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://goaonline.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "170",
        "title": "Goa Startup Promotion Policy Grant",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Goa",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://goaonline.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "171",
        "title": "Goa Electric Vehicle Promotion Subsidy",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Goa",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://goatransport.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "172",
        "title": "Goa Clean Rooftop Solar Subsidy",
        "state": "Goa",
        "ministry": "Government of Goa - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Goa",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Goa Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://goaonline.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "173",
        "title": "Mukhyamantri Kisan Sahay Yojana",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ikhedut.gujarat.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "174",
        "title": "Mukhyamantri Yuva Swavalamban Yojana (MYSY)",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mysy.guj.nic.in/",
        "baseMatchScore": 89
    },
    {
        "id": "175",
        "title": "MAA Amrutam / MAA Vatsalya Scheme",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.magujarat.com/",
        "baseMatchScore": 90
    },
    {
        "id": "176",
        "title": "Vhali Dikri Yojana",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.digitalgujarat.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "177",
        "title": "Dr. Ambedkar Awas Yojana",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.digitalgujarat.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "178",
        "title": "Ganga Swarupa Pension Scheme",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.digitalgujarat.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "179",
        "title": "Kaushalya - The Skill University Training",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.digitalgujarat.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "180",
        "title": "Mukhyamantri Mahila Utkarsh Yojana",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.digitalgujarat.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "181",
        "title": "Gujarat Electric Two-Wheeler Subsidy",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.digitalgujarat.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "182",
        "title": "Jyotigram Free Feeder & Solar Pump",
        "state": "Gujarat",
        "ministry": "Government of Gujarat - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Gujarat",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Gujarat Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.digitalgujarat.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "183",
        "title": "Bhavantar Bharpayee Yojana",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Haryana",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://fasal.haryana.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "184",
        "title": "Haryana Super 100 Scholarship",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Haryana",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://saralharyana.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "185",
        "title": "Chirayu Haryana Health Insurance",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Haryana",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://saralharyana.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "186",
        "title": "Mukhyamantri Vivah Shagun Yojana",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Haryana",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://saralharyana.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "187",
        "title": "Haryana Awas Navinikaran Yojana",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Haryana",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://saralharyana.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "188",
        "title": "Old Age Samman Allowance Haryana",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Haryana",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://meraparivar.haryana.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "189",
        "title": "Haryana Kaushal Rozgar Nigam (HKRN)",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Haryana",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://hkrnl.itiharyana.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "190",
        "title": "Haryana MSME Industrial Assistance",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Haryana",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://saralharyana.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "191",
        "title": "Haryana Happy Card Free Bus Mobility Scheme",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Haryana",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://hartrans.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "192",
        "title": "Haryana Manohar Jyoti Solar Home Scheme",
        "state": "Haryana",
        "ministry": "Government of Haryana - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Haryana",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Haryana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://saralharyana.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "193",
        "title": "HP Prakritik Kheti Khushhal Kisan Yojana",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://spnfhp.nic.in/",
        "baseMatchScore": 88
    },
    {
        "id": "194",
        "title": "Medha Protsahan Yojana",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.hp.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "195",
        "title": "Himcare Health Scheme",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://himcare.hp.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "196",
        "title": "Indira Gandhi Pyari Behna Sukh Samman Nidhi",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.hp.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "197",
        "title": "HP Mukhya Mantri Gramin Awas Yojana",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.hp.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "198",
        "title": "HP Sahara Yojana for Chronically Ill",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.hp.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "199",
        "title": "Mukhya Mantri Swavlamban Yojana",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.hp.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "200",
        "title": "HP Chief Minister Startup Scheme",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.hp.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "201",
        "title": "HP Electric Bus & Taxi Subsidy Scheme",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.hp.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "202",
        "title": "HP Rooftop Solar Energy Mission",
        "state": "Himachal Pradesh",
        "ministry": "Government of Himachal Pradesh - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Himachal Pradesh",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Himachal Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.hp.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "203",
        "title": "J&K High Density Orchard & Farmer Support",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jkeservices.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "204",
        "title": "Mission Youth Parvaaz Coaching Scheme",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://missionyouth.jk.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "205",
        "title": "Ayushman Bharat SEHAT J&K Golden Card",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://services.jk.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "206",
        "title": "Ladli Beti Scheme J&K",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jkeservices.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "207",
        "title": "J&K Pradhan Awas State Top-up Scheme",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jkeservices.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "208",
        "title": "J&K Social Security Integrated Pension",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jkeservices.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "209",
        "title": "Mumkin Livelihood Scheme for Youth",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://missionyouth.jk.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "210",
        "title": "Tejaswini Women Entrepreneurship Scheme",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jkeservices.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "211",
        "title": "J&K E-Rickshaw Green Mobility Grant",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jkeservices.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "212",
        "title": "J&K Solar Water Pump Incentive Scheme",
        "state": "Jammu and Kashmir",
        "ministry": "Government of Jammu and Kashmir - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Jammu and Kashmir",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jammu and Kashmir Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jkeservices.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "213",
        "title": "Mukhyamantri Krishi Ashirwad Yojana",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://agri.jharkhand.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "214",
        "title": "Guruji Student Credit Card Scheme",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jharsewa.jharkhand.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "215",
        "title": "Mukhyamantri Gambhir Bimari Upchar",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jharsewa.jharkhand.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "216",
        "title": "Jharkhand Mukhyamantri Maiyan Samman Yojana",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jharsewa.jharkhand.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "217",
        "title": "Abua Awas Yojana",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://awas.jharkhand.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "218",
        "title": "Jharkhand Sarvajan Pension Yojana",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jharsewa.jharkhand.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "219",
        "title": "Mukhyamantri Sarthi Skill Scheme",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jharsewa.jharkhand.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "220",
        "title": "Phulo Jhano Ashirwad Abhiyan",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jharsewa.jharkhand.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "221",
        "title": "Mukhyamantri Gram Parivahan Jharkhand",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jharsewa.jharkhand.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "222",
        "title": "Jharkhand Free 125 Units Electricity Scheme",
        "state": "Jharkhand",
        "ministry": "Government of Jharkhand - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Jharkhand",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Jharkhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jharsewa.jharkhand.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "223",
        "title": "Raitha Siri & Krishi Bhagya Scheme",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://raitamitra.karnataka.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "224",
        "title": "Vidyasiri Scholarship Scheme",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sevasindhugs.karnataka.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "225",
        "title": "Arogya Karnataka Health Scheme",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sevasindhugs.karnataka.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "226",
        "title": "Gruha Lakshmi Scheme",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sevasindhugs.karnataka.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "227",
        "title": "Basava Vasathi Yojana",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sevasindhugs.karnataka.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "228",
        "title": "Sandhya Suraksha Pension Scheme",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sevasindhugs.karnataka.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "229",
        "title": "Yuva Nidhi Scheme",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sevasindhugs.karnataka.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "230",
        "title": "Karnataka Startup Seed Fund (Idea2PoC)",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sevasindhugs.karnataka.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "231",
        "title": "Shakti Scheme (Free Bus Travel for Women)",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ksrtc.in/",
        "baseMatchScore": 88
    },
    {
        "id": "232",
        "title": "Gruha Jyothi Free 200 Units Power",
        "state": "Karnataka",
        "ministry": "Government of Karnataka - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Karnataka",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Karnataka Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sevasindhugs.karnataka.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "233",
        "title": "Subhiksha Keralam Agricultural Scheme",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Kerala",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.kerala.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "234",
        "title": "Vidyakiranam Free Laptop & Learning Aid",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Kerala",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.kerala.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "235",
        "title": "Karunya Arogya Suraksha Padhathi (KASP)",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Kerala",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sha.kerala.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "236",
        "title": "Snehasparsham & She-Pad Scheme",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Kerala",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.kerala.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "237",
        "title": "Life Mission Affordable Housing",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Kerala",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lifemission.kerala.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "238",
        "title": "Aaswasakiranam Caregiver Pension",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Kerala",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.kerala.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "239",
        "title": "Kerala Knowledge Economy Skill Mission",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Kerala",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.kerala.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "240",
        "title": "Kudumbashree Micro-Enterprise Sahayata",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Kerala",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.kudumbashree.org/",
        "baseMatchScore": 95
    },
    {
        "id": "241",
        "title": "Kerala KSRTC Concessional Travel Scheme",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Kerala",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.kerala.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "242",
        "title": "K-FON Internet & Soura Rooftop Solar",
        "state": "Kerala",
        "ministry": "Government of Kerala - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Kerala",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Kerala Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.kerala.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "243",
        "title": "Ladakh Greenhouse Vegetable Cultivation Subsidy",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://leh.nic.in/",
        "baseMatchScore": 88
    },
    {
        "id": "244",
        "title": "Ladakh Rewa Student Scholarship Scheme",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://kargil.nic.in/",
        "baseMatchScore": 89
    },
    {
        "id": "245",
        "title": "Ladakh Hill Development Council Health Aid",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ladakh.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "246",
        "title": "Ladakh Women Livelihood Samman",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ladakh.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "247",
        "title": "Ladakh Solar Passive Warm Housing Scheme",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ladakh.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "248",
        "title": "Ladakh Destitute & Senior Pension",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ladakh.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "249",
        "title": "Ladakh Youth Skill Challenge Scheme",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ladakh.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "250",
        "title": "Ladakh Pashmina Wool Artisan Grant",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ladakh.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "251",
        "title": "Ladakh Electric Mountain Transport Grant",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ladakh.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "252",
        "title": "Ladakh Off-Grid Solar Micro-Grid Scheme",
        "state": "Ladakh",
        "ministry": "Government of Ladakh - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Ladakh",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Ladakh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ladakh.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "253",
        "title": "Lakshadweep Tuna Fishermen Marine Subsidy",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "254",
        "title": "Lakshadweep Island-Mainland Scholarship",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "255",
        "title": "Lakshadweep Tele-Health Referral Care",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/service/",
        "baseMatchScore": 90
    },
    {
        "id": "256",
        "title": "Lakshadweep Island Mother Care Scheme",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "257",
        "title": "Lakshadweep Coastal Island Shelter Grant",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "258",
        "title": "Lakshadweep Senior Citizen Pension",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "259",
        "title": "Lakshadweep Marine Vocational Apprentice",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "260",
        "title": "Lakshadweep Seaweed & Coconut Enterprise",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "261",
        "title": "Lakshadweep Inter-Island Subsidized Boat Travel",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "262",
        "title": "Lakshadweep Solar Power & RO Desalination",
        "state": "Lakshadweep",
        "ministry": "Government of Lakshadweep - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Lakshadweep",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Lakshadweep Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://lakshadweep.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "263",
        "title": "Bhavantar Bhugtan Yojana",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mpedistrict.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "264",
        "title": "Mukhyamantri Medhavi Vidyarthi Yojana",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mpedistrict.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "265",
        "title": "Mukhyamantri Jan Kalyan Sambal 2.0",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://samagra.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "266",
        "title": "Mukhyamantri Ladli Behna Yojana",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://cmladlibahna.mp.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "267",
        "title": "Mukhyamantri Gramin Awas Yojana",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mpedistrict.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "268",
        "title": "MP Mukhyamantri Kanya Vivah & Pension",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://samagra.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "269",
        "title": "Mukhyamantri Seekho Kamao Yojana",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mmsky.mp.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "270",
        "title": "Mukhyamantri Udyam Kranti Yojana",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mpedistrict.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "271",
        "title": "MP Atal City Bus Mobility Scheme",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mpedistrict.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "272",
        "title": "Mukhyamantri Solar Pump MP",
        "state": "Madhya Pradesh",
        "ministry": "Government of Madhya Pradesh - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Madhya Pradesh",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Madhya Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mpedistrict.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "273",
        "title": "Namo Shetkari Mahasanman Nidhi",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://krishi.maharashtra.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "274",
        "title": "Savitribai Phule Scholarship Scheme",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://aaplesarkar.mahaonline.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "275",
        "title": "Mahatma Jyotirao Phule Jan Arogya (MJPJAY)",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.jeevandayee.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "276",
        "title": "Majhi Ladki Bahin Yojana",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ladkibahin.maharashtra.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "277",
        "title": "Ramai Awas Yojana",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://aaplesarkar.mahaonline.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "278",
        "title": "Sanjay Gandhi Niradhar Anudan Yojana",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://aaplesarkar.mahaonline.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "279",
        "title": "Pramod Mahajan Skill & Entrepreneurship",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://aaplesarkar.mahaonline.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "280",
        "title": "Maharashtra Chief Minister Fellowship",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://aaplesarkar.mahaonline.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "281",
        "title": "Maharashtra EV Policy Bus & Auto Subsidy",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://aaplesarkar.mahaonline.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "282",
        "title": "Mahakrishi Solar Feeder Mission",
        "state": "Maharashtra",
        "ministry": "Government of Maharashtra - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Maharashtra",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Maharashtra Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://aaplesarkar.mahaonline.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "283",
        "title": "Manipur Loumi Shinmi Farmer Scheme",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Manipur",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservicesmanipur.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "284",
        "title": "School Fagathansi Student Mission",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Manipur",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservicesmanipur.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "285",
        "title": "CM-gi Hakshelgi Tengbang (CMHT)",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Manipur",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://cmhtmanipur.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "286",
        "title": "Manipur Women Weavers Grant",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Manipur",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservicesmanipur.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "287",
        "title": "Manipur Rural Housing Assistance",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Manipur",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservicesmanipur.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "288",
        "title": "Manipur Destitute & Widow Pension",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Manipur",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservicesmanipur.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "289",
        "title": "StartUp Manipur Skill & Innovation",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Manipur",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservicesmanipur.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "290",
        "title": "Manipur Micro Enterprise Sahayata",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Manipur",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://startupmanipur.in/",
        "baseMatchScore": 95
    },
    {
        "id": "291",
        "title": "Manipur Public Transport Mobility Grant",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Manipur",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservicesmanipur.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "292",
        "title": "Manipur Organic Solar Processing Unit",
        "state": "Manipur",
        "ministry": "Government of Manipur - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Manipur",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Manipur Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservicesmanipur.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "293",
        "title": "Meghalaya FOCUS Agricultural Scheme",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://megedistrict.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "294",
        "title": "Meghalaya Early Childhood Education Grant",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://megedistrict.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "295",
        "title": "Megha Health Insurance Scheme (MHIS)",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mhis.org.in/",
        "baseMatchScore": 90
    },
    {
        "id": "296",
        "title": "Meghalaya MOTHER Initiative",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://megedistrict.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "297",
        "title": "Meghalaya Rural Affordable Housing",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://megedistrict.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "298",
        "title": "Meghalaya Social Assistance Pension",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://megedistrict.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "299",
        "title": "Chief Minister Youth Development Scheme",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://megedistrict.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "300",
        "title": "CM-ELEVATE Entrepreneurship Scheme",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://cmelevate.in/",
        "baseMatchScore": 95
    },
    {
        "id": "301",
        "title": "Meghalaya Shared Mobility Grant",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://megedistrict.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "302",
        "title": "Green Meghalaya Solar Water Mission",
        "state": "Meghalaya",
        "ministry": "Government of Meghalaya - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Meghalaya",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Meghalaya Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://megedistrict.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "303",
        "title": "Mizoram SEDP Agriculture Grant",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://msegs.mizoram.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "304",
        "title": "Mizoram Student Scholarship Top-up",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://msegs.mizoram.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "305",
        "title": "Mizoram State Health Care Scheme",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mshcs.mizoram.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "306",
        "title": "Mizoram Women Self-Help Livelihood",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://msegs.mizoram.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "307",
        "title": "Mizoram Rural Housing Subsidy",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://msegs.mizoram.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "308",
        "title": "Mizoram Old Age Samman Pension",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://msegs.mizoram.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "309",
        "title": "Mizo Youth Employment & Skill Mission",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://msegs.mizoram.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "310",
        "title": "Mizoram Bamboo & Micro Enterprise",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://msegs.mizoram.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "311",
        "title": "Mizoram Hill Transport Subsidy",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://msegs.mizoram.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "312",
        "title": "Mizoram Clean Solar Home Scheme",
        "state": "Mizoram",
        "ministry": "Government of Mizoram - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Mizoram",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Mizoram Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://msegs.mizoram.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "313",
        "title": "Nagaland Coffee & Cardamom Mission",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.nagaland.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "314",
        "title": "CM Scholarship for Meritorious Students",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.nagaland.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "315",
        "title": "Chief Minister’s Health Insurance Scheme (CMHIS)",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://cmhis.nagaland.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "316",
        "title": "Nagaland Mother & Child Nutrition Grant",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.nagaland.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "317",
        "title": "Nagaland Rural Housing Construction Aid",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.nagaland.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "318",
        "title": "Nagaland State Old Age Pension",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.nagaland.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "319",
        "title": "CM Micro Finance Initiative (CMMFI)",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.nagaland.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "320",
        "title": "Nagaland Handloom & Handicraft Subsidy",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.nagaland.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "321",
        "title": "Nagaland Hill Commuter Transport Scheme",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.nagaland.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "322",
        "title": "Nagaland Springshed & Solar Water Mission",
        "state": "Nagaland",
        "ministry": "Government of Nagaland - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Nagaland",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Nagaland Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.nagaland.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "323",
        "title": "KALIA Scheme (Krushak Assistance)",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Odisha",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://kalia.odisha.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "324",
        "title": "Kalia Chhatra Brutti Scholarship",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Odisha",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://kalia.odisha.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "325",
        "title": "Biju Swasthya Kalyan Yojana (BSKY)",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Odisha",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://bsky.odisha.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "326",
        "title": "Mission Shakti Women Loan Scheme",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Odisha",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://missionshakti.odisha.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "327",
        "title": "Biju Pucca Ghar Yojana",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Odisha",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.odisha.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "328",
        "title": "Madhu Babu Pension Yojana",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Odisha",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.odisha.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "329",
        "title": "Odisha Sudakshya Technical Skill Scheme",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Odisha",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.odisha.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "330",
        "title": "Odisha Startup Seed Grant Initiative",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Odisha",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.odisha.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "331",
        "title": "Odisha Mo Bus Concessional Travel",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Odisha",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.odisha.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "332",
        "title": "Odisha Soura Jalanidhi Solar Pump",
        "state": "Odisha",
        "ministry": "Government of Odisha - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Odisha",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Odisha Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.odisha.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "333",
        "title": "Puducherry Farmers Crop Loss Relief",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.py.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "334",
        "title": "Puducherry Student Medical & Engg Grant",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.py.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "335",
        "title": "Puducherry Cashless Health Card Scheme",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.py.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "336",
        "title": "Puducherry Monthly Assistance for Women",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.py.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "337",
        "title": "Puducherry Perunthalaivar Kamarajar Housing",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.py.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "338",
        "title": "Puducherry Destitute & Widow Pension",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://socwelfare.py.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "339",
        "title": "Puducherry Youth Skill Apprenticeship",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.py.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "340",
        "title": "Puducherry Micro MSME Capital Grant",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.py.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "341",
        "title": "Puducherry Free Student Bus Travel",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.py.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "342",
        "title": "Puducherry Solar City Rooftop Drive",
        "state": "Puducherry",
        "ministry": "Government of Puducherry - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Puducherry",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Puducherry Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.py.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "343",
        "title": "Punjab Kheti Baadi Crop Support",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Punjab",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://connect.punjab.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "344",
        "title": "Mai Bhago Istri Vidya Scheme",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Punjab",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://connect.punjab.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "345",
        "title": "Mukh Mantri Sehat Bima Yojana",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Punjab",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sha.punjab.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "346",
        "title": "Punjab Ashirwad / Shagun Scheme",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Punjab",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://connect.punjab.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "347",
        "title": "Punjab Shehri Awas Yojana",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Punjab",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://connect.punjab.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "348",
        "title": "Punjab Old Age Social Security Pension",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Punjab",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://connect.punjab.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "349",
        "title": "Ghar Ghar Rozgar Punjab Mission",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Punjab",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://pgrkam.com/",
        "baseMatchScore": 94
    },
    {
        "id": "350",
        "title": "Punjab Startup Seed Venture Capital",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Punjab",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://connect.punjab.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "351",
        "title": "Punjab Free Bus Travel for Women",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Punjab",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://connect.punjab.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "352",
        "title": "Punjab 300 Units Free Electricity Scheme",
        "state": "Punjab",
        "ministry": "Government of Punjab - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Punjab",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Punjab Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://connect.punjab.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "353",
        "title": "Mukhyamantri Kisan Mitra Urja Yojana",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sso.rajasthan.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "354",
        "title": "Mukhyamantri Anuprati Coaching Scheme",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sje.rajasthan.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "355",
        "title": "Mukhyamantri Chiranjeevi Swasthya Bima",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://chiranjeevi.rajasthan.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "356",
        "title": "Indira Gandhi Smartphone Scheme",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sso.rajasthan.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "357",
        "title": "Mukhyamantri Jan Awas Yojana",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sso.rajasthan.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "358",
        "title": "Mukhyamantri Vridhjan Samman Pension",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://jansoochna.rajasthan.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "359",
        "title": "Mukhyamantri Yuva Sambal Yojana",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sso.rajasthan.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "360",
        "title": "Rajasthan Bima Pashudhan & MSME Grant",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sso.rajasthan.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "361",
        "title": "Rajasthan Free Bus Travel for Women & Students",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sso.rajasthan.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "362",
        "title": "Rajasthan Rooftop Solar Muft Bijli",
        "state": "Rajasthan",
        "ministry": "Government of Rajasthan - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Rajasthan",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Rajasthan Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sso.rajasthan.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "363",
        "title": "Mukhya Mantri Krishi Atmanirbhar Yojana",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.sikkim.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "364",
        "title": "Chief Minister Meritorious Scholarship",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.sikkim.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "365",
        "title": "Sikkim Swasthya Bima Yojana",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.sikkim.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "366",
        "title": "Sikkim Aama Yojana for Mothers",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.sikkim.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "367",
        "title": "Sikkim Garib Awas Yojana (SGAY)",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.sikkim.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "368",
        "title": "Sikkim Social Security Samman Pension",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sikkim.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "369",
        "title": "Sikkim Skilled Youth Startup Scheme",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.sikkim.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "370",
        "title": "Sikkim Organic Value Chain Microgrant",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.sikkim.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "371",
        "title": "Sikkim Eco-Friendly Transport Grant",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.sikkim.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "372",
        "title": "Sikkim Green Clean Micro Hydro & Solar",
        "state": "Sikkim",
        "ministry": "Government of Sikkim - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Sikkim",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Sikkim Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.sikkim.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "373",
        "title": "Uzhavar Pathukappu Thittam",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.tnesevai.tn.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "374",
        "title": "Pudhumai Penn & Tamil Pudhalvan Scheme",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.pudhumaipenn.tn.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "375",
        "title": "Chief Minister Comprehensive Health Insurance (CMCHIS)",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.cmchistn.com/",
        "baseMatchScore": 90
    },
    {
        "id": "376",
        "title": "Kalaignar Magalir Urimai Thogai",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://kmut.tn.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "377",
        "title": "Kalaignar Kanavu Illam Housing",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.tnesevai.tn.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "378",
        "title": "Tamil Nadu Social Security Pension Scheme",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.tnesevai.tn.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "379",
        "title": "Naan Mudhalvan Skill & Tech Scheme",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://naanmudhalvan.tn.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "380",
        "title": "Tamil Nadu Startup Seed Grant (TANSEED)",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.tnesevai.tn.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "381",
        "title": "Vidiyal Payanam Free Bus Travel for Women",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.tnesevai.tn.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "382",
        "title": "Tamil Nadu 100 Units Free Power & Solar Roof",
        "state": "Tamil Nadu",
        "ministry": "Government of Tamil Nadu - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Tamil Nadu",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tamil Nadu Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://www.tnesevai.tn.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "383",
        "title": "Rythu Bandhu Investment Support",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Telangana",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://rythubandhu.telangana.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "384",
        "title": "Telangana Post-Matric Overseas Scholarship",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Telangana",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://tg.meeseva.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "385",
        "title": "Aarogyasri Health Insurance Telangana",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Telangana",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://aarogyasri.telangana.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "386",
        "title": "Kalyana Lakshmi / Shaadi Mubarak",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Telangana",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://tg.meeseva.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "387",
        "title": "Telangana 2BHK Dignity Housing Scheme",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Telangana",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://tg.meeseva.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "388",
        "title": "Aasara Pension Scheme Telangana",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Telangana",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://tg.meeseva.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "389",
        "title": "Telangana Skill Development & Task Mission",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Telangana",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://tg.meeseva.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "390",
        "title": "Dalit Bandhu Financial Grant",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Telangana",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://tg.meeseva.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "391",
        "title": "Mahalakshmi Free RTC Bus Travel for Women",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Telangana",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://tg.meeseva.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "392",
        "title": "Gruha Jyothi Free 200 Units Electricity",
        "state": "Telangana",
        "ministry": "Government of Telangana - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Telangana",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Telangana Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://tg.meeseva.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "393",
        "title": "Mukhyamantri Chaa Sramik Kalyan Prakalpa",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Tripura",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.tripura.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "394",
        "title": "Tripura Mukhyamantri Kanya Atmanirbhar",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Tripura",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.tripura.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "395",
        "title": "Ayushman Tripura Health Insurance",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Tripura",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://tripura.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "396",
        "title": "Mukhyamantri Matru Pushti Uphaar",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Tripura",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.tripura.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "397",
        "title": "Tripura Rural Housing Grant Scheme",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Tripura",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.tripura.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "398",
        "title": "Tripura Special Social Security Pension",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Tripura",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.tripura.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "399",
        "title": "Tripura IT & Drone Fellowship Scheme",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Tripura",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.tripura.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "400",
        "title": "Tripura Bamboo & Rubber Micro-Enterprise",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Tripura",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.tripura.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "401",
        "title": "Tripura Subsidized Commuter Transport",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Tripura",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.tripura.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "402",
        "title": "Tripura Clean Solar Home Light Mission",
        "state": "Tripura",
        "ministry": "Government of Tripura - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Tripura",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Tripura Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.tripura.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "403",
        "title": "UP Kisan Karz Mafi & Input Sahayata",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.up.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "404",
        "title": "UP Abhyudaya Free Coaching Scheme",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://abhyuday.up.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "405",
        "title": "UP Mukhyamantri Jan Arogya Yojana",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.up.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "406",
        "title": "Mukhyamantri Kanya Sumangala Yojana",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://mksy.up.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "407",
        "title": "UP Mukhyamantri Awas Yojana (Gramin)",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.up.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "408",
        "title": "UP Vridha & Divyang Pension Scheme",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://sspy-up.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "409",
        "title": "UP Free Tablet & Smartphone Scheme",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.up.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "410",
        "title": "UP Vishwakarma Shram Samman Yojana",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://diupmsme.upsdc.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "411",
        "title": "UP Electric City Bus Transit Subsidy",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.up.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "412",
        "title": "UP Solar Rooftop & Tubewell Power Grant",
        "state": "Uttar Pradesh",
        "ministry": "Government of Uttar Pradesh - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Uttar Pradesh",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttar Pradesh Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.up.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "413",
        "title": "Uttarakhand Trout & Organic Farming Subsidy",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservices.uk.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "414",
        "title": "Mukhyamantri Pratibha Protsahan Scheme",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservices.uk.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "415",
        "title": "Uttarakhand Atal Ayushman Yojana",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://ayushmanuttarakhand.org/",
        "baseMatchScore": 90
    },
    {
        "id": "416",
        "title": "Gaura Devi Kanya Dhan Scheme",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservices.uk.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "417",
        "title": "Uttarakhand Homestay Development Scheme",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservices.uk.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "418",
        "title": "Uttarakhand Vridha Awas & Social Pension",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://socialwelfare.uk.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "419",
        "title": "Mukhyamantri Swarojgar Yojana Uttarakhand",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservices.uk.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "420",
        "title": "Uttarakhand Hill Industrial Incentive",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservices.uk.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "421",
        "title": "Uttarakhand Concessional Mountain Bus Transit",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservices.uk.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "422",
        "title": "Mukhyamantri Saur Swarojgar Yojana",
        "state": "Uttarakhand",
        "ministry": "Government of Uttarakhand - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "Uttarakhand",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "Uttarakhand Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://eservices.uk.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "423",
        "title": "Krishak Bandhu Scheme",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Agriculture & Farmers Welfare",
        "type": "state",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Agriculture",
            "Farmer Support",
            "Input Subsidy",
            "State Scheme"
        ],
        "benefits": "Direct financial support of ₹10,000 per year for procurement of quality seeds, fertilizers, and farm equipment inputs.",
        "eligibility_summary": "Small and marginal farmers holding verified land records in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://krishakbandhu.wb.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "424",
        "title": "Sabuj Sathi Free Bicycle & Kanyashree K1/K2",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Higher & School Education",
        "type": "state",
        "category": "Education & Learning",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Scholarship",
            "Education Aid",
            "Students",
            "State Scheme"
        ],
        "benefits": "Full tuition reimbursement, annual book grant of ₹15,000, and free competitive exam coaching for merit students.",
        "eligibility_summary": "Students belonging to economically weaker families pursuing secondary or higher education.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 28,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://wbkanyashree.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "425",
        "title": "Swasthya Sathi Cashless Health Cover",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Health & Family Welfare",
        "type": "state",
        "category": "Health & Wellness",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Health Insurance",
            "Cashless Hospitalization",
            "State Scheme"
        ],
        "benefits": "Cashless secondary and tertiary medical treatments up to ₹5 lakh per family per year in empannelled hospitals.",
        "eligibility_summary": "All low and middle income resident families holding state ration card or family ID.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://swasthyasathi.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "426",
        "title": "Lakshmir Bhandar Financial Scheme",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Women & Child Development",
        "type": "state",
        "category": "Women & Child",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Women Empowerment",
            "Direct Cash Transfer",
            "Girl Child",
            "State Scheme"
        ],
        "benefits": "Monthly direct bank transfer of ₹1,200 to ₹1,500 to women heads of family to ensure dignity and financial self-reliance.",
        "eligibility_summary": "Adult women residents aged 18 to 60 years belonging to low-income households.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "homemaker",
                "unemployed",
                "farmer"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://wbkanyashree.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "427",
        "title": "Gitanjali Housing Scheme",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Housing & Urban Development",
        "type": "state",
        "category": "Housing & Shelter",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Housing",
            "Pucca House",
            "Urban Poor",
            "State Scheme"
        ],
        "benefits": "Financial grant of ₹1.50 lakh for construction of disaster-resilient pucca house with free sanitation connection.",
        "eligibility_summary": "Houseless families or those residing in kutcha thatched dwellings holding state domicile.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 80,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "unemployed",
                "self-employed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://wb.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "428",
        "title": "Jai Bangla Pension Scheme",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Social Welfare",
        "type": "state",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Social Security",
            "Pension",
            "Senior Citizens",
            "State Scheme"
        ],
        "benefits": "Monthly financial pension of ₹1,500 to ₹2,500 directly paid to senior citizens, widows, and persons with disabilities.",
        "eligibility_summary": "Resident senior citizens aged 60+, widows, and disabled citizens without family support.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "retired",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://edistrict.wb.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "429",
        "title": "Yuvashree Unemployment Youth Mission",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Skill Development & Employment",
        "type": "state",
        "category": "Skills & Employment",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Skill Training",
            "Youth Employment",
            "Apprenticeship",
            "State Scheme"
        ],
        "benefits": "Free advanced industrial skill training with monthly stipend of ₹3,500 and 100% placement support in local industries.",
        "eligibility_summary": "Unemployed youth aged 18 to 35 years who have completed 8th/10th/12th or ITI/Diploma.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 35,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "student"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://wb.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "430",
        "title": "Taruner Swapno Tab Scheme",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Commerce & MSME",
        "type": "state",
        "category": "Business & Entrepreneurship",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Startup",
            "MSME Loan",
            "Subsidy",
            "State Scheme"
        ],
        "benefits": "Up to 35% margin money subsidy on bank loans up to ₹25 lakh for establishing micro-enterprises and service units.",
        "eligibility_summary": "Budding entrepreneurs and artisans seeking to launch new manufacturing or service units.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://wb.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "431",
        "title": "Kolkata Green Transport Subsidy Scheme",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Transport",
        "type": "state",
        "category": "Transport & Infrastructure",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Transport",
            "Free Mobility",
            "EV Subsidy",
            "State Scheme"
        ],
        "benefits": "Free or 50% subsidized travel for women, students, and seniors in state transport buses, plus EV purchase subsidy.",
        "eligibility_summary": "All resident citizens, students, and commuters traveling within state territory.",
        "eligibility": {
            "minAge": 5,
            "maxAge": 100,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student",
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://wb.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "432",
        "title": "West Bengal Hasir Rekha Free Electricity",
        "state": "West Bengal",
        "ministry": "Government of West Bengal - Department of Energy & Water Resources",
        "type": "state",
        "category": "Utility & Sanitation",
        "tags": [
            "West Bengal",
            "State Scheme",
            "Clean Energy",
            "Solar Subsidy",
            "Water Supply",
            "State Scheme"
        ],
        "benefits": "Free 150-200 units domestic electricity or up to 50% state top-up subsidy on domestic solar rooftop plants.",
        "eligibility_summary": "Domestic residential power consumers possessing valid electricity meter connection in the state.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l",
                "5l-8l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "unemployed",
                "homemaker",
                "retired"
            ],
            "area": [
                "urban",
                "rural"
            ]
        },
        "documents": [
            "Aadhaar Card",
            "West Bengal Domicile / Resident Certificate",
            "Bank Passbook",
            "Income Certificate"
        ],
        "applyLink": "https://wb.gov.in/",
        "baseMatchScore": 89
    }
];

// API base URL — auto-detects if backend is running
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? `http://${window.location.hostname}:5000/api`
    : '/api';

const STATES = [
    { name: "Andaman and Nicobar Islands", icon: "fas fa-map-marker-alt",     count: 42,  color: "#0891b2" },
    { name: "Andhra Pradesh",             icon: "fas fa-map-marker-alt",     count: 268, color: "#1e40af" },
    { name: "Arunachal Pradesh",          icon: "fas fa-map-marker-alt",     count: 86,  color: "#059669" },
    { name: "Assam",                      icon: "fas fa-map-marker-alt",     count: 154, color: "#0d9488" },
    { name: "Bihar",                      icon: "fas fa-map-marker-alt",     count: 197, color: "#b91c1c" },
    { name: "Chandigarh",                 icon: "fas fa-map-marker-alt",     count: 68,  color: "#4f46e5" },
    { name: "Chhattisgarh",               icon: "fas fa-map-marker-alt",     count: 164, color: "#b45309" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", icon: "fas fa-map-marker-alt", count: 39, color: "#c2410c" },
    { name: "Delhi",                      icon: "fas fa-map-marker-alt",     count: 184, color: "#0369a1" },
    { name: "Goa",                        icon: "fas fa-map-marker-alt",     count: 92,  color: "#0284c7" },
    { name: "Gujarat",                    icon: "fas fa-map-marker-alt",     count: 298, color: "#0d9488" },
    { name: "Haryana",                    icon: "fas fa-map-marker-alt",     count: 176, color: "#166534" },
    { name: "Himachal Pradesh",           icon: "fas fa-map-marker-alt",     count: 132, color: "#2563eb" },
    { name: "Jammu and Kashmir",          icon: "fas fa-map-marker-alt",     count: 145, color: "#7c3aed" },
    { name: "Jharkhand",                  icon: "fas fa-map-marker-alt",     count: 158, color: "#d97706" },
    { name: "Karnataka",                  icon: "fas fa-map-marker-alt",     count: 328, color: "#7c3aed" },
    { name: "Kerala",                     icon: "fas fa-map-marker-alt",     count: 254, color: "#be185d" },
    { name: "Ladakh",                     icon: "fas fa-map-marker-alt",     count: 37,  color: "#0891b2" },
    { name: "Lakshadweep",                icon: "fas fa-map-marker-alt",     count: 29,  color: "#059669" },
    { name: "Madhya Pradesh",             icon: "fas fa-map-marker-alt",     count: 275, color: "#166534" },
    { name: "Maharashtra",                icon: "fas fa-map-marker-alt",     count: 387, color: "#0369a1" },
    { name: "Manipur",                    icon: "fas fa-map-marker-alt",     count: 74,  color: "#dc2626" },
    { name: "Meghalaya",                  icon: "fas fa-map-marker-alt",     count: 69,  color: "#059669" },
    { name: "Mizoram",                    icon: "fas fa-map-marker-alt",     count: 61,  color: "#d97706" },
    { name: "Nagaland",                   icon: "fas fa-map-marker-alt",     count: 58,  color: "#7c3aed" },
    { name: "Odisha",                     icon: "fas fa-map-marker-alt",     count: 215, color: "#c2410c" },
    { name: "Puducherry",                 icon: "fas fa-map-marker-alt",     count: 53,  color: "#4f46e5" },
    { name: "Punjab",                     icon: "fas fa-map-marker-alt",     count: 231, color: "#92400e" },
    { name: "Rajasthan",                  icon: "fas fa-map-marker-alt",     count: 354, color: "#b45309" },
    { name: "Sikkim",                     icon: "fas fa-map-marker-alt",     count: 52,  color: "#0d9488" },
    { name: "Tamil Nadu",                 icon: "fas fa-map-marker-alt",     count: 341, color: "#047857" },
    { name: "Telangana",                  icon: "fas fa-map-marker-alt",     count: 218, color: "#dc2626" },
    { name: "Tripura",                    icon: "fas fa-map-marker-alt",     count: 77,  color: "#2563eb" },
    { name: "Uttar Pradesh",              icon: "fas fa-map-marker-alt",     count: 412, color: "#b91c1c" },
    { name: "Uttarakhand",                icon: "fas fa-map-marker-alt",     count: 148, color: "#0284c7" },
    { name: "West Bengal",                icon: "fas fa-map-marker-alt",     count: 303, color: "#c2410c" }
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

// Export for use in other modules
window.AppData = { CATEGORIES, STATES, MINISTRIES, FAQS, FORM_STEPS, SAMPLE_SCHEMES, API_BASE };
