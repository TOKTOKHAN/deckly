'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProposalFormData } from '@/types/proposal';
import Textarea from '@/components/form/Textarea';

interface Step2FormProps {
  register: UseFormRegister<ProposalFormData>;
  errors: FieldErrors<ProposalFormData>;
  formData: ProposalFormData;
}

export default function Step2Form({ register, errors, formData }: Step2FormProps) {
  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-xl font-bold text-black">Step 2. 미팅 전사록 입력</h2>
      <p className="mb-2 text-xs text-gray-500">
        AI가 분석할 수 있도록 미팅 대화 내용이나 요약된 메모를 입력해주세요.
      </p>
      <Textarea
        label=""
        id="transcriptText"
        {...register('transcriptText')}
        error={errors.transcriptText?.message}
        className="h-48 text-black"
        placeholder="여기에 회의록 내용을 붙여넣어주세요."
      />
      <div className="flex justify-between px-1 text-[12px] text-gray-400">
        <span>
          AI가 정확한 제안서를 생성하려면 최소 300자 이상의 구체적인 내용이 필요합니다.
        </span>
        <span>{formData.transcriptText?.length || 0} 자</span>
      </div>
    </div>
  );
}
