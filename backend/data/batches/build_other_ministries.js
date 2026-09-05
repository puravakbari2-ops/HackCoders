const fs = require('fs');

// Remaining Ministries Batch (70 schemes across 22 ministries)
// 1. Fisheries, Animal Husbandry & Dairying: 8
// 2. Labour and Employment: 7
// 3. Chemicals and Fertilizers: 6
// 4. Health & Family Welfare: 6
// 5. Minority Affairs: 5
// 6. Communication: 4
// 7. Skill Development: 4
// 8. Tribal Affairs: 4
// 9. Ayush: 3
// 10. External Affairs: 3
// 11. Finance: 3
// 12. New and Renewable Energy: 3
// 13. Environment, Forest & Climate Change: 2
// 14. Jal Shakti: 2
// 15. Personnel, Public Grievances & Pensions: 2
// 16. Ports, Shipping & Waterways: 2
// 17. Corporate Affairs: 1
// 18. Food Processing: 1
// 19. Heavy Industries: 1
// 20. Law & Justice: 1
// 21. Tourism: 1
// 22. Women & Child Development: 1
// Total = 70 schemes

const otherSchemes = [
    // --- 1. Fisheries, Animal Husbandry & Dairying (8) ---
    {
        id: "fish-pmmsy-aqua",
        title: "PM Matsya Sampada Yojana (PMMSY) – Inland & Marine Aquaculture Expansion",
        ministry: "Ministry of Fisheries, Animal Husbandry and Dairying",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["PMMSY", "Fish Farming", "Biofloc", "Pond Construction", "60% Subsidy"],
        benefits: "40% subsidy for general and 60% for SC/ST/women farmers for constructing new fish ponds, biofloc tanks, RAS, and purchasing modern aerators.",
        eligibility_summary: "Fishers, fish farmers, fish workers, SHGs, and JLGs engaged in fisheries.",
        eligibility: { minAge: 18, maxAge: 70, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer", "self-employed"] },
        applyLink: "https://pmmsy.dof.gov.in/",
        baseMatchScore: 88
    },
    {
        id: "fish-pmmsy-vessels",
        title: "PMMSY – Deep Sea Fishing Vessel Acquisition Scheme",
        ministry: "Ministry of Fisheries, Animal Husbandry and Dairying",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["Deep Sea Fishing", "Trawler Subsidy", "Traditional Fishermen", "Marine Exports"],
        benefits: "Subsidies up to 60% (max ₹48 lakh) on unit cost of ₹80 lakh for traditional fishermen collectives to upgrade to modern deep-sea fishing vessels with GPS/sonar.",
        eligibility_summary: "Traditional marine fishermen groups, SHGs, and fisheries cooperatives.",
        eligibility: { minAge: 18, maxAge: 65, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "sc", "st", "obc"], occupation: ["daily-wage-worker", "self-employed"] },
        applyLink: "https://pmmsy.dof.gov.in/",
        baseMatchScore: 82
    },
    {
        id: "fish-fidf",
        title: "Fisheries and Aquaculture Infrastructure Development Fund (FIDF)",
        ministry: "Ministry of Fisheries, Animal Husbandry and Dairying",
        type: "central",
        category: "Transport & Infrastructure",
        tags: ["FIDF", "Fishing Harbour", "Cold Chain", "Interest Subvention 3%"],
        benefits: "Concessional finance through NABARD/NCDC with 3% interest subvention for fishing harbours, fish landing centres, and modern ice plants.",
        eligibility_summary: "State governments, cooperatives, private entrepreneurs, and FPOs developing fish landing infrastructure.",
        eligibility: { minAge: 21, maxAge: 70, gender: ["male", "female", "transgender"], income: ["above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed"] },
        applyLink: "https://dof.gov.in/",
        baseMatchScore: 75
    },
    {
        id: "fish-gokul-mission",
        title: "Rashtriya Gokul Mission (RGM) – Indigenous Bovine Breed Conservation",
        ministry: "Ministry of Fisheries, Animal Husbandry and Dairying",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["Rashtriya Gokul", "Desi Cow", "Sexed Semen", "Gokul Gram", "Dairy"],
        benefits: "Subsidized sex-sorted semen doses (guaranteeing 90% female calf births), free artificial insemination, and 50% capital subsidy (up to ₹4 crore) for breed multiplication farms.",
        eligibility_summary: "Dairy farmers, gaushalas, rural entrepreneurs, and livestock cooperatives.",
        eligibility: { minAge: 18, maxAge: 75, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer"] },
        applyLink: "https://dahd.nic.in/",
        baseMatchScore: 89
    },
    {
        id: "fish-npdd",
        title: "National Programme for Dairy Development (NPDD)",
        ministry: "Ministry of Fisheries, Animal Husbandry and Dairying",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["NPDD", "Milk Chilling", "Bulk Milk Cooler", "Cooperative Dairy"],
        benefits: "Financial assistance for electronic milk adulteration testing equipment, Bulk Milk Coolers (BMCs), and automated milk collection centres in dairy cooperatives.",
        eligibility_summary: "Village Dairy Cooperative Societies, milk producer companies, and dairy unions.",
        eligibility: { minAge: 18, maxAge: 70, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer", "self-employed"] },
        applyLink: "https://dahd.nic.in/",
        baseMatchScore: 84
    },
    {
        id: "fish-didf",
        title: "Dairy Processing and Infrastructure Development Fund (DIDF)",
        ministry: "Ministry of Fisheries, Animal Husbandry and Dairying",
        type: "central",
        category: "Business & Entrepreneurship",
        tags: ["DIDF", "Dairy Processing", "Milk Powder Plant", "Interest Subvention"],
        benefits: "Loans with 2.5% interest subvention for establishing new milk processing plants, automated packaging lines, and value-added curd/cheese manufacturing units.",
        eligibility_summary: "State dairy federations, milk unions, and private dairy manufacturing units.",
        eligibility: { minAge: 21, maxAge: 70, gender: ["male", "female", "transgender"], income: ["above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed"] },
        applyLink: "https://dahd.nic.in/",
        baseMatchScore: 73
    },
    {
        id: "fish-nlm",
        title: "National Livestock Mission (NLM) – Breed Development for Poultry, Sheep & Goat",
        ministry: "Ministry of Fisheries, Animal Husbandry and Dairying",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["NLM", "Goat Farming", "Poultry Farming", "50% Capital Subsidy"],
        benefits: "50% capital subsidy (up to ₹50 lakh for goat/sheep farms, ₹25 lakh for poultry parent farms, and ₹50 lakh for silage/fodder units).",
        eligibility_summary: "Individual livestock entrepreneurs, farmers, SHGs, and Section 8 companies setting up commercial livestock breeding farms.",
        eligibility: { minAge: 18, maxAge: 65, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer", "self-employed"] },
        applyLink: "https://nlm.udyamimitra.in/",
        baseMatchScore: 87
    },
    {
        id: "fish-ahidf",
        title: "Animal Husbandry Infrastructure Development Fund (AHIDF)",
        ministry: "Ministry of Fisheries, Animal Husbandry and Dairying",
        type: "central",
        category: "Business & Entrepreneurship",
        tags: ["AHIDF", "Meat Processing", "Animal Feed Plant", "3% Subvention"],
        benefits: "3% interest subvention on term loans up to 90% of project cost, with credit guarantee cover up to 25% for setting up feed plants and meat processing units.",
        eligibility_summary: "Micro, small, and medium enterprises, private companies, and FPOs investing in animal husbandry infrastructure.",
        eligibility: { minAge: 21, maxAge: 70, gender: ["male", "female", "transgender"], income: ["5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed"] },
        applyLink: "https://ahidf.udyamimitra.in/",
        baseMatchScore: 78
    },

    // --- 2. Labour and Employment (7) ---
    {
        id: "lab-pmsym",
        title: "Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM) – Pension for Unorganised Workers",
        ministry: "Ministry of Labour and Employment",
        type: "central",
        category: "Social Welfare & Empowerment",
        tags: ["PM-SYM", "Unorganised Workers", "Monthly Pension 3000", "LIC"],
        benefits: "Guaranteed lifelong pension of ₹3,000 per month from age 60, with equal 50% monthly contribution matched by Central Government.",
        eligibility_summary: "Unorganised workers (rickshaw pullers, domestic maids, street vendors, construction laborers) aged 18–40 with monthly income under ₹15,000.",
        eligibility: { minAge: 18, maxAge: 40, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l"], category: ["general", "sc", "st", "obc"], occupation: ["daily-wage-worker", "self-employed", "homemaker"] },
        applyLink: "https://maandhan.in/",
        baseMatchScore: 94
    },
    {
        id: "lab-ncs",
        title: "National Career Service (NCS) Portal & Model Career Centres",
        ministry: "Ministry of Labour and Employment",
        type: "central",
        category: "Skills & Employment",
        tags: ["NCS Portal", "Job Search", "Job Fair", "Career Counselling", "Free Registration"],
        benefits: "Free online job matching across 10 million active vacancies, free career counseling sessions, online aptitude assessments, and local job fair interviews.",
        eligibility_summary: "All Indian jobseekers from fresh 10th pass to postgraduates seeking formal private and public sector employment.",
        eligibility: { minAge: 18, maxAge: 60, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["unemployed", "student"] },
        applyLink: "https://www.ncs.gov.in/",
        baseMatchScore: 92
    },
    {
        id: "lab-eshram",
        title: "e-Shram Portal – National Database of Unorganised Workers",
        ministry: "Ministry of Labour and Employment",
        type: "central",
        category: "Social Welfare & Empowerment",
        tags: ["e-Shram Card", "UAN Number", "Accidental Insurance", "Social Security"],
        benefits: "12-digit Universal Account Number (UAN) card, automatic ₹2 lakh accidental death and permanent disability cover, and direct disaster relief cash transfers.",
        eligibility_summary: "Any unorganised worker aged 16 to 59 years not covered under EPFO or ESIC.",
        eligibility: { minAge: 16, maxAge: 59, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l"], category: ["general", "sc", "st", "obc"], occupation: ["daily-wage-worker", "farmer", "self-employed", "unemployed", "homemaker"] },
        applyLink: "https://eshram.gov.in/",
        baseMatchScore: 97
    },
    {
        id: "lab-epf-edli",
        title: "Employees' Deposit-Linked Insurance (EDLI) Scheme under EPFO",
        ministry: "Ministry of Labour and Employment",
        type: "central",
        category: "Banking, Financial Services & Insurance",
        tags: ["EDLI", "EPFO", "Life Insurance 7 Lakh", "Cashless Death Benefit"],
        benefits: "Free life insurance cover up to ₹7 lakh paid to surviving family members in case of death of an active EPFO contributing employee, with zero employee premium.",
        eligibility_summary: "All active members contributing to Employees' Provident Fund (EPF).",
        eligibility: { minAge: 18, maxAge: 60, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["salaried"] },
        applyLink: "https://www.epfindia.gov.in/",
        baseMatchScore: 90
    },
    {
        id: "lab-esic",
        title: "Employees' State Insurance (ESIC) Comprehensive Medical & Cash Benefit Scheme",
        ministry: "Ministry of Labour and Employment",
        type: "central",
        category: "Health & Wellness",
        tags: ["ESIC", "Cashless Hospital", "Maternity 26 Weeks", "Unemployment Allowance"],
        benefits: "100% cashless medical care in 150+ ESIC hospitals, 26 weeks paid maternity benefit, cash sickness allowance at 70% of wages, and Atal Beemit Vyakti Kalyan unemployment cash.",
        eligibility_summary: "Factory and service establishment employees drawing monthly wages up to ₹21,000 (₹25,000 for persons with disabilities).",
        eligibility: { minAge: 18, maxAge: 65, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "sc", "st", "obc"], occupation: ["salaried"] },
        applyLink: "https://www.esic.gov.in/",
        baseMatchScore: 91
    },
    {
        id: "lab-abry",
        title: "Aatmanirbhar Bharat Rojgar Yojana (ABRY) – EPF Contribution Subsidy",
        ministry: "Ministry of Labour and Employment",
        type: "central",
        category: "Skills & Employment",
        tags: ["ABRY", "EPF Subsidy", "Formal Jobs", "Employee Retention"],
        benefits: "Government payment of both employee (12%) and employer (12%) EPF contributions (total 24%) for 2 years for newly hired formal workers earning under ₹15,000/month.",
        eligibility_summary: "Newly employed formal workers registered on EPFO and employers adding net formal jobs.",
        eligibility: { minAge: 18, maxAge: 60, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l"], category: ["general", "sc", "st", "obc"], occupation: ["salaried"] },
        applyLink: "https://www.epfindia.gov.in/",
        baseMatchScore: 85
    },
    {
        id: "lab-nclp",
        title: "National Child Labour Project (NCLP) – Bridge Schools and Rehabilitation",
        ministry: "Ministry of Labour and Employment",
        type: "central",
        category: "Education & Learning",
        tags: ["NCLP", "Child Labour Rescue", "Bridge School", "Monthly Stipend"],
        benefits: "Rescued child laborers provided free bridge education, mid-day meals, health check-ups, and ₹400/month stipend deposited in bank account, transitioning to formal schools.",
        eligibility_summary: "Rescued child workers aged 9 to 14 years withdrawn from hazardous and non-hazardous occupations.",
        eligibility: { minAge: 9, maxAge: 14, gender: ["male", "female", "transgender"], income: ["below-1l"], category: ["general", "sc", "st", "obc"], occupation: ["student"] },
        applyLink: "https://penciltraining.nic.in/",
        baseMatchScore: 86
    },

    // --- 3. Chemicals and Fertilizers (6) ---
    {
        id: "chem-pmbjp",
        title: "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP) – Jan Aushadhi Kendras",
        ministry: "Ministry of Chemicals and Fertilizers",
        type: "central",
        category: "Health & Wellness",
        tags: ["PMBJP", "Generic Medicines", "Jan Aushadhi", "50-90% Discount"],
        benefits: "Quality generic medicines, medical consumables, and sanitary napkins (Suvidha @ ₹1) sold at 50% to 90% discount compared to branded equivalents across 10,000+ Kendras.",
        eligibility_summary: "All citizens purchasing medicines, and pharmacists/entrepreneurs setting up new Kendra stores (₹5 lakh subsidy).",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "self-employed", "salaried", "unemployed", "homemaker"] },
        applyLink: "https://janaushadhi.gov.in/",
        baseMatchScore: 96
    },
    {
        id: "chem-one-nation-fertilizer",
        title: "Pradhan Mantri Kisan Samriddhi Kendras (PMKSK) & One Nation One Fertilizer",
        ministry: "Ministry of Chemicals and Fertilizers",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["Bharat Urea", "PMKSK", "One Nation One Fertilizer", "Subsidized Urea"],
        benefits: "Supply of high-grade fertilizer at uniform subsidized prices nationwide under single brand 'BHARAT' (Bharat Urea, Bharat DAP) along with soil testing and advisory at PMKSKs.",
        eligibility_summary: "All Indian farmers purchasing fertilizers through Aadhaar POS biometrics.",
        eligibility: { minAge: 18, maxAge: 85, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer"] },
        applyLink: "https://fert.gov.in/",
        baseMatchScore: 94
    },
    {
        id: "chem-nbs-fertilizer",
        title: "Nutrient Based Subsidy (NBS) Scheme for P&K Fertilizers",
        ministry: "Ministry of Chemicals and Fertilizers",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["NBS", "Phosphatic Fertilizer", "Potash Subsidy", "Balanced Nutrition"],
        benefits: "Per-kilogram government subsidy on Nitrogen (N), Phosphate (P), Potash (K), and Sulphur (S) credited to manufacturers to deliver affordable balanced plant nutrients to farmers.",
        eligibility_summary: "Agricultural cultivators purchasing non-urea subsidized fertilizers.",
        eligibility: { minAge: 18, maxAge: 85, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer"] },
        applyLink: "https://fert.gov.in/",
        baseMatchScore: 90
    },
    {
        id: "chem-bulk-drug-parks",
        title: "Scheme for Promotion of Bulk Drug Parks",
        ministry: "Ministry of Chemicals and Fertilizers",
        type: "central",
        category: "Business & Entrepreneurship",
        tags: ["Bulk Drug Parks", "API Hub", "₹1000 Crore Grant", "Common Effluent Plant"],
        benefits: "Central grant-in-aid of ₹1,000 crore per park for establishing 3 mega Bulk Drug Parks with shared solvent recovery systems, steam pipelines, and testing labs.",
        eligibility_summary: "State implementing agencies and pharmaceutical active ingredient manufacturers.",
        eligibility: { minAge: 21, maxAge: 70, gender: ["male", "female", "transgender"], income: ["above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed"] },
        applyLink: "https://pharmaceuticals.gov.in/",
        baseMatchScore: 74
    },
    {
        id: "chem-pli-bulk-drugs",
        title: "Production Linked Incentive (PLI) Scheme for Critical Bulk Drugs & APIs",
        ministry: "Ministry of Chemicals and Fertilizers",
        type: "central",
        category: "Business & Entrepreneurship",
        tags: ["PLI Bulk Drugs", "Key Starting Materials", "Antibiotics", "Make in India"],
        benefits: "Incentive of 5% to 20% on domestic sales of 41 critical bulk drugs (penicillin, clavulanic acid, paracetamol raw material) over 6 years.",
        eligibility_summary: "Drug manufacturing enterprises investing in greenfield API production plants in India.",
        eligibility: { minAge: 21, maxAge: 70, gender: ["male", "female", "transgender"], income: ["above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed"] },
        applyLink: "https://pharmaceuticals.gov.in/",
        baseMatchScore: 76
    },
    {
        id: "chem-spi-pharma",
        title: "Strengthening of Pharmaceutical Industry (SPI) – MSME Tech Upgradation",
        ministry: "Ministry of Chemicals and Fertilizers",
        type: "central",
        category: "Business & Entrepreneurship",
        tags: ["SPI", "PTUAS", "WHO-GMP Certification", "Pharma MSME Subsidy"],
        benefits: "Up to ₹1 crore capital subsidy / interest subvention for pharma MSMEs to upgrade cleanrooms, HVAC, and water systems to achieve WHO-GMP and Schedule M standards.",
        eligibility_summary: "Micro, small, and medium pharma manufacturing units incorporated in India.",
        eligibility: { minAge: 20, maxAge: 65, gender: ["male", "female", "transgender"], income: ["5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed"] },
        applyLink: "https://pharmaceuticals.gov.in/",
        baseMatchScore: 79
    },

    // --- 4. Health & Family Welfare (6) ---
    {
        id: "health-pmjay-seniors",
        title: "Ayushman Bharat PM-JAY – Universal Health Coverage for Senior Citizens Aged 70+",
        ministry: "Ministry of Health & Family Welfare",
        type: "central",
        category: "Health & Wellness",
        tags: ["Ayushman Bharat 70+", "Senior Citizen Health", "₹5 Lakh Cover", "Free Hospitalisation"],
        benefits: "Distinct ₹5 lakh annual cashless family floater health insurance covering secondary and tertiary hospitalisation for all senior citizens aged 70 years and above, regardless of income.",
        eligibility_summary: "All Indian senior citizens aged 70 years and above verified through Aadhaar.",
        eligibility: { minAge: 70, maxAge: 110, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["unemployed", "homemaker", "salaried", "self-employed"] },
        applyLink: "https://beneficiary.nha.gov.in/",
        baseMatchScore: 98
    },
    {
        id: "health-abdm-abha",
        title: "Ayushman Bharat Digital Mission (ABDM) – ABHA Health Account & Electronic Records",
        ministry: "Ministry of Health & Family Welfare",
        type: "central",
        category: "Health & Wellness",
        tags: ["ABHA ID", "Digital Health Record", "Paperless OPD", "Scan and Share"],
        benefits: "14-digit ABHA ID enabling digital storage of lab reports, MRI scans, and prescriptions on mobile; instant token generation at hospital OPDs via QR scan-and-share.",
        eligibility_summary: "All citizens seeking secure lifelong digital medical records.",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "self-employed", "salaried", "unemployed", "homemaker"] },
        applyLink: "https://abha.abdm.gov.in/",
        baseMatchScore: 95
    },
    {
        id: "health-free-drugs",
        title: "National Health Mission – Free Essential Drugs & Free Diagnostics Service Initiative",
        ministry: "Ministry of Health & Family Welfare",
        type: "central",
        category: "Health & Wellness",
        tags: ["Free Medicines", "Free Blood Tests", "PHC/CHC", "Govt Hospital"],
        benefits: "Free supply of essential medicines (EDL) and 63 free diagnostic laboratory tests (blood, urine, X-ray, ECG) at all public Primary and Community Health Centres.",
        eligibility_summary: "All patients visiting government dispensaries, sub-centres, PHCs, and district hospitals.",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "self-employed", "salaried", "unemployed", "homemaker"] },
        applyLink: "https://nhm.gov.in/",
        baseMatchScore: 93
    },
    {
        id: "health-pmndp-dialysis",
        title: "Pradhan Mantri National Dialysis Programme (PMNDP) – Free Hemodialysis Services",
        ministry: "Ministry of Health & Family Welfare",
        type: "central",
        category: "Health & Wellness",
        tags: ["Free Dialysis", "PMNDP", "Kidney Failure", "District Hospital"],
        benefits: "100% free hemodialysis and peritoneal dialysis sessions for BPL patients at all District Hospital dialysis centres, saving up to ₹25,000 monthly out-of-pocket expenses.",
        eligibility_summary: "Patients suffering from end-stage renal disease (ESRD) belonging to BPL families (non-BPL get highly subsidized rate).",
        eligibility: { minAge: 1, maxAge: 95, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "sc", "st", "obc"], occupation: ["daily-wage-worker", "farmer", "unemployed", "homemaker"] },
        applyLink: "https://nhm.gov.in/",
        baseMatchScore: 92
    },
    {
        id: "health-rbsk",
        title: "Rashtriya Bal Swasthya Karyakram (RBSK) – Child Health Screening and Early Intervention",
        ministry: "Ministry of Health & Family Welfare",
        type: "central",
        category: "Health & Wellness",
        tags: ["RBSK", "Child Screening", "Congenital Heart Defect", "Club Foot", "Free Surgery"],
        benefits: "Free health screening of 27 crore children for 4Ds (Defects at birth, Diseases, Deficiencies, Developmental delays) and 100% free corrective surgeries.",
        eligibility_summary: "All children aged 0 to 18 years enrolled in Anganwadi centres and government schools.",
        eligibility: { minAge: 0, maxAge: 18, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student"] },
        applyLink: "https://rbsk.gov.in/",
        baseMatchScore: 94
    },
    {
        id: "health-tb-mukt",
        title: "Pradhan Mantri TB Mukt Bharat Abhiyaan – Ni-kshay Poshan & Community Support",
        ministry: "Ministry of Health & Family Welfare",
        type: "central",
        category: "Health & Wellness",
        tags: ["Ni-kshay Poshan", "TB Relief", "Monthly ₹500", "Food Baskets"],
        benefits: "Direct monthly DBT of ₹500 for nutritional food during full treatment course, free diagnostic cartridge tests, and monthly supplementary food baskets from Ni-kshay Mitras.",
        eligibility_summary: "All notified tuberculosis patients undergoing treatment registered on Ni-kshay portal.",
        eligibility: { minAge: 0, maxAge: 95, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "self-employed", "salaried", "unemployed", "homemaker"] },
        applyLink: "https://nikshay.in/",
        baseMatchScore: 96
    },

    // --- 5. Minority Affairs (5) ---
    {
        id: "min-pm-vikas",
        title: "PM VIKAS (Pradhan Mantri Virasat Ka Samvardhan) – Integrated Minority Livelihood Scheme",
        ministry: "Ministry of Minority Affairs",
        type: "central",
        category: "Skills & Employment",
        tags: ["PM VIKAS", "Minority Artisans", "Hunar Haat", "Skill Training", "Credit Linkage"],
        benefits: "Free NSQF skilling, artisan design workshops, marketing platform via Hunar Haat exhibitions, and concessional loans via NMDFC.",
        eligibility_summary: "Artisans and youth belonging to 6 notified minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, Parsis).",
        eligibility: { minAge: 18, maxAge: 50, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "obc", "sc", "st"], occupation: ["self-employed", "daily-wage-worker", "unemployed"] },
        applyLink: "https://minorityaffairs.gov.in/",
        baseMatchScore: 88
    },
    {
        id: "min-pmjvk",
        title: "Pradhan Mantri Jan Vikas Karyakram (PMJVK) – Minority Concentration Area Development",
        ministry: "Ministry of Minority Affairs",
        type: "central",
        category: "Transport & Infrastructure",
        tags: ["PMJVK", "Minority Blocks", "Degree College", "Hostels", "Health Centre"],
        benefits: "Central funding to construct ITIs, polytechnics, residential schools, Sadbhav Mandaps, and drinking water facilities in minority concentration areas.",
        eligibility_summary: "Residents of identified Minority Concentration Blocks and Towns across India.",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "obc", "sc", "st"], occupation: ["student", "farmer", "daily-wage-worker", "homemaker"] },
        applyLink: "https://pmjvk.minorityaffairs.gov.in/",
        baseMatchScore: 84
    },
    {
        id: "min-begum-hazrat",
        title: "Begum Hazrat Mahal National Scholarship for Meritorious Minority Girls",
        ministry: "Ministry of Minority Affairs",
        type: "central",
        category: "Education & Learning",
        tags: ["Begum Hazrat Mahal", "Minority Girls", "Class 9-12", "Merit Scholarship"],
        benefits: "Scholarship of ₹5,000 for Class 9 and 10, and ₹6,000 for Class 11 and 12 girl students securing 50%+ marks.",
        eligibility_summary: "Girl students belonging to notified minority communities studying in Classes 9 to 12 with family income under ₹2 lakh.",
        eligibility: { minAge: 13, maxAge: 18, gender: ["female"], income: ["below-1l", "1l-2.5l"], category: ["general", "obc"], occupation: ["student"] },
        applyLink: "https://scholarships.gov.in/",
        baseMatchScore: 89
    },
    {
        id: "min-prematric",
        title: "Pre-Matric Scholarship Scheme for Minority Students (Classes 9 and 10)",
        ministry: "Ministry of Minority Affairs",
        type: "central",
        category: "Education & Learning",
        tags: ["Pre-Matric Minority", "NSP", "School Allowance", "DBT"],
        benefits: "Annual academic allowance of ₹3,500 deposited directly into student's bank account via National Scholarship Portal.",
        eligibility_summary: "Minority students studying in Classes 9 or 10 with minimum 50% marks and family income under ₹1 lakh.",
        eligibility: { minAge: 13, maxAge: 17, gender: ["male", "female", "transgender"], income: ["below-1l"], category: ["general", "obc"], occupation: ["student"] },
        applyLink: "https://scholarships.gov.in/",
        baseMatchScore: 86
    },
    {
        id: "min-postmatric",
        title: "Post-Matric Scholarship Scheme for Minorities",
        ministry: "Ministry of Minority Affairs",
        type: "central",
        category: "Education & Learning",
        tags: ["Post-Matric Minority", "College Fee", "Maintenance Allowance", "NSP"],
        benefits: "Tuition fee reimbursement up to ₹10,000/year and monthly maintenance allowance up to ₹10,000/year for undergraduate, postgraduate, and diploma studies.",
        eligibility_summary: "Minority students pursuing higher secondary, degree, or doctoral studies with 50%+ marks and family income below ₹2 lakh.",
        eligibility: { minAge: 16, maxAge: 32, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l"], category: ["general", "obc"], occupation: ["student"] },
        applyLink: "https://scholarships.gov.in/",
        baseMatchScore: 88
    },

    // --- 6. Communication (4) ---
    {
        id: "dot-bharatnet",
        title: "BharatNet – High-Speed Optical Fibre Connectivity for Gram Panchayats",
        ministry: "Ministry of Communication",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["BharatNet", "Rural Broadband", "Fibre to the Home", "Gram Panchayat Wi-Fi"],
        benefits: "High-speed 100 Mbps broadband optical fiber network connecting 2.5 lakh Gram Panchayats, providing free public Wi-Fi hotspots at village schools and health centres.",
        eligibility_summary: "Rural citizens, students, and village institutions accessing village broadband.",
        eligibility: { minAge: 10, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "self-employed", "salaried", "unemployed", "homemaker"] },
        applyLink: "https://usof.gov.in/",
        baseMatchScore: 88
    },
    {
        id: "dot-pm-wani",
        title: "PM-WANI (Prime Minister Wireless Access Network Interface) – Public Wi-Fi Hotspots",
        ministry: "Ministry of Communication",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["PM-WANI", "Public Wi-Fi", "PDO", "Kirana Store Wi-Fi", "Low Cost Internet"],
        benefits: "Low-cost high-speed internet vouchers starting at ₹5, with small shopkeepers earning supplementary income as Public Data Offices (PDOs) without license fees.",
        eligibility_summary: "Citizens seeking affordable internet and local retail merchants setting up Wi-Fi access points.",
        eligibility: { minAge: 12, maxAge: 75, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "self-employed", "unemployed"] },
        applyLink: "https://pmwani.gov.in/",
        baseMatchScore: 86
    },
    {
        id: "dot-5g-testbed",
        title: "Indigenous 5G Testbed Access Scheme for Startups and Academia",
        ministry: "Ministry of Communication",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["5G Testbed", "Telecom Startups", "Free Testing", "6G R&D"],
        benefits: "Free testing and validation facility at IIT Madras/IISc 5G testbeds for telecom startups developing indigenously designed 5G/6G radio hardware and IoT sensors.",
        eligibility_summary: "Indian hardware startups, telecom MSMEs, and university researchers.",
        eligibility: { minAge: 20, maxAge: 60, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed", "student"] },
        applyLink: "https://dot.gov.in/",
        baseMatchScore: 78
    },
    {
        id: "dot-sanction-spectrum",
        title: "Telecom Technology Development Fund (TTDF) Scheme",
        ministry: "Ministry of Communication",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["TTDF", "USOF", "Telecom Innovation", "₹10 Crore Grant"],
        benefits: "Direct grant-in-aid up to ₹10 crore to fund indigenous technology development in optical communications, low-cost rural cellular towers, and satellite payloads.",
        eligibility_summary: "Indian companies, research consortiums, and tech startups.",
        eligibility: { minAge: 21, maxAge: 65, gender: ["male", "female", "transgender"], income: ["above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed", "salaried"] },
        applyLink: "https://usof.gov.in/",
        baseMatchScore: 76
    },

    // --- 7. Skill Development (4) ---
    {
        id: "msde-pmkvy4",
        title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0) – Industry 4.0 Skilling",
        ministry: "Ministry of Skill Development and Entrepreneurship",
        type: "central",
        category: "Skills & Employment",
        tags: ["PMKVY 4.0", "Free Skilling", "AI & Robotics", "Stipend", "Skill Card"],
        benefits: "Completely free short-term skill training in emerging courses (Coding, AI, Robotics, Mechatronics, Drones) with free skill card and direct placement drives.",
        eligibility_summary: "Unemployed youth, school dropouts, and college students seeking modern market-ready skills.",
        eligibility: { minAge: 15, maxAge: 45, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"], category: ["general", "sc", "st", "obc"], occupation: ["unemployed", "student"] },
        applyLink: "https://www.pmkvyofficial.org/",
        baseMatchScore: 93
    },
    {
        id: "msde-naps",
        title: "National Apprenticeship Promotion Scheme (NAPS-2)",
        ministry: "Ministry of Skill Development and Entrepreneurship",
        type: "central",
        category: "Skills & Employment",
        tags: ["NAPS", "Apprenticeship", "Monthly ₹1500 Govt Share", "On the Job Training"],
        benefits: "Government transfers 25% of prescribed monthly stipend (up to ₹1,500/month) directly to apprentice's bank account via DBT during on-the-job factory training.",
        eligibility_summary: "Candidates aged 14+ years possessing minimum 5th standard education pursuing industry apprenticeship.",
        eligibility: { minAge: 14, maxAge: 35, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"], category: ["general", "sc", "st", "obc"], occupation: ["unemployed", "student"] },
        applyLink: "https://www.apprenticeshipindia.gov.in/",
        baseMatchScore: 91
    },
    {
        id: "msde-jss",
        title: "Jan Shikshan Sansthan (JSS) – Vocational Training for Non-Literates & Rural Dropouts",
        ministry: "Ministry of Skill Development and Entrepreneurship",
        type: "central",
        category: "Skills & Employment",
        tags: ["JSS", "Rural Women Skilling", "Tailoring", "Beauty Care", "Doorstep Courses"],
        benefits: "Non-formal vocational skills (tailoring, embroidery, electrical repair) delivered at the doorsteps of rural women and neo-literates at negligible nominal fees.",
        eligibility_summary: "Non-literates, neo-literates, and school dropouts aged 15 to 45 (priority to women and SC/ST).",
        eligibility: { minAge: 15, maxAge: 45, gender: ["female", "male", "transgender"], income: ["below-1l", "1l-2.5l"], category: ["general", "sc", "st", "obc"], occupation: ["homemaker", "daily-wage-worker", "unemployed"] },
        applyLink: "https://jss.gov.in/",
        baseMatchScore: 87
    },
    {
        id: "msde-cts-iti",
        title: "Craftsmen Training Scheme (CTS) – Industrial Training Institutes (ITI) Modernization",
        ministry: "Ministry of Skill Development and Entrepreneurship",
        type: "central",
        category: "Education & Learning",
        tags: ["ITI", "CTS", "Electrician", "Fitter", "National Trade Certificate"],
        benefits: "Practical technical vocational certification (NTC) across 150 trades (Electrician, Fitter, Welder, Machinist, Turner) with high domestic and Gulf placement.",
        eligibility_summary: "Students passing 8th or 10th standard seeking industrial technical craftsmanship diplomas.",
        eligibility: { minAge: 14, maxAge: 40, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "unemployed"] },
        applyLink: "https://dgt.gov.in/",
        baseMatchScore: 90
    },

    // --- 8. Tribal Affairs (4) ---
    {
        id: "trib-pmjuga",
        title: "Pradhan Mantri Janjatiya Unnat Gram Abhiyan (PM-JUGA / Vanbandhu Kalyan)",
        ministry: "Ministry of Tribal Affairs",
        type: "central",
        category: "Social Welfare & Empowerment",
        tags: ["PM-JUGA", "Tribal Saturation", "Pucca House", "Forest Rights", "Electrification"],
        benefits: "Holistic infrastructure saturation across 63,000 tribal villages: pucca houses, tap water, solar electrification, mobile connectivity, and healthcare vans.",
        eligibility_summary: "Residents of tribal majority villages and aspirational tribal blocks.",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l"], category: ["st"], occupation: ["farmer", "daily-wage-worker", "homemaker"] },
        applyLink: "https://tribal.gov.in/",
        baseMatchScore: 94
    },
    {
        id: "trib-janman",
        title: "Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan (PM-JANMAN) for PVTGs",
        ministry: "Ministry of Tribal Affairs",
        type: "central",
        category: "Social Welfare & Empowerment",
        tags: ["PM-JANMAN", "PVTG", "Particularly Vulnerable", "Tribal Pucca House"],
        benefits: "Free pucca PMAY-G houses, piped tap water, off-grid solar power systems, multi-purpose community centres, and motorized mobile medical units for 75 PVTG groups.",
        eligibility_summary: "Particularly Vulnerable Tribal Groups (PVTGs) residing in deep forest habitations.",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l"], category: ["st"], occupation: ["farmer", "daily-wage-worker", "unemployed"] },
        applyLink: "https://tribal.gov.in/",
        baseMatchScore: 95
    },
    {
        id: "trib-emrs",
        title: "Eklavya Model Residential Schools (EMRS) – Quality Tribal Education",
        ministry: "Ministry of Tribal Affairs",
        type: "central",
        category: "Education & Learning",
        tags: ["EMRS", "Tribal Residential School", "Free CBSE School", "Class 6-12"],
        benefits: "Completely free CBSE residential schooling (Classes 6 to 12) with boarding, lodging, uniforms, books, and competitive exam coaching for tribal children.",
        eligibility_summary: "Scheduled Tribe (ST) students clearing EMRS district entrance tests.",
        eligibility: { minAge: 10, maxAge: 18, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["st"], occupation: ["student"] },
        applyLink: "https://emrs.tribal.gov.in/",
        baseMatchScore: 91
    },
    {
        id: "trib-pmvdy",
        title: "Pradhan Mantri Van Dhan Yojana (PMVDY) – Minor Forest Produce Value Addition",
        ministry: "Ministry of Tribal Affairs",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["Van Dhan", "TRIFED", "Minor Forest Produce", "Tribal SHG", "Mahua & Honey"],
        benefits: "Seed capital of ₹15 lakh per Van Dhan Vikas Kendra to procure solar dryers, pulverizers, and packaging machines for tribal gathering collectives to multiply incomes 3x.",
        eligibility_summary: "Tribal forest gatherers and tribal Self-Help Group members.",
        eligibility: { minAge: 18, maxAge: 65, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l"], category: ["st"], occupation: ["farmer", "daily-wage-worker", "self-employed"] },
        applyLink: "https://trifed.tribal.gov.in/",
        baseMatchScore: 89
    },

    // --- 9. Ayush (3) ---
    {
        id: "ayush-nam",
        title: "National AYUSH Mission (NAM) – Hospital Upgradation & Free Dispensary Services",
        ministry: "Ministry of Ayush",
        type: "central",
        category: "Health & Wellness",
        tags: ["National AYUSH Mission", "Ayurveda Hospital", "Free Consultations", "Dispensaries"],
        benefits: "Central funding for free outpatient consultations, free classical herbal medicines, and 50-bed integrated AYUSH hospital facilities in every district.",
        eligibility_summary: "All citizens seeking traditional Ayurveda, Yoga, Unani, Siddha, and Homeopathy medical treatments.",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "self-employed", "salaried", "unemployed", "homemaker"] },
        applyLink: "https://namayush.gov.in/",
        baseMatchScore: 87
    },
    {
        id: "ayush-pharmacovigilance",
        title: "Central Sector Scheme for AYUSH Pharmacovigilance & Drug Quality Control",
        ministry: "Ministry of Ayush",
        type: "central",
        category: "Health & Wellness",
        tags: ["Drug Quality", "Ayush Pharmacovigilance", "Herbal Safety", "Testing Labs"],
        benefits: "Free public testing and adverse event reporting portal ensuring heavy metal safety, pesticide screening, and standardisation of Ayurvedic and Homeopathic formulations.",
        eligibility_summary: "AYUSH medical practitioners, consumers, and licensed herbal manufacturing pharmacies.",
        eligibility: { minAge: 18, maxAge: 75, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["salaried", "self-employed"] },
        applyLink: "https://ayush.gov.in/",
        baseMatchScore: 76
    },
    {
        id: "ayush-iec-yoga",
        title: "Information, Education and Communication (IEC) Scheme for Yoga and Wellness",
        ministry: "Ministry of Ayush",
        type: "central",
        category: "Health & Wellness",
        tags: ["Yoga Protocol", "Common Yoga Protocol", "Free Camps", "Ayush Wellness"],
        benefits: "Free mass Common Yoga Protocol workshops, free certified yoga instructor training camps, and public wellness booklets distributed nationwide.",
        eligibility_summary: "All citizens and educational/community institutions promoting preventive healthy lifestyles.",
        eligibility: { minAge: 5, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "self-employed", "salaried", "unemployed", "homemaker"] },
        applyLink: "https://yoga.ayush.gov.in/",
        baseMatchScore: 85
    },

    // --- 10. External Affairs (3) ---
    {
        id: "mea-pkvk",
        title: "Pravasi Kaushal Vikas Yojana (PKVY) – Pre-Departure Orientation Training",
        ministry: "Ministry of External Affairs",
        type: "central",
        category: "Skills & Employment",
        tags: ["PKVY", "Pre-Departure Training", "Overseas Employment", "Emigration Check"],
        benefits: "Free certified orientation on destination country labor laws, English/Arabic language basics, digital consular grievance registration, and eMigrate verification.",
        eligibility_summary: "Indian blue-collar workers and domestic workers migrating for overseas employment.",
        eligibility: { minAge: 18, maxAge: 50, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "sc", "st", "obc"], occupation: ["unemployed", "daily-wage-worker"] },
        applyLink: "https://emigrate.gov.in/",
        baseMatchScore: 84
    },
    {
        id: "mea-kip",
        title: "Know India Programme (KIP) – 3-Week Immersion for Diaspora Youth",
        ministry: "Ministry of External Affairs",
        type: "central",
        category: "Sports & Culture",
        tags: ["Know India", "Diaspora Youth", "90% Airfare Subsidy", "Cultural Immersion"],
        benefits: "Full domestic hospitality, industrial visits, rashtrapati bhavan interaction, and 90% international airfare reimbursement for young diaspora Indians exploring heritage.",
        eligibility_summary: "Persons of Indian Origin (PIO/OCI) aged 18 to 30 years who have never lived in India.",
        eligibility: { minAge: 18, maxAge: 30, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "salaried"] },
        applyLink: "https://kip.gov.in/",
        baseMatchScore: 78
    },
    {
        id: "mea-itec",
        title: "Indian Technical and Economic Cooperation (ITEC) Global Training Fellowship",
        ministry: "Ministry of External Affairs",
        type: "central",
        category: "Education & Learning",
        tags: ["ITEC", "Global Scholarships", "Capacity Building", "South-South Cooperation"],
        benefits: "Fully funded civilian training fellowships covering return airfare, living allowance, and tuition fees across premier Indian technical institutes.",
        eligibility_summary: "Professionals and government officers from 160 partner developing nations in Asia, Africa, and Latin America.",
        eligibility: { minAge: 25, maxAge: 45, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["salaried"] },
        applyLink: "https://www.itecgoi.in/",
        baseMatchScore: 72
    },

    // --- 11. Finance (3) ---
    {
        id: "fin-mudra-tarun",
        title: "Pradhan Mantri MUDRA Yojana (PMMY) – Tarun Plus Loan (Enhanced to ₹20 Lakh)",
        ministry: "Ministry of Finance",
        type: "central",
        category: "Business & Entrepreneurship",
        tags: ["MUDRA Loan", "Tarun Plus", "₹20 Lakh", "Collateral Free", "Business Expansion"],
        benefits: "Collateral-free business expansion loans enhanced from ₹10 lakh up to ₹20 lakh for past entrepreneurs who have successfully repaid previous Tarun loans.",
        eligibility_summary: "Micro enterprises, retail traders, small manufacturers, and service providers.",
        eligibility: { minAge: 18, maxAge: 65, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed"] },
        applyLink: "https://www.mudra.org.in/",
        baseMatchScore: 94
    },
    {
        id: "fin-mssc",
        title: "Mahila Samman Savings Certificate (MSSC) – High Return Fixed Deposit for Women",
        ministry: "Ministry of Finance",
        type: "central",
        category: "Banking, Financial Services & Insurance",
        tags: ["MSSC", "Women Savings", "7.5% Interest", "2-Year Deposit"],
        benefits: "Guaranteed fixed interest rate of 7.5% per annum compounded quarterly on deposits up to ₹2 lakh for a 2-year tenure, with partial withdrawal up to 40% after 1 year.",
        eligibility_summary: "Any woman or girl child (opened by self or guardian) at post offices and authorized banks.",
        eligibility: { minAge: 1, maxAge: 100, gender: ["female"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "homemaker", "salaried", "self-employed", "unemployed"] },
        applyLink: "https://www.indiapost.gov.in/",
        baseMatchScore: 91
    },
    {
        id: "fin-eclgs",
        title: "Emergency Credit Line Guarantee Scheme (ECLGS) for MSMEs & Contact Sectors",
        ministry: "Ministry of Finance",
        type: "central",
        category: "Business & Entrepreneurship",
        tags: ["ECLGS", "100% Credit Guarantee", "Capped Interest", "Working Capital"],
        benefits: "100% government guarantee cover to financial institutions for extending additional collateral-free credit at capped interest rates with 1-year principal moratorium.",
        eligibility_summary: "Registered business enterprises and MSMEs affected by economic disruptions.",
        eligibility: { minAge: 21, maxAge: 70, gender: ["male", "female", "transgender"], income: ["2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed"] },
        applyLink: "https://www.eclgs.com/",
        baseMatchScore: 82
    },

    // --- 12. New and Renewable Energy (3) ---
    {
        id: "mnre-kusum-a",
        title: "PM-KUSUM Component A – Setting Up of 10,000 MW Decentralized Solar Plants on Barren Land",
        ministry: "Ministry of New and Renewable Energy",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["PM-KUSUM", "Solar Plant", "Barren Land", "Power Purchase Agreement", "Farmer Income"],
        benefits: "Farmers earn guaranteed steady rental income or sell solar power directly to DISCOMs under 25-year Power Purchase Agreements (PPA) by installing 500kW to 2MW plants.",
        eligibility_summary: "Individual farmers, cooperatives, panchayats, and farmer producer organizations owning barren or cultivable land.",
        eligibility: { minAge: 18, maxAge: 75, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer", "self-employed"] },
        applyLink: "https://pmkusum.mnre.gov.in/",
        baseMatchScore: 89
    },
    {
        id: "mnre-kusum-b",
        title: "PM-KUSUM Component B – 60% Subsidy on Stand-alone Solar Agriculture Pumps",
        ministry: "Ministry of New and Renewable Energy",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["Solar Pump", "PM-KUSUM", "Diesel Replacement", "60% Subsidy", "Off-Grid Irrigation"],
        benefits: "60% capital subsidy (30% Centre + 30% State) for replacing polluting diesel pumps with 3HP to 7.5HP stand-alone solar agricultural water pumps.",
        eligibility_summary: "Individual farmers in off-grid rural areas lacking electric grid pump connections.",
        eligibility: { minAge: 18, maxAge: 80, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer"] },
        applyLink: "https://pmkusum.mnre.gov.in/",
        baseMatchScore: 93
    },
    {
        id: "mnre-kusum-c",
        title: "PM-KUSUM Component C – Solarisation of Existing Grid-Connected Agriculture Pumps",
        ministry: "Ministry of New and Renewable Energy",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["Grid Solar Pump", "Daytime Irrigation", "Sell Excess Power", "KUSUM"],
        benefits: "Subsidies for solarizing electric agricultural pumps, providing free daytime irrigation and allowing farmers to sell surplus generated solar electricity back to the grid.",
        eligibility_summary: "Farmers with sanctioned agricultural grid electricity connections.",
        eligibility: { minAge: 18, maxAge: 80, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer"] },
        applyLink: "https://pmkusum.mnre.gov.in/",
        baseMatchScore: 91
    },

    // --- 13. Environment, Forest and Climate Change (2) ---
    {
        id: "moef-ncap",
        title: "National Clean Air Programme (NCAP) – City Clean Air Action Plans",
        ministry: "Ministry of Environment, Forest and Climate Change",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["NCAP", "Air Pollution", "PM2.5 Reduction", "Electric Sweepers", "Clean Air"],
        benefits: "Central funding for 131 non-attainment cities to acquire mechanical street sweepers, electric buses, ambient air monitors, and water mist cannons to cut PM10/PM2.5 by 40%.",
        eligibility_summary: "Citizens, municipal corporations, and pollution control boards in non-attainment cities.",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "salaried", "self-employed", "unemployed", "homemaker"] },
        applyLink: "https://prana.cpcb.gov.in/",
        baseMatchScore: 82
    },
    {
        id: "moef-nagar-van",
        title: "Nagar Van Yojana – Urban Forests Creation Scheme",
        ministry: "Ministry of Environment, Forest and Climate Change",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["Nagar Van", "Urban Forest", "Green Lung", "Biodiversity Park", "City Greening"],
        benefits: "Central grant of ₹2 crore per forest to develop 10-to-50 hectare fenced urban biodiversity forests, herbal gardens, walking trails, and green lungs in cities.",
        eligibility_summary: "Urban local bodies, citizen green clubs, and state forest departments.",
        eligibility: { minAge: 10, maxAge: 90, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "salaried", "self-employed", "homemaker"] },
        applyLink: "https://moef.gov.in/",
        baseMatchScore: 80
    },

    // --- 14. Jal Shakti (2) ---
    {
        id: "jal-har-ghar-jal",
        title: "Jal Jeevan Mission (JJM) – Har Ghar Jal Tap Water Supply",
        ministry: "Ministry of Jal Shakti",
        type: "central",
        category: "Utility & Sanitation",
        tags: ["Jal Jeevan Mission", "Har Ghar Jal", "Piped Drinking Water", "55 Litres Daily"],
        benefits: "Free individual functional household tap connection providing 55 litres of potable clean drinking water per capita per day to every rural household.",
        eligibility_summary: "All rural households in habitations across all Indian states and Union Territories.",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer", "daily-wage-worker", "homemaker", "unemployed", "self-employed"] },
        applyLink: "https://jaljeevanmission.gov.in/",
        baseMatchScore: 97
    },
    {
        id: "jal-atal-bhujal",
        title: "Atal Bhujal Yojana (Atal Jal) – Participatory Groundwater Management",
        ministry: "Ministry of Jal Shakti",
        type: "central",
        category: "Agriculture, Rural & Environment",
        tags: ["Atal Bhujal", "Groundwater Recharge", "Check Dams", "Water Security"],
        benefits: "Financial grants to Gram Panchayats demonstrating sustainable groundwater recharge, constructing percolation tanks, check dams, and micro-irrigation systems.",
        eligibility_summary: "Farmers and Gram Panchayats in 8,220 water-stressed villages across 7 states.",
        eligibility: { minAge: 18, maxAge: 75, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "sc", "st", "obc"], occupation: ["farmer", "daily-wage-worker"] },
        applyLink: "https://ataljal.mowr.gov.in/",
        baseMatchScore: 85
    },

    // --- 15. Personnel, Public Grievances & Pensions (2) ---
    {
        id: "pers-cpgrams",
        title: "CPGRAMS – Centralized Public Grievance Redress and Monitoring System",
        ministry: "Ministry of Personnel, Public Grievances and Pensions",
        type: "central",
        category: "Public Safety, Law & Justice",
        tags: ["CPGRAMS", "Grievance Redressal", "Time-Bound Resolution", "Citizen Feedback"],
        benefits: "24/7 web and mobile portal to lodge grievances against any Central Ministry or State Department with mandatory time-bound resolution within 30 days.",
        eligibility_summary: "Any citizen seeking redressal of administrative grievances or delay in public service delivery.",
        eligibility: { minAge: 14, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "self-employed", "salaried", "unemployed", "homemaker"] },
        applyLink: "https://pgportal.gov.in/",
        baseMatchScore: 95
    },
    {
        id: "pers-karmayogi",
        title: "Mission Karmayogi – National Programme for Civil Services Capacity Building (iGOT)",
        ministry: "Ministry of Personnel, Public Grievances and Pensions",
        type: "central",
        category: "Education & Learning",
        tags: ["Mission Karmayogi", "iGOT Platform", "Civil Services", "Digital Courses"],
        benefits: "Continuous competency-driven digital training platform offering online courses in public administration, digital governance, and leadership for civil servants.",
        eligibility_summary: "Central and State government officials, public servants, and contractual government employees.",
        eligibility: { minAge: 21, maxAge: 60, gender: ["male", "female", "transgender"], income: ["2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["salaried"] },
        applyLink: "https://igotkarmayogi.gov.in/",
        baseMatchScore: 78
    },

    // --- 16. Ports, Shipping & Waterways (2) ---
    {
        id: "port-sagarmala",
        title: "Sagarmala Programme – Port-Led Development & Coastal Community Skilling",
        ministry: "Ministry of Ports, Shipping and Waterways",
        type: "central",
        category: "Skills & Employment",
        tags: ["Sagarmala", "Coastal Skilling", "Port Modernization", "Maritime Jobs"],
        benefits: "Free maritime skill training at Multi-Skill Development Centres (MSDCs), port logistics jobs, and funding for coastal tourism promenades and fishing jetties.",
        eligibility_summary: "Coastal community youth, traditional fishermen, and workers in port city regions.",
        eligibility: { minAge: 18, maxAge: 40, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "sc", "st", "obc"], occupation: ["unemployed", "daily-wage-worker"] },
        applyLink: "https://sagarmala.gov.in/",
        baseMatchScore: 84
    },
    {
        id: "port-jmvp",
        title: "Jal Marg Vikas Project (JMVP) – Inland Waterway-1 Capacity Augmentation",
        ministry: "Ministry of Ports, Shipping and Waterways",
        type: "central",
        category: "Transport & Infrastructure",
        tags: ["JMVP", "National Waterway 1", "Ganga Cargo", "Multi-Modal Terminal"],
        benefits: "Commercial navigation for 1,500-2,000 ton vessels on River Ganga with modern multi-modal terminals at Varanasi, Sahibganj, and Haldia, reducing freight costs by 60%.",
        eligibility_summary: "Freight forwarders, river cruise operators, cargo logistics firms, and riverside farmer producers.",
        eligibility: { minAge: 21, maxAge: 70, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed", "farmer"] },
        applyLink: "https://iwai.nic.in/",
        baseMatchScore: 77
    },

    // --- 17. Corporate Affairs (1) ---
    {
        id: "mca-csr-exchange",
        title: "National CSR Exchange Portal – Corporate Social Responsibility Project Matchmaking",
        ministry: "Ministry of Corporate Affairs",
        type: "central",
        category: "Social Welfare & Empowerment",
        tags: ["National CSR Portal", "CSR Funding", "NGO Grants", "MCA21"],
        benefits: "Directly connects verified implementing NGOs with companies having mandatory CSR budgets, facilitating rapid funding for health, education, and drinking water projects.",
        eligibility_summary: "Registered NGOs with valid MCA CSR-1 registration and corporates meeting Section 135 criteria.",
        eligibility: { minAge: 21, maxAge: 75, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["salaried", "self-employed"] },
        applyLink: "https://csrxchange.gov.in/",
        baseMatchScore: 79
    },

    // --- 18. Food Processing (1) ---
    {
        id: "food-pmfme",
        title: "PM Formalisation of Micro Food Processing Enterprises (PMFME) Scheme",
        ministry: "Ministry of Food Processing Industries",
        type: "central",
        category: "Business & Entrepreneurship",
        tags: ["PMFME", "Food Processing", "35% Credit Subsidy", "ODOP Food", "Self Help Group"],
        benefits: "35% credit-linked capital subsidy (up to ₹10 lakh) for modernizing micro food processing units (flour mills, spice grinding, pickle making), plus ₹40,000 seed capital per SHG member.",
        eligibility_summary: "Existing and new micro food entrepreneurs, FPOs, and SHG women.",
        eligibility: { minAge: 18, maxAge: 65, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed", "farmer", "homemaker"] },
        applyLink: "https://pmfme.mofpi.gov.in/",
        baseMatchScore: 89
    },

    // --- 19. Heavy Industries (1) ---
    {
        id: "heavy-capital-goods",
        title: "Scheme for Enhancement of Competitiveness in the Indian Capital Goods Sector",
        ministry: "Ministry of Heavy Industries",
        type: "central",
        category: "Business & Entrepreneurship",
        tags: ["Capital Goods", "Heavy Engineering", "Common Engineering Facility", "Machine Tools"],
        benefits: "Central funding up to 80% (max ₹100 crore) to set up advanced Centres of Excellence and Common Engineering Facility Centres in machine tools and robotics.",
        eligibility_summary: "Heavy engineering industries, machinery manufacturers, and technical R&D consortiums.",
        eligibility: { minAge: 25, maxAge: 70, gender: ["male", "female", "transgender"], income: ["above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["self-employed", "salaried"] },
        applyLink: "https://heavyindustries.gov.in/",
        baseMatchScore: 71
    },

    // --- 20. Law & Justice (1) ---
    {
        id: "law-tele-law",
        title: "Tele-Law – Reaching the Unreached (Free Pre-Litigation Legal Advice via CSCs)",
        ministry: "Ministry of Law and Justice",
        type: "central",
        category: "Public Safety, Law & Justice",
        tags: ["Tele-Law", "Free Legal Advice", "Panel Lawyers", "CSC Video Call", "NALSA"],
        benefits: "Free video/telephonic legal consultations with High Court panel lawyers via 2.5 lakh Common Service Centres (CSCs) for women, SC/ST, and poor litigants.",
        eligibility_summary: "Women, children, SC/ST citizens, victims of trafficking, disabled persons, and low-income litigants eligible under Section 12 of LSA Act.",
        eligibility: { minAge: 18, maxAge: 95, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "homemaker", "unemployed"] },
        applyLink: "https://www.tele-law.in/",
        baseMatchScore: 94
    },

    // --- 21. Tourism (1) ---
    {
        id: "tour-prashad",
        title: "PRASHAD – Pilgrimage Rejuvenation and Spiritual, Heritage Augmentation Drive",
        ministry: "Ministry of Tourism",
        type: "central",
        category: "Travel & Tourism",
        tags: ["PRASHAD", "Pilgrimage Tourism", "Spiritual Heritage", "Tourist Amenities", "Clean Ghats"],
        benefits: "100% central funding to construct modern pilgrim facilitation centres, cloakrooms, clean toilets, illuminated promenades, and battery shuttle transit at holy sites.",
        eligibility_summary: "Pilgrims, domestic tourists, local tour guides, and tourism hospitality vendors.",
        eligibility: { minAge: 0, maxAge: 100, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"], category: ["general", "sc", "st", "obc"], occupation: ["student", "farmer", "daily-wage-worker", "self-employed", "salaried", "unemployed", "homemaker"] },
        applyLink: "https://tourism.gov.in/",
        baseMatchScore: 84
    },

    // --- 22. Women & Child Development (1) ---
    {
        id: "wcd-mission-vatsalya",
        title: "Mission Vatsalya – Child Protection Services and Non-Institutional Foster Care",
        ministry: "Ministry of Women and Child Development",
        type: "central",
        category: "Women & Child",
        tags: ["Mission Vatsalya", "Child Protection", "Sponsorship ₹4000", "Foster Care", "Orphans"],
        benefits: "Monthly sponsorship of ₹4,000 per child living with vulnerable extended families, free emergency rescue through Childline 1098, and safe shelter in Child Care Institutions.",
        eligibility_summary: "Orphaned, abandoned, destitute, and single-parent children in vulnerable socio-economic circumstances.",
        eligibility: { minAge: 0, maxAge: 18, gender: ["male", "female", "transgender"], income: ["below-1l", "1l-2.5l"], category: ["general", "sc", "st", "obc"], occupation: ["student"] },
        applyLink: "https://wcd.nic.in/",
        baseMatchScore: 95
    }
];

const outContent = `// Batch of schemes for remaining 22 ministries:
// Total = ${otherSchemes.length} schemes

const otherMinistriesSchemes = ${JSON.stringify(otherSchemes, null, 4)};

module.exports = { otherMinistriesSchemes };
`;

fs.writeFileSync('backend/data/batches/batch_other_ministries.js', outContent, 'utf8');
console.log('Successfully wrote batch_other_ministries.js with', otherSchemes.length, 'schemes (expected 70)');
