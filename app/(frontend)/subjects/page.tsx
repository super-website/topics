'use server'
import { getAllSubject } from '@/utils/actions'
import Link from 'next/link'

export const metadata = {
  title: 'Subjects - Education With US',
  description:
    'Explore various MBA subjects with detailed topics to enhance your learning experience.',
  keywords:
    'MBA, MBA subjects, online education, learning, study resources, business management',
  author: 'Ameer Muhavia',
}

export default async function Page() {
  const subjects = await getAllSubject()

  return (
    <div className='max-w-2xl mx-auto px-4 py-6'>
      <h1 className='text-2xl font-semibold mb-4'>Subjects</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className='card border rounded-none p-4 bg-base-100'
          >
            <Link
              href={`/subject/${subject.id}`}
              className='text-blue-600 font-medium text-lg hover:underline cursor-pointer'
            >
              {subject.short_name}
            </Link>
            <p className='text-gray-500 text-sm'>
              Contains ({subject.topics.length}) topics.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
