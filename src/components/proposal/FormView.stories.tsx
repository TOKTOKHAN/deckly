import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import FormView from './FormView';

const meta = {
  title: 'Proposal/FormView',
  component: FormView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    step: {
      control: {
        type: 'number',
        min: 1,
        max: 5,
        step: 1,
      },
    },
    onStepChange: { action: 'stepChanged' },
    onClose: { action: 'closed' },
    onSubmit: { action: 'submitted' },
  },
} satisfies Meta<typeof FormView>;

export default meta;
type Story = StoryObj<typeof meta>;

// FormView는 상태 관리가 필요하므로 래퍼 컴포넌트 사용
const FormViewWrapper = (args: React.ComponentProps<typeof FormView>) => {
  const [currentStep, setCurrentStep] = useState(args.step || 1);

  return (
    <FormView
      {...args}
      step={currentStep}
      onStepChange={step => {
        setCurrentStep(step);
        args.onStepChange(step);
      }}
    />
  );
};

export const Step1: Story = {
  render: args => <FormViewWrapper {...args} />,
  args: {
    step: 1,
    onStepChange: () => {},
    onClose: () => {},
    onSubmit: () => {},
  },
};

export const Step2: Story = {
  render: args => <FormViewWrapper {...args} />,
  args: {
    step: 2,
    onStepChange: () => {},
    onClose: () => {},
    onSubmit: () => {},
  },
};

export const Step3: Story = {
  render: args => <FormViewWrapper {...args} />,
  args: {
    step: 3,
    onStepChange: () => {},
    onClose: () => {},
    onSubmit: () => {},
  },
};

export const Step4: Story = {
  render: args => <FormViewWrapper {...args} />,
  args: {
    step: 4,
    onStepChange: () => {},
    onClose: () => {},
    onSubmit: () => {},
  },
};

export const Step5: Story = {
  render: args => <FormViewWrapper {...args} />,
  args: {
    step: 5,
    onStepChange: () => {},
    onClose: () => {},
    onSubmit: () => {},
  },
};
