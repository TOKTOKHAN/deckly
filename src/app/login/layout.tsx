import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'DECKLY 계정에 로그인하여 AI 기반 사업 제안서를 생성하세요.',
  alternates: {
    canonical: '/login',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
