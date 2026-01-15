'use client';

import React from 'react';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { ProposalFormData } from '@/types/proposal';
import { UseFileUploadReturn } from '@/hooks/useFileUpload';
import Input from '@/components/form/Input';
import ColorInput from '@/components/form/ColorInput';
import { X } from '@/components/icons';

interface Step1FormProps {
  register: UseFormRegister<ProposalFormData>;
  errors: FieldErrors<ProposalFormData>;
  formData: ProposalFormData;
  setValue: UseFormSetValue<ProposalFormData>;
  clientLogoUpload: UseFileUploadReturn;
  ourLogoUpload: UseFileUploadReturn;
}

export default function Step1Form({
  register,
  errors,
  formData,
  setValue,
  clientLogoUpload,
  ourLogoUpload,
}: Step1FormProps) {
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
              ref={clientLogoUpload.inputRef}
              id="clientLogo"
              name="clientLogo"
              type="file"
              accept="image/*"
              onChange={clientLogoUpload.handleFileSelect}
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
                  onClick={clientLogoUpload.handleRemoveImage}
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
              ref={ourLogoUpload.inputRef}
              id="ourLogo"
              name="ourLogo"
              type="file"
              accept="image/*"
              onChange={ourLogoUpload.handleFileSelect}
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
                  onClick={ourLogoUpload.handleRemoveImage}
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
        <h3 className="text-lg font-semibold text-gray-800">프로젝트 비용</h3>
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
}
