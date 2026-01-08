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
  // interval에 따라 날짜 범위 계산
  const { start, end } = useMemo(() => getDateRangeByInterval(interval), [interval]);

  // 데이터 fetching
  const {
    data: rawStats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'analytics', start, end, interval],
    queryFn: () => fetchAnalyticsStats(start, end, interval),
    retry: 2,
    retryDelay: 1000,
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
