import './globals.css'
import type { Metadata } from 'next'
import { Hind, Inter } from 'next/font/google'
import Head from 'next/head'

const hind = Hind({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Education With Hamza | Online Courses & Study Resources',
    template: '%s | Education With Hamza',
  },
  description:
    'Education With US offers high-quality online courses and resources to help you learn and grow in various subjects. Learn at your own pace with expert-led content.',
  keywords:
    'online education, learn online, courses, e-learning, study resources',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={hind.className}>
      <body className='bg-gray-200'>{children}</body>
    </html>
  )
}
