'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export default function Input({
  label,
  required,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label htmlFor={inputId} className="text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={inputId}
        className={`p-2.5 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
