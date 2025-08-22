'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import DeleteBtn from './DeleteBtn'
import { logout } from '@/utils/actions'
import {
  Book,
  BookA,
  File,
  Image as ImageIcon,
  MessageCircle,
  PanelLeftDashed,
  Users,
} from 'lucide-react'

const lists = [
  {
    id: 1,
    name: 'users',
    url: '/control/users',
    icon: <Users className='h-5 w-5' />,
  },
  {
    id: 2,
    name: 'subjects',
    url: '/control/subjects',
    icon: <BookA className='h-5 w-5' />,
  },
  {
    id: 3,
    name: 'Banners',
    url: '/control/gallery',
    icon: <ImageIcon className='h-5 w-5' />,
  },
  {
    id: 4,
    name: 'pdf',
    url: '/control/pdf',
    icon: <PanelLeftDashed className='h-5 w-5' />,
  },
  {
    id: 5,
    name: 'comments',
    url: '/control/contact',
    icon: <MessageCircle className='h-5 w-5' />,
  },
  {
    id: 6,
    name: 'scheme',
    url: '/control/scheme',
    icon: <File className='h-5 w-5' />,
  },
  {
    id: 7,
    name: 'grades',
    url: '/control/grades',
    icon: <Book className='h-5 w-5' />,
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
