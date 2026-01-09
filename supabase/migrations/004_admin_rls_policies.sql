-- 관리자용 RLS Policy 추가
-- 관리자는 모든 제안서에 접근할 수 있도록 설정

-- 관리자 확인 함수 생성
-- 환경 변수에서 관리자 이메일 목록을 가져와서 확인하는 함수
-- 주의: Supabase에서는 환경 변수를 직접 읽을 수 없으므로,
-- 관리자 이메일 목록을 하드코딩하거나 별도 테이블로 관리해야 합니다.
-- 여기서는 함수를 만들어두고, 실제 관리자 체크는 애플리케이션 레벨에서 수행합니다.

-- 관리자 이메일 목록을 저장할 함수 (선택사항)
-- 실제로는 애플리케이션에서 관리자 체크를 하므로, 이 함수는 참고용입니다.
CREATE OR REPLACE FUNCTION is_admin_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- 관리자 이메일 목록 (실제 사용 시 환경 변수나 별도 테이블에서 가져와야 함)
  -- 여기서는 예시로만 작성
  RETURN email IN (
    'admin@example.com',
    'manager@example.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 관리자용 SELECT Policy: 관리자는 모든 제안서 조회 가능
-- 주의: 실제 구현에서는 애플리케이션 레벨에서 관리자 체크를 하고,
-- Service Role Key를 사용하여 RLS를 우회하는 방식을 권장합니다.
-- 하지만 RLS Policy로도 구현 가능하므로 두 가지 방법을 모두 제공합니다.

-- 방법 1: Service Role Key 사용 (권장)
-- 어드민 API에서는 Service Role Key를 사용하여 RLS를 우회합니다.
-- 따라서 별도의 Policy가 필요 없습니다.

-- 방법 2: RLS Policy로 관리자 체크 (참고용)
-- 아래 Policy는 관리자 이메일을 직접 체크하는 방식입니다.
-- 하지만 Supabase RLS에서는 환경 변수를 읽을 수 없으므로,
-- 관리자 이메일을 하드코딩하거나 별도 테이블에서 관리해야 합니다.

-- 관리자용 SELECT Policy (선택사항 - 실제로는 Service Role Key 사용 권장)
-- CREATE POLICY "Admins can view all proposals"
-- ON proposals FOR SELECT
-- USING (
--   auth.uid() = user_id OR  -- 본인 제안서
--   is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid()))  -- 관리자
-- );

-- 대신, 어드민 API에서는 Service Role Key를 사용하므로
-- 별도의 Policy 없이도 모든 데이터에 접근 가능합니다.
-- 따라서 이 마이그레이션 파일은 주석으로만 남겨두고,
-- 실제 관리자 접근은 애플리케이션 레벨에서 Service Role Key로 처리합니다.

-- 기존 Policy는 그대로 유지하고, 관리자 기능은 Service Role Key로 처리합니다.

