'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';
import { useNotFound } from '@/contexts/NotFoundContext';
import Button from '@/components/ui/Button';

export default function NotFound() {
  const router = useRouter();
  const { setIsNotFound } = useNotFound();

  useEffect(() => {
    setIsNotFound(true);

    return () => {
      // 컴포넌트 언마운트 시 상태 복원
      setIsNotFound(false);
    };
  }, [setIsNotFound]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white font-sans text-slate-900">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute left-[-10%] top-[-15%] -z-10 h-[600px] w-[600px] rounded-full bg-blue-50/50 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] -z-10 h-[500px] w-[500px] rounded-full bg-indigo-50/50 blur-[100px]"></div>

      {/* Main Content Area */}
      <main className="-mt-20 flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-xl text-center">
          {/* Numerical 404 with Gradient */}
          <div className="mb-4">
            <h1 className="select-none text-[120px] font-black leading-none tracking-tighter text-transparent opacity-90 md:text-[180px]">
              <span className="bg-gradient-to-b from-blue-600 to-indigo-700 bg-clip-text">404</span>
            </h1>
          </div>

          {/* Serious and Professional Text */}
          <div className="mb-12 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
              요청하신 페이지를 찾을 수 없습니다.
            </h2>
            <p className="mx-auto max-w-md font-medium leading-relaxed text-slate-500">
              입력하신 주소가 잘못되었거나, 페이지의 주소가 변경 혹은 삭제되어 현재 사용하실 수
              없습니다.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => router.push('/')}
              icon={<Home size={18} />}
              className="w-full px-8 py-4 shadow-lg shadow-blue-100 sm:w-auto"
            >
              메인 홈페이지로 이동
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              icon={<ArrowLeft size={18} />}
              className="w-full px-8 py-4 sm:w-auto"
            >
              이전 페이지로 돌아가기
            </Button>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="w-full border-t border-slate-50 py-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
          © 2026 Deckly Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
