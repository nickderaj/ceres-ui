import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownRenderer } from './MarkdownRenderer';

const meta: Meta<typeof MarkdownRenderer> = {
  component: MarkdownRenderer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MarkdownRenderer>;

export const Default: Story = {
  args: {
    content: `# Markdown Renderer Demo

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

---

*That's all for the demo.*
`,
  },
};

export const WithMath: Story = {
  args: {
    content: `# Math Rendering

The quadratic formula is given by:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

Euler's identity: $e^{i\\pi} + 1 = 0$

The sum of a geometric series:

$$\\sum_{k=0}^{n} ar^k = a \\cdot \\frac{1 - r^{n+1}}{1 - r}$$
`,
  },
};

export const WithCode: Story = {
  args: {
    content: `## Multiple Languages

### Python

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"
\`\`\`

### JavaScript

\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
\`\`\`

### Inline

Use \`console.log()\` for debugging.
`,
  },
};
