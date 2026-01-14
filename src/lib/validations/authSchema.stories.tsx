import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 인증 관련 Zod 스키마입니다. 회원가입 및 로그인 폼 검증에 사용됩니다.
 *
 * ## 스키마 목록
 *
 * - `signupSchema`: 회원가입 폼 검증 스키마
 * - `loginSchema`: 로그인 폼 검증 스키마
 *
 * ## 타입
 *
 * - `SignupFormData`: 회원가입 폼 데이터 타입
 * - `LoginFormData`: 로그인 폼 데이터 타입
 *
 * ## signupSchema
 *
 * 회원가입 폼의 모든 필드를 검증하는 Zod 스키마입니다.
 *
 * ### 필드
 *
 * | 필드            | 타입     | 필수 | 검증 규칙                                                      |
 * | --------------- | -------- | ---- | -------------------------------------------------------------- |
 * | `name`          | `string` | ✅   | 최소 1자, 최소 2자 이상, 최대 50자 이하                       |
 * | `email`         | `string` | ✅   | 최소 1자, 유효한 이메일 형식                                   |
 * | `password`      | `string` | ✅   | 최소 1자, 최소 8자 이상, 영문 대소문자와 숫자 포함             |
 * | `confirmPassword` | `string` | ✅   | 최소 1자, `password`와 일치해야 함                            |
 *
 * ### 검증 규칙 상세
 *
 * - **이름**: 2자 이상 50자 이하
 * - **이메일**: 표준 이메일 형식 검증
 * - **비밀번호**: 최소 8자 이상, 영문 대소문자와 숫자 포함 (정규식: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/`)
 * - **비밀번호 확인**: `password` 필드와 일치해야 함 (`.refine()` 사용)
 *
 * ### 사용 예시
 *
 * React Hook Form과 함께 사용:
 *
 * - signupSchema와 zodResolver를 useForm에 전달
 * - register로 각 필드 등록
 * - errors 객체로 에러 메시지 표시
 * - handleSubmit으로 폼 제출 처리
 *
 * ### 에러 메시지
 *
 * - 이름: "이름을 입력해주세요", "이름은 최소 2자 이상이어야 합니다", "이름은 10자 이하여야 합니다"
 * - 이메일: "이메일을 입력해주세요", "올바른 이메일 형식이 아닙니다"
 * - 비밀번호: "비밀번호를 입력해주세요", "비밀번호는 최소 8자 이상이어야 합니다", "비밀번호는 영문 대소문자와 숫자를 포함해야 합니다"
 * - 비밀번호 확인: "비밀번호 확인을 입력해주세요", "비밀번호가 일치하지 않습니다"
 *
 * ## loginSchema
 *
 * 로그인 폼의 필드를 검증하는 Zod 스키마입니다.
 *
 * ### 필드
 *
 * | 필드       | 타입     | 필수 | 검증 규칙                    |
 * | ---------- | -------- | ---- | ---------------------------- |
 * | `email`    | `string` | ✅   | 최소 1자, 유효한 이메일 형식 |
 * | `password` | `string` | ✅   | 최소 1자                     |
 *
 * ### 사용 예시
 *
 * React Hook Form과 함께 사용:
 *
 * - loginSchema와 zodResolver를 useForm에 전달
 * - register로 email, password 필드 등록
 * - errors 객체로 에러 메시지 표시
 * - handleSubmit으로 폼 제출 처리
 *
 * ### 에러 메시지
 *
 * - 이메일: "이메일을 입력해주세요", "올바른 이메일 형식이 아닙니다"
 * - 비밀번호: "비밀번호를 입력해주세요"
 *
 * ## 주의사항
 *
 * - 모든 스키마는 Zod를 사용하여 정의됩니다.
 * - `signupSchema`는 `.refine()`을 사용하여 비밀번호 일치 여부를 검증합니다.
 * - 타입은 `z.infer<>`를 사용하여 스키마에서 자동 생성됩니다.
 * - React Hook Form과 함께 사용할 때는 `zodResolver`를 사용합니다.
 */
const meta = {
  title: 'Lib/Validations/authSchema',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Zod 스키마 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Zod 스키마만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
