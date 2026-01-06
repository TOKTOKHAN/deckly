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
  ArrowUpRight,
  Activity,
  RefreshCw,
  ChevronRight,
  Zap,
} from 'lucide-react';
import Button from '@/components/ui/Button';

async function fetchDashboardStats() {
  const response = await fetch('/api/admin/analytics/dashboard');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '통계를 불러오는 중 오류가 발생했습니다.');
  }
  return response.json();
}

/* 대시보드 전용 통계 카드 컴포넌트 */
const DashboardStatCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
  trend,
  subText,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  colorClass: string;
  trend?: string;
  subText?: string;
}) => (
  <div className="group rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/40 transition-all duration-500 hover:border-blue-200 hover:shadow-2xl">
    <div className="mb-6 flex items-start justify-between">
      <div
        className={`${colorClass} rounded-2xl p-4 text-white shadow-lg transition-transform duration-500 group-hover:scale-110`}
      >
        <Icon size={24} />
      </div>
      {trend && (
        <div className="flex items-center gap-1 rounded-lg bg-green-50 px-2.5 py-1 text-xs font-black text-green-500">
          <ArrowUpRight size={14} /> {trend}
        </div>
      )}
    </div>
    <div>
      <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        {title}
      </p>
      <h4 className="mb-2 text-4xl font-black tracking-tighter text-slate-900">
        {value.toLocaleString()}
      </h4>
      {subText && <p className="text-xs font-medium italic text-slate-400 opacity-70">{subText}</p>}
    </div>
  </div>
);

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
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 text-lg font-medium text-slate-600">통계를 불러오는 중...</div>
          <div className="text-sm text-slate-500">잠시만 기다려주세요.</div>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : '통계를 불러오는 중 오류가 발생했습니다.';

    return (
      <div className="flex items-center justify-center py-12">
        <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <AlertCircle className="text-red-600" size={48} />
          </div>
          <h3 className="mb-2 text-lg font-bold text-red-900">오류 발생</h3>
          <p className="mb-4 text-sm text-red-700">{errorMessage}</p>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => refetch()}
            icon={<RefreshCw size={16} />}
          >
            다시 시도
          </Button>
        </div>
      </div>
    );
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

  // 오늘 날짜 포맷팅
  const today = new Date();
  const formattedTime = today.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      {/* 인사말 섹션 */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-600">
            <ShieldCheck size={12} /> System Administrator
          </div>
          <h1 className="flex items-center gap-4 text-5xl font-black tracking-tighter text-slate-900">
            어드민 대시보드
            <span className="rounded-2xl bg-blue-50 px-3 py-1 text-sm font-black tracking-normal text-blue-600">
              Live
            </span>
          </h1>
          <p className="mt-3 text-lg font-medium italic text-slate-500 opacity-80">
            실시간 시스템 지표와 제안서 생성 현황을 확인하세요.
          </p>
        </div>
      </div>

      {/* 1. 핵심 지표 섹션 (Primary Metrics) */}
      <section className="space-y-6">
        <div className="ml-2 flex items-center gap-3">
          <Activity size={18} className="text-blue-600" />
          <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">
            Primary Metrics
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <DashboardStatCard
            title="Total Proposals"
            value={stats?.totalProposals || 0}
            icon={FileText}
            colorClass="bg-blue-600"
            subText="누적 제안서 생성량"
          />
          <DashboardStatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={Users}
            colorClass="bg-indigo-600"
            subText="플랫폼 가입 사용자"
          />
          <DashboardStatCard
            title="Success Rate"
            value={stats?.completedProposals || 0}
            icon={CheckCircle2}
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
    </>
  );
}
