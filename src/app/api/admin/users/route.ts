import { NextResponse } from 'next/server';
import { getAllUsersWithProposalCount } from '@/lib/supabase/admin/users';
import { adminSupabase, isAdminClientAvailable } from '@/lib/supabase/admin/client';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const users = await getAllUsersWithProposalCount();
    return NextResponse.json(users);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('사용자 목록 조회 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : '사용자 목록을 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    // 현재 사용자 확인 (Authorization 헤더에서 토큰 추출)
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // Supabase 클라이언트로 사용자 확인
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    // 어드민 권한 확인 (user_metadata 체크 포함)
    const adminEmails =
      process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
    const isUserAdmin =
      adminEmails.includes(user.email?.toLowerCase() || '') || user.user_metadata?.isAdmin === true;

    if (!isUserAdmin) {
      return NextResponse.json({ error: '어드민 권한이 필요합니다.' }, { status: 403 });
    }

    // 어드민 클라이언트 확인
    if (!isAdminClientAvailable() || !adminSupabase) {
      return NextResponse.json(
        { error: '어드민 클라이언트를 사용할 수 없습니다.' },
        { status: 500 },
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { name, email, password, phone, grantAdmin } = body;

    // 필수 필드 검증
    if (!name || !email || !password) {
      return NextResponse.json({ error: '이름, 이메일, 비밀번호는 필수입니다.' }, { status: 400 });
    }

    // 이름 검증
    if (name.trim().length < 2) {
      return NextResponse.json({ error: '이름은 최소 2자 이상이어야 합니다.' }, { status: 400 });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: '유효한 이메일 주소를 입력하세요.' }, { status: 400 });
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      return NextResponse.json(
        { error: '비밀번호는 최소 6자 이상이어야 합니다.' },
        { status: 400 },
      );
    }

    // 사용자 생성
    const { data: newUser, error: createError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      phone: phone || undefined,
      email_confirm: true, // 이메일 인증 자동 완료
      user_metadata: {
        name: name.trim(),
        isAdmin: grantAdmin === true,
      },
    });

    if (createError) {
      // eslint-disable-next-line no-console
      console.error('사용자 생성 오류:', createError);
      return NextResponse.json(
        {
          error:
            createError.message === 'User already registered'
              ? '이미 등록된 이메일입니다.'
              : createError.message || '사용자 생성 중 오류가 발생했습니다.',
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser.user.id,
          name: name.trim(),
          email: newUser.user.email,
          phone: newUser.user.phone,
          isAdmin: grantAdmin === true,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('사용자 생성 오류:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '사용자 생성 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
