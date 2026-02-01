import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BackToTopButton } from './BackToTopButton';

describe('BackToTopButton', () => {
  it('renders when visible=true', () => {
    render(<BackToTopButton visible={true} />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button).toBeInTheDocument();
  });

  it('does not render when visible=false', () => {
    render(<BackToTopButton visible={false} />);
    expect(screen.queryByRole('button', { hidden: true })).not.toBeInTheDocument();
  });

  it('has an aria-label for accessibility', () => {
    render(<BackToTopButton visible={true} />);
    const button = screen.getByRole('button', { hidden: true });
    expect(button).toHaveAttribute('aria-label', 'Scroll to top');
  });
});
