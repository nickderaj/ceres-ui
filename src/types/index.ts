/* ── Post types ──────────────────────────────────────────────── */

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

/* ── Table types ─────────────────────────────────────────────── */

export interface TableData {
  columns: string[];
  data: string[][];
}

export interface FigureData {
  src: string;
  alt?: string;
  caption?: string;
}

/* ── Chart types ─────────────────────────────────────────────── */

export interface ChartSeriesData {
  name: string;
  color: string;
  data: (number | null)[];
}

export interface ChartReferenceLineData {
  y: number;
  label?: string;
  color: string;
  strokeDasharray?: string;
}

export interface ChartData {
  title: string;
  type?: 'line' | 'histogram';
  series: ChartSeriesData[];
  bins?: number[];
  referenceLines?: ChartReferenceLineData[];
  xAxis: {
    label: string;
    data?: (number | string)[];
  };
  yAxis: {
    label: string;
    format?: 'currency' | 'number' | 'percent';
  };
}

/* ── Callout types ───────────────────────────────────────────── */

export type CalloutVariant = 'note' | 'important' | 'critical' | 'tip' | 'warning' | 'info' | 'wip';

/* ── Table of Contents types ─────────────────────────────────── */

export interface TableOfContentsItem {
  text: string;
  href: string;
}

/* ── Badge types ─────────────────────────────────────────────── */

export type BadgeVariant = 'success' | 'danger' | 'neutral';
export type BadgeSize = 'sm' | 'md';
