/* 날짜 포맷팅 유틸리티 */

import type { DateInterval } from './dateRange';

/* 차트 X축 날짜 포맷팅 */
export function formatChartDate(value: string, interval: DateInterval): string {
  if (interval === 'year') {
    return value.substring(0, 7);
  } else if (interval === 'week') {
    // 주간일 때: MM/DD 형식으로 표시 (UTC 기준)
    // YYYY-MM-DD 형식(10자리) 또는 ISO string 형식 모두 처리
    let date: Date;
    if (value.length === 10) {
      // YYYY-MM-DD 형식 - UTC 기준으로 파싱
      const [year, month, day] = value.split('-').map(Number);
      date = new Date(Date.UTC(year, month - 1, day));
    } else {
      // ISO string 형식
      date = new Date(value);
    }

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return value.substring(5, 10); // fallback
    }

    // UTC 기준으로 월/일 추출
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${month}/${day}`;
  } else {
    // 월간/기타: MM/DD 형식
    if (value.length === 10) {
      // YYYY-MM-DD 형식
      return value.substring(5, 10).replace('-', '/');
    } else if (value.length > 10) {
      // ISO string 형식
      return value.substring(5, 10).replace('-', '/');
    }
    return value;
  }
}

/* 날짜 문자열 정규화 (YYYY-MM-DD 형식으로, UTC 기준) */
export function normalizeDateKey(dateStr: string): string {
  let dateKey = dateStr.length > 10 ? dateStr.substring(0, 10) : dateStr;
  // 날짜 형식이 YYYY-MM-DD가 아닌 경우 변환
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    const date = new Date(dateKey);
    if (!isNaN(date.getTime())) {
      // UTC 기준으로 날짜 추출
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      dateKey = `${year}-${month}-${day}`;
    }
  }
  return dateKey;
}

/* 날짜를 YYYY-MM-DD 형식으로 변환 (UTC 기준) */
export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
