'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  FileText,
  Search,
  Calendar,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  MoreVertical,
  RefreshCw,
  AlertCircle,
  CalendarDays,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import type { UserWithStats } from '@/lib/supabase/admin/users';
import { useAuthStore } from '@/stores/authStore';

const ITEMS_PER_PAGE = 10;

async function fetchUsers(): Promise<UserWithStats[]> {
  const response = await fetch('/api/admin/users');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '사용자를 불러오는 중 오류가 발생했습니다.');
  }
  return response.json();
}

/**
 * 통계 카드 컴포넌트
 */
const StatCard = ({
  label,
  value,
  icon,
  color,
  trend,
  subText,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
  subText?: string;
}) => (
  <div className="group rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:border-blue-200">
    <div className="mb-6 flex items-start justify-between">
      <div
        className={`${color} rounded-2xl p-4 text-white shadow-lg shadow-indigo-100 transition-transform group-hover:scale-110`}
      >
        {icon}
      </div>
      {trend && (
        <div className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-xs font-black text-green-500">
          <ArrowUpRight size={12} /> {trend}
        </div>
      )}
    </div>
    <div>
      <p className="mb-1 text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
      <h4 className="mb-2 text-4xl font-black tracking-tighter text-slate-900">{value}</h4>
      {subText && <p className="text-xs font-medium italic text-slate-400">{subText}</p>}
    </div>
  </div>
);

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthStore();

  // 오늘 날짜 포맷팅
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const {
    data: users,
    isLoading,
    error,
    refetch,
    isError,
  } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: fetchUsers,
    retry: 2,
    retryDelay: 1000,
  });

  // 검색 필터링
  const filteredUsers = users?.filter((user: UserWithStats) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query) ||
      false
    );
  });

  // 페이지네이션 계산
  const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers?.slice(startIndex, endIndex);

  // 통계 계산
  const totalUsers = users?.length || 0;
  const activeUsers =
    users?.filter((u: UserWithStats) => {
      if (!u.lastSignInAt) return false;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(u.lastSignInAt) >= thirtyDaysAgo;
    }).length || 0;
  const totalProposals =
    users?.reduce((sum: number, u: UserWithStats) => sum + u.proposalCount, 0) || 0;

  // 검색어 변경 시 첫 페이지로 이동
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 text-lg font-medium text-slate-600">사용자를 불러오는 중...</div>
          <div className="text-sm text-slate-500">잠시만 기다려주세요.</div>
        </div>
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : '사용자를 불러오는 중 오류가 발생했습니다.';

    // Service Role Key 관련 에러인지 확인
    const isServiceRoleError =
      errorMessage.includes('Service Role Key') || errorMessage.includes('어드민 클라이언트');

    return (
      <div className="flex items-center justify-center py-12">
        <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <AlertCircle className="text-red-600" size={48} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-red-900">오류 발생</h3>
          <p className="mb-4 text-sm text-red-700">{errorMessage}</p>
          {isServiceRoleError && (
            <div className="mb-4 rounded-lg bg-red-100 p-3 text-left text-xs text-red-800">
              <p className="font-semibold">해결 방법:</p>
              <p className="mt-1">
                .env.local 파일에{' '}
                <code className="rounded bg-red-200 px-1">SUPABASE_SERVICE_ROLE_KEY</code>를
                추가해주세요.
              </p>
            </div>
          )}
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => refetch()}
            icon={<RefreshCw size={16} />}
          >
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="-m-8 min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900 md:p-12">
      <div className="animate-in fade-in mx-auto max-w-7xl space-y-12 duration-700">
        {/* 상단 헤더 섹션 */}
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-2 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
              <ShieldCheck size={12} /> Deckly Admin System
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900">사용자 관리</h1>
            <p className="mt-3 text-balance text-lg font-medium italic text-slate-500 opacity-80">
              플랫폼 내 모든 사용자의 활동과 지표를 실시간으로 모니터링합니다.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 sm:flex">
              <CalendarDays size={14} className="text-slate-400" />
              <span className="text-[11px] font-bold uppercase tracking-tighter text-slate-600">
                {formattedDate}
              </span>
            </div>
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-blue-600 text-xs font-black text-white shadow-lg shadow-blue-100 transition-transform hover:scale-105">
              {user?.email?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
          </div>
        </div>

        {/* 통계 그리드 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <StatCard
            label="Total Users"
            value={totalUsers.toLocaleString()}
            icon={<Users size={26} />}
            color="bg-blue-600"
            subText="전체 등록된 사용자 수"
          />
          <StatCard
            label="Active Accounts"
            value={activeUsers.toLocaleString()}
            icon={<Activity size={26} />}
            color="bg-indigo-600"
            subText="최근 30일 내 활동 사용자"
          />
          <StatCard
            label="Total Decks"
            value={totalProposals.toLocaleString()}
            icon={<FileText size={26} />}
            color="bg-slate-900"
            subText="AI 제안서 생성 가속화"
          />
        </div>

        {/* 사용자 목록 테이블 카드 */}
        <div className="shadow-3xl overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-slate-200/50">
          <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-50 bg-slate-50/40 px-10 pt-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm">
                <Users size={22} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-slate-800">유저 정보</h3>
              </div>
            </div>
            <div className="relative w-full sm:w-72">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                size={16}
              />
              <input
                type="text"
                placeholder="사용자 검색..."
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm transition-all placeholder:text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-12 py-3">User Account</th>
                  <th className="px-6 py-3 text-center">Verification</th>
                  <th className="px-6 py-3">Member Since</th>
                  <th className="px-6 py-3">Last Activity</th>
                  <th className="px-6 py-3 text-center">Proposals</th>
                  <th className="px-12 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedUsers && paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user: UserWithStats) => (
                    <tr key={user.id} className="group transition-all hover:bg-blue-50/20">
                      <td className="px-12 py-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-sm font-black text-slate-400 shadow-sm transition-transform group-hover:scale-110">
                            {user.email?.substring(0, 2).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-900 transition-colors group-hover:text-blue-600">
                              {user.email || '-'}
                            </div>
                            <div className="mt-1 text-[10px] font-bold tracking-wider text-slate-400">
                              {user.phone || 'PHONE NOT REGISTERED'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        {user.emailConfirmed ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-green-600">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <Calendar size={14} className="text-slate-300" />
                          {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-xs font-bold text-slate-500">
                          {user.lastSignInAt ? (
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"></div>
                              {new Date(user.lastSignInAt).toLocaleDateString('ko-KR')}
                            </div>
                          ) : (
                            <span className="font-medium italic text-slate-300">Never</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center">
                          <span className="inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                            <FileText size={12} />
                            {user.proposalCount}
                          </span>
                        </div>
                      </td>
                      <td className="px-12 py-6 text-right">
                        <button className="rounded-xl p-2.5 text-slate-300 transition-all hover:bg-blue-50 hover:text-blue-600">
                          <MoreVertical size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-12 py-12 text-center">
                      <div className="text-lg font-medium text-slate-600">
                        {searchQuery ? '검색 결과가 없습니다.' : '사용자가 없습니다.'}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 하단 페이지네이션 섹션 */}
          {filteredUsers && filteredUsers.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/30 px-10 py-8 sm:flex-row">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of{' '}
                {filteredUsers.length} entries
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-400 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  이전
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'cursor-pointer text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  다음
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
