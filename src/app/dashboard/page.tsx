import ProposalForm from '@/components/proposal/ProposalFormContainer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <ProposalForm />
    </ProtectedRoute>
  );
}
