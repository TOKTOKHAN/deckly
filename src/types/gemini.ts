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
}

// Gemini API 응답 타입
export interface ProposalResponse {
  content: string;
  success: boolean;
  error?: string;
}
