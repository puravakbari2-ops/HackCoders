// Batch of schemes for:
// - Ministry of Education: 63 schemes
// - Ministry of Science and Technology: 59 schemes
// Total = 122 schemes

const educationAndSciTechSchemes = [
    // =========================================================================
    // Ministry of Education (63 schemes)
    // =========================================================================
    {
        id: "edu-pmevidya",
        title: "PM eVIDYA – Multi-Modal Digital Learning Initiative",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Digital Education", "E-Learning", "Online Education", "DIKSHA"],
        benefits: "Free access to 200 dedicated educational TV channels (one class, one channel), high-grade digital content on DIKSHA platform, DAISY-enabled learning material for visually and hearing impaired.",
        eligibility_summary: "All school students from Class 1 to 12 across India seeking digital learning resources.",
        eligibility: {
            minAge: 5,
            maxAge: 19,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://pmevidya.education.gov.in/",
        baseMatchScore: 85
    },
    {
        id: "edu-diksha",
        title: "DIKSHA – National Digital Infrastructure for Teachers and Students",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["DIKSHA", "Teacher Training", "Interactive Learning", "Textbooks"],
        benefits: "Access to QR-coded energized textbooks in 33 Indian languages, interactive video lessons, practice worksheets, and nationwide teacher professional training courses.",
        eligibility_summary: "School students, teachers, and teacher educators across all recognized schools.",
        eligibility: {
            minAge: 5,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://diksha.gov.in/",
        baseMatchScore: 82
    },
    {
        id: "edu-nishtha",
        title: "NISHTHA – National Initiative for School Heads' and Teachers' Holistic Advancement",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["NISHTHA", "Teacher Training", "Pedagogy", "Professional Development"],
        benefits: "Integrated training on learner-centric pedagogy, school safety, health, experiential learning, and artificial intelligence integration with certificates for participating educators.",
        eligibility_summary: "Elementary and secondary school teachers and head teachers in government schools.",
        eligibility: {
            minAge: 21,
            maxAge: 60,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://nishtha.ncert.gov.in/",
        baseMatchScore: 75
    },
    {
        id: "edu-samagra-transport",
        title: "Samagra Shiksha – Student Transport and Escort Facility",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Transport Allowance", "Remote Areas", "School Attendance", "Children"],
        benefits: "Up to ₹6,000 per year transport allowance for children living in remote habitations lacking accessible primary or upper primary school within stipulated distance.",
        eligibility_summary: "Students residing in remote or unserved habitations attending government elementary schools.",
        eligibility: {
            minAge: 6,
            maxAge: 14,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://samagra.education.gov.in/",
        baseMatchScore: 80
    },
    {
        id: "edu-samagra-uniform",
        title: "Samagra Shiksha – Free Uniforms Scheme",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Free Uniform", "Elementary School", "Girls", "SC/ST"],
        benefits: "Two sets of free school uniforms per academic year (up to ₹600 per child) for all girl students and SC, ST, and BPL boys in government elementary schools.",
        eligibility_summary: "All girl students and SC/ST/BPL boys enrolled in government schools from Class 1 to 8.",
        eligibility: {
            minAge: 6,
            maxAge: 14,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://samagra.education.gov.in/",
        baseMatchScore: 84
    },
    {
        id: "edu-samagra-textbooks",
        title: "Samagra Shiksha – Free Textbooks and Learning Materials",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Free Textbooks", "Class 1-8", "Primary Education", "Curriculum"],
        benefits: "Complete sets of textbooks, workbooks, and Braille/large-print books distributed free of cost to elementary school students at the start of every academic year.",
        eligibility_summary: "All children enrolled in government and local body schools from Class 1 to 8.",
        eligibility: {
            minAge: 6,
            maxAge: 14,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://samagra.education.gov.in/",
        baseMatchScore: 88
    },
    {
        id: "edu-kgbv",
        title: "Kasturba Gandhi Balika Vidyalaya (KGBV) Residential Scheme",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["KGBV", "Girls Education", "Residential School", "SC/ST Girls"],
        benefits: "Free residential schooling, boarding, lodging, uniforms, stationery, and skill training from Class 6 up to Class 12 for disadvantaged and drop-out girls in backward blocks.",
        eligibility_summary: "Girls belonging to SC, ST, OBC, minority communities, and BPL families in educationally backward blocks.",
        eligibility: {
            minAge: 10,
            maxAge: 18,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l"],
            category: ["sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://samagra.education.gov.in/",
        baseMatchScore: 90
    },
    {
        id: "edu-iedss",
        title: "Inclusive Education for Children with Special Needs (CwSN)",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["CwSN", "Divyang", "Special Needs", "Assistive Devices", "Escort Allowance"],
        benefits: "Annual student stipend of ₹3,500, free assistive devices, tailored learning materials, scribe allowance, and ₹2,000 transport/escort allowance per month.",
        eligibility_summary: "Children with identified disabilities enrolled in government and government-aided schools.",
        eligibility: {
            minAge: 6,
            maxAge: 18,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://samagra.education.gov.in/",
        baseMatchScore: 86
    },
    {
        id: "edu-vocational-school",
        title: "Vocationalization of School Education under Samagra Shiksha",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Vocational Education", "NSQF", "Skill Training", "Class 9-12"],
        benefits: "NSQF-aligned vocational job roles integrated into school curriculum, industry internships, certified practical assessments, and enhanced employability upon finishing school.",
        eligibility_summary: "Students of Class 9 to 12 in secondary and higher secondary government schools.",
        eligibility: {
            minAge: 14,
            maxAge: 18,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://samagra.education.gov.in/",
        baseMatchScore: 78
    },
    {
        id: "edu-ict-schools",
        title: "ICT and Digital Initiatives in Government Schools",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Smart Classroom", "ICT", "Computer Lab", "Digital Literacy"],
        benefits: "Smart classrooms, digital hardware, high-speed internet connectivity, computer laboratories, and interactive flat panels installed in schools to foster digital skills.",
        eligibility_summary: "Students studying in government upper primary, secondary, and higher secondary schools.",
        eligibility: {
            minAge: 10,
            maxAge: 18,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://samagra.education.gov.in/",
        baseMatchScore: 75
    },
    {
        id: "edu-nipun-bharat",
        title: "NIPUN Bharat Mission – Foundational Literacy and Numeracy",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["FLN", "Foundational Literacy", "Numeracy", "Grade 1-3"],
        benefits: "Graded reading books, numeracy kits, play-based pedagogical materials, and structured monitoring ensuring basic reading and arithmetic proficiency by Grade 3.",
        eligibility_summary: "Children in age group 3 to 9 years (Balvatika to Class 3) across all primary schools.",
        eligibility: {
            minAge: 3,
            maxAge: 9,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://nipunbharat.education.gov.in/",
        baseMatchScore: 84
    },
    {
        id: "edu-vidyanjali",
        title: "Vidyanjali 2.0 – School Volunteer and Community Participation Portal",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Volunteer", "School Mentorship", "Community", "CSR"],
        benefits: "Facilitates alumni, working professionals, and community volunteers to mentor students, conduct remedial classes, sponsor sports gear, and support school infrastructure.",
        eligibility_summary: "Citizens, professionals, organizations, and alumni willing to contribute services or assets to government schools.",
        eligibility: {
            minAge: 18,
            maxAge: 75,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "self-employed", "unemployed"]
        },
        applyLink: "https://vidyanjali.education.gov.in/",
        baseMatchScore: 70
    },
    {
        id: "edu-prashast",
        title: "PRASHAST – Pre-Assessment Holistic Screening for Divyang Students",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Divyang", "Early Disability Screening", "Inclusion", "NCERT"],
        benefits: "Mobile app-driven developmental screening across 21 RPwD conditions, automated referral generation, and swift issuance of disability certificates and academic accommodations.",
        eligibility_summary: "School students showing learning or developmental difficulties, assessed by teachers and special educators.",
        eligibility: {
            minAge: 4,
            maxAge: 18,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://ncert.nic.in/prashast.php",
        baseMatchScore: 78
    },
    {
        id: "edu-pm-shri",
        title: "PM SHRI Schools – PM Schools for Rising India",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["PM SHRI", "Exemplary Schools", "NEP 2020", "Modern Labs"],
        benefits: "State-of-the-art infrastructure upgrades, green school initiatives, experiential labs, robotics studios, career counseling cells, and high-quality pedagogy across 14,500 schools.",
        eligibility_summary: "Students enrolled in designated PM SHRI schools across all states and union territories.",
        eligibility: {
            minAge: 5,
            maxAge: 18,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://pmshrischools.education.gov.in/",
        baseMatchScore: 82
    },
    {
        id: "edu-jnv-lateral",
        title: "Jawahar Navodaya Vidyalaya Lateral Entry Scheme (Class 9 & 11)",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["JNV", "Lateral Entry", "Class 9", "Class 11", "Merit Selection"],
        benefits: "Free boarding, lodging, education, textbooks, and competitive coaching for rural students selected against vacant seats in Class 9 and Class 11.",
        eligibility_summary: "Students studying in government or recognized schools of the district, applying for lateral entry admission tests.",
        eligibility: {
            minAge: 13,
            maxAge: 17,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://navodaya.gov.in/",
        baseMatchScore: 80
    },
    {
        id: "edu-kv-girl-exemption",
        title: "Kendriya Vidyalaya Fee Exemption for Single Girl Child",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Kendriya Vidyalaya", "Single Girl Child", "Tuition Fee Waiver", "KVS"],
        benefits: "100% concession in tuition fee and Vidyalaya Vikas Nidhi (VVN) from Class 6 to 12 for students who are the only child of their parents.",
        eligibility_summary: "Single girl children studying in Kendriya Vidyalayas across India.",
        eligibility: {
            minAge: 10,
            maxAge: 18,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://kvsangathan.nic.in/",
        baseMatchScore: 78
    },
    {
        id: "edu-girls-hostel",
        title: "Centrally Sponsored Scheme for Construction of Girls' Hostels",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Girls Hostel", "Secondary Education", "Backward Blocks", "Retention"],
        benefits: "Free hostel stay with 100-bed capacity, nutritious food, security, and remedial coaching for adolescent girls in educationally backward blocks.",
        eligibility_summary: "Girl students studying in Classes 9 to 12 in secondary schools in identified backward blocks.",
        eligibility: {
            minAge: 14,
            maxAge: 18,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://samagra.education.gov.in/",
        baseMatchScore: 82
    },
    {
        id: "edu-spqem",
        title: "Scheme for Providing Quality Education in Madrasas (SPQEM)",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Madrasa", "Quality Education", "Science & Math", "Modern Subjects"],
        benefits: "Financial grants for appointment of modern subject teachers (Science, Math, Social Studies, English), science kit grants, and computer lab assistance in madrasas.",
        eligibility_summary: "Students and teachers in registered traditional madrasas seeking modern academic curriculum.",
        eligibility: {
            minAge: 6,
            maxAge: 18,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://education.gov.in/",
        baseMatchScore: 72
    },
    {
        id: "edu-idmi",
        title: "Scheme for Infrastructure Development in Minority Institutions (IDMI)",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Minority Institutions", "Classrooms", "Laboratories", "Hostels"],
        benefits: "Financial assistance up to ₹50 lakh per institution for constructing classrooms, science laboratories, computer rooms, and girl student toilets in minority schools.",
        eligibility_summary: "Recognized minority-managed private and aided elementary and secondary educational institutions.",
        eligibility: {
            minAge: 6,
            maxAge: 18,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://education.gov.in/",
        baseMatchScore: 68
    },
    {
        id: "edu-poshan-tithi",
        title: "PM POSHAN – Tithi Bhojan Community Food Festival Scheme",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["PM POSHAN", "Tithi Bhojan", "Community Participation", "Nutrition"],
        benefits: "Encourages community members and families to provide special nutritious treats, fruits, sweets, and supplementary food to school children on birthdays and festivals.",
        eligibility_summary: "Primary and upper primary students in schools implementing PM POSHAN meal scheme.",
        eligibility: {
            minAge: 5,
            maxAge: 14,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://pmposhan.education.gov.in/",
        baseMatchScore: 76
    },
    {
        id: "edu-rusa-grant",
        title: "Rashtriya Uchchatar Shiksha Abhiyan (RUSA) – Research & Innovation Grants",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Higher Education", "RUSA", "State Universities", "Infrastructure"],
        benefits: "Infrastructure grants up to ₹20 crore for state universities to upgrade laboratories, set up incubation hubs, and enhance interdisciplinary research facilities.",
        eligibility_summary: "Faculty, researchers, and postgraduate students enrolled in state public universities.",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://rusa.nic.in/",
        baseMatchScore: 74
    },
    {
        id: "edu-imprint",
        title: "IMPRINT India – Impacting Research Innovation and Technology",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Engineering Research", "IMPRINT", "Technology", "IIT Grants"],
        benefits: "Project grants up to ₹4 crore for collaborative research between premier engineering institutes (IITs/IISc) and industry partners to solve national technology challenges.",
        eligibility_summary: "Faculty, doctoral researchers, and postgraduate engineering students at premier engineering institutes.",
        eligibility: {
            minAge: 21,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://imprint-india.org/",
        baseMatchScore: 70
    },
    {
        id: "edu-sparc",
        title: "SPARC – Scheme for Promotion of Academic and Research Collaboration",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["International Research", "SPARC", "Higher Education", "Exchange"],
        benefits: "Funded joint research projects (up to ₹1 crore) connecting top 100 Indian higher education institutes with top 500 global universities, including international travel stipends.",
        eligibility_summary: "Indian researchers, doctoral scholars, and faculty from NIRF top-ranked institutions.",
        eligibility: {
            minAge: 22,
            maxAge: 60,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://sparc.iitkgp.ac.in/",
        baseMatchScore: 68
    },
    {
        id: "edu-stride",
        title: "STRIDE – Scheme for Trans-disciplinary Research for India’s Developing Economy",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Social Science", "Transdisciplinary", "UGC", "Research Grant"],
        benefits: "Research grants of ₹10 lakh to ₹1 crore to develop research culture, fund high-impact humanities projects, and support innovative community development solutions.",
        eligibility_summary: "Faculty, young researchers, and scholars in colleges and universities recognized by the UGC.",
        eligibility: {
            minAge: 22,
            maxAge: 60,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://ugc.ac.in/stride/",
        baseMatchScore: 69
    },
    {
        id: "edu-stars",
        title: "STARS – Scheme for Transformational and Advanced Research in Sciences",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Pure Sciences", "Research Grant", "IISc", "Advanced Research"],
        benefits: "Competitive research grants up to ₹50 lakh for translational science projects in Physics, Chemistry, Biology, Material Science, and Earth Sciences, coordinated by IISc.",
        eligibility_summary: "Researchers and faculty members at recognized Indian higher educational institutions.",
        eligibility: {
            minAge: 24,
            maxAge: 60,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://stars.iisc.ac.in/",
        baseMatchScore: 68
    },
    {
        id: "edu-gian",
        title: "GIAN – Global Initiative of Academic Networks",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["International Faculty", "Guest Lectures", "Short Courses", "GIAN"],
        benefits: "Invites eminent foreign faculty and Nobel laureates to conduct 1–2 week credit-bearing courses in Indian institutions, with student registration and interaction subsidized.",
        eligibility_summary: "Undergraduate and postgraduate students, doctoral candidates, and faculty in higher education institutions.",
        eligibility: {
            minAge: 18,
            maxAge: 60,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://gian.iitkgp.ac.in/",
        baseMatchScore: 71
    },
    {
        id: "edu-swayam-prabha",
        title: "SWAYAM PRABHA – 34 High-Quality Educational DTH TV Channels",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Free DTH", "Educational TV", "Class 9-12", "Competitive Exams"],
        benefits: "24/7 free telecast of high-quality curriculum-based video content across 34 DD Free Dish channels, covering school education, IIT JEE/NEET prep, and university disciplines.",
        eligibility_summary: "All citizens and students nationwide with a DD Free Dish set-top box or internet access.",
        eligibility: {
            minAge: 10,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "unemployed", "salaried"]
        },
        applyLink: "https://swayamprabha.gov.in/",
        baseMatchScore: 84
    },
    {
        id: "edu-ndl",
        title: "National Digital Library of India (NDLI)",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Digital Library", "Free E-Books", "IIT Kharagpur", "Academic Repositories"],
        benefits: "Free access to over 70 million electronic books, audiobooks, research papers, thesis collections, and video lectures in multiple Indian languages.",
        eligibility_summary: "Open to all lifelong learners, school and college students, teachers, and researchers.",
        eligibility: {
            minAge: 6,
            maxAge: 100,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried", "self-employed", "unemployed", "homemaker"]
        },
        applyLink: "https://ndl.iitkgp.ac.in/",
        baseMatchScore: 86
    },
    {
        id: "edu-shodhganga",
        title: "Shodhganga – National Reservoir of Indian Electronic Theses and Dissertations",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["PhD Thesis", "Open Access", "Research Database", "INFLIBNET"],
        benefits: "Free public access to more than 450,000 full-text Indian PhD dissertations across all disciplines, preventing duplication and supporting research citations.",
        eligibility_summary: "Doctoral scholars, university faculty, postgraduate students, and independent academic researchers.",
        eligibility: {
            minAge: 20,
            maxAge: 80,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://shodhganga.inflibnet.ac.in/",
        baseMatchScore: 73
    },
    {
        id: "edu-nad",
        title: "National Academic Depository (NAD) & DigiLocker Academic Certificates",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Digital Certificates", "Marksheets", "DigiLocker", "NAD"],
        benefits: "Permanent, tamper-proof 24/7 digital access to board marksheets, diplomas, and university degree certificates directly authenticated via Aadhaar DigiLocker.",
        eligibility_summary: "All Indian students passing board examinations, diplomas, and university degrees.",
        eligibility: {
            minAge: 14,
            maxAge: 90,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried", "self-employed", "unemployed"]
        },
        applyLink: "https://nad.digitallocker.gov.in/",
        baseMatchScore: 88
    },
    {
        id: "edu-aicte-pragati",
        title: "AICTE Pragati Scholarship Scheme for Girls in Technical Education",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Pragati", "Girl Scholarship", "B.Tech", "Polytechnic", "AICTE"],
        benefits: "₹50,000 per annum towards college fee, computer purchase, books, and competitive exam fees for up to 4 years of degree or 3 years of diploma study.",
        eligibility_summary: "Girl students admitted to 1st year degree/diploma programs in AICTE approved colleges, with family income under ₹8 lakh.",
        eligibility: {
            minAge: 17,
            maxAge: 25,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.aicte-india.org/",
        baseMatchScore: 84
    },
    {
        id: "edu-aicte-saksham",
        title: "AICTE Saksham Scholarship Scheme for Specially-Abled Students",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Saksham", "Divyang Scholarship", "Technical Degree", "Diploma"],
        benefits: "₹50,000 per annum financial grant for each year of study in engineering, pharmacy, architecture, or polytechnic diploma courses.",
        eligibility_summary: "Differently-abled students (40%+ disability) admitted to 1st year of AICTE-approved degree or diploma courses with family income below ₹8 lakh.",
        eligibility: {
            minAge: 17,
            maxAge: 30,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.aicte-india.org/",
        baseMatchScore: 83
    },
    {
        id: "edu-aicte-swanath",
        title: "AICTE Swanath Scholarship Scheme for Orphans and Martyrs' Children",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Swanath", "Orphans", "Armed Forces", "Technical Education"],
        benefits: "₹50,000 per annum for orphans, wards of parents who died of COVID-19, and children of Armed Forces and Central Paramilitary personnel martyred in action.",
        eligibility_summary: "Orphaned students or wards of martyrs enrolled in AICTE-approved degree or diploma programs.",
        eligibility: {
            minAge: 17,
            maxAge: 28,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.aicte-india.org/",
        baseMatchScore: 81
    },
    {
        id: "edu-aicte-pg",
        title: "AICTE Post Graduate (PG) Scholarship for GATE and CEED Qualified Students",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["GATE", "M.Tech Stipend", "CEED", "Engineering PG"],
        benefits: "Monthly stipend of ₹12,400 for 24 months to support full-time M.E., M.Tech, M.Pharm, and M.Des students in AICTE-approved institutions.",
        eligibility_summary: "Students admitted with valid GATE or CEED scores into full-time postgraduate technical programs.",
        eligibility: {
            minAge: 20,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://pgscholarship.aicte-india.org/",
        baseMatchScore: 80
    },
    {
        id: "edu-aicte-adf",
        title: "AICTE Doctoral Fellowship (ADF) Scheme",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["PhD Fellowship", "AICTE", "Engineering Research", "Stipend"],
        benefits: "Fellowship of ₹31,000/month for first 2 years and ₹35,000/month for 3rd year, plus contingency grant of ₹15,000/year for full-time PhD in thrust technical areas.",
        eligibility_summary: "Full-time PhD research scholars in designated AICTE research centres with 70%+ aggregate marks in Master's degree.",
        eligibility: {
            minAge: 21,
            maxAge: 32,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.aicte-india.org/",
        baseMatchScore: 77
    },
    {
        id: "edu-aicte-lilavati",
        title: "AICTE Lilavati Award and Grant for Women Empowerment Initiatives",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Lilavati Award", "Women Empowerment", "AICTE", "College Grants"],
        benefits: "Cash prizes of up to ₹3 lakh per team and institutional grants for student-faculty teams driving health, hygiene, literacy, and gender equality initiatives.",
        eligibility_summary: "Student and faculty teams from AICTE-affiliated technical colleges.",
        eligibility: {
            minAge: 18,
            maxAge: 45,
            gender: ["female", "male", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://lilavati.aicte-india.org/",
        baseMatchScore: 70
    },
    {
        id: "edu-aicte-qip",
        title: "AICTE Quality Improvement Programme (QIP) for Technical Faculty",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["QIP", "Faculty Development", "M.Tech/PhD", "Deputation"],
        benefits: "Full salary protection and living allowance for in-service engineering college teachers to pursue full-time M.Tech or PhD at IITs, IISc, and NITs.",
        eligibility_summary: "Permanent faculty members of AICTE-approved engineering institutions with minimum 2 years of teaching service.",
        eligibility: {
            minAge: 25,
            maxAge: 50,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://qip.aicte-india.org/",
        baseMatchScore: 68
    },
    {
        id: "edu-pmrf",
        title: "Prime Minister’s Research Fellows (PMRF) Scheme",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["PMRF", "PhD Fellowship", "IIT/IISc", "Research Grant"],
        benefits: "Prestigious fellowship of ₹70,000/month (years 1-2) scaling to ₹80,000/month (years 4-5) plus annual research contingency grant of ₹2 lakh for PhD at IITs/IISc/IISERs.",
        eligibility_summary: "Top graduating B.Tech/M.Sc/M.Tech students with CGPA 8.0+ selected for doctoral research in cutting-edge science and engineering.",
        eligibility: {
            minAge: 21,
            maxAge: 32,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.pmrf.in/",
        baseMatchScore: 82
    },
    {
        id: "edu-central-sector",
        title: "Central Sector Scheme of Scholarship for College and University Students (CSSS)",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["CSSS", "Merit Scholarship", "NSP", "Graduation"],
        benefits: "₹12,000/year for undergraduate study and ₹20,000/year for postgraduate courses for top 82,000 meritorious Class 12 board pass-outs.",
        eligibility_summary: "Students scoring above 80th percentile in relevant stream in Class 12 board exams, with family income under ₹4.5 lakh/year.",
        eligibility: {
            minAge: 17,
            maxAge: 25,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://scholarships.gov.in/",
        baseMatchScore: 86
    },
    {
        id: "edu-ishaan-uday",
        title: "Ishaan Uday – Special Scholarship Scheme for North Eastern Region",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Ishaan Uday", "North East", "UGC", "Degree Scholarship"],
        benefits: "₹5,400 per month for general degree courses and ₹7,800 per month for technical and professional degree programs, awarded to 10,000 NE students annually.",
        eligibility_summary: "Domicile students of North Eastern states with family income below ₹4.5 lakh admitted to 1st year of general or professional degree.",
        eligibility: {
            minAge: 17,
            maxAge: 26,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://scholarships.gov.in/",
        baseMatchScore: 81
    },
    {
        id: "edu-ugc-jrf",
        title: "UGC Junior Research Fellowship (JRF) in Humanities and Social Sciences",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["UGC JRF", "NET Fellowship", "PhD Stipend", "Humanities"],
        benefits: "₹37,000 per month fellowship plus HRA and ₹10,000 annual contingency grant for 2 years (convertible to SRF at ₹42,000/month for remaining 3 years).",
        eligibility_summary: "Candidates qualifying UGC-NET with JRF score pursuing full-time M.Phil/PhD in Indian universities.",
        eligibility: {
            minAge: 21,
            maxAge: 31,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://ugcnet.nta.ac.in/",
        baseMatchScore: 82
    },
    {
        id: "edu-ugc-emeritus",
        title: "UGC Emeritus Fellowship for Superannuated University Teachers",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Emeritus", "Retired Teachers", "Research Grant", "UGC"],
        benefits: "Honorarium of ₹31,000 per month and ₹50,000 per year contingency grant for 2 years to allow superannuated professors to conduct active research.",
        eligibility_summary: "Superannuated professors up to age 70 from recognized universities with high-impact publication track record.",
        eligibility: {
            minAge: 60,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "unemployed"]
        },
        applyLink: "https://www.ugc.gov.in/",
        baseMatchScore: 65
    },
    {
        id: "edu-ugc-pdf-scst",
        title: "UGC Post-Doctoral Fellowship for SC/ST Candidates",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["PostDoc", "SC/ST", "UGC Fellowship", "Research"],
        benefits: "Monthly fellowship of ₹47,000–₹54,000 plus HRA and ₹50,000 per year contingency for 5 years to pursue independent postdoctoral research.",
        eligibility_summary: "Unemployed SC/ST PhD degree holders with at least 50% in Master's degree.",
        eligibility: {
            minAge: 24,
            maxAge: 45,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["sc", "st"],
            occupation: ["unemployed", "student"]
        },
        applyLink: "https://www.ugc.gov.in/",
        baseMatchScore: 81
    },
    {
        id: "edu-ugc-pdf-women",
        title: "UGC Post-Doctoral Fellowship for Women Researchers",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Women PostDoc", "Fellowship", "UGC", "Academic Career"],
        benefits: "Fellowship of ₹47,000–₹54,000 per month plus contingency of ₹50,000 per year for 5 years to accelerate career re-entry and academic tenure for women PhDs.",
        eligibility_summary: "Unemployed women candidates holding a PhD degree seeking independent research careers.",
        eligibility: {
            minAge: 25,
            maxAge: 50,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "homemaker"]
        },
        applyLink: "https://www.ugc.gov.in/",
        baseMatchScore: 83
    },
    {
        id: "edu-kothari-pdf",
        title: "Dr. D.S. Kothari Postdoctoral Fellowship in Basic Sciences",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Kothari Fellowship", "Science PostDoc", "UGC", "Research"],
        benefits: "Fellowship of ₹54,000/month plus HRA and ₹1 lakh/year contingency for 3 years to conduct advanced research under mentor faculty in Indian universities.",
        eligibility_summary: "PhD degree holders in science disciplines below 35 years of age with high-impact research publications.",
        eligibility: {
            minAge: 24,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "student"]
        },
        applyLink: "http://dskpdf.unipune.ac.in/",
        baseMatchScore: 78
    },
    {
        id: "edu-sv-girl-fellowship",
        title: "Swami Vivekananda Single Girl Child Fellowship for Research in Social Sciences",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Single Girl Child", "Social Sciences", "PhD Stipend", "UGC"],
        benefits: "Monthly fellowship of ₹31,000 (JRF) / ₹35,000 (SRF) for up to 5 years plus contingency grant for single girl children pursuing full-time PhD in social sciences.",
        eligibility_summary: "Single girl children admitted to regular, full-time PhD programs in social sciences in recognized universities.",
        eligibility: {
            minAge: 21,
            maxAge: 40,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.ugc.gov.in/",
        baseMatchScore: 82
    },
    {
        id: "edu-phule-fellowship",
        title: "Savitribai Jyotirao Phule Fellowship for Single Girl Child in STEM",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Phule Fellowship", "STEM Girls", "Doctoral Fellowship", "UGC"],
        benefits: "Fellowship of ₹31,000–₹35,000 per month for 5 years to encourage single girl children to pursue doctoral research in science and technology fields.",
        eligibility_summary: "Single girl child enrolled in full-time PhD in science streams without any other scholarship.",
        eligibility: {
            minAge: 21,
            maxAge: 40,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.ugc.gov.in/",
        baseMatchScore: 82
    },
    {
        id: "edu-nats",
        title: "National Apprenticeship Training Scheme (NATS) for Degree/Diploma Holders",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["NATS", "Apprenticeship", "Engineering Stipend", "Industrial Training"],
        benefits: "1-year practical industry apprenticeship with monthly government-subsidized stipend (₹9,000 for graduate engineers, ₹8,000 for diploma holders) and Certificate of Proficiency.",
        eligibility_summary: "Graduates and diploma holders in engineering, technology, and general streams within 3 years of passing.",
        eligibility: {
            minAge: 19,
            maxAge: 28,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "student"]
        },
        applyLink: "https://nats.education.gov.in/",
        baseMatchScore: 85
    },
    {
        id: "edu-shreyas",
        title: "SHREYAS – Scheme for Higher Education Youth in Apprenticeship and Skills",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["SHREYAS", "BA/B.Com Apprenticeship", "Employment", "Industry Linkage"],
        benefits: "On-the-job apprenticeship training for general non-technical graduates (BA, B.Sc, B.Com) with monthly stipend and direct corporate placement linkages.",
        eligibility_summary: "Final year students and fresh graduates in general undergraduate courses across recognized universities.",
        eligibility: {
            minAge: 18,
            maxAge: 27,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "unemployed"]
        },
        applyLink: "https://education.gov.in/",
        baseMatchScore: 78
    },
    {
        id: "edu-nittt",
        title: "National Initiative for Technical Teachers Training (NITTT)",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["NITTT", "Teacher Training", "AICTE", "Engineering Pedagogy"],
        benefits: "8-module online certification covering instructional design, student psychology, research ethics, and laboratory development for technical educators.",
        eligibility_summary: "Newly inducted and in-service faculty members of AICTE-approved engineering and polytechnic colleges.",
        eligibility: {
            minAge: 23,
            maxAge: 60,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://www.nittt.ac.in/",
        baseMatchScore: 68
    },
    {
        id: "edu-virtual-labs",
        title: "Virtual Labs Project for Remote Laboratory Experiments",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Virtual Labs", "Simulation", "Engineering Experiments", "Open Access"],
        benefits: "Free 24/7 web-based access to over 100 virtual laboratories and 700 interactive simulations in electronics, mechanical, civil, and biotechnology domains.",
        eligibility_summary: "Engineering and science students across institutions lacking expensive physical laboratory setups.",
        eligibility: {
            minAge: 16,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.vlab.co.in/",
        baseMatchScore: 82
    },
    {
        id: "edu-fossee",
        title: "FOSSEE – Free and Open Source Software for Education",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Open Source", "FOSSEE", "Python", "Scilab", "IIT Bombay"],
        benefits: "Free training fellowships, honorariums up to ₹50,000 for textbook companion development, and open-source alternatives to commercial software like MATLAB and AutoCAD.",
        eligibility_summary: "Students and faculty in science, engineering, and mathematics disciplines across India.",
        eligibility: {
            minAge: 17,
            maxAge: 40,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://fossee.in/",
        baseMatchScore: 76
    },
    {
        id: "edu-eyantra",
        title: "e-Yantra – Robotics and Embedded Systems Education Project",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Robotics", "e-Yantra", "IIT Bombay", "Hackathon", "Embedded Systems"],
        benefits: "Free hardware robotics kits, hands-on training, nationwide hackathon participation with cash prizes up to ₹10 lakh, and startup incubation support at IIT Bombay.",
        eligibility_summary: "Engineering, polytechnic, and science undergraduate students forming collegiate teams.",
        eligibility: {
            minAge: 17,
            maxAge: 26,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.e-yantra.org/",
        baseMatchScore: 77
    },
    {
        id: "edu-spoken-tutorial",
        title: "Spoken Tutorial Project – Audio-Visual IT Training",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Spoken Tutorial", "Software Skills", "Vernacular IT", "IIT Bombay"],
        benefits: "Free 10-minute audio-video screencasts in 22 regional Indian languages teaching programming, web design, digital graphics, and office suites with graded certifications.",
        eligibility_summary: "School and college students, self-learners, and job seekers aiming to master IT tools.",
        eligibility: {
            minAge: 12,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "unemployed", "salaried", "homemaker"]
        },
        applyLink: "https://spoken-tutorial.org/",
        baseMatchScore: 84
    },
    {
        id: "edu-nirf-encouragement",
        title: "NIRF Institutional Excellence and Research Promotion Scheme",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["NIRF", "Research Ranking", "University Grants", "Faculty"],
        benefits: "Special development grants up to ₹5 crore for colleges and universities to improve faculty-to-student ratios, publish indexed research, and upgrade physical labs.",
        eligibility_summary: "Higher educational institutions participating in annual NIRF ranking cycles.",
        eligibility: {
            minAge: 20,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "student"]
        },
        applyLink: "https://www.nirfindia.org/",
        baseMatchScore: 66
    },
    {
        id: "edu-unnat-bharat",
        title: "Unnat Bharat Abhiyan (UBA) – Village Adoption by Higher Education",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["UBA", "Village Adoption", "Rural Development", "Field Projects"],
        benefits: "₹50,000 per village project seed fund for student-faculty teams adopting 5 rural villages to deploy clean energy, water purification, and sanitation solutions.",
        eligibility_summary: "Faculty and students in participating higher education colleges across India.",
        eligibility: {
            minAge: 18,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://unnatbharatabhiyan.gov.in/",
        baseMatchScore: 73
    },
    {
        id: "edu-ebsb-exchange",
        title: "Ek Bharat Shreshtha Bharat (EBSB) – Inter-State Student Cultural Exchange",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["EBSB", "Cultural Exchange", "Student Tours", "National Integration"],
        benefits: "Fully funded 5-to-7 day exchange immersion tours to paired partner states to experience regional culture, language, art forms, and historical heritage.",
        eligibility_summary: "School and college students selected based on essay, speech, and cultural competitions.",
        eligibility: {
            minAge: 12,
            maxAge: 25,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://ekbharat.gov.in/",
        baseMatchScore: 75
    },
    {
        id: "edu-sii-scholarship",
        title: "Study in India (SII) Scholarship Programme",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["Study in India", "International Students", "Tuition Waiver", "Higher Ed"],
        benefits: "Scholarships worth up to $3,500/year and 100% tuition fee waivers for bright international and diaspora students admitted to premier Indian universities.",
        eligibility_summary: "Foreign nationals and Non-Resident Indians seeking undergraduate or postgraduate admission in Indian institutes.",
        eligibility: {
            minAge: 17,
            maxAge: 30,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://studyinindia.gov.in/",
        baseMatchScore: 65
    },
    {
        id: "edu-ullas-literacy",
        title: "ULLAS – Nav Bharat Saksharta Karyakram (New India Literacy Programme)",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["ULLAS", "Adult Education", "Literacy", "Digital Skills", "Numeracy"],
        benefits: "Free foundational literacy, digital banking education, basic healthcare awareness, and national literacy certification via the ULLAS mobile application.",
        eligibility_summary: "Non-literate citizens aged 15 years and above who missed formal schooling.",
        eligibility: {
            minAge: 15,
            maxAge: 90,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "daily-wage-worker", "farmer", "homemaker"]
        },
        applyLink: "https://ullas.education.gov.in/",
        baseMatchScore: 88
    },
    {
        id: "edu-vidya-samiksha",
        title: "Vidya Samiksha Kendra (VSK) – Real-Time School Analytics System",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["VSK", "Data Analytics", "School Governance", "Learning Outcomes"],
        benefits: "Data-driven micro-interventions, automated teacher support alerts, student drop-out risk prediction, and targeted distribution of learning resources.",
        eligibility_summary: "Teachers, headmasters, and administrative officials across government school networks.",
        eligibility: {
            minAge: 21,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://education.gov.in/",
        baseMatchScore: 68
    },
    {
        id: "edu-manodarpan",
        title: "MANODARPAN – Psychosocial Support and Mental Health Helpline for Students",
        ministry: "Ministry of Education",
        type: "central",
        category: "Health & Wellness",
        tags: ["Manodarpan", "Mental Health", "Counselling", "Exam Stress"],
        benefits: "Toll-free national tele-counselling (8448440632), interactive webinars, and peer support guides helping students handle exam anxiety, stress, and career choices.",
        eligibility_summary: "School and college students, parents, and teachers seeking free mental wellbeing support.",
        eligibility: {
            minAge: 10,
            maxAge: 30,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "http://manodarpan.education.gov.in/",
        baseMatchScore: 84
    },
    {
        id: "edu-apaar-id",
        title: "Automated Permanent Academic Account Registry (APAAR / One Nation One Student ID)",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["APAAR", "Student ID", "Academic Bank of Credits", "DigiLocker"],
        benefits: "Unique 12-digit lifelong student identity that digitally compiles academic achievements, degrees, scholarships, sports badges, and skill certifications in one place.",
        eligibility_summary: "All Indian students enrolled in pre-primary, primary, secondary, and higher educational institutions.",
        eligibility: {
            minAge: 3,
            maxAge: 40,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://apaar.education.gov.in/",
        baseMatchScore: 90
    },
    {
        id: "edu-abc-portal",
        title: "Academic Bank of Credits (ABC) – Multiple Entry and Exit Scheme",
        ministry: "Ministry of Education",
        type: "central",
        category: "Education & Learning",
        tags: ["ABC", "Credit Transfer", "College Mobility", "NEP 2020"],
        benefits: "Seamless transfer and accumulation of academic credits earned across different universities, enabling flexible multi-disciplinary degrees and re-entry options.",
        eligibility_summary: "Undergraduate and postgraduate students in colleges registered on the ABC platform.",
        eligibility: {
            minAge: 17,
            maxAge: 45,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.abc.gov.in/",
        baseMatchScore: 85
    },

    // =========================================================================
    // Ministry of Science and Technology (59 schemes)
    // =========================================================================
    {
        id: "scitech-inspire-she",
        title: "INSPIRE – Scholarship for Higher Education (SHE)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["INSPIRE", "SHE", "Science Scholarship", "B.Sc/M.Sc", "DST"],
        benefits: "₹80,000 per annum (₹60,000 cash scholarship + ₹20,000 mentorship grant) for 5 years to pursue B.Sc, B.S., and integrated M.Sc courses in basic and natural sciences.",
        eligibility_summary: "Top 1% students in Class 12 board examinations pursuing natural or basic science degrees.",
        eligibility: {
            minAge: 17,
            maxAge: 22,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://online-inspire.gov.in/",
        baseMatchScore: 88
    },
    {
        id: "scitech-inspire-fellowship",
        title: "INSPIRE Fellowship for Doctoral Research in Basic Sciences",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["INSPIRE Fellowship", "PhD Stipend", "DST", "Basic Sciences"],
        benefits: "Monthly fellowship equal to CSIR-JRF (₹37,000/month for JRF, ₹42,000/month for SRF) plus HRA and ₹20,000 annual contingency grant for 5 years.",
        eligibility_summary: "First rank holders in University PG examinations in Basic and Applied Sciences or INSPIRE Scholars securing 70%+ in M.Sc.",
        eligibility: {
            minAge: 22,
            maxAge: 32,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://online-inspire.gov.in/",
        baseMatchScore: 82
    },
    {
        id: "scitech-inspire-faculty",
        title: "INSPIRE Faculty Fellowship Scheme",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Faculty Fellowship", "PostDoc", "Research Grant", "DST"],
        benefits: "Consolidated monthly salary of ₹1.25 lakh plus annual research grant of ₹7 lakh per year for 5 years to establish an independent research career in India.",
        eligibility_summary: "Indian citizens with a PhD in basic sciences or engineering below 32 years of age.",
        eligibility: {
            minAge: 25,
            maxAge: 32,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "student"]
        },
        applyLink: "https://online-inspire.gov.in/",
        baseMatchScore: 76
    },
    {
        id: "scitech-inspire-manak",
        title: "INSPIRE Awards – MANAK (Million Minds Augmenting National Aspirations)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["MANAK", "School Science", "Innovation Award", "Class 6-10"],
        benefits: "One-time grant of ₹10,000 deposited in student's bank account to build an innovative science project model, with selected students invited to National Festival of Innovation.",
        eligibility_summary: "School students aged 10 to 15 years studying in Classes 6 to 10 nominated by their schools.",
        eligibility: {
            minAge: 10,
            maxAge: 15,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://www.inspireawards-dst.gov.in/",
        baseMatchScore: 86
    },
    {
        id: "scitech-serb-npdf",
        title: "SERB National Post Doctoral Fellowship (N-PDF)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["N-PDF", "PostDoc", "SERB", "Research Grant"],
        benefits: "Monthly fellowship of ₹55,000 plus HRA and annual research contingency grant of ₹2 lakh for 2 years in premier laboratories.",
        eligibility_summary: "Indian citizens possessing a PhD/MD/MS degree in science or engineering, under 35 years of age.",
        eligibility: {
            minAge: 24,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "student"]
        },
        applyLink: "https://serbonline.in/",
        baseMatchScore: 80
    },
    {
        id: "scitech-serb-power-grant",
        title: "SERB POWER – Promoting Opportunities for Women in Exploratory Research (Grant)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Women Scientists", "SERB POWER", "Research Grant", "Gender Equity"],
        benefits: "Core research grant of up to ₹60 lakh for 3 years to support high-impact basic and applied research led by female principal investigators.",
        eligibility_summary: "Active women scientists holding regular academic or research appointments in recognized Indian universities.",
        eligibility: {
            minAge: 28,
            maxAge: 55,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://serbonline.in/",
        baseMatchScore: 78
    },
    {
        id: "scitech-serb-power-fell",
        title: "SERB POWER Fellowship for Top Women Scientists",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["POWER Fellowship", "Women Researchers", "SERB", "Honorarium"],
        benefits: "Fellowship honorarium of ₹15,000/month on top of regular salary, plus ₹10 lakh/year research grant and ₹90,000/year overheads for 3 years.",
        eligibility_summary: "Eminent women researchers aged 35–55 years with significant research breakthroughs and publications.",
        eligibility: {
            minAge: 35,
            maxAge: 55,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://serbonline.in/",
        baseMatchScore: 74
    },
    {
        id: "scitech-serb-crg",
        title: "SERB Core Research Grant (CRG)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Core Research", "CRG", "Laboratory Grant", "SERB"],
        benefits: "Competitive project funding of ₹30 lakh to ₹1.5 crore for up to 3 years covering equipment, project personnel, consumables, and domestic travel.",
        eligibility_summary: "Scientists and faculty holding permanent academic positions in universities and national laboratories.",
        eligibility: {
            minAge: 28,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://serbonline.in/",
        baseMatchScore: 72
    },
    {
        id: "scitech-serb-tare",
        title: "SERB TARE – Teachers Associateship for Research Excellence",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["TARE", "College Faculty", "IIT Collaboration", "Research Access"],
        benefits: "Honorarium of ₹60,000/year plus ₹5 lakh/year research grant for state college teachers to carry out research at IITs, IISc, or CSIR labs for 3 years.",
        eligibility_summary: "Full-time faculty in state universities and private/aided colleges holding a PhD.",
        eligibility: {
            minAge: 28,
            maxAge: 45,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://serbonline.in/",
        baseMatchScore: 73
    },
    {
        id: "scitech-serb-matrics",
        title: "SERB MATRICS – Mathematical Research Impact Centric Support",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["MATRICS", "Mathematics", "Theoretical Physics", "Research"],
        benefits: "Fixed research grant of ₹2 lakh per year for 3 years for theoretical scientists in Mathematics, Statistics, Theoretical Physics, and Computer Science.",
        eligibility_summary: "Active researchers in mathematical and theoretical sciences holding regular faculty positions.",
        eligibility: {
            minAge: 26,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://serbonline.in/",
        baseMatchScore: 70
    },
    {
        id: "scitech-serb-star",
        title: "SERB STAR – Science and Technology Award for Research",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["STAR Award", "Top Researchers", "SERB", "Honorarium"],
        benefits: "Fellowship of ₹15,000 per month, research grant of ₹10 lakh per year, and ₹1 lakh annual overheads for 3 years to recognize exceptional performance in SERB projects.",
        eligibility_summary: "Principal Investigators of completed SERB projects rated 'Excellent' with outstanding scientific contributions.",
        eligibility: {
            minAge: 32,
            maxAge: 50,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://serbonline.in/",
        baseMatchScore: 71
    },
    {
        id: "scitech-serb-its",
        title: "SERB International Travel Support (ITS) Scheme",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Travel Grant", "International Conference", "Researchers", "Airfare"],
        benefits: "Full reimbursement of international economy airfare, visa fees, and registration charges for Indian scientists presenting oral research papers abroad.",
        eligibility_summary: "Indian academic faculty, postdocs, and research scholars invited to present original papers at leading international scientific conferences.",
        eligibility: {
            minAge: 21,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://serbonline.in/",
        baseMatchScore: 75
    },
    {
        id: "scitech-dst-wos-a",
        title: "DST Women Scientists Scheme-A (WOS-A) for Basic & Applied Sciences",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["WOS-A", "Women Scientists", "Career Break", "Fellowship"],
        benefits: "Monthly fellowship up to ₹55,000 plus annual research grant of ₹2.5 lakh for 3 years helping women with break-in-career return to mainstream science.",
        eligibility_summary: "Women scientists with break in career holding M.Sc or PhD in basic or applied sciences.",
        eligibility: {
            minAge: 27,
            maxAge: 57,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "homemaker"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 80
    },
    {
        id: "scitech-dst-wos-b",
        title: "DST Women Scientists Scheme-B (WOS-B) for S&T Solutions for Society",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["WOS-B", "Societal S&T", "Rural Technology", "Women Fellowship"],
        benefits: "Fellowship of ₹30,000–₹55,000 per month and project grant up to ₹25 lakh for 3 years to design S&T interventions addressing rural challenges.",
        eligibility_summary: "Women scientists with career break proposing grassroots technological solutions for water, agriculture, and healthcare.",
        eligibility: {
            minAge: 27,
            maxAge: 57,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "homemaker"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 78
    },
    {
        id: "scitech-dst-wos-c",
        title: "DST Women Scientists Scheme-C (KIRAN IPR) – Patent Facilitation Training",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["KIRAN IPR", "Patent Attorney", "Women in STEM", "TIFAC"],
        benefits: "1-year intensive training in Patent Law and IP search with monthly stipend of ₹20,000–₹30,000 and placement assistance as Registered Patent Agents.",
        eligibility_summary: "Women with science or engineering degrees seeking to build specialized careers in Intellectual Property Rights.",
        eligibility: {
            minAge: 25,
            maxAge: 45,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "homemaker", "student"]
        },
        applyLink: "https://tifac.org.in/",
        baseMatchScore: 81
    },
    {
        id: "scitech-dst-curie",
        title: "DST CURIE – Infrastructure Grants for Women Universities",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["CURIE", "Women Universities", "Lab Infrastructure", "DST"],
        benefits: "Capital funding of ₹3 crore to ₹10 crore per women’s university to establish high-end instrumentation, artificial intelligence labs, and advanced biology centres.",
        eligibility_summary: "All recognized state and central women universities establishing advanced scientific research infrastructure.",
        eligibility: {
            minAge: 18,
            maxAge: 65,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 70
    },
    {
        id: "scitech-dst-vigyan-jyoti",
        title: "DST Vigyan Jyoti Scheme for Meritorious Girls in STEM",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Vigyan Jyoti", "Girls in STEM", "IIT Mentorship", "Class 9-12"],
        benefits: "Monthly scholarship stipend of ₹1,000, personalized mentorship from IIT/IISER professors, hands-on lab visits, and free coaching for STEM competitive exams.",
        eligibility_summary: "Meritorious girl students of Classes 9 to 12 in Jawahar Navodaya Vidyalayas and government schools.",
        eligibility: {
            minAge: 14,
            maxAge: 18,
            gender: ["female"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://vigyanjyoti.in/",
        baseMatchScore: 85
    },
    {
        id: "scitech-dst-gati",
        title: "DST GATI – Gender Advancement for Transforming Institutions",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["GATI", "Gender Equity", "Higher Education", "Women Leadership"],
        benefits: "Institutional self-assessment framework, accreditation for gender-sensitive leadership, and central grants to create crèches and flexible working arrangements.",
        eligibility_summary: "Participating higher education and research institutes driving gender equity in S&T.",
        eligibility: {
            minAge: 21,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "student"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 66
    },
    {
        id: "scitech-dst-fist",
        title: "DST FIST – Fund for Improvement of S&T Infrastructure in Higher Education",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["FIST", "Equipment Grant", "University Labs", "DST"],
        benefits: "Grants ranging from ₹50 lakh to ₹10 crore to universities and college science departments to acquire electron microscopes, mass spectrometers, and NMR machines.",
        eligibility_summary: "Postgraduate science and engineering departments in universities and recognized colleges.",
        eligibility: {
            minAge: 18,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://fist-dst.gov.in/",
        baseMatchScore: 72
    },
    {
        id: "scitech-dst-purse",
        title: "DST PURSE – Promotion of University Research and Scientific Excellence",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["PURSE", "University Grant", "Scientific Publications", "DST"],
        benefits: "Development funding up to ₹30 crore for universities with strong h-index publications to nurture multi-departmental interdisciplinary research centres.",
        eligibility_summary: "Indian central and state universities meeting high citation metrics in Scopus/Web of Science.",
        eligibility: {
            minAge: 20,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 68
    },
    {
        id: "scitech-dst-saif",
        title: "DST SAIF – Sophisticated Analytical Instrument Facilities",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["SAIF", "Analytical Instruments", "Subsidized Testing", "Researchers"],
        benefits: "Subsidized access to advanced equipment (TEM, SEM, HR-MS, EPR) hosted across 18 premier institutions for university students, researchers, and MSME industries.",
        eligibility_summary: "All Indian research scholars, university faculty, and industrial R&D personnel requiring advanced material characterization.",
        eligibility: {
            minAge: 20,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried", "self-employed"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 73
    },
    {
        id: "scitech-dst-sathi",
        title: "DST SATHI – Sophisticated Analytical & Technical Help Institutes",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["SATHI", "Centralized Research Facility", "DST", "High-End Labs"],
        benefits: "Establishment of ₹125 crore shared national research facilities operating 24/7 with zero downtime to support academia, startups, and manufacturing clusters.",
        eligibility_summary: "Researchers, startup innovators, and industrial technicians utilizing high-end scientific infrastructure.",
        eligibility: {
            minAge: 21,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried", "self-employed"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 67
    },
    {
        id: "scitech-nidhi-prayas",
        title: "DST NIDHI-PRAYAS – Promoting and Accelerating Young and Aspiring Innovators",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["NIDHI PRAYAS", "Prototype Grant", "Hardware Startup", "Maker Lab"],
        benefits: "Prototype grant up to ₹10 lakh per innovator and free access to state-of-the-art PRAYAS fabrication laboratories to convert scientific ideas into working hardware prototypes.",
        eligibility_summary: "Individual innovators and early-stage startup founders with an innovative hardware or deep-tech concept.",
        eligibility: {
            minAge: 18,
            maxAge: 45,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "self-employed", "unemployed"]
        },
        applyLink: "https://www.nidhi-prayas.org/",
        baseMatchScore: 84
    },
    {
        id: "scitech-nidhi-eir",
        title: "DST NIDHI-EIR – Entrepreneurs-in-Residence Fellowship",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["NIDHI EIR", "Startup Fellowship", "Stipend", "DeepTech"],
        benefits: "Living stipend of up to ₹30,000 per month for 12 to 18 months, accompanied by free co-working space, mentorship, and business development support at approved incubators.",
        eligibility_summary: "Aspiring technology entrepreneurs with a graduated degree who are committed to commercializing an innovation.",
        eligibility: {
            minAge: 21,
            maxAge: 40,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "student", "self-employed"]
        },
        applyLink: "https://nidhi-eir.uk/eir/",
        baseMatchScore: 82
    },
    {
        id: "scitech-nidhi-sss",
        title: "DST NIDHI Seed Support System (SSS) for Early Startups",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["NIDHI Seed", "Early Stage Investment", "Incubation", "DST"],
        benefits: "Seed capital investment of ₹25 lakh to ₹1 crore as debt or soft equity to help incubated deep-tech startups scale manufacturing and customer validation.",
        eligibility_summary: "Tech startups incubated in DST-supported Technology Business Incubators (TBIs) with registered IP.",
        eligibility: {
            minAge: 20,
            maxAge: 55,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["self-employed"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 76
    },
    {
        id: "scitech-nidhi-tbi",
        title: "DST Technology Business Incubators (TBI) Programme",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["TBI", "Incubation Hub", "Deep Tech", "Infrastructure"],
        benefits: "Grants up to ₹15 crore to academic institutions to set up full-fledged startup incubators providing wet labs, supercomputing, and legal advisory.",
        eligibility_summary: "Academic and research institutions establishing technology business incubation facilities.",
        eligibility: {
            minAge: 21,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "self-employed"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 70
    },
    {
        id: "scitech-nidhi-accelerator",
        title: "DST NIDHI Accelerator Programme for Fast Scaling Startups",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["NIDHI Accelerator", "Fast Scaling", "Venture Capital", "Mentorship"],
        benefits: "Structured 3-to-6 month fast-track acceleration with international investor demo days and pilot deployment funding for proven technological innovations.",
        eligibility_summary: "High-potential startups with functional products seeking venture capital readiness.",
        eligibility: {
            minAge: 20,
            maxAge: 55,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["self-employed"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 71
    },
    {
        id: "scitech-birac-big",
        title: "BIRAC Biotechnology Ignition Grant (BIG) Scheme",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["BIRAC BIG", "Biotech Grant", "Proof of Concept", "MedTech"],
        benefits: "Grant-in-aid of up to ₹50 lakh for 18 months for commercialization-oriented proof-of-concept projects in healthcare, agriculture, and industrial biotech.",
        eligibility_summary: "Individual biotech innovators, PhD scholars, doctors, and early startups under 5 years of incorporation.",
        eligibility: {
            minAge: 21,
            maxAge: 50,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "self-employed", "unemployed"]
        },
        applyLink: "https://birac.nic.in/big.php",
        baseMatchScore: 84
    },
    {
        id: "scitech-birac-sparsh",
        title: "BIRAC SPARSH – Social Innovation Programme for Products: Affordable & Relevant to Societal Health",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["SPARSH", "Social Biotech", "Maternal Health", "Fellowship"],
        benefits: "Monthly fellowship of ₹50,000 plus mini kick-start grant of ₹5 lakh to develop affordable healthcare and diagnostic solutions for underserved communities.",
        eligibility_summary: "Indian graduates, postgraduates in biomedical sciences, engineering, and medicine.",
        eligibility: {
            minAge: 21,
            maxAge: 40,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "unemployed", "self-employed"]
        },
        applyLink: "https://birac.nic.in/",
        baseMatchScore: 80
    },
    {
        id: "scitech-birac-bipp",
        title: "BIRAC BIPP – Biotechnology Industry Partnership Programme",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["BIPP", "Biotech R&D", "High Risk Innovation", "BIRAC"],
        benefits: "Government cost-sharing grant of 30% to 50% for high-risk, game-changing biotechnology product discovery in vaccines, biopharmaceuticals, and genomics.",
        eligibility_summary: "Registered Indian biotech companies with in-house DSIR-recognized R&D units.",
        eligibility: {
            minAge: 25,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["self-employed", "salaried"]
        },
        applyLink: "https://birac.nic.in/",
        baseMatchScore: 72
    },
    {
        id: "scitech-birac-sbiri",
        title: "BIRAC SBIRI – Small Business Innovation Research Initiative",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["SBIRI", "Small Biotech", "Commercialization", "Soft Loan"],
        benefits: "Grants and soft loans at 2% simple interest for early-stage validation of innovative biotechnology concepts by small and medium biotech enterprises.",
        eligibility_summary: "Small and medium Indian biotech enterprises with fewer than 500 employees.",
        eligibility: {
            minAge: 22,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["self-employed"]
        },
        applyLink: "https://birac.nic.in/",
        baseMatchScore: 73
    },
    {
        id: "scitech-birac-pace",
        title: "BIRAC PACE – Promoting Academic Research Conversion to Enterprise",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["PACE", "Academic Translation", "Patent to Product", "Biotech"],
        benefits: "Grant support up to ₹50 lakh for academic researchers to validate laboratory discoveries and establish proof of principle for industrial licensing.",
        eligibility_summary: "Faculty members, scientists, and researchers in public or private higher education institutions.",
        eligibility: {
            minAge: 25,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "student"]
        },
        applyLink: "https://birac.nic.in/",
        baseMatchScore: 72
    },
    {
        id: "scitech-birac-bionest",
        title: "BIRAC BioNEST – Bio-Incubators Nurturing Entrepreneurship for Scaling Technologies",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["BioNEST", "Bioincubator", "Wet Lab Access", "Instrumentation"],
        benefits: "Infrastructure funding to universities to operate certified bioincubators offering sterile tissue culture, fermentation suites, and cleanroom facilities.",
        eligibility_summary: "Biotech startups and academic innovators needing access to certified wet laboratory infrastructure.",
        eligibility: {
            minAge: 20,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "self-employed"]
        },
        applyLink: "https://birac.nic.in/",
        baseMatchScore: 75
    },
    {
        id: "scitech-dbt-jrf",
        title: "DBT Junior Research Fellowship (DBT-JRF) / BET Examination",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["DBT JRF", "Biotechnology", "PhD Fellowship", "BET Exam"],
        benefits: "Fellowship of ₹37,000/month (JRF) scaling to ₹42,000/month (SRF) plus HRA and ₹30,000 annual research contingency grant for pursuing PhD in biotechnology.",
        eligibility_summary: "Postgraduates in Biotechnology, Bioinformatics, and Life Sciences qualifying the Biotechnology Eligibility Test (BET).",
        eligibility: {
            minAge: 21,
            maxAge: 28,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://dbtindia.gov.in/",
        baseMatchScore: 84
    },
    {
        id: "scitech-dbt-pdf",
        title: "DBT Postdoctoral Fellowship (DBT-PDF) in Life Sciences",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["DBT PDF", "Life Sciences", "PostDoc Fellowship", "IISc"],
        benefits: "Monthly fellowship of ₹54,000 plus HRA and research contingency grant of ₹50,000 per year for 2 years to pursue postdoctoral work in top institutes.",
        eligibility_summary: "Candidates holding a PhD or MD/MS in biotechnology and life sciences, under 35 years of age.",
        eligibility: {
            minAge: 24,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "student"]
        },
        applyLink: "https://dbtindia.gov.in/",
        baseMatchScore: 78
    },
    {
        id: "scitech-dbt-ramalingaswami",
        title: "DBT Ramalingaswami Re-entry Fellowship for Indian Scientists",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Ramalingaswami", "Re-entry", "Overseas Scientists", "Brain Gain"],
        benefits: "Monthly consolidated fellowship of ₹1.25 lakh, HRA, and annual research grant of ₹10 lakh for 5 years to bring overseas Indian scientists back to national institutions.",
        eligibility_summary: "Overseas Indian scientists with PhD and minimum 3 years of postdoctoral experience abroad wishing to return to India.",
        eligibility: {
            minAge: 28,
            maxAge: 45,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "salaried"]
        },
        applyLink: "https://dbtindia.gov.in/",
        baseMatchScore: 76
    },
    {
        id: "scitech-dbt-star-college",
        title: "DBT Star College Scheme for Undergraduate Life Science Education",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Star College", "Undergraduate Biology", "Lab Equipment", "DBT"],
        benefits: "Grants up to ₹25 lakh per department to provide undergraduate science students hands-on experiments, minor research projects, and specialized faculty training.",
        eligibility_summary: "Undergraduate colleges teaching botany, zoology, chemistry, physics, and biotechnology.",
        eligibility: {
            minAge: 17,
            maxAge: 25,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://dbtindia.gov.in/",
        baseMatchScore: 81
    },
    {
        id: "scitech-dbt-skill-vigyan",
        title: "DBT Skill Vigyan Programme in Biotechnology",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Skill Vigyan", "Biotech Technician", "Hands-on Training", "DBT"],
        benefits: "Free 3-to-6 month hands-on vocational courses in molecular diagnostics, tissue culture, and bioprocess operations with monthly training stipend of ₹5,000.",
        eligibility_summary: "10+2 science pass-outs, polytechnic diploma holders, and fresh life science graduates.",
        eligibility: {
            minAge: 18,
            maxAge: 30,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "student"]
        },
        applyLink: "https://dbtindia.gov.in/",
        baseMatchScore: 80
    },
    {
        id: "scitech-dbt-builder",
        title: "DBT BUILDER – Boost to University Interdisciplinary Life Science Departments",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["BUILDER", "Interdisciplinary Biology", "Genomics", "DBT Grant"],
        benefits: "Institutional support up to ₹10 crore to modernize university life science curricula, install automated DNA sequencing facilities, and encourage inter-departmental research.",
        eligibility_summary: "UGC-recognized universities with strong credentials in life science postgraduate teaching.",
        eligibility: {
            minAge: 20,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://dbtindia.gov.in/",
        baseMatchScore: 68
    },
    {
        id: "scitech-csir-jrf",
        title: "CSIR Junior Research Fellowship (CSIR-JRF) in Physical & Chemical Sciences",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["CSIR JRF", "NET Fellowship", "Physical Sciences", "Chemical Sciences"],
        benefits: "Monthly stipend of ₹37,000 plus HRA and ₹20,000 annual contingency grant for first 2 years, upgradable to SRF at ₹42,000/month for 3 years.",
        eligibility_summary: "M.Sc or equivalent degree holders qualifying Joint CSIR-UGC NET for JRF in chemical, earth, mathematical, and physical sciences.",
        eligibility: {
            minAge: 20,
            maxAge: 28,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://csirnet.nta.ac.in/",
        baseMatchScore: 85
    },
    {
        id: "scitech-csir-srf",
        title: "CSIR Senior Research Fellowship (CSIR-SRF-Direct)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["CSIR SRF", "Doctoral Research", "Direct Fellowship", "STEM"],
        benefits: "Direct SRF award of ₹42,000 per month plus HRA and contingency grant for scholars with at least two years of proven research experience and indexed publications.",
        eligibility_summary: "Postgraduates in science or engineering with at least one published research paper in an SCI journal.",
        eligibility: {
            minAge: 23,
            maxAge: 32,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://csirhrdg.res.in/",
        baseMatchScore: 81
    },
    {
        id: "scitech-csir-ra",
        title: "CSIR Research Associateship (CSIR-RA)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["CSIR RA", "PostDoc Fellowship", "Research Associate", "CSIR"],
        benefits: "Monthly fellowship of ₹58,000–₹67,000 plus HRA and annual research contingency grant of ₹20,000 to conduct independent post-PhD research in CSIR/academic labs.",
        eligibility_summary: "Indian citizens with a PhD degree in science or M.Tech/MD with research publications.",
        eligibility: {
            minAge: 25,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "student"]
        },
        applyLink: "https://csirhrdg.res.in/",
        baseMatchScore: 79
    },
    {
        id: "scitech-csir-nehru-pdf",
        title: "CSIR-Nehru Science Postdoctoral Research Fellowship",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Nehru Fellowship", "CSIR PostDoc", "Premier Research", "Stipend"],
        benefits: "Prestigious fellowship of ₹65,000 per month plus HRA and annual contingency grant of ₹3 lakh for 2 years to work with senior scientists in CSIR national laboratories.",
        eligibility_summary: "PhD holders in basic or applied sciences within 3 years of thesis defense with high academic standing.",
        eligibility: {
            minAge: 24,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["unemployed", "student"]
        },
        applyLink: "https://csirhrdg.res.in/",
        baseMatchScore: 78
    },
    {
        id: "scitech-csir-ramanujan",
        title: "SERB Ramanujan Fellowship for Outstanding Overseas Scientists",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Ramanujan Fellowship", "Overseas Researchers", "Repatriation", "SERB"],
        benefits: "Monthly fellowship of ₹1.35 lakh plus annual research grant of ₹7 lakh for 5 years to attract brilliant Indian researchers working abroad back to Indian institutions.",
        eligibility_summary: "Brilliant Indian scientists and engineers working abroad with proven record of high scientific impact.",
        eligibility: {
            minAge: 28,
            maxAge: 40,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "unemployed"]
        },
        applyLink: "https://serbonline.in/",
        baseMatchScore: 77
    },
    {
        id: "scitech-csir-ssb-prize",
        title: "CSIR Shanti Swarup Bhatnagar (SSB) Prize for Science and Technology",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Bhatnagar Prize", "Highest Science Honour", "Honorarium", "CSIR"],
        benefits: "Cash award of ₹5 lakh, a plaque, citation, and monthly honorarium of ₹15,000 up to age 65, recognizing outstanding research contributions made primarily in India.",
        eligibility_summary: "Indian scientists under 45 years of age engaged in notable research in biological, chemical, earth, engineering, or physical sciences.",
        eligibility: {
            minAge: 30,
            maxAge: 45,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://csirhrdg.res.in/",
        baseMatchScore: 70
    },
    {
        id: "scitech-csir-young-scientist",
        title: "CSIR Young Scientist Award & Research Grant",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Young Scientist", "CSIR Award", "Research Grant", "Citation"],
        benefits: "Cash prize of ₹50,000, citation plaque, and a non-recurring research grant of ₹25 lakh spread over 5 years for independent scientific investigations.",
        eligibility_summary: "Scientists working in CSIR laboratory networks under 35 years of age.",
        eligibility: {
            minAge: 25,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried"]
        },
        applyLink: "https://csirhrdg.res.in/",
        baseMatchScore: 71
    },
    {
        id: "scitech-csir-ciasc",
        title: "CSIR Innovation Award for School Children (CIASC)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["CIASC", "School Innovation", "Cash Prizes", "Patent Support"],
        benefits: "15 annual cash prizes (First prize ₹1 lakh) and assistance in filing Indian patents for original novel technological and biological inventions designed by school kids.",
        eligibility_summary: "School children below 18 years of age enrolled in any recognized Indian school.",
        eligibility: {
            minAge: 10,
            maxAge: 18,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://csirhrdg.res.in/",
        baseMatchScore: 84
    },
    {
        id: "scitech-csir-800",
        title: "CSIR-800 Societal Technologies Programme",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["CSIR-800", "Rural Technologies", "Water Purification", "Agri Processing"],
        benefits: "Field deployment of low-cost water filters (Terafil), essential oil distillation units, bio-toilets, and post-harvest drying technologies to boost rural livelihoods.",
        eligibility_summary: "Farmers, rural youth, SHGs, and local artisans in economically backward blocks.",
        eligibility: {
            minAge: 18,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["farmer", "daily-wage-worker", "self-employed"]
        },
        applyLink: "https://www.csir.res.in/",
        baseMatchScore: 82
    },
    {
        id: "scitech-dst-tdp",
        title: "DST Technology Development Programme (TDP)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["TDP", "Technology Commercialization", "Prototype Validation", "DST"],
        benefits: "Financial assistance up to ₹1 crore for academic-industry partnerships to scale laboratory bench concepts to pre-commercial pilot plant trials.",
        eligibility_summary: "Joint applications by academic faculty and industrial engineering partners.",
        eligibility: {
            minAge: 25,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "self-employed"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 70
    },
    {
        id: "scitech-dst-waste-management",
        title: "DST Waste Management Technologies Programme",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Waste to Wealth", "Circular Economy", "E-Waste Recycling", "DST Grant"],
        benefits: "R&D grants up to ₹75 lakh for developing indigenously manufactured systems to recycle electronic waste, plastics, industrial effluent, and agricultural crop residue.",
        eligibility_summary: "Scientists and environmental engineers in universities, national labs, and technology startups.",
        eligibility: {
            minAge: 22,
            maxAge: 60,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "self-employed", "student"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 74
    },
    {
        id: "scitech-dst-ceri",
        title: "DST Clean Energy Research Initiative (CERI)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Clean Energy", "Green Hydrogen", "Battery Storage", "Solar Cells"],
        benefits: "Project grants of ₹50 lakh to ₹3 crore to develop next-generation solar photovoltaics, green hydrogen electrolyzers, sodium-ion batteries, and supercapacitors.",
        eligibility_summary: "Research faculty and scholars working in renewable and clean energy science disciplines.",
        eligibility: {
            minAge: 24,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "student"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 76
    },
    {
        id: "scitech-dst-wti",
        title: "DST Water Technology Initiative (WTI)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Water Technology", "Desalination", "Arsenic Removal", "Clean Drinking"],
        benefits: "Grants for creating decentralized water purification systems, fluoride and arsenic removal filters, and membrane technologies for water-scarce villages.",
        eligibility_summary: "Academic researchers, engineers, and social enterprises addressing clean water access.",
        eligibility: {
            minAge: 22,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["salaried", "student", "self-employed"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 78
    },
    {
        id: "scitech-dst-climate",
        title: "DST National Climate Change Programme – Himalayan Ecosystem Research",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Climate Change", "Himalayan Glaciers", "Ecological Monitoring", "DST"],
        benefits: "Field monitoring grants, high-altitude field stations, and doctoral fellowships studying glacier retreat, weather extremes, and ecological resilience.",
        eligibility_summary: "Geoscientists, glaciologists, and environmental researchers in recognized institutes.",
        eligibility: {
            minAge: 22,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 72
    },
    {
        id: "scitech-dst-csri",
        title: "DST Cognitive Science Research Initiative (CSRI)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Cognitive Science", "Neuroscience", "AI & Mind", "Fellowship"],
        benefits: "Research grants up to ₹40 lakh and Postdoctoral Fellowships (₹55,000/month) to study brain mapping, language cognition, and neuro-rehabilitation.",
        eligibility_summary: "Researchers in psychology, neuroscience, linguistics, and computer science holding a PhD.",
        eligibility: {
            minAge: 24,
            maxAge: 55,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 71
    },
    {
        id: "scitech-dst-icps",
        title: "DST National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["NM-ICPS", "AI & Robotics", "IoT", "Cyber Physical Systems", "DST"],
        benefits: "Technology Innovation Hub (TIH) fellowships (up to ₹50,000/month) and prototype grants for AI, quantum tech, autonomous robotics, and IoT research.",
        eligibility_summary: "M.Tech and PhD scholars, postdocs, and young entrepreneurs working at 25 designated national TIH hubs.",
        eligibility: {
            minAge: 20,
            maxAge: 35,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "self-employed"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 83
    },
    {
        id: "scitech-dst-seed",
        title: "DST Science for Equity, Empowerment and Development (SEED)",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["DST SEED", "Tribal S&T", "SC/ST Empowerment", "Grassroots Tech"],
        benefits: "Field demonstration funding up to ₹50 lakh for voluntary organizations and scientists implementing tailored agricultural, energy, and artisanal tools for SC/ST groups.",
        eligibility_summary: "Community organizations, academic field extension teams, and grassroots innovators working with marginalized groups.",
        eligibility: {
            minAge: 18,
            maxAge: 70,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l"],
            category: ["sc", "st"],
            occupation: ["farmer", "daily-wage-worker", "self-employed"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 80
    },
    {
        id: "scitech-dst-vigyan-prasar",
        title: "Vigyan Prasar – Science Popularization & STEM Communication Grant",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Science Communication", "Regional Languages", "Documentaries", "STEM Books"],
        benefits: "Fellowships and production grants up to ₹5 lakh for authors, filmmakers, and educators creating popular science books and audio-visuals in regional Indian languages.",
        eligibility_summary: "Science communicators, journalists, documentary makers, and teachers producing science content in vernacular media.",
        eligibility: {
            minAge: 21,
            maxAge: 65,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["self-employed", "salaried"]
        },
        applyLink: "https://vigyanprasar.gov.in/",
        baseMatchScore: 71
    },
    {
        id: "scitech-dst-quantum",
        title: "National Quantum Mission (NQM) – Research Fellowship & Grants",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Quantum Computing", "NQM", "Quantum Cryptography", "DST Fellowship"],
        benefits: "Direct research fellowships of ₹60,000/month and institutional thematic hub funding up to ₹50 crore to develop quantum computers, quantum sensors, and secure quantum networks.",
        eligibility_summary: "Postdoctoral scholars, PhD students, and faculty working on quantum physics, quantum communication, and algorithms.",
        eligibility: {
            minAge: 21,
            maxAge: 40,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student", "salaried"]
        },
        applyLink: "https://dst.gov.in/",
        baseMatchScore: 82
    },
    {
        id: "scitech-serb-accelerate-vigyan",
        title: "SERB Accelerate Vigyan – ABHYAAS Research Internships & Workshops",
        ministry: "Ministry of Science and Technology",
        type: "central",
        category: "Science, IT & Communications",
        tags: ["Accelerate Vigyan", "KARYASHALA", "VRITIKA", "Research Internship"],
        benefits: "Fully funded research internships (VRITIKA) of ₹30,000/month and high-end workshops (KARYASHALA) at premier national labs for postgraduate students.",
        eligibility_summary: "Postgraduate (M.Sc/M.Tech/M.E.) students enrolled in recognized Indian universities and colleges.",
        eligibility: {
            minAge: 20,
            maxAge: 28,
            gender: ["male", "female", "transgender"],
            income: ["below-1l", "1l-2.5l", "2.5l-5l", "5l-8l", "8l-10l", "above-10l"],
            category: ["general", "sc", "st", "obc"],
            occupation: ["student"]
        },
        applyLink: "https://acceleratevigyan.gov.in/",
        baseMatchScore: 80
    }
];

module.exports = { educationAndSciTechSchemes };
