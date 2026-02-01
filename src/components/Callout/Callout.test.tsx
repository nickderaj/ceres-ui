import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Callout } from './Callout';

describe('Callout', () => {
  it('renders with default variant=note and default title "Note"', () => {
    render(<Callout>Some content</Callout>);
    expect(screen.getByText('Note:')).toBeInTheDocument();
    expect(screen.getByText('Some content')).toBeInTheDocument();
  });

  it.each([
    ['note', 'ceres-callout--note'],
    ['important', 'ceres-callout--important'],
    ['critical', 'ceres-callout--critical'],
    ['tip', 'ceres-callout--tip'],
    ['warning', 'ceres-callout--warning'],
    ['info', 'ceres-callout--info'],
    ['wip', 'ceres-callout--wip'],
  ] as const)('renders variant=%s with class %s', (variant, expectedClass) => {
    const { container } = render(<Callout variant={variant}>Content</Callout>);
    expect(container.firstElementChild).toHaveClass(expectedClass);
  });

  it('renders a custom title when provided', () => {
    render(<Callout title="Custom Title">Content</Callout>);
    expect(screen.getByText('Custom Title:')).toBeInTheDocument();
  });

  it('merges className prop with base classes', () => {
    const { container } = render(<Callout className="my-extra-class">Content</Callout>);
    const el = container.firstElementChild;
    expect(el).toHaveClass('ceres-callout');
    expect(el).toHaveClass('ceres-callout--note');
    expect(el).toHaveClass('my-extra-class');
  });

  it('uses block layout when children contain block elements', () => {
    // Must pass multiple children so React creates an array for `children`,
    // which is required by the `Array.isArray(children)` check in Callout.
    const { container } = render(
      <Callout>
        {'Intro text'}
        <p>A paragraph</p>
      </Callout>,
    );
    const title = container.querySelector('.ceres-callout__title');
    expect(title).toHaveClass('ceres-callout__title--block');
    const content = container.querySelector('.ceres-callout__content');
    expect(content?.tagName).toBe('DIV');
  });

  it('uses inline layout when children are plain text', () => {
    const { container } = render(<Callout>Just text</Callout>);
    const title = container.querySelector('.ceres-callout__title');
    expect(title).not.toHaveClass('ceres-callout__title--block');
    const content = container.querySelector('.ceres-callout__content');
    expect(content?.tagName).toBe('SPAN');
  });
});
