import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DetailFilterSkeleton from './DetailFilterSkeleton';

const meta = {
  title: 'Skeletons/DetailFilterSkeleton',
  component: DetailFilterSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DetailFilterSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
