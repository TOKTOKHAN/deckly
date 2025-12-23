'use client';

import { GenerationStatus } from '@/types/proposal';

interface ProgressBarProps extends GenerationStatus {
  className?: string;
}

export default function ProgressBar({ progress, message, className }: ProgressBarProps) {
  return (
    <div className={`w-full ${className || ''}`}>
      <div className="mb-1 flex justify-between text-xs font-medium">
        <span className="text-indigo-600">{message}</span>
        <span className="text-gray-600">{progress}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
