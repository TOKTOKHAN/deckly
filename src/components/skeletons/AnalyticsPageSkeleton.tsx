'use client';

import StatCardSkeleton from '@/components/skeletons/StatCardSkeleton';

export default function AnalyticsPageSkeleton() {
  return (
    <>
      {/* 통계 카드 그리드 스켈레톤 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* 차트 컨테이너 스켈레톤 */}
      <div className="rounded-[3rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/40">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-blue-100"></div>
            <div className="h-6 w-32 animate-pulse rounded bg-slate-200"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-slate-300"></div>
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-slate-300"></div>
              <div className="h-3 w-16 animate-pulse rounded bg-slate-200"></div>
            </div>
          </div>
        </div>

        {/* 차트 영역 스켈레톤 */}
        <div className="mb-10 h-[400px] w-full animate-pulse rounded-lg bg-slate-50">
          <div className="flex h-full items-end justify-center gap-4 p-8">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full animate-pulse rounded-t bg-slate-200"
                  style={{ height: `${30 + Math.random() * 60}%` }}
                ></div>
                <div className="h-3 w-12 animate-pulse rounded bg-slate-200"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 차트 하단 정보 스켈레톤 */}
        <div className="flex items-center justify-between border-t border-slate-50 pt-8">
          <div className="flex items-center gap-6">
            <div className="h-3 w-32 animate-pulse rounded bg-slate-200"></div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-300"></div>
              <div className="h-3 w-16 animate-pulse rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
