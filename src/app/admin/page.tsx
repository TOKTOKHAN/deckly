'use client';

import { useQuery } from '@tanstack/react-query';
import {
  FileText,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  ShieldCheck,
  Activity,
  ChevronRight,
  Zap,
} from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';
import StatCard from '@/components/admin/StatCard';

async function fetchDashboardStats() {
  const response = await fetch('/api/admin/analytics/dashboard');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '통계를 불러오는 중 오류가 발생했습니다.');
  }
  return response.json();
}

export default function AdminDashboard() {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'dashboard-stats'],
    queryFn: fetchDashboardStats,
    retry: 2,
    retryDelay: 1000,
  });

  if (isLoading) {
    return <LoadingState message="통계를 불러오는 중..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  // 성공률 계산
  const successRate =
    stats && stats.totalProposals > 0
      ? Math.round((stats.completedProposals / stats.totalProposals) * 100 * 10) / 10
      : 0;

  // Efficiency Ratio 계산 (완료된 제안서 비율)
  const efficiencyRatio =
    stats && stats.totalProposals > 0
      ? Math.round((stats.completedProposals / stats.totalProposals) * 100 * 10) / 10
      : 0;

  const formattedTime = new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="-m-8 min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900 md:p-12">
      <div className="animate-in fade-in mx-auto max-w-7xl space-y-12 duration-700">
        <PageHeader
          badge={{
            icon: <ShieldCheck size={12} />,
            text: 'System Administrator',
            className: 'border-indigo-100 bg-indigo-50 text-indigo-600',
          }}
          title={
            <>
              어드민 대시보드
              <span className="rounded-2xl bg-blue-50 px-3 py-1 text-sm font-black tracking-normal text-blue-600">
                Live
              </span>
            </>
          }
          description="실시간 시스템 지표와 제안서 생성 현황을 확인하세요."
        />

        {/* 1. 핵심 지표 섹션 (Primary Metrics) */}
        <section className="space-y-6">
          <div className="ml-2 flex items-center gap-3">
            <Activity size={18} className="text-blue-600" />
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">
              Primary Metrics
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StatCard
              variant="dashboard"
              title="Total Proposals"
              value={stats?.totalProposals || 0}
              icon={<FileText size={24} />}
              colorClass="bg-blue-600"
              subText="누적 제안서 생성량"
            />
            <StatCard
              variant="dashboard"
              title="Total Users"
              value={stats?.totalUsers || 0}
              icon={<Users size={24} />}
              colorClass="bg-indigo-600"
              subText="플랫폼 가입 사용자"
            />
            <StatCard
              variant="dashboard"
              title="Success Rate"
              value={stats?.completedProposals || 0}
              icon={<CheckCircle2 size={24} />}
              colorClass="bg-emerald-500"
              trend={`${successRate}%`}
              subText="제안서 최종 생성 완료"
            />
          </div>
        </section>

        {/* 2. 상태별 현황 및 트렌드 (Status & Trends) */}
        <div className="grid grid-cols-1 gap-12 pb-12 lg:grid-cols-2">
          {/* 현황 요약 */}
          <section className="space-y-6">
            <div className="ml-2 flex items-center gap-3">
              <Clock size={18} className="text-amber-500" />
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">
                Status Overview
              </h3>
            </div>
            <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="group flex items-center gap-6 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20 transition-all hover:border-red-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-500 transition-transform group-hover:scale-110">
                  <AlertCircle size={32} />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Error Log
                  </p>
                  <p className="text-3xl font-black text-slate-900">{stats?.errorProposals || 0}</p>
                </div>
              </div>
              <div className="group flex items-center gap-6 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20 transition-all hover:border-purple-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-purple-50 text-purple-500 transition-transform group-hover:scale-110">
                  <Clock size={32} />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Generating
                  </p>
                  <p className="text-3xl font-black text-slate-900">
                    {stats?.generatingProposals || 0}
                  </p>
                </div>
              </div>
              <div className="shadow-3xl col-span-1 flex flex-col justify-center rounded-[2.5rem] bg-slate-900 p-8 shadow-slate-900/20 sm:col-span-2">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-black tracking-tight text-white">System Performance</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Draft to Final Optimization
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Efficiency Ratio
                    </p>
                    <span className="text-[10px] font-bold text-blue-400">{efficiencyRatio}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
                      style={{ width: `${efficiencyRatio}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 기간별 통계 */}
          <section className="space-y-6">
            <div className="ml-2 flex items-center gap-3">
              <TrendingUp size={18} className="text-blue-600" />
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">
                Growth Trends
              </h3>
            </div>
            <div className="flex h-full flex-col rounded-[3rem] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/40">
              <div className="flex flex-1 flex-col justify-center space-y-8">
                {[
                  {
                    label: 'Today Proposals',
                    val: stats?.todayProposals || 0,
                    color: 'bg-blue-600',
                    max: Math.max(
                      (stats?.todayProposals || 0) * 2,
                      stats?.thisWeekProposals || 0,
                      stats?.thisMonthProposals || 0,
                    ),
                  },
                  {
                    label: 'This Week',
                    val: stats?.thisWeekProposals || 0,
                    color: 'bg-indigo-600',
                    max: Math.max(
                      stats?.todayProposals || 0,
                      (stats?.thisWeekProposals || 0) * 1.5,
                      stats?.thisMonthProposals || 0,
                    ),
                  },
                  {
                    label: 'This Month',
                    val: stats?.thisMonthProposals || 0,
                    color: 'bg-slate-900',
                    max: Math.max(
                      stats?.todayProposals || 0,
                      stats?.thisWeekProposals || 0,
                      (stats?.thisMonthProposals || 0) * 1.2,
                    ),
                  },
                ].map((item, i) => {
                  const percentage = item.max > 0 ? (item.val / item.max) * 100 : 0;
                  return (
                    <div key={i}>
                      <div className="mb-3 flex items-end justify-between">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-600">
                          {item.label}
                        </p>
                        <p className="text-2xl font-black italic text-slate-900">
                          {item.val.toLocaleString()}
                        </p>
                      </div>
                      <div className="h-4 overflow-hidden rounded-full border border-slate-100/50 bg-slate-50 p-1">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${item.color}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-8">
                <p className="text-[10px] font-bold uppercase italic text-slate-400">
                  Latest update: {formattedTime}
                </p>
                <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600 transition-transform hover:translate-x-1">
                  View full report <ChevronRight size={12} strokeWidth={4} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
