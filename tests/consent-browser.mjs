// Production-browser lifecycle checks. All optional services and contact POSTs
// are intercepted, including when MPG_BASE_URL is the canonical live site.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const output = process.env.MPG_EVIDENCE_DIR;
assert.ok(output && path.isAbsolute(output));
const base = process.env.MPG_BASE_URL || 'http://127.0.0.1:3108';
const { chromium } = await import(pathToFileURL(process.env.MPG_PLAYWRIGHT_MODULE));
const key = 'mpg-analytics-consent', preferenceCookie = 'mpg_analytics_choice';
const serialise = analytics => JSON.stringify({ version: 1, analytics });
const record = { base, time: new Date().toISOString(), scenarios: [], requests: [], errors: [], contacts: 0 };
const mockTag = `(() => {
  const disabled = () => window['ga-disable-G-1T14DW2GGH'];
  function emit(name, data = {}) {
    if (disabled()) return;
    document.cookie = '_ga=synthetic; Path=/; SameSite=Lax';
    document.cookie = '_ga_1T14DW2GGH=synthetic; Path=/; SameSite=Lax';
    const query = new URLSearchParams({en:name,dl:data.page_location || ''}).toString();
    fetch('https://www.google-analytics.com/g/collect?' + query, {method:'POST'}).catch(() => {});
  }
  const queued = window.dataLayer;
  const process = args => {
    if (args[0] === 'config' && args[2].send_page_view !== false) emit('page_view', args[2]);
    if (args[0] === 'event') emit(args[1], args[2]);
  };
  window.dataLayer = [];
  window.dataLayer.push = args => { Array.prototype.push.call(window.dataLayer,args); process(args); };
  queued.forEach(process);
  setInterval(() => emit('test_heartbeat'), 100);
})();`;
const browser = await chromium.launch({ headless: true, executablePath: process.env.MPG_CHROMIUM_PATH, args: ['--no-sandbox'], env: { ...process.env, LD_LIBRARY_PATH: process.env.MPG_BROWSER_LIBS } });
let releaseLoader;
async function contextFor({ raw, cookieRaw, storageFailure, delayed = false, width = 1440 } = {}) {
  const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  await context.addInitScript(({ key, raw, storageFailure }) => {
    // A newly created page has an opaque about:blank document before goto.
    // Seed only the real website, rather than throwing from test setup there.
    if (window.top !== window || !/^https?:$/.test(location.protocol)) return;
    if (raw !== undefined) localStorage.setItem(key, raw);
    localStorage.setItem('mpg-unrelated', 'synthetic-preserved');
    if (storageFailure === 'unavailable') Object.defineProperty(window, 'localStorage', { get() { throw new Error('Synthetic storage unavailable'); } });
    if (storageFailure === 'readonly') {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (name, value) { if (name === key) throw new Error('Synthetic readonly storage'); return original.call(this, name, value); };
    }
    window.__mpgCLS = 0;
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__mpgCLS += entry.value; }).observe({ type: 'layout-shift', buffered: true });
  }, { key, raw, storageFailure });
  await context.addCookies([{ name: 'unrelated_session', value: 'synthetic-preserved', url: base }]);
  if (cookieRaw !== undefined) await context.addCookies([{ name: preferenceCookie, value: encodeURIComponent(cookieRaw), url: base }]);
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    const optional = /googletagmanager\.com|google-analytics\.com/.test(url.hostname) || /\/_vercel\/(?:insights|speed-insights)/.test(url.pathname);
    if (optional) {
      record.requests.push({ time: Date.now(), origin: url.origin, path: url.pathname, params: Object.fromEntries(url.searchParams), page: request.frame().page().url(), type: request.resourceType() });
      if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtag/js') {
        if (delayed) await new Promise(resolve => { releaseLoader = resolve; });
        try { await route.fulfill({ contentType: 'application/javascript', body: mockTag }); } catch { /* A withdrawn frame may cancel its in-flight loader. */ }
      } else await route.fulfill({ status: 204, body: '' });
      return;
    }
    if (url.origin === base && url.pathname === '/api/contact' && request.method() === 'POST') {
      record.contacts++;
      await route.fulfill({ contentType: 'application/json', body: '{"success":true}' }); return;
    }
    if (url.origin === base && ['GET', 'HEAD'].includes(request.method())) { await route.continue(); return; }
    await route.abort();
  });
  context.on('page', page => page.on('pageerror', error => record.errors.push(error.message)));
  return context;
}
const loaders = () => record.requests.filter(r => r.path === '/gtag/js').length;
const collectors = () => record.requests.filter(r => r.path === '/g/collect').length;
const pageviews = () => record.requests.filter(r => r.params.en === 'page_view');
async function frameCount(page) { return page.locator('iframe[data-mpg-analytics]').count(); }
async function waitFor(predicate) { for (let i = 0; i < 100; i++) { if (await predicate()) return; await new Promise(resolve => setTimeout(resolve, 20)); } assert.fail('Timed out waiting for lifecycle state'); }
async function open(page) {
  await page.getByRole('button', { name: 'Cookie preferences', exact: true }).click();
  await waitFor(() => page.locator('#cookie-preferences-title').evaluate(e => e === document.activeElement));
}
async function choose(page, analytics) {
  if (!await page.locator('#cookie-preferences').isVisible()) await open(page);
  await page.locator('#cookie-preferences').getByRole('button', { name: analytics ? 'Accept analytics' : /Decline analytics|Withdraw analytics/ }).click();
}
async function optionalCookies(context) { return (await context.cookies()).filter(c => c.name === '_ga' || c.name === '_ga_1T14DW2GGH'); }
async function fillEnquiry(page) {
  await page.getByLabel('Name', { exact: false }).fill('Synthetic Cookie Example');
  await page.getByLabel('Email', { exact: false }).fill('cookie-test@example.test');
  await page.getByLabel('Phone', { exact: false }).fill('+27 71 172 0480');
  await page.getByLabel('Number of Properties', { exact: false }).fill('2');
}
try {
  // New/ignored/declined choice: real DOM, focus, cookie and attempted-network checks.
  let context = await contextFor({ width: 390 });
  let page = await context.newPage();
  const before = record.requests.length;
  await page.goto(base + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  assert.equal(record.requests.length, before);
  assert.equal(await frameCount(page), 0);
  assert.equal((await optionalCookies(context)).length, 0);
  await fillEnquiry(page);
  await open(page);
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator('#cookie-preferences').scrollIntoViewIfNeeded();
    await waitFor(() => page.locator('.cookie-aware-whatsapp').evaluate(e => getComputedStyle(e).visibility === 'hidden'));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    const buttons = await page.locator('.cookie-choice-button').evaluateAll(es => es.map(e => ({ height: e.getBoundingClientRect().height, colour: getComputedStyle(e).color, background: getComputedStyle(e).backgroundColor })));
    assert.equal(buttons.length, 2); assert.deepEqual(buttons[0], buttons[1]); assert.ok(buttons[0].height >= 44);
    await page.screenshot({ path: path.join(output, `screenshots/consent-visible-${width}.png`) });
  }
  await page.getByRole('button', { name: 'Decline analytics' }).focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.getByLabel('Name', { exact: false }).inputValue(), 'Synthetic Cookie Example');
  assert.equal(await page.locator('#cookie-preferences').isVisible(), false);
  await waitFor(() => page.locator('.cookie-aware-whatsapp').evaluate(e => getComputedStyle(e).visibility === 'visible'));
  assert.equal(record.requests.length, before);
  assert.equal((await optionalCookies(context)).length, 0);
  await page.getByRole('button', { name: 'Send Enquiry' }).click();
  await page.getByRole('heading', { name: 'Thank you!' }).waitFor();
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('#cookie-preferences').isVisible(), false);
  await open(page); await page.keyboard.press('Escape');
  assert.equal(await page.locator('#cookie-preferences').isVisible(), false);
  assert.equal(await page.getByRole('button', { name: 'Cookie preferences', exact: true }).evaluate(e => e === document.activeElement), true);
  record.scenarios.push({ name: 'fresh, ignored, decline, keyboard, responsive layout, mocked contact, reopen/Escape, refresh', pass: true, requests: record.requests.length - before, cls: await page.evaluate(() => window.__mpgCLS) });
  await context.close();

  // Accepted navigation/refresh; repeated acceptance; withdrawal while form has data.
  context = await contextFor(); page = await context.newPage();
  await page.goto(base + '/contact?email=synthetic%40example.test#privacy', { waitUntil: 'networkidle' });
  const initialLoads = loaders(), initialViews = pageviews().length;
  await choose(page, true); await waitFor(() => pageviews().length === initialViews + 1);
  assert.equal(loaders(), initialLoads + 1); assert.equal(await frameCount(page), 1);
  assert.equal(pageviews().at(-1).params.dl, base + '/contact');
  assert.equal((await optionalCookies(context)).length, 2);
  await open(page); await choose(page, true); await page.waitForTimeout(200);
  assert.equal(loaders(), initialLoads + 1); assert.equal(pageviews().length, initialViews + 1);
  await page.locator('nav').getByRole('link', { name: 'Services', exact: true }).click();
  await page.waitForURL(base + '/services'); await waitFor(() => pageviews().length === initialViews + 2);
  assert.equal(loaders(), initialLoads + 1);
  // The mock deliberately has a heartbeat to prove that withdrawal destroys
  // timers; an accepted page therefore never reaches networkidle.
  await page.reload({ waitUntil: 'domcontentloaded' }); await waitFor(() => pageviews().length === initialViews + 3);
  const acceptedRefreshCLS = await page.evaluate(() => window.__mpgCLS);
  assert.ok(acceptedRefreshCLS <= 0.1, 'Material layout shift during accepted refresh');
  assert.equal(loaders(), initialLoads + 2);
  const other = await context.newPage(); await other.goto(base + '/faq', { waitUntil: 'domcontentloaded' });
  await waitFor(() => frameCount(other));
  await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click(); await page.waitForURL(base + '/contact');
  await fillEnquiry(page); await page.evaluate(() => { window.__mpgPreserved = 'synthetic'; });
  await open(page); await choose(page, false);
  await waitFor(async () => (await frameCount(page)) === 0 && (await frameCount(other)) === 0);
  assert.equal((await optionalCookies(context)).length, 0);
  assert.equal(await page.getByLabel('Name', { exact: false }).inputValue(), 'Synthetic Cookie Example');
  assert.equal(await page.evaluate(() => window.__mpgPreserved), 'synthetic');
  assert.equal(await page.evaluate(() => localStorage.getItem('mpg-unrelated')), 'synthetic-preserved');
  assert.ok((await context.cookies()).some(c => c.name === 'unrelated_session' && c.value === 'synthetic-preserved'));
  const afterWithdrawal = collectors(), loadsAfterWithdrawal = loaders();
  await page.waitForTimeout(400); assert.equal(collectors(), afterWithdrawal);
  await page.getByRole('button', { name: 'Send Enquiry' }).click(); await page.getByRole('heading', { name: 'Thank you!' }).waitFor();
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(loaders(), loadsAfterWithdrawal); assert.equal(await frameCount(page), 0);
  await page.locator('nav').getByRole('link', { name: 'Services', exact: true }).click(); await page.waitForURL(base + '/services');
  assert.equal(loaders(), loadsAfterWithdrawal);
  await choose(page, true); await waitFor(async () => (await frameCount(page)) === 1 && (await frameCount(other)) === 1);
  await choose(page, false); await waitFor(async () => (await frameCount(other)) === 0);
  await page.screenshot({ path: path.join(output, 'screenshots/consent-withdrawn.png') });
  record.scenarios.push({ name: 'accept, no query leakage, duplicate prevention, client navigation, accepted refresh, cross-tab acceptance/withdrawal, retained enquiry, revoked refresh/navigation, reaccept', pass: true, acceptedRefreshCLS });
  await context.close();

  // Invalid, obsolete, missing, mismatched and expired preference representations.
  for (const [name, raw, cookieRaw] of [
    ['malformed', '{', '{'], ['obsolete', '{"version":0,"analytics":true}', '{"version":0,"analytics":true}'],
    ['future version', '{"version":2,"analytics":true}', '{"version":2,"analytics":true}'],
    ['wrong type', '{"version":1,"analytics":"true"}', '{"version":1,"analytics":"true"}'],
    ['unknown key', '{"version":1,"analytics":true,"email":"synthetic@example.test"}', serialise(true)],
    ['expired cookie', serialise(true), undefined], ['missing local storage', undefined, serialise(true)],
    ['mismatched', serialise(true), serialise(false)],
  ]) {
    context = await contextFor({ raw, cookieRaw }); page = await context.newPage(); const count = record.requests.length;
    await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(record.requests.length, count); assert.equal(await frameCount(page), 0); assert.equal((await optionalCookies(context)).length, 0);
    assert.equal(await page.locator('#cookie-preferences').isVisible(), true);
    record.scenarios.push({ name, pass: true, requests: 0 }); await context.close();
  }
  for (const storageFailure of ['unavailable', 'readonly']) {
    context = await contextFor({ raw: serialise(true), cookieRaw: serialise(true), storageFailure }); page = await context.newPage(); const count = record.requests.length;
    await page.goto(base + '/contact', { waitUntil: 'networkidle' });
    await choose(page, true); await page.getByText('We couldn’t save your choice.', { exact: false }).first().waitFor();
    assert.equal(record.requests.length, count); assert.equal(await frameCount(page), 0);
    await fillEnquiry(page); await page.getByRole('button', { name: 'Send Enquiry' }).click(); await page.getByRole('heading', { name: 'Thank you!' }).waitFor();
    await page.reload({ waitUntil: 'networkidle' }); assert.equal(record.requests.length, count);
    record.scenarios.push({ name: storageFailure + ' storage: stale acceptance, attempted accept, form and refresh', pass: true, requests: 0 }); await context.close();
  }

  // Withdraw while the approved loader request is still in flight.
  context = await contextFor({ delayed: true }); page = await context.newPage();
  await page.goto(base + '/contact', { waitUntil: 'networkidle' });
  await choose(page, true); await waitFor(() => releaseLoader);
  await choose(page, false); releaseLoader(); await page.waitForTimeout(400);
  assert.equal(await frameCount(page), 0); assert.equal((await optionalCookies(context)).length, 0);
  const count = collectors(); await page.waitForTimeout(300); assert.equal(collectors(), count);
  record.scenarios.push({ name: 'withdrawal during pending loader prevents late execution/cookies/events', pass: true }); await context.close();
  assert.equal(record.errors.length, 0);
  record.pass = true;
} catch (error) { record.fatal = String(error.stack); throw error; }
finally { fs.writeFileSync(path.join(output, 'consent-lifecycle.json'), JSON.stringify(record, null, 2)); await browser.close(); }
console.log(JSON.stringify({ scenarios: record.scenarios.length, contacts: record.contacts, loaders: loaders(), pageviews: pageviews().length, errors: record.errors.length, pass: record.pass }));
