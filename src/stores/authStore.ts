import { create } from 'zustand';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
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
  checkSessionExpiry: (session: Session | null) => boolean;
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

  checkSessionExpiry: (session: Session | null): boolean => {
    // 세션이 없으면 만료된 것으로 간주
    if (!session) {
      return true;
    }

    // 만료 시간 정보가 없으면 만료된 것으로 간주
    if (!session.expires_at) {
      return true;
    }

    // expires_at은 Unix timestamp (초 단위)
    const now = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로 변환
    return session.expires_at < now; // 만료 시간이 현재보다 이전이면 만료됨
  },

  logout: async () => {
    if (!supabase) return;
    try {
      await supabase.auth.signOut();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('로그아웃 오류:', error);
    } finally {
      set({ user: null, session: null, isAdmin: false });
    }
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

      // 세션 만료 체크
      const state = useAuthStore.getState();
      if (state.checkSessionExpiry(session)) {
        // 만료된 세션이면 자동 로그아웃
        await state.logout();
        set({ isLoading: false });
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
      supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session) => {
        const currentState = useAuthStore.getState();

        // 세션 만료 체크
        if (currentState.checkSessionExpiry(session)) {
          // 만료된 세션이면 자동 로그아웃
          await currentState.logout();
          return;
        }

        // 이벤트 타입별 처리
        switch (event) {
          case 'SIGNED_OUT':
            // 로그아웃 또는 세션 만료
            currentState.logout();
            break;

          case 'TOKEN_REFRESHED':
            // 토큰이 성공적으로 갱신됨
            if (session) {
              const updatedUser = session.user ?? null;
              set({
                user: updatedUser,
                session: session,
                isAdmin: isAdmin(updatedUser),
              });
            }
            break;

          case 'SIGNED_IN':
          case 'USER_UPDATED':
            // 로그인 또는 사용자 정보 업데이트
            if (session) {
              const updatedUser = session.user ?? null;
              set({
                user: updatedUser,
                session: session,
                isAdmin: isAdmin(updatedUser),
              });
            }
            break;

          default:
            // 기타 이벤트는 기본 처리
            if (session) {
              const updatedUser = session.user ?? null;
              set({
                user: updatedUser,
                session: session,
                isAdmin: isAdmin(updatedUser),
              });
            } else {
              // 세션이 null이면 로그아웃 처리
              currentState.logout();
            }
            break;
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('인증 초기화 오류:', error);
      set({ user: null, session: null, isLoading: false });
    }
  },
}));
