import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['*'],
        disallow: ['/profile/*'],
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        allow:['*'],
        disallow: ['/profile/*'],
      },
    ],
    sitemap: 'https://testpe.in/sitemap.xml',
  }
}