import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LoadingState from './LoadingState';

const meta = {
  title: 'Admin/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    message: '제안서를 불러오는 중...',
  },
};

export const WithSubMessage: Story = {
  args: {
    message: '데이터를 처리하는 중...',
    subMessage: '잠시만 기다려주세요.',
  },
};

export const LongMessage: Story = {
  args: {
    message: '복잡한 데이터를 분석하고 있습니다. 이 작업은 몇 분 정도 소요될 수 있습니다.',
    subMessage: '페이지를 닫지 마세요.',
  },
};
