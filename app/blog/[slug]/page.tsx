import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/blog'
import type { PostData } from '@/lib/blog'
import BlogCover from '@/components/ui/BlogCover'
import JsonLd from '@/components/seo/JsonLd'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params
  const posts = await getAllPosts()
  const post = posts.find(p => p.slug === slug) ?? null
  if (!post) return {}
  return {
    title: post.title + ' | MacFarlane Property Group',
    description: post.excerpt,
    alternates: { canonical: `https://www.macfarlanepropertygroup.co.za/blog/${post.slug}` },
    openGraph: {
      title: post.title + ' | MacFarlane Property Group', description: post.excerpt,
      url: `https://www.macfarlanepropertygroup.co.za/blog/${post.slug}`, type: 'article',
      siteName: 'MacFarlane Property Group', locale: 'en_ZA',
      publishedTime: post.date, modifiedTime: post.updated ?? post.date,
      images: [{ url: 'https://www.macfarlanepropertygroup.co.za/og-card.png', width: 1200, height: 630, alt: 'MacFarlane Property Group' }],
    },
    twitter: {
      card: 'summary_large_image', title: post.title + ' | MacFarlane Property Group', description: post.excerpt,
      images: [{ url: 'https://www.macfarlanepropertygroup.co.za/og-card.png', alt: 'MacFarlane Property Group' }],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const allPosts = await getAllPosts()
  const post = allPosts.find(p => p.slug === slug) ?? null
  if (!post) notFound()
  const validPost = post as PostData

  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3)

  const postUrl = `https://www.macfarlanepropertygroup.co.za/blog/${validPost.slug}`

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: validPost.title,
    description: validPost.excerpt,
    datePublished: validPost.date,
    dateModified: validPost.updated ?? validPost.date,
    author: { '@type': 'Person', name: validPost.author },
    publisher: { '@id': 'https://www.macfarlanepropertygroup.co.za/#organization' },
    mainEntityOfPage: postUrl,
    articleSection: validPost.category,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.macfarlanepropertygroup.co.za' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.macfarlanepropertygroup.co.za/blog' },
      { '@type': 'ListItem', position: 3, name: validPost.title, item: postUrl },
    ],
  }

  const DmAvatar = (
    <div style={{
      width: '40px',
      height: '40px',
      backgroundColor: '#C9A55A',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: '14px',
        fontWeight: 600,
        color: '#07341C',
        letterSpacing: '0.05em',
      }}>DM</span>
    </div>
  )

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Dark green hero */}
      <section className="blog-hero bg-[#07341C] pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/blog" className="text-[#C9A55A] text-sm mb-6 block">
            Back to Blog
          </Link>
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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '16px',
          }}>
            {DmAvatar}
            <div>
              <p style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#F5F0E8',
                margin: 0,
              }}>
                {validPost.author}
              </p>
              <p style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '13px',
                color: 'rgba(245,240,232,0.65)',
                margin: 0,
              }}>
                Published {formatDate(validPost.date)} · {validPost.readTime}
                {validPost.updated && <> · Updated {formatDate(validPost.updated)}</>}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <BlogCover slug={validPost.slug} category={validPost.category} variant="hero"/>

      {/* Post body */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="prose prose-lg prose-headings:text-[#07341C] prose-a:text-[#876628] max-w-none"
            dangerouslySetInnerHTML={{__html: validPost.content}}
          />
          {/* Content is owner-controlled */}

          {/* Author bio */}
          <section style={{
            backgroundColor: '#F5F0E8',
            borderTop: '1px solid rgba(201,165,90,0.2)',
            padding: '48px 16px',
          }}>
            <div style={{
              maxWidth: '672px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
            }}>
              {DmAvatar}
              <div>
                <p style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#07341C',
                  margin: '0 0 6px 0',
                  letterSpacing: '0.02em',
                }}>
                  {validPost.author}
                </p>
                <p style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '14px',
                  color: '#4B5563',
                  margin: 0,
                  lineHeight: '1.6',
                }}>
                  Dean MacFarlane is the founder of
                  MacFarlane Property Group. His hands-on approach brings
                  tenant assessment, rental administration and clear
                  communication together for landlords in Cape Town,
                  Mbombela and Johannesburg.
                </p>
              </div>
            </div>
          </section>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section style={{
              backgroundColor: '#F5F0E8',
              borderTop: '1px solid rgba(201,165,90,0.2)',
              padding: '64px 16px',
            }}>
              <div style={{
                maxWidth: '1152px',
                margin: '0 auto',
              }}>
                <div style={{marginBottom: '40px'}}>
                  <h2 style={{
                    fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                    fontSize: '2rem',
                    fontWeight: 500,
                    color: '#07341C',
                    margin: '0 0 8px 0',
                  }}>
                    More from the journal
                  </h2>
                  <div style={{
                    width: '48px',
                    height: '2px',
                    backgroundColor: '#C9A55A',
                  }} />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                  gap: '24px',
                }}>
                  {relatedPosts.map(relatedPost => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      style={{
                        display: 'block',
                        backgroundColor: '#FFFFFF',
                        borderTop: '2px solid #C9A55A',
                        textDecoration: 'none',
                        minWidth: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <BlogCover
                        slug={relatedPost.slug}
                        category={relatedPost.category}
                        variant="card"
                      />
                      <div style={{padding: '20px'}}>
                        <p style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontSize: '11px',
                          color: '#876628',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          margin: '0 0 8px 0',
                        }}>
                          {relatedPost.category}
                        </p>
                        <h3 style={{
                          fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                          fontSize: '1.2rem',
                          fontWeight: 500,
                          color: '#07341C',
                          margin: '0 0 8px 0',
                          lineHeight: '1.4',
                        }}>
                          {relatedPost.title}
                        </h3>
                        <p style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontSize: '13px',
                          color: '#5B6470',
                          margin: '0 0 16px 0',
                          lineHeight: '1.6',
                        }}>
                          {relatedPost.excerpt}
                        </p>
                        <span style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontSize: '13px',
                          color: '#876628',
                          fontWeight: 500,
                        }}>
                          Read more
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Banner */}
          <div className="mt-16 p-8 bg-[#07341C] rounded-lg text-center">
            <p className="font-cormorant text-2xl text-white mb-2">
              Want this kind of management for your property?
            </p>
            <p className="text-white/70 text-sm mb-6">
              Free assessment, honest numbers, no obligation.
            </p>
            <Link
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
            </Link>
          </div>

          <Link href="/blog"
            className="inline-block mt-8 text-[#876628] font-medium">
            Back to Blog
          </Link>
        </div>
      </section>
    </>
  )
}
