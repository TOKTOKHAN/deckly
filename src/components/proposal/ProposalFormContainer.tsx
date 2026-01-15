'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ProposalFormData, Proposal, GenerationStatus } from '@/types/proposal';
import { getProposals } from '@/lib/supabase/proposals';
import { useAuthStore } from '@/stores/authStore';
import { useProposalMutations } from '@/hooks/useProposalMutations';
import { useGenerateProposal } from '@/hooks/useGenerateProposal';
import ProposalFormView from './ProposalFormView';

export default function ProposalFormContainer() {
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

  // Mutation 훅 사용
  const { createMutation, updateMutation, deleteMutation } = useProposalMutations();

  // 제안서 생성 훅 사용
  const { generateProposal } = useGenerateProposal({
    setIsGenerating,
    setGenStatus,
    setView,
    setCurrentProposal,
  });

  // deleteMutation의 onSuccess에서 setProposalToDelete 호출을 위해 래퍼 추가
  const handleDeleteProposalMutation = useCallback(
    (proposalId: string) => {
      deleteMutation.mutate(proposalId, {
        onSuccess: () => {
          setProposalToDelete(null);
        },
        onError: () => {
          setProposalToDelete(null);
        },
      });
    },
    [deleteMutation],
  );

  const handleCreate = useCallback(
    async (data: ProposalFormData) => {
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
    },
    [createMutation, generateProposal],
  );

  // 핸들러들
  const handleCreateNew = useCallback(() => {
    setStep(1);
    setView('form');
  }, []);

  const handleSelectProposal = useCallback((proposal: Proposal) => {
    setCurrentProposal(proposal);
    setView('result');
  }, []);

  const handleDeleteProposal = useCallback((proposal: Proposal) => {
    setProposalToDelete(proposal);
  }, []);

  const handleCloseForm = useCallback(() => {
    setFormError(null);
    setView('dashboard');
  }, []);

  const handleSubmitForm = useCallback(
    async (data: ProposalFormData) => {
      try {
        await handleCreate(data);
        setFormError(null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('FormView 제출 오류:', error);
        setFormError('제안서 생성 중 오류가 발생했습니다.');
      }
    },
    [handleCreate],
  );

  const handleBackFromResult = useCallback(() => {
    setResultError(null);
    setView('dashboard');
  }, []);

  const handleRegenerate = useCallback(
    async (proposalId: string, data: ProposalFormData) => {
      try {
        await generateProposal(proposalId, data);
        setResultError(null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('제안서 재생성 오류:', error);
        setResultError('제안서 재생성 중 오류가 발생했습니다.');
      }
    },
    [generateProposal],
  );

  const handleUpdateProposal = useCallback(
    async (updatedProposal: Proposal) => {
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
    },
    [updateMutation],
  );

  const handleCloseDeleteModal = useCallback(() => {
    setProposalToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (proposalToDelete) {
      handleDeleteProposalMutation(proposalToDelete.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalToDelete]);

  return (
    <ProposalFormView
      view={view}
      proposals={proposals}
      currentProposal={currentProposal}
      step={step}
      isProposalsLoading={isProposalsLoading}
      isGenerating={isGenerating}
      genStatus={genStatus}
      proposalToDelete={proposalToDelete}
      formError={formError}
      resultError={resultError}
      onCreateNew={handleCreateNew}
      onSelectProposal={handleSelectProposal}
      onDeleteProposal={handleDeleteProposal}
      onStepChange={setStep}
      onCloseForm={handleCloseForm}
      onSubmitForm={handleSubmitForm}
      onBackFromResult={handleBackFromResult}
      onRegenerate={handleRegenerate}
      onUpdateProposal={handleUpdateProposal}
      onCloseDeleteModal={handleCloseDeleteModal}
      onConfirmDelete={handleConfirmDelete}
    />
  );
}
