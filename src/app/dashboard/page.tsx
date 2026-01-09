import ProposalForm from '@/components/proposal/ProposalForm';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ProposalDashboardSkeleton from '@/components/skeletons/ProposalDashboardSkeleton';

export default function DashboardPage() {
  return (
    <ProtectedRoute loadingFallback={<ProposalDashboardSkeleton />}>
      <ProposalForm />
    </ProtectedRoute>
  );
}
