'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { CalendarDays, Menu } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAdmin, isLoading } = useAuthStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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

  // 오늘 날짜 포맷팅
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* 메인 콘텐츠 */}
      <main className="custom-scrollbar min-w-0 flex-1 overflow-y-auto">
        {/* 상단 액션 바 */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/80 px-8 py-4 backdrop-blur-md md:px-12">
          <div className="flex items-center gap-4">
            <button
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm font-black uppercase tracking-tight tracking-widest text-slate-900">
              {pathname === '/admin' && '대시보드'}
              {pathname === '/admin/proposals' && '제안서 관리'}
              {pathname === '/admin/users' && '사용자 관리'}
              {pathname === '/admin/analytics' && '통계 및 분석'}
              {pathname === '/admin/settings' && '설정'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 sm:flex">
              <CalendarDays size={14} className="text-slate-400" />
              <span className="text-[11px] font-bold uppercase tracking-tighter text-slate-600">
                {formattedDate}
              </span>
            </div>
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-blue-600 text-xs font-black text-white shadow-lg shadow-blue-100 transition-transform hover:scale-105">
              {user?.email?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
          </div>
        </header>

        {/* 페이지 본문 */}
        <div className="animate-in fade-in mx-auto max-w-7xl space-y-12 p-8 duration-700 md:p-12">
          {children}
        </div>
      </main>

      {/* 스타일 오버라이드 */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }

        .animate-in {
          animation: slideIn 0.8s ease-out forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
