// Batch of schemes for:
// - MSME: 22 schemes
// - Agriculture and Farmers Welfare: 18 schemes
// - Textiles: 17 schemes
// - Culture: 13 schemes
// - Electronics and Information Technology: 13 schemes
// - Home Affairs: 12 schemes
// - Youth Affairs & Sports: 12 schemes
// - Defence: 10 schemes
// Total = 117 schemes

const middleMinistriesSchemes = [
    {
        "id": "msme-vishwakarma",
        "title": "PM Vishwakarma Scheme for Traditional Artisans and Craftspeople",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "PM Vishwakarma",
            "Traditional Artisans",
            "Tool-kit Grant",
            "Collateral Free Loan"
        ],
        "benefits": "PM Vishwakarma Certificate & ID, basic & advanced skilling with ₹500/day stipend, ₹15,000 tool-kit incentive, and collateral-free enterprise loan up to ₹3 lakh at 5% interest.",
        "eligibility_summary": "Artisans engaged in 18 traditional family trades (carpenters, blacksmiths, potters, cobblers, tailors, etc.) aged 18+.",
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
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://pmvishwakarma.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "msme-cgtmse",
        "title": "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "CGTMSE",
            "Collateral Free",
            "Bank Loan",
            "MSME Credit Guarantee"
        ],
        "benefits": "Guarantees bank credit facilities up to ₹5 crore (term loan and working capital) without requiring third-party guarantee or collateral security.",
        "eligibility_summary": "New and existing Micro and Small Enterprises in manufacturing and services sectors.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://www.cgtmse.in/",
        "baseMatchScore": 89
    },
    {
        "id": "msme-pmegp",
        "title": "Prime Minister’s Employment Generation Programme (PMEGP)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PMEGP",
            "KVIC",
            "Margin Money Subsidy",
            "Bank Finance",
            "New Business"
        ],
        "benefits": "Bank-financed projects up to ₹50 lakh (manufacturing) and ₹20 lakh (services) with margin money capital subsidy of 15% to 35% deposited by government.",
        "eligibility_summary": "Any individual above 18 years of age with at least 8th standard pass for projects above ₹10 lakh.",
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
            ]
        },
        "applyLink": "https://www.kviconline.gov.in/pmegp/",
        "baseMatchScore": 91
    },
    {
        "id": "msme-sfurti",
        "title": "Scheme of Fund for Regeneration of Traditional Industries (SFURTI)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "SFURTI",
            "Traditional Cluster",
            "Artisans",
            "Common Facility Centre"
        ],
        "benefits": "Financial grant up to ₹2.5 crore for regular clusters (up to 500 artisans) and ₹5 crore for major clusters to build Common Facility Centres and modern packaging lines.",
        "eligibility_summary": "Artisans, rural entrepreneurs, cooperatives, and NGOs organizing traditional artisan clusters.",
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
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://sfurti.msme.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "msme-mse-cdp",
        "title": "Micro & Small Enterprises Cluster Development Programme (MSE-CDP)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "MSE-CDP",
            "Industrial Cluster",
            "Testing Lab",
            "Infrastructure Grant"
        ],
        "benefits": "Central grant up to 70% (max ₹30 crore) for setting up Common Facility Centres (CFCs) and up to 60% (max ₹15 crore) for infrastructure development in industrial estates.",
        "eligibility_summary": "Associations of Micro and Small Enterprises and state infrastructure agencies.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://cluster.msme.gov.in/",
        "baseMatchScore": 75
    },
    {
        "id": "msme-aspire",
        "title": "ASPIRE – Scheme for Promotion of Innovation, Rural Industry and Entrepreneurship",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "ASPIRE",
            "LBI",
            "Rural Incubation",
            "Agri-Business"
        ],
        "benefits": "100% financial grant up to ₹1 crore to establish Livelihood Business Incubators (LBIs) and ₹1 crore for Technology Business Incubators in agro-rural industries.",
        "eligibility_summary": "Rural youth, aspiring entrepreneurs, and technical institutes setting up agro-processing incubators.",
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
                "student",
                "self-employed"
            ]
        },
        "applyLink": "https://aspire.msme.gov.in/",
        "baseMatchScore": 81
    },
    {
        "id": "msme-zed-scheme",
        "title": "MSME Champions – Financial Support in ZED Certification Scheme",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "ZED Certification",
            "Zero Defect",
            "Clean Energy",
            "Quality Subsidy"
        ],
        "benefits": "80% subsidy for micro, 60% for small, and 50% for medium enterprises on ZED certification cost, plus ₹5 lakh grant for handholding and ₹3 lakh for tech upgrades.",
        "eligibility_summary": "All manufacturing MSMEs registered on the Udyam portal.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://zed.msme.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "msme-lean",
        "title": "MSME Champions – Lean Manufacturing Competitiveness Scheme",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Lean Manufacturing",
            "5S",
            "Kaizen",
            "Productivity Subsidy"
        ],
        "benefits": "Government reimbursement of up to 90% of lean consultant implementation fees (5S, Kaizen, Kanban) to eliminate shop-floor waste and boost profitability.",
        "eligibility_summary": "Udyam-registered MSMEs forming mini-clusters or individual manufacturing units.",
        "eligibility": {
            "minAge": 20,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://lean.msme.gov.in/",
        "baseMatchScore": 78
    },
    {
        "id": "msme-digital",
        "title": "Digital MSME Scheme – Cloud Computing & ERP Subsidies",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "Digital MSME",
            "Cloud ERP",
            "Accounting Software",
            "IT Subsidy"
        ],
        "benefits": "Subsidy up to ₹1 lakh per MSME over 2 years for adopting cloud-based ERP, inventory software, digital accounting, and e-commerce marketing systems.",
        "eligibility_summary": "Micro, small, and medium enterprises registered with Udyam adopting digital platforms.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://champions.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "msme-design-clinic",
        "title": "MSME Design Clinic Scheme – Product Styling and Ergonomics Grant",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Design Clinic",
            "Industrial Design",
            "NID",
            "Product Innovation"
        ],
        "benefits": "Financial assistance of 75% (up to ₹40 lakh) for student-industry design projects and up to ₹9 lakh for hiring professional industrial design consultants.",
        "eligibility_summary": "Manufacturing MSMEs collaborating with certified design experts from NID or IITs.",
        "eligibility": {
            "minAge": 20,
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
                "self-employed",
                "student"
            ]
        },
        "applyLink": "https://design.msme.gov.in/",
        "baseMatchScore": 76
    },
    {
        "id": "msme-ipr-scheme",
        "title": "MSME Intellectual Property Rights (IPR) Reimbursement Scheme",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "IPR Subsidy",
            "Patent Reimbursement",
            "Trademark",
            "GI Registration"
        ],
        "benefits": "Reimbursement up to ₹1 lakh for domestic patent, ₹5 lakh for foreign patent, ₹10,000 for trademark, and ₹2 lakh for Geographical Indication registration.",
        "eligibility_summary": "Udyam-registered MSMEs securing intellectual property protections.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://ipr.msme.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "msme-esdp",
        "title": "Entrepreneurship and Skill Development Programme (ESDP)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "ESDP",
            "Skill Training",
            "Youth Entrepreneurship",
            "Free Workshop"
        ],
        "benefits": "Free 6-week hands-on training courses in technical trades (solar panel repair, CNC operating, mobile repair) and entrepreneurship orientation for youth.",
        "eligibility_summary": "Youth, women, and SC/ST candidates aged 18+ seeking self-employment or technical wage employment.",
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
                "unemployed",
                "student"
            ]
        },
        "applyLink": "https://dcmsme.gov.in/",
        "baseMatchScore": 85
    },
    {
        "id": "msme-pms",
        "title": "Procurement and Marketing Support (PMS) Scheme for MSMEs",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PMS",
            "Trade Fair Subsidy",
            "GeM Stalls",
            "Packaging Subsidy"
        ],
        "benefits": "100% stall rent reimbursement (up to ₹1.5 lakh) at national exhibitions, ₹50,000 for modern packaging consultation, and free GeM seller registration.",
        "eligibility_summary": "Manufacturing and service MSMEs with valid Udyam Registration certificates.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://my.msme.gov.in/pms/",
        "baseMatchScore": 84
    },
    {
        "id": "msme-ic-scheme",
        "title": "International Cooperation (IC) Scheme for MSME Global delegations",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "IC Scheme",
            "Overseas Exhibitions",
            "Airfare Subsidy",
            "B2B Meetings"
        ],
        "benefits": "Reimbursement of 100% economy airfare and stall charges up to ₹2.5 lakh per enterprise for participating in prestigious international trade fairs abroad.",
        "eligibility_summary": "Udyam-registered MSMEs and industrial associations exploring export markets.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://ic.msme.gov.in/",
        "baseMatchScore": 78
    },
    {
        "id": "msme-coir-vikas",
        "title": "Coir Vikas Yojana – Skill Upgradation and Technology Transfer",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Coir Board",
            "Coir Artisans",
            "Yarn Spinning",
            "Skill Stipend"
        ],
        "benefits": "Monthly stipend of ₹3,000 for training in motorized coir spinning and weaving, coupled with technology transfer kits for setting up household units.",
        "eligibility_summary": "Rural artisans, coconut farm laborers, and women in coastal coir-producing states.",
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
                "1l-2.5l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "daily-wage-worker",
                "self-employed",
                "homemaker"
            ]
        },
        "applyLink": "https://coirboard.gov.in/",
        "baseMatchScore": 80
    },
    {
        "id": "msme-citus",
        "title": "Coir Industry Technology Upgradation Scheme (CITUS)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "CITUS",
            "Coir Machinery",
            "Capital Subsidy",
            "Coir Board"
        ],
        "benefits": "Capital subsidy of 25% of the cost of modern coir machinery (up to ₹2.5 crore) to establish automatic yarn spinning, geofabric, and pith block units.",
        "eligibility_summary": "Entrepreneurs and coir industrial units modernizing manufacturing technology.",
        "eligibility": {
            "minAge": 20,
            "maxAge": 65,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://coirboard.gov.in/",
        "baseMatchScore": 74
    },
    {
        "id": "msme-mahila-coir",
        "title": "Mahila Coir Yojana – Self Employment for Rural Women",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Mahila Coir",
            "Women Artisans",
            "75% Subsidy",
            "Motorized Ratt"
        ],
        "benefits": "75% capital subsidy on the cost of motorized coir spinning ratts or automatic yarn machines after 2-month certified training.",
        "eligibility_summary": "Rural women workers in coconut-producing belts trained under Coir Board programs.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
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
                "daily-wage-worker",
                "self-employed"
            ]
        },
        "applyLink": "https://coirboard.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "msme-honey-mission",
        "title": "Gramodyog Vikas Yojana – Honey Mission (Beekeeping)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Honey Mission",
            "KVIC",
            "Bee Boxes",
            "Beekeeping",
            "Rural Livelihood"
        ],
        "benefits": "Free distribution of 10 bee-boxes with live colonies and honey extractors per farmer, along with practical apiculture training and buyback support from KVIC.",
        "eligibility_summary": "Farmers, rural youth, and forest dwellers seeking supplementary agricultural income.",
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
                "unemployed",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://www.kvic.gov.in/",
        "baseMatchScore": 87
    },
    {
        "id": "msme-kumhar-sashaktikaran",
        "title": "Gramodyog Vikas Yojana – Kumhar Sashaktikaran (Pottery Mission)",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Pottery Mission",
            "Electric Chaak",
            "Potters",
            "KVIC",
            "Pug Mill"
        ],
        "benefits": "Free distribution of electric potter wheels (chaak), clay blungers, pug mills, and gas kilns, eliminating arduous physical manual rotation.",
        "eligibility_summary": "Traditional rural and urban potters practising traditional terracotta crafts.",
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
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://www.kvic.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "msme-agarbatti-mission",
        "title": "Gramodyog Vikas Yojana – Agarbatti & Handmade Paper Making Support",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Agarbatti Mission",
            "Handmade Paper",
            "KVIC",
            "SHG Women"
        ],
        "benefits": "Supply of automatic agarbatti making machines and powder mixing units on 25% beneficiary contribution with assured raw material supply and product buyback.",
        "eligibility_summary": "Rural women, SHGs, and migrant returnees taking up home-based manufacturing.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "female",
                "male",
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
                "homemaker",
                "unemployed",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://www.kvic.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "msme-nssh",
        "title": "National SC-ST Hub (NSSH) – Special Credit Linked Capital Subsidy",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NSSH",
            "SC/ST Hub",
            "25% Capital Subsidy",
            "Public Procurement"
        ],
        "benefits": "25% capital subsidy up to ₹25 lakh for purchasing modern plant and machinery, reimbursement of registration fees on GeM, and tender fee waivers.",
        "eligibility_summary": "Enterprises owned by SC/ST entrepreneurs holding valid Udyam registration.",
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
                "8l-10l",
                "above-10l"
            ],
            "category": [
                "sc",
                "st"
            ],
            "occupation": [
                "self-employed"
            ]
        },
        "applyLink": "https://www.scsthub.in/",
        "baseMatchScore": 89
    },
    {
        "id": "msme-sambandh",
        "title": "MSME Sambandh – Public Procurement Monitoring Portal",
        "ministry": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "MSME Sambandh",
            "Public Procurement",
            "CPSE Tenders",
            "25% Mandatory"
        ],
        "benefits": "Tracks compliance with mandatory 25% annual government procurement from MSMEs (including 4% from SC/ST and 3% from women entrepreneurs), boosting direct business.",
        "eligibility_summary": "All Udyam-registered MSMEs seeking supply orders from Central Ministries and CPSEs.",
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
            ]
        },
        "applyLink": "https://sambandh.msme.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "agri-pmkmy",
        "title": "PM Kisan Maan Dhan Yojana (PM-KMY) – Social Security Pension for Farmers",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "PM-KMY",
            "Farmer Pension",
            "Old Age",
            "LIC",
            "Monthly 3000"
        ],
        "benefits": "Guaranteed monthly pension of ₹3,000 upon reaching age 60, with matching 50% monthly contribution made by the Central Government.",
        "eligibility_summary": "Small and marginal farmers aged 18 to 40 years possessing cultivable land up to 2 hectares.",
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
                "farmer"
            ]
        },
        "applyLink": "https://maandhan.in/",
        "baseMatchScore": 92
    },
    {
        "id": "agri-pmfby-restructured",
        "title": "Pradhan Mantri Fasal Bima Yojana (PMFBY) – Restructured Comprehensive Crop Insurance",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "PMFBY",
            "Crop Insurance",
            "Drought Relief",
            "Flood Cover",
            "Low Premium"
        ],
        "benefits": "Comprehensive crop loss coverage at nominal premiums (2% for Kharif, 1.5% for Rabi, 5% for commercial crops), balance premium paid 100% by government.",
        "eligibility_summary": "All farmers (landowners and sharecroppers/tenant farmers) growing notified crops in notified areas.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 85,
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
                "farmer"
            ]
        },
        "applyLink": "https://pmfby.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "agri-wbcis",
        "title": "Restructured Weather Based Crop Insurance Scheme (RWBCIS)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "RWBCIS",
            "Weather Insurance",
            "Rainfall Deficit",
            "Frost & Heatwave"
        ],
        "benefits": "Parametric payout triggered automatically by weather station data (excess rainfall, drought, frost, heat waves) without manual field survey delays.",
        "eligibility_summary": "Farmers cultivating horticultural and perishable crops vulnerable to localized adverse weather.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 85,
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
                "farmer"
            ]
        },
        "applyLink": "https://pmfby.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "agri-smam",
        "title": "Sub-Mission on Agricultural Mechanization (SMAM) – Custom Hiring Centres",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "SMAM",
            "Tractor Subsidy",
            "Farm Machinery",
            "Custom Hiring",
            "40-50% Subsidy"
        ],
        "benefits": "40% to 50% subsidy (up to ₹1.25 lakh on tractors, rotavators, reapers) and 80% subsidy up to ₹10 lakh for establishing village Custom Hiring Centres.",
        "eligibility_summary": "Individual farmers (with preference to small, marginal, women, and SC/ST farmers) and rural youth cooperatives.",
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
                "farmer"
            ]
        },
        "applyLink": "https://agrimachinery.nic.in/",
        "baseMatchScore": 90
    },
    {
        "id": "agri-smsp",
        "title": "Sub-Mission on Seeds and Planting Material (SMSP)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "SMSP",
            "Certified Seeds",
            "Seed Village",
            "Seed Subsidy"
        ],
        "benefits": "50% to 60% subsidy on foundation and certified seeds of pulses, oilseeds, and cereals, and support for establishing Farmer Seed Villages.",
        "eligibility_summary": "Farmers participating in certified seed multiplication programs and crop growers across all states.",
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
            ]
        },
        "applyLink": "https://seednet.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "agri-nmeo-op",
        "title": "National Mission on Edible Oils – Oil Palm (NMEO-OP)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Oil Palm",
            "NMEO-OP",
            "Viability Price",
            "Sapling Subsidy",
            "North East"
        ],
        "benefits": "Subsidized planting material (₹29,000/ha), maintenance inputs (₹80,000/ha for 4 years), and Viability Price Guarantee protecting farmers from global palm oil price crashes.",
        "eligibility_summary": "Farmers in identified high-potential oil palm districts (especially North East and Andhra/Telangana).",
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
                "farmer"
            ]
        },
        "applyLink": "https://nmeo.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "agri-nmeo-os",
        "title": "National Mission on Edible Oils – Oilseeds (NMEO-OS)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Oilseeds",
            "Mustard",
            "Soybean",
            "Groundnut",
            "MSP Procurement"
        ],
        "benefits": "Free mini-kits of high-yielding mustard, groundnut, and soybean seeds, irrigation sprinkler grants, and 100% MSP procurement assurance under PM-AASHA.",
        "eligibility_summary": "Farmers cultivating oilseed crops across rainfed and irrigated belts.",
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
            ]
        },
        "applyLink": "https://agricoop.nic.in/",
        "baseMatchScore": 84
    },
    {
        "id": "agri-midh",
        "title": "Mission for Integrated Development of Horticulture (MIDH)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "MIDH",
            "Polyhouse",
            "Cold Storage",
            "Horticulture Subsidy",
            "Fruit Orchard"
        ],
        "benefits": "50% capital subsidy on polyhouses, shade net structures, fruit orchards, mushroom units, and on-farm solar-powered cold storage chambers.",
        "eligibility_summary": "Farmers, farmer groups, FPOs, and cooperatives growing fruits, vegetables, flowers, and spices.",
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
                "farmer"
            ]
        },
        "applyLink": "https://midh.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "agri-nbhm",
        "title": "National Beekeeping & Honey Mission (NBHM)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "NBHM",
            "Sweet Revolution",
            "Madhu Kranti",
            "Honey Testing"
        ],
        "benefits": "Financial assistance up to ₹5 lakh per unit for setting up customized honey processing labs, disease diagnostic clinics, and Madhu Kranti traceability barcode registration.",
        "eligibility_summary": "Beekeepers, self-help groups, and farmer producer organizations engaged in scientific apiculture.",
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
                "farmer",
                "self-employed"
            ]
        },
        "applyLink": "https://nbhm.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "agri-pkvy-cluster",
        "title": "Paramparagat Krishi Vikas Yojana (PKVY) – Certified Organic Farming",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "PKVY",
            "Organic Farming",
            "PGS India",
            "Bio Fertilizers",
            "DBT"
        ],
        "benefits": "Financial grant of ₹50,000 per hectare over 3 years (₹31,000 directly via DBT for bio-fertilizers/seeds + ₹8,800 for value addition and packaging).",
        "eligibility_summary": "Farmers forming organic farming clusters of 50 or more farmers with 50 acres of contiguous land.",
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
            ]
        },
        "applyLink": "https://pgsindia-ncof.gov.in/pkvy/index.aspx",
        "baseMatchScore": 89
    },
    {
        "id": "agri-movcdner",
        "title": "Mission Organic Value Chain Development for North Eastern Region (MOVCDNER)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "MOVCDNER",
            "North East",
            "Organic Exports",
            "FPO Brand"
        ],
        "benefits": "End-to-end funding up to ₹25,000/ha for organic inputs, ₹2 crore for FPO aggregation hubs, and international organic certification for ginger, turmeric, and tea.",
        "eligibility_summary": "Farmers in 8 North Eastern states belonging to registered Organic Farmer Producer Companies.",
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
                "farmer"
            ]
        },
        "applyLink": "https://movcd.dac.gov.in/",
        "baseMatchScore": 81
    },
    {
        "id": "agri-pdmc",
        "title": "Per Drop More Crop (PDMC) – Micro Irrigation Subsidies",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "PDMC",
            "Drip Irrigation",
            "Sprinkler",
            "Water Saving",
            "55% Subsidy"
        ],
        "benefits": "55% subsidy for small & marginal farmers and 45% for other farmers for installing drip and sprinkler irrigation, saving 40% water while increasing yields by 30%.",
        "eligibility_summary": "All landholding farmers looking to adopt water-saving micro-irrigation systems.",
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
                "farmer"
            ]
        },
        "applyLink": "https://pmksy.gov.in/microirrigation/",
        "baseMatchScore": 92
    },
    {
        "id": "agri-rad",
        "title": "Rainfed Area Development (RAD) – Integrated Farming Systems",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "RAD",
            "Integrated Farming",
            "Crops plus Dairy",
            "Rainfed"
        ],
        "benefits": "50% financial assistance (up to ₹1 lakh/ha) to establish multi-tier farming combining food crops, dairy cattle, goat rearing, horticulture, and farm ponds.",
        "eligibility_summary": "Small and marginal farmers operating in rainfed, arid, and drought-prone agricultural regions.",
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
                "farmer"
            ]
        },
        "applyLink": "https://nmsa.dac.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "agri-shc",
        "title": "Soil Health Card (SHC) & Village Soil Testing Laboratories Scheme",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Soil Health Card",
            "Soil Testing",
            "Fertilizer Recommendation",
            "Village Lab"
        ],
        "benefits": "Free periodic soil health report card giving exact NPK and micronutrient dosage, plus up to ₹5 lakh financial assistance for rural youth setting up village soil testing labs.",
        "eligibility_summary": "All agricultural landholders in India and rural science graduates setting up testing facilities.",
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
                "farmer",
                "student",
                "self-employed"
            ]
        },
        "applyLink": "https://soilhealth.dac.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "agri-kcc-crops",
        "title": "Kisan Credit Card (KCC) Scheme for Crops and Animal Husbandry",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "Kisan Credit Card",
            "KCC",
            "Low Interest Loan",
            "Subvention 4%"
        ],
        "benefits": "Revolving crop and livestock credit up to ₹3 lakh at subsidized 4% effective interest rate (with 3% prompt repayment subvention) and zero collateral up to ₹1.6 lakh.",
        "eligibility_summary": "Owner cultivators, tenant farmers, oral lessees, sharecroppers, and dairy/poultry farmers.",
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
                "farmer"
            ]
        },
        "applyLink": "https://www.myscheme.gov.in/schemes/kcc",
        "baseMatchScore": 96
    },
    {
        "id": "agri-atma-extension",
        "title": "Agricultural Technology Management Agency (ATMA) Extension Scheme",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "ATMA",
            "Farmer Training",
            "Exposure Tours",
            "KVK Demonstrations"
        ],
        "benefits": "Free farmer field demonstrations, certified agricultural training, inter-state exposure visits, and Krishi Mela participation with free lodging and DA.",
        "eligibility_summary": "All practicing farmers and members of Commodity Interest Groups (CIGs).",
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
            ]
        },
        "applyLink": "https://agricoop.nic.in/",
        "baseMatchScore": 85
    },
    {
        "id": "agri-mksp",
        "title": "Mahila Kisan Sashaktikaran Pariyojana (MKSP)",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "MKSP",
            "Women Farmers",
            "Krishi Sakhi",
            "Sustainable Agriculture"
        ],
        "benefits": "Skilling of women farmers as Krishi Sakhis and Pashu Sakhis, funding for community seed banks, non-chemical pest management, and drudgery-reducing farm tools.",
        "eligibility_summary": "Small and marginal women farmers organized under Self-Help Groups (SHGs).",
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
                "farmer",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://mksp.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "agri-kisan-call-centre",
        "title": "Kisan Call Centre (KCC Toll-Free 1800-180-1551) & Kisan Suvidha App",
        "ministry": "Ministry of Agriculture and Farmers Welfare",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Kisan Call Centre",
            "1800-180-1551",
            "Kisan Suvidha",
            "Weather Advisory",
            "Mandi Prices"
        ],
        "benefits": "Free 24/7 telephonic advisory in 22 regional Indian languages on crop diseases, fertilizer application, live mandi prices, and extreme weather alerts.",
        "eligibility_summary": "All farmers and agricultural stakeholders across India.",
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
                "farmer"
            ]
        },
        "applyLink": "https://kisansuvidha.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "tex-pm-mitra",
        "title": "PM Mega Integrated Textile Region and Apparel (PM MITRA) Parks Scheme",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PM MITRA",
            "Textile Parks",
            "Plug & Play",
            "Mega Cluster",
            "5F Formula"
        ],
        "benefits": "World-class industrial infrastructure, 500-acre greenfield plug-and-play factories, common effluent treatment, and development capital support up to ₹500 crore per park.",
        "eligibility_summary": "Textile manufacturing companies, yarn spinners, and garment exporters setting up units in PM MITRA parks.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://texmin.nic.in/",
        "baseMatchScore": 78
    },
    {
        "id": "tex-pli",
        "title": "PLI Scheme for Textiles – Man-Made Fibre (MMF) & Technical Textiles",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PLI Textiles",
            "MMF Apparel",
            "Technical Textiles",
            "Manufacturing Subsidy"
        ],
        "benefits": "Financial incentive of 3% to 11% on incremental turnover for 5 years on manufacturing approved MMF fabrics, garments, and technical textile products.",
        "eligibility_summary": "Textile manufacturing companies investing minimum ₹100 crore or ₹300 crore in eligible product segments.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://plitextiles.gov.in/",
        "baseMatchScore": 75
    },
    {
        "id": "tex-samarth",
        "title": "SAMARTH – Scheme for Capacity Building in Textile Sector",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "SAMARTH",
            "Textile Skilling",
            "Garmenting",
            "Stipend",
            "Job Guarantee"
        ],
        "benefits": "Free NSQF-aligned training in apparel stitching, knitting, and weaving with biometric attendance, free certification, and minimum 70% wage employment placement.",
        "eligibility_summary": "Unemployed youth and women seeking careers in the organized garment and textile industry.",
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
                "homemaker"
            ]
        },
        "applyLink": "https://samarth-textiles.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "tex-nttm",
        "title": "National Technical Textiles Mission (NTTM)",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "Technical Textiles",
            "Geotextiles",
            "Meditech",
            "Agrotech",
            "R&D Grant"
        ],
        "benefits": "R&D project grants up to ₹50 crore for academic-industry consortia developing specialized geotextiles, bullet-proof aramids, medical implants, and agrotech fabrics.",
        "eligibility_summary": "Indian scientists, engineering institutes, and industrial textile units engaged in technical textile innovation.",
        "eligibility": {
            "minAge": 22,
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://nttm.texmin.gov.in/",
        "baseMatchScore": 76
    },
    {
        "id": "tex-atufs",
        "title": "Amended Technology Upgradation Fund Scheme (ATUFS)",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "ATUFS",
            "Capital Subsidy",
            "Weaving Looms",
            "Knitting",
            "Textile Modernization"
        ],
        "benefits": "One-time capital investment subsidy of 10% to 15% (up to ₹30 crore per entity) on benchmarked energy-efficient textile machinery.",
        "eligibility_summary": "Textile manufacturing units modernizing spinning, weaving, technical textiles, and garmenting machinery.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://txcindia.gov.in/",
        "baseMatchScore": 78
    },
    {
        "id": "tex-powertex",
        "title": "PowerTex India – Powerloom Sector Comprehensive Development Scheme",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PowerTex",
            "Powerloom Subsidy",
            "Shuttleless Looms",
            "Solar Powerloom"
        ],
        "benefits": "50% to 90% capital subsidy on loom attachments, electronic jacquards, and 50% capital subsidy for installing on-grid solar power systems for powerlooms.",
        "eligibility_summary": "Small powerloom unit owners and powerloom weaver cooperative societies.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://txcindia.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "tex-silk-samagra",
        "title": "Silk Samagra 2 – Integrated Silk Development Scheme",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Silk Samagra",
            "Sericulture",
            "Mulberry Silk",
            "Silk Cocoon",
            "Subsidy"
        ],
        "benefits": "50% to 75% subsidy on silkworm rearing sheds, automatic reeling machines, mulberry saplings, and solar dryers to achieve self-sufficiency in bivoltine silk.",
        "eligibility_summary": "Sericulturists, silkworm rearers, reelers, and silk weavers across recognized sericulture clusters.",
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
                "farmer",
                "self-employed"
            ]
        },
        "applyLink": "https://csb.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "tex-nhdp",
        "title": "National Handloom Development Programme (NHDP) – Mega Handloom Clusters",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NHDP",
            "Handloom Weavers",
            "Raw Material Subsidy",
            "Yarn Supply"
        ],
        "benefits": "15% price subsidy on purchase of cotton, domestic silk, and wool yarn, freight reimbursement, and grant up to ₹2 crore for Common Facility Centres.",
        "eligibility_summary": "Handloom weavers holding Weaver Pehchan Card and registered Handloom Cooperatives.",
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
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://handlooms.nic.in/",
        "baseMatchScore": 88
    },
    {
        "id": "tex-weaver-insurance",
        "title": "Handloom Weavers Comprehensive Welfare Scheme (PMJJBY & PMSBY Converged)",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "Weaver Insurance",
            "Life Cover",
            "Accidental Death",
            "Govt Subsidized"
        ],
        "benefits": "₹2 lakh life insurance cover and ₹2 lakh accidental death/disability cover with annual premium paid by the Ministry of Textiles for eligible weavers.",
        "eligibility_summary": "Handloom weavers and ancillary workers aged 18 to 50 years possessing Weaver Pehchan Cards.",
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
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://handlooms.nic.in/",
        "baseMatchScore": 87
    },
    {
        "id": "tex-ahvy",
        "title": "Ambedkar Hastshilp Vikas Yojana (AHVY) – Handicrafts Cluster Scheme",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "AHVY",
            "Handicrafts",
            "Artisans",
            "Skill Upgradation",
            "Dastkar"
        ],
        "benefits": "Cluster-level skill training, design workshops with NIFT graduates, distribution of improved tool-kits, and construction of craft exhibition pavilions.",
        "eligibility_summary": "Handicrafts artisans, self-help groups, and artisan producer groups possessing Pehchan cards.",
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
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://crafts.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "tex-handicrafts-design",
        "title": "Design and Technology Upgradation Scheme for Handicrafts",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Handicrafts Design",
            "NIFT Mentorship",
            "Artisan Workshops",
            "Prototype Grant"
        ],
        "benefits": "Financial assistance up to ₹5 lakh per cluster for conducting integrated design workshops with premier design institutes to create export-ready handicrafts.",
        "eligibility_summary": "Handicrafts artisans, master craftspersons, and designer cooperatives.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://crafts.gov.in/",
        "baseMatchScore": 80
    },
    {
        "id": "tex-jute-icare",
        "title": "Jute-ICARE – Improved Cultivation and Advanced Retting Exercise",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Jute-ICARE",
            "Golden Fibre",
            "Retting Tank",
            "Seed Subsidy",
            "Microbial Retting"
        ],
        "benefits": "Supply of certified high-yielding jute seeds at subsidized rates, free microbial consortia (CRIJAF Sona) for fast retting, and seed drill implements.",
        "eligibility_summary": "Jute-growing farmers across West Bengal, Bihar, Assam, and Odisha.",
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
                "farmer"
            ]
        },
        "applyLink": "https://jutecomm.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "tex-sitp",
        "title": "Scheme for Integrated Textile Parks (SITP)",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "SITP",
            "Textile Parks",
            "Common Infrastructure",
            "Captive Power"
        ],
        "benefits": "Central government grant up to 40% of project cost (max ₹40 crore) to develop world-class common industrial facilities, effluent plants, and training centres.",
        "eligibility_summary": "Industry consortiums, trade bodies, and textile parks SPVs.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://texmin.nic.in/",
        "baseMatchScore": 73
    },
    {
        "id": "tex-kasturi-cotton",
        "title": "Kasturi Cotton India – Premium Traceable Brand Initiative",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Kasturi Cotton",
            "Traceability",
            "Blockchain",
            "Premium Exports"
        ],
        "benefits": "Blockchain-based tamper-proof QR code tracing 100% Indian organic long-staple cotton from farm to ginning, guaranteeing premium price margins for farmers.",
        "eligibility_summary": "Cotton ginners, certified farmers, spinners, and textile mills adhering to Kasturi quality benchmarks.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://texmin.nic.in/",
        "baseMatchScore": 81
    },
    {
        "id": "tex-hss-looms",
        "title": "Hathkargha Samvardhan Sahayata (HSS) – Modern Looms for Weavers",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "HSS Looms",
            "90% Subsidy",
            "Pneumatic Looms",
            "Drudgery Reduction"
        ],
        "benefits": "90% financial grant by government to acquire modern steel looms, pneumatic frames, dobby, and jacquards, reducing physical strain and doubling daily output.",
        "eligibility_summary": "Traditional handloom weavers operating outdated wooden pit-looms.",
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
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://handlooms.nic.in/",
        "baseMatchScore": 89
    },
    {
        "id": "tex-wool-development",
        "title": "Integrated Wool Development Programme (IWDP)",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "IWDP",
            "Pashmina",
            "Sheep Breeders",
            "Wool Processing",
            "Himalayan"
        ],
        "benefits": "Financial grants for sheep shearing machines, portable solar pashmina de-hairing units, feed shelters, and health insurance for pastoral sheep breeders.",
        "eligibility_summary": "Pastoral sheep and pashmina goat breeders in Rajasthan, Ladakh, Himachal Pradesh, and Uttarakhand.",
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
                "farmer",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://woolboard.nic.in/",
        "baseMatchScore": 82
    },
    {
        "id": "tex-silk-handloom-mark",
        "title": "Silk Mark and Handloom Mark Authenticity Assurance Scheme",
        "ministry": "Ministry of Textiles",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Silk Mark",
            "Handloom Mark",
            "Authenticity Label",
            "Consumer Protection"
        ],
        "benefits": "Subsidized testing and issuance of authorized tamper-proof Silk Mark and Handloom Mark tags, verifying 100% natural pure silk and genuine hand-woven origin.",
        "eligibility_summary": "Handloom cooperative societies, pure silk weavers, retail saree showrooms, and master artisans.",
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
            ]
        },
        "applyLink": "https://silkmarkindia.com/",
        "baseMatchScore": 84
    },
    {
        "id": "cul-veteran-artists",
        "title": "Scheme for Financial Assistance for Veteran Artists (Artistes Pension)",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Artistes Pension",
            "Veteran Artists",
            "Monthly 6000",
            "Old Age Pension"
        ],
        "benefits": "Monthly financial assistance of ₹6,000 per month for veteran artists and writers in indigent circumstances, continuing to surviving spouse after death.",
        "eligibility_summary": "Artists, sculptors, and writers aged 60+ with annual income not exceeding ₹48,000.",
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
                "unemployed",
                "self-employed"
            ]
        },
        "applyLink": "https://indiaculture.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "cul-fellowship-artistes",
        "title": "Award of Senior and Junior Fellowships to Outstanding Artistes in Performing Arts",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Culture Fellowship",
            "Senior Fellowship",
            "Classical Music",
            "Dance",
            "Theatre"
        ],
        "benefits": "Senior Fellowship of ₹20,000/month (ages 40+) and Junior Fellowship of ₹10,000/month (ages 25–40) for 2 years to undertake original cultural research and performance projects.",
        "eligibility_summary": "Outstanding artists in classical music, dance, theatre, folk arts, and literature.",
        "eligibility": {
            "minAge": 25,
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
                "self-employed",
                "student",
                "salaried"
            ]
        },
        "applyLink": "https://indiaculture.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "cul-cultural-orgs",
        "title": "Financial Assistance to Cultural Organizations with National Presence",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Cultural Grants",
            "National Presence",
            "Auditorium",
            "Music Festivals"
        ],
        "benefits": "Annual grants up to ₹1 crore for recognized national-level cultural institutions to organize pan-India classical concerts, theatre festivals, and workshops.",
        "eligibility_summary": "Registered cultural societies and non-profits functioning for over 3 years with nationwide presence.",
        "eligibility": {
            "minAge": 21,
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://indiaculture.gov.in/",
        "baseMatchScore": 75
    },
    {
        "id": "cul-guru-shishya",
        "title": "Promotion of Guru-Shishya Parampara (Repertory Grant Scheme)",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Guru Shishya",
            "Repertory Grant",
            "Monthly Honorarium",
            "Classical Arts"
        ],
        "benefits": "Monthly honorarium of ₹10,000 to the Guru and ₹6,000 to each disciple (shishya) to preserve traditional oral guru-shishya transmission of rare performing arts.",
        "eligibility_summary": "Gurus and classical performing disciples in recognized dramatic and musical traditions.",
        "eligibility": {
            "minAge": 15,
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
                "student",
                "self-employed"
            ]
        },
        "applyLink": "https://indiaculture.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "cul-infrastructure-tagore",
        "title": "Financial Assistance for Creation of Cultural Infrastructure (Tagore Cultural Complexes)",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Transport & Infrastructure",
        "tags": [
            "Tagore Cultural Complexes",
            "Auditorium Grant",
            "Acoustics",
            "State Theatres"
        ],
        "benefits": "Capital funding up to 60% of project cost (max ₹15 crore per complex) for constructing state-of-the-art auditoriums, sound recording halls, and open-air amphitheatres.",
        "eligibility_summary": "State governments, municipal corporations, and prominent cultural non-profits.",
        "eligibility": {
            "minAge": 25,
            "maxAge": 75,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://indiaculture.gov.in/",
        "baseMatchScore": 71
    },
    {
        "id": "cul-seva-bhoj",
        "title": "Seva Bhoj Yojana – GST Reimbursement for Charitable Religious Langars",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Seva Bhoj",
            "Free Langar",
            "GST Reimbursement",
            "Charitable Institutions"
        ],
        "benefits": "100% reimbursement of Central GST and IGST paid on raw food commodities (ghee, edible oil, pulses, flour, rice) distributed as free prasad and langar meals.",
        "eligibility_summary": "Charitable religious institutions (Gurdwaras, Temples, Dargahs) distributing free meals to minimum 5,000 people monthly.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 85,
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://sevabhoj.nic.in/",
        "baseMatchScore": 83
    },
    {
        "id": "cul-cultural-mapping",
        "title": "National Mission on Cultural Mapping – Mera Gaon Meri Dharohar (MGMD)",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Mera Gaon Meri Dharohar",
            "Village Heritage",
            "Artisan Mapping",
            "GIS"
        ],
        "benefits": "Comprehensive digital documentation and GIS profiling of cultural identity, folk songs, local cuisine, and artisans across 6.5 lakh Indian villages on a national portal.",
        "eligibility_summary": "Rural folk artists, village elders, cultural historians, and village youth documenting regional traditions.",
        "eligibility": {
            "minAge": 16,
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
                "student",
                "farmer",
                "self-employed",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://mgmd.gov.in/",
        "baseMatchScore": 85
    },
    {
        "id": "cul-ich-safeguarding",
        "title": "Scheme for Safeguarding the Intangible Cultural Heritage (ICH)",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "ICH",
            "UNESCO Heritage",
            "Vedic Chanting",
            "Kumbh",
            "Folk Traditions"
        ],
        "benefits": "Project grants up to ₹10 lakh for community projects conserving threatened traditional puppetry, Vedic chanting, Sanskrit theatre, and tribal folklore.",
        "eligibility_summary": "Artisan trusts, cultural NGOs, indigenous community groups, and folklore researchers.",
        "eligibility": {
            "minAge": 20,
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
                "self-employed",
                "salaried",
                "student"
            ]
        },
        "applyLink": "https://indiaculture.gov.in/",
        "baseMatchScore": 77
    },
    {
        "id": "cul-festival-of-india",
        "title": "International Cultural Relations – Festival of India Abroad Scheme",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "Festival of India",
            "Cultural Troupes",
            "International Tours",
            "Airfare"
        ],
        "benefits": "Full travel sponsorship, daily allowance in foreign currency, venue expenses, and artist fees for selected Indian folk and classical troupes performing abroad.",
        "eligibility_summary": "Empanelled classical dance, music, and folk artist troupes representing India at bilateral diplomatic festivals.",
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://indiaculture.gov.in/",
        "baseMatchScore": 78
    },
    {
        "id": "cul-buddhist-tibetan",
        "title": "Financial Assistance to Buddhist and Tibetan Cultural Institutions",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Buddhist Culture",
            "Tibetan Monasteries",
            "Manuscripts",
            "Monk Education"
        ],
        "benefits": "Grants up to ₹30 lakh for preservation of ancient Pali/Tibetan xylographs, maintenance of monastery libraries, and teaching traditional Himalayan thangka painting.",
        "eligibility_summary": "Monasteries, Buddhist institutions, and registered trusts engaged in propagation of Buddhist/Tibetan culture.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 85,
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
                "st",
                "sc",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "student"
            ]
        },
        "applyLink": "https://indiaculture.gov.in/",
        "baseMatchScore": 76
    },
    {
        "id": "cul-ncf-partnerships",
        "title": "National Cultural Fund (NCF) – Public-Private Heritage Partnerships",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NCF",
            "Monument Adoption",
            "CSR Heritage",
            "Tax Exemption 100%"
        ],
        "benefits": "100% tax deduction under Section 80G for corporate CSR and citizen donations used for restoring UNESCO monuments, visitor amenities, and museum light-shows.",
        "eligibility_summary": "Corporates, philanthropic foundations, and individuals investing in preservation of national monuments.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 75,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://ncf.nic.in/",
        "baseMatchScore": 70
    },
    {
        "id": "cul-gandhi-peace-prize",
        "title": "Gandhi Peace Prize and National Cultural Honours Scheme",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Gandhi Peace Prize",
            "₹1 Crore Award",
            "Non-Violence",
            "President of India"
        ],
        "benefits": "Cash award of ₹1 crore, a citation plaque, and traditional handloom stole presented annually to individuals and organizations promoting non-violent social transformation.",
        "eligibility_summary": "Individuals and institutions worldwide exemplifying Gandhian ideals of peace, communal harmony, and upliftment.",
        "eligibility": {
            "minAge": 25,
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://awards.gov.in/",
        "baseMatchScore": 72
    },
    {
        "id": "cul-manuscripts-mission",
        "title": "National Mission on Manuscripts (NMM) – Digitization & Conservation Scheme",
        "ministry": "Ministry of Culture",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Manuscripts",
            "Palm Leaf Digitization",
            "Kriti Sampada",
            "Ancient Texts"
        ],
        "benefits": "Free preventive conservation of rare palm-leaf and handmade paper manuscripts, cataloging on Kriti Sampada portal, and financial grants to private manuscript holders.",
        "eligibility_summary": "Private collectors, families, temples, and academic libraries holding ancient Indian manuscripts.",
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
                "self-employed",
                "salaried",
                "student"
            ]
        },
        "applyLink": "https://www.namami.gov.in/",
        "baseMatchScore": 77
    },
    {
        "id": "meity-specs",
        "title": "Scheme for Promotion of Manufacturing of Electronic Components and Semiconductors (SPECS)",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "SPECS",
            "Electronic Components",
            "25% Capital Subsidy",
            "Semiconductor"
        ],
        "benefits": "Financial incentive of 25% on capital expenditure for manufacturing electronic components, semiconductor packaging, and displays in India.",
        "eligibility_summary": "Enterprises investing in active/passive electronic components, PCB manufacturing, and ATMP plants.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://www.meity.gov.in/esdm/specs",
        "baseMatchScore": 75
    },
    {
        "id": "meity-dli-semiconductor",
        "title": "Design Linked Incentive (DLI) Scheme under India Semiconductor Mission (ISM)",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "DLI",
            "Semiconductor Design",
            "EDA Tools",
            "Chip Startups",
            "50% Subsidy"
        ],
        "benefits": "Financial reimbursement up to 50% of eligible design expenditure (max ₹15 crore) and deployment-linked incentives of 4%–6% on net sales of indigenously designed chips.",
        "eligibility_summary": "Domestic startups and MSMEs engaged in semiconductor chip design, VLSI, and system-on-chip development.",
        "eligibility": {
            "minAge": 20,
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
            ]
        },
        "applyLink": "https://ism.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "meity-semiconductor-fabs",
        "title": "Scheme for Setting Up of Semiconductor Fabs in India",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "Silicon Fabs",
            "50% Fiscal Support",
            "Semiconductor Fab",
            "Make in India"
        ],
        "benefits": "Fiscal support of 50% of project cost on pari-passu basis for setting up commercial silicon semiconductor fabrication plants in India.",
        "eligibility_summary": "Global and domestic semiconductor consortiums with proven technology fabrication experience.",
        "eligibility": {
            "minAge": 25,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://ism.gov.in/",
        "baseMatchScore": 71
    },
    {
        "id": "meity-display-fabs",
        "title": "Scheme for Setting Up of Display Fabs in India",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "Display Fabs",
            "AMOLED",
            "TFT LCD",
            "50% Support",
            "Display Manufacturing"
        ],
        "benefits": "Fiscal support of 50% of project cost (up to ₹12,000 crore) for setting up Generation 8 or Gen 6 AMOLED and TFT-LCD display glass manufacturing lines.",
        "eligibility_summary": "Consortiums investing in commercial display fabrication plants within India.",
        "eligibility": {
            "minAge": 25,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
                "above-10l"
            ],
            "category": [
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://ism.gov.in/",
        "baseMatchScore": 68
    },
    {
        "id": "meity-compound-semis",
        "title": "Scheme for Compound Semiconductors, Silicon Photonics and ATMP/OSAT Facilities",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "OSAT",
            "ATMP",
            "Compound Semis",
            "Gallium Nitride",
            "Chip Packaging"
        ],
        "benefits": "50% capital fiscal support for establishing Assembly, Testing, Marking, and Packaging (ATMP) and OSAT units producing GaN and SiC power devices.",
        "eligibility_summary": "Enterprises setting up semiconductor packaging, testing, and specialty chip fabrication plants.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://ism.gov.in/",
        "baseMatchScore": 73
    },
    {
        "id": "meity-tide-2",
        "title": "TIDE 2.0 (Technology Incubation and Development of Entrepreneurs) Scheme",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "TIDE 2.0",
            "Incubator Grants",
            "AI Startups",
            "IoT Grant",
            "Entrepreneurship"
        ],
        "benefits": "Financial grants up to ₹4 lakh for early proof-of-concept and ₹7 lakh for prototype development, with mentorship across 51 premier tech incubators.",
        "eligibility_summary": "Startups and student innovators building solutions in AI, IoT, Blockchain, and Robotics.",
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
                "self-employed",
                "unemployed"
            ]
        },
        "applyLink": "https://tide.meity.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "meity-cyber-swachhta",
        "title": "Cyber Swachhta Kendra (Botnet Cleaning and Malware Analysis Centre)",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "Cyber Swachhta",
            "Free Antivirus",
            "CERT-In",
            "Botnet Removal",
            "Malware Tool"
        ],
        "benefits": "Free automated botnet cleaning tools (USB Pratirodh, AppSamvid), malware remediation software, and instant malicious IP checking for citizens.",
        "eligibility_summary": "All Indian computer and smartphone users seeking free cyber safety tools.",
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
                "salaried",
                "self-employed",
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://www.csk.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "meity-bhashini",
        "title": "Bhashini – National Language Translation Mission (NLTM)",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "Bhashini",
            "AI Translation",
            "Vernacular AI",
            "Voice Recognition",
            "Indian Languages"
        ],
        "benefits": "Open APIs for real-time speech-to-speech translation across 22 Indian scheduled languages, voice-enabled governance apps, and crowdsourced Bhasha Daan incentives.",
        "eligibility_summary": "Indian citizens, developers, startups, and academic researchers developing multilingual digital services.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 85,
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://bhashini.gov.in/",
        "baseMatchScore": 87
    },
    {
        "id": "meity-indiaai",
        "title": "IndiaAI Mission – Compute Capacity & Innovation Grants",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "IndiaAI",
            "AI Compute",
            "GPU Cloud",
            "Datasets",
            "AI Fellowships"
        ],
        "benefits": "Subsidized access to 10,000+ GPU supercomputing cloud, curated Indian foundational datasets, and research fellowships of ₹50,000/month for doctoral scholars.",
        "eligibility_summary": "AI startups, researchers, university faculty, and engineers developing indigenous foundational models.",
        "eligibility": {
            "minAge": 20,
            "maxAge": 55,
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://indiaai.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "meity-chunauti",
        "title": "CHUNAUTI – NextGen Startup Challenge Programme (STPI)",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "CHUNAUTI",
            "Tier 2 Startups",
            "Seed Grant 25 Lakh",
            "STPI Mentorship"
        ],
        "benefits": "Seed funding of up to ₹25 lakh per startup, cloud credits, free plug-and-play office space for 1 year, and corporate mentorship in Tier 2 and Tier 3 cities.",
        "eligibility_summary": "Early-stage software product startups incorporated in Tier 2 and Tier 3 cities.",
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
                "self-employed",
                "student"
            ]
        },
        "applyLink": "https://innovate.stpinext.in/",
        "baseMatchScore": 84
    },
    {
        "id": "meity-futureskills-prime",
        "title": "FutureSkills PRIME – Re-skilling and Up-skilling IT Manpower Scheme",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "FutureSkills",
            "NASSCOM",
            "Cloud/AI Courses",
            "50% Fee Subsidy",
            "Govt Certificate"
        ],
        "benefits": "Government incentive reimbursement of up to 50% (max ₹12,000) on passing NASSCOM-accredited certification exams in AI, Cybersecurity, Cloud, and Big Data.",
        "eligibility_summary": "Indian IT professionals, graduating engineering/BCA/MCA students, and non-tech job seekers.",
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
                "salaried",
                "unemployed"
            ]
        },
        "applyLink": "https://futureskillsprime.in/",
        "baseMatchScore": 88
    },
    {
        "id": "meity-pmgdish-extension",
        "title": "Pradhan Mantri Gramin Digital Saksharta Abhiyan (PMGDISHA) – Rural Digital Literacy",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "PMGDISHA",
            "Digital Literacy",
            "Rural Computer",
            "Free Certificate",
            "CSC"
        ],
        "benefits": "Completely free 20-hour practical computer and smartphone training covering online bill payments, Aadhaar DigiLocker, and UPI with government certification.",
        "eligibility_summary": "Digitally illiterate persons aged 14 to 60 years in rural households (one person per eligible family).",
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
                "daily-wage-worker",
                "homemaker",
                "unemployed"
            ]
        },
        "applyLink": "https://www.pmgdisha.in/",
        "baseMatchScore": 91
    },
    {
        "id": "meity-digilocker-scheme",
        "title": "DigiLocker – National Digital Document Wallet Initiative",
        "ministry": "Ministry of Electronics and Information Technology",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "DigiLocker",
            "Paperless Governance",
            "Driving License",
            "RC",
            "Aadhaar"
        ],
        "benefits": "Free 1GB cloud storage for digitally issued driving licenses, vehicle RCs, degrees, and income certificates, legally equivalent to physical originals under IT Act.",
        "eligibility_summary": "All Indian citizens holding an Aadhaar number.",
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
                "salaried",
                "self-employed",
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://www.digilocker.gov.in/",
        "baseMatchScore": 95
    },
    {
        "id": "mha-capf-eawas",
        "title": "CAPF eAwas – Online Government Accommodation Portal for Paramilitary Forces",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Housing & Shelter",
        "tags": [
            "CAPF eAwas",
            "Paramilitary Housing",
            "CRPF",
            "BSF",
            "ITBP",
            "CISF"
        ],
        "benefits": "Transparent online allocation of family residential quarters across any CAPF force location, drastically increasing housing satisfaction among field soldiers.",
        "eligibility_summary": "Serving personnel of BSF, CRPF, CISF, ITBP, SSB, and Assam Rifles.",
        "eligibility": {
            "minAge": 20,
            "maxAge": 60,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
                "salaried"
            ]
        },
        "applyLink": "https://capfeawas.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "mha-ayushman-capf",
        "title": "Ayushman CAPF – Cashless Healthcare Scheme for Paramilitary Personnel & Dependents",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Ayushman CAPF",
            "Cashless Healthcare",
            "Troops Family",
            "PM-JAY Hospitals"
        ],
        "benefits": "100% cashless treatment at 24,000+ empanelled CGHS and PM-JAY private hospitals with paperless digital reimbursement through IT-enabled smart health cards.",
        "eligibility_summary": "Serving personnel of Central Armed Police Forces (CAPFs) and their registered family dependents.",
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
                "salaried",
                "homemaker",
                "student"
            ]
        },
        "applyLink": "https://ehs.capf.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "mha-pmss-capf",
        "title": "Prime Minister’s Scholarship Scheme (PMSS) for Wards of CAPF & Assam Rifles",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "PMSS CAPF",
            "Martyrs Wards",
            "Scholarship",
            "₹3000 Monthly",
            "Degree Courses"
        ],
        "benefits": "₹3,000 per month for girls and ₹2,500 per month for boys pursuing professional degree courses (engineering, medicine, management, law) up to 5 years.",
        "eligibility_summary": "Dependent wards and widows of deceased or retired CAPF and Assam Rifles personnel, securing 60%+ marks in Class 12.",
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
                "student"
            ]
        },
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "mha-civilian-victims",
        "title": "Central Scheme for Assistance to Civilian Victims of Terrorist/Communal Violence",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Victim Compensation",
            "Terrorism Relief",
            "Maoist Violence",
            "Ex-Gratia"
        ],
        "benefits": "Financial assistance of ₹5 lakh in fixed deposit, medical assistance, and government job priority for next-of-kin of civilian victims martyred or disabled in terror/communal acts.",
        "eligibility_summary": "Next of kin of civilians killed or permanently incapacitated in cross-border firing, terror attacks, or communal riots.",
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
                "farmer",
                "daily-wage-worker",
                "unemployed",
                "salaried",
                "homemaker"
            ]
        },
        "applyLink": "https://mha.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "mha-mpf",
        "title": "Modernization of Police Forces (MPF) Scheme",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Public Safety, Law & Justice",
        "tags": [
            "MPF",
            "Police Modernization",
            "CCTV",
            "Forensic Labs",
            "Night Vision"
        ],
        "benefits": "Central funding for state police forces to procure body-worn cameras, cyber forensic mobile vans, bullet-proof vehicles, and automated forensic DNA labs.",
        "eligibility_summary": "State police departments, forensic science laboratories, and central investigative agencies.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 60,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
                "salaried"
            ]
        },
        "applyLink": "https://mha.gov.in/",
        "baseMatchScore": 72
    },
    {
        "id": "mha-cctns",
        "title": "Crime and Criminal Tracking Network & Systems (CCTNS) Citizen Portal",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Public Safety, Law & Justice",
        "tags": [
            "CCTNS",
            "Online FIR",
            "Police Verification",
            "Tenant Verification",
            "Citizen Services"
        ],
        "benefits": "Online filing of non-cognizable reports, digital copy of FIR, online tenant and domestic help background verification, and issuance of police clearance certificates.",
        "eligibility_summary": "All citizens seeking paperless police verification and public safety services.",
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
                "student",
                "salaried",
                "self-employed",
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://digitalpolice.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "mha-cybercrime-portal",
        "title": "National Cyber Crime Reporting Portal & Helpline 1930",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Public Safety, Law & Justice",
        "tags": [
            "Cyber Crime",
            "1930 Helpline",
            "Financial Fraud",
            "Online Harassment",
            "Freeze Account"
        ],
        "benefits": "Instant freezing of siphoned banking funds via Citizen Financial Cyber Fraud Reporting System (1930) and confidential reporting of child sexual abuse and stalking.",
        "eligibility_summary": "Any citizen victimized by financial cyber fraud, phishing, ransomware, or online harassment.",
        "eligibility": {
            "minAge": 12,
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
                "salaried",
                "self-employed",
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://cybercrime.gov.in/",
        "baseMatchScore": 96
    },
    {
        "id": "mha-erss-112",
        "title": "Emergency Response Support System (ERSS – National Pan-India Single Number 112)",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Public Safety, Law & Justice",
        "tags": [
            "Dial 112",
            "Emergency Police",
            "Ambulance",
            "Fire",
            "Women Safety SOS"
        ],
        "benefits": "Single toll-free national emergency number (112) integrating Police, Fire, Ambulance, and Disaster response with real-time GPS dispatch of emergency vehicles.",
        "eligibility_summary": "All citizens facing distress, domestic violence, accidents, or medical emergencies nationwide.",
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
                "salaried",
                "self-employed",
                "unemployed",
                "homemaker",
                "farmer",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://112.gov.in/",
        "baseMatchScore": 97
    },
    {
        "id": "mha-vibrant-villages",
        "title": "Vibrant Villages Programme (VVP) for Northern Border Settlements",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Transport & Infrastructure",
        "tags": [
            "Vibrant Villages",
            "Border Security",
            "Homestays",
            "Solar Power",
            "Eco-Tourism"
        ],
        "benefits": "All-weather road connectivity, round-the-clock solar power, broadband internet, homestay eco-tourism promotion, and cooperative livelihood support in border villages.",
        "eligibility_summary": "Residents of notified border blocks in Ladakh, Himachal Pradesh, Uttarakhand, Sikkim, and Arunachal Pradesh.",
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
                "2.5l-5l"
            ],
            "category": [
                "general",
                "st",
                "sc",
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed",
                "homemaker"
            ]
        },
        "applyLink": "https://mha.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "mha-ndrf-relief",
        "title": "National Disaster Response Fund (NDRF) Ex-Gratia Relief & Reconstruction",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "NDRF",
            "Disaster Relief",
            "Ex-Gratia",
            "Crop Loss Relief",
            "House Damage"
        ],
        "benefits": "Immediate financial compensation of ₹4 lakh per deceased, ₹1.2 lakh for completely damaged houses, input subsidies for crop damage, and replacement of artisan toolkits.",
        "eligibility_summary": "Families and farmers affected by notified natural disasters (cyclones, floods, landslides, earthquakes).",
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
                "daily-wage-worker",
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://ndmindia.mha.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "mha-aapda-mitra",
        "title": "Aapda Mitra Scheme – Community Disaster Response Volunteer Scheme",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Aapda Mitra",
            "Disaster Volunteers",
            "Flood Rescue",
            "Life Jacket Kit",
            "First Aid"
        ],
        "benefits": "Free 12-day certified search and rescue training, emergency kit (life jacket, flashlight, helmet, first-aid kit), and ₹5 lakh personal accident insurance for 3 years.",
        "eligibility_summary": "Volunteers aged 18 to 40 residing in flood, cyclone, and landslide-prone hazard districts.",
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
                "unemployed",
                "self-employed"
            ]
        },
        "applyLink": "https://ndma.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "mha-police-martyrs",
        "title": "Central Police Welfare Fund Assistance for Families of Police Martyrs",
        "ministry": "Ministry of Home Affairs",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Police Martyrs",
            "Ex-Gratia 15-25 Lakh",
            "Children Education",
            "Next of Kin"
        ],
        "benefits": "Central ex-gratia compensation ranging from ₹15 lakh to ₹25 lakh, compassionate employment appointment, full tuition fee sponsorship for children, and rail passes.",
        "eligibility_summary": "Next-of-kin of state police and central paramilitary personnel making supreme sacrifice in the line of duty.",
        "eligibility": {
            "minAge": 0,
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
                "homemaker",
                "student",
                "salaried"
            ]
        },
        "applyLink": "https://mha.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "yas-khelo-india",
        "title": "Khelo India – National Programme for Development of Sports",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "Khelo India",
            "Athletes Scholarship",
            "5 Lakh Annual",
            "Sports Academy"
        ],
        "benefits": "Financial support of ₹5 lakh per year for 8 consecutive years to 1,000 talented young athletes across recognized disciplines with free residential academy training.",
        "eligibility_summary": "Junior athletes identified through Khelo India Youth Games, University Games, and national championships.",
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
            ]
        },
        "applyLink": "https://kheloindia.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "yas-tops-core",
        "title": "Target Olympic Podium Scheme (TOPS – Core Group)",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "TOPS",
            "Olympic Athletes",
            "Foreign Coaches",
            "Out of Pocket Allowance"
        ],
        "benefits": "World-class foreign coaching, sports science nutritionists, customized foreign training camps, and ₹50,000 per month out-of-pocket allowance for Olympic hopefuls.",
        "eligibility_summary": "Elite Indian sportspersons shortlisted by High Level Committee for medal contention at Olympics and Asian Games.",
        "eligibility": {
            "minAge": 16,
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://sportsauthorityofindia.nic.in/tops/",
        "baseMatchScore": 88
    },
    {
        "id": "yas-tops-junior",
        "title": "Target Olympic Podium Scheme (TOPS – Development Group for 2028/2032 Olympics)",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "TOPS Junior",
            "Young Talents",
            "Monthly 25000",
            "Sports Science"
        ],
        "benefits": "Monthly out-of-pocket allowance of ₹25,000, personalized sports science diagnostics, customized equipment, and international competition exposures.",
        "eligibility_summary": "Junior athletes aged 12 to 19 years showing exceptional medal trajectory for future Olympic cycles.",
        "eligibility": {
            "minAge": 12,
            "maxAge": 19,
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
            ]
        },
        "applyLink": "https://sportsauthorityofindia.nic.in/tops/",
        "baseMatchScore": 87
    },
    {
        "id": "yas-nyc",
        "title": "National Youth Corps (NYC) Volunteer Scheme",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "NYC Volunteers",
            "Monthly Honorarium",
            "NYKS",
            "Youth Leadership"
        ],
        "benefits": "Monthly honorarium of ₹5,000 for up to 2 years to serve as youth leaders coordinating village camps, literacy drives, and government scheme awareness.",
        "eligibility_summary": "Youth aged 18 to 29 years holding minimum Class 10 qualification, not currently enrolled in regular full-time degree.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 29,
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
                "unemployed"
            ]
        },
        "applyLink": "https://nyks.nic.in/",
        "baseMatchScore": 84
    },
    {
        "id": "yas-nss",
        "title": "National Service Scheme (NSS) – Community Development & National Camps",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "NSS",
            "Community Service",
            "Republic Day Camp",
            "College Volunteers"
        ],
        "benefits": "Certified 240-hour community service experience, personality development, priority grace marks in university admissions, and participation in National Youth Camps.",
        "eligibility_summary": "Students enrolled in Senior Secondary schools (+2), colleges, and university departments.",
        "eligibility": {
            "minAge": 15,
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
            ]
        },
        "applyLink": "https://nss.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "yas-nyks-clubs",
        "title": "Nehru Yuva Kendra Sangathan (NYKS) – Youth Club Development Programme",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "NYKS",
            "Youth Club",
            "Sports Kit",
            "Block Competitions",
            "Rural Youth"
        ],
        "benefits": "Free sports equipment kits (football, volleyball, cricket), annual financial assistance, and block-level cultural/sports tournament funding for registered youth clubs.",
        "eligibility_summary": "Rural youth members of affiliated village youth clubs across all districts.",
        "eligibility": {
            "minAge": 15,
            "maxAge": 29,
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
                "student",
                "farmer",
                "unemployed",
                "self-employed"
            ]
        },
        "applyLink": "https://nyks.nic.in/",
        "baseMatchScore": 86
    },
    {
        "id": "yas-rysk",
        "title": "Rashtriya Yuva Sashaktikaran Karyakram (RYSK) Umbrella Scheme",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "RYSK",
            "Youth Empowerment",
            "Scouts & Guides",
            "Adventure Camps"
        ],
        "benefits": "Financial grants for mountaineering, trekking, scouting expeditions, youth exchange delegations, and national youth leadership awards.",
        "eligibility_summary": "Youth organizations, adolescent clubs, and youth adventurers aged 15 to 29 years.",
        "eligibility": {
            "minAge": 15,
            "maxAge": 29,
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
                "unemployed",
                "self-employed"
            ]
        },
        "applyLink": "https://yas.nic.in/",
        "baseMatchScore": 80
    },
    {
        "id": "yas-nsdf",
        "title": "National Sports Development Fund (NSDF) – Assistance to Outstanding Athletes",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "NSDF",
            "Elite Sports",
            "Injury Rehabilitation",
            "Medical Grant"
        ],
        "benefits": "Special financial assistance up to ₹50 lakh for emergency sports injury surgeries abroad, specialized training, and psychological counseling for international athletes.",
        "eligibility_summary": "International medal winners, Olympians, and outstanding national athletes.",
        "eligibility": {
            "minAge": 15,
            "maxAge": 40,
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://yas.nic.in/",
        "baseMatchScore": 81
    },
    {
        "id": "yas-hrd-sports",
        "title": "Scheme of Human Resource Development in Sports – Fellowships & Sports Science",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Sports Science",
            "Fellowship",
            "Coach Training",
            "Overseas Specialization"
        ],
        "benefits": "Fellowship grants up to ₹10 lakh for Indian coaches, sports doctors, and physiotherapists to attend specialized advanced training programs abroad.",
        "eligibility_summary": "NIS-certified sports coaches, sports medicine doctors, and biomechanics researchers.",
        "eligibility": {
            "minAge": 25,
            "maxAge": 55,
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://yas.nic.in/",
        "baseMatchScore": 74
    },
    {
        "id": "yas-national-youth-award",
        "title": "National Youth Awards – Honouring Outstanding Community Contribution",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "National Youth Award",
            "Cash Prize 1 Lakh",
            "Gold Medal",
            "Youth Hero"
        ],
        "benefits": "Cash prize of ₹1 lakh (individual) or ₹3 lakh (youth organization), gold medal, and citation presented by the Prime Minister at National Youth Festival.",
        "eligibility_summary": "Youth aged 15 to 29 years rendering exceptional service in health, education, anti-drug drives, or disaster relief.",
        "eligibility": {
            "minAge": 15,
            "maxAge": 29,
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
                "self-employed",
                "salaried",
                "unemployed"
            ]
        },
        "applyLink": "https://awards.gov.in/",
        "baseMatchScore": 85
    },
    {
        "id": "yas-fit-india",
        "title": "Fit India Movement & School Certification Scheme",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Fit India",
            "Fitness Certificate",
            "Fit India School",
            "Daily Physical Activity"
        ],
        "benefits": "Fit India 3-Star & 5-Star School flags, free access to physical fitness assessment protocols, fitness mobile apps, and national quiz prizes up to ₹3.25 lakh.",
        "eligibility_summary": "All citizens, school students, physical education teachers, and educational institutions.",
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
                "salaried",
                "self-employed",
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://fitindia.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "yas-nsf-assistance",
        "title": "Scheme of Assistance to National Sports Federations (NSFs) for Training & Exposures",
        "ministry": "Ministry of Youth Affairs & Sports",
        "type": "central",
        "category": "Sports & Culture",
        "tags": [
            "NSFs",
            "National Camps",
            "Foreign Coaches",
            "International Competitions"
        ],
        "benefits": "Complete funding for national training camps, food supplements (₹690/day per athlete), hiring foreign coaches, and full travel costs for foreign competitions.",
        "eligibility_summary": "Athletes and teams representing India in Olympic, Paralympic, Commonwealth, and Asian Games disciplines.",
        "eligibility": {
            "minAge": 12,
            "maxAge": 40,
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://yas.nic.in/",
        "baseMatchScore": 85
    },
    {
        "id": "def-agnipath",
        "title": "Agnipath Scheme – Agniveer Armed Forces Enlistment",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Agnipath",
            "Agniveer",
            "Army",
            "Navy",
            "Air Force",
            "Seva Nidhi ₹11.71 Lakh"
        ],
        "benefits": "4-year service with customized monthly pay (₹30,000–₹40,000), ₹48 lakh non-contributory life cover, and tax-free Seva Nidhi corpus of ₹11.71 lakh upon completion.",
        "eligibility_summary": "Young Indian men and women aged 17.5 to 21 years passing 10th or 12th standard meeting medical and physical standards.",
        "eligibility": {
            "minAge": 17,
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
                "student"
            ]
        },
        "applyLink": "https://joinindianarmy.nic.in/",
        "baseMatchScore": 93
    },
    {
        "id": "def-idex",
        "title": "Innovations for Defence Excellence (iDEX) – Defence Innovation Organisation",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "iDEX",
            "Defence Startups",
            "SPARK Grant",
            "₹1.5 Crore",
            "Make in India"
        ],
        "benefits": "SPARK grants-in-aid up to ₹1.5 crore for startups and individual innovators to develop indigenous military prototypes (AI surveillance, drones, stealth tech).",
        "eligibility_summary": "Startups, individual innovators, MSMEs, and academic institutions tackling military technical challenges.",
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
                "self-employed",
                "student"
            ]
        },
        "applyLink": "https://idex.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "def-idex-prime",
        "title": "iDEX Prime – Advanced Defence Startup Challenge & Scale-Up Grants",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "iDEX Prime",
            "Defence Tech",
            "₹10 Crore Grant",
            "Procurement Order"
        ],
        "benefits": "Development funding of up to ₹10 crore per startup for high-end strategic systems (electronic warfare, quantum encryption, hypersonic materials) with fast-track defense procurement.",
        "eligibility_summary": "DPIIT-recognized defense startups and MSMEs with proven prototype capabilities.",
        "eligibility": {
            "minAge": 21,
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
            ]
        },
        "applyLink": "https://idex.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "def-tdf",
        "title": "Technology Development Fund (TDF) – DRDO Grant Support",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "TDF DRDO",
            "Indigenous Defence",
            "₹50 Crore Grant",
            "Industry R&D"
        ],
        "benefits": "Financial grant up to 90% of project cost (max ₹50 crore) by DRDO to Indian private industries to develop critical import-substitution defense components.",
        "eligibility_summary": "MSMEs, startups, and public/private Indian enterprises collaborating with DRDO laboratories.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 70,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
            ]
        },
        "applyLink": "https://tdf.drdo.gov.in/",
        "baseMatchScore": 80
    },
    {
        "id": "def-echs",
        "title": "Ex-Servicemen Contributory Health Scheme (ECHS) – Comprehensive Cashless Medical Care",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "ECHS",
            "Veterans Healthcare",
            "Cashless OPD/IPD",
            "Polyclinics"
        ],
        "benefits": "100% comprehensive cashless medical treatment, generic medicines, and tertiary hospital admissions across 400+ polyclinics and top empanelled private hospitals.",
        "eligibility_summary": "All retired armed forces pensioners (Army, Navy, Air Force) and their eligible legal dependents.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 105,
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
                "unemployed",
                "homemaker",
                "salaried",
                "student"
            ]
        },
        "applyLink": "https://echs.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "def-pmss-ksb",
        "title": "Prime Minister’s Scholarship Scheme (PMSS) via Kendriya Sainik Board",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "PMSS KSB",
            "Veterans Children",
            "Scholarship",
            "₹36000 Yearly",
            "Professional Degrees"
        ],
        "benefits": "₹36,000 per year for girls and ₹30,000 per year for boys for pursuing professional undergraduate degrees (B.Tech, MBBS, BDS, BBA, BCA).",
        "eligibility_summary": "Dependent children and widows of Ex-Servicemen and Ex-Coast Guard personnel with 60%+ marks in Class 12.",
        "eligibility": {
            "minAge": 17,
            "maxAge": 26,
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
            ]
        },
        "applyLink": "https://ksb.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "def-rmewf",
        "title": "Raksha Mantri Ex-Servicemen Welfare Fund (RMEWF) – Financial Assistance for Veterans",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "RMEWF",
            "Penury Grant",
            "Daughters Marriage",
            "Disabled Children"
        ],
        "benefits": "Monthly penury grant of ₹4,000 for destitute non-pensioners, ₹50,000 one-time grant for daughters' marriage, and ₹3,000/month for disabled children of veterans.",
        "eligibility_summary": "Non-pensioner Ex-Servicemen aged 65+, war widows, and destitute veteran dependents.",
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
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://ksb.gov.in/",
        "baseMatchScore": 87
    },
    {
        "id": "def-orop",
        "title": "One Rank One Pension (OROP) – Armed Forces Pension Parity Scheme",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "OROP",
            "Equal Pension",
            "Veterans Arrears",
            "Defense Pension"
        ],
        "benefits": "Ensures uniform pension to defense personnel retiring in the same rank with the same length of service, irrespective of date of retirement, with periodic 5-year reviews.",
        "eligibility_summary": "All retired defense personnel and family pensioners of the Armed Forces.",
        "eligibility": {
            "minAge": 35,
            "maxAge": 105,
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
                "unemployed",
                "homemaker",
                "salaried"
            ]
        },
        "applyLink": "https://desw.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "def-sparsh",
        "title": "SPARSH – System for Pension Administration (Raksha) Digital Portal",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Banking, Financial Services & Insurance",
        "tags": [
            "SPARSH",
            "Defence Pension",
            "Digital Life Certificate",
            "Direct Credit"
        ],
        "benefits": "Direct, transparent monthly pension credit to bank accounts without bank intermediary delays, online grievance tracking, and Digital Life Certificate submission via face-app.",
        "eligibility_summary": "Defense pensioners, defense civilians, and family pensioners across Army, Navy, Air Force.",
        "eligibility": {
            "minAge": 30,
            "maxAge": 105,
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
                "unemployed",
                "homemaker",
                "salaried"
            ]
        },
        "applyLink": "https://sparsh.defencepension.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "def-awho",
        "title": "Army Welfare Housing Organisation (AWHO) – Affordable Quality Homes for Veterans",
        "ministry": "Ministry of Defence",
        "type": "central",
        "category": "Housing & Shelter",
        "tags": [
            "AWHO",
            "Defence Housing",
            "No Profit No Loss",
            "Gated Communities"
        ],
        "benefits": "Constructs and delivers modern residential flats and villas on a strictly 'No-Profit No-Loss' basis in planned gated townships across prime urban Indian cities.",
        "eligibility_summary": "Serving and retired defense personnel, war widows, and dependent parents.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 90,
            "gender": [
                "male",
                "female",
                "transgender"
            ],
            "income": [
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
                "salaried",
                "unemployed"
            ]
        },
        "applyLink": "https://awhosena.in/",
        "baseMatchScore": 82
    }
];

module.exports = { middleMinistriesSchemes };
