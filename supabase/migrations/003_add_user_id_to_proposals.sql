-- proposals 테이블에 user_id 컬럼 추가
ALTER TABLE proposals 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 기존 데이터가 있는 경우를 위한 처리 (개발 환경에서만 사용)
-- 프로덕션에서는 기존 데이터를 어떻게 처리할지 결정 필요
-- UPDATE proposals SET user_id = (SELECT id FROM auth.users LIMIT 1) WHERE user_id IS NULL;

-- user_id를 NOT NULL로 변경 (기존 데이터 처리 후)
-- ALTER TABLE proposals ALTER COLUMN user_id SET NOT NULL;

-- user_id 인덱스 생성 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_proposals_user_id ON proposals(user_id);

-- RLS (Row Level Security) 활성화
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- 기존 정책이 있다면 삭제 (선택사항)
-- DROP POLICY IF EXISTS "Users can view their own proposals" ON proposals;
-- DROP POLICY IF EXISTS "Users can insert their own proposals" ON proposals;
-- DROP POLICY IF EXISTS "Users can update their own proposals" ON proposals;
-- DROP POLICY IF EXISTS "Users can delete their own proposals" ON proposals;

-- SELECT 정책: 본인 제안서만 조회
CREATE POLICY "Users can view own proposals"
ON proposals FOR SELECT
USING (auth.uid() = user_id);

-- INSERT 정책: 본인 ID로만 생성
CREATE POLICY "Users can insert own proposals"
ON proposals FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- UPDATE 정책: 본인 제안서만 수정
CREATE POLICY "Users can update own proposals"
ON proposals FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE 정책: 본인 제안서만 삭제
CREATE POLICY "Users can delete own proposals"
ON proposals FOR DELETE
USING (auth.uid() = user_id);

