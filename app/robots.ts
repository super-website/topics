import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/control',
      },
    ],
    sitemap: 'https://educationwithhamza.vercel.app/sitemap.xml',
  }
}
