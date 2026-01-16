import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AnalyticsChart from './AnalyticsChart';
import type { ProposalStatsByDate } from '@/lib/supabase/admin/analytics';
import type { VisitorAxisRange } from '@/lib/utils/analytics';

const meta = {
  title: 'Components/Admin/AnalyticsChart',
  component: AnalyticsChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    interval: {
      control: 'select',
      options: ['week', 'month', 'year'],
      description: '차트 날짜 간격',
    },
    stats: {
      control: 'object',
      description: '날짜별 제안서 통계 데이터',
    },
    visitorAxisRange: {
      control: 'object',
      description: '방문자 수 Y축 범위',
    },
  },
} satisfies Meta<typeof AnalyticsChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터 생성 함수
function generateSampleData(days: number, startDate: Date = new Date()): ProposalStatsByDate[] {
  const data: ProposalStatsByDate[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(startDate);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // 랜덤 데이터 생성 (더미 데이터)
    const count = Math.floor(Math.random() * 20) + 5;
    const completed = Math.floor(count * (0.6 + Math.random() * 0.3));
    const error = Math.floor(count * (0.05 + Math.random() * 0.1));
    const visitors = Math.floor(Math.random() * 200) + 50;

    data.push({
      date: dateStr,
      count,
      completed,
      error,
      visitors,
    });
  }
  return data;
}

// 주간 데이터 (7일)
const weekData = generateSampleData(7);

// 월간 데이터 (30일)
const monthData = generateSampleData(30);

// 연간 데이터 (12개월)
const yearData: ProposalStatsByDate[] = [];
const now = new Date();
for (let i = 11; i >= 0; i--) {
  const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
  const dateStr = date.toISOString().split('T')[0].slice(0, 7); // YYYY-MM 형식

  const count = Math.floor(Math.random() * 100) + 20;
  const completed = Math.floor(count * (0.6 + Math.random() * 0.3));
  const error = Math.floor(count * (0.05 + Math.random() * 0.1));
  const visitors = Math.floor(Math.random() * 1000) + 200;

  yearData.push({
    date: dateStr,
    count,
    completed,
    error,
    visitors,
  });
}

// 방문자 수 범위 계산
function calculateRange(data: ProposalStatsByDate[]): VisitorAxisRange {
  const visitors = data.map(d => d.visitors || 0).filter(v => v > 0);
  if (visitors.length === 0) {
    return { min: 0, max: 100 };
  }
  const min = Math.min(...visitors);
  const max = Math.max(...visitors);
  return {
    min: Math.max(0, Math.floor(min * 0.8)),
    max: Math.floor(max * 1.1),
  };
}

export const WeekView: Story = {
  args: {
    stats: weekData,
    interval: 'week',
    visitorAxisRange: calculateRange(weekData),
  },
};

export const MonthView: Story = {
  args: {
    stats: monthData,
    interval: 'month',
    visitorAxisRange: calculateRange(monthData),
  },
};

export const YearView: Story = {
  args: {
    stats: yearData,
    interval: 'year',
    visitorAxisRange: calculateRange(yearData),
  },
};

export const EmptyData: Story = {
  args: {
    stats: [],
    interval: 'week',
    visitorAxisRange: { min: 0, max: 100 },
  },
};

export const LowData: Story = {
  args: {
    stats: [
      { date: '2024-01-01', count: 2, completed: 1, error: 0, visitors: 10 },
      { date: '2024-01-02', count: 3, completed: 2, error: 0, visitors: 15 },
      { date: '2024-01-03', count: 1, completed: 1, error: 0, visitors: 8 },
    ],
    interval: 'week',
    visitorAxisRange: { min: 0, max: 20 },
  },
};

export const HighData: Story = {
  args: {
    stats: generateSampleData(7).map(d => ({
      ...d,
      count: d.count * 10,
      completed: d.completed * 10,
      error: d.error * 10,
      visitors: (d.visitors || 0) * 5,
    })),
    interval: 'week',
    visitorAxisRange: { min: 200, max: 1000 },
  },
};

export const WithErrors: Story = {
  args: {
    stats: [
      { date: '2024-01-01', count: 20, completed: 15, error: 5, visitors: 100 },
      { date: '2024-01-02', count: 25, completed: 18, error: 7, visitors: 120 },
      { date: '2024-01-03', count: 18, completed: 12, error: 6, visitors: 90 },
      { date: '2024-01-04', count: 30, completed: 20, error: 10, visitors: 150 },
    ],
    interval: 'week',
    visitorAxisRange: { min: 70, max: 170 },
  },
};
