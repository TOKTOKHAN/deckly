import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Users, FileText, TrendingUp, DollarSign } from 'lucide-react';
import StatCard from './StatCard';

const meta = {
  title: 'Admin/StatCard',
  component: StatCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dashboard'],
    },
    colorClass: {
      control: 'select',
      options: [
        'bg-indigo-600',
        'bg-blue-600',
        'bg-green-600',
        'bg-purple-600',
        'bg-pink-600',
        'bg-orange-600',
      ],
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Grid 스토리에서 사용할 기본 props (타입 안전하게 정의)
type StatCardProps = React.ComponentProps<typeof StatCard>;
const gridArgs: StatCardProps = {
  title: '',
  value: '',
  icon: <Users size={24} />,
  colorClass: 'bg-indigo-600',
};

export const Default: Story = {
  args: {
    title: '총 사용자',
    value: '1,234',
    icon: <Users size={24} />,
    colorClass: 'bg-indigo-600',
  },
};

export const WithTrend: Story = {
  args: {
    title: '제안서',
    value: '567',
    icon: <FileText size={24} />,
    colorClass: 'bg-blue-600',
    trend: '+12%',
  },
};

export const WithSubText: Story = {
  args: {
    title: '성장률',
    value: '89%',
    icon: <TrendingUp size={24} />,
    colorClass: 'bg-green-600',
    subText: '지난 달 대비',
  },
};

export const WithAllFeatures: Story = {
  args: {
    title: '매출',
    value: '₩12,345,678',
    icon: <DollarSign size={24} />,
    colorClass: 'bg-purple-600',
    trend: '+23%',
    subText: '이번 달',
  },
};

export const DashboardVariant: Story = {
  args: {
    title: '대시보드 스타일',
    value: '999',
    icon: <Users size={24} />,
    colorClass: 'bg-pink-600',
    variant: 'dashboard',
    trend: '+5%',
    subText: '활성 사용자',
  },
};

export const NumberValue: Story = {
  args: {
    title: '숫자 값',
    value: 1234567,
    icon: <TrendingUp size={24} />,
    colorClass: 'bg-orange-600',
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="총 사용자"
        value="1,234"
        icon={<Users size={24} />}
        colorClass="bg-indigo-600"
        trend="+12%"
      />
      <StatCard
        title="제안서"
        value="567"
        icon={<FileText size={24} />}
        colorClass="bg-blue-600"
        trend="+8%"
      />
      <StatCard
        title="성장률"
        value="89%"
        icon={<TrendingUp size={24} />}
        colorClass="bg-green-600"
        subText="지난 달 대비"
      />
      <StatCard
        title="매출"
        value="₩12,345,678"
        icon={<DollarSign size={24} />}
        colorClass="bg-purple-600"
        trend="+23%"
        subText="이번 달"
      />
    </div>
  ),
  // Grid 스토리는 render만 사용하지만, 타입을 맞추기 위해 최소 props를 지정합니다.
  args: gridArgs,
};
