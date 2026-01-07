'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface DetailFilterProps {
  ownerOptions: FilterOption[];
  clientOptions: FilterOption[];
  selectedOwner: string;
  selectedClient: string;
  selectedStatus: 'all' | 'completed' | 'error';
  onApply: (owner: string, client: string, status: 'all' | 'completed' | 'error') => void;
}

export default function DetailFilter({
  ownerOptions,
  clientOptions,
  selectedOwner,
  selectedClient,
  selectedStatus,
  onApply,
}: DetailFilterProps) {
  const [tempOwner, setTempOwner] = useState(selectedOwner);
  const [tempClient, setTempClient] = useState(selectedClient);
  const [tempStatus, setTempStatus] = useState<'all' | 'completed' | 'error'>(selectedStatus);

  // 선택된 값이 변경될 때마다 임시 상태 업데이트
  useEffect(() => {
    setTempOwner(selectedOwner);
    setTempClient(selectedClient);
    setTempStatus(selectedStatus);
  }, [selectedOwner, selectedClient, selectedStatus]);

  const statusOptions: FilterOption[] = [
    { value: 'all', label: '전체' },
    { value: 'completed', label: '완료' },
    { value: 'error', label: '에러' },
  ];

  const activeFilterCount =
    (tempOwner !== 'all' ? 1 : 0) + (tempClient !== 'all' ? 1 : 0) + (tempStatus !== 'all' ? 1 : 0);

  const handleApply = () => {
    onApply(tempOwner, tempClient, tempStatus);
  };

  const handleReset = () => {
    setTempOwner('all');
    setTempClient('all');
    setTempStatus('all');
    onApply('all', 'all', 'all');
  };

  return (
    <div className="mt-20 max-h-[calc(100vh-12rem)] w-full overflow-y-auto rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/20">
      {/* 헤더 */}
      <div className="mb-5 flex items-center justify-between border-b border-slate-50 pb-8">
        <h3 className="text-sm font-black tracking-tight text-slate-900">상세 필터</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={handleReset}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500"
          >
            초기화
          </button>
        )}
      </div>

      {/* 세로 레이아웃: 필터 섹션들을 세로로 배치 */}
      <div className="mb-7 space-y-6">
        {/* 소유자 필터 */}
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            OWNER
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setTempOwner('all')}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold ${
                tempOwner === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              전체 {tempOwner === 'all' && <Check size={12} strokeWidth={4} />}
            </button>
            {ownerOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setTempOwner(option.value)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold ${
                  tempOwner === option.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{option.label}</span>{' '}
                {tempOwner === option.value && <Check size={12} strokeWidth={4} />}
              </button>
            ))}
          </div>
        </div>

        {/* 고객사 필터 */}
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            CLIENT
          </p>
          <div className="flex gap-1 space-y-1.5">
            <button
              onClick={() => setTempClient('all')}
              className={`mt-1.5 truncate rounded-xl border px-2.5 py-2 text-[10px] font-black ${
                tempClient === 'all'
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'
              }`}
            >
              전체
            </button>
            {clientOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setTempClient(option.value)}
                className={`truncate rounded-xl border px-2.5 py-2 text-[10px] font-black ${
                  tempClient === option.value
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 상태 필터 */}
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            STATUS
          </p>
          <div className="flex flex-col gap-1.5">
            {statusOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setTempStatus(option.value as 'all' | 'completed' | 'error')}
                className={`w-full rounded-xl border py-2 text-[10px] font-black uppercase tracking-widest ${
                  tempStatus === option.value
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                    : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'
                }`}
              >
                {option.value === 'all' ? '전체' : option.value === 'completed' ? '완료' : '에러'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 적용 버튼 - 하단으로 이동 */}
      <div className="flex gap-2 border-t border-slate-50 pt-4">
        <button
          onClick={handleReset}
          className="flex-1 rounded-2xl bg-slate-50 py-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100"
        >
          초기화
        </button>
        <button
          onClick={handleApply}
          className="flex-[2] rounded-2xl bg-blue-600 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-100 hover:bg-blue-700"
        >
          필터 적용하기
        </button>
      </div>
    </div>
  );
}
