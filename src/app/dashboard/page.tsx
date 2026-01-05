import type { Metadata } from 'next';
import ProposalForm from '@/components/proposal/ProposalForm';

export const metadata: Metadata = {
  title: '대시보드',
  description: '제안서를 생성하고 관리하세요.',
};

export default function DashboardPage() {
  return <ProposalForm />;
}
