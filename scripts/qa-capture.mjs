import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const [url, widthValue = '1440', heightValue = '1000', outputValue = 'qa-capture.png', motionValue = 'no-preference', captureMode = 'viewport', waitValue = '5200'] = process.argv.slice(2);
if (!url) throw new Error('Usage: npm run qa:capture -- <url> [width] [height] [output]');

const width = Number(widthValue);
const height = Number(heightValue);
const captureDelay = Number(waitValue);
const output = path.resolve(outputValue);
const chrome = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9333 + Math.floor(Math.random() * 400);
const profile = path.join(os.tmpdir(), `monsterminds-cdp-${Date.now()}`);

await mkdir(path.dirname(output), { recursive: true });
const browser = spawn(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--disable-extensions',
  '--no-first-run',
  '--hide-scrollbars',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  'about:blank',
], { stdio: 'ignore' });

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getTarget() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await response.json();
      const page = targets.find((target) => target.type === 'page');
      if (page) return page;
    } catch {
      // Chrome may need a moment to open its debugging socket.
    }
    await delay(100);
  }
  throw new Error('Chrome DevTools endpoint did not become available.');
}

try {
  const target = await getTarget();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let sequence = 0;
  const pending = new Map();
  const runtimeIssues = [];

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }
    if (message.method === 'Runtime.exceptionThrown') runtimeIssues.push(message.params.exceptionDetails.text);
    if (message.method === 'Log.entryAdded' && ['error', 'warning'].includes(message.params.entry.level)) {
      runtimeIssues.push(`${message.params.entry.level}: ${message.params.entry.text}`);
    }
    if (message.method === 'Network.loadingFailed' && !message.params.canceled) {
      runtimeIssues.push(`network: ${message.params.errorText} (${message.params.type})`);
    }
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await Promise.all([send('Page.enable'), send('Runtime.enable'), send('Log.enable'), send('Network.enable')]);
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
    screenWidth: width,
    screenHeight: height,
  });
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: motionValue }],
  });
  await send('Page.navigate', { url });
  await delay(captureDelay);
  if (captureMode === 'full') {
    const pageHeight = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true });
    for (let y = 0; y < pageHeight.result.value; y += Math.round(height * 0.72)) {
      await send('Runtime.evaluate', { expression: `scrollTo(0, ${y})` });
      await delay(180);
    }
    await send('Runtime.evaluate', { expression: 'scrollTo(0, 0)' });
    await delay(700);
  }
  if (captureMode === 'menu') {
    await send('Runtime.evaluate', { expression: `document.querySelector('.menu-toggle')?.click()` });
    await delay(700);
  }

  const metrics = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      width: innerWidth,
      height: innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      introPending: document.documentElement.classList.contains('mm-intro-pending'),
      introVisibility: getComputedStyle(document.querySelector('[data-cinematic-intro]')).visibility,
      heading: document.querySelector('h1')?.innerText,
      criticalImagesComplete: [...document.images].filter((image) => image.loading !== 'lazy').every((image) => image.complete && image.naturalWidth > 0),
      missingCriticalImages: [...document.images].filter((image) => image.loading !== 'lazy' && (!image.complete || image.naturalWidth === 0)).map((image) => image.src),
      introSeen: sessionStorage.getItem('mm-intro-seen'),
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches
    })`,
    returnByValue: true,
  });
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: captureMode === 'full' });
  await writeFile(output, Buffer.from(screenshot.data, 'base64'));
  let replayMetrics = null;
  let menuMetrics = null;
  if (captureDelay >= 4000) {
    await send('Page.reload');
    await delay(1400);
    const replay = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        introPending: document.documentElement.classList.contains('mm-intro-pending'),
        introVisibility: getComputedStyle(document.querySelector('[data-cinematic-intro]')).visibility,
        introSeen: sessionStorage.getItem('mm-intro-seen')
      })`,
      returnByValue: true,
    });
    replayMetrics = JSON.parse(replay.result.value);
  }
  if (captureDelay >= 4000 && width < 1088) {
    await send('Runtime.evaluate', { expression: `document.querySelector('.menu-toggle')?.click()` });
    await delay(600);
    const openMenu = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        expanded: document.querySelector('.menu-toggle')?.getAttribute('aria-expanded'),
        menuHidden: document.querySelector('.mobile-menu')?.hidden,
        menuOpen: document.querySelector('.mobile-menu')?.classList.contains('is-open'),
        bodyLocked: document.body.classList.contains('menu-open'),
        focusInMenu: Boolean(document.activeElement?.closest('.mobile-menu')),
        menuClientHeight: document.querySelector('.mobile-menu')?.clientHeight,
        menuScrollHeight: document.querySelector('.mobile-menu')?.scrollHeight,
        menuOverflowY: getComputedStyle(document.querySelector('.mobile-menu')).overflowY
      })`,
      returnByValue: true,
    });
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await delay(550);
    const closedMenu = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        expanded: document.querySelector('.menu-toggle')?.getAttribute('aria-expanded'),
        menuHidden: document.querySelector('.mobile-menu')?.hidden,
        bodyLocked: document.body.classList.contains('menu-open'),
        focusReturned: document.activeElement === document.querySelector('.menu-toggle')
      })`,
      returnByValue: true,
    });
    menuMetrics = { open: JSON.parse(openMenu.result.value), closed: JSON.parse(closedMenu.result.value) };
  }

  console.log(JSON.stringify({
    output,
    metrics: JSON.parse(metrics.result.value),
    replayMetrics,
    menuMetrics,
    runtimeIssues: [...new Set(runtimeIssues)],
  }, null, 2));
  socket.close();
} finally {
  browser.kill();
  await delay(500);
  if (path.dirname(profile) === os.tmpdir() && path.basename(profile).startsWith('monsterminds-cdp-')) {
    try {
      await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 });
    } catch {
      // Windows can hold a short-lived Crashpad file lock after Chrome exits.
    }
  }
}
