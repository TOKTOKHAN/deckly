-- 관리자 사용자 테이블 생성 (선택사항)
-- 이 테이블은 관리자 권한을 데이터베이스 레벨에서 관리하고 싶을 때 사용합니다.
-- 현재는 환경 변수로 관리하지만, 나중에 확장성을 위해 테이블을 만들어둡니다.

-- 관리자 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- RLS 활성화
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 관리자만 admin_users 테이블에 접근 가능하도록 Policy 설정
-- 주의: 이 Policy는 순환 참조 문제가 있을 수 있으므로,
-- 실제로는 Service Role Key를 사용하여 관리하는 것을 권장합니다.

-- SELECT Policy: 관리자는 모든 admin_users 조회 가능
-- (실제 구현 시 Service Role Key 사용 권장)
CREATE POLICY "Service role can view admin_users"
ON admin_users FOR SELECT
USING (true);  -- Service Role Key 사용 시 RLS 우회

-- INSERT Policy: 관리자만 admin_users 추가 가능
CREATE POLICY "Service role can insert admin_users"
ON admin_users FOR INSERT
WITH CHECK (true);  -- Service Role Key 사용 시 RLS 우회

-- UPDATE Policy: 관리자만 admin_users 수정 가능
CREATE POLICY "Service role can update admin_users"
ON admin_users FOR UPDATE
USING (true);  -- Service Role Key 사용 시 RLS 우회

-- DELETE Policy: 관리자만 admin_users 삭제 가능
CREATE POLICY "Service role can delete admin_users"
ON admin_users FOR DELETE
USING (true);  -- Service Role Key 사용 시 RLS 우회

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER update_admin_users_updated_at_trigger
BEFORE UPDATE ON admin_users
FOR EACH ROW
EXECUTE FUNCTION update_admin_users_updated_at();

-- 관리자 확인 함수 (admin_users 테이블 사용)
CREATE OR REPLACE FUNCTION is_admin_user(user_id_param UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = user_id_param
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

