'use client';

export default function StatCardSkeleton() {
  return (
    <div className="group rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/40">
      <div className="mb-6 flex items-start justify-between">
        <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-200"></div>
        <div className="h-6 w-16 animate-pulse rounded-lg bg-slate-100"></div>
      </div>
      <div>
        <div className="mb-1.5 h-2.5 w-28 animate-pulse rounded bg-slate-200"></div>
        <div className="mb-2 h-9 w-36 animate-pulse rounded bg-slate-200"></div>
        <div className="h-3 w-44 animate-pulse rounded bg-slate-100"></div>
      </div>
    </div>
  );
}
