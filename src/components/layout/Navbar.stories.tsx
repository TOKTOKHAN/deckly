import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Navbar from './Navbar';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const meta = {
  title: 'Components/Layout/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
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
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock authenticated user
const mockAuthenticatedUser: Partial<User> = {
  id: '1',
  email: 'user@example.com',
  user_metadata: {
    name: '홍길동',
  },
};

// Mock admin user
const mockAdminUser: Partial<User> = {
  id: '2',
  email: 'admin@deckly.com',
  user_metadata: {
    name: '관리자',
    isAdmin: true,
  },
};

export const NotAuthenticated: Story = {
  decorators: [
    Story => {
      useAuthStore.setState({
        user: null,
        isLoading: false,
        isAdmin: false,
      });
      return <Story />;
    },
  ],
};

export const Authenticated: Story = {
  decorators: [
    Story => {
      useAuthStore.setState({
        user: mockAuthenticatedUser as User,
        isLoading: false,
        isAdmin: false,
      });
      return <Story />;
    },
  ],
};

export const AuthenticatedWithName: Story = {
  decorators: [
    Story => {
      useAuthStore.setState({
        user: {
          ...mockAuthenticatedUser,
          user_metadata: {
            name: '김철수',
          },
        } as User,
        isLoading: false,
        isAdmin: false,
      });
      return <Story />;
    },
  ],
};

export const AdminUser: Story = {
  decorators: [
    Story => {
      useAuthStore.setState({
        user: mockAdminUser as User,
        isLoading: false,
        isAdmin: true,
      });
      return <Story />;
    },
  ],
};

export const Loading: Story = {
  decorators: [
    Story => {
      useAuthStore.setState({
        user: null,
        isLoading: true,
        isAdmin: false,
      });
      return <Story />;
    },
  ],
};
