# ceres-ui

A React component library intended for blog creation. Ships with light & dark themes, plain CSS with overridable custom properties.

## Installation

```bash
npm install ceres-ui
# or
pnpm add ceres-ui
```

### Peer Dependencies

React and ReactDOM are required. Everything else is optional depending on which components you use:

| Peer dependency            | Required by                           | Min version |
| -------------------------- | ------------------------------------- | ----------- |
| `react`                    | all                                   | 18.0.0      |
| `react-dom`                | all                                   | 18.0.0      |
| `react-syntax-highlighter` | `CodeBlock`, `MarkdownRenderer`       | 15.0.0      |
| `react-markdown`           | `MarkdownRenderer`                    | 10.0.0      |
| `remark-gfm`               | `MarkdownRenderer`                    | 4.0.0       |
| `remark-math`              | `MarkdownRenderer` (math blocks)      | 6.0.0       |
| `rehype-raw`               | `MarkdownRenderer` (custom HTML tags) | 7.0.0       |
| `rehype-katex`             | `MarkdownRenderer` (math rendering)   | 7.0.0       |
| `katex`                    | `MarkdownRenderer` (math rendering)   | 0.16.0      |
| `recharts`                 | `Chart`                               | 2.0.0       |

Install only what you need:

```bash
# Only using Callout + Badge + DataTable (no extra deps)
pnpm add ceres-ui

# Using CodeBlock
pnpm add ceres-ui react-syntax-highlighter

# Using MarkdownRenderer (full)
pnpm add ceres-ui react-markdown react-syntax-highlighter remark-gfm remark-math rehype-raw rehype-katex katex

# Using Chart
pnpm add ceres-ui recharts
```

---

## Quick Start

```tsx
import { Callout, Badge, CodeBlock } from 'ceres-ui';
import 'ceres-ui/css';

function App() {
  return (
    <html data-theme="dark">
      <body>
        <div className="ceres-root">
          <Callout variant="tip" title="Hello">
            Welcome to ceres-ui.
          </Callout>

          <Badge label="Published" variant="success" />

          <CodeBlock language="typescript">{`const greeting: string = "Hello, world!";`}</CodeBlock>
        </div>
      </body>
    </html>
  );
}
```

### Setup Checklist

1. **Import CSS** &mdash; add `import 'ceres-ui/css'` once in your entry point.
2. **Set theme** &mdash; add `data-theme="dark"` or `data-theme="light"` to your `<html>` element. Dark is the default.
3. **Wrap in `.ceres-root`** &mdash; the root class enables themed scrollbars. Apply it to your outermost container.
4. **(Optional) Override fonts** &mdash; set `--ceres-font-heading` on `:root` to use a custom heading font across all components.

```css
/* In your app's global CSS */
:root {
  --ceres-font-heading: 'Inter', system-ui, sans-serif;
}
```

---

## Theming

ceres-ui ships with two themes built from the [Catppuccin](https://catppuccin.com) palette:

| Theme          | Attribute            | Palette          |
| -------------- | -------------------- | ---------------- |
| Dark (default) | `data-theme="dark"`  | Catppuccin Mocha |
| Light          | `data-theme="light"` | Catppuccin Latte |

Switch themes by changing the `data-theme` attribute on `<html>`:

```ts
document.documentElement.setAttribute('data-theme', 'light');
```

### Overriding Design Tokens

Every color, font, radius, and shadow is a CSS custom property. Override any of them:

```css
:root {
  /* Custom heading font */
  --ceres-font-heading: 'Playfair Display', serif;

  /* Adjust the primary accent */
  --ceres-blue: #6366f1;
  --ceres-blue-hover: #818cf8;

  /* Change surface colors */
  --ceres-surface: #1a1a2e;
}
```

### Full Token Reference

<details>
<summary>Background & Surface</summary>

| Token             | Dark (Mocha) | Light (Latte) |
| ----------------- | ------------ | ------------- |
| `--ceres-bg-main` | `#0a0a0a`    | `#eff1f5`     |
| `--ceres-bg-post` | `#1a1a1a`    | `#e6e9ef`     |
| `--ceres-surface` | `#1e1e2e`    | `#ccd0da`     |

</details>

<details>
<summary>Borders</summary>

| Token                   | Dark (Mocha) | Light (Latte) |
| ----------------------- | ------------ | ------------- |
| `--ceres-border`        | `#313244`    | `#bcc0cc`     |
| `--ceres-border-subtle` | `#2a2a2a`    | `#ccd0da`     |
| `--ceres-border-hover`  | `#3a3a3a`    | `#acb0be`     |
| `--ceres-border-strong` | `#4a4a4a`    | `#9ca0b0`     |

</details>

<details>
<summary>Text</summary>

| Token                      | Dark (Mocha) | Light (Latte) |
| -------------------------- | ------------ | ------------- |
| `--ceres-text-primary`     | `#f5f5f0`    | `#4c4f69`     |
| `--ceres-text-body`        | `#cdd6f4`    | `#5c5f77`     |
| `--ceres-text-muted`       | `#a6adc8`    | `#6c6f85`     |
| `--ceres-text-faint`       | `#6c7086`    | `#8c8fa1`     |
| `--ceres-text-dim`         | `#585b70`    | `#9ca0b0`     |
| `--ceres-text-description` | `#a0a0a0`    | `#6c6f85`     |

</details>

<details>
<summary>Accent Colors</summary>

| Token                | Dark (Mocha) | Light (Latte) |
| -------------------- | ------------ | ------------- |
| `--ceres-blue`       | `#89b4fa`    | `#1e66f5`     |
| `--ceres-blue-hover` | `#b4befe`    | `#7287fd`     |
| `--ceres-green`      | `#a6e3a1`    | `#40a02b`     |
| `--ceres-red`        | `#f38ba8`    | `#d20f39`     |
| `--ceres-yellow`     | `#f9e2af`    | `#df8e1d`     |
| `--ceres-peach`      | `#fab387`    | `#fe640b`     |
| `--ceres-purple`     | `#cba6f7`    | `#8839ef`     |
| `--ceres-teal`       | `#94e2d5`    | `#179299`     |
| `--ceres-cyan`       | `#89dceb`    | `#04a5e5`     |
| `--ceres-pink`       | `#f5c2e7`    | `#ea76cb`     |

</details>

<details>
<summary>Typography</summary>

| Token                  | Default                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| `--ceres-font-heading` | `system-ui, -apple-system, sans-serif`                             |
| `--ceres-font-body`    | `system-ui, -apple-system, sans-serif`                             |
| `--ceres-font-mono`    | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |

</details>

<details>
<summary>Spacing & Shadows</summary>

| Token                 | Value                         |
| --------------------- | ----------------------------- |
| `--ceres-radius-sm`   | `4px`                         |
| `--ceres-radius-md`   | `8px`                         |
| `--ceres-radius-lg`   | `12px`                        |
| `--ceres-radius-full` | `9999px`                      |
| `--ceres-shadow-sm`   | `0 1px 2px rgba(0,0,0,0.3)`   |
| `--ceres-shadow-md`   | `0 4px 12px rgba(0,0,0,0.3)`  |
| `--ceres-shadow-lg`   | `0 10px 25px rgba(0,0,0,0.4)` |

</details>

---

## Components

### Callout

Alert boxes with 7 built-in variants.

```tsx
import { Callout } from 'ceres-ui';

<Callout variant="warning" title="Heads up">
  This API is deprecated and will be removed in v3.
</Callout>

<Callout variant="tip">
  <ul>
    <li>Block-level children get a two-line layout</li>
    <li>Inline children share a line with the title</li>
  </ul>
</Callout>
```

| Prop        | Type                                                                           | Default              | Description                    |
| ----------- | ------------------------------------------------------------------------------ | -------------------- | ------------------------------ |
| `variant`   | `'note' \| 'important' \| 'critical' \| 'tip' \| 'warning' \| 'info' \| 'wip'` | `'note'`             | Visual style and default title |
| `title`     | `string`                                                                       | Derived from variant | Override the title text        |
| `children`  | `ReactNode`                                                                    | **required**         | Callout body                   |
| `className` | `string`                                                                       | &mdash;              | Additional CSS class           |

**Default titles**: Note, Important, CRITICAL, Tip, Warning, Info, Work in Progress.

**Layout behavior**: when `children` contain block-level elements (`<ul>`, `<ol>`, `<p>`, `<div>`, headings), the title renders on its own line. Otherwise, title and content share a single line.

---

### CodeBlock

Syntax-highlighted code with the Catppuccin Mocha Prism theme.

```tsx
import { CodeBlock } from 'ceres-ui';

<CodeBlock language="python">
  {`def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`}
</CodeBlock>;
```

| Prop        | Type     | Default      | Description                                                     |
| ----------- | -------- | ------------ | --------------------------------------------------------------- |
| `language`  | `string` | &mdash;      | Prism language identifier (e.g. `typescript`, `python`, `bash`) |
| `children`  | `string` | **required** | Code content (leading/trailing whitespace trimmed)              |
| `className` | `string` | &mdash;      | Additional CSS class                                            |

**Requires**: `react-syntax-highlighter` peer dependency.

The font uses `--ceres-font-mono` and scales responsively via `clamp(0.75rem, 2.5vw, 0.875rem)`.

---

### TableOfContents

Navigation component for page sections. Accepts either structured items or raw children.

```tsx
import { TableOfContents } from 'ceres-ui';

// Structured items
<TableOfContents
  items={[
    { text: 'Introduction', href: '#introduction' },
    { text: 'Getting Started', href: '#getting-started' },
    { text: 'API Reference', href: '#api-reference' },
  ]}
/>

// Or with raw children
<TableOfContents>
  <li><a href="#intro">Introduction</a></li>
  <li><a href="#setup">Setup</a></li>
</TableOfContents>
```

| Prop        | Type                    | Default | Description                                               |
| ----------- | ----------------------- | ------- | --------------------------------------------------------- |
| `items`     | `TableOfContentsItem[]` | &mdash; | Array of `{ text, href }` objects                         |
| `children`  | `ReactNode`             | &mdash; | Raw `<li>` elements (used instead of `items` if provided) |
| `className` | `string`                | &mdash; | Additional CSS class                                      |

---

### PostCard

Clickable card for post previews. Uses a plain `<a>` tag &mdash; no router dependency.

```tsx
import { PostCard } from 'ceres-ui';

<PostCard
  title="Understanding Moving Averages"
  date="2025-01-15"
  description="A deep dive into SMA, EMA, and MACD crossover strategies."
  tags={['finance', 'technical-analysis']}
  href="/blog/moving-averages"
  onClick={(e) => {
    e.preventDefault();
    router.push('/blog/moving-averages');
  }}
/>;
```

| Prop          | Type                      | Default      | Description                                                           |
| ------------- | ------------------------- | ------------ | --------------------------------------------------------------------- |
| `title`       | `string`                  | **required** | Post title                                                            |
| `date`        | `string`                  | **required** | ISO date string, formatted as "Month Day, Year"                       |
| `description` | `string`                  | **required** | Clamped to 2 lines                                                    |
| `tags`        | `string[]`                | &mdash;      | Rendered as purple pills                                              |
| `href`        | `string`                  | **required** | Link target                                                           |
| `onClick`     | `(e: MouseEvent) => void` | &mdash;      | Click handler (use with `e.preventDefault()` for client-side routing) |
| `className`   | `string`                  | &mdash;      | Additional CSS class                                                  |

**Router integration**: since PostCard renders a plain `<a>`, integrate with any router by calling `e.preventDefault()` in `onClick` and navigating programmatically.

---

### DataTable

Renders tabular data with themed styling and responsive horizontal scroll.

```tsx
import { DataTable } from 'ceres-ui';

<DataTable
  data={{
    columns: ['Asset', 'Price', 'Change'],
    data: [
      ['Gold', '$2,045.30', '+1.2%'],
      ['Silver', '$23.15', '-0.8%'],
    ],
  }}
/>;
```

| Prop        | Type        | Default      | Description                               |
| ----------- | ----------- | ------------ | ----------------------------------------- |
| `data`      | `TableData` | **required** | `{ columns: string[], data: string[][] }` |
| `className` | `string`    | &mdash;      | Additional CSS class                      |

---

### Chart

Line charts and histograms powered by Recharts.

```tsx
import { Chart } from 'ceres-ui';

<Chart
  data={{
    title: 'Gold Price (2024)',
    type: 'line',
    series: [
      { name: 'Price', color: '#89b4fa', data: [1950, 1980, 2010, 2045, 2030] },
      { name: 'SMA 20', color: '#a6e3a1', data: [null, null, 1980, 1995, 2028] },
    ],
    xAxis: { label: 'Date', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
    yAxis: { label: 'Price', format: 'currency' },
    referenceLines: [{ y: 2000, label: 'Support', color: '#a6e3a1', strokeDasharray: '6 3' }],
  }}
  caption="Gold spot price with 20-day SMA"
  height={400}
/>;
```

| Prop        | Type        | Default      | Description                     |
| ----------- | ----------- | ------------ | ------------------------------- |
| `data`      | `ChartData` | **required** | Chart configuration (see below) |
| `caption`   | `string`    | &mdash;      | Caption below the chart         |
| `height`    | `number`    | `350`        | Chart height in pixels          |
| `className` | `string`    | &mdash;      | Additional CSS class            |

**ChartData shape**:

```ts
interface ChartData {
  title: string;
  type?: 'line' | 'histogram'; // default: 'line'
  series: ChartSeriesData[]; // { name, color, data: (number | null)[] }
  bins?: number[]; // x-axis bins for histograms
  referenceLines?: ChartReferenceLineData[];
  xAxis: { label: string; data?: (number | string)[] };
  yAxis: { label: string; format?: 'currency' | 'number' | 'percent' };
}
```

**Requires**: `recharts` peer dependency.

---

### Badge

Inline status indicator with three semantic variants.

```tsx
import { Badge } from 'ceres-ui';

<Badge label="Buy" variant="success" />
<Badge label="Sell" variant="danger" bordered />
<Badge label="Neutral" variant="neutral" size="md" />
```

| Prop        | Type                                 | Default      | Description                                  |
| ----------- | ------------------------------------ | ------------ | -------------------------------------------- |
| `label`     | `string`                             | **required** | Badge text                                   |
| `variant`   | `'success' \| 'danger' \| 'neutral'` | `'neutral'`  | Color scheme                                 |
| `size`      | `'sm' \| 'md'`                       | `'sm'`       | Padding and font size                        |
| `bordered`  | `boolean`                            | `false`      | Adds a 1px border matching the variant color |
| `className` | `string`                             | &mdash;      | Additional CSS class                         |

---

### BackToTopButton

Fixed-position scroll-to-top button. Desktop only (hidden below 1024px).

```tsx
import { BackToTopButton } from 'ceres-ui';

// Automatic: shows after scrolling 400px
<BackToTopButton />

// Manual control
<BackToTopButton visible={showButton} scrollThreshold={600} />
```

| Prop              | Type      | Default | Description                                                                      |
| ----------------- | --------- | ------- | -------------------------------------------------------------------------------- |
| `visible`         | `boolean` | &mdash; | Override automatic visibility. When omitted, auto-shows based on scroll position |
| `scrollThreshold` | `number`  | `400`   | Pixels scrolled before auto-showing                                              |
| `className`       | `string`  | &mdash; | Additional CSS class                                                             |

Clears the URL hash (if any) when scrolling to top.

---

### StarField

Animated starry background overlay. Non-interactive (pointer-events disabled).

```tsx
import { StarField } from 'ceres-ui';

<StarField starCount={200} />;
```

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `starCount` | `number` | `150`   | Number of stars. Halved on mobile (< 640px) |
| `className` | `string` | &mdash; | Additional CSS class                        |

Renders as a fixed full-viewport overlay at `z-index: 1`. Place your content above it with a higher z-index.

---

### PdfDownloadButton

Opens the browser's print dialog targeting a specific element, enabling save-as-PDF.

```tsx
import { useRef } from 'react';
import { PdfDownloadButton } from 'ceres-ui';

function Article() {
  const articleRef = useRef<HTMLElement>(null);

  return (
    <>
      <PdfDownloadButton contentRef={articleRef} filename="my-article" />
      <article ref={articleRef}>
        <h1>Article Title</h1>
        <p>Content here...</p>
      </article>
    </>
  );
}
```

| Prop         | Type                             | Default      | Description                                                       |
| ------------ | -------------------------------- | ------------ | ----------------------------------------------------------------- |
| `contentRef` | `RefObject<HTMLElement \| null>` | **required** | Ref to the element whose HTML is printed                          |
| `filename`   | `string`                         | **required** | Used as the print window title (becomes the default PDF filename) |
| `className`  | `string`                         | &mdash;      | Additional CSS class                                              |

Copies all page stylesheets into the print window. Applies print-specific rules: A4 page, exact color reproduction, and page-break avoidance inside code blocks, tables, and figures.

---

### MarkdownRenderer

Full-featured markdown renderer that composes all the above components. Supports GFM, math (KaTeX), syntax highlighting, and custom HTML tags.

```tsx
import { MarkdownRenderer } from 'ceres-ui';

const markdown = `
# Hello World

Some paragraph with **bold** and \`inline code\`.

\`\`\`typescript
const x: number = 42;
\`\`\`

<callout variant="tip" title="Pro tip">
  Use MarkdownRenderer for blog posts.
</callout>

<table-of-contents>
  <li><a href="#hello-world">Hello World</a></li>
</table-of-contents>
`;

<MarkdownRenderer content={markdown} />;
```

| Prop         | Type                  | Default      | Description                                           |
| ------------ | --------------------- | ------------ | ----------------------------------------------------- |
| `content`    | `string`              | **required** | Raw markdown string                                   |
| `components` | `Partial<Components>` | &mdash;      | Override or extend component mappings for custom tags |
| `className`  | `string`              | &mdash;      | Additional CSS class                                  |

**Built-in markdown plugins**: `remark-gfm`, `remark-math`, `rehype-raw`, `rehype-katex`.

**Custom HTML tags recognized**:

| Tag                   | Renders           | Example                                                  |
| --------------------- | ----------------- | -------------------------------------------------------- |
| `<callout>`           | `Callout`         | `<callout variant="warning" title="Oops">Body</callout>` |
| `<table-of-contents>` | `TableOfContents` | `<table-of-contents><li>...</li></table-of-contents>`    |

**Extending with custom components**:

```tsx
function MyWidget(props: { src: string }) {
  return <div>Custom: {props.src}</div>;
}

<MarkdownRenderer
  content={markdownWithCustomTags}
  components={{
    'my-widget': MyWidget as any,
  }}
/>;
```

**Exported utilities**:

```ts
import { generateHeadingId, getTextFromChildren } from 'ceres-ui';

generateHeadingId('Hello World!');
// → 'hello-world'

getTextFromChildren(<span>Hello <strong>World</strong></span>);
// → 'Hello World'
```

**Requires**: `react-markdown`, `react-syntax-highlighter`, `remark-gfm`, `rehype-raw`. Optionally `remark-math`, `rehype-katex`, `katex` for math support.

---

## Exported Types

All types are exported as interfaces for extension:

```ts
import type {
  // Component props
  CalloutProps,
  CodeBlockProps,
  TableOfContentsProps,
  TableOfContentsItem,
  PostCardProps,
  DataTableProps,
  ChartProps,
  ChartData,
  ChartSeriesData,
  ChartReferenceLineData,
  BackToTopButtonProps,
  StarFieldProps,
  BadgeProps,
  PdfDownloadButtonProps,
  MarkdownRendererProps,

  // Data models
  Post,
  PostFrontmatter,
  TableData,
  FigureData,

  // Variant types
  CalloutVariant,
  BadgeVariant,
  BadgeSize,
} from 'ceres-ui';
```

---

## Development

### Commands

```bash
pnpm dev          # Vite dev server (for development)
pnpm build        # TypeScript check + Vite library build
pnpm typecheck    # tsc -b (type checking only)
pnpm test         # Vitest (single run)
pnpm test:watch   # Vitest (watch mode)
```

### Build Output

```
dist/
  ceres-ui.es.js     ESM bundle   (~23 KB, ~6 KB gzip)
  ceres-ui.cjs.js    CJS bundle   (~15 KB, ~5 KB gzip)
  ceres-ui.css       Styles       (~17 KB, ~3.5 KB gzip)
  index.d.ts         Declarations (~5 KB)
```

Heavy dependencies (recharts, react-markdown, react-syntax-highlighter, katex) are **not bundled** &mdash; they're external peer dependencies. The library's own bundle is lightweight.

### Testing

51 tests across 10 test files covering all components:

- Component rendering and prop behavior
- Variant/size class application
- CSS class merging via `className` prop
- Heading ID generation and text extraction utilities
- Accessibility attributes

### Auto-Versioning

A pre-commit hook (`scripts/auto-version.mjs`) automatically bumps the minor version on each commit **unless** the version in `package.json` was manually changed.

```
commit with version 0.1.0 (unchanged)  →  auto-bumps to 0.2.0
commit with version 1.0.0 (manually set)  →  keeps 1.0.0
```

To manually set a version (e.g. for a major release), change the `version` field in `package.json` before committing. The hook detects the manual change and skips auto-bumping.

### Publishing to npm

Build and publish:

```bash
pnpm build
npm publish
```

Or via GitHub Actions &mdash; push a version tag to trigger a release workflow:

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## CSS Class Reference

All classes use a `ceres-` prefix with BEM naming to avoid collisions. Every class can be targeted in consumer stylesheets for overrides.

| Component         | Root class           | Key modifiers                                                                  |
| ----------------- | -------------------- | ------------------------------------------------------------------------------ |
| Callout           | `.ceres-callout`     | `--note`, `--important`, `--critical`, `--tip`, `--warning`, `--info`, `--wip` |
| CodeBlock         | `.ceres-code-block`  | &mdash;                                                                        |
| Inline code       | `.ceres-code-inline` | &mdash;                                                                        |
| TableOfContents   | `.ceres-toc`         | &mdash;                                                                        |
| PostCard          | `.ceres-post-card`   | &mdash;                                                                        |
| DataTable         | `.ceres-data-table`  | &mdash;                                                                        |
| Chart             | `.ceres-chart`       | &mdash;                                                                        |
| BackToTopButton   | `.ceres-back-to-top` | &mdash;                                                                        |
| StarField         | `.ceres-star-field`  | &mdash;                                                                        |
| Badge             | `.ceres-badge`       | `--success`, `--danger`, `--neutral`, `--sm`, `--md`, `--bordered`             |
| PdfDownloadButton | `.ceres-pdf-button`  | &mdash;                                                                        |
| MarkdownRenderer  | `.ceres-markdown`    | &mdash;                                                                        |
| Root scroller     | `.ceres-root`        | &mdash;                                                                        |
