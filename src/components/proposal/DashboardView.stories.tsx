import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DashboardView from './DashboardView';
import type { Proposal } from '@/types/proposal';

const meta = {
  title: 'Proposal/DashboardView',
  component: DashboardView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onCreateNew: { action: 'createNew' },
    onSelectProposal: { action: 'selectProposal' },
    onDeleteProposal: { action: 'deleteProposal' },
  },
} satisfies Meta<typeof DashboardView>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseProposal: Proposal = {
  id: '1',
  status: 'completed',
  clientCompanyName: '샘플 회사',
  projectName: '샘플 프로젝트',
  slogan: '',
  brandColor1: '#4f46e5',
  brandColor2: '#1f2937',
  brandColor3: '#0a0c10',
  font: 'Pretendard',
  teamSize: '5명',
  startDate: '2024-01-01',
  endDate: '2024-06-30',
  reviewPeriod: '2주',
  maintenancePeriod: '3개월',
  budgetMin: '100000000',
  target: [],
  includeSummary: '',
  excludeScope: '',
  priorityFeatures: '',
  projectPhase: '',
  priorityFactor: '',
  transcriptText: '',
  volume: '',
  designStyle: '',
  figureStyle: '',
  createdAt: '2024-01-01T00:00:00Z',
};

export const Empty: Story = {
  args: {
    proposals: [],
    onCreateNew: () => {},
    onSelectProposal: () => {},
  },
};

export const SingleProposal: Story = {
  args: {
    proposals: [baseProposal],
    onCreateNew: () => {},
    onSelectProposal: () => {},
  },
};

export const MultipleProposals: Story = {
  args: {
    proposals: [
      baseProposal,
      {
        ...baseProposal,
        id: '2',
        projectName: '두 번째 프로젝트',
        clientCompanyName: '다른 회사',
        status: 'generating',
      },
      {
        ...baseProposal,
        id: '3',
        projectName: '세 번째 프로젝트',
        clientCompanyName: '또 다른 회사',
        status: 'completed',
        createdAt: '2024-01-15T00:00:00Z',
      },
    ],
    onCreateNew: () => {},
    onSelectProposal: () => {},
  },
};

export const WithDelete: Story = {
  args: {
    proposals: [
      baseProposal,
      {
        ...baseProposal,
        id: '2',
        projectName: '삭제 가능한 프로젝트',
        status: 'completed',
      },
    ],
    onCreateNew: () => {},
    onSelectProposal: () => {},
    onDeleteProposal: () => {},
  },
};

export const VariousStatuses: Story = {
  args: {
    proposals: [
      {
        ...baseProposal,
        id: '1',
        projectName: '완료된 프로젝트',
        status: 'completed',
      },
      {
        ...baseProposal,
        id: '2',
        projectName: '생성 중인 프로젝트',
        status: 'generating',
      },
      {
        ...baseProposal,
        id: '3',
        projectName: '에러가 발생한 프로젝트',
        status: 'error',
      },
      {
        ...baseProposal,
        id: '4',
        projectName: '초안 프로젝트',
        status: 'draft',
      },
    ],
    onCreateNew: () => {},
    onSelectProposal: () => {},
    onDeleteProposal: () => {},
  },
};

export const ManyProposals: Story = {
  args: {
    proposals: Array.from({ length: 9 }, (_, i) => ({
      ...baseProposal,
      id: String(i + 1),
      projectName: `프로젝트 ${i + 1}`,
      clientCompanyName: `회사 ${i + 1}`,
      status: (['completed', 'generating', 'draft', 'error'] as const)[i % 4],
      createdAt: new Date(2024, 0, i + 1).toISOString(),
    })),
    onCreateNew: () => {},
    onSelectProposal: () => {},
    onDeleteProposal: () => {},
  },
};
