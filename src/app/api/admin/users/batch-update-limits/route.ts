import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isAdmin } from '@/lib/utils/admin';
import { adminSupabase, isAdminClientAvailable } from '@/lib/supabase/admin/client';
import { setUserLimit } from '@/lib/supabase/admin/userLimits';

export const dynamic = 'force-dynamic';

/* 여러 사용자에게 일괄적으로 제한 적용 POST /api/admin/users/batch-update-limits */
export async function POST(request: NextRequest) {
  try {
    // 어드민 클라이언트 확인
    if (!isAdminClientAvailable() || !adminSupabase) {
      return NextResponse.json(
        { error: '어드민 클라이언트를 사용할 수 없습니다.' },
        { status: 500 },
      );
    }

    // 현재 사용자 확인 (권한 체크)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user || !isAdmin(user)) {
      return NextResponse.json({ error: '어드민 권한이 필요합니다.' }, { status: 403 });
    }

    const body = await request.json();
    const { limit, targetUsers } = body;

    // limit 검증
    if (limit !== null && limit !== undefined) {
      if (typeof limit !== 'number' || limit < 0 || !Number.isInteger(limit)) {
        return NextResponse.json(
          { error: '제한 값은 null(무제한)이거나 0 이상의 정수여야 합니다.' },
          { status: 400 },
        );
      }
    }

    // targetUsers 검증
    if (!targetUsers) {
      return NextResponse.json(
        { error: 'targetUsers 필드가 필요합니다. ("all", "null_only", 또는 사용자 ID 배열)' },
        { status: 400 },
      );
    }

    let userIds: string[] = [];

    if (targetUsers === 'all') {
      // 모든 사용자 조회
      const { data: allUsers, error: usersError } = await adminSupabase.auth.admin.listUsers();
      if (usersError) {
        throw usersError;
      }
      userIds = allUsers.users.map(u => u.id);
    } else if (targetUsers === 'null_only') {
      // 제한이 없는 사용자만 조회 (user_limits에서 제한이 NULL인 사용자)
      const { data: usersWithNullLimit, error: nullLimitError } = await adminSupabase
        .from('user_limits')
        .select('user_id')
        .is('proposal_total_limit', null);

      if (nullLimitError) {
        throw nullLimitError;
      }

      userIds = (usersWithNullLimit || []).map(row => row.user_id);

      // user_limits에 없는 사용자도 포함 (제한이 설정되지 않은 경우)
      const { data: allUsers, error: usersError } = await adminSupabase.auth.admin.listUsers();
      if (usersError) {
        throw usersError;
      }

      const allUserIds = allUsers.users.map(u => u.id);
      const usersWithLimit = new Set(
        (await adminSupabase.from('user_limits').select('user_id')).data?.map(row => row.user_id) ||
          [],
      );

      // user_limits에 없는 사용자 추가
      allUserIds.forEach(id => {
        if (!usersWithLimit.has(id)) {
          userIds.push(id);
        }
      });
    } else if (Array.isArray(targetUsers)) {
      // 특정 사용자 ID 배열
      userIds = targetUsers;
    } else {
      return NextResponse.json(
        { error: 'targetUsers는 "all", "null_only", 또는 사용자 ID 배열이어야 합니다.' },
        { status: 400 },
      );
    }

    // 일괄 업데이트
    const updateLimit = limit === undefined ? null : limit;
    const results = await Promise.allSettled(
      userIds.map(userId => setUserLimit(userId, updateLimit)),
    );

    const succeeded = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return NextResponse.json({
      success: true,
      total: userIds.length,
      succeeded,
      failed,
      limit: updateLimit,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('일괄 제한 업데이트 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : '일괄 제한 업데이트 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
