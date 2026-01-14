import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 관리자용 분석 통계 함수입니다.
 *
 * ## 인터페이스
 *
 * - `DashboardStats`: 대시보드 통계 데이터
 * - `ProposalStatsByDate`: 날짜별 제안서 통계 데이터
 *
 * ## DashboardStats
 *
 * 대시보드 통계 인터페이스입니다.
 *
 * | 필드                | 타입     | 설명                    |
 * | ------------------- | -------- | ----------------------- |
 * | `totalProposals`    | `number` | 전체 제안서 수          |
 * | `totalUsers`        | `number` | 전체 사용자 수          |
 * | `completedProposals` | `number` | 완료된 제안서 수      |
 * | `errorProposals`    | `number` | 에러 발생 제안서 수     |
 * | `draftProposals`    | `number` | 초안 제안서 수          |
 * | `generatingProposals` | `number` | 생성 중 제안서 수   |
 * | `todayProposals`    | `number` | 오늘 생성된 제안서 수  |
 * | `thisWeekProposals` | `number` | 이번 주 생성된 제안서 수 |
 * | `thisMonthProposals` | `number` | 이번 달 생성된 제안서 수 |
 *
 * ## ProposalStatsByDate
 *
 * 날짜별 제안서 통계 인터페이스입니다.
 *
 * | 필드        | 타입     | 설명           |
 * | ----------- | -------- | -------------- |
 * | `date`      | `string` | 날짜 (YYYY-MM-DD) |
 * | `count`     | `number` | 생성된 제안서 수 |
 * | `completed` | `number` | 완료된 제안서 수 |
 * | `error`     | `number` | 에러 발생 수   |
 * | `visitors?`  | `number` | 방문자 수 (선택적) |
 *
 * ## 함수 목록
 *
 * - `getDashboardStats`: 대시보드 통계 조회
 * - `getProposalStatsByDate`: 날짜별 제안서 통계 조회
 *
 * ## getDashboardStats
 *
 * 대시보드에 표시할 전체 통계를 조회합니다.
 *
 * ### 반환값
 *
 * `Promise<DashboardStats>` - 대시보드 통계 데이터
 *
 * ### 포함 데이터
 *
 * - 전체 제안서 수, 사용자 수
 * - 상태별 제안서 수 (완료, 에러, 초안, 생성 중)
 * - 기간별 제안서 수 (오늘, 이번 주, 이번 달)
 *
 * ## getProposalStatsByDate
 *
 * 날짜 범위와 간격에 따라 제안서 통계를 조회합니다.
 *
 * ### 매개변수
 *
 * | 매개변수    | 타입     | 필수 | 설명                    |
 * | ----------- | -------- | ---- | ----------------------- |
 * | `startDate` | `string` | ✅   | 시작일 (ISO string)     |
 * | `endDate`   | `string` | ✅   | 종료일 (ISO string)     |
 * | `interval`  | `'day' \| 'week' \| 'month' \| 'year'` | ❌   | 날짜 간격 (기본값: 'day') |
 *
 * ### 반환값
 *
 * `Promise<ProposalStatsByDate[]>` - 날짜별 통계 배열
 *
 * ### 동작
 *
 * - 날짜별로 제안서 생성 수, 완료 수, 에러 수 집계
 * - 방문자 수 통계도 함께 조회하여 포함
 * - interval에 따라 날짜 그룹화 (일별, 주별, 월별, 연별)
 *
 * ## 주의사항
 *
 * - 모든 함수는 관리자 클라이언트가 필요합니다.
 * - Service Role Key가 설정되지 않으면 에러를 throw합니다.
 * - 날짜 통계는 UTC 기준으로 계산됩니다.
 * - 방문자 수는 고유 방문자 수로 계산됩니다 (user_id 또는 visitor_id 기준).
 */
const meta = {
  title: 'Lib/Supabase/Admin/analytics',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Supabase 함수 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Supabase 함수만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
