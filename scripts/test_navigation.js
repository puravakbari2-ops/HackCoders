const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

class CDPClient {
    constructor(wsUrl) {
        this.wsUrl = wsUrl;
        this.msgId = 0;
        this.callbacks = new Map();
    }
    async connect() {
        this.ws = new WebSocket(this.wsUrl);
        await new Promise((resolve, reject) => {
            this.ws.onopen = resolve;
            this.ws.onerror = reject;
        });
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.id && this.callbacks.has(data.id)) {
                const cb = this.callbacks.get(data.id);
                this.callbacks.delete(data.id);
                if (data.error) cb.reject(data.error);
                else cb.resolve(data.result);
            }
        };
    }
    send(method, params = {}) {
        return new Promise((resolve, reject) => {
            const id = ++this.msgId;
            this.callbacks.set(id, { resolve, reject });
            this.ws.send(JSON.stringify({ id, method, params }));
        });
    }
    async eval(expr) {
        const res = await this.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
        return res.result ? res.result.value : null;
    }
    close() { if (this.ws) this.ws.close(); }
}

async function main() {
    const tempProfile = path.join(process.cwd(), 'temp_chrome_profile');
    const chromeProcess = spawn(CHROME_PATH, [
        '--headless=new',
        '--disable-gpu',
        '--remote-debugging-port=9222',
        `--user-data-dir=${tempProfile}`,
        'about:blank'
    ]);

    let list = null;
    for (let i = 0; i < 20; i++) {
        await sleep(300);
        try {
            list = await fetchJson('http://127.0.0.1:9222/json/list');
            if (list && list.length > 0) break;
        } catch (e) {}
    }

    const cdp = new CDPClient(list[0].webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    console.log('1. Loading homepage with search query PMJDY...');
    await cdp.send('Page.navigate', { url: 'http://localhost:5000/index.html?search=PMJDY' });
    await sleep(2000);

    const cardsCount = await cdp.eval('document.querySelectorAll(".result-card").length');
    console.log('Result cards found:', cardsCount);

    const firstCardViewBtn = await cdp.eval('document.querySelector(".result-card-view-btn")?.href');
    console.log('First card View Details href:', firstCardViewBtn);

    console.log('2. Clicking "View Details" button...');
    await cdp.eval('document.querySelector(".result-card-view-btn").click()');
    await sleep(2500);

    const currentUrl = await cdp.eval('window.location.href');
    console.log('Page URL after click:', currentUrl);

    const detailHeroTitle = await cdp.eval('document.getElementById("heroTitle")?.textContent');
    console.log('Scheme Details Page Title:', detailHeroTitle);

    const quickFactsCount = await cdp.eval('document.querySelectorAll("#quickFactsList li").length');
    console.log('Quick Facts count:', quickFactsCount);

    cdp.close();
    chromeProcess.kill();

    if (currentUrl.includes('scheme-details.html?id=1') && detailHeroTitle.includes('Pradhan Mantri')) {
        console.log('\n=== END-TO-END VERIFICATION: 100% SUCCESSFUL ===');
    } else {
        console.error('\nVerification failed');
        process.exit(1);
    }
}

main().catch(e => { console.error(e); process.exit(1); });
