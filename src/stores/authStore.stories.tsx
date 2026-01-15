import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 인증 상태를 관리하는 Zustand Store입니다.
 *
 * ## 사용법
 *
 * `useAuthStore`는 사용자 인증 상태, 세션 정보, 관리자 여부 등을 중앙에서 관리합니다.
 * 앱 전역에서 인증 상태를 확인하고 사용할 수 있습니다.
 *
 * ## 상태 (State)
 *
 * | 상태        | 타입            | 기본값   | 설명                    |
 * | ----------- | --------------- | -------- | ----------------------- |
 * | `user`      | `User \| null`   | `null`   | 현재 로그인한 사용자    |
 * | `session`   | `Session \| null` | `null` | 현재 세션 정보          |
 * | `isLoading` | `boolean`        | `true`   | 인증 상태 로딩 중 여부  |
 * | `isAdmin`   | `boolean`        | `false`  | 관리자 여부             |
 *
 * ## 액션 (Actions)
 *
 * ### 기본 액션
 *
 * | 액션            | 타입                        | 설명                    |
 * | --------------- | --------------------------- | ----------------------- |
 * | `setUser`       | `(user: User \| null) => void` | 사용자 설정 (자동으로 isAdmin도 업데이트) |
 * | `setSession`    | `(session: Session \| null) => void` | 세션 설정 |
 * | `setLoading`    | `(isLoading: boolean) => void` | 로딩 상태 변경 |
 * | `checkAdmin`    | `() => void`                | 관리자 여부 재확인      |
 *
 * ### 복합 액션
 *
 * | 액션                | 설명                                    |
 * | ------------------- | --------------------------------------- |
 * | `logout`            | 로그아웃 (Supabase 세션 종료 및 상태 초기화) |
 * | `initialize`        | 인증 상태 초기화 (세션 확인 및 상태 변경 감지) |
 * | `checkSessionExpiry` | 세션 만료 여부 확인 (만료 시 true 반환) |
 *
 * ## 사용 예시
 *
 * ### 기본 사용법
 *
 * ```tsx
 * import { useAuthStore } from '@/stores/authStore';
 *
 * function UserProfile() {
 *   const { user, isLoading, isAdmin } = useAuthStore();
 *
 *   if (isLoading) {
 *     return <div>로딩 중...</div>;
 *   }
 *
 *   if (!user) {
 *     return <div>로그인이 필요합니다.</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <p>이메일: {user.email}</p>
 *       {isAdmin && <p>관리자 권한</p>}
 *     </div>
 *   );
 * }
 * ```
 *
 * ### 선택적 상태 가져오기
 *
 * ```tsx
 * // 필요한 상태만 선택적으로 가져오기 (성능 최적화)
 * const user = useAuthStore(state => state.user);
 * const isAdmin = useAuthStore(state => state.isAdmin);
 *
 * // 여러 상태를 한 번에 가져오기
 * const { user, session, isLoading } = useAuthStore();
 * ```
 *
 * ### 로그아웃 처리
 *
 * ```tsx
 * function LogoutButton() {
 *   const logout = useAuthStore(state => state.logout);
 *
 *   const handleLogout = async () => {
 *     await logout();
 *     // 로그아웃 후 리다이렉트 등 추가 처리
 *   };
 *
 *   return <button onClick={handleLogout}>로그아웃</button>;
 * }
 * ```
 *
 * ### 인증 상태 초기화
 *
 * ```tsx
 * // 앱 시작 시 한 번만 호출
 * useEffect(() => {
 *   const { initialize } = useAuthStore.getState();
 *   initialize();
 * }, []);
 * ```
 *
 * ## 인증 상태 변경 감지
 *
 * `initialize()` 함수는 Supabase의 `onAuthStateChange`를 설정하여 다음 이벤트를 자동으로 처리합니다:
 *
 * - `SIGNED_IN`: 로그인 시 사용자 정보 업데이트
 * - `SIGNED_OUT`: 로그아웃 시 상태 초기화
 * - `TOKEN_REFRESHED`: 토큰 갱신 시 세션 업데이트
 * - `USER_UPDATED`: 사용자 정보 업데이트 시 상태 반영
 *
 * ## 세션 만료 처리
 *
 * `checkSessionExpiry` 함수는 세션의 `expires_at`을 확인하여 만료 여부를 판단합니다.
 * 만료된 세션이 감지되면 자동으로 로그아웃 처리됩니다.
 *
 * ## 관리자 확인
 *
 * `setUser`를 호출하면 자동으로 `isAdmin` 상태도 업데이트됩니다.
 * 관리자 여부는 `isAdmin` 유틸 함수를 통해 확인됩니다.
 *
 * ## 특징
 *
 * - **자동 상태 동기화**: Supabase 인증 상태 변경 시 자동으로 Store 상태가 업데이트됩니다.
 * - **세션 만료 감지**: 만료된 세션을 자동으로 감지하고 처리합니다.
 * - **관리자 권한 관리**: 사용자 설정 시 자동으로 관리자 여부를 확인합니다.
 * - **타입 안정성**: TypeScript로 모든 상태와 액션이 타입 안전합니다.
 *
 * ## 주의사항
 *
 * - 이 Store는 클라이언트 전용입니다 (`'use client'` 지시어 없지만 Zustand는 클라이언트 전용).
 * - `initialize()`는 앱 시작 시 한 번만 호출해야 합니다.
 * - 세션 만료 체크는 Unix timestamp(초 단위)를 사용합니다.
 * - `onAuthStateChange`는 `initialize()` 호출 시 자동으로 설정되며, 앱 종료 시까지 유지됩니다.
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
// Store 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Zustand Store만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
