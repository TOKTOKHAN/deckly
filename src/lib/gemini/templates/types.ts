/* 제안서 템플릿 타입 정의. 모든 템플릿에서 사용하는 인터페이스와 타입을 정의합니다. */

export interface TemplateData {
  // 기본 정보
  projectName: string;
  clientCompanyName: string;
  clientContact?: string; // 클라이언트 담당자명
  meetingDate?: string; // 미팅 일자
  ourContact?: string; // 제안사 담당자명
  slogan?: string; // 제안서 마무리 부분에 사용
  brandColor1?: string; // 브랜드 컬러 1
  brandColor2?: string; // 브랜드 컬러 2
  brandColor3?: string; // 브랜드 컬러 3
  clientLogo?: string; // 고객사 로고 URL (선택)
  ourLogo?: string; // 제안사 로고 URL (선택)
  clientWebsite?: string; // 고객사 사이트 URL (선택)
  font?: string; // 폰트 (기본값: 'Pretendard')

  // 프로젝트 정보
  teamSize?: string; // 투입 인력
  startDate?: string; // 프로젝트 시작일
  endDate?: string; // 개발 종료일
  reviewPeriod?: string; // 검수 기간
  maintenancePeriod?: string; // 유지보수 기간
  openDate?: string; // 오픈일/런칭일 (선택)

  // 예산
  budgetMin?: string;

  // 기타
  includeSummary?: string;
  projectOverview?: string; // 프로젝트 개요 (includeSummary와 동일한 용도)
  priorityFeatures?: string;
  requirements?: string; // 우선순위 기능 (priorityFeatures와 동일한 용도)
  transcriptText?: string; // 미팅 전사록
  meetingNotes?: string; // 미팅 전사록 (transcriptText와 동일한 용도)
  proposalDate?: string; // 제안서 작성일 (선택, 없으면 현재 날짜 사용)
}

// 본문 섹션 1: 제안 개요 (Introduction)
export interface BodySection1Data {
  // 1.1 제안 배경 및 목적
  background?: {
    quote?: string; // 인용구
    marketBackground?: string; // 시장 배경
    primaryGoal?: string; // 주요 목표
  };
  // 1.2 제안의 범위
  scope?:
    | Array<{
        title: string; // 범위 항목 제목
        description: string; // 범위 항목 설명
      }>
    | string[]; // 기존 호환성을 위해 string[]도 허용 (최대 3개)
  // 1.3 제안사의 특징 및 장점
  strengths?: Array<{
    title: string; // 제목
    description: string; // 설명
  }>; // 최대 3개
}

// 본문 섹션 2: 제안 전략 (Strategy)
export interface BodySection2Data {
  // 2.1 사업 이해 및 분석
  marketAnalysis?: {
    trends?: string[]; // 트렌드 항목들 (최대 3개)
    coreValue?: string; // 핵심 가치
  };
  // 2.2 목표 모델 설계
  targetModel?: {
    legacy?: string; // 레거시
    target?: string; // 목표 모델
    nextGen?: string; // 차세대
  };
  // 2.3 추진 전략
  strategies?: string[]; // 전략 항목들 (최대 3개)
  // 2.4 기대 효과
  benefits?: {
    conversion?: string; // 전환율 증가
    churnRate?: string; // 이탈률 감소
  };
}

// 본문 섹션 3: 기술 및 기능 부문 (Technical Solution)
export interface BodySection3Data {
  // 3.1 시스템 목표 아키텍처
  architecture?: {
    frontend?: string[]; // 프론트엔드 (모바일, 데스크톱 등)
    coreHub?: string; // 코어 허브 이름
    backend?: string[]; // 백엔드 (마이크로서비스, DB 등)
  };
  // 3.2 기능 구현 방안
  features?: string[]; // 기능 항목들 (최대 3개)
  // 3.3 보안 및 데이터 관리
  security?: string[]; // 보안 항목들 (최대 2개)
  // 3.4 시스템 연계 방안
  integrations?:
    | Array<{
        title: string; // 연계 시스템 이름
        description: string; // 연계 방안 설명
      }>
    | string[]; // 기존 호환성을 위해 string[]도 허용
}

// 본문 섹션 4: 사업 관리 부문 (Project Management)
export interface BodySection4Data {
  // 4.1 추진 일정
  timeline?: Array<{
    period: string; // 기간 (예: "M1", "M2", "M3-M5")
    title: string; // 제목
    description: string; // 설명
  }>;
  // 4.2 수행 조직 및 인력
  resources?: Array<{
    role: string; // 역할
    name: string; // 이름/설명
  }>;
  // 4.3 개발 방법론
  methodology?: {
    title?: string; // 제목
    description?: string; // 설명
  };
  // 4.4 품질 보증 계획
  qualityAssurance?: string[]; // 품질 보증 항목들 (최대 3개)
}

// 본문 섹션 5: 사업 지원 부문 (Sustainability & Support)
export interface BodySection5Data {
  // 5.1 교육 훈련 계획
  training?: string[]; // 교육 항목들 (최대 3개)
  // 5.2 기술 이전 계획
  knowledgeTransfer?: string; // 기술 이전 설명
  // 5.3 유지보수 및 운영 지원
  maintenance?: Array<{
    title: string; // 제목
    description: string; // 설명
  }>; // 최대 3개
  // 5.4 비상 대책
  emergency?: {
    title?: string; // 제목
    description?: string; // 설명
    badge?: string; // 배지 텍스트
  };
}
