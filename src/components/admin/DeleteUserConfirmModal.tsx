'use client';

import { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import type { UserWithStats } from '@/lib/supabase/admin/users';

interface DeleteUserConfirmModalProps {
  isOpen: boolean;
  user: UserWithStats | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteUserConfirmModal({
  isOpen,
  user,
  onClose,
  onSuccess,
}: DeleteUserConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Supabase 클라이언트 확인
      if (!supabase) {
        throw new Error('Supabase 클라이언트를 초기화할 수 없습니다.');
      }

      // 현재 세션 가져오기
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error('세션을 가져오는 중 오류가 발생했습니다. 다시 로그인해주세요.');
      }

      if (!session?.access_token) {
        throw new Error('인증 세션이 없습니다. 다시 로그인해주세요.');
      }

      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '사용자 삭제에 실패했습니다.');
      }

      // 성공 토스트 알림
      toast.success('사용자가 성공적으로 삭제되었습니다.', {
        duration: 3000,
      });

      onSuccess();
      onClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '사용자 삭제 중 오류가 발생했습니다.';
      setError(errorMessage);

      // 실패 토스트 알림
      toast.error(errorMessage, {
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setError(null);
      onClose();
    }
  };

  if (!isOpen || !user) return null;

  const metadata = (user.userMetadata || {}) as { name?: string };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="animate-in fade-in absolute inset-0 bg-slate-900/40 backdrop-blur-md duration-300"
        onClick={handleClose}
      />

      <div className="animate-in zoom-in-95 relative z-10 w-full max-w-md rounded-[3rem] border border-slate-100 bg-white p-6 shadow-[0_40px_100px_rgba(0,0,0,0.25)] duration-300">
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute right-6 top-6 rounded-xl p-2 text-slate-300 transition-all hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <div className="mb-6 text-center sm:text-left">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[1.5rem] bg-red-50 sm:mx-0">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <h2 className="mb-1.5 text-xl font-black tracking-tight text-slate-900">사용자 삭제</h2>
          <p className="text-xs font-medium italic text-slate-400">이 작업은 되돌릴 수 없습니다.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        <div className="mb-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-sm font-bold text-slate-600">삭제할 사용자 정보</p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-bold text-slate-400">이메일:</span>{' '}
                <span className="font-black text-slate-900">{user.email || '-'}</span>
              </div>
              {metadata.name && (
                <div>
                  <span className="font-bold text-slate-400">이름:</span>{' '}
                  <span className="font-black text-slate-900">{metadata.name}</span>
                </div>
              )}
              {user.phone && (
                <div>
                  <span className="font-bold text-slate-400">전화번호:</span>{' '}
                  <span className="font-black text-slate-900">{user.phone}</span>
                </div>
              )}
              {user.proposalCount > 0 && (
                <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs font-bold text-amber-700">
                    ⚠️ 이 사용자는 {user.proposalCount}개의 제안서를 보유하고 있습니다.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-700">
              정말로 이 사용자를 삭제하시겠습니까? <br />이 작업은 되돌릴 수 없습니다.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 rounded-[1.5rem] bg-slate-100 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-200"
          >
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleDelete}
            isLoading={isLoading}
            disabled={isLoading}
            className="flex-[2] rounded-[1.5rem] bg-red-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-red-100 hover:bg-red-700 active:scale-95 disabled:opacity-50"
          >
            <Trash2 size={16} className="mr-2" />
            삭제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
