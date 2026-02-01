import { useState, useCallback, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
} from 'recharts';
import type { ChartData, ChartSeriesData, ChartReferenceLineData } from '../../types';
import './Chart.css';

export type { ChartSeriesData, ChartReferenceLineData, ChartData };

export interface ChartProps {
  data: ChartData;
  caption?: string;
  height?: number;
  className?: string;
}

function formatValue(
  value: number,
  format: 'currency' | 'number' | 'percent' = 'currency',
): string {
  switch (format) {
    case 'currency':
      return `$${value.toFixed(2)}`;
    case 'percent':
      return `${value.toFixed(2)}%`;
    case 'number':
      return value.toFixed(2);
  }
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string | number;
  chartType?: 'line' | 'histogram';
  bins?: number[];
  valueFormat?: 'currency' | 'number' | 'percent';
  xAxisData?: (number | string)[];
}

function ChartTooltip({
  active,
  payload,
  label,
  chartType,
  bins,
  valueFormat,
  xAxisData,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  let xLabel: string;
  if (chartType === 'histogram' && bins) {
    xLabel = `${bins[Number(label)].toFixed(1)}% to ${bins[Number(label) + 1].toFixed(1)}%`;
  } else if (xAxisData && typeof xAxisData[0] === 'string') {
    xLabel = String(label);
  } else {
    xLabel = `Day ${label}`;
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--ceres-surface)',
        border: '1px solid var(--ceres-border)',
        borderRadius: '6px',
        padding: '10px 14px',
        boxShadow: 'var(--ceres-shadow-md)',
      }}
    >
      <p style={{ color: 'var(--ceres-text-muted)', margin: '0 0 6px 0', fontSize: '12px' }}>
        {xLabel}
      </p>
      {payload.map((entry, index) => (
        <p
          key={index}
          style={{
            color: entry.color,
            margin: '2px 0',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          {entry.name}:{' '}
          {chartType === 'histogram' ? entry.value : formatValue(entry.value, valueFormat)}
        </p>
      ))}
    </div>
  );
}

export function Chart({ data, caption, height = 350, className }: ChartProps) {
  const [crosshairX, setCrosshairX] = useState<number | null>(null);

  const handleMouseMove = useCallback((state: unknown) => {
    const s = state as { activeTooltipIndex?: number | string | null };
    if (typeof s?.activeTooltipIndex === 'number') {
      setCrosshairX(s.activeTooltipIndex);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCrosshairX(null);
  }, []);

  const isHistogram = data.type === 'histogram';
  const valueFormat = data.yAxis.format ?? 'currency';

  const transformedData = useMemo(() => {
    if (isHistogram) {
      return data.series[0].data.map((_, index) => {
        const point: Record<string, number | null> = { index };
        data.series.forEach((series) => {
          point[series.name] = series.data[index];
        });
        return point;
      });
    }
    return (
      data.xAxis.data?.map((x, index) => {
        const point: Record<string, number | string | null> = { day: x };
        data.series.forEach((series) => {
          point[series.name] = series.data[index];
        });
        return point;
      }) || []
    );
  }, [data, isHistogram]);

  const xDataKey = isHistogram ? 'index' : 'day';
  const classNames = ['ceres-chart', className].filter(Boolean).join(' ');

  /* Chart colors reference CSS custom properties at definition time.
     Because Recharts uses inline SVG attributes (stroke, fill) that don't
     resolve CSS vars in all browsers, we read the computed values once. */
  const surfaceColor = '#1e1e2e';
  const subtextColor = '#a6adc8';
  const borderColor = '#313244';

  return (
    <figure className={classNames}>
      <div className="ceres-chart__container">
        <h3 className="ceres-chart__title">{data.title}</h3>
        <ResponsiveContainer width="100%" height={height}>
          {isHistogram ? (
            <BarChart
              data={transformedData}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              barCategoryGap="0%"
            >
              <XAxis
                dataKey={xDataKey}
                stroke={subtextColor}
                tick={{ fill: subtextColor, fontSize: 10 }}
                tickFormatter={(value) =>
                  data.bins ? `${data.bins[value]?.toFixed(0)}%` : value
                }
                interval={4}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
                label={{
                  value: data.xAxis.label,
                  position: 'insideBottom',
                  offset: -5,
                  fill: subtextColor,
                  fontSize: 12,
                }}
              />
              <YAxis
                stroke={subtextColor}
                tick={{ fill: subtextColor, fontSize: 10 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
                label={{
                  value: data.yAxis.label,
                  angle: -90,
                  position: 'insideLeft',
                  fill: subtextColor,
                  fontSize: 12,
                }}
              />
              <Tooltip
                content={<ChartTooltip chartType="histogram" bins={data.bins} />}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Legend wrapperStyle={{ color: subtextColor }} iconType="square" />
              {data.series.map((series) => (
                <Bar
                  key={series.name}
                  dataKey={series.name}
                  fill={series.color}
                  fillOpacity={0.6}
                  stroke={borderColor}
                  strokeWidth={0.5}
                />
              ))}
            </BarChart>
          ) : (
            <LineChart
              data={transformedData}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <XAxis
                dataKey={xDataKey}
                stroke={subtextColor}
                tick={{ fill: subtextColor, fontSize: 10 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <YAxis
                orientation="right"
                stroke={subtextColor}
                tick={{ fill: subtextColor, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatValue(value, valueFormat)}
                domain={['auto', 'auto']}
              />
              <Tooltip
                content={
                  <ChartTooltip
                    chartType="line"
                    valueFormat={valueFormat}
                    xAxisData={data.xAxis.data}
                  />
                }
                cursor={false}
              />
              <Legend wrapperStyle={{ color: subtextColor }} iconType="line" />
              {crosshairX !== null && (
                <ReferenceLine
                  x={crosshairX}
                  stroke={subtextColor}
                  strokeDasharray="3 3"
                  strokeOpacity={0.7}
                />
              )}
              {data.referenceLines?.map((refLine, i) => (
                <ReferenceLine
                  key={`ref-${i}`}
                  y={refLine.y}
                  stroke={refLine.color}
                  strokeDasharray={refLine.strokeDasharray ?? '6 3'}
                  strokeOpacity={0.7}
                  label={
                    refLine.label
                      ? {
                          value: refLine.label,
                          fill: refLine.color,
                          fontSize: 10,
                          position: 'right',
                        }
                      : undefined
                  }
                />
              ))}
              {data.series.map((series) => (
                <Line
                  key={series.name}
                  type="monotone"
                  dataKey={series.name}
                  stroke={series.color}
                  strokeWidth={1.5}
                  dot={false}
                  connectNulls
                  activeDot={{
                    r: 5,
                    fill: series.color,
                    stroke: surfaceColor,
                    strokeWidth: 2,
                  }}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      {caption && <figcaption className="ceres-chart__caption">{caption}</figcaption>}
    </figure>
  );
}
