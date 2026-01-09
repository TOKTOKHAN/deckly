'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Mail,
  Lock,
  ArrowRight,
  ChevronLeft,
  Layout,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/form/Input';
import { loginSchema, type LoginFormData } from '@/lib/validations/authSchema';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { useRequireGuest } from '@/hooks/useRequireGuest';

export default function LoginPage() {
  const router = useRouter();
  const { initialize } = useAuthStore();
  // 로그인한 사용자는 대시보드로 리다이렉트
  useRequireGuest();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    if (!supabase) {
      setSubmitError('Supabase 클라이언트를 초기화할 수 없습니다. 환경 변수를 확인해주세요.');
      return;
    }

    // 입력값 검증
    if (!data.email || !data.password) {
      setSubmitError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      setError('email', {
        type: 'manual',
        message: '올바른 이메일 형식이 아닙니다.',
      });
      return;
    }

    setSubmitError(null);

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      });

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Supabase 로그인 에러:', {
          message: error.message,
          status: error.status,
          name: error.name,
        });

        // 에러 메시지를 사용자 친화적으로 변환
        if (error.message.includes('Invalid login credentials') || error.status === 400) {
          setError('email', {
            type: 'manual',
            message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          });
          setError('password', {
            type: 'manual',
            message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          });
          setSubmitError('이메일 또는 비밀번호를 확인해주세요.');
        } else {
          setSubmitError(error.message || '로그인 중 오류가 발생했습니다.');
        }
        return;
      }

      // 로그인 성공
      if (authData.user) {
        // 인증 상태 업데이트 대기
        await initialize();

        // 상태 업데이트 완료 후 대시보드로 이동
        router.push('/dashboard');
      }
    } catch (error) {
      // 네트워크 에러나 기타 예외 처리
      const errorMessage =
        error instanceof Error
          ? error.message
          : '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
      setSubmitError(errorMessage);
      // eslint-disable-next-line no-console
      console.error('로그인 오류:', error);
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
                Deckly에 오신것을 환영합니다!
              </h2>
              <p className="font-medium text-slate-500">계정에 로그인하여 Deckly를 시작하세요.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
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
                <div className="mb-1.5 flex items-center justify-between px-1">
                  <label className="text-xs font-bold text-slate-500">비밀번호</label>
                  <button
                    type="button"
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    비밀번호를 잊으셨나요?
                  </button>
                </div>
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
                로그인하기
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                아직 계정이 없으신가요?
                <Link
                  href="/signup"
                  className="ml-2 font-bold text-indigo-600 underline underline-offset-4 hover:text-indigo-700"
                >
                  회원가입
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
