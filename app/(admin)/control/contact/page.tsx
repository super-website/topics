import { getAllComments } from '@/utils/actions'

export const revalidate = 0

export default async function Page() {
  const data = await getAllComments()

  return (
    <div className='max-w-7xl mx-auto p-5'>
      <h1 className='text-4xl font-extrabold text-center text-gray-800 mb-8'>
        Comments
      </h1>

      <div className='alert alert-info mb-8'>
        <p className='text-lg font-semibold'>Here are the comments</p>
      </div>

      <div
        className='grid grid-cols-1 gap-6'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      >
        {data.length === 0 ? (
          <p className='text-gray-500 text-center text-lg'>
            No comments available.
          </p>
        ) : (
          <div className='table w-full table-zebra'>
            {data.map((comment) => (
              <div
                key={comment.id}
                className='relative group p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out'
              >
                <div className='mb-4'>
                  <h2 className='text-2xl font-semibold text-gray-800 group-hover:text-blue-500'>
                    {comment.name}
                  </h2>
                  <p className='text-sm text-gray-500'>{comment.email}</p>
                </div>
                <p className='text-gray-700 text-base leading-relaxed'>
                  {comment.message}
                </p>

                <div className='absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-40 rounded-xl transition-opacity duration-300'></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
