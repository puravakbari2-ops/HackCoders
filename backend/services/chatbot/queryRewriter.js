/* ============================================================
   Chatbot Service: Query Rewriter
   Converts user queries into structured search representations
   Extracts: intent, state, occupation, category, scheme name
   Supports multilingual input
   ============================================================ */

/**
 * State name mappings (including Hindi/Gujarati romanized forms)
 */
const STATE_MAPPINGS = {
    'gujarat': 'Gujarat', 'gujrat': 'Gujarat', 'gj': 'Gujarat',
    'maharashtra': 'Maharashtra', 'mh': 'Maharashtra',
    'rajasthan': 'Rajasthan', 'rj': 'Rajasthan',
    'delhi': 'Delhi', 'dilli': 'Delhi',
    'bihar': 'Bihar', 'br': 'Bihar',
    'uttar pradesh': 'Uttar Pradesh', 'up': 'Uttar Pradesh',
    'madhya pradesh': 'Madhya Pradesh', 'mp': 'Madhya Pradesh',
    'tamil nadu': 'Tamil Nadu', 'tn': 'Tamil Nadu',
    'karnataka': 'Karnataka', 'ka': 'Karnataka',
    'andhra pradesh': 'Andhra Pradesh', 'ap': 'Andhra Pradesh',
    'telangana': 'Telangana', 'ts': 'Telangana',
    'west bengal': 'West Bengal', 'wb': 'West Bengal',
    'kerala': 'Kerala', 'kl': 'Kerala',
    'punjab': 'Punjab', 'pb': 'Punjab',
    'haryana': 'Haryana', 'hr': 'Haryana',
    'chhattisgarh': 'Chhattisgarh', 'cg': 'Chhattisgarh',
    'jharkhand': 'Jharkhand', 'jh': 'Jharkhand',
    'odisha': 'Odisha', 'orissa': 'Odisha', 'or': 'Odisha',
    'assam': 'Assam', 'as': 'Assam',
    'himachal pradesh': 'Himachal Pradesh', 'hp': 'Himachal Pradesh',
    'uttarakhand': 'Uttarakhand', 'uk': 'Uttarakhand',
    'goa': 'Goa', 'ga': 'Goa',
    'tripura': 'Tripura', 'tr': 'Tripura',
    'meghalaya': 'Meghalaya', 'ml': 'Meghalaya',
    'manipur': 'Manipur', 'mn': 'Manipur',
    'nagaland': 'Nagaland', 'nl': 'Nagaland',
    'mizoram': 'Mizoram', 'mz': 'Mizoram',
    'arunachal pradesh': 'Arunachal Pradesh', 'ar': 'Arunachal Pradesh',
    'sikkim': 'Sikkim', 'sk': 'Sikkim',
    'jammu and kashmir': 'Jammu and Kashmir', 'jk': 'Jammu and Kashmir', 'j&k': 'Jammu and Kashmir',
    'ladakh': 'Ladakh', 'la': 'Ladakh',
    'puducherry': 'Puducherry', 'pondicherry': 'Puducherry',
    'chandigarh': 'Chandigarh', 'ch': 'Chandigarh',
    'lakshadweep': 'Lakshadweep',
    'andaman': 'Andaman and Nicobar Islands', 'andaman and nicobar': 'Andaman and Nicobar Islands',
    'dadra': 'Dadra and Nagar Haveli and Daman and Diu', 'daman': 'Dadra and Nagar Haveli and Daman and Diu'
};

/**
 * Occupation keyword mappings
 */
const OCCUPATION_MAPPINGS = {
    'farmer': 'farmer', 'kisan': 'farmer', 'khedut': 'farmer', 'kisaan': 'farmer',
    'kheti': 'farmer', 'agriculture': 'farmer', 'krishi': 'farmer',
    'student': 'student', 'vidhyarthi': 'student', 'padhai': 'student', 'college': 'student',
    'school': 'student', 'university': 'student', 'shikshan': 'student',
    'business': 'self-employed', 'businessman': 'self-employed', 'vyapari': 'self-employed',
    'dukan': 'self-employed', 'shop': 'self-employed', 'self employed': 'self-employed',
    'entrepreneur': 'self-employed', 'startup': 'self-employed',
    'worker': 'employed', 'employee': 'employed', 'karmchari': 'employed', 'naukri': 'employed',
    'job': 'employed', 'labour': 'employed', 'mazdoor': 'employed',
    'unemployed': 'unemployed', 'berozgar': 'unemployed', 'jobless': 'unemployed',
    'retired': 'retired', 'senior': 'retired', 'old age': 'retired', 'pension': 'retired',
    'homemaker': 'homemaker', 'housewife': 'homemaker', 'grihmantri': 'homemaker',
    'artisan': 'artisan', 'karigar': 'artisan', 'craftsman': 'artisan',
    'carpenter': 'artisan', 'tailor': 'artisan', 'blacksmith': 'artisan',
    'potter': 'artisan', 'cobbler': 'artisan'
};

/**
 * Category keyword mappings
 */
const CATEGORY_MAPPINGS = {
    'agriculture': 'Agriculture, Rural & Environment',
    'farming': 'Agriculture, Rural & Environment',
    'kisan': 'Agriculture, Rural & Environment',
    'khedut': 'Agriculture, Rural & Environment',
    'crop': 'Agriculture, Rural & Environment',
    'education': 'Education & Learning',
    'scholarship': 'Education & Learning',
    'school': 'Education & Learning',
    'college': 'Education & Learning',
    'student': 'Education & Learning',
    'health': 'Health & Wellness',
    'medical': 'Health & Wellness',
    'hospital': 'Health & Wellness',
    'ayushman': 'Health & Wellness',
    'treatment': 'Health & Wellness',
    'housing': 'Housing & Shelter',
    'house': 'Housing & Shelter',
    'home': 'Housing & Shelter',
    'awas': 'Housing & Shelter',
    'makan': 'Housing & Shelter',
    'business': 'Business & Entrepreneurship',
    'loan': 'Banking, Financial Services & Insurance',
    'mudra': 'Business & Entrepreneurship',
    'startup': 'Business & Entrepreneurship',
    'msme': 'Business & Entrepreneurship',
    'women': 'Women & Child',
    'mahila': 'Women & Child',
    'girl': 'Women & Child',
    'beti': 'Women & Child',
    'dikri': 'Women & Child',
    'employment': 'Skills & Employment',
    'skill': 'Skills & Employment',
    'training': 'Skills & Employment',
    'job': 'Skills & Employment',
    'rozgar': 'Skills & Employment',
    'pension': 'Social Welfare & Empowerment',
    'senior': 'Social Welfare & Empowerment',
    'disability': 'Social Welfare & Empowerment',
    'welfare': 'Social Welfare & Empowerment',
    'solar': 'Utility & Sanitation',
    'electricity': 'Utility & Sanitation',
    'bijli': 'Utility & Sanitation',
    'artisan': 'Skills & Employment',
    'vishwakarma': 'Skills & Employment'
};

/**
 * Known scheme name patterns for exact matching
 */
const SCHEME_NAME_PATTERNS = [
    { pattern: /pm[-\s]?kisan/i, name: 'PM-KISAN' },
    { pattern: /pmjdy|jan\s*dhan/i, name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)' },
    { pattern: /ayushman|pmjay/i, name: 'Ayushman Bharat' },
    { pattern: /mudra|pmmy/i, name: 'MUDRA' },
    { pattern: /ujjwala|pmuy/i, name: 'PM Ujjwala Yojana' },
    { pattern: /awas|pmay/i, name: 'PM Awas Yojana' },
    { pattern: /sukanya/i, name: 'Sukanya Samriddhi Yojana' },
    { pattern: /vishwakarma/i, name: 'PM Vishwakarma' },
    { pattern: /fasal\s*bima|pmfby/i, name: 'PM Fasal Bima Yojana' },
    { pattern: /kaushal|pmkvy/i, name: 'PM Kaushal Vikas Yojana' },
    { pattern: /nrega|mgnrega/i, name: 'MGNREGA' },
    { pattern: /surya\s*ghar/i, name: 'PM Surya Ghar' },
    { pattern: /atal\s*pension|apy/i, name: 'Atal Pension Yojana' },
    { pattern: /e[-\s]?drive|fame/i, name: 'PM E-DRIVE' },
    { pattern: /beti\s*bachao/i, name: 'Beti Bachao Beti Padhao' },
    { pattern: /kisan\s*credit|kcc/i, name: 'Kisan Credit Card' }
];

/**
 * Rewrite a user query into a structured search representation
 * @param {string} message - User's raw message
 * @param {string} intent - Detected intent
 * @param {string} language - Detected language
 * @param {Object} [session] - Session context
 * @returns {Object} - Structured query object
 */
function rewriteQuery(message, intent, language = 'en', session = null) {
    const text = (message || '').trim();
    const lowerText = text.toLowerCase();

    const result = {
        text: text,
        intent: intent,
        language: language,
        schemeName: null,
        keywords: [],
        filters: {},
        requestedInfo: []
    };

    // ── Extract scheme name ─────────────────────────────────────
    for (const { pattern, name } of SCHEME_NAME_PATTERNS) {
        if (pattern.test(lowerText)) {
            result.schemeName = name;
            break;
        }
    }

    // ── Safe Canonical Filters Extraction ───────────────────────
    const { extractCanonicalFilters } = require('../rag/normalization');
    const canonicalFilters = extractCanonicalFilters(text);

    if (canonicalFilters.state) {
        result.filters.state = canonicalFilters.state;
        result.filters.canonicalState = canonicalFilters.canonicalState;
    } else if (session?.profile?.state) {
        result.filters.state = session.profile.state;
    }

    if (canonicalFilters.occupation) {
        result.filters.occupation = canonicalFilters.occupation;
        result.filters.canonicalOccupation = canonicalFilters.canonicalOccupation;
    } else if (session?.profile?.occupation) {
        result.filters.occupation = session.profile.occupation;
    }

    if (canonicalFilters.category) {
        result.filters.category = canonicalFilters.category;
        result.filters.canonicalCategory = canonicalFilters.canonicalCategory;
    }

    if (canonicalFilters.gender) {
        result.filters.gender = canonicalFilters.gender;
    } else if (session?.profile?.gender) {
        result.filters.gender = session.profile.gender;
    }

    // Detect if user is asking for multiple schemes
    result.multipleResults = /\b(all|sari|saari|badi|multiple|list|several|tamam)\b/i.test(lowerText) ||
        /સારી|બધી|તમામ|સઘળી|सभी|सारी|सारे|तमाम/i.test(text) ||
        intent === 'CATEGORY_SEARCH';

    // ── Extract keywords ────────────────────────────────────────
    const stopWords = new Set([
        'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
        'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall',
        'should', 'may', 'might', 'must', 'can', 'could', 'i', 'me', 'my',
        'you', 'your', 'we', 'our', 'they', 'their', 'he', 'she', 'it',
        'to', 'for', 'of', 'in', 'on', 'at', 'by', 'with', 'from', 'up',
        'about', 'into', 'through', 'during', 'before', 'after', 'above',
        'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
        'am', 'not', 'no', 'nor', 'and', 'but', 'or', 'if', 'then',
        'mujhe', 'mane', 'mere', 'chahiye', 'hai', 'hain', 'ke', 'ka', 'ki',
        'se', 'mein', 'par', 'ko', 'ne', 'kya', 'kaise', 'kaun',
        'che', 'chhe', 'mate', 'ma', 'thi', 'ne', 'shu',
        'tell', 'show', 'give', 'get', 'want', 'need', 'please'
    ]);

    const words = lowerText.split(/[\s,;.!?]+/);
    result.keywords = words.filter(w => w.length > 2 && !stopWords.has(w));

    // ── Determine requested information ─────────────────────────
    if (intent === 'SCHEME_DETAILS' || intent === 'FIND_SCHEMES') {
        result.requestedInfo = ['overview', 'benefits'];
    }
    if (intent === 'CHECK_ELIGIBILITY') {
        result.requestedInfo = ['eligibility'];
    }
    if (intent === 'DOCUMENTS') {
        result.requestedInfo = ['documents'];
    }
    if (intent === 'APPLICATION_PROCESS' || intent === 'APPLICATION_LINK') {
        result.requestedInfo = ['application'];
    }
    if (intent === 'BENEFIT_SEARCH') {
        result.requestedInfo = ['benefits'];
    }
    if (intent === 'COMPARE_SCHEMES') {
        result.requestedInfo = ['overview', 'benefits', 'eligibility'];
    }

    return result;
}

module.exports = {
    rewriteQuery,
    STATE_MAPPINGS,
    OCCUPATION_MAPPINGS,
    CATEGORY_MAPPINGS,
    SCHEME_NAME_PATTERNS
};
