'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllUsersWithProposalCount } from '@/lib/supabase/admin/users';
import { Users, FileText } from 'lucide-react';

export default function AdminUsersPage() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: getAllUsersWithProposalCount,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium text-slate-600">사용자를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium text-red-600">사용자를 불러오는 중 오류가 발생했습니다.</div>
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
                {users?.filter(u => u.lastSignInAt).length || 0}
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
                {users?.reduce((sum, u) => sum + u.proposalCount, 0) || 0}
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
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{user.email || '-'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString('ko-KR') : '로그인 없음'}
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

