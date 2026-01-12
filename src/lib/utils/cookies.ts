/* 쿠키 유틸리티 함수 브라우저 환경에서만 동작 */

const VISITOR_ID_COOKIE_NAME = 'deckly_visitor_id';
const COOKIE_EXPIRES_DAYS = 365; // 1년

/* 쿠키에서 값을 가져오기 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }

  return null;
}

/* 쿠키에 값 설정 */
export function setCookie(name: string, value: string, days: number = COOKIE_EXPIRES_DAYS): void {
  if (typeof document === 'undefined') {
    return;
  }

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  // HTTPS 환경에서는 Secure 플래그 추가
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const secureFlag = isSecure ? '; Secure' : '';

  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax${secureFlag}`;
}

/* UUID v4 생성 */
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/* 방문자 고유 ID 가져오기 또는 생성 쿠키에 저장된 ID를 반환하거나, 없으면 새로 생성하여 저장 */
export function getOrCreateVisitorId(): string {
  if (typeof document === 'undefined') {
    // 서버 사이드에서는 사용하지 않음
    return '';
  }

  let visitorId = getCookie(VISITOR_ID_COOKIE_NAME);

  if (!visitorId) {
    visitorId = generateUUID();
    setCookie(VISITOR_ID_COOKIE_NAME, visitorId, COOKIE_EXPIRES_DAYS);
  }

  return visitorId;
}
