-- 기존 테이블에 누락된 컬럼 추가 (안전 버전)
-- 이 스크립트는 기존 데이터를 삭제하지 않습니다.
-- 컬럼이 이미 있으면 추가하지 않고, 새 컬럼은 NULL 허용으로 추가됩니다.

-- 1. 누락된 컬럼 추가 (이미 존재하면 에러 발생하지 않도록 체크)
DO $$
BEGIN
  -- client_contact 컬럼 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'proposals' AND column_name = 'client_contact') THEN
    ALTER TABLE proposals ADD COLUMN client_contact TEXT;
    RAISE NOTICE '컬럼 추가됨: client_contact';
  ELSE
    RAISE NOTICE '컬럼 이미 존재: client_contact';
  END IF;

  -- meeting_date 컬럼 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'proposals' AND column_name = 'meeting_date') THEN
    ALTER TABLE proposals ADD COLUMN meeting_date DATE;
    RAISE NOTICE '컬럼 추가됨: meeting_date';
  ELSE
    RAISE NOTICE '컬럼 이미 존재: meeting_date';
  END IF;

  -- proposal_date 컬럼 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'proposals' AND column_name = 'proposal_date') THEN
    ALTER TABLE proposals ADD COLUMN proposal_date DATE;
    RAISE NOTICE '컬럼 추가됨: proposal_date';
  ELSE
    RAISE NOTICE '컬럼 이미 존재: proposal_date';
  END IF;

  -- our_contact 컬럼 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'proposals' AND column_name = 'our_contact') THEN
    ALTER TABLE proposals ADD COLUMN our_contact TEXT;
    RAISE NOTICE '컬럼 추가됨: our_contact';
  ELSE
    RAISE NOTICE '컬럼 이미 존재: our_contact';
  END IF;

  -- status 컬럼 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'proposals' AND column_name = 'status') THEN
    -- 기존 데이터를 보호하기 위해 기본값을 'draft'로 설정
    ALTER TABLE proposals ADD COLUMN status TEXT DEFAULT 'draft';
    -- 기존 레코드의 status를 'draft'로 업데이트 (NULL 방지)
    UPDATE proposals SET status = 'draft' WHERE status IS NULL;
    -- CHECK 제약조건 추가
    ALTER TABLE proposals ADD CONSTRAINT proposals_status_check 
      CHECK (status IN ('draft', 'generating', 'completed', 'error'));
    RAISE NOTICE '컬럼 추가됨: status';
  ELSE
    RAISE NOTICE '컬럼 이미 존재: status';
  END IF;

  -- progress 컬럼 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'proposals' AND column_name = 'progress') THEN
    -- 기존 데이터를 보호하기 위해 기본값을 0으로 설정
    ALTER TABLE proposals ADD COLUMN progress INTEGER DEFAULT 0;
    -- 기존 레코드의 progress를 0으로 업데이트 (NULL 방지)
    UPDATE proposals SET progress = 0 WHERE progress IS NULL;
    -- CHECK 제약조건 추가
    ALTER TABLE proposals ADD CONSTRAINT proposals_progress_check 
      CHECK (progress >= 0 AND progress <= 100);
    RAISE NOTICE '컬럼 추가됨: progress';
  ELSE
    RAISE NOTICE '컬럼 이미 존재: progress';
  END IF;

  -- error 컬럼 추가
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'proposals' AND column_name = 'error') THEN
    ALTER TABLE proposals ADD COLUMN error TEXT;
    RAISE NOTICE '컬럼 추가됨: error';
  ELSE
    RAISE NOTICE '컬럼 이미 존재: error';
  END IF;
END $$;

-- 2. metadata 컬럼에 DEFAULT 값 추가 (기존 데이터는 변경하지 않음)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'proposals' AND column_name = 'metadata') THEN
    ALTER TABLE proposals ALTER COLUMN metadata SET DEFAULT '{}'::jsonb;
    RAISE NOTICE 'metadata 기본값 설정됨';
  END IF;
END $$;

-- 3. created_at과 updated_at 타입 변경 (기존 데이터는 자동 변환됨)
-- 주의: 이 부분은 타임존 정보를 추가하는 것이므로 기존 데이터는 그대로 유지됩니다.
DO $$
BEGIN
  -- created_at 타입 변경
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'proposals' 
    AND column_name = 'created_at' 
    AND data_type = 'timestamp without time zone'
  ) THEN
    ALTER TABLE proposals ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE USING created_at AT TIME ZONE 'UTC';
    RAISE NOTICE 'created_at 타입 변경됨';
  END IF;

  -- updated_at 타입 변경
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'proposals' 
    AND column_name = 'updated_at' 
    AND data_type = 'timestamp without time zone'
  ) THEN
    ALTER TABLE proposals ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE USING updated_at AT TIME ZONE 'UTC';
    RAISE NOTICE 'updated_at 타입 변경됨';
  END IF;
END $$;

-- 4. 인덱스 생성 (이미 존재하면 에러 발생하지 않음)
CREATE INDEX IF NOT EXISTS idx_proposals_created_at ON proposals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);

-- 5. updated_at 자동 업데이트 트리거 함수 생성 (이미 있으면 교체)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. 트리거 생성 (이미 있으면 교체)
DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;
CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 완료 메시지
DO $$
BEGIN
  RAISE NOTICE '마이그레이션 완료! 기존 데이터는 모두 보존되었습니다.';
END $$;

