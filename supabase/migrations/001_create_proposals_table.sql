-- 제안서 테이블 생성
CREATE TABLE IF NOT EXISTS proposals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  client_contact TEXT,
  meeting_date DATE,
  proposal_date DATE,
  our_contact TEXT,
  content TEXT, -- Gemini가 생성한 HTML 제안서
  meeting_notes TEXT, -- 원본 회의록 텍스트
  metadata JSONB DEFAULT '{}'::jsonb, -- 추가 정보 (예산, 기간 등)
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed', 'error')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_proposals_created_at ON proposals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 정책 설정 (선택사항)
-- 인증이 필요 없는 경우 주석 처리
-- ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 자신의 제안서만 볼 수 있도록 정책 설정 (인증 사용 시)
-- CREATE POLICY "Users can view their own proposals"
--   ON proposals FOR SELECT
--   USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert their own proposals"
--   ON proposals FOR INSERT
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can update their own proposals"
--   ON proposals FOR UPDATE
--   USING (auth.uid() = user_id);

-- CREATE POLICY "Users can delete their own proposals"
--   ON proposals FOR DELETE
--   USING (auth.uid() = user_id);

