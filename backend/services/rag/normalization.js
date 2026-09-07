/* ============================================================
   JanSahay AI - Data Normalization Layer
   Canonical mappings for:
   - Categories (16 Canonical Values)
   - Occupations (FARMER, STUDENT, etc.)
   - States (Canonical Indian States & UTs + ALL_INDIA)
   - Gender, Social Category, Beneficiary
   Supports English, Hindi, and Gujarati scripts
   Guarantees safe word-boundary matching to prevent substring bugs
   ============================================================ */

/**
 * 16 Canonical Categories (Part 20)
 */
const CANONICAL_CATEGORIES = {
    AGRICULTURE: 'AGRICULTURE',
    FINANCE: 'FINANCE',
    BUSINESS: 'BUSINESS',
    EDUCATION: 'EDUCATION',
    HEALTH: 'HEALTH',
    HOUSING: 'HOUSING',
    EMPLOYMENT: 'EMPLOYMENT',
    SOCIAL_WELFARE: 'SOCIAL_WELFARE',
    WOMEN_CHILD: 'WOMEN_CHILD',
    TRANSPORT: 'TRANSPORT',
    SCIENCE_IT: 'SCIENCE_IT',
    SPORTS_CULTURE: 'SPORTS_CULTURE',
    TRAVEL_TOURISM: 'TRAVEL_TOURISM',
    UTILITY_SANITATION: 'UTILITY_SANITATION',
    PUBLIC_SAFETY: 'PUBLIC_SAFETY',
    RURAL_DEVELOPMENT: 'RURAL_DEVELOPMENT'
};

/**
 * Mapping from various scheme dataset category names & search tokens to canonical categories
 */
const CATEGORY_MAP = [
    // Education
    {
        canonical: CANONICAL_CATEGORIES.EDUCATION,
        aliases: [
            'education & learning', 'education', 'learning', 'scholarship', 'scholarships',
            'fellowship', 'fellowships', 'student', 'students', 'school', 'college', 'university',
            'pre-matric', 'post-matric', 'higher education',
            // Hindi
            'शिक्षा', 'छात्रवृत्ति', 'पढ़ाई', 'स्कूल', 'कॉलेज', 'विश्वविद्यालय', 'विद्यार्थी', 'छात्र',
            // Gujarati
            'શિક્ષણ', 'શિષ્યવૃત્તિ', 'અભ્યાસ', 'વિદ્યાર્થી', 'વિદ્યાર્થીઓ', 'શાળા', 'કોલેજ',
            // Romanized
            'shikshan', 'shishyavrutti', 'vidhyarthi', 'padhai', 'chhatravritti'
        ]
    },
    // Agriculture
    {
        canonical: CANONICAL_CATEGORIES.AGRICULTURE,
        aliases: [
            'agriculture, rural & environment', 'agriculture', 'farming', 'farmer', 'farmers',
            'crop', 'crops', 'kisan', 'krishi', 'khedut', 'cultivation', 'fertilizer', 'seed',
            'soil health', 'fasal', 'pashupalan', 'dairy', 'fisheries',
            // Hindi
            'कृषि', 'किसान', 'किसानों', 'खेती', 'फसल', 'पशुपालन', 'बीज', 'खाद',
            // Gujarati
            'કૃષિ', 'ખેડૂત', 'ખેડૂતો', 'ખેતી', 'પાક', 'પશુપાલન', 'બિયારણ', 'ખાતર',
            // Romanized
            'kheduto', 'kisan yojana', 'fasal bima'
        ]
    },
    // Health
    {
        canonical: CANONICAL_CATEGORIES.HEALTH,
        aliases: [
            'health & wellness', 'health', 'medical', 'wellness', 'hospital', 'medicine',
            'treatment', 'healthcare', 'ayushman', 'disease', 'clinic', 'maternity',
            // Hindi
            'स्वास्थ्य', 'चिकित्सा', 'अस्पताल', 'दवा', 'इलाज', 'आयुष्मान',
            // Gujarati
            'સ્વાસ્થ્ય', 'આરોગ્ય', 'તબીબી', 'હોસ્પિટલ', 'દવા', 'સારવાર',
            // Romanized
            'swasthya', 'arogya', 'dava'
        ]
    },
    // Housing
    {
        canonical: CANONICAL_CATEGORIES.HOUSING,
        aliases: [
            'housing & shelter', 'housing', 'shelter', 'house', 'home', 'awas', 'makan',
            'pmay', 'residence', 'flats',
            // Hindi
            'आवास', 'मकान', 'घर', 'रहने',
            // Gujarati
            'આવાસ', 'મકાન', 'ઘર',
            // Romanized
            'ghar', 'aawas'
        ]
    },
    // Finance / Banking
    {
        canonical: CANONICAL_CATEGORIES.FINANCE,
        aliases: [
            'banking, financial services & insurance', 'banking', 'financial services',
            'insurance', 'finance', 'loan', 'credit', 'pension', 'subsidy', 'bank account',
            'jan dhan', 'pmjdy', 'bima',
            // Hindi
            'बैंकिंग', 'वित्तीय', 'बीमा', 'ऋण', 'लोन', 'पेंशन', 'बैंक',
            // Gujarati
            'બેંકિંગ', 'નાણાકીય', 'વીમો', 'લોન', 'ધિરાણ', 'પેન્શન', 'બેંક',
            // Romanized
            'vimo', 'rin'
        ]
    },
    // Business & Entrepreneurship
    {
        canonical: CANONICAL_CATEGORIES.BUSINESS,
        aliases: [
            'business & entrepreneurship', 'business', 'entrepreneurship', 'msme', 'startup',
            'mudra', 'vyapar', 'industry', 'commercial', 'self employment',
            // Hindi
            'व्यापार', 'व्यवसाय', 'उद्योग', 'उद्यमिता', 'स्टार्टअप',
            // Gujarati
            'વેપાર', 'ધંધો', 'ઉદ્યોગ', 'સાહસિકતા',
            // Romanized
            'dhandho', 'udyog'
        ]
    },
    // Skills & Employment
    {
        canonical: CANONICAL_CATEGORIES.EMPLOYMENT,
        aliases: [
            'skills & employment', 'employment', 'skills', 'skill development', 'job',
            'rozgar', 'training', 'naukri', 'placement', 'vocational', 'apprentice',
            'pmkvy', 'vishwakarma',
            // Hindi
            'रोजगार', 'कौशल', 'नौकरी', 'प्रशिक्षण', 'काम',
            // Gujarati
            'રોજગાર', 'કૌશલ્ય', 'નોકરી', 'તાલીમ',
            // Romanized
            'rojgar', 'kaushalya'
        ]
    },
    // Women & Child
    {
        canonical: CANONICAL_CATEGORIES.WOMEN_CHILD,
        aliases: [
            'women & child', 'women', 'child', 'female', 'girl', 'girls', 'daughter',
            'mother', 'pregnant', 'mahila', 'beti', 'dikri', 'sukanya',
            // Hindi
            'महिला', 'स्त्री', 'बेटी', 'बच्चे', 'बालिका', 'माता',
            // Gujarati
            'મહિલા', 'સ્ત્રી', 'દીકરી', 'બાળકો', 'બાલિકા', 'માતા',
            // Romanized
            'naari', 'stree'
        ]
    },
    // Social Welfare & Empowerment
    {
        canonical: CANONICAL_CATEGORIES.SOCIAL_WELFARE,
        aliases: [
            'social welfare & empowerment', 'social welfare', 'empowerment', 'disability',
            'divyang', 'senior citizen', 'vridha', 'widow', 'vidhwa', 'sc/st', 'obc',
            'minority', 'tribal',
            // Hindi
            'सामाजिक कल्याण', 'दिव्यांग', 'वरिष्ठ नागरिक', 'वृद्ध', 'विधवा', 'अल्पसंख्यक',
            // Gujarati
            'સામાજિક કલ્યાણ', 'દિવ્યાંગ', 'વરિષ્ઠ નાગરિક', 'વૃદ્ધ', 'વિધવા',
            // Romanized
            'samajik kalyan'
        ]
    },
    // Utility & Sanitation
    {
        canonical: CANONICAL_CATEGORIES.UTILITY_SANITATION,
        aliases: [
            'utility & sanitation', 'utility', 'sanitation', 'solar', 'electricity',
            'bijli', 'power', 'water', 'toilet', 'swachh', 'cleanliness', 'pm surya ghar',
            // Hindi
            'सौर ऊर्जा', 'बिजली', 'स्वच्छता', 'शौचालय', 'पानी',
            // Gujarati
            'સૌર ઊર્જા', 'વીજળી', 'સ્વચ્છતા', 'શૌચાલય', 'પાણી',
            // Romanized
            'surya ghar', 'sauce'
        ]
    },
    // Transport & Infrastructure
    {
        canonical: CANONICAL_CATEGORIES.TRANSPORT,
        aliases: [
            'transport & infrastructure', 'infrastructure & connectivity', 'transport',
            'vehicle', 'e-rickshaw', 'ev', 'electric vehicle', 'road', 'highway',
            // Hindi
            'परिवहन', 'वाहन', 'सड़क',
            // Gujarati
            'પરિવહન', 'વાહન', 'રસ્તો'
        ]
    },
    // Science, IT & Communications
    {
        canonical: CANONICAL_CATEGORIES.SCIENCE_IT,
        aliases: [
            'science, it & communications', 'science & technology', 'science', 'technology',
            'it', 'research', 'innovation', 'digital', 'scientific',
            // Hindi
            'विज्ञान', 'प्रौद्योगिकी', 'अनुसंधान',
            // Gujarati
            'વિજ્ઞાન', 'ટેકનોલોજી', 'સંશોધન'
        ]
    },
    // Sports & Culture
    {
        canonical: CANONICAL_CATEGORIES.SPORTS_CULTURE,
        aliases: [
            'sports & culture', 'arts & culture', 'sports & adventure', 'sports',
            'culture', 'art', 'khelo india', 'athlete', 'games',
            // Hindi
            'खेल', 'संस्कृति', 'कला',
            // Gujarati
            'રમતગમત', 'સંસ્કૃતિ', 'કલા'
        ]
    },
    // Travel & Tourism
    {
        canonical: CANONICAL_CATEGORIES.TRAVEL_TOURISM,
        aliases: [
            'travel & tourism', 'tourism', 'travel', 'yatra', 'pilgrimage',
            // Hindi
            'पर्यटन', 'यात्रा', 'तीर्थ',
            // Gujarati
            'પ્રવાસન', 'યાત્રા', 'તીર્થ'
        ]
    },
    // Public Safety, Law & Justice
    {
        canonical: CANONICAL_CATEGORIES.PUBLIC_SAFETY,
        aliases: [
            'public safety, law & justice', 'public safety', 'law', 'justice', 'legal',
            'police', 'court',
            // Hindi
            'न्याय', 'कानून', 'सुरक्षा',
            // Gujarati
            'ન્યાય', 'કાયદો', 'સુરક્ષા'
        ]
    },
    // Rural Development
    {
        canonical: CANONICAL_CATEGORIES.RURAL_DEVELOPMENT,
        aliases: [
            'rural development', 'gramin', 'panchayat', 'village', 'rural',
            // Hindi
            'ग्रामीण विकास', 'पंचायत', 'गांव',
            // Gujarati
            'ગ્રામીણ વિકાસ', 'પંચાયત', 'ગામડું'
        ]
    }
];

/**
 * Canonical Occupations (Part 4 & Part 8)
 */
const CANONICAL_OCCUPATIONS = {
    FARMER: 'FARMER',
    STUDENT: 'STUDENT',
    SELF_EMPLOYED: 'SELF_EMPLOYED',
    EMPLOYED: 'EMPLOYED',
    UNEMPLOYED: 'UNEMPLOYED',
    RETIRED: 'RETIRED',
    HOMEMAKER: 'HOMEMAKER',
    ARTISAN: 'ARTISAN'
};

const OCCUPATION_MAP = [
    {
        canonical: CANONICAL_OCCUPATIONS.FARMER,
        aliases: [
            'farmer', 'farmers', 'kisan', 'khedut', 'kheduto', 'agriculture', 'agricultural',
            'cultivator', 'grower', 'planter',
            // Hindi
            'किसान', 'किसानों', 'खेतीहर', 'कृषक',
            // Gujarati
            'ખેડૂત', 'ખેડૂતો', 'ખેડૂતોને', 'ખેતીકામ',
            // Romanized
            'khedut mate', 'kheduto mate', 'kisano ke liye'
        ]
    },
    {
        canonical: CANONICAL_OCCUPATIONS.STUDENT,
        aliases: [
            'student', 'students', 'scholar', 'pupil', 'learner',
            // Hindi
            'छात्र', 'छात्रों', 'विद्यार्थी', 'विद्यार्थियों',
            // Gujarati
            'વિદ્યાર્થી', 'વિદ્યાર્થીઓ', 'વિદ્યાર્થીઓને',
            // Romanized
            'vidhyarthi', 'vidyarthi', 'chhatra'
        ]
    },
    {
        canonical: CANONICAL_OCCUPATIONS.SELF_EMPLOYED,
        aliases: [
            'self-employed', 'self employed', 'businessman', 'business', 'entrepreneur',
            'shopkeeper', 'trader', 'vendor',
            // Hindi
            'व्यापारी', 'दुकानदार', 'स्वरोजगार', 'उद्यमी',
            // Gujarati
            'વેપારી', 'દુકાનદાર', 'સ્વરોજગાર',
            // Romanized
            'vyapari', 'dukan'
        ]
    },
    {
        canonical: CANONICAL_OCCUPATIONS.EMPLOYED,
        aliases: [
            'employed', 'worker', 'employee', 'salaried', 'laborer', 'labour', 'job',
            // Hindi
            'कर्मचारी', 'नौकरीपेशा', 'मजदूर', 'श्रमिक',
            // Gujarati
            'કર્મચારી', 'નોકરીયાત', 'મજૂર', 'શ્રમિક',
            // Romanized
            'karmchari', 'mazdoor', 'naukri'
        ]
    },
    {
        canonical: CANONICAL_OCCUPATIONS.UNEMPLOYED,
        aliases: [
            'unemployed', 'jobless', 'jobseeker',
            // Hindi
            'बेरोजगार', 'बेरोजगारी',
            // Gujarati
            'બેરોજગાર', 'બેરોજગારી',
            // Romanized
            'berozgar'
        ]
    },
    {
        canonical: CANONICAL_OCCUPATIONS.RETIRED,
        aliases: [
            'retired', 'senior citizen', 'pensioner', 'elderly',
            // Hindi
            'सेवानिवृत्त', 'वरिष्ठ नागरिक', 'बुजुर्ग', 'पेंशनभोगी',
            // Gujarati
            'નિવૃત્ત', 'વરિષ્ઠ નાગરિક', 'વૃદ્ધ', 'પેન્શનર',
            // Romanized
            'vridha', 'vridh'
        ]
    },
    {
        canonical: CANONICAL_OCCUPATIONS.HOMEMAKER,
        aliases: [
            'homemaker', 'housewife',
            // Hindi
            'गृहणी',
            // Gujarati
            'ગૃહિણી'
        ]
    },
    {
        canonical: CANONICAL_OCCUPATIONS.ARTISAN,
        aliases: [
            'artisan', 'craftsman', 'carpenter', 'blacksmith', 'potter', 'weaver', 'tailor',
            'vishwakarma',
            // Hindi
            'कारीगर', 'शिल्पकार', 'बढ़ई', 'लोहार', 'कुम्हार', 'बुनकर',
            // Gujarati
            'કારીગર', 'શિલ્પકાર', 'સુથાર', 'લુહાર', 'કુંભાર', 'વણકર'
        ]
    }
];

/**
 * Canonical States (Part 21)
 * Using explicit whole-word / script patterns to prevent "are" -> "Arunachal Pradesh" bug!
 */
const CANONICAL_STATES = {
    ALL_INDIA: 'ALL_INDIA',
    GUJARAT: 'GUJARAT',
    MAHARASHTRA: 'MAHARASHTRA',
    RAJASTHAN: 'RAJASTHAN',
    MADHYA_PRADESH: 'MADHYA_PRADESH',
    UTTAR_PRADESH: 'UTTAR_PRADESH',
    BIHAR: 'BIHAR',
    DELHI: 'DELHI',
    PUNJAB: 'PUNJAB',
    HARYANA: 'HARYANA',
    KARNATAKA: 'KARNATAKA',
    TAMIL_NADU: 'TAMIL_NADU',
    KERALA: 'KERALA',
    ANDHRA_PRADESH: 'ANDHRA_PRADESH',
    TELANGANA: 'TELANGANA',
    WEST_BENGAL: 'WEST_BENGAL',
    ODISHA: 'ODISHA',
    ASSAM: 'ASSAM',
    CHHATTISGARH: 'CHHATTISGARH',
    JHARKHAND: 'JHARKHAND',
    HIMACHAL_PRADESH: 'HIMACHAL_PRADESH',
    UTTARAKHAND: 'UTTARAKHAND',
    GOA: 'GOA',
    JAMMU_KASHMIR: 'JAMMU_KASHMIR',
    LADAKH: 'LADAKH',
    TRIPURA: 'TRIPURA',
    MEGHALAYA: 'MEGHALAYA',
    MANIPUR: 'MANIPUR',
    NAGALAND: 'NAGALAND',
    MIZORAM: 'MIZORAM',
    ARUNACHAL_PRADESH: 'ARUNACHAL_PRADESH',
    SIKKIM: 'SIKKIM',
    PUDUCHERRY: 'PUDUCHERRY',
    CHANDIGARH: 'CHANDIGARH',
    ANDAMAN_NICOBAR: 'ANDAMAN_NICOBAR',
    DADRA_NAGAR_HAVELI: 'DADRA_NAGAR_HAVELI',
    LAKSHADWEEP: 'LAKSHADWEEP'
};

const STATE_MAP = [
    {
        canonical: CANONICAL_STATES.ALL_INDIA,
        display: 'All India',
        aliases: ['all india', 'central', 'national', 'pan india', 'bharat', 'india', 'કેન્દ્ર', 'રાષ્ટ્રીય', 'ભારત', 'भारत', 'राष्ट्रीय']
    },
    {
        canonical: CANONICAL_STATES.GUJARAT,
        display: 'Gujarat',
        aliases: ['gujarat', 'gujrat', 'ગુજરાત', 'ગુજરાતમાં', 'ગુજરાતી', 'गुजरात', 'गुजराती']
    },
    {
        canonical: CANONICAL_STATES.MAHARASHTRA,
        display: 'Maharashtra',
        aliases: ['maharashtra', 'महाराष्ट्र', 'મહારાષ્ટ્ર']
    },
    {
        canonical: CANONICAL_STATES.RAJASTHAN,
        display: 'Rajasthan',
        aliases: ['rajasthan', 'राजस्थान', 'રાજસ્થાન']
    },
    {
        canonical: CANONICAL_STATES.MADHYA_PRADESH,
        display: 'Madhya Pradesh',
        aliases: ['madhya pradesh', 'mp', 'मध्य प्रदेश', 'મધ્ય પ્રદેશ']
    },
    {
        canonical: CANONICAL_STATES.UTTAR_PRADESH,
        display: 'Uttar Pradesh',
        aliases: ['uttar pradesh', 'up', 'उत्तर प्रदेश', 'ઉત્તર પ્રદેશ']
    },
    {
        canonical: CANONICAL_STATES.BIHAR,
        display: 'Bihar',
        aliases: ['bihar', 'बिहार', 'બિહાર']
    },
    {
        canonical: CANONICAL_STATES.DELHI,
        display: 'Delhi',
        aliases: ['delhi', 'new delhi', 'dilli', 'दिल्ली', 'દિલ્હી']
    },
    {
        canonical: CANONICAL_STATES.PUNJAB,
        display: 'Punjab',
        aliases: ['punjab', 'पंजाब', 'પંજાબ']
    },
    {
        canonical: CANONICAL_STATES.HARYANA,
        display: 'Haryana',
        aliases: ['haryana', 'हरियाणा', 'હરિયાણા']
    },
    {
        canonical: CANONICAL_STATES.KARNATAKA,
        display: 'Karnataka',
        aliases: ['karnataka', 'कर्नाटक', 'કર્ણાટક']
    },
    {
        canonical: CANONICAL_STATES.TAMIL_NADU,
        display: 'Tamil Nadu',
        aliases: ['tamil nadu', 'tamilnadu', 'तमिलनाडु', 'તમિલનાડુ']
    },
    {
        canonical: CANONICAL_STATES.KERALA,
        display: 'Kerala',
        aliases: ['kerala', 'केरल', 'કેરળ']
    },
    {
        canonical: CANONICAL_STATES.ANDHRA_PRADESH,
        display: 'Andhra Pradesh',
        aliases: ['andhra pradesh', 'andhra', 'आंध्र प्रदेश', 'આંધ્ર પ્રદેશ']
    },
    {
        canonical: CANONICAL_STATES.TELANGANA,
        display: 'Telangana',
        aliases: ['telangana', 'तेलंगाना', 'તેલંગાણા']
    },
    {
        canonical: CANONICAL_STATES.WEST_BENGAL,
        display: 'West Bengal',
        aliases: ['west bengal', 'bengal', 'पश्चिम बंगाल', 'પશ્ચિમ બંગાળ']
    },
    {
        canonical: CANONICAL_STATES.ODISHA,
        display: 'Odisha',
        aliases: ['odisha', 'orissa', 'ओडिशा', 'ઓડિશા']
    },
    {
        canonical: CANONICAL_STATES.ASSAM,
        display: 'Assam',
        aliases: ['assam', 'असम', 'આસામ']
    },
    {
        canonical: CANONICAL_STATES.CHHATTISGARH,
        display: 'Chhattisgarh',
        aliases: ['chhattisgarh', 'छत्तीसगढ़', 'છત્તીસગઢ']
    },
    {
        canonical: CANONICAL_STATES.JHARKHAND,
        display: 'Jharkhand',
        aliases: ['jharkhand', 'झारखंड', 'ઝારખંડ']
    },
    {
        canonical: CANONICAL_STATES.HIMACHAL_PRADESH,
        display: 'Himachal Pradesh',
        aliases: ['himachal pradesh', 'himachal', 'हिमाचल प्रदेश', 'હિમાચલ પ્રદેશ']
    },
    {
        canonical: CANONICAL_STATES.UTTARAKHAND,
        display: 'Uttarakhand',
        aliases: ['uttarakhand', 'उत्तराखंड', 'ઉત્તરાખંડ']
    },
    {
        canonical: CANONICAL_STATES.GOA,
        display: 'Goa',
        aliases: ['goa', 'गोवा', 'ગોવા']
    },
    {
        canonical: CANONICAL_STATES.JAMMU_KASHMIR,
        display: 'Jammu and Kashmir',
        aliases: ['jammu and kashmir', 'jammu & kashmir', 'j&k', 'जम्मू और कश्मीर', 'જમ્મુ અને કાશ્મીર']
    },
    {
        canonical: CANONICAL_STATES.LADAKH,
        display: 'Ladakh',
        aliases: ['ladakh', 'लद्दाख', 'લદ્દાખ']
    },
    {
        canonical: CANONICAL_STATES.ARUNACHAL_PRADESH,
        display: 'Arunachal Pradesh',
        // IMPORTANT: NEVER include 'ar' alone as it matches inside "are", "scholarship", "farmer"!
        aliases: ['arunachal pradesh', 'arunachal', 'अरुणाचल प्रदेश', 'અરુણાચલ પ્રદેશ']
    },
    {
        canonical: CANONICAL_STATES.TRIPURA,
        display: 'Tripura',
        aliases: ['tripura', 'त्रिपुरा', 'ત્રિપુરા']
    },
    {
        canonical: CANONICAL_STATES.MEGHALAYA,
        display: 'Meghalaya',
        aliases: ['meghalaya', 'मेघालय', 'મેઘાલય']
    },
    {
        canonical: CANONICAL_STATES.MANIPUR,
        display: 'Manipur',
        aliases: ['manipur', 'मणिपुर', 'મણિપુર']
    },
    {
        canonical: CANONICAL_STATES.NAGALAND,
        display: 'Nagaland',
        aliases: ['nagaland', 'नागालैंड', 'નાગાલેન્ડ']
    },
    {
        canonical: CANONICAL_STATES.MIZORAM,
        display: 'Mizoram',
        aliases: ['mizoram', 'मिजोरम', 'મિઝોરમ']
    },
    {
        canonical: CANONICAL_STATES.SIKKIM,
        display: 'Sikkim',
        aliases: ['sikkim', 'सिक्किम', 'સિક્કિમ']
    },
    {
        canonical: CANONICAL_STATES.PUDUCHERRY,
        display: 'Puducherry',
        aliases: ['puducherry', 'pondicherry', 'पुडुचेरी', 'પુડુચેરી']
    },
    {
        canonical: CANONICAL_STATES.CHANDIGARH,
        display: 'Chandigarh',
        aliases: ['chandigarh', 'चंडीगढ़', 'ચંદીગઢ']
    },
    {
        canonical: CANONICAL_STATES.ANDAMAN_NICOBAR,
        display: 'Andaman and Nicobar Islands',
        aliases: ['andaman and nicobar', 'andaman', 'अंडमान और निकोबार', 'અંડમાન અને નિકોબાર']
    },
    {
        canonical: CANONICAL_STATES.DADRA_NAGAR_HAVELI,
        display: 'Dadra and Nagar Haveli and Daman and Diu',
        aliases: ['dadra and nagar haveli', 'daman and diu', 'daman', 'diu']
    },
    {
        canonical: CANONICAL_STATES.LAKSHADWEEP,
        display: 'Lakshadweep',
        aliases: ['lakshadweep', 'लक्षद्वीप', 'લક્ષદ્વીપ']
    }
];

/**
 * Safely test if text contains an alias using word boundary regex
 */
function containsAlias(text, alias) {
    if (!text || !alias) return false;
    const lowerText = text.toLowerCase();
    const lowerAlias = alias.toLowerCase();

    // For non-ASCII scripts (Devanagari, Gujarati), boundary checks must handle punctuation / whitespace
    if (/[\u0900-\u097F\u0A80-\u0AFF]/.test(lowerAlias)) {
        return lowerText.includes(lowerAlias);
    }

    // For Latin words, enforce strict word boundary so 'ar' does not match in 'are'
    const escaped = lowerAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'i');
    return regex.test(lowerText);
}

/**
 * Normalize any input category string into canonical form
 * @param {string} rawCategory
 * @returns {string|null} - Canonical category or null
 */
function normalizeCategory(rawCategory) {
    if (!rawCategory) return null;
    const clean = rawCategory.trim().toLowerCase();

    for (const item of CATEGORY_MAP) {
        for (const alias of item.aliases) {
            if (clean === alias || containsAlias(clean, alias)) {
                return item.canonical;
            }
        }
    }

    // Direct canonical key match check
    const upper = clean.toUpperCase().replace(/[^A-Z_]/g, '_');
    if (CANONICAL_CATEGORIES[upper]) {
        return upper;
    }

    return null;
}

/**
 * Normalize any occupation input into canonical occupation
 * @param {string} rawOccupation
 * @returns {string|null} - Canonical occupation or null
 */
function normalizeOccupation(rawOccupation) {
    if (!rawOccupation) return null;
    const clean = rawOccupation.trim().toLowerCase();

    for (const item of OCCUPATION_MAP) {
        for (const alias of item.aliases) {
            if (clean === alias || containsAlias(clean, alias)) {
                return item.canonical;
            }
        }
    }

    const upper = clean.toUpperCase().replace(/[^A-Z_]/g, '_');
    if (CANONICAL_OCCUPATIONS[upper]) {
        return upper;
    }

    return null;
}

/**
 * Normalize any state input into canonical state object
 * @param {string} rawState
 * @returns {{ canonical: string, display: string }|null}
 */
function normalizeState(rawState) {
    if (!rawState) return null;
    const clean = rawState.trim().toLowerCase();

    for (const item of STATE_MAP) {
        for (const alias of item.aliases) {
            if (clean === alias || containsAlias(clean, alias)) {
                return { canonical: item.canonical, display: item.display };
            }
        }
    }

    const upper = clean.toUpperCase().replace(/[^A-Z_]/g, '_');
    if (CANONICAL_STATES[upper]) {
        const found = STATE_MAP.find(s => s.canonical === upper);
        return { canonical: upper, display: found ? found.display : rawState };
    }

    return null;
}

/**
 * Extract canonical filters from arbitrary user query text safely
 * @param {string} text - User query
 * @returns {Object} - Extracted canonical filters { category, occupation, state, gender }
 */
function extractCanonicalFilters(text) {
    if (!text) return {};

    const filters = {};

    // 1. Extract State safely (word boundary protected)
    for (const item of STATE_MAP) {
        // Skip All India in free-text search unless explicitly mentioned
        if (item.canonical === CANONICAL_STATES.ALL_INDIA) {
            if (containsAlias(text, 'all india') || containsAlias(text, 'pan india')) {
                filters.state = item.display;
                filters.canonicalState = item.canonical;
                break;
            }
            continue;
        }

        let matched = false;
        for (const alias of item.aliases) {
            if (containsAlias(text, alias)) {
                filters.state = item.display;
                filters.canonicalState = item.canonical;
                matched = true;
                break;
            }
        }
        if (matched) break;
    }

    // 2. Extract Category
    for (const item of CATEGORY_MAP) {
        let matched = false;
        for (const alias of item.aliases) {
            if (containsAlias(text, alias)) {
                filters.canonicalCategory = item.canonical;
                // Human readable category name from taxonomy
                filters.category = item.canonical;
                matched = true;
                break;
            }
        }
        if (matched) break;
    }

    // 3. Extract Occupation
    for (const item of OCCUPATION_MAP) {
        let matched = false;
        for (const alias of item.aliases) {
            if (containsAlias(text, alias)) {
                filters.canonicalOccupation = item.canonical;
                filters.occupation = item.canonical.toLowerCase();
                matched = true;
                break;
            }
        }
        if (matched) break;
    }

    // 4. Extract Gender
    if (/\b(female|women|woman|girl|girls|lady|ladies|daughter|wife|widow)\b/i.test(text) ||
        /महिला|स्त्री|लड़की|बेटी|દીકરી|મહિલા|સ્ત્રી/i.test(text)) {
        filters.gender = 'female';
    } else if (/\b(male|man|boy|boys|son)\b/i.test(text) || /पुरुष|लड़का|બાળક|પુરુષ/i.test(text)) {
        filters.gender = 'male';
    }

    // If occupation is FARMER, ensure category aligns to AGRICULTURE if not specified
    if (filters.canonicalOccupation === CANONICAL_OCCUPATIONS.FARMER && !filters.canonicalCategory) {
        filters.canonicalCategory = CANONICAL_CATEGORIES.AGRICULTURE;
        filters.category = CANONICAL_CATEGORIES.AGRICULTURE;
    }

    // If occupation is STUDENT, ensure category aligns to EDUCATION if not specified
    if (filters.canonicalOccupation === CANONICAL_OCCUPATIONS.STUDENT && !filters.canonicalCategory) {
        filters.canonicalCategory = CANONICAL_CATEGORIES.EDUCATION;
        filters.category = CANONICAL_CATEGORIES.EDUCATION;
    }

    return filters;
}

module.exports = {
    CANONICAL_CATEGORIES,
    CANONICAL_OCCUPATIONS,
    CANONICAL_STATES,
    normalizeCategory,
    normalizeOccupation,
    normalizeState,
    extractCanonicalFilters,
    containsAlias
};
