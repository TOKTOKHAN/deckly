import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StatusBadge from './StatusBadge';

const meta = {
  title: 'Admin/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Completed: Story = {
  args: {
    status: 'completed',
  },
};

export const Generating: Story = {
  args: {
    status: 'generating',
  },
};

export const Draft: Story = {
  args: {
    status: 'draft',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
  },
};
