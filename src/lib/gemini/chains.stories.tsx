import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * LangChain을 사용한 Gemini 모델 기반 제안서 생성 체인입니다.
 *
 * ## 함수 목록
 *
 * - `extractKeywordsFromTranscript`: 전사록에서 키워드 및 설명 문구 추출
 * - `generateProposalWithChains`: 제안서 생성 체인 (표지 + 본문 + 끝마무리)
 *
 * ## extractKeywordsFromTranscript
 *
 * 전사록이나 미팅 노트에서 키워드와 설명 문구를 추출합니다.
 *
 * ### 매개변수
 *
 * | 매개변수        | 타입     | 필수 | 설명           |
 * | --------------- | -------- | ---- | -------------- |
 * | `transcriptText` | `string \| undefined` | ❌   | 전사록 텍스트  |
 * | `meetingNotes`  | `string \| undefined` | ❌   | 미팅 노트 텍스트 |
 *
 * ### 반환값
 *
 * `Promise<{ keywords: Array<{ icon?: string; title: string; sub?: string }>; description?: string }>`
 *
 * 반환 객체 필드:
 *
 * | 필드        | 타입     | 설명                    |
 * | ----------- | -------- | ----------------------- |
 * | `keywords`  | `Array`  | 키워드 배열 (최대 3개)  |
 * | `description` | `string \| undefined` | 프로젝트 설명 문구 |
 *
 * ### 동작
 *
 * - 전사록이나 미팅 노트가 없으면 기본 키워드 반환
 * - Gemini 모델을 사용하여 키워드 추출
 * - JSON 파싱 실패 시 기본값 반환
 * - 에러 발생 시 기본 키워드 반환
 *
 * ### 기본 키워드
 *
 * - "UX Renewal" (개인화 경험 강화)
 * - "Tech Stack" (클라우드 네이티브)
 * - "Growth" (데이터 중심 성장)
 *
 * ## generateProposalWithChains
 *
 * 제안서를 생성하는 전체 체인입니다. 표지, 목차, 본문, 끝마무리를 순차적으로 생성합니다.
 *
 * ### 매개변수
 *
 * | 매개변수   | 타입      | 필수 | 설명                    |
 * | ---------- | --------- | ---- | ----------------------- |
 * | `data`     | `TemplateData & { meetingNotes?: string }` | ✅   | 템플릿 데이터 및 미팅 노트 |
 *
 * ### 반환값
 *
 * `Promise<string>` - 완성된 HTML 제안서
 *
 * ### 생성 과정
 *
 * 1. **키워드 추출**: 전사록에서 키워드와 설명 문구 추출
 * 2. **표지 생성**: 템플릿 + AI 키워드 + 설명 문구
 * 3. **목차 생성**: 템플릿 기반
 * 4. **본문 생성**: Gemini AI로 본문 섹션 데이터 생성 (5개 섹션)
 * 5. **본문 템플릿 생성**: 생성된 데이터를 템플릿에 적용
 * 6. **고정 템플릿**: Strengths 템플릿 생성 (conclusion 전)
 * 7. **끝마무리 생성**: 템플릿 기반
 * 8. **HTML 래퍼**: 최종 HTML 조합 및 래퍼 생성
 *
 * ### 본문 섹션 구조
 *
 * - Section 1: 제안 개요 (배경, 범위, 강점)
 * - Section 2: 제안 전략 (시장 분석, 목표 모델, 전략, 효과)
 * - Section 3: 기술 및 기능 부문 (아키텍처, 기능, 보안, 연계)
 * - Section 4: 사업 관리 부문 (일정, 인력, 방법론, 품질 보증, 예산)
 * - Section 5: 사업 지원 부문 (교육, 기술 이전, 유지보수, 비상 대책)
 *
 * ## 주의사항
 *
 * - Gemini 모델은 환경 변수 `GEMINI_MODEL`로 설정 가능 (기본값: 'gemini-3-pro-preview')
 * - API 키는 환경 변수 `GEMINI_API_KEY`에서 가져옵니다.
 * - temperature는 0.7로 설정되어 있습니다.
 * - JSON 파싱 실패 시 빈 데이터를 사용하여 계속 진행합니다.
 * - 에러 발생 시 콘솔에 로그를 출력하고 에러를 throw합니다.
 */
const meta = {
  title: 'Lib/Gemini/chains',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// LangChain 함수 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 LangChain 함수만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
