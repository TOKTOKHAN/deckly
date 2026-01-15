import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 제안서 폼 검증 유틸리티 함수입니다.
 *
 * ## 사용법
 *
 * `validateStep1` 함수는 제안서 폼의 Step 1 필수 필드들이 모두 유효한지 검증합니다.
 * 폼 제출 전 유효성 검사에 사용됩니다.
 *
 * ## 함수
 *
 * ### validateStep1
 *
 * Step 1의 필수 필드들이 모두 유효한지 검증합니다.
 *
 * #### 매개변수
 *
 * | 매개변수   | 타입              | 필수 | 설명                    |
 * | ---------- | ----------------- | ---- | ----------------------- |
 * | `formData` | `ProposalFormData` | ✅   | 검증할 폼 데이터        |
 *
 * #### 반환값
 *
 * | 타입      | 설명                                    |
 * | --------- | --------------------------------------- |
 * | `boolean` | 모든 필수 필드가 유효하면 `true`, 그렇지 않으면 `false` |
 *
 * #### 검증 항목
 *
 * 1. **프로젝트명** (`projectName`)
 *    - 비어있지 않아야 함
 *    - 공백만으로 구성된 문자열은 유효하지 않음
 *
 * 2. **클라이언트사** (`clientCompanyName`)
 *    - 비어있지 않아야 함
 *    - 공백만으로 구성된 문자열은 유효하지 않음
 *
 * 3. **브랜드 컬러 1, 2, 3** (`brandColor1`, `brandColor2`, `brandColor3`)
 *    - Hex 색상 코드 형식이어야 함 (`#RRGGBB`)
 *    - 정규식: `/^#[0-9A-Fa-f]{6}$/`
 *    - 예: `#4f46e5`, `#1f2937`, `#ffffff`
 *
 * 4. **폰트** (`font`)
 *    - 비어있지 않아야 함
 *    - 공백만으로 구성된 문자열은 유효하지 않음
 *
 * 5. **시작일** (`startDate`)
 *    - 비어있지 않아야 함
 *    - 날짜 형식 문자열이어야 함
 *
 * 6. **종료일** (`endDate`)
 *    - 비어있지 않아야 함
 *    - 날짜 형식 문자열이어야 함
 *    - 시작일 이후여야 함 (같은 날짜도 허용)
 *
 * ## 사용 예시
 *
 * ### 기본 사용법
 *
 * ```tsx
 * import { validateStep1 } from '@/lib/utils/formValidation';
 * import { useForm } from 'react-hook-form';
 *
 * function FormComponent() {
 *   const { watch } = useForm<ProposalFormData>();
 *   const formData = watch();
 *
 *   const isStep1Valid = validateStep1(formData);
 *
 *   return (
 *     <button disabled={!isStep1Valid}>
 *       다음 단계
 *     </button>
 *   );
 * }
 * ```
 *
 * ### 조건부 렌더링
 *
 * ```tsx
 * function StepNavigation() {
 *   const formData = watch();
 *   const canProceed = validateStep1(formData);
 *
 *   return (
 *     <div>
 *       {canProceed ? (
 *         <button onClick={goToNextStep}>다음 단계</button>
 *       ) : (
 *         <p className="text-red-500">필수 항목을 모두 입력해주세요.</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * ### 실시간 검증
 *
 * ```tsx
 * function Step1Form() {
 *   const { watch } = useForm<ProposalFormData>();
 *   const formData = watch();
 *
 *   // formData가 변경될 때마다 자동으로 재검증됨
 *   const isValid = useMemo(() => validateStep1(formData), [formData]);
 *
 *   return (
 *     <div>
 *       // 폼 필드들
 *       <button disabled={!isValid}>다음 단계</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * ## 검증 규칙 상세
 *
 * ### Hex 색상 코드 검증
 *
 * - 형식: # + 6자리 16진수
 * - 대소문자 구분 없음
 * - 유효한 예: #4f46e5, #1F2937, #FFFFFF
 * - 유효하지 않은 예: 4f46e5 (앞에 # 없음), #4f46 (6자리 아님), #gggggg (16진수 아님)
 *
 * ### 날짜 검증
 *
 * - 시작일과 종료일 모두 필수
 * - 종료일은 시작일과 같거나 이후여야 함
 * - 날짜 비교는 Date 객체를 사용하여 수행됨
 *
 * ### 문자열 검증
 *
 * - trim().length > 0로 공백만 있는 문자열을 제외
 * - undefined 또는 null은 유효하지 않음
 *
 * ## 반환값 동작
 *
 * - 모든 필수 필드가 유효하면 true 반환
 * - 하나라도 유효하지 않으면 false 반환
 * - 단락 평가(short-circuit evaluation)를 사용하여 첫 번째 실패 시 즉시 false 반환
 *
 * ## 주의사항
 *
 * - 이 함수는 Step 1의 필수 필드만 검증합니다.
 * - Step 2의 필드(예: transcriptText)는 검증하지 않습니다.
 * - React Hook Form의 Zod 스키마 검증과 별도로 동작합니다.
 * - 클라이언트 사이드 검증이므로 서버 사이드 검증도 필요할 수 있습니다.
 *
 * ## 관련 파일
 *
 * - src/components/proposal/FormView.tsx: 이 함수를 사용하여 "다음 단계" 버튼의 disabled 상태를 결정합니다.
 * - src/lib/validations/proposalSchema.ts: Zod 스키마를 사용한 전체 폼 검증
 */
const meta = {
  title: 'Lib/Utils/formValidation',
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
