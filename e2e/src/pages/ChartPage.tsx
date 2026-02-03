import { Chart } from '@/components/Chart';
import type { ChartData } from '@/types';

const chartData: ChartData = {
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
  yAxis: {
    label: 'Amount',
    format: 'currency',
  },
};

export function ChartPage() {
  return (
    <div data-testid="chart-page" style={{ padding: 24, width: 720 }}>
      <Chart data={chartData} caption="Revenue vs. expenses over time" />
    </div>
  );
}
