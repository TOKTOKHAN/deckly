import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProposalCard from './ProposalCard';
import type { Proposal } from '@/types/proposal';

const meta = {
  title: 'Proposal/ProposalCard',
  component: ProposalCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    onDelete: { action: 'deleted' },
  },
} satisfies Meta<typeof ProposalCard>;

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

export const Default: Story = {
  args: {
    proposal: baseProposal,
    onClick: () => {},
  },
};

export const WithDelete: Story = {
  args: {
    proposal: baseProposal,
    onClick: () => {},
    onDelete: () => {},
  },
};

export const Generating: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '2',
      status: 'generating',
      projectName: '생성 중인 프로젝트',
    },
    onClick: () => {},
  },
};

export const Error: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '3',
      status: 'error',
      projectName: '에러가 발생한 프로젝트',
    },
    onClick: () => {},
  },
};

export const Draft: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '4',
      status: 'draft',
      projectName: '초안 프로젝트',
    },
    onClick: () => {},
  },
};

export const LongTitle: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '5',
      projectName:
        '매우 긴 프로젝트 이름이 들어가는 경우에는 어떻게 표시되는지 확인하기 위한 테스트',
    },
    onClick: () => {},
  },
};

export const LongCompanyName: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '6',
      clientCompanyName: '매우 긴 회사 이름 주식회사',
    },
    onClick: () => {},
  },
};

export const NoCreatedAt: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '7',
      createdAt: undefined,
    },
    onClick: () => {},
  },
};

export const NoProjectName: Story = {
  args: {
    proposal: {
      ...baseProposal,
      id: '8',
      projectName: '',
    },
    onClick: () => {},
  },
};
