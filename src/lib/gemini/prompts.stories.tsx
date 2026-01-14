import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * Gemini 모델용 프롬프트 템플릿 및 생성 함수입니다.
 *
 * ## Export
 *
 * - `BODY_PROMPT_TEMPLATE`: 본문 생성용 프롬프트 템플릿
 * - `KEYWORD_EXTRACTION_PROMPT`: 키워드 추출용 프롬프트 템플릿
 * - `PROPOSAL_TEMPLATE`: 전체 제안서 생성용 프롬프트 템플릿 (하위 호환성)
 * - `createProposalPrompt`: 프롬프트 생성 함수
 *
 * ## BODY_PROMPT_TEMPLATE
 *
 * 본문 생성용 프롬프트 템플릿입니다. Gemini 모델이 제안서 본문의 5개 섹션 데이터를 JSON 형식으로 생성하도록 지시합니다.
 *
 * ### 생성 구조
 *
 * 5개 섹션의 JSON 데이터를 생성합니다:
 *
 * 1. **Section 1: 제안 개요**
 *    - background (quote, marketBackground, primaryGoal)
 *    - scope (프로젝트 범위 항목 배열)
 *    - strengths (강점 배열)
 *
 * 2. **Section 2: 제안 전략**
 *    - marketAnalysis (trends, coreValue)
 *    - targetModel (legacy, target, nextGen)
 *    - strategies (추진 전략 배열)
 *    - benefits (conversion, churnRate)
 *
 * 3. **Section 3: 기술 및 기능 부문**
 *    - architecture (frontend, coreHub, backend)
 *    - features (주요 기능 배열)
 *    - security (보안 항목 배열)
 *    - integrations (연계 시스템 배열)
 *
 * 4. **Section 4: 사업 관리 부문**
 *    - timeline (프로젝트 일정 배열)
 *    - resources (투입 인력 배열)
 *    - methodology (개발 방법론)
 *    - qualityAssurance (품질 보증 항목 배열)
 *    - budget (예산 정보)
 *
 * 5. **Section 5: 사업 지원 부문**
 *    - training (교육 항목 배열)
 *    - knowledgeTransfer (기술 이전 계획)
 *    - maintenance (유지보수 항목 배열)
 *    - emergency (비상 대책)
 *
 * ### 변수
 *
 * 프롬프트 템플릿에는 다음 변수가 포함됩니다:
 *
 * - {meetingNotes}: 회의록/메모 내용
 * - {projectName}: 프로젝트명
 * - {clientCompanyName}: 클라이언트사명
 * - {slogan}: 슬로건
 * - {teamSize}: 투입 인력
 * - {startDate}, {endDate}: 프로젝트 기간
 * - {reviewPeriod}: 검수 기간
 * - {maintenancePeriod}: 유지보수 기간
 * - {openDate}: 오픈일/런칭일
 * - {budget}: 예산
 * - {projectOverview}: 프로젝트 개요
 * - {priorityFeatures}: 우선순위 기능
 *
 * ## KEYWORD_EXTRACTION_PROMPT
 *
 * 키워드 추출용 프롬프트 템플릿입니다. 전사록에서 핵심 키워드 3개와 프로젝트 설명 문구를 추출합니다.
 *
 * ### 출력 형식
 *
 * JSON 형식으로 다음 구조를 반환합니다:
 *
 * ```json
 * {
 *   "keywords": [
 *     {"icon": "🎨", "title": "UX 개선", "sub": "사용자 경험 향상"},
 *     {"icon": "💻", "title": "최신 기술", "sub": "최신 기술 스택 적용"},
 *     {"icon": "📈", "title": "성장 지표", "sub": "데이터 기반 성장"}
 *   ],
 *   "description": "프로젝트의 핵심 가치를 담은 한 줄 설명"
 * }
 * ```
 *
 * ### 변수
 *
 * - {transcriptText}: 전사록/프로젝트 정보
 *
 * ## PROPOSAL_TEMPLATE
 *
 * 전체 제안서 생성용 프롬프트 템플릿입니다. 하위 호환성을 위해 유지됩니다.
 *
 * ### 구조
 *
 * - 표지 (필수)
 * - 목차 (필수)
 * - 본문 섹션 5개 (필수)
 * - 끝마무리 (필수)
 *
 * ### 변수
 *
 * 많은 변수를 포함하며, `createProposalPrompt` 함수로 주입됩니다.
 *
 * ## createProposalPrompt
 *
 * 프롬프트 템플릿에 데이터를 주입하여 최종 프롬프트를 생성합니다.
 *
 * ### 매개변수
 *
 * | 매개변수              | 타입     | 필수 | 설명           |
 * | --------------------- | -------- | ---- | -------------- |
 * | `data`                | `object` | ✅   | 프롬프트 데이터 |
 * | `data.meetingNotes`   | `string` | ❌   | 회의록/메모    |
 * | `data.title`         | `string` | ❌   | 프로젝트 제목  |
 * | `data.client`         | `string` | ❌   | 클라이언트사   |
 * | `data.slogan`         | `string` | ❌   | 슬로건         |
 * | `data.brandColor1`    | `string` | ❌   | 브랜드 컬러 1  |
 * | `data.brandColor2`    | `string` | ❌   | 브랜드 컬러 2  |
 * | `data.brandColor3`    | `string` | ❌   | 브랜드 컬러 3  |
 * | `data.font`           | `string` | ❌   | 폰트           |
 * | `data.teamSize`       | `string` | ❌   | 투입 인력      |
 * | `data.startDate`      | `string` | ❌   | 시작일         |
 * | `data.endDate`        | `string` | ❌   | 종료일         |
 * | `data.reviewPeriod`   | `string` | ❌   | 검수 기간      |
 * | `data.maintenancePeriod` | `string` | ❌   | 유지보수 기간  |
 * | `data.openDate`       | `string` | ❌   | 오픈일         |
 * | `data.budget`         | `string` | ❌   | 예산           |
 * | `data.projectOverview` | `string` | ❌   | 프로젝트 개요  |
 * | `data.requirements`   | `string` | ❌   | 요구사항       |
 *
 * ### 반환값
 *
 * `string` - 완성된 프롬프트
 *
 * ### 동작
 *
 * - PROPOSAL_TEMPLATE의 모든 변수를 데이터로 치환
 * - 회의록이 있으면 우선 사용, 없으면 다른 입력값으로 구성
 * - 최종 프롬프트 + 회의록 내용 반환
 *
 * ## 주의사항
 *
 * - BODY_PROMPT_TEMPLATE는 JSON 형식으로만 출력하도록 지시합니다.
 * - HTML이나 마크다운을 생성하지 않고 데이터만 생성합니다.
 * - KEYWORD_EXTRACTION_PROMPT는 키워드 3개와 설명 문구를 추출합니다.
 * - PROPOSAL_TEMPLATE는 하위 호환성을 위해 유지되지만, 현재는 chains.ts의 generateProposalWithChains를 사용합니다.
 */
const meta = {
  title: 'Lib/Gemini/prompts',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 프롬프트 템플릿 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 프롬프트 템플릿만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
