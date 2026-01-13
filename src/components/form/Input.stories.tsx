import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Search, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Input from './Input';

const meta = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

export const WithValue: Story = {
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'email@example.com',
    defaultValue: 'user@example.com',
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
    label: '이메일',
    type: 'email',
    placeholder: 'email@example.com',
    error: '올바른 이메일 형식이 아닙니다',
    defaultValue: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화',
    placeholder: '입력할 수 없습니다',
    disabled: true,
    defaultValue: '비활성화된 값',
  },
};

export const WithIcon: Story = {
  args: {
    label: '검색',
    placeholder: '검색어를 입력하세요',
    icon: <Search size={20} />,
  },
};

export const EmailInput: Story = {
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'email@example.com',
    icon: <Mail size={20} />,
  },
};

const PasswordInputWithToggle = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      label="비밀번호"
      type={showPassword ? 'text' : 'password'}
      placeholder="비밀번호를 입력하세요"
      icon={<Lock size={20} />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-slate-400 hover:text-slate-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      }
    />
  );
};

export const PasswordWithToggle: Story = {
  render: () => <PasswordInputWithToggle />,
};

export const WithoutLabel: Story = {
  args: {
    placeholder: '라벨 없이 입력',
    hideLabel: true,
  },
};

export const CustomLabel: Story = {
  args: {
    label: '커스텀 라벨 스타일',
    labelClassName: 'text-lg font-bold text-blue-600',
    placeholder: '커스텀 스타일이 적용된 라벨',
  },
};

export const NumberInput: Story = {
  args: {
    label: '숫자 입력',
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 100,
  },
};

export const TelInput: Story = {
  args: {
    label: '전화번호',
    type: 'tel',
    placeholder: '010-1234-5678',
  },
};
