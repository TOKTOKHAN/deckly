'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProposalFormData } from '@/types/proposal';
import { proposalFormSchema } from '@/lib/validations/proposalSchema';
import { validateStep1 } from '@/lib/utils/formValidation';
import { useProposalFormStore } from '@/stores/proposalFormStore';
import { useFileUpload } from '@/hooks/useFileUpload';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, X } from '@/components/icons';

const initialFormData: ProposalFormData = {
  // 기본 정보
  clientCompanyName: '',
  projectName: '',
  slogan: '',
  brandColor1: '#4f46e5', // indigo-600 (기본 브랜드 컬러)
  brandColor2: '#1f2937', // gray-800 (기본 브랜드 컬러)
  brandColor3: '#ffffff', // white (기본 브랜드 컬러)
  clientLogo: undefined,
  ourLogo: undefined,
  clientWebsite: undefined,
  font: 'Pretendard',

  // 프로젝트 정보
  teamSize: '',
  startDate: new Date().toISOString().substring(0, 10),
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().substring(0, 10),
  reviewPeriod: '',
  maintenancePeriod: '',
  openDate: undefined,
  budgetMin: '',
  target: ['실무자'],
  includeSummary: '',
  excludeScope: '',
  priorityFeatures: '',
  projectPhase: '',
  priorityFactor: '',
  transcriptText: '',
  volume: '표준',
  designStyle: '기업형',
  figureStyle: '범위',
};

interface FormViewProps {
  onSubmit: (data: ProposalFormData) => void;
}

export default function FormView({ onSubmit }: FormViewProps) {
  // Zustand store에서 상태와 액션 가져오기
  const step = useProposalFormStore(state => state.step);
  const setStep = useProposalFormStore(state => state.setStep);
  const closeForm = useProposalFormStore(state => state.closeForm);
  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: initialFormData,
    mode: 'all',
    reValidateMode: 'onChange',
  });

  // formData는 watch로 실시간 추적
  const formData = watch() as ProposalFormData;

  // 파일 업로드 훅 사용
  const clientLogoUpload = useFileUpload<ProposalFormData>({
    field: 'clientLogo',
    setValue,
  });

  const ourLogoUpload = useFileUpload<ProposalFormData>({
    field: 'ourLogo',
    setValue,
  });

  const renderStep = () => {
    switch (step) {
      case 1:
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
      case 2:
        return <Step2Form register={register} errors={errors} formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-2xl md:p-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Step {step} of 2
            </span>
            <h1 className="mt-1 text-2xl font-black text-gray-400">제안서 정보 입력</h1>
          </div>
          <button
            onClick={closeForm}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {renderStep()}

        <div className="mt-12 flex justify-between border-t border-gray-50 pt-8">
          <Button
            variant="ghost"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            icon={<ChevronLeft size={20} />}
          >
            이전 단계
          </Button>

          {step < 2 ? (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setStep(step + 1)}
              icon={<ChevronRight size={20} />}
              iconPosition="right"
              disabled={!validateStep1(formData)}
            >
              다음 단계
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit(onSubmit)}
              disabled={formData.transcriptText.length < 50}
            >
              AI 제안서 생성하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
