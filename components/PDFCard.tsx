'use client'
import Image from 'next/image'
import React from 'react'

import pdfIcon from '@/public/images/pdf.png'

interface Pdf {
  id: string
  title: string
  url: string
}

export default function PDFCard({ pdfs }: { pdfs: Pdf[] }) {
  return (
    <div>
      <div className='p-6'>
        <h1 className='text-3xl font-bold mb-6'>PDFs</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
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
    </div>
  )
}
