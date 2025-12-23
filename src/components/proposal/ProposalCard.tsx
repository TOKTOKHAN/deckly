import { Proposal } from '@/types/proposal';
import { FileText, ChevronRight } from '@/components/icons';

interface ProposalCardProps {
  proposal: Proposal;
  onClick: () => void;
}

export default function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-indigo-500 hover:shadow-xl"
    >
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
