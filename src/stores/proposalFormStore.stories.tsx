import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 제안서 폼 상태를 관리하는 Zustand Store입니다.
 *
 * ## 사용법
 *
 * `useProposalFormStore`는 제안서 생성 및 관리와 관련된 모든 상태를 중앙에서 관리합니다.
 * 컴포넌트 간 Props Drilling을 제거하고 상태를 공유할 수 있습니다.
 *
 * ## 상태 (State)
 *
 * | 상태                | 타입                                    | 기본값              | 설명                    |
 * | ------------------- | --------------------------------------- | ------------------- | ----------------------- |
 * | `view`              | `'dashboard' \| 'form' \| 'result'`     | `'dashboard'`      | 현재 표시할 뷰          |
 * | `step`              | `number`                                 | `1`                 | 폼의 현재 단계 (1 또는 2) |
 * | `currentProposal`   | `Proposal \| null`                       | `null`              | 현재 선택된 제안서      |
 * | `proposalToDelete`  | `Proposal \| null`                       | `null`              | 삭제할 제안서           |
 * | `isGenerating`      | `boolean`                                | `false`             | 제안서 생성 중 여부     |
 * | `genStatus`         | `GenerationStatus`                       | `{ progress: 0, message: '' }` | 생성 진행 상태 |
 * | `formError`         | `string \| null`                         | `null`              | 폼 관련 에러 메시지     |
 * | `resultError`       | `string \| null`                         | `null`              | 결과 뷰 관련 에러 메시지 |
 *
 * ## 액션 (Actions)
 *
 * ### 기본 액션
 *
 * | 액션                | 타입                                    | 설명                    |
 * | ------------------- | --------------------------------------- | ----------------------- |
 * | `setView`           | `(view: 'dashboard' \| 'form' \| 'result') => void` | 뷰 변경 |
 * | `setStep`           | `(step: number) => void`                | 폼 단계 변경            |
 * | `setCurrentProposal` | `(proposal: Proposal \| null) => void`  | 현재 제안서 설정        |
 * | `setProposalToDelete` | `(proposal: Proposal \| null) => void` | 삭제할 제안서 설정      |
 * | `setIsGenerating`   | `(isGenerating: boolean) => void`        | 생성 중 상태 변경       |
 * | `setGenStatus`      | `(genStatus: GenerationStatus) => void` | 생성 진행 상태 변경     |
 * | `setFormError`      | `(error: string \| null) => void`       | 폼 에러 설정            |
 * | `setResultError`    | `(error: string \| null) => void`       | 결과 에러 설정          |
 *
 * ### 복합 액션
 *
 * | 액션            | 설명                                    |
 * | --------------- | --------------------------------------- |
 * | `createNew`      | 새 제안서 생성 시작 (step=1, view='form', formError=null) |
 * | `closeForm`      | 폼 닫기 (view='dashboard', formError=null) |
 * | `backFromResult` | 결과 뷰에서 대시보드로 돌아가기 (view='dashboard', resultError=null) |
 * | `reset`          | 모든 상태를 초기값으로 리셋             |
 *
 * ## 사용 예시
 *
 * ### 기본 사용법
 *
 * ```tsx
 * import { useProposalFormStore } from '@/stores/proposalFormStore';
 *
 * function MyComponent() {
 *   // 상태 가져오기
 *   const view = useProposalFormStore(state => state.view);
 *   const step = useProposalFormStore(state => state.step);
 *
 *   // 액션 가져오기
 *   const setView = useProposalFormStore(state => state.setView);
 *   const createNew = useProposalFormStore(state => state.createNew);
 *
 *   return (
 *     <div>
 *       <p>현재 뷰: {view}</p>
 *       <p>현재 단계: {step}</p>
 *       <button onClick={() => createNew()}>새 제안서 만들기</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * ### 선택적 상태 가져오기
 *
 * ```tsx
 * // 필요한 상태만 선택적으로 가져오기 (성능 최적화)
 * const view = useProposalFormStore(state => state.view);
 * const isGenerating = useProposalFormStore(state => state.isGenerating);
 *
 * // 여러 상태를 한 번에 가져오기
 * const { view, step, currentProposal } = useProposalFormStore();
 * ```
 *
 * ### 복합 액션 사용
 *
 * ```tsx
 * function DashboardButton() {
 *   const createNew = useProposalFormStore(state => state.createNew);
 *
 *   return (
 *     <button onClick={createNew}>
 *       새 제안서 만들기
 *     </button>
 *   );
 * }
 *
 * function FormCloseButton() {
 *   const closeForm = useProposalFormStore(state => state.closeForm);
 *
 *   return (
 *     <button onClick={closeForm}>
 *       닫기
 *     </button>
 *   );
 * }
 * ```
 *
 * ## 상태 업데이트 흐름
 *
 * 1. **제안서 생성 시작**: `createNew()` → `view='form'`, `step=1`
 * 2. **제안서 생성 중**: `setIsGenerating(true)`, `setGenStatus({ progress, message })`
 * 3. **제안서 생성 완료**: `setIsGenerating(false)`, `setView('result')`, `setCurrentProposal(proposal)`
 * 4. **대시보드로 돌아가기**: `backFromResult()` 또는 `closeForm()`
 *
 * ## 특징
 *
 * - **Props Drilling 제거**: 컴포넌트 간 상태 공유가 쉬워집니다.
 * - **선택적 구독**: 필요한 상태만 구독하여 불필요한 리렌더링을 방지합니다.
 * - **타입 안정성**: TypeScript로 모든 상태와 액션이 타입 안전합니다.
 * - **중앙 집중식 관리**: 모든 제안서 관련 상태가 한 곳에서 관리됩니다.
 *
 * ## 주의사항
 *
 * - 이 Store는 클라이언트 전용입니다 (`'use client'` 지시어 포함).
 * - 서버 컴포넌트에서는 사용할 수 없습니다.
 * - 상태는 브라우저 세션 동안 유지되며, 페이지 새로고침 시 초기화됩니다.
 * - 여러 컴포넌트에서 동시에 상태를 업데이트할 수 있으므로 주의가 필요합니다.
 */
const meta = {
  title: 'Stores/proposalFormStore',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Store 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Zustand Store만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
