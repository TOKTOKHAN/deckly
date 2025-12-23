'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, error, id, className = '', ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // error는 input 요소에 전달하지 않도록 제거
    const { error: _, ...inputProps } = props as InputProps & { error?: string };

    return (
      <div className="mb-4 flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={`rounded-xl border p-2.5 text-black transition focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-transparent focus:ring-indigo-500'
          } ${className}`}
          {...inputProps}
        />
        {error && <span className="mt-0.5 text-xs font-medium text-red-500">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
