import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 사용자 제안서 생성 제한 관리 함수입니다.
 *
 * ## 함수 목록
 *
 * - `getUserTotalLimit`: 사용자의 개별 제한 조회
 * - `getDefaultLimit`: 기본 제한값 조회
 * - `getEffectiveLimit`: 유효한 제한 조회 (개별 > 기본값 > 무제한)
 * - `getUserProposalCount`: 사용자의 현재 제안서 개수 조회
 * - `setUserLimit`: 사용자 제한 설정
 * - `setDefaultLimit`: 기본 제한값 설정
 * - `getAllUserLimits`: 모든 사용자의 제한 정보 조회
 *
 * ## getUserTotalLimit
 *
 * 사용자의 개별 제한을 조회합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `userId` | `string` | ✅   | 사용자 ID  |
 *
 * ### 반환값
 *
 * `Promise<number | null>` - 제한 개수 (null이면 무제한)
 *
 * ## getDefaultLimit
 *
 * 기본 제한값을 조회합니다.
 *
 * ### 반환값
 *
 * `Promise<number | null>` - 기본 제한 개수 (null이면 무제한)
 *
 * ## getEffectiveLimit
 *
 * 사용자의 유효한 제한을 조회합니다. 우선순위: 개별 제한 > 기본값 > 무제한
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `userId` | `string` | ✅   | 사용자 ID  |
 *
 * ### 반환값
 *
 * `Promise<number | null>` - 유효한 제한 개수 (null이면 무제한)
 *
 * ## getUserProposalCount
 *
 * 사용자의 현재 제안서 총 개수를 조회합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `userId` | `string` | ✅   | 사용자 ID  |
 *
 * ### 반환값
 *
 * `Promise<number>` - 제안서 개수
 *
 * ## setUserLimit
 *
 * 사용자의 제한을 설정합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입           | 필수 | 설명                    |
 * | -------- | -------------- | ---- | ----------------------- |
 * | `userId` | `string`       | ✅   | 사용자 ID               |
 * | `limit`  | `number | null` | ✅   | 제한 개수 (null이면 무제한) |
 *
 * ### 반환값
 *
 * `Promise<void>`
 *
 * ## setDefaultLimit
 *
 * 기본 제한값을 설정합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입           | 필수 | 설명                    |
 * | -------- | -------------- | ---- | ----------------------- |
 * | `limit`  | `number | null` | ✅   | 기본 제한 개수 (null이면 무제한) |
 *
 * ### 반환값
 *
 * `Promise<void>`
 *
 * ## getAllUserLimits
 *
 * 모든 사용자의 제한 정보를 조회합니다.
 *
 * ### 반환값
 *
 * `Promise<Array<{ userId: string; limit: number | null; currentCount: number; remaining: number | null; effectiveLimit: number | null }>>`
 *
 * 반환 객체 필드:
 *
 * | 필드            | 타입           | 설명                    |
 * | --------------- | -------------- | ----------------------- |
 * | `userId`        | `string`       | 사용자 ID               |
 * | `limit`         | `number | null` | 개별 설정값            |
 * | `currentCount`  | `number`       | 현재 제안서 개수        |
 * | `remaining`     | `number | null` | 남은 제한 (null이면 무제한) |
 * | `effectiveLimit` | `number | null` | 유효한 제한 (개별 또는 기본값) |
 *
 * ## 주의사항
 *
 * - 모든 함수는 관리자 클라이언트가 필요합니다.
 * - Service Role Key가 설정되지 않으면 에러를 throw합니다.
 * - 제한이 null이면 무제한으로 간주됩니다.
 * - getEffectiveLimit은 개별 제한이 있으면 우선 사용하고, 없으면 기본값을 사용합니다.
 * - setUserLimit은 기존 레코드가 있으면 업데이트, 없으면 삽입합니다.
 */
const meta = {
  title: 'Lib/Supabase/Admin/userLimits',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Supabase 함수 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Supabase 함수만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
