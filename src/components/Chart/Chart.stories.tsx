import type { Meta, StoryObj } from '@storybook/react';
import type { ChartData } from '../../types';
import { Chart } from './Chart';

const meta: Meta<typeof Chart> = {
  component: Chart,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Chart>;

const lineData: ChartData = {
  title: 'Monthly Revenue',
  type: 'line',
  series: [
    {
      name: 'Revenue',
      color: '#89b4fa',
      data: [4200, 5100, 4800, 6200, 7100, 6800, 7500, 8200, 7900, 8800, 9200, 10100],
    },
    {
      name: 'Expenses',
      color: '#f38ba8',
      data: [3800, 4200, 4100, 4600, 5000, 4900, 5200, 5500, 5300, 5800, 6100, 6400],
    },
  ],
  referenceLines: [{ y: 7000, label: 'Target', color: '#a6e3a1', strokeDasharray: '5 5' }],
  xAxis: {
    label: 'Month',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  yAxis: { label: 'Amount', format: 'currency' },
};

const histogramData: ChartData = {
  title: 'Return Distribution',
  type: 'histogram',
  series: [
    {
      name: 'Frequency',
      color: '#89b4fa',
      data: [2, 5, 8, 15, 25, 30, 28, 20, 12, 7, 3, 1],
    },
  ],
  bins: [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30],
  xAxis: { label: 'Return (%)' },
  yAxis: { label: 'Count' },
};

export const LineChart: Story = {
  args: {
    data: lineData,
    caption: 'Revenue vs. expenses over time',
  },
};

export const Histogram: Story = {
  args: {
    data: histogramData,
    caption: 'Distribution of monthly returns',
  },
};
