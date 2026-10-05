import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
export interface PostData {
  title: string; date: string; updated?: string; slug: string; excerpt: string;
  content: string; category: string; readTime: string; author: string;
}
export function formatDate(dateString: string): string {
  return new Date(`${dateString}T12:00:00Z`).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Johannesburg',
  })
}
function validDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value
}
export async function getAllPosts(): Promise<PostData[]> {
  let files: string[]
  try { files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md')) }
  catch { throw new Error('Unable to read public blog directory') }
  const posts = await Promise.all(files.map(async filename => {
    try {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      const strings = ['title', 'excerpt', 'slug', 'category', 'author']
      if (strings.some(key => typeof data[key] !== 'string' || !data[key].trim())
        || !validDate(data.date) || (data.updated !== undefined && (!validDate(data.updated) || data.updated < data.date))
        || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) || `${data.slug}.md` !== filename || !content.trim()) {
        throw new Error('Invalid public article')
      }
      // Explicitly retain sanitisation of raw HTML and unsafe Markdown links.
      const processed = await unified().use(remarkParse).use(remarkHtml, { sanitize: true }).process(content)
      const readTime = `${Math.max(1, Math.round(content.trim().split(/\s+/).length / 200))} min read`
      return {
        title: data.title, date: data.date, updated: data.updated, slug: data.slug, excerpt: data.excerpt,
        content: processed.toString(), category: data.category, readTime, author: data.author,
      } as PostData
    } catch {
      // Do not echo parser contents or absolute file paths in build errors.
      const safeId = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
      throw new Error(`Invalid public blog file: ${safeId}`)
    }
  }))
  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}
