import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProposalFormView from './ProposalFormView';
import type { Proposal, GenerationStatus } from '@/types/proposal';

const meta = {
  title: 'Proposal/ProposalFormView',
  component: ProposalFormView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onCreateNew: { action: 'createNew' },
    onSelectProposal: { action: 'selectProposal' },
    onDeleteProposal: { action: 'deleteProposal' },
    onStepChange: { action: 'stepChange' },
    onCloseForm: { action: 'closeForm' },
    onSubmitForm: { action: 'submitForm' },
    onBackFromResult: { action: 'backFromResult' },
    onRegenerate: { action: 'regenerate' },
    onUpdateProposal: { action: 'updateProposal' },
    onCloseDeleteModal: { action: 'closeDeleteModal' },
    onConfirmDelete: { action: 'confirmDelete' },
  },
} satisfies Meta<typeof ProposalFormView>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock 데이터
const mockProposal: Proposal = {
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
  target: [],
  includeSummary: '프로젝트 개요',
  excludeScope: '',
  priorityFeatures: '주요 기능',
  projectPhase: '',
  priorityFactor: '',
  transcriptText: '미팅 전사록 내용',
  volume: '표준',
  designStyle: '기업형',
  figureStyle: '범위',
  content: '<div>제안서 내용</div>',
  progress: 100,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const mockProposals: Proposal[] = [
  mockProposal,
  {
    ...mockProposal,
    id: '2',
    projectName: '두 번째 프로젝트',
    status: 'generating',
    progress: 50,
  },
  {
    ...mockProposal,
    id: '3',
    projectName: '세 번째 프로젝트',
    status: 'error',
    error: '생성 중 오류 발생',
  },
];

const defaultGenStatus: GenerationStatus = {
  progress: 0,
  message: '',
};

const defaultHandlers = {
  onCreateNew: () => {},
  onSelectProposal: () => {},
  onDeleteProposal: () => {},
  onStepChange: () => {},
  onCloseForm: () => {},
  onSubmitForm: async () => {},
  onBackFromResult: () => {},
  onRegenerate: async () => {},
  onUpdateProposal: async () => {},
  onCloseDeleteModal: () => {},
  onConfirmDelete: () => {},
};

// Dashboard View
export const DashboardView: Story = {
  args: {
    view: 'dashboard',
    proposals: mockProposals,
    currentProposal: null,
    step: 1,
    isProposalsLoading: false,
    isGenerating: false,
    genStatus: defaultGenStatus,
    proposalToDelete: null,
    formError: null,
    resultError: null,
    ...defaultHandlers,
  },
};

export const DashboardViewLoading: Story = {
  args: {
    ...DashboardView.args,
    isProposalsLoading: true,
  },
};

export const DashboardViewEmpty: Story = {
  args: {
    ...DashboardView.args,
    proposals: [],
  },
};

// Form View
export const FormView: Story = {
  args: {
    view: 'form',
    proposals: [],
    currentProposal: null,
    step: 1,
    isProposalsLoading: false,
    isGenerating: false,
    genStatus: defaultGenStatus,
    proposalToDelete: null,
    formError: null,
    resultError: null,
    ...defaultHandlers,
  },
};

export const FormViewStep2: Story = {
  args: {
    ...FormView.args,
    step: 2,
  },
};

export const FormViewStep3: Story = {
  args: {
    ...FormView.args,
    step: 3,
  },
};

export const FormViewError: Story = {
  args: {
    ...FormView.args,
    formError: '제안서 생성 중 오류가 발생했습니다.',
  },
};

// Result View
export const ResultView: Story = {
  args: {
    view: 'result',
    proposals: [],
    currentProposal: mockProposal,
    step: 1,
    isProposalsLoading: false,
    isGenerating: false,
    genStatus: defaultGenStatus,
    proposalToDelete: null,
    formError: null,
    resultError: null,
    ...defaultHandlers,
  },
};

export const ResultViewError: Story = {
  args: {
    ...ResultView.args,
    resultError: '제안서 업데이트 중 오류가 발생했습니다.',
  },
};

// Generating State
export const Generating: Story = {
  args: {
    view: 'dashboard',
    proposals: mockProposals,
    currentProposal: null,
    step: 1,
    isProposalsLoading: false,
    isGenerating: true,
    genStatus: {
      progress: 60,
      message: 'AI가 상세 내용을 작성하는 중...',
    },
    proposalToDelete: null,
    formError: null,
    resultError: null,
    ...defaultHandlers,
  },
};

// Delete Modal
export const DeleteModal: Story = {
  args: {
    view: 'dashboard',
    proposals: mockProposals,
    currentProposal: null,
    step: 1,
    isProposalsLoading: false,
    isGenerating: false,
    genStatus: defaultGenStatus,
    proposalToDelete: mockProposal,
    formError: null,
    resultError: null,
    ...defaultHandlers,
  },
};
