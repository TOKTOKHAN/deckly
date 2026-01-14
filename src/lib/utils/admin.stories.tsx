import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 관리자 권한 확인 유틸리티 함수입니다.
 *
 * ## 함수 목록
 *
 * - `isAdmin`: 사용자가 관리자인지 확인
 * - `getAdminEmailList`: 관리자 이메일 목록 반환 (디버깅용)
 *
 * ## isAdmin
 *
 * 사용자가 관리자인지 확인합니다. 두 가지 방법으로 확인합니다:
 *
 * 1. **환경 변수 체크**: `NEXT_PUBLIC_ADMIN_EMAILS`에 설정된 이메일 목록 확인 (슈퍼 어드민)
 * 2. **user_metadata 체크**: 사용자 메타데이터의 `isAdmin` 속성 확인 (일반 어드민)
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입                | 필수 | 설명           |
 * | -------- | ------------------- | ---- | -------------- |
 * | `user`   | `User \| null \| undefined` | ✅   | Supabase User 객체 |
 *
 * ### 반환값
 *
 * `boolean` - 관리자 여부
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { isAdmin } from '@/lib/utils/admin';
 * import { useAuthStore } from '@/stores/authStore';
 *
 * function AdminButton() {
 *   const user = useAuthStore(state => state.user);
 *
 *   if (!isAdmin(user)) {
 *     return null;
 *   }
 *
 *   return <button>관리자 기능</button>;
 * }
 * ```
 *
 * ### 환경 변수 설정
 *
 * `.env.local` 파일에 관리자 이메일을 설정합니다:
 *
 * ```env
 * NEXT_PUBLIC_ADMIN_EMAILS=admin1@example.com,admin2@example.com
 * ```
 *
 * ## getAdminEmailList
 *
 * 관리자 이메일 목록을 반환합니다. 디버깅용으로 사용합니다.
 *
 * ### 반환값
 *
 * `string[]` - 관리자 이메일 배열
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { getAdminEmailList } from '@/lib/utils/admin';
 *
 * const adminEmails = getAdminEmailList();
 * console.log('관리자 이메일:', adminEmails);
 * ```
 *
 * ## 주의사항
 *
 * - 환경 변수는 쉼표로 구분된 이메일 목록입니다.
 * - 이메일은 소문자로 변환되어 비교됩니다.
 * - `user_metadata.isAdmin`이 `true`인 경우도 관리자로 인식됩니다.
 * - 사용자가 없거나 이메일이 없으면 `false`를 반환합니다.
 */
const meta = {
  title: 'Lib/Utils/admin',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 유틸리티 함수 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 유틸리티 함수만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
