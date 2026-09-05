const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\Harshil\\.gemini\\antigravity-ide\\brain\\90c8f832-3430-42c1-a178-5d9cb61e5218';

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
            });
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
        const res = await this.send('Runtime.evaluate', {
            expression: expr,
            returnByValue: true,
            awaitPromise: true
        });
        return res.result ? res.result.value : null;
    }
    async screenshot(filePath) {
        const res = await this.send('Page.captureScreenshot', {
            format: 'png',
            captureBeyondViewport: false
        });
        fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    }
    close() {
        if (this.ws) this.ws.close();
    }
}

async function main() {
    const tempProfile = path.join(process.cwd(), 'temp_chrome_profile');
    const chromeProcess = spawn(CHROME_PATH, [
        '--headless=new',
        '--disable-gpu',
        '--remote-debugging-port=9222',
        `--user-data-dir=${tempProfile}`,
        '--window-size=1440,1100',
        'about:blank'
    ]);

    let list = null;
    for (let i = 0; i < 20; i++) {
        await sleep(400);
        try {
            list = await fetchJson('http://127.0.0.1:9222/json/list');
            if (list && list.length > 0) break;
        } catch (e) {}
    }

    const cdp = new CDPClient(list[0].webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    await cdp.send('Page.navigate', { url: 'http://localhost:5000/scheme-details.html?id=1' });
    await sleep(2000);

    // Scroll to tabs
    await cdp.eval('window.scrollTo({top: 450, behavior: "instant"})');
    await sleep(300);

    // 1. Benefits Tab
    await cdp.eval('document.querySelector(\'[data-tab="benefits"]\')?.click()');
    await sleep(400);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'tab_benefits_preview.png'));

    // 2. Eligibility Tab
    await cdp.eval('document.querySelector(\'[data-tab="eligibility"]\')?.click()');
    await sleep(400);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'tab_eligibility_preview.png'));

    // 3. Application Process Tab
    await cdp.eval('document.querySelector(\'[data-tab="process"]\')?.click()');
    await sleep(400);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'tab_process_preview.png'));

    // 4. Documents Tab
    await cdp.eval('document.querySelector(\'[data-tab="documents"]\')?.click()');
    await sleep(400);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'tab_documents_preview.png'));

    // 5. FAQs Tab
    await cdp.eval('document.querySelector(\'[data-tab="faqs"]\')?.click()');
    await cdp.eval('window.toggleSchemeFAQ(1); window.toggleSchemeFAQ(2);');
    await sleep(400);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'tab_faqs_preview.png'));

    cdp.close();
    chromeProcess.kill();
    console.log('All tab preview screenshots generated successfully!');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
