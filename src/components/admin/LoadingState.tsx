'use client';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

export default function LoadingState({
  message = '데이터를 불러오는 중...',
  subMessage = '잠시만 기다려주세요.',
}: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="mb-4 text-lg font-medium text-slate-600">{message}</div>
        {subMessage && <div className="text-sm text-slate-500">{subMessage}</div>}
      </div>
    </div>
  );
}
