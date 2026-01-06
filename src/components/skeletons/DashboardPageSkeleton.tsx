'use client';

import PageHeader from '@/components/admin/PageHeader';
import StatCardSkeleton from '@/components/skeletons/StatCardSkeleton';
import { ShieldCheck, Activity, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPageSkeleton() {
  return (
    <>
      <PageHeader
        badge={{
          icon: <ShieldCheck size={12} />,
          text: 'System Administrator',
          className: 'border-indigo-100 bg-indigo-50 text-indigo-600',
        }}
        title={
          <>
            어드민 대시보드
            <span className="ml-4 rounded-2xl bg-blue-50 px-3 py-1 text-sm font-black tracking-normal text-blue-600">
              Live
            </span>
          </>
        }
        description="실시간 시스템 지표와 제안서 생성 현황을 확인하세요."
      />

      {/* 1. 핵심 지표 섹션 (Primary Metrics) */}
      <section className="space-y-6">
        <div className="ml-2 flex items-center gap-3">
          <Activity size={18} className="text-blue-600" />
          <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">
            Primary Metrics
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </section>

      {/* 2. 상태별 현황 및 트렌드 (Status & Trends) */}
      <div className="grid grid-cols-1 gap-12 pb-12 lg:grid-cols-2">
        {/* 현황 요약 */}
        <section className="space-y-6">
          <div className="ml-2 flex items-center gap-3">
            <Clock size={18} className="text-amber-500" />
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">
              Status Overview
            </h3>
          </div>
          <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="group flex items-center gap-6 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
              <div className="h-16 w-16 animate-pulse rounded-3xl bg-slate-200"></div>
              <div>
                <div className="mb-1 h-2.5 w-20 animate-pulse rounded bg-slate-200"></div>
                <div className="h-[36px] w-16 animate-pulse rounded bg-slate-200"></div>
              </div>
            </div>
            <div className="group flex items-center gap-6 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
              <div className="h-16 w-16 animate-pulse rounded-3xl bg-slate-200"></div>
              <div>
                <div className="mb-1 h-2.5 w-20 animate-pulse rounded bg-slate-200"></div>
                <div className="h-[36px] w-16 animate-pulse rounded bg-slate-200"></div>
              </div>
            </div>
            <div className="shadow-3xl col-span-1 flex flex-col justify-center rounded-[2.5rem] bg-slate-900 p-8 shadow-slate-900/20 sm:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-700"></div>
                <div className="space-y-1">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-700"></div>
                  <div className="h-2.5 w-40 animate-pulse rounded bg-slate-800"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="mb-1 flex items-center justify-between">
                  <div className="h-2.5 w-24 animate-pulse rounded bg-slate-700"></div>
                  <div className="h-2.5 w-12 animate-pulse rounded bg-slate-700"></div>
                </div>
                <div className="h-2 animate-pulse rounded-full bg-slate-800"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 기간별 통계 */}
        <section className="space-y-6">
          <div className="ml-2 flex items-center gap-3">
            <TrendingUp size={18} className="text-blue-600" />
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">
              Growth Trends
            </h3>
          </div>
          <div className="flex h-full flex-col rounded-[3rem] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/40">
            <div className="flex flex-1 flex-col justify-center space-y-8">
              {[1, 2, 3].map(i => (
                <div key={i}>
                  <div className="mb-3 flex items-end justify-between">
                    <div className="h-3 w-32 animate-pulse rounded bg-slate-200"></div>
                    <div className="h-[28px] w-16 animate-pulse rounded bg-slate-200"></div>
                  </div>
                  <div className="h-4 animate-pulse rounded-full border border-slate-100/50 bg-slate-50"></div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-8">
              <div className="h-2.5 w-40 animate-pulse rounded bg-slate-200"></div>
              <div className="h-2.5 w-32 animate-pulse rounded bg-slate-200"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
