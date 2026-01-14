import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UsersPageSkeleton from './UsersPageSkeleton';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@supabase/supabase-js';

const meta = {
  title: 'Skeletons/UsersPageSkeleton',
  component: UsersPageSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/admin/users' },
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
} satisfies Meta<typeof UsersPageSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
