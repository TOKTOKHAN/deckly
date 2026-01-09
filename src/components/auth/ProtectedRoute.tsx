'use client';

import { ReactNode } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 * 로그인하지 않은 사용자는 자동으로 리다이렉트
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 */
export default function ProtectedRoute({
  children,
  redirectTo = '/login',
  fallback = null,
  loadingFallback,
}: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useRequireAuth(redirectTo);

  // 로딩 중이면 로딩 fallback 표시
  if (isLoading) {
    return <>{loadingFallback || <div className="min-h-screen bg-gray-50" />}</>;
  }

  // 인증되지 않았으면 fallback 렌더링
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
