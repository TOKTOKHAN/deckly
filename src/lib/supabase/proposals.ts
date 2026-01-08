import { supabase } from './client';
import { Proposal, ProposalStatus } from '@/types/proposal';
import { checkProposalTotalLimit } from '@/lib/utils/proposalLimits';

// metadata 타입 정의
interface ProposalMetadata {
  // 기본 정보
  slogan?: string;
  brandColor1?: string;
  brandColor2?: string;
  brandColor3?: string;
  clientLogo?: string;
  clientWebsite?: string;
  font?: string;

  // 프로젝트 정보
  teamSize?: string;
  startDate?: string;
  endDate?: string;
  reviewPeriod?: string;
  maintenancePeriod?: string;
  openDate?: string;

  // 예산
  budgetMin?: string;

  // 기타
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

// Supabase DB 스키마 타입 (DB 컬럼명과 매핑)
interface ProposalRow {
  id: string;
  title: string;
  client: string;
  client_contact: string | null;
  meeting_date: string | null; // DATE 타입은 null 허용
  proposal_date: string | null; // DATE 타입은 null 허용
  our_contact: string | null;
  content: string | null;
  meeting_notes: string;
  metadata: ProposalMetadata;
  status: ProposalStatus;
  progress: number | null;
  error: string | null;
  user_id: string; // 사용자 ID
  created_at: string;
  updated_at: string;
}

// Proposal → ProposalRow 변환
function proposalToRow(
  proposal: Proposal,
  userId?: string,
): Omit<ProposalRow, 'id' | 'created_at' | 'updated_at'> {
  if (!userId) {
    throw new Error('사용자 ID가 필요합니다.');
  }

  return {
    title: proposal.projectName,
    client: proposal.clientCompanyName,
    // 제거 예정 필드들 (DATE 타입은 null로 처리, TEXT는 null 허용)
    // Proposal 타입에 필드가 없으므로 직접 null 처리
    client_contact: null,
    meeting_date: null,
    proposal_date: proposal.proposalDate || null,
    our_contact: null,
    content: proposal.content || null,
    meeting_notes: proposal.transcriptText,
    user_id: userId, // 사용자 ID 추가
    metadata: {
      // 기본 정보
      slogan: proposal.slogan,
      brandColor1: proposal.brandColor1,
      brandColor2: proposal.brandColor2,
      brandColor3: proposal.brandColor3,
      clientLogo: proposal.clientLogo,
      clientWebsite: proposal.clientWebsite,
      font: proposal.font,

      // 프로젝트 정보
      teamSize: proposal.teamSize,
      startDate: proposal.startDate,
      endDate: proposal.endDate,
      reviewPeriod: proposal.reviewPeriod,
      maintenancePeriod: proposal.maintenancePeriod,
      openDate: proposal.openDate,

      // 예산
      budgetMin: proposal.budgetMin,

      // 기타
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

    // metadata에서 복원
    // 기본 정보
    slogan: metadata.slogan || '',
    brandColor1: metadata.brandColor1 || '#4f46e5',
    brandColor2: metadata.brandColor2 || '#1f2937',
    brandColor3: metadata.brandColor3 || '#ffffff',
    clientLogo: metadata.clientLogo,
    clientWebsite: metadata.clientWebsite,
    font: metadata.font || 'Pretendard',

    // 프로젝트 정보
    teamSize: metadata.teamSize || '',
    startDate: metadata.startDate || '',
    endDate: metadata.endDate || '',
    reviewPeriod: metadata.reviewPeriod || '',
    maintenancePeriod: metadata.maintenancePeriod || '',
    openDate: metadata.openDate,

    // 예산
    budgetMin: metadata.budgetMin || '',

    // 기타
    target: metadata.target || ['실무자'],
    includeSummary: metadata.includeSummary || '',
    excludeScope: metadata.excludeScope || '',
    priorityFeatures: metadata.priorityFeatures || '',
    projectPhase: metadata.projectPhase || '',
    priorityFactor: metadata.priorityFactor || '',
    volume: metadata.volume || '표준',
    designStyle: metadata.designStyle || '기업형',
    figureStyle: metadata.figureStyle || '범위',
  };
}

// 제안서 목록 조회 (현재 사용자의 제안서만)
export async function getProposals(): Promise<Proposal[]> {
  if (!supabase) {
    throw new Error('Supabase가 설정되지 않았습니다.');
  }

  try {
    // 현재 로그인한 사용자 확인
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      // 로그인하지 않은 경우 빈 배열 반환
      return [];
    }

    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('user_id', user.id) // 현재 사용자의 제안서만 조회
      .order('created_at', { ascending: false });

    if (error) {
      console.error('제안서 조회 오류:', error);
      throw error;
    }

    return (data || []).map(rowToProposal);
  } catch (err) {
    console.error('제안서 조회 실패:', err);
    throw err;
  }
}

// 제안서 생성
export async function createProposal(proposal: Proposal): Promise<Proposal> {
  if (!supabase) {
    throw new Error('Supabase가 설정되지 않았습니다.');
  }

  try {
    // 현재 로그인한 사용자 확인
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('로그인이 필요합니다.');
    }

    // 제안서 생성 제한 체크
    await checkProposalTotalLimit(user.id);

    // id가 있으면 포함, 없으면 제외 (Supabase가 자동 생성)
    const insertData = proposal.id
      ? { id: proposal.id, ...proposalToRow(proposal, user.id) }
      : proposalToRow(proposal, user.id);

    const { data, error } = await supabase.from('proposals').insert(insertData).select().single();

    if (error) {
      console.error('제안서 생성 오류:', error);
      throw error;
    }

    return rowToProposal(data);
  } catch (err) {
    console.error('제안서 생성 실패:', err);
    throw err;
  }
}

// 제안서 업데이트
export async function updateProposal(proposal: Proposal): Promise<Proposal> {
  if (!supabase) {
    throw new Error('Supabase가 설정되지 않았습니다.');
  }

  try {
    // 현재 로그인한 사용자 확인
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('로그인이 필요합니다.');
    }

    // 먼저 제안서가 존재하고 본인 것인지 확인
    const { data: existingProposal, error: fetchError } = await supabase
      .from('proposals')
      .select('user_id')
      .eq('id', proposal.id)
      .single();

    if (fetchError || !existingProposal) {
      throw new Error('제안서를 찾을 수 없습니다.');
    }

    if (existingProposal.user_id !== user.id) {
      throw new Error('본인의 제안서만 수정할 수 있습니다.');
    }

    const rowData = proposalToRow(proposal, user.id);
    console.log('업데이트할 데이터:', {
      id: proposal.id,
      contentLength: rowData.content?.length || 0,
      hasContent: !!rowData.content,
    });

    const { data, error } = await supabase
      .from('proposals')
      .update({
        ...rowData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', proposal.id)
      .eq('user_id', user.id) // 추가 보안: 본인 것만 업데이트
      .select()
      .single();

    if (error) {
      console.error('제안서 업데이트 오류:', error);
      console.error('에러 상세:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw error;
    }

    if (!data) {
      throw new Error('업데이트된 데이터를 받지 못했습니다.');
    }

    console.log('업데이트 성공:', {
      id: data.id,
      contentLength: data.content?.length || 0,
    });

    return rowToProposal(data);
  } catch (err) {
    console.error('제안서 업데이트 실패:', err);
    throw err;
  }
}

// 제안서 삭제
export async function deleteProposal(id: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase가 설정되지 않았습니다.');
  }

  try {
    const { error } = await supabase.from('proposals').delete().eq('id', id);

    if (error) {
      console.error('제안서 삭제 오류:', error);
      throw error;
    }
  } catch (err) {
    console.error('제안서 삭제 실패:', err);
    throw err;
  }
}

// 제안서 단일 조회 (현재 사용자의 제안서만)
export async function getProposal(id: string): Promise<Proposal | null> {
  if (!supabase) {
    throw new Error('Supabase가 설정되지 않았습니다.');
  }

  try {
    // 현재 로그인한 사용자 확인
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      // 로그인하지 않은 경우 null 반환
      return null;
    }

    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id) // 현재 사용자의 제안서만 조회
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // 데이터 없음
        return null;
      }
      console.error('제안서 조회 오류:', error);
      throw error;
    }

    return rowToProposal(data);
  } catch (err) {
    console.error('제안서 조회 실패:', err);
    throw err;
  }
}
