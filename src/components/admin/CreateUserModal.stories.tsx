import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CreateUserModal from './CreateUserModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const meta = {
  title: 'Admin/CreateUserModal',
  component: CreateUserModal,
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
} satisfies Meta<typeof CreateUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSuccess: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onSuccess: () => {},
  },
};
