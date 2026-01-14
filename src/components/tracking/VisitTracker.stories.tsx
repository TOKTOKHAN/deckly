import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import VisitTracker from './VisitTracker';
import { useAuthStore } from '@/stores/authStore';

/**
 *
 * 방문자 수 추적 컴포넌트입니다. 페이지 로드 시 한 번만 방문자 수를 기록합니다.
 *
 * ## 사용법
 *
 * `VisitTracker`는 앱의 루트 레벨(`layout.tsx`)에서 사용하여 방문자 수를 자동으로 추적합니다.
 *
 * ## 동작 방식
 *
 * 1. **페이지 로드 시 실행**: 컴포넌트가 마운트되면 방문 추적을 시작합니다.
 * 2. **방문자 ID 확인**: 쿠키에서 고유 방문자 ID를 가져오거나 생성합니다.
 * 3. **중복 방지**: localStorage를 사용하여 하루에 한 번만 기록합니다.
 * 4. **API 호출**: `/api/track-visit` 엔드포인트로 방문 정보를 전송합니다.
 *
 * ## 특징
 *
 * - **자동 추적**: 페이지 로드 시 자동으로 방문을 기록합니다.
 * - **중복 방지**: 같은 사용자는 하루에 한 번만 기록됩니다.
 * - **인증 사용자 지원**: 로그인한 사용자는 사용자 ID로 추적됩니다.
 * - **비인증 사용자 지원**: 쿠키 기반 방문자 ID로 추적됩니다.
 * - **비침투적**: 추적 실패해도 페이지 동작에 영향을 주지 않습니다.
 *
 * ## 기본 사용 예시
 *
 * ### Next.js App Router (layout.tsx)
 *
 * ```tsx
 * import VisitTracker from '@/components/tracking/VisitTracker';
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="ko">
 *       <body>
 *         <VisitTracker />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * ## 주의사항
 *
 * - 이 컴포넌트는 클라이언트 컴포넌트입니다 (`'use client'`).
 * - `useAuthStore`에 의존하므로 인증 상태가 로드된 후 실행됩니다.
 * - 실제로는 아무것도 렌더링하지 않습니다 (`return null`).
 * - 브라우저의 localStorage와 쿠키를 사용합니다.
 * - API 엔드포인트(`/api/track-visit`)가 필요합니다.
 *
 * ## 관련 컴포넌트
 *
 * - `useAuthStore`: 인증 상태 스토어
 * - `getOrCreateVisitorId`: 방문자 ID 관리 유틸리티
 */
const meta = {
  title: 'Tracking/VisitTracker',
  component: VisitTracker,
  tags: ['autodocs'],
  decorators: [
    Story => {
      // Mock auth store for Storybook
      useAuthStore.setState({
        user: null,
        session: null,
        isLoading: false,
      });
      return <Story />;
    },
  ],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta<typeof VisitTracker>;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 실제로는 컴포넌트를 렌더링하지 않고 문서만 표시합니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 컴포넌트는 방문 추적 전용 컴포넌트이므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
