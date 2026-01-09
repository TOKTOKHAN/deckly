'use client';

import { CheckCircle2, Clock, FileText, AlertCircle } from 'lucide-react';
import { ProposalStatus } from '@/types/proposal';

interface StatusBadgeProps {
  status: ProposalStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const configs = {
    completed: {
      label: '완료',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      icon: CheckCircle2,
    },
    generating: {
      label: '생성 중',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      icon: Clock,
    },
    draft: {
      label: '초안',
      color: 'bg-slate-50 text-slate-500 border-slate-100',
      icon: FileText,
    },
    error: {
      label: '에러',
      color: 'bg-red-50 text-red-500 border-red-100',
      icon: AlertCircle,
    },
  };

  const config = configs[status] || configs.draft;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-wider ${config.color}`}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
}
