'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Calendar } from 'lucide-react';
import { ProposalStatsByDate } from '@/lib/supabase/admin/analytics';
import PageHeader from '@/components/admin/PageHeader';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';

async function fetchStats(start: string, end: string, interval: 'day' | 'week' | 'month') {
  const params = new URLSearchParams();
  params.set('startDate', start);
  params.set('endDate', end);
  params.set('interval', interval);

  const response = await fetch(`/api/admin/analytics/stats?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '통계를 불러오는 중 오류가 발생했습니다.');
  }
  return response.json();
}

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState<'week' | 'month' | '3months'>('month');
  const [interval, setInterval] = useState<'day' | 'week' | 'month'>('day');

  // dateRange와 interval이 변경될 때만 날짜 범위 재계산
  const { start, end } = useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();

    if (dateRange === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (dateRange === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      startDate.setMonth(startDate.getMonth() - 3);
    }

    return {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
  }, [dateRange]);

  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'analytics', start, end, interval],
    queryFn: () => fetchStats(start, end, interval),
    retry: 2,
    retryDelay: 1000,
  });

  return (
    <div>
      <PageHeader title="통계 및 분석" description="제안서 생성 추이 및 통계" className="mb-8" />

      {/* 필터 */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-slate-400" />
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value as 'week' | 'month' | '3months')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">최근 7일</option>
            <option value="month">최근 1개월</option>
            <option value="3months">최근 3개월</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-slate-400" />
          <select
            value={interval}
            onChange={e => setInterval(e.target.value as 'day' | 'week' | 'month')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="day">일별</option>
            <option value="week">주별</option>
            <option value="month">월별</option>
          </select>
        </div>
      </div>

      {/* 에러 처리 */}
      {error && (
        <div className="mb-6">
          <ErrorState
            error={error}
            onRetry={() => refetch()}
            title="통계를 불러오는 중 오류가 발생했습니다."
          />
        </div>
      )}

      {/* 통계 표시 */}
      {isLoading ? (
        <LoadingState message="통계를 불러오는 중..." />
      ) : stats && stats.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                  날짜
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                  총 생성
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                  완료
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
                  에러
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.map((stat: ProposalStatsByDate, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{stat.date}</td>
                  <td className="px-6 py-4 text-slate-600">{stat.count}</td>
                  <td className="px-6 py-4 text-green-600">{stat.completed}</td>
                  <td className="px-6 py-4 text-red-600">{stat.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-lg font-medium text-slate-600">통계 데이터가 없습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}
