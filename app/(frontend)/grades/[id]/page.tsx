import { getSingleClass } from '@/utils/actions'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = (await params).id
  const classData = await getSingleClass(id)

  if (!classData) {
    return {
      title: 'Class Not Found',
      description: 'This class does not exist.',
      keywords: ['not found', 'error', 'missing class'],
    }
  }

  return {
    title: {
      absolute: `${classData?.title} |  Notes, Subjects & Schemes  ` || '',
    },
    description:
      classData.short_desc || 'Explore subjects and resources for this class.',
    keywords: ['class', ...classData.subject.map((s: any) => s.title)],
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const classData = await getSingleClass(id)

  if (!classData) {
    return (
      <div className='p-6 text-center'>
        <h1 className='text-3xl font-bold text-gray-800'>Class Not Found</h1>
        <p className='mt-4 text-gray-600'>
          The class with the provided ID does not exist.
        </p>
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <nav className='text-sm breadcrumbs'>
        <ul className='flex flex-wrap gap-1 text-gray-600'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/grades'>Grades</Link>
          </li>
          <li>
            <span className='text-gray-800'>{classData.title}</span>
          </li>
        </ul>
      </nav>
      <h1 className='md:text-3xl text-sm font-bold  mb-2 text-black'>
        {classData.title} | Education With Hamza
      </h1>

      {classData.short_desc && (
        <div className=' p-5 rounded-lg shadow border border-gray-200 text-sm'>
          <p className='text-gray-700'>{classData.short_desc}</p>
        </div>
      )}

      <div className='my-8'>
        <h2 className='text-xl font-semibold mb-4 text-black'>Subjects</h2>
        {classData.subject?.length > 0 ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {classData.subject.map((subject) => (
              <div
                key={subject.id}
                className='bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]'
              >
                <div>
                  <Link
                    href={`/subject/${subject.id}`}
                    className='text-blue-500 text-xl font-semibold hover:underline'
                  >
                    {subject.name}
                  </Link>
                  <p className='text-gray-700 text-sm mt-4 text-justify'>
                    {subject.short_desc.substring(0, 150) + '...'}
                  </p>
                </div>

                <div className='mt-6 flex justify-between items-center'>
                  <div>
                    <span className='text-xs text-black/60 italic'>
                      {subject.class?.title}
                    </span>
                  </div>
                  <Link
                    href={`/subject/${subject.id}`}
                    className='btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition'
                  >
                    Visit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-600'>No subjects found for this class.</p>
        )}
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4 text-black'>Notes</h2>
        {classData.pdfs?.length > 0 ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {classData.pdfs.map((pdf) => (
              <div
                key={pdf.id}
                className='bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]'
              >
                <div>
                  <Link
                    href={`/notes-pdf/${pdf.id}`}
                    className='text-blue-500 text-xl font-semibold hover:underline'
                  >
                    {pdf.title}
                  </Link>
                </div>
                <p className='text-sm text-gray-600 mt-4 text-justify'>
                  {pdf?.short_desc
                    ? pdf.short_desc.substring(0, 150) + '...'
                    : ''}
                </p>

                <div className='mt-6 flex justify-between items-center'>
                  <div>
                    <span className='text-xs text-black/60 italic'>
                      {pdf.class?.title}
                    </span>
                  </div>
                  <Link
                    href={`/notes-pdf/${pdf.id}`}
                    className='btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition'
                  >
                    Visit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-600'>No Notes found for this class.</p>
        )}
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4 text-black'>Schemes</h2>
        {classData.schemes?.length > 0 ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {classData.schemes.map((scheme) => (
              <div
                key={scheme.id}
                className='bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]'
              >
                <div>
                  <Link
                    href={`/scheme/${scheme.id}`}
                    className='text-blue-500 text-xl font-semibold hover:underline'
                  >
                    {scheme.title}
                  </Link>
                  <p className='text-sm text-gray-600 mt-4 text-justify'>
                    {scheme.short_desc.substring(0, 150) + '...'}
                  </p>
                </div>

                <div className='mt-6 flex justify-between items-center'>
                  <div>
                    <span className='text-xs text-black/60 italic'>
                      {scheme.class?.title}
                    </span>
                  </div>
                  <Link
                    href={`/scheme/${scheme.id}`}
                    className='btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition'
                  >
                    Visit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-600'>No Notes found for this class.</p>
        )}

        {classData.long_desc && (
          <div
            className='my-10'
            dangerouslySetInnerHTML={{ __html: classData.long_desc }}
          />
        )}
      </div>
    </div>
  )
}
