import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 제안서 폼 검증을 위한 Zod 스키마입니다.
 *
 * ## 스키마 목록
 *
 * - `proposalFormSchema`: 제안서 폼 전체 검증 스키마
 *
 * ## 타입
 *
 * - `ProposalFormSchema`: 제안서 폼 데이터 타입
 *
 * ## proposalFormSchema
 *
 * 제안서 생성 폼의 모든 필드를 검증하는 Zod 스키마입니다.
 *
 * ### 필드
 *
 * #### 기본 정보
 *
 * | 필드              | 타입           | 필수 | 검증 규칙                                    |
 * | ----------------- | -------------- | ---- | -------------------------------------------- |
 * | `clientCompanyName` | `string`    | ✅   | 최소 1자                                     |
 * | `projectName`     | `string`       | ✅   | 최소 1자                                     |
 * | `slogan`          | `string`       | ✅   | 최소 1자                                     |
 * | `brandColor1`     | `string`       | ✅   | Hex 색상 코드 형식 (`#RRGGBB`)               |
 * | `brandColor2`     | `string`       | ✅   | Hex 색상 코드 형식 (`#RRGGBB`)               |
 * | `brandColor3`     | `string`       | ✅   | Hex 색상 코드 형식 (`#RRGGBB`)               |
 * | `clientLogo`      | `string`       | ❌   | 선택적                                       |
 * | `ourLogo`         | `string`       | ❌   | 선택적                                       |
 * | `clientWebsite`   | `string`       | ❌   | 유효한 URL 형식 또는 빈 문자열               |
 * | `font`            | `string`       | ✅   | 최소 1자                                     |
 *
 * #### 프로젝트 정보
 *
 * | 필드              | 타입           | 필수 | 검증 규칙                    |
 * | ----------------- | -------------- | ---- | ---------------------------- |
 * | `teamSize`        | `string`       | ✅   | 최소 1자                     |
 * | `startDate`       | `string`       | ✅   | 최소 1자                     |
 * | `endDate`         | `string`       | ✅   | 최소 1자, 시작일 이후여야 함 |
 * | `reviewPeriod`    | `string`       | ✅   | 최소 1자                     |
 * | `maintenancePeriod` | `string`    | ✅   | 최소 1자                     |
 * | `openDate`        | `string`       | ❌   | 선택적                       |
 *
 * #### 예산
 *
 * | 필드        | 타입     | 필수 | 검증 규칙    |
 * | ----------- | -------- | ---- | ------------ |
 * | `budgetMin` | `string` | ✅   | 최소 1자     |
 *
 * #### 기타
 *
 * | 필드              | 타입           | 필수 | 검증 규칙                    |
 * | ----------------- | -------------- | ---- | ---------------------------- |
 * | `target`          | `string[]`     | ✅   | 문자열 배열                  |
 * | `includeSummary`  | `string`       | ✅   | -                            |
 * | `excludeScope`    | `string`       | ✅   | -                            |
 * | `priorityFeatures` | `string`     | ✅   | -                            |
 * | `projectPhase`    | `string`       | ✅   | -                            |
 * | `priorityFactor`  | `string`       | ✅   | -                            |
 * | `transcriptText`  | `string`       | ✅   | 최소 300자 이상              |
 * | `volume`          | `string`       | ✅   | -                            |
 * | `designStyle`     | `string`       | ✅   | -                            |
 * | `figureStyle`     | `string`       | ✅   | -                            |
 *
 * ### 검증 규칙 상세
 *
 * - **Hex 색상 코드**: 정규식 `/^#[0-9A-Fa-f]{6}$/`로 검증 (예: `#4f46e5`, `#1f2937`, `#ffffff`)
 * - **URL**: `clientWebsite`는 유효한 URL 형식이거나 빈 문자열이어야 함
 * - **날짜 검증**: `endDate`는 `startDate` 이후여야 함 (`.refine()` 사용)
 * - **transcriptText**: 최소 300자 이상 입력 필요
 *
 * ### 사용 예시
 *
 * React Hook Form과 함께 사용:
 *
 * - proposalFormSchema와 zodResolver를 useForm에 전달
 * - register로 각 필드 등록 (clientCompanyName, projectName, brandColor 등)
 * - errors 객체로 에러 메시지 표시
 * - handleSubmit으로 폼 제출 처리
 *
 * ### 에러 메시지
 *
 * - 클라이언트사: "클라이언트사를 입력해주세요"
 * - 프로젝트명: "프로젝트명을 입력해주세요"
 * - 슬로건: "1자 이상 입력해주세요."
 * - 색상 코드: "올바른 색상 코드 형식이 아닙니다 \n (예: #4f46e5)"
 * - URL: "올바른 URL 형식이 아닙니다"
 * - 폰트: "폰트를 선택해주세요"
 * - 날짜: "시작일을 선택해주세요", "종료일을 선택해주세요", "종료일은 시작일 이후여야 합니다"
 * - transcriptText: "최소 300자 이상 입력해주세요"
 *
 * ## 주의사항
 *
 * - 모든 색상 코드는 Hex 형식 (`#RRGGBB`)이어야 합니다.
 * - `clientWebsite`는 선택적이지만, 값이 있으면 유효한 URL이어야 합니다.
 * - 날짜 검증은 `.refine()`을 사용하여 `endDate`가 `startDate` 이후인지 확인합니다.
 * - `transcriptText`는 최소 300자 이상 입력해야 합니다.
 * - 타입은 `z.infer<>`를 사용하여 스키마에서 자동 생성됩니다.
 */
const meta = {
  title: 'Lib/Validations/proposalSchema',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Zod 스키마 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Zod 스키마만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
