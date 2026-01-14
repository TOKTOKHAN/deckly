import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 관리자용 제안서 조회 함수입니다. 모든 사용자의 제안서를 조회할 수 있습니다.
 *
 * ## 인터페이스
 *
 * - `ProposalWithUser`: 제안서와 사용자 정보를 포함하는 인터페이스
 *
 * ## ProposalWithUser
 *
 * 제안서와 사용자 정보 인터페이스입니다.
 *
 * | 필드        | 타입      | 설명           |
 * | ----------- | --------- | -------------- |
 * | `proposal`  | `Proposal` | 제안서 데이터  |
 * | `userEmail` | `string \| null` | 사용자 이메일 |
 * | `userId`    | `string`   | 사용자 ID      |
 *
 * ## 함수 목록
 *
 * - `getAllProposals`: 모든 제안서 조회 (필터링, 정렬, 페이지네이션 지원)
 * - `getProposalsByUser`: 특정 사용자의 제안서 조회
 * - `getProposalsByStatus`: 상태별 제안서 조회
 * - `getProposalsCount`: 제안서 총 개수 조회
 * - `getErrorProposals`: 에러가 발생한 제안서 조회
 *
 * ## getAllProposals
 *
 * 모든 제안서를 조회합니다. 필터링, 정렬, 페이지네이션을 지원합니다.
 *
 * ### 매개변수
 *
 * | 매개변수           | 타입          | 필수 | 설명                    |
 * | ------------------ | ------------- | ---- | ----------------------- |
 * | `options`          | `object`      | ❌   | 필터링 옵션             |
 * | `options.status`   | `ProposalStatus` | ❌   | 상태 필터              |
 * | `options.userId`   | `string`      | ❌   | 사용자 ID 필터         |
 * | `options.clientCompanyName` | `string` | ❌   | 클라이언트사 필터      |
 * | `options.limit`    | `number`      | ❌   | 조회 개수 제한         |
 * | `options.offset`   | `number`      | ❌   | 오프셋                 |
 * | `options.orderBy` | `'created_at' \| 'updated_at'` | ❌   | 정렬 기준 (기본값: 'created_at') |
 * | `options.orderDirection` | `'asc' \| 'desc'` | ❌   | 정렬 방향 (기본값: 'desc') |
 *
 * ### 반환값
 *
 * `Promise<ProposalWithUser[]>` - 제안서와 사용자 정보 배열
 *
 * ## getProposalsByUser
 *
 * 특정 사용자의 제안서를 조회합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `userId` | `string` | ✅   | 사용자 ID  |
 *
 * ### 반환값
 *
 * `Promise<Proposal[]>` - 제안서 배열
 *
 * ## getProposalsByStatus
 *
 * 상태별 제안서를 조회합니다.
 *
 * ### 매개변수
 *
 * | 매개변수   | 타입          | 필수 | 설명      |
 * | ---------- | ------------- | ---- | --------- |
 * | `status`   | `ProposalStatus` | ✅   | 제안서 상태 |
 *
 * ### 반환값
 *
 * `Promise<ProposalWithUser[]>` - 제안서와 사용자 정보 배열
 *
 * ## getProposalsCount
 *
 * 제안서 총 개수를 조회합니다.
 *
 * ### 매개변수
 *
 * | 매개변수           | 타입          | 필수 | 설명           |
 * | ------------------ | ------------- | ---- | -------------- |
 * | `options`          | `object`      | ❌   | 필터링 옵션    |
 * | `options.status`   | `ProposalStatus` | ❌   | 상태 필터     |
 * | `options.userId`   | `string`      | ❌   | 사용자 ID 필터 |
 * | `options.clientCompanyName` | `string` | ❌   | 클라이언트사 필터 |
 *
 * ### 반환값
 *
 * `Promise<number>` - 제안서 개수
 *
 * ## getErrorProposals
 *
 * 에러가 발생한 제안서를 조회합니다.
 *
 * ### 반환값
 *
 * `Promise<ProposalWithUser[]>` - 에러 제안서와 사용자 정보 배열
 *
 * ## 주의사항
 *
 * - 모든 함수는 관리자 클라이언트가 필요합니다.
 * - Service Role Key가 설정되지 않으면 에러를 throw합니다.
 * - getAllProposals는 성능 최적화를 위해 대용량 필드(content, meeting_notes)를 제외합니다.
 * - 사용자 이메일은 auth.admin.getUserById로 조회하며, 실패 시 null을 반환합니다.
 */
const meta = {
  title: 'Lib/Supabase/Admin/proposals',
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
