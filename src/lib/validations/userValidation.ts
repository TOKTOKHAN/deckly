/**
 * 사용자 폼 검증 유틸리티
 */

export interface UserValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

/**
 * 이름 검증
 * @param value - 검증할 이름 값
 * @returns 에러 메시지 또는 undefined
 */
export function validateName(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return '이름을 입력해주세요.';
  }
  if (trimmed.length < 2) {
    return '이름은 최소 2자 이상이어야 합니다.';
  }
  return undefined;
}

/**
 * 이메일 검증
 * @param value - 검증할 이메일 값
 * @returns 에러 메시지 또는 undefined
 */
export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    return '이메일을 입력해주세요.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return '유효한 이메일 주소를 입력해주세요.';
  }
  return undefined;
}

/**
 * 비밀번호 검증
 * @param value - 검증할 비밀번호 값
 * @param required - 필수 여부 (기본값: true)
 * @returns 에러 메시지 또는 undefined
 */
export function validatePassword(value: string, required: boolean = true): string | undefined {
  const trimmed = value.trim();
  if (required && !trimmed) {
    return '비밀번호를 입력해주세요.';
  }
  if (trimmed && trimmed.length < 6) {
    return '비밀번호는 최소 6자 이상이어야 합니다.';
  }
  return undefined;
}

/**
 * 전화번호 검증
 * @param value - 검증할 전화번호 값
 * @returns 에러 메시지 또는 undefined
 */
export function validatePhone(value: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed) {
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(trimmed)) {
      return '유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)';
    }
    if (trimmed.replace(/-/g, '').length < 10) {
      return '전화번호는 최소 10자리 이상이어야 합니다.';
    }
  }
  return undefined;
}

/**
 * 개별 필드 검증 함수
 * @param fieldName - 검증할 필드 이름
 * @param value - 검증할 값
 * @param options - 검증 옵션 (비밀번호 필수 여부 등)
 * @returns 에러 메시지 또는 undefined
 */
export function validateField(
  fieldName: 'name' | 'email' | 'password' | 'phone',
  value: string,
  options?: { passwordRequired?: boolean },
): string | undefined {
  switch (fieldName) {
    case 'name':
      return validateName(value);
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value, options?.passwordRequired ?? true);
    case 'phone':
      return validatePhone(value);
    default:
      return undefined;
  }
}

/**
 * 전체 사용자 폼 검증
 * @param formData - 검증할 폼 데이터
 * @param options - 검증 옵션 (비밀번호 필수 여부 등)
 * @returns 검증 에러 객체
 */
export function validateUserForm(
  formData: UserFormData,
  options?: { passwordRequired?: boolean },
): UserValidationErrors {
  const errors: UserValidationErrors = {};

  errors.name = validateName(formData.name);
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password, options?.passwordRequired ?? true);
  errors.phone = validatePhone(formData.phone);

  return errors;
}
