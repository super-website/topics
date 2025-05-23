import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Education With Hamza',
  description:
    'Learn about our mission to provide free, high-quality educational content to students in Pakistan. Education With Hamza is committed to empowering learners through accessible resources.',
  keywords: [
    'About Education With Hamza',
    'Pakistani board exam notes',
    'Free FSC notes',
    '1st year',
    '2nd year',
  ],
}

export default function AboutPage() {
  return (
    <div className='max-w-4xl mx-auto p-6 animate-fadeIn'>
      <div className='text-center mb-8'>
        <h1 className='text-5xl font-extrabold text-primary mb-2'>About Us</h1>
        <p className='text-xl text-gray-500'>
          Empowering Students Through Quality Education
        </p>
      </div>

      <div className='card shadow-2xl bg-base-200 rounded-box p-8 space-y-6'>
        <p className='text-lg leading-relaxed'>
          <strong className='text-primary'>Education With Hamza</strong> is a
          platform dedicated to providing high-quality, free educational
          resources for students in Pakistan. Our focus is on those preparing
          for 1st and 2nd year board exams.
        </p>

        <p className='text-lg leading-relaxed'>
          We are committed to{' '}
          <span className='font-semibold text-secondary'>
            accessible learning
          </span>
          . From handwritten notes and exam schemes to up-to-date PDFs, every
          resource is tailored for your academic success.
        </p>

        <p className='text-lg leading-relaxed'>
          The initiative is led by{' '}
          <strong className='text-primary'>Hamza</strong>, a young educator
          passionate about simplifying difficult topics. Thousands of students
          now benefit from this mission.
        </p>

        <p className='text-lg leading-relaxed'>
          Thank you for supporting our journey. Together, we’re making education
          open, equal, and understandable.
        </p>
      </div>

      <div className='mt-12 text-center'>
        <a href='/contact' className='btn btn-primary btn-wide text-lg'>
          Contact Us
        </a>
      </div>
    </div>
  )
}
