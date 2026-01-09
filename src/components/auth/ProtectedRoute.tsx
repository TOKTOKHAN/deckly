'use client';

import { ReactNode } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
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
}: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useRequireAuth(redirectTo);

  // 로딩 중이거나 인증되지 않았으면 fallback 렌더링
  if (isLoading || !isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
