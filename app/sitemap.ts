import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.teklinkinternational.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/maritime', '/fintech', '/deeptech']

  return pages.map((page) => ({
    url: `${siteUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' : 'monthly',
    priority: page === '' ? 1 : 0.8,
  }))
}
