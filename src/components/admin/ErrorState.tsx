'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ErrorStateProps {
  error: Error | unknown;
  onRetry?: () => void;
  title?: string;
  showServiceRoleKeyHelp?: boolean;
}

export default function ErrorState({
  error,
  onRetry,
  title = '오류 발생',
  showServiceRoleKeyHelp = false,
}: ErrorStateProps) {
  const errorMessage =
    error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다.';

  const isServiceRoleError =
    showServiceRoleKeyHelp &&
    (errorMessage.includes('Service Role Key') || errorMessage.includes('어드민 클라이언트'));

  return (
    <div className="flex items-center justify-center py-12">
      <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="text-red-600" size={48} />
        </div>
        <h3 className="mb-2 text-lg font-bold text-red-900">{title}</h3>
        <p className="mb-4 text-sm text-red-700">{errorMessage}</p>
        {isServiceRoleError && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-left text-xs text-red-800">
            <p className="font-semibold">해결 방법:</p>
            <p className="mt-1">
              .env.local 파일에{' '}
              <code className="rounded bg-red-200 px-1">SUPABASE_SERVICE_ROLE_KEY</code>를
              추가해주세요.
            </p>
          </div>
        )}
        {onRetry && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onRetry}
            icon={<RefreshCw size={16} />}
          >
            다시 시도
          </Button>
        )}
      </div>
    </div>
  );
}
