'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import NavbarSkeleton from '@/components/skeletons/NavbarSkeleton';
import DecklyLogo from '@/components/ui/DecklyLogo';

export default function Navbar() {
  const router = useRouter();
  const { user, isLoading, logout, isAdmin } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    await logout();

    router.push('/login');
    setShowLogoutModal(false);
  };

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  const isAuthenticated = !!user;

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <DecklyLogo className="h-8 w-auto text-indigo-600" />
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">
                {user?.user_metadata?.name || user?.email || '사용자'}
              </span>
              {isAdmin && (
                <Link href="/admin">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    관리자
                  </Button>
                </Link>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={<LogOut size={16} />}
                onClick={() => setShowLogoutModal(true)}
                className="text-slate-600 hover:text-slate-900"
              >
                로그아웃
              </Button>
            </div>
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
              <a href="https://www.pluuug.com/" target="_blank" rel="noopener noreferrer">
                <Button type="button" variant="primary" size="sm">
                  상담받기
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 로그아웃 확인 모달 */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="로그아웃"
        message="정말 로그아웃하시겠습니까?"
        confirmText="로그아웃"
        cancelText="취소"
        onConfirm={handleLogout}
        variant="default"
      />
    </nav>
  );
}
