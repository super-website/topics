'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { updateDownloadCount } from '@/utils/actions'
import pdfIcon from '@/public/images/pdf.png'
import AdSlot from './AdsComponent'

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

    try {
      const response = await fetch(pdf.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', `${pdf.title}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)

      setRecentlyDownloaded(pdf.id)
      setTimeout(() => setRecentlyDownloaded(null), 1000)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className='px-6 md:px-10 max-w-7xl mx-auto py-10'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>Notes PDF</h1>

        <div className='text-center'>
          <p className='text-xs text-gray-500 mb-1'>Advertisement</p>
          <AdSlot adClient='ca-pub-7339717436236652' adSlot='7306166999' />
        </div>

        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder='Search PDFs...'
          className='border border-gray-300 rounded-full px-4 py-2 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#00C4C9] transition-shadow shadow-sm hover:shadow'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {pdfs.length === 0 ? (
          <p className='col-span-full text-center text-gray-600'>
            No PDFs available.
          </p>
        ) : (
          pdfs.map((pdf) => {
            const isBouncing = loading === null && pdf.id === recentlyDownloaded
            return (
              <div
                key={pdf.id}
                className='rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 p-4 flex flex-col justify-between'
              >
                <Link href={`/notes-pdf/${pdf.id}`}>
                  <Image
                    src={pdfIcon}
                    alt='PDF Thumbnail'
                    width={400}
                    height={300}
                    className='w-full h-40 object-contain mb-4'
                  />
                </Link>

                <div className='flex-1 flex flex-col justify-between'>
                  <Link href={`/notes-pdf/${pdf.id}`}>
                    <h3 className='font-semibold text-sm hover:underline min-h-[2.5rem] line-clamp-2'>
                      {pdf.title}
                    </h3>
                  </Link>

                  <div className='flex items-center justify-between mt-4'>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownload(pdf)
                      }}
                      className='btn btn-sm bg-[#A8F1FF] hover:bg-[#A8F1F0] text-black rounded-full transition-all px-4'
                      disabled={loading === pdf.id}
                    >
                      {loading === pdf.id ? (
                        <span className='loading loading-dots text-white'></span>
                      ) : (
                        'Download'
                      )}
                    </button>

                    <div className='flex items-center text-sm text-gray-600 gap-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className={`w-4 h-4 ${
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
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {pdfs.length > 0 && (
        <div className='text-center py-10'>
          <button
            className='px-6 py-2 bg-[#6FE6FC] hover:bg-[#6FE6FC] text-white font-medium rounded-full shadow transition-all'
            onClick={() => setLimit((prev) => prev + 5)}
          >
            Show More
          </button>
        </div>
      )}

      <div className='prose max-w-4xl mx-auto text-gray-800 leading-relaxed py-10'>
        <h2 className='text-center'>About These Study Materials</h2>
        <p>
          This collection of PDF notes has been carefully curated to support
          students and lifelong learners in their academic journey. Each file
          contains valuable information, ranging from class notes and lecture
          slides to exam preparation materials and summaries.
        </p>
        <p>
          All downloadable content on this platform is free to use for personal
          and educational purposes. We do not host copyrighted material without
          permission. If you believe any content infringes on intellectual
          property rights, please contact us.
        </p>
        <p>
          New PDFs and updates are added frequently. Bookmark this page and
          check back regularly for fresh study materials to keep your learning
          on track.
        </p>
      </div>
    </div>
  )
}
