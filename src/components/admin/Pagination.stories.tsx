import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Pagination from './Pagination';

const meta = {
  title: 'Components/Admin/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    onPageChange: { action: 'pageChange' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    onPageChange: () => {},
  },
};

export const WithPageNumbers: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    showPageNumbers: true,
    onPageChange: () => {},
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    onPageChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    onPageChange: () => {},
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    onPageChange: () => {},
  },
};

export const CustomLabels: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    totalItems: 100,
    itemsPerPage: 10,
    itemLabel: 'proposals',
    prevLabel: '이전',
    nextLabel: '다음',
    onPageChange: () => {},
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 5,
    itemsPerPage: 10,
    onPageChange: () => {},
  },
};

export const LargeDataset: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    totalItems: 1000,
    itemsPerPage: 10,
    showPageNumbers: true,
    onPageChange: () => {},
  },
};
