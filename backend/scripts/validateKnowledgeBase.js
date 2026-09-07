#!/usr/bin/env node
/* ============================================================
   Script: Validate Knowledge Base
   Checks for data quality issues before indexing
   Usage: npm run validate-kb
   ============================================================ */

const path = require('path');
const fs = require('fs');

const SCHEMES_PATH = path.join(__dirname, '..', 'data', 'schemes.json');

function main() {
    console.log('\n══════════════════════════════════════════════════');
    console.log('   JanSahay AI — Knowledge Base Validation');
    console.log('══════════════════════════════════════════════════\n');

    if (!fs.existsSync(SCHEMES_PATH)) {
        console.error('❌ schemes.json not found at:', SCHEMES_PATH);
        process.exit(1);
    }

    const schemes = JSON.parse(fs.readFileSync(SCHEMES_PATH, 'utf-8'));
    console.log(`📊 Total schemes: ${schemes.length}\n`);

    const issues = {
        critical: [],
        warning: [],
        info: []
    };

    const ids = new Set();
    const titles = new Set();
    const categories = new Map();
    const states = new Map();
    let withDetails = 0;
    let withBenefitsDetailed = 0;
    let withEligibilityDetailed = 0;
    let withAppProcess = 0;
    let withDocumentsRequired = 0;
    let withReferences = 0;
    let withFaqs = 0;

    for (let i = 0; i < schemes.length; i++) {
        const s = schemes[i];

        // ── ID Checks ───────────────────────────────────────────
        if (!s.id) {
            issues.critical.push(`Scheme at index ${i}: Missing ID`);
            continue;
        }

        if (ids.has(String(s.id))) {
            issues.critical.push(`Duplicate ID: ${s.id}`);
        }
        ids.add(String(s.id));

        // ── Title Checks ────────────────────────────────────────
        if (!s.title) {
            issues.critical.push(`Scheme ${s.id}: Missing title`);
        } else {
            if (titles.has(s.title.toLowerCase())) {
                issues.warning.push(`Duplicate title: "${s.title}" (ID: ${s.id})`);
            }
            titles.add(s.title.toLowerCase());
        }

        // ── Benefits ────────────────────────────────────────────
        if (!s.benefits && !s.benefits_detailed) {
            issues.warning.push(`Scheme ${s.id} (${s.title}): Missing benefits`);
        }

        // ── Eligibility ─────────────────────────────────────────
        if (!s.eligibility_summary && !s.eligibility_detailed && !s.eligibility) {
            issues.warning.push(`Scheme ${s.id} (${s.title}): Missing eligibility info`);
        }

        // ── Apply Link ──────────────────────────────────────────
        if (s.applyLink) {
            if (!s.applyLink.startsWith('http')) {
                issues.warning.push(`Scheme ${s.id} (${s.title}): Invalid apply link: ${s.applyLink}`);
            }
        }

        // ── Source / References ──────────────────────────────────
        if (!s.references || !Array.isArray(s.references) || s.references.length === 0) {
            // Not critical, but noted
        } else {
            withReferences++;
            for (const ref of s.references) {
                if (ref.url && !ref.url.startsWith('http')) {
                    issues.warning.push(`Scheme ${s.id} (${s.title}): Invalid reference URL: ${ref.url}`);
                }
            }
        }

        // ── Track richness ──────────────────────────────────────
        if (s.details) withDetails++;
        if (s.benefits_detailed) withBenefitsDetailed++;
        if (s.eligibility_detailed) withEligibilityDetailed++;
        if (s.application_process && s.application_process.length > 0) withAppProcess++;
        if (s.documents_required && s.documents_required.length > 0) withDocumentsRequired++;
        if (s.faqs && s.faqs.length > 0) withFaqs++;

        // ── Category tracking ───────────────────────────────────
        const cat = s.category || 'Uncategorized';
        categories.set(cat, (categories.get(cat) || 0) + 1);

        // ── State tracking ──────────────────────────────────────
        const state = s.state || 'Unknown';
        states.set(state, (states.get(state) || 0) + 1);
    }

    // ── Print Results ───────────────────────────────────────────
    if (issues.critical.length > 0) {
        console.log('❌ CRITICAL ISSUES:');
        issues.critical.forEach(i => console.log(`   ${i}`));
        console.log('');
    }

    if (issues.warning.length > 0) {
        console.log(`⚠️  WARNINGS (${issues.warning.length}):`);
        issues.warning.slice(0, 20).forEach(i => console.log(`   ${i}`));
        if (issues.warning.length > 20) {
            console.log(`   ... and ${issues.warning.length - 20} more`);
        }
        console.log('');
    }

    console.log('📊 DATA RICHNESS:');
    console.log(`   Total schemes:            ${schemes.length}`);
    console.log(`   With detailed info:        ${withDetails} (${pct(withDetails, schemes.length)})`);
    console.log(`   With detailed benefits:    ${withBenefitsDetailed} (${pct(withBenefitsDetailed, schemes.length)})`);
    console.log(`   With detailed eligibility: ${withEligibilityDetailed} (${pct(withEligibilityDetailed, schemes.length)})`);
    console.log(`   With application process:  ${withAppProcess} (${pct(withAppProcess, schemes.length)})`);
    console.log(`   With documents required:   ${withDocumentsRequired} (${pct(withDocumentsRequired, schemes.length)})`);
    console.log(`   With FAQs:                 ${withFaqs} (${pct(withFaqs, schemes.length)})`);
    console.log(`   With references:           ${withReferences} (${pct(withReferences, schemes.length)})`);

    console.log('\n📁 CATEGORIES:');
    [...categories.entries()]
        .sort((a, b) => b[1] - a[1])
        .forEach(([cat, count]) => console.log(`   ${cat}: ${count}`));

    console.log('\n🗺️  TOP STATES:');
    [...states.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .forEach(([state, count]) => console.log(`   ${state}: ${count}`));

    console.log('\n══════════════════════════════════════════════════');
    if (issues.critical.length === 0) {
        console.log('   ✅ Validation passed! Ready for ingestion.');
    } else {
        console.log(`   ❌ ${issues.critical.length} critical issues found. Fix before ingesting.`);
    }
    console.log('══════════════════════════════════════════════════\n');
}

function pct(n, total) {
    return `${Math.round((n / total) * 100)}%`;
}

main();
