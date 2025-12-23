'use client';

import React from 'react';
import { ProposalFormData } from '@/types/proposal';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Button from '@/components/ui/Button';

// 아이콘 컴포넌트
const ChevronLeft = ({ size }: { size?: number }) => (
  <svg
    width={size || 20}
    height={size || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = ({ size }: { size?: number }) => (
  <svg
    width={size || 20}
    height={size || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const X = ({ size }: { size?: number }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface FormViewProps {
  step: number;
  formData: ProposalFormData;
  onInputChange: (
    field: keyof ProposalFormData,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onStepChange: (step: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function FormView({
  step,
  formData,
  onInputChange,
  onStepChange,
  onClose,
  onSubmit,
}: FormViewProps) {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="mb-4 text-xl font-bold text-black">Step 1. 기본 정보</h2>
            <Input
              label="프로젝트명"
              required
              id="projectName"
              name="projectName"
              type="text"
              value={formData.projectName}
              onChange={onInputChange('projectName')}
              placeholder="프로젝트명"
              autoComplete="off"
            />
            <Input
              label="클라이언트사"
              required
              id="clientCompanyName"
              name="clientCompanyName"
              type="text"
              value={formData.clientCompanyName}
              onChange={onInputChange('clientCompanyName')}
              placeholder="회사명"
              autoComplete="organization"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="mb-4 text-xl font-bold text-black">Step 2. 미팅 전사록 입력</h2>
            <p className="mb-2 text-xs text-gray-500">
              AI가 분석할 수 있도록 미팅 대화 내용이나 요약된 메모를 입력해주세요.
            </p>
            <Textarea
              label=""
              id="transcriptText"
              name="transcriptText"
              value={formData.transcriptText}
              onChange={onInputChange('transcriptText')}
              className="h-48"
              placeholder="여기에 회의록 내용을 붙여넣어주세요."
              required
            />
            <div className="flex justify-between px-1 text-[10px] text-gray-400">
              <span>AI가 정확한 제안을 하려면 최소 50자 이상의 구체적인 내용이 필요합니다.</span>
              <span>{formData.transcriptText.length} 자</span>
            </div>
          </div>
        );
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
          <button onClick={onClose} className="rounded-full p-2 transition hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        {renderStep()}

        <div className="mt-12 flex justify-between border-t border-gray-50 pt-8">
          <Button
            variant="ghost"
            disabled={step === 1}
            onClick={() => onStepChange(step - 1)}
            icon={<ChevronLeft size={20} />}
          >
            이전 단계
          </Button>

          {step < 2 ? (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onStepChange(step + 1)}
              icon={<ChevronRight size={20} />}
              iconPosition="right"
            >
              다음 단계
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={onSubmit}
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
