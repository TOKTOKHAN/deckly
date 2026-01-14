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
      role="search"
      aria-label="검색"
    >
      <div className="relative w-full flex-1">
        <label htmlFor="search-input" className="sr-only">
          {placeholder || '검색어 입력'}
        </label>
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
          aria-hidden="true"
        />
        <input
          id="search-input"
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && onSearchClick) {
              onSearchClick();
            }
          }}
          aria-label={placeholder || '검색어 입력'}
          className="w-full rounded-2xl border-none bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:ring-4 focus:ring-blue-50"
        />
      </div>
      {(showFilter || onSearchClick) && (
        <div className="flex w-full gap-3 md:w-auto">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              aria-label="검색 실행"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-600 px-6 py-3.5 text-sm font-black text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:flex-none"
            >
              <Search size={16} aria-hidden="true" /> 검색
            </button>
          )}
          {showFilter && (
            <button
              onClick={onFilterClick}
              aria-label="필터 옵션 열기"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-600 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:flex-none"
            >
              <Filter size={16} aria-hidden="true" /> 필터
            </button>
          )}
        </div>
      )}
    </div>
  );
}
