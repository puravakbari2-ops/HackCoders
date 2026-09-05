// Batch of schemes for:
// - Ministry of Social Justice and Empowerment: 70 schemes
// - Ministry of Commerce and Industry: 46 schemes
// Total = 116 schemes

const socialAndCommerceSchemes = [
    {
        "id": "soc-nos-pwd",
        "title": "National Overseas Scholarship for Students with Disabilities",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "NOS-PwD",
            "Study Abroad",
            "Disability Scholarship",
            "Master's & PhD"
        ],
        "benefits": "Full tuition fees, annual maintenance allowance ($15,400 / £9,900), medical insurance, and airfare for 20 students with disabilities pursuing Master's and PhD degrees overseas.",
        "eligibility_summary": "Students with benchmark disabilities holding 55%+ marks in bachelor's/master's degree with family income up to ₹8 lakh.",
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
                "general",
                "sc",
                "st",
                "obc"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://depwd.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "soc-shreshta",
        "title": "SHRESHTA – Residential Education for Students in High Schools in Targeted Areas",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "SHRESHTA",
            "SC Students",
            "CBSE Schools",
            "Full Scholarship",
            "Residential"
        ],
        "benefits": "Full sponsorship of school fee and hostel charges in top private residential CBSE schools for 3,000 meritorious SC students entering Class 9 and 11.",
        "eligibility_summary": "SC students studying in Class 8 or 10 whose parental annual income is up to ₹2.5 lakh, selected via NETS entrance test.",
        "eligibility": {
            "minAge": 13,
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
                "sc"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://shreshta.nta.nic.in/",
        "baseMatchScore": 88
    },
    {
        "id": "soc-pm-daksh",
        "title": "PM-DAKSH (Pradhan Mantri Dakshta Aur Kushalta Sampann Hitgrahi) Yojana",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "PM DAKSH",
            "Skill Training",
            "SC/OBC/EBC",
            "Stipend",
            "Job Placement"
        ],
        "benefits": "Free skill development training, ₹1,500/month training stipend (up to ₹3,000 for residential), free certification, and placement assistance.",
        "eligibility_summary": "Candidates from SC, OBC, EBC, DNT communities and Sanitation Workers aged 18–45 years with income under ₹3 lakh.",
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
                "sc",
                "obc"
            ],
            "occupation": [
                "unemployed",
                "daily-wage-worker",
                "self-employed"
            ]
        },
        "applyLink": "https://pmdaksh.dosje.gov.in/",
        "baseMatchScore": 85
    },
    {
        "id": "soc-smile-transgender",
        "title": "SMILE – Comprehensive Rehabilitation for Welfare of Transgender Persons",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "SMILE",
            "Transgender",
            "Gender Affirmation",
            "Scholarship",
            "Skill Training"
        ],
        "benefits": "National ID cards, ₹5 lakh Ayushman Bharat composite healthcare covering gender reaffirmation surgeries, student scholarships, and Garima Greh shelter.",
        "eligibility_summary": "Transgender individuals possessing or applying for National Transgender Certificate.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 70,
            "gender": [
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
                "self-employed",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://transgender.dosje.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "soc-smile-beggary",
        "title": "SMILE – Comprehensive Rehabilitation of Persons Engaged in the Act of Begging",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "SMILE",
            "Beggary Rehabilitation",
            "Shelter",
            "Skill Training",
            "Healthcare"
        ],
        "benefits": "Emergency medical relief, psycho-social counselling, vocational skill training, temporary shelter, and facilitated livelihood reintegration.",
        "eligibility_summary": "Persons engaged in begging across 30 identified pilot municipal cities.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 75,
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
                "unemployed"
            ]
        },
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 80
    },
    {
        "id": "soc-nmba",
        "title": "Nasha Mukt Bharat Abhiyaan (NMBA) – Substance Free India Campaign",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "NMBA",
            "De-Addiction",
            "Youth Rehabilitation",
            "Counselling"
        ],
        "benefits": "Free community-based counselling, hospital-based de-addiction treatment, psycho-social rehabilitation, and national toll-free support (14446).",
        "eligibility_summary": "Citizens, particularly youth and vulnerable individuals, seeking de-addiction support and counselling.",
        "eligibility": {
            "minAge": 12,
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
                "unemployed",
                "self-employed",
                "salaried",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://nmba.dosje.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "soc-avyay-ipsrc",
        "title": "Atal Vayo Abhyuday Yojana (AVYAY) – Integrated Programme for Senior Citizens",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Senior Citizens",
            "Old Age Home",
            "Shelter",
            "Nutrition",
            "Geriatric Care"
        ],
        "benefits": "Free residential accommodation, nutritious food, clothes, medical care, and recreational facilities at registered Senior Citizen Homes across districts.",
        "eligibility_summary": "Indigent and destitute senior citizens aged 60 years and above.",
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
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "soc-rvy-vayoshri",
        "title": "Rashtriya Vayoshri Yojana (RVY) – Assisted Living Devices for Senior Citizens",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Vayoshri",
            "Senior Citizens",
            "Hearing Aid",
            "Wheelchair",
            "Spectacles"
        ],
        "benefits": "Free high-quality assistive devices including walking sticks, elbow crutches, walkers, hearing aids, wheelchairs, and dentures distributed at free camp assessments.",
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
                "unemployed",
                "homemaker",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://alimco.in/",
        "baseMatchScore": 88
    },
    {
        "id": "soc-elderline",
        "title": "Elderline – National Helpline for Senior Citizens (Toll-Free 14567)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Elderline",
            "14567",
            "Senior Citizens",
            "Rescue",
            "Legal Aid"
        ],
        "benefits": "Free 24/7 telephonic assistance, emotional support, elder abuse rescue, legal advisory under Maintenance and Welfare of Parents and Senior Citizens Act.",
        "eligibility_summary": "All senior citizens aged 60 years and above across India requiring legal, emotional, or physical rescue assistance.",
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
                "unemployed",
                "homemaker",
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 87
    },
    {
        "id": "soc-napddr",
        "title": "National Action Plan for Drug Demand Reduction (NAPDDR)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "NAPDDR",
            "Substance Abuse",
            "Rehabilitation",
            "Awareness"
        ],
        "benefits": "Grant-in-aid to NGOs for running Integrated Rehabilitation Centres for Addicts (IRCAs), Outreach and Drop-In Centres (ODICs), and youth skill training.",
        "eligibility_summary": "Individuals, families, and organizations dealing with substance abuse treatment and rehabilitation.",
        "eligibility": {
            "minAge": 14,
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
                "unemployed",
                "student",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 81
    },
    {
        "id": "soc-srms",
        "title": "Self Employment Scheme for Rehabilitation of Manual Scavengers (SRMS)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "SRMS",
            "Manual Scavenger",
            "Rehabilitation",
            "One-Time Cash",
            "Capital Subsidy"
        ],
        "benefits": "One-time cash assistance of ₹40,000, concessional loan up to ₹15 lakh with capital subsidy up to ₹3.25 lakh, and monthly skill stipend of ₹3,000 for up to 2 years.",
        "eligibility_summary": "Identified manual scavengers and their dependent family members.",
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
                "1l-2.5l"
            ],
            "category": [
                "sc",
                "general",
                "obc"
            ],
            "occupation": [
                "daily-wage-worker",
                "unemployed",
                "self-employed"
            ]
        },
        "applyLink": "https://nskfdc.nic.in/",
        "baseMatchScore": 90
    },
    {
        "id": "soc-namaste",
        "title": "NAMASTE – National Action for Mechanised Sanitation Ecosystem",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "NAMASTE",
            "Sanitation Workers",
            "Sewer Cleaning",
            "PPE Kits",
            "Machinery Loan"
        ],
        "benefits": "Capital subsidy up to ₹5 lakh for sewer cleaning machinery, free PPE kits, Ayushman Bharat PM-JAY health insurance, and training for Sewer/Septic Tank Workers (SSWs).",
        "eligibility_summary": "Sewer and septic tank sanitation workers registered in urban local bodies.",
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
                "daily-wage-worker",
                "self-employed"
            ]
        },
        "applyLink": "https://namaste.dosje.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "soc-adip",
        "title": "ADIP Scheme – Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "ADIP",
            "Divyangjan",
            "Wheelchair",
            "Tricycle",
            "Cochlear Implant",
            "ALIMCO"
        ],
        "benefits": "100% subsidy on modern assistive aids (motorized tricycles, smart canes, Daisy players, hearing aids) and full funding up to ₹6 lakh for Cochlear Implant surgeries in children.",
        "eligibility_summary": "Persons with 40%+ benchmark disability with monthly income up to ₹20,000 (100% aid) or ₹20,001–₹30,000 (50% aid).",
        "eligibility": {
            "minAge": 1,
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
                "student",
                "unemployed",
                "daily-wage-worker",
                "self-employed",
                "homemaker"
            ]
        },
        "applyLink": "https://adip.depwd.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "soc-sugamya-bharat",
        "title": "Accessible India Campaign (Sugamya Bharat Abhiyan)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Sugamya Bharat",
            "Barrier Free",
            "Accessibility",
            "Ramps & Lifts"
        ],
        "benefits": "Creation of universal barrier-free public spaces with ramps, tactile paving, accessible websites, sign language interpreters, and audio descriptions in public transport.",
        "eligibility_summary": "Persons with benchmark disabilities and senior citizens utilizing public buildings and digital services.",
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
                "unemployed",
                "salaried",
                "self-employed",
                "homemaker"
            ]
        },
        "applyLink": "https://accessibleindia.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "soc-udid",
        "title": "Unique Disability ID (UDID) – Swavlamban Card Project",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "UDID",
            "Swavlamban",
            "Disability Certificate",
            "Concessions"
        ],
        "benefits": "Nationally recognized digitized smart card carrying medical disability data, unlocking railway/bus travel concessions, job reservations, and priority welfare delivery.",
        "eligibility_summary": "All persons with benchmark disabilities holding or seeking disability certification.",
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
                "unemployed",
                "daily-wage-worker",
                "self-employed",
                "salaried",
                "homemaker"
            ]
        },
        "applyLink": "https://www.swavlambancard.gov.in/",
        "baseMatchScore": 94
    },
    {
        "id": "soc-divyangjan-swavalamban",
        "title": "Divyangjan Swavalamban Yojana – Concessional Business Loans for PwDs",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NHFDC",
            "PwD Loan",
            "Self Employment",
            "Low Interest",
            "Divyangjan"
        ],
        "benefits": "Concessional loans up to ₹50 lakh at 5%–8% interest rate per annum (1% rebate for women with disabilities) for setting up self-employment enterprises.",
        "eligibility_summary": "Any Indian citizen with 40%+ disability aged 18 years and above.",
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
                "self-employed",
                "unemployed"
            ]
        },
        "applyLink": "https://www.nhfdc.nic.in/",
        "baseMatchScore": 83
    },
    {
        "id": "soc-nos-sc",
        "title": "National Overseas Scholarship (NOS) for Scheduled Caste Students",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "NOS",
            "Study Abroad",
            "SC Scholarship",
            "Master's & PhD",
            "Full Funding"
        ],
        "benefits": "100% tuition fees, annual maintenance allowance (approx $15,400 / £9,900), visa fees, medical insurance, and economy airfare for Master's/PhD abroad.",
        "eligibility_summary": "SC candidates with 60%+ marks in bachelor's/master's degree and family annual income below ₹8 lakh.",
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
                "sc"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://nosmsje.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "soc-top-class-sc",
        "title": "Top Class Education Scheme for Scheduled Caste Students",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Top Class SC",
            "IIT/IIM Fee Waiver",
            "Laptop Grant",
            "Books Allowance"
        ],
        "benefits": "Full non-refundable tuition fees, ₹86,000/year living expenses, ₹53,000 one-time computer grant, and ₹3,000/year books allowance for SC students admitted to IITs, IIMs, AIIMS, and NLUs.",
        "eligibility_summary": "SC students securing admission into 266 notified premier institutions with family income up to ₹8 lakh.",
        "eligibility": {
            "minAge": 17,
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
                "5l-8l"
            ],
            "category": [
                "sc"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "soc-prematric-sc",
        "title": "Pre-Matric Scholarship Scheme for SC Students (Classes 9 and 10)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Pre-Matric",
            "SC Scholarship",
            "Class 9-10",
            "DBT",
            "NSP"
        ],
        "benefits": "Annual academic allowance of ₹3,500 for day scholars and ₹7,000 for hostellers deposited directly into the student's bank account.",
        "eligibility_summary": "SC students studying in Classes 9 or 10 in government or recognized schools with parental income below ₹2.5 lakh.",
        "eligibility": {
            "minAge": 13,
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
                "sc"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 87
    },
    {
        "id": "soc-postmatric-sc",
        "title": "Post-Matric Scholarship for Scheduled Caste Students (PMS-SC)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Post-Matric",
            "PMS-SC",
            "College Fee",
            "Maintenance Allowance",
            "DBT"
        ],
        "benefits": "100% compulsory non-refundable fees reimbursed directly to institution plus annual maintenance allowance up to ₹13,500 credited to student via DBT.",
        "eligibility_summary": "SC students pursuing post-matriculation or post-secondary courses with parental income under ₹2.5 lakh.",
        "eligibility": {
            "minAge": 16,
            "maxAge": 32,
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
                "sc"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 93
    },
    {
        "id": "soc-bjrcy-hostels",
        "title": "Babu Jagjivan Ram Chhatrawas Yojana (BJRCY) – SC Hostels",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "BJRCY",
            "SC Hostels",
            "Girls Hostel",
            "Free Lodging"
        ],
        "benefits": "Central funding for construction and expansion of modern residential hostels for SC boys and girls pursuing secondary and higher education.",
        "eligibility_summary": "SC students studying in middle, secondary, higher secondary schools, and universities.",
        "eligibility": {
            "minAge": 11,
            "maxAge": 25,
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
                "sc"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 81
    },
    {
        "id": "soc-vcf-sc",
        "title": "Venture Capital Fund for Scheduled Castes (VCF-SC)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "VCF-SC",
            "Venture Capital",
            "SC Entrepreneurs",
            "Equity Funding",
            "IFCI"
        ],
        "benefits": "Financial equity/quasi-equity investment up to ₹15 crore per company (at concessional 4%–7% return) for SC-promoted technology and manufacturing startups.",
        "eligibility_summary": "Enterprises owned by SC entrepreneurs (holding at least 51% stake) operating for at least 6 months.",
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
                "sc"
            ],
            "occupation": [
                "self-employed"
            ]
        },
        "applyLink": "https://vcfsc.in/",
        "baseMatchScore": 76
    },
    {
        "id": "soc-cegssc",
        "title": "Credit Enhancement Guarantee Scheme for Scheduled Castes (CEGSSC)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "CEGSSC",
            "Loan Guarantee",
            "Collateral Free",
            "SC Business"
        ],
        "benefits": "Government credit guarantee cover ranging from ₹15 lakh to ₹5 crore for commercial bank loans sanctioned to SC entrepreneurs without demanding collateral.",
        "eligibility_summary": "Registered SC-owned micro, small, and medium enterprises seeking term loans or working capital.",
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
                "sc"
            ],
            "occupation": [
                "self-employed"
            ]
        },
        "applyLink": "https://cegssc.in/",
        "baseMatchScore": 78
    },
    {
        "id": "soc-ambedkar-overseas-subsidy",
        "title": "Dr. Ambedkar Central Sector Scheme of Interest Subsidy for Overseas Studies (OBC/EBC)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Interest Subsidy",
            "Education Loan",
            "OBC",
            "EBC",
            "Overseas Studies"
        ],
        "benefits": "100% interest subsidy on education loans availed from scheduled banks during the moratorium period for pursuing Master's, M.Phil, or PhD abroad.",
        "eligibility_summary": "OBC students (family income under ₹8 lakh) and EBC students (family income under ₹2.5 lakh) taking education loans for foreign studies.",
        "eligibility": {
            "minAge": 19,
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
                "obc",
                "general"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "soc-prematric-obc",
        "title": "PM Young Achievers Scholarship Award Scheme for Vibrant India (YASASVI) – Pre-Matric",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "YASASVI",
            "Pre-Matric",
            "OBC",
            "EBC",
            "DNT",
            "School Scholarship"
        ],
        "benefits": "Annual consolidated scholarship of ₹4,000 for Class 9 and 10 students deposited directly via DBT.",
        "eligibility_summary": "OBC, EBC, and DNT students studying in Class 9 or 10 with family income below ₹2.5 lakh.",
        "eligibility": {
            "minAge": 13,
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
                "obc",
                "general"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://yet.nta.ac.in/",
        "baseMatchScore": 86
    },
    {
        "id": "soc-postmatric-obc",
        "title": "PM-YASASVI Post-Matric Scholarship for OBC, EBC and DNT Students",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "YASASVI",
            "Post-Matric",
            "OBC Scholarship",
            "College Fee",
            "Maintenance"
        ],
        "benefits": "Reimbursement of tuition fees and academic maintenance allowance up to ₹20,000 per year for pursuing undergraduate, postgraduate, and professional diplomas.",
        "eligibility_summary": "Students belonging to OBC, EBC, or DNT categories pursuing post-matric courses with family income under ₹2.5 lakh.",
        "eligibility": {
            "minAge": 16,
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
                "obc",
                "general"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "soc-nfobc",
        "title": "National Fellowship for Other Backward Classes (NFOBC)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "NFOBC",
            "UGC NET",
            "PhD Fellowship",
            "OBC Research"
        ],
        "benefits": "1,000 fellowships annually: ₹37,000/month (JRF) scaling to ₹42,000/month (SRF) plus HRA and contingency grants for full-time M.Phil/PhD research.",
        "eligibility_summary": "OBC candidates qualifying UGC-NET or CSIR-NET enrolled in full-time research in Indian universities.",
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
                "5l-8l"
            ],
            "category": [
                "obc"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://www.ugc.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "soc-nfpwd",
        "title": "National Fellowship for Persons with Disabilities (NFPwD)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "NFPwD",
            "Divyangjan",
            "PhD Stipend",
            "UGC",
            "Research"
        ],
        "benefits": "200 annual fellowships providing ₹37,000–₹42,000 per month plus disability escort allowance of ₹3,000/month and research contingency for M.Phil and PhD scholars.",
        "eligibility_summary": "Students with benchmark disabilities (40%+) enrolled in regular doctoral degree courses.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 36,
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
        "applyLink": "https://www.ugc.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "soc-top-class-obc",
        "title": "Top Class College Education Scheme for OBC, EBC and DNT Students",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Top Class OBC",
            "Premier Institutes",
            "IIT/NIT",
            "Fee Reimbursement"
        ],
        "benefits": "Full tuition fee reimbursement (up to ₹2 lakh/year in private institutes), living allowance of ₹36,000/year, and ₹45,000 one-time computer grant.",
        "eligibility_summary": "Meritorious OBC/EBC/DNT students admitted into notified top-tier institutes (IITs, NITs, IIMs, IIITs) with family income under ₹2.5 lakh.",
        "eligibility": {
            "minAge": 17,
            "maxAge": 28,
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
                "obc",
                "general"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "soc-seed-dnt",
        "title": "SEED – Scheme for Economic Empowerment of DNTs (De-Notified and Nomadic Tribes)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "SEED",
            "DNT",
            "Health Insurance",
            "Housing",
            "Free Coaching"
        ],
        "benefits": "Free competitive exam coaching, ₹5 lakh health insurance through PM-JAY, livelihood loan facilitation, and housing assistance under PMAY for DNT communities.",
        "eligibility_summary": "Families belonging to De-notified, Nomadic, and Semi-Nomadic Tribes not classified under SC/ST/OBC.",
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
                "obc"
            ],
            "occupation": [
                "daily-wage-worker",
                "farmer",
                "unemployed",
                "self-employed"
            ]
        },
        "applyLink": "https://seed.dosje.gov.in/",
        "baseMatchScore": 85
    },
    {
        "id": "soc-free-coaching",
        "title": "Free Coaching Scheme for SC and OBC Students for Competitive Examinations",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Free Coaching",
            "UPSC",
            "SSC",
            "Banking",
            "NEET/JEE",
            "Stipend"
        ],
        "benefits": "100% course fee paid by government to empanelled coaching institutes plus monthly stipend of ₹4,000 (local) or ₹6,000 (outstation) for UPSC/SSC/JEE/NEET coaching.",
        "eligibility_summary": "SC and OBC students passing Class 12 or graduation with family annual income up to ₹8 lakh.",
        "eligibility": {
            "minAge": 17,
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
                "5l-8l"
            ],
            "category": [
                "sc",
                "obc"
            ],
            "occupation": [
                "student",
                "unemployed"
            ]
        },
        "applyLink": "https://coaching.dosje.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "soc-nskfdc-term",
        "title": "NSKFDC Term Loan Scheme for Sanitation Workers & Safai Karamcharis",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NSKFDC",
            "Sanitation Workers",
            "Safai Karamchari",
            "Business Loan"
        ],
        "benefits": "Concessional loans up to ₹15 lakh at 6% interest rate p.a. (1% rebate for women) for starting viable business, transport, or service ventures.",
        "eligibility_summary": "Scavengers, safai karamcharis, and their legal dependents.",
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
                "daily-wage-worker",
                "self-employed"
            ]
        },
        "applyLink": "https://nskfdc.nic.in/",
        "baseMatchScore": 81
    },
    {
        "id": "soc-nskfdc-mahila",
        "title": "NSKFDC Mahila Samridhi Yojana for Women Sanitation Workers",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Mahila Samridhi",
            "Women Scavengers",
            "Micro Loan",
            "Low Interest"
        ],
        "benefits": "Micro-credit up to ₹1 lakh per woman beneficiary at nominal 4% interest rate per annum for petty trade, tailoring, grocery shops, and handicrafts.",
        "eligibility_summary": "Target group women sanitation workers and their female dependents.",
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
                "daily-wage-worker",
                "self-employed",
                "homemaker"
            ]
        },
        "applyLink": "https://nskfdc.nic.in/",
        "baseMatchScore": 86
    },
    {
        "id": "soc-nskfdc-swachhta",
        "title": "NSKFDC Swachhta Udyami Yojana – Mechanized Cleaning Procurement",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Swachhta Udyami",
            "Suction Machines",
            "Entrepreneurship",
            "Sanitation"
        ],
        "benefits": "Concessional loans up to ₹50 lakh for procurement of vacuum loading machines, jetting units, and community toilets, transforming scavengers into sanitary entrepreneurs.",
        "eligibility_summary": "Safai Karamcharis and manual scavengers, either individually or as self-help groups.",
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
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://nskfdc.nic.in/",
        "baseMatchScore": 80
    },
    {
        "id": "soc-nbcfdc-swarnima",
        "title": "NBCFDC New Swarnima Scheme for Backward Class Women",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NBCFDC",
            "New Swarnima",
            "OBC Women",
            "Microcredit",
            "Empowerment"
        ],
        "benefits": "Term loan up to ₹2 lakh at 5% interest per annum with up to 8-year repayment tenure for women belonging to backward classes.",
        "eligibility_summary": "Women belonging to Other Backward Classes (OBC) living below double the poverty line (income under ₹3 lakh).",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "obc"
            ],
            "occupation": [
                "self-employed",
                "homemaker",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://www.nbcfdc.gov.in/",
        "baseMatchScore": 85
    },
    {
        "id": "soc-nbcfdc-saksham",
        "title": "NBCFDC Saksham Scheme – Concessional Education Loans for OBCs",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Education Loan",
            "NBCFDC",
            "OBC Students",
            "Low Interest"
        ],
        "benefits": "Education loan up to ₹15 lakh for studies in India (at 4% p.a. for boys, 3.5% for girls) and up to ₹20 lakh for overseas technical degrees.",
        "eligibility_summary": "Students belonging to OBC category with family income below ₹3 lakh admitted to recognized professional courses.",
        "eligibility": {
            "minAge": 17,
            "maxAge": 32,
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
                "obc"
            ],
            "occupation": [
                "student"
            ]
        },
        "applyLink": "https://www.nbcfdc.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "soc-nbcfdc-shilp",
        "title": "NBCFDC Shilp Sampada Scheme for Backward Class Artisans",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Shilp Sampada",
            "OBC Artisans",
            "Crafts Loan",
            "Tools Grant"
        ],
        "benefits": "Concessional loans up to ₹10 lakh at 6% interest per annum for modernizing workshops, buying high-efficiency tools, and participating in national fairs.",
        "eligibility_summary": "Artisans and craftspersons belonging to Backward Classes with family income under ₹3 lakh.",
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
                "obc"
            ],
            "occupation": [
                "self-employed",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://www.nbcfdc.gov.in/",
        "baseMatchScore": 78
    },
    {
        "id": "soc-nbcfdc-kisan",
        "title": "NBCFDC Mahila Kisan Yojana for Rural OBC Women Farmers",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "Mahila Kisan",
            "OBC Women",
            "Agri Loan",
            "Dairy",
            "Poultry"
        ],
        "benefits": "Term loan up to ₹2 lakh at subsidized 5% interest per annum to purchase cattle, drip irrigation kits, farm inputs, and green storage sheds.",
        "eligibility_summary": "Rural women farmers belonging to OBC categories with annual household income under ₹3 lakh.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 60,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "obc"
            ],
            "occupation": [
                "farmer",
                "self-employed"
            ]
        },
        "applyLink": "https://www.nbcfdc.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "soc-nsfdc-direct",
        "title": "NSFDC Term Loan Scheme for Scheduled Caste Entrepreneurs",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NSFDC",
            "SC Loan",
            "Term Loan",
            "Self Employment",
            "Low Interest"
        ],
        "benefits": "Direct term loans up to ₹50 lakh covering up to 90% of project cost at 6%–9% interest per annum with up to 10-year repayment schedule.",
        "eligibility_summary": "Scheduled Caste individuals having annual family income under ₹3 lakh.",
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
                "sc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ]
        },
        "applyLink": "https://nsfdc.nic.in/",
        "baseMatchScore": 82
    },
    {
        "id": "soc-nsfdc-mahila",
        "title": "NSFDC Mahila Samriddhi Yojana for Scheduled Caste Women",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NSFDC",
            "SC Women",
            "Micro Finance",
            "SHG Loan"
        ],
        "benefits": "Microfinance loans up to ₹1 lakh per woman (or ₹50,000 via SHG) at 4% annual interest rate to set up home businesses and retail shops.",
        "eligibility_summary": "Scheduled Caste women living in rural or urban areas with household income below ₹3 lakh.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 55,
            "gender": [
                "female"
            ],
            "income": [
                "below-1l",
                "1l-2.5l",
                "2.5l-5l"
            ],
            "category": [
                "sc"
            ],
            "occupation": [
                "self-employed",
                "homemaker",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://nsfdc.nic.in/",
        "baseMatchScore": 87
    },
    {
        "id": "soc-nsfdc-mcf",
        "title": "NSFDC Micro Credit Finance (MCF) Scheme for SC Self-Help Groups",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "MCF",
            "Micro Credit",
            "SC SHG",
            "Working Capital"
        ],
        "benefits": "Quick credit up to ₹60,000 per member (maximum ₹10 lakh per SHG) disbursed through state channeling agencies at 5% interest per annum.",
        "eligibility_summary": "Members of registered SC Self-Help Groups requiring short-term micro-loans.",
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
                "sc"
            ],
            "occupation": [
                "self-employed",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://nsfdc.nic.in/",
        "baseMatchScore": 80
    },
    {
        "id": "soc-nsfdc-laghu",
        "title": "NSFDC Laghu Vyavasay Yojana (Small Business Loan for SCs)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Laghu Vyavasay",
            "Small Business",
            "SC Entrepreneurs",
            "Working Capital"
        ],
        "benefits": "Loans up to ₹5 lakh at 6% interest rate per annum with 5-year repayment tenure for retail shops, repair centres, and mobile canteens.",
        "eligibility_summary": "SC individuals with family income under ₹3 lakh setting up small commercial enterprises.",
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
                "sc"
            ],
            "occupation": [
                "self-employed",
                "unemployed"
            ]
        },
        "applyLink": "https://nsfdc.nic.in/",
        "baseMatchScore": 79
    },
    {
        "id": "soc-nsfdc-dhosti",
        "title": "NSFDC Dhosti Scheme for Commercial Vehicle Purchase by SC Drivers",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Transport & Infrastructure",
        "tags": [
            "Dhosti Scheme",
            "Commercial Vehicle",
            "SC Drivers",
            "Auto/Taxi Loan"
        ],
        "benefits": "Term loan assistance up to ₹15 lakh at 7% p.a. for buying commercial passenger taxis, e-rickshaws, goods carriers, and ambulances.",
        "eligibility_summary": "Licensed SC drivers with valid commercial driving licenses and family income under ₹3 lakh.",
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
                "2.5l-5l"
            ],
            "category": [
                "sc"
            ],
            "occupation": [
                "self-employed",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://nsfdc.nic.in/",
        "baseMatchScore": 80
    },
    {
        "id": "soc-sipda",
        "title": "Scheme for Implementation of Persons with Disabilities Act (SIPDA)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "SIPDA",
            "Accessible Infrastructure",
            "Government Offices",
            "Divyangjan"
        ],
        "benefits": "Financial grants to state governments and autonomous bodies to build accessible infrastructure, tactile trails, Braille lifts, and sign-language video kiosks.",
        "eligibility_summary": "Public authorities, government departments, and educational institutions creating accessible environments.",
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
                "salaried",
                "self-employed",
                "unemployed"
            ]
        },
        "applyLink": "https://depwd.gov.in/",
        "baseMatchScore": 75
    },
    {
        "id": "soc-ddrs",
        "title": "Deendayal Disabled Rehabilitation Scheme (DDRS)",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "DDRS",
            "Special Schools",
            "Rehabilitation",
            "NGO Grant",
            "Therapy"
        ],
        "benefits": "Grant-in-aid to voluntary organizations to run special schools for children with hearing/visual impairment, cerebral palsy clinics, and vocational rehabilitation centres.",
        "eligibility_summary": "Children and adults with disabilities accessing rehabilitation services through DDRS-supported institutions.",
        "eligibility": {
            "minAge": 3,
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
                "student",
                "unemployed"
            ]
        },
        "applyLink": "https://ngograntsmis.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "soc-national-institutes-pwd",
        "title": "National Institutes for Persons with Disabilities – Free Therapy and Rehabilitation",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "National Institutes",
            "Free Physiotherapy",
            "Speech Therapy",
            "DEPwD"
        ],
        "benefits": "Free clinical evaluations, speech therapy, physiotherapy, occupational therapy, psychological counseling, and custom prosthetic fitments at 9 National Institutes.",
        "eligibility_summary": "Any person with physical, visual, hearing, intellectual, or multiple disabilities.",
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
                "unemployed",
                "daily-wage-worker",
                "homemaker",
                "self-employed"
            ]
        },
        "applyLink": "https://depwd.gov.in/",
        "baseMatchScore": 87
    },
    {
        "id": "soc-crc-centres",
        "title": "Composite Regional Centres (CRC) for Skill Development and Rehabilitation of PwDs",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "CRC",
            "Rehabilitation",
            "Skill Training",
            "Prosthetics",
            "Divyangjan"
        ],
        "benefits": "Free vocational training in IT, tailoring, and crafts, early intervention therapy clinics, and issuance of UDID disability cards across 25 regional centres.",
        "eligibility_summary": "Persons with disabilities and their families in states and tier-2 regions served by CRCs.",
        "eligibility": {
            "minAge": 2,
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
                "student",
                "self-employed"
            ]
        },
        "applyLink": "https://depwd.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "soc-ddrc-scheme",
        "title": "District Disability Rehabilitation Centres (DDRC) Scheme",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "DDRC",
            "District Centres",
            "Prosthetics",
            "Divyang Aid"
        ],
        "benefits": "Decentralized district-level delivery of disability certificates, free prosthetic fabrication, gait training, parent counselling, and bank loan facilitation.",
        "eligibility_summary": "Persons with disabilities residing in rural and semi-urban districts across India.",
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
                "student",
                "unemployed",
                "daily-wage-worker",
                "farmer",
                "homemaker"
            ]
        },
        "applyLink": "https://depwd.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "soc-nt-niramaya",
        "title": "National Trust – Niramaya Health Insurance Scheme",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Niramaya",
            "Health Insurance",
            "Autism",
            "Cerebral Palsy",
            "National Trust"
        ],
        "benefits": "Affordable health insurance cover up to ₹1 lakh per year covering hospitalisation, corrective surgery, OPD therapy, alternative medicine, and diagnostic tests.",
        "eligibility_summary": "Persons with Autism, Cerebral Palsy, Mental Retardation, and Multiple Disabilities (free premium for BPL families).",
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
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://thenationaltrust.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "soc-nt-samarth",
        "title": "National Trust – Samarth Respite Care Scheme for Persons with Disabilities",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Samarth",
            "Respite Care",
            "Severe Disability",
            "Relief for Parents"
        ],
        "benefits": "Short-term respite care (up to 30 days) and residential relief services for individuals with severe disabilities, allowing primary family caregivers necessary respite.",
        "eligibility_summary": "Persons with Autism, Cerebral Palsy, Intellectual Disability, or Multiple Disabilities covered under the National Trust Act.",
        "eligibility": {
            "minAge": 0,
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
                "unemployed",
                "student"
            ]
        },
        "applyLink": "https://thenationaltrust.gov.in/",
        "baseMatchScore": 81
    },
    {
        "id": "soc-nt-gharaunda",
        "title": "National Trust – Gharaunda Group Home Scheme for Adults with Severe Disabilities",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Gharaunda",
            "Group Home",
            "Lifelong Care",
            "National Trust"
        ],
        "benefits": "Permanent assisted group-home living with medical supervision, vocational engagement, and nutritional meals for adults with severe intellectual disabilities whose parents have passed away.",
        "eligibility_summary": "Adults aged 18+ with Autism, Cerebral Palsy, or Multiple Disabilities lacking family caregivers.",
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
                "unemployed"
            ]
        },
        "applyLink": "https://thenationaltrust.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "soc-nt-vikas",
        "title": "National Trust – Vikas Day Care Scheme for PwDs",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Vikas Day Care",
            "Day Care",
            "Therapy",
            "Intellectual Disability"
        ],
        "benefits": "6-hour daily day care services including life skills coaching, recreation, nutritional midday snacks, and physical therapy for persons with disabilities.",
        "eligibility_summary": "Persons with disabilities covered under the National Trust Act aged 10 years and above.",
        "eligibility": {
            "minAge": 10,
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
                "unemployed",
                "student"
            ]
        },
        "applyLink": "https://thenationaltrust.gov.in/",
        "baseMatchScore": 80
    },
    {
        "id": "soc-nt-sahyogi",
        "title": "National Trust – Sahyogi Caregiver Training Scheme",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "Sahyogi",
            "Caregiver Training",
            "Disability Care",
            "Stipend"
        ],
        "benefits": "3-month certified training program in home-based disability caregiving with monthly stipend of ₹1,000, creating trained professional caregivers for families.",
        "eligibility_summary": "Candidates having passed Class 8 interested in specialized disability caregiving careers.",
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
        "applyLink": "https://thenationaltrust.gov.in/",
        "baseMatchScore": 77
    },
    {
        "id": "soc-nt-prerna",
        "title": "National Trust – Prerna Marketing Assistance Scheme for PwD Artisans",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Prerna",
            "Marketing Grant",
            "PwD Artisans",
            "Exhibitions"
        ],
        "benefits": "Financial grants up to ₹10,000 per event to set up stalls at national melas and exhibitions to sell handicrafts, candles, and food items produced by PwD artisans.",
        "eligibility_summary": "PwD entrepreneurs, self-help groups, and non-profits selling products crafted by persons with disabilities.",
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
        "applyLink": "https://thenationaltrust.gov.in/",
        "baseMatchScore": 76
    },
    {
        "id": "soc-nt-sambhav",
        "title": "National Trust – Sambhav Assistive Devices Display & Demo Centres",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Sambhav",
            "Assistive Tech",
            "Demo Centre",
            "Aids"
        ],
        "benefits": "Hands-on demonstration and trial of over 100 high-tech and low-cost assistive software, adapted cutlery, communication boards, and sensory toys.",
        "eligibility_summary": "Children and adults with disabilities, special educators, and therapists seeking technology recommendations.",
        "eligibility": {
            "minAge": 1,
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
                "unemployed",
                "salaried",
                "homemaker"
            ]
        },
        "applyLink": "https://thenationaltrust.gov.in/",
        "baseMatchScore": 78
    },
    {
        "id": "soc-nt-gyan-prabha",
        "title": "National Trust – Gyan Prabha Educational Scholarship Scheme",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Gyan Prabha",
            "Vocational Scholarship",
            "National Trust",
            "Divyang"
        ],
        "benefits": "Scholarship of ₹1,000 per month for up to 1 year to pursue approved vocational or technical courses leading to gainful employment.",
        "eligibility_summary": "Persons with Autism, Cerebral Palsy, Intellectual Disability, or Multiple Disabilities pursuing skill or vocational training.",
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
                "unemployed"
            ]
        },
        "applyLink": "https://thenationaltrust.gov.in/",
        "baseMatchScore": 81
    },
    {
        "id": "soc-nt-disha",
        "title": "National Trust – Disha Early Intervention and School Readiness Scheme",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Disha",
            "Early Intervention",
            "Infants",
            "Therapy",
            "School Readiness"
        ],
        "benefits": "Comprehensive early diagnosis, multi-disciplinary therapy, and parent guidance for infants and toddlers with developmental delays to facilitate regular school entry.",
        "eligibility_summary": "Children with developmental delays and disabilities aged 0 to 10 years.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 10,
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
            ]
        },
        "applyLink": "https://thenationaltrust.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "soc-pm-ajay-adarsh",
        "title": "Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY) – Adarsh Gram",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "PM-AJAY",
            "Adarsh Gram",
            "Model Village",
            "SC Majority Village"
        ],
        "benefits": "Comprehensive saturation funding of ₹20 lakh per village to build concrete internal roads, solar street lights, piped drinking water, and community recreation halls.",
        "eligibility_summary": "Residents of villages with more than 50% Scheduled Caste population identified under PM-AJAY.",
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
                "sc",
                "general",
                "obc"
            ],
            "occupation": [
                "farmer",
                "daily-wage-worker",
                "self-employed",
                "homemaker"
            ]
        },
        "applyLink": "https://pmajay.dosje.gov.in/",
        "baseMatchScore": 85
    },
    {
        "id": "soc-pm-ajay-livelihood",
        "title": "PM-AJAY – Grant-in-Aid for SC Livelihood Projects & Skill Upgradation",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "PM-AJAY",
            "Livelihood Grant",
            "SC Families",
            "Income Generation"
        ],
        "benefits": "Capital subsidy up to ₹50,000 per beneficiary or ₹5 lakh per Self-Help Group to acquire income-generating assets, dairy cattle, sewing units, or mini flour mills.",
        "eligibility_summary": "BPL SC individuals and self-help groups seeking sustainable self-employment.",
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
                "1l-2.5l"
            ],
            "category": [
                "sc"
            ],
            "occupation": [
                "unemployed",
                "daily-wage-worker",
                "self-employed"
            ]
        },
        "applyLink": "https://pmajay.dosje.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "soc-garima-greh",
        "title": "Garima Greh – Shelter Homes for Transgender Persons in Distress",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Garima Greh",
            "Shelter Home",
            "Transgender",
            "Free Food",
            "Medical Care"
        ],
        "benefits": "Safe shelter, free nutritious food, medical care, psycho-social counselling, and vocational training for destitute and homeless transgender persons.",
        "eligibility_summary": "Transgender individuals facing abandonment, domestic violence, or homelessness.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 65,
            "gender": [
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
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://transgender.dosje.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "soc-transgender-portal",
        "title": "National Portal for Transgender Persons – Online Identity Cards & Certificates",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Transgender Certificate",
            "Identity Card",
            "Self Perceived Gender",
            "Online"
        ],
        "benefits": "100% online, hassle-free issuance of statutory Transgender Identity Cards and Certificates from District Magistrates without physical medical board visits.",
        "eligibility_summary": "Transgender persons seeking legal recognition of self-perceived gender identity.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 85,
            "gender": [
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
                "unemployed"
            ]
        },
        "applyLink": "https://transgender.dosje.gov.in/",
        "baseMatchScore": 92
    },
    {
        "id": "soc-sacred-portal",
        "title": "SACRED – Senior Able Citizens for Re-Employment in Dignity Portal",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Skills & Employment",
        "tags": [
            "SACRED",
            "Senior Jobs",
            "Re-employment",
            "Consulting",
            "Retirees"
        ],
        "benefits": "Direct corporate and SME job-matching platform connecting experienced senior citizens seeking full-time, part-time, or advisory work with verified employers.",
        "eligibility_summary": "Senior citizens aged 60 years and above possessing professional, administrative, or technical skills.",
        "eligibility": {
            "minAge": 60,
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
                "unemployed",
                "salaried"
            ]
        },
        "applyLink": "https://sacred.dosje.gov.in/",
        "baseMatchScore": 80
    },
    {
        "id": "soc-sage-fund",
        "title": "SAGE – Seniorcare Ageing Growth Engine & Silver Economy Startups",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "SAGE",
            "Silver Economy",
            "Elder Care Startups",
            "Equity Grant"
        ],
        "benefits": "Equity grant up to ₹1 crore for innovative startups designing elder-care products, telemedicine, smart monitors, cognitive games, and home assistance services.",
        "eligibility_summary": "Startups and social entrepreneurs developing tech solutions for senior citizen care.",
        "eligibility": {
            "minAge": 21,
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
        "applyLink": "https://sage.dosje.gov.in/",
        "baseMatchScore": 75
    },
    {
        "id": "soc-hazardous-prematric",
        "title": "Pre-Matric Scholarship for Children of Parents in Hazardous Occupations",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "Hazardous Occupations",
            "Waste Pickers",
            "Tanners",
            "Children Scholarship"
        ],
        "benefits": "Scholarship of ₹3,500/year for day scholars and ₹7,000/year for hostellers plus ₹1,000 ad-hoc grant, irrespective of social category or caste.",
        "eligibility_summary": "Children of waste pickers, manual scavengers, flayers, and tanners studying in Classes 1 to 10.",
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
            ]
        },
        "applyLink": "https://scholarships.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "soc-ambedkar-medical",
        "title": "Dr. Ambedkar Medical Scheme for SC/ST Patients for Life-Threatening Ailments",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "Dr Ambedkar Medical",
            "Heart Surgery",
            "Kidney Transplant",
            "Cancer Care",
            "SC/ST"
        ],
        "benefits": "Direct financial grant up to ₹2.5 lakh deposited to government hospital for heart, kidney, liver, brain, and cancer surgery for poor SC/ST patients.",
        "eligibility_summary": "SC/ST patients undergoing major surgical procedures whose family annual income does not exceed ₹3 lakh.",
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
                "2.5l-5l"
            ],
            "category": [
                "sc",
                "st"
            ],
            "occupation": [
                "daily-wage-worker",
                "farmer",
                "unemployed",
                "homemaker"
            ]
        },
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "soc-pcr-poa-act",
        "title": "Centrally Sponsored Scheme for Protection of Civil Rights & Prevention of Atrocities",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Public Safety, Law & Justice",
        "tags": [
            "PoA Act",
            "Atrocity Relief",
            "Legal Aid",
            "SC/ST Protection"
        ],
        "benefits": "Statutory compensation ranging from ₹85,000 to ₹8.25 lakh, free legal aid, monthly pension, and rehabilitation assistance for SC/ST victims of caste atrocities.",
        "eligibility_summary": "SC/ST individuals and families who are victims of atrocities registered under PoA Act.",
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
                "sc",
                "st"
            ],
            "occupation": [
                "daily-wage-worker",
                "farmer",
                "unemployed",
                "salaried",
                "self-employed",
                "homemaker"
            ]
        },
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 91
    },
    {
        "id": "soc-irca-deaddiction",
        "title": "Integrated Rehabilitation Centres for Addicts (IRCA) Scheme",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Health & Wellness",
        "tags": [
            "IRCA",
            "Inpatient Deaddiction",
            "Detoxification",
            "Mental Health"
        ],
        "benefits": "Free 30-to-90 day inpatient medical detoxification, relapse prevention, individual therapy, and family counseling in 350+ certified NGO-run IRCA hospitals.",
        "eligibility_summary": "Individuals struggling with alcohol, opioid, or prescription substance dependence.",
        "eligibility": {
            "minAge": 14,
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
                "unemployed",
                "daily-wage-worker",
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "soc-national-award-pwd",
        "title": "National Awards for the Empowerment of Persons with Disabilities",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "National Award",
            "Divyangjan Role Model",
            "Cash Prize",
            "President of India"
        ],
        "benefits": "Cash awards up to ₹2 lakh, citation, and gold medal conferred by the President of India on International Day of PwDs (3rd Dec) for outstanding role models.",
        "eligibility_summary": "Outstanding achievers with disabilities, barrier-free employers, and technological innovators.",
        "eligibility": {
            "minAge": 12,
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
                "salaried",
                "self-employed",
                "student",
                "unemployed"
            ]
        },
        "applyLink": "https://awards.gov.in/",
        "baseMatchScore": 75
    },
    {
        "id": "soc-vayoshreshtha-samman",
        "title": "Vayoshreshtha Samman – National Award for Senior Citizens",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Vayoshreshtha",
            "Senior Citizen Honour",
            "Centenarian Award",
            "Cash Prize"
        ],
        "benefits": "Cash award up to ₹5 lakh, citation, and memento presented by the President of India to eminent senior citizens and institutions rendering exemplary elder services.",
        "eligibility_summary": "Senior citizens aged 60+ (including centenarians aged 90+) and non-profits dedicated to elder welfare.",
        "eligibility": {
            "minAge": 60,
            "maxAge": 110,
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
                "self-employed"
            ]
        },
        "applyLink": "https://awards.gov.in/",
        "baseMatchScore": 74
    },
    {
        "id": "soc-intercaste-marriage",
        "title": "Dr. Ambedkar Scheme for Social Integration through Inter-Caste Marriages",
        "ministry": "Ministry of Social Justice and Empowerment",
        "type": "central",
        "category": "Social Welfare & Empowerment",
        "tags": [
            "Inter-Caste Marriage",
            "Incentive",
            "Social Integration",
            "DBT"
        ],
        "benefits": "One-time incentive of ₹2.5 lakh (₹1.5 lakh in fixed deposit and ₹1 lakh in cash) for newly wedded couples where one spouse is Dalit (SC) and the other is Non-SC.",
        "eligibility_summary": "Legally registered inter-caste marriages between an SC and a Non-SC Hindu, solemnized under the Hindu Marriage Act.",
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
                "sc",
                "general",
                "obc"
            ],
            "occupation": [
                "salaried",
                "self-employed",
                "unemployed",
                "farmer"
            ]
        },
        "applyLink": "https://socialjustice.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "comm-sisfs",
        "title": "Startup India Seed Fund Scheme (SISFS)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "SISFS",
            "Seed Fund",
            "Startup India",
            "Proof of Concept",
            "Incubators"
        ],
        "benefits": "Grants up to ₹20 lakh for proof of concept and prototype development; debt/convertible debentures up to ₹50 lakh for market launch and scaling via approved incubators.",
        "eligibility_summary": "DPIIT-recognized early-stage startups with an innovative business concept incorporated within 2 years.",
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
        "applyLink": "https://seedfund.startupindia.gov.in/",
        "baseMatchScore": 86
    },
    {
        "id": "comm-ffs",
        "title": "Fund of Funds for Startups (FFS) – SIDBI Venture Capital Support",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "FFS",
            "SIDBI",
            "Venture Capital",
            "Alternative Investment Funds",
            "DPIIT"
        ],
        "benefits": "₹10,000 crore corpus managed by SIDBI investing in SEBI-registered Alternative Investment Funds (AIFs) to multiply venture capital availability for Indian startups.",
        "eligibility_summary": "DPIIT-recognized Indian startups seeking equity funding from partner venture capital funds.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://www.startupindia.gov.in/",
        "baseMatchScore": 80
    },
    {
        "id": "comm-cgss",
        "title": "Credit Guarantee Scheme for Startups (CGSS)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "CGSS",
            "Credit Guarantee",
            "Collateral Free Loan",
            "Venture Debt"
        ],
        "benefits": "Credit guarantee cover up to ₹10 crore per borrower for collateral-free venture debt and term loans extended to eligible startups by banks and NBFCs.",
        "eligibility_summary": "DPIIT-recognized startups with verifiable revenue or venture capital backing.",
        "eligibility": {
            "minAge": 21,
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
        "applyLink": "https://www.startupindia.gov.in/",
        "baseMatchScore": 81
    },
    {
        "id": "comm-pli-electronics",
        "title": "PLI Scheme for Large Scale Electronics Manufacturing",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PLI",
            "Electronics",
            "Mobile Phones",
            "Make in India",
            "Incentive"
        ],
        "benefits": "Incentive of 4% to 6% on incremental sales of manufactured mobile phones and electronic components produced in India for 5 years.",
        "eligibility_summary": "Domestic and global electronics manufacturing companies investing in local production plants.",
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://www.meity.gov.in/esdm/pli",
        "baseMatchScore": 72
    },
    {
        "id": "comm-pli-pharma",
        "title": "PLI Scheme for Pharmaceuticals and Active Pharmaceutical Ingredients (APIs)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PLI Pharma",
            "APIs",
            "Drug Manufacturing",
            "KSMs",
            "Incentive"
        ],
        "benefits": "Financial incentives of 3% to 10% on incremental sales over base year to produce key starting materials, biosimilars, and formulations indigenously.",
        "eligibility_summary": "Pharmaceutical manufacturing companies incorporated in India with approved project proposals.",
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://pharmaceuticals.gov.in/",
        "baseMatchScore": 71
    },
    {
        "id": "comm-pli-telecom",
        "title": "PLI Scheme for Telecom and Networking Products",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PLI Telecom",
            "5G Equipment",
            "Routers",
            "Switches",
            "Make in India"
        ],
        "benefits": "Incentive of 4% to 7% on incremental sales of switches, routers, 5G radio access network gear, and optical equipment made in India.",
        "eligibility_summary": "Telecom equipment manufacturers meeting committed investment and minimum local turnover criteria.",
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://dot.gov.in/",
        "baseMatchScore": 70
    },
    {
        "id": "comm-pli-white-goods",
        "title": "PLI Scheme for White Goods (Air Conditioners and LED Lights)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PLI White Goods",
            "Air Conditioners",
            "LED Lights",
            "Component Manufacturing"
        ],
        "benefits": "Direct incentive of 4% to 6% on incremental sales of AC components (compressors, heat exchangers) and LED parts (drivers, chips) manufactured in India.",
        "eligibility_summary": "Manufacturers of components for air conditioners and LED lighting systems registered in India.",
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
        "applyLink": "https://dpiit.gov.in/",
        "baseMatchScore": 73
    },
    {
        "id": "comm-pli-auto",
        "title": "PLI Scheme for Automobile and Auto Component Industry",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PLI Auto",
            "Electric Vehicles",
            "Advanced Automotive Tech",
            "Hydrogen Fuel"
        ],
        "benefits": "Financial incentives up to 18% on incremental sales of Advanced Automotive Technology products including electric powertrains and hydrogen fuel systems.",
        "eligibility_summary": "Automotive OEMs and component manufacturers investing in clean and advanced automotive technologies.",
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://heavyindustries.gov.in/",
        "baseMatchScore": 71
    },
    {
        "id": "comm-pli-battery",
        "title": "PLI Scheme for National Programme on Advanced Chemistry Cell (ACC) Battery Storage",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "ACC Battery",
            "Giga Factories",
            "Lithium Ion",
            "Energy Storage"
        ],
        "benefits": "Cash subsidy per kilowatt-hour of advanced battery cells produced with scaled domestic value addition up to 50 GWh manufacturing capacity.",
        "eligibility_summary": "Selected battery manufacturing consortiums setting up giga-scale ACC manufacturing units in India.",
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
        "applyLink": "https://heavyindustries.gov.in/",
        "baseMatchScore": 69
    },
    {
        "id": "comm-pli-medtech",
        "title": "PLI Scheme for Medical Devices Manufacturing",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PLI MedTech",
            "Medical Devices",
            "MRI/CT Scanners",
            "Dialysis",
            "Incentive"
        ],
        "benefits": "5% financial incentive on incremental sales of domestic medical devices (cancer care equipment, radiology scanners, heart valves, and dialysis machines).",
        "eligibility_summary": "Companies manufacturing high-end medical equipment within India.",
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://pharmaceuticals.gov.in/",
        "baseMatchScore": 72
    },
    {
        "id": "comm-pli-steel",
        "title": "PLI Scheme for Specialty Steel Manufacturing",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PLI Steel",
            "Specialty Steel",
            "Electrical Steel",
            "Alloy Steel"
        ],
        "benefits": "Incentive of 4% to 12% on production of specialty steel grades (coated steel, electrical steel, high strength steel) to eliminate imports.",
        "eligibility_summary": "Steel manufacturing units investing in approved high-grade specialty steel production facilities.",
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
        "applyLink": "https://steel.gov.in/",
        "baseMatchScore": 67
    },
    {
        "id": "comm-pli-drones",
        "title": "PLI Scheme for Drones and Drone Components",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PLI Drones",
            "UAV",
            "Drone Components",
            "Flight Controllers",
            "Incentive"
        ],
        "benefits": "Direct incentive of 20% on value addition made in manufacturing drones, flight controllers, motors, batteries, and ground control stations in India.",
        "eligibility_summary": "Indian startups and manufacturers of drones and critical drone subsystems.",
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
            ]
        },
        "applyLink": "https://www.civilaviation.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "comm-gatishakti",
        "title": "PM GatiShakti National Master Plan – Multi-Modal Logistics Support",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Transport & Infrastructure",
        "tags": [
            "GatiShakti",
            "Logistics",
            "Multi-Modal",
            "Freight Corridors",
            "GIS"
        ],
        "benefits": "Single GIS-based platform coordinating road, rail, air, and port connectivity to reduce logistics costs to single digits and speed up factory clearances.",
        "eligibility_summary": "Logistics operators, industrial park developers, transport providers, and manufacturing units.",
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
                "salaried"
            ]
        },
        "applyLink": "https://gatishakti.gov.in/",
        "baseMatchScore": 77
    },
    {
        "id": "comm-nicdc",
        "title": "National Industrial Corridor Development Programme (NICDC)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NICDC",
            "Smart Cities",
            "Industrial Parks",
            "Plug & Play Factory"
        ],
        "benefits": "Plug-and-play industrial land, 24/7 reliable power, trunk infrastructure, and automated clearance across 11 major smart industrial corridors.",
        "eligibility_summary": "Manufacturing enterprises and global investors seeking industrial land plots in planned corridors.",
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
        "applyLink": "https://www.nicdc.in/",
        "baseMatchScore": 74
    },
    {
        "id": "comm-odop",
        "title": "One District One Product (ODOP) Initiative",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "ODOP",
            "Artisans",
            "District Exports",
            "Geographical Indication",
            "E-Commerce"
        ],
        "benefits": "Free seller onboarding on GeM and international marketplaces, packaging design grants, testing facility access, and global buyer delegations for regional crafts and food items.",
        "eligibility_summary": "Local artisans, farmers, SHGs, and MSMEs producing indigenous district-specific specialty goods.",
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
                "self-employed",
                "farmer",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://www.investindia.gov.in/odop",
        "baseMatchScore": 88
    },
    {
        "id": "comm-iprs",
        "title": "Industrial Park Rating System (IPRS 2.0)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "IPRS",
            "Industrial Parks",
            "Infrastructure Rating",
            "SEZ"
        ],
        "benefits": "Objective evaluation and national star rating of industrial parks, helping investors choose transparent sites with effluent treatment and seamless highway connectivity.",
        "eligibility_summary": "Industrial park developers, state industrial development corporations, and manufacturing park operators.",
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://dpiit.gov.in/",
        "baseMatchScore": 68
    },
    {
        "id": "comm-nsws",
        "title": "National Single Window System (NSWS) for Business Approvals",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "NSWS",
            "Single Window",
            "Ease of Doing Business",
            "Licenses"
        ],
        "benefits": "One-stop digital portal integrating over 250 central and state government clearances, licenses, and renewals without duplicate form submissions.",
        "eligibility_summary": "All businesses, startups, and foreign investors establishing or operating enterprises in India.",
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
        "applyLink": "https://www.nsws.gov.in/",
        "baseMatchScore": 90
    },
    {
        "id": "comm-invest-india",
        "title": "Invest India – National Investment Promotion and Facilitation Agency",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Invest India",
            "FDI Facilitation",
            "Joint Ventures",
            "Handholding"
        ],
        "benefits": "Dedicated sector experts providing free location scouting, regulatory advisory, joint venture partner search, and policy advocacy for domestic and overseas investors.",
        "eligibility_summary": "Domestic corporate houses, startups, and international foreign investors looking to invest in India.",
        "eligibility": {
            "minAge": 20,
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://www.investindia.gov.in/",
        "baseMatchScore": 75
    },
    {
        "id": "comm-make-in-india",
        "title": "Make in India Champion Services and Manufacturing Initiative",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Make in India",
            "Manufacturing",
            "Export Promotion",
            "Champion Sectors"
        ],
        "benefits": "Special fiscal packages, fast-track land allocation, reduced corporate taxes, and dedicated grievance redressal across 27 champion manufacturing sectors.",
        "eligibility_summary": "Enterprises manufacturing goods in India or offering IT, engineering, and healthcare services.",
        "eligibility": {
            "minAge": 21,
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
        "applyLink": "https://www.makeinindia.com/",
        "baseMatchScore": 84
    },
    {
        "id": "comm-sip",
        "title": "Scheme for Investment Promotion (SIP)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Investment Promotion",
            "Roadshows",
            "FDI Growth",
            "DPIIT"
        ],
        "benefits": "Government sponsorship for organizing investor summits, international roadshows, bilateral business councils, and trade promotion delegations.",
        "eligibility_summary": "Industry associations, trade bodies, and export promotion organizations promoting trade and investments.",
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://dpiit.gov.in/",
        "baseMatchScore": 66
    },
    {
        "id": "comm-ifldp-clusters",
        "title": "Indian Footwear and Leather Development Programme (IFLDP) – Mega Leather Clusters",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Leather Cluster",
            "Footwear",
            "IFLDP",
            "Infrastructure Subsidy"
        ],
        "benefits": "Financial assistance up to 50% of project cost (max ₹125 crore per cluster) to set up Mega Leather, Footwear and Accessories Clusters with modern testing facilities.",
        "eligibility_summary": "Special Purpose Vehicles (SPVs) formed by leather and footwear manufacturing enterprises.",
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
        "applyLink": "https://dpiit.gov.in/",
        "baseMatchScore": 68
    },
    {
        "id": "comm-ifldp-tech",
        "title": "IFLDP – Sustainable Technology Solutions for Leather Units",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Sustainable Leather",
            "CETP",
            "Zero Liquid Discharge",
            "Green Subsidy"
        ],
        "benefits": "Central grant of 70% of project cost to upgrade Common Effluent Treatment Plants (CETPs) to achieve Zero Liquid Discharge in leather tanneries.",
        "eligibility_summary": "Tannery clusters and CETP operating agencies across major leather manufacturing states.",
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
        "applyLink": "https://dpiit.gov.in/",
        "baseMatchScore": 67
    },
    {
        "id": "comm-ifldp-brand",
        "title": "IFLDP – Brand Promotion of Indian Leather and Footwear",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Brand Promotion",
            "Footwear Exports",
            "Global Marketing",
            "Leather"
        ],
        "benefits": "Financial assistance up to 50% of expenditure (max ₹3 crore) for Indian footwear and leather brands participating in premier international fairs and buyer meets.",
        "eligibility_summary": "Registered Indian leather and footwear manufacturers marketing indigenously made brands.",
        "eligibility": {
            "minAge": 21,
            "maxAge": 65,
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
        "applyLink": "https://dpiit.gov.in/",
        "baseMatchScore": 71
    },
    {
        "id": "comm-pmg",
        "title": "Project Monitoring Group (PMG) – Fast-Track Infrastructure Clearance",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "PMG",
            "Fast Track Clearance",
            "Mega Projects",
            "Inter-Ministerial"
        ],
        "benefits": "Institutional mechanism to resolve inter-ministerial bottlenecks, environmental approvals, and land disputes for public and private mega projects exceeding ₹500 crore.",
        "eligibility_summary": "Industrial and infrastructure developers executing major investment projects.",
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://pmg.gov.in/",
        "baseMatchScore": 65
    },
    {
        "id": "comm-mai",
        "title": "Market Access Initiative (MAI) Scheme for Exporters",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "MAI",
            "Exporters",
            "Overseas Fairs",
            "Stall Subsidy",
            "Buyer Seller Meet"
        ],
        "benefits": "Reimbursement of stall rent up to ₹3.5 lakh and economy airfare subsidies for MSME exporters showcasing products at international exhibitions worldwide.",
        "eligibility_summary": "Exporters holding valid Import Export Code (IEC) registered with Export Promotion Councils.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 85
    },
    {
        "id": "comm-tma-agri",
        "title": "Transport and Marketing Assistance (TMA) for Agricultural Produce",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Agriculture, Rural & Environment",
        "tags": [
            "TMA",
            "Agri Exports",
            "Freight Subsidy",
            "Air Freight",
            "Shipping"
        ],
        "benefits": "Direct freight subsidy reimbursement on international air and ocean transport to make Indian fruits, spices, tea, and processed foods price-competitive overseas.",
        "eligibility_summary": "Exporters of eligible agricultural, horticulture, and processed farm products.",
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
                "farmer",
                "self-employed"
            ]
        },
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 80
    },
    {
        "id": "comm-interest-equalisation",
        "title": "Interest Equalization Scheme on Pre and Post Shipment Rupee Export Credit",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Interest Subvention",
            "Export Credit",
            "Working Capital",
            "RBI"
        ],
        "benefits": "3% interest subvention for MSME manufacturer exporters and 2% for specified tariff lines on packing credit and post-shipment rupee loans.",
        "eligibility_summary": "All MSME manufacturer exporters and merchant exporters exporting under eligible tariff items.",
        "eligibility": {
            "minAge": 21,
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
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 84
    },
    {
        "id": "comm-epcg",
        "title": "Export Promotion Capital Goods (EPCG) Scheme",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "EPCG",
            "Duty Free Machinery",
            "Customs Duty Waiver",
            "Capital Goods"
        ],
        "benefits": "Zero customs duty import of capital machinery and equipment required for producing export goods, subject to meeting 6x export obligation over 6 years.",
        "eligibility_summary": "Manufacturer exporters, service providers, and merchant exporters tied with supporting manufacturers.",
        "eligibility": {
            "minAge": 21,
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
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "comm-advance-authorisation",
        "title": "Advance Authorisation Scheme for Duty-Free Raw Material Import",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Advance Authorisation",
            "Raw Materials",
            "Customs Exemption",
            "DGFT"
        ],
        "benefits": "Exemption from basic customs duty, IGST, and anti-dumping duties on raw materials and inputs physically incorporated into export products.",
        "eligibility_summary": "Manufacturer exporters or merchant exporters tied to supporting manufacturers holding valid IEC.",
        "eligibility": {
            "minAge": 21,
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
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 81
    },
    {
        "id": "comm-dfia",
        "title": "Duty Free Import Authorisation (DFIA) Scheme",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "DFIA",
            "Transferable Duty Exemption",
            "Import Insumos",
            "DGFT"
        ],
        "benefits": "Duty-free import of fuel and raw materials where authorisations become freely transferable after completion of export obligations.",
        "eligibility_summary": "Exporters producing standard input-output norm (SION) compliant goods.",
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
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 75
    },
    {
        "id": "comm-rodtep",
        "title": "Remission of Duties and Taxes on Exported Products (RoDTEP) Scheme",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "RoDTEP",
            "Tax Rebate",
            "Export Incentive",
            "Transferable Scrips"
        ],
        "benefits": "Rebate of 0.5% to 4.3% of FOB value as electronic duty credits to refund embedded central, state, and local duties (mandi tax, electricity duty, fuel VAT).",
        "eligibility_summary": "All Indian manufacturer and merchant exporters shipping goods under eligible tariff codes.",
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
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 88
    },
    {
        "id": "comm-rosctl",
        "title": "Rebate of State and Central Taxes and Levies (RoSCTL) for Apparel Exports",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "RoSCTL",
            "Textiles",
            "Garment Exports",
            "Duty Scrips",
            "Customs Rebate"
        ],
        "benefits": "Up to 6.05% rebate on FOB value for garments and 8.2% for made-ups to refund un-rebated state VAT, electricity duties, and stamp duties via duty credit scrips.",
        "eligibility_summary": "Exporters of apparel, garments, and made-up textile products.",
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
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 83
    },
    {
        "id": "comm-status-holder",
        "title": "Status Holder Certificate & Privileges for Exporters",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Status Holder",
            "Star Export House",
            "Fast Track Customs",
            "DGFT"
        ],
        "benefits": "Green channel customs clearance, exemption from bank guarantees in export schemes, priority container handling, and self-certification of origin.",
        "eligibility_summary": "Exporters reaching $3 million (One Star) up to $800 million (Five Star) cumulative export performance over 3 years.",
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
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 78
    },
    {
        "id": "comm-sez-incentives",
        "title": "Special Economic Zones (SEZ) Duty and Tax Incentives",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "SEZ",
            "Tax Exemption",
            "Zero Duty Import",
            "Export Zone"
        ],
        "benefits": "100% income tax exemption on export profits for first 5 years, duty-free domestic procurement, single window approvals, and automated GST refunds.",
        "eligibility_summary": "Enterprises establishing manufacturing or service units within designated Special Economic Zones.",
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://sezindia.nic.in/",
        "baseMatchScore": 80
    },
    {
        "id": "comm-eou",
        "title": "Export Oriented Units (EOU) Scheme",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "EOU",
            "Duty Free Procurement",
            "100% Export",
            "Manufacturing"
        ],
        "benefits": "Duty-free import and domestic purchase of capital goods, raw materials, and consumables; fast-track customs bonding; and up to 50% domestic tariff area sales.",
        "eligibility_summary": "Manufacturing and software units committing to export their entire production of goods or services.",
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
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 76
    },
    {
        "id": "comm-ehtp",
        "title": "Electronics Hardware Technology Park (EHTP) Scheme",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "EHTP",
            "Hardware Manufacturing",
            "Duty Free Import",
            "Electronics Export"
        ],
        "benefits": "Complete customs duty exemption on imported capital goods, testing equipment, and electronic components for hardware product development.",
        "eligibility_summary": "Companies setting up electronics hardware R&D and manufacturing units.",
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
        "applyLink": "https://www.stpi.in/",
        "baseMatchScore": 73
    },
    {
        "id": "comm-stpi-export",
        "title": "Software Technology Parks of India (STPI) Export Promotion Scheme",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "STPI",
            "IT Exports",
            "Software Tech Park",
            "Incubation",
            "High Speed Bandwidth"
        ],
        "benefits": "100% foreign equity permitted, zero import duty on IT equipment, dedicated high-speed international data pipes, and plug-and-play incubator seats.",
        "eligibility_summary": "Software development companies and IT-enabled service (ITES) exporters.",
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
                "self-employed"
            ]
        },
        "applyLink": "https://www.stpi.in/",
        "baseMatchScore": 85
    },
    {
        "id": "comm-ties",
        "title": "Trade Infrastructure for Export Scheme (TIES)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Transport & Infrastructure",
        "tags": [
            "TIES",
            "Cold Chain",
            "Testing Labs",
            "Dry Ports",
            "Export Infra"
        ],
        "benefits": "Central grant-in-aid up to ₹20 crore to build critical trade infrastructure including border trade posts, cold storage chains, testing labs, and container freight stations.",
        "eligibility_summary": "Government agencies, export promotion councils, and joint venture entities establishing export infrastructure.",
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
                "salaried",
                "self-employed"
            ]
        },
        "applyLink": "https://commerce.gov.in/",
        "baseMatchScore": 70
    },
    {
        "id": "comm-seis",
        "title": "Services Exports from India Scheme (SEIS – Duty Credit Incentives)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "SEIS",
            "Service Exports",
            "Tourism",
            "Consulting",
            "Duty Credit Scrips"
        ],
        "benefits": "Duty credit scrips worth 3% to 7% of net foreign exchange earnings for notified professional, healthcare, educational, and tourism service providers.",
        "eligibility_summary": "Service providers earning minimum $15,000 net foreign exchange per financial year ($10,000 for individual/proprietorship).",
        "eligibility": {
            "minAge": 21,
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
        "applyLink": "https://www.dgft.gov.in/",
        "baseMatchScore": 79
    },
    {
        "id": "comm-pph",
        "title": "Patent Prosecution Highway (PPH) Fast-Track Patent Scheme",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Science, IT & Communications",
        "tags": [
            "PPH",
            "Fast Track Patent",
            "IP India",
            "International Patents"
        ],
        "benefits": "Expedited examination of patent applications in India within weeks when corresponding claims have been examined by partner global patent offices.",
        "eligibility_summary": "Indian and international inventors, startups, and academic researchers filing patents under PPH bilateral agreements.",
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
                "self-employed",
                "salaried"
            ]
        },
        "applyLink": "https://ipindia.gov.in/",
        "baseMatchScore": 76
    },
    {
        "id": "comm-sipp-ii",
        "title": "Scheme for Facilitating Startups and MSMEs in Intellectual Property (SIPP II)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "SIPP",
            "Free Facilitators",
            "Patent Fee Concession",
            "Trademark 50%"
        ],
        "benefits": "80% rebate on official patent fees, 50% rebate on trademark fees, and 100% government payment of facilitator attorney fees for startups and MSMEs.",
        "eligibility_summary": "All DPIIT-recognized startups and registered micro, small, and medium enterprises filing patents and trademarks.",
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
                "student"
            ]
        },
        "applyLink": "https://ipindia.gov.in/",
        "baseMatchScore": 89
    },
    {
        "id": "comm-nipam",
        "title": "National Intellectual Property Awareness Mission (NIPAM)",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Education & Learning",
        "tags": [
            "NIPAM",
            "IP Awareness",
            "Patent Education",
            "Schools & Colleges"
        ],
        "benefits": "Free certified training on copyright, trademarks, design rights, and patents for 1 million students in schools and colleges across India.",
        "eligibility_summary": "School students (Class 8–12), college students, and faculty members in recognized institutions.",
        "eligibility": {
            "minAge": 13,
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
                "salaried"
            ]
        },
        "applyLink": "https://nipam.ipindia.gov.in/",
        "baseMatchScore": 82
    },
    {
        "id": "comm-ibp-trade",
        "title": "Indian Business Portal (IBP) for B2B International E-Commerce",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "IBP",
            "B2B Export",
            "FIEO",
            "Global Buyers",
            "MSME Showcase"
        ],
        "benefits": "Free international marketplace listing for Indian MSME exporters to connect directly with verified overseas wholesale buyers without distributor margins.",
        "eligibility_summary": "Indian exporters, artisans, and MSMEs with valid IEC registered with FIEO.",
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
        "applyLink": "https://indianbusinessportal.in/",
        "baseMatchScore": 86
    },
    {
        "id": "comm-gi-registry",
        "title": "Geographical Indications (GI) Registry & Artisan Promotion Scheme",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "GI Tag",
            "Traditional Crafts",
            "Intellectual Property",
            "Authenticity Logo"
        ],
        "benefits": "Legal protection against duplicate imitations, official GI user registration, authorized user logo, and subsidized participation in international GI trade fairs.",
        "eligibility_summary": "Artisan societies, farmer associations, and producers of registered GI products across India.",
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
                "self-employed",
                "farmer",
                "daily-wage-worker"
            ]
        },
        "applyLink": "https://ipindia.gov.in/gi.htm",
        "baseMatchScore": 83
    },
    {
        "id": "comm-zed-export",
        "title": "Zero Defect Zero Effect (ZED) Certification Subsidies for Exporters",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "ZED Certification",
            "Quality Standards",
            "Eco Friendly",
            "MSME Subsidy"
        ],
        "benefits": "Up to 80% subsidy on bronze, silver, and gold ZED quality certification and financial grant up to ₹5 lakh for testing equipment and clean manufacturing.",
        "eligibility_summary": "Udyam-registered manufacturing MSMEs upgrading product quality and environmental parameters.",
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
        "baseMatchScore": 81
    },
    {
        "id": "comm-startup-national-awards",
        "title": "National Startup Awards – Recognition and Mentorship Programme",
        "ministry": "Ministry of Commerce and Industry",
        "type": "central",
        "category": "Business & Entrepreneurship",
        "tags": [
            "Startup Awards",
            "Cash Prize",
            "DPIIT",
            "Investor Access",
            "Mentorship"
        ],
        "benefits": "Cash prize of ₹5 lakh to winning startups, direct access to government procurement, pilot project opportunities with central ministries, and investor matchmaking.",
        "eligibility_summary": "DPIIT-recognized startups that demonstrate measurable social impact, high innovation, and domestic employment generation.",
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
            ]
        },
        "applyLink": "https://www.startupindia.gov.in/",
        "baseMatchScore": 85
    }
];

module.exports = { socialAndCommerceSchemes };
