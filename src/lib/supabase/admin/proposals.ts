import { adminSupabase, isAdminClientAvailable } from './client';
import { Proposal, ProposalStatus } from '@/types/proposal';

// 기존 proposals.ts의 타입과 변환 함수 재사용
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

interface ProposalRow {
  id: string;
  title: string;
  client: string;
  client_contact?: string | null;
  meeting_date?: string | null;
  proposal_date?: string | null;
  our_contact?: string | null;
  content?: string | null; // 목록 조회 시 제외될 수 있음
  meeting_notes?: string; // 목록 조회 시 제외될 수 있음
  metadata: ProposalMetadata;
  status: ProposalStatus;
  progress: number | null;
  error: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// ProposalRow → Proposal 변환
function rowToProposal(row: ProposalRow): Proposal {
  const metadata = row.metadata || ({} as ProposalMetadata);

  return {
    id: row.id,
    projectName: row.title,
    clientCompanyName: row.client,
    transcriptText: row.meeting_notes || '',
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
  };
}

export interface ProposalWithUser {
  proposal: Proposal;
  userEmail: string | null;
  userId: string;
}

/**
 * 모든 제안서 조회 (관리자용)
 * @param options 필터링 옵션
 */
export async function getAllProposals(options?: {
  status?: ProposalStatus;
  userId?: string;
  clientCompanyName?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'created_at' | 'updated_at';
  orderDirection?: 'asc' | 'desc';
}): Promise<ProposalWithUser[]> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다. Service Role Key를 확인하세요.');
  }

  const client = adminSupabase;
  if (!client) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    let query = client
      .from('proposals')
      .select('id,title,client,status,progress,error,user_id,created_at,updated_at,metadata');

    // 필터 적용
    if (options?.status) {
      query = query.eq('status', options.status);
    }
    if (options?.userId) {
      query = query.eq('user_id', options.userId);
    }
    if (options?.clientCompanyName) {
      query = query.eq('client', options.clientCompanyName);
    }

    // 정렬
    const orderBy = options?.orderBy || 'created_at';
    const orderDirection = options?.orderDirection || 'desc';
    query = query.order(orderBy, { ascending: orderDirection === 'asc' });

    // 페이지네이션
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    const { data, error } = await query;

    if (error) {
      // eslint-disable-next-line no-console
      console.error('전체 제안서 조회 오류:', error);
      throw error;
    }

    // 사용자 이메일 조회
    const proposalsWithUsers = await Promise.all(
      (data || []).map(async (row: ProposalRow) => {
        try {
          const { data: userData } = await client.auth.admin.getUserById(row.user_id);
          return {
            proposal: rowToProposal(row),
            userEmail: userData?.user?.email || null,
            userId: row.user_id,
          };
        } catch {
          return {
            proposal: rowToProposal(row),
            userEmail: null,
            userId: row.user_id,
          };
        }
      }),
    );

    return proposalsWithUsers;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('전체 제안서 조회 실패:', err);
    throw err;
  }
}

/**
 * 특정 사용자의 제안서 조회
 */
export async function getProposalsByUser(userId: string): Promise<Proposal[]> {
  return getAllProposals({ userId }).then(results => results.map(r => r.proposal));
}

/**
 * 상태별 제안서 조회
 */
export async function getProposalsByStatus(status: ProposalStatus): Promise<ProposalWithUser[]> {
  return getAllProposals({ status });
}

/**
 * 제안서 총 개수 조회
 */
export async function getProposalsCount(options?: {
  status?: ProposalStatus;
  userId?: string;
  clientCompanyName?: string;
}): Promise<number> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    let query = adminSupabase.from('proposals').select('id', { count: 'exact', head: true });

    if (options?.status) {
      query = query.eq('status', options.status);
    }
    if (options?.userId) {
      query = query.eq('user_id', options.userId);
    }
    if (options?.clientCompanyName) {
      query = query.eq('client', options.clientCompanyName);
    }

    const { count, error } = await query;

    if (error) {
      // eslint-disable-next-line no-console
      console.error('제안서 개수 조회 오류:', error);
      throw error;
    }

    return count || 0;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('제안서 개수 조회 실패:', err);
    throw err;
  }
}

/**
 * 에러가 발생한 제안서 조회
 */
export async function getErrorProposals(): Promise<ProposalWithUser[]> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  const client = adminSupabase;
  if (!client) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    // 목록 조회 시 성능 최적화: 대용량 필드(content, meeting_notes) 제외
    const { data, error } = await client
      .from('proposals')
      .select('id,title,client,status,progress,error,user_id,created_at,updated_at,metadata')
      .not('error', 'is', null)
      .order('created_at', { ascending: false });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('에러 제안서 조회 오류:', error);
      throw error;
    }

    // 사용자 이메일 조회
    const proposalsWithUsers = await Promise.all(
      (data || []).map(async (row: ProposalRow) => {
        try {
          const { data: userData } = await client.auth.admin.getUserById(row.user_id);
          return {
            proposal: rowToProposal(row),
            userEmail: userData?.user?.email || null,
            userId: row.user_id,
          };
        } catch {
          return {
            proposal: rowToProposal(row),
            userEmail: null,
            userId: row.user_id,
          };
        }
      }),
    );

    return proposalsWithUsers;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('에러 제안서 조회 실패:', err);
    throw err;
  }
}
