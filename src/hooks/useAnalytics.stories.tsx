import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * Analytics 데이터를 가져오고 처리하는 커스텀 훅입니다.
 *
 * ## 사용법
 *
 * `useAnalytics` 훅은 날짜 간격(`DateInterval`)을 받아서 해당 기간의 분석 데이터를 가져오고 처리합니다.
 *
 * ## 매개변수
 *
 * | 매개변수   | 타입          | 필수 | 설명                    |
 * | ---------- | ------------- | ---- | ----------------------- |
 * | `interval` | `DateInterval` | ✅   | 날짜 간격 ('day', 'week', 'month') |
 *
 * ## 반환값
 *
 * `UseAnalyticsResult` 인터페이스를 반환합니다:
 *
 * | 필드            | 타입                                    | 설명                    |
 * | --------------- | --------------------------------------- | ----------------------- |
 * | `stats`         | `ProposalStatsByDate[] \| undefined`     | 날짜별 제안서 통계 데이터 |
 * | `statistics`    | `ReturnType<typeof calculateStatistics>` | 계산된 통계 정보        |
 * | `visitorAxisRange` | `ReturnType<typeof calculateVisitorAxisRange>` | 방문자 수 Y축 범위 |
 * | `isLoading`     | `boolean`                                | 로딩 중 여부            |
 * | `error`         | `Error \| null`                          | 에러 객체               |
 * | `refetch`       | `() => void`                            | 데이터 재요청 함수      |
 *
 * ## 동작 방식
 *
 * 1. **날짜 범위 계산**: `interval`에 따라 시작일과 종료일을 계산합니다.
 * 2. **데이터 Fetching**: React Query를 사용하여 분석 데이터를 가져옵니다.
 * 3. **주간 필터 처리**: `interval`이 'week'인 경우 월요일부터 일요일까지 7일 모두 채웁니다.
 * 4. **통계 계산**: 가져온 데이터를 기반으로 통계를 계산합니다.
 * 5. **자동 갱신**: 1분마다 자동으로 데이터를 갱신합니다.
 *
 * ## 특징
 *
 * - **자동 갱신**: 날짜가 바뀌면 자동으로 새로 fetch합니다.
 * - **주간 데이터 보완**: 주간 필터일 때 빈 날짜를 채웁니다.
 * - **통계 자동 계산**: 통계 정보를 자동으로 계산합니다.
 * - **에러 처리**: 에러 발생 시 에러 객체를 반환합니다.
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { useAnalytics } from '@/hooks/useAnalytics';
 *
 * function AnalyticsDashboard() {
 *   const { stats, statistics, isLoading, error, refetch } = useAnalytics('week');
 *
 *   if (isLoading) {
 *     return <div>로딩 중...</div>;
 *   }
 *
 *   if (error) {
 *     return <div>에러: {error.message}</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h2>주간 통계</h2>
 *       <p>총 제안서: {statistics.totalProposals}</p>
 *       <p>총 방문자: {statistics.totalVisitors}</p>
 *       <button onClick={refetch}>새로고침</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * ## DateInterval 타입
 *
 * `DateInterval`은 다음 중 하나입니다:
 *
 * - `'day'`: 일별 통계
 * - `'week'`: 주별 통계
 * - `'month'`: 월별 통계
 *
 * ## 주의사항
 *
 * - 이 훅은 React Query에 의존합니다.
 * - `fetchAnalyticsStats` API 함수가 필요합니다.
 * - 날짜가 바뀌면 자동으로 새로 fetch하므로, queryKey에 오늘 날짜를 포함합니다.
 * - `staleTime`이 0으로 설정되어 있어 항상 최신 데이터를 가져옵니다.
 */
const meta = {
  title: 'Hooks/useAnalytics',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 훅 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 커스텀 훅만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
