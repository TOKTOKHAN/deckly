import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DecklyLogo from './DecklyLogo';

const meta = {
  title: 'UI/DecklyLogo',
  component: DecklyLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: {
        type: 'range',
        min: 50,
        max: 300,
        step: 10,
      },
    },
    height: {
      control: {
        type: 'range',
        min: 10,
        max: 100,
        step: 5,
      },
    },
  },
} satisfies Meta<typeof DecklyLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    width: 80,
    height: 18,
  },
};

export const Medium: Story = {
  args: {
    width: 120,
    height: 24,
  },
};

export const Large: Story = {
  args: {
    width: 200,
    height: 40,
  },
};

export const ExtraLarge: Story = {
  args: {
    width: 300,
    height: 60,
  },
};

export const CustomColor: Story = {
  args: {
    width: 150,
    height: 30,
    className: 'text-indigo-600',
  },
};

export const PrimaryColor: Story = {
  args: {
    width: 150,
    height: 30,
    className: 'text-indigo-600',
  },
};

export const SecondaryColor: Story = {
  args: {
    width: 150,
    height: 30,
    className: 'text-gray-800',
  },
};

export const White: Story = {
  args: {
    width: 150,
    height: 30,
    className: 'text-white',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Black: Story = {
  args: {
    width: 150,
    height: 30,
    className: 'text-black',
  },
};
