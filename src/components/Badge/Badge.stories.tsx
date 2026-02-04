import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { label: 'Neutral' },
};

export const Success: Story = {
  args: { label: 'Active', variant: 'success' },
};

export const Danger: Story = {
  args: { label: 'Error', variant: 'danger' },
};

export const MediumSize: Story = {
  args: { label: 'Medium', size: 'md' },
};

export const Bordered: Story = {
  args: { label: 'Bordered', variant: 'success', bordered: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Badge label="Neutral" variant="neutral" />
      <Badge label="Success" variant="success" />
      <Badge label="Danger" variant="danger" />
      <Badge label="Neutral MD" variant="neutral" size="md" />
      <Badge label="Success MD" variant="success" size="md" />
      <Badge label="Danger MD" variant="danger" size="md" />
      <Badge label="Bordered" variant="success" bordered />
    </div>
  ),
};
