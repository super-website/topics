import { getAllSubject } from '@/utils/actions'
import { MetadataRoute } from 'next'

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const subjects = await getAllSubject()

  const urls = subjects.map((subject) => ({
    url: `/subject/${subject.id}`,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: '/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...urls,
  ]
}
