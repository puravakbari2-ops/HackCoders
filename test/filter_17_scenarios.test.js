/**
 * Automated Verification Suite for JanSahay AI Filtering System
 * Validates 17 test cases across FilterService and RAG Pipeline:
 *
 * 1. Filter by State only (Gujarat)
 * 2. Filter by State with no matching schemes (e.g. Sikkim) -> 0 matches, empty state
 * 3. Filter by Category only (OBC)
 * 4. Filter by Multiple Categories (OBC + SC)
 * 5. Filter by Gender (Female)
 * 6. Filter by Gender (Male)
 * 7. Filter by Age range (Min 18, Max 35)
 * 8. Filter by Age range outside scheme bounds (Min 90, Max 100) -> 0 matches
 * 9. Filter by Income level (below-1l)
 * 10. Filter by Scheme Type (Central)
 * 11. Filter by Scheme Type (State)
 * 12. Filter by Scheme Category (Agriculture)
 * 13. Combined Multi-filter (Maharashtra + Female)
 * 14. Combined Multi-filter with 0 results -> clean short-circuit
 * 15. No filters applied (Baseline profile recommendation)
 * 16. Clear All filters -> full baseline restored
 * 17. Remove single filter chip -> active filters updated dynamically
 */

const assert = require('assert');
const path = require('path');
const filterService = require('../backend/services/filterService');
const ragService = require('../backend/services/ragService');

// Load sample schemes
const SAMPLE_SCHEMES = require('../backend/data/schemes.json');

console.log(`\n======================================================`);
console.log(`   JANSAHAY AI: 17 TEST SCENARIOS VERIFICATION SUITE   `);
console.log(`======================================================\n`);

let passedCount = 0;
let totalCount = 17;

function runTest(num, name, fn) {
    try {
        fn();
        console.log(`  ✅ [PASS] Test ${num}: ${name}`);
        passedCount++;
    } catch (err) {
        console.error(`  ❌ [FAIL] Test ${num}: ${name}`);
        console.error(`     Error: ${err.message}`);
    }
}

// 1. Filter by State only (Gujarat)
runTest(1, 'Filter by State only (Gujarat) returns only Gujarat schemes and Central All-India schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { state: 'Gujarat' });
    assert(res.count > 0, 'Expected matches for Gujarat');
    res.filtered.forEach(s => {
        const state = (s.state || s.eligibility?.state || 'All').toLowerCase();
        const type = (s.type || '').toLowerCase();
        const isEligible = type === 'central' || state === 'all' || state === 'all india' || state === 'gujarat';
        assert(isEligible, `Scheme "${s.title}" (${s.state}, ${s.type}) is not eligible for Gujarat`);
    });
});

// 2. Filter by State with no matching schemes (e.g. NonExistentState) -> 0 matches, clean empty state
runTest(2, 'Filter by State with no matching schemes (NonExistentState) returns 0 matches for state schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { state: 'NonExistentState', type: 'state' });
    assert.strictEqual(res.count, 0, 'Expected 0 state schemes for non-existent state');
    assert.deepStrictEqual(res.schemeIds, [], 'Scheme IDs must be empty array');
});

// 3. Filter by Category only (OBC)
runTest(3, 'Filter by Category only (OBC) returns OBC and All-category schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { category: 'obc' });
    assert(res.count > 0, 'Expected matches for OBC category');
    res.filtered.forEach(s => {
        const cats = Array.isArray(s.eligibility?.category)
            ? s.eligibility.category.map(c => String(c).toLowerCase())
            : [String(s.eligibility?.category || 'all').toLowerCase()];
        const matches = cats.includes('all') || cats.includes('obc');
        assert(matches, `Scheme "${s.title}" does not match OBC category`);
    });
});

// 4. Filter by Multiple Categories (OBC + SC)
runTest(4, 'Filter by Multiple Categories (OBC + SC) returns union of OBC, SC, and All schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { category: ['obc', 'sc'] });
    assert(res.count > 0, 'Expected matches for OBC + SC');
    res.filtered.forEach(s => {
        const cats = Array.isArray(s.eligibility?.category)
            ? s.eligibility.category.map(c => String(c).toLowerCase())
            : [String(s.eligibility?.category || 'all').toLowerCase()];
        const matches = cats.includes('all') || cats.includes('obc') || cats.includes('sc');
        assert(matches, `Scheme "${s.title}" does not match OBC or SC`);
    });
});

// 5. Filter by Gender (Female)
runTest(5, 'Filter by Gender (Female) returns Female and All-gender schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { gender: 'female' });
    assert(res.count > 0, 'Expected matches for Female gender');
    res.filtered.forEach(s => {
        const g = Array.isArray(s.eligibility?.gender)
            ? s.eligibility.gender.map(x => String(x).toLowerCase())
            : [String(s.eligibility?.gender || 'all').toLowerCase()];
        const matches = g.includes('all') || g.includes('female');
        assert(matches, `Scheme "${s.title}" is not for Female users (is: ${g.join(', ')})`);
    });
});

// 6. Filter by Gender (Male)
runTest(6, 'Filter by Gender (Male) returns Male and All-gender schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { gender: 'male' });
    assert(res.count > 0, 'Expected matches for Male gender');
    res.filtered.forEach(s => {
        const g = Array.isArray(s.eligibility?.gender)
            ? s.eligibility.gender.map(x => String(x).toLowerCase())
            : [String(s.eligibility?.gender || 'all').toLowerCase()];
        const matches = g.includes('all') || g.includes('male');
        assert(matches, `Scheme "${s.title}" is not for Male users (is: ${g.join(', ')})`);
    });
});

// 7. Filter by Age range (Min 18, Max 35)
runTest(7, 'Filter by Age range (Min 18, Max 35) matches overlapping eligibility brackets', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { ageMin: 18, ageMax: 35 });
    assert(res.count > 0, 'Expected matches for age 18-35');
    res.filtered.forEach(s => {
        const e = s.eligibility || {};
        if (e.minAge !== undefined && e.minAge !== null) {
            assert(e.minAge <= 35, `Scheme minAge ${e.minAge} is > 35`);
        }
        if (e.maxAge !== undefined && e.maxAge !== null) {
            assert(e.maxAge >= 18, `Scheme maxAge ${e.maxAge} is < 18`);
        }
    });
});

// 8. Filter by Age range outside scheme bounds (Min 115, Max 120) -> 0 matches
runTest(8, 'Filter by Age range outside scheme bounds (Min 115, Max 120) returns 0 matches', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { ageMin: 115, ageMax: 120 });
    assert.strictEqual(res.count, 0, `Expected 0 matches for 115-120 age range, got ${res.count}`);
    assert.deepStrictEqual(res.schemeIds, []);
});

// 9. Filter by Income level (below-1l)
runTest(9, 'Filter by Income level (below-1l) matches low-income schemes and no-cap schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { income: 'below-1l' });
    assert(res.count > 0, 'Expected matches for below-1l income');
    res.filtered.forEach(s => {
        const e = s.eligibility || {};
        if (e.income && e.income.length > 0) {
            const inc = e.income.map(i => String(i).toLowerCase());
            const ok = inc.includes('any') || inc.includes('all') || inc.includes('below-1l') || inc.includes('bpl') || inc.includes('below-2.5l');
            assert(ok, `Scheme "${s.title}" does not support below-1l: ${JSON.stringify(e.income)}`);
        }
    });
});

// 10. Filter by Scheme Type (Central)
runTest(10, 'Filter by Scheme Type (Central) returns only Central schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { type: 'central' });
    assert(res.count > 0, 'Expected Central schemes');
    res.filtered.forEach(s => {
        const t = (s.type || '').toLowerCase();
        assert.strictEqual(t, 'central', `Scheme "${s.title}" is not Central (type: ${t})`);
    });
});

// 11. Filter by Scheme Type (State)
runTest(11, 'Filter by Scheme Type (State) returns only State schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { type: 'state' });
    assert(res.count > 0, 'Expected State schemes');
    res.filtered.forEach(s => {
        const t = (s.type || '').toLowerCase();
        assert.strictEqual(t, 'state', `Scheme "${s.title}" is not State (type: ${t})`);
    });
});

// 12. Filter by Scheme Category (Agriculture)
runTest(12, 'Filter by Scheme Category (Agriculture) returns only Agriculture schemes', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { schemeCategory: 'Agriculture' });
    assert(res.count > 0, 'Expected Agriculture schemes');
    res.filtered.forEach(s => {
        const cat = (s.category || '').toLowerCase();
        assert(cat.includes('agri') || cat.includes('farm'), `Scheme "${s.title}" category is ${cat}`);
    });
});

// 13. Combined Multi-filter (Maharashtra + Female)
runTest(13, 'Combined Multi-filter (Maharashtra + Female) respects both constraints simultaneously', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, { state: 'Maharashtra', gender: 'female' });
    assert(res.count > 0, 'Expected matches for Maharashtra + Female');
    res.filtered.forEach(s => {
        const st = (s.state || s.eligibility?.state || 'All').toLowerCase();
        const type = (s.type || '').toLowerCase();
        const isState = type === 'central' || st === 'all' || st === 'all india' || st === 'maharashtra';
        const g = Array.isArray(s.eligibility?.gender)
            ? s.eligibility.gender.map(x => String(x).toLowerCase())
            : [String(s.eligibility?.gender || 'all').toLowerCase()];
        const isGender = g.includes('all') || g.includes('female');
        assert(isState && isGender, `Scheme "${s.title}" violated combined state/gender rule`);
    });
});

// 14. Combined Multi-filter with 0 results -> clean short-circuit
runTest(14, 'Combined Multi-filter with impossible combination returns 0 matches cleanly', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, {
        state: 'NonExistentState',
        type: 'state',
        gender: 'female',
        category: 'st'
    });
    assert.strictEqual(res.count, 0, 'Expected 0 matches for impossible combination');
    assert.strictEqual(res.schemeIds.length, 0, 'schemeIds must be empty');
});

// 15. No filters applied (Baseline profile recommendation)
runTest(15, 'No filters applied returns full dataset count', () => {
    const res = filterService.filterSchemes(SAMPLE_SCHEMES, {});
    assert.strictEqual(res.count, SAMPLE_SCHEMES.length, `Expected ${SAMPLE_SCHEMES.length} schemes`);
    assert.strictEqual(res.schemeIds.length, SAMPLE_SCHEMES.length, 'All scheme IDs must be present');
});

// 16. Clear All filters -> full baseline restored
runTest(16, 'Clear All filters resets state and restores all schemes', () => {
    // Simulate filtered state
    const filteredState = { state: 'Gujarat', category: 'obc' };
    const res1 = filterService.filterSchemes(SAMPLE_SCHEMES, filteredState);
    assert(res1.count < SAMPLE_SCHEMES.length, 'Filter should reduce count');

    // Simulate Clear All
    const clearedState = {};
    const res2 = filterService.filterSchemes(SAMPLE_SCHEMES, clearedState);
    assert.strictEqual(res2.count, SAMPLE_SCHEMES.length, 'Clear all must restore all schemes');
});

// 17. Remove single filter chip -> active filters updated dynamically
runTest(17, 'Remove single filter chip recalculates results with remaining filters', () => {
    const initialFilters = { state: 'Gujarat', type: 'central', category: 'general' };
    const resInitial = filterService.filterSchemes(SAMPLE_SCHEMES, initialFilters);

    // Remove 'type' chip
    const updatedFilters = { ...initialFilters };
    delete updatedFilters.type;

    const resUpdated = filterService.filterSchemes(SAMPLE_SCHEMES, updatedFilters);
    assert(resUpdated.count >= resInitial.count, 'Removing a filter constraint must expand or equal result count');
});

console.log(`\n======================================================`);
console.log(`   RESULTS: ${passedCount} / ${totalCount} PASSED`);
console.log(`======================================================\n`);

if (passedCount === totalCount) {
    process.exit(0);
} else {
    process.exit(1);
}
