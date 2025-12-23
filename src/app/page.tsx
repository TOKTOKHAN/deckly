import type { Metadata } from 'next';
import ProposalForm from '@/components/proposal/ProposalForm';

export const metadata: Metadata = {
  title: '홈',
  description:
    'AI로 자동 생성하는 전문적인 사업 제안서. 미팅 전사록만 입력하면 완성도 높은 제안서를 PDF로 다운로드하세요.',
  openGraph: {
    title: 'DECKLY - AI 기반 사업 제안서 생성 플랫폼',
    description:
      'AI로 자동 생성하는 전문적인 사업 제안서. 미팅 전사록만 입력하면 완성도 높은 제안서를 PDF로 다운로드하세요.',
  },
};

export default function Home() {
  return <ProposalForm />;
}
