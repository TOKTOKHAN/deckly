import { adminSupabase, isAdminClientAvailable } from './client';

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
  visitors?: number; // 방문자 수 (선택적)
}

/* 대시보드 통계 조회 */
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
 * 날짜별 방문자 수 조회
 * @param startDate 시작 날짜 (ISO string)
 * @param endDate 종료 날짜 (ISO string)
 * @param interval 간격 ('day' | 'week' | 'month' | 'year')
 */
async function getVisitorStatsByDate(
  startDate: string,
  endDate: string,
  interval: 'day' | 'week' | 'month' | 'year' = 'day',
): Promise<Map<string, number>> {
  if (!isAdminClientAvailable() || !adminSupabase) {
    return new Map<string, number>();
  }

  try {
    // 날짜 형식 정규화 (ISO string에서 날짜 부분만 추출)
    const startDateStr = startDate.includes('T') ? startDate.split('T')[0] : startDate;
    const endDateStr = endDate.includes('T') ? endDate.split('T')[0] : endDate;

    const { data, error } = await adminSupabase
      .from('visitor_stats')
      .select('date, visitor_count')
      .gte('date', startDateStr)
      .lte('date', endDateStr)
      .order('date', { ascending: true });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('방문자 수 조회 오류:', error);
      return new Map<string, number>();
    }

    const visitorMap = new Map<string, number>();

    if (!data || data.length === 0) {
      return visitorMap;
    }

    // interval에 따라 날짜 키 생성 및 집계
    data.forEach(row => {
      // row.date는 DATE 타입이므로 문자열로 바로 사용 가능
      const dateStr =
        typeof row.date === 'string' ? row.date : row.date.toISOString().split('T')[0];

      // 타임존 문제 방지를 위해 직접 날짜 문자열 생성
      // dateStr이 이미 YYYY-MM-DD 형식이므로 그대로 사용
      let dateKey: string;

      if (interval === 'day') {
        // YYYY-MM-DD 형식 그대로 사용 (타임존 변환 없이)
        dateKey = dateStr;
      } else if (interval === 'week') {
        // DATE 타입은 로컬 시간으로 처리되어야 하므로 Date 객체 생성 시 주의
        const date = new Date(dateStr + 'T00:00:00');
        const dayOfWeek = date.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - daysToMonday);
        // 타임존 문제 방지를 위해 직접 날짜 문자열 생성
        const year = weekStart.getFullYear();
        const month = String(weekStart.getMonth() + 1).padStart(2, '0');
        const day = String(weekStart.getDate()).padStart(2, '0');
        dateKey = `${year}-${month}-${day}`;
      } else if (interval === 'month') {
        const date = new Date(dateStr + 'T00:00:00');
        dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
      } else {
        // year
        const date = new Date(dateStr + 'T00:00:00');
        dateKey = `${date.getFullYear()}`; // YYYY
      }

      // 같은 dateKey가 있으면 합산
      const currentCount = visitorMap.get(dateKey) || 0;
      visitorMap.set(dateKey, currentCount + (row.visitor_count || 0));
    });

    return visitorMap;
  } catch (err) {
    console.error('방문자 수 조회 실패:', err);
    return new Map<string, number>();
  }
}

/**
 * 날짜별 제안서 통계 조회
 * @param startDate 시작 날짜 (ISO string)
 * @param endDate 종료 날짜 (ISO string)
 * @param interval 간격 ('day' | 'week' | 'month' | 'year')
 */
export async function getProposalStatsByDate(
  startDate: string,
  endDate: string,
  interval: 'day' | 'week' | 'month' | 'year' = 'day',
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
        // 날짜를 YYYY-MM-DD 형식으로 변환 (타임존 문제 방지)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        dateKey = `${year}-${month}-${day}`; // YYYY-MM-DD
      } else if (interval === 'week') {
        const weekStart = new Date(date);
        const dayOfWeek = date.getDay(); // 0(일요일) ~ 6(토요일)
        // 월요일을 주의 시작일로 계산
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        weekStart.setDate(date.getDate() - daysToMonday); // 월요일
        // 타임존 문제 방지를 위해 직접 날짜 문자열 생성
        const year = weekStart.getFullYear();
        const month = String(weekStart.getMonth() + 1).padStart(2, '0');
        const day = String(weekStart.getDate()).padStart(2, '0');
        dateKey = `${year}-${month}-${day}`;
      } else if (interval === 'month') {
        dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
      } else {
        // year
        dateKey = `${date.getFullYear()}`; // YYYY
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

    // 방문자 수 통계 가져오기
    // interval이 'week'일 때는 이미 API route에서 'day'로 변환되어 들어오므로
    // 여기서는 interval 그대로 사용 (이미 'day'로 변환됨)
    const visitorStats = await getVisitorStatsByDate(startDate, endDate, interval);

    // 제안서 데이터가 있는 날짜와 방문자 수가 있는 날짜를 모두 포함
    const allDates = new Set<string>();

    // 제안서 데이터 날짜 추가
    statsMap.forEach((_, date) => {
      allDates.add(date);
    });

    // 방문자 수 데이터 날짜 추가
    visitorStats.forEach((_, date) => {
      allDates.add(date);
    });

    // 배열로 변환 - 제안서 데이터와 방문자 수 매칭
    const result = Array.from(allDates)
      .map(date => {
        const stats = statsMap.get(date) || { count: 0, completed: 0, error: 0 };
        const visitorCount = visitorStats.get(date) || 0;
        return {
          date,
          count: stats.count,
          completed: stats.completed,
          error: stats.error,
          visitors: visitorCount,
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    // 디버깅: 방문자 수가 없는 경우 로그 출력
    if (interval === 'day') {
      // eslint-disable-next-line no-console
      console.log('[Analytics] 방문자 수 조회 결과:', {
        interval,
        startDate,
        endDate,
        visitorStatsSize: visitorStats.size,
        visitorStatsEntries: Array.from(visitorStats.entries()),
        proposalDateKeys: Array.from(statsMap.keys()),
        resultDates: result.map(r => ({ date: r.date, visitors: r.visitors })),
      });
    }

    return result;
  } catch (err) {
    console.error('날짜별 통계 조회 실패:', err);
    throw err;
  }
}
