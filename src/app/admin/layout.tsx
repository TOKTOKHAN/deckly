'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Menu } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuthStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [shouldShowNotFound, setShouldShowNotFound] = useState(false);

  useEffect(() => {
    // 로딩 중이면 대기
    if (isLoading) return;

    // 로그인하지 않았으면 로그인 페이지로 리다이렉트
    if (!user) {
      router.push('/login');
      return;
    }

    // 관리자가 아니면 404 표시 (일반 사용자가 어드민 페이지 접근 시)
    if (!isAdmin) {
      setShouldShowNotFound(true);
    }
  }, [user, isAdmin, isLoading, router]);

  // 조건이 만족되면 404 페이지 표시
  if (shouldShowNotFound) {
    notFound();
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* 메인 콘텐츠 */}
      <main className="custom-scrollbar min-w-0 flex-1 overflow-y-auto">
        {/* 상단 액션 바 */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        {/* 페이지 본문 */}
        <div className="animate-in fade-in mx-auto max-w-7xl space-y-12 p-8 duration-700 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
