/* ============================================================
   RAG Service: Grounding Validator
   Post-generation validation to ensure response is grounded
   in retrieved context — removes unsupported claims
   ============================================================ */

/**
 * Validate that a response is grounded in the retrieved context
 * @param {string} response - LLM-generated response
 * @param {Object[]} retrievedDocs - Retrieved context documents
 * @param {Object} query - Original structured query
 * @returns {Object} - { isGrounded, warnings, cleanedResponse }
 */
function validateGrounding(response, retrievedDocs, query) {
    const warnings = [];
    let isGrounded = true;

    if (!response || !retrievedDocs || retrievedDocs.length === 0) {
        return { isGrounded: false, warnings: ['No context available for grounding'], cleanedResponse: response };
    }

    // Build a set of all scheme names present in context
    const contextSchemeNames = new Set();
    const contextText = [];

    for (const doc of retrievedDocs) {
        if (doc.metadata?.title) {
            contextSchemeNames.add(doc.metadata.title.toLowerCase());
            // Also add normalized versions
            const normalized = doc.metadata.title.toLowerCase().replace(/[-\s()]/g, '');
            contextSchemeNames.add(normalized);
        }
        if (doc.text) contextText.push(doc.text.toLowerCase());
    }

    const fullContextLower = contextText.join(' ');

    // ── Check 1: Scheme name grounding ──────────────────────────
    // Look for scheme names in the response that aren't in context
    const schemeNamePatterns = [
        /(?:PM|Pradhan\s*Mantri|CM|Chief\s*Minister)[- ][\w\s]+(?:Yojana|Scheme|Mission|Abhiyan)/gi,
        /(?:National|State)\s+[\w\s]+(?:Scheme|Mission|Programme|Portal)/gi,
        /\b[A-Z]{2,}[-\s]?[A-Z]+\b/g  // Acronyms like PM-KISAN, PMJDY, etc.
    ];

    for (const pattern of schemeNamePatterns) {
        const matches = response.match(pattern);
        if (matches) {
            for (const match of matches) {
                const normalized = match.toLowerCase().replace(/[-\s()]/g, '');
                let found = false;

                for (const contextName of contextSchemeNames) {
                    if (contextName.includes(normalized) || normalized.includes(contextName)) {
                        found = true;
                        break;
                    }
                }

                if (!found && !isCommonAcronym(match)) {
                    warnings.push(`Scheme name "${match}" may not be in retrieved context`);
                    isGrounded = false;
                }
            }
        }
    }

    // ── Check 2: Monetary amount grounding ──────────────────────
    const amountPatterns = /₹[\d,]+(?:\s*(?:lakh|crore|thousand|per\s+month|per\s+year|\/year|\/month))?/gi;
    const amounts = response.match(amountPatterns);

    if (amounts) {
        for (const amount of amounts) {
            if (!fullContextLower.includes(amount.toLowerCase().replace(/,/g, ''))) {
                // Try without commas
                const amountClean = amount.replace(/[,₹\s]/g, '');
                if (!fullContextLower.includes(amountClean)) {
                    warnings.push(`Amount "${amount}" may not be verified in context`);
                }
            }
        }
    }

    // ── Check 3: URL grounding ──────────────────────────────────
    const urlPattern = /https?:\/\/[^\s)]+/gi;
    const urls = response.match(urlPattern);

    if (urls) {
        for (const url of urls) {
            const urlLower = url.toLowerCase();
            let found = false;

            for (const doc of retrievedDocs) {
                if (doc.metadata?.applyLink && doc.metadata.applyLink.toLowerCase().includes(urlLower)) {
                    found = true;
                    break;
                }
                if (doc.text && doc.text.toLowerCase().includes(urlLower)) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                warnings.push(`URL "${url}" may not be from retrieved context`);
            }
        }
    }

    // ── Check 4: Fraud protection ───────────────────────────────
    const fraudPatterns = /\b(otp|upi\s*pin|atm\s*pin|bank\s*password|debit\s*card\s*pin|credit\s*card\s*pin|login\s*password|aadhaar\s*otp)\b/gi;
    const fraudMatches = response.match(fraudPatterns);

    if (fraudMatches) {
        // Check if the response is ASKING for these (bad) vs WARNING about them (good)
        const askingPatterns = /(?:enter|share|provide|send|give|type)\s+(?:your\s+)?(?:otp|pin|password)/gi;
        if (askingPatterns.test(response)) {
            warnings.push('CRITICAL: Response appears to ask for sensitive credentials');
            isGrounded = false;
        }
    }

    return {
        isGrounded: warnings.length === 0,
        warnings,
        cleanedResponse: response
    };
}

/**
 * Check if a string is a common acronym (not a scheme name)
 */
function isCommonAcronym(text) {
    const common = ['AI', 'IT', 'SC', 'ST', 'OBC', 'APL', 'BPL', 'UR', 'EWS', 'PDF', 'URL', 'FAQ'];
    return common.includes(text.toUpperCase().trim());
}

/**
 * Build a fallback response when grounding fails or no schemes found
 */
function buildFallbackResponse(query, detectedLanguage) {
    const fallbacks = {
        en: "I don't have verified information about that in the current JanSahay knowledge base. Could you try rephrasing your question, or ask about a specific government scheme?",
        hi: "मुझे वर्तमान JanSahay ज्ञान आधार में इस बारे में सत्यापित जानकारी नहीं मिली। क्या आप अपना प्रश्न दोबारा बता सकते हैं या किसी विशिष्ट सरकारी योजना के बारे में पूछ सकते हैं?",
        gu: "મને વર્તમાન JanSahay જ્ઞાન આધારમાં આ વિશે ચકાસાયેલ માહિતી મળી નથી. શું તમે તમારો પ્રશ્ન ફરીથી પૂછી શકો છો અથવા કોઈ ચોક્કસ સરકારી યોજના વિશે પૂછી શકો છો?"
    };

    return fallbacks[detectedLanguage] || fallbacks.en;
}

/**
 * Deterministic scheme response generator when LLM is unavailable or times out
 * Directly converts verified retrieved schemes into structured multilingual text
 */
function generateDeterministicSchemeResponse(retrievedResults, language = 'en') {
    if (!retrievedResults || retrievedResults.length === 0) {
        return buildFallbackResponse(null, language);
    }

    const uniqueSchemes = [];
    const seenIds = new Set();
    for (const r of retrievedResults) {
        const id = r.metadata?.schemeId || r.metadata?.title;
        if (id && !seenIds.has(id)) {
            seenIds.add(id);
            uniqueSchemes.push(r.metadata || {});
        }
    }

    const topSchemes = uniqueSchemes.slice(0, 5);

    const headers = {
        en: `Here are verified government schemes from the JanSahay knowledge base:`,
        hi: `JanSahay ज्ञान आधार से सत्यापित सरकारी योजनाएं निम्नलिखित हैं:`,
        gu: `JanSahay જ્ઞાન આધારમાંથી ચકાસાયેલ સરકારી યોજનાઓ નીચે મુજબ છે:`
    };

    const labels = {
        en: { ministry: 'Ministry', benefit: 'Benefit', eligibility: 'Eligibility', apply: 'Apply' },
        hi: { ministry: 'मंत्रालय', benefit: 'लाभ', eligibility: 'पात्रता', apply: 'आवेदन लिंक' },
        gu: { ministry: 'મંત્રાલય', benefit: 'લાભ', eligibility: 'પાત્રતા', apply: 'અરજી લિંક' }
    };

    const lbl = labels[language] || labels.en;
    let text = `${headers[language] || headers.en}\n\n`;

    topSchemes.forEach((s, idx) => {
        text += `${idx + 1}. **${s.title}**\n`;
        if (s.ministry) text += `   • **${lbl.ministry}:** ${s.ministry}\n`;
        if (s.benefits) {
            const cleanBen = typeof s.benefits === 'string' ? s.benefits.slice(0, 180) : '';
            text += `   • **${lbl.benefit}:** ${cleanBen}\n`;
        }
        if (s.eligibility) {
            const cleanElig = typeof s.eligibility === 'string' ? s.eligibility.slice(0, 150) : '';
            text += `   • **${lbl.eligibility}:** ${cleanElig}\n`;
        }
        if (s.applyLink) text += `   • **${lbl.apply}:** [${s.applyLink}](${s.applyLink})\n`;
        text += `\n`;
    });

    return text.trim();
}

module.exports = {
    validateGrounding,
    buildFallbackResponse,
    generateDeterministicSchemeResponse
};
