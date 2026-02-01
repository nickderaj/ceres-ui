import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders the label text', () => {
    render(<Badge label="Bullish" />);
    expect(screen.getByText('Bullish')).toBeInTheDocument();
  });

  it.each([
    ['success', 'ceres-badge--success'],
    ['danger', 'ceres-badge--danger'],
    ['neutral', 'ceres-badge--neutral'],
  ] as const)('renders variant=%s with class %s', (variant, expectedClass) => {
    render(<Badge label="Test" variant={variant} />);
    expect(screen.getByText('Test')).toHaveClass(expectedClass);
  });

  it.each([
    ['sm', 'ceres-badge--sm'],
    ['md', 'ceres-badge--md'],
  ] as const)('renders size=%s with class %s', (size, expectedClass) => {
    render(<Badge label="Test" size={size} />);
    expect(screen.getByText('Test')).toHaveClass(expectedClass);
  });

  it('adds ceres-badge--bordered when bordered is true', () => {
    render(<Badge label="Bordered" bordered />);
    expect(screen.getByText('Bordered')).toHaveClass('ceres-badge--bordered');
  });

  it('does not add ceres-badge--bordered when bordered is false', () => {
    render(<Badge label="Not Bordered" />);
    expect(screen.getByText('Not Bordered')).not.toHaveClass('ceres-badge--bordered');
  });

  it('applies className prop', () => {
    render(<Badge label="Custom" className="my-badge" />);
    const el = screen.getByText('Custom');
    expect(el).toHaveClass('ceres-badge');
    expect(el).toHaveClass('my-badge');
  });
});
