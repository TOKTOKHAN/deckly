import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 제안서 생성 제한 체크 유틸리티 함수입니다.
 *
 * ## 함수 목록
 *
 * - `checkProposalTotalLimit`: 사용자의 제안서 생성 제한 체크
 *
 * ## checkProposalTotalLimit
 *
 * 사용자의 제안서 생성 제한을 확인합니다. 제한을 초과하면 에러를 throw합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `userId` | `string` | ✅   | 사용자 ID  |
 *
 * ### 반환값
 *
 * `Promise<void>` - 제한을 초과하지 않으면 성공
 *
 * ### 동작 방식
 *
 * 1. 사용자의 유효한 제한 조회 (개별 제한 또는 기본값)
 * 2. 제한이 없으면(`null`) 통과
 * 3. 현재 사용자의 총 제안서 개수 조회
 * 4. 제한 초과 체크 및 에러 throw
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { checkProposalTotalLimit } from '@/lib/utils/proposalLimits';
 *
 * async function createProposal(userId: string) {
 *   try {
 *     // 제한 체크
 *     await checkProposalTotalLimit(userId);
 *
 *     // 제한을 초과하지 않으면 제안서 생성 진행
 *     // ...
 *   } catch (error) {
 *     if (error instanceof Error) {
 *       console.error(error.message);
 *       // "제안서 생성 제한(10개)에 도달했습니다."
 *     }
 *   }
 * }
 * ```
 *
 * ### 에러 처리
 *
 * 제한을 초과하면 에러를 throw합니다:
 *
 * ```tsx
 * try {
 *   await checkProposalTotalLimit(userId);
 * } catch (error) {
 *   if (error instanceof Error && error.message.includes('제한')) {
 *     // 제한 초과 에러 처리
 *     alert(error.message);
 *   }
 * }
 * ```
 *
 * ## 주의사항
 *
 * - 이 함수는 비동기 함수입니다 (`async`).
 * - 제한이 `null`이면 무제한으로 간주되어 통과합니다.
 * - 제한 초과 시 명확한 에러 메시지를 throw합니다.
 * - `getEffectiveLimit`과 `getUserProposalCount` 함수에 의존합니다.
 */
const meta = {
  title: 'Lib/Utils/proposalLimits',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 유틸리티 함수 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 유틸리티 함수만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
