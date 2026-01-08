-- 방문 기록 로그 테이블 생성 (개별 방문 기록 저장)
CREATE TABLE IF NOT EXISTS visitor_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  visitor_id VARCHAR(255) NOT NULL, -- 쿠키 기반 고유 ID
  user_id UUID, -- 로그인 사용자 ID (nullable)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 날짜별 조회 최적화
CREATE INDEX IF NOT EXISTS idx_visitor_logs_date ON visitor_logs(date DESC);

-- 중복 체크를 위한 복합 인덱스 (같은 날 같은 visitor_id 또는 user_id 체크)
CREATE INDEX IF NOT EXISTS idx_visitor_logs_date_visitor_id ON visitor_logs(date, visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_date_user_id ON visitor_logs(date, user_id) WHERE user_id IS NOT NULL;

-- RLS 정책
ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;

-- 인증된 사용자가 조회 가능
CREATE POLICY "Authenticated users can view visitor_logs"
  ON visitor_logs FOR SELECT
  TO authenticated
  USING (true);

-- 서비스 롤은 모든 작업 가능 (백엔드에서 사용)
-- Service Role은 RLS를 우회하므로 별도 정책 불필요

-- 날짜별 고유 방문자 수를 집계하는 함수
CREATE OR REPLACE FUNCTION get_unique_visitors_by_date(
  start_date DATE,
  end_date DATE
)
RETURNS TABLE (
  date DATE,
  visitor_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    vl.date,
    COUNT(DISTINCT 
      CASE 
        WHEN vl.user_id IS NOT NULL THEN 'user_' || vl.user_id::text
        ELSE 'visitor_' || vl.visitor_id
      END
    )::INTEGER AS visitor_count
  FROM visitor_logs vl
  WHERE vl.date >= start_date 
    AND vl.date <= end_date
  GROUP BY vl.date
  ORDER BY vl.date;
END;
$$ LANGUAGE plpgsql;
