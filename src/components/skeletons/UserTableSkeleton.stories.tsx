import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UserTableSkeleton from './UserTableSkeleton';

const meta = {
  title: 'Components/Skeletons/UserTableSkeleton',
  component: UserTableSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof UserTableSkeleton>;

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
