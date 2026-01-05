'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: 'default' | 'danger';
  showCloseButton?: boolean;
  extraButton?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  children,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  variant = 'default',
  showCloseButton = true,
  extraButton,
}: ModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="닫기"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {message && <p className="mb-6 text-slate-600">{message}</p>}
        {children && <div className="mb-6">{children}</div>}

        {(onConfirm || onCancel) && (
          <div className="flex justify-end gap-3">
            {onCancel && (
              <Button type="button" variant="ghost" onClick={handleCancel} className="min-w-[80px]">
                {cancelText}
              </Button>
            )}
            {onConfirm && (
              <Button
                type="button"
                variant={variant === 'danger' ? 'primary' : 'primary'}
                onClick={handleConfirm}
                className={`min-w-[80px] ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : ''}`}
              >
                {confirmText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
