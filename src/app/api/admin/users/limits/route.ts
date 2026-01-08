import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isAdmin } from '@/lib/utils/admin';
import { getAllUserLimits } from '@/lib/supabase/admin/userLimits';
import { isAdminClientAvailable } from '@/lib/supabase/admin/client';

/* 모든 사용자의 제한 정보 조회 (어드민용) GET /api/admin/users/limits */
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

    // 모든 사용자의 제한 정보 조회
    const limits = await getAllUserLimits();

    return NextResponse.json(limits);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('모든 사용자 제한 조회 오류:', error);
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
