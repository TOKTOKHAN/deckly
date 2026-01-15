import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Step2Form from './Step2Form';
import { ProposalFormData } from '@/types/proposal';
import { proposalFormSchema } from '@/lib/validations/proposalSchema';

// Step2Form은 react-hook-form을 사용하므로 래퍼 컴포넌트 필요
const Step2FormWrapper = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    mode: 'all',
  });

  const formData = watch() as ProposalFormData;

  return <Step2Form register={register} errors={errors} formData={formData} />;
};

const WithTextWrapper = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    mode: 'all',
    defaultValues: {
      transcriptText:
        '이것은 테스트용 미팅 전사록입니다. AI가 분석할 수 있도록 충분한 내용을 입력해야 합니다.',
    },
  });

  const formData = watch() as ProposalFormData;

  return <Step2Form register={register} errors={errors} formData={formData} />;
};

const meta = {
  title: 'Components/Proposal/Step2Form',
  component: Step2FormWrapper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step2FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Step2FormWrapper />,
};

export const WithText: Story = {
  render: () => <WithTextWrapper />,
};
