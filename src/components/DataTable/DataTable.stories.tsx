import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    data: {
      columns: ['Name', 'Language', 'Stars', 'License'],
      data: [
        ['React', 'JavaScript', '220k', 'MIT'],
        ['Vue', 'JavaScript', '207k', 'MIT'],
        ['Svelte', 'JavaScript', '78k', 'MIT'],
        ['Angular', 'TypeScript', '95k', 'MIT'],
        ['Solid', 'TypeScript', '32k', 'MIT'],
      ],
    },
  },
};

export const TwoColumns: Story = {
  args: {
    data: {
      columns: ['Key', 'Value'],
      data: [
        ['Name', 'ceres-ui'],
        ['Version', '0.1.0'],
        ['License', 'MIT'],
      ],
    },
  },
};

export const EmptyTable: Story = {
  args: {
    data: {
      columns: ['Name', 'Value'],
      data: [],
    },
  },
};
