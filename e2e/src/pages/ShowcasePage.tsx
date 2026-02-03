import { useRef } from 'react';
import { Badge } from '@/components/Badge';
import { Callout } from '@/components/Callout';
import { CodeBlock } from '@/components/CodeBlock';
import { DataTable } from '@/components/DataTable';
import { Chart } from '@/components/Chart';
import { PostCard } from '@/components/PostCard';
import { BackToTopButton } from '@/components/BackToTopButton';
import { StarField } from '@/components/StarField';
import { TableOfContents } from '@/components/TableOfContents';
import { PdfDownloadButton } from '@/components/PdfDownloadButton';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import type { ChartData } from '@/types';

const chartData: ChartData = {
  title: 'Sample Chart',
  type: 'line',
  series: [{ name: 'Series A', color: '#89b4fa', data: [10, 25, 18, 30, 22, 35] }],
  xAxis: { label: 'X', data: ['A', 'B', 'C', 'D', 'E', 'F'] },
  yAxis: { label: 'Y', format: 'number' },
};

const sectionStyle: React.CSSProperties = {
  padding: 24,
  borderBottom: '1px solid var(--ceres-border)',
};

export function ShowcasePage() {
  const pdfRef = useRef<HTMLDivElement>(null);

  return (
    <div data-testid="showcase-page">
      <section data-testid="showcase-badge" style={sectionStyle}>
        <h2>Badge</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Badge label="Neutral" variant="neutral" />
          <Badge label="Success" variant="success" />
          <Badge label="Danger" variant="danger" />
          <Badge label="Bordered" variant="neutral" bordered />
        </div>
      </section>

      <section data-testid="showcase-callout" style={sectionStyle}>
        <h2>Callout</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 600 }}>
          <Callout variant="note">A note callout.</Callout>
          <Callout variant="tip">A tip callout.</Callout>
          <Callout variant="warning">A warning callout.</Callout>
        </div>
      </section>

      <section data-testid="showcase-codeblock" style={sectionStyle}>
        <h2>CodeBlock</h2>
        <div style={{ maxWidth: 600 }}>
          <CodeBlock language="typescript">{'const x: number = 42;'}</CodeBlock>
        </div>
      </section>

      <section data-testid="showcase-datatable" style={sectionStyle}>
        <h2>DataTable</h2>
        <div style={{ maxWidth: 500 }}>
          <DataTable
            data={{
              columns: ['Name', 'Value'],
              data: [
                ['Alpha', '1'],
                ['Beta', '2'],
              ],
            }}
          />
        </div>
      </section>

      <section data-testid="showcase-chart" style={sectionStyle}>
        <h2>Chart</h2>
        <div style={{ width: 500 }}>
          <Chart data={chartData} height={250} />
        </div>
      </section>

      <section data-testid="showcase-postcard" style={sectionStyle}>
        <h2>PostCard</h2>
        <div style={{ maxWidth: 500 }}>
          <PostCard
            title="Sample Post"
            date="2025-03-01"
            description="A short description of this post."
            tags={['react', 'ui']}
            href="#"
            onClick={(e) => e.preventDefault()}
          />
        </div>
      </section>

      <section data-testid="showcase-backtotop" style={sectionStyle}>
        <h2>BackToTopButton</h2>
        <BackToTopButton visible={true} />
      </section>

      <section
        data-testid="showcase-starfield"
        style={{ ...sectionStyle, position: 'relative', height: 200, overflow: 'hidden' }}
      >
        <h2>StarField</h2>
        <StarField starCount={30} />
      </section>

      <section data-testid="showcase-toc" style={sectionStyle}>
        <h2>TableOfContents</h2>
        <div style={{ maxWidth: 300 }}>
          <TableOfContents
            items={[
              { text: 'Section One', href: '#one' },
              { text: 'Section Two', href: '#two' },
              { text: 'Section Three', href: '#three' },
            ]}
          />
        </div>
      </section>

      <section data-testid="showcase-pdfdownload" style={sectionStyle}>
        <h2>PdfDownloadButton</h2>
        <div ref={pdfRef}>
          <p>PDF content area.</p>
        </div>
        <PdfDownloadButton contentRef={pdfRef} filename="showcase.pdf" />
      </section>

      <section data-testid="showcase-markdown" style={sectionStyle}>
        <h2>MarkdownRenderer</h2>
        <div style={{ maxWidth: 600 }}>
          <MarkdownRenderer
            content={
              '## Hello\n\nThis is **bold** and `inline code`.\n\n```js\nconsole.log("hi");\n```'
            }
          />
        </div>
      </section>
    </div>
  );
}
