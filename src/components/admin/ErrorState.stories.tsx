import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ErrorState from './ErrorState';

const meta = {
  title: 'Admin/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  argTypes: {
    onRetry: { action: 'retry' },
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: new Error('데이터를 불러오는 중 오류가 발생했습니다.'),
  },
};

export const WithRetry: Story = {
  args: {
    error: new Error('네트워크 오류가 발생했습니다.'),
    onRetry: () => {},
  },
};

export const CustomTitle: Story = {
  args: {
    error: new Error('서버 오류'),
    title: '오류 발생',
  },
};

export const ServiceRoleKeyError: Story = {
  args: {
    error: new Error('Service Role Key가 설정되지 않았습니다.'),
    showServiceRoleKeyHelp: true,
  },
};

export const UnknownError: Story = {
  args: {
    error: '알 수 없는 오류',
  },
};
