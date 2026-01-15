import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SearchBar from './SearchBar';

const meta = {
  title: 'Components/Admin/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'change' },
    onFilterClick: { action: 'filter' },
    onSearchClick: { action: 'search' },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

// Wrapper to manage state
const SearchBarWrapper = (args: Partial<React.ComponentProps<typeof SearchBar>>) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <SearchBar
      value={value}
      onChange={setValue}
      placeholder={args.placeholder}
      showFilter={args.showFilter}
      onFilterClick={args.onFilterClick}
      onSearchClick={args.onSearchClick}
      className={args.className}
    />
  );
};

type SearchBarArgs = Omit<React.ComponentProps<typeof SearchBar>, 'onChange'> & {
  onChange?: (value: string) => void;
};

type Story = Omit<StoryObj<typeof meta>, 'args' | 'render'> & {
  args?: Partial<SearchBarArgs>;
  render?: (args: Partial<SearchBarArgs>) => JSX.Element;
};

export const Default: Story = {
  render: args => <SearchBarWrapper {...args} value={args?.value || ''} />,
  args: {
    value: '',
  },
};

export const WithValue: Story = {
  render: args => <SearchBarWrapper {...args} value={args?.value || ''} />,
  args: {
    value: '검색어',
  },
};

export const WithFilter: Story = {
  render: args => <SearchBarWrapper {...args} value={args?.value || ''} />,
  args: {
    value: '',
    showFilter: true,
    onFilterClick: () => {},
  },
};

export const WithSearchButton: Story = {
  render: args => <SearchBarWrapper {...args} value={args?.value || ''} />,
  args: {
    value: '검색어',
    onSearchClick: () => {},
  },
};

export const FullFeatures: Story = {
  render: args => <SearchBarWrapper {...args} value={args?.value || ''} />,
  args: {
    value: '검색어',
    showFilter: true,
    onFilterClick: () => {},
    onSearchClick: () => {},
  },
};

export const CustomPlaceholder: Story = {
  render: args => <SearchBarWrapper {...args} value={args?.value || ''} />,
  args: {
    value: '',
    placeholder: '제안서 검색...',
  },
};
