import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AnalyticsPageSkeleton from './AnalyticsPageSkeleton';

const meta = {
  title: 'Components/Skeletons/AnalyticsPageSkeleton',
  component: AnalyticsPageSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AnalyticsPageSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
