import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 통계 계산 및 데이터 처리 유틸리티 함수입니다.
 *
 * ## 함수 목록
 *
 * - `fillWeekDays`: 주간 필터일 때 월요일부터 일요일까지 7일 모두 채우기
 * - `calculateStatistics`: 통계 집계 계산
 * - `calculateVisitorAxisRange`: 방문자 수 Y축 범위 계산
 *
 * ## fillWeekDays
 *
 * 주간 필터일 때 월요일부터 일요일까지 7일 모두 채웁니다. 데이터가 없는 날짜는 0으로 채웁니다.
 *
 * ### 매개변수
 *
 * | 매개변수   | 타입                        | 필수 | 설명                    |
 * | ---------- | --------------------------- | ---- | ----------------------- |
 * | `rawStats` | `ProposalStatsByDate[] \| undefined` | ✅   | 원본 통계 데이터        |
 *
 * ### 반환값
 *
 * `ProposalStatsByDate[]` - 7일 모두 채워진 통계 데이터 배열
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { fillWeekDays } from '@/lib/utils/analytics';
 *
 * const rawStats = [
 *   { date: '2024-01-01', count: 5, completed: 4, error: 1, visitors: 10 },
 *   { date: '2024-01-03', count: 3, completed: 3, error: 0, visitors: 8 },
 * ];
 *
 * const weekStats = fillWeekDays(rawStats);
 * // 월요일부터 일요일까지 7일 모두 포함된 배열 반환
 * ```
 *
 * ## calculateStatistics
 *
 * 통계 데이터를 집계하여 총합과 비율을 계산합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입                        | 필수 | 설명           |
 * | -------- | --------------------------- | ---- | -------------- |
 * | `stats`  | `ProposalStatsByDate[] \| undefined` | ✅   | 통계 데이터 배열 |
 *
 * ### 반환값
 *
 * `StatisticsSummary` 인터페이스:
 *
 * | 필드            | 타입     | 설명                    |
 * | --------------- | -------- | ----------------------- |
 * | `totalVisitors` | `number` | 총 방문자 수            |
 * | `totalCreated`  | `number` | 총 생성된 제안서 수     |
 * | `totalCompleted` | `number` | 총 완료된 제안서 수     |
 * | `totalErrors`   | `number` | 총 에러 발생 수         |
 * | `successRate`   | `string` | 성공률 (퍼센트, 소수점 1자리) |
 * | `errorRate`     | `string` | 에러율 (퍼센트, 소수점 1자리) |
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { calculateStatistics } from '@/lib/utils/analytics';
 *
 * const stats = [
 *   { date: '2024-01-01', count: 10, completed: 8, error: 2, visitors: 20 },
 *   { date: '2024-01-02', count: 5, completed: 5, error: 0, visitors: 15 },
 * ];
 *
 * const statistics = calculateStatistics(stats);
 * // {
 * //   totalVisitors: 35,
 * //   totalCreated: 15,
 * //   totalCompleted: 13,
 * //   totalErrors: 2,
 * //   successRate: '86.7',
 * //   errorRate: '13.3'
 * // }
 * ```
 *
 * ## calculateVisitorAxisRange
 *
 * 방문자 수 차트의 Y축 범위를 계산합니다. 데이터가 있으면 최소값의 80%부터 시작합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입                        | 필수 | 설명           |
 * | -------- | --------------------------- | ---- | -------------- |
 * | `stats`  | `ProposalStatsByDate[] \| undefined` | ✅   | 통계 데이터 배열 |
 *
 * ### 반환값
 *
 * `VisitorAxisRange` 인터페이스:
 *
 * | 필드 | 타입     | 설명           |
 * | ---- | -------- | -------------- |
 * | `min` | `number` | Y축 최소값     |
 * | `max` | `number` | Y축 최대값     |
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { calculateVisitorAxisRange } from '@/lib/utils/analytics';
 *
 * const stats = [
 *   { date: '2024-01-01', visitors: 100 },
 *   { date: '2024-01-02', visitors: 150 },
 *   { date: '2024-01-03', visitors: 120 },
 * ];
 *
 * const range = calculateVisitorAxisRange(stats);
 * // { min: 80, max: 165 } (최소값 100의 80% = 80, 최대값 150의 110% = 165)
 * ```
 *
 * ## 주의사항
 *
 * - `fillWeekDays`는 UTC 기준으로 날짜를 계산합니다.
 * - `calculateStatistics`는 데이터가 없으면 모든 값이 0인 객체를 반환합니다.
 * - `calculateVisitorAxisRange`는 최소값이 10보다 작으면 0부터 시작합니다.
 */
const meta = {
  title: 'Lib/Utils/analytics',
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
