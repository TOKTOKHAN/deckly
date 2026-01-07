'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MoreVertical, Eye, Zap } from 'lucide-react';
import { ProposalWithUser } from '@/lib/supabase/admin/proposals';
import PageHeader from '@/components/admin/PageHeader';
import ErrorState from '@/components/admin/ErrorState';
import StatusBadge from '@/components/admin/StatusBadge';
import SearchBar from '@/components/admin/SearchBar';
import Pagination from '@/components/admin/Pagination';
import EmptyState from '@/components/admin/EmptyState';
import ProposalsPageSkeleton from '@/components/skeletons/ProposalsPageSkeleton';
import ProposalsTableSkeleton from '@/components/skeletons/ProposalsTableSkeleton';
import DetailFilter from '@/components/admin/DetailFilter';

const ITEMS_PER_PAGE = 20;

// 클라이언트 이름 정규화 함수 (공백 제거, 소문자 변환)
const normalizeClientName = (name: string) => {
  return name.replace(/\s+/g, '').toLowerCase();
};

async function fetchProposals(
  page: number,
  statusFilter: 'all' | 'completed' | 'error',
  ownerFilter: string,
  clientFilter: string,
) {
  const params = new URLSearchParams();
  if (statusFilter !== 'all') {
    params.set('status', statusFilter);
  }
  if (ownerFilter !== 'all') {
    params.set('userId', ownerFilter);
  }
  // clientFilter는 정규화된 값이므로 서버에서 처리하지 않고 클라이언트 사이드에서 필터링
  // 클라이언트 필터가 적용된 경우 전체 데이터를 가져온 후 클라이언트에서 필터링
  if (clientFilter === 'all') {
    params.set('limit', ITEMS_PER_PAGE.toString());
    params.set('offset', ((page - 1) * ITEMS_PER_PAGE).toString());
  }
  // clientFilter가 적용된 경우 limit/offset 없이 전체 데이터 가져오기

  const response = await fetch(`/api/admin/proposals?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '제안서를 불러오는 중 오류가 발생했습니다.');
  }
  return response.json();
}

async function fetchProposalsCount(
  statusFilter: 'all' | 'completed' | 'error',
  ownerFilter: string,
  _clientFilter: string, // 클라이언트 필터는 클라이언트 사이드에서 처리
) {
  const params = new URLSearchParams();
  if (statusFilter !== 'all') {
    params.set('status', statusFilter);
  }
  if (ownerFilter !== 'all') {
    params.set('userId', ownerFilter);
  }
  // clientFilter는 정규화된 값이므로 서버에서 처리하지 않고 클라이언트 사이드에서 필터링
  // (서버 사이드 필터링을 사용하려면 서버에서도 정규화 로직 필요)

  const response = await fetch(`/api/admin/proposals/count?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '제안서 개수를 불러오는 중 오류가 발생했습니다.');
  }
  const data = await response.json();
  return data.count;
}

export default function AdminProposalsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'error'>('all');
  const [ownerFilter, setOwnerFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: proposals,
    isLoading,
    isFetching,
    error: proposalsError,
    refetch: refetchProposals,
  } = useQuery({
    queryKey: ['admin', 'proposals', page, statusFilter, ownerFilter, clientFilter],
    queryFn: () => fetchProposals(page, statusFilter, ownerFilter, clientFilter),
    retry: 2,
    retryDelay: 1000,
    placeholderData: previousData => previousData,
  });

  const {
    data: totalCount,
    error: countError,
    refetch: refetchCount,
  } = useQuery({
    queryKey: ['admin', 'proposals-count', statusFilter, ownerFilter, clientFilter],
    queryFn: () => fetchProposalsCount(statusFilter, ownerFilter, clientFilter),
    retry: 2,
    retryDelay: 1000,
    placeholderData: previousData => previousData,
  });

  // 필터 옵션 추출 (전체 데이터에서 고유한 값 추출)
  const { ownerOptions, clientOptions } = useMemo(() => {
    if (!proposals) {
      return { ownerOptions: [], clientOptions: [] };
    }

    // Owner 옵션 (userId 기준, 이메일로 표시)
    const ownerMap = new Map<string, string>();
    proposals.forEach((p: ProposalWithUser) => {
      if (p.userEmail && !ownerMap.has(p.userId)) {
        ownerMap.set(p.userId, p.userEmail);
      }
    });
    const ownerOptions = Array.from(ownerMap.entries()).map(([userId, email]) => ({
      value: userId,
      label: email,
    }));

    // Client 옵션 (고객사 이름 기준) - 정규화하여 그룹화
    // 클라이언트 이름 정규화 함수 (공백 제거, 소문자 변환)
    const normalizeClientName = (name: string) => {
      return name.replace(/\s+/g, '').toLowerCase();
    };

    // 정규화된 값으로 그룹화 (원본 값 중 첫 번째를 대표값으로 사용)
    const clientMap = new Map<string, string>();
    proposals.forEach((p: ProposalWithUser) => {
      const normalized = normalizeClientName(p.proposal.clientCompanyName);
      if (!clientMap.has(normalized)) {
        clientMap.set(normalized, p.proposal.clientCompanyName);
      }
    });

    const clientOptions = Array.from(clientMap.entries()).map(([normalized, original]) => ({
      value: normalized,
      label: original,
    }));

    return { ownerOptions, clientOptions };
  }, [proposals]);

  // 클라이언트 필터링 적용 (정규화된 값으로 비교)
  let filteredProposals = proposals;

  // 클라이언트 필터 적용
  if (clientFilter !== 'all' && proposals) {
    filteredProposals = proposals.filter((p: ProposalWithUser) => {
      const normalizedClient = normalizeClientName(p.proposal.clientCompanyName);
      return normalizedClient === clientFilter;
    });
  }

  // 검색어 필터 적용
  if (searchQuery && filteredProposals) {
    const query = searchQuery.toLowerCase();
    filteredProposals = filteredProposals.filter((p: ProposalWithUser) => {
      return (
        p.proposal.projectName.toLowerCase().includes(query) ||
        p.proposal.clientCompanyName.toLowerCase().includes(query) ||
        p.userEmail?.toLowerCase().includes(query) ||
        false
      );
    });
  }

  // 클라이언트 필터가 적용된 경우 페이지네이션을 클라이언트 사이드에서 처리
  const paginatedProposals =
    clientFilter !== 'all' && filteredProposals
      ? filteredProposals.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
      : filteredProposals;

  // 클라이언트 필터가 적용된 경우 totalCount를 클라이언트 사이드에서 계산
  const effectiveTotalCount =
    clientFilter !== 'all' ? filteredProposals?.length || 0 : totalCount || 0;

  const totalPages = effectiveTotalCount ? Math.ceil(effectiveTotalCount / ITEMS_PER_PAGE) : 0;

  // 검색어 변경 시 첫 페이지로 이동
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  // 필터 적용 핸들러
  const handleFilterApply = (
    owner: string,
    client: string,
    status: 'all' | 'completed' | 'error',
  ) => {
    setOwnerFilter(owner);
    setClientFilter(client);
    setStatusFilter(status);
    setPage(1);
  };

  // 초기 로딩 시에만 전체 스켈레톤 표시
  if (isLoading && !proposals) {
    return <ProposalsPageSkeleton />;
  }

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

        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onSearchClick={() => {
            // 검색 실행 (현재는 실시간 검색이므로 필터링만 확인)
          }}
          placeholder="제안서 제목, 고객사 또는 담당자 검색..."
          showFilter={false}
        />

        {(proposalsError || countError) && (
          <ErrorState
            error={proposalsError || countError}
            onRetry={() => {
              refetchProposals();
              refetchCount();
            }}
            title="데이터를 불러오는 중 오류가 발생했습니다."
          />
        )}

        {/* 제안서 테이블 카드 */}
        {isFetching && proposals ? (
          // 필터 변경 시 테이블만 스켈레톤으로 표시
          <ProposalsTableSkeleton rows={5} />
        ) : paginatedProposals && paginatedProposals.length > 0 ? (
          <div className="overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/40">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-left">
                <colgroup>
                  <col className="w-[30%]" />
                  <col className="w-[15%]" />
                  <col className="w-[10%]" />
                  <col className="w-[20%]" />
                  <col className="w-[15%]" />
                  <col className="w-[10%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <th className="py-6 pl-10">Project Name</th>
                    <th className="px-6 py-6">Client</th>
                    <th className="px-6 py-6 text-center">Status</th>
                    <th className="px-6 py-6 text-center">Owner</th>
                    <th className="px-3 py-6">Created At</th>
                    <th className="px-3 py-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paginatedProposals.map((item: ProposalWithUser) => (
                    <tr key={item.proposal.id} className="group transition-all hover:bg-blue-50/20">
                      <td className="py-6 pl-6">
                        <div>
                          <div className="mb-1 text-sm font-black text-slate-900 transition-colors group-hover:text-blue-600">
                            {item.proposal.projectName}
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                            {item.proposal.id}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-sm font-bold text-slate-600">
                        {item.proposal.clientCompanyName}
                      </td>
                      <td className="px-3 py-6 text-center">
                        <StatusBadge status={item.proposal.status} />
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-[10px] font-black text-indigo-400">
                            {item.userEmail?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <span className="text-xs font-bold text-slate-500">
                            {item.userEmail || '-'}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 pl-2 text-xs font-bold text-slate-400">
                        {item.proposal.createdAt
                          ? new Date(item.proposal.createdAt).toLocaleDateString('ko-KR')
                          : '-'}
                      </td>
                      <td className="px-2 py-6 text-right">
                        <div className="flex items-center justify-center gap-2">
                          <button className="rounded-xl p-2 text-slate-300 transition-all hover:bg-blue-50 hover:text-blue-600">
                            <Eye size={18} />
                          </button>
                          <button className="rounded-xl p-2 text-slate-300 transition-all hover:bg-slate-100 hover:text-slate-600">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalCount || 0}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setPage}
                itemLabel="proposals"
              />
            )}
          </div>
        ) : (
          <EmptyState searchQuery={searchQuery} defaultMessage="제안서가 없습니다." />
        )}
      </main>

      {/* 필터 사이드바 */}
      <aside className="w-72 flex-shrink-0">
        <div className="sticky top-10">
          <DetailFilter
            ownerOptions={ownerOptions}
            clientOptions={clientOptions}
            selectedOwner={ownerFilter}
            selectedClient={clientFilter}
            selectedStatus={statusFilter}
            onApply={handleFilterApply}
          />
        </div>
      </aside>
    </div>
  );
}
