import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Plus,
  FileText,
  ChevronRight,
  ChevronLeft,
  Download,
  RefreshCw,
  CheckCircle2,
  Edit,
  Save,
  X,
} from './index';

const meta = {
  title: 'Components/Icons',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Plus Icon
export const PlusIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Plus size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Plus size={20} />
        <span className="text-xs text-slate-600">20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Plus size={24} />
        <span className="text-xs text-slate-600">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Plus size={32} />
        <span className="text-xs text-slate-600">32px</span>
      </div>
    </div>
  ),
};

// FileText Icon
export const FileTextIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <FileText size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FileText size={20} />
        <span className="text-xs text-slate-600">20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FileText size={24} />
        <span className="text-xs text-slate-600">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FileText size={32} className="text-blue-600" />
        <span className="text-xs text-slate-600">32px (colored)</span>
      </div>
    </div>
  ),
};

// ChevronRight Icon
export const ChevronRightIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <ChevronRight size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronRight size={20} />
        <span className="text-xs text-slate-600">20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronRight size={24} />
        <span className="text-xs text-slate-600">24px</span>
      </div>
    </div>
  ),
};

// ChevronLeft Icon
export const ChevronLeftIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <ChevronLeft size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronLeft size={20} />
        <span className="text-xs text-slate-600">20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChevronLeft size={24} />
        <span className="text-xs text-slate-600">24px</span>
      </div>
    </div>
  ),
};

// Download Icon
export const DownloadIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Download size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Download size={18} />
        <span className="text-xs text-slate-600">18px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Download size={24} />
        <span className="text-xs text-slate-600">24px</span>
      </div>
    </div>
  ),
};

// RefreshCw Icon
export const RefreshCwIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <RefreshCw size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RefreshCw size={18} />
        <span className="text-xs text-slate-600">18px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RefreshCw size={24} />
        <span className="text-xs text-slate-600">24px</span>
      </div>
    </div>
  ),
};

// CheckCircle2 Icon
export const CheckCircle2Icon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <CheckCircle2 size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CheckCircle2 size={20} />
        <span className="text-xs text-slate-600">20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CheckCircle2 size={24} className="text-green-600" />
        <span className="text-xs text-slate-600">24px (colored)</span>
      </div>
    </div>
  ),
};

// Edit Icon
export const EditIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Edit size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Edit size={18} />
        <span className="text-xs text-slate-600">18px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Edit size={24} />
        <span className="text-xs text-slate-600">24px</span>
      </div>
    </div>
  ),
};

// Save Icon
export const SaveIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Save size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Save size={18} />
        <span className="text-xs text-slate-600">18px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Save size={24} />
        <span className="text-xs text-slate-600">24px</span>
      </div>
    </div>
  ),
};

// X Icon
export const XIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <X size={16} />
        <span className="text-xs text-slate-600">16px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <X size={18} />
        <span className="text-xs text-slate-600">18px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <X size={24} />
        <span className="text-xs text-slate-600">24px</span>
      </div>
    </div>
  ),
};

// All Icons Showcase
export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 md:grid-cols-4">
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <Plus size={24} />
        <span className="text-xs font-medium text-slate-700">Plus</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <FileText size={24} />
        <span className="text-xs font-medium text-slate-700">FileText</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <ChevronRight size={24} />
        <span className="text-xs font-medium text-slate-700">ChevronRight</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <ChevronLeft size={24} />
        <span className="text-xs font-medium text-slate-700">ChevronLeft</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <Download size={24} />
        <span className="text-xs font-medium text-slate-700">Download</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <RefreshCw size={24} />
        <span className="text-xs font-medium text-slate-700">RefreshCw</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <CheckCircle2 size={24} />
        <span className="text-xs font-medium text-slate-700">CheckCircle2</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <Edit size={24} />
        <span className="text-xs font-medium text-slate-700">Edit</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <Save size={24} />
        <span className="text-xs font-medium text-slate-700">Save</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 p-4">
        <X size={24} />
        <span className="text-xs font-medium text-slate-700">X</span>
      </div>
    </div>
  ),
};
