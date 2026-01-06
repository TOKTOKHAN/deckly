'use client';

import { CalendarDays } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

interface PageHeaderProps {
  badge?: {
    icon: React.ReactNode;
    text: string;
    className?: string;
  };
  title: string | React.ReactNode;
  description?: string;
  showDate?: boolean;
  showUserAvatar?: boolean;
  className?: string;
}

export default function PageHeader({
  badge,
  title,
  description,
  showDate = true,
  showUserAvatar = true,
  className = '',
}: PageHeaderProps) {
  const { user } = useAuthStore();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <div className={`flex flex-col justify-between gap-6 md:flex-row md:items-end ${className}`}>
      <div>
        {badge && (
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${badge.className || 'border-blue-100 bg-blue-50 text-blue-600'}`}
          >
            {badge.icon} {badge.text}
          </div>
        )}
        <h1 className="text-5xl font-black tracking-tighter text-slate-900">{title}</h1>
        {description && (
          <p className="mt-3 text-lg font-medium italic text-slate-500 opacity-80">{description}</p>
        )}
      </div>
      {(showDate || showUserAvatar) && (
        <div className="flex items-center gap-4">
          {showDate && (
            <div className="hidden items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 sm:flex">
              <CalendarDays size={14} className="text-slate-400" />
              <span className="text-[11px] font-bold uppercase tracking-tighter text-slate-600">
                {formattedDate}
              </span>
            </div>
          )}
          {showUserAvatar && (
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-blue-600 text-xs font-black text-white shadow-lg shadow-blue-100 transition-transform hover:scale-105">
              {user?.email?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
