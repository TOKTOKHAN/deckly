'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProposalStatsByDate } from '@/lib/supabase/admin/analytics';
import { BarChart3, Calendar } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState<'week' | 'month' | '3months'>('month');
  const [interval, setInterval] = useState<'day' | 'week' | 'month'>('day');

  const getDateRange = () => {
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
  };

  const { start, end } = getDateRange();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'analytics', start, end, interval],
    queryFn: () => getProposalStatsByDate(start, end, interval),
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">통계 및 분석</h1>
        <p className="mt-2 text-slate-600">제안서 생성 추이 및 통계</p>
      </div>

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

      {/* 통계 표시 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-lg font-medium text-slate-600">통계를 불러오는 중...</div>
        </div>
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
              {stats.map((stat, index) => (
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

