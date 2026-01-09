import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * 어드민용 Supabase 클라이언트 (Service Role Key 사용)
 * 주의: 이 클라이언트는 서버 사이드에서만 사용해야 합니다.
 * RLS를 우회하여 모든 데이터에 접근할 수 있습니다.
 */
export const adminSupabase: SupabaseClient | null =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

/**
 * 어드민 클라이언트가 사용 가능한지 확인
 */
export function isAdminClientAvailable(): boolean {
  return adminSupabase !== null;
}
