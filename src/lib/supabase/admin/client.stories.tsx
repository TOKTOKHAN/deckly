import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 관리자용 Supabase 클라이언트입니다. Service Role Key를 사용하여 RLS를 우회합니다.
 *
 * ## 개요
 *
 * 이 파일은 관리자 전용 Supabase 클라이언트를 생성합니다. Service Role Key를 사용하므로 모든 데이터에 접근할 수 있습니다.
 *
 * ## Export
 *
 * - `adminSupabase`: SupabaseClient 인스턴스 또는 null
 * - `isAdminClientAvailable`: 클라이언트 사용 가능 여부 확인 함수
 *
 * ## 설정
 *
 * 클라이언트는 다음 환경 변수를 사용합니다:
 *
 * - `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
 * - `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key (서버 사이드 전용)
 *
 * ## 인증 설정
 *
 * 클라이언트는 다음 인증 옵션으로 생성됩니다:
 *
 * - `autoRefreshToken: false`: 토큰 자동 갱신 비활성화
 * - `persistSession: false`: 세션 저장 비활성화
 *
 * ## isAdminClientAvailable
 *
 * 관리자 클라이언트가 사용 가능한지 확인합니다.
 *
 * ### 반환값
 *
 * `boolean` - 클라이언트 사용 가능 여부
 *
 * ## 주의사항
 *
 * - **중요**: 이 클라이언트는 서버 사이드에서만 사용해야 합니다.
 * - Service Role Key는 클라이언트 사이드에 노출되면 안 됩니다.
 * - RLS를 우회하므로 모든 데이터에 접근할 수 있습니다.
 * - 환경 변수가 없으면 null을 반환합니다.
 * - API Route나 Server Component에서만 사용하세요.
 */
const meta = {
  title: 'Lib/Supabase/Admin/client',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Supabase 클라이언트 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Supabase 클라이언트만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
