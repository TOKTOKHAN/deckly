import { adminSupabase, isAdminClientAvailable } from './client';

/**
 * 사용자의 제안서 생성 제한 설정 조회
 * @param userId 사용자 ID
 * @returns 제한 개수 (NULL이면 무제한)
 */
export async function getUserTotalLimit(userId: string): Promise<number | null> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    const { data, error } = await adminSupabase
      .from('user_limits')
      .select('proposal_total_limit')
      .eq('user_id', userId)
      .single();

    if (error) {
      // 레코드가 없으면 NULL 반환 (무제한)
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data?.proposal_total_limit ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('사용자 제한 조회 오류:', err);
    throw err;
  }
}

/**
 * 기본 제안서 생성 제한값 조회
 * @returns 기본 제한 개수 (NULL이면 무제한)
 */
export async function getDefaultLimit(): Promise<number | null> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    const { data, error } = await adminSupabase
      .from('app_settings')
      .select('value')
      .eq('key', 'default_proposal_limit')
      .single();

    if (error) {
      // 레코드가 없으면 NULL 반환 (무제한)
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    // value가 'null' 문자열이면 null 반환
    if (!data?.value || data.value === 'null') {
      return null;
    }

    const limit = parseInt(data.value, 10);
    return isNaN(limit) ? null : limit;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('기본 제한 조회 오류:', err);
    throw err;
  }
}

/**
 * 사용자의 유효한 제안서 생성 제한 조회
 * 우선순위: 개별 제한 > 기본값 > NULL(무제한)
 * @param userId 사용자 ID
 * @returns 유효한 제한 개수 (NULL이면 무제한)
 */
export async function getEffectiveLimit(userId: string): Promise<number | null> {
  try {
    // 1. 개별 제한 조회
    const userLimit = await getUserTotalLimit(userId);
    if (userLimit !== null) {
      return userLimit;
    }

    // 2. 기본값 조회
    const defaultLimit = await getDefaultLimit();
    return defaultLimit;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('유효한 제한 조회 오류:', err);
    throw err;
  }
}

/**
 * 사용자의 현재 제안서 총 개수 조회
 * @param userId 사용자 ID
 * @returns 제안서 개수
 */
export async function getUserProposalCount(userId: string): Promise<number> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    const { count, error } = await adminSupabase
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return count || 0;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('사용자 제안서 개수 조회 오류:', err);
    throw err;
  }
}

/**
 * 사용자 제한 설정 저장 또는 업데이트
 * @param userId 사용자 ID
 * @param limit 제한 개수 (NULL이면 무제한)
 */
export async function setUserLimit(userId: string, limit: number | null): Promise<void> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    // 기존 레코드 확인
    const { data: existing } = await adminSupabase
      .from('user_limits')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existing) {
      // 업데이트
      const { error } = await adminSupabase
        .from('user_limits')
        .update({ proposal_total_limit: limit })
        .eq('user_id', userId);

      if (error) {
        throw error;
      }
    } else {
      // 삽입
      const { error } = await adminSupabase.from('user_limits').insert({
        user_id: userId,
        proposal_total_limit: limit,
      });

      if (error) {
        throw error;
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('사용자 제한 설정 오류:', err);
    throw err;
  }
}

/**
 * 기본 제한값 설정
 * @param limit 기본 제한 개수 (NULL이면 무제한)
 */
export async function setDefaultLimit(limit: number | null): Promise<void> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    const { error } = await adminSupabase.from('app_settings').upsert(
      {
        key: 'default_proposal_limit',
        value: limit === null ? 'null' : limit.toString(),
        description: '기본 제안서 생성 제한 개수 (NULL = 무제한)',
      },
      {
        onConflict: 'key',
      },
    );

    if (error) {
      throw error;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('기본 제한 설정 오류:', err);
    throw err;
  }
}

/**
 * 모든 사용자의 제한 정보 조회 (어드민용)
 * @returns 사용자별 제한 정보 배열
 */
export async function getAllUserLimits(): Promise<
  Array<{
    userId: string;
    limit: number | null;
    currentCount: number;
    remaining: number | null; // NULL이면 무제한
  }>
> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    // 모든 사용자 제한 조회
    const { data: limits, error: limitsError } = await adminSupabase
      .from('user_limits')
      .select('user_id, proposal_total_limit');

    if (limitsError) {
      throw limitsError;
    }

    // 각 사용자별로 제안서 개수 조회
    const result = await Promise.all(
      (limits || []).map(async item => {
        const currentCount = await getUserProposalCount(item.user_id);
        const limit = item.proposal_total_limit;
        const remaining = limit === null ? null : Math.max(0, limit - currentCount);

        return {
          userId: item.user_id,
          limit,
          currentCount,
          remaining,
        };
      }),
    );

    return result;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('모든 사용자 제한 조회 오류:', err);
    throw err;
  }
}
