import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('react-syntax-highlighter', () => ({
  Prism: ({ children, language, className }: any) => (
    <pre className={className} data-language={language}>
      <code>{children}</code>
    </pre>
  ),
}));

import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  it('renders children with whitespace trimmed', () => {
    render(<CodeBlock>{'  const x = 1;  \n'}</CodeBlock>);
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    const { container } = render(<CodeBlock className="my-code">{'code'}</CodeBlock>);
    const pre = container.querySelector('pre');
    expect(pre).toHaveClass('ceres-code-block');
    expect(pre).toHaveClass('my-code');
  });

  it('passes language to the syntax highlighter', () => {
    const { container } = render(<CodeBlock language="typescript">{'let a = 1;'}</CodeBlock>);
    const pre = container.querySelector('pre');
    expect(pre).toHaveAttribute('data-language', 'typescript');
  });
});
