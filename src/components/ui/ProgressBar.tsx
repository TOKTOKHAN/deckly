'use client';

import { GenerationStatus } from '@/types/proposal';

interface ProgressBarProps extends GenerationStatus {
  className?: string;
}

export default function ProgressBar({ progress, message, className }: ProgressBarProps) {
  return (
    <div className={`w-full ${className || ''}`}>
      <div className="flex justify-between mb-1 text-xs font-medium">
        <span className="text-indigo-600">{message}</span>
        <span className="text-gray-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
