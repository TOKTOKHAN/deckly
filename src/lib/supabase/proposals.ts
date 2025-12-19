import { supabase } from './client';
import { Proposal, ProposalStatus } from '@/types/proposal';

// metadata 타입 정의
interface ProposalMetadata {
  target?: string[];
  includeSummary?: string;
  excludeScope?: string;
  priorityFeatures?: string;
  startDate?: string;
  openDate?: string;
  budgetMin?: string;
  budgetMax?: string;
  budgetConfirmed?: string;
  volume?: string;
}

// Supabase DB 스키마 타입 (DB 컬럼명과 매핑)
interface ProposalRow {
  id: string;
  title: string;
  client: string;
  client_contact: string;
  meeting_date: string;
  proposal_date: string;
  our_contact: string;
  content: string | null;
  meeting_notes: string;
  metadata: ProposalMetadata;
  status: ProposalStatus;
  progress: number | null;
  error: string | null;
  created_at: string;
  updated_at: string;
}

// Proposal → ProposalRow 변환
function proposalToRow(proposal: Proposal): Omit<ProposalRow, 'id' | 'created_at' | 'updated_at'> {
  return {
    title: proposal.projectName,
    client: proposal.clientCompanyName,
    client_contact: proposal.clientContact,
    meeting_date: proposal.meetingDate,
    proposal_date: proposal.proposalDate,
    our_contact: proposal.ourContact,
    content: proposal.content || null,
    meeting_notes: proposal.transcriptText,
    metadata: {
      target: proposal.target,
      includeSummary: proposal.includeSummary,
      excludeScope: proposal.excludeScope,
      priorityFeatures: proposal.priorityFeatures,
      startDate: proposal.startDate,
      openDate: proposal.openDate,
      budgetMin: proposal.budgetMin,
      budgetMax: proposal.budgetMax,
      budgetConfirmed: proposal.budgetConfirmed,
      volume: proposal.volume,
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
    clientContact: row.client_contact,
    meetingDate: row.meeting_date,
    proposalDate: row.proposal_date,
    ourContact: row.our_contact,
    transcriptText: row.meeting_notes,
    content: row.content || undefined,
    status: row.status,
    progress: row.progress || undefined,
    error: row.error || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    // metadata에서 복원
    target: metadata.target || ['실무자'],
    includeSummary: metadata.includeSummary || '',
    excludeScope: metadata.excludeScope || '',
    priorityFeatures: metadata.priorityFeatures || '',
    startDate: metadata.startDate || '',
    openDate: metadata.openDate || '',
    budgetMin: metadata.budgetMin || '',
    budgetMax: metadata.budgetMax || '',
    budgetConfirmed: metadata.budgetConfirmed || '협의 중',
    volume: metadata.volume || '표준',
  };
}

// 제안서 목록 조회
export async function getProposals(): Promise<Proposal[]> {
  if (!supabase) {
    throw new Error('Supabase가 설정되지 않았습니다.');
  }

  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
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
    // id가 있으면 포함, 없으면 제외 (Supabase가 자동 생성)
    const insertData = proposal.id
      ? { id: proposal.id, ...proposalToRow(proposal) }
      : proposalToRow(proposal);

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
    const { data, error } = await supabase
      .from('proposals')
      .update({
        ...proposalToRow(proposal),
        updated_at: new Date().toISOString(),
      })
      .eq('id', proposal.id)
      .select()
      .single();

    if (error) {
      console.error('제안서 업데이트 오류:', error);
      throw error;
    }

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

// 제안서 단일 조회
export async function getProposal(id: string): Promise<Proposal | null> {
  if (!supabase) {
    throw new Error('Supabase가 설정되지 않았습니다.');
  }

  try {
    const { data, error } = await supabase.from('proposals').select('*').eq('id', id).single();

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
