'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  FileText,
  Search,
  Calendar,
  ShieldCheck,
  Activity,
  CheckCircle2,
  UserPlus,
  AlertTriangle,
} from 'lucide-react';
import type { UserWithStats } from '@/lib/supabase/admin/users';
import { useAuthStore } from '@/stores/authStore';
import PageHeader from '@/components/admin/PageHeader';
import ErrorState from '@/components/admin/ErrorState';
import StatCard from '@/components/admin/StatCard';
import Pagination from '@/components/admin/Pagination';
import EmptyState from '@/components/admin/EmptyState';
import UsersPageSkeleton from '@/components/skeletons/UsersPageSkeleton';
import CreateUserModal from '@/components/admin/CreateUserModal';
import EditUserModal from '@/components/admin/EditUserModal';
import DeleteUserConfirmModal from '@/components/admin/DeleteUserConfirmModal';
import UserActionsDropdown from '@/components/admin/UserActionsDropdown';
import Button from '@/components/ui/Button';

const ITEMS_PER_PAGE = 10;

interface UserLimitInfo {
  userId: string;
  limit: number | null;
  currentCount: number;
  remaining: number | null;
  effectiveLimit: number | null;
}

interface UserWithLimits extends UserWithStats {
  remainingCount: number | null;
  effectiveLimit: number | null;
}

async function fetchUsers(): Promise<UserWithStats[]> {
  const response = await fetch('/api/admin/users');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '사용자를 불러오는 중 오류가 발생했습니다.');
  }
  return response.json();
}

async function fetchUserLimits(sessionToken: string | null): Promise<UserLimitInfo[]> {
  if (!sessionToken) {
    throw new Error('인증이 필요합니다.');
  }

  const response = await fetch('/api/admin/users/limits', {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '사용자 제한 정보를 불러오는 중 오류가 발생했습니다.');
  }

  return response.json();
}

export default function AdminUsersPage() {
  const { session } = useAuthStore();
  const sessionToken = session?.access_token || null;

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithLimits | null>(null);

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
    refetch: refetchUsers,
    isError: isUsersError,
  } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: fetchUsers,
    retry: 2,
    retryDelay: 1000,
  });

  const {
    data: limits,
    isLoading: isLoadingLimits,
    error: limitsError,
    refetch: refetchLimits,
  } = useQuery({
    queryKey: ['admin', 'users', 'limits'],
    queryFn: () => fetchUserLimits(sessionToken),
    enabled: !!sessionToken,
    retry: 2,
    retryDelay: 1000,
    // 제한 정보 조회 실패해도 사용자 목록은 계속 표시
    refetchOnWindowFocus: false,
  });

  // 사용자 데이터와 제한 정보 병합
  // limits가 없어도 users만으로 표시 가능하도록 처리
  const usersWithLimits: UserWithLimits[] = useMemo(() => {
    if (!users) return [];

    // limits가 없거나 에러가 있어도 users는 표시
    if (!limits) {
      return users.map(user => ({
        ...user,
        remainingCount: null,
        effectiveLimit: null,
      }));
    }

    return users.map(user => {
      const limitInfo = limits.find(l => l.userId === user.id);
      return {
        ...user,
        remainingCount: limitInfo?.remaining ?? null,
        effectiveLimit: limitInfo?.effectiveLimit ?? null,
      };
    });
  }, [users, limits]);

  const isLoading = isLoadingUsers;
  const refetch = () => {
    refetchUsers();
    if (sessionToken) {
      refetchLimits();
    }
  };

  // 검색 필터링
  const filteredUsers = usersWithLimits?.filter((user: UserWithLimits) => {
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
  const totalUsers = usersWithLimits?.length || 0;
  const activeUsers =
    usersWithLimits?.filter((u: UserWithLimits) => {
      if (!u.lastSignInAt) return false;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(u.lastSignInAt) >= thirtyDaysAgo;
    }).length || 0;
  const totalProposals =
    usersWithLimits?.reduce((sum: number, u: UserWithLimits) => sum + u.proposalCount, 0) || 0;

  // 검색어 변경 시 첫 페이지로 이동
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <UsersPageSkeleton />;
  }

  // 사용자 조회 실패 시에만 전체 에러 표시
  if (isUsersError) {
    return (
      <ErrorState error={usersError} onRetry={() => refetch()} showServiceRoleKeyHelp={true} />
    );
  }

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

      {/* 제한 정보 조회 실패 시 경고 메시지 (사용자 목록은 계속 표시) */}
      {limitsError && (
        <div className="flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3">
          <AlertTriangle className="shrink-0 text-orange-600" size={18} />
          <div className="flex-1">
            <p className="text-sm font-black text-orange-900">제한 정보를 불러올 수 없습니다</p>
            <p className="mt-0.5 text-xs font-medium text-orange-700">
              {limitsError instanceof Error
                ? limitsError.message
                : '제한 정보 조회 중 오류가 발생했습니다.'}{' '}
              <button
                onClick={() => refetchLimits()}
                className="font-black underline hover:no-underline"
              >
                다시 시도
              </button>
            </p>
          </div>
        </div>
      )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <StatCard
            title="Total Users"
            value={totalUsers.toLocaleString()}
            icon={<Users size={26} />}
            colorClass="bg-blue-600"
            subText="전체 등록된 사용자 수"
          />
          <StatCard
            title="Active Accounts"
            value={activeUsers.toLocaleString()}
            icon={<Activity size={26} />}
            colorClass="bg-indigo-600"
            subText="최근 30일 내 활동 사용자"
          />
          <StatCard
            title="Total Decks"
            value={totalProposals.toLocaleString()}
            icon={<FileText size={26} />}
            colorClass="bg-slate-900"
            subText="AI 제안서 생성 가속화"
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            variant="primary"
            size="lg"
            icon={<UserPlus size={18} />}
            className="rounded-2xl border border-blue-200 bg-blue-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-blue-100 hover:bg-blue-700"
          >
            <span className="hidden sm:inline">사용자 추가</span>
          </Button>
        </div>

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
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <div className="relative flex-1 sm:w-72">
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
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[30%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[10%]" />
                <col className="w-[15%]" />
              </colgroup>
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
                paginatedUsers.map((user: UserWithLimits) => (
                    <tr key={user.id} className="group h-[96px] transition-all hover:bg-blue-50/20">
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
                        {limitsError ? (
                          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-black text-slate-400">
                            <FileText size={12} />
                            {user.proposalCount} / 정보 없음
                          </span>
                        ) : isLoadingLimits ? (
                          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-black text-slate-400">
                            <FileText size={12} />
                            {user.proposalCount} / 로딩 중...
                          </span>
                        ) : user.effectiveLimit !== null ? (
                          <span
                            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-2xl border px-5 py-2.5 text-xs font-black transition-all group-hover:scale-105 ${
                              user.remainingCount !== null && user.remainingCount <= 10
                                ? 'border-orange-200 bg-orange-50 text-orange-600'
                                : 'border-blue-100 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                            }`}
                          >
                            <FileText size={12} />
                            {user.proposalCount} / {user.effectiveLimit}
                            {user.remainingCount !== null && user.remainingCount <= 10 && (
                              <AlertTriangle size={12} className="ml-1" />
                            )}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl border border-green-200 bg-green-50 px-5 py-2.5 text-xs font-black text-green-600 transition-all group-hover:bg-green-600 group-hover:text-white">
                            <FileText size={12} />
                            {user.proposalCount} / 무제한
                          </span>
                        )}
                        </div>
                      </td>
                      <td className="px-12 py-6 text-right">
                        <UserActionsDropdown
                          user={user}
                        onEdit={(user: UserWithStats) => {
                          // usersWithLimits에서 해당 사용자 찾기
                          const userWithLimits = usersWithLimits.find(u => u.id === user.id);
                          setSelectedUser(userWithLimits || null);
                            setIsEditModalOpen(true);
                          }}
                        onDelete={(user: UserWithStats) => {
                          // usersWithLimits에서 해당 사용자 찾기
                          const userWithLimits = usersWithLimits.find(u => u.id === user.id);
                          setSelectedUser(userWithLimits || null);
                            setIsDeleteModalOpen(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-12 py-12 text-center">
                      <EmptyState searchQuery={searchQuery} defaultMessage="사용자가 없습니다." />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredUsers && filteredUsers.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredUsers.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
              itemLabel="entries"
              showPageNumbers={true}
              prevLabel="이전"
              nextLabel="다음"
            />
          )}
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          refetch();
        }}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        user={selectedUser}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSuccess={() => {
          refetch();
        }}
      />

      <DeleteUserConfirmModal
        isOpen={isDeleteModalOpen}
        user={selectedUser}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onSuccess={() => {
          refetch();
        }}
      />
    </div>
  );
}
