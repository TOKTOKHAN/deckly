import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NavbarSkeleton from './NavbarSkeleton';

const meta = {
  title: 'Components/Skeletons/NavbarSkeleton',
  component: NavbarSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NavbarSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
