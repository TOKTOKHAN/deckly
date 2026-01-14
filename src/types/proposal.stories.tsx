import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 제안서 관련 타입 정의입니다.
 *
 * ## 타입 목록
 *
 * - `ProposalStatus`: 제안서 상태 타입
 * - `ProposalFormData`: 제안서 폼 데이터 인터페이스
 * - `Proposal`: 제안서 인터페이스 (ProposalFormData 확장)
 * - `GenerationStatus`: 제안서 생성 상태 인터페이스
 *
 * ## ProposalStatus
 *
 * 제안서의 현재 상태를 나타내는 타입입니다.
 *
 * | 값         | 설명           |
 * | ---------- | -------------- |
 * | `draft`    | 초안           |
 * | `generating` | 생성 중       |
 * | `completed` | 완료          |
 * | `error`    | 에러           |
 *
 * ## ProposalFormData
 *
 * 제안서 생성 폼에서 사용하는 데이터 구조입니다.
 *
 * ### 기본 정보
 *
 * | 필드            | 타입     | 필수 | 설명                    |
 * | --------------- | -------- | ---- | ----------------------- |
 * | `clientCompanyName` | `string` | ✅   | 고객사명                |
 * | `projectName`   | `string` | ✅   | 프로젝트명              |
 * | `slogan`        | `string` | ✅   | 슬로건 (제안서 마무리 부분에 사용) |
 * | `brandColor1`   | `string` | ✅   | 브랜드 컬러 1           |
 * | `brandColor2`   | `string` | ✅   | 브랜드 컬러 2           |
 * | `brandColor3`   | `string` | ✅   | 브랜드 컬러 3           |
 * | `clientLogo`    | `string` | ❌   | 고객사 로고 URL         |
 * | `ourLogo`       | `string` | ❌   | 제안사 로고 URL         |
 * | `clientWebsite` | `string` | ❌   | 고객사 사이트 URL       |
 * | `font`          | `string` | ✅   | 폰트 (기본값: 'Pretendard') |
 *
 * ### 프로젝트 정보
 *
 * | 필드              | 타입     | 필수 | 설명                    |
 * | ----------------- | -------- | ---- | ----------------------- |
 * | `teamSize`        | `string` | ✅   | 투입 인력               |
 * | `startDate`       | `string` | ✅   | 프로젝트 시작일         |
 * | `endDate`         | `string` | ✅   | 개발 종료일             |
 * | `reviewPeriod`    | `string` | ✅   | 검수 기간 (예: "2주", "1개월") |
 * | `maintenancePeriod` | `string` | ✅   | 유지보수 기간 (예: "3개월", "6개월") |
 * | `openDate`        | `string` | ❌   | 오픈일/런칭일           |
 *
 * ### 예산
 *
 * | 필드        | 타입     | 필수 | 설명     |
 * | ----------- | -------- | ---- | -------- |
 * | `budgetMin` | `string` | ✅   | 최소 예산 |
 *
 * ### 기타
 *
 * | 필드             | 타입       | 필수 | 설명         |
 * | ---------------- | ---------- | ---- | ------------ |
 * | `target`         | `string[]` | ✅   | 타겟 사용자  |
 * | `includeSummary` | `string`   | ✅   | 포함 요약    |
 * | `excludeScope`   | `string`   | ✅   | 제외 범위    |
 * | `priorityFeatures` | `string` | ✅   | 우선순위 기능 |
 * | `projectPhase`   | `string`   | ✅   | 프로젝트 단계 |
 * | `priorityFactor` | `string`   | ✅   | 우선순위 요소 |
 * | `transcriptText` | `string`   | ✅   | 전사록 텍스트 |
 * | `volume`         | `string`   | ✅   | 볼륨         |
 * | `designStyle`    | `string`   | ✅   | 디자인 스타일 |
 * | `figureStyle`    | `string`   | ✅   | 피규어 스타일 |
 *
 * ### 날짜 정보
 *
 * | 필드          | 타입     | 필수 | 설명                                    |
 * | ------------- | -------- | ---- | --------------------------------------- |
 * | `proposalDate` | `string` | ❌   | 제안서 작성일 (없으면 현재 날짜 사용) |
 *
 * ## Proposal
 *
 * `ProposalFormData`를 확장한 제안서 인터페이스입니다. 데이터베이스에 저장되는 제안서의 전체 정보를 포함합니다.
 *
 * ### 추가 필드
 *
 * | 필드        | 타입              | 필수 | 설명           |
 * | ----------- | ----------------- | ---- | -------------- |
 * | `id`        | `string`          | ✅   | 제안서 ID      |
 * | `status`    | `ProposalStatus`  | ✅   | 제안서 상태    |
 * | `progress`  | `number`          | ❌   | 생성 진행률 (%) |
 * | `content`   | `string`          | ❌   | 생성된 HTML 콘텐츠 |
 * | `error`     | `string`          | ❌   | 에러 메시지    |
 * | `createdAt` | `string`          | ❌   | 생성일시       |
 * | `updatedAt` | `string`          | ❌   | 수정일시       |
 *
 * ## GenerationStatus
 *
 * 제안서 생성 진행 상태를 나타내는 인터페이스입니다.
 *
 * | 필드        | 타입     | 필수 | 설명           |
 * | ----------- | -------- | ---- | -------------- |
 * | `progress`  | `number` | ✅   | 진행률 (0-100) |
 * | `message`   | `string` | ✅   | 상태 메시지    |
 *
 * ## 사용 예시
 *
 * ### ProposalFormData 사용
 *
 * ```tsx
 * import type { ProposalFormData } from '@/types/proposal';
 *
 * const formData: ProposalFormData = {
 *   clientCompanyName: '삼성전자',
 *   projectName: '모바일 앱 개발',
 *   slogan: '혁신적인 모바일 경험',
 *   brandColor1: '#4f46e5',
 *   brandColor2: '#1f2937',
 *   brandColor3: '#ffffff',
 *   font: 'Pretendard',
 *   teamSize: '5명',
 *   startDate: '2024-01-01',
 *   endDate: '2024-06-30',
 *   reviewPeriod: '2주',
 *   maintenancePeriod: '3개월',
 *   budgetMin: '100000000',
 *   target: ['실무자', '관리자'],
 *   includeSummary: '프로젝트 요약',
 *   excludeScope: '제외 범위',
 *   priorityFeatures: '핵심 기능',
 *   projectPhase: '개발',
 *   priorityFactor: '품질',
 *   transcriptText: '전사록 내용',
 *   volume: '표준',
 *   designStyle: '기업형',
 *   figureStyle: '범위',
 * };
 * ```
 *
 * ### Proposal 사용
 *
 * ```tsx
 * import type { Proposal } from '@/types/proposal';
 *
 * const proposal: Proposal = {
 *   id: '1',
 *   status: 'completed',
 *   progress: 100,
 *   content: '<html>...</html>',
 *   ...formData, // ProposalFormData의 모든 필드
 *   createdAt: '2024-01-01T00:00:00Z',
 *   updatedAt: '2024-01-01T00:00:00Z',
 * };
 * ```
 *
 * ### ProposalStatus 사용
 *
 * ```tsx
 * import type { ProposalStatus } from '@/types/proposal';
 *
 * const status: ProposalStatus = 'completed';
 *
 * // 타입 가드 예시
 * function isCompleted(status: ProposalStatus): boolean {
 *   return status === 'completed';
 * }
 * ```
 */
const meta = {
  title: 'Types/Proposal',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 타입 정의 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 타입 정의만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
