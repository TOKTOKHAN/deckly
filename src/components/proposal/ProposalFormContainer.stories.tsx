import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import ProposalFormContainer from './ProposalFormContainer';

const meta = {
  title: 'Components/Proposal/ProposalFormContainer',
  component: ProposalFormContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    Story => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
          <Toaster position="top-right" />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof ProposalFormContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ProposalFormContainer는 실제로 동작하는 컨테이너 컴포넌트입니다.
 *
 * 이 컴포넌트는 다음을 포함합니다:
 * - React Query를 통한 제안서 목록 조회
 * - 제안서 생성, 업데이트, 삭제 Mutation
 * - 제안서 생성 로직 (AI API 호출)
 * - 상태 관리 (view, currentProposal, step 등)
 *
 * 스토리북에서는 실제 API 호출이 발생할 수 있으므로,
 * 개발 환경에서만 테스트하는 것을 권장합니다.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '기본 ProposalFormContainer입니다. 실제 API 호출이 발생할 수 있으므로 개발 환경에서만 테스트하세요.',
      },
    },
  },
};
