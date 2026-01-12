'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Mic,
  FileText,
  Sparkles,
  ShieldCheck,
  Zap,
  ChevronRight,
  Menu,
  X,
  Clock,
  Layers,
  Search,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import DecklyLogo from '@/components/ui/DecklyLogo';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInquiryClick = () => {
    window.open('https://www.pluuug.com/', '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900 selection:bg-blue-100">
      {/* 1. Navigation Bar */}
      <nav
        className={`fixed z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-white/90 py-3 shadow-sm backdrop-blur-md' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <DecklyLogo className="h-8 w-auto text-indigo-600" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-10 md:flex">
            {[
              { label: '핵심 기술', id: '핵심 기술' },
              { label: '생성 프로세스', id: '생성 프로세스' },
              { label: '주요 기능', id: '주요 기능' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-bold text-slate-600 transition-colors hover:text-blue-600"
              >
                {item.label}
              </button>
            ))}
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleInquiryClick}
              className="rounded-full px-6 py-2.5 text-sm font-black shadow-lg shadow-blue-100"
            >
              무료 상담받기
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="animate-in slide-in-from-top fixed inset-0 z-40 flex flex-col gap-6 bg-white p-6 duration-300 md:hidden">
          <div className="mb-10 mt-16 flex items-center justify-between">
            <DecklyLogo className="h-8 w-auto text-indigo-600" />
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-400">
              <X size={24} />
            </button>
          </div>
          {[
            { label: '핵심 기술', id: '핵심 기술' },
            { label: '생성 프로세스', id: '생성 프로세스' },
            { label: '주요 기능', id: '주요 기능' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-2xl font-black text-slate-800"
            >
              {item.label}
            </button>
          ))}
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={() => {
              handleInquiryClick();
              setIsMenuOpen(false);
            }}
            className="mt-10 w-full"
          >
            무료 체험하기
          </Button>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pb-24 pt-32 md:pb-40 md:pt-48">
        <div className="absolute left-[-5%] top-[-10%] -z-10 h-[600px] w-[600px] animate-pulse rounded-full bg-blue-50 opacity-70 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            <Sparkles size={12} /> Transform Meetings into Proposals
          </div>

          <h1 className="mb-10 text-5xl font-black leading-[1.05] tracking-tighter text-slate-900 md:text-8xl">
            미팅이 끝나면 <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text italic text-transparent">
              제안서도 끝납니다.
            </span>
          </h1>

          <p className="mx-auto mb-16 max-w-3xl px-4 text-lg font-medium leading-relaxed text-slate-500 md:text-2xl">
            정리되지 않은 수많은 대화 속에서 핵심 비즈니스 로직을 추출합니다.{' '}
            <br className="hidden md:block" />
            Deckly 가 당신의 미팅 전사록을 가장 완벽한 제안서로 재구성합니다.
          </p>

          <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleInquiryClick}
              icon={<ArrowRight size={20} />}
              iconPosition="right"
              className="w-full rounded-2xl px-12 py-5 text-xl font-black shadow-2xl shadow-slate-200 transition-all hover:scale-105 md:w-auto"
            >
              문의하기
            </Button>
          </div>
        </div>
      </section>

      {/* 3. The Problem Section */}
      <section className="border-y border-slate-100 bg-slate-50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
              왜 제안서 작성은 <br /> 항상 고통스러울까요?
            </h2>
            <div className="space-y-6">
              {[
                {
                  t: '파편화된 정보',
                  d: '녹음 파일, 메모지, 메신저 등 미팅 기록이 여기저기 흩어져 있습니다.',
                },
                {
                  t: '전략 수립의 부재',
                  d: '기록을 옮겨 적는 데 급급해 정작 중요한 비즈니스 전략을 고민할 시간이 부족합니다.',
                },
                {
                  t: '반복적인 업무',
                  d: '매번 새로운 템플릿을 찾고 문구를 다듬는 과정에서 창의성이 고갈됩니다.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-black text-red-500">
                    !
                  </div>
                  <div>
                    <h4 className="mb-1 font-black text-slate-800">{item.t}</h4>
                    <p className="text-sm font-medium text-slate-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="shadow-3xl relative rounded-[3rem] border border-white bg-white p-10 shadow-slate-200">
            <div className="absolute -right-4 -top-4 rounded-3xl bg-blue-600 p-4 text-xs font-black italic text-white shadow-xl">
              DECKLY SOLUTION
            </div>
            <div className="mb-8 flex h-24 w-24 items-center justify-center opacity-20">
              <DecklyLogo className="text-slate-900" width={100} height={64} />
            </div>
            <p className="mb-6 text-2xl font-black italic text-slate-900">
              &ldquo;이 모든 비효율을 Deckly가 <br /> 단 한 번에 해결합니다.&rdquo;
            </p>
            <div className="mb-8 h-1 w-20 rounded-full bg-blue-600"></div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="mb-1 text-xs font-black uppercase leading-none tracking-widest text-slate-400">
                  Writing Time
                </p>
                <p className="text-xl font-black text-blue-600">72시간 → 5분</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Section */}
      <section id="생성 프로세스" className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-24 text-center">
            <h2 className="mb-6 text-4xl font-black tracking-tight tracking-tighter text-slate-900 md:text-6xl">
              Deckly 워크플로우
            </h2>
            <p className="text-lg font-medium text-slate-500 md:text-xl">
              대화가 문자가 되고, 문자가 전략이 되는 과정
            </p>
          </div>

          <div className="relative grid gap-4 md:grid-cols-4">
            {/* Connection Line */}
            <div className="absolute left-0 top-1/2 -z-10 hidden h-0.5 w-full bg-slate-100 md:block"></div>

            {[
              {
                icon: <Mic size={24} />,
                step: '01',
                title: '미팅 전사록 파악',
                desc: '미팅 전사록을 분석하여 핵심 내용을 추출',
              },
              {
                icon: <Search size={24} />,
                step: '02',
                title: '의도 분석',
                desc: '고객의 니즈와 비즈니스 요구사항 핵심 분석',
              },
              {
                icon: <Layers size={24} />,
                step: '03',
                title: '구조 설계',
                desc: '추출된 데이터를 바탕으로 제안서 목차 및 본문 생성',
              },
              {
                icon: <FileText size={24} />,
                step: '04',
                title: '제안서 완성',
                desc: '전문적인 문구와 디자인이 적용된 초안 렌더링',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-all hover:border-blue-200 hover:shadow-xl md:text-left"
              >
                <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white md:mx-0">
                  {item.icon}
                </div>
                <span className="mb-2 block text-xs font-black italic tracking-widest text-blue-600">
                  STEP {item.step}
                </span>
                <h4 className="mb-4 text-xl font-black text-slate-900">{item.title}</h4>
                <p className="text-sm font-medium leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Detailed Features Section */}
      <section id="주요 기능" className="relative overflow-hidden bg-slate-900 py-32 text-white">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]"></div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-20 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-10 text-4xl font-black leading-tight md:text-6xl">
                압도적인 퀄리티의 <br /> 제안서를 보장합니다.
              </h2>
              <div className="space-y-8">
                {[
                  {
                    t: 'AI 카피라이팅 엔진',
                    d: '업종별 특화된 설득력 있는 문장을 제안하여 전문성을 극대화합니다.',
                  },
                  {
                    t: '데이터 기반 레이아웃',
                    d: '전달하려는 정보의 유형에 따라 가장 적합한 시각화 구도를 추천합니다.',
                  },
                  {
                    t: '실시간 협업 및 에디팅',
                    d: '생성된 초안을 팀원들과 실시간으로 수정하고 공유할 수 있습니다.',
                  },
                ].map((feature, i) => (
                  <div key={i} className="group">
                    <div className="mb-3 flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-blue-500 transition-all group-hover:w-8"></div>
                      <h4 className="text-xl font-black">{feature.t}</h4>
                    </div>
                    <p className="ml-6 font-medium text-slate-400 md:ml-12">{feature.d}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* 스크린샷 2장이 겹쳐진 비주얼 영역 */}
            <div className="relative flex h-[480px] w-full flex-1 items-center justify-center">
              <div className="group absolute left-0 top-0 z-10 w-4/5 transition-all duration-700 hover:z-30">
                <div className="relative aspect-[4/3] -rotate-3 transform overflow-hidden rounded-[2.5rem] border-4 border-slate-700 bg-slate-800 shadow-2xl transition-transform duration-500 hover:rotate-0">
                  <Image
                    src="/images/inputs-screenshot.png"
                    alt="Meeting Transcription Screenshot"
                    fill
                    quality={95}
                    priority
                    className="object-cover opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-2"></div>
                </div>
              </div>

              {/* 2. 생성된 제안서 스크린샷 (상단/우측 배치) */}
              <div className="group absolute bottom-0 right-0 z-20 w-4/5 transition-all duration-700 hover:z-30">
                <div className="relative aspect-[4/3] rotate-3 transform overflow-hidden rounded-[2.5rem] border-4 border-slate-100 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:rotate-0">
                  <Image
                    src="/images/transcript-screenshot.png"
                    alt="Generated Proposal Screenshot"
                    fill
                    quality={95}
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Deep Dive Section */}
      <section id="핵심 기술" className="py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-20 text-4xl font-black tracking-tighter text-slate-900 md:text-6xl">
            Deckly가 특별한 이유
          </h2>

          <div className="grid gap-12 text-left md:grid-cols-2">
            <div className="group flex flex-col justify-between rounded-[3rem] border border-slate-100 bg-white p-12 shadow-xl transition-all hover:border-blue-600/30">
              <div>
                <Zap className="mb-8 text-blue-600" size={40} />
                <h3 className="mb-6 text-3xl font-black text-slate-900">초고속 엔진</h3>
                <p className="text-lg font-medium leading-relaxed text-slate-500">
                  수시간 분량의 미팅 녹취록도 수분 내에 파악합니다. 핵심 주제 분류부터 세부 액션
                  아이템 도출까지, 당신이 생각하는 속도보다 빠르게 제안서를 설계합니다.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600">
                Experience the Speed <ChevronRight size={16} />
              </div>
            </div>

            <div className="group flex flex-col justify-between rounded-[3rem] border border-slate-100 bg-white p-12 shadow-xl transition-all hover:border-indigo-600/30">
              <div>
                <ShieldCheck className="mb-8 text-indigo-600" size={40} />
                <h3 className="mb-6 text-3xl font-black text-slate-900">
                  승률을 높이는 전략 인사이트
                </h3>
                <p className="text-lg font-medium leading-relaxed text-slate-500">
                  AI가 계약 성사 확률을 높이는 최적의 구조와 핵심 문구를 추천합니다. 단순한 기록
                  정리가 아닌, 고객을 설득하는 가장 강력한 도구가 되어 드립니다.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-600">
                AI Conversion Whitepaper <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA & Final Contact */}
      <section className="bg-white py-20 md:py-40">
        <div className="mx-auto max-w-5xl px-6">
          <div className="group relative overflow-hidden rounded-[4rem] bg-blue-600 p-12 text-center text-white shadow-[0_40px_100px_rgba(37,99,235,0.3)] md:p-24">
            <div className="absolute right-[-10%] top-[-20%] h-96 w-96 rounded-full bg-white/10 blur-[80px]"></div>
            <div className="relative z-10">
              <h2 className="mb-10 text-4xl font-black leading-[1.1] tracking-tighter md:text-7xl">
                미팅의 가치를 <br /> 숫자로 증명할 시간입니다.
              </h2>
              <p className="mx-auto mb-16 max-w-2xl text-lg font-medium leading-relaxed text-blue-100 opacity-90 md:text-2xl">
                전략적인 비즈니스를 위한 최고의 파트너 Deckly. <br className="hidden md:block" />
                지금 바로 도입 상담을 시작해보세요.
              </p>

              <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleInquiryClick}
                  className="w-full rounded-3xl bg-white px-16 py-6 text-2xl font-black !text-indigo-600 shadow-2xl transition-all hover:scale-110 hover:bg-white hover:!text-indigo-700 active:scale-95 md:w-auto"
                >
                  지금 상담받기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
