'use client';

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
import type { ProposalStatsByDate } from '@/lib/supabase/admin/analytics';
import type { VisitorAxisRange } from '@/lib/utils/analytics';
import { formatChartDate } from '@/lib/utils/dateFormatter';

interface AnalyticsChartProps {
  stats: ProposalStatsByDate[];
  interval: 'week' | 'month' | 'year';
  visitorAxisRange: VisitorAxisRange;
}

export default function AnalyticsChart({ stats, interval, visitorAxisRange }: AnalyticsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={stats}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          stroke="#6b7280"
          fontSize={12}
          tickFormatter={(value: string) => formatChartDate(value, interval)}
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
          domain={[visitorAxisRange.min, visitorAxisRange.max]}
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
        <Bar
          yAxisId="left"
          dataKey="completed"
          name="제안서 완료"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          barSize={20}
          className="transition-opacity hover:opacity-80"
        />
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
  );
}
