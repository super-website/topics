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

export const revalidate = 60

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

      <section className='mt-24 px-6 md:px-16'>
        <div className='bg-base-200 rounded-2xl shadow-xl p-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-primary mb-4'>
            Discover Beautiful Naats on
          </h2>
          <Link
            href='https://naat-stream.vercel.app/'
            target='_blank'
            className='btn btn-primary btn-wide text-lg'
          >
            Visit NaatStream
          </Link>

          <p className='mt-4 text-base-content text-sm md:text-base max-w-xl mx-auto'>
            A spiritual destination to listen to soulful Naats. Free, fast, and
            beautifully designed for every Muslim.
          </p>

          <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='card bg-white shadow-lg hover:shadow-xl transition'>
              <div className='card-body'>
                <h3 className='card-title text-lg text-primary'>
                  Aye Rasule Ameen
                </h3>
                <p>
                  A timeless Naat expressing love for the Prophet Muhammad ﷺ.
                </p>
                <div className='card-actions justify-end'>
                  <Link
                    href='https://naat-stream.vercel.app/naats/aye-rasule-ameen-2025-05-26'
                    className='btn btn-sm btn-outline btn-primary'
                    target='_blank'
                  >
                    Listen
                  </Link>
                </div>
              </div>
            </div>

            <div className='card bg-white shadow-lg hover:shadow-xl transition'>
              <div className='card-body'>
                <h3 className='card-title text-lg text-primary'>
                  Tajdar e Haram
                </h3>
                <p>
                  A powerful and moving tribute recited by many famous artists.
                </p>
                <div className='card-actions justify-end'>
                  <Link
                    href='https://naat-stream.vercel.app/naats/tajdar-e-haram-2025-05-26'
                    className='btn btn-sm btn-outline btn-primary'
                    target='_blank'
                  >
                    Listen
                  </Link>
                </div>
              </div>
            </div>

            <div className='card bg-white shadow-lg hover:shadow-xl transition'>
              <div className='card-body'>
                <h3 className='card-title text-lg text-primary'>
                  Ya Nabi Salam Alaika
                </h3>
                <p>A poetic masterpiece in praise of the Prophet ﷺ.</p>
                <div className='card-actions justify-end'>
                  <Link
                    target='_blank'
                    href='https://naat-stream.vercel.app/naats/ya-nabi-salam-alaika-ya-rasool-salam-alaika-naat-mp3-download-2025-05-28'
                    className='btn btn-sm btn-outline btn-primary'
                  >
                    Listen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-24 px-10 md:px-0'>
        <h2 className='text-3xl font-bold mb-4 text-center'>Connect with Us</h2>
        <p className='text-center mb-8'>
          Stay updated with our latest content and announcements. Follow us on
          our social media channels!
        </p>

        <div className=' grid-cols-1 md:grid-cols-3 gap-6  hidden md:grid'>
          {/* WhatsApp Card */}
          <div className='card w-96 bg-base-100 shadow-sm'>
            <div className='card-body items-center text-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-10 text-green-500 mb-3'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12.003 2.002a9.947 9.947 0 0 0-8.094 15.765L2 22l4.371-1.834A9.948 9.948 0 1 0 12.003 2.002zm0 18.035a8.084 8.084 0 0 1-4.142-1.16l-.296-.175-2.589 1.087.692-2.717-.183-.28a8.087 8.087 0 1 1 6.518 3.245zm4.41-6.218c-.222-.111-1.31-.646-1.514-.72-.203-.074-.352-.111-.5.112s-.574.719-.705.868c-.13.148-.26.166-.482.056-.222-.111-.936-.345-1.782-1.098-.658-.586-1.102-1.309-1.23-1.531-.13-.222-.014-.341.097-.452.1-.1.222-.26.334-.389.112-.13.148-.222.222-.37.074-.148.037-.278-.018-.389-.056-.111-.5-1.205-.686-1.652-.181-.435-.367-.376-.5-.383-.13-.007-.278-.009-.426-.009a.82.82 0 0 0-.593.278c-.203.222-.778.76-.778 1.853 0 1.093.797 2.15.908 2.297.111.148 1.57 2.4 3.808 3.366.532.23.947.368 1.27.47.533.17 1.017.146 1.399.089.427-.063 1.31-.535 1.495-1.05.184-.516.184-.958.13-1.05-.056-.093-.204-.148-.426-.26z' />
              </svg>
              <h2 className='text-xl font-bold'>WhatsApp</h2>
              <a
                href='https://www.whatsapp.com/channel/0029VaxtocFGU3BNpMi17O1x'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-2 text-sm text-primary hover:underline'
              >
                Follow us on WhatsApp
              </a>
            </div>
          </div>

          {/* YouTube Card */}
          <div className='card w-96 bg-base-100 shadow-sm'>
            <div className='card-body items-center text-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-10 text-red-600 mb-3'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M23.498 6.186a2.971 2.971 0 0 0-2.093-2.094C19.726 3.5 12 3.5 12 3.5s-7.726 0-9.405.592A2.971 2.971 0 0 0 .502 6.186C0 7.865 0 12 0 12s0 4.135.502 5.814a2.971 2.971 0 0 0 2.093 2.094C4.274 20.5 12 20.5 12 20.5s7.726 0 9.405-.592a2.971 2.971 0 0 0 2.093-2.094C24 16.135 24 12 24 12s0-4.135-.502-5.814zM9.75 15.02V8.98l6.5 3.02-6.5 3.02z' />
              </svg>
              <h2 className='text-xl font-bold'>YouTube</h2>
              <a
                href='https://www.youtube.com/@EducationWithHamza-g8v'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-2 text-sm text-primary hover:underline'
              >
                Watch our videos
              </a>
            </div>
          </div>

          {/* Facebook Card */}
          <div className='card w-96 bg-base-100 shadow-sm'>
            <div className='card-body items-center text-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-10 text-blue-800 mb-3'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24h11.494v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.098 2.795.143v3.24l-1.917.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z' />
              </svg>
              <h2 className='text-xl font-bold'>Facebook</h2>
              <a
                href='https://www.facebook.com/profile.php?id=61575230046056'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-2 text-sm text-primary hover:underline'
              >
                Follow us on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      <NewsLetter />
    </>
  )
}
