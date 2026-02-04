import type { Meta, StoryObj } from '@storybook/react';
import { StarField } from './StarField';

const meta: Meta<typeof StarField> = {
  component: StarField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          height: 400,
          background: '#0a0a0a',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StarField>;

export const Default: Story = {
  args: { starCount: 150 },
};

export const Sparse: Story = {
  args: { starCount: 30 },
};

export const Dense: Story = {
  args: { starCount: 500 },
};
