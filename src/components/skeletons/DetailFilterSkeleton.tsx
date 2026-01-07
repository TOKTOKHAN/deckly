'use client';

export default function DetailFilterSkeleton() {
  return (
    <div className="mt-20 max-h-[calc(100vh-12rem)] w-full overflow-y-auto rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/20">
      {/* 헤더 */}
      <div className="mb-5 flex items-center justify-between border-b border-slate-50 pb-8">
        <div className="h-[14px] w-[56px] animate-pulse rounded bg-slate-200"></div>
        <div className="h-[10px] w-[32px] animate-pulse rounded bg-slate-200"></div>
      </div>

      {/* 세로 레이아웃: 필터 섹션들을 세로로 배치 */}
      <div className="mb-5 space-y-6">
        {/* 소유자 필터 */}
        <div>
          <div className="mb-2 h-[10px] w-[60px] animate-pulse rounded bg-slate-200"></div>
          <div className="space-y-1">
            <div className="h-[32px] w-full animate-pulse rounded-xl bg-slate-100"></div>
            <div className="h-[32px] w-full animate-pulse rounded-xl bg-slate-100"></div>
            <div className="h-[32px] w-full animate-pulse rounded-xl bg-slate-100"></div>
          </div>
        </div>

        {/* 고객사 필터 */}
        <div>
          <div className="mb-2 h-[10px] w-[72px] animate-pulse rounded bg-slate-200"></div>
          <div className="flex flex-wrap gap-1">
            <div className="h-[32px] w-16 animate-pulse rounded-xl bg-slate-100"></div>
            <div className="h-[32px] w-20 animate-pulse rounded-xl bg-slate-100"></div>
            <div className="h-[32px] w-24 animate-pulse rounded-xl bg-slate-100"></div>
            <div className="h-[32px] w-20 animate-pulse rounded-xl bg-slate-100"></div>
          </div>
        </div>

        {/* 상태 필터 */}
        <div>
          <div className="mb-2 h-[10px] w-[80px] animate-pulse rounded bg-slate-200"></div>
          <div className="flex flex-col gap-1.5">
            <div className="h-[32px] w-full animate-pulse rounded-xl bg-slate-100"></div>
            <div className="h-[32px] w-full animate-pulse rounded-xl bg-slate-100"></div>
            <div className="h-[32px] w-full animate-pulse rounded-xl bg-slate-100"></div>
          </div>
        </div>
      </div>

      {/* 적용 버튼 */}
      <div className="flex gap-2 border-t border-slate-50 pt-4">
        <div className="h-[40px] flex-1 animate-pulse rounded-2xl bg-slate-100"></div>
        <div className="h-[40px] flex-[2] animate-pulse rounded-2xl bg-slate-200"></div>
      </div>
    </div>
  );
}
