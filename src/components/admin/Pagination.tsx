'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  itemLabel?: string; // "proposals", "entries" 등
  showPageNumbers?: boolean; // 페이지 번호 표시 여부
  prevLabel?: string;
  nextLabel?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemLabel = 'items',
  showPageNumbers = false,
  prevLabel = 'Prev',
  nextLabel = 'Next',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/30 px-10 py-8 sm:flex-row">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        Showing {startIndex.toLocaleString()} to {endIndex.toLocaleString()} of{' '}
        {totalItems.toLocaleString()} {itemLabel}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-400 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {prevLabel}
        </button>
        {showPageNumbers && (
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'cursor-pointer text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
