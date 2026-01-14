import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 관리자용 사용자 관리 함수입니다.
 *
 * ## 인터페이스
 *
 * - `UserWithStats`: 사용자 정보와 제안서 수를 포함하는 인터페이스
 * - `UserStats`: 전체 사용자 통계 인터페이스
 *
 * ## UserWithStats
 *
 * 사용자 정보와 통계 인터페이스입니다.
 *
 * | 필드            | 타입     | 설명                    |
 * | --------------- | -------- | ----------------------- |
 * | `id`            | `string` | 사용자 ID                |
 * | `email`         | `string \| null` | 이메일           |
 * | `phone`         | `string \| null` | 전화번호           |
 * | `createdAt`     | `string` | 계정 생성일             |
 * | `lastSignInAt`  | `string \| null` | 마지막 로그인 일시 |
 * | `emailConfirmed` | `boolean` | 이메일 인증 여부    |
 * | `phoneConfirmed` | `boolean` | 전화번호 인증 여부  |
 * | `userMetadata`  | `Record<string, unknown> \| null` | 사용자 메타데이터 |
 * | `proposalCount` | `number` | 제안서 개수            |
 *
 * ## UserStats
 *
 * 전체 사용자 통계 인터페이스입니다.
 *
 * | 필드                    | 타입     | 설명                    |
 * | ----------------------- | -------- | ----------------------- |
 * | `totalUsers`            | `number` | 전체 사용자 수          |
 * | `activeUsers`           | `number` | 최근 30일 내 로그인한 사용자 수 |
 * | `totalProposals`        | `number` | 전체 제안서 수          |
 * | `averageProposalsPerUser` | `number` | 사용자당 평균 제안서 수 |
 *
 * ## 함수 목록
 *
 * - `getAllUsersWithProposalCount`: 모든 사용자 목록 조회 (제안서 수 포함)
 * - `getUserStats`: 특정 사용자의 통계 조회
 * - `getUsersStats`: 전체 사용자 통계 조회
 *
 * ## getAllUsersWithProposalCount
 *
 * 모든 사용자 목록을 조회합니다. 각 사용자의 제안서 수도 함께 조회합니다.
 *
 * ### 반환값
 *
 * `Promise<UserWithStats[]>` - 사용자 정보와 제안서 수 배열
 *
 * ### 동작
 *
 * - 최대 1000명까지 조회 (Supabase Admin API 제한)
 * - 각 사용자의 제안서 수를 별도로 조회
 * - 제안서 수 조회 실패 시 0으로 설정
 *
 * ## getUserStats
 *
 * 특정 사용자의 통계를 조회합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `userId` | `string` | ✅   | 사용자 ID  |
 *
 * ### 반환값
 *
 * `Promise<{ proposalCount: number; completedProposals: number; errorProposals: number; draftProposals: number }>`
 *
 * 반환 객체 필드:
 *
 * | 필드              | 타입     | 설명           |
 * | ----------------- | -------- | -------------- |
 * | `proposalCount`   | `number` | 전체 제안서 수 |
 * | `completedProposals` | `number` | 완료된 제안서 수 |
 * | `errorProposals`  | `number` | 에러 발생 제안서 수 |
 * | `draftProposals`  | `number` | 초안 제안서 수 |
 *
 * ## getUsersStats
 *
 * 전체 사용자 통계를 조회합니다.
 *
 * ### 반환값
 *
 * `Promise<UserStats>` - 전체 사용자 통계
 *
 * ### 포함 데이터
 *
 * - 전체 사용자 수
 * - 최근 30일 내 로그인한 사용자 수 (activeUsers)
 * - 전체 제안서 수
 * - 사용자당 평균 제안서 수 (소수점 2자리)
 *
 * ## 주의사항
 *
 * - 모든 함수는 관리자 클라이언트가 필요합니다.
 * - Service Role Key가 설정되지 않으면 에러를 throw합니다.
 * - getAllUsersWithProposalCount는 최대 1000명까지 조회합니다.
 * - 제안서 수 조회 실패 시에도 사용자 정보는 반환됩니다 (proposalCount = 0).
 * - activeUsers는 최근 30일 내 last_sign_in_at이 있는 사용자를 기준으로 계산합니다.
 */
const meta = {
  title: 'Lib/Supabase/Admin/users',
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
