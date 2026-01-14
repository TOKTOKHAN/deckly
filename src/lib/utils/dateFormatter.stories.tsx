import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 날짜 포맷팅 유틸리티 함수입니다.
 *
 * ## 함수 목록
 *
 * - `formatChartDate`: 차트 X축 날짜 포맷팅
 * - `normalizeDateKey`: 날짜 문자열 정규화
 * - `formatDateToYYYYMMDD`: 날짜를 YYYY-MM-DD 형식으로 변환
 *
 * ## formatChartDate
 *
 * 차트의 X축에 표시할 날짜를 포맷팅합니다. 간격에 따라 다른 형식을 사용합니다.
 *
 * ### 매개변수
 *
 * | 매개변수   | 타입          | 필수 | 설명                    |
 * | ---------- | ------------- | ---- | ----------------------- |
 * | `value`    | `string`      | ✅   | 날짜 문자열             |
 * | `interval` | `DateInterval` | ✅   | 날짜 간격 ('week', 'month', 'year') |
 *
 * ### 반환값
 *
 * `string` - 포맷팅된 날짜 문자열
 *
 * ### 포맷 규칙
 *
 * - **week**: `MM/DD` 형식 (예: "01/15")
 * - **month/year**: `MM/DD` 형식 (예: "01/15")
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { formatChartDate } from '@/lib/utils/dateFormatter';
 *
 * const date1 = formatChartDate('2024-01-15', 'week');
 * // "01/15"
 *
 * const date2 = formatChartDate('2024-01-15T00:00:00Z', 'month');
 * // "01/15"
 * ```
 *
 * ## normalizeDateKey
 *
 * 날짜 문자열을 `YYYY-MM-DD` 형식으로 정규화합니다. UTC 기준으로 변환합니다.
 *
 * ### 매개변수
 *
 * | 매개변수  | 타입     | 필수 | 설명           |
 * | --------- | -------- | ---- | -------------- |
 * | `dateStr` | `string` | ✅   | 날짜 문자열    |
 *
 * ### 반환값
 *
 * `string` - `YYYY-MM-DD` 형식의 날짜 문자열
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { normalizeDateKey } from '@/lib/utils/dateFormatter';
 *
 * const normalized1 = normalizeDateKey('2024-01-15T00:00:00Z');
 * // "2024-01-15"
 *
 * const normalized2 = normalizeDateKey('2024-01-15');
 * // "2024-01-15"
 * ```
 *
 * ## formatDateToYYYYMMDD
 *
 * Date 객체를 `YYYY-MM-DD` 형식의 문자열로 변환합니다. UTC 기준으로 변환합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입    | 필수 | 설명        |
 * | -------- | ------- | ---- | ----------- |
 * | `date`   | `Date`  | ✅   | Date 객체   |
 *
 * ### 반환값
 *
 * `string` - `YYYY-MM-DD` 형식의 날짜 문자열
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { formatDateToYYYYMMDD } from '@/lib/utils/dateFormatter';
 *
 * const date = new Date('2024-01-15T12:00:00Z');
 * const formatted = formatDateToYYYYMMDD(date);
 * // "2024-01-15"
 * ```
 *
 * ## 주의사항
 *
 * - 모든 함수는 UTC 기준으로 날짜를 처리합니다.
 * - `formatChartDate`는 다양한 날짜 형식을 지원합니다 (YYYY-MM-DD, ISO string).
 * - `normalizeDateKey`는 유효하지 않은 날짜 형식이면 원본을 반환합니다.
 */
const meta = {
  title: 'Lib/Utils/dateFormatter',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 유틸리티 함수 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 유틸리티 함수만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
