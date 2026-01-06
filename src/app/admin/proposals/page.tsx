'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProposalStatus } from '@/types/proposal';
import { Search, Filter, MoreVertical, Eye, Zap } from 'lucide-react';
import { ProposalWithUser } from '@/lib/supabase/admin/proposals';
import PageHeader from '@/components/admin/PageHeader';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';
import StatusBadge from '@/components/admin/StatusBadge';

const ITEMS_PER_PAGE = 20;

async function fetchProposals(page: number, statusFilter: ProposalStatus | 'all') {
  const params = new URLSearchParams();
  if (statusFilter !== 'all') {
    params.set('status', statusFilter);
  }
  params.set('limit', ITEMS_PER_PAGE.toString());
  params.set('offset', ((page - 1) * ITEMS_PER_PAGE).toString());

  const response = await fetch(`/api/admin/proposals?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '제안서를 불러오는 중 오류가 발생했습니다.');
  }
  return response.json();
}

async function fetchProposalsCount(statusFilter: ProposalStatus | 'all') {
  const params = new URLSearchParams();
  if (statusFilter !== 'all') {
    params.set('status', statusFilter);
  }

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
  const [statusFilter] = useState<ProposalStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: proposals,
    isLoading,
    error: proposalsError,
    refetch: refetchProposals,
  } = useQuery({
    queryKey: ['admin', 'proposals', page, statusFilter],
    queryFn: () => fetchProposals(page, statusFilter),
    retry: 2,
    retryDelay: 1000,
  });

  const {
    data: totalCount,
    error: countError,
    refetch: refetchCount,
  } = useQuery({
    queryKey: ['admin', 'proposals-count', statusFilter],
    queryFn: () => fetchProposalsCount(statusFilter),
    retry: 2,
    retryDelay: 1000,
  });

  const totalPages = totalCount ? Math.ceil(totalCount / ITEMS_PER_PAGE) : 0;

  const filteredProposals = proposals?.filter((p: ProposalWithUser) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.proposal.projectName.toLowerCase().includes(query) ||
      p.proposal.clientCompanyName.toLowerCase().includes(query) ||
      p.userEmail?.toLowerCase().includes(query) ||
      false
    );
  });

  // 검색어 변경 시 첫 페이지로 이동
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  if (isLoading) {
    return <LoadingState message="제안서를 불러오는 중..." />;
  }

  return (
    <div className="-m-8 min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900 md:p-12">
      <div className="animate-in fade-in mx-auto max-w-7xl space-y-8 duration-700">
        <PageHeader
          badge={{
            icon: <Zap size={12} />,
            text: 'Asset Management',
          }}
          title="제안서 관리"
          description="플랫폼에서 생성된 모든 비즈니스 제안서의 현황을 확인합니다."
        />

        <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/20 md:flex-row">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="text"
              placeholder="제안서 제목, 고객사 또는 담당자 검색..."
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full rounded-2xl border-none bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:ring-4 focus:ring-blue-50"
            />
          </div>
          <div className="flex w-full gap-3 md:w-auto">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-600 transition-all hover:bg-slate-50 md:flex-none">
              <Filter size={16} /> 필터
            </button>
          </div>
        </div>

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
        {filteredProposals && filteredProposals.length > 0 ? (
          <div className="overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <th className="px-10 py-6">Project Name</th>
                    <th className="px-6 py-6">Client</th>
                    <th className="px-6 py-6 text-center">Status</th>
                    <th className="px-6 py-6">Owner</th>
                    <th className="px-6 py-6">Created At</th>
                    <th className="px-10 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredProposals.map((item: ProposalWithUser) => (
                    <tr key={item.proposal.id} className="group transition-all hover:bg-blue-50/20">
                      <td className="px-10 py-6">
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
                      <td className="px-6 py-6 text-center">
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
                      <td className="px-6 py-6 text-xs font-bold text-slate-400">
                        {item.proposal.createdAt
                          ? new Date(item.proposal.createdAt).toLocaleDateString('ko-KR')
                          : '-'}
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
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
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div>
                  Showing {((page - 1) * ITEMS_PER_PAGE + 1).toLocaleString()} to{' '}
                  {Math.min(page * ITEMS_PER_PAGE, totalCount || 0).toLocaleString()} of{' '}
                  {(totalCount || 0).toLocaleString()} proposals
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-white shadow-lg shadow-blue-100 transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-lg font-medium text-slate-600">
                {searchQuery ? '검색 결과가 없습니다.' : '제안서가 없습니다.'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
