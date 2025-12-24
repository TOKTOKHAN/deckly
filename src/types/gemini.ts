// Gemini API 요청 타입
export interface ProposalRequest {
  meetingNotes?: string;
  title?: string;
  client?: string;
  date?: string;
  clientContact?: string; // 클라이언트 담당자명
  proposalDate?: string; // 제안서 작성일
  ourContact?: string; // 제안사 담당자명
  projectOverview?: string;
  budget?: string;
  period?: string;
  requirements?: string;

  // Step 1 추가 필드들
  slogan?: string; // 슬로건
  brandColor1?: string; // 브랜드 컬러 1
  brandColor2?: string; // 브랜드 컬러 2
  brandColor3?: string; // 브랜드 컬러 3
  clientLogo?: string; // 고객사 로고 URL
  clientWebsite?: string; // 고객사 사이트 URL
  font?: string; // 폰트
  teamSize?: string; // 투입 인력
  startDate?: string; // 프로젝트 시작일
  endDate?: string; // 개발 종료일
  reviewPeriod?: string; // 검수 기간
  maintenancePeriod?: string; // 유지보수 기간
  openDate?: string; // 오픈일/런칭일
}

// Gemini API 응답 타입
export interface ProposalResponse {
  content: string;
  success: boolean;
  error?: string;
}
