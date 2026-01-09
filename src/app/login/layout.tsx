import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'DECKLY 계정에 로그인하세요.',
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
