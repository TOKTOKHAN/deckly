import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 * 제안서 생성 로직을 관리하는 커스텀 훅입니다.
 *
 * ## 사용법
 *
 * `useGenerateProposal` 훅은 AI API를 호출하여 제안서를 생성하는 로직을 제공합니다.
 *
 * ## 매개변수
 *
 * | 매개변수            | 타입                                    | 필수 | 설명                    |
 * | ------------------- | --------------------------------------- | ---- | ----------------------- |
 * | `setIsGenerating`   | `(value: boolean) => void`              | ✅   | 생성 중 상태 설정 함수   |
 * | `setGenStatus`      | `(status: GenerationStatus) => void`    | ✅   | 생성 진행 상태 설정 함수 |
 * | `setView`           | `(view: 'dashboard' | 'form' | 'result') => void` | ✅ | 뷰 상태 설정 함수 |
 * | `setCurrentProposal`| `(proposal: Proposal) => void`          | ✅   | 현재 제안서 설정 함수    |
 *
 * ## 반환값
 *
 * | 필드            | 타입                                    | 설명                    |
 * | --------------- | --------------------------------------- | ----------------------- |
 * | `generateProposal` | `(proposalId: string, data: ProposalFormData) => Promise<void>` | 제안서 생성 함수 |
 *
 * ## 동작 방식
 *
 * 1. **초기화**: 생성 중 상태를 `true`로 설정하고 진행률을 10%로 설정합니다.
 * 2. **진행 상태 업데이트**: 각 단계마다 진행률과 메시지를 업데이트합니다.
 *    - 30%: 제안서 구조 설계 중
 *    - 60%: AI가 상세 내용을 작성하는 중
 *    - 90%: 제안서 마무리 중
 * 3. **API 호출**: `/gemini` 엔드포인트에 POST 요청을 보냅니다.
 * 4. **결과 처리**:
 *    - 성공: 제안서를 Supabase에 저장하고 결과 뷰로 전환합니다.
 *    - 실패: 에러 상태를 저장하고 사용자에게 알립니다.
 * 5. **에러 처리**:
 *    - 제한 초과 에러: 특별한 경고 메시지를 표시합니다.
 *    - 기타 에러: 일반 에러 메시지를 표시합니다.
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { useGenerateProposal } from '@/hooks/useGenerateProposal';
 * import type { ProposalFormData } from '@/types/proposal';
 *
 * function ProposalForm() {
 *   const [isGenerating, setIsGenerating] = useState(false);
 *   const [genStatus, setGenStatus] = useState({ progress: 0, message: '' });
 *   const [view, setView] = useState<'dashboard' | 'form' | 'result'>('dashboard');
 *   const [currentProposal, setCurrentProposal] = useState<Proposal | null>(null);
 *
 *   const { generateProposal } = useGenerateProposal({
 *     setIsGenerating,
 *     setGenStatus,
 *     setView,
 *     setCurrentProposal,
 *   });
 *
 *   const handleSubmit = async (formData: ProposalFormData) => {
 *     // 먼저 제안서를 생성하고 ID를 받아옴
 *     const proposalId = '...'; // 생성된 제안서 ID
 *
 *     // 제안서 생성 시작
 *     await generateProposal(proposalId, formData);
 *   };
 *
 *   return (
 *     <div>
 *       {isGenerating && (
 *         <div>
 *           진행률: {genStatus.progress}% - {genStatus.message}
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * ## 특징
 *
 * - **진행 상태 추적**: 실시간으로 생성 진행 상태를 추적합니다.
 * - **자동 상태 업데이트**: 생성 중인 제안서의 진행 상태를 자동으로 업데이트합니다.
 * - **에러 처리**: 다양한 에러 상황을 처리하고 사용자에게 알립니다.
 * - **제한 체크**: 제한 초과 에러를 감지하고 특별히 처리합니다.
 *
 * ## 주의사항
 *
 * - 이 훅은 React Query와 `useProposalMutations`에 의존합니다.
 * - 실제 AI API 호출이 발생하므로 네트워크 상태를 고려해야 합니다.
 * - 제한 초과 에러가 발생할 수 있으므로 적절한 에러 처리가 필요합니다.
 * - `proposalId`는 먼저 생성되어 있어야 합니다.
 */
const meta = {
  title: 'Hooks/useGenerateProposal',
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
