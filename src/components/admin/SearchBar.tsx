'use client';

import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showFilter?: boolean;
  onFilterClick?: () => void;
  onSearchClick?: () => void;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = '검색...',
  showFilter = false,
  onFilterClick,
  onSearchClick,
  className = '',
}: SearchBarProps) {
  return (
    <div
      className={`flex flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/20 md:flex-row ${className}`}
    >
      <div className="relative w-full flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && onSearchClick) {
              onSearchClick();
            }
          }}
          className="w-full rounded-2xl border-none bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:ring-4 focus:ring-blue-50"
        />
      </div>
      {(showFilter || onSearchClick) && (
        <div className="flex w-full gap-3 md:w-auto">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition-all hover:bg-blue-700 md:flex-none"
            >
              <Search size={16} /> 검색
            </button>
          )}
          {showFilter && (
            <button
              onClick={onFilterClick}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-600 transition-all hover:bg-slate-50 md:flex-none"
            >
              <Filter size={16} /> 필터
            </button>
          )}
        </div>
      )}
    </div>
  );
}
