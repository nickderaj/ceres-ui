import { MarkdownRenderer } from '@/components/MarkdownRenderer';

const markdown = `# Markdown Renderer Demo

## Introduction

This page demonstrates the **MarkdownRenderer** component with various content types.

## Code Example

\`\`\`typescript
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

## Data Table

| Framework | Language   | Year |
|-----------|------------|------|
| React     | JavaScript | 2013 |
| Vue       | JavaScript | 2014 |
| Svelte    | JavaScript | 2016 |

## Lists

- First item
- Second item with \`inline code\`
- Third item

1. Ordered item one
2. Ordered item two
3. Ordered item three

## Blockquote

> This is a blockquote with some important information that spans multiple words.

## Horizontal Rule

---

*That's all for the demo.*
`;

export function MarkdownRendererPage() {
  return (
    <div data-testid="markdown-page" style={{ padding: 24, maxWidth: 720 }}>
      <MarkdownRenderer content={markdown} />
    </div>
  );
}
