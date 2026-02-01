import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { StarField } from './StarField';

describe('StarField', () => {
  it('renders without crashing', () => {
    const { container } = render(<StarField />);
    expect(container.querySelector('.ceres-star-field')).toBeInTheDocument();
  });

  it('creates star elements', () => {
    const { container } = render(<StarField starCount={10} />);
    const stars = container.querySelectorAll('.ceres-star-field__star');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('applies className prop', () => {
    const { container } = render(<StarField className="my-stars" />);
    const field = container.querySelector('.ceres-star-field');
    expect(field).toHaveClass('ceres-star-field');
    expect(field).toHaveClass('my-stars');
  });
});
