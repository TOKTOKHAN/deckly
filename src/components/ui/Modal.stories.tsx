import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import Modal from './Modal';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['default', 'danger'],
    },
    showCloseButton: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

// Modal은 상태 관리가 필요하므로 래퍼 컴포넌트 사용
// isOpen과 onClose는 래퍼에서 관리하므로 args에서 제외
type ModalArgs = Omit<React.ComponentProps<typeof Modal>, 'isOpen' | 'onClose'>;

const ModalWrapper = (args: Partial<ModalArgs>) => {
  const [isOpen, setIsOpen] = useState(false);

  // args를 ModalArgs로 변환 (필수 필드가 있는지 확인)
  const modalProps: ModalArgs = {
    title: args.title || '',
    ...args,
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
      >
        모달 열기
      </button>
      <Modal {...modalProps} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

// Story 타입을 커스텀 정의 (isOpen, onClose 제외)
type Story = Omit<StoryObj<typeof meta>, 'args'> & {
  args?: Partial<ModalArgs>;
  render?: (args: Partial<ModalArgs>) => JSX.Element;
};

export const Default: Story = {
  render: args => <ModalWrapper {...args} />,
  args: {
    title: '기본 모달',
    message: '이것은 기본 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: () => console.log('확인 클릭'),
    onCancel: () => console.log('취소 클릭'),
  },
};

export const WithChildren: Story = {
  render: args => <ModalWrapper {...args} />,
  args: {
    title: '커스텀 내용 모달',
    children: (
      <div className="space-y-4">
        <p className="text-gray-600">커스텀 내용을 넣을 수 있습니다.</p>
        <input
          type="text"
          placeholder="입력하세요"
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>
    ),
    confirmText: '저장',
    cancelText: '취소',
    onConfirm: () => console.log('저장 클릭'),
  },
};

export const Danger: Story = {
  render: args => <ModalWrapper {...args} />,
  args: {
    title: '삭제 확인',
    message: '정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    variant: 'danger',
    confirmText: '삭제',
    cancelText: '취소',
    onConfirm: () => console.log('삭제 클릭'),
  },
};

export const WithoutButtons: Story = {
  render: args => <ModalWrapper {...args} />,
  args: {
    title: '정보 모달',
    message: '확인 버튼만 있는 모달입니다.',
    confirmText: '확인',
    onConfirm: () => console.log('확인 클릭'),
  },
};

export const NoCloseButton: Story = {
  render: args => <ModalWrapper {...args} />,
  args: {
    title: '닫기 버튼 없음',
    message: '닫기 버튼이 없는 모달입니다. ESC 키로 닫을 수 있습니다.',
    showCloseButton: false,
    confirmText: '확인',
    onConfirm: () => console.log('확인 클릭'),
  },
};
