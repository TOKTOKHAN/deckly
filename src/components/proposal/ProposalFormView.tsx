'use client';

import { lazy, Suspense } from 'react';
import { Proposal } from '@/types/proposal';
import { ProposalFormData, GenerationStatus } from '@/types/proposal';
import GeneratingOverlay from './GeneratingOverlay';
import DashboardView from './DashboardView';
import ProposalDashboardSkeleton from '@/components/skeletons/ProposalDashboardSkeleton';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

// 동적 import로 코드 스플리팅 적용
const FormView = lazy(() => import('./FormView'));
const ResultView = lazy(() => import('./ResultView'));

interface ProposalFormViewProps {
  view: 'dashboard' | 'form' | 'result';
  proposals: Proposal[];
  currentProposal: Proposal | null;
  step: number;
  isProposalsLoading: boolean;
  isGenerating: boolean;
  genStatus: GenerationStatus;
  proposalToDelete: Proposal | null;
  formError: string | null;
  resultError: string | null;
  onCreateNew: () => void;
  onSelectProposal: (proposal: Proposal) => void;
  onDeleteProposal: (proposal: Proposal) => void;
  onStepChange: (step: number) => void;
  onCloseForm: () => void;
  onSubmitForm: (data: ProposalFormData) => Promise<void>;
  onBackFromResult: () => void;
  onRegenerate: (proposalId: string, data: ProposalFormData) => Promise<void>;
  onUpdateProposal: (updatedProposal: Proposal) => Promise<void>;
  onCloseDeleteModal: () => void;
  onConfirmDelete: () => void;
}

export default function ProposalFormView({
  view,
  proposals,
  currentProposal,
  step,
  isProposalsLoading,
  isGenerating,
  genStatus,
  proposalToDelete,
  formError,
  resultError,
  onCreateNew,
  onSelectProposal,
  onDeleteProposal,
  onStepChange,
  onCloseForm,
  onSubmitForm,
  onBackFromResult,
  onRegenerate,
  onUpdateProposal,
  onCloseDeleteModal,
  onConfirmDelete,
}: ProposalFormViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        {view === 'dashboard' && (
          <>
            {isProposalsLoading ? (
              <div role="status" aria-live="polite" aria-label="제안서 목록을 불러오는 중">
                <ProposalDashboardSkeleton includeWrapper={false} />
              </div>
            ) : (
              <DashboardView
                proposals={proposals}
                onCreateNew={onCreateNew}
                onSelectProposal={onSelectProposal}
                onDeleteProposal={onDeleteProposal}
              />
            )}
          </>
        )}
        {view === 'form' && (
          <>
            {formError ? (
              <div className="mx-auto max-w-3xl px-4 py-12">
                <div className="rounded-[2.5rem] border border-red-200 bg-red-50 p-8 text-center">
                  <h2 className="mb-2 text-xl font-bold text-red-600">오류가 발생했습니다</h2>
                  <p className="mb-4 text-gray-600">{formError}</p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      onCloseForm();
                    }}
                  >
                    대시보드로 돌아가기
                  </Button>
                </div>
              </div>
            ) : (
              <Suspense fallback={<ProposalDashboardSkeleton includeWrapper={false} />}>
                <FormView
                  step={step}
                  onStepChange={onStepChange}
                  onClose={onCloseForm}
                  onSubmit={onSubmitForm}
                />
              </Suspense>
            )}
          </>
        )}
        {view === 'result' && currentProposal && (
          <>
            {resultError ? (
              <div className="mx-auto max-w-5xl px-4 py-8">
                <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
                  <h2 className="mb-2 text-xl font-bold text-red-600">오류가 발생했습니다</h2>
                  <p className="mb-4 text-gray-600">{resultError}</p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      onBackFromResult();
                    }}
                  >
                    대시보드로 돌아가기
                  </Button>
                </div>
              </div>
            ) : (
              <Suspense fallback={<ProposalDashboardSkeleton includeWrapper={false} />}>
                <ResultView
                  proposal={currentProposal}
                  onBack={onBackFromResult}
                  onRegenerate={onRegenerate}
                  onUpdate={onUpdateProposal}
                />
              </Suspense>
            )}
          </>
        )}
      </main>
      <GeneratingOverlay isGenerating={isGenerating} genStatus={genStatus} />

      {/* 제안서 삭제 확인 모달 */}
      <Modal
        isOpen={!!proposalToDelete}
        onClose={onCloseDeleteModal}
        title="제안서 삭제"
        message={
          proposalToDelete
            ? `"${proposalToDelete.projectName || '무제 프로젝트'}" 제안서를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
            : ''
        }
        confirmText="삭제"
        cancelText="취소"
        variant="danger"
        onConfirm={onConfirmDelete}
        onCancel={onCloseDeleteModal}
      />
    </div>
  );
}
