import { z } from 'zod';

// Hex 색상 코드 검증
const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

export const proposalFormSchema = z
  .object({
    // 기본 정보
    clientCompanyName: z.string().min(1, '클라이언트사를 입력해주세요'),
    projectName: z.string().min(1, '프로젝트명을 입력해주세요'),
    slogan: z.string(),
    brandColor1: z.string().regex(hexColorRegex, '올바른 색상 코드 형식이 아닙니다 (예: #4f46e5)'),
    brandColor2: z.string().regex(hexColorRegex, '올바른 색상 코드 형식이 아닙니다 (예: #1f2937)'),
    brandColor3: z.string().regex(hexColorRegex, '올바른 색상 코드 형식이 아닙니다 (예: #ffffff)'),
    clientLogo: z.string().optional(),
    clientWebsite: z.string().url('올바른 URL 형식이 아닙니다').optional().or(z.literal('')),
    font: z.string().min(1, '폰트를 선택해주세요'),

    // 프로젝트 정보
    teamSize: z.string(),
    startDate: z.string().min(1, '시작일을 선택해주세요'),
    endDate: z.string().min(1, '종료일을 선택해주세요'),
    reviewPeriod: z.string(),
    maintenancePeriod: z.string(),
    openDate: z.string().optional(),

    // 예산
    budgetMin: z.string(),

    // 기타
    target: z.array(z.string()),
    includeSummary: z.string(),
    excludeScope: z.string(),
    priorityFeatures: z.string(),
    projectPhase: z.string(),
    priorityFactor: z.string(),
    transcriptText: z.string().min(50, '최소 50자 이상 입력해주세요'),
    volume: z.string(),
    designStyle: z.string(),
    figureStyle: z.string(),
  })
  .refine(
    data => {
      // 종료일이 시작일 이후인지 확인
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: '종료일은 시작일 이후여야 합니다',
      path: ['endDate'],
    },
  );

export type ProposalFormSchema = z.infer<typeof proposalFormSchema>;
