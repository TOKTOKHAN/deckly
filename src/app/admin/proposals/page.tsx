'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProposalStatus } from '@/types/proposal';
import { Search, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ProposalWithUser } from '@/lib/supabase/admin/proposals';

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
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all');
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

  const statusOptions: Array<{ value: ProposalStatus | 'all'; label: string }> = [
    { value: 'all', label: '전체' },
    { value: 'draft', label: '초안' },
    { value: 'generating', label: '생성 중' },
    { value: 'completed', label: '완료' },
    { value: 'error', label: '에러' },
  ];

  const getStatusBadgeColor = (status: ProposalStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'generating':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">제안서 관리</h1>
        <p className="mt-2 text-slate-600">전체 제안서 목록 및 관리</p>
      </div>

      {/* 필터 및 검색 */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="제안서명, 고객사명, 사용자 이메일로 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value as ProposalStatus | 'all');
                setPage(1);
              }}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-sm text-slate-600">총 {totalCount?.toLocaleString() || 0}개</div>
      </div>

      {/* 에러 처리 */}
      {(proposalsError || countError) && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="mt-0.5 text-red-600" size={24} />
            <div className="flex-1">
              <h3 className="mb-1 font-bold text-red-900">
                데이터를 불러오는 중 오류가 발생했습니다.
              </h3>
              <p className="mb-4 text-sm text-red-700">
                {proposalsError instanceof Error
                  ? proposalsError.message
                  : countError instanceof Error
                    ? countError.message
                    : '알 수 없는 오류가 발생했습니다.'}
              </p>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => {
                  refetchProposals();
                  refetchCount();
                }}
                icon={<RefreshCw size={16} />}
              >
                다시 시도
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 제안서 목록 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-2 text-lg font-medium text-slate-600">제안서를 불러오는 중...</div>
            <div className="text-sm text-slate-500">잠시만 기다려주세요.</div>
          </div>
        </div>
      ) : filteredProposals && filteredProposals.length > 0 ? (
        <>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                    제안서명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                    고객사
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                    사용자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                    생성일
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProposals.map((item: ProposalWithUser) => (
                  <tr key={item.proposal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{item.proposal.projectName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.proposal.clientCompanyName}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.userEmail || '-'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(item.proposal.status)}`}
                      >
                        {statusOptions.find(o => o.value === item.proposal.status)?.label ||
                          item.proposal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.proposal.createdAt
                        ? new Date(item.proposal.createdAt).toLocaleDateString('ko-KR')
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                이전
              </Button>
              <span className="px-4 text-sm text-slate-600">
                {page} / {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                다음
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-lg font-medium text-slate-600">제안서가 없습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}
