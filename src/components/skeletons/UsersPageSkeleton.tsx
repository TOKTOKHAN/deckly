'use client';

import PageHeader from '@/components/admin/PageHeader';
import StatCardSkeleton from '@/components/skeletons/StatCardSkeleton';
import UserTableSkeleton from '@/components/skeletons/UserTableSkeleton';
import { ShieldCheck } from 'lucide-react';

export default function UsersPageSkeleton() {
  return (
    <div className="animate-in fade-in space-y-8 duration-700">
      <PageHeader
        badge={{
          icon: <ShieldCheck size={12} />,
          text: 'Deckly Admin System',
        }}
        title="사용자 관리"
        description="플랫폼 내 모든 사용자의 활동과 지표를 실시간으로 모니터링합니다."
        className="border-b border-slate-200 pb-2"
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <div className="flex justify-end">
        <div className="h-[58px] w-[149.02px] animate-pulse rounded-2xl bg-slate-200"></div>
      </div>
      <UserTableSkeleton rows={5} />
    </div>
  );
}
