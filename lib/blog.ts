import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostData {
  title: string
  date: string
  slug: string
  excerpt: string
  content: string
}

export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString(
      'en-ZA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
  } catch {
    return dateString
  }
}

export async function getAllPosts(): Promise<PostData[]> {
  try {
    const files = fs.readdirSync(BLOG_DIR)
      .filter(f => f.endsWith('.md'))
    const posts = await Promise.all(
      files.map(async (filename) => {
        const raw = fs.readFileSync(
          path.join(BLOG_DIR, filename), 'utf8')
        const { data, content } = matter(raw)
        const processed = await unified()
          .use(remarkParse)
          .use(remarkHtml)
          .process(content)
        return {
          title: data.title,
          date: data.date,
          slug: data.slug,
          excerpt: data.excerpt,
          content: processed.toString()
        } as PostData
      })
    )
    return posts.sort((a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime())
  } catch {
    return []
  }
}

export async function getPostBySlug(
  slug: string): Promise<PostData | null> {
  try {
    const posts = await getAllPosts()
    return posts.find(p => p.slug === slug) ?? null
  } catch {
    return null
  }
}
