/* ============================================================
   Chatbot Service: Intent Detector
   Classifies user queries into actionable intents
   Supports English, Hindi, Gujarati, Hinglish, Roman Hindi/Gujarati
   ============================================================ */

/**
 * Intent definitions with multilingual keyword patterns
 */
const INTENT_PATTERNS = {
    GREETING: {
        keywords: [
            'hello', 'hi', 'hey', 'namaste', 'namaskar', 'kem cho', 'kaise ho',
            'good morning', 'good evening', 'help', 'start', 'shuru',
            'jai hind', 'jai shree', 'pranam'
        ],
        nativePatterns: /^(नमस्ते|नमस्कार|प्रणाम|હેલો|નમસ્તે|કેમ છો)/i
    },

    SCHEME_DETAILS: {
        keywords: [
            'tell me about', 'what is', 'details of', 'explain', 'information about',
            'batao', 'bataiye', 'kya hai', 'jankari', 'mahiti', 'vishe',
            'about scheme', 'scheme details', 'describe'
        ],
        nativePatterns: /बताओ|बताइये|जानकारी|विवरण|માહિતી|વિશે|શું છે/i
    },

    CHECK_ELIGIBILITY: {
        keywords: [
            'eligible', 'eligibility', 'qualify', 'am i eligible',
            'patra', 'patrata', 'yogya', 'haq', 'check eligibility', 'am i qualified'
        ],
        nativePatterns: /पात्र|पात्रता|योग्य|પાત્રતા|યોગ્ય/i
    },

    FIND_SCHEMES: {
        keywords: [
            'find scheme', 'search scheme', 'show scheme', 'list scheme',
            'government scheme', 'sarkari yojana', 'yojana', 'scheme chahiye',
            'yojana joiye', 'yojana batao', 'recommend', 'suggestion',
            'mere liye', 'mare mate', 'which scheme', 'best scheme'
        ],
        nativePatterns: /योजना|स्कीम|सरकारी|યોજના|સ્કીમ|સરકારી/i
    },

    CATEGORY_SEARCH: {
        keywords: [
            'scholarship schemes for students', 'government schemes for women',
            'schemes for senior citizens', 'solar panel subsidy scheme',
            'scholarship schemes', 'schemes for women'
        ]
    },

    DOCUMENTS: {
        keywords: [
            'document', 'documents required', 'papers', 'kagaz', 'dastavej',
            'what documents', 'required documents', 'paperwork',
            'kya chahiye', 'kaun se document', 'kagad'
        ],
        nativePatterns: /दस्तावेज|कागज|डॉक्यूमेंट|દસ્તાવેજ|કાગળ/i
    },

    APPLICATION_PROCESS: {
        keywords: [
            'how to apply', 'apply', 'application', 'apply kaise', 'arji',
            'avedan', 'register', 'registration', 'form', 'online apply',
            'kaise apply', 'kem apply', 'application process', 'form kahan'
        ],
        nativePatterns: /आवेदन|अर्जी|अप्लाई|અરજી|એપ્લાય|કેવી રીતે/i
    },

    BENEFIT_SEARCH: {
        keywords: [
            'benefit', 'labh', 'fayda', 'kitna paisa', 'kitna milta',
            'how much benefit', 'amount', 'subsidy', 'incentive', 'financial help',
            'paisa', 'rupee', 'ketla paisa', 'ketlu male'
        ],
        nativePatterns: /लाभ|फायदा|कितना|पैसा|લાભ|ફાયદો|કેટલા|પૈસા/i
    },

    COMPARE_SCHEMES: {
        keywords: [
            'compare', 'comparison', 'difference', 'vs', 'versus',
            'tulna', 'fark', 'better', 'which is better',
            'compare these', 'antar', 'bheda'
        ],
        nativePatterns: /तुलना|अंतर|फर्क|સરખામણી|તફાવત/i
    },

    JANSAHAY_HELP: {
        keywords: [
            'what can you do', 'what can jansahay do', 'how to use', 'features',
            'what is jansahay', 'help me', 'guide', 'instructions',
            'kya kar sakte', 'tum kya', 'shu kari shako'
        ]
    }
};

/**
 * Detect the intent of a user query
 * @param {string} message - User's message
 * @param {string} language - Detected language
 * @param {Object} [session] - Session context for multi-turn understanding
 * @returns {Object} - { intent, confidence, matchedKeywords }
 */
function detectIntent(message, language = 'en', session = null) {
    if (!message || !message.trim()) {
        return { intent: 'UNKNOWN', confidence: 0, matchedKeywords: [] };
    }

    const text = message.trim();
    const lowerText = text.toLowerCase();

    // ── 1. GREETING ─────────────────────────────────────────────
    if (/^(hello|hi|hey|namaste|namaskar|kem cho|kaise ho|good morning|good evening|good afternoon|help|start|shuru|jai hind|pranam)[\s!?.]*$/i.test(text) ||
        /^(नमस्ते|नमस्कार|प्रणाम|હેલો|નમસ્તે|કેમ છો)[\s!?.]*$/i.test(text)) {
        return { intent: 'GREETING', confidence: 1.0, matchedKeywords: ['greeting'] };
    }

    // ── 2. DOCUMENTS ────────────────────────────────────────────
    if (/\b(document|documents|papers|kagaz|dastavej|paperwork|kya chahiye|kaun se document)\b/i.test(lowerText) ||
        /दस्तावेज|कागज|डॉक्यूमेंट|દસ્તાવેજ|કાગળ/i.test(text)) {
        return { intent: 'DOCUMENTS', confidence: 0.9, matchedKeywords: ['documents'] };
    }

    // ── 3. APPLICATION PROCESS ──────────────────────────────────
    if (/\b(how to apply|how do i apply|kaise apply|kem apply|apply kaise|application process|form kahan|form kaise|kahan se milega|arji kaise|avedan kaise|kaise register)\b/i.test(lowerText) ||
        /आवेदन|अर्जी|એપ્લાય|અરજી|કેવી રીતે/i.test(text)) {
        return { intent: 'APPLICATION_PROCESS', confidence: 0.9, matchedKeywords: ['apply'] };
    }

    // ── 4. BENEFIT SEARCH ───────────────────────────────────────
    if (/\b(kitna paisa|kitna milta|kitne paise|how much benefit|what benefit|subsidy amount|financial benefit|ketla paisa|kitna labh)\b/i.test(lowerText) ||
        /कितना.*पैसा|કેટલા.*પૈસા|લાભ/i.test(text)) {
        return { intent: 'BENEFIT_SEARCH', confidence: 0.9, matchedKeywords: ['benefit'] };
    }

    // ── 5. CHECK ELIGIBILITY ────────────────────────────────────
    // Only if asking specifically about qualifying/eligibility
    if (/\b(am i eligible|am i qualified|check eligibility|kya mai eligible|meri age.*eligible|patra hu|kya mai patra|check my eligibility)\b/i.test(lowerText) ||
        /पात्रता|યોગ્યતા/i.test(text)) {
        return { intent: 'CHECK_ELIGIBILITY', confidence: 0.9, matchedKeywords: ['eligibility'] };
    }

    // ── 6. COMPARE SCHEMES ──────────────────────────────────────
    if (/\b(compare|comparison|difference\s+between|vs|versus|tulna|fark|antar)\b/i.test(lowerText) ||
        /तुलना|अंतर|फर्क|સરખામણી|તફાવત/i.test(text)) {
        return { intent: 'COMPARE_SCHEMES', confidence: 0.95, matchedKeywords: ['compare'] };
    }

    // ── 7. JANSAHAY HELP ────────────────────────────────────────
    if (/\b(what can (you|jansahay) do|what is jansahay|how to use jansahay|jansahay kya|features of jansahay)\b/i.test(lowerText)) {
        return { intent: 'JANSAHAY_HELP', confidence: 0.95, matchedKeywords: ['jansahay_help'] };
    }

    // ── 8. EXACT SCHEMES & SCHEME DETAILS ───────────────────────
    const schemeDetailPhrases = /(tell me about|what is|details of|explain|information about|ke bare me batao|के बारे में बताओ|vishe mahiti aapo|વિશે માહિતી|about scheme|scheme details)/i;
    const exactSchemes = /\b(pmjdy|mgnrega|pm-kisan|pmkisan|ayushman bharat|sukanya samriddhi|pm vishwakarma|atal pension yojana|pmay|pmfby|pmkvy|mudra|kcc)\b/i;

    if (schemeDetailPhrases.test(text)) {
        return { intent: 'SCHEME_DETAILS', confidence: 0.9, matchedKeywords: ['scheme_details'] };
    }
    if (exactSchemes.test(lowerText)) {
        return { intent: 'SCHEME_DETAILS', confidence: 0.9, matchedKeywords: ['exact_scheme'] };
    }

    // ── 9. JOKES / OFF-TOPIC / GIBBERISH (UNKNOWN) ───────────────
    if (/\b(tell me a joke|make me laugh|who made you|who is your father|what is the weather|weather today)\b/i.test(lowerText)) {
        return { intent: 'UNKNOWN', confidence: 0.0, matchedKeywords: [] };
    }
    // Random gibberish with no vowels or random keystrokes
    if (/^[bcdfghjklmnpqrstvwxyz]{5,}$/i.test(lowerText) || (/^[a-z]{7,}$/i.test(lowerText) && !/[aeiou]/i.test(lowerText))) {
        return { intent: 'UNKNOWN', confidence: 0.0, matchedKeywords: [] };
    }

    // ── 10. CATEGORY SEARCH ─────────────────────────────────────
    // Check if query is seeking schemes by category or occupation
    const isCategoryQuery = /\b(education|scholarship|agriculture|farming|farmer|kisan|khedut|health|medical|housing|business|loan|employment|job|women|girl|solar)\s+(schemes?|yojana|yojna)?\b/i.test(lowerText) ||
        /\b(schemes?|yojana|yojna)\s+(for|in|of)\s+(education|students?|farmers?|kisan|agriculture|women|girls?|health|business)\b/i.test(lowerText) ||
        /\b(education|scholarship|farmer|kisan|agriculture)\s+schemes?\b/i.test(lowerText) ||
        /શિક્ષણ|શિષ્યવૃત્તિ|ખેતી|ખેડૂત|કૃષિ|આરોગ્ય|આવાસ|મહિલા/i.test(text) ||
        /शिक्षा|छात्रवृत्ति|कृषि|किसान|खेती|स्वास्थ्य|आवास|महिला/i.test(text);

    const isMultiple = /\b(all|sari|saari|badi|multiple|list|several|tamam)\b/i.test(lowerText) ||
        /સારી|બધી|તમામ|સઘળી|सभी|सारी|सारे|तमाम/i.test(text);

    if (isCategoryQuery && /\b(available|give|show|tell|what|which|chahiye|joiye|જોઈએ|બતાવો|चाहिए|बताओ|બધી|સારી|all|list)\b/i.test(text)) {
        return {
            intent: 'CATEGORY_SEARCH',
            confidence: 0.90,
            matchedKeywords: ['category_search'],
            multipleResults: isMultiple
        };
    }

    // ── 11. FIND SCHEMES (Default for general scheme-seeking queries) ───
    if (/\b(scheme|schemes|yojana|yojna|subsidy|help|farmer|kisan|khedut|student|vidhyarthi|chahiye|joiye|batao|gujarat|maharashtra|bihar|delhi|disabled|women|mahila|yuva|berozgar)\b/i.test(lowerText) ||
        /योजना|स्कीम|सरकारी|યોજના|સ્કીમ|ખેડૂત|વિદ્યાર્થી|શિષ્યવૃત્તિ/i.test(text)) {
        return {
            intent: 'FIND_SCHEMES',
            confidence: 0.85,
            matchedKeywords: ['find_schemes'],
            multipleResults: isMultiple
        };
    }

    return { intent: 'UNKNOWN', confidence: 0, matchedKeywords: [] };
}

module.exports = {
    detectIntent,
    INTENT_PATTERNS
};
