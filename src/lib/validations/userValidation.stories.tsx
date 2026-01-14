import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 사용자 폼 검증 유틸리티 함수입니다. 개별 필드 검증 및 전체 폼 검증을 제공합니다.
 *
 * ## 인터페이스
 *
 * - `UserValidationErrors`: 검증 에러 객체 타입
 * - `UserFormData`: 사용자 폼 데이터 타입
 *
 * ## UserValidationErrors
 *
 * 검증 에러를 담는 인터페이스입니다.
 *
 * | 필드       | 타입     | 설명           |
 * | ---------- | -------- | -------------- |
 * | `name?`    | `string` | 이름 에러 메시지 |
 * | `email?`   | `string` | 이메일 에러 메시지 |
 * | `password?` | `string` | 비밀번호 에러 메시지 |
 * | `phone?`   | `string` | 전화번호 에러 메시지 |
 *
 * ## UserFormData
 *
 * 사용자 폼 데이터 인터페이스입니다.
 *
 * | 필드       | 타입     | 설명       |
 * | ---------- | -------- | ---------- |
 * | `name`     | `string` | 이름       |
 * | `email`    | `string` | 이메일     |
 * | `password` | `string` | 비밀번호   |
 * | `phone`    | `string` | 전화번호   |
 *
 * ## 함수 목록
 *
 * - `validateName`: 이름 검증
 * - `validateEmail`: 이메일 검증
 * - `validatePassword`: 비밀번호 검증
 * - `validatePhone`: 전화번호 검증
 * - `validateField`: 개별 필드 검증 함수
 * - `validateUserForm`: 전체 사용자 폼 검증
 *
 * ## validateName
 *
 * 이름을 검증합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명           |
 * | -------- | -------- | ---- | -------------- |
 * | `value`  | `string` | ✅   | 검증할 이름 값 |
 *
 * ### 반환값
 *
 * `string | undefined` - 에러 메시지 또는 undefined
 *
 * ### 검증 규칙
 *
 * - 빈 값이면 "이름을 입력해주세요."
 * - 공백 제거 후 길이가 2자 미만이면 "이름은 최소 2자 이상이어야 합니다."
 *
 * ### 사용 예시
 *
 * - validateName('홍') → "이름은 최소 2자 이상이어야 합니다."
 * - validateName('홍길동') → undefined
 *
 * ## validateEmail
 *
 * 이메일을 검증합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명             |
 * | -------- | -------- | ---- | ---------------- |
 * | `value`  | `string` | ✅   | 검증할 이메일 값 |
 *
 * ### 반환값
 *
 * `string | undefined` - 에러 메시지 또는 undefined
 *
 * ### 검증 규칙
 *
 * - 빈 값이면 "이메일을 입력해주세요."
 * - 이메일 형식이 아니면 "유효한 이메일 주소를 입력해주세요." (정규식: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
 *
 * ### 사용 예시
 *
 * - validateEmail('') → "이메일을 입력해주세요."
 * - validateEmail('invalid-email') → "유효한 이메일 주소를 입력해주세요."
 * - validateEmail('user@example.com') → undefined
 *
 * ## validatePassword
 *
 * 비밀번호를 검증합니다.
 *
 * ### 매개변수
 *
 * | 매개변수    | 타입      | 필수 | 기본값 | 설명                    |
 * | ----------- | --------- | ---- | ------ | ----------------------- |
 * | `value`     | `string`  | ✅   | -      | 검증할 비밀번호 값      |
 * | `required`  | `boolean` | ❌   | `true` | 필수 여부               |
 *
 * ### 반환값
 *
 * `string | undefined` - 에러 메시지 또는 undefined
 *
 * ### 검증 규칙
 *
 * - `required`가 `true`이고 빈 값이면 "비밀번호를 입력해주세요."
 * - 값이 있고 길이가 6자 미만이면 "비밀번호는 최소 6자 이상이어야 합니다."
 *
 * ### 사용 예시
 *
 * - validatePassword('', true) → "비밀번호를 입력해주세요."
 * - validatePassword('12345') → "비밀번호는 최소 6자 이상이어야 합니다."
 * - validatePassword('password123') → undefined
 * - validatePassword('', false) → undefined (선택적 필드)
 *
 * ## validatePhone
 *
 * 전화번호를 검증합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명               |
 * | -------- | -------- | ---- | ------------------ |
 * | `value`  | `string` | ✅   | 검증할 전화번호 값 |
 *
 * ### 반환값
 *
 * `string | undefined` - 에러 메시지 또는 undefined
 *
 * ### 검증 규칙
 *
 * - 빈 값이면 통과 (선택적 필드)
 * - 숫자와 하이픈(`-`)만 허용 (정규식: `/^[0-9-]+$/`)
 * - 하이픈 제거 후 길이가 10자 미만이면 "전화번호는 최소 10자리 이상이어야 합니다."
 *
 * ### 사용 예시
 *
 * - validatePhone('abc123') → "유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)"
 * - validatePhone('010-123') → "전화번호는 최소 10자리 이상이어야 합니다."
 * - validatePhone('010-1234-5678') → undefined
 * - validatePhone('') → undefined (선택적 필드)
 *
 * ## validateField
 *
 * 개별 필드를 검증하는 범용 함수입니다.
 *
 * ### 매개변수
 *
 * | 매개변수     | 타입                                    | 필수 | 설명                    |
 * | ------------ | --------------------------------------- | ---- | ----------------------- |
 * | `fieldName`  | `'name' \| 'email' \| 'password' \| 'phone'` | ✅   | 검증할 필드 이름        |
 * | `value`      | `string`                                | ✅   | 검증할 값              |
 * | `options`    | `{ passwordRequired?: boolean }`        | ❌   | 검증 옵션               |
 *
 * ### 반환값
 *
 * `string | undefined` - 에러 메시지 또는 undefined
 *
 * ### 사용 예시
 *
 * - validateField('name', '홍') → "이름은 최소 2자 이상이어야 합니다."
 * - validateField('email', 'invalid') → "유효한 이메일 주소를 입력해주세요."
 * - validateField('password', '123', { passwordRequired: true }) → "비밀번호는 최소 6자 이상이어야 합니다."
 *
 * ## validateUserForm
 *
 * 전체 사용자 폼을 검증합니다.
 *
 * ### 매개변수
 *
 * | 매개변수     | 타입                                    | 필수 | 설명                    |
 * | ------------ | --------------------------------------- | ---- | ----------------------- |
 * | `formData`   | `UserFormData`                          | ✅   | 검증할 폼 데이터        |
 * | `options`    | `{ passwordRequired?: boolean }`         | ❌   | 검증 옵션               |
 *
 * ### 반환값
 *
 * `UserValidationErrors` - 검증 에러 객체
 *
 * ### 사용 예시
 *
 * validateUserForm({ name: '홍', email: 'invalid-email', password: '123', phone: '010-1234-5678' })
 * → { name: "이름은 최소 2자 이상이어야 합니다.", email: "유효한 이메일 주소를 입력해주세요.", password: "비밀번호는 최소 6자 이상이어야 합니다.", phone: undefined }
 *
 * ## 주의사항
 *
 * - 모든 검증 함수는 공백을 제거한 후 검증합니다 (`trim()`).
 * - `validatePassword`는 `required` 옵션으로 필수 여부를 제어할 수 있습니다.
 * - `validatePhone`은 선택적 필드이므로 빈 값이면 통과합니다.
 * - `validateUserForm`은 모든 필드를 검증하고 에러 객체를 반환합니다.
 */
const meta = {
  title: 'Lib/Validations/userValidation',
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
