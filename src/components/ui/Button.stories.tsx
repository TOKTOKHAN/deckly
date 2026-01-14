import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '버튼',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary 버튼',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary 버튼',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline 버튼',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost 버튼',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small 버튼',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large 버튼',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: '로딩 중...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화',
  },
};

export const WithIcon: Story = {
  args: {
    children: '아이콘 버튼',
    icon: '✨',
  },
};

export const IconRight: Story = {
  args: {
    children: '아이콘 오른쪽',
    icon: '→',
    iconPosition: 'right',
  },
};
