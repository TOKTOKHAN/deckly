import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Step1Form from './Step1Form';
import { ProposalFormData } from '@/types/proposal';
import { proposalFormSchema } from '@/lib/validations/proposalSchema';
import { useFileUpload } from '@/hooks/useFileUpload';

// Step1Form은 react-hook-form을 사용하므로 래퍼 컴포넌트 필요
const Step1FormWrapper = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    mode: 'all',
  });

  const formData = watch() as ProposalFormData;

  const clientLogoUpload = useFileUpload<ProposalFormData>({
    field: 'clientLogo',
    setValue,
  });

  const ourLogoUpload = useFileUpload<ProposalFormData>({
    field: 'ourLogo',
    setValue,
  });

  return (
    <Step1Form
      register={register}
      errors={errors}
      formData={formData}
      setValue={setValue}
      clientLogoUpload={clientLogoUpload}
      ourLogoUpload={ourLogoUpload}
    />
  );
};

const meta = {
  title: 'Components/Proposal/Step1Form',
  component: Step1FormWrapper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Step1FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Step1FormWrapper />,
};
