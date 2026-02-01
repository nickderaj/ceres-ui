import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TableOfContents } from './TableOfContents';

describe('TableOfContents', () => {
  it('renders items prop as links', () => {
    const items = [
      { text: 'Introduction', href: '#intro' },
      { text: 'Methods', href: '#methods' },
    ];
    render(<TableOfContents items={items} />);

    const introLink = screen.getByText('Introduction');
    expect(introLink).toBeInTheDocument();
    expect(introLink.closest('a')).toHaveAttribute('href', '#intro');

    const methodsLink = screen.getByText('Methods');
    expect(methodsLink).toBeInTheDocument();
    expect(methodsLink.closest('a')).toHaveAttribute('href', '#methods');
  });

  it('renders children when provided', () => {
    render(
      <TableOfContents>
        <li>
          <a href="#custom">Custom Item</a>
        </li>
      </TableOfContents>,
    );
    expect(screen.getByText('Custom Item')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    const { container } = render(
      <TableOfContents items={[{ text: 'Test', href: '#test' }]} className="my-toc" />,
    );
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('ceres-toc');
    expect(nav).toHaveClass('my-toc');
  });
});
