import { getPapers } from '@/utils/actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import pdfIcon from '@/public/images/pdf.png'

export const metadata = {
  title: 'Model Papers | Educational Resources',
  description:
    'Prepare for exams with a curated collection of model papers across all major subjects. Access, download, and practice with high-quality educational PDFs shared by students and educators.',
  keywords:
    'model papers, exam papers, past papers, study materials, educational PDFs, practice exams, student resources, subject-wise papers, downloadable PDFs, exam preparation',
  author: 'Ameer Muhavia',
}

export default async function Page() {
  const papers = await getPapers()

  return (
    <div className='py-16 max-w-7xl mx-auto px-4'>
      <section className='mb-10 text-center'>
        <h2 className='text-4xl font-extrabold mb-3'>Explore Model Papers</h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Prepare for exams with carefully curated model papers and resources
          across all major subjects.
        </p>
      </section>

      <section className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {papers.map((paper) => (
          <Link
            key={paper.id}
            href={`/model-papers/${paper.id}`}
            className='card card-compact bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border p-3'
          >
            <figure className='relative h-48 w-full'>
              <Image
                src={pdfIcon}
                alt={paper.title}
                fill
                className='object-cover rounded-t-lg'
                priority={true}
              />
            </figure>
            <div className='card-body p-6'>
              <h3 className='card-title text-2xl font-semibold'>
                {paper.title}
              </h3>
              <p className='text-gray-600 flex-grow'>{paper.description}</p>
              <div className='card-actions mt-4'>
                <button className='btn btn-primary btn-block rounded-none'>
                  Read More
                </button>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
