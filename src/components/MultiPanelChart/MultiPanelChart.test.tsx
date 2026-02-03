import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  LineChart: ({ children }: { children: ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  ),
  BarChart: ({ children }: { children: ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Line: () => null,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ReferenceLine: () => null,
}));

import { MultiPanelChart } from './MultiPanelChart';
import type { MultiPanelChartData } from '../../types';

const priceData: MultiPanelChartData = {
  title: 'EUR/USD Price',
  xAxis: {
    label: 'Time',
    data: ['12:00', '13:00', '14:00', '15:00', '16:00'],
  },
  main: {
    series: [{ name: 'Price', color: '#89b4fa', data: [1.089, 1.091, 1.093, 1.092, 1.094] }],
    yAxis: { format: 'number' },
  },
  indicators: [],
};

const priceWithIndicators: MultiPanelChartData = {
  title: 'EUR/USD with RSI',
  xAxis: {
    label: 'Time',
    data: ['12:00', '13:00', '14:00', '15:00', '16:00'],
  },
  main: {
    series: [{ name: 'Price', color: '#89b4fa', data: [1.089, 1.091, 1.093, 1.092, 1.094] }],
    yAxis: { format: 'number' },
  },
  indicators: [
    {
      title: 'RSI (14)',
      series: [{ name: 'RSI', color: '#a6e3a1', data: [55, 62, 70, 68, 72] }],
      referenceLines: [
        { y: 70, color: '#f38ba8', label: 'Overbought' },
        { y: 30, color: '#a6e3a1', label: 'Oversold' },
      ],
      yAxis: { format: 'number' },
    },
    {
      title: 'Volume',
      series: [{ name: 'Volume', color: '#cba6f7', data: [1200, 1500, 1800, 1400, 1600] }],
      type: 'bar',
      yAxis: { format: 'number' },
    },
  ],
};

describe('MultiPanelChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders main chart with title', () => {
    render(<MultiPanelChart data={priceData} />);
    expect(screen.getByText('EUR/USD Price')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders caption when provided', () => {
    render(<MultiPanelChart data={priceData} caption="Live forex data" />);
    expect(screen.getByText('Live forex data')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    const { container } = render(<MultiPanelChart data={priceData} className="my-chart" />);
    const figure = container.querySelector('figure');
    expect(figure).toHaveClass('ceres-multi-panel-chart');
    expect(figure).toHaveClass('my-chart');
  });

  it('renders indicator panels with titles', () => {
    render(<MultiPanelChart data={priceWithIndicators} />);
    expect(screen.getByText('RSI (14)')).toBeInTheDocument();
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('renders multiple chart types for indicators', () => {
    render(<MultiPanelChart data={priceWithIndicators} />);
    // Main chart + RSI (line) + Volume (bar)
    expect(screen.getAllByTestId('line-chart')).toHaveLength(2);
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});
