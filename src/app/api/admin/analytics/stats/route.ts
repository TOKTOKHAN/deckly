import { NextRequest, NextResponse } from 'next/server';
import { getProposalStatsByDate } from '@/lib/supabase/admin/analytics';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const interval = (searchParams.get('interval') as 'day' | 'week' | 'month' | 'year') || 'week';

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'startDate와 endDate가 필요합니다.' }, { status: 400 });
    }

    // 주간 필터일 때는 일별 데이터로 조회 (프론트엔드에서 주간으로 처리)
    const queryInterval = interval === 'week' ? 'day' : interval;
    const stats = await getProposalStatsByDate(startDate, endDate, queryInterval);
    return NextResponse.json(stats);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('통계 조회 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '통계를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
