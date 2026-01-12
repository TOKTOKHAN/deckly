'use client';

import { useState, lazy, Suspense } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import apiClient from '@/lib/axios/client';
import { ProposalRequest, ProposalResponse } from '@/types/gemini';
import { ProposalFormData, Proposal, ProposalStatus, GenerationStatus } from '@/types/proposal';
import {
  getProposals,
  createProposal,
  updateProposal,
  deleteProposal,
} from '@/lib/supabase/proposals';
import { useAuthStore } from '@/stores/authStore';
import GeneratingOverlay from './GeneratingOverlay';
import DashboardView from './DashboardView';
import ProposalDashboardSkeleton from '@/components/skeletons/ProposalDashboardSkeleton';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

// 동적 import로 코드 스플리팅 적용
const FormView = lazy(() => import('./FormView'));
const ResultView = lazy(() => import('./ResultView'));

export default function ProposalForm() {
  const queryClient = useQueryClient();
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const [view, setView] = useState<'dashboard' | 'form' | 'result'>('dashboard');
  const [currentProposal, setCurrentProposal] = useState<Proposal | null>(null);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState<GenerationStatus>({ progress: 0, message: '' });
  const [proposalToDelete, setProposalToDelete] = useState<Proposal | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [resultError, setResultError] = useState<string | null>(null);

  // React Query로 제안서 목록 조회 (인증 상태가 준비된 후에만 실행)
  const { data: proposals = [], isLoading: isProposalsLoading } = useQuery({
    queryKey: ['proposals'],
    queryFn: getProposals,
    enabled: !!user && !isAuthLoading, // 인증 상태가 준비된 후에만 실행
  });

  // 제안서 생성 Mutation
  const createMutation = useMutation({
    mutationFn: createProposal,
    onSuccess: () => {
      // 제안서 목록 자동 리프레시
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
    onError: (error: Error) => {
      console.error('제안서 생성 Mutation 오류:', error);
      toast.error(error.message || '제안서 생성 중 오류가 발생했습니다.');
    },
  });

  // 제안서 업데이트 Mutation
  const updateMutation = useMutation({
    mutationFn: updateProposal,
    onSuccess: () => {
      // 제안서 목록 자동 리프레시
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
    onError: (error: Error) => {
      console.error('제안서 업데이트 Mutation 오류:', error);
      toast.error(error.message || '제안서 업데이트 중 오류가 발생했습니다.');
    },
  });

  // 제안서 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProposal,
    onSuccess: () => {
      // 제안서 목록 자동 리프레시
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success('제안서가 삭제되었습니다.');
      setProposalToDelete(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || '제안서 삭제 중 오류가 발생했습니다.');
      setProposalToDelete(null);
    },
  });

  // 제안서 생성
  const generateProposal = async (proposalId: string, data: ProposalFormData) => {
    setIsGenerating(true);
    setGenStatus({ progress: 10, message: '미팅 전사록 분석 중...' });

    const updateProgress = async (progress: number, message: string) => {
      setGenStatus({ progress, message });
      try {
        // 현재 캐시에서 제안서 가져오기
        const cachedProposals = queryClient.getQueryData<Proposal[]>(['proposals']) || [];
        const currentProposal = cachedProposals.find(p => p.id === proposalId);
        if (currentProposal) {
          const updated = { ...currentProposal, progress, status: 'generating' as ProposalStatus };
          await updateMutation.mutateAsync(updated);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('진행 상태 업데이트 오류:', err);
      }
    };

    try {
      updateProgress(30, '제안서 구조 설계 중...');

      // API 호출 - Step 1의 모든 필드 포함
      const requestData: ProposalRequest = {
        meetingNotes: data.transcriptText,
        title: data.projectName,
        client: data.clientCompanyName,
        projectOverview: data.includeSummary,
        budget: data.budgetMin || undefined,
        period:
          data.startDate && data.openDate ? `${data.startDate} ~ ${data.openDate}` : undefined,
        requirements: data.priorityFeatures,

        // Step 1 추가 필드들
        slogan: data.slogan || undefined,
        brandColor1: data.brandColor1 || undefined,
        brandColor2: data.brandColor2 || undefined,
        brandColor3: data.brandColor3 || undefined,
        clientLogo: data.clientLogo || undefined,
        ourLogo: data.ourLogo || undefined,
        clientWebsite: data.clientWebsite || undefined,
        font: data.font || undefined,
        teamSize: data.teamSize || undefined,
        startDate: data.startDate || undefined,
        endDate: data.endDate || undefined,
        reviewPeriod: data.reviewPeriod || undefined,
        maintenancePeriod: data.maintenancePeriod || undefined,
        openDate: data.openDate || undefined,
      };

      updateProgress(60, 'AI가 상세 내용을 작성하는 중...');

      let response;
      try {
        const result = await apiClient.post<ProposalResponse>('/gemini', requestData);
        response = result.data;
      } catch (apiError) {
        // API 호출 자체가 실패한 경우 (네트워크 오류 등)
        const apiErrorMessage =
          apiError instanceof Error ? apiError.message : 'AI 서버와의 통신 중 오류가 발생했습니다.';
        throw new Error(apiErrorMessage);
      }

      if (!response.success || !response.content) {
        throw new Error(response.error || '제안서 생성에 실패했습니다.');
      }

      updateProgress(90, '제안서 마무리 중...');

      // Supabase에 저장
      const completedProposal: Proposal = {
        id: proposalId,
        ...data,
        content: response.content,
        status: 'completed',
        progress: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        await updateMutation.mutateAsync(completedProposal);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('제안서 저장 오류:', err);
        const saveError =
          err instanceof Error ? err.message : '제안서 저장 중 오류가 발생했습니다.';
        toast.error(saveError, { duration: 5000 });
      }

      setIsGenerating(false);
      setView('result');
      setCurrentProposal(completedProposal);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('제안서 생성 오류:', err);
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류';

      // 제한 초과 에러인지 확인
      if (errorMessage.includes('제한')) {
        toast.error(errorMessage, {
          duration: 5000,
          icon: '⚠️',
        });
        setIsGenerating(false);
        return; // 제안서 생성 중단
      }

      const errorProposal: Proposal = {
        id: proposalId,
        ...data,
        status: 'error',
        error: errorMessage,
        createdAt: new Date().toISOString(),
      };
      try {
        await updateMutation.mutateAsync(errorProposal);
      } catch (updateErr) {
        // eslint-disable-next-line no-console
        console.error('에러 상태 저장 오류:', updateErr);
        // 에러 상태 저장 실패는 사용자에게 알리지 않음 (이미 제안서 생성 실패는 알림됨)
      }
      setIsGenerating(false);
      toast.error('제안서 생성 중 오류가 발생했습니다.', {
        duration: 5000,
      });
    }
  };

  const handleCreate = async (data: ProposalFormData) => {
    // Zod 검증 통과 시 실행됨 (FormView에서 이미 검증됨)
    const validatedData = data;

    // 새 제안서 생성 (Supabase)
    // id는 명시하지 않음 - Supabase가 자동으로 UUID 생성
    const newProposal: Proposal = {
      id: '', // 임시 값 (Supabase가 생성한 ID로 교체됨)
      ...validatedData,
      status: 'generating',
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    let createdProposal: Proposal;

    try {
      // Supabase에 저장 (id는 자동 생성됨)
      // 여기서 제한 체크가 수행됨
      createdProposal = await createMutation.mutateAsync(newProposal);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('제안서 생성 오류:', err);
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류';

      // 제한 초과 에러인지 확인
      if (errorMessage.includes('제한')) {
        toast.error(errorMessage, {
          duration: 5000,
          icon: '⚠️',
        });
        return; // 제안서 생성 중단
      }

      // 기타 에러 처리
      toast.error('제안서 생성 중 오류가 발생했습니다.', {
        duration: 5000,
      });
      return;
    }

    // 제안서 생성 시작
    generateProposal(createdProposal.id, validatedData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        {view === 'dashboard' && (
          <>
            {isProposalsLoading ? (
              <ProposalDashboardSkeleton includeWrapper={false} />
            ) : (
              <DashboardView
                proposals={proposals}
                onCreateNew={() => {
                  setStep(1);
                  setView('form');
                }}
                onSelectProposal={proposal => {
                  setCurrentProposal(proposal);
                  setView('result');
                }}
                onDeleteProposal={proposal => {
                  setProposalToDelete(proposal);
                }}
              />
            )}
          </>
        )}
        {view === 'form' && (
          <>
            {formError ? (
              <div className="mx-auto max-w-3xl px-4 py-12">
                <div className="rounded-[2.5rem] border border-red-200 bg-red-50 p-8 text-center">
                  <h2 className="mb-2 text-xl font-bold text-red-600">오류가 발생했습니다</h2>
                  <p className="mb-4 text-gray-600">{formError}</p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setFormError(null);
                      setView('dashboard');
                    }}
                  >
                    대시보드로 돌아가기
                  </Button>
                </div>
              </div>
            ) : (
              <Suspense fallback={<ProposalDashboardSkeleton includeWrapper={false} />}>
                <FormView
                  step={step}
                  onStepChange={setStep}
                  onClose={() => {
                    setFormError(null);
                    setView('dashboard');
                  }}
                  onSubmit={async data => {
                    try {
                      await handleCreate(data);
                      setFormError(null);
                    } catch (error) {
                      // eslint-disable-next-line no-console
                      console.error('FormView 제출 오류:', error);
                      setFormError('제안서 생성 중 오류가 발생했습니다.');
                    }
                  }}
                />
              </Suspense>
            )}
          </>
        )}
        {view === 'result' && currentProposal && (
          <>
            {resultError ? (
              <div className="mx-auto max-w-5xl px-4 py-8">
                <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
                  <h2 className="mb-2 text-xl font-bold text-red-600">오류가 발생했습니다</h2>
                  <p className="mb-4 text-gray-600">{resultError}</p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setResultError(null);
                      setView('dashboard');
                    }}
                  >
                    대시보드로 돌아가기
                  </Button>
                </div>
              </div>
            ) : (
              <Suspense fallback={<ProposalDashboardSkeleton includeWrapper={false} />}>
                <ResultView
                  proposal={currentProposal}
                  onBack={() => {
                    setResultError(null);
                    setView('dashboard');
                  }}
                  onRegenerate={async (proposalId, data) => {
                    try {
                      await generateProposal(proposalId, data);
                      setResultError(null);
                    } catch (error) {
                      // eslint-disable-next-line no-console
                      console.error('제안서 재생성 오류:', error);
                      setResultError('제안서 재생성 중 오류가 발생했습니다.');
                    }
                  }}
                  onUpdate={async updatedProposal => {
                    try {
                      const saved = await updateMutation.mutateAsync(updatedProposal);
                      setCurrentProposal(saved);
                      setResultError(null);
                    } catch (error) {
                      // 에러는 이미 Mutation의 onError에서 처리됨
                      // eslint-disable-next-line no-console
                      console.error('제안서 업데이트 오류:', error);
                      setResultError('제안서 업데이트 중 오류가 발생했습니다.');
                    }
                  }}
                />
              </Suspense>
            )}
          </>
        )}
      </main>
      <GeneratingOverlay isGenerating={isGenerating} genStatus={genStatus} />

      {/* 제안서 삭제 확인 모달 */}
      <Modal
        isOpen={!!proposalToDelete}
        onClose={() => setProposalToDelete(null)}
        title="제안서 삭제"
        message={
          proposalToDelete
            ? `"${proposalToDelete.projectName || '무제 프로젝트'}" 제안서를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
            : ''
        }
        confirmText="삭제"
        cancelText="취소"
        variant="danger"
        onConfirm={() => {
          if (proposalToDelete) {
            deleteMutation.mutate(proposalToDelete.id);
          }
        }}
        onCancel={() => setProposalToDelete(null)}
      />
    </div>
  );
}
