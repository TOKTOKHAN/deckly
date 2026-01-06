import { User } from '@supabase/supabase-js';

/**
 * 관리자 이메일 목록을 환경 변수에서 가져옵니다.
 * 쉼표로 구분된 이메일 목록을 파싱합니다.
 */
function getAdminEmails(): string[] {
  const adminEmailsEnv = process.env.NEXT_PUBLIC_ADMIN_EMAILS;

  if (!adminEmailsEnv) {
    return [];
  }

  return adminEmailsEnv
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(email => email.length > 0);
}

/**
 * 사용자가 관리자인지 확인합니다.
 * @param user - Supabase User 객체 (null 가능)
 * @returns 관리자 여부
 */
export function isAdmin(user: User | null | undefined): boolean {
  if (!user || !user.email) {
    return false;
  }

  const adminEmails = getAdminEmails();
  const userEmail = user.email.toLowerCase();

  return adminEmails.includes(userEmail);
}

/**
 * 관리자 이메일 목록을 반환합니다 (디버깅용)
 */
export function getAdminEmailList(): string[] {
  return getAdminEmails();
}
