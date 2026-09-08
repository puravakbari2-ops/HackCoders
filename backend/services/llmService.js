/* ============================================================
   JanSahay AI — LLM Service (Google Gemini Integration)
   Evidence-based reasoning layer with strict anti-hallucination
   ============================================================ */

const { GoogleGenerativeAI } = require('@google/generative-ai');

class LLMService {
    constructor() {
        this.genAI      = null;
        this.model       = null;
        this.isReady     = false;
        this.modelName   = process.env.LLM_MODEL || 'gemini-3.5-flash-lite';
    }

    /* ── Initialize with API Key ──────────────────────────── */
    initialize(apiKey) {
        if (!apiKey || apiKey.trim() === '') {
            console.log('   ⚠️  No GEMINI_API_KEY configured — LLM layer disabled, using template fallback');
            this.isReady = false;
            return false;
        }

        this.modelName = process.env.LLM_MODEL || this.modelName || 'gemini-3.5-flash-lite';

        try {
            this.genAI  = new GoogleGenerativeAI(apiKey);
            this.model  = this.genAI.getGenerativeModel({
                model: this.modelName,
                generationConfig: {
                    temperature:     0.2,       // Low creativity — factual responses
                    topP:            0.8,
                    topK:            40,
                    maxOutputTokens: 4096,
                    responseMimeType: 'application/json'
                }
            });
            this.isReady = true;
            console.log(`   🤖 LLM Service initialized with ${this.modelName}`);
            return true;
        } catch (err) {
            console.error('   ❌ LLM Service initialization failed:', err.message);
            this.isReady = false;
            return false;
        }
    }

    /* ── System Prompt (Anti-Hallucination) ────────────────── */
    _buildSystemPrompt() {
        return `You are JanSahay AI, a Government Scheme Eligibility Advisor for India.

CRITICAL RULES — FOLLOW STRICTLY:
1. You ONLY use information from the PROVIDED SCHEME DATA below. NEVER invent, fabricate, or hallucinate scheme names, benefits, eligibility criteria, or application details.
2. If a scheme's data is incomplete or you're unsure, say "Based on available data" and recommend the user verify at the official portal.
3. Always cite the scheme name when making claims about benefits or eligibility.
4. Structure your response as valid JSON matching the required schema.
5. Relevance scores must be between 60-99. Score 90+ only for near-perfect profile matches.
6. Match reasons must reference specific user profile fields (age, income, occupation, state, etc.) and how they align with scheme criteria.
7. NEVER recommend schemes whose eligibility criteria clearly exclude the user's profile.
8. For each recommendation, list which eligibility criteria the user meets and which are partial/unverified.
9. If no schemes match well, return an empty recommendations array — do NOT force poor matches.
10. Keep explanations concise but informative — max 2 sentences per field.
11. STRICT FILTER HONORING: All provided schemes have been pre-filtered based on the user's active filters. You must ONLY consider and recommend schemes from the RETRIEVED SCHEME DATA provided below. NEVER suggest or hallucinate any schemes outside this pre-filtered context.`;
    }

    /* ── Generate Recommendations with Explanations ──────── */
    async generateRecommendations(profile, retrievedChunks, schemesMap, filters = null) {
        if (!this.isReady) {
            return this._templateFallback(profile, retrievedChunks, schemesMap, filters);
        }

        try {
            // Group chunks by scheme
            const schemeChunks = this._groupChunksByScheme(retrievedChunks);

            // Build context from retrieved chunks
            const contextBlocks = [];
            for (const [schemeId, chunks] of Object.entries(schemeChunks)) {
                const scheme = schemesMap[schemeId];
                if (!scheme) continue;

                let block = `\n--- SCHEME: ${scheme.title} (ID: ${schemeId}) ---\n`;
                block += `Type: ${scheme.type} | Ministry: ${scheme.ministry} | Category: ${scheme.category}\n`;
                block += `State: ${scheme.state || 'All India'}\n`;

                for (const chunk of chunks) {
                    block += `[${chunk.section.toUpperCase()}]: ${chunk.chunk.text.substring(0, 800)}\n`;
                }

                // Add structured eligibility if available
                if (scheme.eligibility) {
                    const e = scheme.eligibility;
                    block += `[ELIGIBILITY_STRUCTURED]: Age: ${e.minAge}-${e.maxAge} | Gender: ${(e.gender || []).join(',')} | Income: ${(e.income || []).join(',')} | Occupation: ${(e.occupation || []).join(',')} | Category: ${(e.category || []).join(',')}\n`;
                }

                contextBlocks.push(block);
            }

            // Build user profile description
            const profileDesc = this._describeProfile(profile);
            const filterDesc = this._describeFilters(filters);

            const prompt = `${this._buildSystemPrompt()}

USER PROFILE:
${profileDesc}

USER ACTIVE FILTERS (Pre-RAG):
${filterDesc}

RETRIEVED SCHEME DATA (from official schemes.json knowledge base - pre-filtered):
${contextBlocks.join('\n')}

TASK: Analyze the retrieved scheme data against the user profile and active filters. For each scheme that genuinely matches, provide a recommendation with evidence-based reasoning. Return ONLY schemes from the retrieved list.

Respond with this exact JSON structure:
{
  "recommendations": [
    {
      "schemeId": "string - the scheme ID",
      "title": "string - exact scheme title from data",
      "relevanceScore": "number 60-99",
      "matchReason": "string - 1-2 sentences explaining WHY this scheme matches the user's specific profile",
      "keyBenefits": ["string - top 2-3 benefits relevant to this user"],
      "eligibilityNotes": "string - which criteria the user meets",
      "evidenceSections": ["string - which sections (overview/details/benefits/eligibility) support this match"]
    }
  ],
  "summary": "string - 1-2 sentence overview of findings for this profile",
  "totalAnalyzed": "number - how many schemes were analyzed",
  "disclaimer": "Recommendations based on available official scheme data. Please verify eligibility at the respective official portals or myScheme.gov.in."
}`;

            const result = await this.model.generateContent(prompt);
            const text   = result.response.text();

            // Parse JSON response
            let parsed;
            try {
                parsed = JSON.parse(text);
            } catch (parseErr) {
                // Try extracting JSON from markdown code blocks
                const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
                if (jsonMatch) {
                    parsed = JSON.parse(jsonMatch[1].trim());
                } else {
                    // Try finding JSON object in text
                    const startIdx = text.indexOf('{');
                    const endIdx   = text.lastIndexOf('}');
                    if (startIdx !== -1 && endIdx !== -1) {
                        parsed = JSON.parse(text.substring(startIdx, endIdx + 1));
                    } else {
                        throw new Error('Could not parse LLM response as JSON');
                    }
                }
            }

            // Validate and sanitize
            return this._sanitizeResponse(parsed, schemesMap);

        } catch (err) {
            console.error('LLM generation error:', err.message);
            return this._templateFallback(profile, retrievedChunks, schemesMap);
        }
    }

    /* ── Chat Query (Natural Language) ────────────────────── */
    async chatQuery(userMessage, profile, retrievedChunks, schemesMap) {
        if (!this.isReady) {
            return this._chatTemplateFallback(userMessage, retrievedChunks, schemesMap);
        }

        try {
            const schemeChunks = this._groupChunksByScheme(retrievedChunks);
            const contextBlocks = [];

            for (const [schemeId, chunks] of Object.entries(schemeChunks)) {
                const scheme = schemesMap[schemeId];
                if (!scheme) continue;

                let block = `\n--- ${scheme.title} (ID: ${schemeId}) ---\n`;
                for (const chunk of chunks) {
                    block += `[${chunk.section.toUpperCase()}]: ${chunk.chunk.text.substring(0, 600)}\n`;
                }
                contextBlocks.push(block);
            }

            const profileDesc = profile ? this._describeProfile(profile) : 'No user profile available.';

            const chatModel = this.genAI.getGenerativeModel({
                model: this.modelName,
                generationConfig: {
                    temperature:     0.3,
                    maxOutputTokens: 2048,
                    responseMimeType: 'application/json'
                }
            });

            const prompt = `${this._buildSystemPrompt()}

USER PROFILE: ${profileDesc}

USER QUESTION: "${userMessage}"

RETRIEVED SCHEME DATA:
${contextBlocks.join('\n')}

Answer the user's question using ONLY the provided scheme data. Be helpful, concise, and factual.

Respond with this JSON:
{
  "answer": "string - your helpful response in markdown format (use **bold**, bullet points, etc.)",
  "mentionedSchemes": [
    {
      "schemeId": "string",
      "title": "string",
      "relevance": "string - brief note on why mentioned"
    }
  ],
  "suggestFindSchemes": "boolean - true if user should use Find Schemes feature for better results"
}`;

            const result = await chatModel.generateContent(prompt);
            const text   = result.response.text();

            let parsed;
            try {
                parsed = JSON.parse(text);
            } catch {
                const startIdx = text.indexOf('{');
                const endIdx   = text.lastIndexOf('}');
                if (startIdx !== -1 && endIdx !== -1) {
                    parsed = JSON.parse(text.substring(startIdx, endIdx + 1));
                } else {
                    throw new Error('Could not parse chat response');
                }
            }

            return {
                success: true,
                answer:  parsed.answer || 'I found some relevant information but couldn\'t format it properly. Please try rephrasing your question.',
                mentionedSchemes: parsed.mentionedSchemes || [],
                suggestFindSchemes: parsed.suggestFindSchemes || false,
                source: 'gemini-llm'
            };

        } catch (err) {
            console.error('LLM chat error:', err.message);
            return this._chatTemplateFallback(userMessage, retrievedChunks, schemesMap);
        }
    }

    /* ── Template Fallback (no LLM) ───────────────────────── */
    _templateFallback(profile, retrievedChunks, schemesMap, filters = null) {
        const schemeChunks = this._groupChunksByScheme(retrievedChunks);
        const recommendations = [];

        for (const [schemeId, chunks] of Object.entries(schemeChunks)) {
            const scheme = schemesMap[schemeId];
            if (!scheme) continue;

            const avgScore = chunks.reduce((sum, c) => sum + (c.combinedScore || c.score || 0), 0) / chunks.length;
            const normalizedScore = Math.min(Math.round(60 + avgScore * 8), 98);

            // Template-based match reason
            const reasons = [];
            if (profile.occupation && scheme.eligibility?.occupation?.includes(profile.occupation)) {
                reasons.push(`matches your occupation (${profile.occupation})`);
            }
            if (profile.gender && scheme.eligibility?.gender?.includes(profile.gender)) {
                reasons.push(`open to ${profile.gender} applicants`);
            }
            if (profile.state) {
                const sState = (scheme.state || '').toLowerCase();
                if (sState === 'all india' || sState.includes(profile.state.toLowerCase())) {
                    reasons.push(`available in your state`);
                }
            }
            if (profile.category && scheme.eligibility?.category?.includes(profile.category)) {
                reasons.push(`includes ${profile.category.toUpperCase()} category`);
            }

            recommendations.push({
                schemeId,
                title:           scheme.title,
                relevanceScore:  normalizedScore,
                matchReason:     reasons.length > 0
                    ? `This scheme ${reasons.join(', ')}.`
                    : `This scheme may be relevant based on your profile.`,
                keyBenefits:     [scheme.benefits || 'See scheme details for benefits'],
                eligibilityNotes: scheme.eligibility_summary || 'Check official portal for detailed eligibility.',
                evidenceSections: chunks.map(c => c.section)
            });
        }

        recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);

        return {
            recommendations: recommendations.slice(0, 15),
            summary:         `Found ${recommendations.length} potentially relevant schemes for your profile.`,
            totalAnalyzed:   Object.keys(schemeChunks).length,
            disclaimer:      'Recommendations generated using template matching. For AI-enhanced insights, configure a Gemini API key.',
            source:          'template-fallback'
        };
    }

    /* ── Chat Template Fallback ───────────────────────────── */
    _chatTemplateFallback(userMessage, retrievedChunks, schemesMap) {
        const schemeChunks = this._groupChunksByScheme(retrievedChunks);
        const topSchemes   = Object.entries(schemeChunks).slice(0, 5);

        let answer = `Based on your query about **"${userMessage}"**, here are some relevant schemes:\n\n`;

        const mentioned = [];
        for (const [schemeId, chunks] of topSchemes) {
            const scheme = schemesMap[schemeId];
            if (!scheme) continue;

            answer += `🏛️ **${scheme.title}**\n`;
            answer += `${scheme.benefits || scheme.eligibility_summary || 'See details for more information.'}\n\n`;
            mentioned.push({ schemeId, title: scheme.title, relevance: 'Keyword match' });
        }

        answer += `\n💡 Use the **Find Schemes For You** button for personalized, profile-based recommendations!`;

        return {
            success: true,
            answer,
            mentionedSchemes:   mentioned,
            suggestFindSchemes: true,
            source:             'template-fallback'
        };
    }

    /* ── Helper: Group chunks by scheme ID ────────────────── */
    _groupChunksByScheme(chunks) {
        const groups = {};
        for (const chunk of chunks) {
            const id = chunk.schemeId;
            if (!groups[id]) groups[id] = [];
            groups[id].push(chunk);
        }
        return groups;
    }

    /* ── Helper: Describe user profile as text ───────────── */
    _describeProfile(profile) {
        const parts = [];
        if (profile.gender) parts.push(`Gender: ${profile.gender}`);
        if (profile.age)    parts.push(`Age: ${profile.age} years`);
        if (profile.state)  parts.push(`State: ${profile.state}`);
        if (profile.area)   parts.push(`Area: ${profile.area}`);
        if (profile.category) parts.push(`Social Category: ${profile.category.toUpperCase()}`);
        if (profile.income) parts.push(`Income: ${profile.income}`);
        if (profile.occupation) parts.push(`Occupation: ${profile.occupation}`);
        if (profile.education) parts.push(`Education: ${profile.education}`);
        if (profile.maritalStatus) parts.push(`Marital Status: ${profile.maritalStatus}`);
        if (profile.disability) parts.push(`Disability: ${profile.disability}`);
        if (profile.minority) parts.push(`Minority: ${profile.minority}`);
        return parts.join(' | ') || 'No profile provided';
    }

    /* ── Helper: Describe active filters as text ─────────── */
    _describeFilters(filters) {
        if (!filters || typeof filters !== 'object' || Object.keys(filters).length === 0) return 'No active filters applied';
        const parts = [];
        if (filters.state) parts.push(`State: ${Array.isArray(filters.state) ? filters.state.join(', ') : filters.state}`);
        if (filters.gender) parts.push(`Gender: ${filters.gender}`);
        if (filters.age !== undefined && filters.age !== null) parts.push(`Age: ${filters.age}`);
        if (filters.ageMin !== undefined && filters.ageMin !== null) parts.push(`Min Age: ${filters.ageMin}`);
        if (filters.ageMax !== undefined && filters.ageMax !== null) parts.push(`Max Age: ${filters.ageMax}`);
        if (filters.category) parts.push(`Category: ${Array.isArray(filters.category) ? filters.category.join(', ') : filters.category}`);
        if (filters.income) parts.push(`Income: ${Array.isArray(filters.income) ? filters.income.join(', ') : filters.income}`);
        if (filters.occupation) parts.push(`Occupation: ${Array.isArray(filters.occupation) ? filters.occupation.join(', ') : filters.occupation}`);
        if (filters.schemeCategory) parts.push(`Scheme Category: ${Array.isArray(filters.schemeCategory) ? filters.schemeCategory.join(', ') : filters.schemeCategory}`);
        if (filters.type) parts.push(`Type: ${filters.type}`);
        return parts.join(' | ') || 'No active filters applied';
    }

    /* ── Helper: Sanitize LLM response ───────────────────── */
    _sanitizeResponse(parsed, schemesMap) {
        if (!parsed || !parsed.recommendations) {
            return {
                recommendations: [],
                summary:        'No recommendations could be generated.',
                totalAnalyzed:  0,
                disclaimer:     'Please try again or use the Find Schemes feature.',
                source:         'gemini-llm'
            };
        }

        // Validate each recommendation references a real scheme
        const validRecs = parsed.recommendations.filter(rec => {
            if (!rec.schemeId) return false;
            const scheme = schemesMap[rec.schemeId];
            if (!scheme) return false;
            // Force correct title (anti-hallucination)
            rec.title = scheme.title;
            // Clamp score
            rec.relevanceScore = Math.min(Math.max(parseInt(rec.relevanceScore) || 70, 60), 99);
            return true;
        });

        return {
            recommendations: validRecs,
            summary:        parsed.summary || `Found ${validRecs.length} relevant schemes.`,
            totalAnalyzed:  parsed.totalAnalyzed || validRecs.length,
            disclaimer:     parsed.disclaimer || 'Verify eligibility at official portals.',
            source:         'gemini-llm'
        };
    }

    /* ── Health Check ─────────────────────────────────────── */
    getStatus() {
        return {
            ready:     this.isReady,
            model:     this.modelName,
            provider:  'Google Gemini'
        };
    }
}

module.exports = new LLMService();
