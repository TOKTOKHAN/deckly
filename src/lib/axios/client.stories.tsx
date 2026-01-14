import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * Axios 기반 API 클라이언트입니다. 모든 API 요청에 공통 설정을 적용합니다.
 *
 * ## 설정
 *
 * - **baseURL**: `/api` - 모든 요청의 기본 URL
 * - **timeout**: `180000` (3분) - AI 생성 시간을 고려한 타임아웃
 * - **headers**: `Content-Type: application/json`
 *
 * ## 인터셉터
 *
 * ### 요청 인터셉터
 *
 * 요청 전에 실행됩니다. 현재는 설정만 전달합니다.
 *
 * ### 응답 인터셉터
 *
 * 응답 후 에러를 처리합니다:
 *
 * - **서버 응답 에러**: 서버가 반환한 에러 메시지를 추출
 * - **네트워크 에러**: 연결 실패 시 안내 메시지 반환
 * - **요청 설정 에러**: 설정 중 발생한 에러를 그대로 전달
 *
 * ## 사용 예시
 *
 * ### 기본 사용
 *
 * ```tsx
 * import apiClient from '@/lib/axios/client';
 *
 * async function fetchData() {
 *   try {
 *     const response = await apiClient.get('/users');
 *     return response.data;
 *   } catch (error) {
 *     console.error('에러:', error.message);
 *   }
 * }
 * ```
 *
 * ### POST 요청
 *
 * ```tsx
 * import apiClient from '@/lib/axios/client';
 *
 * async function createUser(userData: UserData) {
 *   try {
 *     const response = await apiClient.post('/users', userData);
 *     return response.data;
 *   } catch (error) {
 *     console.error('사용자 생성 실패:', error.message);
 *   }
 * }
 * ```
 *
 * ### 에러 처리
 *
 * ```tsx
 * import apiClient from '@/lib/axios/client';
 *
 * try {
 *   const response = await apiClient.get('/data');
 * } catch (error) {
 *   if (error instanceof Error) {
 *     // 에러 메시지는 인터셉터에서 처리된 메시지
 *     console.error(error.message);
 *   }
 * }
 * ```
 *
 * ## 주의사항
 *
 * - 모든 요청은 `/api`로 시작하는 상대 경로를 사용합니다.
 * - 타임아웃은 3분으로 설정되어 있어 AI 생성 같은 긴 작업을 지원합니다.
 * - 에러는 자동으로 처리되어 사용자 친화적인 메시지로 변환됩니다.
 * - 네트워크 에러 시 개발 서버 실행 여부를 안내합니다.
 */
const meta = {
  title: 'Lib/Axios/client',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Axios 클라이언트 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Axios 클라이언트만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
