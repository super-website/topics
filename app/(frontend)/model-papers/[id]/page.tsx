import { getPaper } from '@/utils/actions'
import { Clock10, FileText, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const paper = await getPaper(params.id)

  if (!paper) {
    return {
      title: 'Paper Not Found',
      description: 'This paper does not exist.',
      keywords: ['not found', 'error', 'missing paper'],
    }
  }

  return {
    title: paper.title,
    description: paper.description
      ? paper.description
      : `Download the ${paper.title} paper for comprehensive educational resources.`,
    keywords: paper.tags,
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const paper = await getPaper(id)

  if (!paper) {
    return (
      <div className='p-8 max-w-3xl mx-auto text-center text-red-600 font-semibold text-xl'>
        Paper not found.
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto p-8 space-y-8'>
      <nav className='text-xs md:text-sm breadcrumbs mb-6'>
        <ul className='flex flex-wrap gap-2 text-gray-600'>
          <li>
            <Link href='/' className='hover:text-primary transition'>
              Home
            </Link>
          </li>
          <li>
            <span className='text-gray-800 font-medium'>
              {paper.title.length > 60
                ? paper.title.substring(0, 60) + '...'
                : paper.title}
            </span>
          </li>
        </ul>
      </nav>

      <div className=''>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <h1 className='text-2xl md:text-3xl font-bold capitalize'>
            {paper.title}
          </h1>

          <time
            className='flex items-center text-gray-500 text-sm md:text-base'
            dateTime={new Date(paper.createdAt).toISOString()}
          >
            <Clock10 className='inline-block h-5 w-5 mr-2' />
            {new Date(paper.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {paper.description && (
          <p className='mt-4 text-gray-700 text-base md:text-lg leading-relaxed'>
            {paper.description}
          </p>
        )}

        <p className='mt-4'>Class: {paper.class?.title}</p>

        <div className='mt-6'>
          <embed
            src={paper.pdf}
            type='application/pdf'
            width='100%'
            height='600px'
            className='border rounded-md shadow-md'
          />
        </div>
      </div>

      {paper.class && paper.class.pdfs && paper.class.pdfs.length > 1 && (
        <aside className='w-full '>
          <h2 className='text-xl font-semibold mb-6'>
            More From {paper.class.title}
          </h2>

          <ul className='space-y-6'>
            {paper.class.pdfs
              .filter((pdf) => pdf.id !== paper.id) // exclude current paper
              .map((pdf) => (
                <li key={pdf.id} className='group'>
                  <Link
                    href={`/${pdf.id}`}
                    className='flex items-start gap-3 hover:text-primary transition'
                  >
                    <FileText className='h-5 w-5 text-primary mt-1 flex-shrink-0' />
                    <div className='flex flex-col'>
                      <div className='flex items-center gap-2'>
                        <h3 className='text-md font-medium'>
                          {pdf.title.length > 50
                            ? pdf.title.substring(0, 50) + '...'
                            : pdf.title}
                        </h3>
                        <ArrowRight className='h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary' />
                      </div>
                      <p className='text-gray-500 text-sm mt-1 line-clamp-3'>
                        {pdf.short_desc
                          ? pdf.short_desc
                          : 'No description available.'}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </aside>
      )}
    </div>
  )
}
