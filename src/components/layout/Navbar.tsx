'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Layout } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
    router.refresh();
  };

  if (isLoading) {
    return null;
  }

  const isAuthenticated = !!user;

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-600 p-2">
            <Layout className="text-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-800">Deckly</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon={<LogOut size={16} />}
              onClick={handleLogout}
              className="text-slate-600 hover:text-slate-900"
            >
              로그아웃
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-slate-900"
                >
                  로그인
                </Button>
              </Link>
              <Link href="/signup">
                <Button type="button" variant="primary" size="sm">
                  회원가입
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
