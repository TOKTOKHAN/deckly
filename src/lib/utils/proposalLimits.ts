import { getEffectiveLimit, getUserProposalCount } from '@/lib/supabase/admin/userLimits';

/**
 * 사용자의 제안서 생성 제한 체크
 * 제한 초과 시 에러를 throw합니다.
 * @param userId 사용자 ID
 * @throws Error 제한 초과 시 에러 메시지
 */
export async function checkProposalTotalLimit(userId: string): Promise<void> {
  try {
    // 1. 유효한 제한 조회 (개별 제한 또는 기본값)
    const limit = await getEffectiveLimit(userId);

    // 2. 제한이 없으면(NULL) 통과
    if (limit === null) {
      return;
    }

    // 3. 현재 사용자의 총 제안서 개수 조회
    const currentCount = await getUserProposalCount(userId);

    // 4. 제한 초과 체크
    if (currentCount >= limit) {
      throw new Error(`제안서 생성 제한(${limit}개)에 도달했습니다.`);
    }
  } catch (err) {
    // 이미 에러인 경우 그대로 throw
    if (err instanceof Error && err.message.includes('제한')) {
      throw err;
    }
    // 기타 에러는 재throw
    // eslint-disable-next-line no-console
    console.error('제안서 제한 체크 오류:', err);
    throw err;
  }
}
