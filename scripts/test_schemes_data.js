const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('schemes-data.js', 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox);
const schemes = sandbox.window.ALL_SCHEMES;

console.log('Total schemes in schemes-data.js:', schemes.length);

const testIndices = [0, 1, 2, 3, 4, 50, 100, 200, 300, 431];
testIndices.forEach(idx => {
  const s = schemes[idx];
  if (!s) {
    console.error('Scheme at index ' + idx + ' is undefined!');
    return;
  }
  const hasDetails = !!s.details;
  const hasBenefits = !!(s.benefits_detailed || s.benefits);
  const hasElig = !!(s.eligibility_detailed || s.eligibility_summary);
  const hasProcess = !!s.application_process;
  const hasDocs = Array.isArray(s.documents_required) && s.documents_required.length > 0;
  const hasFaqs = Array.isArray(s.faqs) && s.faqs.length > 0;

  console.log('Scheme #' + s.id + ' (' + s.title.substring(0, 35) + '...): details=' + hasDetails + ', benefits=' + hasBenefits + ', elig=' + hasElig + ', process=' + hasProcess + ', docs=' + hasDocs + ' (' + (s.documents_required?.length || 0) + '), faqs=' + hasFaqs + ' (' + (s.faqs?.length || 0) + ')');
});
