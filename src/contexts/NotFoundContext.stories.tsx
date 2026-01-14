import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NotFoundProvider } from './NotFoundContext';

/**
 *
 * 404 페이지 상태를 관리하는 Context Provider입니다.
 *
 * ## 개요
 *
 * 이 Context는 애플리케이션에서 404 페이지 상태를 전역으로 관리합니다. `ConditionalNavbar` 컴포넌트에서 사용되어 특정 페이지에서 네비게이션 바를 숨기는 데 활용됩니다.
 *
 * ## Export
 *
 * - `NotFoundProvider`: Context Provider 컴포넌트
 * - `useNotFound`: Context를 사용하는 커스텀 훅
 *
 * ## NotFoundProvider
 *
 * 404 상태를 관리하는 Provider 컴포넌트입니다.
 *
 * ### Props
 *
 * | 필드      | 타입        | 필수 | 설명           |
 * | --------- | ----------- | ---- | -------------- |
 * | `children` | `ReactNode` | ✅   | 자식 컴포넌트  |
 *
 * ### 상태
 *
 * - `isNotFound`: 404 페이지 여부를 나타내는 boolean 상태
 * - `setIsNotFound`: 404 상태를 설정하는 함수
 *
 * ## useNotFound
 *
 * NotFoundContext를 사용하는 커스텀 훅입니다.
 *
 * ### 반환값
 *
 * `NotFoundContextType` 객체:
 *
 * | 필드         | 타입                    | 설명                    |
 * | ------------ | ----------------------- | ----------------------- |
 * | `isNotFound` | `boolean`               | 404 페이지 여부         |
 * | `setIsNotFound` | `(value: boolean) => void` | 404 상태 설정 함수 |
 *
 * ### 에러 처리
 *
 * Provider 외부에서 사용하면 에러를 throw합니다:
 *
 * - "useNotFound must be used within a NotFoundProvider"
 *
 * ### 사용 예시
 *
 * - NotFoundProvider로 앱을 감싸기
 * - useNotFound 훅으로 404 상태 접근 및 설정
 * - ConditionalNavbar에서 isNotFound 상태 확인하여 네비게이션 바 표시 여부 결정
 *
 * ## 주의사항
 *
 * - 이 Context는 클라이언트 컴포넌트에서만 사용할 수 있습니다 ('use client').
 * - Provider 외부에서 useNotFound를 사용하면 에러가 발생합니다.
 * - 주로 `ConditionalNavbar` 컴포넌트와 함께 사용됩니다.
 */
const meta = {
  title: 'Contexts/NotFoundContext',
  component: NotFoundProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof NotFoundProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Context Provider이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  args: { children: <></> },
  parameters: {
    docs: {
      description: {
        story:
          '이 컴포넌트는 Context Provider이므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
