-- 방문자 수 통계 테이블 생성
CREATE TABLE IF NOT EXISTS visitor_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  visitor_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 날짜 인덱스 추가 (조회 최적화)
CREATE INDEX IF NOT EXISTS idx_visitor_stats_date ON visitor_stats(date DESC);

-- updated_at 자동 업데이트 함수 (이미 있다면 무시)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
DROP TRIGGER IF EXISTS update_visitor_stats_updated_at ON visitor_stats;
CREATE TRIGGER update_visitor_stats_updated_at
  BEFORE UPDATE ON visitor_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS 정책 (관리자만 접근 가능)
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

-- 관리자는 모든 작업 가능 (admin_users 테이블이 있는 경우)
-- 주석 처리: admin_users 테이블이 없으면 이 정책을 나중에 추가할 수 있습니다
-- CREATE POLICY "Admins can manage visitor_stats"
--   ON visitor_stats
--   FOR ALL
--   USING (
--     EXISTS (
--       SELECT 1 FROM admin_users
--       WHERE admin_users.user_id = auth.uid()
--     )
--   );

-- 기본 정책: 모든 인증된 사용자가 조회 가능 (필요시 수정)
CREATE POLICY "Authenticated users can view visitor_stats"
  ON visitor_stats
  FOR SELECT
  TO authenticated
  USING (true);

-- 인증된 사용자가 삽입 가능 (필요시 수정)
CREATE POLICY "Authenticated users can insert visitor_stats"
  ON visitor_stats
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 서비스 롤은 모든 작업 가능 (백엔드에서 사용)
-- Service Role은 RLS를 우회하므로 별도 정책 불필요
