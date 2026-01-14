import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * Analytics API 호출 함수입니다.
 *
 * ## 함수 목록
 *
 * - `fetchAnalyticsStats`: 통계 데이터 조회 함수
 *
 * ## fetchAnalyticsStats
 *
 * 날짜 범위와 간격을 받아서 제안서 통계 데이터를 가져옵니다.
 *
 * ### 매개변수
 *
 * | 매개변수   | 타입          | 필수 | 설명                    |
 * | ---------- | ------------- | ---- | ----------------------- |
 * | `start`    | `string`      | ✅   | 시작일 (ISO string)     |
 * | `end`      | `string`      | ✅   | 종료일 (ISO string)     |
 * | `interval` | `DateInterval` | ✅   | 날짜 간격 ('week', 'month', 'year') |
 *
 * ### 반환값
 *
 * `Promise<ProposalStatsByDate[]>` - 날짜별 제안서 통계 데이터 배열
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { fetchAnalyticsStats } from '@/lib/api/analytics';
 *
 * async function loadStats() {
 *   try {
 *     const stats = await fetchAnalyticsStats(
 *       '2024-01-01T00:00:00Z',
 *       '2024-01-31T23:59:59Z',
 *       'month'
 *     );
 *
 *     console.log('통계 데이터:', stats);
 *   } catch (error) {
 *     console.error('통계 로드 실패:', error);
 *   }
 * }
 * ```
 *
 * ### 에러 처리
 *
 * API 호출이 실패하면 에러를 throw합니다:
 *
 * ```tsx
 * try {
 *   const stats = await fetchAnalyticsStats(start, end, interval);
 * } catch (error) {
 *   // 에러 메시지: error.message
 *   console.error(error.message);
 * }
 * ```
 *
 * ## 주의사항
 *
 * - 이 함수는 `/api/admin/analytics/stats` 엔드포인트를 호출합니다.
 * - 관리자 권한이 필요할 수 있습니다.
 * - 날짜는 ISO string 형식이어야 합니다.
 */
const meta = {
  title: 'Lib/API/analytics',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// API 함수 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 API 함수만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
