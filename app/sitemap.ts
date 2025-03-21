import { getAllSubject, getAllTopics } from '@/utils/actions'
import { MetadataRoute } from 'next'

interface Subject {
  id: string
  name: string
  short_name: string
  short_desc: string
  tags: string[]
}

interface Topic {
  id: string
  title: string
  short_desc: string
  createdAt: Date
  subject?: Subject | null
  tags: string[]
}

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const subjects: Subject[] = await getAllSubject()
  const topics = await getAllTopics('')
  const topicsInside: Topic[] = Array.isArray(topics)
    ? topics
    : topics.topics || []

  const urls = subjects.map((subject) => ({
    url: `https://educationwithhamza.vercel.app/subject/${subject.id}`,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const topicUrls = topicsInside.map((topic) => ({
    url: `https://educationwithhamza.vercel.app/topic/${topic.id}`,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [
    {
      url: `https://educationwithhamza.vercel.app`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...urls,
    ...topicUrls,
  ]
}
