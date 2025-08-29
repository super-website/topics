import { getClass } from '@/utils/actions'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const navItems = [
  { id: 1, name: 'Home', url: '/' },
  { id: 2, name: 'Subjects', url: '/subjects' },
  { id: 3, name: 'Notes', url: '/notes-pdf' },
  { id: 4, name: 'Schemes', url: '/scheme' },
]

export default async function Header() {
  const grades = await getClass()

  return (
    <div className='bg-whiter text-black shadow-md'>
      <div className='flex items-center justify-start md:justify-center space-x-6 gap-4 relative overflow-x-auto md:overflow-visible py-3 px-3'>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className='shrink-0 text-sm capitalize'
          >
            {item.name}
          </Link>
        ))}

        <div className='dropdown dropdown-hover hidden md:block'>
          <div
            tabIndex={0}
            role='button'
            className='  flex items-center justify-center h-6'
          >
            Grades
            <ChevronDown className='mt-1' />
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm'
          >
            {grades.map((grade: any) => (
              <li key={grade.id}>
                <Link
                  href={`/grades/${grade.slug}`}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                >
                  {grade.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='overflow-visible block md:hidden text-center bg-gray-600'>
        <div className='dropdown dropdown-hover'>
          <div tabIndex={0} role='button' className='  flex items-center'>
            Grades <ChevronDown />
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm'
          >
            {grades.map((grade: any) => (
              <li key={grade.id}>
                <Link
                  href={`/grades/${grade.slug}`}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                >
                  {grade.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='block md:hidden border-bottom border'>
        <form action='/search/' method='GET' className='w-full'>
          <div className='relative w-full max-w-xl mx-auto'>
            <input
              type='text'
              name='query'
              placeholder='Search "addition worksheets"'
              className='w-full rounded-none border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C4C9] text-black'
            />
            <svg
              className='absolute left-3 top-2.5 h-4 w-4 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z'
              />
            </svg>
          </div>
        </form>
      </div>
    </div>
  )
}
