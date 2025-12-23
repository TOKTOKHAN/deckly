// 제안서 관련 타입 정의

export type ProposalStatus = 'draft' | 'generating' | 'completed' | 'error';

export interface ProposalFormData {
  // 기본 정보
  clientCompanyName: string;
  projectName: string;
  slogan: string; // 제안서 마무리 부분에 사용
  brandColor1: string; // 브랜드 컬러 1
  brandColor2: string; // 브랜드 컬러 2
  brandColor3: string; // 브랜드 컬러 3
  clientLogo?: string; // 고객사 로고 URL (선택)
  clientWebsite?: string; // 고객사 사이트 URL (선택)
  font: string; // 폰트 (기본값: 'Pretendard')

  // 프로젝트 정보
  teamSize: string; // 투입 인력
  startDate: string; // 프로젝트 시작일
  endDate: string; // 개발 종료일
  reviewPeriod: string; // 검수 기간 (예: "2주", "1개월")
  maintenancePeriod: string; // 유지보수 기간 (예: "3개월", "6개월")
  openDate?: string; // 오픈일/런칭일 (선택)

  // 예산
  budgetMin: string;

  // 기타
  target: string[];
  includeSummary: string;
  excludeScope: string;
  priorityFeatures: string;
  projectPhase: string;
  priorityFactor: string;
  transcriptText: string;
  volume: string;
  designStyle: string;
  figureStyle: string;

  // 제거 예정 필드들
  // meetingDate: string;
  // proposalDate: string;
  // clientContact: string;
  // ourContact: string;
}

export interface Proposal extends ProposalFormData {
  id: string;
  status: ProposalStatus;
  progress?: number;
  content?: string;
  error?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GenerationStatus {
  progress: number;
  message: string;
}
