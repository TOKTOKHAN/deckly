import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deckly-five.vercel.app/';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/admin',
          '/api',
          '/preview',
          '/signup', // 회원가입 페이지는 비활성화되어 있음
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
