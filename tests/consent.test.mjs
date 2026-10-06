import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const source = fs.readFileSync(new URL('../lib/analytics-consent.ts', import.meta.url), 'utf8');
function harness({ raw = null, cookie = null, readonly = false, unavailable = false } = {}) {
  let stored = raw, cookies = cookie ?? '', writes = [];
  const document = {
    get cookie() { return cookies; },
    set cookie(value) { writes.push(value); if (value.startsWith('mpg_analytics_choice=')) cookies = value.split(';')[0]; },
  };
  const window = {
    location: { protocol: 'https:', hostname: 'www.macfarlanepropertygroup.co.za', pathname: '/contact' },
    localStorage: {
      getItem() { if (unavailable) throw new Error('Storage unavailable'); return stored; },
      setItem(key, value) { if (unavailable || readonly) throw new Error('Storage unavailable'); assert.equal(key, 'mpg-analytics-consent'); stored = value; },
    },
  };
  const compiled = { exports: {} };
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('module', 'exports', 'window', 'document', code)(compiled, compiled.exports, window, document);
  return { api: compiled.exports, writes, get stored() { return stored; } };
}
const serialise = analytics => JSON.stringify({ version: 1, analytics });
const cookie = analytics => 'mpg_analytics_choice=' + encodeURIComponent(serialise(analytics));
test('only the current exact boolean preference format is accepted', () => {
  const { api } = harness();
  assert.equal(api.parsePreference(serialise(true)), true);
  assert.equal(api.parsePreference(serialise(false)), false);
  for (const raw of [null, '', '{', 'null', 'true', '[]', '{}', '{"version":0,"analytics":true}', '{"version":2,"analytics":true}', '{"version":1,"analytics":"true"}', '{"version":1,"analytics":1}', '{"version":1,"analytics":true,"email":"synthetic@example.test"}']) assert.equal(api.parsePreference(raw), null);
});
test('both stored representations must agree; missing, expired and unavailable values keep analytics off', () => {
  assert.equal(harness({ raw: serialise(true), cookie: cookie(true) }).api.readPreference(), true);
  assert.equal(harness({ raw: serialise(false), cookie: cookie(false) }).api.readPreference(), false);
  for (const config of [{ raw: serialise(true) }, { cookie: cookie(true) }, { raw: serialise(true), cookie: cookie(false) }, { raw: serialise(true), cookie: cookie(true), readonly: true }, { raw: serialise(true), cookie: cookie(true), unavailable: true }, { raw: serialise(true), cookie: 'mpg_analytics_choice=%invalid' }]) assert.equal(harness(config).api.readPreference(), null);
});
test('withdrawal persists only the choice and expires only the two owned analytics cookie names', () => {
  const h = harness({ raw: serialise(true), cookie: cookie(true) });
  assert.equal(h.api.savePreference(false), true);
  assert.deepEqual(JSON.parse(h.stored), { version: 1, analytics: false });
  const deleted = h.writes.filter(value => value.includes('Max-Age=0'));
  assert.ok(deleted.some(value => value.includes('Domain=.macfarlanepropertygroup.co.za') && value.includes('Path=/;')));
  assert.ok(deleted.some(value => value.includes('Path=/contact;')));
  assert.deepEqual(new Set(deleted.map(value => value.split('=')[0])), new Set(['_ga', '_ga_1T14DW2GGH']));
});
test('a failed acceptance or withdrawal cannot revive readable stale acceptance', () => {
  for (const unavailable of [false, true]) {
    const h = harness({ raw: serialise(true), cookie: cookie(true), readonly: true, unavailable });
    assert.equal(h.api.savePreference(true), false);
    assert.equal(h.api.readPreference(), null);
    assert.equal(h.api.savePreference(false), false);
    assert.notEqual(h.api.readPreference(), true);
  }
});
