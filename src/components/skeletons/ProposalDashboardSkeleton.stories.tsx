import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProposalDashboardSkeleton from './ProposalDashboardSkeleton';

const meta = {
  title: 'Components/Skeletons/ProposalDashboardSkeleton',
  component: ProposalDashboardSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProposalDashboardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    includeWrapper: true,
  },
};

export const WithoutWrapper: Story = {
  args: {
    includeWrapper: false,
  },
};
