'use client';

import { useQuery } from '@tanstack/react-query';
import { Users, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { UserWithStats } from '@/lib/supabase/admin/users';

async function fetchUsers(): Promise<UserWithStats[]> {
  const response = await fetch('/api/admin/users');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '사용자를 불러오는 중 오류가 발생했습니다.');
  }
  return response.json();
}

export default function AdminUsersPage() {
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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">사용자 관리</h1>
        <p className="mt-2 text-slate-600">전체 사용자 목록 및 통계</p>
      </div>

      {/* 통계 카드 */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">전체 사용자</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{users?.length || 0}</p>
            </div>
            <div className="rounded-lg bg-blue-500 p-3">
              <Users className="text-white" size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">활성 사용자</p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {users?.filter((u: UserWithStats) => u.lastSignInAt).length || 0}
              </p>
            </div>
            <div className="rounded-lg bg-green-500 p-3">
              <Users className="text-white" size={24} />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">총 제안서 수</p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {users?.reduce((sum: number, u: UserWithStats) => sum + u.proposalCount, 0) || 0}
              </p>
            </div>
            <div className="rounded-lg bg-indigo-500 p-3">
              <FileText className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* 사용자 목록 */}
      {users && users.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                  이메일
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                  이메일 인증
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                  가입일
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                  최근 로그인
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                  제안서 수
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user: UserWithStats) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{user.email || '-'}</div>
                    {user.phone && <div className="mt-1 text-xs text-slate-500">{user.phone}</div>}
                  </td>
                  <td className="px-6 py-4">
                    {user.emailConfirmed ? (
                      <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                        인증됨
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                        미인증
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.lastSignInAt
                      ? new Date(user.lastSignInAt).toLocaleDateString('ko-KR')
                      : '로그인 없음'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800">
                      <FileText size={14} />
                      {user.proposalCount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-lg font-medium text-slate-600">사용자가 없습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}
