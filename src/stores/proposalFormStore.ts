'use client';

import { create } from 'zustand';
import { Proposal, GenerationStatus } from '@/types/proposal';

interface ProposalFormState {
  // View 상태
  view: 'dashboard' | 'form' | 'result';
  step: number;

  // 제안서 상태
  currentProposal: Proposal | null;
  proposalToDelete: Proposal | null;

  // 생성 상태
  isGenerating: boolean;
  genStatus: GenerationStatus;

  // 에러 상태
  formError: string | null;
  resultError: string | null;

  // Actions
  setView: (view: 'dashboard' | 'form' | 'result') => void;
  setStep: (step: number) => void;
  setCurrentProposal: (proposal: Proposal | null) => void;
  setProposalToDelete: (proposal: Proposal | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setGenStatus: (genStatus: GenerationStatus) => void;
  setFormError: (error: string | null) => void;
  setResultError: (error: string | null) => void;

  // 복합 액션
  createNew: () => void;
  closeForm: () => void;
  backFromResult: () => void;
  reset: () => void;
}

const initialState = {
  view: 'dashboard' as const,
  step: 1,
  currentProposal: null,
  proposalToDelete: null,
  isGenerating: false,
  genStatus: { progress: 0, message: '' },
  formError: null,
  resultError: null,
};

export const useProposalFormStore = create<ProposalFormState>(set => ({
  ...initialState,

  // 기본 액션
  setView: view => set({ view }),
  setStep: step => set({ step }),
  setCurrentProposal: proposal => set({ currentProposal: proposal }),
  setProposalToDelete: proposal => set({ proposalToDelete: proposal }),
  setIsGenerating: isGenerating => set({ isGenerating }),
  setGenStatus: genStatus => set({ genStatus }),
  setFormError: error => set({ formError: error }),
  setResultError: error => set({ resultError: error }),

  // 복합 액션
  createNew: () => set({ step: 1, view: 'form', formError: null }),
  closeForm: () => set({ view: 'dashboard', formError: null }),
  backFromResult: () => set({ view: 'dashboard', resultError: null }),
  reset: () => set(initialState),
}));
