'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import type { UserWithStats } from '@/lib/supabase/admin/users';

interface UserActionsDropdownProps {
  user: UserWithStats;
  onEdit: (user: UserWithStats) => void;
  onDelete: (user: UserWithStats) => void;
}

export default function UserActionsDropdown({ user, onEdit, onDelete }: UserActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-xl p-2.5 text-slate-300 transition-all hover:bg-blue-50 hover:text-blue-600"
        aria-label="사용자 작업 메뉴"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
          <div className="p-2">
            <button
              onClick={() => {
                onEdit(user);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
            >
              <Edit size={16} />
              <span>수정</span>
            </button>
            <button
              onClick={() => {
                onDelete(user);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
            >
              <Trash2 size={16} />
              <span>삭제</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
