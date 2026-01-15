import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PageHeader from './PageHeader';
import { FileText, Users } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@supabase/supabase-js';

const meta = {
  title: 'Components/Admin/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  decorators: [
    Story => {
      // Mock user for Storybook
      const mockUser: Partial<User> = {
        id: '1',
        email: 'admin@deckly.com',
      };
      useAuthStore.setState({
        user: mockUser as User,
      });
      return <Story />;
    },
  ],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '대시보드',
  },
};

export const WithDescription: Story = {
  args: {
    title: '제안서 관리',
    description: '모든 제안서를 한눈에 확인하고 관리하세요.',
  },
};

export const WithBadge: Story = {
  args: {
    badge: {
      icon: <FileText size={12} />,
      text: 'Proposals',
    },
    title: '제안서 관리',
    description: '제안서를 생성하고 관리합니다.',
  },
};

export const WithCustomBadge: Story = {
  args: {
    badge: {
      icon: <Users size={12} />,
      text: 'Users',
      className: 'border-indigo-100 bg-indigo-50 text-indigo-600',
    },
    title: '사용자 관리',
    description: '사용자 계정을 관리합니다.',
  },
};

export const WithoutDate: Story = {
  args: {
    title: '통계 및 분석',
    showDate: false,
  },
};

export const WithoutAvatar: Story = {
  args: {
    title: '설정',
    showUserAvatar: false,
  },
};

export const WithoutDateAndAvatar: Story = {
  args: {
    title: '대시보드',
    showDate: false,
    showUserAvatar: false,
  },
};

export const LongTitle: Story = {
  args: {
    title: '매우 긴 제목이 들어가는 경우의 예시입니다',
    description: '이런 경우 레이아웃이 어떻게 보이는지 확인할 수 있습니다.',
  },
};
