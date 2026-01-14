import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UserActionsDropdown from './UserActionsDropdown';
import type { UserWithStats } from '@/lib/supabase/admin/users';

const meta = {
  title: 'Admin/UserActionsDropdown',
  component: UserActionsDropdown,
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'edit' },
    onDelete: { action: 'delete' },
  },
} satisfies Meta<typeof UserActionsDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseUser: UserWithStats = {
  id: '1',
  email: 'user@example.com',
  phone: '010-1234-5678',
  createdAt: '2024-01-01T00:00:00Z',
  lastSignInAt: '2024-01-15T00:00:00Z',
  emailConfirmed: true,
  phoneConfirmed: true,
  userMetadata: { name: '홍길동' },
  proposalCount: 5,
};

export const Default: Story = {
  args: {
    user: baseUser,
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const WithManyProposals: Story = {
  args: {
    user: {
      ...baseUser,
      id: '2',
      proposalCount: 50,
    },
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const NoProposals: Story = {
  args: {
    user: {
      ...baseUser,
      id: '3',
      proposalCount: 0,
    },
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const NoMetadata: Story = {
  args: {
    user: {
      ...baseUser,
      id: '4',
      userMetadata: null,
    },
    onEdit: () => {},
    onDelete: () => {},
  },
};
