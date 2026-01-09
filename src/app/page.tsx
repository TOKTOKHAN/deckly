import type { Metadata } from 'next';
import LandingPage from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: '홈',
  description:
    'AI로 자동 생성하는 전문적인 사업 제안서. 미팅 전사록만 입력하면 완성도 높은 제안서를 PDF로 다운로드하세요. DECKLY에서 제공합니다.',
  keywords: [
    '제안서',
    '사업 제안서',
    'AI 제안서',
    '제안서 생성',
    'PDF 제안서',
    '비즈니스 제안서',
    'SI 제안서',
    'DECKLY',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'DECKLY',
    title: 'DECKLY - AI 기반 사업 제안서 생성 플랫폼',
    description:
      'AI로 자동 생성하는 전문적인 사업 제안서. 미팅 전사록만 입력하면 완성도 높은 제안서를 PDF로 다운로드하세요.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DECKLY - AI 기반 사업 제안서 생성 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DECKLY - AI 기반 사업 제안서 생성 플랫폼',
    description:
      'AI로 자동 생성하는 전문적인 사업 제안서. 미팅 전사록만 입력하면 완성도 높은 제안서를 PDF로 다운로드하세요.',
    images: ['/images/og-image.png'],
    creator: '@toktokhan_dev',
  },
};

export default function Home() {
  return <LandingPage />;
}
