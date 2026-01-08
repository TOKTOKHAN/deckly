/* 날짜 범위 계산 유틸리티 */

export type DateInterval = 'week' | 'month' | 'year';

export interface DateRange {
  start: string; // ISO string
  end: string; // ISO string
}

/* interval에 따라 날짜 범위 계산 */
export function getDateRangeByInterval(interval: DateInterval): DateRange {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999); // 하루 끝 시간
  const startDate = new Date();

  if (interval === 'week') {
    // 이번 주 월요일부터 일요일까지 7일 계산
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0(일요일) ~ 6(토요일)
    // 월요일(1)까지의 일수 계산: 월요일이면 0, 일요일이면 6
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    // 이번 주 월요일 계산
    startDate.setDate(today.getDate() - daysToMonday); // 이번 주 월요일
    startDate.setHours(0, 0, 0, 0);
    // 일요일까지 (월요일 + 6일)
    endDate.setDate(today.getDate() - daysToMonday + 6); // 이번 주 일요일
    endDate.setHours(23, 59, 59, 999);
  } else if (interval === 'month') {
    // 최근 30일
    startDate.setDate(startDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0);
  } else {
    // 최근 12개월
    startDate.setMonth(startDate.getMonth() - 12);
    startDate.setHours(0, 0, 0, 0);
  }

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
}

/* 이번 주 월요일 구하기 */
export function getThisWeekMonday(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
}
