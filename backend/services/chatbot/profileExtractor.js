/* ============================================================
   Chatbot Service: Profile Extractor
   Extracts and maintains user profile from conversation
   Supports session memory across multiple turns
   ============================================================ */

/**
 * In-memory session store for user profiles
 */
const sessions = new Map();
const SESSION_TTL_MS = 45 * 60 * 1000; // 45 minutes

/**
 * Get or create a session
 */
function getOrCreateSession(sessionId) {
    const id = sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const now = Date.now();

    // Cleanup stale sessions
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
                age: null,
                gender: null,
                state: null,
                occupation: null,
                income: null,
                education: null,
                category: null,   // Social category: SC/ST/OBC/General
                area: null,       // Urban/Rural
                disability: null,
                maritalStatus: null
            },
            conversationHistory: [],
            lastSchemes: [],
            activeScheme: null
        });
    }

    const session = sessions.get(id);
    session.lastActive = now;
    return session;
}

/**
 * Extract profile information from a user message
 * @param {string} message - User's message
 * @param {string} sessionId - Session ID
 * @returns {Object} - { session, newFields }
 */
function extractProfile(message, sessionId) {
    const session = getOrCreateSession(sessionId);
    const text = (message || '').trim().toLowerCase();
    const newFields = {};

    // ── Extract age ──────────────────────────────────────────────
    const agePatterns = [
        /(?:i am|i'm|age is|age|meri umar|umr|meri age|vay)\s*(?:is\s*)?(\d{1,3})/i,
        /(\d{1,3})\s*(?:years?\s*old|sal|saal|varsh|varsho)/i,
        /\b(\d{1,2})\b/  // Standalone number in short message
    ];

    for (const pattern of agePatterns) {
        const match = text.match(pattern);
        if (match) {
            const age = parseInt(match[1]);
            if (age >= 1 && age <= 120) {
                session.profile.age = age;
                newFields.age = age;
                break;
            }
        }
    }

    // ── Extract gender ───────────────────────────────────────────
    if (/\b(male|man|purush|ladka|mard)\b/i.test(text) && !/\bfemale\b/i.test(text)) {
        session.profile.gender = 'male';
        newFields.gender = 'male';
    } else if (/\b(female|woman|mahila|ladki|aurat|stri|stree)\b/i.test(text)) {
        session.profile.gender = 'female';
        newFields.gender = 'female';
    }

    // ── Extract state ────────────────────────────────────────────
    const { STATE_MAPPINGS } = require('./queryRewriter');
    for (const [key, value] of Object.entries(STATE_MAPPINGS)) {
        if (key.length >= 3 && text.includes(key)) {
            session.profile.state = value;
            newFields.state = value;
            break;
        }
    }

    // ── Extract occupation ───────────────────────────────────────
    const { OCCUPATION_MAPPINGS } = require('./queryRewriter');
    for (const [key, value] of Object.entries(OCCUPATION_MAPPINGS)) {
        if (text.includes(key)) {
            session.profile.occupation = value;
            newFields.occupation = value;
            break;
        }
    }

    // ── Extract income ───────────────────────────────────────────
    const incomePatterns = [
        /(?:income|kamai|aavak|amdani)\s*(?:is\s*)?(?:₹|rs\.?|rupees?\s*)?\s*([\d,.]+)\s*(lakh|lac|l|crore|cr|thousand|k|hazar)?/i,
        /(?:₹|rs\.?)\s*([\d,.]+)\s*(lakh|lac|l|crore|cr|thousand|k|hazar)?/i
    ];

    for (const pattern of incomePatterns) {
        const match = text.match(pattern);
        if (match) {
            let amount = parseFloat(match[1].replace(/,/g, ''));
            const unit = (match[2] || '').toLowerCase();

            if (unit.startsWith('l')) amount *= 100000;
            else if (unit.startsWith('c')) amount *= 10000000;
            else if (unit === 'k' || unit === 'thousand' || unit === 'hazar') amount *= 1000;

            session.profile.income = amount;
            newFields.income = amount;
            break;
        }
    }

    // ── Extract social category ──────────────────────────────────
    if (/\b(sc|scheduled caste|dalit)\b/i.test(text)) {
        session.profile.category = 'sc';
        newFields.category = 'sc';
    } else if (/\b(st|scheduled tribe|adivasi)\b/i.test(text)) {
        session.profile.category = 'st';
        newFields.category = 'st';
    } else if (/\b(obc|other backward)\b/i.test(text)) {
        session.profile.category = 'obc';
        newFields.category = 'obc';
    } else if (/\b(general|gen|unreserved)\b/i.test(text)) {
        session.profile.category = 'general';
        newFields.category = 'general';
    } else if (/\b(ews|economically weaker)\b/i.test(text)) {
        session.profile.category = 'ews';
        newFields.category = 'ews';
    }

    // ── Extract education ────────────────────────────────────────
    const educationPatterns = [
        { pattern: /\b(10th|10vi|dasvi|ssc|matric)\b/i, value: '10th' },
        { pattern: /\b(12th|12vi|inter|hsc|intermediate)\b/i, value: '12th' },
        { pattern: /\b(b\.?tech|btech|engineering|be)\b/i, value: 'B.Tech' },
        { pattern: /\b(b\.?a|ba|bachelor of arts)\b/i, value: 'BA' },
        { pattern: /\b(b\.?sc|bsc|bachelor of science)\b/i, value: 'BSc' },
        { pattern: /\b(b\.?com|bcom)\b/i, value: 'BCom' },
        { pattern: /\b(m\.?tech|mtech)\b/i, value: 'M.Tech' },
        { pattern: /\b(m\.?a|ma|master of arts)\b/i, value: 'MA' },
        { pattern: /\b(mba)\b/i, value: 'MBA' },
        { pattern: /\b(phd|doctorate)\b/i, value: 'PhD' },
        { pattern: /\b(diploma)\b/i, value: 'Diploma' },
        { pattern: /\b(iti)\b/i, value: 'ITI' },
        { pattern: /\b(graduate|graduation)\b/i, value: 'Graduate' },
        { pattern: /\b(post graduate|pg|post-graduate)\b/i, value: 'Post Graduate' }
    ];

    for (const { pattern, value } of educationPatterns) {
        if (pattern.test(text)) {
            session.profile.education = value;
            newFields.education = value;
            break;
        }
    }

    // ── Extract area ─────────────────────────────────────────────
    if (/\b(urban|city|shahar|nagar)\b/i.test(text)) {
        session.profile.area = 'urban';
        newFields.area = 'urban';
    } else if (/\b(rural|village|gaon|gam|gram)\b/i.test(text)) {
        session.profile.area = 'rural';
        newFields.area = 'rural';
    }

    // Add message to conversation history
    session.conversationHistory.push({
        role: 'user',
        text: message,
        timestamp: Date.now()
    });

    // Trim conversation history to last 20 messages
    if (session.conversationHistory.length > 20) {
        session.conversationHistory = session.conversationHistory.slice(-20);
    }

    return { session, newFields };
}

/**
 * Get missing fields needed for eligibility checking
 */
function getMissingEligibilityFields(session) {
    const required = ['age', 'state', 'occupation'];
    const helpful = ['gender', 'income', 'category'];

    const missingRequired = required.filter(f => !session.profile[f]);
    const missingHelpful = helpful.filter(f => !session.profile[f]);

    return { missingRequired, missingHelpful };
}

/**
 * Generate a clarification question for missing fields
 */
function generateClarificationQuestion(missingFields, language = 'en') {
    if (!missingFields || missingFields.length === 0) return null;

    // Ask max 2 questions at a time
    const fieldsToAsk = missingFields.slice(0, 2);

    const questions = {
        en: {
            age: 'How old are you?',
            state: 'Which state do you live in?',
            occupation: 'What is your occupation? (e.g., student, farmer, self-employed)',
            gender: 'What is your gender?',
            income: 'What is your approximate annual family income?',
            category: 'What is your social category? (General/SC/ST/OBC/EWS)'
        },
        hi: {
            age: 'आपकी उम्र कितनी है?',
            state: 'आप किस राज्य में रहते हैं?',
            occupation: 'आपका व्यवसाय क्या है? (जैसे: छात्र, किसान, स्व-रोज़गार)',
            gender: 'आपका लिंग क्या है?',
            income: 'आपकी अनुमानित वार्षिक पारिवारिक आय कितनी है?',
            category: 'आपकी सामाजिक श्रेणी क्या है? (सामान्य/SC/ST/OBC/EWS)'
        },
        gu: {
            age: 'તમારી ઉંમર કેટલી છે?',
            state: 'તમે કયા રાજ્યમાં રહો છો?',
            occupation: 'તમારો વ્યવસાય શું છે? (જેમ કે: વિદ્યાર્થી, ખેડૂત, સ્વ-રોજગાર)',
            gender: 'તમારું જાતિ શું છે?',
            income: 'તમારી અંદાજિત વાર્ષિક કુટુંબની આવક કેટલી છે?',
            category: 'તમારી સામાજિક શ્રેણી શું છે? (General/SC/ST/OBC/EWS)'
        }
    };

    const lang = questions[language] ? language : 'en';
    const qList = fieldsToAsk.map(f => questions[lang][f]).filter(Boolean);

    return qList.join(' ');
}

/**
 * Update session with active scheme
 */
function setActiveScheme(sessionId, scheme) {
    const session = getOrCreateSession(sessionId);
    session.activeScheme = scheme;
}

/**
 * Get session data
 */
function getSession(sessionId) {
    return sessions.get(sessionId) || null;
}

module.exports = {
    getOrCreateSession,
    extractProfile,
    getMissingEligibilityFields,
    generateClarificationQuestion,
    setActiveScheme,
    getSession
};
