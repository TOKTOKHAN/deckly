import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 인증이 필요한 페이지에서 사용하는 커스텀 훅입니다. 로그인하지 않은 사용자를 자동으로 로그인 페이지로 리다이렉트합니다.
 *
 * ## 사용법
 *
 * `useRequireAuth` 훅은 인증이 필요한 페이지에서 사용하여, 로그인하지 않은 사용자를 자동으로 리다이렉트합니다.
 *
 * ## 매개변수
 *
 * | 매개변수     | 타입     | 필수 | 기본값    | 설명                    |
 * | ------------ | -------- | ---- | --------- | ----------------------- |
 * | `redirectTo` | `string` | ❌   | `'/login'` | 리다이렉트할 경로       |
 *
 * ## 반환값
 *
 * | 필드            | 타입      | 설명                    |
 * | --------------- | --------- | ----------------------- |
 * | `user`          | `User \| null` | 현재 사용자 객체 (없으면 null) |
 * | `isLoading`     | `boolean` | 인증 상태 로딩 중 여부   |
 * | `isAuthenticated` | `boolean` | 인증 여부 (`!!user`)    |
 *
 * ## 동작 방식
 *
 * 1. **인증 상태 확인**: `useAuthStore`를 통해 현재 인증 상태를 확인합니다.
 * 2. **로딩 대기**: 인증 상태가 로딩 중이면 대기합니다.
 * 3. **리다이렉트**: 로그인하지 않은 사용자는 `redirectTo` 경로로 리다이렉트합니다.
 * 4. **상태 반환**: 인증된 사용자의 경우 사용자 정보를 반환합니다.
 *
 * ## 사용 예시
 *
 * ### 기본 사용
 *
 * ```tsx
 * import { useRequireAuth } from '@/hooks/useRequireAuth';
 *
 * function Dashboard() {
 *   const { user, isLoading, isAuthenticated } = useRequireAuth();
 *
 *   if (isLoading) {
 *     return <div>로딩 중...</div>;
 *   }
 *
 *   if (!isAuthenticated) {
 *     return null; // 리다이렉트 중
 *   }
 *
 *   return <div>안녕하세요, {user?.email}님!</div>;
 * }
 * ```
 *
 * ### 커스텀 리다이렉트 경로
 *
 * ```tsx
 * import { useRequireAuth } from '@/hooks/useRequireAuth';
 *
 * function AdminPage() {
 *   const { user, isAuthenticated } = useRequireAuth('/custom-login');
 *
 *   if (!isAuthenticated) {
 *     return null;
 *   }
 *
 *   return <div>관리자 페이지</div>;
 * }
 * ```
 *
 * ### ProtectedRoute와 함께 사용
 *
 * ```tsx
 * import ProtectedRoute from '@/components/auth/ProtectedRoute';
 * import { useRequireAuth } from '@/hooks/useRequireAuth';
 *
 * function MyPage() {
 *   // ProtectedRoute가 이미 리다이렉트를 처리하므로
 *   // useRequireAuth는 추가적인 인증 확인에 사용할 수 있습니다
 *   const { user } = useRequireAuth();
 *
 *   return <div>사용자: {user?.email}</div>;
 * }
 * ```
 *
 * ## 주의사항
 *
 * - 이 훅은 클라이언트 컴포넌트에서만 사용할 수 있습니다 (`'use client'`).
 * - `useRouter`와 `useAuthStore`에 의존합니다.
 * - Next.js App Router 환경에서 사용해야 합니다.
 * - 리다이렉트는 클라이언트 사이드에서 발생합니다.
 * - `useEffect`를 사용하므로 컴포넌트가 마운트된 후에 리다이렉트가 발생합니다.
 *
 * ## 관련 컴포넌트
 *
 * - `ProtectedRoute`: 인증이 필요한 라우트 보호 컴포넌트
 * - `useAuthStore`: 인증 상태 스토어
 * - `useRequireGuest`: 비인증 사용자 전용 훅
 */
const meta = {
  title: 'Hooks/useRequireAuth',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 훅 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 커스텀 훅만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
