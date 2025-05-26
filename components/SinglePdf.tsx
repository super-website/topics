'use client'
import { getAllPdf, getSinglePdf, updateDownloadCount } from '@/utils/actions'
import React, { useState, useEffect } from 'react'
import pdfIcon from '@/public/images/pdf.png'
import { Metadata } from 'next'

interface Pdf {
  id: string
  title: string
  url: string
  download: number
}
type Props = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const pdf = await getSinglePdf(params.id)

  if (!pdf) {
    return {
      title: 'PDF Not Found',
      description: 'This PDF does not exist.',
      keywords: ['not found', 'error', 'missing pdf'],
    }
  }

  return {
    title: pdf.title,
    description: `Learn more about ${pdf.title}`,
    keywords: pdf.title.toLowerCase().split(' '),
  }
}

export default function SinglePdf({ pdf }: { pdf: Pdf }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [recentlyDownloaded, setRecentlyDownloaded] = useState<string | null>(
    null
  )
  const [relatedPdfs, setRelatedPdfs] = useState<Pdf[]>([])

  useEffect(() => {
    // Fetch related PDFs or recent PDFs
    const fetchRelatedPdfs = async () => {
      const res = await getAllPdf('', 10)
      setRelatedPdfs(res)
    }

    fetchRelatedPdfs()
  }, [])

  if (!pdf) {
    return <div>PDF not found</div>
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
        setTimeout(() => setRecentlyDownloaded(null), 1000)
      })
      .catch((error) => {
        console.error(error)
        setLoading(null)
      })
  }

  return (
    <div className='flex flex-col lg:flex-row p-4 gap-6'>
      {/* PDF Viewer Section */}
      <div className='lg:w-3/4 w-full'>
        <div className='my-4'>
          <h1 className='text-2xl font-bold'>{pdf.title}</h1>
          <p className='text-gray-600 mt-2'>Download Count: {pdf.download}</p>
        </div>

        <div>
          <iframe
            src={`https://docs.google.com/gview?url=${pdf.url}&embedded=true`}
            style={{ width: '100%', height: '70vh' }}
            frameBorder='0'
            title='PDF Viewer'
          ></iframe>
        </div>

        <div className='text-center mt-4'>
          <button
            onClick={() => handleDownload(pdf)}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
            disabled={loading === pdf.id}
          >
            {loading === pdf.id ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Related PDFs Section */}
      <div className='lg:w-1/4 w-full'>
        <h2 className='text-xl font-semibold mb-2'>More PDFs</h2>
        <ul className='space-y-3'>
          {relatedPdfs.map((item) => (
            <li
              key={item.id}
              className='bg-gray-100 p-3 rounded hover:bg-gray-200'
            >
              <a
                href={`/notes-pdf/${item.id}`}
                className='text-blue-600 font-medium'
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
