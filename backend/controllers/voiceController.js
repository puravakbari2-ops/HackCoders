/* ============================================================
   JanSahay AI - Multilingual Voice Assistant Controller
   Supports English, Hindi, and Gujarati (including Hinglish and Gujlish)
   Integrates directly with verified JanSahay schemes database
   Features:
   - Unified RAG Pipeline (primary) + Rule-based Intelligence (fallback)
   - Intelligent Category-Aware Matching & Topic Switching
   - Dynamic Multi-Turn Conversational Questionnaire
   - Comprehensive Indian Cities, States & UTs Entity Extractor
   - Flexible Numeric & Colloquial Income Parsing
   - Contextual Scheme Follow-Up Memory (Application, Documents, Eligibility)
   - Anti-Repetition Phrasing Engine
   ============================================================ */

const path = require('path');
const schemes = require(path.join(__dirname, '..', 'data', 'schemes.json'));

// ── Lazy-load the unified RAG pipeline ───────────────────────
// Loaded once on first request; any failure falls through to
// the rule-based engine below.
let _ragPipeline = null;
function getRagPipeline() {
    if (!_ragPipeline) {
        try {
            _ragPipeline = require('../services/rag/pipeline');
        } catch (e) {
            console.warn('[VoiceController] RAG pipeline not available:', e.message);
        }
    }
    return _ragPipeline;
}


// In-memory conversation session store (with automatic cleanup)
const sessions = new Map();
const SESSION_TTL_MS = 45 * 60 * 1000; // 45 minutes

function getOrCreateSession(sessionId) {
    const id = sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const now = Date.now();

    // Clean stale sessions
    for (const [key, val] of sessions.entries()) {
        if (now - val.lastActive > SESSION_TTL_MS) {
            sessions.delete(key);
        }
    }

    if (!sessions.has(id)) {
        sessions.set(id, {
            id,
            lastActive: now,
            profile: {
                occupation: null,
                category_need: null,
                state: null,
                income: null,
                age: null,
                gender: null,
                category: null
            },
            history: [],
            pendingQuestion: null, // 'occupation' | 'state' | 'income' | null
            questionAttempts: {},
            lastSchemes: [],
            activeScheme: null,
            schemePage: 0
        });
    }

    const session = sessions.get(id);
    session.lastActive = now;
    if (!session.questionAttempts) session.questionAttempts = {};
    if (!session.history) session.history = [];
    return session;
}

// ── Language Detection Helper ─────────────────────────────────
function detectLanguage(text, preferredLang) {
    const trimmed = (text || '').trim();
    if (!trimmed) {
        return (preferredLang && preferredLang !== 'auto' && ['en', 'hi', 'gu'].includes(preferredLang.toLowerCase()))
            ? preferredLang.toLowerCase()
            : 'en';
    }

    // 1. Script checks — ALWAYS detect from native script regardless of preferredLang!
    // Gujarati Unicode range: \u0A80-\u0AFF
    if (/[\u0A80-\u0AFF]/.test(trimmed)) {
        return 'gu';
    }
    // Devanagari (Hindi) Unicode range: \u0900-\u097F
    if (/[\u0900-\u097F]/.test(trimmed)) {
        return 'hi';
    }

    // 2. If user explicitly selected a manual language (not 'auto') and no conflicting native script is present
    if (preferredLang && preferredLang !== 'auto' && ['en', 'hi', 'gu'].includes(preferredLang.toLowerCase())) {
        return preferredLang.toLowerCase();
    }

    // 3. Romanized grammatical word checks
    const lower = trimmed.toLowerCase();

    const gujGrammar = [
        'mane', 'joiye', 'chhe', 'chho', 'mate', 'shu', 'su', 'nathi',
        'aapo', 'kem', 'tamne', 'tamaro', 'tamari', 'maru', 'mari', 'amara',
        'apdo', 'karo', 'karvu', 'khabar', 'arji', 'shikshan', 'dikri', 'kheduto',
        'khedut mate', 'vishe', 'mahiti', 'aavo', 'joyiye', 'malse', 'chhu',
        'aavak', 'varshik', 'lakh', 'thi', 'ochhi', 'vadhu', 'gam', 'rahu',
        'aabhar', 'dhanyawad', 'dastavej', 'kagad', 'patrata', 'biji', 'bijoo',
        'khedut', 'kheduto'
    ];
    const gujMatches = gujGrammar.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(lower)).length;

    const hindiGrammar = [
        'mujhe', 'chahiye', 'bataiye', 'batao', 'kaise', 'kya', 'kyun', 'kisko',
        'hai', 'hain', 'meri', 'mera', 'mere', 'hum', 'hume', 'humko', 'aap',
        'apki', 'apka', 'apko', 'kripya', 'aavedan', 'karna', 'kare', 'karein',
        'karta', 'hoga', 'hogi', 'padhai', 'swasthya', 'beemari', 'madad',
        'chhatravritti', 'bare me', 'ke liye', 'sarkari', 'namaste', 'kaun',
        'main', 'mai', 'hoon', 'hu', 'se', 'tha', 'thi', 'aaye', 'rahta', 'rehta',
        'dastavez', 'patrata', 'aur', 'dusri', 'agla', 'kisan', 'kisano', 'yojana', 'yojna'
    ];
    const hindiMatches = hindiGrammar.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(lower)).length;

    const englishWords = [
        'tell', 'what', 'which', 'where', 'how', 'who', 'about', 'need', 'want',
        'help', 'guide', 'give', 'show', 'find', 'eligible', 'eligibility',
        'scheme', 'schemes', 'documents', 'apply', 'information', 'details',
        'farmer', 'student', 'scholarship', 'citizen', 'government', 'benefits',
        'next', 'more', 'another', 'thanks', 'thank', 'education'
    ];
    const englishMatches = englishWords.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(lower)).length;

    if (gujMatches > 0 && gujMatches >= hindiMatches && gujMatches >= englishMatches) {
        return 'gu';
    }
    if (hindiMatches > 0 && hindiMatches >= englishMatches) {
        return 'hi';
    }
    if (gujMatches > 0) {
        return 'gu';
    }

    return 'en';
}

// ── Security Check: Reject OTP / PIN / Passwords ──────────────
function checkSecuritySensitive(text) {
    const lower = (text || '').toLowerCase();
    const sensitiveTokens = [
        'otp', 'one time password', 'pin', 'atm pin', 'upi pin', 'password',
        'aadhaar otp', 'cvv', 'card number', 'netbanking password'
    ];
    return sensitiveTokens.some(token => new RegExp(`\\b${token}\\b`, 'i').test(lower));
}

// ── Indian States, UTs and City Mapping Dictionary ────────────
const CITY_TO_STATE = {
    // Gujarat
    'ahmedabad': 'Gujarat', 'amdavad': 'Gujarat', 'surat': 'Gujarat', 'vadodara': 'Gujarat',
    'baroda': 'Gujarat', 'rajkot': 'Gujarat', 'bhavnagar': 'Gujarat', 'jamnagar': 'Gujarat',
    'junagadh': 'Gujarat', 'gandhinagar': 'Gujarat', 'anand': 'Gujarat', 'navsari': 'Gujarat',
    'morbi': 'Gujarat', 'nadiad': 'Gujarat', 'surendranagar': 'Gujarat', 'bharuch': 'Gujarat',
    'mehsana': 'Gujarat', 'bhuj': 'Gujarat', 'porbandar': 'Gujarat', 'valsad': 'Gujarat',
    'vapi': 'Gujarat', 'gondal': 'Gujarat', 'godhra': 'Gujarat', 'palanpur': 'Gujarat',
    'botad': 'Gujarat', 'amreli': 'Gujarat', 'patan': 'Gujarat',
    // Maharashtra
    'mumbai': 'Maharashtra', 'bombay': 'Maharashtra', 'pune': 'Maharashtra', 'nagpur': 'Maharashtra',
    'nashik': 'Maharashtra', 'nasik': 'Maharashtra', 'thane': 'Maharashtra', 'aurangabad': 'Maharashtra',
    'chhatrapati sambhajinagar': 'Maharashtra', 'solapur': 'Maharashtra', 'kolhapur': 'Maharashtra',
    'navi mumbai': 'Maharashtra', 'amravati': 'Maharashtra', 'jalgaon': 'Maharashtra',
    // Rajasthan
    'jaipur': 'Rajasthan', 'jodhpur': 'Rajasthan', 'kota': 'Rajasthan', 'bikaner': 'Rajasthan',
    'ajmer': 'Rajasthan', 'udaipur': 'Rajasthan', 'bhilwara': 'Rajasthan', 'alwar': 'Rajasthan',
    // Uttar Pradesh
    'lucknow': 'Uttar Pradesh', 'kanpur': 'Uttar Pradesh', 'varanasi': 'Uttar Pradesh', 'banaras': 'Uttar Pradesh',
    'kashi': 'Uttar Pradesh', 'agra': 'Uttar Pradesh', 'noida': 'Uttar Pradesh', 'greater noida': 'Uttar Pradesh',
    'ghaziabad': 'Uttar Pradesh', 'prayagraj': 'Uttar Pradesh', 'allahabad': 'Uttar Pradesh',
    'meerut': 'Uttar Pradesh', 'bareilly': 'Uttar Pradesh', 'aligarh': 'Uttar Pradesh',
    'moradabad': 'Uttar Pradesh', 'gorakhpur': 'Uttar Pradesh', 'mathura': 'Uttar Pradesh',
    // Delhi NCR
    'delhi': 'Delhi', 'new delhi': 'Delhi',
    // Madhya Pradesh
    'bhopal': 'Madhya Pradesh', 'indore': 'Madhya Pradesh', 'gwalior': 'Madhya Pradesh',
    'jabalpur': 'Madhya Pradesh', 'ujjain': 'Madhya Pradesh', 'sagar': 'Madhya Pradesh',
    // Bihar
    'patna': 'Bihar', 'gaya': 'Bihar', 'bhagalpur': 'Bihar', 'muzaffarpur': 'Bihar', 'darbhanga': 'Bihar',
    // Karnataka
    'bengaluru': 'Karnataka', 'bangalore': 'Karnataka', 'mysuru': 'Karnataka', 'mysore': 'Karnataka',
    'mangaluru': 'Karnataka', 'mangalore': 'Karnataka', 'hubli': 'Karnataka', 'belagavi': 'Karnataka',
    // Tamil Nadu
    'chennai': 'Tamil Nadu', 'madras': 'Tamil Nadu', 'coimbatore': 'Tamil Nadu', 'madurai': 'Tamil Nadu',
    'tiruchirappalli': 'Tamil Nadu', 'trichy': 'Tamil Nadu', 'salem': 'Tamil Nadu',
    // Telangana
    'hyderabad': 'Telangana', 'warangal': 'Telangana', 'secunderabad': 'Telangana',
    // Andhra Pradesh
    'visakhapatnam': 'Andhra Pradesh', 'vizag': 'Andhra Pradesh', 'vijayawada': 'Andhra Pradesh',
    'guntur': 'Andhra Pradesh', 'tirupati': 'Andhra Pradesh',
    // West Bengal
    'kolkata': 'West Bengal', 'calcutta': 'West Bengal', 'howrah': 'West Bengal', 'durgapur': 'West Bengal',
    'siliguri': 'West Bengal', 'asansol': 'West Bengal',
    // Kerala
    'thiruvananthapuram': 'Kerala', 'trivandrum': 'Kerala', 'kochi': 'Kerala', 'cochin': 'Kerala',
    'kozhikode': 'Kerala', 'calicut': 'Kerala', 'thrissur': 'Kerala',
    // Punjab & Haryana
    'amritsar': 'Punjab', 'ludhiana': 'Punjab', 'jalandhar': 'Punjab', 'patiala': 'Punjab',
    'chandigarh': 'Punjab', 'gurgaon': 'Haryana', 'gurugram': 'Haryana', 'faridabad': 'Haryana',
    'panipat': 'Haryana', 'ambala': 'Haryana', 'rohtak': 'Haryana', 'hisar': 'Haryana'
};

const ALL_INDIAN_STATES = [
    'Gujarat', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh',
    'Bihar', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Punjab', 'Haryana',
    'West Bengal', 'Odisha', 'Telangana', 'Andhra Pradesh', 'Assam', 'Jharkhand',
    'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh', 'Goa', 'Tripura',
    'Manipur', 'Meghalaya', 'Nagaland', 'Mizoram', 'Sikkim', 'Arunachal Pradesh',
    'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh'
];

// ── CATEGORY TAXONOMY DEFINITIONS ─────────────────────────────
// Maps categories, occupation roles, and search tags for strict accuracy
const CATEGORY_TAXONOMY = {
    education: {
        key: 'education',
        keys: ['education', 'learning', 'scholarship', 'student', 'study', 'fellowship', 'coaching', 'tuition'],
        pattern: /\b(education|educational|student|students|study|studying|scholarship|scholarships|school|college|vidhyarthi|chhatra|chhatravritti|shikshan|padhai|tuition|bhanvavu|bhan|degree|diploma|university|mysy)\b/i,
        nativePattern: /વિદ્યાર્થી|શિક્ષણ|શિષ્યવૃત્તિ|ભણતર|ભણવું|કૉલેજ|શાળા|छात्र|शिक्षा|छात्रवृत्ति|पढ़ाई|स्कूल|कॉलेज/,
        categoryName: 'Education & Learning',
        label: { en: 'Education & Scholarship Schemes', hi: 'शिक्षा और छात्रवृत्ति योजनाएं', gu: 'શિક્ષણ અને શિષ્યવૃત્તિ યોજનાઓ' },
        defaultOccupation: 'student'
    },
    agriculture: {
        key: 'agriculture',
        keys: ['agriculture', 'farmer', 'crop', 'farming', 'kisan', 'khedut', 'seeds', 'fertilizer'],
        pattern: /\b(farmer|farmers|farming|kisan|kisano|khedut|kheduto|kheti|agriculture|crop|crops|fasal|tractor|krishi|pashupalan|dairy|biyaran|fertilizer|pmkisan|pm-kisan|kcc|soil)\b/i,
        nativePattern: /ખેડૂત|ખેતી|કિસાન|કૃષિ|પાક|બિયારણ|ખાતર|પશુપાલન|किसान|खेती|कृषि|फसल|खाद/,
        categoryName: 'Agriculture, Rural & Environment',
        label: { en: 'Agriculture & Farmer Schemes', hi: 'कृषि और किसान योजनाएं', gu: 'ખેતી અને ખેડૂત યોજનાઓ' },
        defaultOccupation: 'farmer'
    },
    health: {
        key: 'health',
        keys: ['health', 'wellness', 'medical', 'hospital', 'ayushman', 'pmjay', 'treatment'],
        pattern: /\b(health|healthcare|medical|hospital|ayushman|pmjay|treatment|illness|disease|swasthya|arogya|dawa|dawai|sarvar|bimar|bimari|doctor|mediclaim|card|operation|clinic)\b/i,
        nativePattern: /આરોગ્ય|સ્વાસ્થ્ય|હૉસ્પિટલ|દવા|સારવાર|બીમારી|અસ્પતાલ|स्वास्थ्य|इलाज|दवाई|बीमारी|आयुष्मान/,
        categoryName: 'Health & Wellness',
        label: { en: 'Healthcare & Medical Schemes', hi: 'स्वास्थ्य एवं चिकित्सा योजनाएं', gu: 'આરોગ્ય અને તબીબી સેવાઓ' },
        defaultOccupation: null
    },
    housing: {
        key: 'housing',
        keys: ['housing', 'shelter', 'awas', 'house', 'home', 'pmay', 'makan'],
        pattern: /\b(housing|house|home|awas|pmay|makaan|makan|flat|pucca house|ghar|shelter|slum)\b/i,
        nativePattern: /આવાસ|મકાન|ઘર|ઝૂંપડા|आवास|मकान|घर|पक्का मकान/,
        categoryName: 'Housing & Shelter',
        label: { en: 'Housing & Shelter Schemes', hi: 'आवास एवं मकान योजनाएं', gu: 'આવાસ અને મકાન યોજનાઓ' },
        defaultOccupation: null
    },
    business: {
        key: 'business',
        keys: ['business', 'entrepreneurship', 'loan', 'msme', 'mudra', 'startup'],
        pattern: /\b(business|businessman|loan|loans|mudra|startup|vyapar|dukan|dukaan|shop|entrepreneur|self employed|msme|enterprise|commercial|dukaandar)\b/i,
        nativePattern: /વ્યવસાય|ધંધો|વેપાર|દુકાન|લોન|ઉદ્યોગ|ઋણ|व्यापार|दुकान|लोन|उद्यम/,
        categoryName: 'Business & Entrepreneurship',
        label: { en: 'Business & MSME Loan Schemes', hi: 'व्यवसाय एवं मुद्रा लोन योजनाएं', gu: 'વ્યવસાય અને મુદ્રા લોન યોજનાઓ' },
        defaultOccupation: 'self-employed'
    },
    women: {
        key: 'women',
        keys: ['women', 'child', 'female', 'mahila', 'girl', 'sukanya', 'maternity'],
        pattern: /\b(women|woman|female|mahila|beti|girl|ladki|dikri|sukanya|ujjwala|widow|vidhva|mata|bahu|stree|stri|maternity)\b/i,
        nativePattern: /મહિલા|સ્ત્રી|દીકરી|વિધવા|માતા|બહેન|महिला|औरत|बेटी|लड़की|विधवा/,
        categoryName: 'Women & Child',
        label: { en: 'Women & Child Welfare Schemes', hi: 'महिला एवं बाल कल्याण योजनाएं', gu: 'મહિલા અને બાળ કલ્યાણ યોજનાઓ' },
        defaultOccupation: 'homemaker',
        gender: 'female'
    },
    artisan: {
        key: 'artisan',
        keys: ['artisan', 'craftsman', 'karigar', 'vishwakarma', 'tailor', 'carpenter'],
        pattern: /\b(artisan|craftsman|karigar|vishwakarma|carpenter|tailor|blacksmith|potter|cobbler|barber|suthar|luhar|darji)\b/i,
        nativePattern: /કારીગર|વિશ્વકર્મા|સુથાર|લુહાર|દરજી|કુંભાર|कारीगर|विश्वकर्मा|बढ़ई|दर्जी/,
        categoryName: 'Skills & Employment',
        label: { en: 'PM Vishwakarma Artisan Schemes', hi: 'कारीगर एवं शिल्पकार योजनाएं', gu: 'કારીગરો અને વિશ્વકર્મા યોજના' },
        defaultOccupation: 'artisan'
    },
    pension: {
        key: 'pension',
        keys: ['pension', 'social welfare', 'senior citizen', 'old age', 'apy'],
        pattern: /\b(pension|senior citizen|old age|retired|retirement|vruddh|atal pension|apy|vridha|vridhashram|60 years)\b/i,
        nativePattern: /પેન્શન|વૃદ્ધ|નિવૃત્ત|વૃદ્ધાવસ્થા|पेंशन|वृद्ध|बुजुर्ग|सेवानिवृत्त/,
        categoryName: 'Social Welfare & Empowerment',
        label: { en: 'Social Security & Pension Schemes', hi: 'पेंशन एवं सामाजिक सुरक्षा', gu: 'પેન્શન અને સામાજિક સુરક્ષા' },
        defaultOccupation: 'retired'
    },
    employment: {
        key: 'employment',
        keys: ['employment', 'skill', 'training', 'jobs', 'pmkvy', 'rozgar'],
        pattern: /\b(job|jobs|employment|skill|training|pmkvy|rozgar|naukri|nokri|berozgar|jobless|unemployed|placement)\b/i,
        nativePattern: /રોજગાર|નોકરી|તાલીમ|બેરોજગાર|કૌશલ્ય|रोजगार|नौकरी|प्रशिक्षण|बेरोजगार/,
        categoryName: 'Skills & Employment',
        label: { en: 'Skill Training & Employment Schemes', hi: 'कौशल विकास एवं रोजगार योजनाएं', gu: 'કૌશલ્ય તાલીમ અને રોજગાર યોજનાઓ' },
        defaultOccupation: 'unemployed'
    },
    solar: {
        key: 'solar',
        keys: ['solar', 'utility', 'energy', 'electricity', 'surya'],
        pattern: /\b(solar|rooftop|surya|surya ghar|bijli|electricity|power|solar panel)\b/i,
        nativePattern: /સૌર|સોલાર|વીજળી|સૂર્ય ઘર|सोलर|सौर ऊर्जा|बिजली|सूर्य घर/,
        categoryName: 'Utility & Sanitation',
        label: { en: 'Rooftop Solar & Free Electricity Schemes', hi: 'पीएम सूर्य घर मुफ्त बिजली योजना', gu: 'પીએમ સૂર્ય ઘર સોલાર યોજના' },
        defaultOccupation: null
    }
};

// Detect category mentioned in a specific user utterance
function detectCategoryInText(text) {
    if (!text) return null;
    const lower = text.toLowerCase();
    for (const [key, cat] of Object.entries(CATEGORY_TAXONOMY)) {
        if (cat.pattern.test(lower) || (cat.nativePattern && cat.nativePattern.test(text))) {
            return cat;
        }
    }
    return null;
}

// ── Extract Profile Information from User Utterance ───────────
function extractProfileDetails(text, currentProfile) {
    // Normalize Gujarati (૦-૯) and Devanagari (०-९) digits to standard ASCII (0-9)
    const normalizedText = (text || '')
        .replace(/[\u0AE6-\u0AEF]/g, d => d.charCodeAt(0) - 0x0AE6)
        .replace(/[\u0966-\u096F]/g, d => d.charCodeAt(0) - 0x0966);
    const lower = normalizedText.toLowerCase();
    const updated = { ...currentProfile };

    // Check category/topic mention
    const detectedCat = detectCategoryInText(normalizedText);
    if (detectedCat) {
        updated.category_need = detectedCat.key;
        if (detectedCat.defaultOccupation) {
            updated.occupation = detectedCat.defaultOccupation;
        } else if (['health', 'housing', 'solar'].includes(detectedCat.key)) {
            // General citizens: clear occupation restriction so all eligible schemes are visible
            updated.occupation = null;
        }
        if (detectedCat.gender) {
            updated.gender = detectedCat.gender;
        }
    }

    // Direct occupation override if explicitly mentioned
    if (/\b(farmer|farming|kisan|khedut|kheti)\b/i.test(lower) || /ખેડૂત|ખેતી|કિસાન/.test(text)) {
        updated.occupation = 'farmer';
        updated.category_need = 'agriculture';
    } else if (/\b(student|study|scholarship|vidhyarthi|chhatra|education)\b/i.test(lower) || /વિદ્યાર્થી|શિક્ષણ|શિષ્યવૃત્તિ/.test(text)) {
        updated.occupation = 'student';
        updated.category_need = 'education';
    } else if (/\b(business|businessman|vyapar|dukan|entrepreneur|startup|self employed)\b/i.test(lower) || /વ્યવસાય|ધંધો|દુકાન/.test(text)) {
        updated.occupation = 'self-employed';
        updated.category_need = 'business';
    }

    // Gender
    if (/\b(female|woman|women|girl|mahila|aurat|stri|dikri|bahu|lady)\b/i.test(lower) || /મહિલા|સ્ત્રી|દીકરી|બહેન|महिला|लड़की/.test(text)) {
        updated.gender = 'female';
    } else if (/\b(male|man|boy|purush|ladka|admi)\b/i.test(lower) || /પુરુષ|છોકરો|पुरुष|लड़का/.test(text)) {
        updated.gender = 'male';
    }

    // State & City Extraction
    if (/\b(all india|central|any state|all states|pura bharat|akho bharat|bharat|india|skip|doesn't matter|koyi bhi)\b/i.test(lower) || /સમગ્ર ભારત|બધા રાજ્ય|કોઈ પણ/.test(text)) {
        updated.state = 'All India';
    } else {
        // Direct state name matches
        for (const st of ALL_INDIAN_STATES) {
            const stLower = st.toLowerCase();
            const pattern = new RegExp(`\\b${stLower}\\b`, 'i');
            if (pattern.test(lower)) {
                updated.state = st;
                break;
            }
        }
        // Common variations
        if (!updated.state) {
            if (/\b(gujrat|gujarat|guj)\b/i.test(lower) || /ગુજરાત|ગુજ/.test(text)) updated.state = 'Gujarat';
            else if (/\b(maharastra|maharashtra|maha)\b/i.test(lower) || /મહારાષ્ટ્ર|महाराष्ट्र/.test(text)) updated.state = 'Maharashtra';
            else if (/\b(rajsthan|rajasthan|raj)\b/i.test(lower) || /રાજસ્થાન|राजस्थान/.test(text)) updated.state = 'Rajasthan';
            else if (/\b(up|uttar pradesh)\b/i.test(lower) || /ઉત્તર પ્રદેશ|उत्तर प्रदेश/.test(text)) updated.state = 'Uttar Pradesh';
            else if (/\b(mp|madhya pradesh)\b/i.test(lower) || /મધ્ય પ્રદેશ|मध्य प्रदेश/.test(text)) updated.state = 'Madhya Pradesh';
            else if (/\b(delhi|ncr)\b/i.test(lower) || /દિલ્હી|दिल्ली/.test(text)) updated.state = 'Delhi';
            else if (/\b(bihar)\b/i.test(lower) || /બિહાર|बिहार/.test(text)) updated.state = 'Bihar';
            else if (/\b(bengal|west bengal)\b/i.test(lower) || /પશ્ચિમ બંગાળ|बंगाल/.test(text)) updated.state = 'West Bengal';
            else if (/\b(punjab)\b/i.test(lower) || /પંજાબ|पंजाब/.test(text)) updated.state = 'Punjab';
            else if (/\b(haryana)\b/i.test(lower) || /હરિયાણા|हरियाणा/.test(text)) updated.state = 'Haryana';
            else if (/\b(karnataka)\b/i.test(lower) || /કર્ણાટક|कर्नाटक/.test(text)) updated.state = 'Karnataka';
            else if (/\b(tamil nadu|tamilnadu)\b/i.test(lower) || /તમિલનાડુ|तमिलनाडु/.test(text)) updated.state = 'Tamil Nadu';
            else if (/\b(kerala)\b/i.test(lower) || /કેરળ|કેરળ/.test(text)) updated.state = 'Kerala';
        }
        // City match if state not yet determined
        if (!updated.state) {
            for (const [city, mappedState] of Object.entries(CITY_TO_STATE)) {
                if (new RegExp(`\\b${city}\\b`, 'i').test(lower)) {
                    updated.state = mappedState;
                    break;
                }
            }
        }
        // Gujarati / Hindi city script checks
        if (!updated.state) {
            if (/અમદાવાદ|સુરત|વડોદરા|રાજકોટ|ભાવનગર|જામનગર|જૂનાગઢ|ગાંધીનગર|આણંદ|મહેસાણા|ભુજ/.test(text)) updated.state = 'Gujarat';
            else if (/મુંબઈ|પુણે|નાગપુર|નાશિક|ઠાણે|થાણે/.test(text)) updated.state = 'Maharashtra';
            else if (/જયપુર|જોધપુર|કોટા|ઉદયપુર|બિકાનેર/.test(text)) updated.state = 'Rajasthan';
            else if (/લખનઉ|કાનપુર|વારાણસી|બનારસ|આગરા|નોઈડા|ગોરખપુર/.test(text)) updated.state = 'Uttar Pradesh';
            else if (/પટના|ગયા|ભાગલપુર/.test(text)) updated.state = 'Bihar';
            else if (/દિલ્હી|નવી દિલ્હી/.test(text)) updated.state = 'Delhi';
        }
    }

    // Flexible Income Extraction
    let detectedIncome = null;

    // Check explicit 'under / below / upto 1 lakh'
    if (/(?:under|below|less than|upto|up to|within)\s*(?:1|one)\s*(?:lakhs?|lacs?|lac|l)\b/i.test(lower) ||
        /1\s*લાખથી\s*ઓછી|1\s*લાખ\s*સુધી|1\s*लाख\s*से\s*कम/.test(normalizedText)) {
        detectedIncome = 'below-1l';
    }

    // Parse lakh figures
    if (!detectedIncome) {
        const lakhMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:lakhs?|lacs?|lac|l)\b/i) || normalizedText.match(/(\d+(?:\.\d+)?)\s*(?:લાખ|लाख)/);
        if (lakhMatch) {
            const val = parseFloat(lakhMatch[1]);
            if (val < 1.0) detectedIncome = 'below-1l';
            else if (val <= 2.5) detectedIncome = '1l-2.5l';
            else if (val <= 5.0) detectedIncome = '2.5l-5l';
            else if (val <= 8.0) detectedIncome = '5l-8l';
            else if (val <= 10.0) detectedIncome = '8l-10l';
            else detectedIncome = 'above-10l';
        }
    }

    // Parse thousands / K
    if (!detectedIncome) {
        const kMatch = lower.match(/(\d+)\s*(?:k|thousand|hazar|hajaar)\b/i) || normalizedText.match(/(\d+)\s*(?:હજાર|हजार)/);
        if (kMatch) {
            const val = parseInt(kMatch[1]) * 1000;
            if (val < 100000) detectedIncome = 'below-1l';
            else if (val <= 250000) detectedIncome = '1l-2.5l';
            else if (val <= 500000) detectedIncome = '2.5l-5l';
            else detectedIncome = '5l-8l';
        }
    }

    // Parse raw numeric values
    if (!detectedIncome) {
        const cleanNums = lower.replace(/,/g, '');
        const numMatch = cleanNums.match(/\b(\d{4,7})\b/);
        if (numMatch) {
            const val = parseInt(numMatch[1]);
            const isMonthly = /month|mahina|dar mahine|mahine|pratimaah/i.test(lower) || /મહિને|મહિના|મહિનાનું|महीना/.test(normalizedText);
            const annualVal = isMonthly ? val * 12 : val;

            if (annualVal < 100000) detectedIncome = 'below-1l';
            else if (annualVal <= 250000) detectedIncome = '1l-2.5l';
            else if (annualVal <= 500000) detectedIncome = '2.5l-5l';
            else if (annualVal <= 800000) detectedIncome = '5l-8l';
            else if (annualVal <= 1000000) detectedIncome = '8l-10l';
            else detectedIncome = 'above-10l';
        }
    }

    // Colloquial / Tier checks
    if (!detectedIncome) {
        if (/below\s*1|kam\s*hai|low\s*income|garib|bpl|ration\s*card|no\s*income|zero|nathi|none|poor|very\s*low|ochhi\s*aavak|kam\s*kamai|1\s*lakh\s*thi\s*ochhi|1\s*lakh\s*se\s*kam/i.test(lower) ||
            /ઓછી આવક|ગરીબ|બીપીએલ|ગરીબી|આવક નથી|૧ લાખથી ઓછી|1 लाख से कम|गरीब|बीपीएल/.test(text)) {
            detectedIncome = 'below-1l';
        } else if (/between\s*1|1\s*to\s*2\.5|under\s*2|2\s*lakh|2\.5\s*lakh|૧\s*થી\s*૨|1\s*se\s*2/i.test(lower)) {
            detectedIncome = '1l-2.5l';
        } else if (/middle\s*class|madhyam|2\.5\s*to\s*5|3\s*lakh|4\s*lakh|5\s*lakh|સામાન્ય\s*આવક|મધ્યમ/i.test(lower)) {
            detectedIncome = '2.5l-5l';
        } else if (/5\s*to\s*8|6\s*lakh|7\s*lakh|8\s*lakh/i.test(lower)) {
            detectedIncome = '5l-8l';
        } else if (/above\s*10|10\s*lakh|high\s*income|vadhu\s*aavak/i.test(lower)) {
            detectedIncome = 'above-10l';
        }
    }

    if (detectedIncome) {
        updated.income = detectedIncome;
    }

    // Age
    const ageMatch = lower.match(/\b(\d{2})\s*(years?|saal|varsh|sal|varash)?\s*(old)?\b/);
    if (ageMatch && parseInt(ageMatch[1]) >= 10 && parseInt(ageMatch[1]) <= 95) {
        updated.age = parseInt(ageMatch[1]);
    }

    return updated;
}

// ── Translation of Native Terms for Keyword Matching ──────────
const GUJARATI_TO_EN = [
    { pattern: /ખેડૂત|ખેતી|ખેત|કૃષિ/, english: 'farmer agriculture' },
    { pattern: /વિદ્યાર્થી|ભણ|શ્રૃત્તિ|શિક્ષણ|ભણ/, english: 'student scholarship education' },
    { pattern: /સ્કોલ|શિષ્યવૃત્તિ/, english: 'scholarship' },
    { pattern: /આવાસ|ઘર|મકાન/, english: 'housing house awas' },
    { pattern: /આરોગ્ય|સ્વાસ્થ્ય|હૉસ્પિટલ/, english: 'health medical hospital' },
    { pattern: /વ્યવસાય|ધંધો|ઉદ્યોગ|દુકાન/, english: 'business loan mudra' },
    { pattern: /લોન|ઋણ/, english: 'loan' },
    { pattern: /મહિલા|સ્ત્રી/, english: 'women mahila' },
    { pattern: /પેન્શન|નિવૃત્તિ/, english: 'pension retirement' },
    { pattern: /રોજગાર|નોકરી/, english: 'employment job' },
    { pattern: /કૌશલ્ય|તાલીમ/, english: 'skill training' },
    { pattern: /સૌર|સૌરઊર્જા/, english: 'solar energy' },
    { pattern: /ગ્યાસ|ગ્ઓ|ઈંધણ/, english: 'lpg gas ujjwala' },
    { pattern: /વીમો|વીમા/, english: 'insurance' },
    { pattern: /ખાતર|બિયારણ|ઉત્પાદન/, english: 'agriculture crop farmer' },
    // Hindi script
    { pattern: /किसान|खेती|कृषि/, english: 'farmer agriculture' },
    { pattern: /छात्र|विद्यार्थी|पढ़ाई|छात्रवृत्ति/, english: 'student scholarship education' },
    { pattern: /आवास|घर|मकान/, english: 'housing house awas' },
    { pattern: /स्वास्थ्य|स्वास्थ|अस्पताल/, english: 'health medical hospital' },
    { pattern: /व्यवसाय|धंधा|उद्यम/, english: 'business loan mudra' },
    { pattern: /महिला|औरत|स्त्री/, english: 'women mahila' },
];

function translateGujaratiQuery(text) {
    let translated = text;
    for (const { pattern, english } of GUJARATI_TO_EN) {
        if (pattern.test(text)) {
            translated += ' ' + english;
        }
    }
    return translated;
}

// ── INTELLIGENT ACCURATE SCHEME MATCHING ENGINE ───────────────
// Strictly enforces category boundaries (e.g. Farmer query returns Farmer schemes, Education returns Education schemes)
function matchSchemesWithIntelligence({ query = '', profile = {}, limit = 4, offset = 0 }) {
    const ageNum = parseInt(profile.age) || 28;
    const userState = profile.state ? profile.state.toLowerCase() : null;
    const userIncome = profile.income || null;
    const userGender = profile.gender ? profile.gender.toLowerCase() : null;

    // Detect target category from query or active profile
    const queryCat = detectCategoryInText(query);
    const activeCategoryKey = (queryCat && queryCat.key) || profile.category_need || null;
    const targetCat = activeCategoryKey ? CATEGORY_TAXONOMY[activeCategoryKey] : null;

    // Clean search tokens from user query
    const translatedQuery = translateGujaratiQuery(query).toLowerCase();
    const queryTokens = translatedQuery
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length > 2 && !['and', 'for', 'the', 'with', 'scheme', 'schemes', 'yojana', 'about', 'what', 'give', 'show', 'need', 'tell'].includes(t));

    const scored = schemes.map(scheme => {
        let score = 0;
        const e = scheme.eligibility || {};
        const schemeTitleLower = scheme.title.toLowerCase();
        const schemeCatLower = (scheme.category || '').toLowerCase();
        const schemeTagsStr = (scheme.tags || []).join(' ').toLowerCase();
        const schemeStateLower = (scheme.state || 'all india').toLowerCase();

        // 1. STRICT CATEGORY FILTERING & BOOSTING
        if (targetCat) {
            // Negative exclusion: Soil Health Card is agriculture, not human healthcare
            if (targetCat.key === 'health' && (schemeTitleLower.includes('soil') || schemeCatLower.includes('agriculture'))) {
                return { ...scheme, matchScore: '0%', calculatedScore: -100 };
            }

            const isCategoryMatch =
                schemeCatLower === targetCat.categoryName.toLowerCase() ||
                targetCat.keys.some(k => schemeTagsStr.includes(k) || (k.length > 4 && schemeTitleLower.includes(k)));

            if (!isCategoryMatch) {
                // Completely disqualify schemes from unrelated categories
                return { ...scheme, matchScore: '0%', calculatedScore: -100 };
            }
            // Base score for correct category match
            score += 65;
        } else {
            // General query: evaluate occupation match if available
            if (profile.occupation && e.occupation && e.occupation.includes(profile.occupation.toLowerCase())) {
                score += 35;
            }
        }

        // 2. STATE COMPLIANCE & BOOST
        const isAllIndia = !scheme.state || schemeStateLower === 'all india';
        const isUserStateMatch = userState && userState !== 'all india' && schemeStateLower.includes(userState);

        if (isUserStateMatch) {
            score += 35; // State specific schemes for the citizen's state get top priority!
        } else if (isAllIndia) {
            score += 20; // National/Central schemes are open to all
        } else if (userState && userState !== 'all india' && !isUserStateMatch && !isAllIndia) {
            // Scheme belongs specifically to a different state (e.g. Rajasthan scheme for Gujarat citizen)
            return { ...scheme, matchScore: '0%', calculatedScore: -100 };
        }

        // 3. KEYWORD RELEVANCE BOOST
        for (const token of queryTokens) {
            if (schemeTitleLower.includes(token)) score += 25;
            else if (schemeTagsStr.includes(token)) score += 15;
            else if (schemeCatLower.includes(token)) score += 10;
        }

        // 4. INCOME ELIGIBILITY
        if (userIncome && e.income) {
            if (e.income.includes(userIncome)) score += 15;
        }

        // 5. GENDER ELIGIBILITY
        if (userGender && e.gender) {
            if (e.gender.includes(userGender)) score += 10;
        }

        // 6. AGE ELIGIBILITY
        if (e.minAge !== undefined && e.maxAge !== undefined) {
            if (ageNum >= e.minAge && ageNum <= e.maxAge) score += 10;
        }

        // Clamp match score percentage (realistic 75% - 98%)
        const matchPercent = Math.min(Math.max(Math.round((score / 140) * 100), 75), 98);
        return {
            ...scheme,
            matchScore: matchPercent + '%',
            calculatedScore: score
        };
    });

    const validSchemes = scored
        .filter(s => s.calculatedScore > 0)
        .sort((a, b) => b.calculatedScore - a.calculatedScore);

    return validSchemes.slice(offset, offset + limit);
}

// ── Clean Spoken Text for Browser Speech Synthesis ────────────
function createSpokenText(markdownText) {
    if (!markdownText) return '';
    return markdownText
        .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
        .replace(/\*(.*?)\*/g, '$1')     // Italic
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Link text only
        .replace(/#{1,6}\s+/g, '')       // Headings
        .replace(/`{1,3}.*?`{1,3}/g, '') // Code
        .replace(/[•●▪-]\s+/g, '')       // Bullets
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Emojis
        .replace(/\n+/g, '. ')          // Linebreaks to period
        .replace(/\s{2,}/g, ' ')         // Collapse whitespace
        .trim();
}

// ── Build Structured Scheme Explanation ───────────────────────
function formatSchemeExplanation(scheme, lang = 'en') {
    const docs = Array.isArray(scheme.documents) ? scheme.documents.join(', ') : 'Aadhaar Card, Bank Passbook, Passport Photo';
    const applyUrl = scheme.applyLink || 'https://www.myscheme.gov.in/';

    if (lang === 'gu') {
        return {
            reply: `🏛️ **${scheme.title}**\n\n` +
                `📋 **યોજના શ્રેણી:** ${scheme.category || 'સરકારી કલ્યાણકારી યોજના'}\n\n` +
                `🎁 **મુખ્ય લાભો:** ${scheme.benefits}\n\n` +
                `✅ **કોણ પાત્ર હોઈ શકે:** આપેલી માહિતી મુજબ, તમે પાત્ર હોઈ શકો છો. ${scheme.eligibility_summary || 'પાત્રતા વિગતો ઉપલબ્ધ છે.'}\n\n` +
                `📄 **જરૂરી દસ્તાવેજો:** ${docs}\n\n` +
                `📝 **અરજી કેવી રીતે કરવી:** તમે સત્તાવાર સરકારી પોર્ટલ પર ઓનલાઇન અરજી કરી શકો છો અથવા નજીકના CSC કેન્દ્રની મુલાકાત લઈ શકો છો.\n\n` +
                `🔗 **સત્તાવાર લિંક:** [સત્તાવાર પોર્ટલ પર મુલાકાત લો](${applyUrl})\n\n` +
                `💡 *તમે પૂછી શકો છો: "જરૂરી દસ્તાવેજો શું છે?" અથવા "અરજી કેવી રીતે કરવી?"*`,
            spokenText: `${scheme.title}. આ યોજના દ્વારા ${scheme.benefits}. આપેલી માહિતી મુજબ, તમે પાત્ર હોઈ શકો છો. જરૂરી દસ્તાવેજોમાં ${docs} શામેલ છે. તમે સત્તાવાર પોર્ટલ પર ઓનલાઇન અરજી કરી શકો છો.`
        };
    }

    if (lang === 'hi') {
        return {
            reply: `🏛️ **${scheme.title}**\n\n` +
                `📋 **योजना श्रेणी:** ${scheme.category || 'सरकारी कल्याणकारी योजना'}\n\n` +
                `🎁 **मुख्य लाभ:** ${scheme.benefits}\n\n` +
                `✅ **कौन पात्र हो सकता है:** दी गई जानकारी के आधार पर, आप पात्र हो सकते हैं। ${scheme.eligibility_summary || 'विस्तृत पात्रता सरकारी नियमों पर निर्भर करती है।'}\n\n` +
                `📄 **आवश्यक दस्तावेज:** ${docs}\n\n` +
                `📝 **आवेदन कैसे करें:** आप आधिकारिक सरकारी पोर्टल पर ऑनलाइन आवेदन कर सकते हैं या नजदीकी सीएससी (CSC) केंद्र पर जा सकते हैं।\n\n` +
                `🔗 **आधिकारिक लिंक:** [आधिकारिक पोर्टल पर जाएं](${applyUrl})\n\n` +
                `💡 *आप पूछ सकते हैं: "आवश्यक दस्तावेज क्या हैं?" या "आवेदन कैसे करें?"*`,
            spokenText: `${scheme.title}. इस योजना के मुख्य लाभ हैं: ${scheme.benefits}. दी गई जानकारी के आधार पर, आप पात्र हो सकते हैं. आवश्यक दस्तावेजों में ${docs} शामिल हैं. आप आधिकारिक पोर्टल पर ऑनलाइन आवेदन कर सकते हैं.`
        };
    }

    return {
        reply: `🏛️ **${scheme.title}**\n\n` +
            `📋 **Scheme Category:** ${scheme.category || 'Government Welfare Scheme'}\n\n` +
            `🎁 **Main Benefits:** ${scheme.benefits}\n\n` +
            `✅ **Who May Be Eligible:** Based on the information you've provided, you may be eligible. ${scheme.eligibility_summary || 'Final eligibility is verified by the government authority.'}\n\n` +
            `📄 **Required Documents:** ${docs}\n\n` +
            `📝 **How to Apply:** You can apply online via the official government portal or visit your nearest Common Service Centre (CSC).\n\n` +
            `🔗 **Official Portal:** [Visit Official Portal](${applyUrl})\n\n` +
            `💡 *Feel free to ask: "What documents are needed?" or "How do I apply?"*`,
        spokenText: `${scheme.title}. Here is how it works: ${scheme.benefits}. Based on the information you've provided, you may be eligible. Required documents include ${docs}. You can apply through the official government portal.`
    };
}

// ── Format Scheme Application Procedure ───────────────────────
function formatSchemeApplication(scheme, lang = 'en') {
    const applyLink = scheme.applyLink || 'https://www.myscheme.gov.in/';
    const docs = Array.isArray(scheme.documents) && scheme.documents.length > 0
        ? scheme.documents.map(d => `- 📄 ${d}`).join('\n')
        : '- 📄 Aadhaar Card\n- 📄 Bank Account Passbook\n- 📄 Income Certificate\n- 📄 Passport Size Photograph';

    if (lang === 'gu') {
        const reply = `📝 **${scheme.title} માટે અરજી કેવી રીતે કરવી (સંપૂર્ણ વિગત):**\n\n` +
            `1. **સત્તાવાર ઓનલાઇન પોર્ટલ:** [અહીં ક્લિક કરીને ઓનલાઇન અરજી કરો](${applyLink})\n` +
            `   - પોર્ટલ પર જાઓ અને 'New Registration' / 'Apply Online' વિકલ્પ પસંદ કરો.\n` +
            `   - આધાર નંબર અને મોબાઈલ નંબર નાખી વેરિફિકેશન પૂર્ણ કરો.\n` +
            `   - ઓનલાઇન ફોર્મમાં જરૂરી વિગતો ભરી દસ્તાવેજો અપલોડ કરો.\n\n` +
            `2. **CSC / જન સેવા કેન્દ્ર (ઓફલાઇન સહાય):**\n` +
            `   - જો ઓનલાઇન અરજીમાં મદદ જોઈએ, તો નજીકના CSC કેન્દ્ર અથવા સંબંધિત વિભાગની કચેરીએ જઈ શકો છો.\n\n` +
            `📄 **અરજી માટે જરૂરી દસ્તાવેજો:**\n${docs}\n\n` +
            (scheme.eligibility_summary ? `✅ **પાત્રતા નોંધ:** ${scheme.eligibility_summary}\n\n` : '') +
            `💡 *તમે પૂછી શકો છો: "જરૂરી દસ્તાવેજો શું છે?" અથવા "પાત્રતા માપદંડ શું છે?".*`;
        const spoken = `${scheme.title} માટે તમે સત્તાવાર સરકારી પોર્ટલ પર ઓનલાઇન અરજી કરી શકો છો અથવા નજીકના જન સેવા કેન્દ્રની મુલાકાત લઈ શકો છો. જરૂરી દસ્તાવેજો સાથે રાખવા વિનંતી.`;
        return { reply, spoken };
    }

    if (lang === 'hi') {
        const reply = `📝 **${scheme.title} के लिए आवेदन की पूरी प्रक्रिया एवं विवरण:**\n\n` +
            `1. **आधिकारिक ऑनलाइन पोर्टल:** [यहाँ क्लिक करके ऑनलाइन आवेदन करें](${applyLink})\n` +
            `   - आधिकारिक पोर्टल पर जाएं और 'New Registration' या 'Apply Online' पर क्लिक करें।\n` +
            `   - आधार नंबर एवं मोबाइल नंबर से सत्यापन पूरा करें।\n` +
            `   - आवेदन पत्र में आवश्यक विवरण दर्ज कर दस्तावेज अपलोड करें।\n\n` +
            `2. **सीएससी / जन सेवा केंद्र (ऑफ़लाइन सहायता):**\n` +
            `   - यदि ऑनलाइन फॉर्म भरने में सहायता चाहिए, तो नजदीकी कॉमन सर्विस सेंटर (CSC) या संबंधित कार्यालय जाएं।\n\n` +
            `📄 **आवेदन हेतु आवश्यक दस्तावेज:**\n${docs}\n\n` +
            (scheme.eligibility_summary ? `✅ **पात्रता संक्षेप:** ${scheme.eligibility_summary}\n\n` : '') +
            `💡 *आप पूछ सकते हैं: "इसके लिए आवश्यक दस्तावेज क्या हैं?" या "पात्रता क्या है?".*`;
        const spoken = `${scheme.title} के लिए आप आधिकारिक पोर्टल पर ऑनलाइन आवेदन कर सकते हैं या सीएससी केंद्र जा सकते हैं. आवश्यक दस्तावेज साथ रखें.`;
        return { reply, spoken };
    }

    const reply = `📝 **Application Process & Details for ${scheme.title}:**\n\n` +
        `1. **Official Online Portal:** [Click Here to Apply Directly](${applyLink})\n` +
        `   - Visit the official government portal and click 'New Registration' or 'Apply Online'.\n` +
        `   - Complete e-KYC authentication using your Aadhaar number and registered mobile number.\n` +
        `   - Fill in your educational/personal details and upload required scanned documents.\n\n` +
        `2. **Offline / CSC Assistance:**\n` +
        `   - You can also apply in person at your nearest Common Service Centre (CSC) or district departmental office.\n\n` +
        `📄 **Required Documents for Application:**\n${docs}\n\n` +
        (scheme.eligibility_summary ? `✅ **Eligibility Summary:** ${scheme.eligibility_summary}\n\n` : '') +
        `💡 *You can also ask: "What are the required documents?" or "Check my eligibility".*`;
    const spoken = `To apply for ${scheme.title}, visit the official government portal online or visit your nearest Common Service Centre. Keep your Aadhaar, bank passbook, and required documents ready.`;
    return { reply, spoken };
}

// ── Format Scheme Required Documents ──────────────────────────
function formatSchemeDocuments(scheme, lang = 'en') {
    const applyLink = scheme.applyLink || 'https://www.myscheme.gov.in/';
    const docsList = Array.isArray(scheme.documents) && scheme.documents.length > 0
        ? scheme.documents.map(d => `- 📄 ${d}`).join('\n')
        : '- 📄 Aadhaar Card\n- 📄 Bank Account Passbook\n- 📄 Income Certificate\n- 📄 Passport Size Photo';

    if (lang === 'gu') {
        return {
            reply: `📄 **${scheme.title} માટે જરૂરી દસ્તાવેજો:**\n\n` +
                `${docsList}\n\n` +
                `🔗 **સત્તાવાર અરજી પોર્ટલ:** [અહીં ક્લિક કરો](${applyLink})\n\n` +
                `શું તમે અરજી કરવાની પદ્ધતિ જાણવા માંગો છો?`,
            spokenText: `${scheme.title} માટે જરૂરી દસ્તાવેજોમાં આધાર કાર્ડ, બેંક પાસબુક, અને આવક પ્રમાણપત્ર શામેલ છે.`
        };
    }
    if (lang === 'hi') {
        return {
            reply: `📄 **${scheme.title} के लिए आवश्यक दस्तावेज:**\n\n` +
                `${docsList}\n\n` +
                `🔗 **आधिकारिक आवेदन पोर्टल:** [यहाँ क्लिक करें](${applyLink})\n\n` +
                `क्या आप आवेदन करने का तरीका जानना चाहते हैं?`,
            spokenText: `${scheme.title} के लिए आवश्यक दस्तावेजों में आधार कार्ड, बैंक पासबुक और आय प्रमाण पत्र शामिल हैं.`
        };
    }
    return {
        reply: `📄 **Required Documents for ${scheme.title}:**\n\n` +
            `${docsList}\n\n` +
            `🔗 **Official Application Portal:** [Click Here](${applyLink})\n\n` +
            `Would you like to know how to apply step-by-step?`,
        spokenText: `Required documents for ${scheme.title} include Aadhaar card, bank account passbook, and income certificate.`
    };
}

// ── Format Scheme Eligibility Criteria ────────────────────────
function formatSchemeEligibility(scheme, lang = 'en') {
    const applyLink = scheme.applyLink || 'https://www.myscheme.gov.in/';
    const eligSummary = scheme.eligibility_summary || scheme.benefits;

    if (lang === 'gu') {
        return {
            reply: `✅ **${scheme.title} માટે પાત્રતા માપદંડ:**\n\n` +
                `આપેલી માહિતી મુજબ, તમે આ યોજના માટે **પાત્ર હોઈ શકો છો**.\n\n` +
                `📋 **પાત્રતા શરતો:**\n` +
                `- ${eligSummary}\n` +
                `- રાજ્ય: **${scheme.state || 'સમગ્ર ભારત'}**\n\n` +
                `🔗 [સત્તાવાર પોર્ટલ પર પાત્રતા ચકાસો](${applyLink})`,
            spokenText: `આપેલી માહિતી મુજબ તમે ${scheme.title} માટે પાત્ર હોઈ શકો છો. ${eligSummary}`
        };
    }
    if (lang === 'hi') {
        return {
            reply: `✅ **${scheme.title} के लिए पात्रता मानदंड:**\n\n` +
                `दी गई जानकारी के अनुसार, आप इसके लिए **पात्र हो सकते हैं**।\n\n` +
                `📋 **पात्रता विवरण:**\n` +
                `- ${eligSummary}\n` +
                `- राज्य: **${scheme.state || 'संपूर्ण भारत'}**\n\n` +
                `🔗 [आधिकारिक पोर्टल पर पात्रता जांचें](${applyLink})`,
            spokenText: `दी गई जानकारी के आधार पर आप ${scheme.title} के लिए पात्र हो सकते हैं. ${eligSummary}`
        };
    }
    return {
        reply: `✅ **Eligibility Criteria for ${scheme.title}:**\n\n` +
            `Based on the information provided, you **may be eligible** for this scheme.\n\n` +
            `📋 **Eligibility Summary:**\n` +
            `- ${eligSummary}\n` +
            `- Applicable State: **${scheme.state || 'All India'}**\n\n` +
            `🔗 [Verify Eligibility on Official Portal](${applyLink})`,
        spokenText: `Based on the details provided, you may be eligible for ${scheme.title}. ${eligSummary}`
    };
}

// ── Resolve Targeted Scheme (Ordinal or Name/Keyword Matching) ─
function resolveTargetScheme(userText, session) {
    if (!userText || !userText.trim()) return null;
    const lower = userText.toLowerCase().trim();
    const candidatePool = (session && session.lastSchemes && session.lastSchemes.length > 0)
        ? session.lastSchemes
        : [];

    // 1. Ordinal / Number Reference check (e.g. 'scheme 2', '2nd scheme', 'second', 'number 3')
    if (candidatePool.length > 0) {
        const ordinalMap = [
            { patterns: [/\b(1st|first|pehla|pehli|paheli|number 1|no\.?\s*1|scheme 1|yojana 1|option 1|#1)\b/i, /પ્રથમ|પહેલી|पहला|पहली/], index: 0 },
            { patterns: [/\b(2nd|second|dusra|dusri|doosra|doosri|biji|number 2|no\.?\s*2|scheme 2|yojana 2|option 2|#2)\b/i, /બીજી|दूसरा|दूसरी/], index: 1 },
            { patterns: [/\b(3rd|third|tisra|tisri|teesra|teesri|triji|number 3|no\.?\s*3|scheme 3|yojana 3|option 3|#3)\b/i, /ત્રીજી|તીજી|तीसरा|तीसरी/], index: 2 },
            { patterns: [/\b(4th|fourth|chautha|chauthi|chothi|number 4|no\.?\s*4|scheme 4|yojana 4|option 4|#4)\b/i, /ચોથી|ચોથું|चौथा|चौथी/], index: 3 },
            { patterns: [/\b(5th|fifth|panchwa|panchvi|panchmi|number 5|no\.?\s*5|scheme 5|yojana 5|option 5|#5)\b/i, /પાંચમી|पाँचवा|पांचवी/], index: 4 },
            { patterns: [/\b(last|aakhri|chhelli|last one|last scheme)\b/i, /છેલ્લી|આખરી|आखिरी/], index: candidatePool.length - 1 }
        ];

        for (const ord of ordinalMap) {
            if (ord.patterns.some(p => p.test(userText))) {
                if (candidatePool[ord.index]) {
                    return candidatePool[ord.index];
                }
            }
        }
    }

    // Stop words to ignore when scoring scheme title match
    const stopWords = new Set([
        'the', 'for', 'and', 'with', 'about', 'how', 'to', 'apply', 'application',
        'details', 'detail', 'process', 'procedure', 'documents', 'document',
        'eligible', 'eligibility', 'scheme', 'schemes', 'yojana', 'yojna',
        'give', 'show', 'tell', 'what', 'is', 'in', 'of', 'me', 'please', 'pls',
        'kevi', 'rite', 'arji', 'aavedan', 'kaise', 'kare', 'kariye', 'karo',
        'mahiti', 'vishe', 'jaankari', 'batao', 'chahiye', 'joiye', 'form',
        'can', 'will', 'i', 'get', 'need', 'want', 'particular',
        'government', 'govt', 'sarkari', 'state', 'central', 'india', 'bharat',
        'looking', 'scholarship', 'scholarships', 'loan', 'loans', 'farmer', 'student',
        'income', 'annual', 'yearly', 'monthly', 'around', 'aavak', 'aaye', 'more',
        'biji', 'other', 'next', 'crop', 'crops', 'post', 'office', 'live', 'resident',
        'surat', 'ahmedabad', 'rajkot', 'gujarat', 'rajasthan', 'delhi', 'pune', 'mumbai',
        'from', 'with', 'have', 'has', 'my', 'am', 'are', 'under', 'above', 'below', 'lakh', 'thousand', 'seeking'
    ]);

    const cleanTokens = lower
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length >= 3 && !stopWords.has(w));

    // 2. Search in candidatePool (lastSchemes) first for best match
    if (candidatePool.length > 0 && cleanTokens.length > 0) {
        let bestCandidate = null;
        let bestScore = 0;

        for (const s of candidatePool) {
            let score = 0;
            const titleLower = s.title.toLowerCase();
            const tags = (s.tags || []).map(t => t.toLowerCase());

            for (const token of cleanTokens) {
                if (titleLower.includes(token)) {
                    score += (token.length >= 6 ? 30 : 20);
                } else if (tags.some(t => t.includes(token))) {
                    score += 15;
                }
            }

            const acronymMatches = titleLower.match(/\b([a-z]{3,10})\b/g) || [];
            for (const token of cleanTokens) {
                if (acronymMatches.includes(token)) {
                    score += 40;
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestCandidate = s;
            }
        }

        if (bestCandidate && bestScore >= 20) {
            return bestCandidate;
        }
    }

    // 3. Search in all schemes from schemes.json
    if (cleanTokens.length > 0) {
        let bestGlobal = null;
        let bestScore = 0;

        for (const s of schemes) {
            let score = 0;
            const titleLower = s.title.toLowerCase();
            const tags = (s.tags || []).map(t => t.toLowerCase());

            for (const token of cleanTokens) {
                if (titleLower.includes(token)) {
                    score += (token.length >= 6 ? 30 : 20);
                } else if (tags.some(t => t.includes(token))) {
                    score += 10;
                }
            }

            const acronymMatches = titleLower.match(/\b([a-z]{3,10})\b/g) || [];
            for (const token of cleanTokens) {
                if (acronymMatches.includes(token)) {
                    score += 35;
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestGlobal = s;
            }
        }

        if (bestGlobal && bestScore >= 35) {
            return bestGlobal;
        }
    }

    return null;
}

// ── Gemini AI Hook (Optional External Model) ───────────────────
async function callGeminiIfAvailable(userMessage, systemPrompt, conversationHistory, schemeContext) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) return null;

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const contents = [];
        const contextIntro = schemeContext ? `VERIFIED JANSAHAY SCHEMES DATA:\n${JSON.stringify(schemeContext, null, 2)}\n\n` : '';

        if (Array.isArray(conversationHistory)) {
            for (const turn of conversationHistory.slice(-4)) {
                contents.push({
                    role: turn.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: turn.content }]
                });
            }
        }

        contents.push({
            role: 'user',
            parts: [{ text: `${contextIntro}User Message: ${userMessage}` }]
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents,
                generationConfig: { temperature: 0.3, maxOutputTokens: 800 }
            })
        });

        if (!response.ok) return null;
        const data = await response.json();
        const candidate = data.candidates && data.candidates[0];
        const text = candidate && candidate.content && candidate.content.parts && candidate.content.parts[0] && candidate.content.parts[0].text;
        return text || null;
    } catch (err) {
        return null;
    }
}

// ── Dynamic Anti-Repetition Phrasing Templates ────────────────
const QUESTION_TEMPLATES = {
    occupation: {
        en: [
            "To find the most suitable schemes, **what is your current occupation or area of interest?**\n*(e.g., 🌾 Farmer, 🎓 Student, 💼 Business/Shopkeeper, 👩 Women Welfare, 🏥 Healthcare)*",
            "I can personalize your scheme recommendations! **Which category describes you best?**\n*(e.g., Farmer, Student, Self-Employed/Business, Homemaker, or Job Seeker)*",
            "Could you tell me **what type of assistance or occupation you're inquiring for?**\n*(Options: Agriculture, Scholarship, Business Loan, Housing, or Healthcare)*"
        ],
        hi: [
            "आपके लिए सबसे सही सरकारी योजनाएं खोजने के लिए, **आपका व्यवसाय या मुख्य आवश्यकता क्या है?**\n*(जैसे: 🌾 किसान, 🎓 छात्र, 💼 व्यवसाय/दुकानदार, 👩 महिला कल्याण, 🏥 स्वास्थ्य)*",
            "मैं आपको सटीक योजनाएं बता सकता हूँ। **कृपया बताएं आपकी श्रेणी कौन सी है?**\n*(जैसे: किसान, विद्यार्थी, स्वरोजगार/व्यवसाय, गृहिणी, या नौकरी खोजकर्ता)*"
        ],
        gu: [
            "તમારા માટે સૌથી યોગ્ય સરકારી યોજનાઓ શોધવા માટે, **તમારો હાલનો વ્યવસાય કે જરૂરિયાત શું છે?**\n*(દા.ત., 🌾 ખેડૂત, 🎓 વિદ્યાર્થી, 💼 વેપારી/દુકાનદાર, 👩 મહિલા કલ્યાણ, 🏥 આરોગ્ય)*",
            "હું તમને સંબંધિત યોજનાઓ બતાવી શકું છું! **તમારી કેટેગરી કઈ છે?**\n*(દા.ત., ખેડૂત, વિદ્યાર્થી, ધંધાદારી/વેપારી, ગૃહિણી, કે નોકરી શોધનાર)*"
        ]
    },
    state: {
        en: [
            "Great! **Which state or Union Territory do you currently reside in?**\n*(e.g., Gujarat, Maharashtra, Rajasthan, Uttar Pradesh, Delhi)*",
            "To check state-specific benefits, **could you share your home state or city?**"
        ],
        hi: [
            "बहुत बढ़िया! **आप भारत के किस राज्य या केंद्र शासित प्रदेश में रहते हैं?**\n*(जैसे: गुजरात, महाराष्ट्र, राजस्थान, उत्तर प्रदेश, दिल्ली)*",
            "राज्य सरकार की विशेष योजनाएं देखने के लिए, **कृपया अपना राज्य या शहर बताएं?**"
        ],
        gu: [
            "સરસ! **તમે કયા રાજ્યમાં અથવા કયા શહેરમાં રહો છો?**\n*(દા.ત., ગુજરાત, મહારાષ્ટ્ર, રાજસ્થાન, અમદાવાદ, સુરત)*",
            "રાજ્ય સરકારની વિશેષ સહાય ચકાસવા માટે, **તમારું રાજ્ય જણાવશો?**"
        ]
    },
    income: {
        en: [
            "Almost done! **What is your approximate annual household income?**\n*(e.g., Below ₹1 Lakh, ₹1-2.5 Lakh, ₹2.5-5 Lakh, or Above ₹5 Lakh)*",
            "To confirm financial eligibility thresholds, **could you share your yearly family income range?**"
        ],
        hi: [
            "अंतिम जानकारी! **आपकी अनुमानित वार्षिक पारिवारिक आय कितनी है?**\n*(जैसे: 1 लाख से कम, 1 से 2.5 लाख, 2.5 से 5 लाख, या 5 लाख से अधिक)*",
            "वित्तीय पात्रता जांचने के लिए, **कृपया अपनी वार्षिक आय सीमा बताएं?**"
        ],
        gu: [
            "છેલ્લી વિગત! **તમારી અંદાજિત વાર્ષિક કૌટુંબિક આવક કેટલી છે?**\n*(દા.ત., ૧ લાખથી ઓછી, ૧ થી ૨.૫ લાખ, ૨.૫ થી ૫ લાખ, કે ૫ લાખથી વધુ)*",
            "આર્થિક પાત્રતા ચકાસવા માટે, **તમારી અંદાજે વાર્ષિક આવક જણાવશો?**"
        ]
    },
    greetings: {
        en: [
            "🙏 **Namaste! Welcome to JanSahay AI.**\n\nI am your AI assistant for Indian government schemes. I can help you find schemes you are eligible for, check eligibility, and guide you on how to apply in English, Hindi, or Gujarati.\n\nHow can I help you today?",
            "🙏 **Hello! Welcome to JanSahay AI.**\n\nI can help you explore Central and State government schemes. What would you like to know today?"
        ],
        hi: [
            "🙏 **नमस्ते! JanSahay AI में आपका स्वागत है।**\n\nमैं भारत सरकार की योजनाओं के लिए आपका AI सहायक हूँ। मैं आपको छात्रवृत्ति, किसान योजनाएं, स्वास्थ्य और व्यवसाय ऋण खोजने में मदद कर सकता हूँ।\n\nआज आप क्या जानना चाहेंगे?",
            "🙏 **प्रणाम! JanSahay AI में आपका स्वागत है।**\n\nआप मुझसे हिंदी, अंग्रेजी या गुजराती में सरकारी योजनाओं के बारे में पूछ सकते हैं। बताएं मैं आपकी क्या मदद करूँ?"
        ],
        gu: [
            "🙏 **નમસ્તે! JanSahay AI માં આપનું સ્વાગત છે.**\n\nહું ભારત સરકાર અને ગુજરાત સરકારની યોજનાઓ માટે તમારો AI સહાયક છું. હું તમને ખેતી, શિક્ષણ, આરોગ્ય અને બિઝનેસ લોનની યોજનાઓ શોધવામાં મદદ કરી શકું છું.\n\nઆજે તમે શું જાણવા માગો છો?",
            "🙏 **નમસ્તે! JanSahay AI માં આપનું હાર્દિક સ્વાગત છે.**\n\nતમે મને ગુજરાતી, હિન્દી કે અંગ્રેજીમાં સરકારી યોજનાઓ વિશે પૂછી શકો છો. હું તમને કેવી રીતે મદદ કરી શકું?"
        ]
    }
};

function pickTemplate(key, lang = 'en', attempt = 1) {
    const group = QUESTION_TEMPLATES[key] || QUESTION_TEMPLATES.occupation;
    const list = group[lang] || group.en || [];
    if (!list.length) return '';
    const idx = (attempt - 1) % list.length;
    return list[idx];
}

// ── Format Matched Schemes List ───────────────────────────────
function formatMatchedSchemes(matchedSchemes, profile, lang = 'en', page = 0) {
    if (!matchedSchemes || matchedSchemes.length === 0) {
        if (lang === 'gu') {
            return {
                reply: "માફ કરશો, તમારી વિગતો સાથે મેળ ખાતી કોઈ યોજના મળી નથી. કૃપા કરીને અન્ય કેટેગરી અથવા કીવર્ડ સાથે પ્રયાસ કરો.",
                spoken: "માફ કરશો, તમારી વિગતો સાથે મેળ ખાતી કોઈ યોજના મળી નથી."
            };
        }
        if (lang === 'hi') {
            return {
                reply: "क्षमा करें, आपके विवरण से मेल खाने वाली कोई योजना नहीं मिली। कृपया अन्य श्रेणी या कीवर्ड के साथ प्रयास करें।",
                spoken: "क्षमा करें, आपके विवरण से मेल खाने वाली कोई योजना नहीं मिली."
            };
        }
        return {
            reply: "Sorry, no schemes found matching your profile. Please try asking with different keywords or category.",
            spoken: "Sorry, no schemes found matching your profile."
        };
    }

    if (lang === 'gu') {
        const listText = matchedSchemes.map((s, idx) => {
            const num = (page * 4) + idx + 1;
            return "### " + num + ". **" + s.title + "**\n- **લાભ:** " + s.benefits + "\n- **પાત્રતા:** આપેલી માહિતી મુજબ, તમે પાત્ર હોઈ શકો છો.\n- 🔗 [સત્તાવાર પોર્ટલ પર અરજી કરો](" + (s.applyLink || "https://www.myscheme.gov.in/") + ")";
        }).join('\n\n---\n\n');

        const reply = "🔍 **તમારા માટે ઉપલબ્ધ સરકારી યોજનાઓ:**\n\n" + listText + "\n\n💡 *વધુ માહિતી માટે કહો: \"1લી યોજના વિશે જણાવો\" અથવા \"અરજી કેવી રીતે કરવી?\"*";
        const spoken = "તમારા માટે યોજનાઓ મળી છે, જેમાં " + matchedSchemes.map(s => s.title).join(', ') + " શામેલ છે. વધુ વિગતો માટે કોઈપણ યોજનાનું નામ કહો.";
        return { reply, spoken };
    }

    if (lang === 'hi') {
        const listText = matchedSchemes.map((s, idx) => {
            const num = (page * 4) + idx + 1;
            return "### " + num + ". **" + s.title + "**\n- **लाभ:** " + s.benefits + "\n- **पात्रता:** दी गई जानकारी के आधार पर, आप पात्र हो सकते हैं।\n- 🔗 [आधिकारिक पोर्टल पर आवेदन करें](" + (s.applyLink || "https://www.myscheme.gov.in/") + ")";
        }).join('\n\n---\n\n');

        const reply = "🔍 **सत्यापित सरकारी योजनाएं:**\n\n" + listText + "\n\n💡 *अधिक जानकारी के लिए कहें: \"पहली योजना के बारे में बताएं\" या \"आवेदन कैसे करें?\"*";
        const spoken = "आपके लिए योजनाएं मिली हैं, जैसे " + matchedSchemes.map(s => s.title).join(', ') + ". अधिक जानकारी के लिए किसी भी योजना का नाम बताएं.";
        return { reply, spoken };
    }

    const listText = matchedSchemes.map((s, idx) => {
        const num = (page * 4) + idx + 1;
        return "### " + num + ". **" + s.title + "**\n- **Benefits:** " + s.benefits + "\n- **Eligibility:** Based on the information provided, you may be eligible.\n- 🔗 [Apply on Official Portal](" + (s.applyLink || "https://www.myscheme.gov.in/") + ")";
    }).join('\n\n---\n\n');

    const reply = "🔍 **Government Schemes Matching Your Profile:**\n\n" + listText + "\n\n💡 *Ask: \"Tell me about scheme 1\", \"What documents are required?\", or \"How do I apply?\"*";
    const spoken = "I found matching schemes including " + matchedSchemes.map(s => s.title).join(', ') + ". Mention any scheme to hear full details or how to apply.";
    return { reply, spoken };
}

// ── Main Voice Assistant Chat Handler ─────────────────────────
exports.chat = async (req, res) => {
    try {
        const userText = (req.body.query || req.body.message || '').trim();
        const preferredLang = req.body.language;
        const sessionId = req.body.sessionId;

        if (!userText) {
            return res.status(400).json({
                success: false,
                error: 'Query or message text is required'
            });
        }

        // ── Attempt: Unified RAG Pipeline (primary path) ──────────
        const ragPipeline = getRagPipeline();
        if (ragPipeline) {
            try {
                const ragResult = await ragPipeline.process({
                    query: userText,
                    language: preferredLang || 'auto',
                    sessionId,
                    source: 'voice'
                });

                // Build spoken text (concise version of answer for TTS)
                const spokenText = createSpokenText(ragResult.answer || '');

                const mappedSchemes = (ragResult.schemes || []).map(s => ({
                    id: s.scheme_id || s.id,
                    title: s.scheme_name || s.title,
                    category: s.category || '',
                    state: s.state || 'All India',
                    benefits: s.benefits || '',
                    applyLink: s.official_source_url || s.applyLink || '',
                    eligibility_status: s.eligibility_status || 'UNVERIFIED',
                    matchScore: s.relevance_score ? `${Math.round(parseFloat(s.relevance_score) * 100)}%` : '95%'
                }));

                const hasSchemes = mappedSchemes.length > 0;
                const isSpecialIntent = ['GREETING', 'JANSAHAY_HELP', 'FRAUD_PROTECTION'].includes(ragResult.intent);
                const isGenericClarification = !hasSchemes && (/how old are you|which state do you live/i.test(ragResult.answer || '') || ragResult.confidence === 0);

                // Use RAG result only when it found concrete schemes or handled a greeting/help intent.
                // If it returned a generic clarification with 0 schemes, fall through to rule-based engine
                // which matches verified schemes directly from schemes.json for accurate answers.
                if (hasSchemes || (isSpecialIntent && !isGenericClarification)) {
                    return res.json({
                        success: true,
                        reply: ragResult.answer,
                        spokenText,
                        language: ragResult.language,
                        state: 'idle',
                        schemes: mappedSchemes,
                        matchedSchemes: mappedSchemes,
                        followUpQuestions: ragResult.follow_up_questions || [],
                        sources: ragResult.sources || [],
                        confidence: ragResult.confidence || 0,
                        sessionId: ragResult.sessionId || sessionId,
                        pipeline: 'rag'
                    });
                }

                console.log('[VoiceController] RAG returned 0 schemes. Delegating to direct verified scheme matcher for higher accuracy.');
            } catch (ragErr) {
                // Log but do NOT crash — fall through to rule-based engine
                console.warn('[VoiceController] RAG pipeline failed, using rule-based fallback:', ragErr.message);
            }
        }

        // ── Fallback: Rule-Based Intelligence Engine ──────────────
        // (Original voiceController logic begins here — unchanged)
        const session = getOrCreateSession(sessionId);
        const lang = detectLanguage(userText, preferredLang);
        const lower = userText.toLowerCase();

        // Helper to format consistent response JSON
        function respond(reply, spokenText, state = 'idle', matchedSchemes = []) {
            session.history.push({ role: 'user', content: userText, timestamp: Date.now() });
            session.history.push({ role: 'assistant', content: reply, timestamp: Date.now() });

            return res.json({
                success: true,
                reply,
                spokenText: spokenText || createSpokenText(reply),
                language: lang,
                state,
                schemes: matchedSchemes.map(s => ({
                    id: s.id,
                    title: s.title,
                    category: s.category,
                    state: s.state,
                    benefits: s.benefits,
                    applyLink: s.applyLink,
                    matchScore: s.matchScore || '95%'
                })),
                sessionId: session.id,
                profile: session.profile
            });
        }

        // 1. Security Check: Reject OTP / PIN / Passwords
        if (checkSecuritySensitive(userText)) {
            let securityReply = '';
            let spokenSec = '';
            if (lang === 'gu') {
                securityReply = '🔒 **સુરક્ષા ચેતવણી:** તમારી સુરક્ષા માટે, કૃપા કરીને ક્યારેય તમારો **OTP**, **UPI PIN**, **ATM PIN**, અથવા **બેંક પાસવર્ડ** શેર કરશો નહીં. જનસહાય AI ક્યારેય તમારી ગુપ્ત વિગતો માંગશે નહીં.';
                spokenSec = 'તમારી સુરક્ષા માટે, કૃપા કરીને તમારો ઓટીપી કે યુપીઆઈ પિન કોઈની સાથે શેર કરશો નહીં.';
            } else if (lang === 'hi') {
                securityReply = '🔒 **सुरक्षा चेतावनी:** आपकी सुरक्षा के लिए, कृपया कभी भी अपना **OTP**, **UPI PIN**, **ATM PIN**, या **बैंक पासवर्ड** साझा न करें। जनसहाय एआई (JanSahay AI) कभी भी आपसे गोपनीय क्रेडेंशियल नहीं मांगता है।';
                spokenSec = 'आपकी सुरक्षा के लिए, कृपया कभी भी अपना ओटीपी, यूपीआई पिन या बैंक पासवर्ड साझा न करें.';
            } else {
                securityReply = '🔒 **Security Alert:** For your safety, please never share your **OTP**, **UPI PIN**, **ATM PIN**, or **bank passwords**. JanSahay AI will never ask for your confidential authentication credentials.';
                spokenSec = 'For your safety, please never share your OTP, UPI PIN, ATM PIN, or banking passwords. JanSahay AI will never ask for them.';
            }
            return respond(securityReply, spokenSec, 'security');
        }

        // 2. Greetings Handling (Checked early so greetings like "Hello JanSahay" respond with welcome)
        const isGreeting = /^(hi|hello|hey|namaste|kem cho|kaisa hai|kaise ho|start|help|pranam|namaskar)(\s+(jansahay|assistant|ai|bot|ji|sir|madam))?[\s!.]*$/i.test(lower) ||
            /^(hello|hi|hey|namaste)\s+jansahay/i.test(lower) ||
            /^નમસ્તે|^કેમ છો|^नमस्ते|^प्रणाम/.test(userText);
        if (isGreeting && session.history.length <= 3) {
            const greetText = pickTemplate('greetings', lang, session.history.length + 1);
            const spokenGreet = createSpokenText(greetText);
            return respond(greetText, spokenGreet, 'idle');
        }

        // 3. Category Switch Detection & Profile Updates
        const explicitCategory = detectCategoryInText(userText);
        const previousCategory = session.profile.category_need;
        const isDirectSchemeRequest = /\b(scheme|schemes|yojana|yojna|loan|loans|mudra|scholarship|scholarships|batao|dikhao|show|list|find|search|give|get|chahiye|joiye|what about)\b/i.test(lower) ||
            /યોજના|સ્કીમ|લોન|શિષ્યવૃત્તિ|બતાવો|જોઈએ|યજના|योजना|स्कीम|लोन|छात्रवृत्ति|बताओ|दिखाओ|चाहिए/.test(userText);

        if (explicitCategory && explicitCategory.key !== previousCategory) {
            console.log(`[JanSahay] Category switch detected: ${previousCategory} → ${explicitCategory.key}`);
            session.profile.category_need = explicitCategory.key;
            session.profile.occupation = explicitCategory.defaultOccupation;
            if (explicitCategory.gender) session.profile.gender = explicitCategory.gender;
            session.activeScheme = null;
            session.lastSchemes = [];
            session.schemePage = 0;
            if (session.pendingQuestion !== 'occupation' || isDirectSchemeRequest) {
                session.pendingQuestion = null;
            }
        }

        // Extract any other profile information (state, city, income, age, gender)
        session.profile = extractProfileDetails(userText, session.profile);

        // 4. Intent & Targeted Scheme Resolution
        const isHowToApply = /\b(how to apply|how do i apply|how can i apply|where to apply|where can i apply|application process|application procedure|application details|application form|application link|apply process|apply details|apply link|registration process|register|how to register|form bharvu|arji kevi rite|arji karvi|aavedan kaise|kaha aavedan|online apply|apply|application|aavedan|arji)\b/i.test(lower) ||
            /અરજી કેવી રીતે|અરજી ક્યાં|ફોર્મ કેવી રીતે|અરજીની વિગત|અરજી પ્રક્રિયા|આવેદન કૈસે|आवेदन कैसे|कहाँ आवेदन|आवेदन प्रक्रिया|आवेदन विवरण|फॉर्म कैसे भरें/.test(userText);

        const isDocumentsQuery = /\b(document|documents|required documents|documents needed|what documents|kagad|kagadiyo|dastavez|papers|proof|aadhaar)\b/i.test(lower) ||
            /દસ્તાવેજ|કાગળો|પુરાવા|દસ્તાવેજો|દસ્તાવેજની યાદી|दस्तावेज|कागजात|कागज़/.test(userText);

        const isEligibilityQuery = /\b(eligible|eligibility|eligibility criteria|qualify|who can apply|who is eligible|patrata|kisko milega|mane malse|maru nam)\b/i.test(lower) ||
            /પાત્રતા|લાયકાત|કોને મળે|કોણ પાત્ર|પાત્ર|पात्रता|किसे मिलेगा|कौन पात्र/.test(userText);

        const isSchemeDetailQuery = /\b(tell me about|more details|more info|details about|information about|explain|details of|vishe mahiti|vishe jankari|ke baare me|ke bare me)\b/i.test(lower) ||
            /વિશે માહિતી|વિગત|જાણકારી|માહિતી આપો|કેવી છે|કેવો છે|કેવી યોજના|કેવી સ્કીમ|के बारे में|जानकारी|बताएं/.test(userText);

        const isShowMore = /\b(more schemes|other schemes|next schemes|show more|biji yojana|aur yojana|dusri yojana|batao aur|next page)\b/i.test(lower) ||
            /વધુ યોજના|અન્ય યોજના|और योजना|दूसरी योजना|अगली/.test(userText);

        // Check if user is referencing a particular scheme (by ordinal: 1st, 2nd, scheme 2, or name/keyword)
        const targetedScheme = resolveTargetScheme(userText, session);

        // 5. Targeted Scheme Follow-Up (Precise Scheme Requested)
        if (targetedScheme) {
            session.activeScheme = targetedScheme;

            if (isHowToApply) {
                const appInfo = formatSchemeApplication(targetedScheme, lang);
                return respond(appInfo.reply, appInfo.spoken, 'info', [targetedScheme]);
            }

            if (isDocumentsQuery) {
                const docInfo = formatSchemeDocuments(targetedScheme, lang);
                return respond(docInfo.reply, docInfo.spokenText, 'info', [targetedScheme]);
            }

            if (isEligibilityQuery) {
                const eligInfo = formatSchemeEligibility(targetedScheme, lang);
                return respond(eligInfo.reply, eligInfo.spokenText, 'info', [targetedScheme]);
            }

            const explanation = formatSchemeExplanation(targetedScheme, lang);
            return respond(explanation.reply, explanation.spokenText, 'info', [targetedScheme]);
        }

        // 6. Active Scheme Context Follow-Up
        if (session.activeScheme && (isHowToApply || isDocumentsQuery || isEligibilityQuery || isSchemeDetailQuery) && !explicitCategory) {
            const activeScheme = session.activeScheme;

            if (isHowToApply) {
                const appInfo = formatSchemeApplication(activeScheme, lang);
                return respond(appInfo.reply, appInfo.spoken, 'info', [activeScheme]);
            }

            if (isDocumentsQuery) {
                const docInfo = formatSchemeDocuments(activeScheme, lang);
                return respond(docInfo.reply, docInfo.spokenText, 'info', [activeScheme]);
            }

            if (isEligibilityQuery) {
                const eligInfo = formatSchemeEligibility(activeScheme, lang);
                return respond(eligInfo.reply, eligInfo.spokenText, 'info', [activeScheme]);
            }

            if (isSchemeDetailQuery) {
                const explanation = formatSchemeExplanation(activeScheme, lang);
                return respond(explanation.reply, explanation.spokenText, 'info', [activeScheme]);
            }
        }

        // 7. Pagination ("Show More Schemes")
        if (isShowMore) {
            session.schemePage = (session.schemePage || 0) + 1;
            const nextSchemes = matchSchemesWithIntelligence({
                query: userText,
                profile: session.profile,
                limit: 4,
                offset: session.schemePage * 4
            });

            if (nextSchemes.length > 0) {
                session.lastSchemes = nextSchemes;
                session.activeScheme = nextSchemes[0];
                const formatted = formatMatchedSchemes(nextSchemes, session.profile, lang, session.schemePage);
                return respond(formatted.reply, formatted.spoken, 'matched', nextSchemes);
            } else {
                session.schemePage = 0;
            }
        }

        // 8. Gratitude Handling
        const isGratitude = /\b(thank you|thanks|aabhar|dhanyawad|shukriya|thanku|thx|great thanks|ok thanks|okay thanks)\b/i.test(lower) ||
            /આભાર|ધન્યવાદ|શુક્રિયા|ધ્યાન રાખજો/.test(userText);
        if (isGratitude && !explicitCategory) {
            let reply = '';
            let spoken = '';
            if (lang === 'gu') {
                reply = "🙏 **તમારો ખૂબ ખૂબ આભાર!**\n\nજો તમને અરજી કરવા, દસ્તાવેજો તૈયાર કરવા અથવા અન્ય કોઈ સરકારી યોજના વિશે પ્રશ્ન હોય, તો મને જરૂર પૂછો. હું તમારી સેવામાં હાજર છું!";
                spoken = "તમારો ખૂબ ખૂબ આભાર! જો તમને અરજી કે અન્ય કોઈ યોજના વિશે સવાલ હોય, તો જરૂર પૂછો.";
            } else if (lang === 'hi') {
                reply = "🙏 **आपका बहुत-बहुत धन्यवाद!**\n\nयदि आपको आवेदन प्रक्रिया, आवश्यक दस्तावेजों या अन्य किसी सरकारी योजना के बारे में जानकारी चाहिए, तो बेझिझक पूछें।";
                spoken = "आपका बहुत धन्यवाद! यदि आपको आवेदन या किसी अन्य योजना की जानकारी चाहिए, तो जरूर पूछें.";
            } else {
                reply = "🙏 **You're very welcome!**\n\nIf you need step-by-step guidance on applying, document requirements, or discovering other government schemes, just let me know!";
                spoken = "You're very welcome! Let me know if you need help with applications, documents, or other schemes.";
            }
            return respond(reply, spoken, 'idle');
        }

        // 9. Specific Scheme by Title / Brand Name
        const specificKeywords = [
            'pm-kisan', 'pmkisan', 'ayushman', 'pmjay', 'jan dhan', 'pmjdy',
            'sukanya', 'vishwakarma', 'mysy', 'vhali dikri',
            'maa amrutam', 'surya ghar', 'fasal bima', 'pmfby', 'e-drive',
            'fame', 'mgnrega', 'atal pension', 'apy', 'ujjwala'
        ];

        let matchedSpecificScheme = null;
        for (const kw of specificKeywords) {
            if (lower.includes(kw)) {
                matchedSpecificScheme = schemes.find(s =>
                    s.title.toLowerCase().includes(kw) ||
                    (s.tags && s.tags.some(t => t.toLowerCase().includes(kw)))
                );
                if (matchedSpecificScheme) break;
            }
        }

        if (matchedSpecificScheme && !explicitCategory) {
            session.activeScheme = matchedSpecificScheme;
            session.lastSchemes = [matchedSpecificScheme];
            const explanation = formatSchemeExplanation(matchedSpecificScheme, lang);
            return respond(explanation.reply, explanation.spokenText, 'info', [matchedSpecificScheme]);
        }

        // 10. Intelligent Scheme Matching & Progressive Questionnaire
        const hasCategory = Boolean(session.profile.category_need || explicitCategory);
        const hasState = Boolean(session.profile.state);
        const hasIncome = Boolean(session.profile.income);

        // Single-shot complete profile: match immediately
        if (hasCategory && hasState && hasIncome) {
            session.pendingQuestion = null;
            const matched = matchSchemesWithIntelligence({
                query: userText,
                profile: session.profile,
                limit: 4,
                offset: 0
            });
            if (matched.length > 0) {
                session.lastSchemes = matched;
                session.activeScheme = matched[0];
                session.schemePage = 0;
                const formatted = formatMatchedSchemes(matched, session.profile, lang, 0);
                return respond(formatted.reply, formatted.spoken, 'matched', matched);
            }
        }

        // A. Handle active onboarding questionnaire progression
        if (session.pendingQuestion) {
            if (session.pendingQuestion === 'occupation') {
                if (hasCategory) {
                    session.pendingQuestion = 'state';
                    session.questionAttempts['state'] = (session.questionAttempts['state'] || 0) + 1;
                    const questionText = pickTemplate('state', lang, session.questionAttempts['state']);
                    return respond(questionText, createSpokenText(questionText), 'asking');
                } else {
                    session.questionAttempts['occupation'] = (session.questionAttempts['occupation'] || 0) + 1;
                    const questionText = pickTemplate('occupation', lang, session.questionAttempts['occupation']);
                    return respond(questionText, createSpokenText(questionText), 'asking');
                }
            }

            if (session.pendingQuestion === 'state') {
                if (hasState) {
                    session.pendingQuestion = 'income';
                    session.questionAttempts['income'] = (session.questionAttempts['income'] || 0) + 1;
                    const questionText = pickTemplate('income', lang, session.questionAttempts['income']);
                    return respond(questionText, createSpokenText(questionText), 'asking');
                } else {
                    session.questionAttempts['state'] = (session.questionAttempts['state'] || 0) + 1;
                    if (session.questionAttempts['state'] > 2) {
                        session.profile.state = 'All India';
                        session.pendingQuestion = 'income';
                        const questionText = pickTemplate('income', lang, 1);
                        return respond(questionText, createSpokenText(questionText), 'asking');
                    } else {
                        const questionText = pickTemplate('state', lang, session.questionAttempts['state']);
                        return respond(questionText, createSpokenText(questionText), 'asking');
                    }
                }
            }

            if (session.pendingQuestion === 'income') {
                if (hasIncome || /skip|leave/i.test(lower) || (session.questionAttempts['income'] || 0) >= 2) {
                    if (!hasIncome) session.profile.income = '1l-2.5l';
                    session.pendingQuestion = null;
                    const matched = matchSchemesWithIntelligence({
                        query: userText,
                        profile: session.profile,
                        limit: 4,
                        offset: 0
                    });
                    session.lastSchemes = matched;
                    session.activeScheme = matched[0];
                    session.schemePage = 0;
                    const formatted = formatMatchedSchemes(matched, session.profile, lang, 0);
                    return respond(formatted.reply, formatted.spoken, 'matched', matched);
                } else {
                    session.questionAttempts['income'] = (session.questionAttempts['income'] || 0) + 1;
                    const questionText = pickTemplate('income', lang, session.questionAttempts['income']);
                    return respond(questionText, createSpokenText(questionText), 'asking');
                }
            }
        }

        // B. If user introduces category and state but no income, ask for income
        if (hasCategory && hasState && !hasIncome && !isDirectSchemeRequest) {
            session.pendingQuestion = 'income';
            session.questionAttempts['income'] = (session.questionAttempts['income'] || 0) + 1;
            const questionText = pickTemplate('income', lang, session.questionAttempts['income']);
            return respond(questionText, createSpokenText(questionText), 'asking');
        }

        // C. General Scheme Discovery Onboarding Initiation
        const isSeekingSchemes =
            /\b(scheme|schemes|yojana|yojna|help|apply|aid|support|batao|chahiye|joiye|find|karo|need government schemes|i need)\b/i.test(lower) ||
            /યોજના|સ્કીમ|સહાય|મદદ|જોઈએ|યજના|स्कीम|चाहिए|सहायता/.test(userText);

        if (isSeekingSchemes && !hasCategory) {
            session.pendingQuestion = 'occupation';
            session.questionAttempts['occupation'] = (session.questionAttempts['occupation'] || 0) + 1;
            const questionText = pickTemplate('occupation', lang, session.questionAttempts['occupation']);
            return respond(questionText, createSpokenText(questionText), 'asking');
        }

        // D. Direct Category Search or Topic Switch
        if (explicitCategory || (hasCategory && hasState)) {
            session.pendingQuestion = null;
            const matched = matchSchemesWithIntelligence({
                query: userText,
                profile: session.profile,
                limit: 4,
                offset: 0
            });

            if (matched.length > 0) {
                session.lastSchemes = matched;
                session.activeScheme = matched[0];
                session.schemePage = 0;
                const formatted = formatMatchedSchemes(matched, session.profile, lang, 0);
                return respond(formatted.reply, formatted.spoken, 'matched', matched);
            }
        }

        // 11. General Platform Inquiries
        if (/\b(what is jansahay|about jansahay|how does it work|kaise kaam karta hai|jansahay shu chhe|who are you|kon ho|tamne kon chho|free hai|free chhe)\b/i.test(lower)) {
            let reply = '';
            let spokenText = '';

            if (lang === 'gu') {
                reply = "🤖 **જનસહાય AI વિશે:**\n\n" +
                    "જનસહાય AI એ ભારત સરકાર અને રાજ્ય સરકારોની 4,700+ કલ્યાણકારી યોજનાઓ શોધવા માટેનું એક વિશ્વસનીય પ્લેટફોર્મ છે.\n\n" +
                    "✨ **અમે કેવી રીતે મદદ કરીએ છીએ:**\n" +
                    "- તમારી પ્રોફાઇલ મુજબ યોગ્ય યોજનાઓની ભલામણ\n" +
                    "- લાભો, પાત્રતા અને જરૂરી દસ્તાવેજોની સરળ સમજૂતી\n" +
                    "- સત્તાવાર અરજી લિંક સુધી સીધું માર્ગદર્શન\n\n" +
                    "તમે ગુજરાતી, હિન્દી કે અંગ્રેજીમાં કોઈપણ સરકારી યોજના વિશે પૂછી શકો છો!";
                spokenText = "જનસહાય AI ભારત સરકાર અને રાજ્ય સરકારોની યોજનાઓ શોધવાનું વિશ્વસનીય પ્લેટફોર્મ છે. તમે ગુજરાતી, હિન્દી અથવા અંગ્રેજીમાં કોઈપણ સરકારી યોજના વિશે પૂછી શકો છો.";
            } else if (lang === 'hi') {
                reply = "🤖 **जनसहाय एआई (JanSahay AI) के बारे में:**\n\n" +
                    "जनसहाय एआई भारत सरकार और राज्य सरकारों की 4,700 से अधिक कल्याणकारी योजनाओं को खोजने का एक आधिकारिक एआई सहायक है।\n\n" +
                    "✨ **हमारी विशेषताएं:**\n" +
                    "- आपकी प्रोफ़ाइल के अनुसार सटीक योजनाओं की सिफारिश\n" +
                    "- पात्रता, लाभ और आवश्यक दस्तावेजों की विस्तृत जानकारी\n" +
                    "- आधिकारिक आवेदन पोर्टल का सीधा लिंक\n\n" +
                    "आप हिंदी, गुजराती या अंग्रेजी में अपनी आवश्यकतानुसार कोई भी योजना पूछ सकते हैं!";
                spokenText = "जनसहाय एआई भारत सरकार और राज्य सरकारों की योजनाओं को खोजने का आधिकारिक एआई प्लेटफॉर्म है. आप हिंदी, गुजराती या अंग्रेजी में किसी भी योजना के बारे में पूछ सकते हैं.";
            } else {
                reply = "🤖 **About JanSahay AI:**\n\n" +
                    "JanSahay AI is an intelligent government scheme discovery platform covering 4,700+ Central and State Government schemes across India.\n\n" +
                    "✨ **How I Can Help You:**\n" +
                    "- Recommend schemes tailored to your personal profile\n" +
                    "- Explain benefits, eligibility criteria, and required documents\n" +
                    "- Guide you to official government application portals\n\n" +
                    "You can speak or chat with me in English, Hindi, or Gujarati!";
                spokenText = "JanSahay AI helps Indian citizens discover relevant Central and State government schemes, check eligibility, and find official application portals. You can ask me in English, Hindi, or Gujarati.";
            }

            return respond(reply, spokenText, 'idle');
        }

        // 12. Free-text search across all schemes using Intelligence Matcher
        const searchResults = matchSchemesWithIntelligence({
            query: userText,
            profile: session.profile,
            limit: 4,
            offset: 0
        });

        if (searchResults.length > 0) {
            session.lastSchemes = searchResults;
            session.activeScheme = searchResults[0];

            let reply = '';
            let spokenText = '';

            if (lang === 'gu') {
                reply = "🔍 **\"" + userText + "\"** સંબંધિત ઉપલબ્ધ યોજનાઓ:\n\n" +
                    searchResults.map((s, idx) => (idx + 1) + ". **" + s.title + "**\n- **લાભ:** " + s.benefits + "\n- 🔗 [સત્તાવાર પોર્ટલ](" + (s.applyLink || "#") + ")").join('\n\n') +
                    "\n\nઆપેલી માહિતી મુજબ, તમે પાત્ર હોઈ શકો છો. ચોક્કસ યોજનાની સંપૂર્ણ વિગતો જાણવા માટે તેનું નામ કહો.";
                spokenText = "તમારા માટે સંબંધિત યોજનાઓ મળી છે, જેમાં " + searchResults.map(s => s.title).join(', ') + " શામેલ છે.";
            } else if (lang === 'hi') {
                reply = "🔍 **\"" + userText + "\"** से संबंधित उपलब्ध योजनाएं:\n\n" +
                    searchResults.map((s, idx) => (idx + 1) + ". **" + s.title + "**\n- **लाभ:** " + s.benefits + "\n- 🔗 [आधिकारिक पोर्टल](" + (s.applyLink || "#") + ")").join('\n\n') +
                    "\n\nदी गई जानकारी के आधार पर, आप पात्र हो सकते हैं। किसी विशिष्ट योजना की पूरी जानकारी के लिए उसका नाम बताएं।";
                spokenText = "आपके लिए संबंधित योजनाएं मिली हैं, जैसे " + searchResults.map(s => s.title).join(', ') + ".";
            } else {
                reply = "🔍 Government schemes matching **\"" + userText + "\"**:\n\n" +
                    searchResults.map((s, idx) => (idx + 1) + ". **" + s.title + "**\n- **Benefits:** " + s.benefits + "\n- 🔗 [Official Portal](" + (s.applyLink || "#") + ")").join('\n\n') +
                    "\n\nBased on the information provided, you may be eligible. Mention any scheme to hear full application details!";
                spokenText = "I found matching schemes including " + searchResults.map(s => s.title).join(', ') + ". Mention any scheme to hear full details.";
            }

            return respond(reply, spokenText, 'matched', searchResults);
        }

        // 13. External Gemini AI (if API key available)
        const systemPrompt = "You are JanSahay AI Assistant, the official AI assistant for the JanSahay AI government scheme discovery platform.\nYou support English, Hindi and Gujarati.\nBe friendly, patient, respectful and simple.\nAsk only the information necessary for the user's request.\nNever repeat the exact same answers. Never invent fake schemes.\nNever guarantee eligibility. Always state: \"Based on the information provided, you may be eligible.\"";

        const geminiReply = await callGeminiIfAvailable(userText, systemPrompt, session.history, schemes.slice(0, 15));
        if (geminiReply) {
            const spokenGemini = createSpokenText(geminiReply);
            return respond(geminiReply, spokenGemini, 'idle');
        }

        // 14. Conversational Guidance Fallback
        let fallbackReply = '';
        let fallbackSpoken = '';

        if (lang === 'gu') {
            fallbackReply = "નમસ્તે! 🙏 હું તમને સરકારી યોજનાઓ શોધવામાં મદદ કરી શકું છું.\n\nતમારા માટે યોગ્ય યોજના શોધવા માટે, કૃપા કરીને જણાવો:\n- **તમારો વ્યવસાય શું છે?** (દા.ત. ખેડૂત, વિદ્યાર્થી, વેપારી, મહિલા)\n- અથવા પૂછો: *\"ખેડૂતો માટે કઈ યોજના છે?\"* કે *\"વિદ્યાર્થીઓ માટે સ્કોલરશિપ કઈ છે?\"*";
            fallbackSpoken = "નમસ્તે! હું તમને સરકારી યોજનાઓ શોધવામાં મદદ કરી શકું છું. તમે ખેતી, સ્કોલરશિપ, અથવા બિઝનેસ લોન વિશે પૂછી શકો છો.";
        } else if (lang === 'hi') {
            fallbackReply = "नमस्ते! 🙏 मैं आपको केंद्र और राज्य सरकार की कल्याणकारी योजनाओं से जोड़ सकता हूँ।\n\nकृपया अपनी श्रेणी बताएं:\n- **आप क्या करते हैं?** (जैसे: किसान, छात्र, व्यवसायी, या महिला कल्याण)\n- या पूछें: *\"छात्रवृत्ति कैसे मिलेगी?\"* या *\"मुद्रा लोन की जानकारी दें\"*";
            fallbackSpoken = "नमस्ते! मैं आपको सरकारी योजनाओं की सही जानकारी दे सकता हूँ. आप किसान, छात्रवृत्ति, या व्यवसाय ऋण के बारे में पूछ सकते हैं.";
        } else {
            fallbackReply = "Namaste! 🙏 I can help you discover 4,700+ Central and State Government schemes tailored to your needs.\n\nTo find the best schemes for you:\n- **What is your occupation or need?** (e.g. Farmer, Student, Business/Startup, Healthcare)\n- Or try asking: *\"Are there schemes for farmers in Gujarat?\"* or *\"How do I apply for a scholarship?\"*";
            fallbackSpoken = "Namaste! I can help you discover Central and State government schemes. You can tell me your occupation or ask about scholarships, farmer schemes, or healthcare.";
        }

        return respond(fallbackReply, fallbackSpoken, 'idle');

    } catch (error) {
        console.error('[VoiceController Error]:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error in JanSahay Voice Assistant',
            message: 'An error occurred while processing your voice request. Please try again.'
        });
    }
};

// ── Reset Session Handler ─────────────────────────────────────
exports.resetSession = (req, res) => {
    const { sessionId } = req.body;
    if (sessionId && sessions.has(sessionId)) {
        sessions.delete(sessionId);
    }
    res.json({
        success: true,
        message: 'Session reset successfully'
    });
};

// ── Status Handler ────────────────────────────────────────────
exports.status = (req, res) => {
    const ragPipeline = getRagPipeline();
    const vectorStore = ragPipeline ? (() => { try { return require('../services/rag/vectorStore'); } catch { return null; } })() : null;
    const vstats = vectorStore ? vectorStore.getStats() : {};

    res.json({
        success: true,
        service: 'JanSahay Multilingual Voice AI Assistant',
        pipeline: ragPipeline ? 'rag+rule-based-fallback' : 'rule-based-only',
        languages: ['en', 'hi', 'gu'],
        totalSchemesLoaded: schemes.length,
        vectorIndexLoaded: vstats.isLoaded || false,
        vectorCount: vstats.vectorCount || 0,
        activeSessions: sessions.size,
        hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)
    });
};

// ── Health Diagnostic Handler ─────────────────────────────────
exports.health = (req, res) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
    const ragPipeline = getRagPipeline();
    const vectorStore = ragPipeline ? (() => { try { return require('../services/rag/vectorStore'); } catch { return null; } })() : null;
    const vstats = vectorStore ? vectorStore.getStats() : {};

    res.json({
        microphone: 'browser-controlled',
        stt: 'healthy',
        backend: 'healthy',
        rag: ragPipeline ? (vstats.vectorCount > 0 ? 'indexed' : 'keyword-only') : 'unavailable',
        llm: hasKey ? 'healthy' : 'unavailable',
        tts: 'healthy'
    });
};