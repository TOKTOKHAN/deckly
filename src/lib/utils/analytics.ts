/* 통계 계산 및 데이터 처리 유틸리티 */

import type { ProposalStatsByDate } from '@/lib/supabase/admin/analytics';
import { getThisWeekMonday } from './dateRange';
import { formatDateToYYYYMMDD, normalizeDateKey } from './dateFormatter';

/* 주간 필터일 때 월요일부터 일요일까지 7일 모두 채우기 */
export function fillWeekDays(rawStats: ProposalStatsByDate[] | undefined): ProposalStatsByDate[] {
  if (!rawStats) {
    return [];
  }

  const weekDays: ProposalStatsByDate[] = [];
  const statsMap = new Map<string, ProposalStatsByDate>();

  // 기존 데이터를 맵으로 변환
  if (rawStats.length > 0) {
    rawStats.forEach((stat: ProposalStatsByDate) => {
      const dateKey = normalizeDateKey(stat.date);
      statsMap.set(dateKey, stat);
    });
  }

  // 이번 주 월요일부터 일요일까지
  const thisMonday = getThisWeekMonday();

  for (let i = 0; i < 7; i++) {
    // UTC 기준으로 날짜 계산
    const currentDate = new Date(
      Date.UTC(thisMonday.getUTCFullYear(), thisMonday.getUTCMonth(), thisMonday.getUTCDate() + i),
    );
    const dateKey = formatDateToYYYYMMDD(currentDate);

    // 데이터가 있으면 사용, 없으면 빈 데이터 생성
    const existingData = statsMap.get(dateKey);
    if (existingData) {
      weekDays.push(existingData);
    } else {
      weekDays.push({
        date: dateKey,
        count: 0,
        completed: 0,
        error: 0,
        visitors: 0,
      });
    }
  }

  return weekDays;
}

/* 통계 집계 결과 */
export interface StatisticsSummary {
  totalVisitors: number;
  totalCreated: number;
  totalCompleted: number;
  totalErrors: number;
  successRate: string;
  errorRate: string;
}

/* 통계 집계 계산 */
export function calculateStatistics(stats: ProposalStatsByDate[] | undefined): StatisticsSummary {
  if (!stats || stats.length === 0) {
    return {
      totalVisitors: 0,
      totalCreated: 0,
      totalCompleted: 0,
      totalErrors: 0,
      successRate: '0.0',
      errorRate: '0.0',
    };
  }

  const totalVisitors = stats.reduce((sum, stat) => sum + (stat.visitors || 0), 0);
  const totalCreated = stats.reduce((sum, stat) => sum + stat.count, 0);
  const totalCompleted = stats.reduce((sum, stat) => sum + stat.completed, 0);
  const totalErrors = stats.reduce((sum, stat) => sum + stat.error, 0);

  const successRate = totalCreated > 0 ? ((totalCompleted / totalCreated) * 100).toFixed(1) : '0.0';
  const errorRate = totalCreated > 0 ? ((totalErrors / totalCreated) * 100).toFixed(1) : '0.0';

  return {
    totalVisitors,
    totalCreated,
    totalCompleted,
    totalErrors,
    successRate,
    errorRate,
  };
}

/* 방문자 수 Y축 범위 계산 */
export interface VisitorAxisRange {
  min: number;
  max: number;
}

/* 방문자 수 차트 Y축 범위 계산 (데이터가 있으면 최소값의 80%부터 시작) */
export function calculateVisitorAxisRange(
  stats: ProposalStatsByDate[] | undefined,
): VisitorAxisRange {
  if (!stats || stats.length === 0) {
    return { min: 0, max: 100 };
  }

  const visitors = stats.map(stat => stat.visitors || 0).filter(v => v > 0);

  if (visitors.length === 0) {
    return { min: 0, max: 100 };
  }

  const min = Math.min(...visitors);
  const max = Math.max(...visitors);

  // 최소값이 10보다 작으면 0부터, 크면 최소값의 80%부터 시작
  return {
    min: min < 10 ? 0 : Math.floor(min * 0.8),
    max: Math.ceil(max * 1.1),
  };
}
