import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AdminSidebar from './AdminSidebar';

const meta = {
  title: 'Admin/AdminSidebar',
  component: AdminSidebar,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/admin',
      },
    },
  },
} satisfies Meta<typeof AdminSidebar>;

export default meta;

// Wrapper to manage isOpen state
const AdminSidebarWrapper = (args: { isOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(args.isOpen ?? false);
  return <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />;
};

type AdminSidebarArgs = Pick<React.ComponentProps<typeof AdminSidebar>, 'isOpen'>;

type Story = Omit<StoryObj<typeof meta>, 'args' | 'render'> & {
  args?: Partial<AdminSidebarArgs>;
  render?: (args: Partial<AdminSidebarArgs>) => JSX.Element;
};

export const Default: Story = {
  render: args => <AdminSidebarWrapper isOpen={args?.isOpen ?? false} />,
  args: {
    isOpen: false,
  },
};

export const Open: Story = {
  render: args => <AdminSidebarWrapper isOpen={args?.isOpen ?? true} />,
  args: {
    isOpen: true,
  },
};

export const WithToggle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative h-screen">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-4 top-4 z-50 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          {isOpen ? '닫기' : '열기'}
        </button>
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    );
  },
  args: {},
};
