import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { PdfDownloadButton } from './PdfDownloadButton';

const meta: Meta<typeof PdfDownloadButton> = {
  component: PdfDownloadButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PdfDownloadButton>;

export const Default: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <div>
        <div ref={ref} style={{ padding: 16, marginBottom: 16 }}>
          <h2 style={{ color: 'var(--ceres-text-primary)' }}>Sample Content</h2>
          <p style={{ color: 'var(--ceres-text-body)' }}>
            This content will be included in the PDF download.
          </p>
        </div>
        <PdfDownloadButton contentRef={ref} filename="sample" />
      </div>
    );
  },
};
