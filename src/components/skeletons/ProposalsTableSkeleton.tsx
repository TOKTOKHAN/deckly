'use client';

export default function ProposalsTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/40">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <th className="px-10 py-6">Project Name</th>
              <th className="px-6 py-6">Client</th>
              <th className="px-6 py-6 text-center">Status</th>
              <th className="px-6 py-6">Owner</th>
              <th className="px-6 py-6">Created At</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                <td className="px-10 py-6">
                  <div className="space-y-1">
                    <div className="h-3.5 w-56 animate-pulse rounded bg-slate-200"></div>
                    <div className="h-2.5 w-32 animate-pulse rounded bg-slate-100"></div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200"></div>
                </td>
                <td className="px-6 py-6 text-center">
                  <div className="mx-auto h-6 w-20 animate-pulse rounded-full bg-slate-200"></div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200"></div>
                    <div className="h-4 w-32 animate-pulse rounded bg-slate-200"></div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200"></div>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="ml-auto flex items-center gap-2">
                    <div className="h-8 w-8 animate-pulse rounded-xl bg-slate-200"></div>
                    <div className="h-8 w-8 animate-pulse rounded-xl bg-slate-200"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 스켈레톤 */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/30 px-10 py-8 sm:flex-row">
        <div className="h-4 w-48 animate-pulse rounded bg-slate-200"></div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-16 animate-pulse rounded-xl bg-slate-200"></div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-8 animate-pulse rounded-lg bg-slate-200"></div>
            ))}
          </div>
          <div className="h-10 w-16 animate-pulse rounded-xl bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
}
