import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ColorInput from './ColorInput';

const meta = {
  title: 'Form/ColorInput',
  component: ColorInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ColorInput>;

export default meta;

// ColorInput은 상태 관리가 필요하므로 래퍼 컴포넌트 사용
// onChange와 onTextChange는 래퍼에서 관리하므로 args에서 제외
type ColorInputArgs = Omit<React.ComponentProps<typeof ColorInput>, 'onChange' | 'onTextChange'>;

const ColorInputWrapper = (args: Partial<ColorInputArgs>) => {
  const [value, setValue] = useState(args.value || '#4f46e5');

  // args를 ColorInputArgs로 변환 (필수 필드가 있는지 확인)
  const colorInputProps: ColorInputArgs = {
    label: args.label || '',
    id: args.id || '',
    value: value,
    ...args,
  };

  return (
    <ColorInput
      {...colorInputProps}
      onChange={newValue => setValue(newValue)}
      onTextChange={e => setValue(e.target.value)}
    />
  );
};

// Story 타입을 커스텀 정의 (onChange, onTextChange 제외)
type Story = Omit<StoryObj<typeof meta>, 'args'> & {
  args?: Partial<ColorInputArgs>;
  render?: (args: Partial<ColorInputArgs>) => JSX.Element;
};

export const Default: Story = {
  render: args => <ColorInputWrapper {...args} />,
  args: {
    label: '브랜드 컬러',
    id: 'brand-color',
    value: '#4f46e5',
    placeholder: '#4f46e5',
  },
};

export const Required: Story = {
  render: args => <ColorInputWrapper {...args} />,
  args: {
    label: '필수 컬러',
    id: 'required-color',
    value: '#1f2937',
    placeholder: '#1f2937',
    required: true,
  },
};

export const WithError: Story = {
  render: args => <ColorInputWrapper {...args} />,
  args: {
    label: '컬러 입력',
    id: 'error-color',
    value: '#invalid',
    placeholder: '#4f46e5',
    error: '올바른 HEX 컬러 형식이 아닙니다',
  },
};

export const PrimaryColor: Story = {
  render: args => <ColorInputWrapper {...args} />,
  args: {
    label: 'Primary Color',
    id: 'primary-color',
    value: '#4f46e5',
    placeholder: '#4f46e5',
  },
};

export const SecondaryColor: Story = {
  render: args => <ColorInputWrapper {...args} />,
  args: {
    label: 'Secondary Color',
    id: 'secondary-color',
    value: '#1f2937',
    placeholder: '#1f2937',
  },
};

export const TertiaryColor: Story = {
  render: args => <ColorInputWrapper {...args} />,
  args: {
    label: 'Tertiary Color',
    id: 'tertiary-color',
    value: '#0a0c10',
    placeholder: '#0a0c10',
  },
};

export const BrightColor: Story = {
  render: args => <ColorInputWrapper {...args} />,
  args: {
    label: '밝은 컬러',
    id: 'bright-color',
    value: '#ff6f0f',
    placeholder: '#ff6f0f',
  },
};

export const GreenColor: Story = {
  render: args => <ColorInputWrapper {...args} />,
  args: {
    label: '초록색',
    id: 'green-color',
    value: '#00a05b',
    placeholder: '#00a05b',
  },
};
