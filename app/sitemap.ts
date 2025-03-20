import { getAllSubject, getAllTopics } from '@/utils/actions'
import { MetadataRoute } from 'next'

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const subjects = await getAllSubject()
  const topics = await getAllTopics('')

  const urls = subjects.map((subject) => ({
    url: `${process.env.BASE_URL}/subject/${subject.id}`,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const topicUrls = topics.map((topic) => ({
    url: `${process.env.BASE_URL}/topic/${topic.id}`,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...urls,
    ...topicUrls,
  ]
}
