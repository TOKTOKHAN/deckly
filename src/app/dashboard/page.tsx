import ProposalForm from '@/components/proposal/ProposalForm';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <ProposalForm />
    </ProtectedRoute>
  );
}
