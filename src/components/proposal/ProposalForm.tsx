'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import apiClient from '@/lib/axios/client';
import { ProposalRequest, ProposalResponse } from '@/types/gemini';
import { ProposalFormData, Proposal, ProposalStatus, GenerationStatus } from '@/types/proposal';
import { getProposals, createProposal, updateProposal } from '@/lib/supabase/proposals';
import { proposalFormSchema } from '@/lib/validations/proposalSchema';
import { useAuthStore } from '@/stores/authStore';
import FormView from './FormView';
import GeneratingOverlay from './GeneratingOverlay';
import DashboardView from './DashboardView';
import ResultView from './ResultView';
import ProposalDashboardSkeleton from '@/components/skeletons/ProposalDashboardSkeleton';

const initialFormData: ProposalFormData = {
  // 기본 정보
  clientCompanyName: '',
  projectName: '',
  slogan: '',
  brandColor1: '#4f46e5', // indigo-600 (기본 브랜드 컬러)
  brandColor2: '#1f2937', // gray-800 (기본 브랜드 컬러)
  brandColor3: '#ffffff', // white (기본 브랜드 컬러)
  clientLogo: undefined,
  ourLogo: undefined,
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
  const queryClient = useQueryClient();
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const [view, setView] = useState<'dashboard' | 'form' | 'result'>('dashboard');
  const [currentProposal, setCurrentProposal] = useState<Proposal | null>(null);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState<GenerationStatus>({ progress: 0, message: '' });

  // React Query로 제안서 목록 조회 (인증 상태가 준비된 후에만 실행)
  const { data: proposals = [], isLoading: isProposalsLoading } = useQuery({
    queryKey: ['proposals'],
    queryFn: getProposals,
    enabled: !!user && !isAuthLoading, // 인증 상태가 준비된 후에만 실행
  });

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
    mode: 'all',
    reValidateMode: 'onChange',
  });

  // formData는 watch로 실시간 추적
  const formData = watch() as ProposalFormData;

  // 제안서 생성 Mutation
  const createMutation = useMutation({
    mutationFn: createProposal,
    onSuccess: () => {
      // 제안서 목록 자동 리프레시
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
  });

  // 제안서 업데이트 Mutation
  const updateMutation = useMutation({
    mutationFn: updateProposal,
    onSuccess: () => {
      // 제안서 목록 자동 리프레시
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
  });

  // 제안서 생성
  const generateProposal = async (proposalId: string, data: ProposalFormData) => {
    setIsGenerating(true);
    setGenStatus({ progress: 10, message: '미팅 전사록 분석 중...' });

    const updateProgress = async (progress: number, message: string) => {
      setGenStatus({ progress, message });
      try {
        // 현재 캐시에서 제안서 가져오기
        const cachedProposals = queryClient.getQueryData<Proposal[]>(['proposals']) || [];
        const currentProposal = cachedProposals.find(p => p.id === proposalId);
        if (currentProposal) {
          const updated = { ...currentProposal, progress, status: 'generating' as ProposalStatus };
          await updateMutation.mutateAsync(updated);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('진행 상태 업데이트 오류:', err);
      }
    };

    try {
      updateProgress(30, '제안서 구조 설계 중...');

      // API 호출 - Step 1의 모든 필드 포함
      const requestData: ProposalRequest = {
        meetingNotes: data.transcriptText,
        title: data.projectName,
        client: data.clientCompanyName,
        projectOverview: data.includeSummary,
        budget: data.budgetMin || undefined,
        period:
          data.startDate && data.openDate ? `${data.startDate} ~ ${data.openDate}` : undefined,
        requirements: data.priorityFeatures,

        // Step 1 추가 필드들
        slogan: data.slogan || undefined,
        brandColor1: data.brandColor1 || undefined,
        brandColor2: data.brandColor2 || undefined,
        brandColor3: data.brandColor3 || undefined,
        clientLogo: data.clientLogo || undefined,
        ourLogo: data.ourLogo || undefined,
        clientWebsite: data.clientWebsite || undefined,
        font: data.font || undefined,
        teamSize: data.teamSize || undefined,
        startDate: data.startDate || undefined,
        endDate: data.endDate || undefined,
        reviewPeriod: data.reviewPeriod || undefined,
        maintenancePeriod: data.maintenancePeriod || undefined,
        openDate: data.openDate || undefined,
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
        await updateMutation.mutateAsync(completedProposal);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('제안서 저장 오류:', err);
      }

      setIsGenerating(false);
      setView('result');
      setCurrentProposal(completedProposal);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('제안서 생성 오류:', err);
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류';

      // 제한 초과 에러인지 확인
      if (errorMessage.includes('제한')) {
        toast.error(errorMessage, {
          duration: 5000,
          icon: '⚠️',
        });
        setIsGenerating(false);
        return; // 제안서 생성 중단
      }

      const errorProposal: Proposal = {
        id: proposalId,
        ...data,
        status: 'error',
        error: errorMessage,
        createdAt: new Date().toISOString(),
      };
      try {
        await updateMutation.mutateAsync(errorProposal);
      } catch (updateErr) {
        // eslint-disable-next-line no-console
        console.error('에러 상태 저장 오류:', updateErr);
      }
      setIsGenerating(false);
      toast.error('제안서 생성 중 오류가 발생했습니다.', {
        duration: 5000,
      });
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
      // 여기서 제한 체크가 수행됨
      createdProposal = await createMutation.mutateAsync(newProposal);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('제안서 생성 오류:', err);
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류';

      // 제한 초과 에러인지 확인
      if (errorMessage.includes('제한')) {
        toast.error(errorMessage, {
          duration: 5000,
          icon: '⚠️',
        });
        return; // 제안서 생성 중단
      }

      // 기타 에러 처리
      toast.error('제안서 생성 중 오류가 발생했습니다.', {
        duration: 5000,
      });
      return;
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
      <main className="pb-20">
        {view === 'dashboard' && (
          <>
            {isProposalsLoading ? (
              <ProposalDashboardSkeleton includeWrapper={false} />
            ) : (
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
          </>
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
            onUpdate={async updatedProposal => {
              setCurrentProposal(updatedProposal);
              await updateMutation.mutateAsync(updatedProposal);
            }}
          />
        )}
      </main>
      <GeneratingOverlay isGenerating={isGenerating} genStatus={genStatus} />
    </div>
  );
}
