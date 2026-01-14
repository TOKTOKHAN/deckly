import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ResultView from './ResultView';
import type { Proposal } from '@/types/proposal';

const meta = {
  title: 'Proposal/ResultView',
  component: ResultView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onBack: { action: 'back' },
    onRegenerate: { action: 'regenerate' },
    onUpdate: { action: 'update' },
  },
} satisfies Meta<typeof ResultView>;

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 HTML 콘텐츠
const sampleHTML = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>제안서</title>
</head>
<body>
  <div class="a4-page" style="width: 210mm; min-height: 297mm; padding: 2rem; background: white;">
    <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem;">샘플 제안서</h1>
    <p style="font-size: 1rem; line-height: 1.6; color: #333;">
      이것은 샘플 제안서 내용입니다. Storybook에서 제안서 결과 화면을 확인할 수 있습니다.
    </p>
    <div style="margin-top: 2rem; padding: 1rem; background: #f3f4f6; border-radius: 0.5rem;">
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">프로젝트 개요</h2>
      <p style="color: #666;">
        프로젝트에 대한 상세한 설명이 여기에 들어갑니다.
      </p>
    </div>
  </div>
</body>
</html>
`;

const baseProposal: Proposal = {
  id: '1',
  status: 'completed',
  clientCompanyName: '샘플 회사',
  projectName: '샘플 프로젝트',
  slogan: '혁신적인 솔루션',
  brandColor1: '#4f46e5',
  brandColor2: '#1f2937',
  brandColor3: '#ffffff',
  font: 'Pretendard',
  teamSize: '5명',
  startDate: '2024-01-01',
  endDate: '2024-06-30',
  reviewPeriod: '2주',
  maintenancePeriod: '3개월',
  budgetMin: '100000000',
  target: ['실무자', '관리자'],
  includeSummary: '프로젝트 요약 내용',
  excludeScope: '제외 범위',
  priorityFeatures: '핵심 기능',
  projectPhase: '개발',
  priorityFactor: '품질',
  transcriptText: '전사록 내용',
  volume: '표준',
  designStyle: '기업형',
  figureStyle: '범위',
  content: sampleHTML,
  createdAt: '2024-01-01T00:00:00Z',
};

export const Default: Story = {
  args: {
    proposal: baseProposal,
    onBack: () => {},
    onRegenerate: () => {},
    onUpdate: () => {},
  },
};

export const WithLongContent: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '2',
      content: `
<!DOCTYPE html>
<html lang="ko">
<body>
  <div class="a4-page" style="width: 210mm; min-height: 297mm; padding: 2rem;">
    <h1>긴 내용의 제안서</h1>
    ${Array.from(
      { length: 20 },
      (_, i) => `
      <div style="margin-bottom: 2rem;">
        <h2>섹션 ${i + 1}</h2>
        <p>이것은 ${i + 1}번째 섹션의 내용입니다. 제안서가 길어질 때 스크롤과 레이아웃이 어떻게 보이는지 확인할 수 있습니다.</p>
        <ul>
          <li>항목 1</li>
          <li>항목 2</li>
          <li>항목 3</li>
        </ul>
      </div>
    `,
    ).join('')}
  </div>
</body>
</html>
      `,
    },
    onBack: () => {},
    onRegenerate: () => {},
    onUpdate: () => {},
  },
};

export const CustomBrandColors: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '3',
      brandColor1: '#ff6f0f',
      brandColor2: '#00a05b',
      brandColor3: '#ffffff',
      projectName: '당근마켓 프로젝트',
    },
    onBack: () => {},
    onRegenerate: () => {},
    onUpdate: () => {},
  },
};

export const WithoutContent: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '4',
      content: undefined,
    },
    onBack: () => {},
    onRegenerate: () => {},
    onUpdate: () => {},
  },
};

export const MinimalContent: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '5',
      content:
        '<div style="padding: 2rem;"><h1>최소한의 내용</h1><p>간단한 제안서입니다.</p></div>',
    },
    onBack: () => {},
    onRegenerate: () => {},
    onUpdate: () => {},
  },
};
