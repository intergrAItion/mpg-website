import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.macfarlanepropertygroup.co.za'
  const posts = await getAllPosts()
  const blogUrls: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  return [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/quote`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/switch`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/legal`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/faq`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/property-management-cape-town`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/property-management-johannesburg`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/property-management-mbombela`, changeFrequency: 'monthly' as const, priority: 0.9 },
    ...blogUrls,
  ]
}
