import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/blog'
import type { PostData } from '@/lib/blog'
import BlogCover from '@/components/ui/BlogCover'

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
      {/* Dark green hero */}
      <section className="bg-[#07341C] py-24">
        <div className="max-w-3xl mx-auto px-4">
          <a href="/blog" className="text-[#C9A55A] text-sm mb-6 block">
            Back to Blog
          </a>
          <p
            className="uppercase mb-2"
            style={{
              color: '#C9A55A',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              letterSpacing: '0.1em',
              fontWeight: 500,
            }}
          >
            {validPost.category} &middot; {validPost.readTime}
          </p>
          <h1 className="font-cormorant text-4xl md:text-5xl text-white font-semibold mb-4">
            {validPost.title}
          </h1>
          <p className="text-white/50 text-sm">
            {formatDate(validPost.date)} &middot; By {validPost.author}
          </p>
        </div>
      </section>

      {/* Cover image */}
      <BlogCover slug={validPost.slug} category={validPost.category} variant="hero"/>

      {/* Post body */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="prose prose-lg prose-headings:text-[#C9A55A] prose-a:text-[#C9A55A] max-w-none"
            dangerouslySetInnerHTML={{__html: validPost.content}}
          />
          {/* Content is owner-controlled */}

          {/* CTA Banner */}
          <div className="mt-16 p-8 bg-[#07341C] rounded-lg text-center">
            <p className="font-cormorant text-2xl text-white mb-2">
              Want this kind of management for your property?
            </p>
            <p className="text-white/70 text-sm mb-6">
              Free assessment, honest numbers, no obligation.
            </p>
            <a
              href="/quote"
              className="inline-flex items-center px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
              style={{
                backgroundColor: '#C9A55A',
                color: '#07341C',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              Get a free assessment
            </a>
          </div>

          {/* TODO Phase 2: Add author bio block below article */}
          {/* TODO Phase 2: Add related posts section */}
          {/* TODO Phase 2: Add DM monogram avatar to byline */}

          <a href="/blog"
            className="inline-block mt-8 text-[#C9A55A] font-medium">
            Back to Blog
          </a>
        </div>
      </section>
    </>
  )
}
