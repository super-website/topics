import { getAllSubject } from '@/utils/actions'
import Link from 'next/link'
import React from 'react'

export default async function Sidebar() {
  const subjects = await getAllSubject()
  return (
    <div className='drawer hidden md:flex'>
      <div className='drawer-content'>
        <h2 className='font-bold text-xl'>Subjects</h2>
        <ul className='menu  text-base-content min-h-full w-64 p-4'>
          {subjects.map((subject) => {
            return (
              <li key={subject.id}>
                <Link
                  href={`/subject/${subject.id}`}
                  className='border-b border-gray-300'
                >
                  {subject.short_name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
