'use client'

import {
  getAllPdf,
  incrementPdfLike,
  updateDownloadCount,
} from '@/utils/actions'
import { CheckCheck, Clock10, Download, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import AdSlot from './AdsComponent'

interface Pdf {
  id: string
  title: string
  url: string
  download: number
  short_desc: string | null
  like: number
  createdAt: Date
}

export default function SinglePdf({ pdf }: { pdf: Pdf }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [recentlyDownloaded, setRecentlyDownloaded] = useState<string | null>(
    null
  )
  const [relatedPdfs, setRelatedPdfs] = useState<Pdf[]>([])
  const [limit, setLimit] = useState(10)

  const [relatedLoading, setRelatedLoading] = useState(false)

  useEffect(() => {
    const fetchRelated = async () => {
      setRelatedLoading(true)
      const res = await getAllPdf('', limit)
      setRelatedPdfs(res.filter((p) => p.id !== pdf.id))
      setRelatedLoading(false)
    }
    fetchRelated()
  }, [pdf.id, limit])

  if (!pdf) return <div className='alert alert-error mt-6'>PDF not found</div>

  const handleDownload = async (pdf: Pdf) => {
    setLoadingId(pdf.id)
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
      link.remove()
      setRecentlyDownloaded(pdf.id)
      setTimeout(() => setRecentlyDownloaded(null), 2000)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className='max-w-6xl mx-auto p-4'>
      <nav className='text-xs md:text-sm breadcrumbs mb-4'>
        <ul className='flex flex-wrap gap-1 text-gray-600'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <span className='text-gray-800'>
              {pdf.title.length > 60
                ? pdf.title.substring(0, 60) + '...'
                : pdf.title}
            </span>
          </li>
        </ul>
      </nav>

      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body p-6'>
          <div className='flex justify-between items-center'>
            <h1 className='text-lg md:text-2xl font-bold capitalize'>
              {pdf.title}
            </h1>
            <span className='flex items-center gap-2 text-sm text-gray-500'>
              <Download className='h-4 w-4' /> {pdf.download}
            </span>
          </div>

          <p className='text-gray-600 text-sm my-3'>
            {pdf.short_desc
              ? pdf.short_desc + ' '
              : `The ${pdf.title} offers comprehensive material to
            aid students in mastering key concepts. Ideal for revision and exam
            prep. Download and strengthen your learning today.`}
          </p>

          {/* PDF Viewer */}
          <div className='rounded-lg overflow-hidden border border-base-200 mb-6'>
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                pdf.url
              )}&embedded=true`}
              className='w-full h-[70vh]'
              frameBorder='0'
              title={`PDF Preview of ${pdf.title}`}
            ></iframe>
          </div>

          {/* Actions */}
          <div className='flex flex-col sm:flex-row gap-4 justify-between'>
            <div className='flex gap-4 flex-col md:flex-row'>
              <button
                onClick={() => handleDownload(pdf)}
                className='btn btn-primary w-full sm:w-auto'
                disabled={loadingId === pdf.id}
              >
                {loadingId === pdf.id ? (
                  <span className='loading loading-spinner'></span>
                ) : recentlyDownloaded === pdf.id ? (
                  <CheckCheck />
                ) : (
                  <Download />
                )}
              </button>

              <form action={incrementPdfLike} className='w-full sm:w-auto'>
                <input type='hidden' name='id' value={pdf.id} />
                <input type='hidden' name='like' value='like' />
                <button
                  type='submit'
                  className='btn bg-[#A8F1FF] w-full sm:w-auto'
                >
                  <ThumbsUp /> ({pdf.like})
                </button>
              </form>
            </div>

            <span>
              <Clock10 className='inline-block h-4 w-4 mr-1' />
              {new Date(pdf.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className='col-span-1 flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg'>
          <p className='text-xs text-gray-500 mb-1'>Advertisement</p>
          <AdSlot
            adClient='ca-pub-7339717436236652'
            adSlot='7306166999'
            style={{ display: 'block', minHeight: 100 }}
          />
        </div>
        <hr />

        {/* Related PDFs */}
        <div className='card-body p-6'>
          <h2 className='card-title text-xl font-bold mb-4'>More in Notes</h2>

          {relatedPdfs.length > 0 ? (
            <ul className='space-y-2'>
              {relatedPdfs.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/notes-pdf/${item.id}`}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg border border-base-200 hover:bg-base-200 transition-colors font-medium'
                  >
                    📄 {item.title}
                  </Link>
                </li>
              ))}

              <li className='text-center pt-3'>
                <button
                  onClick={() => setLimit((prev) => prev + 5)}
                  className='btn btn-outline btn-sm'
                  disabled={relatedLoading}
                >
                  {relatedLoading ? (
                    <span className='loading loading-spinner loading-sm'></span>
                  ) : (
                    'Load More'
                  )}
                </button>
              </li>
            </ul>
          ) : (
            <div className='text-center text-gray-500 py-4 italic'>
              No related PDFs available.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
