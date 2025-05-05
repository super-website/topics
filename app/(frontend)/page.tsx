import NewsLetter from '@/components/NewsLetter'
import { getAllGallery, getAllScheme, getAllTopics } from '@/utils/actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type GalleryImage = {
  id: string
  title: string
  images: {
    public_id: string
    secure_url: string
  }[]
  createdAt: Date
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

export const revalidate = 0

export default async function page() {
  const rawData = await getAllGallery()
  const carouselImages = rawData as GalleryImage[]

  let topics: Topic[] = []

  try {
    const data = await getAllTopics('')
    topics = Array.isArray(data) ? data : data.topics || []
    topics = topics.slice(0, 4)
  } catch (error) {
    console.error('Error fetching topics:', error)
    topics = []
  }

  const schemes = await getAllScheme()

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center min-h-max px-10 md:px-0 md:min-h-screen'>
        <div>
          <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl text-center md:text-left'>
            Discover a New Way to Learn with Hamza
          </h1>

          <p className='mt-8 max-w-xl text-lg leading-8 text-center md:text-left'>
            Welcome to{' '}
            <span className='text-primary font-bold'>
              Hamza&#39;s educational
            </span>{' '}
            platform, where learning becomes engaging and meaningful. Explore
            topics, dive into interactive content, and empower your knowledge
            journey. Designed with students in mind, this site helps make
            education accessible and enjoyable.
          </p>

          <div className='mt-10'>
            <Link href='/topics' className='btn btn-primary'>
              Explore the Topics
            </Link>
          </div>
        </div>

        <div className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box'>
          {carouselImages
            .flatMap((image) => image.images)
            .slice(0, 4)
            .map((singleImg) => (
              <div key={singleImg.public_id} className='carousel-item'>
                <Image
                  src={singleImg.secure_url}
                  className='rounded-box h-full w-80 object-cover'
                  alt='Educational content'
                  width={320}
                  height={448}
                  priority
                />
              </div>
            ))}
        </div>
      </div>

      <section className='mt-24 px-10 md:px-0'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Featured Topics</h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {topics.map((topic) => (
            <div
              key={topic.id}
              className='bg-base-100 border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between'
            >
              <div>
                <h3 className='text-xl font-semibold mb-3'>{topic.title}</h3>
                <p className='text-sm text-gray-600 mb-4'>
                  {topic.short_desc.substring(0, 200)}...
                </p>
                {topic.subject && (
                  <span className='inline-block mb-4 px-2 py-1 text-xs bg-primary text-white rounded'>
                    {topic.subject.short_name}
                  </span>
                )}
              </div>
              <Link
                href={`/topic/${topic.id}`}
                className='text-sm mt-auto text-primary underline hover:text-primary/80 transition'
                aria-label={`Read more about ${topic.title}`}
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className='mt-24 px-10 md:px-0'>
        <h2 className='text-3xl font-bold mb-8 text-center'>
          Educational Schemes
        </h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className='bg-base-100 border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between'
            >
              <div>
                <h3 className='text-xl font-semibold mb-3'>{scheme.title}</h3>
                <p className='text-sm text-gray-600 mb-4'>
                  {scheme.short_desc?.substring(0, 200) ||
                    'No description available.'}
                </p>
                {scheme.class && (
                  <span className='inline-block mb-4 px-2 py-1 text-xs bg-secondary text-white rounded'>
                    {scheme.class}
                  </span>
                )}
              </div>
              {scheme.id && (
                <Link
                  href={`/scheme/${scheme.id}`}
                  className='text-sm mt-auto text-primary underline hover:text-primary/80 transition'
                  aria-label={`Read more about ${scheme.title}`}
                >
                  Read More →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <NewsLetter />
    </>
  )
}
