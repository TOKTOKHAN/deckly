/* 날짜 범위 계산 유틸리티 */

export type DateInterval = 'week' | 'month' | 'year';

export interface DateRange {
  start: string; // ISO string
  end: string; // ISO string
}

/* interval에 따라 날짜 범위 계산 (UTC 기준) */
export function getDateRangeByInterval(interval: DateInterval): DateRange {
  const now = new Date();

  let startDate: Date;
  let endDate: Date;

  if (interval === 'week') {
    // UTC 기준으로 이번 주 월요일부터 일요일까지 7일 계산
    const dayOfWeek = now.getUTCDay(); // 0(일요일) ~ 6(토요일)
    // 월요일(1)까지의 일수 계산: 월요일이면 0, 일요일이면 6
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // 이번 주 월요일 계산 (UTC 기준)
    const mondayUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToMonday),
    );
    startDate = mondayUTC;

    // 일요일까지 (월요일 + 6일, UTC 기준)
    const sundayUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() - daysToMonday + 6,
        23,
        59,
        59,
        999,
      ),
    );
    endDate = sundayUTC;
  } else if (interval === 'month') {
    // 최근 30일 (UTC 기준)
    const startUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 30),
    );
    startDate = startUTC;

    const endUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999),
    );
    endDate = endUTC;
  } else {
    // 최근 12개월 (UTC 기준)
    const startUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 12, now.getUTCDate()),
    );
    startDate = startUTC;

    const endUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999),
    );
    endDate = endUTC;
  }

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
}

/* 이번 주 월요일 구하기 (UTC 기준) */
export function getThisWeekMonday(): Date {
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // UTC 기준 요일
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // UTC 기준으로 월요일 계산
  const monday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToMonday),
  );
  return monday;
}
