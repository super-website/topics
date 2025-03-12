import { getSingleTopic } from '@/utils/actions'
import Link from 'next/link'
import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params
  const topic = await getSingleTopic(id)
  return (
    <div>
      <div className='breadcrumbs text-sm ml-5 md:ml-0'>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href={`/subject/${topic?.subject?.id}`}>
              {topic?.subject?.short_name}
            </Link>
          </li>
          <li>
            <span>{topic?.title}</span>
          </li>
        </ul>
      </div>

      <div className='max-w-2xl mx-5  md:mx-auto pt-10 space-y-5'>
        <div className='card bg-info p-4 rounded-none bg-opacity-30'>
          <p className='text-xs'>{topic?.short_desc}</p>
        </div>

        <div className='card bg-gray-400 bg-opacity-25 rounded-none p-4'>
          <div className='card-title border-b pb-3 border-gray-500'>
            <h2>{topic?.title}</h2>
          </div>
          <div className='card-body border-b border-gray-500 p-2 text-gray-500'>
            <p>{topic?.long_desc}</p>
          </div>
          <div className='card-actions justify-between py-2'>
            <span>
              {topic?.createdAt
                ? new Date(topic.createdAt).toLocaleDateString()
                : 'N/A'}
            </span>

            <span className='badge badge-primary p-4 bg-opacity-80'>
              {topic?.subject?.short_name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
