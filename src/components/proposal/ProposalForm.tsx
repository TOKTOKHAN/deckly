'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '@/lib/axios/client';
import { ProposalRequest, ProposalResponse } from '@/types/gemini';
import { ProposalFormData, Proposal, ProposalStatus, GenerationStatus } from '@/types/proposal';
import { getProposals, createProposal, updateProposal } from '@/lib/supabase/proposals';
import { proposalFormSchema } from '@/lib/validations/proposalSchema';
import FormView from './FormView';
import GeneratingOverlay from './GeneratingOverlay';
import DashboardView from './DashboardView';
import ResultView from './ResultView';
import { CheckCircle2 } from '@/components/icons';

const initialFormData: ProposalFormData = {
  // 기본 정보
  clientCompanyName: '',
  projectName: '',
  slogan: '',
  brandColor1: '#4f46e5', // indigo-600 (기본 브랜드 컬러)
  brandColor2: '#1f2937', // gray-800 (기본 브랜드 컬러)
  brandColor3: '#ffffff', // white (기본 브랜드 컬러)
  clientLogo: undefined,
  clientWebsite: undefined,
  font: 'Pretendard',

  // 프로젝트 정보
  teamSize: '',
  startDate: new Date().toISOString().substring(0, 10),
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().substring(0, 10),
  reviewPeriod: '',
  maintenancePeriod: '',
  openDate: undefined,

  // 예산
  budgetMin: '',

  // 기타
  target: ['실무자'],
  includeSummary: '',
  excludeScope: '',
  priorityFeatures: '',
  projectPhase: '',
  priorityFactor: '',
  transcriptText: '',
  volume: '표준',
  designStyle: '기업형',
  figureStyle: '범위',
};

export default function ProposalForm() {
  const [view, setView] = useState<'dashboard' | 'form' | 'result'>('dashboard');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [currentProposal, setCurrentProposal] = useState<Proposal | null>(null);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState<GenerationStatus>({ progress: 0, message: '' });

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: initialFormData,
    mode: 'onChange', // 실시간 검증
    reValidateMode: 'onChange', // 재검증도 onChange에서 실행
  });

  // formData는 watch로 실시간 추적
  const formData = watch() as ProposalFormData;

  // Supabase에서 제안서 목록 로드
  useEffect(() => {
    const loadProposals = async () => {
      try {
        const data = await getProposals();
        setProposals(data);
      } catch (err) {
        console.error('제안서 로드 오류:', err);
        const stored = localStorage.getItem('deckly_proposals');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setProposals(
              parsed.sort((a: Proposal, b: Proposal) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
              }),
            );
          } catch (parseErr) {
            console.error('로컬 스토리지 파싱 오류:', parseErr);
          }
        }
      }
    };
    loadProposals();
  }, []);

  // 제안서 생성
  const generateProposal = async (proposalId: string, data: ProposalFormData) => {
    setIsGenerating(true);
    setGenStatus({ progress: 10, message: '미팅 전사록 분석 중...' });

    const updateProgress = async (progress: number, message: string) => {
      setGenStatus({ progress, message });
      try {
        const currentProposal = proposals.find(p => p.id === proposalId);
        if (currentProposal) {
          const updated = { ...currentProposal, progress, status: 'generating' as ProposalStatus };
          await updateProposal(updated);
          setProposals(prev => prev.map(p => (p.id === proposalId ? updated : p)));
        }
      } catch (err) {
        console.error('진행 상태 업데이트 오류:', err);
        setProposals(prev =>
          prev.map(p =>
            p.id === proposalId ? { ...p, progress, status: 'generating' as ProposalStatus } : p,
          ),
        );
      }
    };

    try {
      updateProgress(30, '제안서 구조 설계 중...');

      // API 호출
      const requestData: ProposalRequest = {
        meetingNotes: data.transcriptText,
        title: data.projectName,
        client: data.clientCompanyName,
        projectOverview: data.includeSummary,
        budget: data.budgetMin || undefined,
        period:
          data.startDate && data.openDate ? `${data.startDate} ~ ${data.openDate}` : undefined,
        requirements: data.priorityFeatures,
      };

      updateProgress(60, 'AI가 상세 내용을 작성하는 중...');

      const { data: response } = await apiClient.post<ProposalResponse>('/gemini', requestData);

      if (!response.success || !response.content) {
        throw new Error(response.error || '제안서 생성에 실패했습니다.');
      }

      updateProgress(90, '제안서 마무리 중...');

      // Supabase에 저장
      const completedProposal: Proposal = {
        id: proposalId,
        ...data,
        content: response.content,
        status: 'completed',
        progress: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        await updateProposal(completedProposal);
        setProposals(prev => prev.map(p => (p.id === proposalId ? completedProposal : p)));
      } catch (err) {
        console.error('제안서 저장 오류:', err);
        setProposals(prev => prev.map(p => (p.id === proposalId ? completedProposal : p)));
        try {
          const stored = localStorage.getItem('deckly_proposals');
          const parsed = stored ? JSON.parse(stored) : [];
          const updated = parsed.map((p: Proposal) =>
            p.id === proposalId ? completedProposal : p,
          );
          localStorage.setItem('deckly_proposals', JSON.stringify(updated));
        } catch (localErr) {
          console.error('로컬 스토리지 백업 오류:', localErr);
        }
      }

      setIsGenerating(false);
      setView('result');
      setCurrentProposal(completedProposal);
    } catch (err) {
      console.error('제안서 생성 오류:', err);
      const errorProposal: Proposal = {
        id: proposalId,
        ...data,
        status: 'error',
        error: err instanceof Error ? err.message : '알 수 없는 오류',
        createdAt: new Date().toISOString(),
      };
      try {
        await updateProposal(errorProposal);
        setProposals(prev => prev.map(p => (p.id === proposalId ? errorProposal : p)));
      } catch (updateErr) {
        console.error('에러 상태 저장 오류:', updateErr);
        setProposals(prev => prev.map(p => (p.id === proposalId ? errorProposal : p)));
      }
      setIsGenerating(false);
      alert('제안서 생성 중 오류가 발생했습니다.');
    }
  };

  const handleCreate = handleSubmit(async data => {
    // Zod 검증 통과 시 실행됨 (모든 필드가 자동으로 기본값으로 채워짐)
    const validatedData = data as ProposalFormData;

    // 새 제안서 생성 (Supabase)
    // id는 명시하지 않음 - Supabase가 자동으로 UUID 생성
    const newProposal: Proposal = {
      id: '', // 임시 값 (Supabase가 생성한 ID로 교체됨)
      ...validatedData,
      status: 'generating',
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    let createdProposal: Proposal;

    try {
      // Supabase에 저장 (id는 자동 생성됨)
      createdProposal = await createProposal(newProposal);
      setProposals(prev => [createdProposal, ...prev]);
    } catch (err) {
      console.error('제안서 생성 오류:', err);
      // Supabase 실패 시 로컬 상태만 업데이트
      const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      createdProposal = { ...newProposal, id: tempId };
      setProposals(prev => [createdProposal, ...prev]);
      try {
        const stored = localStorage.getItem('deckly_proposals');
        const parsed = stored ? JSON.parse(stored) : [];
        localStorage.setItem('deckly_proposals', JSON.stringify([createdProposal, ...parsed]));
      } catch (localErr) {
        console.error('로컬 스토리지 백업 오류:', localErr);
      }
    }

    // 제안서 생성 시작
    generateProposal(createdProposal.id, validatedData);
  });

  // react-hook-form의 setValue를 사용하도록 변경
  const handleInputChange = (field: keyof ProposalFormData) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValue(field, e.target.value as never, { shouldValidate: true });
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setView('dashboard')}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <CheckCircle2 className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">DECKLY</span>
          </div>
        </div>
      </nav>
      <main className="pb-20">
        {view === 'dashboard' && (
          <DashboardView
            proposals={proposals}
            onCreateNew={() => {
              reset(initialFormData);
              setStep(1);
              setView('form');
            }}
            onSelectProposal={proposal => {
              setCurrentProposal(proposal);
              setView('result');
            }}
          />
        )}
        {view === 'form' && (
          <FormView
            step={step}
            formData={formData}
            errors={errors}
            register={register}
            setValue={setValue}
            onInputChange={handleInputChange}
            onStepChange={setStep}
            onClose={() => setView('dashboard')}
            onSubmit={handleCreate}
          />
        )}
        {view === 'result' && currentProposal && (
          <ResultView
            proposal={currentProposal}
            onBack={() => setView('dashboard')}
            onRegenerate={generateProposal}
            onUpdate={updatedProposal => {
              setCurrentProposal(updatedProposal);
              setProposals(prev =>
                prev.map(p => (p.id === updatedProposal.id ? updatedProposal : p)),
              );
            }}
          />
        )}
      </main>
      <GeneratingOverlay isGenerating={isGenerating} genStatus={genStatus} />
    </div>
  );
}
