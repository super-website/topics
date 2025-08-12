import CreateReview from '@/components/Review'
import {
  getAverageSchemeReview,
  getSchemeReview,
  getSingleScheme,
} from '@/utils/actions'
import { Download, Watch } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = (await params).id
  const scheme = await getSingleScheme(id)

  if (!scheme) {
    return {
      title: 'Scheme Not Found',
      description: 'This Scheme does not exist.',
      keywords: ['not found', 'error', 'missing scheme'],
    }
  }

  return {
    title: {
      absolute: `${scheme?.title} | ${scheme.class?.title}` || 'Scheme',
    },
    description: scheme.short_desc || 'Learn more about this scheme.',
    keywords: scheme.tags || [],
  }
}

export default async function page({ params }: Props) {
  const { id } = await params
  const data = await getSingleScheme(id)
  const avgRating = await getAverageSchemeReview(id)
  const reviews = await getSchemeReview(id)

  if (!data) {
    return (
      <div className='p-10 text-center'>
        <h1 className='text-4xl font-bold text-error'>Scheme Not Found</h1>
        <p className='mt-4 text-base-content/70'>
          The scheme with the provided ID does not exist.
        </p>
      </div>
    )
  }

  const formattedDate = new Date(data.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className='max-w-6xl mx-auto p-4 md:p-6 space-y-6'>
      {/* Breadcrumb */}
      <nav className='text-xs md:text-sm breadcrumbs mb-4'>
        <ul className='flex flex-wrap gap-1 text-base-content/70'>
          <li>
            <Link href='/' className='hover:text-primary'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/scheme' className='hover:text-primary'>
              Schemes
            </Link>
          </li>
          <li>
            <span className='text-base-content'>
              {data.title.length > 60
                ? data.title.substring(0, 60) + '...'
                : data.title}
            </span>
          </li>
        </ul>
      </nav>

      {/* Main Scheme Card */}
      <div className='card bg-base-100 shadow-lg border border-base-300'>
        <div className='card-body space-y-4'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
            <h1 className='text-2xl font-bold capitalize'>{data.title}</h1>
            <span className='flex items-center gap-2 text-sm text-base-content/70'>
              <Watch className='h-4 w-4' /> {formattedDate}
            </span>
          </div>

          <p className='text-base-content/80'>{data.short_desc}</p>

          {data.class?.slug && (
            <Link
              href={`/grades/${data.class.slug}`}
              className='badge badge-primary badge-outline w-fit'
            >
              {data.class.title}
            </Link>
          )}

          <div className='rounded-lg overflow-hidden border border-base-300'>
            <iframe
              src={`https://docs.google.com/gview?url=${data.url}&embedded=true`}
              style={{ width: '100%', height: '90vh' }}
              frameBorder='0'
              title='PDF Viewer'
            ></iframe>
          </div>

          {data.url && (
            <div className='flex flex-col items-center mt-4 space-y-2'>
              <a
                href={data.url}
                download
                className='btn btn-primary btn-sm sm:btn-md'
              >
                <Download />
                Download
              </a>
            </div>
          )}
        </div>
      </div>

      <div className='space-y-4'>
        <div className='collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm'>
          <input type='radio' name='review-accordion' defaultChecked />
          <div className='collapse-title font-semibold flex justify-between items-center'>
            Reviews
            <div className='flex items-center gap-2'>
              {[...Array(5)].map((_, i) => (
                <input
                  key={i}
                  type='radio'
                  className='mask mask-star-2 bg-yellow-400'
                  checked={Math.round(avgRating) === i + 1}
                  readOnly
                />
              ))}
              <span className='text-sm text-base-content/70'>
                ({avgRating.toFixed(1)})
              </span>
            </div>
          </div>
          <div className='collapse-content space-y-4'>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className='card bg-base-100 border border-base-300 shadow-sm'
                >
                  <div className='card-body p-4 space-y-2'>
                    <h3 className='card-title text-base font-semibold'>
                      {review.name}{' '}
                      <span className='text-sm text-base-content/70'>
                        — {review.email}
                      </span>
                    </h3>
                    <p className='text-sm'>{review.content}</p>
                    <div className='rating'>
                      {[...Array(5)].map((_, i) => (
                        <input
                          key={i}
                          type='radio'
                          name={`rating-${review.id}`}
                          className='mask mask-star-2 bg-yellow-400'
                          checked={i + 1 === review.rating}
                          readOnly
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-sm text-base-content/70'>No reviews yet.</p>
            )}
          </div>
        </div>

        <div className='collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm'>
          <input type='radio' name='review-accordion' />
          <div className='collapse-title font-semibold'>Leave a Review</div>
          <div className='collapse-content'>
            <CreateReview schemeId={data.id} />
          </div>
        </div>
      </div>

      {data.class?.pdfs && data.class.pdfs.length > 0 && (
        <section className='max-w-6xl mx-auto mt-10'>
          <h2 className='text-xl md:text-2xl font-bold mb-4'>
            Recommended Notes for {data.class.title}
          </h2>
          <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
            {data.class.pdfs.map((note) => (
              <div
                key={note.id}
                className='card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition'
              >
                <div className='card-body'>
                  <h3 className='card-title text-lg font-semibold line-clamp-2'>
                    {note.title}
                  </h3>
                  <p className='text-sm text-base-content/70 flex gap-2 items-center'>
                    <Download className='h-4 w-4' />
                    {note.download}
                  </p>
                  <div className='mt-4'>
                    <Link
                      href={`/notes-pdf/${note.id}`}
                      className='btn btn-primary btn-sm w-full'
                    >
                      View Note
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
