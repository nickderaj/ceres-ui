import { useState, useCallback, useMemo, useId } from 'react';
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
import type { MultiPanelChartData, IndicatorPanelData, ChartSeriesData } from '../../types';
import './MultiPanelChart.css';

export type { MultiPanelChartData, IndicatorPanelData };

export interface MultiPanelChartProps {
  data: MultiPanelChartData;
  caption?: string;
  className?: string;
}

function formatValue(value: number, format: 'currency' | 'number' | 'percent' = 'number'): string {
  switch (format) {
    case 'currency':
      return `$${value.toFixed(2)}`;
    case 'percent':
      return `${value.toFixed(2)}%`;
    case 'number':
      return value.toFixed(2);
  }
}

interface PanelTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload?: Record<string, unknown>;
  }>;
  label?: string | number;
  valueFormat?: 'currency' | 'number' | 'percent';
  panelTitle?: string;
}

function PanelTooltip({ active, payload, label, valueFormat, panelTitle }: PanelTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

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
        {label}
      </p>
      {panelTitle && (
        <p
          style={{
            color: 'var(--ceres-text-faint)',
            margin: '0 0 4px 0',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {panelTitle}
        </p>
      )}
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
          {entry.name}: {formatValue(entry.value, valueFormat)}
        </p>
      ))}
    </div>
  );
}

const SUBTEXT_COLOR = '#a6adc8';
const BORDER_COLOR = '#313244';
const SURFACE_COLOR = '#1e1e2e';

interface PanelProps {
  data: Record<string, number | string | null>[];
  series: ChartSeriesData[];
  referenceLines?: { y: number; label?: string; color: string; strokeDasharray?: string }[];
  height: number;
  syncId: string;
  showXAxis: boolean;
  xDataKey: string;
  yAxisFormat?: 'currency' | 'number' | 'percent';
  yAxisLabel?: string;
  title?: string;
  crosshairX: number | null;
  onMouseMove: (state: unknown) => void;
  onMouseLeave: () => void;
  chartType?: 'line' | 'bar';
}

function Panel({
  data,
  series,
  referenceLines,
  height,
  syncId,
  showXAxis,
  xDataKey,
  yAxisFormat = 'number',
  yAxisLabel,
  title,
  crosshairX,
  onMouseMove,
  onMouseLeave,
  chartType = 'line',
}: PanelProps) {
  const isBar = chartType === 'bar';

  return (
    <div className="ceres-multi-panel-chart__panel">
      {title && <h4 className="ceres-multi-panel-chart__panel-title">{title}</h4>}
      <ResponsiveContainer width="100%" height={height}>
        {isBar ? (
          <BarChart
            data={data}
            syncId={syncId}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            margin={{ top: 5, right: 50, left: 0, bottom: showXAxis ? 20 : 5 }}
          >
            <XAxis
              dataKey={xDataKey}
              stroke={SUBTEXT_COLOR}
              tick={showXAxis ? { fill: SUBTEXT_COLOR, fontSize: 10 } : false}
              axisLine={{ stroke: BORDER_COLOR }}
              tickLine={showXAxis ? { stroke: BORDER_COLOR } : false}
              height={showXAxis ? 30 : 0}
            />
            <YAxis
              orientation="right"
              stroke={SUBTEXT_COLOR}
              tick={{ fill: SUBTEXT_COLOR, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => formatValue(value, yAxisFormat)}
              domain={['auto', 'auto']}
              width={45}
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: 'insideRight',
                      fill: SUBTEXT_COLOR,
                      fontSize: 10,
                      offset: 10,
                    }
                  : undefined
              }
            />
            <Tooltip
              content={<PanelTooltip valueFormat={yAxisFormat} panelTitle={title} />}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            {referenceLines?.map((refLine, i) => (
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
            {series.map((s) => (
              <Bar key={s.name} dataKey={s.name} fill={s.color} fillOpacity={0.7} />
            ))}
          </BarChart>
        ) : (
          <LineChart
            data={data}
            syncId={syncId}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            margin={{ top: 5, right: 50, left: 0, bottom: showXAxis ? 20 : 5 }}
          >
            <XAxis
              dataKey={xDataKey}
              stroke={SUBTEXT_COLOR}
              tick={showXAxis ? { fill: SUBTEXT_COLOR, fontSize: 10 } : false}
              axisLine={{ stroke: BORDER_COLOR }}
              tickLine={showXAxis ? { stroke: BORDER_COLOR } : false}
              height={showXAxis ? 30 : 0}
            />
            <YAxis
              orientation="right"
              stroke={SUBTEXT_COLOR}
              tick={{ fill: SUBTEXT_COLOR, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => formatValue(value, yAxisFormat)}
              domain={['auto', 'auto']}
              width={45}
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: 'insideRight',
                      fill: SUBTEXT_COLOR,
                      fontSize: 10,
                      offset: 10,
                    }
                  : undefined
              }
            />
            <Tooltip
              content={<PanelTooltip valueFormat={yAxisFormat} panelTitle={title} />}
              cursor={false}
            />
            {crosshairX !== null && (
              <ReferenceLine
                x={crosshairX}
                stroke={SUBTEXT_COLOR}
                strokeDasharray="3 3"
                strokeOpacity={0.7}
              />
            )}
            {referenceLines?.map((refLine, i) => (
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
            {series.map((s) => (
              <Line
                key={s.name}
                type="monotone"
                dataKey={s.name}
                stroke={s.color}
                strokeWidth={1.5}
                dot={false}
                connectNulls
                activeDot={{
                  r: 4,
                  fill: s.color,
                  stroke: SURFACE_COLOR,
                  strokeWidth: 2,
                }}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export function MultiPanelChart({ data, caption, className }: MultiPanelChartProps) {
  const syncId = useId();
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

  const mainChartData = useMemo(() => {
    return (
      data.xAxis.data?.map((x, index) => {
        const point: Record<string, number | string | null> = { x };
        data.main.series.forEach((series) => {
          point[series.name] = series.data[index];
        });
        return point;
      }) || []
    );
  }, [data.xAxis.data, data.main.series]);

  const indicatorData = useMemo(() => {
    return data.indicators.map((indicator) => {
      return (
        data.xAxis.data?.map((x, index) => {
          const point: Record<string, number | string | null> = { x };
          indicator.series.forEach((series) => {
            point[series.name] = series.data[index];
          });
          return point;
        }) || []
      );
    });
  }, [data.xAxis.data, data.indicators]);

  const classNames = ['ceres-multi-panel-chart', className].filter(Boolean).join(' ');
  const hasIndicators = data.indicators.length > 0;
  const mainHeight = data.main.height ?? 300;

  return (
    <figure className={classNames}>
      <div className="ceres-multi-panel-chart__container">
        <h3 className="ceres-multi-panel-chart__title">{data.title}</h3>

        {/* Main chart - legend shown here */}
        <div className="ceres-multi-panel-chart__main">
          <ResponsiveContainer width="100%" height={mainHeight}>
            <LineChart
              data={mainChartData}
              syncId={syncId}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              margin={{ top: 5, right: 50, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="x"
                stroke={SUBTEXT_COLOR}
                tick={!hasIndicators ? { fill: SUBTEXT_COLOR, fontSize: 10 } : false}
                axisLine={{ stroke: BORDER_COLOR }}
                tickLine={!hasIndicators ? { stroke: BORDER_COLOR } : false}
                height={!hasIndicators ? 30 : 0}
              />
              <YAxis
                orientation="right"
                stroke={SUBTEXT_COLOR}
                tick={{ fill: SUBTEXT_COLOR, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatValue(value, data.main.yAxis.format ?? 'currency')}
                domain={['auto', 'auto']}
                width={45}
              />
              <Tooltip
                content={<PanelTooltip valueFormat={data.main.yAxis.format ?? 'currency'} />}
                cursor={false}
              />
              <Legend wrapperStyle={{ color: SUBTEXT_COLOR, paddingTop: 8 }} iconType="line" />
              {crosshairX !== null && (
                <ReferenceLine
                  x={crosshairX}
                  stroke={SUBTEXT_COLOR}
                  strokeDasharray="3 3"
                  strokeOpacity={0.7}
                />
              )}
              {data.main.referenceLines?.map((refLine, i) => (
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
              {data.main.series.map((series) => (
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
                    stroke: SURFACE_COLOR,
                    strokeWidth: 2,
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Indicator panels */}
        {data.indicators.map((indicator, index) => {
          const isLast = index === data.indicators.length - 1;
          return (
            <Panel
              key={indicator.title}
              data={indicatorData[index]}
              series={indicator.series}
              referenceLines={indicator.referenceLines}
              height={indicator.height ?? 120}
              syncId={syncId}
              showXAxis={isLast}
              xDataKey="x"
              yAxisFormat={indicator.yAxis?.format ?? 'number'}
              yAxisLabel={indicator.yAxis?.label}
              title={indicator.title}
              crosshairX={crosshairX}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              chartType={indicator.type}
            />
          );
        })}
      </div>
      {caption && <figcaption className="ceres-multi-panel-chart__caption">{caption}</figcaption>}
    </figure>
  );
}
