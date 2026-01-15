import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 인증 상태를 초기화하고 관리하는 Provider 컴포넌트입니다. 앱의 루트 레벨에서 사용하여 인증 상태를 전역적으로 관리합니다.
 *
 * ## 사용법
 *
 * `AuthProvider`는 앱의 최상위 레벨에서 사용하여 인증 상태를 초기화합니다. 일반적으로 `layout.tsx`나 `_app.tsx`에서 사용됩니다.
 *
 * ## Props
 *
 * | Prop       | Type        | Default | Description                   |
 * | ---------- | ----------- | ------- | ----------------------------- |
 * | `children` | `ReactNode` | -       | Provider로 감쌀 컴포넌트 트리 |
 *
 * ## 기본 사용 예시
 *
 * ### Next.js App Router (layout.tsx)
 *
 * ```tsx
 * import AuthProvider from '@/components/providers/AuthProvider';
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="ko">
 *       <body>
 *         <AuthProvider>{children}</AuthProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * ## 동작 방식
 *
 * 1. **마운트 시 초기화**: 컴포넌트가 마운트되면 `useAuthStore`의 `initialize` 함수를 호출합니다.
 * 2. **세션 확인**: Supabase 클라이언트를 통해 현재 세션을 확인합니다.
 * 3. **상태 업데이트**: 인증 상태에 따라 `useAuthStore`의 상태를 업데이트합니다.
 *
 * ## 주의사항
 *
 * - 이 컴포넌트는 클라이언트 컴포넌트입니다 (`'use client'`).
 * - Supabase 클라이언트에 의존하므로, Supabase가 제대로 설정되어 있어야 합니다.
 * - 앱의 최상위 레벨에서 한 번만 사용해야 합니다.
 */
const meta = {
  title: 'Components/Providers/AuthProvider',
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
        story: '이 컴포넌트는 Provider이므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
