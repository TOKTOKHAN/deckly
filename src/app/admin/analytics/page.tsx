'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, CheckCircle2, AlertCircle, MousePointer2 } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import PageHeader from '@/components/admin/PageHeader';
import StatCard from '@/components/admin/StatCard';
import ErrorState from '@/components/admin/ErrorState';
import EmptyState from '@/components/admin/EmptyState';
import AnalyticsPageSkeleton from '@/components/skeletons/AnalyticsPageSkeleton';
import AnalyticsChart from '@/components/admin/AnalyticsChart';
export default function AdminAnalyticsPage() {
  const [interval, setInterval] = useState<'week' | 'month' | 'year'>('week');

  // 커스텀 훅으로 데이터 fetching 및 처리
  const { stats, statistics, visitorAxisRange, isLoading, error, refetch } = useAnalytics(interval);
  const { totalVisitors, totalCreated, successRate, errorRate } = statistics;

  return (
    <div className="animate-in fade-in space-y-10 pb-20 duration-700">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <PageHeader
          badge={{
            icon: <BarChart3 size={12} />,
            text: 'System Intelligence',
            className: 'border-indigo-100 bg-indigo-50 text-indigo-600',
          }}
          title="통계 및 분석"
          description="데이터 기반의 서비스 성장 지표를 분석합니다."
          showDate={false}
          showUserAvatar={false}
        />

        <div
          className="flex rounded-[1.5rem] border border-slate-100 bg-white p-1.5 shadow-sm"
          role="group"
          aria-label="통계 기간 선택"
        >
          {(['week', 'month', 'year'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => setInterval(opt)}
              aria-label={`${opt === 'week' ? '주간' : opt === 'month' ? '월간' : '연간'} 통계 보기`}
              aria-pressed={interval === opt}
              className={`rounded-2xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                interval === opt
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-700'
              }`}
            >
              {opt === 'week' ? 'Weekly' : opt === 'month' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div role="alert" aria-live="assertive" className="mb-6">
          <ErrorState
            error={error}
            onRetry={() => refetch()}
            title="통계를 불러오는 중 오류가 발생했습니다."
          />
        </div>
      )}

      {isLoading ? (
        <div role="status" aria-live="polite" aria-label="통계 데이터를 불러오는 중">
          <AnalyticsPageSkeleton />
        </div>
      ) : stats && stats.length > 0 ? (
        <>
          {/* 통계 카드 그리드 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="총 방문자 수"
              value={totalVisitors}
              icon={<MousePointer2 size={18} />}
              colorClass="bg-indigo-600"
              subText="계정 당 1회로 카운트"
            />
            <StatCard
              title="제안서 생성 총계"
              value={totalCreated}
              icon={<BarChart3 size={18} />}
              colorClass="bg-blue-600"
              subText="모든 계정의 제안서 생성 횟수"
            />
            <StatCard
              title="최종 완료율"
              value={`${successRate}%`}
              icon={<CheckCircle2 size={18} />}
              colorClass="bg-emerald-600"
              subText="제안서 생성 성공률 분석"
            />
            <StatCard
              title="평균 오류 발생"
              value={`${errorRate}%`}
              icon={<AlertCircle size={18} />}
              colorClass="bg-red-600"
              subText="제안서 생성 실패율 분석"
            />
          </div>

          <div className="rounded-[3rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/40">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-slate-800">통합 분석 차트</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-black uppercase text-slate-600">
                    제안서 완료
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                  <span className="text-[10px] font-black uppercase text-slate-600">방문자 수</span>
                </div>
              </div>
            </div>

            <AnalyticsChart stats={stats} interval={interval} visitorAxisRange={visitorAxisRange} />

            <div className="mt-10 flex items-center justify-between border-t border-slate-50 pt-8">
              <div className="flex items-center gap-6">
                <p className="text-[10px] font-bold italic text-slate-600">
                  최근 업데이트 : {new Date().toLocaleString('ko-KR')}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div role="status" aria-live="polite" aria-label="통계 데이터가 없습니다">
          <EmptyState defaultMessage="통계 데이터가 없습니다." />
        </div>
      )}
    </div>
  );
}
