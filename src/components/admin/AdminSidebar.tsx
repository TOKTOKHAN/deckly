'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Users, BarChart3, Settings } from 'lucide-react';

const menuItems = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard },
  { href: '/admin/proposals', label: '제안서 관리', icon: FileText },
  { href: '/admin/users', label: '사용자 관리', icon: Users },
  { href: '/admin/analytics', label: '통계 및 분석', icon: BarChart3 },
  { href: '/admin/settings', label: '설정', icon: Settings },
];

/* 사이드바 아이템 컴포넌트 */
const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`group mb-1 flex w-full items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1 ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon
        size={20}
        className={
          isActive ? 'text-white' : 'text-slate-500 transition-colors group-hover:text-blue-600'
        }
      />
      <span
        className={`text-sm font-black tracking-tight ${isActive ? 'text-white' : 'text-slate-600'}`}
      >
        {label}
      </span>
    </div>
    {isActive && <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></div>}
  </button>
);

export default function AdminSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // 모바일에서 사이드바가 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-slate-100 bg-white transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="flex h-full flex-col p-6">
          {/* 메인 메뉴 내비게이션 */}
          <nav className="flex-1">
            <p className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
              Main Menu
            </p>
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <SidebarItem
                  key={item.href}
                  icon={Icon}
                  label={item.label}
                  isActive={isActive}
                  onClick={() => {
                    router.push(item.href);
                    setIsOpen(false);
                  }}
                />
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
