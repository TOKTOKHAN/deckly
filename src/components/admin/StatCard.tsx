'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
  trend?: string;
  subText?: string;
  variant?: 'default' | 'dashboard';
  href?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  colorClass,
  trend,
  subText,
  variant = 'default',
  href,
}: StatCardProps) {
  const roundedClass = variant === 'dashboard' ? 'rounded-[2.5rem]' : 'rounded-[2rem]';
  const durationClass = variant === 'dashboard' ? 'duration-500' : 'duration-300';
  const shadowClass =
    variant === 'dashboard' ? 'shadow-xl shadow-slate-200/40' : 'shadow-xl shadow-slate-200/40';
  const titleSizeClass =
    variant === 'dashboard' ? 'text-[10px] tracking-[0.2em]' : 'text-xs tracking-widest';
  const titleMarginClass = variant === 'dashboard' ? 'mb-1.5' : 'mb-1';
  const subTextOpacityClass = variant === 'dashboard' ? 'opacity-70' : '';

  // ARIA 레이블 생성
  const ariaLabel = href
    ? `${title}: ${typeof value === 'number' ? value.toLocaleString() : value}${subText ? `, ${subText}` : ''}${trend ? `, ${trend}` : ''}, 자세히 보기`
    : `${title}: ${typeof value === 'number' ? value.toLocaleString() : value}${subText ? `, ${subText}` : ''}`;

  const cardContent = (
    <div
      className={`group ${roundedClass} border border-slate-100 bg-white p-8 ${shadowClass} transition-all ${durationClass} ${
        href
          ? 'cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-blue-200 hover:shadow-2xl'
          : 'hover:border-blue-200 hover:shadow-2xl'
      }`}
    >
      <div className="mb-6 flex items-start justify-between">
        <div
          className={`${colorClass} rounded-2xl p-4 text-white shadow-lg transition-transform ${durationClass} group-hover:scale-110 ${
            variant === 'default' ? 'shadow-indigo-100' : ''
          }`}
          aria-hidden="true"
        >
          {icon}
        </div>
        {trend && (
          <div
            className="flex items-center gap-1 rounded-lg bg-green-50 px-2.5 py-1 text-xs font-black text-green-500"
            aria-label={`추세: ${trend}`}
          >
            <ArrowUpRight size={variant === 'dashboard' ? 14 : 12} aria-hidden="true" /> {trend}
          </div>
        )}
      </div>
      <div>
        <p className={`${titleMarginClass} ${titleSizeClass} font-black uppercase text-slate-400`}>
          {title}
        </p>
        <h4
          className="mb-2 text-4xl font-black tracking-tighter text-slate-900"
          aria-label={`${title} ${typeof value === 'number' ? value.toLocaleString() : value}`}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h4>
        {subText && (
          <p className={`text-xs font-medium italic text-slate-400 ${subTextOpacityClass}`}>
            {subText}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className="block rounded-[2.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
