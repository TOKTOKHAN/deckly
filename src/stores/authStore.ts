import { create } from 'zustand';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { QueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { isAdmin } from '@/lib/utils/admin';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  authStateChangeSubscription: { subscription: { unsubscribe: () => void } } | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: (queryClient?: QueryClient) => Promise<void>;
  initialize: () => Promise<void>;
  checkAdmin: () => void;
  checkSessionExpiry: (session: Session | null) => boolean;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  authStateChangeSubscription: null,

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

  logout: async (queryClient?: QueryClient) => {
    set({ user: null, session: null, isAdmin: false });

    // React Query 캐시 초기화 (이전 사용자의 모든 쿼리 캐시 제거)
    if (queryClient) {
      try {
        queryClient.clear();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('React Query 캐시 초기화 오류:', error);
      }
    }

    if (!supabase) return;

    try {
      await supabase.auth.signOut();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('로그아웃 오류:', error);
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

      // 인증 상태 변경 감지 리스너는 한 번만 등록
      const currentState = useAuthStore.getState();
      if (currentState.authStateChangeSubscription) {
        // 이미 리스너가 등록되어 있으면 기존 리스너 제거
        try {
          currentState.authStateChangeSubscription.subscription.unsubscribe();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('기존 인증 리스너 제거 중 오류:', error);
        }
      }

      // 새로운 리스너 등록
      try {
        const { data: authData } = supabase.auth.onAuthStateChange(
          async (event: AuthChangeEvent, session) => {
            try {
              const currentState = useAuthStore.getState();

              // 세션 만료 체크
              if (currentState.checkSessionExpiry(session)) {
                // 만료된 세션이면 자동 로그아웃
                try {
                  await currentState.logout();
                } catch (error) {
                  // eslint-disable-next-line no-console
                  console.error('세션 만료 시 로그아웃 처리 오류:', error);
                  // 로그아웃 실패해도 상태는 초기화
                  set({ user: null, session: null, isAdmin: false });
                }
                return;
              }

              switch (event) {
                case 'SIGNED_OUT':
                  // 로그아웃 또는 세션 만료
                  // 상태가 이미 null이면 중복 업데이트 방지
                  if (currentState.user !== null || currentState.session !== null) {
                    set({ user: null, session: null, isAdmin: false });
                  }
                  break;

                case 'TOKEN_REFRESHED':
                  // 토큰이 성공적으로 갱신됨
                  if (session) {
                    try {
                      const updatedUser = session.user ?? null;
                      set({
                        user: updatedUser,
                        session: session,
                        isAdmin: isAdmin(updatedUser),
                      });
                    } catch (error) {
                      // eslint-disable-next-line no-console
                      console.error('토큰 갱신 후 상태 업데이트 오류:', error);
                    }
                  }
                  break;

                case 'SIGNED_IN':
                case 'USER_UPDATED':
                  if (session) {
                    try {
                      const updatedUser = session.user ?? null;
                      set({
                        user: updatedUser,
                        session: session,
                        isAdmin: isAdmin(updatedUser),
                      });
                    } catch (error) {
                      // eslint-disable-next-line no-console
                      console.error('인증 상태 업데이트 오류:', error);
                    }
                  }
                  break;

                default:
                  // 기타 이벤트는 기본 처리
                  try {
                    if (session) {
                      const updatedUser = session.user ?? null;
                      set({
                        user: updatedUser,
                        session: session,
                        isAdmin: isAdmin(updatedUser),
                      });
                    } else {
                      if (currentState.user !== null || currentState.session !== null) {
                        set({ user: null, session: null, isAdmin: false });
                      }
                    }
                  } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error('기본 인증 상태 업데이트 오류:', error);
                  }
                  break;
              }
            } catch (error) {
              // 리스너 콜백 내부의 예상치 못한 오류 처리
              // eslint-disable-next-line no-console
              console.error('인증 상태 변경 리스너 오류:', error);
            }
          },
        );

        // 리스너 subscription 저장
        if (authData) {
          set({ authStateChangeSubscription: authData });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('인증 리스너 등록 오류:', error);
        // 리스너 등록 실패해도 앱은 계속 동작하도록 함
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('인증 초기화 오류:', error);
      set({ user: null, session: null, isLoading: false });
    }
  },
}));
