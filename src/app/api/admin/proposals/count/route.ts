import { NextRequest, NextResponse } from 'next/server';
import { getProposalsCount } from '@/lib/supabase/admin/proposals';
import { ProposalStatus } from '@/types/proposal';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const statusParam = searchParams.get('status');
    const status: ProposalStatus | undefined =
      statusParam && ['draft', 'generating', 'completed', 'error'].includes(statusParam)
        ? (statusParam as ProposalStatus)
        : undefined;
    const userId = searchParams.get('userId') || undefined;
    const clientCompanyName = searchParams.get('clientCompanyName') || undefined;

    const count = await getProposalsCount({
      status,
      userId,
      clientCompanyName,
    });

    return NextResponse.json({ count });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('제안서 개수 조회 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : '제안서 개수를 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
