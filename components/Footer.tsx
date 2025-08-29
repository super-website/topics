import { link } from 'fs'
import Link from 'next/link'
import React from 'react'

const data = [
  { id: 1, name: 'Contact Us', link: '/contact' },
  { id: 2, name: 'Subjects', link: '/subjects' },
  { id: 3, name: 'Notes PDF', link: '/notes-pdf' },
  { id: 4, name: 'About Us', link: '/about-us' },
]

export default function Footer() {
  return (
    <footer className='footer footer-horizontal footer-center bg-black text-white rounded p-10 overflow-hidden md:overflow-auto'>
      <nav className='sm:grid grid-flow-col gap-4 flex flex-col'>
        {data.map((item) => (
          <Link key={item.id} href={item.link} className='link link-hover '>
            {item.name}
          </Link>
        ))}
      </nav>
      <nav>
        <div className='grid grid-flow-col gap-4'>
          <Link
            href='https://www.youtube.com/@EducationWithHamza-g8v'
            target='_blank'
            aria-label='Visit our YouTube channel'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z'></path>
            </svg>
          </Link>
          <Link
            href='https://www.facebook.com/profile.php?id=61566559002640'
            target='_blank'
            aria-label='Visit our Facebook Page'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z'></path>
            </svg>
          </Link>
        </div>
      </nav>
      <aside>
        <p className='text-xs md:text-sm '>
          Copyright © {new Date().getFullYear()} - All right reserved by
          Education With Hamza
        </p>
      </aside>
    </footer>
  )
}
