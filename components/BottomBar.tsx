'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import DeleteBtn from './DeleteBtn'
import { logout } from '@/utils/actions'

const lists = [
  {
    id: 1,
    name: 'topics',
    url: '/control/topics',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M12 6v6l4 2'
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'subjects',
    url: '/control/subjects',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M5 13l4 4L19 7'
        />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'gallery',
    url: '/control/gallery',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M3 7h18M3 12h18M3 17h18'
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'pdf',
    url: '/control/pdf',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z'
        />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'comments',
    url: '/control/contact',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M8 10h.01M12 10h.01M16 10h.01M21 16.5a2.5 2.5 0 00-2.5-2.5H5.5A2.5 2.5 0 003 16.5V20l4-4h14z'
        />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'scheme',
    url: '/control/scheme',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M9.75 17L4.5 12l5.25-5m5.5 10l5.25-5-5.25-5'
        />
      </svg>
    ),
  },
]

export default function BottomBar() {
  const path = usePathname()
  return (
    <ul className='menu bg-base-200 menu-horizontal rounded-box fixed bottom-0 left-0 right-0 p-2 justify-around items-center'>
      {lists.map((item) => (
        <li key={item.id} className='flex flex-col items-center justify-center'>
          <Link
            href={item.url}
            className={`capitalize  ${
              path === item.url ? 'text-black' : 'text-primary'
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        </li>
      ))}
      <li>
        <button
          className='text-red-500 px-4 py-2 rounded-lg font-bold'
          onClick={async () => await logout()}
        >
          Logout
        </button>
      </li>
    </ul>
  )
}
