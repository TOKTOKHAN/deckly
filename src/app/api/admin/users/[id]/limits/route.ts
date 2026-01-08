import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isAdmin } from '@/lib/utils/admin';
import {
  getUserTotalLimit,
  getUserProposalCount,
  getEffectiveLimit,
  setUserLimit,
} from '@/lib/supabase/admin/userLimits';
import { isAdminClientAvailable } from '@/lib/supabase/admin/client';

/* 특정 사용자의 제한 정보 조회 GET /api/admin/users/[id]/limits */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 어드민 클라이언트 확인
    if (!isAdminClientAvailable()) {
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

    const userId = params.id;

    // 제한 정보 조회
    const limit = await getUserTotalLimit(userId);
    const effectiveLimit = await getEffectiveLimit(userId);
    const currentCount = await getUserProposalCount(userId);
    const remaining = effectiveLimit === null ? null : Math.max(0, effectiveLimit - currentCount);

    return NextResponse.json({
      limit: effectiveLimit,
      userLimit: limit, // 개별 설정값 (기본값과 구분)
      currentCount,
      remaining,
      hasLimit: effectiveLimit !== null,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('사용자 제한 조회 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : '사용자 제한 정보를 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}

/* 특정 사용자의 제한 설정/수정 PUT /api/admin/users/[id]/limits */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 어드민 클라이언트 확인
    if (!isAdminClientAvailable()) {
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

    const userId = params.id;
    const body = await request.json();
    const { limit } = body;

    // limit 검증 (null 또는 양수 정수)
    if (limit !== null && limit !== undefined) {
      if (typeof limit !== 'number' || limit < 0 || !Number.isInteger(limit)) {
        return NextResponse.json(
          { error: '제한 값은 null(무제한)이거나 0 이상의 정수여야 합니다.' },
          { status: 400 },
        );
      }
    }

    // 제한 설정
    await setUserLimit(userId, limit === undefined ? null : limit);

    // 업데이트된 정보 반환
    const effectiveLimit = await getEffectiveLimit(userId);
    const currentCount = await getUserProposalCount(userId);
    const remaining = effectiveLimit === null ? null : Math.max(0, effectiveLimit - currentCount);

    return NextResponse.json({
      success: true,
      limit: effectiveLimit,
      userLimit: limit === undefined ? null : limit,
      currentCount,
      remaining,
      hasLimit: effectiveLimit !== null,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('사용자 제한 설정 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : '사용자 제한을 설정하는 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
