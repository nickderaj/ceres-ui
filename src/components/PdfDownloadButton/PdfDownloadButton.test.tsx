import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PdfDownloadButton } from './PdfDownloadButton';

describe('PdfDownloadButton', () => {
  it('renders "Download PDF" text', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <div>
        <div ref={ref}>Content</div>
        <PdfDownloadButton contentRef={ref} filename="test.pdf" />
      </div>,
    );
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <div>
        <div ref={ref}>Content</div>
        <PdfDownloadButton contentRef={ref} filename="test.pdf" className="my-pdf-btn" />
      </div>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ceres-pdf-button');
    expect(button).toHaveClass('my-pdf-btn');
  });
});
