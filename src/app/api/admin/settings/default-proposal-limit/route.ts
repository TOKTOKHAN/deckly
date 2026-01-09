import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isAdmin } from '@/lib/utils/admin';
import { getDefaultLimit, setDefaultLimit } from '@/lib/supabase/admin/userLimits';
import { isAdminClientAvailable } from '@/lib/supabase/admin/client';

/* 기본 제안서 생성 제한값 조회 GET /api/admin/settings/default-proposal-limit */
export async function GET(request: NextRequest) {
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

    // 기본값 조회
    const limit = await getDefaultLimit();

    return NextResponse.json({
      limit,
      hasLimit: limit !== null,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('기본 제한 조회 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : '기본 제한 정보를 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}

/* 기본 제안서 생성 제한값 설정 PUT /api/admin/settings/default-proposal-limit */
export async function PUT(request: NextRequest) {
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

    // 기본값 설정
    await setDefaultLimit(limit === undefined ? null : limit);

    return NextResponse.json({
      success: true,
      limit: limit === undefined ? null : limit,
      hasLimit: limit !== null && limit !== undefined,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('기본 제한 설정 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : '기본 제한을 설정하는 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
