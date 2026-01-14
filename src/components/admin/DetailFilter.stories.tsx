import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DetailFilter from './DetailFilter';

const meta = {
  title: 'Admin/DetailFilter',
  component: DetailFilter,
  tags: ['autodocs'],
  argTypes: {
    onApply: { action: 'apply' },
  },
} satisfies Meta<typeof DetailFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

const ownerOptions = [
  { value: 'user1', label: '홍길동' },
  { value: 'user2', label: '김철수' },
  { value: 'user3', label: '이영희' },
];

const clientOptions = [
  { value: 'client1', label: '삼성전자' },
  { value: 'client2', label: 'LG전자' },
  { value: 'client3', label: 'SK하이닉스' },
  { value: 'client4', label: '네이버' },
  { value: 'client5', label: '카카오' },
];

export const Default: Story = {
  args: {
    ownerOptions,
    clientOptions,
    selectedOwner: 'all',
    selectedClient: 'all',
    selectedStatus: 'all',
    onApply: () => {},
  },
};

export const WithSelectedOwner: Story = {
  args: {
    ownerOptions,
    clientOptions,
    selectedOwner: 'user1',
    selectedClient: 'all',
    selectedStatus: 'all',
    onApply: () => {},
  },
};

export const WithSelectedClient: Story = {
  args: {
    ownerOptions,
    clientOptions,
    selectedOwner: 'all',
    selectedClient: 'client1',
    selectedStatus: 'all',
    onApply: () => {},
  },
};

export const WithSelectedStatus: Story = {
  args: {
    ownerOptions,
    clientOptions,
    selectedOwner: 'all',
    selectedClient: 'all',
    selectedStatus: 'completed',
    onApply: () => {},
  },
};

export const AllFiltersSelected: Story = {
  args: {
    ownerOptions,
    clientOptions,
    selectedOwner: 'user2',
    selectedClient: 'client3',
    selectedStatus: 'error',
    onApply: () => {},
  },
};

export const ManyOptions: Story = {
  args: {
    ownerOptions: Array.from({ length: 20 }, (_, i) => ({
      value: `user${i + 1}`,
      label: `사용자 ${i + 1}`,
    })),
    clientOptions: Array.from({ length: 15 }, (_, i) => ({
      value: `client${i + 1}`,
      label: `고객사 ${i + 1}`,
    })),
    selectedOwner: 'all',
    selectedClient: 'all',
    selectedStatus: 'all',
    onApply: () => {},
  },
};
