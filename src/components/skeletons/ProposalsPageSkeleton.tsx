'use client';

import PageHeader from '@/components/admin/PageHeader';
import ProposalsTableSkeleton from '@/components/skeletons/ProposalsTableSkeleton';
import DetailFilterSkeleton from '@/components/skeletons/DetailFilterSkeleton';
import SearchBar from '@/components/admin/SearchBar';
import { Zap } from 'lucide-react';

export default function ProposalsPageSkeleton() {
  return (
    <div className="-mx-8 flex items-start gap-8 md:-mx-12">
      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 space-y-8">
        <PageHeader
          badge={{
            icon: <Zap size={12} />,
            text: 'Proposal Management',
          }}
          title="제안서 관리"
          description="플랫폼에서 생성된 모든 비즈니스 제안서의 현황을 확인합니다."
        />

        {/* 검색 바 스켈레톤 */}
        <SearchBar
          value=""
          onChange={() => {}}
          placeholder="제안서 제목, 고객사 또는 담당자 검색..."
          showFilter={false}
        />

        {/* 테이블 스켈레톤 */}
        <ProposalsTableSkeleton rows={5} />
      </main>

      {/* 필터 사이드바 스켈레톤 */}
      <aside className="w-72 flex-shrink-0">
        <div className="sticky top-0">
          <DetailFilterSkeleton />
        </div>
      </aside>
    </div>
  );
}
