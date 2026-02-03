import { TableOfContents } from '@/components/TableOfContents';

const items = [
  { text: 'Introduction', href: '#introduction' },
  { text: 'Getting Started', href: '#getting-started' },
  { text: 'Configuration', href: '#configuration' },
  { text: 'Advanced Usage', href: '#advanced-usage' },
  { text: 'API Reference', href: '#api-reference' },
];

export function TableOfContentsPage() {
  return (
    <div data-testid="toc-page" style={{ padding: 24, maxWidth: 400 }}>
      <TableOfContents items={items} />
    </div>
  );
}
