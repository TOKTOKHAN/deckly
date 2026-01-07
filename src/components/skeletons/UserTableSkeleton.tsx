'use client';

export default function UserTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="shadow-3xl overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-slate-200/50">
      {/* 헤더 */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-50 bg-slate-50/40 px-10 pt-6 sm:flex-row">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-2xl border border-slate-100 bg-slate-200 shadow-sm"></div>
          <div className="h-5 w-20 animate-pulse rounded bg-slate-200"></div>
        </div>
        <div className="relative w-full sm:w-72">
          <div className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-pulse rounded bg-slate-200"></div>
          <div className="h-11 w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-100 pl-12"></div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[30%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
            <col className="w-[10%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <th className="px-12 py-3">User Account</th>
              <th className="px-6 py-3 text-center">Verification</th>
              <th className="px-6 py-3">Member Since</th>
              <th className="px-6 py-3">Last Activity</th>
              <th className="px-6 py-3 text-center">Proposals</th>
              <th className="px-12 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="h-[96px]">
                <td className="px-12 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 flex-shrink-0 animate-pulse rounded-full border-2 border-white bg-slate-200 shadow-sm"></div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                      <div className="h-[14px] w-52 animate-pulse rounded bg-slate-200"></div>
                      <div className="h-[10px] w-40 animate-pulse rounded bg-slate-100"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-center">
                  <div className="mx-auto flex h-[26px] w-[68px] animate-pulse items-center justify-center rounded-full border border-slate-200 bg-slate-100"></div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <div className="h-[14px] w-[14px] flex-shrink-0 animate-pulse rounded bg-slate-200"></div>
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200"></div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full bg-slate-200"></div>
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200"></div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="mx-auto flex h-8 w-14 animate-pulse items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100 px-3">
                    <div className="h-3 w-3 flex-shrink-0 rounded bg-slate-200"></div>
                    <div className="h-3 w-3 flex-shrink-0 rounded bg-slate-200"></div>
                  </div>
                </td>
                <td className="px-12 py-6 text-right">
                  <div className="ml-auto h-5 w-5 flex-shrink-0 animate-pulse rounded-xl bg-slate-200"></div>
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
