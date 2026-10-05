import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
const loadPackage = createRequire(import.meta.url);
const ts = loadPackage('typescript');
const root = path.resolve(import.meta.dirname, '..');
function blogAt(directory) {
  const source = fs.readFileSync(path.join(root, 'lib/blog.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', 'process', code)(loadPackage, compiled, compiled.exports, { cwd: () => directory });
  return compiled.exports;
}
test('all six articles preserve publication dates and have genuine editorial update dates', async () => {
  const posts = await blogAt(root).getAllPosts();
  assert.equal(posts.length, 6); assert.equal(new Set(posts.map(post => post.slug)).size, 6);
  const dates = { 'avoiding-bad-tenant-vetting': '2026-02-04', 'cape-town-rental-market-2026': '2026-03-10', 'maintenance-contractor-panel': '2026-01-19', 'switching-managers-without-disruption': '2026-03-28', 'whatsapp-property-management': '2026-02-20', 'why-property-management-fees-are-too-high': '2026-04-14' };
  for (const post of posts) {
    assert.equal(post.date, dates[post.slug]); assert.equal(post.updated, '2026-10-05');
    assert.ok(post.content.includes('<h2>')); assert.equal(post.readTime, '2 min read');
  }
});
test('malformed copied fixture fails clearly with a safe identifier, never an empty list', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mpg-blog-fixture-'));
  const content = path.join(directory, 'content/blog'); fs.mkdirSync(content, { recursive: true });
  const fixture = path.join(content, 'copied-article.md');
  const original = fs.readFileSync(path.join(root, 'content/blog/avoiding-bad-tenant-vetting.md'), 'utf8').replaceAll('avoiding-bad-tenant-vetting', 'copied-article');
  fs.writeFileSync(fixture, original.replace('date: "2026-02-04"', 'date: "2026-02-31"'));
  await assert.rejects(blogAt(directory).getAllPosts(), { message: 'Invalid public blog file: copied-article.md' });
  fs.writeFileSync(fixture, original.replace(/title:.*/, 'title: [malformed'));
  await assert.rejects(blogAt(directory).getAllPosts(), { message: 'Invalid public blog file: copied-article.md' });
  // Only this fresh test-owned directory is removed. Production articles are untouched.
  fs.rmSync(directory, { recursive: true });
});
test('Markdown raw markup and javascript links stay sanitised in an isolated copied fixture', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mpg-blog-sanitise-'));
  const content = path.join(directory, 'content/blog'); fs.mkdirSync(content, { recursive: true });
  const original = fs.readFileSync(path.join(root, 'content/blog/avoiding-bad-tenant-vetting.md'), 'utf8');
  fs.writeFileSync(path.join(content, 'avoiding-bad-tenant-vetting.md'), original + '\n<div id="harmless-marker">marker</div>\n\n[unsafe](javascript:alert(1))\n');
  const [post] = await blogAt(directory).getAllPosts();
  assert.ok(!post.content.includes('harmless-marker')); assert.ok(!post.content.includes('javascript:'));
  fs.rmSync(directory, { recursive: true });
});
