import { adminSupabase, isAdminClientAvailable } from './client';

export interface UserWithStats {
  id: string;
  email: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  proposalCount: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number; // 최근 30일 내 로그인한 사용자
  totalProposals: number;
  averageProposalsPerUser: number;
}

/**
 * 모든 사용자 목록 조회 (제안서 수 포함)
 */
export async function getAllUsersWithProposalCount(): Promise<UserWithStats[]> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다. Service Role Key를 확인하세요.');
  }

  const client = adminSupabase;
  if (!client) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    // 사용자 목록 조회
    const { data: users, error: usersError } = await client.auth.admin.listUsers();

    if (usersError) {
      // eslint-disable-next-line no-console
      console.error('사용자 목록 조회 오류:', usersError);
      throw usersError;
    }

    // 각 사용자의 제안서 수 조회
    const usersWithStats = await Promise.all(
      (users.users || []).map(async user => {
        const { count } = await client
          .from('proposals')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);

        return {
          id: user.id,
          email: user.email || null,
          createdAt: user.created_at,
          lastSignInAt: user.last_sign_in_at || null,
          proposalCount: count || 0,
        };
      }),
    );

    return usersWithStats;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('사용자 목록 조회 실패:', err);
    throw err;
  }
}

/**
 * 특정 사용자의 통계 조회
 */
export async function getUserStats(userId: string): Promise<{
  proposalCount: number;
  completedProposals: number;
  errorProposals: number;
  draftProposals: number;
}> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  const client = adminSupabase;
  if (!client) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    const { count: total } = await client
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    const { count: completed } = await client
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'completed');

    const { count: error } = await client
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .not('error', 'is', null);

    const { count: draft } = await client
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'draft');

    return {
      proposalCount: total || 0,
      completedProposals: completed || 0,
      errorProposals: error || 0,
      draftProposals: draft || 0,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('사용자 통계 조회 실패:', err);
    throw err;
  }
}

/**
 * 전체 사용자 통계 조회
 */
export async function getUsersStats(): Promise<UserStats> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  const client = adminSupabase;
  if (!client) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    // 전체 사용자 수
    const { data: usersData, error: usersError } = await client.auth.admin.listUsers();
    if (usersError) throw usersError;

    const totalUsers = usersData.users?.length || 0;

    // 최근 30일 내 로그인한 사용자 수
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers =
      usersData.users?.filter(
        user => user.last_sign_in_at && new Date(user.last_sign_in_at) >= thirtyDaysAgo,
      ).length || 0;

    // 전체 제안서 수
    const { count: totalProposals } = await client
      .from('proposals')
      .select('id', { count: 'exact', head: true });

    const averageProposalsPerUser = totalUsers > 0 ? (totalProposals || 0) / totalUsers : 0;

    return {
      totalUsers,
      activeUsers,
      totalProposals: totalProposals || 0,
      averageProposalsPerUser: Math.round(averageProposalsPerUser * 100) / 100,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('사용자 통계 조회 실패:', err);
    throw err;
  }
}
