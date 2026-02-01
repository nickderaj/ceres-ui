import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  LineChart: ({ children }: { children: ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ReferenceLine: () => null,
  BarChart: ({ children }: { children: ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => null,
}));

import { Chart } from './Chart';

const lineChartData = {
  title: 'Revenue',
  type: 'line' as const,
  series: [{ name: 'Revenue', color: '#89b4fa', data: [100, 200, 150] }],
  xAxis: { label: 'Day', data: [1, 2, 3] },
  yAxis: { label: 'Amount', format: 'currency' as const },
};

const histogramData = {
  title: 'Distribution',
  type: 'histogram' as const,
  series: [{ name: 'Count', color: '#a6e3a1', data: [10, 20, 15, 8] }],
  bins: [0, 25, 50, 75, 100],
  xAxis: { label: 'Range' },
  yAxis: { label: 'Count' },
};

describe('Chart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders line chart with title', () => {
    render(<Chart data={lineChartData} />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('renders histogram with title', () => {
    render(<Chart data={histogramData} />);
    expect(screen.getByText('Distribution')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('renders caption when provided', () => {
    render(<Chart data={lineChartData} caption="Q1 2025" />);
    expect(screen.getByText('Q1 2025')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    const { container } = render(<Chart data={lineChartData} className="my-chart" />);
    const figure = container.querySelector('figure');
    expect(figure).toHaveClass('ceres-chart');
    expect(figure).toHaveClass('my-chart');
  });
});
