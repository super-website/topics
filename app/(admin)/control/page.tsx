import { getAllSubject } from '@/utils/actions'
import React from 'react'

export const revalidate = 0

export default async function page() {
  const data = await getAllSubject()
  return (
    <div>
      <h1 className='m-10 ml-0 text-3xl'>Dashboard</h1>
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-10'>
        <div className='stats stats-vertical p-8 '>
          <div className='stat-title'>Total Subjects</div>
          <div className='stat-value p-4 text-center'>{data.length}</div>
          <div className='stat-actions'>
            <span className='stat-desc'>Published</span>
          </div>
        </div>
        <div className='stats stats-vertical p-8 '>
          <div className='stat-title'>Total Subjects</div>
          <div className='stat-value p-4 text-center'>{data.length}</div>
          <div className='stat-actions'>
            <span className='stat-desc'>Published</span>
          </div>
        </div>
        <div className='stats stats-vertical p-8 '>
          <div className='stat-title'>Total Subjects</div>
          <div className='stat-value p-4 text-center'>{data.length}</div>
          <div className='stat-actions'>
            <span className='stat-desc'>Published</span>
          </div>
        </div>
      </div>
    </div>
  )
}
