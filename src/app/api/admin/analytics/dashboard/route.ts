import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/supabase/admin/analytics';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('대시보드 통계 조회 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : '대시보드 통계를 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
