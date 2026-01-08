import { adminSupabase, isAdminClientAvailable } from './client';
import { ProposalStatus } from '@/types/proposal';

export interface DashboardStats {
  totalProposals: number;
  totalUsers: number;
  completedProposals: number;
  errorProposals: number;
  draftProposals: number;
  generatingProposals: number;
  todayProposals: number;
  thisWeekProposals: number;
  thisMonthProposals: number;
}

export interface ProposalStatsByDate {
  date: string;
  count: number;
  completed: number;
  error: number;
}

/**
 * 대시보드 통계 조회
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다. Service Role Key를 확인하세요.');
  }

  try {
    // 전체 제안서 수
    const { count: totalProposals } = await adminSupabase
      .from('proposals')
      .select('id', { count: 'exact', head: true });

    // 전체 사용자 수
    const { data: usersData } = await adminSupabase.auth.admin.listUsers();
    const totalUsers = usersData.users?.length || 0;

    // 상태별 제안서 수
    const { count: completed } = await adminSupabase
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'completed');

    const { count: error } = await adminSupabase
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .not('error', 'is', null);

    const { count: draft } = await adminSupabase
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'draft');

    const { count: generating } = await adminSupabase
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'generating');

    // 날짜별 통계 (완료된 제안서만 카운트)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const { count: todayProposals } = await adminSupabase
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'completed')
      .gte('created_at', todayISO);

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoISO = weekAgo.toISOString();

    const { count: thisWeekProposals } = await adminSupabase
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'completed')
      .gte('created_at', weekAgoISO);

    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const monthAgoISO = monthAgo.toISOString();

    const { count: thisMonthProposals } = await adminSupabase
      .from('proposals')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'completed')
      .gte('created_at', monthAgoISO);

    return {
      totalProposals: totalProposals || 0,
      totalUsers,
      completedProposals: completed || 0,
      errorProposals: error || 0,
      draftProposals: draft || 0,
      generatingProposals: generating || 0,
      todayProposals: todayProposals || 0,
      thisWeekProposals: thisWeekProposals || 0,
      thisMonthProposals: thisMonthProposals || 0,
    };
  } catch (err) {
    console.error('대시보드 통계 조회 실패:', err);
    throw err;
  }
}

/**
 * 날짜별 제안서 통계 조회
 * @param startDate 시작 날짜 (ISO string)
 * @param endDate 종료 날짜 (ISO string)
 * @param interval 간격 ('day' | 'week' | 'month')
 */
export async function getProposalStatsByDate(
  startDate: string,
  endDate: string,
  interval: 'day' | 'week' | 'month' = 'day',
): Promise<ProposalStatsByDate[]> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    throw new Error('어드민 클라이언트를 사용할 수 없습니다.');
  }

  try {
    const { data, error } = await adminSupabase
      .from('proposals')
      .select('created_at, status, error')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('날짜별 통계 조회 오류:', error);
      throw error;
    }

    // 날짜별로 그룹화
    const statsMap = new Map<string, { count: number; completed: number; error: number }>();

    (data || []).forEach(row => {
      const date = new Date(row.created_at);
      let dateKey: string;

      if (interval === 'day') {
        dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
      } else if (interval === 'week') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // 주의 시작일
        dateKey = weekStart.toISOString().split('T')[0];
      } else {
        // month
        dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
      }

      const stats = statsMap.get(dateKey) || { count: 0, completed: 0, error: 0 };
      stats.count += 1;
      if (row.status === 'completed') {
        stats.completed += 1;
      }
      if (row.error) {
        stats.error += 1;
      }
      statsMap.set(dateKey, stats);
    });

    // 배열로 변환
    return Array.from(statsMap.entries())
      .map(([date, stats]) => ({
        date,
        count: stats.count,
        completed: stats.completed,
        error: stats.error,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (err) {
    console.error('날짜별 통계 조회 실패:', err);
    throw err;
  }
}
