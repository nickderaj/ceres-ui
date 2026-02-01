import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostCard } from './PostCard';

describe('PostCard', () => {
  const defaultProps = {
    title: 'Test Post Title',
    date: '2025-03-15',
    description: 'A description of the post.',
    href: '/blog/test-post',
  };

  it('renders title, date, and description', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('March 15, 2025')).toBeInTheDocument();
    expect(screen.getByText('A description of the post.')).toBeInTheDocument();
  });

  it('renders tags when provided', () => {
    render(<PostCard {...defaultProps} tags={['react', 'typescript']} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('sets href on the anchor element', () => {
    render(<PostCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-post');
  });

  it('applies className prop', () => {
    const { container } = render(<PostCard {...defaultProps} className="my-card" />);
    const link = container.firstElementChild;
    expect(link).toHaveClass('ceres-post-card');
    expect(link).toHaveClass('my-card');
  });
});
