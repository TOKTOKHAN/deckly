/* Analytics 관련 커스텀 훅 */

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ProposalStatsByDate } from '@/lib/supabase/admin/analytics';
import type { DateInterval } from '@/lib/utils/dateRange';
import { fetchAnalyticsStats } from '@/lib/api/analytics';
import { getDateRangeByInterval } from '@/lib/utils/dateRange';
import {
  fillWeekDays,
  calculateStatistics,
  calculateVisitorAxisRange,
} from '@/lib/utils/analytics';

export interface UseAnalyticsResult {
  stats: ProposalStatsByDate[] | undefined;
  statistics: ReturnType<typeof calculateStatistics>;
  visitorAxisRange: ReturnType<typeof calculateVisitorAxisRange>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/* Analytics 데이터를 가져오고 처리하는 커스텀 훅 */
export function useAnalytics(interval: DateInterval): UseAnalyticsResult {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져와서 날짜가 바뀔 때마다 새로 fetch
  const getTodayString = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // interval에 따라 날짜 범위 계산
  const dateRange = getDateRangeByInterval(interval);
  const { start, end } = dateRange;

  // 오늘 날짜를 queryKey에 포함 (날짜가 바뀌면 자동으로 새로 fetch)
  const today = getTodayString();

  // 데이터 fetching
  const {
    data: rawStats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'analytics', start, end, interval, today],
    queryFn: () => fetchAnalyticsStats(start, end, interval),
    retry: 2,
    retryDelay: 1000,
    staleTime: 0, // 항상 최신 데이터를 가져오도록
    refetchInterval: 60000, // 1분마다 자동 refetch (날짜가 바뀌면 자동으로 감지)
  });

  // 주간 필터일 때 월요일부터 일요일까지 7일 모두 채우기
  const stats = useMemo(() => {
    if (interval !== 'week') {
      return rawStats;
    }
    return fillWeekDays(rawStats);
  }, [rawStats, interval]);

  // 통계 계산
  const statistics = useMemo(() => calculateStatistics(stats), [stats]);

  // 방문자 수 Y축 범위 계산
  const visitorAxisRange = useMemo(() => calculateVisitorAxisRange(stats), [stats]);

  return {
    stats,
    statistics,
    visitorAxisRange,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
