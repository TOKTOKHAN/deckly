import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import ProposalForm from './ProposalFormContainer';

const meta = {
  title: 'Proposal/ProposalForm',
  component: ProposalForm,
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
} satisfies Meta<typeof ProposalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
