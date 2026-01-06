'use client';

import PageHeader from '@/components/admin/PageHeader';
import ProposalsTableSkeleton from '@/components/skeletons/ProposalsTableSkeleton';
import { Zap } from 'lucide-react';

export default function ProposalsPageSkeleton() {
  return (
    <>
      <PageHeader
        badge={{
          icon: <Zap size={12} />,
          text: 'Asset Management',
        }}
        title="제안서 관리"
        description="플랫폼에서 생성된 모든 비즈니스 제안서의 현황을 확인합니다."
      />

      {/* 검색 바 스켈레톤 */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/20 md:flex-row md:items-center">
        <div className="relative w-full flex-1">
          <div className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 animate-pulse rounded bg-slate-200"></div>
          <div className="h-11 w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-50 pl-12"></div>
        </div>
        <div className="flex w-full gap-3 md:w-auto">
          <div className="h-10 flex-1 animate-pulse rounded-2xl bg-slate-200 md:w-24"></div>
          <div className="h-10 flex-1 animate-pulse rounded-2xl bg-slate-200 md:w-32"></div>
        </div>
      </div>

      {/* 테이블 스켈레톤 */}
      <ProposalsTableSkeleton rows={5} />
    </>
  );
}
