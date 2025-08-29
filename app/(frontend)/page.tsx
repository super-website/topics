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
      <div className='bg-white/10  p-4  place-items-center'>
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
      {/* Banner */}
      {banners.map((banner) => (
        <section
          key={banner.id}
          className='relative h-[400px] bg-cover bg-center bg-no-repeat flex items-center justify-start px-8'
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className='object-cover object-center'
          />
        </section>
      ))}

      {/* Why Choose Section */}
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

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Free Quality Resources',
                desc: 'Get top-tier notes, schemes, and study materials for 1st & 2nd year – all for free.',
                color: 'bg-blue-600',
              },
              {
                title: 'Exam-Focused Content',
                desc: 'Access updated PDFs, past papers, and guides tailored for board success.',
                color: 'bg-green-600',
              },
              {
                title: 'Community Support',
                desc: 'Learn with guidance, tips, and help from students and educators alike.',
                color: 'bg-purple-600',
              },
            ].map((item, i) => (
              <div
                key={i}
                className='p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-lg transition'
              >
                <div
                  className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span className='text-white text-2xl font-bold'>★</span>
                </div>
                <h3 className='text-xl font-bold text-slate-800 mb-2'>
                  {item.title}
                </h3>
                <p className='text-slate-600 text-sm'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 bg-[#A8F1FF]'>
        <div className='max-w-5xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center'>
              <div className='flex justify-center mb-4'>
                <div className='bg-cyan-100 p-3 rounded-full'>
                  <GraduationCap className='w-6 h-6 text-cyan-600' />
                </div>
              </div>
              <h3 className='text-xl font-semibold text-cyan-600 mb-2'>
                Grades
              </h3>
              <p className='text-gray-700 mb-4'>
                Track academic performance and view grade reports to monitor
                student progress.
              </p>
              <Link
                href='/grades'
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-full shadow-sm'
              >
                View grades
              </Link>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center'>
              <div className='flex justify-center mb-4'>
                <div className='bg-cyan-100 p-3 rounded-full'>
                  <Layers className='w-6 h-6 text-cyan-600' />
                </div>
              </div>
              <h3 className='text-xl font-semibold text-cyan-600 mb-2'>
                Subjects
              </h3>
              <p className='text-gray-700 mb-4'>
                Dive into detailed subjects and get comprehensive educational
                resources tailored by topic.
              </p>
              <Link
                href='/subjects'
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-full shadow-sm'
              >
                Check it out
              </Link>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center'>
              <div className='flex justify-center mb-4'>
                <div className='bg-cyan-100 p-3 rounded-full'>
                  <FileText className='w-6 h-6 text-cyan-600' />
                </div>
              </div>
              <h3 className='text-xl font-semibold text-cyan-600 mb-2'>
                Notes
              </h3>
              <p className='text-gray-700 mb-4'>
                Download and print PDF notes and resources to help reinforce
                learning offline.
              </p>
              <Link
                href='notes-pdf'
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-full shadow-sm'
              >
                View & Download
              </Link>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center'>
              <div className='flex justify-center mb-4'>
                <div className='bg-cyan-100 p-3 rounded-full'>
                  <ClipboardList className='w-6 h-6 text-cyan-600' />
                </div>
              </div>
              <h3 className='text-xl font-semibold text-cyan-600 mb-2'>
                Schemes
              </h3>
              <p className='text-gray-700 mb-4'>
                Access structured schemes of work to align your teaching plan
                with national standards.
              </p>
              <Link
                href='/scheme'
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-full shadow-sm'
              >
                View schemes
              </Link>
            </div>
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
            Stay updated with our latest content and announcements.
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
