import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from './Callout';

const meta: Meta<typeof Callout> = {
  component: Callout,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Note: Story = {
  args: { variant: 'note', children: 'This is a note callout.' },
};

export const Important: Story = {
  args: { variant: 'important', children: 'This is an important callout.' },
};

export const Critical: Story = {
  args: { variant: 'critical', children: 'This is a critical callout.' },
};

export const Tip: Story = {
  args: { variant: 'tip', children: 'This is a tip callout.' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'This is a warning callout.' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'This is an info callout.' },
};

export const Wip: Story = {
  args: { variant: 'wip', children: 'This section is a work in progress.' },
};

export const CustomTitle: Story = {
  args: { variant: 'tip', title: 'Pro Tip', children: 'You can override the default title.' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Callout variant="note">This is a note callout.</Callout>
      <Callout variant="important">This is an important callout.</Callout>
      <Callout variant="critical">This is a critical callout.</Callout>
      <Callout variant="tip">This is a tip callout.</Callout>
      <Callout variant="warning">This is a warning callout.</Callout>
      <Callout variant="info">This is an info callout.</Callout>
      <Callout variant="wip">This section is a work in progress.</Callout>
    </div>
  ),
};
