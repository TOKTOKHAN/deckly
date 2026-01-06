'use client';

interface EmptyStateProps {
  message?: string;
  searchQuery?: string;
  defaultMessage?: string;
  className?: string;
}

export default function EmptyState({
  message,
  searchQuery,
  defaultMessage = '데이터가 없습니다.',
  className = '',
}: EmptyStateProps) {
  const displayMessage = message || (searchQuery ? '검색 결과가 없습니다.' : defaultMessage);

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center">
        <div className="text-lg font-medium text-slate-600">{displayMessage}</div>
      </div>
    </div>
  );
}
