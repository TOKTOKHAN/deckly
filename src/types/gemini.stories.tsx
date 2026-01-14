import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * Gemini API 요청 및 응답 관련 타입 정의입니다.
 *
 * ## 타입 목록
 *
 * - `ProposalRequest`: Gemini API 요청 타입
 * - `ProposalResponse`: Gemini API 응답 타입
 *
 * ## ProposalRequest
 *
 * Gemini API로 제안서를 생성할 때 전송하는 요청 데이터입니다. 모든 필드는 선택적(optional)입니다.
 *
 * ### 기본 필드
 *
 * | 필드            | 타입     | 필수 | 설명              |
 * | --------------- | -------- | ---- | ----------------- |
 * | `meetingNotes`  | `string` | ❌   | 미팅 노트         |
 * | `title`         | `string` | ❌   | 제목              |
 * | `client`        | `string` | ❌   | 클라이언트명      |
 * | `date`          | `string` | ❌   | 날짜              |
 * | `clientContact` | `string` | ❌   | 클라이언트 담당자명 |
 * | `proposalDate`  | `string` | ❌   | 제안서 작성일     |
 * | `ourContact`    | `string` | ❌   | 제안사 담당자명   |
 * | `projectOverview` | `string` | ❌   | 프로젝트 개요    |
 * | `budget`        | `string` | ❌   | 예산              |
 * | `period`        | `string` | ❌   | 기간              |
 * | `requirements` | `string` | ❌   | 요구사항          |
 *
 * ### Step 1 추가 필드들
 *
 * | 필드              | 타입     | 필수 | 설명                    |
 * | ----------------- | -------- | ---- | ----------------------- |
 * | `slogan`          | `string` | ❌   | 슬로건                  |
 * | `brandColor1`     | `string` | ❌   | 브랜드 컬러 1           |
 * | `brandColor2`     | `string` | ❌   | 브랜드 컬러 2           |
 * | `brandColor3`     | `string` | ❌   | 브랜드 컬러 3           |
 * | `clientLogo`      | `string` | ❌   | 고객사 로고 URL         |
 * | `ourLogo`         | `string` | ❌   | 제안사 로고 URL         |
 * | `clientWebsite`   | `string` | ❌   | 고객사 사이트 URL       |
 * | `font`            | `string` | ❌   | 폰트                    |
 * | `teamSize`        | `string` | ❌   | 투입 인력               |
 * | `startDate`       | `string` | ❌   | 프로젝트 시작일         |
 * | `endDate`         | `string` | ❌   | 개발 종료일             |
 * | `reviewPeriod`    | `string` | ❌   | 검수 기간               |
 * | `maintenancePeriod` | `string` | ❌   | 유지보수 기간           |
 * | `openDate`        | `string` | ❌   | 오픈일/런칭일           |
 *
 * ## ProposalResponse
 *
 * Gemini API로부터 받는 제안서 생성 응답 데이터입니다.
 *
 * | 필드      | 타입      | 필수 | 설명                    |
 * | --------- | --------- | ---- | ----------------------- |
 * | `content` | `string`  | ✅   | 생성된 제안서 HTML 콘텐츠 |
 * | `success` | `boolean` | ✅   | 성공 여부               |
 * | `error`   | `string`  | ❌   | 에러 메시지 (실패 시)    |
 *
 * ## 사용 예시
 *
 * ### ProposalRequest 사용
 *
 * ```tsx
 * import type { ProposalRequest } from '@/types/gemini';
 *
 * const request: ProposalRequest = {
 *   meetingNotes: '프로젝트 미팅 전사록...',
 *   client: '삼성전자',
 *   title: '모바일 앱 개발 프로젝트',
 *   projectOverview: '혁신적인 모바일 앱 개발',
 *   budget: '100000000',
 *   period: '6개월',
 *   requirements: '사용자 친화적 UI/UX',
 *   slogan: '혁신적인 모바일 경험',
 *   brandColor1: '#4f46e5',
 *   brandColor2: '#1f2937',
 *   brandColor3: '#ffffff',
 *   teamSize: '5명',
 *   startDate: '2024-01-01',
 *   endDate: '2024-06-30',
 * };
 *
 * // API 호출
 * const response = await fetch('/api/gemini', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(request),
 * });
 * ```
 *
 * ### ProposalResponse 사용
 *
 * ```tsx
 * import type { ProposalResponse } from '@/types/gemini';
 *
 * const response: ProposalResponse = await fetch('/api/gemini', {
 *   method: 'POST',
 *   body: JSON.stringify(request),
 * }).then(res => res.json());
 *
 * if (response.success) {
 *   // 제안서 콘텐츠 사용
 *   console.log(response.content);
 * } else {
 *   // 에러 처리
 *   console.error(response.error);
 * }
 * ```
 *
 * ## 주의사항
 *
 * - `ProposalRequest`의 모든 필드는 선택적입니다. 필요한 필드만 전송하면 됩니다.
 * - `ProposalResponse`의 `success`가 `false`인 경우 `error` 필드가 포함됩니다.
 * - `content`는 HTML 형식의 문자열입니다.
 */
const meta = {
  title: 'Types/Gemini',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 타입 정의 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 타입 정의만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
