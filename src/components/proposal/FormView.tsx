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
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
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
          <div className="space-y-3">
            <h2 className="mb-4 text-xl font-bold text-black">Step 1. 기본 정보</h2>
            <p className="text-sm text-red-500">* 아래 항목들은 필수로 입력해야합니다.</p>

            {/* 기본 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">프로젝트 정보</h3>
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
              <Input
                label="슬로건"
                id="slogan"
                name="slogan"
                type="text"
                value={formData.slogan}
                onChange={onInputChange('slogan')}
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
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">컬러 1</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="brandColor1"
                      name="brandColor1"
                      value={formData.brandColor1}
                      onChange={onInputChange('brandColor1')}
                      className="h-10 w-20 cursor-pointer rounded-lg border border-gray-300"
                    />
                    <input
                      type="text"
                      value={formData.brandColor1}
                      onChange={onInputChange('brandColor1')}
                      className="flex-1 rounded-xl border border-gray-300 p-2 text-sm"
                      placeholder="#4f46e5"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">컬러 2</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="brandColor2"
                      name="brandColor2"
                      value={formData.brandColor2}
                      onChange={onInputChange('brandColor2')}
                      className="h-10 w-20 cursor-pointer rounded-lg border border-gray-300"
                    />
                    <input
                      type="text"
                      value={formData.brandColor2}
                      onChange={onInputChange('brandColor2')}
                      className="flex-1 rounded-xl border border-gray-300 p-2 text-sm"
                      placeholder="#1f2937"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">컬러 3</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="brandColor3"
                      name="brandColor3"
                      value={formData.brandColor3}
                      onChange={onInputChange('brandColor3')}
                      className="h-10 w-20 cursor-pointer rounded-lg border border-gray-300"
                    />
                    <input
                      type="text"
                      value={formData.brandColor3}
                      onChange={onInputChange('brandColor3')}
                      className="flex-1 rounded-xl border border-gray-300 p-2 text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 브랜드 참고 자료 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">브랜드 참고 자료</h3>
              <Input
                label="고객사 로고"
                id="clientLogo"
                name="clientLogo"
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // TODO: 파일 업로드 로직 구현 필요
                    // 현재는 파일명만 표시
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      // 파일 업로드 후 URL을 formData.clientLogo에 저장
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            {/* 폰트 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">폰트</h3>
              <div className="mb-4 flex flex-col gap-1.5">
                <label htmlFor="font" className="text-sm font-semibold text-gray-700">
                  폰트 선택
                </label>
                <select
                  id="font"
                  name="font"
                  value={formData.font}
                  onChange={onInputChange('font')}
                  className="rounded-xl border border-gray-300 p-2.5 text-black transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  required
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={onInputChange('startDate')}
                />
                <Input
                  label="종료일 (개발 완료일)"
                  required
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={onInputChange('endDate')}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="검수 기간"
                  id="reviewPeriod"
                  name="reviewPeriod"
                  type="text"
                  value={formData.reviewPeriod}
                  onChange={onInputChange('reviewPeriod')}
                  placeholder="예: 2주, 1개월"
                />
                <Input
                  label="유지보수 기간"
                  id="maintenancePeriod"
                  name="maintenancePeriod"
                  type="text"
                  value={formData.maintenancePeriod}
                  onChange={onInputChange('maintenancePeriod')}
                  placeholder="예: 3개월, 6개월"
                />
              </div>
              <Input
                label="오픈일/런칭일 (선택)"
                id="openDate"
                name="openDate"
                type="date"
                value={formData.openDate || ''}
                onChange={onInputChange('openDate')}
              />
            </div>

            {/* 투입 인력 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">투입 인력</h3>
              <Input
                label="투입 인력"
                id="teamSize"
                name="teamSize"
                type="text"
                value={formData.teamSize}
                onChange={onInputChange('teamSize')}
                placeholder="예: 프론트엔드 2명, 백엔드 2명, 디자이너 1명"
              />
            </div>

            {/* 예산 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">예산</h3>
              <Input
                label="예산"
                id="budgetMin"
                name="budgetMin"
                type="text"
                value={formData.budgetMin}
                onChange={onInputChange('budgetMin')}
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
