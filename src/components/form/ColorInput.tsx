'use client';

import React from 'react';

interface ColorInputProps {
  label: string;
  id: string;
  value: string;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(
  ({ label, id, value, error, placeholder, onChange, onTextChange, required }, ref) => {
    return (
      <div className="mb-4 flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="h-10 w-20 cursor-pointer rounded-lg border border-gray-300"
          />
          <input
            ref={ref}
            type="text"
            id={id}
            value={value}
            onChange={onTextChange}
            required={required}
            placeholder={placeholder}
            className={`flex-1 rounded-xl border p-2 text-sm text-black transition placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-transparent focus:ring-indigo-500'
            }`}
          />
        </div>
        {error && (
          <span className="mt-0.5 whitespace-pre-line text-xs font-medium text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  },
);

ColorInput.displayName = 'ColorInput';

export default ColorInput;
