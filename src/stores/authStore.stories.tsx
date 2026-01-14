import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 인증 상태를 관리하는 Zustand 스토어입니다. Supabase 인증과 통합되어 사용자 세션을 관리합니다.
 *
 * ## 사용법
 *
 * `useAuthStore`는 Zustand를 사용하여 전역 인증 상태를 관리합니다. 컴포넌트 어디서든 사용할 수 있습니다.
 *
 * ## 상태 (State)
 *
 * | 필드        | 타입           | 설명                    |
 * | ----------- | -------------- | ----------------------- |
 * | `user`      | `User \| null` | 현재 사용자 객체        |
 * | `session`    | `Session \| null` | 현재 세션 객체          |
 * | `isLoading` | `boolean`      | 인증 상태 로딩 중 여부   |
 * | `isAdmin`   | `boolean`      | 관리자 권한 여부        |
 *
 * ## 메서드 (Actions)
 *
 * ### setUser
 *
 * 사용자 정보를 설정합니다. 관리자 권한도 자동으로 확인합니다.
 *
 * ```tsx
 * const setUser = useAuthStore(state => state.setUser);
 * setUser(userObject);
 * ```
 *
 * ### setSession
 *
 * 세션 정보를 설정합니다.
 *
 * ```tsx
 * const setSession = useAuthStore(state => state.setSession);
 * setSession(sessionObject);
 * ```
 *
 * ### setLoading
 *
 * 로딩 상태를 설정합니다.
 *
 * ```tsx
 * const setLoading = useAuthStore(state => state.setLoading);
 * setLoading(true);
 * ```
 *
 * ### logout
 *
 * 사용자를 로그아웃합니다. Supabase 세션도 함께 종료합니다.
 *
 * ```tsx
 * const logout = useAuthStore(state => state.logout);
 * await logout();
 * ```
 *
 * ### initialize
 *
 * 인증 상태를 초기화합니다. Supabase 세션을 확인하고 인증 상태 변경을 감지합니다.
 *
 * ```tsx
 * const initialize = useAuthStore(state => state.initialize);
 * await initialize();
 * ```
 *
 * ### checkAdmin
 *
 * 현재 사용자의 관리자 권한을 확인합니다.
 *
 * ```tsx
 * const checkAdmin = useAuthStore(state => state.checkAdmin);
 * checkAdmin();
 * ```
 *
 * ### checkSessionExpiry
 *
 * 세션이 만료되었는지 확인합니다.
 *
 * ```tsx
 * const checkSessionExpiry = useAuthStore(state => state.checkSessionExpiry);
 * const isExpired = checkSessionExpiry(session);
 * ```
 *
 * ## 사용 예시
 *
 * ### 기본 사용
 *
 * ```tsx
 * import { useAuthStore } from '@/stores/authStore';
 *
 * function UserProfile() {
 *   const user = useAuthStore(state => state.user);
 *   const isLoading = useAuthStore(state => state.isLoading);
 *
 *   if (isLoading) {
 *     return <div>로딩 중...</div>;
 *   }
 *
 *   if (!user) {
 *     return <div>로그인이 필요합니다.</div>;
 *   }
 *
 *   return <div>안녕하세요, {user.email}님!</div>;
 * }
 * ```
 *
 * ### 관리자 권한 확인
 *
 * ```tsx
 * import { useAuthStore } from '@/stores/authStore';
 *
 * function AdminButton() {
 *   const isAdmin = useAuthStore(state => state.isAdmin);
 *
 *   if (!isAdmin) {
 *     return null;
 *   }
 *
 *   return <button>관리자 기능</button>;
 * }
 * ```
 *
 * ### 로그아웃
 *
 * ```tsx
 * import { useAuthStore } from '@/stores/authStore';
 *
 * function LogoutButton() {
 *   const logout = useAuthStore(state => state.logout);
 *
 *   const handleLogout = async () => {
 *     await logout();
 *     // 로그아웃 후 처리
 *   };
 *
 *   return <button onClick={handleLogout}>로그아웃</button>;
 * }
 * ```
 *
 * ### 초기화
 *
 * ```tsx
 * import { useEffect } from 'react';
 * import { useAuthStore } from '@/stores/authStore';
 *
 * function App() {
 *   const initialize = useAuthStore(state => state.initialize);
 *
 *   useEffect(() => {
 *     initialize();
 *   }, [initialize]);
 *
 *   return <div>앱 내용</div>;
 * }
 * ```
 *
 * ## 인증 상태 변경 이벤트
 *
 * 스토어는 Supabase의 `onAuthStateChange` 이벤트를 구독하여 다음 이벤트를 처리합니다:
 *
 * - `SIGNED_OUT`: 로그아웃 또는 세션 만료
 * - `TOKEN_REFRESHED`: 토큰 갱신
 * - `SIGNED_IN`: 로그인
 * - `USER_UPDATED`: 사용자 정보 업데이트
 *
 * ## 세션 만료 처리
 *
 * 스토어는 세션 만료를 자동으로 감지하고 처리합니다:
 *
 * 1. 세션 만료 시간(`expires_at`) 확인
 * 2. 만료된 경우 자동 로그아웃
 * 3. 상태를 초기화
 *
 * ## 주의사항
 *
 * - 이 스토어는 Zustand를 사용합니다.
 * - Supabase 클라이언트에 의존합니다.
 * - `initialize` 함수는 앱 시작 시 한 번 호출해야 합니다.
 * - 세션 만료는 자동으로 처리됩니다.
 * - 관리자 권한은 `isAdmin` 유틸리티 함수로 확인합니다.
 *
 * ## 관련 컴포넌트
 *
 * - `AuthProvider`: 인증 상태 초기화 Provider
 * - `useRequireAuth`: 인증 필요 페이지용 훅
 * - `useRequireGuest`: 비인증 전용 페이지용 훅
 */
const meta = {
  title: 'Stores/authStore',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 스토어 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Zustand 스토어만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
