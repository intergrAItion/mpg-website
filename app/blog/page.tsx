import { getAllPosts, formatDate } from '@/lib/blog'

export const metadata = {
  title: 'Blog | MacFarlane Property Group',
  description: 'Property management insights and advice for South African landlords.'
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return (
    <>
      {/* Short dark navy hero */}
      <section className="bg-[#0F1E3C] py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-cormorant text-5xl text-white">Our Blog</h1>
          <p className="text-white/70 mt-4">Insights for South African landlords</p>
        </div>
      </section>

      {/* Post grid */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="max-w-7xl mx-auto px-4">
          {posts.length === 0 ? (
            <p>No posts yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <a key={post.slug} href={'/blog/' + post.slug}
                  className="bg-white border-t-2 border-[#C9A84C] p-6 hover:shadow-lg transition-shadow">
                  <p className="text-[#C9A84C] text-sm mb-2">{formatDate(post.date)}</p>
                  <h2 className="font-cormorant text-xl text-[#0F1E3C] font-semibold mb-3">{post.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
                  <span className="text-[#C9A84C] text-sm font-medium">Read More</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
