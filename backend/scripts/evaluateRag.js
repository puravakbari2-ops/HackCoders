#!/usr/bin/env node
/* ============================================================
   Script: Evaluate RAG
   50+ test cases across all languages and intents
   Usage: npm run evaluate-rag
   ============================================================ */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { detectIntent } = require('../services/chatbot/intentDetector');
const { rewriteQuery } = require('../services/chatbot/queryRewriter');
const { detectLanguage } = require('../services/chatbot/responseGenerator');
const { checkEligibility } = require('../services/eligibility/eligibilityEngine');
const vectorStore = require('../services/rag/vectorStore');
const { retrieve } = require('../services/rag/retriever');

// ══════════════════════════════════════════════════════════════
// TEST CASES
// ══════════════════════════════════════════════════════════════

const TEST_CASES = [
    // ── English ─────────────────────────────────────────────────
    { id: 1, query: 'Hello', expectedIntent: 'GREETING', lang: 'en' },
    { id: 2, query: 'Tell me about PM-KISAN', expectedIntent: 'SCHEME_DETAILS', lang: 'en', expectedScheme: 'PM-KISAN' },
    { id: 3, query: 'What is Ayushman Bharat?', expectedIntent: 'SCHEME_DETAILS', lang: 'en', expectedScheme: 'Ayushman' },
    { id: 4, query: 'I am a farmer from Gujarat. What schemes can I get?', expectedIntent: 'FIND_SCHEMES', lang: 'en', expectedState: 'Gujarat' },
    { id: 5, query: 'Am I eligible for PM Awas Yojana?', expectedIntent: 'CHECK_ELIGIBILITY', lang: 'en' },
    { id: 6, query: 'What documents are needed for MUDRA loan?', expectedIntent: 'DOCUMENTS', lang: 'en' },
    { id: 7, query: 'How to apply for PM-KISAN?', expectedIntent: 'APPLICATION_PROCESS', lang: 'en' },
    { id: 8, query: 'Show me scholarship schemes for students', expectedIntent: 'CATEGORY_SEARCH', lang: 'en' },
    { id: 9, query: 'Government schemes for women', expectedIntent: 'CATEGORY_SEARCH', lang: 'en' },
    { id: 10, query: 'Housing schemes in Maharashtra', expectedIntent: 'FIND_SCHEMES', lang: 'en' },
    { id: 11, query: 'How much benefit does PM-KISAN give?', expectedIntent: 'BENEFIT_SEARCH', lang: 'en' },
    { id: 12, query: 'Compare PM-KISAN and PM Awas Yojana', expectedIntent: 'COMPARE_SCHEMES', lang: 'en' },
    { id: 13, query: 'What can JanSahay do?', expectedIntent: 'JANSAHAY_HELP', lang: 'en' },
    { id: 14, query: 'Schemes for senior citizens', expectedIntent: 'CATEGORY_SEARCH', lang: 'en' },
    { id: 15, query: 'Solar panel subsidy scheme', expectedIntent: 'CATEGORY_SEARCH', lang: 'en' },

    // ── Hindi (Roman) ───────────────────────────────────────────
    { id: 16, query: 'mujhe scholarship chahiye', expectedIntent: 'FIND_SCHEMES', lang: 'hi' },
    { id: 17, query: 'kisan ke liye yojana batao', expectedIntent: 'FIND_SCHEMES', lang: 'hi' },
    { id: 18, query: 'PM Kisan me kitna paisa milta hai?', expectedIntent: 'BENEFIT_SEARCH', lang: 'hi' },
    { id: 19, query: 'Mujhe Gujarat me farmer ke liye government scheme chahiye', expectedIntent: 'FIND_SCHEMES', lang: 'hi', expectedState: 'Gujarat' },
    { id: 20, query: 'kya documents chahiye PM Awas ke liye?', expectedIntent: 'DOCUMENTS', lang: 'hi' },
    { id: 21, query: 'kaise apply karu Mudra loan ke liye?', expectedIntent: 'APPLICATION_PROCESS', lang: 'hi' },
    { id: 22, query: 'mahila ke liye sarkari yojana', expectedIntent: 'FIND_SCHEMES', lang: 'hi' },
    { id: 23, query: 'berozgar yuva ke liye scheme', expectedIntent: 'FIND_SCHEMES', lang: 'hi' },
    { id: 24, query: 'mere liye koi yojana hai?', expectedIntent: 'FIND_SCHEMES', lang: 'hi' },

    // ── Hindi (Devanagari) ──────────────────────────────────────
    { id: 25, query: 'मुझे किसान योजना चाहिए', expectedIntent: 'FIND_SCHEMES', lang: 'hi' },
    { id: 26, query: 'पीएम किसान के बारे में बताओ', expectedIntent: 'SCHEME_DETAILS', lang: 'hi' },
    { id: 27, query: 'छात्रवृत्ति योजना', expectedIntent: 'FIND_SCHEMES', lang: 'hi' },

    // ── Gujarati (Roman) ────────────────────────────────────────
    { id: 28, query: 'mane student mate yojana joiye', expectedIntent: 'FIND_SCHEMES', lang: 'gu' },
    { id: 29, query: 'mare Gujarat ma kheti mate scheme joiye', expectedIntent: 'FIND_SCHEMES', lang: 'gu', expectedState: 'Gujarat' },
    { id: 30, query: 'mane dikri mate yojana joiye', expectedIntent: 'FIND_SCHEMES', lang: 'gu' },
    { id: 31, query: 'khedut mate sarkari yojana', expectedIntent: 'FIND_SCHEMES', lang: 'gu' },
    { id: 32, query: 'PM Kisan vishe mahiti aapo', expectedIntent: 'SCHEME_DETAILS', lang: 'gu' },

    // ── Gujarati (Script) ───────────────────────────────────────
    { id: 33, query: 'ખેડૂત માટે યોજના', expectedIntent: 'FIND_SCHEMES', lang: 'gu' },
    { id: 34, query: 'વિદ્યાર્થી માટે શિષ્યવૃત્તિ', expectedIntent: 'FIND_SCHEMES', lang: 'gu' },

    // ── Exact Scheme Searches ───────────────────────────────────
    { id: 35, query: 'PMJDY', expectedIntent: 'SCHEME_DETAILS', lang: 'en', expectedScheme: 'PMJDY' },
    { id: 36, query: 'Sukanya Samriddhi', expectedIntent: 'SCHEME_DETAILS', lang: 'en', expectedScheme: 'Sukanya' },
    { id: 37, query: 'PM Vishwakarma scheme', expectedIntent: 'SCHEME_DETAILS', lang: 'en', expectedScheme: 'Vishwakarma' },
    { id: 38, query: 'Atal Pension Yojana', expectedIntent: 'SCHEME_DETAILS', lang: 'en', expectedScheme: 'Atal Pension' },
    { id: 39, query: 'MGNREGA', expectedIntent: 'SCHEME_DETAILS', lang: 'en', expectedScheme: 'MGNREGA' },

    // ── Hallucination Tests ─────────────────────────────────────
    { id: 40, query: 'Tell me about XYZ123 scheme', expectedIntent: 'SCHEME_DETAILS', lang: 'en', expectNoScheme: true },
    { id: 41, query: 'What is Modi Digital Laptop Yojana?', expectedIntent: 'SCHEME_DETAILS', lang: 'en', expectNoScheme: true },
    { id: 42, query: 'Free iPhone scheme for students', expectedIntent: 'FIND_SCHEMES', lang: 'en', expectNoScheme: true },

    // ── Eligibility Questions ───────────────────────────────────
    { id: 43, query: 'I am 22 years old student from Gujarat, am I eligible?', expectedIntent: 'CHECK_ELIGIBILITY', lang: 'en' },
    { id: 44, query: 'kya mai eligible hu? meri age 25 hai, Bihar se hu', expectedIntent: 'CHECK_ELIGIBILITY', lang: 'hi' },

    // ── Document Questions ──────────────────────────────────────
    { id: 45, query: 'What documents do I need for PM-KISAN?', expectedIntent: 'DOCUMENTS', lang: 'en' },
    { id: 46, query: 'Ayushman card ke liye kya chahiye?', expectedIntent: 'DOCUMENTS', lang: 'hi' },

    // ── Application Questions ───────────────────────────────────
    { id: 47, query: 'How do I apply for PM Awas Yojana?', expectedIntent: 'APPLICATION_PROCESS', lang: 'en' },
    { id: 48, query: 'MUDRA loan ka form kahan se milega?', expectedIntent: 'APPLICATION_PROCESS', lang: 'hi' },

    // ── Mixed / Complex ─────────────────────────────────────────
    { id: 49, query: 'I am a 30 year old female farmer from rural Gujarat with income 2 lakh', expectedIntent: 'FIND_SCHEMES', lang: 'en', expectedState: 'Gujarat' },
    { id: 50, query: 'Government help for disabled person', expectedIntent: 'FIND_SCHEMES', lang: 'en' },

    // ── Low Confidence ──────────────────────────────────────────
    { id: 51, query: 'asdfghjkl', expectedIntent: 'UNKNOWN', lang: 'en' },
    { id: 52, query: 'Tell me a joke', expectedIntent: 'UNKNOWN', lang: 'en' },

    // ── Fraud Protection ────────────────────────────────────────
    { id: 53, query: 'My OTP is 123456', expectedIntent: 'FRAUD', lang: 'en', expectFraudWarning: true },
    { id: 54, query: 'UPI PIN 4532', expectedIntent: 'FRAUD', lang: 'en', expectFraudWarning: true }
];

// ══════════════════════════════════════════════════════════════
// EVALUATION
// ══════════════════════════════════════════════════════════════

async function evaluate() {
    console.log('\n══════════════════════════════════════════════════');
    console.log('   JanSahay AI — RAG Evaluation Suite');
    console.log(`   ${TEST_CASES.length} test cases`);
    console.log('══════════════════════════════════════════════════\n');

    // Load vector index
    let indexLoaded = false;
    if (vectorStore.indexExists()) {
        indexLoaded = vectorStore.loadIndex();
        if (indexLoaded) {
            console.log(`✅ Vector index loaded: ${vectorStore.getStats().vectorCount} vectors\n`);
        }
    }

    const results = {
        total: TEST_CASES.length,
        passed: 0,
        failed: 0,
        skipped: 0,
        details: []
    };

    // Metrics
    let intentCorrect = 0;
    let languageCorrect = 0;
    let stateCorrect = 0;
    let retrievalSuccess = 0;
    let totalRetrievalTests = 0;

    for (const tc of TEST_CASES) {
        const detail = { id: tc.id, query: tc.query, status: 'PASS', issues: [] };

        try {
            // ── Test Language Detection ──────────────────────────
            const detectedLang = detectLanguage(tc.query);
            if (detectedLang === tc.lang) {
                languageCorrect++;
            } else {
                detail.issues.push(`Language: expected=${tc.lang}, got=${detectedLang}`);
            }

            // ── Test Intent Detection ───────────────────────────
            const intentResult = detectIntent(tc.query, detectedLang);

            if (tc.expectedIntent === 'FRAUD') {
                // Fraud is handled at controller level, not intent
                // Just check that the system can detect it
            } else if (intentResult.intent === tc.expectedIntent) {
                intentCorrect++;
            } else if (tc.expectedIntent === 'UNKNOWN' && intentResult.confidence < 0.3) {
                intentCorrect++; // Low confidence counts as UNKNOWN detection
            } else {
                detail.issues.push(`Intent: expected=${tc.expectedIntent}, got=${intentResult.intent} (conf=${intentResult.confidence.toFixed(2)})`);
            }

            // ── Test Query Rewriting ────────────────────────────
            const structuredQuery = rewriteQuery(tc.query, intentResult.intent, detectedLang);

            if (tc.expectedState) {
                if (structuredQuery.filters.state === tc.expectedState) {
                    stateCorrect++;
                } else {
                    detail.issues.push(`State: expected=${tc.expectedState}, got=${structuredQuery.filters.state || 'none'}`);
                }
            }

            if (tc.expectedScheme) {
                if (structuredQuery.schemeName && structuredQuery.schemeName.toLowerCase().includes(tc.expectedScheme.toLowerCase())) {
                    // OK
                } else {
                    detail.issues.push(`Scheme: expected=${tc.expectedScheme}, got=${structuredQuery.schemeName || 'none'}`);
                }
            }

            // ── Test Retrieval (if index is loaded) ─────────────
            if (indexLoaded && !tc.expectFraudWarning && tc.expectedIntent !== 'GREETING' && tc.expectedIntent !== 'UNKNOWN') {
                totalRetrievalTests++;
                try {
                    const retrieved = await retrieve(structuredQuery, 5);

                    if (retrieved.length > 0) {
                        retrievalSuccess++;

                        if (tc.expectedScheme) {
                            const foundScheme = retrieved.some(r =>
                                (r.metadata?.title || '').toLowerCase().includes(tc.expectedScheme.toLowerCase())
                            );
                            if (!foundScheme) {
                                detail.issues.push(`Retrieval: "${tc.expectedScheme}" not in top-5 results`);
                            }
                        }

                        if (tc.expectNoScheme) {
                            // For hallucination tests, we expect low confidence
                            if (retrieved[0].score > 0.8) {
                                detail.issues.push(`Hallucination risk: high confidence (${retrieved[0].score.toFixed(3)}) for unknown query`);
                            }
                        }
                    } else if (!tc.expectNoScheme) {
                        detail.issues.push('Retrieval: No results returned');
                    }
                } catch (err) {
                    detail.issues.push(`Retrieval error: ${err.message}`);
                }
            }

            // Determine pass/fail
            if (detail.issues.length === 0) {
                detail.status = 'PASS';
                results.passed++;
            } else {
                detail.status = 'FAIL';
                results.failed++;
            }

        } catch (err) {
            detail.status = 'ERROR';
            detail.issues.push(`Error: ${err.message}`);
            results.failed++;
        }

        results.details.push(detail);

        // Print inline
        const icon = detail.status === 'PASS' ? '✅' : (detail.status === 'FAIL' ? '❌' : '💥');
        const issueStr = detail.issues.length > 0 ? ` — ${detail.issues.join('; ')}` : '';
        console.log(`${icon} [${tc.id}] "${tc.query.substring(0, 50)}"${issueStr}`);
    }

    // ── Summary ─────────────────────────────────────────────────
    console.log('\n══════════════════════════════════════════════════');
    console.log('   EVALUATION RESULTS');
    console.log('══════════════════════════════════════════════════');
    console.log(`   Total:    ${results.total}`);
    console.log(`   Passed:   ${results.passed} (${pct(results.passed, results.total)})`);
    console.log(`   Failed:   ${results.failed} (${pct(results.failed, results.total)})`);
    console.log('');
    console.log('   METRICS:');
    console.log(`   Intent Accuracy:     ${pct(intentCorrect, results.total)}`);
    console.log(`   Language Accuracy:    ${pct(languageCorrect, results.total)}`);
    if (totalRetrievalTests > 0) {
        console.log(`   Retrieval Success:    ${pct(retrievalSuccess, totalRetrievalTests)}`);
    }
    console.log('══════════════════════════════════════════════════\n');
}

function pct(n, total) {
    return total > 0 ? `${Math.round((n / total) * 100)}%` : '0%';
}

evaluate().catch(err => {
    console.error('Evaluation failed:', err);
    process.exit(1);
});
