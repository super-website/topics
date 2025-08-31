import { getAllGallery, getAllScheme, getAllTopics } from '@/utils/actions'
import Link from 'next/link'
import React from 'react'
import type { Metadata } from 'next'
import {
  Layers,
  FileText,
  ClipboardList,
  GraduationCap,
  Pen,
} from 'lucide-react'
import Image from 'next/image'
import { link } from 'fs'

export const metadata: Metadata = {
  title: 'Education With Hamza - Learn the Right Way',
  description:
    'Free notes, schemes, guides and community support for students in Pakistan',
}

interface Topic {
  id: string
  title: string
  short_desc: string
  createdAt: Date
  subject?: {
    id: string
    short_name: string
  } | null
}

export default async function Page() {
  const topics: Topic[] = (await getAllTopics('')).slice(0, 6)
  const schemes = await getAllScheme()
  const banners = await getAllGallery()

  return (
    <>
      <div className='bg-base-200  p-2  text-center text-sm text-slate-700 mb-2'>
        <i className='flex align items-center justify-center'>
          {' '}
          <Pen className='h-6 w-6 text-blue-500' />
          Should you experience any errors, feel free to
          <Link href='/contact' className='text-blue-600 font-semibold mx-1'>
            reach out
          </Link>{' '}
          us.
        </i>
      </div>
      {banners.map((banner) => (
        <section
          key={banner.id}
          className='relative h-[470px] bg-cover bg-center bg-no-repeat flex items-center justify-start px-8'
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className='object-cover object-center'
          />
        </section>
      ))}

      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <h2 className='text-3xl font-bold mb-2 text-slate-800'>
            <span className='text-blue-500'>Why Choose </span>
            Education with Hamza?
          </h2>
          <p className='text-sm mb-12'>
            <span className='text-blue-500'>Get hands-on </span>
            experience with real projects and expert guidance.
          </p>

          <div className='grid md:grid-cols-3 gap-6'>
            {[
              {
                title: 'Free Quality Resources',
                desc: 'Get top-tier notes, schemes, and study materials for matric and fsc – all for free.',
                button: 'View resources',
                color: 'bg-blue-600 text-white',
                link: '/grades',
              },
              {
                title: 'Exam-Focused Content',
                desc: 'Access updated PDFs, past papers, and guides tailored for board success.',
                button: 'Access content',
                color: 'bg-gray-200 text-black',
                link: '/notes-pdf',
              },
              {
                title: 'Community Support',
                desc: 'Learn with guidance, tips, and help from students and educators alike.',
                button: 'Join community',
                color: 'bg-black/80 text-white',
                link: '/contact',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between ${item.color} hover:scale-[1.02] transition-transform duration-300`}
              >
                <div>
                  <h3 className='text-2xl font-bold mb-3'>{item.title}</h3>
                  <p className='text-base opacity-90'>{item.desc}</p>
                </div>
                <Link
                  href={item.link}
                  className='mt-6 px-4 py-2 bg-white text-black font-semibold rounded-lg shadow hover:shadow-md transition'
                >
                  {item.button}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='py-20 bg-white'>
        <div className='max-w-6xl mx-auto px-6 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-3'>
            Grades, Subjects, Notes & Schemes
          </h2>
          <p className='text-lg text-blue-600 font-medium mb-12'>
            Stay on track with resources designed to support your academic
            success.
          </p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-10'>
            <Link
              href='/grades'
              className='
            transition hover:scale-105 duration-200 
            '
            >
              <div className='flex justify-center mb-3'>
                <div className='bg-blue-500 p-4 rounded-full'>
                  <GraduationCap className='w-10 h-10 text-white' />
                </div>
              </div>
              <h3 className='text-lg font-semibold text-slate-700'>Grades</h3>
            </Link>

            <Link
              href='/subjects'
              className='
            transition hover:scale-105 duration-200 
            '
            >
              <div className='flex justify-center mb-3'>
                <div className='bg-blue-500 p-4 rounded-full'>
                  <Layers className='w-10 h-10 text-white' />
                </div>
              </div>
              <h3 className='text-lg font-semibold text-slate-700'>Subjects</h3>
            </Link>

            <Link
              href='/notes-pdf'
              className='
            transition hover:scale-105 duration-200 
            '
            >
              <div className='flex justify-center mb-3'>
                <div className='bg-blue-500 p-4 rounded-full'>
                  <FileText className='w-10 h-10 text-white' />
                </div>
              </div>
              <h3 className='text-lg font-semibold text-slate-700'>Notes</h3>
            </Link>

            <Link
              href='/schemes'
              className='
            transition hover:scale-105 duration-200 
            '
            >
              <div className='flex justify-center mb-3'>
                <div className='bg-blue-500 p-4 rounded-full'>
                  <ClipboardList className='w-10 h-10 text-white' />
                </div>
              </div>
              <h3 className='text-lg font-semibold text-slate-700'>Schemes</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className='py-20 bg-slate-50'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-3xl font-bold text-center mb-6'>
            Featured Topics
          </h2>

          {topics.length > 0 ? (
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className='card bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition'
                >
                  <h3 className='font-semibold text-sm text-slate-800 mb-2'>
                    {topic.title}
                  </h3>
                  <p className='text-slate-600 text-sm mb-4'>
                    {topic.short_desc.substring(0, 100)}
                    {topic.short_desc.length > 100 ? '...' : ''}
                  </p>
                  <Link
                    href={`/topic/${topic.id}`}
                    className='text-primary font-medium hover:underline text-sm'
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-slate-500'>
              No topics available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Educational Schemes */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-3xl font-bold text-center mb-10'>
            Educational Schemes
          </h2>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className='card border border-base-300 p-6 rounded-xl hover:shadow-md'
              >
                <h3 className='text-sm font-semibold text-slate-800 mb-2'>
                  {scheme.title}
                </h3>
                <p className='text-slate-600 text-sm mb-3'>
                  {scheme.short_desc.substring(0, 100) + '...' ||
                    'No description available.'}
                </p>
                {scheme.class && (
                  <div className='badge badge-secondary mb-3'>
                    {scheme.class.title}
                  </div>
                )}
                <Link
                  href={`/scheme/${scheme.id}`}
                  className='text-primary text-sm font-medium hover:underline'
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className='py-20 bg-slate-50'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <h2 className='text-3xl font-bold mb-4'>Connect with Us</h2>
          <p className='mb-10 text-slate-600'>
            <span className='text-blue-500'>Stay updated</span> with our latest
            content and announcements.
          </p>
          <div className='grid md:grid-cols-3 gap-6'>
            {[
              {
                title: 'WhatsApp',
                color: 'text-green-500',
                icon: '💬',
                link: 'https://www.whatsapp.com/channel/0029VaxtocFGU3BNpMi17O1x',
              },
              {
                title: 'YouTube',
                color: 'text-red-600',
                icon: '▶️',
                link: 'https://www.youtube.com/@EducationWithHamza-g8v',
              },
              {
                title: 'Facebook',
                color: 'text-blue-800',
                icon: '📘',
                link: 'https://www.facebook.com/profile.php?id=61575230046056',
              },
            ].map((platform, i) => (
              <div
                key={i}
                className='card p-6 bg-base-100 shadow-sm text-center'
              >
                <div className={`text-3xl mb-3 ${platform.color}`}>
                  {platform.icon}
                </div>
                <h3 className='text-xl font-bold text-slate-800'>
                  {platform.title}
                </h3>
                <a
                  href={platform.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-2 inline-block text-sm text-primary hover:underline'
                >
                  Follow us on {platform.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
