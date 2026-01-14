import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * Google GenAI 클라이언트 및 제안서 생성 함수입니다.
 *
 * ## Export
 *
 * - `genAI`: GoogleGenAI 인스턴스
 * - `generateProposal`: 제안서 생성 함수 (비스트리밍)
 * - `generateProposalStream`: 제안서 생성 함수 (스트리밍)
 *
 * ## genAI
 *
 * Google GenAI 클라이언트 인스턴스입니다. 환경 변수 `GEMINI_API_KEY`를 사용하여 초기화됩니다.
 *
 * ### 초기화
 *
 * - API 키가 없으면 에러를 throw합니다.
 * - `GEMINI_API_KEY` 환경 변수가 필수입니다.
 *
 * ## generateProposal
 *
 * 제안서를 생성합니다 (비스트리밍 방식).
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명           |
 * | -------- | -------- | ---- | -------------- |
 * | `prompt` | `string` | ✅   | 생성 프롬프트  |
 *
 * ### 반환값
 *
 * `Promise<string>` - 생성된 제안서 텍스트
 *
 * ### 동작
 *
 * - Gemini 모델을 사용하여 콘텐츠 생성
 * - 응답에서 텍스트 추출
 * - 여러 응답 형식 지원 (text, candidates[0].content.parts[0].text)
 *
 * ## generateProposalStream
 *
 * 제안서를 생성합니다 (스트리밍 방식). 실시간으로 생성되는 내용을 표시할 수 있습니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명           |
 * | -------- | -------- | ---- | -------------- |
 * | `prompt` | `string` | ✅   | 생성 프롬프트  |
 *
 * ### 반환값
 *
 * `Promise<Stream>` - 스트리밍 응답 객체
 *
 * ### 동작
 *
 * - Gemini 모델을 사용하여 스트리밍 방식으로 콘텐츠 생성
 * - 실시간으로 생성되는 내용을 받을 수 있습니다.
 *
 * ## 모델 설정
 *
 * 모델명은 환경 변수 `GEMINI_MODEL`로 설정 가능합니다. 기본값은 `'gemini-3-pro-preview'`입니다.
 *
 * ### 사용 예시
 *
 * - generateProposal: 전체 응답을 한 번에 받을 때 사용
 * - generateProposalStream: 실시간으로 생성되는 내용을 표시할 때 사용
 *
 * ## 주의사항
 *
 * - `GEMINI_API_KEY` 환경 변수가 필수입니다. 없으면 초기화 시 에러가 발생합니다.
 * - 모델명은 `GEMINI_MODEL` 환경 변수로 변경 가능합니다.
 * - 스트리밍 방식은 실시간 피드백이 필요한 경우에 유용합니다.
 */
const meta = {
  title: 'Lib/Gemini/client',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Gemini 클라이언트 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Gemini 클라이언트만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
