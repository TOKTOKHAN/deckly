'use client';

import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/lib/supabase/admin/analytics';
import { FileText, Users, CheckCircle2, AlertCircle, Clock, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin', 'dashboard-stats'],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium text-slate-600">통계를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium text-red-600">통계를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  const statCards = [
    {
      title: '전체 제안서',
      value: stats?.totalProposals || 0,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: '전체 사용자',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: '완료된 제안서',
      value: stats?.completedProposals || 0,
      icon: CheckCircle2,
      color: 'bg-indigo-500',
    },
    {
      title: '에러 발생',
      value: stats?.errorProposals || 0,
      icon: AlertCircle,
      color: 'bg-red-500',
    },
    {
      title: '초안',
      value: stats?.draftProposals || 0,
      icon: FileText,
      color: 'bg-yellow-500',
    },
    {
      title: '생성 중',
      value: stats?.generatingProposals || 0,
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      title: '오늘 생성',
      value: stats?.todayProposals || 0,
      icon: TrendingUp,
      color: 'bg-cyan-500',
    },
    {
      title: '이번 주',
      value: stats?.thisWeekProposals || 0,
      icon: TrendingUp,
      color: 'bg-teal-500',
    },
    {
      title: '이번 달',
      value: stats?.thisMonthProposals || 0,
      icon: TrendingUp,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">대시보드</h1>
        <p className="mt-2 text-slate-600">전체 시스템 통계 및 현황</p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{card.title}</p>
                  <p className="mt-2 text-3xl font-black text-slate-900">{card.value.toLocaleString()}</p>
                </div>
                <div className={`rounded-lg ${card.color} p-3`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

