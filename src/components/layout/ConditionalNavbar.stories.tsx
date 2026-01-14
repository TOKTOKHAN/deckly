import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ConditionalNavbar from './ConditionalNavbar';
import { NotFoundProvider } from '@/contexts/NotFoundContext';

const meta = {
  title: 'Layout/ConditionalNavbar',
  component: ConditionalNavbar,
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
    Story => (
      <NotFoundProvider>
        <Story />
      </NotFoundProvider>
    ),
  ],
} satisfies Meta<typeof ConditionalNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
};

export const OnDashboard: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
};

export const OnAdminPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/admin',
      },
    },
  },
};

export const OnLoginPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/login',
      },
    },
  },
};

export const OnLandingPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
};

export const OnNotFoundPage: Story = {
  decorators: [
    Story => {
      // NotFoundContext를 사용하여 isNotFound 상태를 시뮬레이션
      return (
        <NotFoundProvider>
          <div>
            {/* 실제로는 NotFoundContext가 내부적으로 관리하지만, 
                Storybook에서는 pathname이 '/'가 아니면 표시됨 */}
            <Story />
          </div>
        </NotFoundProvider>
      );
    },
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/some-page',
      },
    },
  },
};
