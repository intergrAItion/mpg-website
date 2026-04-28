import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/blog'
import type { PostData } from '@/lib/blog'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()
    return posts.map(p => ({ slug: p.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title + ' | MacFarlane Property Group',
    description: post.excerpt
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  const validPost = post as PostData
  return (
    <>
      {/* Dark navy hero */}
      <section className="bg-[#0F1E3C] py-24">
        <div className="max-w-3xl mx-auto px-4">
          <a href="/blog" className="text-[#C9A84C] text-sm mb-6 block">
            Back to Blog
          </a>
          <p className="text-[#C9A84C] text-sm mb-3">
            {formatDate(validPost.date)}
          </p>
          <h1 className="font-cormorant text-4xl md:text-5xl text-white font-semibold">
            {validPost.title}
          </h1>
        </div>
      </section>

      {/* Post body */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="prose prose-lg prose-headings:text-[#C9A84C] prose-a:text-[#C9A84C] max-w-none"
            dangerouslySetInnerHTML={{__html: validPost.content}}
          />
          {/* Content is owner-controlled */}
          <a href="/blog"
            className="inline-block mt-12 text-[#C9A84C] font-medium">
            Back to Blog
          </a>
        </div>
      </section>
    </>
  )
}
