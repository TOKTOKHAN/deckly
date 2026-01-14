import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import EmptyState from './EmptyState';

const meta = {
  title: 'Admin/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomMessage: Story = {
  args: {
    message: '제안서가 없습니다.',
  },
};

export const WithSearchQuery: Story = {
  args: {
    searchQuery: '검색어',
  },
};

export const WithDefaultMessage: Story = {
  args: {
    defaultMessage: '데이터를 찾을 수 없습니다.',
  },
};

export const CustomClassName: Story = {
  args: {
    message: '커스텀 스타일',
    className: 'py-20 bg-slate-50',
  },
};
