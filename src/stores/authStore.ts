import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  session: null,
  isLoading: true,

  setUser: user => set({ user }),
  setSession: session => set({ session }),
  setLoading: isLoading => set({ isLoading }),

  logout: async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  initialize: async () => {
    if (!supabase) {
      set({ isLoading: false });
      return;
    }

    try {
      // 초기 세션 확인
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        // eslint-disable-next-line no-console
        console.error('세션 확인 오류:', error);
        set({ user: null, session: null, isLoading: false });
        return;
      }

      set({
        user: session?.user ?? null,
        session: session,
        isLoading: false,
      });

      // 인증 상태 변경 감지
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          user: session?.user ?? null,
          session: session,
        });
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('인증 초기화 오류:', error);
      set({ user: null, session: null, isLoading: false });
    }
  },
}));
