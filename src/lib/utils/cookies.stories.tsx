import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * 쿠키 유틸리티 함수입니다. 브라우저 환경에서만 동작합니다.
 *
 * ## 함수 목록
 *
 * - `getCookie`: 쿠키에서 값을 가져오기
 * - `setCookie`: 쿠키에 값 설정
 * - `getOrCreateVisitorId`: 방문자 고유 ID 가져오기 또는 생성
 *
 * ## getCookie
 *
 * 쿠키에서 특정 이름의 값을 가져옵니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `name`   | `string` | ✅   | 쿠키 이름  |
 *
 * ### 반환값
 *
 * `string | null` - 쿠키 값 (없으면 null)
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { getCookie } from '@/lib/utils/cookies';
 *
 * const visitorId = getCookie('deckly_visitor_id');
 * if (visitorId) {
 *   console.log('방문자 ID:', visitorId);
 * }
 * ```
 *
 * ## setCookie
 *
 * 쿠키에 값을 설정합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 기본값 | 설명                    |
 * | -------- | -------- | ---- | ------ | ----------------------- |
 * | `name`   | `string` | ✅   | -      | 쿠키 이름               |
 * | `value`  | `string` | ✅   | -      | 쿠키 값                 |
 * | `days`   | `number` | ❌   | `365`  | 만료일까지의 일수 (1년) |
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { setCookie } from '@/lib/utils/cookies';
 *
 * // 30일 동안 유지되는 쿠키 설정
 * setCookie('user_preference', 'dark_mode', 30);
 *
 * // 기본값(1년)으로 쿠키 설정
 * setCookie('visitor_id', 'abc123');
 * ```
 *
 * ### 쿠키 설정 옵션
 *
 * - **path**: `/` - 모든 경로에서 접근 가능
 * - **SameSite**: `Lax` - CSRF 공격 방지
 * - **Secure**: HTTPS 환경에서만 자동 추가
 *
 * ## getOrCreateVisitorId
 *
 * 방문자 고유 ID를 가져오거나 생성합니다. 쿠키에 저장된 ID를 반환하거나, 없으면 새로 생성하여 저장합니다.
 *
 * ### 반환값
 *
 * `string` - 방문자 ID (서버 사이드에서는 빈 문자열)
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { getOrCreateVisitorId } from '@/lib/utils/cookies';
 *
 * const visitorId = getOrCreateVisitorId();
 * // 기존 방문자: 쿠키에서 가져온 ID
 * // 신규 방문자: 새로 생성된 UUID
 * ```
 *
 * ### 동작 방식
 *
 * 1. 쿠키에서 `deckly_visitor_id` 확인
 * 2. 있으면 해당 값 반환
 * 3. 없으면 UUID v4 생성 후 쿠키에 저장하고 반환
 *
 * ## 상수
 *
 * - `VISITOR_ID_COOKIE_NAME`: `'deckly_visitor_id'` - 방문자 ID 쿠키 이름
 * - `COOKIE_EXPIRES_DAYS`: `365` - 쿠키 만료일 (1년)
 *
 * ## 주의사항
 *
 * - 모든 함수는 브라우저 환경에서만 동작합니다 (`typeof document !== 'undefined'`).
 * - 서버 사이드에서는 `getOrCreateVisitorId`가 빈 문자열을 반환합니다.
 * - HTTPS 환경에서는 자동으로 `Secure` 플래그가 추가됩니다.
 * - UUID 생성은 `crypto.randomUUID`를 사용하며, 지원하지 않는 브라우저는 fallback을 사용합니다.
 */
const meta = {
  title: 'Lib/Utils/cookies',
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
