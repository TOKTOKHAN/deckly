'use client';

import { lazy, Suspense } from 'react';
import { Proposal } from '@/types/proposal';
import { ProposalFormData } from '@/types/proposal';
import { useProposalFormStore } from '@/stores/proposalFormStore';
import GeneratingOverlay from './GeneratingOverlay';
import DashboardView from './DashboardView';
import ProposalDashboardSkeleton from '@/components/skeletons/ProposalDashboardSkeleton';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

/**
 * 동적 import에 재시도 로직을 추가하는 헬퍼 함수
 * 네트워크 오류나 일시적인 로딩 실패 시 자동으로 재시도합니다.
 *
 * @param importFn - 동적 import 함수
 * @param maxRetries - 최대 재시도 횟수 (기본값: 3)
 * @param retryDelay - 재시도 간격(ms) (기본값: 1000)
 * @returns Promise<{ default: Component }>
 */
const retryImport = async <T,>(
  importFn: () => Promise<T>,
  maxRetries = 3,
  retryDelay = 1000,
): Promise<T> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await importFn();
    } catch (error) {
      // 마지막 시도에서도 실패하면 에러 throw
      if (attempt === maxRetries - 1) {
        console.error(`동적 import 실패 (${maxRetries}회 시도 후):`, error);
        throw error;
      }

      // 지수 백오프: 1초, 2초, 4초...
      const delay = retryDelay * Math.pow(2, attempt);
      console.warn(`동적 import 실패 (시도 ${attempt + 1}/${maxRetries}), ${delay}ms 후 재시도...`);

      // 재시도 전 대기
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // 타입스크립트를 위한 fallback (실제로는 위에서 throw됨)
  throw new Error('동적 import 재시도 실패');
};

// 동적 import로 코드 스플리팅 적용 (재시도 로직 포함)
const FormView = lazy(() => retryImport(() => import('./FormView')));
const ResultView = lazy(() => retryImport(() => import('./ResultView')));

interface ProposalFormViewProps {
  proposals: Proposal[];
  isProposalsLoading: boolean;
  onSubmitForm: (data: ProposalFormData) => Promise<void>;
  onRegenerate: (proposalId: string, data: ProposalFormData) => Promise<void>;
  onUpdateProposal: (updatedProposal: Proposal) => Promise<void>;
  onSelectProposal: (proposal: Proposal) => void;
  onDeleteProposal: (proposal: Proposal) => void;
  onCreateNew: () => void;
  onCloseForm: () => void;
  onBackFromResult: () => void;
  onStepChange: (step: number) => void;
  onCloseDeleteModal: () => void;
  onConfirmDelete: () => void;
}

export default function ProposalFormView({
  proposals,
  isProposalsLoading,
  onSubmitForm,
  onRegenerate,
  onUpdateProposal,
  onSelectProposal,
  onDeleteProposal,
  onCreateNew,
  onCloseForm,
  onBackFromResult,
  onStepChange,
  onCloseDeleteModal,
  onConfirmDelete,
}: ProposalFormViewProps) {
  // Zustand store에서 상태 가져오기
  const {
    view,
    step,
    currentProposal,
    proposalToDelete,
    isGenerating,
    genStatus,
    formError,
    resultError,
  } = useProposalFormStore();
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
