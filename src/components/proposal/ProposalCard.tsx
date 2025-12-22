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
      className="group bg-white p-6 rounded-3xl border border-gray-100 hover:border-indigo-500 cursor-pointer transition shadow-sm hover:shadow-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-indigo-50 transition">
          <FileText className="text-gray-400 group-hover:text-indigo-600" size={24} />
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            proposal.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : proposal.status === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-100 text-blue-700 animate-pulse'
          }`}
        >
          {proposal.status}
        </span>
      </div>
      <h3 className="font-bold text-gray-900 truncate mb-1">
        {proposal.projectName || '무제 프로젝트'}
      </h3>
      <p className="text-sm text-gray-500 mb-4">{proposal.clientCompanyName}</p>
      <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium border-t border-gray-50 pt-4">
        <span>{proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : ''}</span>
        <ChevronRight size={14} />
      </div>
    </div>
  );
}
