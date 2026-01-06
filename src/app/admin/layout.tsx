'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuthStore();

  useEffect(() => {
    // 로딩 중이면 대기
    if (isLoading) return;

    // 로그인하지 않았거나 관리자가 아니면 리다이렉트
    if (!user || !isAdmin) {
      router.push('/dashboard');
    }
  }, [user, isAdmin, isLoading, router]);

  // 로딩 중이거나 권한이 없으면 아무것도 렌더링하지 않음
  if (isLoading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg font-medium text-slate-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="ml-64 flex-1">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
