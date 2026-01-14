import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 날짜 범위 계산 유틸리티 함수입니다.
 *
 * ## 타입 및 인터페이스
 *
 * - `DateInterval`: 날짜 간격 타입 (`'week' | 'month' | 'year'`)
 * - `DateRange`: 날짜 범위 인터페이스
 *
 * ## DateInterval
 *
 * 날짜 간격을 나타내는 타입입니다.
 *
 * | 값      | 설명           |
 * | ------- | -------------- |
 * | `'week'` | 주별 (7일)     |
 * | `'month'` | 월별 (30일)   |
 * | `'year'` | 연별 (12개월)  |
 *
 * ## DateRange
 *
 * 날짜 범위를 나타내는 인터페이스입니다.
 *
 * | 필드   | 타입     | 설명                    |
 * | ------ | -------- | ----------------------- |
 * | `start` | `string` | 시작일 (ISO string)     |
 * | `end`   | `string` | 종료일 (ISO string)     |
 *
 * ## 함수 목록
 *
 * - `getDateRangeByInterval`: interval에 따라 날짜 범위 계산
 * - `getThisWeekMonday`: 이번 주 월요일 구하기
 *
 * ## getDateRangeByInterval
 *
 * 날짜 간격에 따라 시작일과 종료일을 계산합니다. UTC 기준으로 계산합니다.
 *
 * ### 매개변수
 *
 * | 매개변수   | 타입          | 필수 | 설명                    |
 * | ---------- | ------------- | ---- | ----------------------- |
 * | `interval` | `DateInterval` | ✅   | 날짜 간격 ('week', 'month', 'year') |
 *
 * ### 반환값
 *
 * `DateRange` - 시작일과 종료일이 포함된 객체
 *
 * ### 간격별 범위
 *
 * - **week**: 이번 주 월요일부터 일요일까지 (7일)
 * - **month**: 최근 30일
 * - **year**: 최근 12개월
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { getDateRangeByInterval } from '@/lib/utils/dateRange';
 *
 * const weekRange = getDateRangeByInterval('week');
 * // {
 * //   start: '2024-01-15T00:00:00.000Z',
 * //   end: '2024-01-21T23:59:59.999Z'
 * // }
 *
 * const monthRange = getDateRangeByInterval('month');
 * // 최근 30일 범위
 * ```
 *
 * ## getThisWeekMonday
 *
 * 이번 주 월요일을 구합니다. UTC 기준으로 계산합니다.
 *
 * ### 반환값
 *
 * `Date` - 이번 주 월요일 Date 객체 (UTC 기준)
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { getThisWeekMonday } from '@/lib/utils/dateRange';
 *
 * const monday = getThisWeekMonday();
 * console.log('이번 주 월요일:', monday.toISOString());
 * ```
 *
 * ## 주의사항
 *
 * - 모든 날짜 계산은 UTC 기준으로 수행됩니다.
 * - 주간 범위는 월요일부터 일요일까지입니다.
 * - 월간 범위는 최근 30일입니다 (정확히 한 달이 아닙니다).
 * - 연간 범위는 최근 12개월입니다.
 */
const meta = {
  title: 'Lib/Utils/dateRange',
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
