'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import apiClient from '@/lib/axios/client';
import { Proposal } from '@/types/proposal';
import { updateProposal, deleteProposal } from '@/lib/supabase/proposals';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';

/**
 * 제안서 관련 Mutation들을 관리하는 커스텀 훅
 * - createMutation: 새 제안서 생성 (API 호출)
 * - updateMutation: 제안서 업데이트
 * - deleteMutation: 제안서 삭제
 */
export function useProposalMutations() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  // 제안서 생성 Mutation (API 호출)
  const createMutation = useMutation({
    mutationFn: async (proposal: Proposal) => {
      if (!supabase) {
        throw new Error('Supabase가 설정되지 않았습니다.');
      }

      // Supabase 세션 토큰 가져오기
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error('로그인이 필요합니다.');
      }

      // API 호출
      const response = await apiClient.post<Proposal>('/proposals', proposal, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      // 제안서 목록 자동 리프레시
      queryClient.invalidateQueries({ queryKey: ['proposals', user?.id] });
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
      queryClient.invalidateQueries({ queryKey: ['proposals', user?.id] });
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
    },
    onError: (error: Error) => {
      toast.error(error.message || '제안서 삭제 중 오류가 발생했습니다.');
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
