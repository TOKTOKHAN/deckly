import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 인증이 필요한 라우트를 보호하는 컴포넌트입니다. 로그인하지 않은 사용자는 자동으로 로그인 페이지로 리다이렉트됩니다.
 *
 * ## 사용법
 *
 * `ProtectedRoute` 컴포넌트로 감싼 자식 컴포넌트는 인증된 사용자에게만 표시됩니다.
 *
 * ## Props
 *
 * | Prop              | Type        | Default    | Description                                          |
 * | ----------------- | ----------- | ---------- | ---------------------------------------------------- |
 * | `children`        | `ReactNode` | -          | 보호할 컴포넌트 또는 요소                            |
 * | `redirectTo`      | `string`    | `'/login'` | 인증되지 않은 사용자를 리다이렉트할 경로             |
 * | `fallback`        | `ReactNode` | `null`     | 인증되지 않았을 때 표시할 컴포넌트                   |
 * | `loadingFallback` | `ReactNode` | `null`     | 로딩 중일 때 표시할 컴포넌트 (없으면 기본 배경 표시) |
 *
 * ## 기본 사용 예시
 *
 * ```tsx
 * import ProtectedRoute from '@/components/auth/ProtectedRoute';
 * import Dashboard from '@/components/Dashboard';
 *
 * function App() {
 *   return (
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   );
 * }
 * ```
 *
 * ## 커스텀 리다이렉트 경로
 *
 * ```tsx
 * <ProtectedRoute redirectTo="/custom-login">
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 *
 * ## 커스텀 Fallback 사용
 *
 * 인증되지 않은 사용자에게 커스텀 메시지를 표시할 수 있습니다:
 *
 * ```tsx
 * <ProtectedRoute
 *   fallback={
 *     <div className="flex min-h-screen items-center justify-center">
 *       <div className="text-center">
 *         <h2 className="text-2xl font-bold">로그인이 필요합니다</h2>
 *         <p className="mt-2 text-gray-600">이 페이지를 보려면 로그인해주세요.</p>
 *         <a href="/login" className="mt-4 inline-block text-blue-600">
 *           로그인 페이지로 이동
 *         </a>
 *       </div>
 *     </div>
 *   }
 * >
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 *
 * ## 주의사항
 *
 * - 이 컴포넌트는 클라이언트 컴포넌트입니다 (`'use client'`).
 * - `useRouter`와 `useAuthStore`에 의존하므로, Next.js App Router 환경에서 사용해야 합니다.
 * - 리다이렉트는 클라이언트 사이드에서 발생합니다.
 */
const meta = {
  title: 'Components/Auth/ProtectedRoute',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 실제로는 컴포넌트를 렌더링하지 않고 문서만 표시합니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          '이 컴포넌트는 인증 관련 컴포넌트이므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
