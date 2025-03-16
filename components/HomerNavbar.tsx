'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import logo from '../public/images/logo.png'

const lists = [
  { id: 1, name: 'Home', url: '/' },
  { id: 2, name: 'Subjects', url: '/subjects' },
  { id: 3, name: 'Gallery', url: '/gallery' },
]

export default function HomeNavbar() {
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

  return (
    <nav className='bg-base-200 shadow-md'>
      <div className='max-w-7xl mx-auto navbar px-4 lg:px-8'>
        <div className='navbar-start'>
          <Link href='/'>
            <Image
              src={logo}
              alt='Logo'
              width={160}
              height={50}
              className='cursor-pointer sm:max-w-28'
            />
          </Link>
        </div>

        <div className='navbar-center hidden md:flex'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search for a topic 🤗'
            className='input input-sm rounded-full input-bordered'
          />
        </div>

        <div className='navbar-end'>
          <ul className='flex space-x-6'>
            {lists.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className={`hover:text-primary capitalize text-lg font-medium ${
                    pathname === item.url
                      ? 'text-primary font-semibold'
                      : 'text-black'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
