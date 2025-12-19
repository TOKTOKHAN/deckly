// Gemini API 요청 타입
export interface ProposalRequest {
  meetingNotes?: string;
  title?: string;
  client?: string;
  date?: string;
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
