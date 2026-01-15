import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProposalsTableSkeleton from './ProposalsTableSkeleton';

const meta = {
  title: 'Components/Skeletons/ProposalsTableSkeleton',
  component: ProposalsTableSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ProposalsTableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 5,
  },
};

export const FewRows: Story = {
  args: {
    rows: 3,
  },
};

export const ManyRows: Story = {
  args: {
    rows: 10,
  },
};
