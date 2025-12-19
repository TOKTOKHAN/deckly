'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/axios/client';
import { ProposalRequest, ProposalResponse } from '@/types/gemini';
import { ProposalFormData, Proposal, ProposalStatus, GenerationStatus } from '@/types/proposal';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import FormView from './FormView';
// 아이콘은 간단한 SVG로 대체하거나 나중에 아이콘 라이브러리 추가 가능
const Plus = ({ size }: { size?: number }) => (
  <svg
    width={size || 20}
    height={size || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const FileText = ({ size, className }: { size?: number; className?: string }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);
const ChevronRight = ({ size }: { size?: number }) => (
  <svg
    width={size || 20}
    height={size || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
const ChevronLeft = ({ size }: { size?: number }) => (
  <svg
    width={size || 20}
    height={size || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);
const Download = ({ size }: { size?: number }) => (
  <svg
    width={size || 18}
    height={size || 18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);
const RefreshCw = ({ size }: { size?: number }) => (
  <svg
    width={size || 18}
    height={size || 18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);
const CheckCircle2 = ({ size, className }: { size?: number; className?: string }) => (
  <svg
    width={size || 20}
    height={size || 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const initialFormData: ProposalFormData = {
  clientCompanyName: '',
  projectName: '',
  meetingDate: new Date().toISOString().substring(0, 10),
  proposalDate: new Date().toISOString().substring(0, 10),
  clientContact: '',
  ourContact: '',
  target: ['실무자'],
  includeSummary: '',
  excludeScope: '',
  priorityFeatures: '',
  startDate: new Date().toISOString().substring(0, 10),
  openDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().substring(0, 10),
  budgetMin: '',
  budgetMax: '',
  budgetConfirmed: '협의 중',
  transcriptText: '',
  volume: '표준',
};

export default function ProposalForm() {
  const [view, setView] = useState<'dashboard' | 'form' | 'result'>('dashboard');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [currentProposal, setCurrentProposal] = useState<Proposal | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProposalFormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState<GenerationStatus>({ progress: 0, message: '' });

  // 로컬 스토리지에서 제안서 목록 로드
  useEffect(() => {
    const loadProposals = () => {
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
        } catch (err) {
          console.error('제안서 로드 오류:', err);
        }
      }
    };
    loadProposals();
  }, []);

  // 제안서 목록을 로컬 스토리지에 저장
  const saveProposals = (proposalsList: Proposal[]) => {
    localStorage.setItem('deckly_proposals', JSON.stringify(proposalsList));
    setProposals(proposalsList);
  };

  // 제안서 생성
  const generateProposal = async (proposalId: string, data: ProposalFormData) => {
    setIsGenerating(true);
    setGenStatus({ progress: 10, message: '미팅 전사록 분석 중...' });

    const updateProgress = (progress: number, message: string) => {
      setGenStatus({ progress, message });
      // 로컬 상태 업데이트
      const updated = proposals.map(p =>
        p.id === proposalId ? { ...p, progress, status: 'generating' as ProposalStatus } : p,
      );
      saveProposals(updated);
    };

    try {
      updateProgress(30, '제안서 구조 설계 중...');

      // API 호출
      const requestData: ProposalRequest = {
        meetingNotes: data.transcriptText,
        title: data.projectName,
        client: data.clientCompanyName,
        date: data.meetingDate,
        projectOverview: data.includeSummary,
        budget:
          data.budgetMin && data.budgetMax ? `${data.budgetMin}~${data.budgetMax}` : undefined,
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

      // 로컬 스토리지에 저장
      const completedProposal: Proposal = {
        id: proposalId,
        ...data,
        content: response.content,
        status: 'completed',
        progress: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updated = proposals.map(p => (p.id === proposalId ? completedProposal : p));
      saveProposals(updated);

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
      const updated = proposals.map(p => (p.id === proposalId ? errorProposal : p));
      saveProposals(updated);
      setIsGenerating(false);
      alert('제안서 생성 중 오류가 발생했습니다.');
    }
  };

  const handleCreate = async () => {
    if (!formData.transcriptText.trim()) return;

    // 새 제안서 생성 (로컬 스토리지)
    const proposalId = `proposal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newProposal: Proposal = {
      id: proposalId,
      ...formData,
      status: 'generating',
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    // 로컬 스토리지에 추가
    const updated = [newProposal, ...proposals];
    saveProposals(updated);

    // 제안서 생성 시작
    generateProposal(proposalId, formData);
  };

  // 대시보드 뷰
  const DashboardView = () => (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">제안서 관리</h1>
          <p className="text-gray-500 mt-1">AI로 생성된 제안서 목록입니다.</p>
        </div>
        <Button
          onClick={() => {
            setFormData(initialFormData);
            setStep(1);
            setView('form');
          }}
          variant="primary"
          size="md"
          icon={<Plus size={20} />}
        >
          새 제안서 만들기
        </Button>
      </div>

      {proposals.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
          <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="text-indigo-600" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">생성된 제안서가 없습니다</h3>
          <p className="text-gray-500 mt-1 mb-6">지금 바로 제안서를 만들어보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map(p => (
            <div
              key={p.id}
              onClick={() => {
                if (p.status === 'completed') {
                  setCurrentProposal(p);
                  setView('result');
                }
              }}
              className="group bg-white p-6 rounded-3xl border border-gray-100 hover:border-indigo-500 cursor-pointer transition shadow-sm hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-indigo-50 transition">
                  <FileText className="text-gray-400 group-hover:text-indigo-600" size={24} />
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    p.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : p.status === 'error'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700 animate-pulse'
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 truncate mb-1">
                {p.projectName || '무제 프로젝트'}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{p.clientCompanyName}</p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium border-t border-gray-50 pt-4">
                <span>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ''}</span>
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 단일 핸들러로 통합 (더 간결하고 유지보수 용이)
  const handleInputChange = (field: keyof ProposalFormData) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };
  };

  // 결과 뷰
  const ResultView = () => (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView('dashboard')}
            icon={<ChevronLeft size={16} />}
            className="mb-2 text-sm"
          >
            대시보드로 돌아가기
          </Button>
          <h1 className="text-3xl font-black text-gray-900">{currentProposal?.projectName}</h1>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            icon={<Download size={18} />}
            className="flex-1 md:flex-none"
          >
            PDF 다운로드
          </Button>
          {currentProposal && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => generateProposal(currentProposal.id, currentProposal)}
              icon={<RefreshCw size={18} />}
              className="flex-1 md:flex-none"
            >
              AI 다시 생성
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-gray-50 min-h-[800px]">
        {currentProposal?.content ? (
          <div
            className="prose prose-indigo max-w-none"
            dangerouslySetInnerHTML={{ __html: currentProposal.content }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="font-medium">내용을 불러오는 중입니다...</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('dashboard')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-white" size={20} />
            </div>
            <span className="font-black text-xl tracking-tight text-gray-900">DECKLY</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20">
        {view === 'dashboard' && <DashboardView />}
        {view === 'form' && (
          <FormView
            step={step}
            formData={formData}
            onInputChange={handleInputChange}
            onStepChange={setStep}
            onClose={() => setView('dashboard')}
            onSubmit={handleCreate}
          />
        )}
        {view === 'result' && <ResultView />}
      </main>

      {/* Generating Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-10 max-w-md w-full shadow-2xl text-center border border-gray-100">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 className="text-indigo-600" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-black mb-2">AI 제안서 생성 중</h2>
            <p className="text-gray-500 text-sm mb-8">
              전사록을 분석하여 최적의 제안 시나리오를 구성하고 있습니다. 잠시만 기다려주세요.
            </p>
            <ProgressBar progress={genStatus.progress} message={genStatus.message} />
          </div>
        </div>
      )}
    </div>
  );
}
