'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  Settings,
  Save,
  Users,
  AlertCircle,
  FileText,
  CheckCircle2,
  Info,
  ShieldCheck,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import PageHeader from '@/components/admin/PageHeader';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';

/* 기본 제한값 조회 */
async function fetchDefaultLimit(
  sessionToken: string | null,
): Promise<{ limit: number | null; hasLimit: boolean }> {
  if (!sessionToken) {
    throw new Error('인증이 필요합니다.');
  }

  const response = await fetch('/api/admin/settings/default-proposal-limit', {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '기본 제한값을 불러오는 중 오류가 발생했습니다.');
  }

  return response.json();
}

/* 기본 제한값 설정 */
async function updateDefaultLimit(
  sessionToken: string | null,
  limit: number | null,
): Promise<void> {
  if (!sessionToken) {
    throw new Error('인증이 필요합니다.');
  }

  const response = await fetch('/api/admin/settings/default-proposal-limit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify({ limit }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '기본 제한값을 설정하는 중 오류가 발생했습니다.');
  }
}

/* 일괄 적용 */
async function batchUpdateLimits(
  sessionToken: string | null,
  limit: number | null,
  targetUsers: 'all' | 'null_only' | string[],
): Promise<{ total: number; succeeded: number; failed: number }> {
  if (!sessionToken) {
    throw new Error('인증이 필요합니다.');
  }

  const response = await fetch('/api/admin/users/batch-update-limits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify({ limit, targetUsers }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '일괄 적용 중 오류가 발생했습니다.');
  }

  return response.json();
}

export default function AdminSettingsPage() {
  const { session } = useAuthStore();
  const queryClient = useQueryClient();
  const [defaultLimitInput, setDefaultLimitInput] = useState<string>('');
  const [batchLimitInput, setBatchLimitInput] = useState<string>('');
  const [batchTarget, setBatchTarget] = useState<'all' | 'null_only'>('null_only');
  const [isBatchLoading, setIsBatchLoading] = useState(false);

  const sessionToken = session?.access_token || null;

  /* 기본 제한값 조회 */
  const {
    data: defaultLimitData,
    isLoading: isLoadingDefault,
    error: defaultLimitError,
  } = useQuery({
    queryKey: ['admin', 'settings', 'default-proposal-limit'],
    queryFn: () => fetchDefaultLimit(sessionToken),
    enabled: !!sessionToken,
    retry: 2,
  });

  /* 기본 제한값 업데이트 Mutation */
  const updateDefaultLimitMutation = useMutation({
    mutationFn: (limit: number | null) => updateDefaultLimit(sessionToken, limit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'settings', 'default-proposal-limit'] });
      toast.success('기본 제한값이 성공적으로 설정되었습니다.', {
        duration: 3000,
      });
      setDefaultLimitInput('');
    },
    onError: (error: Error) => {
      toast.error(error.message || '기본 제한값 설정에 실패했습니다.', {
        duration: 5000,
      });
    },
  });

  /* 일괄 적용 Mutation */
  const batchUpdateMutation = useMutation({
    mutationFn: ({
      limit,
      targetUsers,
    }: {
      limit: number | null;
      targetUsers: 'all' | 'null_only';
    }) => batchUpdateLimits(sessionToken, limit, targetUsers),
    onSuccess: data => {
      toast.success(
        `일괄 적용이 완료되었습니다. (전체: ${data.total}, 성공: ${data.succeeded}, 실패: ${data.failed})`,
        {
          duration: 5000,
        },
      );
      setBatchLimitInput('');
      setIsBatchLoading(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || '일괄 적용에 실패했습니다.', {
        duration: 5000,
      });
      setIsBatchLoading(false);
    },
  });

  /* 기본 제한값 입력 필드 초기화 */
  useEffect(() => {
    if (defaultLimitData?.limit !== undefined) {
      setDefaultLimitInput(
        defaultLimitData.limit === null ? '' : defaultLimitData.limit.toString(),
      );
    }
  }, [defaultLimitData]);

  /* 기본 제한값 저장 */
  const handleSaveDefaultLimit = () => {
    const limit = defaultLimitInput.trim() === '' ? null : parseInt(defaultLimitInput.trim(), 10);

    if (defaultLimitInput.trim() !== '' && (isNaN(limit!) || limit! < 0)) {
      toast.error('제한값은 0 이상의 정수이어야 합니다.', {
        duration: 3000,
      });
      return;
    }

    updateDefaultLimitMutation.mutate(limit);
  };

  /* 일괄 적용 */
  const handleBatchUpdate = () => {
    const limit = batchLimitInput.trim() === '' ? null : parseInt(batchLimitInput.trim(), 10);

    if (batchLimitInput.trim() !== '' && (isNaN(limit!) || limit! < 0)) {
      toast.error('제한값은 0 이상의 정수이어야 합니다.', {
        duration: 3000,
      });
      return;
    }

    setIsBatchLoading(true);
    batchUpdateMutation.mutate({ limit, targetUsers: batchTarget });
  };

  if (!sessionToken) {
    return (
      <div className="animate-in fade-in space-y-10 duration-700">
        <PageHeader
          badge={{
            icon: <Settings size={12} />,
            text: 'System Configuration',
            className: 'border-indigo-100 bg-indigo-50 text-indigo-600',
          }}
          title="시스템 설정"
          description="비즈니스 운영 정책 및 사용자 리소스 제한을 관리합니다."
          showDate={false}
          showUserAvatar={false}
        />
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="py-12 text-center">
            <div className="text-lg font-medium text-slate-600">인증이 필요합니다.</div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingDefault) {
    return (
      <div className="animate-in fade-in space-y-10 duration-700">
        <PageHeader
          badge={{
            icon: <Settings size={12} />,
            text: 'System Configuration',
            className: 'border-indigo-100 bg-indigo-50 text-indigo-600',
          }}
          title="시스템 설정"
          description="비즈니스 운영 정책 및 사용자 리소스 제한을 관리합니다."
          showDate={false}
          showUserAvatar={false}
        />
        <LoadingState message="설정을 불러오는 중..." />
      </div>
    );
  }

  if (defaultLimitError) {
    return (
      <div className="animate-in fade-in space-y-10 duration-700">
        <PageHeader
          badge={{
            icon: <Settings size={12} />,
            text: 'System Configuration',
            className: 'border-indigo-100 bg-indigo-50 text-indigo-600',
          }}
          title="시스템 설정"
          description="비즈니스 운영 정책 및 사용자 리소스 제한을 관리합니다."
          showDate={false}
          showUserAvatar={false}
        />
        <ErrorState
          error={defaultLimitError as Error}
          onRetry={() => queryClient.invalidateQueries()}
        />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-10 duration-700">
      <PageHeader
        badge={{
          icon: <Settings size={12} />,
          text: 'System Configuration',
          className: 'border-indigo-100 bg-indigo-50 text-indigo-600',
        }}
        title="시스템 설정"
        description="비즈니스 운영 정책 및 사용자 리소스 제한을 관리합니다."
        showDate={false}
        showUserAvatar={false}
      />

      <div className="mx-auto max-w-4xl">
        <div className="space-y-10">
          {/* Section 1: Default Proposal Limit */}
          <div className="rounded-[3rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/30">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-blue-50 text-blue-600">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  기본 생성 제한 설정
                </h2>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Default Provisioning Policy
                </p>
              </div>
            </div>

            <div className="mb-8 rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <div className="flex gap-4">
                <Info className="shrink-0 text-blue-500" size={20} />
                <p className="text-sm font-medium leading-relaxed text-slate-600">
                  신규 가입 사용자에게 자동으로 적용될 기본 제안서 생성 한도를 설정합니다. <br />
                  <span className="font-black italic text-blue-600">
                    입력하지 않을 경우 &apos;무제한&apos;으로 설정됩니다.
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex-1 space-y-3">
                <Input
                  type="number"
                  label="Limit Value"
                  labelClassName="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
                  value={defaultLimitInput}
                  onChange={e => setDefaultLimitInput(e.target.value)}
                  placeholder="예: 100"
                  icon={<FileText size={20} />}
                  className="rounded-[2rem] border-2 border-transparent bg-slate-50 py-[1.25rem] pl-14 pr-6 text-sm font-black leading-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>
              <Button
                onClick={handleSaveDefaultLimit}
                disabled={updateDefaultLimitMutation.isPending}
                isLoading={updateDefaultLimitMutation.isPending}
                icon={<Save size={18} />}
                className="w-full rounded-[2rem] bg-blue-600 px-10 py-[1.25rem] text-sm font-black uppercase leading-none tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 disabled:opacity-50 sm:w-auto"
              >
                {updateDefaultLimitMutation.isPending ? '저장 중...' : '정책 저장'}
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 px-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Active Setting:{' '}
                {defaultLimitData?.limit !== null && defaultLimitData?.limit !== undefined
                  ? `${defaultLimitData.limit} Decks`
                  : 'Unlimited Decks'}
              </span>
            </div>
          </div>

          {/* Section 2: Batch Update */}
          <div className="rounded-[3rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/30">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-orange-50 text-orange-600">
                <Users size={28} />
              </div>
    <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  기존 사용자 일괄 적용
                </h2>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Bulk Resource Migration
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Target Audience Selection
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div
                    onClick={() => setBatchTarget('null_only')}
                    className={`relative cursor-pointer overflow-hidden rounded-[2.5rem] border-2 p-8 transition-all ${
                      batchTarget === 'null_only'
                        ? 'border-indigo-200 bg-indigo-50 shadow-inner'
                        : 'border-transparent bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${
                          batchTarget === 'null_only' ? 'text-indigo-600' : 'text-slate-400'
                        }`}
                      >
                        Segment 01
                      </span>
                      {batchTarget === 'null_only' && (
                        <CheckCircle2 size={20} className="animate-in zoom-in text-indigo-600" />
                      )}
                    </div>
                    <p
                      className={`text-base font-black ${
                        batchTarget === 'null_only' ? 'text-indigo-900' : 'text-slate-600'
                      }`}
                    >
                      제한이 없는 사용자만
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase italic leading-relaxed text-slate-400 opacity-60">
                      Apply to users without individual limits only
                    </p>
                  </div>
                  <div
                    onClick={() => setBatchTarget('all')}
                    className={`relative cursor-pointer overflow-hidden rounded-[2.5rem] border-2 p-8 transition-all ${
                      batchTarget === 'all'
                        ? 'border-orange-200 bg-orange-50 shadow-inner'
                        : 'border-transparent bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${
                          batchTarget === 'all' ? 'text-orange-600' : 'text-slate-400'
                        }`}
                      >
                        Segment 02
                      </span>
                      {batchTarget === 'all' && (
                        <CheckCircle2 size={20} className="animate-in zoom-in text-orange-600" />
                      )}
                    </div>
                    <p
                      className={`text-base font-black ${
                        batchTarget === 'all' ? 'text-orange-900' : 'text-slate-600'
                      }`}
                    >
                      모든 사용자 적용
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase italic leading-relaxed text-slate-400 opacity-60">
                      Override all existing individual limits
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex-1 space-y-3">
                  <Input
                    type="number"
                    label="Migration Value"
                    labelClassName="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
                    value={batchLimitInput}
                    onChange={e => setBatchLimitInput(e.target.value)}
                    placeholder="예: 500"
                    icon={<TrendingUp size={20} />}
                    className="rounded-[2rem] border-2 border-transparent bg-slate-50 py-[1.25rem] pl-14 pr-6 text-sm font-black leading-none transition-all focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-50"
                  />
                </div>
                <Button
                  onClick={handleBatchUpdate}
                  disabled={isBatchLoading || batchUpdateMutation.isPending}
                  isLoading={isBatchLoading || batchUpdateMutation.isPending}
                  icon={<Activity size={18} />}
                  className="w-full rounded-[2rem] bg-slate-900 px-10 py-[1.25rem] text-sm font-black uppercase leading-none tracking-widest text-white shadow-xl shadow-slate-200 transition-all hover:bg-orange-600 active:scale-95 disabled:opacity-50 sm:w-auto"
                >
                  {isBatchLoading || batchUpdateMutation.isPending
                    ? '적용 중...'
                    : '일괄 업데이트 실행'}
                </Button>
      </div>

              {batchTarget === 'all' && (
                <div className="flex items-start gap-5 rounded-[2rem] border border-red-100 bg-red-50 p-8">
                  <AlertCircle className="mt-1 shrink-0 text-red-500" size={24} />
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase italic tracking-tighter text-red-900">
                      Security Alert: Data Override Warning
                    </p>
                    <p className="text-[11px] font-medium leading-relaxed text-red-700">
                      &apos;모든 사용자&apos; 옵션을 선택하면 기존에 부여된 모든 계정의 개별 혜택 및
                      특별 한도가 초기화되고 새로운 값으로 덮어씌워집니다. <br />이 작업은{' '}
                      <span className="font-black underline">복구가 불가능</span>하므로 대상을
                      신중히 검토하십시오.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
