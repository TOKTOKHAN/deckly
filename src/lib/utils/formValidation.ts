import type { ProposalFormData } from '@/types/proposal';

/**
 * Hex 색상 코드 검증을 위한 정규식
 */
const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

/**
 * Step 1의 필수 필드들이 모두 유효한지 검증합니다.
 *
 * 검증 항목:
 * - 프로젝트명: 비어있지 않아야 함
 * - 클라이언트사: 비어있지 않아야 함
 * - 브랜드 컬러 1, 2, 3: Hex 색상 코드 형식이어야 함
 * - 폰트: 비어있지 않아야 함
 * - 시작일: 비어있지 않아야 함
 * - 종료일: 비어있지 않아야 하고, 시작일 이후여야 함
 *
 * @param formData - 검증할 폼 데이터
 * @returns 모든 필수 필드가 유효하면 true, 그렇지 않으면 false
 */
export function validateStep1(formData: ProposalFormData): boolean {
  // 필수 필드 체크
  const hasProjectName = Boolean(formData.projectName && formData.projectName.trim().length > 0);
  const hasClientCompanyName = Boolean(
    formData.clientCompanyName && formData.clientCompanyName.trim().length > 0,
  );
  const hasBrandColor1 = Boolean(
    formData.brandColor1 && HEX_COLOR_REGEX.test(formData.brandColor1),
  );
  const hasBrandColor2 = Boolean(
    formData.brandColor2 && HEX_COLOR_REGEX.test(formData.brandColor2),
  );
  const hasBrandColor3 = Boolean(
    formData.brandColor3 && HEX_COLOR_REGEX.test(formData.brandColor3),
  );
  const hasFont = Boolean(formData.font && formData.font.trim().length > 0);
  const hasStartDate = Boolean(formData.startDate && formData.startDate.trim().length > 0);
  const hasEndDate = Boolean(formData.endDate && formData.endDate.trim().length > 0);

  // 종료일이 시작일 이후인지 확인
  const isDateValid =
    hasStartDate && hasEndDate && new Date(formData.endDate) >= new Date(formData.startDate);

  return Boolean(
    hasProjectName &&
    hasClientCompanyName &&
    hasBrandColor1 &&
    hasBrandColor2 &&
    hasBrandColor3 &&
    hasFont &&
    hasStartDate &&
    hasEndDate &&
    isDateValid,
  );
}
