'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { updateDownloadCount, getAllPdf } from '@/utils/actions'
import pdfIcon from '@/public/images/pdf.png'
import AdSlot from './AdsComponent'

interface Pdf {
  id: string
  title: string
  url: string
  download: number
  short_desc: string | null
}

interface PDFCardProps {
  initialPdfs: Pdf[]
}

export default function PDFCard({ initialPdfs }: PDFCardProps) {
  const [pdfs, setPdfs] = useState(initialPdfs)
  const [limit, setLimit] = useState(25)
  const [loading, setLoading] = useState<string | null>(null)
  const [recentlyDownloaded, setRecentlyDownloaded] = useState<string | null>(
    null
  )
  const [showMoreLoading, setShowMoreLoading] = useState(false)

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

  const handleShowMore = async () => {
    setShowMoreLoading(true)
    const newLimit = limit + 5
    const newPdfs = await getAllPdf('', newLimit)
    setPdfs(newPdfs)
    setLimit(newLimit)
    setShowMoreLoading(false)
  }

  return (
    <div className='px-6 md:px-10 max-w-7xl mx-auto py-10'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>Notes PDF</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        <div className='col-span-1 flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg'>
          <p className='text-xs text-gray-500 mb-1'>Advertisement</p>
          <AdSlot
            adClient='ca-pub-7339717436236652'
            adSlot='7306166999'
            style={{ display: 'block', minHeight: 100 }}
          />
        </div>
        {pdfs.map((pdf) => {
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
                  <h2 className='font-semibold text-sm hover:underline min-h-[2.5rem] line-clamp-2'>
                    {pdf.title}
                  </h2>
                </Link>

                {pdf.short_desc && (
                  <p className='text-xs text-gray-600 my-1 line-clamp-3'>
                    {pdf.short_desc}
                  </p>
                )}

                <div className='flex items-center justify-between mt-4'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownload(pdf)
                    }}
                    className='btn btn-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all px-4'
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
        })}
      </div>

      {pdfs.length > 0 && (
        <div className='text-center py-10'>
          <button
            className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow transition-all'
            onClick={handleShowMore}
            disabled={showMoreLoading}
          >
            {showMoreLoading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  )
}
