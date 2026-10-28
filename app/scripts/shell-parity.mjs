#!/usr/bin/env node
/**
 * Visual parity of the app shell: captured reference vs. the local frontend.
 *
 * Reference: the captured server-rendered HTML of each route, served offline with
 * its captured CSS, fonts and images. Every captured <script> is removed and
 * captured JavaScript is never served, so no original code runs. React's streamed
 * segments are placed by a small replay of the documented $RS/$RC swap semantics,
 * using the swap calls recorded in the page. Pre-paint state the captured scripts
 * would set (signed out, terms accepted) is applied as the same <html> attributes.
 *
 * Local: the running frontend (`next start`), same viewport and state.
 *
 * Both renders get identical masks: animations off, page content hidden behind a
 * fixed-height container (this measures the shell, not page bodies). Surfaces
 * excluded by app/AGENTS.md (mobile-app promotion banner, "Get the app") are
 * removed from the reference only. Screenshots and a pixel diff are written to
 * --out with a JSON report. Requires Google Chrome; uses only Node built-ins.
 *
 *   node scripts/shell-parity.mjs --local http://127.0.0.1:3000 --out qualification/shell
 */
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const VIEWPORTS = {
  desktop: { width: 1440, height: 900, mobile: false },
  mobile: { width: 390, height: 844, mobile: true },
};
const CASES = [
  { state: 'accepted', route: '/' },
  { state: 'accepted', route: '/explore' },
  { state: 'first-visit', route: '/' },
];
/** A pixel differs when any channel differs by more than this (absorbs anti-aliasing). */
const CHANNEL_TOLERANCE = 24;
const CELL = 16;

const MASK_BOTH = `
*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}
.pump-page-container>*{display:none!important}
.pump-page-container{min-height:600px!important}
[data-clickwrap-overlay]>div>:first-child{visibility:hidden!important}
`;
const MASK_REFERENCE = `
#appsflyer-smart-banner-host+.max-md\\:hidden{display:none!important}
li:has(>[data-testid=try-app-button-sidebar]){display:none!important}
`;

const REPLAY = `(function(ops){
function rs(s,p){s=document.getElementById(s);p=document.getElementById(p);if(!s||!p)return;s.parentNode.removeChild(s);while(s.firstChild)p.parentNode.insertBefore(s.firstChild,p);p.parentNode.removeChild(p);}
function rc(b,s){s=document.getElementById(s);if(!s)return;s.parentNode.removeChild(s);var t=document.getElementById(b);if(!t)return;var start=t.previousSibling,parent=start.parentNode,n=start.nextSibling,depth=0;do{if(n&&n.nodeType===8){var d=n.data;if(d==='/$'){if(depth===0)break;depth--;}else if(d==='$'||d==='$?'||d==='$!')depth++;}var next=n.nextSibling;parent.removeChild(n);n=next;}while(n);while(s.firstChild)parent.insertBefore(s.firstChild,n);start.data='$';}
ops.forEach(function(o){o[0]==='S'?rs(o[1],o[2]):rc(o[1],o[2]);});
})`;

function referenceHtml(html, state) {
  const ops = [...html.matchAll(/\$R([CS])\("([A-Z]:\d+)","([A-Z]:\d+)"\)/g)].map((m) => [m[1], m[2], m[3]]);
  const stripped = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const attributes = state === 'accepted' ? ' data-pf-auth="out" data-clickwrap-accepted=""' : ' data-pf-auth="out"';
  // Replacer functions: the replay source contains `$'`, which a replacement string would expand.
  return stripped
    .replace(/<html\b/, () => `<html${attributes}`)
    .replace('</body>', () => `<script>${REPLAY}(${JSON.stringify(ops)})</script></body>`);
}

function startReferenceServer(state) {
  const manifest = JSON.parse(readFileSync(join(ROOT, 'evidence/web/manifest.json'), 'utf8'));
  const byPath = new Map();
  for (const record of manifest.records) {
    if (record.status === 200) byPath.set(new URL(record.url).pathname, record);
  }
  const server = createServer((request, response) => {
    const record = byPath.get(new URL(request.url, 'http://reference').pathname);
    const type = record?.headers['content-type'] ?? '';
    if (!record || type.includes('javascript')) {
      response.writeHead(404).end();
      return;
    }
    let body = readFileSync(join(ROOT, record.path));
    if (type.startsWith('text/html')) body = Buffer.from(referenceHtml(body.toString('utf8'), state));
    response.writeHead(200, { 'content-type': type }).end(body);
  });
  return new Promise((ready) => server.listen(0, '127.0.0.1', () => ready(server)));
}

class Cdp {
  #id = 0;
  #pending = new Map();
  #listeners = new Map();
  constructor(socket) {
    this.socket = socket;
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.#pending.get(message.id);
        this.#pending.delete(message.id);
        if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
        else pending.resolve(message.result);
      } else {
        for (const listener of this.#listeners.get(`${message.sessionId ?? ''}:${message.method}`) ?? []) listener(message.params);
      }
    });
  }
  send(method, params = {}, sessionId) {
    const id = ++this.#id;
    this.socket.send(JSON.stringify({ id, method, params, sessionId }));
    return new Promise((resolve, reject) => this.#pending.set(id, { resolve, reject, method }));
  }
  once(method, sessionId) {
    const key = `${sessionId ?? ''}:${method}`;
    return new Promise((resolve) => {
      const listener = (params) => {
        this.#listeners.set(key, (this.#listeners.get(key) ?? []).filter((l) => l !== listener));
        resolve(params);
      };
      this.#listeners.set(key, [...(this.#listeners.get(key) ?? []), listener]);
    });
  }
}

async function launchChrome(chrome) {
  const profile = mkdtempSync(join(tmpdir(), 'shell-parity-'));
  const child = spawn(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    '--force-device-scale-factor=1', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  const endpoint = await new Promise((found, failed) => {
    let output = '';
    child.stderr.on('data', (chunk) => {
      output += chunk;
      const match = output.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) found(match[1]);
    });
    child.on('exit', () => failed(new Error(`Chrome exited before DevTools was ready:\n${output}`)));
  });
  const socket = new WebSocket(endpoint);
  await new Promise((open) => socket.addEventListener('open', open, { once: true }));
  return {
    cdp: new Cdp(socket),
    close: async () => {
      socket.close();
      const exited = new Promise((done) => child.once('exit', done));
      child.kill();
      await exited; // Chrome writes to its profile until it exits
      rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    },
  };
}

async function evaluate(cdp, sessionId, expression) {
  const { result, exceptionDetails } = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
  if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
  return result.value;
}

async function capture(cdp, { url, viewport, cookies = [], css }) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  try {
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Network.enable', {}, sessionId);
    await cdp.send('Emulation.setDeviceMetricsOverride', { ...viewport, deviceScaleFactor: 1 }, sessionId);
    for (const cookie of cookies) await cdp.send('Network.setCookie', { ...cookie, url }, sessionId);
    const loaded = cdp.once('Page.loadEventFired', sessionId);
    await cdp.send('Page.navigate', { url }, sessionId);
    await loaded;
    await evaluate(cdp, sessionId, `(async () => {
      const style = document.createElement('style'); style.textContent = ${JSON.stringify(css)}; document.head.append(style);
      await document.fonts.ready; await new Promise((r) => setTimeout(r, 400)); return true; })()`);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' }, sessionId);
    return data;
  } finally {
    await cdp.send('Target.closeTarget', { targetId });
  }
}

/** Pixel diff in the browser's canvas; returns counts, merged regions and a diff image. */
async function diff(cdp, reference, local) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  try {
    return await evaluate(cdp, sessionId, `(async () => {
      const load = (b64) => new Promise((ok, fail) => { const i = new Image(); i.onload = () => ok(i); i.onerror = fail; i.src = 'data:image/png;base64,' + b64; });
      const [a, b] = await Promise.all([load(${JSON.stringify(reference)}), load(${JSON.stringify(local)})]);
      const w = Math.max(a.width, b.width), h = Math.max(a.height, b.height);
      const pixels = (img) => { const c = new OffscreenCanvas(w, h), x = c.getContext('2d'); x.fillStyle = '#ff00ff'; x.fillRect(0, 0, w, h); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h).data; };
      const pa = pixels(a), pb = pixels(b);
      const out = new OffscreenCanvas(w, h), ox = out.getContext('2d'); ox.globalAlpha = 0.25; ox.drawImage(a, 0, 0); ox.globalAlpha = 1;
      const marks = ox.getImageData(0, 0, w, h), md = marks.data;
      const cols = Math.ceil(w / ${CELL}), rows = Math.ceil(h / ${CELL}), cells = new Uint32Array(cols * rows);
      let differing = 0;
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        if (Math.max(Math.abs(pa[i] - pb[i]), Math.abs(pa[i + 1] - pb[i + 1]), Math.abs(pa[i + 2] - pb[i + 2])) > ${CHANNEL_TOLERANCE}) {
          differing++; md[i] = 255; md[i + 1] = 0; md[i + 2] = 0; md[i + 3] = 255;
          cells[Math.floor(y / ${CELL}) * cols + Math.floor(x / ${CELL})]++;
        }
      }
      ox.putImageData(marks, 0, 0);
      const seen = new Uint8Array(cols * rows), regions = [];
      for (let s = 0; s < cells.length; s++) {
        if (!cells[s] || seen[s]) continue;
        const stack = [s]; seen[s] = 1; let x0 = cols, y0 = rows, x1 = 0, y1 = 0, count = 0;
        while (stack.length) {
          const c = stack.pop(), cx = c % cols, cy = (c - cx) / cols; count += cells[c];
          x0 = Math.min(x0, cx); y0 = Math.min(y0, cy); x1 = Math.max(x1, cx); y1 = Math.max(y1, cy);
          for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const nx = cx + dx, ny = cy + dy, n = ny * cols + nx;
            if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && cells[n] && !seen[n]) { seen[n] = 1; stack.push(n); }
          }
        }
        regions.push({ x: x0 * ${CELL}, y: y0 * ${CELL}, width: (x1 - x0 + 1) * ${CELL}, height: (y1 - y0 + 1) * ${CELL}, pixels: count });
      }
      regions.sort((p, q) => q.pixels - p.pixels);
      const blob = await out.convertToBlob({ type: 'image/png' });
      const bytes = new Uint8Array(await blob.arrayBuffer()); let binary = '';
      for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return { width: w, height: h, sameSize: a.width === b.width && a.height === b.height, differingPixels: differing,
               differingRatio: differing / (w * h), regions: regions.slice(0, 12), diffPng: btoa(binary) };
    })()`);
  } finally {
    await cdp.send('Target.closeTarget', { targetId });
  }
}

function slug(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '-');
}

async function main() {
  const { values } = parseArgs({
    options: {
      local: { type: 'string', default: 'http://127.0.0.1:3000' },
      out: { type: 'string', default: 'qualification/shell' },
      chrome: { type: 'string', default: process.env.CHROME_PATH ?? DEFAULT_CHROME },
    },
  });
  const out = resolve(ROOT, values.out);
  mkdirSync(out, { recursive: true });
  const servers = { accepted: await startReferenceServer('accepted'), 'first-visit': await startReferenceServer('first-visit') };
  const browser = await launchChrome(values.chrome);
  const results = [];
  try {
    for (const { state, route } of CASES) {
      const referenceUrl = `http://127.0.0.1:${servers[state].address().port}${route}`;
      const localUrl = new URL(route, values.local).href;
      const cookies = state === 'accepted' ? [{ name: 'clickwrap_accepted', value: 'true' }] : [];
      for (const [name, viewport] of Object.entries(VIEWPORTS)) {
        const reference = await capture(browser.cdp, { url: referenceUrl, viewport, css: MASK_BOTH + MASK_REFERENCE });
        const local = await capture(browser.cdp, { url: localUrl, viewport, cookies, css: MASK_BOTH });
        const { diffPng, ...measured } = await diff(browser.cdp, reference, local);
        const base = `${state}-${slug(route)}-${name}`;
        writeFileSync(join(out, `${base}-reference.png`), Buffer.from(reference, 'base64'));
        writeFileSync(join(out, `${base}-local.png`), Buffer.from(local, 'base64'));
        writeFileSync(join(out, `${base}-diff.png`), Buffer.from(diffPng, 'base64'));
        results.push({ state, route, viewport: name, ...viewport, ...measured, files: [`${base}-reference.png`, `${base}-local.png`, `${base}-diff.png`] });
        console.log(`${base.padEnd(32)} differing ${(measured.differingRatio * 100).toFixed(2).padStart(6)}%  (${measured.differingPixels} px, ${measured.regions.length} regions)`);
      }
    }
  } finally {
    await browser.close();
    for (const server of Object.values(servers)) server.close();
  }
  const report = {
    scope: 'App-shell visual parity: captured server-rendered reference vs. local frontend, same viewport and state.',
    method: {
      reference: 'Captured HTML with every <script> removed and captured JS unserved; streamed segments placed by a replay of the recorded $RS/$RC calls; <html> state attributes applied for signed-out (and terms-accepted) visits.',
      local: values.local,
      masksBothRenders: MASK_BOTH.trim().split('\n'),
      excludedFromReferenceOnly: MASK_REFERENCE.trim().split('\n'),
      channelTolerance: CHANNEL_TOLERANCE,
      regionCellPixels: CELL,
    },
    limits: [
      'Measures the shell around a masked page body; page bodies and live data are not compared.',
      'The reference is server-rendered HTML without client hydration, i.e. the first-paint state.',
      'Pixel equality is a visual check, not DOM, behavior or accessibility equivalence.',
    ],
    results,
  };
  writeFileSync(join(out, 'parity.json'), JSON.stringify(report, null, 2) + '\n');
}

await main();
