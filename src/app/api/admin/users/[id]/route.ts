import { NextResponse } from 'next/server';
import { adminSupabase, isAdminClientAvailable } from '@/lib/supabase/admin/client';
import { createClient } from '@supabase/supabase-js';

// 공통 인증 및 권한 확인 함수
async function verifyAdmin(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      error: NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 }),
      user: null,
    };
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

  if (authError || !user) {
    return {
      error: NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 }),
      user: null,
    };
  }

  const adminEmails =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  const isUserAdmin =
    adminEmails.includes(user.email?.toLowerCase() || '') || user.user_metadata?.isAdmin === true;

  if (!isUserAdmin) {
    return {
      error: NextResponse.json({ error: '어드민 권한이 필요합니다.' }, { status: 403 }),
      user: null,
    };
  }

  if (!isAdminClientAvailable() || !adminSupabase) {
    return {
      error: NextResponse.json(
        { error: '어드민 클라이언트를 사용할 수 없습니다.' },
        { status: 500 },
      ),
      user: null,
    };
  }

  return { error: null, user };
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const authResult = await verifyAdmin(request);

    if (authResult.error) {
      return authResult.error;
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { name, email, password, phone, grantAdmin } = body;

    // 필수 필드 검증
    if (!name || !email) {
      return NextResponse.json({ error: '이름과 이메일은 필수입니다.' }, { status: 400 });
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

    // 비밀번호 검증 (입력된 경우에만)
    if (password && password.length < 6) {
      return NextResponse.json(
        { error: '비밀번호는 최소 6자 이상이어야 합니다.' },
        { status: 400 },
      );
    }

    // 업데이트할 데이터 준비
    const updateData: {
      email?: string;
      password?: string;
      phone?: string;
      user_metadata?: {
        name?: string;
        isAdmin?: boolean;
      };
    } = {
      email: email.trim(),
      user_metadata: {
        name: name.trim(),
        isAdmin: grantAdmin === true,
      },
    };

    // 비밀번호가 제공된 경우에만 추가
    if (password && password.trim()) {
      updateData.password = password.trim();
    }

    // 전화번호가 제공된 경우에만 추가
    if (phone !== undefined) {
      updateData.phone = phone.trim() || undefined;
    }

    if (!isAdminClientAvailable() || !adminSupabase) {
      return NextResponse.json(
        { error: '어드민 클라이언트를 사용할 수 없습니다.' },
        { status: 500 },
      );
    }

    const client = adminSupabase;
    if (!client) {
      return NextResponse.json(
        { error: '어드민 클라이언트를 사용할 수 없습니다.' },
        { status: 500 },
      );
    }

    // 사용자 업데이트
    const { data: updatedUser, error: updateError } = await client.auth.admin.updateUserById(
      id,
      updateData,
    );

    if (updateError) {
      // eslint-disable-next-line no-console
      console.error('사용자 수정 오류:', updateError);
      return NextResponse.json(
        {
          error: updateError.message || '사용자 수정 중 오류가 발생했습니다.',
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: updatedUser.user.id,
          name: name.trim(),
          email: updatedUser.user.email,
          phone: updatedUser.user.phone,
          isAdmin: grantAdmin === true,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('사용자 수정 오류:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '사용자 수정 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const authResult = await verifyAdmin(request);

    if (authResult.error) {
      return authResult.error;
    }

    // 자기 자신 삭제 방지
    if (authResult.user?.id === id) {
      return NextResponse.json({ error: '자기 자신을 삭제할 수 없습니다.' }, { status: 400 });
    }

    if (!isAdminClientAvailable() || !adminSupabase) {
      return NextResponse.json(
        { error: '어드민 클라이언트를 사용할 수 없습니다.' },
        { status: 500 },
      );
    }

    const client = adminSupabase;
    if (!client) {
      return NextResponse.json(
        { error: '어드민 클라이언트를 사용할 수 없습니다.' },
        { status: 500 },
      );
    }

    // 사용자 삭제
    const { error: deleteError } = await client.auth.admin.deleteUser(id);

    if (deleteError) {
      // eslint-disable-next-line no-console
      console.error('사용자 삭제 오류:', deleteError);
      return NextResponse.json(
        {
          error: deleteError.message || '사용자 삭제 중 오류가 발생했습니다.',
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: '사용자가 성공적으로 삭제되었습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('사용자 삭제 오류:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '사용자 삭제 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
