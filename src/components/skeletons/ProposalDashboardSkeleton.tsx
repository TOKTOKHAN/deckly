'use client';

export default function ProposalDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-5 w-48 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex animate-pulse items-center gap-2 rounded-xl bg-gray-200 px-5 py-2.5">
            <div className="h-5 w-5 rounded bg-gray-200"></div>
            <div className="h-4 w-24 rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className="group cursor-pointer rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-200"></div>
                <div className="h-[23px] w-[87.23px] animate-pulse rounded-full bg-gray-200"></div>
              </div>
              <div className="mb-1 h-6 w-40 animate-pulse rounded bg-gray-200"></div>
              <div className="mb-4 h-4 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                <div className="h-3 w-3 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
