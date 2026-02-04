import { MultiPanelChart } from '@/components/MultiPanelChart';
import type { MultiPanelChartData } from '@/types';

const chartData: MultiPanelChartData = {
  title: 'EUR/USD',
  xAxis: {
    label: 'Time',
    data: [
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
    ],
  },
  main: {
    series: [
      {
        name: 'Price',
        color: '#89b4fa',
        data: [1.089, 1.091, 1.093, 1.09, 1.092, 1.094, 1.096, 1.093, 1.095, 1.097, 1.098, 1.1],
      },
    ],
    yAxis: { format: 'number' },
    height: 250,
  },
  indicators: [
    {
      title: 'RSI (14)',
      series: [
        { name: 'RSI', color: '#a6e3a1', data: [45, 52, 58, 48, 55, 62, 68, 56, 63, 70, 72, 75] },
      ],
      referenceLines: [
        { y: 70, color: '#f38ba8', label: 'Overbought' },
        { y: 30, color: '#a6e3a1', label: 'Oversold' },
      ],
      yAxis: { format: 'number' },
      height: 120,
    },
    {
      title: 'Volume',
      series: [
        {
          name: 'Volume',
          color: '#cba6f7',
          data: [1200, 1500, 1800, 1100, 1400, 1700, 2100, 1300, 1600, 1900, 2200, 2500],
        },
      ],
      type: 'bar',
      yAxis: { format: 'number' },
      height: 100,
    },
  ],
};

export function MultiPanelChartPage() {
  return (
    <div data-testid="multipanelchart-page" style={{ padding: 24, width: 720 }}>
      <MultiPanelChart data={chartData} caption="EUR/USD with RSI and Volume indicators" />
    </div>
  );
}
