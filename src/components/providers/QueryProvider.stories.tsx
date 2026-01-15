import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * React Query의 `QueryClientProvider`를 설정하고 제공하는 Provider 컴포넌트입니다. 앱 전체에서 React Query를 사용할 수 있도록 설정합니다.
 *
 * ## 사용법
 *
 * `QueryProvider`는 앱의 최상위 레벨에서 사용하여 React Query를 전역적으로 설정합니다. 일반적으로 `layout.tsx`나 `_app.tsx`에서 사용됩니다.
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
 * import QueryProvider from '@/components/providers/QueryProvider';
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="ko">
 *       <body>
 *         <QueryProvider>{children}</QueryProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * ## 기본 설정
 *
 * 이 Provider는 다음과 같은 기본 설정을 사용합니다:
 *
 * ### Queries 설정
 *
 * - **staleTime**: `1000 * 60 * 5` (5분)
 * - **refetchOnWindowFocus**: `false`
 * - **retry**: `1`
 *
 * ### Mutations 설정
 *
 * - **retry**: `1`
 *
 * ## 주의사항
 *
 * - 이 컴포넌트는 클라이언트 컴포넌트입니다 (`'use client'`).
 * - `@tanstack/react-query` 패키지가 설치되어 있어야 합니다.
 * - 앱의 최상위 레벨에서 한 번만 사용해야 합니다.
 */
const meta = {
  title: 'Components/Providers/QueryProvider',
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
