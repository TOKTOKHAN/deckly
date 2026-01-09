'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

/**
 * 로그인하지 않은 사용자만 접근 가능한 페이지에서 사용하는 훅
 * 로그인한 사용자를 자동으로 대시보드로 리다이렉트
 *
 * @param redirectTo - 리다이렉트할 경로 (기본값: '/dashboard')
 * @returns { user, isLoading, isGuest } - 인증 상태 정보
 */
export function useRequireGuest(redirectTo: string = '/dashboard') {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    // 로딩 중이면 대기
    if (isLoading) return;

    // 로그인한 사용자는 대시보드로 리다이렉트
    if (user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  return {
    user,
    isLoading,
    isGuest: !user,
  };
}
