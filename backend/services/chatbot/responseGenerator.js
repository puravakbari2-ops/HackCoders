/* ============================================================
   Chatbot Service: Response Generator
   Generates grounded responses using Gemini LLM + RAG context
   ============================================================ */

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const LLM_MODEL = process.env.LLM_MODEL || 'gemini-3.6-flash';

let genAI = null;
let model = null;

/**
 * Initialize the Gemini LLM client
 */
function initLLM() {
    if (model) return;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY not set. Add it to backend/.env');
    }

    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
        model: LLM_MODEL,
        generationConfig: {
            temperature: 0.3,      // Low temperature for factual accuracy
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024
        }
    });
}

/**
 * Validate that response matches the target language
 */
function isResponseInTargetLanguage(text, targetLang) {
    if (!text) return false;
    const clean = text.trim();

    if (targetLang === 'gu') {
        // Must have Gujarati characters
        return /[\u0A80-\u0AFF]/.test(clean);
    }
    if (targetLang === 'hi') {
        // Must have Devanagari characters
        return /[\u0900-\u097F]/.test(clean);
    }
    if (targetLang === 'en') {
        // Should not be dominantly Gujarati or Devanagari
        const guCount = (clean.match(/[\u0A80-\u0AFF]/g) || []).length;
        const hiCount = (clean.match(/[\u0900-\u097F]/g) || []).length;
        return (guCount + hiCount) < 50;
    }
    return true;
}

/**
 * Generate a grounded response using LLM + RAG context
 * @param {string} systemPrompt - System prompt with verified context
 * @param {string} userMessage - User's question
 * @param {Object[]} [conversationHistory] - Previous conversation turns
 * @param {string} [targetLanguage] - Required response language (en, hi, gu)
 * @returns {Promise<string>} - Generated response text
 */
async function generateResponse(systemPrompt, userMessage, conversationHistory = [], targetLanguage = 'en') {
    initLLM();

    try {
        const chatModel = genAI.getGenerativeModel({
            model: LLM_MODEL,
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            generationConfig: {
                temperature: 0.2,      // Low temperature for factual grounding & language compliance
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 1024
            }
        });

        // Build chat history for multi-turn context.
        // IMPORTANT: Gemini requires history to start with a 'user' turn and
        // alternate strictly between 'user' and 'model'. If either rule is
        // violated, the API throws "First content should be with role 'user'".
        const history = [];
        const recentHistory = conversationHistory.slice(-6);

        for (const turn of recentHistory) {
            if (!turn || !turn.text || !turn.text.trim()) continue; // skip empty turns

            const geminiRole = (turn.role === 'user') ? 'user' : 'model';

            // Skip if this would create two consecutive same-role turns
            const lastRole = history.length > 0 ? history[history.length - 1].role : null;
            if (lastRole === geminiRole) continue;

            history.push({
                role: geminiRole,
                parts: [{ text: turn.text }]
            });
        }

        // Gemini requires history to start with a 'user' role.
        // Drop any leading 'model' entries.
        while (history.length > 0 && history[0].role !== 'user') {
            history.shift();
        }

        // History must end with a 'user' turn when there are entries
        // (because we're about to send the CURRENT user message via sendMessage).
        // If the history ends with 'user', remove that last entry to avoid
        // duplicate user messages.
        if (history.length > 0 && history[history.length - 1].role === 'user') {
            history.pop();
        }

        const chat = chatModel.startChat({ history });
        const result = await chat.sendMessage(userMessage);
        let reply = result.response.text();

        // ── Language Validation Step (Part 33) ───────────────────
        if (targetLanguage && !isResponseInTargetLanguage(reply, targetLanguage)) {
            console.warn(`[ResponseGenerator] Response did not meet target language '${targetLanguage}'. Regenerating strictly...`);
            const langName = targetLanguage === 'gu' ? 'Gujarati (ગુજરાતી)' : (targetLanguage === 'hi' ? 'Hindi (हिन्दी)' : 'English');
            const retryPrompt = `IMPORTANT CORRECTION: You must rewrite the response strictly and purely in ${langName}. Preserve all factual details, links, and scheme names, but write all explanatory sentences entirely in ${langName}.`;

            try {
                const retryResult = await chat.sendMessage(retryPrompt);
                const retryReply = retryResult.response.text();
                if (isResponseInTargetLanguage(retryReply, targetLanguage)) {
                    reply = retryReply;
                }
            } catch (retryErr) {
                console.warn('[ResponseGenerator] Retry translation failed:', retryErr.message);
            }
        }

        return reply;
    } catch (err) {
        console.error(`[ResponseGenerator] LLM generation error (${err.message}). Passing to deterministic grounded fallback.`);
        throw err;
    }
}

/**
 * Generate a greeting response (no RAG needed)
 */
function generateGreeting(language = 'en') {
    const greetings = {
        en: `🙏 **Namaste! Welcome to JanSahay AI.**

I'm your AI assistant for Indian government schemes. I can help you:

• **Find government schemes** you may be eligible for
• **Check eligibility** for specific schemes
• **Get details** about scheme benefits, documents, and application process
• **Compare schemes** side by side

What would you like to know today?`,

        hi: `🙏 **नमस्ते! JanSahay AI में आपका स्वागत है।**

मैं भारत सरकार की योजनाओं के लिए आपका AI सहायक हूँ। मैं आपकी मदद कर सकता हूँ:

• **सरकारी योजनाएं खोजें** जिनके लिए आप पात्र हो सकते हैं
• **पात्रता जांचें** विशिष्ट योजनाओं के लिए
• **विवरण प्राप्त करें** योजना लाभ, दस्तावेज और आवेदन प्रक्रिया के बारे में

आज आप क्या जानना चाहेंगे?`,

        gu: `🙏 **નમસ્તે! JanSahay AI માં આપનું સ્વાગત છે.**

હું ભારત સરકારની યોજનાઓ માટે તમારો AI સહાયક છું. હું તમને મદદ કરી શકું છું:

• **સરકારી યોજનાઓ શોધો** જેના માટે તમે પાત્ર હોઈ શકો
• **પાત્રતા તપાસો** ચોક્કસ યોજનાઓ માટે
• **વિગતો મેળવો** યોજના લાભો, દસ્તાવેજો અને અરજી પ્રક્રિયા વિશે

આજે તમે શું જાણવા માગો છો?`
    };

    return greetings[language] || greetings.en;
}

/**
 * Generate a JanSahay help response
 */
function generateHelpResponse(language = 'en') {
    return `🤖 **JanSahay AI** is your AI-powered government scheme assistant.

**What I can do:**
• 🔍 Search 1,000+ government schemes
• ✅ Check your eligibility for schemes
• 📋 Show required documents
• 📝 Guide you through the application process
• 🔗 Provide official application links
• 🔄 Compare schemes side by side

**How to use:**
• Ask about any scheme: *"Tell me about PM-KISAN"*
• Find schemes for you: *"I am a farmer from Gujarat"*
• Check eligibility: *"Am I eligible for Ayushman Bharat?"*
• Get documents list: *"What documents for PM Awas Yojana?"*

**Languages supported:** English, Hindi, Gujarati, Hinglish

**Note:** I only provide information from verified government sources. I will never ask for your OTP, PIN, or passwords.`;
}

/**
 * Generate a fraud protection warning
 */
function generateFraudWarning(language = 'en') {
    const warnings = {
        en: "⚠️ **Security Alert:** Please do NOT share your OTP, UPI PIN, ATM PIN, bank passwords, or any authentication credentials with anyone, including JanSahay AI. No government scheme requires sharing these for verification.",
        hi: "⚠️ **सुरक्षा चेतावनी:** कृपया अपना OTP, UPI PIN, ATM PIN, बैंक पासवर्ड, या कोई भी प्रमाणीकरण क्रेडेंशियल किसी के साथ साझा न करें, जिसमें JanSahay AI भी शामिल है।",
        gu: "⚠️ **સુરક્ષા ચેતવણી:** કૃપયા તમારો OTP, UPI PIN, ATM PIN, બેંક પાસવર્ડ, અથવા કોઈપણ પ્રમાણીકરણ ઓળખ કોઈની સાથે શેર કરશો નહીં."
    };

    return warnings[language] || warnings.en;
}

/**
 * Detect language from text
 */
function detectLanguage(text) {
    const trimmed = (text || '').trim();
    if (!trimmed) return 'en';

    // 1. Script checks (100% reliable)
    if (/[\u0A80-\u0AFF]/.test(trimmed)) return 'gu'; // Gujarati script
    if (/[\u0900-\u097F]/.test(trimmed)) return 'hi'; // Devanagari script

    const lower = trimmed.toLowerCase();

    // 2. Romanized Gujarati patterns
    const gujaratiPatterns = [
        /\b(mane|mare|joiye|chhe|mate|shu|nathi|tamne|tamaro|mari|dikri|khedut|kheti|vishe|mahiti|malse|aapo)\b/i,
        /\b(kem\s+cho|su\s+karo)\b/i
    ];
    let gujaratiScore = 0;
    for (const pat of gujaratiPatterns) {
        const matches = lower.match(new RegExp(pat, 'gi'));
        if (matches) gujaratiScore += matches.length;
    }

    // 3. Romanized Hindi patterns (grammatical words, verbs, and pronouns)
    const hindiPatterns = [
        /\b(mujhe|chahiye|batao|bataiye|kaise|kya|kisko|sarkari|mera|meri|mere|kitna|kitne|milta|milte|milega|milti|paisa|paise|kahan|kaha|hain|hai|hu|hoon|mai|main|ke\s+liye|berozgar|yuva|dastavej|kagaz|avedan|arji|karu|kare|karna|wala|wali|wale|bhi|koi)\b/i
    ];
    let hindiScore = 0;
    for (const pat of hindiPatterns) {
        const matches = lower.match(new RegExp(pat, 'gi'));
        if (matches) hindiScore += matches.length;
    }

    // 4. English patterns (stop words & common verbs/grammar in English queries)
    const englishPatterns = [
        /\b(what|is|are|tell|me|about|can|get|how|do|apply|am|eligible|eligibility|for|with|from|which|show|give|help|documents|needed|compare|and|person|disabled|joke)\b/i
    ];
    let englishScore = 0;
    for (const pat of englishPatterns) {
        const matches = lower.match(new RegExp(pat, 'gi'));
        if (matches) englishScore += matches.length;
    }

    // Comparison logic
    if (gujaratiScore > 0 && gujaratiScore >= hindiScore && gujaratiScore >= englishScore) {
        return 'gu';
    }
    if (hindiScore > 0 && hindiScore > gujaratiScore && hindiScore >= englishScore) {
        return 'hi';
    }
    if (gujaratiScore > 0 && englishScore === 0) return 'gu';
    if (hindiScore > 0 && englishScore === 0) return 'hi';

    return 'en';
}

/**
 * Check if message contains sensitive credentials
 */
function containsSensitiveInfo(text) {
    const sensitivePatterns = [
        /\b\d{4}\s?\d{4}\s?\d{4}\b/,  // Aadhaar-like number
        /\b\d{6}\b.*otp/i,              // 6-digit OTP
        /otp.*\b\d{4,6}\b/i,            // OTP with digits
        /\bpin\s*[:=]?\s*\d{4,6}\b/i,   // PIN number
        /\bpassword\s*[:=]?\s*\S+/i,    // Password sharing
        /\bupi\s*pin/i                   // UPI PIN mention
    ];

    return sensitivePatterns.some(p => p.test(text));
}

module.exports = {
    generateResponse,
    generateGreeting,
    generateHelpResponse,
    generateFraudWarning,
    detectLanguage,
    containsSensitiveInfo
};
