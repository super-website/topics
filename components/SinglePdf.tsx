'use client'
import {
  getAllPdf,
  incrementPdfLike,
  updateDownloadCount,
} from '@/utils/actions'
import React, { useState, useEffect } from 'react'
import { Metadata } from 'next'

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

  if (!pdf) return <div className='alert alert-error'>PDF not found</div>

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
        link.remove()
        setLoading(null)
        setRecentlyDownloaded(pdf.id)
        setTimeout(() => setRecentlyDownloaded(null), 1000)
      })
      .catch((error) => {
        console.error(error)
        setLoading(null)
      })
  }

  return (
    <div className='flex flex-col lg:flex-row gap-6 p-6'>
      {/* Main PDF Section */}
      <div className='lg:w-3/4 w-full'>
        <div className='card shadow-lg bg-base-100 p-6'>
          <h1 className='card-title text-3xl'>{pdf.title}</h1>
          <div className='mt-2 text-sm text-gray-500'>
            <span className='badge badge-info badge-outline'>
              Downloads: {pdf.download}
            </span>
            <span className='ml-2 badge badge-success badge-outline'>
              Likes: {pdf.like}
            </span>
          </div>

          <div className='mt-4 rounded overflow-hidden border'>
            <iframe
              src={`https://docs.google.com/gview?url=${pdf.url}&embedded=true`}
              style={{ width: '100%', height: '70vh' }}
              frameBorder='0'
              title='PDF Viewer'
              className='w-full h-[70vh]'
            ></iframe>
          </div>

          <div className='mt-6 flex flex-col md:flex-row gap-4'>
            <button
              onClick={() => handleDownload(pdf)}
              className={`btn btn-primary w-full md:w-auto ${
                loading === pdf.id ? 'loading' : ''
              }`}
              disabled={loading === pdf.id}
            >
              {loading === pdf.id ? 'Downloading...' : 'Download PDF'}
            </button>

            <form action={incrementPdfLike}>
              <input type='hidden' name='id' value={pdf.id} />
              <input type='hidden' name='like' value='like' />
              <button
                type='submit'
                className='btn btn-outline btn-success w-full md:w-auto'
              >
                👍 Like ({pdf.like})
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Related PDFs Section */}
      <div className='lg:w-1/4 w-full'>
        <div className='card bg-base-100 shadow-md'>
          <div className='card-body p-4'>
            <h2 className='card-title text-xl mb-2'>More PDFs</h2>
            <ul className='space-y-3'>
              {relatedPdfs.map((item) => (
                <li
                  key={item.id}
                  className='bg-base-200 rounded p-3 hover:bg-base-300 transition'
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
  )
}
