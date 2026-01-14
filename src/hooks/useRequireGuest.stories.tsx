import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 로그인하지 않은 사용자만 접근 가능한 페이지에서 사용하는 커스텀 훅입니다. 로그인한 사용자를 자동으로 대시보드로 리다이렉트합니다.
 *
 * ## 사용법
 *
 * `useRequireGuest` 훅은 로그인 페이지나 회원가입 페이지처럼 비인증 사용자만 접근 가능한 페이지에서 사용합니다.
 *
 * ## 매개변수
 *
 * | 매개변수     | 타입     | 필수 | 기본값        | 설명                    |
 * | ------------ | -------- | ---- | ------------- | ----------------------- |
 * | `redirectTo` | `string` | ❌   | `'/dashboard'` | 리다이렉트할 경로       |
 *
 * ## 반환값
 *
 * | 필드        | 타입      | 설명                    |
 * | ----------- | --------- | ----------------------- |
 * | `user`      | `User \| null` | 현재 사용자 객체 (없으면 null) |
 * | `isLoading` | `boolean` | 인증 상태 로딩 중 여부   |
 * | `isGuest`   | `boolean` | 비인증 사용자 여부 (`!user`) |
 *
 * ## 동작 방식
 *
 * 1. **인증 상태 확인**: `useAuthStore`를 통해 현재 인증 상태를 확인합니다.
 * 2. **로딩 대기**: 인증 상태가 로딩 중이면 대기합니다.
 * 3. **리다이렉트**: 로그인한 사용자는 `redirectTo` 경로로 리다이렉트합니다.
 * 4. **상태 반환**: 비인증 사용자의 경우 상태 정보를 반환합니다.
 *
 * ## 사용 예시
 *
 * ### 기본 사용 (로그인 페이지)
 *
 * ```tsx
 * import { useRequireGuest } from '@/hooks/useRequireGuest';
 *
 * function LoginPage() {
 *   const { isLoading, isGuest } = useRequireGuest();
 *
 *   if (isLoading) {
 *     return <div>로딩 중...</div>;
 *   }
 *
 *   if (!isGuest) {
 *     return null; // 리다이렉트 중
 *   }
 *
 *   return <LoginForm />;
 * }
 * ```
 *
 * ### 커스텀 리다이렉트 경로
 *
 * ```tsx
 * import { useRequireGuest } from '@/hooks/useRequireGuest';
 *
 * function SignupPage() {
 *   const { isGuest } = useRequireGuest('/admin');
 *
 *   if (!isGuest) {
 *     return null;
 *   }
 *
 *   return <SignupForm />;
 * }
 * ```
 *
 * ### 회원가입 페이지 예시
 *
 * ```tsx
 * import { useRequireGuest } from '@/hooks/useRequireGuest';
 *
 * function SignupPage() {
 *   const { isLoading, isGuest } = useRequireGuest();
 *
 *   if (isLoading) {
 *     return <LoadingSpinner />;
 *   }
 *
 *   if (!isGuest) {
 *     return null; // 이미 로그인한 사용자는 대시보드로 리다이렉트
 *   }
 *
 *   return (
 *     <div>
 *       <h1>회원가입</h1>
 *       <SignupForm />
 *     </div>
 *   );
 * }
 * ```
 *
 * ## useRequireAuth와의 차이점
 *
 * | 훅              | 용도                     | 리다이렉트 대상           |
 * | --------------- | ------------------------ | ------------------------ |
 * | `useRequireAuth` | 인증 필요 페이지         | 비인증 사용자 → 로그인   |
 * | `useRequireGuest` | 비인증 전용 페이지       | 인증 사용자 → 대시보드   |
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
 * - `useRequireAuth`: 인증이 필요한 페이지용 훅
 * - `useAuthStore`: 인증 상태 스토어
 */
const meta = {
  title: 'Hooks/useRequireGuest',
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
