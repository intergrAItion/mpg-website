import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'
import BlogCover from '@/components/ui/BlogCover'

export const metadata = {
  title: "Blog | MacFarlane Property Group",
  description: "Practical property management insights for South African landlords: tenant assessment, fees, maintenance, handovers and communication.",
  alternates: { canonical: "https://www.macfarlanepropertygroup.co.za/blog" },
  openGraph: {
    title: "Blog | MacFarlane Property Group", description: "Practical property management insights for South African landlords: tenant assessment, fees, maintenance, handovers and communication.", url: "https://www.macfarlanepropertygroup.co.za/blog",
    siteName: "MacFarlane Property Group", locale: "en_ZA", type: "website",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", width: 1200, height: 630, alt: "MacFarlane Property Group" }],
  },
  twitter: {
    card: "summary_large_image", title: "Blog | MacFarlane Property Group", description: "Practical property management insights for South African landlords: tenant assessment, fees, maintenance, handovers and communication.",
    images: [{ url: "https://www.macfarlanepropertygroup.co.za/og-card.png", alt: "MacFarlane Property Group" }],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts()
  return (
    <>
      {/* Short dark green hero */}
      <section className="blog-hero bg-[#07341C] pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-cormorant text-5xl text-white">Our Blog</h1>
          <p className="text-white/70 mt-4">Insights for South African landlords</p>
        </div>
      </section>

      {/* Post grid */}
      <section className="bg-[#F5F0E8] py-16">
        <div className="max-w-7xl mx-auto px-4">
          {posts.length === 0 ? (
            <p>No posts yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="min-w-0 bg-white hover:shadow-lg transition-shadow overflow-hidden">
                  <BlogCover slug={post.slug} category={post.category} variant="card"/>
                  <div className="p-6">
                    <p
                      className="uppercase mb-2"
                      style={{
                        color: '#876628',
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        fontWeight: 500,
                      }}
                    >
                      {post.category}
                    </p>
                    <h2 className="font-cormorant text-xl text-[#07341C] font-semibold mb-3">{post.title}</h2>
                    <p className="text-mpg-text-muted text-sm mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[#876628] text-sm font-medium">Read More</span>
                      <span className="text-mpg-text-muted text-xs">{formatDate(post.date)}</span>
                      <span className="text-mpg-text-muted text-xs">{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
