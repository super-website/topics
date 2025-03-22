import { getAllPdf } from '@/utils/actions'
import React from 'react'

export default async function page() {
  const data = await getAllPdf()

  return (
    <div>
      <h1>PDFs</h1>
      <ul>
        {data.map((pdf: any) => (
          <li key={pdf.id}>{pdf.name}</li>
        ))}
      </ul>
    </div>
  )
}
