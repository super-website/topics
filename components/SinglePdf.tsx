'use client'

import {
  getAllPdf,
  incrementPdfLike,
  updateDownloadCount,
} from '@/utils/actions'
import React, { useState, useEffect } from 'react'

interface Pdf {
  id: string
  title: string
  url: string
  download: number
  like: number
}

export const revalidate = 0

export default function SinglePdf({ pdf }: { pdf: Pdf }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [recentlyDownloaded, setRecentlyDownloaded] = useState<string | null>(
    null
  )
  const [relatedPdfs, setRelatedPdfs] = useState<Pdf[]>([])

  useEffect(() => {
    const fetchRelatedPdfs = async () => {
      const res = await getAllPdf('', 10)
      setRelatedPdfs(res)
    }
    fetchRelatedPdfs()
  }, [])

  if (!pdf) return <div className='alert alert-error mt-6'>PDF not found</div>

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
      link.remove()
      setRecentlyDownloaded(pdf.id)
      setTimeout(() => setRecentlyDownloaded(null), 1000)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className='max-w-6xl mx-auto p-4'>
      <div className='grid lg:grid-cols-3 gap-6'>
        {/* Main PDF section */}
        <div className='lg:col-span-2'>
          <div className='card bg-base-100 shadow-md p-6'>
            <h1 className='text-3xl font-semibold mb-2'>{pdf.title}</h1>

            <div className='flex items-center gap-3 text-sm mb-4'>
              <span className='badge badge-info badge-outline'>
                Downloads: {pdf.download}
              </span>
              <span className='badge badge-success badge-outline'>
                Likes: {pdf.like}
              </span>
            </div>

            <div className='rounded overflow-hidden border mb-6'>
              <iframe
                src={`https://docs.google.com/gview?url=${pdf.url}&embedded=true`}
                className='w-full h-[70vh]'
                frameBorder='0'
                title='PDF Viewer'
              ></iframe>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <button
                onClick={() => handleDownload(pdf)}
                className='btn btn-primary w-full sm:w-auto'
                disabled={loading === pdf.id}
              >
                {loading === pdf.id ? (
                  <span className='loading loading-spinner'></span>
                ) : (
                  'Download PDF'
                )}
              </button>

              <form action={incrementPdfLike}>
                <input type='hidden' name='id' value={pdf.id} />
                <input type='hidden' name='like' value='like' />
                <button
                  type='submit'
                  className='btn btn-outline btn-success w-full sm:w-auto'
                >
                  Like ({pdf.like})
                </button>
              </form>
            </div>

            <p className='text-gray-600 mt-6'>
              The <strong>{pdf.title}</strong> provides comprehensive study
              material to help students grasp key concepts effectively. This
              resource is designed to enhance learning and exam preparation,
              ensuring a deeper understanding of essential topics. Download now
              to boost your academic success.
            </p>
          </div>
        </div>

        {/* Related PDFs */}
        <div className='space-y-4'>
          <div className='card bg-base-100 shadow-md'>
            <div className='card-body p-4'>
              <h2 className='card-title text-xl mb-2'>More PDFs</h2>
              <ul className='space-y-2'>
                {relatedPdfs.map((item) => (
                  <li
                    key={item.id}
                    className='p-3 rounded bg-base-200 hover:bg-base-300 transition'
                  >
                    <a
                      href={`/notes-pdf/${item.id}`}
                      className='text-primary font-medium'
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
