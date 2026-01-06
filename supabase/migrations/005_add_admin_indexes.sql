-- 성능 최적화를 위한 인덱스 추가
-- 주의: 001_create_proposals_table.sql에서 이미 일부 인덱스가 생성되었을 수 있습니다.
-- IF NOT EXISTS를 사용하여 중복 생성을 방지합니다.

-- 1. created_at 인덱스 (날짜별 정렬 및 필터링 성능 향상)
-- 001에서 이미 생성되었을 수 있지만, DESC 옵션이 없을 수 있으므로 추가
CREATE INDEX IF NOT EXISTS idx_proposals_created_at_desc ON proposals(created_at DESC);

-- 2. status 인덱스 (상태별 필터링 성능 향상)
-- 001에서 이미 생성되었을 수 있음
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);

-- 3. user_id와 created_at 복합 인덱스 (사용자별 최신 제안서 조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_proposals_user_id_created_at ON proposals(user_id, created_at DESC);

-- 4. status와 created_at 복합 인덱스 (상태별 최신 제안서 조회)
CREATE INDEX IF NOT EXISTS idx_proposals_status_created_at ON proposals(status, created_at DESC);

-- 5. error가 있는 제안서 조회를 위한 인덱스 (에러 모니터링용)
CREATE INDEX IF NOT EXISTS idx_proposals_error ON proposals(error) WHERE error IS NOT NULL;

-- 기존 인덱스 확인 (003_add_user_id_to_proposals.sql에서 생성됨)
-- idx_proposals_user_id - 이미 존재

