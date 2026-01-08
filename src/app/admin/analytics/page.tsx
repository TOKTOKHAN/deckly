'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Activity,
  CalendarDays,
  Download,
  MousePointer2,
  ChevronRight,
} from 'lucide-react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ProposalStatsByDate } from '@/lib/supabase/admin/analytics';
import LoadingState from '@/components/admin/LoadingState';
import ErrorState from '@/components/admin/ErrorState';
import EmptyState from '@/components/admin/EmptyState';

async function fetchStats(start: string, end: string, interval: 'day' | 'week' | 'month' | 'year') {
  const params = new URLSearchParams();
  params.set('startDate', start);
  params.set('endDate', end);
  params.set('interval', interval);

  const url = `/api/admin/analytics/stats?${params.toString()}`;
  // eslint-disable-next-line no-console
  console.log('[Analytics Frontend] API 호출:', { url, start, end, interval });

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '통계를 불러오는 중 오류가 발생했습니다.');
  }
  const data = await response.json();
  // eslint-disable-next-line no-console
  console.log('[Analytics Frontend] API 응답:', { interval, dataLength: data?.length || 0, data });
  return data;
}

export default function AdminAnalyticsPage() {
  const [interval, setInterval] = useState<'week' | 'month' | 'year'>('week');

  // interval에 따라 날짜 범위 계산
  const { start, end } = useMemo(() => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999); // 하루 끝 시간
    const startDate = new Date();

    if (interval === 'week') {
      // 이번 주 월요일부터 일요일까지 7일 계산
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0(일요일) ~ 6(토요일)
      // 월요일(1)까지의 일수 계산: 월요일이면 0, 일요일이면 6
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      // 이번 주 월요일 계산
      startDate.setDate(today.getDate() - daysToMonday); // 이번 주 월요일
      startDate.setHours(0, 0, 0, 0);
      // 일요일까지 (월요일 + 6일)
      endDate.setDate(today.getDate() - daysToMonday + 6); // 이번 주 일요일
      endDate.setHours(23, 59, 59, 999);
    } else if (interval === 'month') {
      // 최근 30일
      startDate.setDate(startDate.getDate() - 30);
      startDate.setHours(0, 0, 0, 0);
    } else {
      // 최근 12개월
      startDate.setMonth(startDate.getMonth() - 12);
      startDate.setHours(0, 0, 0, 0);
    }

    return {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
  }, [interval]);

  const {
    data: rawStats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'analytics', start, end, interval],
    queryFn: () => fetchStats(start, end, interval),
    retry: 2,
    retryDelay: 1000,
  });

  // 디버깅: 주간 필터일 때만 로그 출력
  useEffect(() => {
    if (interval === 'week' && rawStats) {
      // eslint-disable-next-line no-console
      console.log('[Analytics Frontend] 주간 데이터 수신:', {
        interval,
        startDate: start.split('T')[0],
        endDate: end.split('T')[0],
        dataLength: rawStats.length || 0,
        data: rawStats.map((d: ProposalStatsByDate) => ({
          date: d.date,
          visitors: d.visitors,
          count: d.count,
        })),
      });
    }
  }, [rawStats, interval, start, end]);

  // 주간 필터일 때 월요일부터 일요일까지 7일 모두 채우기
  const stats = useMemo(() => {
    if (interval !== 'week') {
      return rawStats;
    }

    // 월요일부터 일요일까지 7일 생성
    const weekDays: ProposalStatsByDate[] = [];
    const statsMap = new Map<string, ProposalStatsByDate>();

    // 기존 데이터를 맵으로 변환
    if (rawStats && rawStats.length > 0) {
      rawStats.forEach((stat: ProposalStatsByDate) => {
        // 날짜 키 정규화 (YYYY-MM-DD 형식으로)
        let dateKey = stat.date.length > 10 ? stat.date.substring(0, 10) : stat.date;
        // 날짜 형식이 YYYY-MM-DD가 아닌 경우 변환
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
          const date = new Date(dateKey);
          if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            dateKey = `${year}-${month}-${day}`;
          }
        }
        statsMap.set(dateKey, stat);
      });
    }

    // 이번 주 월요일부터 일요일까지
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const thisMonday = new Date(today);
    thisMonday.setDate(today.getDate() - daysToMonday); // 이번 주 월요일
    thisMonday.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(thisMonday);
      currentDate.setDate(thisMonday.getDate() + i);
      // 타임존 문제 방지를 위해 직접 날짜 문자열 생성
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`; // YYYY-MM-DD

      // 데이터가 있으면 사용, 없으면 빈 데이터 생성
      const existingData = statsMap.get(dateKey);
      if (existingData) {
        // 방문자 수가 포함된 데이터 사용
        weekDays.push(existingData);
      } else {
        weekDays.push({
          date: dateKey,
          count: 0,
          completed: 0,
          error: 0,
          visitors: 0,
        });
      }
    }

    // 디버깅: 주간 데이터 처리 결과 확인
    if (interval === 'week') {
      // eslint-disable-next-line no-console
      console.log('[Analytics Frontend] 주간 데이터 처리 완료:', {
        weekDaysLength: weekDays.length,
        weekDays: weekDays.map((d: ProposalStatsByDate) => ({
          date: d.date,
          visitors: d.visitors,
          count: d.count,
        })),
        statsMapKeys: Array.from(statsMap.keys()),
      });
    }

    return weekDays;
  }, [rawStats, interval]);

  // 통계 계산
  const totalVisitors = useMemo(
    () =>
      stats?.reduce((sum: number, stat: ProposalStatsByDate) => sum + (stat.visitors || 0), 0) || 0,
    [stats],
  );
  const totalCreated = useMemo(
    () => stats?.reduce((sum: number, stat: ProposalStatsByDate) => sum + stat.count, 0) || 0,
    [stats],
  );
  const totalCompleted = useMemo(
    () => stats?.reduce((sum: number, stat: ProposalStatsByDate) => sum + stat.completed, 0) || 0,
    [stats],
  );
  const totalErrors = useMemo(
    () => stats?.reduce((sum: number, stat: ProposalStatsByDate) => sum + stat.error, 0) || 0,
    [stats],
  );
  const successRate = totalCreated > 0 ? ((totalCompleted / totalCreated) * 100).toFixed(1) : '0.0';
  const errorRate = totalCreated > 0 ? ((totalErrors / totalCreated) * 100).toFixed(1) : '0.0';

  // 방문자 수 최소값 계산 (데이터가 있으면 최소값의 80%부터 시작)
  const visitorMinMax = useMemo(() => {
    if (!stats || stats.length === 0) return { min: 0, max: 100 };
    const visitors = stats
      .map((stat: ProposalStatsByDate) => stat.visitors || 0)
      .filter((v: number) => v > 0);
    if (visitors.length === 0) return { min: 0, max: 100 };
    const min = Math.min(...visitors);
    const max = Math.max(...visitors);
    // 최소값이 10보다 작으면 0부터, 크면 최소값의 80%부터 시작
    return {
      min: min < 10 ? 0 : Math.floor(min * 0.8),
      max: Math.ceil(max * 1.1),
    };
  }, [stats]);

  return (
    <div className="animate-in fade-in space-y-10 pb-20 duration-700">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-600">
            <BarChart3 size={12} /> System Intelligence
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900">통계 및 분석</h1>
          <p className="mt-3 text-lg font-medium italic text-slate-500 opacity-80">
            데이터 기반의 서비스 성장 지표를 분석합니다.
          </p>
        </div>

        {/* Interval Filter */}
        <div className="flex rounded-[1.5rem] border border-slate-100 bg-white p-1.5 shadow-sm">
          {(['week', 'month', 'year'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => setInterval(opt)}
              className={`rounded-2xl px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                interval === opt
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {opt === 'week' ? 'Weekly' : opt === 'month' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>
      </div>

      {/* 에러 처리 */}
      {error && (
        <div className="mb-6">
          <ErrorState
            error={error}
            onRetry={() => refetch()}
            title="통계를 불러오는 중 오류가 발생했습니다."
          />
        </div>
      )}

      {/* 통계 표시 */}
      {isLoading ? (
        <LoadingState message="통계를 불러오는 중..." />
      ) : stats && stats.length > 0 ? (
        <>
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: '총 방문자 수',
                val: totalVisitors,
                icon: <MousePointer2 size={18} />,
                color: 'text-indigo-600',
                bg: 'bg-indigo-50',
              },
              {
                label: '제안서 생성 총계',
                val: totalCreated,
                icon: <BarChart3 size={18} />,
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                label: '최종 완료율',
                val: `${successRate}%`,
                icon: <CheckCircle2 size={18} />,
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
              },
              {
                label: '평균 오류 발생',
                val: `${errorRate}%`,
                icon: <AlertCircle size={18} />,
                color: 'text-red-600',
                bg: 'bg-red-50',
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/20 transition-all hover:shadow-2xl"
              >
                <div
                  className={`h-10 w-10 ${stat.bg} ${stat.color} mb-4 flex items-center justify-center rounded-xl`}
                >
                  {stat.icon}
                </div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
                <h4 className="text-3xl font-black tracking-tighter text-slate-900">
                  {typeof stat.val === 'number' ? stat.val.toLocaleString() : stat.val}
                </h4>
              </div>
            ))}
          </div>

          {/* 통합 차트 섹션 */}
          <div className="rounded-[3rem] border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/40">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-slate-800">통합 분석 차트</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    제안서 완료
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                  <span className="text-[10px] font-black uppercase text-slate-400">방문자 수</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value: string) => {
                    if (interval === 'year') {
                      return value.substring(0, 7);
                    } else if (interval === 'week') {
                      // 주간일 때: MM/DD 형식으로 표시
                      if (value.length > 10) {
                        const date = new Date(value);
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        return `${month}/${day}`;
                      }
                      return value.substring(5, 10);
                    } else {
                      return value.length > 10 ? value.substring(5, 10) : value;
                    }
                  }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#6b7280"
                  fontSize={12}
                  label={{ value: '개수', angle: 0, position: 'insideLeft' }}
                  tickCount={10}
                  domain={[0, 'auto']}
                  allowDecimals={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#6366f1"
                  fontSize={12}
                  label={{ value: '방문자', angle: 0, position: 'insideRight' }}
                  tickCount={10}
                  domain={[visitorMinMax.min, visitorMinMax.max]}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                {/* 막대 차트 - 제안서 생성 완료 횟수만 */}
                <Bar
                  yAxisId="left"
                  dataKey="completed"
                  name="제안서 완료"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                  className="transition-opacity hover:opacity-80"
                />
                {/* 라인 차트 - 방문자 수만 */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="visitors"
                  name="방문자"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#6366f1' }}
                  activeDot={{ r: 7 }}
                />
              </ComposedChart>
            </ResponsiveContainer>

            <div className="mt-10 flex items-center justify-between border-t border-slate-50 pt-8">
              <div className="flex items-center gap-6">
                <p className="text-[10px] font-bold italic text-slate-400">
                  Generated at {new Date().toLocaleString('ko-KR')}
                </p>
                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[9px] font-black text-slate-600">
                      완료율: {successRate}%
                    </span>
                  </div>
                </div>
              </div>
              <button className="group flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
                Raw Data Export{' '}
                <ChevronRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* Detailed Table */}
          <div className="overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/40">
            <div className="flex items-center justify-between border-b border-slate-50 bg-slate-50/30 px-10 py-8">
              <h3 className="flex items-center gap-3 text-xl font-black text-slate-800">
                <Activity size={20} className="text-indigo-600" />
                상세 데이터 리포트
              </h3>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-blue-600">
                <Download size={14} /> PDF Download
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <th className="px-10 py-6">Reporting Date</th>
                    <th className="px-6 py-6">Visitors</th>
                    <th className="px-6 py-6">Proposals Created</th>
                    <th className="px-6 py-6 text-emerald-600">Completed</th>
                    <th className="px-6 py-6 text-red-500">Errors</th>
                    <th className="px-10 py-6 text-right">Success Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[...stats].reverse().map((day: ProposalStatsByDate, i: number) => {
                    const successRateValue =
                      day.count > 0 ? ((day.completed / day.count) * 100).toFixed(1) : '0.0';
                    return (
                      <tr key={i} className="group transition-all hover:bg-blue-50/20">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-3">
                            <CalendarDays size={14} className="text-slate-300" />
                            <span className="text-sm font-black text-slate-900">
                              {interval === 'year'
                                ? day.date.substring(0, 7)
                                : day.date.length > 10
                                  ? day.date.substring(0, 10)
                                  : day.date}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-sm font-bold text-slate-500">
                          {(day.visitors || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-6 text-sm font-bold text-slate-500">
                          {day.count.toLocaleString()}
                        </td>
                        <td className="px-6 py-6 text-sm font-bold text-emerald-500">
                          {day.completed.toLocaleString()}
                        </td>
                        <td className="px-6 py-6 text-sm font-bold text-red-400">
                          {day.error.toLocaleString()}
                        </td>
                        <td className="px-10 py-6 text-right">
                          <span className="inline-flex rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                            {successRateValue}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <EmptyState defaultMessage="통계 데이터가 없습니다." />
      )}
    </div>
  );
}
