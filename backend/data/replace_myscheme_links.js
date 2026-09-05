const fs = require('fs');
const path = require('path');

const SCHEMES_JSON_PATH = path.join(__dirname, 'schemes.json');
const DATA_JS_PATH = path.join(__dirname, '../../frontend/assets/js/data.js');
const SCRIPT_JS_PATH = path.join(__dirname, '../../script.js');

const schemes = JSON.parse(fs.readFileSync(SCHEMES_JSON_PATH, 'utf8'));

console.log(`Auditing and replacing myscheme links across ${schemes.length} schemes...`);

// Ministry official portals mapping
const MINISTRY_OFFICIAL_PORTALS = {
    'Ministry of Agriculture and Farmers Welfare': 'https://agriwelfare.gov.in/',
    'Ministry of Micro, Small and Medium Enterprises (MSME)': 'https://my.msme.gov.in/',
    'Ministry of Education': 'https://www.education.gov.in/',
    'Ministry of Science and Technology': 'https://dst.gov.in/',
    'Ministry of Social Justice and Empowerment': 'https://socialjustice.gov.in/',
    'Ministry of Commerce and Industry': 'https://commerce.gov.in/',
    'Ministry of Finance': 'https://financialservices.gov.in/',
    'Ministry of Health & Family Welfare': 'https://mohfw.gov.in/',
    'Ministry of Housing & Urban Affairs': 'https://mohua.gov.in/',
    'Ministry of Rural Development': 'https://rural.gov.in/',
    'Ministry of Youth Affairs & Sports': 'https://yas.nic.in/',
    'Ministry of Electronics and Information Technology': 'https://meity.gov.in/',
    'Ministry of Textiles': 'https://texmin.gov.in/',
    'Ministry of Labour and Employment': 'https://labour.gov.in/',
    'Ministry of Defence': 'https://mod.gov.in/',
    'Ministry of Culture': 'https://indiaculture.gov.in/',
    'Ministry of Tourism': 'https://tourism.gov.in/',
    'Ministry of Ayush': 'https://ayush.gov.in/',
    'Ministry of Chemicals and Fertilizers': 'https://fert.gov.in/',
    'Ministry of Communication': 'https://www.indiapost.gov.in/',
    'Ministry of Consumer Affairs, Food and Public Distribution': 'https://consumerhelpline.gov.in/',
    'Ministry of Corporate Affairs': 'https://www.mca.gov.in/',
    'Ministry of Development of North Eastern Region': 'https://mdoner.gov.in/',
    'Ministry of Environment, Forest and Climate Change': 'https://moef.gov.in/',
    'Ministry of External Affairs': 'https://www.mea.gov.in/',
    'Ministry of Fisheries, Animal Husbandry and Dairying': 'https://dahd.gov.in/',
    'Ministry of Food Processing Industries': 'https://mofpi.gov.in/',
    'Ministry of Heavy Industries': 'https://heavyindustries.gov.in/',
    'Ministry of Home Affairs': 'https://mha.gov.in/',
    'Ministry of Information and Broadcasting': 'https://mib.gov.in/',
    'Ministry of Jal Shakti': 'https://jalshakti.gov.in/',
    'Ministry of Law and Justice': 'https://lawmin.gov.in/',
    'Ministry of Mines': 'https://mines.gov.in/',
    'Ministry of Minority Affairs': 'https://minorityaffairs.gov.in/',
    'Ministry of New and Renewable Energy': 'https://mnre.gov.in/',
    'Ministry of Panchayati Raj': 'https://panchayat.gov.in/',
    'Ministry of Personnel, Public Grievances and Pensions': 'https://pgportal.gov.in/',
    'Ministry of Petroleum and Natural Gas': 'https://mopng.gov.in/',
    'Ministry of Ports, Shipping and Waterways': 'https://shipmin.gov.in/',
    'Ministry of Power': 'https://powermin.gov.in/',
    'Ministry of Railways': 'https://indianrailways.gov.in/',
    'Ministry of Skill Development and Entrepreneurship': 'https://www.msde.gov.in/',
    'Ministry of Statistics and Programme Implementation': 'https://mospi.gov.in/',
    'Ministry of Steel': 'https://steel.gov.in/',
    'Ministry of Tribal Affairs': 'https://tribal.nic.in/',
    'Ministry of Water Resources, River Development & Ganga Rejuvenation': 'https://jalshakti.gov.in/',
    'Ministry of Women and Child Development': 'https://wcd.gov.in/',
    'NITI Aayog (National Institution for Transforming India)': 'https://niti.gov.in/',
    'Comptroller and Auditor General of India': 'https://cag.gov.in/',
    'The Lokpal of India': 'https://lokpal.gov.in/'
};

// Title-specific official portals
function getOfficialPortalForScheme(scheme) {
    const t = scheme.title.toLowerCase();
    const m = scheme.ministry || '';

    // Agriculture
    if (t.includes('kisan credit card') || t.includes('kcc')) return 'https://pmkisan.gov.in/';
    if (t.includes('fasal bima') || t.includes('pmfby')) return 'https://pmfby.gov.in/';
    if (t.includes('pm-kisan') || t.includes('pm kisan') || t.includes('samman nidhi')) return 'https://pmkisan.gov.in/';
    if (t.includes('paramparagat') || t.includes('pkvy') || t.includes('organic')) return 'https://jaivikkheti.in/';
    if (t.includes('soil health')) return 'https://soilhealth.dac.gov.in/';
    if (t.includes('mechanization') || t.includes('smam') || t.includes('agrimachinery')) return 'https://agrimachinery.nic.in/';
    if (t.includes('mkisan') || t.includes('sms advisory')) return 'https://mkisan.gov.in/';
    if (t.includes('e-nam') || t.includes('agriculture market')) return 'https://www.enam.gov.in/';
    if (t.includes('agriculture infrastructure fund') || t.includes('aif')) return 'https://agriinfra.dac.gov.in/';
    if (t.includes('horticulture') || t.includes('midh')) return 'https://midh.gov.in/';

    // MSME
    if (t.includes('pmegp') || t.includes('employment generation')) return 'https://my.msme.gov.in/';
    if (t.includes('vishwakarma')) return 'https://pmvishwakarma.gov.in/';
    if (t.includes('udyam') || t.includes('msme registration')) return 'https://udyamregistration.gov.in/';
    if (t.includes('cgtmse') || t.includes('credit guarantee')) return 'https://www.cgtmse.in/';
    if (t.includes('champions')) return 'https://champions.gov.in/';
    if (t.includes('sfurti')) return 'https://my.msme.gov.in/';
    if (t.includes('aspire')) return 'https://my.msme.gov.in/';
    if (t.includes('ramp')) return 'https://my.msme.gov.in/';
    if (t.includes('mudra') || t.includes('pmmy')) return 'https://www.mudra.org.in/';

    // Education & Scholarships
    if (t.includes('pmrf') || t.includes('research fellowship')) return 'https://www.pmrf.in/';
    if (t.includes('scholarship') || t.includes('pre-matric') || t.includes('post-matric') || t.includes('merit-cum-means')) return 'https://scholarships.gov.in/';
    if (t.includes('swayam')) return 'https://swayam.gov.in/';
    if (t.includes('diksha') || t.includes('pm e-vidya')) return 'https://diksha.gov.in/';
    if (t.includes('pm-shri') || t.includes('pm shri')) return 'https://pmshrischools.education.gov.in/';
    if (t.includes('pm-usha') || t.includes('pm usha') || t.includes('rusa')) return 'https://pmusha.education.gov.in/';
    if (t.includes('samagra shiksha')) return 'https://samagra.education.gov.in/';
    if (t.includes('aicte') || t.includes('pragati') || t.includes('saksham') || t.includes('swanath')) return 'https://www.aicte-india.org/';
    if (t.includes('ugc') || t.includes('ishaan uday')) return 'https://www.ugc.gov.in/';
    if (t.includes('study in india')) return 'https://www.education.gov.in/';

    // Science & Technology
    if (t.includes('serb') || t.includes('ramanujan') || t.includes('jc bose') || t.includes('national post doctoral')) return 'https://serbonline.in/';
    if (t.includes('csir')) return 'https://www.csir.res.in/';
    if (t.includes('dbt') || t.includes('biotechnology') || t.includes('biopharma') || t.includes('ramalingaswami')) return 'https://dbt.gov.in/';
    if (t.includes('birac')) return 'https://birac.nic.in/';
    if (t.includes('inspire') || t.includes('technology development board') || t.includes('tdb')) return 'https://dst.gov.in/';

    // Commerce & Industry
    if (t.includes('startup') || t.includes('sisfs') || t.includes('ffs') || t.includes('seed fund')) return 'https://www.startupindia.gov.in/';
    if (t.includes('make in india')) return 'https://www.makeinindia.com/';
    if (t.includes('invest india')) return 'https://www.investindia.gov.in/';
    if (t.includes('one district one product') || t.includes('odop')) return 'https://www.investindia.gov.in/one-district-one-product';
    if (t.includes('patent') || t.includes('intellectual property') || t.includes('ipr') || t.includes('gi ')) return 'https://ipindia.gov.in/';
    if (t.includes('dgft') || t.includes('rodtep') || t.includes('epcg') || t.includes('advance authorisation') || t.includes('export')) return 'https://www.dgft.gov.in/';
    if (t.includes('pli') || t.includes('production linked')) return 'https://dpiit.gov.in/';
    if (t.includes('gem') || t.includes('government e-marketplace')) return 'https://gem.gov.in/';

    // Health
    if (t.includes('ayushman') || t.includes('pm-jay') || t.includes('pmjay')) return 'https://beneficiary.nha.gov.in/';
    if (t.includes('janaushadhi') || t.includes('pmbjp')) return 'https://janaushadhi.gov.in/';
    if (t.includes('nikshay') || t.includes('tb ')) return 'https://www.nikshay.in/';
    if (t.includes('abdm') || t.includes('digital health')) return 'https://abdm.gov.in/';
    if (t.includes('janani suraksha') || t.includes('jsy') || t.includes('jssk') || t.includes('national health mission')) return 'https://nhm.gov.in/';

    // Social Justice & Empowerment
    if (t.includes('pm-daksh') || t.includes('daksh')) return 'https://pmdaksh.dosje.gov.in/';
    if (t.includes('accessible india') || t.includes('sugamya bharat')) return 'https://accessibleindia.gov.in/';
    if (t.includes('disability') || t.includes('divyangjan') || t.includes('swavlamban')) return 'https://disabilityaffairs.gov.in/';
    if (t.includes('vayoshri') || t.includes('rvy') || t.includes('adip') || t.includes('namaste') || t.includes('seed')) return 'https://socialjustice.gov.in/';

    // Housing & Urban
    if (t.includes('pmay-u') || t.includes('pm awas yojana - urban') || t.includes('credit linked subsidy')) return 'https://pmaymis.gov.in/';
    if (t.includes('svanidhi') || t.includes('street vendor')) return 'https://pmsvanidhi.mohua.gov.in/';
    if (t.includes('swachh bharat mission - urban') || t.includes('sbm-u')) return 'https://sbmurban.org/';
    if (t.includes('amrut')) return 'https://amrut.gov.in/';
    if (t.includes('smart cities')) return 'https://smartcities.gov.in/';

    // Rural Development
    if (t.includes('pmay-g') || t.includes('pm awas yojana - gramin')) return 'https://pmayg.dord.gov.in/';
    if (t.includes('mgnrega') || t.includes('nrega')) return 'https://nrega.nic.in/';
    if (t.includes('pmgsy') || t.includes('gram sadak')) return 'https://pmgsy.nic.in/';
    if (t.includes('ddu-gky') || t.includes('kaushalya yojana')) return 'https://aajeevika.gov.in/';
    if (t.includes('day-nrlm') || t.includes('aajeevika') || t.includes('livelihoods')) return 'https://aajeevika.gov.in/';
    if (t.includes('nsap') || t.includes('ignwps') || t.includes('ignoaps') || t.includes('igndps') || t.includes('national social assistance')) return 'https://rural.gov.in/';

    // Textiles
    if (t.includes('samarth')) return 'https://texmin.gov.in/';
    if (t.includes('silk') || t.includes('sericulture')) return 'https://csb.gov.in/';
    if (t.includes('handloom') || t.includes('weaver')) return 'https://handlooms.nic.in/';
    if (t.includes('handicraft') || t.includes('artisan')) return 'https://handicrafts.nic.in/';
    if (t.includes('pm-mitra') || t.includes('textile park')) return 'https://texmin.gov.in/';

    // Labour & Employment
    if (t.includes('e-shram') || t.includes('eshram')) return 'https://eshram.gov.in/';
    if (t.includes('national career service') || t.includes('ncs')) return 'https://www.ncs.gov.in/';
    if (t.includes('shram yogi') || t.includes('maan-dhan') || t.includes('pm-sym')) return 'https://maandhan.in/';
    if (t.includes('epfo') || t.includes('provident fund')) return 'https://www.epfindia.gov.in/';
    if (t.includes('esic') || t.includes('employees state insurance')) return 'https://www.esic.gov.in/';
    if (t.includes('apprenticeship') || t.includes('naps')) return 'https://www.apprenticeshipindia.gov.in/';

    // Women & Child Development
    if (t.includes('matru vandana') || t.includes('pmmvy')) return 'https://pmmvy.wcd.gov.in/';
    if (t.includes('beti bachao') || t.includes('bbbp')) return 'https://wcd.gov.in/';
    if (t.includes('poshan') || t.includes('nutrition')) return 'https://poshanabhiyaan.gov.in/';
    if (t.includes('mission shakti') || t.includes('mission vatsalya') || t.includes('one stop centre')) return 'https://wcd.gov.in/';

    // Post Office & Finance
    if (t.includes('sukanya samriddhi') || t.includes('mahila samman') || t.includes('senior citizens savings') || t.includes('public provident fund') || t.includes('national savings') || t.includes('kisan vikas patra') || t.includes('post office')) {
        return 'https://www.indiapost.gov.in/VAS/Pages/FinancialServices.aspx';
    }
    if (t.includes('pmjdy') || t.includes('jan dhan')) return 'https://pmjdy.gov.in/';
    if (t.includes('pmjjby') || t.includes('pmsby') || t.includes('atal pension') || t.includes('apy') || t.includes('jansuraksha')) return 'https://jansuraksha.gov.in/';
    if (t.includes('stand-up india') || t.includes('stand up india')) return 'https://www.standupmitra.in/';

    // Youth Affairs & Sports
    if (t.includes('khelo india')) return 'https://kheloindia.gov.in/';
    if (t.includes('fit india')) return 'https://fitindia.gov.in/';
    if (t.includes('tops') || t.includes('olympic')) return 'https://sportsauthorityofindia.nic.in/';
    if (t.includes('nyks') || t.includes('youth corps')) return 'https://nyks.nic.in/';

    // Defence
    if (t.includes('sparsh')) return 'https://sparsh.defencepension.gov.in/';
    if (t.includes('sainik') || t.includes('ksb') || t.includes('ex-servicemen financial')) return 'https://ksb.gov.in/';
    if (t.includes('echs')) return 'https://echs.gov.in/';
    if (t.includes('dgr') || t.includes('resettlement')) return 'https://dgrindia.gov.in/';

    // Civil Aviation
    if (t.includes('udan')) return 'https://civilaviation.gov.in/';

    // Renewable Energy & Environment
    if (t.includes('surya ghar') || t.includes('rooftop solar')) return 'https://pmsuryaghar.gov.in/';
    if (t.includes('pm-kusum') || t.includes('kusum')) return 'https://pmkusum.mnre.gov.in/';
    if (t.includes('clean air') || t.includes('prana')) return 'https://prana.cpcb.gov.in/';

    // State schemes
    if (scheme.type === 'state') {
        if (scheme.state === 'Andaman and Nicobar Islands') return 'https://edistrict.andaman.gov.in/';
        if (scheme.state === 'Arunachal Pradesh') return 'https://eservice.arunachal.gov.in/';
        if (scheme.state === 'Jammu and Kashmir') return 'https://serviceonline.gov.in/';
        if (scheme.state === 'Odisha') return 'https://odisha.gov.in/';
        return 'https://serviceonline.gov.in/';
    }

    // Default to Ministry Official Portal
    if (MINISTRY_OFFICIAL_PORTALS[m]) {
        return MINISTRY_OFFICIAL_PORTALS[m];
    }

    // National default
    return 'https://www.india.gov.in/';
}

let replacedCount = 0;
const updatedSchemes = schemes.map(scheme => {
    if (scheme.applyLink && scheme.applyLink.includes('myscheme.gov.in')) {
        const originalUrl = getOfficialPortalForScheme(scheme);
        replacedCount++;
        return {
            ...scheme,
            applyLink: originalUrl
        };
    }
    return scheme;
});

console.log(`Replaced ${replacedCount} myscheme links with their original official portals.`);
const remainingMyScheme = updatedSchemes.filter(s => s.applyLink && s.applyLink.includes('myscheme.gov.in')).length;
console.log(`Remaining myscheme links: ${remainingMyScheme}`);

// Write to backend/data/schemes.json
fs.writeFileSync(SCHEMES_JSON_PATH, JSON.stringify(updatedSchemes, null, 2), 'utf8');
console.log(`Saved ${SCHEMES_JSON_PATH} successfully!`);

// Write to frontend/assets/js/data.js
let dataJsContent = fs.readFileSync(DATA_JS_PATH, 'utf8');
const startMarkerData = 'const SAMPLE_SCHEMES = [';
const endMarkerData = '\n// API base URL — auto-detects';
const endMarkerDataCR = '\r\n// API base URL — auto-detects';

const sIdxData = dataJsContent.indexOf(startMarkerData);
let eIdxData = dataJsContent.indexOf(endMarkerData);
if (eIdxData === -1) eIdxData = dataJsContent.indexOf(endMarkerDataCR);

if (sIdxData !== -1 && eIdxData !== -1) {
    const newContent = dataJsContent.substring(0, sIdxData) + 'const SAMPLE_SCHEMES = ' + JSON.stringify(updatedSchemes, null, 4) + ';\n' + dataJsContent.substring(eIdxData);
    fs.writeFileSync(DATA_JS_PATH, newContent, 'utf8');
    console.log(`Saved ${DATA_JS_PATH} successfully!`);
} else {
    console.error('Could not find markers in data.js');
}

// Write to script.js
let scriptJsContent = fs.readFileSync(SCRIPT_JS_PATH, 'utf8');
const startMarkerScript = 'let ALL_SCHEMES = [';
const endMarkerScript = 'const SAMPLE_SCHEMES = ALL_SCHEMES;';

const sIdxScript = scriptJsContent.indexOf(startMarkerScript);
const eIdxScript = scriptJsContent.indexOf(endMarkerScript);

if (sIdxScript !== -1 && eIdxScript !== -1) {
    const newContent = scriptJsContent.substring(0, sIdxScript) + 'let ALL_SCHEMES = ' + JSON.stringify(updatedSchemes, null, 4) + ';\n\n' + scriptJsContent.substring(eIdxScript);
    fs.writeFileSync(SCRIPT_JS_PATH, newContent, 'utf8');
    console.log(`Saved ${SCRIPT_JS_PATH} successfully!`);
} else {
    console.error('Could not find markers in script.js');
}
