import { Proposal } from '@/types/proposal';
import Button from '@/components/ui/Button';
import ProposalCard from './ProposalCard';
import { Plus, FileText } from '@/components/icons';

interface DashboardViewProps {
  proposals: Proposal[];
  onCreateNew: () => void;
  onSelectProposal: (proposal: Proposal) => void;
}

export default function DashboardView({
  proposals,
  onCreateNew,
  onSelectProposal,
}: DashboardViewProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">제안서 관리</h1>
          <p className="mt-1 text-gray-500">AI로 생성된 제안서 목록입니다.</p>
        </div>
        <Button variant="primary" size="md" icon={<Plus size={20} />} onClick={onCreateNew}>
          새 제안서 만들기
        </Button>
      </div>

      {proposals.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <FileText className="text-indigo-600" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">생성된 제안서가 없습니다</h3>
          <p className="mb-6 mt-1 text-gray-500">지금 바로 제안서를 만들어보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proposals.map(proposal => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onClick={() => {
                if (proposal.status === 'completed') {
                  onSelectProposal(proposal);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
