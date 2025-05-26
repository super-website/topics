'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import pdfIcon from '@/public/images/pdf.png'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { updateDownloadCount } from '@/utils/actions'
import AdSlot from './AdsComponent'
import Link from 'next/link'

interface Pdf {
  id: string
  title: string
  url: string
  download: number
}

interface PDFCardProps {
  pdfs: Pdf[]
  query: string
  limit: number
}

export default function PDFCard({ pdfs }: PDFCardProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '')
  const [limit, setLimit] = useState(25)
  const [loading, setLoading] = useState<string | null>(null)
  const [recentlyDownloaded, setRecentlyDownloaded] = useState<string | null>(
    null
  )

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('query', searchTerm)
    } else {
      params.delete('query')
    }

    params.set('limit', limit.toString())

    replace(`${pathname}?${params.toString()}`)
  }, [searchTerm, pathname, searchParams, replace, limit])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDownload = async (pdf: Pdf) => {
    setLoading(pdf.id)
    await updateDownloadCount(pdf.id)

    fetch(pdf.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', `${pdf.title}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.parentNode?.removeChild(link)

        setLoading(null)

        setRecentlyDownloaded(pdf.id)

        setTimeout(() => {
          setRecentlyDownloaded(null)
        }, 1000)
      })
      .catch((error) => {
        console.error(error)
        setLoading(null)
      })
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6 flex-col md:flex-row mx-10'>
        <h1 className='text-xl md:text-2xl font-bold'>Notes PDF</h1>

        <div className='my-4'>
          <p className='text-xs text-gray-500 mb-1'>Advertisement</p>
          <AdSlot adClient='ca-pub-7339717436236652' adSlot='7306166999' />
        </div>

        <form>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Search PDFs'
            className='input input-bordered focus:ring-blue-600 p-2 my-4 input-sm'
          />
        </form>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10'>
        {pdfs.length === 0 ? (
          <p>No Pdf Available</p>
        ) : (
          pdfs.map((pdf) => {
            const isBouncing = loading === null && pdf.id === recentlyDownloaded

            return (
              <Link
                key={pdf.id}
                className='card w-full bg-base-100 shadow-xl'
                href={`/notes-pdf/${pdf.id}`}
              >
                <figure>
                  <Image
                    src={pdfIcon}
                    alt='PDF Icon'
                    width={200}
                    height={200}
                    className='object-cover'
                  />
                </figure>
                <div className='card-body py-0 my-0'>
                  <h2 className='card-title text-xs'>{pdf.title}</h2>
                </div>
                {/* wanted to visit single pdf page */}

                <div className='card-actions flex items-center justify-between p-5'>
                  <button
                    onClick={() => handleDownload(pdf)}
                    className='btn btn-primary'
                    disabled={loading === pdf.id}
                  >
                    {loading === pdf.id ? (
                      <div className='loading loading-dots text-black   '></div>
                    ) : (
                      'Download'
                    )}
                  </button>

                  <p className='flex items-center gap-1 text-sm'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className={`w-5 h-5 text-gray-600 ${
                        isBouncing ? 'animate-bounce' : ''
                      }`}
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4'
                      />
                    </svg>
                    {pdf.download}
                  </p>
                </div>
              </Link>
            )
          })
        )}
      </div>
      <div className='py-10 text-center'>
        {pdfs.length > 0 && (
          <button
            className='btn btn-primary'
            onClick={() => setLimit((prev) => prev + 5)}
          >
            Show More
          </button>
        )}
      </div>
      <div className='prose mx-auto px-6 md:px-10 py-10 max-w-4xl text-justify'>
        <h2 className='text-2xl font-bold mb-4 text-center'>
          About These Study Materials
        </h2>
        <p className='my-5'>
          This collection of PDF notes has been carefully curated to support
          students and lifelong learners in their academic journey. Each file
          contains valuable information, ranging from class notes and lecture
          slides to exam preparation materials and summaries. These PDFs are
          intended to complement your learning and help you revise essential
          concepts more efficiently.
        </p>
        <p className='my-5'>
          All downloadable content on this platform is free to use for personal
          and educational purposes. We do not host copyrighted material without
          permission, and all documents are either publicly shared by their
          authors or created by our contributor network. If you believe any
          content infringes on intellectual property rights, please contact us
          for prompt removal or attribution.
        </p>
        <p>
          Regular updates are made to ensure the resources stay relevant and
          accurate. Be sure to bookmark this page or check back often for new
          notes and updated versions of existing PDFs. Whether you&apos;re
          preparing for exams, brushing up on difficult subjects, or looking for
          reliable reference materials, you&apos;re in the right place.
        </p>
      </div>
    </div>
  )
}
