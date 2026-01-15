import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import GeneratingOverlay from './GeneratingOverlay';

const meta = {
  title: 'Components/Proposal/GeneratingOverlay',
  component: GeneratingOverlay,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isGenerating: {
      control: 'boolean',
    },
    genStatus: {
      control: 'object',
    },
  },
} satisfies Meta<typeof GeneratingOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {
  args: {
    isGenerating: true,
    genStatus: {
      progress: 0,
      message: '시작 중...',
    },
  },
};

export const Generating: Story = {
  args: {
    isGenerating: true,
    genStatus: {
      progress: 35,
      message: '제안서 생성 중...',
    },
  },
};

export const HalfWay: Story = {
  args: {
    isGenerating: true,
    genStatus: {
      progress: 50,
      message: '50% 완료',
    },
  },
};

export const AlmostDone: Story = {
  args: {
    isGenerating: true,
    genStatus: {
      progress: 85,
      message: '거의 완료...',
    },
  },
};

export const Complete: Story = {
  args: {
    isGenerating: true,
    genStatus: {
      progress: 100,
      message: '완료!',
    },
  },
};

export const Analyzing: Story = {
  args: {
    isGenerating: true,
    genStatus: {
      progress: 25,
      message: '전사록 분석 중...',
    },
  },
};

export const Processing: Story = {
  args: {
    isGenerating: true,
    genStatus: {
      progress: 60,
      message: '데이터 처리 중...',
    },
  },
};

export const Finalizing: Story = {
  args: {
    isGenerating: true,
    genStatus: {
      progress: 90,
      message: '최종 정리 중...',
    },
  },
};

export const Hidden: Story = {
  args: {
    isGenerating: false,
    genStatus: {
      progress: 0,
      message: '',
    },
  },
};
