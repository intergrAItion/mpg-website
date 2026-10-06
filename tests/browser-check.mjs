// Run against a loopback production preview. Playwright is supplied by isolated tooling.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const root = path.resolve(import.meta.dirname, '..');
const output = process.env.MPG_EVIDENCE_DIR;
assert.ok(output && path.isAbsolute(output), 'Set an absolute MPG_EVIDENCE_DIR');
const tooling = process.env.MPG_PLAYWRIGHT_MODULE;
assert.ok(tooling && path.isAbsolute(tooling), 'Set an absolute MPG_PLAYWRIGHT_MODULE');
const { chromium } = await import(pathToFileURL(tooling).href);
const base = 'http://127.0.0.1:3108';
const site = 'https://www.macfarlanepropertygroup.co.za';
const routes = ['/', '/about', '/services', '/quote', '/switch', '/contact', '/blog', '/legal', '/faq', '/property-management-cape-town', '/property-management-johannesburg', '/property-management-mbombela', ...fs.readdirSync(path.join(root, 'content/blog')).filter(file => file.endsWith('.md')).sort().map(file => `/blog/${file.slice(0, -3)}`)];
const record = { browser: '', time: new Date().toISOString(), widths: [320, 375, 390, 414, 768, 1024, 1440], results: [], errors: [], blocked: [], behaviour: {}, failures: [] };
function check(condition, message) { if (!condition) record.failures.push(message); }
function save() { fs.writeFileSync(path.join(output, 'evidence/browser.json'), JSON.stringify(record, null, 2)); }
const browser = await chromium.launch({ headless: true, executablePath: process.env.MPG_CHROMIUM_PATH, args: ['--no-sandbox'], env: { ...process.env, LOCALAPPDATA: process.env.MPG_BROWSER_CACHE, LD_LIBRARY_PATH: process.env.MPG_BROWSER_LIBS } });
record.browser = browser.version();
try {
  const context = await browser.newContext();
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === base) return route.continue();
    record.blocked.push(url.origin + url.pathname); return route.abort();
  });
  const page = await context.newPage();
  let active = '';
  page.on('pageerror', error => record.errors.push({ route: active, message: error.message }));
  for (const width of record.widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    for (const route of routes) {
      active = route;
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      const first = await page.evaluate(() => {
        const rect = element => { const r = element.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height }; };
        const h1 = document.querySelector('h1');
        return { documentWidth: document.documentElement.scrollWidth, header: rect(document.querySelector('nav')), h1: rect(h1), h1Opacity: getComputedStyle(h1).opacity, h1Text: h1.getAttribute('aria-label') || h1.textContent.trim() };
      });
      await page.waitForTimeout(150);
      const info = await page.evaluate(() => {
        const rect = element => { const r = element.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right }; };
        return {
          documentWidth: document.documentElement.scrollWidth,
          canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href'),
          title: document.title, description: document.querySelector('meta[name=description]')?.content,
          meta: Object.fromEntries(Array.from(document.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')).map(meta => [meta.getAttribute('property') || meta.name, meta.content])),
          robots: Array.from(document.querySelectorAll('meta[name=robots]')).map(meta => meta.content),
          headings: Array.from(document.querySelectorAll('main h1,main h2,main h3,main h4,main h5,main h6')).map(element => ({ level: Number(element.tagName[1]), text: element.getAttribute('aria-label') || element.textContent.trim(), opacity: getComputedStyle(element).opacity })),
          forms: Array.from(document.querySelectorAll('input,textarea')).map(element => ({ id: element.id, name: element.name, labels: Array.from(element.labels).map(label => label.textContent.trim()), maxLength: element.maxLength, autoComplete: element.autocomplete })),
          schemas: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(element => JSON.parse(element.textContent)),
          links: Array.from(document.querySelectorAll('a[href]')).map(element => ({ href: element.getAttribute('href'), text: element.textContent.trim() })),
          ids: Array.from(document.querySelectorAll('[id]')).map(element => element.id),
          overflow: Array.from(document.querySelectorAll('main *,footer *')).filter(element => element.getBoundingClientRect().right > innerWidth + 1).map(element => ({ tag: element.tagName, text: element.textContent.trim().slice(0, 70), ...rect(element) })).slice(-8),
        };
      });
      check(response.status() === 200, `${width} ${route}: HTTP ${response.status()}`);
      check(first.documentWidth <= width && info.documentWidth <= width, `${width} ${route}: overflow ${first.documentWidth}/${info.documentWidth}`);
      check(first.h1.top >= first.header.bottom - 1, `${width} ${route}: heading behind header ${first.h1.top}/${first.header.bottom}`);
      check(first.h1.right <= width + 1 && first.h1.left >= -1, `${width} ${route}: heading clipped horizontally`);
      check(first.h1Opacity === '1', `${width} ${route}: heading initially hidden`);
      check(info.headings.filter(heading => heading.level === 1).length === 1, `${route}: principal H1 count`);
      check(info.canonical === site + (route === '/' ? '' : route), `${route}: incorrect canonical ${info.canonical}`);
      check(info.title && info.description && info.meta['og:title'] === info.title && info.meta['twitter:title'] === info.title, `${route}: page/social titles`);
      check(info.meta['og:description'] === info.description && info.meta['twitter:description'] === info.description, `${route}: social descriptions`);
      check(info.meta['og:url'] === info.canonical && info.meta['og:type'] === (route.startsWith('/blog/') ? 'article' : 'website'), `${route}: social URL/type`);
      for (const name of ['og:image', 'twitter:image']) check(info.meta[name] === site + '/og-card.png', `${route}: ${name}`);
      check(info.meta['og:image:width'] === '1200' && info.meta['og:image:height'] === '630', `${route}: OG dimensions`);
      check(info.robots.every(value => !value.includes('noindex')), `${route}: unexpected noindex`);
      for (const field of info.forms) check(field.id && field.labels.length === 1 && field.labels[0], `${route}: missing label ${field.name}`);
      for (let index = 1; index < info.headings.length; index++) check(info.headings[index].level <= info.headings[index - 1].level + 1, `${route}: heading skip before ${info.headings[index].text}`);
      if (width === 390) {
        fs.writeFileSync(path.join(output, `evidence/page-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}.json`), JSON.stringify(info, null, 2));
        fs.writeFileSync(path.join(output, `evidence/copy-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}.txt`), await page.locator('main').innerText());
      }
      if ((width === 390 || width === 1440) && ['/', '/contact', '/blog', '/quote', '/about', '/services', '/switch', '/legal', '/faq', '/property-management-cape-town', '/blog/avoiding-bad-tenant-vetting', '/blog/why-property-management-fees-are-too-high'].includes(route)) {
        const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
        await page.screenshot({ path: path.join(output, `screenshots/${name}-${width}-top.png`) });
        await page.screenshot({ path: path.join(output, `screenshots/${name}-${width}-full.png`), fullPage: true });
      }
      record.results.push({ route, width, status: response.status(), first, ...info }); save();
    }
    console.log(`Completed ${width}px: ${routes.length} pages; current failures ${record.failures.length}`);
  }
  const behaviour = record.behaviour;
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/contact', { waitUntil: 'networkidle' });
  const toggle = page.getByRole('button', { name: 'Open menu' });
  await toggle.focus(); await page.keyboard.press('Enter');
  behaviour.menu = await page.evaluate(() => ({ expanded: document.querySelector('button[aria-controls="mobile-navigation"]').getAttribute('aria-expanded'), inert: document.getElementById('site-content').inert, overflow: document.body.style.overflow, menuTop: document.getElementById('mobile-navigation').getBoundingClientRect().top, headerBottom: document.querySelector('nav').getBoundingClientRect().bottom }));
  check(behaviour.menu.expanded === 'true' && behaviour.menu.inert && behaviour.menu.overflow === 'hidden', 'menu: state/background isolation');
  check(Math.abs(behaviour.menu.menuTop - behaviour.menu.headerBottom) < 1, 'menu: header offset');
  await page.screenshot({ path: path.join(output, 'screenshots/menu-open-390.png') });
  behaviour.menuTabs = [];
  for (let index = 0; index < 14; index++) { await page.keyboard.press('Tab'); behaviour.menuTabs.push(await page.evaluate(() => ({ text: document.activeElement.textContent.trim() || document.activeElement.getAttribute('aria-label'), inNav: Boolean(document.activeElement.closest('nav')), top: document.activeElement.getBoundingClientRect().top }))); }
  check(behaviour.menuTabs.every(item => item.inNav), 'menu: focus escaped to covered background');
  await page.keyboard.press('Escape');
  behaviour.escape = await page.evaluate(() => ({ expanded: document.querySelector('button[aria-controls="mobile-navigation"]').getAttribute('aria-expanded'), focus: document.activeElement.getAttribute('aria-controls'), inert: document.getElementById('site-content').inert, overflow: document.body.style.overflow }));
  check(behaviour.escape.expanded === 'false' && behaviour.escape.focus === 'mobile-navigation' && !behaviour.escape.inert && behaviour.escape.overflow === '', 'menu: Escape/focus/restoration');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Services', exact: true }).click();
  await page.waitForURL(base + '/services');
  check(await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded') === 'false', 'menu: navigation did not close');
  await page.goto(base + '/contact', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Send Enquiry' }).click();
  behaviour.emptyInvalid = await page.locator('input:invalid').count(); check(behaviour.emptyInvalid === 4, 'form: required fields');
  for (const label of ['Name', 'Email', 'Phone', 'Number of Properties', 'Property Location', 'Google Maps Link', 'Message']) {
    await page.locator('label').filter({ hasText: new RegExp(`^${label}( \\*)?$`) }).click();
    check(await page.getByLabel(label, { exact: label !== 'Name' && label !== 'Email' && label !== 'Phone' && label !== 'Number of Properties' }).evaluate(element => element === document.activeElement), `form: label click ${label}`);
  }
  await page.getByLabel('Name', { exact: false }).fill('Synthetic Browser Example');
  await page.getByLabel('Email', { exact: false }).fill('synthetic@example.test');
  await page.getByLabel('Phone', { exact: false }).fill('+27 71 172 0480');
  await page.getByLabel('Number of Properties', { exact: false }).fill('2');
  await page.getByLabel('Google Maps Link').fill('https://foreign.example.test/maps');
  await page.getByRole('button', { name: 'Send Enquiry' }).click();
  behaviour.validationFocus = await page.evaluate(() => document.activeElement.name);
  check(behaviour.validationFocus === 'mapsLink', 'form: invalid field focus');
  await page.getByLabel('Google Maps Link').fill('https://maps.app.goo.gl/Abc123');
  await page.getByLabel('Name', { exact: false }).focus();
  behaviour.formTabs = [];
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press('Tab');
    behaviour.formTabs.push(await page.evaluate(() => {
      const element = document.activeElement, rect = element.getBoundingClientRect();
      return { name: element.name, tag: element.tagName, top: rect.top, bottom: rect.bottom, header: document.querySelector('nav').getBoundingClientRect().bottom, viewport: innerHeight };
    }));
  }
  check(behaviour.formTabs.slice(0, 5).map(item => item.name).join(',') === 'email,phone,properties,location,mapsLink', 'form: keyboard field order');
  check(behaviour.formTabs.every(item => item.top >= item.header && item.bottom <= item.viewport), 'form: focused controls obscured');
  await page.screenshot({ path: path.join(output, 'screenshots/form-keyboard-focus-390.png') });

  let calls = 0, success = false, pending;
  await page.route('**/api/contact', async route => {
    calls++; const payload = route.request().postDataJSON();
    behaviour.submittedKeys = Object.keys(payload);
    if (!success) await new Promise(resolve => { pending = resolve; });
    await route.fulfill({ status: success ? 200 : 503, contentType: 'application/json', body: JSON.stringify(success ? { success: true } : { success: false, error: 'Synthetic local sender failure' }) });
  });
  await page.getByRole('button', { name: 'Send Enquiry' }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: 'Sending…' }).waitFor();
  await page.locator('form').evaluate(form => { form.requestSubmit(); form.requestSubmit(); });
  await page.waitForTimeout(150); check(calls === 1, 'form: duplicate in-flight send');
  pending(); await page.getByText('Synthetic local sender failure').waitFor();
  behaviour.error = await page.locator('main').getByRole('alert').evaluate(element => ({ text: element.textContent, focus: element === document.activeElement, role: element.getAttribute('role') }));
  check(behaviour.error.focus, 'form: sender error focus');
  check(await page.getByLabel('Name', { exact: false }).inputValue() === 'Synthetic Browser Example', 'form: retry lost values');
  await page.screenshot({ path: path.join(output, 'screenshots/form-error-390.png') });
  success = true; await page.getByRole('button', { name: 'Send Enquiry' }).focus(); await page.keyboard.press('Enter');
  await page.getByRole('heading', { name: 'Thank you!' }).waitFor();
  behaviour.success = await page.locator('main').getByRole('status').evaluate(element => ({ text: element.textContent, focusInside: element.contains(document.activeElement), live: element.getAttribute('aria-live') }));
  check(behaviour.success.focusInside && !behaviour.success.text.includes('24 hours'), 'form: success focus/copy'); check(calls === 2, 'form: exact send/retry count');
  await page.screenshot({ path: path.join(output, 'screenshots/form-success-390.png') });
  await page.goto(base + '/legal#privacy', { waitUntil: 'networkidle' }); await page.waitForTimeout(800);
  behaviour.hash = await page.evaluate(() => ({ top: document.getElementById('privacy').getBoundingClientRect().top, header: document.querySelector('nav').getBoundingClientRect().bottom }));
  check(behaviour.hash.top >= behaviour.hash.header, 'legal: hash target behind header');
  await page.goto(base + '/faq', { waitUntil: 'networkidle' });
  behaviour.faq = await page.evaluate(() => {
    const normalise = text => text.replace(/\s+/g, ' ').trim();
    const schema = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(element => JSON.parse(element.textContent)).find(value => value['@type'] === 'FAQPage');
    return schema.mainEntity.map(question => { const heading = Array.from(document.querySelectorAll('h2,h3')).find(element => normalise(element.textContent) === normalise(question.name)); const answer = heading.parentElement.querySelector('p'); return { question: question.name, equal: normalise(answer.textContent) === normalise(question.acceptedAnswer.text) }; });
  });
  check(behaviour.faq.length === 10 && behaviour.faq.every(item => item.equal), 'FAQ visible/schema mismatch');
  const byRoute = new Map(record.results.filter(item => item.width === 390).map(item => [item.route, item]));
  for (const [route, item] of byRoute) for (const link of item.links) {
    const url = new URL(link.href, site + route);
    if (url.origin !== site) continue;
    const target = url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
    check(byRoute.has(target), `${route}: unresolved internal route ${link.href}`);
    if (url.hash) check(byRoute.get(target)?.ids.includes(decodeURIComponent(url.hash.slice(1))), `${route}: missing hash ${link.href}`);
  }
  await context.close();
  const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 320, height: 844 } });
  await reduced.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const reducedPage = await reduced.newPage(); behaviour.reducedMotion = [];
  for (const route of ['/', '/contact', '/blog', '/blog/why-property-management-fees-are-too-high']) {
    await reducedPage.goto(base + route, { waitUntil: 'networkidle' });
    const state = await reducedPage.evaluate(() => ({ h1Top: document.querySelector('h1').getBoundingClientRect().top, headerBottom: document.querySelector('nav').getBoundingClientRect().bottom, opacity: getComputedStyle(document.querySelector('h1')).opacity, documentWidth: document.documentElement.scrollWidth, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches }));
    behaviour.reducedMotion.push({ route, ...state }); check(state.reduced && state.opacity === '1' && state.h1Top >= state.headerBottom && state.documentWidth <= 320, `${route}: reduced motion visibility`);
  }
  await reducedPage.setContent('<script type="application/ld+json">' + JSON.stringify({ description: '</script><div id=harmless-marker>literal</div>' }).replace(/</g, '\\u003c') + '</script>');
  check(await reducedPage.locator('#harmless-marker').count() === 0, 'JSON-LD delimiter fixture created an HTML node');
  await reduced.close();
  check(record.errors.length === 0, 'application browser exceptions'); save();
  console.log(JSON.stringify({ checks: record.results.length, failures: record.failures, pageErrors: record.errors.length }, null, 2));
  assert.equal(record.failures.length, 0, 'Required browser acceptance checks failed');
} catch (error) { record.fatal = String(error.stack); save(); throw error; }
finally { await browser.close(); }
