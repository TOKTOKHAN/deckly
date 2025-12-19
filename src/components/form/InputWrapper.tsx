'use client';

import React from 'react';

interface InputWrapperProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  htmlFor?: string;
}

export default function InputWrapper({
  label,
  children,
  required,
  error,
  htmlFor,
}: InputWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {htmlFor ? (
        <label htmlFor={htmlFor} className="text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      ) : (
        <label className="text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
