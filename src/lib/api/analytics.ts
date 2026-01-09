/* Analytics API 호출 함수 */

import type { ProposalStatsByDate } from '@/lib/supabase/admin/analytics';
import type { DateInterval } from '@/lib/utils/dateRange';

/* 통계 데이터 조회 */
export async function fetchAnalyticsStats(
  start: string,
  end: string,
  interval: DateInterval,
): Promise<ProposalStatsByDate[]> {
  const params = new URLSearchParams();
  params.set('startDate', start);
  params.set('endDate', end);
  params.set('interval', interval);

  const url = `/api/admin/analytics/stats?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '통계를 불러오는 중 오류가 발생했습니다.');
  }

  return response.json();
}
