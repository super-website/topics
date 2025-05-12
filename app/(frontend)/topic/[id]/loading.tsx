import React from 'react'

export default function loading() {
  return (
    <div className='flex flex-col gap-6 max-w-2xl w-full md:max-w-7xl md:mx-auto'>
      <div className='skeleton h-16 w-full bg-blue-200 rounded' />

      <div className='bg-white p-6 rounded shadow flex flex-col gap-4'>
        <div className='skeleton h-6 w-3/4' />

        <div className='skeleton h-0.5 w-full bg-gray-300' />

        <div className='skeleton h-4 w-full' />
        <div className='skeleton h-4 w-5/6' />
        <div className='skeleton h-4 w-2/3' />

        <div className='h-4' />

        <div className='skeleton h-4 w-full' />
        <div className='skeleton h-4 w-3/4' />
        <div className='skeleton h-4 w-2/3' />
      </div>
    </div>
  )
}
