/* 날짜 포맷팅 유틸리티 */

import type { DateInterval } from './dateRange';

/* 차트 X축 날짜 포맷팅 */
export function formatChartDate(value: string, interval: DateInterval): string {
  if (interval === 'year') {
    return value.substring(0, 7);
  } else if (interval === 'week') {
    // 주간일 때: MM/DD 형식으로 표시
    if (value.length > 10) {
      const date = new Date(value);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}/${day}`;
    }
    return value.substring(5, 10);
  } else {
    return value.length > 10 ? value.substring(5, 10) : value;
  }
}

/* 날짜 문자열 정규화 (YYYY-MM-DD 형식으로) */
export function normalizeDateKey(dateStr: string): string {
  let dateKey = dateStr.length > 10 ? dateStr.substring(0, 10) : dateStr;
  // 날짜 형식이 YYYY-MM-DD가 아닌 경우 변환
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    const date = new Date(dateKey);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      dateKey = `${year}-${month}-${day}`;
    }
  }
  return dateKey;
}

/* 날짜를 YYYY-MM-DD 형식으로 변환 */
export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
