import type { Metadata, Viewport } from 'next';
import './globals.css';
import ConditionalNavbar from '@/components/layout/ConditionalNavbar';
import AuthProvider from '@/components/providers/AuthProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import { NotFoundProvider } from '@/contexts/NotFoundContext';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'DECKLY - AI 기반 사업 제안서 생성 플랫폼',
    template: '%s | DECKLY',
  },
  description:
    'AI로 자동 생성하는 전문적인 사업 제안서. 미팅 전사록만 입력하면 완성도 높은 제안서를 PDF로 다운로드하세요. TOKTOKHAN.DEV에서 제공합니다.',
  keywords: [
    '제안서',
    '사업 제안서',
    'AI 제안서',
    '제안서 생성',
    'PDF 제안서',
    '비즈니스 제안서',
    'SI 제안서',
    'TOKTOKHAN.DEV',
  ],
  authors: [{ name: 'TOKTOKHAN.DEV' }],
  creator: 'TOKTOKHAN.DEV',
  publisher: 'TOKTOKHAN.DEV',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://deckly.toktokhan.dev'),
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: {
  //   icon: '/icons/favicon.ico',
  //   shortcut: '/icons/favicon-16x16.png',
  //   apple: '/icons/apple-touch-icon.png',
  // },
  // manifest: '/manifest.json',
  category: 'business',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
    { media: '(prefers-color-scheme: dark)', color: '#4f46e5' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <NotFoundProvider>
          <QueryProvider>
            <AuthProvider>
              <ConditionalNavbar />
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#fff',
                    color: '#1e293b',
                    borderRadius: '1rem',
                    padding: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </AuthProvider>
          </QueryProvider>
        </NotFoundProvider>
      </body>
    </html>
  );
}
