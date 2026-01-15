import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useEffect } from 'react';
import FormView from './FormView';
import { useProposalFormStore } from '@/stores/proposalFormStore';

const meta = {
  title: 'Components/Proposal/FormView',
  component: FormView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} satisfies Meta<typeof FormView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = {
  render: args => {
    const Step1Wrapper = () => {
      const setStep = useProposalFormStore(state => state.setStep);
      useEffect(() => {
        setStep(1);
      }, [setStep]);
      return <FormView {...args} />;
    };
    return <Step1Wrapper />;
  },
  args: {
    onSubmit: () => {},
  },
};

export const Step2: Story = {
  render: args => {
    const Step2Wrapper = () => {
      const setStep = useProposalFormStore(state => state.setStep);
      useEffect(() => {
        setStep(2);
      }, [setStep]);
      return <FormView {...args} />;
    };
    return <Step2Wrapper />;
  },
  args: {
    onSubmit: () => {},
  },
};
