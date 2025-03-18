import { getAllTopics } from '@/utils/actions'
import Link from 'next/link'
import React from 'react'

interface Topic {
  id: string
  title: string
  short_desc: string
  createdAt: Date
  subject?: {
    id: string
    short_name: string
  } | null
}

export default async function Content({ query }: { query: string }) {
  let topics: Topic[] = []

  try {
    const data = await getAllTopics(query)
    topics = Array.isArray(data) ? data : data.topics || []
  } catch (error) {
    console.error('Error fetching topics:', error)
    topics = []
  }

  return (
    <div className='space-y-5 mr-5 md:mr-0 '>
      <h2 className='text-xl font-bold mb-3'>Topics</h2>
      {topics.length > 0 ? (
        topics.map((topic) => (
          <div
            className='card max-w-sm md:max-w-2xl bg-base-100 card-sm shadow-sm rounded-none '
            key={topic.id}
          >
            <div className='card-body'>
              <Link href={`/topic/${topic.id}`} className='card-title border-b'>
                {topic.title}
              </Link>
              <p className='text-sm mt-2 border-b py-2'>{topic.short_desc}</p>
              <div className='justify-between card-actions'>
                <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                {topic.subject && (
                  <Link
                    href={`/subject/${topic.subject.id}`}
                    className='btn btn-primary'
                  >
                    {topic.subject.short_name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='text-gray-500'>No topics found</p>
      )}
    </div>
  )
}
