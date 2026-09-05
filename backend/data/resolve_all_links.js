const fs = require('fs');
const path = require('path');

const SCHEMES_JSON_PATH = path.join(__dirname, 'schemes.json');
const DATA_JS_PATH = path.join(__dirname, '../../frontend/assets/js/data.js');
const SCRIPT_JS_PATH = path.join(__dirname, '../../script.js');

const schemes = JSON.parse(fs.readFileSync(SCHEMES_JSON_PATH, 'utf8'));

console.log(`Starting link resolution for ${schemes.length} schemes...`);

// Dedicated flagship portal mappings by Scheme ID or unique title keywords
const SPECIFIC_FLAGSHIP_PORTALS = {
    // Finance & Banking
    '1': 'https://pmjdy.gov.in/', // PMJDY
    '2': 'https://jansuraksha.gov.in/', // PMJJBY
    '3': 'https://jansuraksha.gov.in/', // PMSBY
    '4': 'https://www.npscra.nsdl.co.in/scheme-details.php', // APY
    '5': 'https://www.indiapost.gov.in/VAS/Pages/FinancialServices.aspx', // MSSC
    '6': 'https://www.indiapost.gov.in/VAS/Pages/FinancialServices.aspx', // SCSS
    '7': 'https://www.indiapost.gov.in/VAS/Pages/FinancialServices.aspx', // PPF
    '50': 'https://www.indiapost.gov.in/VAS/Pages/FinancialServices.aspx', // Sukanya Samriddhi
    '8': 'https://pmkisan.gov.in/', // PM-KISAN
    '9': 'https://pmfby.gov.in/', // PMFBY
    '10': 'https://www.myscheme.gov.in/schemes/kcc', // KCC
    '11': 'https://pmkusum.mnre.gov.in/', // PM-KUSUM
    '12': 'https://soilhealth.dac.gov.in/', // Soil Health
    '13': 'https://jaivikkheti.in/', // PKVY
    '14': 'https://agrimachinery.nic.in/', // SMAM
    '15': 'https://beneficiary.nha.gov.in/', // Ayushman Bharat PM-JAY
    '16': 'https://janaushadhi.gov.in/', // PMBJP
    '17': 'https://pmmvy.wcd.gov.in/', // PMMVY
    '18': 'https://nhm.gov.in/', // JSY
    '19': 'https://www.nikshay.in/', // Nikshay Poshan
    '20': 'https://nhm.gov.in/', // JSSK
    '21': 'https://scholarships.gov.in/', // Post-Matric SC
    '22': 'https://scholarships.gov.in/', // Pre-Matric SC
    '23': 'https://scholarships.gov.in/', // PM-YASASVI
    '24': 'https://www.pmrf.in/', // PMRF
    '25': 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati', // AICTE Pragati
    '26': 'https://www.aicte-india.org/schemes/students-development-schemes/Saksham', // AICTE Saksham
    '27': 'https://scholarships.gov.in/', // Begum Hazrat Mahal
    '28': 'https://pmayg.dord.gov.in/', // PMAY-G
    '29': 'https://pmaymis.gov.in/', // PMAY-U
    '30': 'https://arhc.mohua.gov.in/', // ARHC
    '31': 'https://www.mudra.org.in/', // PMMY
    '32': 'https://www.standupmitra.in/', // Stand-Up India
    '33': 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp', // PMEGP
    '34': 'https://pmvishwakarma.gov.in/', // PM Vishwakarma
    '35': 'https://seedfund.startupindia.gov.in/', // SISFS
    '36': 'https://www.cgtmse.in/', // CGTMSE
    '37': 'https://nrega.nic.in/', // MGNREGA
    '38': 'https://pmsvanidhi.mohua.gov.in/', // PM SVANidhi
    '39': 'https://www.skillindiadigital.gov.in/', // PMKVY
    '40': 'https://www.apprenticeshipindia.gov.in/', // NAPS
    '41': 'https://kaushalbhaarat.gov.in/', // DDU-GKY
    '42': 'https://nfsa.gov.in/', // AAY
    '43': 'https://nfsa.gov.in/', // PMGKAY
    '44': 'https://nfsa.gov.in/', // NFSA Priority
    '45': 'https://nfsa.gov.in/portal/onorc', // ONORC
    '46': 'https://www.myscheme.gov.in/schemes/nsap-ignoaps', // IGNOAPS
    '47': 'https://www.myscheme.gov.in/schemes/nsap-ignwps', // IGNWPS
    '48': 'https://www.myscheme.gov.in/schemes/nsap-igndps', // IGNDPS
    '49': 'https://socialjustice.gov.in/schemes/73', // ADIP
    '51': 'https://www.pmuy.gov.in/', // PMUY
    '52': 'https://wcd.gov.in/schemes/beti-bachao-beti-padhao-scheme', // BBBP
    '53': 'https://poshanabhiyaan.gov.in/', // Poshan Abhiyaan
    '54': 'https://wcd.gov.in/schemes/mission-vatsalya', // Mission Vatsalya
    '55': 'https://wcd.gov.in/schemes/mission-shakti', // Mission Shakti
    '56': 'https://swachhbharatmission.ddws.gov.in/', // SBM-G
    '57': 'https://sbmurban.org/', // SBM-U
    '58': 'https://jaljeevanmission.gov.in/', // JJM
    '59': 'https://pmgsy.nic.in/', // PMGSY
    '60': 'https://diksha.gov.in/', // PM e-VIDYA
    '61': 'https://samagra.education.gov.in/', // Samagra Shiksha
    '62': 'https://kheloindia.gov.in/', // Khelo India
    '63': 'https://www.enam.gov.in/', // e-NAM
    '64': 'https://pmsuryaghar.gov.in/', // PM Surya Ghar
    '65': 'https://maandhan.in/', // PM-SYM
    '66': 'https://www.udan.gov.in/', // UDAN
    '67': 'https://eshram.gov.in/', // e-Shram
    '68': 'https://www.ncs.gov.in/', // NCS
    '69': 'https://udyamregistration.gov.in/', // Udyam Registration
    '70': 'https://gem.gov.in/', // GeM
    '71': 'https://cybercrime.gov.in/', // Cyber Crime
    '72': 'https://sparsh.defencepension.gov.in/', // SPARSH
    '73': 'https://ksb.gov.in/', // KSB
    '74': 'https://echs.gov.in/', // ECHS
    '75': 'https://samarth.texmin.gov.in/', // Samarth
    '76': 'https://swadeshdarshan.gov.in/', // Swadesh Darshan
    '77': 'https://agriinfra.dac.gov.in/', // AIF
    '78': 'https://dahd.gov.in/', // NLM
    '79': 'https://pmmsy.dof.gov.in/', // PMMSY
    '80': 'https://swayam.gov.in/', // SWAYAM
    '81': 'https://pmshrischools.education.gov.in/', // PM-SHRI
    '82': 'https://pmusha.education.gov.in/', // PM-USHA
    '83': 'https://abdm.gov.in/', // ABDM
    '84': 'https://pmabhim.nhm.gov.in/', // PM-ABHIM
    '85': 'https://champions.gov.in/', // Champions
    '86': 'https://www.startupindia.gov.in/', // Startup India
    '87': 'https://fitindia.gov.in/', // Fit India
    '88': 'https://www.digilocker.gov.in/', // DigiLocker
    '89': 'https://web.umang.gov.in/', // UMANG
    '90': 'https://csb.gov.in/', // Silk Samagra
    '91': 'https://handlooms.nic.in/', // Handlooms
    '92': 'https://handicrafts.nic.in/', // Handicrafts
    '93': 'https://serbonline.in/', // SERB
    '94': 'https://www.csir.res.in/', // CSIR
    '95': 'https://dbtindia.gov.in/', // DBT
    '96': 'https://www.dgft.gov.in/', // DGFT
    '97': 'https://apeda.gov.in/', // APEDA
    '98': 'https://mpeda.gov.in/', // MPEDA
    '99': 'https://www.investindia.gov.in/', // Invest India
    '100': 'https://www.investindia.gov.in/one-district-one-product' // ODOP
};

// Domain replacements for obsolete or non-working domains
const DOMAIN_REPLACEMENTS = {
    'wcd.nic.in': 'wcd.gov.in',
    'agricoop.nic.in': 'agriwelfare.gov.in',
    'dahd.nic.in': 'dahd.gov.in',
    'texmin.nic.in': 'texmin.gov.in',
    'fert.nic.in': 'fert.gov.in',
    'www.fert.nic.in': 'fert.gov.in',
    'pmayg.nic.in': 'pmayg.dord.gov.in',
    'enps.nsdl.com': 'www.npscra.nsdl.co.in/scheme-details.php',
    'yet.nta.ac.in': 'scholarships.gov.in',
    'www.pmkvyofficial.org': 'www.skillindiadigital.gov.in',
    'pmkvyofficial.org': 'www.skillindiadigital.gov.in',
    'ddugky.gov.in': 'kaushalbhaarat.gov.in',
    'nsap.nic.in': 'www.myscheme.gov.in/schemes/nsap-ignoaps',
    'omms.nic.in': 'pmgsy.nic.in',
    'pmvidya.mhrd.gov.in': 'diksha.gov.in',
    'emrs.tribal.gov.in': 'tribal.nic.in/EMRS.aspx',
    'pmjvk.nic.in': 'minorityaffairs.gov.in',
    'bharatsarkar.gov.in': 'www.india.gov.in',
    'ministryoftextiles.gov.in': 'texmin.gov.in',
    'rte.education.gov.in': 'samagra.education.gov.in',
    'www.nsmindia.gov.in': 'nsmindia.in',
    'pmegp.kvic.gov.in': 'www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    'vahan.nic.in': 'vahan.parivahan.gov.in',
    'bocwwelfareboard.nic.in': 'labour.gov.in',
    'naee.ac.in': 'dst.gov.in',
    'apprenticeship.gov.in': 'www.apprenticeshipindia.gov.in',
    'dgr.gov.in': 'dgrindia.gov.in',
    'nfdb.gov.in': 'nfdb.gov.in',
    'cpengrams.gov.in': 'pgportal.gov.in',
    'rusa.nic.in': 'pmusha.education.gov.in',
    'ugc.ac.in': 'www.ugc.gov.in',
    'stars.iisc.ac.in': 'stars.iisc.ac.in',
    'lilavati.aicte-india.org': 'www.aicte-india.org',
    'vigyanjyoti.in': 'dst.gov.in',
    'fist-dst.gov.in': 'dst.gov.in',
    'nidhi-eir.uk': 'dst.gov.in',
    'vigyanprasar.gov.in': 'dst.gov.in',
    'acceleratevigyan.gov.in': 'serbonline.in',
    'shreshta.nta.nic.in': 'scholarships.gov.in',
    'namaste.dosje.gov.in': 'www.myscheme.gov.in/schemes/namaste',
    'www.nhfdc.nic.in': 'socialjustice.gov.in',
    'cegssc.in': 'socialjustice.gov.in',
    'seed.dosje.gov.in': 'www.myscheme.gov.in/schemes/seed',
    'coaching.dosje.gov.in': 'socialjustice.gov.in',
    'ngograntsmis.gov.in': 'socialjustice.gov.in',
    'sacred.dosje.gov.in': 'socialjustice.gov.in',
    'sage.dosje.gov.in': 'socialjustice.gov.in',
    'gatishakti.gov.in': 'dpiit.gov.in',
    'pmg.gov.in': 'e-nivesh.gov.in',
    'sezindia.nic.in': 'commerce.gov.in',
    'nipam.ipindia.gov.in': 'ipindia.gov.in',
    'cluster.msme.gov.in': 'my.msme.gov.in',
    'ipr.msme.gov.in': 'my.msme.gov.in',
    'nmeo.gov.in': 'agriwelfare.gov.in',
    'nbhm.gov.in': 'agriwelfare.gov.in',
    'mksp.gov.in': 'aajeevika.gov.in',
    'plitextiles.gov.in': 'texmin.gov.in',
    'sevabhoj.nic.in': 'indiaculture.gov.in',
    'tide.meity.gov.in': 'meity.gov.in',
    'capfeawas.gov.in': 'mha.gov.in',
    'ehs.capf.gov.in': 'mha.gov.in',
    'penciltraining.nic.in': 'pencil.gov.in',
    'namayush.gov.in': 'ayush.gov.in',
    'agri-atma.in': 'agriwelfare.gov.in',
    'transport.bihar.gov.in': 'serviceonline.bihar.gov.in',
    'crestchd.org.in': 'chandigarh.gov.in',
    'spnfhp.nic.in': 'edistrict.hp.gov.in',
    'himcare.hp.gov.in': 'hpsbys.in',
    'services.jk.gov.in': 'jkeservices.gov.in',
    'jkeservices.gov.in': 'serviceonline.gov.in',
    'awas.jharkhand.gov.in': 'jharsewa.jharkhand.gov.in',
    'ladkibahin.maharashtra.gov.in': 'aaplesarkar.mahaonline.gov.in',
    'chiranjeevi.rajasthan.gov.in': 'sso.rajasthan.gov.in',
    'rythubandhu.telangana.gov.in': 'telangana.gov.in',
    'diupmsme.upsdc.gov.in': 'edistrict.up.gov.in',
    'edistrict.nagaland.gov.in': 'serviceonline.gov.in',
    'edistrict.sikkim.gov.in': 'serviceonline.gov.in',
    'msegs.mizoram.gov.in': 'serviceonline.gov.in',
    'edistrict.tripura.gov.in': 'serviceonline.gov.in',
    'tg.meeseva.gov.in': 'meeseva.telangana.gov.in',
    'kalia.odisha.gov.in': 'kalia.odisha.gov.in',
    'www.aicte-pragati-saksham-gov.in': 'www.aicte-india.org/schemes/students-development-schemes/Pragati'
};

// Map known specific scheme keywords to official myScheme slugs
const KNOWN_MYSCHEME_SLUGS = {
    'beti bachao beti padhao': 'bbbp',
    'pradhan mantri awas yojana - gramin': 'pmay-g',
    'pm awas yojana - gramin': 'pmay-g',
    'pradhan mantri awas yojana - urban': 'pmay-u',
    'pm awas yojana - urban': 'pmay-u',
    'pradhan mantri kisan samman nidhi': 'pm-kisan',
    'pm-kisan': 'pm-kisan',
    'pradhan mantri jan dhan yojana': 'pmjdy',
    'ayushman bharat': 'pmjay',
    'pradhan mantri matru vandana yojana': 'pmmvy',
    'pradhan mantri mudra yojana': 'pmmy',
    'pradhan mantri ujjwala yojana': 'pmuy',
    'stand up india': 'suis',
    'stand-up india': 'suis',
    'startup india seed fund': 'sisfs',
    'pm street vendor': 'pmsvanidhi',
    'pm svanidhi': 'pmsvanidhi',
    'pm vishwakarma': 'pm-vishwakarma',
    'namaste': 'namaste',
    'seed scheme': 'seed',
    'shreshta': 'shreshta',
    'sukanya samriddhi': 'ssy',
    'mahila samman': 'mssc',
    'senior citizens savings': 'scss',
    'public provident fund': 'ppf',
    'kisan credit card': 'kcc',
    'soil health card': 'soil-health-card-scheme',
    'paramparagat krishi': 'pkvy',
    'pradhan mantri fasal bima': 'pmfby',
    'pm fasal bima': 'pmfby',
    'pradhan mantri krishi sinchayee': 'pmksy',
    'pradhan mantri matsya sampada': 'pmmsy',
    'deendayal antyodaya yojana - nrlm': 'day-nrlm',
    'national rural livelihoods mission': 'day-nrlm',
    'deendayal antyodaya yojana - nulm': 'day-nulm',
    'national urban livelihoods mission': 'day-nulm',
    'pm mitra': 'pm-mitra',
    'pm-mitra': 'pm-mitra',
    'pm van dhan': 'pmvdly',
    'van dhan vikas yojana': 'pmvdly'
};

function generateSearchSlug(title) {
    let clean = title
        .replace(/\(.*?\)/g, '')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    const words = clean.split(' ').slice(0, 5).join(' ');
    return encodeURIComponent(words);
}

// Resolve each scheme link
let resolvedCount = 0;
let directPortalCount = 0;
let mySchemeCount = 0;
let statePortalCount = 0;

const updatedSchemes = schemes.map(scheme => {
    let oldLink = scheme.applyLink;
    let newLink = oldLink;

    // 1. Check Flagship Portals by ID
    if (SPECIFIC_FLAGSHIP_PORTALS[scheme.id]) {
        newLink = SPECIFIC_FLAGSHIP_PORTALS[scheme.id];
        directPortalCount++;
    } else {
        // 2. Check title for known myScheme slug
        const lowerTitle = scheme.title.toLowerCase();
        let matchedSlug = null;
        for (const [key, slug] of Object.entries(KNOWN_MYSCHEME_SLUGS)) {
            if (lowerTitle.includes(key)) {
                matchedSlug = slug;
                break;
            }
        }

        if (matchedSlug) {
            newLink = `https://www.myscheme.gov.in/schemes/${matchedSlug}`;
            mySchemeCount++;
        } else {
            // Check scholarship schemes
            if (lowerTitle.includes('scholarship') || lowerTitle.includes('fellowship')) {
                if (scheme.ministry && (scheme.ministry.includes('Science') || scheme.ministry.includes('SERB'))) {
                    newLink = 'https://serbonline.in/';
                    directPortalCount++;
                } else if (lowerTitle.includes('pmrf')) {
                    newLink = 'https://www.pmrf.in/';
                    directPortalCount++;
                } else {
                    newLink = 'https://scholarships.gov.in/';
                    directPortalCount++;
                }
            }
            // Check MSME schemes
            else if (scheme.ministry && scheme.ministry.includes('Micro, Small and Medium')) {
                if (lowerTitle.includes('registration') || lowerTitle.includes('udyam')) {
                    newLink = 'https://udyamregistration.gov.in/';
                } else if (lowerTitle.includes('cgtmse') || lowerTitle.includes('credit guarantee')) {
                    newLink = 'https://www.cgtmse.in/';
                } else if (lowerTitle.includes('pmegp')) {
                    newLink = 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp';
                } else {
                    newLink = `https://www.myscheme.gov.in/search?q=${generateSearchSlug(scheme.title)}`;
                }
                directPortalCount++;
            }
            // Check Startups / Commerce
            else if (scheme.ministry && scheme.ministry.includes('Commerce and Industry')) {
                if (lowerTitle.includes('seed fund')) {
                    newLink = 'https://seedfund.startupindia.gov.in/';
                } else if (lowerTitle.includes('startup')) {
                    newLink = 'https://www.startupindia.gov.in/';
                } else if (lowerTitle.includes('patent') || lowerTitle.includes('intellectual property') || lowerTitle.includes('ipr')) {
                    newLink = 'https://ipindia.gov.in/';
                } else if (lowerTitle.includes('odop')) {
                    newLink = 'https://www.investindia.gov.in/one-district-one-product';
                } else if (lowerTitle.includes('export') || lowerTitle.includes('dgft') || lowerTitle.includes('rodtep') || lowerTitle.includes('epcg')) {
                    newLink = 'https://www.dgft.gov.in/';
                } else {
                    newLink = `https://www.myscheme.gov.in/search?q=${generateSearchSlug(scheme.title)}`;
                }
                directPortalCount++;
            }
            // Check Textiles
            else if (scheme.ministry && scheme.ministry.includes('Textiles')) {
                if (lowerTitle.includes('samarth')) {
                    newLink = 'https://samarth.texmin.gov.in/';
                } else if (lowerTitle.includes('silk')) {
                    newLink = 'https://csb.gov.in/';
                } else if (lowerTitle.includes('handloom')) {
                    newLink = 'https://handlooms.nic.in/';
                } else if (lowerTitle.includes('handicraft')) {
                    newLink = 'https://handicrafts.nic.in/';
                } else {
                    newLink = `https://www.myscheme.gov.in/search?q=${generateSearchSlug(scheme.title)}`;
                }
                directPortalCount++;
            }
            // Check Defence
            else if (scheme.ministry && scheme.ministry.includes('Defence')) {
                if (lowerTitle.includes('sparsh') || lowerTitle.includes('pension')) {
                    newLink = 'https://sparsh.defencepension.gov.in/';
                } else if (lowerTitle.includes('sainik') || lowerTitle.includes('ksb') || lowerTitle.includes('ward') || lowerTitle.includes('ex-servicemen financial')) {
                    newLink = 'https://ksb.gov.in/';
                } else if (lowerTitle.includes('echs') || lowerTitle.includes('health') || lowerTitle.includes('medical')) {
                    newLink = 'https://echs.gov.in/';
                } else {
                    newLink = `https://www.myscheme.gov.in/search?q=${generateSearchSlug(scheme.title)}`;
                }
                directPortalCount++;
            }
            // Check State schemes
            else if (scheme.type === 'state') {
                statePortalCount++;
                try {
                    const u = new URL(oldLink);
                    if (DOMAIN_REPLACEMENTS[u.hostname]) {
                        u.hostname = DOMAIN_REPLACEMENTS[u.hostname];
                        newLink = u.href;
                    }
                } catch (e) {
                    newLink = 'https://serviceonline.gov.in/';
                }
            }
            // Check domain replacements for any other link
            else {
                try {
                    const u = new URL(oldLink);
                    if (DOMAIN_REPLACEMENTS[u.hostname]) {
                        const target = DOMAIN_REPLACEMENTS[u.hostname];
                        if (target.startsWith('http')) {
                            newLink = target;
                        } else {
                            u.hostname = target;
                            newLink = u.href;
                        }
                    } else if (u.pathname === '/' || u.pathname === '') {
                        // Point generic root ministry domains to specific scheme search on myScheme
                        newLink = `https://www.myscheme.gov.in/search?q=${generateSearchSlug(scheme.title)}`;
                        mySchemeCount++;
                    }
                } catch (e) {
                    newLink = `https://www.myscheme.gov.in/search?q=${generateSearchSlug(scheme.title)}`;
                    mySchemeCount++;
                }
            }
        }
    }

    // Safety checks: Ensure protocol is https
    if (newLink.startsWith('http://') && !newLink.includes('localhost')) {
        newLink = newLink.replace('http://', 'https://');
    }

    if (newLink !== oldLink) {
        resolvedCount++;
    }

    return {
        ...scheme,
        applyLink: newLink
    };
});

console.log(`Resolution completed:`);
console.log(`- Total schemes: ${updatedSchemes.length}`);
console.log(`- Total links updated/refined: ${resolvedCount}`);
console.log(`- Dedicated Flagship / Program Portals: ${directPortalCount}`);
console.log(`- Specific myScheme Direct / Search Pages: ${mySchemeCount}`);
console.log(`- State Service Portals: ${statePortalCount}`);

// Write back to backend/data/schemes.json
fs.writeFileSync(SCHEMES_JSON_PATH, JSON.stringify(updatedSchemes, null, 2), 'utf8');
console.log(`Updated ${SCHEMES_JSON_PATH} successfully!`);

// Write back to frontend/assets/js/data.js
let dataJsContent = fs.readFileSync(DATA_JS_PATH, 'utf8');
const schemesArrayStr = JSON.stringify(updatedSchemes, null, 4);
const dataJsRegex = /(const\s+SAMPLE_SCHEMES\s*=\s*)\[[\s\S]*?\];/;
if (dataJsRegex.test(dataJsContent)) {
    dataJsContent = dataJsContent.replace(dataJsRegex, `$1${schemesArrayStr};`);
    fs.writeFileSync(DATA_JS_PATH, dataJsContent, 'utf8');
    console.log(`Updated ${DATA_JS_PATH} successfully!`);
} else {
    console.error(`Could not match SAMPLE_SCHEMES in ${DATA_JS_PATH}`);
}

// Write back to script.js
let scriptJsContent = fs.readFileSync(SCRIPT_JS_PATH, 'utf8');
const scriptJsRegex = /(const\s+SAMPLE_SCHEMES\s*=\s*)\[[\s\S]*?\];/;
if (scriptJsRegex.test(scriptJsContent)) {
    scriptJsContent = scriptJsContent.replace(scriptJsRegex, `$1${schemesArrayStr};`);
    fs.writeFileSync(SCRIPT_JS_PATH, scriptJsContent, 'utf8');
    console.log(`Updated ${SCRIPT_JS_PATH} successfully!`);
} else {
    console.error(`Could not match SAMPLE_SCHEMES in ${SCRIPT_JS_PATH}`);
}
