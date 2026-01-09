'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import ProposalForm from '@/components/proposal/ProposalForm';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    // 로딩 중이면 대기
    if (isLoading) return;

    if (!user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return null;
  }

  return <ProposalForm />;
}
