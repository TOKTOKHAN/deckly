import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Textarea from './Textarea';

const meta = {
  title: 'Components/Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '설명',
    placeholder: '내용을 입력하세요',
  },
};

export const WithValue: Story = {
  args: {
    label: '프로젝트 설명',
    placeholder: '프로젝트 설명을 입력하세요',
    defaultValue: '이것은 샘플 텍스트입니다.',
  },
};

export const Required: Story = {
  args: {
    label: '필수 입력',
    placeholder: '필수로 입력해야 합니다',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: '설명',
    placeholder: '내용을 입력하세요',
    error: '최소 10자 이상 입력해주세요',
    defaultValue: '짧은 텍스트',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화',
    placeholder: '입력할 수 없습니다',
    disabled: true,
    defaultValue: '비활성화된 텍스트',
  },
};

export const CustomRows: Story = {
  args: {
    label: '긴 텍스트',
    placeholder: '여러 줄 입력이 가능합니다',
    rows: 6,
  },
};

export const LongText: Story = {
  args: {
    label: '긴 텍스트 예시',
    placeholder: '내용을 입력하세요',
    defaultValue:
      '이것은 매우 긴 텍스트의 예시입니다. 여러 줄에 걸쳐 긴 내용을 입력할 수 있습니다. 텍스트 영역이 자동으로 확장되어 사용자가 편리하게 내용을 작성할 수 있습니다.',
    rows: 8,
  },
};
