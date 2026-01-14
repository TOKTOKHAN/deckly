import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DashboardPageSkeleton from './DashboardPageSkeleton';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@supabase/supabase-js';

const meta = {
  title: 'Skeletons/DashboardPageSkeleton',
  component: DashboardPageSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/admin' },
    },
  },
  decorators: [
    Story => {
      const mockUser: Partial<User> = {
        id: '1',
        email: 'admin@deckly.com',
      };
      useAuthStore.setState({ user: mockUser as User });
      return <Story />;
    },
  ],
} satisfies Meta<typeof DashboardPageSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
