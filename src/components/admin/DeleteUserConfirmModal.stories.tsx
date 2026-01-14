import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DeleteUserConfirmModal from './DeleteUserConfirmModal';
import type { UserWithStats } from '@/lib/supabase/admin/users';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const meta = {
  title: 'Admin/DeleteUserConfirmModal',
  component: DeleteUserConfirmModal,
  tags: ['autodocs'],
  decorators: [
    Story => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
          <Toaster />
        </QueryClientProvider>
      );
    },
  ],
  argTypes: {
    onClose: { action: 'close' },
    onSuccess: { action: 'success' },
  },
} satisfies Meta<typeof DeleteUserConfirmModal>;

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
    isOpen: true,
    user: baseUser,
    onClose: () => {},
    onSuccess: () => {},
  },
};

export const WithManyProposals: Story = {
  args: {
    isOpen: true,
    user: {
      ...baseUser,
      id: '2',
      proposalCount: 50,
    },
    onClose: () => {},
    onSuccess: () => {},
  },
};

export const NoProposals: Story = {
  args: {
    isOpen: true,
    user: {
      ...baseUser,
      id: '3',
      proposalCount: 0,
    },
    onClose: () => {},
    onSuccess: () => {},
  },
};

export const NoMetadata: Story = {
  args: {
    isOpen: true,
    user: {
      ...baseUser,
      id: '4',
      userMetadata: null,
    },
    onClose: () => {},
    onSuccess: () => {},
  },
};

export const NoPhone: Story = {
  args: {
    isOpen: true,
    user: {
      ...baseUser,
      id: '5',
      phone: null,
    },
    onClose: () => {},
    onSuccess: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    user: baseUser,
    onClose: () => {},
    onSuccess: () => {},
  },
};
