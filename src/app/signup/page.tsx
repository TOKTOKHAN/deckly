'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ChevronLeft,
  Layout,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/form/Input';
import { signupSchema, type SignupFormData } from '@/lib/validations/authSchema';
import { supabase } from '@/lib/supabase/client';
import { useRequireGuest } from '@/hooks/useRequireGuest';

export default function SignupPage() {
  const router = useRouter();
  useRequireGuest();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const password = watch('password');

  const handleConfirmPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const confirmPasswordValue = e.target.value;
    if (confirmPasswordValue && password && password !== confirmPasswordValue) {
      setError('confirmPassword', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다',
      });
    } else if (confirmPasswordValue && password && password === confirmPasswordValue) {
      clearErrors('confirmPassword');
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    if (!supabase) {
      setSubmitError('Supabase 클라이언트를 초기화할 수 없습니다.');
      return;
    }

    setSubmitError(null);

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (error) {
        // 에러 메시지를 사용자 친화적으로 변환
        if (error.message.includes('already registered')) {
          setError('email', {
            type: 'manual',
            message: '이미 가입된 이메일입니다.',
          });
        } else if (error.message.includes('Password')) {
          setError('password', {
            type: 'manual',
            message: error.message,
          });
        } else {
          setSubmitError(error.message || '회원가입 중 오류가 발생했습니다.');
        }
        return;
      }

      // 회원가입 성공 - 바로 로그인된 상태로 홈으로 이동
      if (authData.user) {
        router.push('/');
      }
    } catch {
      setSubmitError('예상치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
      <div className="flex min-h-[600px] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-indigo-100 md:flex-row">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-indigo-600 p-12 text-white md:flex md:w-1/2">
          <div className="absolute right-[-10%] top-[-10%] h-64 w-64 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] h-64 w-64 rounded-full bg-indigo-700 opacity-50 blur-3xl"></div>

          <div className="relative z-10">
            <div className="group mb-8 flex cursor-pointer items-center gap-2">
              <div className="rounded-xl bg-white p-2">
                <Layout className="text-indigo-600" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter">Deckly</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight">
              복잡한 제안서 생성을 <br />
              <span className="text-indigo-200">단 5분 만에</span> 끝내세요.
            </h1>

            <div className="space-y-4">
              {[
                'AI 기반 맞춤형 제안서 초안 생성',
                '데이터 시각화로 완성하는 압도적 설득력',
                '성공 사례 분석 기반의 전략적 문구 추천',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-indigo-300" />
                  <span className="text-sm font-medium text-indigo-100">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-sm font-medium text-indigo-200">
              © 2026 Deckly Inc. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="flex flex-1 flex-col justify-center p-8 md:p-16">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10 text-center md:text-left">
              <h2 className="mb-2 text-3xl font-black text-slate-800">
                Deckly에 오신 걸 환영합니다!
              </h2>
              <p className="font-medium text-slate-500">
                지금 가입하고 당신만의 창의적인 데크를 만들어보세요.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
              <div>
                <label className="mb-1.5 ml-1 block text-xs font-bold text-slate-500">이름</label>
                <Input
                  type="text"
                  label=""
                  placeholder="홍길동"
                  icon={<User size={18} />}
                  {...register('name')}
                  error={errors.name?.message}
                  className="bg-slate-50 text-sm focus:border-indigo-500 focus:bg-white focus:ring-0"
                />
              </div>

              <div>
                <label className="mb-1.5 ml-1 block text-xs font-bold text-slate-500">
                  이메일 주소
                </label>
                <Input
                  type="email"
                  label=""
                  placeholder="example@deckly.com"
                  icon={<Mail size={18} />}
                  {...register('email')}
                  error={errors.email?.message}
                  className="bg-slate-50 text-sm focus:border-indigo-500 focus:bg-white focus:ring-0"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-500">비밀번호</label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label=""
                  placeholder="••••••••"
                  icon={<Lock size={18} />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="transition-colors hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  {...register('password')}
                  error={errors.password?.message}
                  className="bg-slate-50 text-sm focus:border-indigo-500 focus:bg-white focus:ring-0"
                />
              </div>

              <div>
                <label className="mb-1.5 ml-1 block text-xs font-bold text-slate-500">
                  비밀번호 확인
                </label>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  label=""
                  placeholder="••••••••"
                  icon={<Lock size={18} />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="transition-colors hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  {...register('confirmPassword', {
                    onBlur: handleConfirmPasswordBlur,
                  })}
                  error={errors.confirmPassword?.message}
                  className="bg-slate-50 text-sm focus:border-indigo-500 focus:bg-white focus:ring-0"
                />
              </div>

              {submitError && (
                <div className="mt-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {submitError}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                className="mt-4 w-full"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Deckly 시작하기
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                이미 계정이 있으신가요?
                <Link
                  href="/login"
                  className="ml-2 font-bold text-indigo-600 underline underline-offset-4 hover:text-indigo-700"
                >
                  로그인
                </Link>
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/"
                className="flex items-center gap-2 text-xs font-bold text-slate-400 transition-colors hover:text-slate-600"
              >
                <ChevronLeft size={14} /> 메인 홈페이지로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
