/* ============================================================
   RAG Service: Chunker
   Section-aware chunking for government scheme documents
   Splits each scheme into logical sections with metadata
   ============================================================ */

const crypto = require('crypto');

/**
 * Generate a deterministic hash for a chunk's content
 */
function hashContent(content) {
    return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Strip rich-text markup from application_process fields
 */
function flattenApplicationProcess(appProcess) {
    if (!appProcess || !Array.isArray(appProcess)) return '';

    return appProcess.map(mode => {
        const parts = [];
        if (mode.mode) parts.push(`Mode: ${mode.mode}`);
        if (mode.url) parts.push(`URL: ${mode.url}`);

        if (mode.process && Array.isArray(mode.process)) {
            const steps = extractTextFromRichContent(mode.process);
            if (steps) parts.push(steps);
        }

        return parts.join('\n');
    }).join('\n\n');
}

/**
 * Recursively extract text from rich-text JSON structure
 */
function extractTextFromRichContent(nodes) {
    if (!nodes) return '';
    if (typeof nodes === 'string') return nodes;

    if (Array.isArray(nodes)) {
        return nodes.map(n => extractTextFromRichContent(n)).filter(Boolean).join('\n');
    }

    if (nodes.text) return nodes.text;

    if (nodes.children) {
        return extractTextFromRichContent(nodes.children);
    }

    return '';
}

/**
 * Flatten documents_required array into readable text
 */
function flattenDocuments(docs) {
    if (!docs) return '';
    if (typeof docs === 'string') return docs;
    if (Array.isArray(docs)) {
        return docs.map((d, i) => {
            if (typeof d === 'string') return d;
            if (d.text) return d.text;
            return JSON.stringify(d);
        }).join('\n');
    }
    return '';
}

/**
 * Flatten FAQs into readable text
 */
function flattenFAQs(faqs) {
    if (!faqs || !Array.isArray(faqs)) return '';

    return faqs.map(faq => {
        const q = faq.question || faq.q || '';
        const a = faq.answer || faq.a || '';
        return `Q: ${q}\nA: ${a}`;
    }).join('\n\n');
}

/**
 * Build eligibility text from structured and summary data
 */
function buildEligibilityText(scheme) {
    const parts = [];

    if (scheme.eligibility_summary) {
        parts.push(scheme.eligibility_summary);
    }

    if (scheme.eligibility_detailed) {
        parts.push(scheme.eligibility_detailed);
    }

    const e = scheme.eligibility;
    if (e) {
        if (e.minAge != null || e.maxAge != null) {
            parts.push(`Age: ${e.minAge || 0} to ${e.maxAge || 100} years`);
        }
        if (e.gender && Array.isArray(e.gender)) {
            parts.push(`Gender: ${e.gender.join(', ')}`);
        }
        if (e.income && Array.isArray(e.income)) {
            parts.push(`Income: ${e.income.join(', ')}`);
        }
        if (e.category && Array.isArray(e.category)) {
            parts.push(`Social Category: ${e.category.join(', ')}`);
        }
        if (e.occupation && Array.isArray(e.occupation)) {
            parts.push(`Occupation: ${e.occupation.join(', ')}`);
        }
        if (e.area && Array.isArray(e.area)) {
            parts.push(`Area: ${e.area.join(', ')}`);
        }
    }

    return parts.join('\n');
}

/**
 * Build scheme metadata for embedding alongside chunks
 */
function buildMetadata(scheme) {
    return {
        schemeId: String(scheme.id),
        title: scheme.title || '',
        ministry: scheme.ministry || '',
        type: scheme.type || '',
        category: scheme.category || '',
        state: scheme.state || '',
        tags: Array.isArray(scheme.tags) ? scheme.tags : [],
        applyLink: scheme.applyLink || '',
        myschemeVerified: scheme.myscheme_verified || false,
        myschemeSlug: scheme.myscheme_slug || ''
    };
}

/**
 * Chunk a single scheme into logical sections
 * @param {Object} scheme - A scheme object from schemes.json
 * @returns {Object[]} - Array of chunk objects with text, section, metadata, hash
 */
function chunkScheme(scheme) {
    const chunks = [];
    const metadata = buildMetadata(scheme);
    const schemeName = scheme.title || `Scheme ${scheme.id}`;

    // ── Section 1: Overview ─────────────────────────────────────
    const overviewParts = [`Scheme: ${schemeName}`];
    if (scheme.ministry) overviewParts.push(`Ministry: ${scheme.ministry}`);
    if (scheme.type) overviewParts.push(`Level: ${scheme.type}`);
    if (scheme.state) overviewParts.push(`State: ${scheme.state}`);
    if (scheme.category) overviewParts.push(`Category: ${scheme.category}`);
    if (scheme.details) overviewParts.push(`\n${scheme.details}`);
    else if (scheme.benefits) overviewParts.push(`\nBenefits: ${scheme.benefits}`);

    const overviewText = overviewParts.join('\n');
    if (overviewText.length > 20) {
        chunks.push({
            text: overviewText,
            section: 'overview',
            metadata,
            hash: hashContent(overviewText)
        });
    }

    // ── Section 2: Benefits ─────────────────────────────────────
    const benefitsParts = [`Scheme: ${schemeName} - Benefits`];
    if (scheme.benefits) benefitsParts.push(scheme.benefits);
    if (scheme.benefits_detailed) benefitsParts.push(scheme.benefits_detailed);

    const benefitsText = benefitsParts.join('\n');
    if (benefitsText.length > 30) {
        chunks.push({
            text: benefitsText,
            section: 'benefits',
            metadata,
            hash: hashContent(benefitsText)
        });
    }

    // ── Section 3: Eligibility ──────────────────────────────────
    const eligText = buildEligibilityText(scheme);
    if (eligText.length > 10) {
        const fullEligText = `Scheme: ${schemeName} - Eligibility\n${eligText}`;
        chunks.push({
            text: fullEligText,
            section: 'eligibility',
            metadata,
            hash: hashContent(fullEligText)
        });
    }

    // ── Section 4: Documents Required ───────────────────────────
    const docsParts = [];
    if (scheme.documents && Array.isArray(scheme.documents)) {
        docsParts.push(scheme.documents.join(', '));
    }
    if (scheme.documents_required) {
        docsParts.push(flattenDocuments(scheme.documents_required));
    }

    const docsText = docsParts.join('\n');
    if (docsText.length > 10) {
        const fullDocsText = `Scheme: ${schemeName} - Documents Required\n${docsText}`;
        chunks.push({
            text: fullDocsText,
            section: 'documents',
            metadata,
            hash: hashContent(fullDocsText)
        });
    }

    // ── Section 5: Application Process ──────────────────────────
    const appText = flattenApplicationProcess(scheme.application_process);
    if (appText.length > 10) {
        const fullAppText = `Scheme: ${schemeName} - Application Process\n${appText}`;
        chunks.push({
            text: fullAppText,
            section: 'application',
            metadata,
            hash: hashContent(fullAppText)
        });
    }

    // ── Section 6: FAQs ─────────────────────────────────────────
    const faqText = flattenFAQs(scheme.faqs);
    if (faqText.length > 10) {
        const fullFaqText = `Scheme: ${schemeName} - Frequently Asked Questions\n${faqText}`;
        chunks.push({
            text: fullFaqText,
            section: 'faqs',
            metadata,
            hash: hashContent(fullFaqText)
        });
    }

    // ── Section 7: References / Sources ─────────────────────────
    if (scheme.references && Array.isArray(scheme.references) && scheme.references.length > 0) {
        const refsText = scheme.references.map(r => `${r.title || 'Source'}: ${r.url || ''}`).join('\n');
        const fullRefsText = `Scheme: ${schemeName} - Official Sources\n${refsText}`;
        chunks.push({
            text: fullRefsText,
            section: 'references',
            metadata,
            hash: hashContent(fullRefsText)
        });
    }

    return chunks;
}

/**
 * Chunk all schemes from the knowledge base
 * @param {Object[]} schemes - Array of scheme objects
 * @returns {Object[]} - Array of all chunks across all schemes
 */
function chunkAllSchemes(schemes) {
    const allChunks = [];
    let chunkId = 0;

    for (const scheme of schemes) {
        const schemeChunks = chunkScheme(scheme);
        for (const chunk of schemeChunks) {
            chunk.chunkId = `chunk_${chunkId++}`;
            allChunks.push(chunk);
        }
    }

    console.log(`[Chunker] Created ${allChunks.length} chunks from ${schemes.length} schemes`);

    // Section distribution
    const sectionCounts = {};
    for (const c of allChunks) {
        sectionCounts[c.section] = (sectionCounts[c.section] || 0) + 1;
    }
    console.log('[Chunker] Section distribution:', sectionCounts);

    return allChunks;
}

module.exports = {
    chunkScheme,
    chunkAllSchemes,
    hashContent
};
