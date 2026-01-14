import { Proposal } from '@/types/proposal';
import { FileText, ChevronRight } from '@/components/icons';
import { Trash2 } from 'lucide-react';

interface ProposalCardProps {
  proposal: Proposal;
  onClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export default function ProposalCard({ proposal, onClick, onDelete }: ProposalCardProps) {
  const isClickable = proposal.status === 'completed';
  const projectName = proposal.projectName || '무제 프로젝트';
  const clientName = proposal.clientCompanyName || '고객사 미지정';
  const createdDate = proposal.createdAt
    ? new Date(proposal.createdAt).toLocaleDateString('ko-KR')
    : '날짜 없음';

  // 상태 한글화
  const statusText =
    proposal.status === 'completed' ? '완료' : proposal.status === 'error' ? '오류' : '생성 중';

  // 키보드 네비게이션 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // ARIA 레이블 생성
  const ariaLabel = isClickable
    ? `${projectName} 제안서 보기, 고객사: ${clientName}, 생성일: ${createdDate}, 상태: ${statusText}`
    : `${projectName} 제안서, 상태: ${statusText}, 고객사: ${clientName}`;

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-disabled={!isClickable}
      className={`group relative rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition ${
        isClickable
          ? 'cursor-pointer hover:border-indigo-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          : 'cursor-default'
      }`}
    >
      {/* 삭제 버튼 - 우측 상단 모서리에 걸쳐서 */}
      {onDelete && (
        <button
          onClick={e => {
            e.stopPropagation(); // 카드 클릭 이벤트 방지
            onDelete(e);
          }}
          className="absolute -right-2 -top-2 z-10 rounded-full bg-white p-2 text-gray-400 opacity-0 shadow-md ring-1 ring-gray-200 transition-all hover:bg-red-50 hover:text-red-600 hover:ring-red-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 group-hover:opacity-100"
          aria-label={`${projectName} 제안서 삭제`}
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-xl bg-gray-50 p-2.5 transition group-hover:bg-indigo-50">
          <FileText
            className="text-gray-400 group-hover:text-indigo-600"
            size={24}
            aria-hidden="true"
          />
        </div>
        <span
          role="status"
          aria-label={`상태: ${statusText}`}
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
            proposal.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : proposal.status === 'error'
                ? 'bg-red-100 text-red-700'
                : 'animate-pulse bg-blue-100 text-blue-700'
          }`}
        >
          {statusText}
        </span>
      </div>
      <h3 className="mb-1 truncate font-bold text-gray-900">{projectName}</h3>
      <p className="mb-4 text-sm text-gray-600">{clientName}</p>
      <div className="flex items-center justify-between border-t border-gray-50 pt-4 text-[11px] font-medium text-gray-500">
        <time dateTime={proposal.createdAt || undefined}>{createdDate}</time>
        {isClickable && (
          <span aria-hidden="true" className="text-gray-400">
            <ChevronRight size={14} />
          </span>
        )}
      </div>
    </div>
  );
}
