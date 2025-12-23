// 제안서 관련 타입 정의

export type ProposalStatus = 'draft' | 'generating' | 'completed' | 'error';

export interface ProposalFormData {
  clientCompanyName: string;
  projectName: string;
  // 제거 예정 필드들
  // meetingDate: string;
  // proposalDate: string;
  // clientContact: string;
  // ourContact: string;
  target: string[];
  includeSummary: string;
  excludeScope: string;
  priorityFeatures: string;
  projectPhase: string;
  startDate: string;
  openDate: string;
  budgetMin: string;
  budgetMax: string;
  budgetConfirmed: string;
  priorityFactor: string;
  transcriptText: string;
  volume: string;
  designStyle: string;
  figureStyle: string;
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
