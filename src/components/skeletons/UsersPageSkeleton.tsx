'use client';

import PageHeader from '@/components/admin/PageHeader';
import StatCardSkeleton from '@/components/skeletons/StatCardSkeleton';
import UserTableSkeleton from '@/components/skeletons/UserTableSkeleton';
import { ShieldCheck } from 'lucide-react';

export default function UsersPageSkeleton() {
  return (
    <>
      <PageHeader
        badge={{
          icon: <ShieldCheck size={12} />,
          text: 'Deckly Admin System',
        }}
        title="사용자 관리"
        description="플랫폼 내 모든 사용자의 활동과 지표를 실시간으로 모니터링합니다."
        className="border-b border-slate-200 pb-2"
      />

      {/* 통계 그리드 스켈레톤 */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* 테이블 스켈레톤 */}
      <UserTableSkeleton rows={5} />
    </>
  );
}
