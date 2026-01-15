'use client';

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import apiClient from '@/lib/axios/client';
import { ProposalRequest, ProposalResponse } from '@/types/gemini';
import { ProposalFormData, Proposal, ProposalStatus, GenerationStatus } from '@/types/proposal';
import { useProposalMutations } from './useProposalMutations';

interface UseGenerateProposalOptions {
  setIsGenerating: (value: boolean) => void;
  setGenStatus: (status: GenerationStatus) => void;
  setView: (view: 'dashboard' | 'form' | 'result') => void;
  setCurrentProposal: (proposal: Proposal) => void;
}

/**
 * 제안서 생성 로직을 관리하는 커스텀 훅
 * AI API를 호출하여 제안서를 생성하고 상태를 업데이트합니다.
 */
export function useGenerateProposal({
  setIsGenerating,
  setGenStatus,
  setView,
  setCurrentProposal,
}: UseGenerateProposalOptions) {
  const queryClient = useQueryClient();
  const { updateMutation } = useProposalMutations();

  const generateProposal = useCallback(
    async (proposalId: string, data: ProposalFormData) => {
      setIsGenerating(true);
      setGenStatus({ progress: 10, message: '미팅 전사록 분석 중...' });

      const updateProgress = async (progress: number, message: string) => {
        setGenStatus({ progress, message });
        try {
          // 현재 캐시에서 제안서 가져오기
          const cachedProposals = queryClient.getQueryData<Proposal[]>(['proposals']) || [];
          const currentProposal = cachedProposals.find(p => p.id === proposalId);
          if (currentProposal) {
            const updated = {
              ...currentProposal,
              progress,
              status: 'generating' as ProposalStatus,
            };
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
            apiError instanceof Error
              ? apiError.message
              : 'AI 서버와의 통신 중 오류가 발생했습니다.';
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

          // 캐시를 즉시 업데이트하여 대시보드에서 올바른 상태가 표시되도록 함
          const cachedProposals = queryClient.getQueryData<Proposal[]>(['proposals']) || [];
          const updatedProposals = cachedProposals.map(p =>
            p.id === proposalId ? completedProposal : p,
          );
          queryClient.setQueryData<Proposal[]>(['proposals'], updatedProposals);
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
    },
    [queryClient, updateMutation, setIsGenerating, setGenStatus, setView, setCurrentProposal],
  );

  return {
    generateProposal,
  };
}
