'use client';

import React, { useRef } from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { ProposalFormData } from '@/types/proposal';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import ColorInput from '@/components/form/ColorInput';
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
  errors: FieldErrors<ProposalFormData>;
  register: UseFormRegister<ProposalFormData>;
  setValue: UseFormSetValue<ProposalFormData>;
  onInputChange: (
    field: keyof ProposalFormData,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onStepChange: (step: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function FormView({
  step,
  formData,
  errors,
  register,
  setValue,
  onInputChange: _onInputChange,
  onStepChange,
  onClose,
  onSubmit,
}: FormViewProps) {
  // 파일 input ref
  const clientLogoRef = useRef<HTMLInputElement>(null);
  const ourLogoRef = useRef<HTMLInputElement>(null);

  // 파일 선택 핸들러
  const handleFileSelect = (
    field: 'clientLogo' | 'ourLogo',
    _ref: React.RefObject<HTMLInputElement>,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          // base64 데이터 URL을 저장
          setValue(field, result, { shouldValidate: true });
        };
        reader.readAsDataURL(file);
      }
    };
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (
    field: 'clientLogo' | 'ourLogo',
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    return () => {
      setValue(field, undefined, { shouldValidate: true });
      // 파일 input 초기화
      if (ref.current) {
        ref.current.value = '';
      }
    };
  };

  // Step 1 필수 필드 검증
  const isStep1Valid = () => {
    // Hex 색상 코드 검증
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

    // 필수 필드 체크
    const hasProjectName = formData.projectName && formData.projectName.trim().length > 0;
    const hasClientCompanyName =
      formData.clientCompanyName && formData.clientCompanyName.trim().length > 0;
    const hasBrandColor1 = formData.brandColor1 && hexColorRegex.test(formData.brandColor1);
    const hasBrandColor2 = formData.brandColor2 && hexColorRegex.test(formData.brandColor2);
    const hasBrandColor3 = formData.brandColor3 && hexColorRegex.test(formData.brandColor3);
    const hasFont = formData.font && formData.font.trim().length > 0;
    const hasStartDate = formData.startDate && formData.startDate.trim().length > 0;
    const hasEndDate = formData.endDate && formData.endDate.trim().length > 0;

    // 종료일이 시작일 이후인지 확인
    const isDateValid =
      hasStartDate && hasEndDate && new Date(formData.endDate) >= new Date(formData.startDate);

    return (
      hasProjectName &&
      hasClientCompanyName &&
      hasBrandColor1 &&
      hasBrandColor2 &&
      hasBrandColor3 &&
      hasFont &&
      hasStartDate &&
      hasEndDate &&
      isDateValid
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-3">
            <h2 className="mb-4 text-xl font-bold text-black">Step 1. 기본 정보</h2>
            <p className="text-sm text-red-500">* 아래 항목들은 필수로 입력해야합니다.</p>

            {/* 기본 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">프로젝트 정보</h3>
              <Input
                label="프로젝트명"
                id="projectName"
                {...register('projectName')}
                error={errors.projectName?.message}
                placeholder="프로젝트명"
                autoComplete="off"
              />
              <Input
                label="클라이언트사"
                id="clientCompanyName"
                {...register('clientCompanyName')}
                error={errors.clientCompanyName?.message}
                placeholder="회사명"
                autoComplete="organization"
              />
              <Input
                label="슬로건"
                id="slogan"
                type="text"
                {...register('slogan')}
                error={errors.slogan?.message}
                placeholder="지향하는 방향성"
              />
            </div>

            {/* 브랜드 컬러 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">브랜드 컬러</h3>
              <p className="text-xs text-gray-500">
                고객사 로고나 사이트에서 참조하여 브랜드 컬러를 선택해주세요.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <ColorInput
                  label="컬러 1"
                  id="brandColor1"
                  value={formData.brandColor1}
                  error={errors.brandColor1?.message}
                  placeholder="#4f46e5"
                  onChange={value => setValue('brandColor1', value, { shouldValidate: true })}
                  onTextChange={e => {
                    register('brandColor1').onChange(e);
                    setValue('brandColor1', e.target.value, { shouldValidate: true });
                  }}
                  ref={register('brandColor1').ref}
                  required
                />
                <ColorInput
                  label="컬러 2"
                  id="brandColor2"
                  value={formData.brandColor2}
                  error={errors.brandColor2?.message}
                  placeholder="#1f2937"
                  onChange={value => setValue('brandColor2', value, { shouldValidate: true })}
                  onTextChange={e => {
                    register('brandColor2').onChange(e);
                    setValue('brandColor2', e.target.value, { shouldValidate: true });
                  }}
                  ref={register('brandColor2').ref}
                  required
                />
                <ColorInput
                  label="컬러 3"
                  id="brandColor3"
                  value={formData.brandColor3}
                  error={errors.brandColor3?.message}
                  placeholder="#ffffff"
                  onChange={value => setValue('brandColor3', value, { shouldValidate: true })}
                  onTextChange={e => {
                    register('brandColor3').onChange(e);
                    setValue('brandColor3', e.target.value, { shouldValidate: true });
                  }}
                  ref={register('brandColor3').ref}
                  required
                />
              </div>
            </div>

            {/* 브랜드 참고 자료 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">브랜드 참고 자료</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* 고객사 로고 */}
                <div className="space-y-2">
                  <label htmlFor="clientLogo" className="text-sm font-semibold text-gray-700">
                    고객사 로고
                    {errors.clientLogo && (
                      <span className="ml-2 text-xs text-red-500">{errors.clientLogo.message}</span>
                    )}
                  </label>
                  <input
                    ref={clientLogoRef}
                    id="clientLogo"
                    name="clientLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect('clientLogo', clientLogoRef)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formData.clientLogo && (
                    <div className="relative mt-2 inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.clientLogo}
                        alt="고객사 로고 미리보기"
                        className="h-20 w-auto rounded border border-gray-200 object-contain"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage('clientLogo', clientLogoRef)}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
                        aria-label="이미지 삭제"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
                {/* 제안사 로고 */}
                <div className="space-y-2">
                  <label htmlFor="ourLogo" className="text-sm font-semibold text-gray-700">
                    제안사 로고
                    {errors.ourLogo && (
                      <span className="ml-2 text-xs text-red-500">{errors.ourLogo.message}</span>
                    )}
                  </label>
                  <input
                    ref={ourLogoRef}
                    id="ourLogo"
                    name="ourLogo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect('ourLogo', ourLogoRef)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formData.ourLogo && (
                    <div className="relative mt-2 inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.ourLogo}
                        alt="제안사 로고 미리보기"
                        className="h-20 w-auto rounded border border-gray-200 object-contain"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage('ourLogo', ourLogoRef)}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
                        aria-label="이미지 삭제"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500">
                이미지 파일을 선택하면 자동으로 미리보기가 표시됩니다.
              </p>
            </div>

            {/* 폰트 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">폰트</h3>
              <div className="mb-4 flex flex-col gap-1.5">
                <label htmlFor="font" className="text-sm font-semibold text-gray-700">
                  폰트 선택
                  {errors.font && (
                    <span className="ml-2 text-xs text-red-500">{errors.font.message}</span>
                  )}
                </label>
                <select
                  id="font"
                  {...register('font')}
                  className={`rounded-xl border p-2.5 text-black transition focus:outline-none focus:ring-2 ${
                    errors.font
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-transparent focus:ring-indigo-500'
                  }`}
                >
                  <option value="Pretendard">Pretendard</option>
                  <option value="Noto Sans KR">Noto Sans KR</option>
                  <option value="Inter">Inter</option>
                </select>
              </div>
            </div>

            {/* 프로젝트 기간 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">프로젝트 기간</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="시작일"
                  id="startDate"
                  type="date"
                  {...register('startDate')}
                  error={errors.startDate?.message}
                />
                <Input
                  label="종료일 (개발 완료일)"
                  id="endDate"
                  type="date"
                  {...register('endDate')}
                  error={errors.endDate?.message}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="검수 기간"
                  id="reviewPeriod"
                  type="text"
                  {...register('reviewPeriod')}
                  error={errors.reviewPeriod?.message}
                  placeholder="예: 2주, 1개월"
                />
                <Input
                  label="유지보수 기간"
                  id="maintenancePeriod"
                  type="text"
                  {...register('maintenancePeriod')}
                  error={errors.maintenancePeriod?.message}
                  placeholder="예: 3개월, 6개월"
                />
              </div>
              <Input
                label="오픈일/런칭일 (선택)"
                id="openDate"
                type="date"
                {...register('openDate')}
                error={errors.openDate?.message}
              />
            </div>

            {/* 투입 인력 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">투입 인력</h3>
              <Input
                label="투입 인력"
                id="teamSize"
                type="text"
                {...register('teamSize')}
                error={errors.teamSize?.message}
                placeholder="예: 프론트엔드 2명, 백엔드 2명, 디자이너 1명"
              />
            </div>

            {/* 예산 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">예산</h3>
              <Input
                label="예산"
                id="budgetMin"
                type="text"
                {...register('budgetMin')}
                error={errors.budgetMin?.message}
                placeholder="예산을 입력해주세요."
              />
            </div>
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
              {...register('transcriptText')}
              error={errors.transcriptText?.message}
              className="h-48 text-black"
              placeholder="여기에 회의록 내용을 붙여넣어주세요."
            />
            <div className="flex justify-between px-1 text-[10px] text-gray-400">
              <span>AI가 정확한 제안을 하려면 최소 300자 이상의 구체적인 내용이 필요합니다.</span>
              <span>{formData.transcriptText?.length || 0} 자</span>
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
              disabled={!isStep1Valid()}
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
