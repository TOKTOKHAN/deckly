import { NextResponse } from 'next/server';
import { getAllUsersWithProposalCount } from '@/lib/supabase/admin/users';

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
