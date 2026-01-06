'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Users, BarChart3, Settings } from 'lucide-react';

const menuItems = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard },
  { href: '/admin/proposals', label: '제안서 관리', icon: FileText },
  { href: '/admin/users', label: '사용자 관리', icon: Users },
  { href: '/admin/analytics', label: '통계 및 분석', icon: BarChart3 },
  { href: '/admin/settings', label: '설정', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col">
        {/* 로고 */}
        <div className="border-b border-gray-200 p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-600 p-2">
              <LayoutDashboard className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-800">Admin</span>
          </Link>
        </div>

        {/* 메뉴 */}
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 하단 링크 */}
        <div className="border-t border-gray-200 p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <FileText size={20} />
            일반 대시보드로 이동
          </Link>
        </div>
      </div>
    </aside>
  );
}

