/* ── Styles (must be imported by consumers) ──────────────────── */
import './styles/tokens.css';
import './styles/base.css';

/* ── Components ──────────────────────────────────────────────── */
export { Callout } from './components/Callout';
export { CodeBlock } from './components/CodeBlock';
export { TableOfContents } from './components/TableOfContents';
export { PostCard } from './components/PostCard';
export { DataTable } from './components/DataTable';
export { Chart } from './components/Chart';
export { MultiPanelChart } from './components/MultiPanelChart';
export { BackToTopButton } from './components/BackToTopButton';
export { StarField } from './components/StarField';
export { Badge } from './components/Badge';
export { PdfDownloadButton } from './components/PdfDownloadButton';
export { MarkdownRenderer } from './components/MarkdownRenderer';
export { generateHeadingId, getTextFromChildren } from './components/MarkdownRenderer';

/* ── Syntax theme ────────────────────────────────────────────── */
export { catppuccinMocha } from './styles/catppuccin-mocha';

/* ── Component prop types ────────────────────────────────────── */
export type { CalloutProps, CalloutVariant } from './components/Callout';
export type { CodeBlockProps } from './components/CodeBlock';
export type { TableOfContentsProps, TableOfContentsItem } from './components/TableOfContents';
export type { PostCardProps } from './components/PostCard';
export type { DataTableProps } from './components/DataTable';
export type {
  ChartProps,
  ChartData,
  ChartSeriesData,
  ChartReferenceLineData,
} from './components/Chart';
export type {
  MultiPanelChartProps,
  MultiPanelChartData,
  IndicatorPanelData,
} from './components/MultiPanelChart';
export type { BackToTopButtonProps } from './components/BackToTopButton';
export type { StarFieldProps } from './components/StarField';
export type { BadgeProps } from './components/Badge';
export type { PdfDownloadButtonProps } from './components/PdfDownloadButton';
export type { MarkdownRendererProps } from './components/MarkdownRenderer';

/* ── Data model types ────────────────────────────────────────── */
export type {
  Post,
  PostFrontmatter,
  TableData,
  FigureData,
  BadgeVariant,
  BadgeSize,
} from './types';
