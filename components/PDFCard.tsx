'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import pdfIcon from '@/public/images/pdf.png'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Pdf {
  id: string
  title: string
  url: string
}

interface PDFCardProps {
  pdfs: Pdf[]
  query: string
}

export default function PDFCard({ pdfs, query }: PDFCardProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '')

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (searchTerm) {
      params.set('query', searchTerm)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)
  }, [searchTerm, pathname, searchParams, replace])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6 flex-col md:flex-row  mx-10'>
        <h1 className='text-xl md:text-2xl font-bold'>Notes PDF</h1>

        <form>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Search PDFs'
            className='input input-bordered focus:ring-blue-600  p-2 my-4 input-sm'
          />
        </form>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10'>
        {pdfs.length === 0 ? (
          <p>No Pdf Available</p>
        ) : (
          pdfs.map((pdf) => (
            <div key={pdf.id} className='card w-full bg-base-100 shadow-xl'>
              <figure>
                <Image
                  src={pdfIcon}
                  alt='PDF Icon'
                  width={200}
                  height={200}
                  className='object-cover'
                />
              </figure>
              <div className='card-body'>
                <h2 className='card-title text-xs'>{pdf.title}</h2>
                <div className='card-actions justify-end'>
                  <button
                    onClick={() => {
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
                        })
                        .catch((error) => console.error(error))
                    }}
                    className='btn btn-primary'
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
