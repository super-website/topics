import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    default: 'Education With Hamza | Online Courses & Study Resources',
    template: '%s | Education With Hamza',
  },
  description:
    'Education With Hamza offers high-quality online courses and resources to help you excel in academics. Learn at your own pace with expertly crafted content for Pakistani students.',
  keywords:
    'online education, FSC notes, 1st year, 2nd year, board exam prep, education with hamza, study resources, e-learning, free study material, education with hamza, education notes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' data-theme='light'>
      <head>
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7339717436236652'
          crossOrigin='anonymous'
        ></script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
