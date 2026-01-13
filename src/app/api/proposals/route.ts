import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { adminSupabase, isAdminClientAvailable } from '@/lib/supabase/admin/client';
import { checkProposalTotalLimit } from '@/lib/utils/proposalLimits';
import { Proposal, ProposalStatus } from '@/types/proposal';

export const dynamic = 'force-dynamic';

// metadata 타입 정의
interface ProposalMetadata {
  slogan?: string;
  brandColor1?: string;
  brandColor2?: string;
  brandColor3?: string;
  clientLogo?: string;
  clientWebsite?: string;
  font?: string;
  teamSize?: string;
  startDate?: string;
  endDate?: string;
  reviewPeriod?: string;
  maintenancePeriod?: string;
  openDate?: string;
  budgetMin?: string;
  target?: string[];
  includeSummary?: string;
  excludeScope?: string;
  priorityFeatures?: string;
  projectPhase?: string;
  priorityFactor?: string;
  volume?: string;
  designStyle?: string;
  figureStyle?: string;
}

// Supabase DB 스키마 타입
interface ProposalRow {
  id: string;
  title: string;
  client: string;
  client_contact: string | null;
  meeting_date: string | null;
  proposal_date: string | null;
  our_contact: string | null;
  content: string | null;
  meeting_notes: string;
  metadata: ProposalMetadata;
  status: ProposalStatus;
  progress: number | null;
  error: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Proposal → ProposalRow 변환
function proposalToRow(
  proposal: Proposal,
  userId: string,
): Omit<ProposalRow, 'id' | 'created_at' | 'updated_at'> {
  return {
    title: proposal.projectName,
    client: proposal.clientCompanyName,
    client_contact: null,
    meeting_date: null,
    proposal_date: proposal.proposalDate || null,
    our_contact: null,
    content: proposal.content || null,
    meeting_notes: proposal.transcriptText,
    user_id: userId,
    metadata: {
      slogan: proposal.slogan,
      brandColor1: proposal.brandColor1,
      brandColor2: proposal.brandColor2,
      brandColor3: proposal.brandColor3,
      clientLogo: proposal.clientLogo,
      clientWebsite: proposal.clientWebsite,
      font: proposal.font,
      teamSize: proposal.teamSize,
      startDate: proposal.startDate,
      endDate: proposal.endDate,
      reviewPeriod: proposal.reviewPeriod,
      maintenancePeriod: proposal.maintenancePeriod,
      openDate: proposal.openDate,
      budgetMin: proposal.budgetMin,
      target: proposal.target,
      includeSummary: proposal.includeSummary,
      excludeScope: proposal.excludeScope,
      priorityFeatures: proposal.priorityFeatures,
      projectPhase: proposal.projectPhase,
      priorityFactor: proposal.priorityFactor,
      volume: proposal.volume,
      designStyle: proposal.designStyle,
      figureStyle: proposal.figureStyle,
    },
    status: proposal.status,
    progress: proposal.progress || null,
    error: proposal.error || null,
  };
}

// ProposalRow → Proposal 변환
function rowToProposal(row: ProposalRow): Proposal {
  const metadata = row.metadata || ({} as ProposalMetadata);

  return {
    id: row.id,
    projectName: row.title,
    clientCompanyName: row.client,
    transcriptText: row.meeting_notes,
    content: row.content || undefined,
    status: row.status,
    progress: row.progress || undefined,
    error: row.error || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    slogan: metadata.slogan || '',
    brandColor1: metadata.brandColor1 || '#4f46e5',
    brandColor2: metadata.brandColor2 || '#1f2937',
    brandColor3: metadata.brandColor3 || '#ffffff',
    clientLogo: metadata.clientLogo,
    clientWebsite: metadata.clientWebsite,
    font: metadata.font || 'Pretendard',
    teamSize: metadata.teamSize || '',
    startDate: metadata.startDate || '',
    endDate: metadata.endDate || '',
    reviewPeriod: metadata.reviewPeriod || '',
    maintenancePeriod: metadata.maintenancePeriod || '',
    openDate: metadata.openDate,
    budgetMin: metadata.budgetMin || '',
    target: metadata.target || ['실무자'],
    includeSummary: metadata.includeSummary || '',
    excludeScope: metadata.excludeScope || '',
    priorityFeatures: metadata.priorityFeatures || '',
    projectPhase: metadata.projectPhase || '',
    priorityFactor: metadata.priorityFactor || '',
    volume: metadata.volume || '표준',
    designStyle: metadata.designStyle || '기업형',
    figureStyle: metadata.figureStyle || '범위',
    proposalDate: row.proposal_date || undefined,
  };
}

export async function POST(request: NextRequest) {
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

    // 어드민 클라이언트 확인
    if (!isAdminClientAvailable() || !adminSupabase) {
      return NextResponse.json(
        { error: '어드민 클라이언트를 사용할 수 없습니다.' },
        { status: 500 },
      );
    }

    // 요청 본문 파싱
    const proposal: Proposal = await request.json();

    // 제안서 생성 제한 체크 (서버 사이드에서 실행)
    await checkProposalTotalLimit(user.id);

    // id가 있으면 포함, 없으면 제외 (Supabase가 자동 생성)
    const insertData = proposal.id
      ? { id: proposal.id, ...proposalToRow(proposal, user.id) }
      : proposalToRow(proposal, user.id);

    // adminSupabase를 사용하여 제안서 생성
    const { data, error } = await adminSupabase
      .from('proposals')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('제안서 생성 오류:', error);
      return NextResponse.json(
        { error: error.message || '제안서 생성 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    const createdProposal = rowToProposal(data);

    return NextResponse.json(createdProposal, { status: 201 });
  } catch (error) {
    console.error('제안서 생성 실패:', error);

    // 제한 초과 에러인지 확인
    if (error instanceof Error && error.message.includes('제한')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '제안서 생성 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
