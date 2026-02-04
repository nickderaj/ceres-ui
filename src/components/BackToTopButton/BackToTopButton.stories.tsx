import type { Meta, StoryObj } from '@storybook/react';
import { BackToTopButton } from './BackToTopButton';

const meta: Meta<typeof BackToTopButton> = {
  component: BackToTopButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BackToTopButton>;

export const Default: Story = {
  args: { visible: true },
};

export const WithScrollableContent: Story = {
  render: () => (
    <div style={{ height: 300, overflow: 'auto', position: 'relative' }}>
      <div style={{ height: 1200, padding: 16 }}>
        <p>Scroll down to see the button appear (forced visible for demo).</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Line {i + 1}: Lorem ipsum dolor sit amet.</p>
        ))}
      </div>
      <BackToTopButton visible />
    </div>
  ),
};
