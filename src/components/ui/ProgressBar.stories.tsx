import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProgressBar from './ProgressBar';

const meta = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 50,
    message: '처리 중...',
  },
};

export const Start: Story = {
  args: {
    progress: 0,
    message: '시작 중...',
  },
};

export const Quarter: Story = {
  args: {
    progress: 25,
    message: '25% 완료',
  },
};

export const Half: Story = {
  args: {
    progress: 50,
    message: '50% 완료',
  },
};

export const ThreeQuarters: Story = {
  args: {
    progress: 75,
    message: '75% 완료',
  },
};

export const AlmostDone: Story = {
  args: {
    progress: 95,
    message: '거의 완료...',
  },
};

export const Complete: Story = {
  args: {
    progress: 100,
    message: '완료!',
  },
};

export const Generating: Story = {
  args: {
    progress: 45,
    message: '제안서 생성 중...',
  },
};

export const Processing: Story = {
  args: {
    progress: 67,
    message: '데이터 처리 중...',
  },
};

export const Saving: Story = {
  args: {
    progress: 88,
    message: '저장 중...',
  },
};
