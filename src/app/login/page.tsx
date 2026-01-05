'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, ChevronLeft, Layout, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/form/Input';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로그인 로직이 들어갈 자리입니다.
    console.log('Login attempt:', formData);
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
              아이디어를 <br />
              <span className="text-indigo-200">완벽한 데크</span>로 만드세요.
            </h1>

            <div className="space-y-4">
              {['지능형 템플릿 추천', '실시간 팀 협업 도구', '강력한 데이터 시각화'].map(
                (text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-indigo-300" />
                    <span className="text-sm font-medium text-indigo-100">{text}</span>
                  </div>
                ),
              )}
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
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
              <h2 className="mb-2 text-3xl font-black text-slate-800">
                Deckly에 오신것을 환영합니다!
              </h2>
              <p className="font-medium text-slate-500">계정에 로그인하여 Deckly를 시작하세요.</p>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="mb-0">
                <label className="mb-1.5 ml-1 block text-xs font-bold text-slate-500">
                  이메일 주소
                </label>
                <Input
                  type="email"
                  name="email"
                  label=""
                  placeholder="example@deckly.com"
                  required
                  value={formData.email}
                  icon={<Mail size={18} />}
                  onChange={handleInputChange}
                  className="mb-0 bg-slate-50 text-sm focus:border-indigo-500 focus:bg-white focus:ring-0"
                />
              </div>

              <div className="mb-0">
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
                  type="password"
                  name="password"
                  label=""
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  icon={<Lock size={18} />}
                  onChange={handleInputChange}
                  className="mb-0 bg-slate-50 text-sm focus:border-indigo-500 focus:bg-white focus:ring-0"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                className="mt-4 w-full"
              >
                로그인하기
              </Button>
            </form>

            {/* Footer Toggle */}
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

            {/* Go Back button */}
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
