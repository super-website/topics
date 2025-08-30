import React from 'react'

export default function Loading() {
  return (
    <div className='max-w-7xl mx-auto px-6'>
      <h2 className='text-2xl font-bold text-slate-800 mb-6'>Notes PDF</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className='animate-pulse bg-white rounded-xl shadow-sm p-4 border border-gray-200'
          >
            <div className='w-full h-40 bg-gray-200 rounded-md mb-4'></div>

            <div className='h-4 bg-gray-200 rounded w-3/4 mb-3'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2 mb-6'></div>

            <div className='w-24 h-8 bg-gray-300 rounded-full'></div>
          </div>
        ))}
      </div>
    </div>
  )
}
