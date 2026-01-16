import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 제안서 CRUD 함수입니다. 현재 로그인한 사용자의 제안서만 조회/수정/삭제할 수 있습니다.
 *
 * ## 함수 목록
 *
 * - `getProposals`: 제안서 목록 조회
 * - `getProposal`: 제안서 단일 조회
 * - `createProposal`: 제안서 생성
 * - `updateProposal`: 제안서 업데이트
 * - `deleteProposal`: 제안서 삭제
 *
 * ## getProposals
 *
 * 특정 사용자의 모든 제안서를 조회합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `userId` | `string` | ✅   | 사용자 ID  |
 *
 * ### 반환값
 *
 * `Promise<Proposal[]>` - 제안서 배열 (생성일 기준 내림차순)
 *
 * ### 동작
 *
 * - 사용자 ID가 없으면 빈 배열 반환
 * - 해당 사용자의 제안서만 조회 (user_id 필터링)
 *
 * ## getProposal
 *
 * 특정 제안서를 조회합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `id`     | `string` | ✅   | 제안서 ID  |
 *
 * ### 반환값
 *
 * `Promise<Proposal | null>` - 제안서 또는 null
 *
 * ### 동작
 *
 * - 로그인하지 않은 경우 null 반환
 * - 현재 사용자의 제안서만 조회
 * - 제안서가 없으면 null 반환
 *
 * ## createProposal
 *
 * 새로운 제안서를 생성합니다.
 *
 * ### 매개변수
 *
 * | 매개변수   | 타입      | 필수 | 설명       |
 * | ---------- | --------- | ---- | ---------- |
 * | `proposal` | `Proposal` | ✅   | 제안서 데이터 |
 *
 * ### 반환값
 *
 * `Promise<Proposal>` - 생성된 제안서
 *
 * ### 동작
 *
 * - 로그인 확인
 * - 제안서 생성 제한 체크 (checkProposalTotalLimit)
 * - 제한 초과 시 에러 throw
 * - 현재 사용자의 user_id 자동 설정
 *
 * ## updateProposal
 *
 * 제안서를 업데이트합니다.
 *
 * ### 매개변수
 *
 * | 매개변수   | 타입      | 필수 | 설명       |
 * | ---------- | --------- | ---- | ---------- |
 * | `proposal` | `Proposal` | ✅   | 업데이트할 제안서 데이터 |
 *
 * ### 반환값
 *
 * `Promise<Proposal>` - 업데이트된 제안서
 *
 * ### 동작
 *
 * - 로그인 확인
 * - 제안서 소유자 확인 (본인의 제안서만 수정 가능)
 * - updated_at 자동 업데이트
 *
 * ## deleteProposal
 *
 * 제안서를 삭제합니다.
 *
 * ### 매개변수
 *
 * | 매개변수 | 타입     | 필수 | 설명       |
 * | -------- | -------- | ---- | ---------- |
 * | `id`     | `string` | ✅   | 제안서 ID  |
 *
 * ### 반환값
 *
 * `Promise<void>`
 *
 * ### 동작
 *
 * - 로그인 확인
 * - 제안서 소유자 확인 (본인의 제안서만 삭제 가능)
 *
 * ## 주의사항
 *
 * - 모든 함수는 현재 로그인한 사용자의 제안서만 접근할 수 있습니다.
 * - createProposal은 제안서 생성 제한을 체크합니다.
 * - updateProposal과 deleteProposal은 소유자 확인을 수행합니다.
 * - Supabase 클라이언트가 설정되지 않은 경우 에러를 throw합니다.
 */
const meta = {
  title: 'Lib/Supabase/proposals',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// Supabase 함수 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 Supabase 함수만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
