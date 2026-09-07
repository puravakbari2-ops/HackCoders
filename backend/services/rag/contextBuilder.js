/* ============================================================
   RAG Service: Context Builder
   Constructs grounded LLM prompts from retrieved documents
   ============================================================ */

const MAX_CONTEXT_TOKENS = 6000; // Approximate token budget for context

/**
 * Build a grounded system prompt with retrieved context
 * @param {Object[]} retrievedDocs - Re-ranked retrieval results
 * @param {Object} query - Structured query
 * @param {string} detectedLanguage - User's detected language (en/hi/gu)
 * @param {Object} [userProfile] - User profile info
 * @param {boolean} [isDetailQuery=false] - If true, adds anti-repetition instruction (for detail intents)
 * @returns {Object} - { systemPrompt, contextSummary }
 */
function buildContext(retrievedDocs, query, detectedLanguage = 'en', userProfile = null, isDetailQuery = false) {
    const languageInstruction = getLanguageInstruction(detectedLanguage);

    // Build the verified context block
    const contextBlocks = [];

    for (let i = 0; i < retrievedDocs.length; i++) {
        const doc = retrievedDocs[i];
        const meta = doc.metadata || {};

        const block = [];
        block.push(`[Document ${i + 1}]`);
        if (meta.title) block.push(`Scheme: ${meta.title}`);
        if (meta.section) block.push(`Section: ${meta.section}`);
        if (meta.ministry) block.push(`Ministry: ${meta.ministry}`);
        if (meta.state) block.push(`State: ${meta.state}`);
        if (meta.category) block.push(`Category: ${meta.category}`);
        if (meta.applyLink) block.push(`Official Link: ${meta.applyLink}`);
        if (meta.myschemeVerified) block.push(`Source: myScheme (Verified)`);

        block.push('');
        block.push(doc.text || '');
        block.push('');
        block.push(`Confidence: ${(doc.rerankScore || doc.score || 0).toFixed(3)}`);
        block.push('---');

        contextBlocks.push(block.join('\n'));
    }

    const contextText = contextBlocks.join('\n\n');

    // Build the profile context if available
    let profileContext = '';
    if (userProfile) {
        const profileParts = [];
        if (userProfile.age) profileParts.push(`Age: ${userProfile.age}`);
        if (userProfile.gender) profileParts.push(`Gender: ${userProfile.gender}`);
        if (userProfile.state) profileParts.push(`State: ${userProfile.state}`);
        if (userProfile.occupation) profileParts.push(`Occupation: ${userProfile.occupation}`);
        if (userProfile.income) profileParts.push(`Income: ${userProfile.income}`);
        if (userProfile.education) profileParts.push(`Education: ${userProfile.education}`);
        if (userProfile.category) profileParts.push(`Social Category: ${userProfile.category}`);

        if (profileParts.length > 0) {
            profileContext = `\nUSER PROFILE:\n${profileParts.join('\n')}\n`;
        }
    }

    // Anti-repetition rule for SCHEME_DETAILS / APPLICATION_PROCESS / DOCUMENTS / CHECK_ELIGIBILITY intents
    const detailInstruction = isDetailQuery ? `
11. DETAIL-RESPONSE MODE: The user is asking for specific information about ONE scheme.
    - DO NOT re-list all schemes or provide a numbered scheme list.
    - Focus ONLY on the FIRST document in the verified context (the single best match).
    - Provide a detailed, focused answer with: overview, key benefits, eligibility, how to apply, required documents.
    - Mention the official link from the verified context.
    - Keep the answer structured but concise. No bullet-point scheme listing.` : '';

    const systemPrompt = `You are JanSahay AI, an accurate government scheme assistant for Indian citizens.

CRITICAL RULES:
1. Answer ONLY using the VERIFIED CONTEXT provided below.
2. NEVER invent or fabricate scheme names, benefits, amounts, eligibility criteria, documents, deadlines, application fees, ministry names, department names, application URLs, or government statistics.
3. If the answer is NOT contained in the verified context, say: "I don't have verified information about that in the current JanSahay knowledge base."
4. If only PARTIAL information is available, clearly state what is known and what is unavailable.
5. Keep official scheme names exactly as written (e.g., PM-KISAN stays PM-KISAN even when answering in Hindi/Gujarati).
6. Include source information when available (official website links).
7. Keep answers simple, clear, concise, and useful. Avoid huge paragraphs.
8. NEVER ask for OTP, PIN, password, UPI PIN, bank credentials, or any authentication information. If the user shares these, warn them immediately.
9. When showing scheme benefits, always mention if this is from verified data.
10. For eligibility questions, only state criteria that are in the retrieved context.${detailInstruction}

${languageInstruction}
${profileContext}
═══════════════════════════════════════════════════
VERIFIED CONTEXT (from JanSahay Knowledge Base):
═══════════════════════════════════════════════════

${contextText}

═══════════════════════════════════════════════════
END OF VERIFIED CONTEXT
═══════════════════════════════════════════════════

Remember: If information is not in the verified context above, DO NOT GUESS. Say you don't have that information.`;


    // Build a summary for debug/logging
    const contextSummary = {
        documentsUsed: retrievedDocs.length,
        schemes: [...new Set(retrievedDocs.map(d => d.metadata?.title).filter(Boolean))],
        sections: [...new Set(retrievedDocs.map(d => d.section).filter(Boolean))],
        avgConfidence: retrievedDocs.length > 0
            ? (retrievedDocs.reduce((sum, d) => sum + (d.rerankScore || d.score || 0), 0) / retrievedDocs.length).toFixed(3)
            : 0,
        language: detectedLanguage
    };

    return { systemPrompt, contextSummary };
}

/**
 * Build context for eligibility checking
 */
function buildEligibilityContext(scheme, userProfile) {
    const parts = [];
    parts.push(`Scheme: ${scheme.title || scheme.metadata?.title || 'Unknown'}`);

    if (scheme.eligibility_summary) parts.push(`Eligibility Summary: ${scheme.eligibility_summary}`);
    if (scheme.eligibility_detailed) parts.push(`Detailed Eligibility: ${scheme.eligibility_detailed}`);

    const e = scheme.eligibility || {};
    if (e.minAge != null) parts.push(`Age Range: ${e.minAge}-${e.maxAge} years`);
    if (e.gender) parts.push(`Gender: ${Array.isArray(e.gender) ? e.gender.join(', ') : e.gender}`);
    if (e.income) parts.push(`Income: ${Array.isArray(e.income) ? e.income.join(', ') : e.income}`);
    if (e.occupation) parts.push(`Occupation: ${Array.isArray(e.occupation) ? e.occupation.join(', ') : e.occupation}`);
    if (e.category) parts.push(`Social Category: ${Array.isArray(e.category) ? e.category.join(', ') : e.category}`);
    if (e.area) parts.push(`Area: ${Array.isArray(e.area) ? e.area.join(', ') : e.area}`);

    return parts.join('\n');
}

/**
 * Get language-specific instructions
 */
function getLanguageInstruction(lang) {
    switch (lang) {
        case 'hi':
            return `STRICT LANGUAGE ENFORCEMENT:
- Respond ONLY in Hindi using Devanagari script (हिन्दी).
- DO NOT reply in Gujarati, English, or any unsupported language.
- DO NOT mix languages.
- EXCEPTION: Keep official scheme names in their exact verified English/canonical title (e.g. "PM-KISAN Samman Nidhi", "National Scholarship Portal").
- Translate all explanatory sentences, benefits, and eligibility into clear, polite Hindi.`;
        case 'gu':
            return `STRICT LANGUAGE ENFORCEMENT:
- Respond ONLY in Gujarati using Gujarati script (ગુજરાતી).
- DO NOT reply in Hindi, English, or any unsupported language.
- DO NOT mix languages.
- EXCEPTION: Keep official scheme names in their exact verified English/canonical title (e.g. "PM-KISAN Samman Nidhi", "National Scholarship Portal").
- Translate all explanatory sentences, benefits, and eligibility into clear, polite Gujarati.`;
        case 'en':
        default:
            return `STRICT LANGUAGE ENFORCEMENT:
- Respond ONLY in clear, citizen-friendly English.
- DO NOT use Hindi or Gujarati words except official scheme proper names.`;
    }
}

/**
 * Build context for scheme comparison
 */
function buildComparisonContext(schemes) {
    return schemes.map((s, i) => {
        const parts = [`[Scheme ${i + 1}]: ${s.title || 'Unknown'}`];
        if (s.benefits) parts.push(`Benefits: ${s.benefits}`);
        if (s.eligibility_summary) parts.push(`Eligibility: ${s.eligibility_summary}`);
        if (s.state) parts.push(`State: ${s.state}`);
        if (s.documents && Array.isArray(s.documents)) parts.push(`Documents: ${s.documents.join(', ')}`);
        if (s.applyLink) parts.push(`Apply: ${s.applyLink}`);
        return parts.join('\n');
    }).join('\n\n---\n\n');
}

module.exports = {
    buildContext,
    buildEligibilityContext,
    buildComparisonContext,
    getLanguageInstruction
};
