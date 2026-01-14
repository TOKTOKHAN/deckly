import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 일반 사용자용 Supabase 클라이언트입니다.
 *
 * ## 개요
 *
 * 이 파일은 Supabase 클라이언트를 생성하고 export합니다. 환경 변수가 설정되지 않은 경우 `null`을 반환합니다.
 *
 * ## Export
 *
 * - `supabase`: SupabaseClient 인스턴스 또는 null
 *
 * ## 설정
 *
 * 클라이언트는 다음 환경 변수를 사용합니다:
 *
 * - `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
 * - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key
 *
 * ## 인증 설정
 *
 * 클라이언트는 다음 인증 옵션으로 생성됩니다:
 *
 * - `persistSession: true`: 세션을 로컬 스토리지에 저장
 * - `autoRefreshToken: true`: 토큰 자동 갱신
 * - `detectSessionInUrl: true`: URL에서 세션 감지
 *
 * ## 사용 예시
 *
 * - supabase 객체를 import하여 사용
 * - 환경 변수가 없으면 null이므로 null 체크 필요
 * - 인증, 데이터베이스 쿼리 등에 사용
 *
 * ## 주의사항
 *
 * - 이 클라이언트는 일반 사용자용이며 RLS(Row Level Security) 정책을 따릅니다.
 * - 서버 사이드에서 사용할 때는 환경 변수가 설정되어 있는지 확인해야 합니다.
 * - 클라이언트 사이드에서 사용할 때는 자동으로 세션이 관리됩니다.
 */
const meta = {
  title: 'Lib/Supabase/client',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Supabase 클라이언트 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Supabase 클라이언트만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
