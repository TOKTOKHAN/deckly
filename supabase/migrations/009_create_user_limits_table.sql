-- 사용자별 제안서 생성 제한 테이블 생성
-- 각 사용자 계정당 제안서 생성 개수 제한을 관리합니다.

-- 사용자 제한 테이블 생성
CREATE TABLE IF NOT EXISTS user_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  proposal_total_limit INTEGER DEFAULT NULL, -- NULL = 무제한, 숫자 = 제한 개수
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_user_limits_user_id ON user_limits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_limits_proposal_limit ON user_limits(proposal_total_limit) WHERE proposal_total_limit IS NOT NULL;

-- RLS 활성화
ALTER TABLE user_limits ENABLE ROW LEVEL SECURITY;

-- RLS 정책 설정
-- Service Role Key를 사용하여 관리하므로 모든 작업 허용
CREATE POLICY "Service role can view user_limits"
ON user_limits FOR SELECT
USING (true);

CREATE POLICY "Service role can insert user_limits"
ON user_limits FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can update user_limits"
ON user_limits FOR UPDATE
USING (true);

CREATE POLICY "Service role can delete user_limits"
ON user_limits FOR DELETE
USING (true);

-- updated_at 자동 업데이트 함수 (기존 함수 재사용 가능하지만 명시적으로 생성)
CREATE OR REPLACE FUNCTION update_user_limits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
DROP TRIGGER IF EXISTS update_user_limits_updated_at_trigger ON user_limits;
CREATE TRIGGER update_user_limits_updated_at_trigger
  BEFORE UPDATE ON user_limits
  FOR EACH ROW
  EXECUTE FUNCTION update_user_limits_updated_at();

-- 기본값 설정 테이블 생성 (전역 설정 저장용)
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_app_settings_key ON app_settings(key);

-- RLS 활성화
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- RLS 정책 설정
CREATE POLICY "Service role can view app_settings"
ON app_settings FOR SELECT
USING (true);

CREATE POLICY "Service role can insert app_settings"
ON app_settings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can update app_settings"
ON app_settings FOR UPDATE
USING (true);

CREATE POLICY "Service role can delete app_settings"
ON app_settings FOR DELETE
USING (true);

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_app_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
DROP TRIGGER IF EXISTS update_app_settings_updated_at_trigger ON app_settings;
CREATE TRIGGER update_app_settings_updated_at_trigger
  BEFORE UPDATE ON app_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_app_settings_updated_at();

-- 기본 제안서 생성 제한값 초기 설정 (선택사항)
-- 주석 처리: 필요시 수동으로 설정하거나 어드민 페이지에서 설정
-- INSERT INTO app_settings (key, value, description)
-- VALUES ('default_proposal_limit', NULL, '기본 제안서 생성 제한 개수 (NULL = 무제한)')
-- ON CONFLICT (key) DO NOTHING;
