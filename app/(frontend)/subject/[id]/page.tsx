import { getSinglSubject } from '@/utils/actions'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const subject = await getSinglSubject(params.id)

  return {
    title: subject?.name || 'Subject',
    description: subject?.short_desc || 'Subject description',
    keywords: subject?.tags || [],
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const subject = await getSinglSubject(id)

  if (!subject) {
    return (
      <p className='text-red-500 text-center text-lg mt-6'>
        Subject not found.
      </p>
    )
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <div className='breadcrumbs text-sm'>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/subjects'>Subjects</Link>
          </li>
          <li>{subject.name}</li>
        </ul>
      </div>

      <div className='mb-10 space-y-4'>
        <h1 className='text-xl md:text-3xl font-bold text-gray-800 mb-2'>
          {subject.name}
        </h1>
        <div className='bg- p-5 rounded-lg shadow border border-gray-100'>
          <p className='text-gray-700'>{subject.short_desc}</p>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        {subject.topics?.length > 0 ? (
          subject.topics.map((topic) => (
            <div
              key={topic.id}
              className='bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 rounded-lg p-5'
            >
              <Link
                href={`/topic/${topic.id}`}
                className='text-lg font-semibold text-blue-600 hover:underline block mb-2'
              >
                {topic.title}
              </Link>

              <p className='text-sm text-gray-700 mb-4'>{topic.short_desc}</p>

              <div className='flex items-center justify-between text-sm text-gray-500'>
                <span>
                  {topic.createdAt
                    ? new Date(topic.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </span>
                <span className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium'>
                  {subject.short_name || 'Unknown'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>No topics available.</p>
        )}
      </div>
    </div>
  )
}
