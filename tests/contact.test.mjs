import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const loadPackage = createRequire(import.meta.url);
const ts = loadPackage('typescript');
const root = path.resolve(import.meta.dirname, '..');
function compile(file, resolve, bindings = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', ...Object.keys(bindings), code)(resolve, compiled, compiled.exports, ...Object.values(bindings));
  return compiled.exports;
}
const validation = compile('lib/contact-validation.ts', loadPackage);
const origin = 'https://www.macfarlanepropertygroup.co.za';
const valid = { name: 'Zoë Ndlovu & O’Connor', email: 'synthetic+enquiry@example.test', phone: '+44 (20) 7946-0958', properties: '3', location: 'Synthetic location', mapsLink: 'https://www.google.com/maps/place/Test?x=1&y=2', challenges: ['Maintenance delays'], message: 'Synthetic message only' };
function harness({ provider = 'success', key = true, mode = 'production', actualSdk = false } = {}) {
  const calls = [], logs = [];
  class Resend {
    emails = { send: async payload => {
      calls.push(payload);
      if (provider === 'throw') throw new Error(`Private provider reason ${valid.email}`);
      if (provider === 'error') return { data: null, error: { message: `Private provider reason ${valid.email}`, lead: valid } };
      if (provider === 'empty') return { data: null, error: null };
      return { data: { id: 'synthetic-provider-id' }, error: null };
    } };
  }
  const resolve = name => name === 'resend' && !actualSdk ? { Resend } : name === '@/lib/contact-validation' ? validation : loadPackage(name);
  const route = compile('app/api/contact/route.ts', resolve, {
    process: { env: { NODE_ENV: mode, ...(key ? { RESEND_API_KEY: 'synthetic-test-only' } : {}) } },
    console: { info: value => logs.push(value), log: value => logs.push(value), error: value => logs.push(value), warn: value => logs.push(value) },
  });
  return { calls, logs, post: route.POST };
}
test('installed Resend SDK preserves the wire payload and safe provider-error handling with mocked transport', async t => {
  const requests = [];
  let failed = false;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(options.method, 'POST');
    requests.push(JSON.parse(options.body));
    return Response.json(failed ? { name: 'validation_error', message: `Private provider reason ${valid.email}` } : { id: 'synthetic-sdk-id' }, { status: failed ? 422 : 200 });
  });
  const h = harness({ actualSdk: true });
  assert.equal((await h.post(request())).status, 200);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].reply_to, valid.email);
  assert.equal(requests[0].from, 'MPG Website <noreply@updates.macfarlanepropertygroup.co.za>');
  assert.deepEqual(requests[0].to, ['dean@macfarlanepropertygroup.co.za']);
  assert.match(requests[0].html, /Zoë Ndlovu &amp; O’Connor/);
  assert.match(requests[0].text, /Zoë Ndlovu & O’Connor/);
  failed = true;
  const response = await h.post(request());
  assert.equal(response.status, 503);
  assert.ok(!(await response.text()).includes(valid.email));
  assert.ok(!JSON.stringify(h.logs).includes(valid.email));
  assert.equal(requests.length, 2);
});
function request(body = valid, { raw, headers = {}, chunks } = {}) {
  const init = { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: raw ?? JSON.stringify(body) };
  if (chunks) { init.body = new ReadableStream({ start(controller) { for (const chunk of chunks) controller.enqueue(chunk); controller.close(); } }); init.duplex = 'half'; }
  for (const key of Object.keys(init.headers)) if (init.headers[key] === null) delete init.headers[key];
  return new Request('https://www.macfarlanepropertygroup.co.za/api/contact', init);
}
async function checkRejected(body, status = 400, options = {}) {
  const h = harness(); const response = await h.post(request(body, options));
  assert.equal(response.status, status); assert.equal(h.calls.length, 0);
  const result = await response.json(); assert.equal(result.success, false);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match(result.requestId, /^[a-f0-9-]{36}$/);
  assert.equal(result.contacts.phone, 'tel:+27711720480');
  return { h, result };
}
test('valid international names/phone, trimmed fields and exact sender destinations', async () => {
  const h = harness(); const response = await h.post(request({ ...valid, name: `  ${valid.name}  `, properties: '0003' }));
  assert.equal(response.status, 200); assert.equal(h.calls.length, 1);
  const sent = h.calls[0];
  assert.equal(sent.from, 'MPG Website <noreply@updates.macfarlanepropertygroup.co.za>');
  assert.deepEqual(sent.to, ['dean@macfarlanepropertygroup.co.za']); assert.equal(sent.replyTo, valid.email);
  assert.equal(sent.subject, 'New Enquiry — MPG Website'); assert.match(sent.text, /Properties: 3/);
  assert.match(sent.text, /Zoë Ndlovu & O’Connor/);
});
test('text/attribute escaping and equivalent text email; no extra markup', async () => {
  const h = harness(); const marker = 'A <b>harmless</b> & "quote" \'apostrophe\'';
  await h.post(request({ ...valid, name: marker, location: marker, message: marker + '\nSecond line' }));
  const mail = h.calls[0];
  assert.ok(mail.html.includes('&lt;b&gt;harmless&lt;/b&gt; &amp; &quot;quote&quot; &#39;apostrophe&#39;'));
  assert.ok(!mail.html.includes('<b>harmless</b>')); assert.ok(mail.text.includes(marker));
  assert.ok(mail.html.includes('x=1&amp;y=2')); assert.ok(mail.html.includes('mailto:synthetic%2Benquiry%40example.test'));
  assert.ok(mail.html.includes('tel:+442079460958'));
});
test('reject malformed, null, array, primitives, missing/unknown fields and wrong types', async () => {
  for (const value of [null, [], 'text', true, 123, {}, { ...valid, properties: undefined }, { ...valid, unknown: 'x' }, { ...valid, name: {} }, { ...valid, email: [] }, { ...valid, phone: true }, { ...valid, location: 1 }, { ...valid, message: null }, { ...valid, challenges: 'x' }]) await checkRejected(value);
  for (const raw of ['', '{', '{"name":'] ) await checkRejected(null, 400, { raw });
});
test('all field bounds, whitespace and invalid formats reject before sending', async () => {
  for (const [field, max] of Object.entries(validation.CONTACT_LIMITS)) await checkRejected({ ...valid, [field]: 'a'.repeat(max + 1) });
  for (const patch of [{ name: '  ' }, { email: 'not-an-email' }, { email: 'a..b@example.test' }, { phone: '1234' }, { phone: '+1234567890123456' }, { phone: 'call me' }, { properties: '0' }, { properties: '-1' }, { properties: '1.5' }, { properties: '1000001' }, { properties: 3 }, { properties: '1e3' }, { name: 'Name\r\nHeader: value' }, { email: 'a@example.test\r\nBcc: b@example.test' }, { message: 'bad\0text' }]) await checkRejected({ ...valid, ...patch });
  for (const patch of [{ name: '名'.repeat(120) }, { email: 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(61) }, { phone: '+44' + ' '.repeat(26) + '2079460958' }, { mapsLink: 'https://www.google.com/maps?q=' + 'a'.repeat(2048 - 'https://www.google.com/maps?q='.length) }, { message: 'a'.repeat(5000) }, { location: 'a'.repeat(200) }, { properties: '1000000' }]) {
    const h = harness(); assert.equal((await h.post(request({ ...valid, ...patch }))).status, 200); assert.equal(h.calls.length, 1);
  }
});
test('known challenges are unique, bounded and escaped after enum validation', async () => {
  for (const challenges of [['Unknown'], ['Tenant issues', 'Tenant issues'], Array(6).fill('Tenant issues'), ['<b>marker</b>'], [{}]]) await checkRejected({ ...valid, challenges });
  const h = harness(); assert.equal((await h.post(request({ ...valid, challenges: [...validation.challengeOptions] }))).status, 200);
  assert.equal(h.calls.length, 1); assert.ok(h.calls[0].text.includes('Legal / compliance concerns'));
});
test('Google Maps host/path forms accepted without fetching; unsafe/lookalike destinations rejected', async () => {
  for (const mapsLink of ['https://www.google.com/maps', 'https://google.co.za/maps/place/Test', 'https://maps.google.com/?q=Test', 'https://maps.google.co.za/maps?q=Test', 'https://maps.app.goo.gl/Abc123', 'https://goo.gl/maps/Abc123', '']) {
    const h = harness(); assert.equal((await h.post(request({ ...valid, mapsLink }))).status, 200); assert.equal(h.calls.length, 1);
  }
  for (const mapsLink of ['javascript:alert(1)', 'data:text/plain,test', 'http://maps.google.com/', 'https://www.google.com.evil.test/maps', 'https://evil.test/maps', 'https://google.com/search', 'https://maps.google.com/url?q=https://foreign.example.test', 'https://maps.app.goo.gl/', 'https://user:password@google.com/maps', 'https://google.com:444/maps', 'https://goo.gl/other/Abc', 'https://google.com\\@evil.test/maps']) await checkRejected({ ...valid, mapsLink });
});
test('actual byte bound is enforced with omitted, forged and chunked lengths; exact boundary works', async () => {
  const text = JSON.stringify(valid); const encoder = new TextEncoder();
  const exact = text + ' '.repeat(validation.CONTACT_BODY_BYTES - encoder.encode(text).length);
  const h = harness(); assert.equal((await h.post(request(null, { raw: exact, headers: { 'Content-Length': '1' } }))).status, 200);
  await checkRejected(null, 413, { raw: exact + ' ' });
  await checkRejected(null, 413, { raw: exact + ' ', headers: { 'Content-Length': '1' } });
  const chunks = [encoder.encode(exact.slice(0, 100)), encoder.encode(exact.slice(100)), encoder.encode(' ')];
  await checkRejected(null, 413, { chunks });
  await checkRejected(null, 400, { chunks: [new Uint8Array([0xff, 0xfe])] });
});
test('origin policy rejects missing, foreign, wildcard previews and production localhost', async () => {
  for (const Origin of [null, 'null', 'https://foreign.example.test', 'https://example.vercel.app', 'https://www.macfarlanepropertygroup.co.za.evil.test', 'http://localhost:3000', 'http://127.0.0.1:3000']) await checkRejected(valid, 403, { headers: { Origin } });
  for (const Origin of [origin, 'https://macfarlanepropertygroup.co.za']) { const h = harness(); assert.equal((await h.post(request(valid, { headers: { Origin } }))).status, 200); }
  for (const Origin of ['http://localhost:3000', 'http://127.0.0.1:3000']) { const h = harness({ mode: 'development' }); assert.equal((await h.post(request(valid, { headers: { Origin } }))).status, 200); }
});
test('JSON/UTF-8 media types only; unsupported parameters/media produce 415 without sends', async () => {
  for (const type of [null, 'text/plain', 'application/x-www-form-urlencoded', 'application/json; charset=latin1', 'application/json; boundary=x', 'application/json; charset=utf-8; charset=utf-8']) await checkRejected(valid, 415, { headers: { 'Content-Type': type } });
  for (const type of ['application/json', 'application/json; charset=utf-8', 'Application/JSON; Charset="UTF-8"']) { const h = harness(); assert.equal((await h.post(request(valid, { headers: { 'Content-Type': type } }))).status, 200); }
});
test('provider failure, throw, empty response and missing key are safe; logs contain metadata only', async () => {
  for (const config of [{ provider: 'error' }, { provider: 'throw' }, { provider: 'empty' }, { key: false }, { provider: 'success' }]) {
    const h = harness(config); const response = await h.post(request()); const result = await response.json();
    assert.equal(response.status, config.provider === 'success' ? 200 : 503);
    assert.equal(h.calls.length, config.key === false ? 0 : 1);
    for (const log of h.logs) {
      const event = JSON.parse(log); assert.deepEqual(Object.keys(event).sort(), ['category', 'event', 'outcome', 'requestId', 'status']);
      for (const value of Object.values(valid).filter(item => typeof item === 'string' && item.length >= 5)) assert.ok(!log.includes(value));
      assert.ok(!log.includes('synthetic-test-only')); assert.ok(!log.includes('synthetic-provider-id'));
    }
    assert.ok(!JSON.stringify(result).includes(valid.email)); assert.ok(!JSON.stringify(result).includes('Private provider reason')); assert.ok(!JSON.stringify(result).includes('RESEND_API_KEY'));
  }
});
