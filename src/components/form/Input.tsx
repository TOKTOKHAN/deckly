'use client';

import React, { ReactNode, useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  required?: boolean;
  error?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  hideLabel?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelClassName,
      required,
      error,
      id,
      className = '',
      icon,
      rightIcon,
      hideLabel = false,
      ...props
    },
    ref,
  ) => {
    // Hydration 문제 방지를 위해 useId 사용
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="flex w-full flex-col gap-1">
        {label && !hideLabel && (
          <label
            htmlFor={inputId}
            className={labelClassName || 'text-sm font-semibold text-gray-700'}
          >
            {label}
          </label>
        )}
        <div className={`${icon || rightIcon ? 'relative' : ''} group`}>
          {icon && (
            <div className="absolute left-5 top-1/2 flex -translate-y-1/2 items-center justify-center leading-none text-slate-300 [&_svg]:transition-colors group-focus-within:[&_svg]:text-blue-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            className={`w-full text-black transition focus:outline-none ${
              icon ? 'pl-14' : 'pl-4'
            } ${rightIcon ? 'pr-14' : 'pr-4'} ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : className.includes('border-') && !className.includes('focus:border-')
                  ? ''
                : 'border-gray-300 focus:border-transparent focus:ring-indigo-500'
            } ${
              error ? '!border-red-500 focus:!border-red-500 focus:!ring-red-500' : ''
            } ${!className.includes('rounded-') ? 'rounded-xl' : ''} ${
              !className.includes('border') ? 'border' : ''
            } ${!className.includes('py-') ? 'py-3' : ''} ${
              !className.includes('focus:ring-') ? 'focus:ring-2' : ''
            } ${className}`.trim()}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center leading-none text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <div className="mt-1 min-h-[20px] w-full px-1" style={{ display: 'block' }}>
            <span className="block text-xs font-medium text-red-500">{error}</span>
          </div>
        )}
        {!error && <div className="min-h-[20px]" />}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
