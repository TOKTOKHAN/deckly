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
        aria-label={`${user.email || '사용자'} 작업 메뉴`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="rounded-xl p-2.5 text-slate-300 transition-all hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <MoreVertical size={20} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="사용자 작업 옵션"
          className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50"
        >
          <div className="p-2">
            <button
              role="menuitem"
              onClick={() => {
                onEdit(user);
                setIsOpen(false);
              }}
              aria-label={`${user.email || '사용자'} 정보 수정`}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Edit size={16} aria-hidden="true" />
              <span>수정</span>
            </button>
            <button
              role="menuitem"
              onClick={() => {
                onDelete(user);
                setIsOpen(false);
              }}
              aria-label={`${user.email || '사용자'} 삭제`}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Trash2 size={16} aria-hidden="true" />
              <span>삭제</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
