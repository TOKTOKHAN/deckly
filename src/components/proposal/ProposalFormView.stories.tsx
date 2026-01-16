import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useEffect } from 'react';
import ProposalFormView from './ProposalFormView';
import type { Proposal, GenerationStatus } from '@/types/proposal';
import { useProposalFormStore } from '@/stores/proposalFormStore';

const meta = {
  title: 'Components/Proposal/ProposalFormView',
  component: ProposalFormView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onCreateNew: { action: 'createNew' },
    onSelectProposal: { action: 'selectProposal' },
    onDeleteProposal: { action: 'deleteProposal' },
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
  onCloseForm: () => {},
  onSubmitForm: async () => {},
  onBackFromResult: () => {},
  onRegenerate: async () => {},
  onUpdateProposal: async () => {},
  onCloseDeleteModal: () => {},
  onConfirmDelete: () => {},
};

// Store 초기화를 위한 래퍼 컴포넌트
const ProposalFormViewWrapper = ({
  view,
  step,
  currentProposal,
  proposalToDelete,
  isGenerating,
  genStatus,
  formError,
  resultError,
  ...props
}: React.ComponentProps<typeof ProposalFormView> & {
  view?: 'dashboard' | 'form' | 'result';
  step?: number;
  currentProposal?: Proposal | null;
  proposalToDelete?: Proposal | null;
  isGenerating?: boolean;
  genStatus?: GenerationStatus;
  formError?: string | null;
  resultError?: string | null;
}) => {
  const setView = useProposalFormStore(state => state.setView);
  const setStep = useProposalFormStore(state => state.setStep);
  const setCurrentProposal = useProposalFormStore(state => state.setCurrentProposal);
  const setProposalToDelete = useProposalFormStore(state => state.setProposalToDelete);
  const setIsGenerating = useProposalFormStore(state => state.setIsGenerating);
  const setGenStatus = useProposalFormStore(state => state.setGenStatus);
  const setFormError = useProposalFormStore(state => state.setFormError);
  const setResultError = useProposalFormStore(state => state.setResultError);

  useEffect(() => {
    if (view !== undefined) setView(view);
    if (step !== undefined) setStep(step);
    if (currentProposal !== undefined) setCurrentProposal(currentProposal);
    if (proposalToDelete !== undefined) setProposalToDelete(proposalToDelete);
    if (isGenerating !== undefined) setIsGenerating(isGenerating);
    if (genStatus !== undefined) setGenStatus(genStatus);
    if (formError !== undefined) setFormError(formError);
    if (resultError !== undefined) setResultError(resultError);
  }, [
    view,
    step,
    currentProposal,
    proposalToDelete,
    isGenerating,
    genStatus,
    formError,
    resultError,
    setView,
    setStep,
    setCurrentProposal,
    setProposalToDelete,
    setIsGenerating,
    setGenStatus,
    setFormError,
    setResultError,
  ]);

  return <ProposalFormView {...props} />;
};

// Dashboard View
export const DashboardView: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="dashboard"
      step={1}
      currentProposal={null}
      proposalToDelete={null}
      isGenerating={false}
      genStatus={defaultGenStatus}
      formError={null}
      resultError={null}
    />
  ),
  args: {
    proposals: mockProposals,
    isLoading: false,
    ...defaultHandlers,
  },
};

export const DashboardViewLoading: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="dashboard"
      step={1}
      currentProposal={null}
      proposalToDelete={null}
      isGenerating={false}
      genStatus={defaultGenStatus}
      formError={null}
      resultError={null}
    />
  ),
  args: {
    proposals: mockProposals,
    isLoading: true,
    ...defaultHandlers,
  },
};

export const DashboardViewEmpty: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="dashboard"
      step={1}
      currentProposal={null}
      proposalToDelete={null}
      isGenerating={false}
      genStatus={defaultGenStatus}
      formError={null}
      resultError={null}
    />
  ),
  args: {
    proposals: [],
    isLoading: false,
    ...defaultHandlers,
  },
};

// Form View
export const FormView: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="form"
      step={1}
      currentProposal={null}
      proposalToDelete={null}
      isGenerating={false}
      genStatus={defaultGenStatus}
      formError={null}
      resultError={null}
    />
  ),
  args: {
    proposals: [],
    isLoading: false,
    ...defaultHandlers,
  },
};

export const FormViewStep2: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="form"
      step={2}
      currentProposal={null}
      proposalToDelete={null}
      isGenerating={false}
      genStatus={defaultGenStatus}
      formError={null}
      resultError={null}
    />
  ),
  args: {
    proposals: [],
    isLoading: false,
    ...defaultHandlers,
  },
};

export const FormViewError: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="form"
      step={1}
      currentProposal={null}
      proposalToDelete={null}
      isGenerating={false}
      genStatus={defaultGenStatus}
      formError="제안서 생성 중 오류가 발생했습니다."
      resultError={null}
    />
  ),
  args: {
    proposals: [],
    isLoading: false,
    ...defaultHandlers,
  },
};

// Result View
export const ResultView: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="result"
      step={1}
      currentProposal={mockProposal}
      proposalToDelete={null}
      isGenerating={false}
      genStatus={defaultGenStatus}
      formError={null}
      resultError={null}
    />
  ),
  args: {
    proposals: [],
    isLoading: false,
    ...defaultHandlers,
  },
};

export const ResultViewError: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="result"
      step={1}
      currentProposal={mockProposal}
      proposalToDelete={null}
      isGenerating={false}
      genStatus={defaultGenStatus}
      formError={null}
      resultError="제안서 업데이트 중 오류가 발생했습니다."
    />
  ),
  args: {
    proposals: [],
    isLoading: false,
    ...defaultHandlers,
  },
};

// Generating State
export const Generating: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="dashboard"
      step={1}
      currentProposal={null}
      proposalToDelete={null}
      isGenerating={true}
      genStatus={{
        progress: 60,
        message: 'AI가 상세 내용을 작성하는 중...',
      }}
      formError={null}
      resultError={null}
    />
  ),
  args: {
    proposals: mockProposals,
    isLoading: false,
    ...defaultHandlers,
  },
};

// Delete Modal
export const DeleteModal: Story = {
  render: args => (
    <ProposalFormViewWrapper
      {...args}
      view="dashboard"
      step={1}
      currentProposal={null}
      proposalToDelete={mockProposal}
      isGenerating={false}
      genStatus={defaultGenStatus}
      formError={null}
      resultError={null}
    />
  ),
  args: {
    proposals: mockProposals,
    isLoading: false,
    ...defaultHandlers,
  },
};
