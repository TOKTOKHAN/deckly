'use client';

import { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Phone, Shield, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import type { UserWithStats } from '@/lib/supabase/admin/users';

interface EditUserModalProps {
  isOpen: boolean;
  user: UserWithStats | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export default function EditUserModal({ isOpen, user, onClose, onSuccess }: EditUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [grantAdmin, setGrantAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // 사용자 데이터로 폼 초기화
  useEffect(() => {
    if (user && isOpen) {
      const metadata = (user.userMetadata || {}) as { name?: string; isAdmin?: boolean };
      setName(metadata.name || '');
      setEmail(user.email || '');
      setPassword(''); // 비밀번호는 빈 값으로 시작
      setPhone(user.phone || '');
      setGrantAdmin(metadata.isAdmin === true);
      setError(null);
      setValidationErrors({});
    }
  }, [user, isOpen]);

  // 유효성 검증 함수 (비밀번호는 선택사항)
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // 이름 검증
    const trimmedName = name.trim();
    if (!trimmedName) {
      errors.name = '이름을 입력해주세요.';
    } else if (trimmedName.length < 2) {
      errors.name = '이름은 최소 2자 이상이어야 합니다.';
    }

    // 이메일 검증
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = '이메일을 입력해주세요.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.email = '유효한 이메일 주소를 입력해주세요.';
      }
    }

    // 비밀번호 검증 (입력된 경우에만)
    const trimmedPassword = password.trim();
    if (trimmedPassword && trimmedPassword.length < 6) {
      errors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    // 전화번호 검증 (선택사항이지만 입력된 경우 형식 검증)
    const trimmedPhone = phone.trim();
    if (trimmedPhone) {
      const phoneRegex = /^[0-9-]+$/;
      if (!phoneRegex.test(trimmedPhone)) {
        errors.phone = '유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)';
      } else if (trimmedPhone.replace(/-/g, '').length < 10) {
        errors.phone = '전화번호는 최소 10자리 이상이어야 합니다.';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 개별 필드 검증 함수
  const validateField = (
    fieldName: 'name' | 'email' | 'password' | 'phone',
    value: string,
  ): string | undefined => {
    switch (fieldName) {
      case 'name': {
        const trimmed = value.trim();
        if (!trimmed) {
          return '이름을 입력해주세요.';
        }
        if (trimmed.length < 2) {
          return '이름은 최소 2자 이상이어야 합니다.';
        }
        return undefined;
      }
      case 'email': {
        const trimmed = value.trim();
        if (!trimmed) {
          return '이메일을 입력해주세요.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
          return '유효한 이메일 주소를 입력해주세요.';
        }
        return undefined;
      }
      case 'password': {
        const trimmed = value.trim();
        if (trimmed && trimmed.length < 6) {
          return '비밀번호는 최소 6자 이상이어야 합니다.';
        }
        return undefined;
      }
      case 'phone': {
        const trimmed = value.trim();
        if (trimmed) {
          const phoneRegex = /^[0-9-]+$/;
          if (!phoneRegex.test(trimmed)) {
            return '유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)';
          }
          if (trimmed.replace(/-/g, '').length < 10) {
            return '전화번호는 최소 10자리 이상이어야 합니다.';
          }
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);
    setValidationErrors({});

    // 유효성 검증
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Supabase 클라이언트 확인
      if (!supabase) {
        throw new Error('Supabase 클라이언트를 초기화할 수 없습니다.');
      }

      // 현재 세션 가져오기
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error('세션을 가져오는 중 오류가 발생했습니다. 다시 로그인해주세요.');
      }

      if (!session?.access_token) {
        throw new Error('인증 세션이 없습니다. 다시 로그인해주세요.');
      }

      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim() || undefined, // 비밀번호가 입력된 경우에만 전송
          phone: phone.trim() || undefined,
          grantAdmin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '사용자 수정에 실패했습니다.');
      }

      // 성공 시 폼 초기화 및 모달 닫기
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setGrantAdmin(false);
      setValidationErrors({});
      setError(null);

      // 성공 토스트 알림
      toast.success('사용자 정보가 성공적으로 수정되었습니다.', {
        duration: 3000,
      });

      onSuccess();
      onClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '사용자 수정 중 오류가 발생했습니다.';
      setError(errorMessage);

      // 실패 토스트 알림
      toast.error(errorMessage, {
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setGrantAdmin(false);
      setError(null);
      setValidationErrors({});
      onClose();
    }
  };

  // 실시간 유효성 검증 (필드별)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (validationErrors.name) {
      const error = validateField('name', value);
      setValidationErrors(prev => ({ ...prev, name: error }));
    }
  };

  const handleNameBlur = () => {
    const error = validateField('name', name);
    setValidationErrors(prev => ({ ...prev, name: error }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (validationErrors.email) {
      const error = validateField('email', value);
      setValidationErrors(prev => ({ ...prev, email: error }));
    }
  };

  const handleEmailBlur = () => {
    const error = validateField('email', email);
    setValidationErrors(prev => ({ ...prev, email: error }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (validationErrors.password) {
      const error = validateField('password', value);
      setValidationErrors(prev => ({ ...prev, password: error }));
    }
  };

  const handlePasswordBlur = () => {
    const error = validateField('password', password);
    setValidationErrors(prev => ({ ...prev, password: error }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (validationErrors.phone) {
      const error = validateField('phone', value);
      setValidationErrors(prev => ({ ...prev, phone: error }));
    }
  };

  const handlePhoneBlur = () => {
    const error = validateField('phone', phone);
    setValidationErrors(prev => ({ ...prev, phone: error }));
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="animate-in fade-in absolute inset-0 bg-slate-900/40 backdrop-blur-md duration-300"
        onClick={handleClose}
      />

      <div className="animate-in zoom-in-95 relative z-10 w-full max-w-md rounded-[3rem] border border-slate-100 bg-white p-6 shadow-[0_40px_100px_rgba(0,0,0,0.25)] duration-300">
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute right-6 top-6 rounded-xl p-2 text-slate-300 transition-all hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <div className="mb-6 text-center sm:text-left">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[1.5rem] bg-indigo-50 sm:mx-0">
            <User size={24} className="text-indigo-600" />
          </div>
          <h2 className="mb-1.5 text-xl font-black tracking-tight text-slate-900">사용자 수정</h2>
          <p className="text-xs font-medium italic text-slate-400">사용자 정보를 수정합니다.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Input
            type="text"
            label="Name"
            required
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            placeholder="홍길동"
            disabled={isLoading}
            error={validationErrors.name}
            icon={<User size={18} />}
            className="rounded-[1.5rem] border-2 border-transparent bg-slate-50 py-4 pl-14 pr-6 text-sm font-bold placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:bg-slate-50 disabled:opacity-50 [&>div>div]:left-5 [&>label]:ml-1 [&>label]:text-[10px] [&>label]:font-black [&>label]:uppercase [&>label]:tracking-[0.2em] [&>label]:text-slate-400"
          />

          <Input
            type="email"
            label="Email Address"
            required
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="user@deckly.com"
            disabled={isLoading}
            error={validationErrors.email}
            icon={<Mail size={18} />}
            className="rounded-[1.5rem] border-2 border-transparent bg-slate-50 py-4 pl-14 pr-6 text-sm font-bold placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:bg-slate-50 disabled:opacity-50 [&>div>div]:left-5 [&>label]:ml-1 [&>label]:text-[10px] [&>label]:font-black [&>label]:uppercase [&>label]:tracking-[0.2em] [&>label]:text-slate-400"
          />

          <div className="space-y-2">
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password (Optional)"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              placeholder="변경하지 않으려면 비워두세요"
              minLength={6}
              disabled={isLoading}
              error={validationErrors.password}
              icon={<Lock size={18} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="flex items-center justify-center"
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              className="rounded-[1.5rem] border-2 border-transparent bg-slate-50 py-4 pl-14 pr-6 text-sm font-bold placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:bg-slate-50 disabled:opacity-50 [&>div>div]:left-5 [&>label]:ml-1 [&>label]:text-[10px] [&>label]:font-black [&>label]:uppercase [&>label]:tracking-[0.2em] [&>label]:text-slate-400"
            />
            {!validationErrors.password && (
              <p className="ml-1 text-[10px] font-bold text-slate-400">
                비밀번호를 변경하지 않으려면 비워두세요.
              </p>
            )}
          </div>

          <Input
            type="tel"
            label="Phone (Optional)"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            placeholder="010-0000-0000"
            disabled={isLoading}
            error={validationErrors.phone}
            icon={<Phone size={18} />}
            className="rounded-[1.5rem] border-2 border-transparent bg-slate-50 py-4 pl-14 pr-6 text-sm font-bold placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:bg-slate-50 disabled:opacity-50 [&>div>div]:left-5 [&>label]:ml-1 [&>label]:text-[10px] [&>label]:font-black [&>label]:uppercase [&>label]:tracking-[0.2em] [&>label]:text-slate-400"
          />

          <div
            className={`flex cursor-pointer items-center justify-between rounded-[2rem] border-2 p-6 transition-all ${
              grantAdmin
                ? 'border-indigo-200 bg-indigo-50'
                : 'border-transparent bg-slate-50 hover:bg-slate-100'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={() => !isLoading && setGrantAdmin(!grantAdmin)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-colors ${
                  grantAdmin ? 'bg-white text-indigo-600 shadow-sm' : 'bg-slate-200 text-slate-400'
                }`}
              >
                <Shield size={20} />
              </div>
              <div>
                <p
                  className={`text-sm font-black tracking-tight ${
                    grantAdmin ? 'text-indigo-900' : 'text-slate-600'
                  }`}
                >
                  어드민 권한 부여
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Administrator Access
                </p>
              </div>
            </div>
            <div
              className={`relative h-5 w-10 rounded-full transition-colors ${
                grantAdmin ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`absolute top-1 h-3 w-3 rounded-full bg-white transition-all ${
                  grantAdmin ? 'left-6' : 'left-1'
                }`}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 rounded-[1.5rem] bg-slate-100 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-200"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={
                isLoading ||
                !name.trim() ||
                name.trim().length < 2 ||
                !email.trim() ||
                (!!password.trim() && password.length < 6)
              }
              className="flex-[2] rounded-[1.5rem] bg-indigo-600 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
            >
              수정 완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
