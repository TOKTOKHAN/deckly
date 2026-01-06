import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { isAdmin } from '@/lib/utils/admin';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  checkAdmin: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,

  setUser: user => {
    set({ user, isAdmin: isAdmin(user) });
  },
  setSession: session => set({ session }),
  setLoading: isLoading => set({ isLoading }),

  checkAdmin: () => {
    const state = useAuthStore.getState();
    set({ isAdmin: isAdmin(state.user) });
  },

  logout: async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    set({ user: null, session: null, isAdmin: false });
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

      const user = session?.user ?? null;
      set({
        user,
        session: session,
        isLoading: false,
        isAdmin: isAdmin(user),
      });

      // 인증 상태 변경 감지
      supabase.auth.onAuthStateChange((_event, session) => {
        const updatedUser = session?.user ?? null;
        set({
          user: updatedUser,
          session: session,
          isAdmin: isAdmin(updatedUser),
        });
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('인증 초기화 오류:', error);
      set({ user: null, session: null, isLoading: false });
    }
  },
}));
