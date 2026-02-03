import { useRef } from 'react';
import { PdfDownloadButton } from '@/components/PdfDownloadButton';

export function PdfDownloadButtonPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div data-testid="pdfdownload-page" style={{ padding: 24 }}>
      <div ref={contentRef}>
        <h2>Sample Content</h2>
        <p>This is sample content that would be exported as a PDF.</p>
      </div>
      <PdfDownloadButton contentRef={contentRef} filename="sample.pdf" />
    </div>
  );
}
