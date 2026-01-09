'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

/**
 * 인증이 필요한 페이지에서 사용하는 훅
 * 로그인하지 않은 사용자를 자동으로 로그인 페이지로 리다이렉트
 *
 * @param redirectTo - 리다이렉트할 경로 (기본값: '/login')
 * @returns { user, isLoading, isAuthenticated } - 인증 상태 정보
 */
export function useRequireAuth(redirectTo: string = '/login') {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    // 로딩 중이면 대기
    if (isLoading) return;

    // 로그인하지 않았으면 리다이렉트
    if (!user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
