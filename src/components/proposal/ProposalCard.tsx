import { Proposal } from '@/types/proposal';
import { FileText, ChevronRight } from '@/components/icons';
import { Trash2 } from 'lucide-react';

interface ProposalCardProps {
  proposal: Proposal;
  onClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export default function ProposalCard({ proposal, onClick, onDelete }: ProposalCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-indigo-500 hover:shadow-xl"
    >
      {/* 삭제 버튼 - 우측 상단 모서리에 걸쳐서 */}
      {onDelete && (
        <button
          onClick={e => {
            e.stopPropagation(); // 카드 클릭 이벤트 방지
            onDelete(e);
          }}
          className="absolute -right-2 -top-2 z-10 rounded-full bg-white p-2 text-gray-400 opacity-0 shadow-md ring-1 ring-gray-200 transition-all hover:bg-red-50 hover:text-red-600 hover:ring-red-200 group-hover:opacity-100"
          aria-label="제안서 삭제"
        >
          <Trash2 size={18} />
        </button>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-xl bg-gray-50 p-2.5 transition group-hover:bg-indigo-50">
          <FileText className="text-gray-400 group-hover:text-indigo-600" size={24} />
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
            proposal.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : proposal.status === 'error'
                ? 'bg-red-100 text-red-700'
                : 'animate-pulse bg-blue-100 text-blue-700'
          }`}
        >
          {proposal.status}
        </span>
      </div>
      <h3 className="mb-1 truncate font-bold text-gray-900">
        {proposal.projectName || '무제 프로젝트'}
      </h3>
      <p className="mb-4 text-sm text-gray-500">{proposal.clientCompanyName}</p>
      <div className="flex items-center justify-between border-t border-gray-50 pt-4 text-[11px] font-medium text-gray-400">
        <span>{proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : ''}</span>
        <ChevronRight size={14} />
      </div>
    </div>
  );
}
