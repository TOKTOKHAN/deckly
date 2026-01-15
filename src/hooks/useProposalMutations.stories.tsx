import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 * 제안서 관련 Mutation들을 관리하는 커스텀 훅입니다.
 *
 * ## 사용법
 *
 * `useProposalMutations` 훅은 제안서 생성, 업데이트, 삭제를 위한 Mutation들을 제공합니다.
 *
 * ## 반환값
 *
 * 다음 세 가지 Mutation을 반환합니다:
 *
 * | 필드            | 타입                                    | 설명                    |
 * | --------------- | --------------------------------------- | ----------------------- |
 * | `createMutation` | `UseMutationResult<Proposal, Error>`     | 새 제안서 생성 (API 호출) |
 * | `updateMutation` | `UseMutationResult<Proposal, Error>`     | 제안서 업데이트         |
 * | `deleteMutation` | `UseMutationResult<void, Error>`         | 제안서 삭제             |
 *
 * ## 동작 방식
 *
 * ### createMutation
 * 1. Supabase 세션 토큰을 가져옵니다.
 * 2. `/proposals` API 엔드포인트에 POST 요청을 보냅니다.
 * 3. 성공 시 제안서 목록을 자동으로 리프레시합니다.
 * 4. 실패 시 에러 메시지를 토스트로 표시합니다.
 *
 * ### updateMutation
 * 1. `updateProposal` 함수를 호출하여 제안서를 업데이트합니다.
 * 2. 성공 시 제안서 목록을 자동으로 리프레시합니다.
 * 3. 실패 시 에러 메시지를 토스트로 표시합니다.
 *
 * ### deleteMutation
 * 1. `deleteProposal` 함수를 호출하여 제안서를 삭제합니다.
 * 2. 성공 시 제안서 목록을 자동으로 리프레시하고 성공 메시지를 표시합니다.
 * 3. 실패 시 에러 메시지를 토스트로 표시합니다.
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { useProposalMutations } from '@/hooks/useProposalMutations';
 * import type { Proposal } from '@/types/proposal';
 *
 * function ProposalManager() {
 *   const { createMutation, updateMutation, deleteMutation } = useProposalMutations();
 *
 *   const handleCreate = async () => {
 *     try {
 *       const newProposal: Proposal = {
 *         id: '',
 *         status: 'generating',
 *         // ... 기타 필드
 *       };
 *       const created = await createMutation.mutateAsync(newProposal);
 *       console.log('생성된 제안서:', created);
 *     } catch (error) {
 *       console.error('생성 실패:', error);
 *     }
 *   };
 *
 *   const handleUpdate = async (proposal: Proposal) => {
 *     try {
 *       await updateMutation.mutateAsync(proposal);
 *     } catch (error) {
 *       console.error('업데이트 실패:', error);
 *     }
 *   };
 *
 *   const handleDelete = async (proposalId: string) => {
 *     try {
 *       await deleteMutation.mutateAsync(proposalId);
 *     } catch (error) {
 *       console.error('삭제 실패:', error);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleCreate}>생성</button>
 *       <button onClick={() => handleUpdate(proposal)}>업데이트</button>
 *       <button onClick={() => handleDelete(proposalId)}>삭제</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * ## 특징
 *
 * - **자동 리프레시**: 모든 Mutation 성공 시 제안서 목록을 자동으로 리프레시합니다.
 * - **에러 처리**: 각 Mutation의 에러를 자동으로 처리하고 사용자에게 알립니다.
 * - **토스트 알림**: 성공/실패 시 적절한 토스트 메시지를 표시합니다.
 *
 * ## 주의사항
 *
 * - 이 훅은 React Query에 의존합니다.
 * - `createMutation`은 Supabase 인증이 필요합니다.
 * - 실제 API 호출이 발생하므로 네트워크 상태를 고려해야 합니다.
 */
const meta = {
  title: 'Hooks/useProposalMutations',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 훅 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 커스텀 훅만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
