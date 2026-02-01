import { useState } from 'react';
import type { RefObject } from 'react';
import './PdfDownloadButton.css';

export interface PdfDownloadButtonProps {
  contentRef: RefObject<HTMLElement | null>;
  filename: string;
  className?: string;
}

export function PdfDownloadButton({ contentRef, filename, className }: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    if (!contentRef.current || isGenerating) return;

    setIsGenerating(true);

    try {
      const element = contentRef.current;

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        throw new Error('Could not open print window');
      }

      const styleSheets = Array.from(document.styleSheets)
        .map((sheet) => {
          try {
            return Array.from(sheet.cssRules)
              .map((rule) => rule.cssText)
              .join('\n');
          } catch {
            if (sheet.href) {
              return `@import url("${sheet.href}");`;
            }
            return '';
          }
        })
        .join('\n');

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${filename}</title>
            <style>
              ${styleSheets}

              @media print {
                @page {
                  size: A4;
                  margin: 15mm;
                }

                body {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }
              }

              html, body {
                background-color: var(--ceres-bg-main, #0a0a0a) !important;
                color: var(--ceres-text-primary, #f5f5f0) !important;
                margin: 0;
                padding: 20px;
                font-family: system-ui, -apple-system, sans-serif;
              }

              .ceres-pdf-button {
                display: none !important;
              }

              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }

              pre, code, table, figure, .katex-display, blockquote {
                break-inside: avoid;
              }
            </style>
          </head>
          <body>
            ${element.innerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();

      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          setIsGenerating(false);
        }, 250);
      };

      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          printWindow.print();
          printWindow.close();
        }
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      setIsGenerating(false);
    }
  };

  const classNames = ['ceres-pdf-button', className].filter(Boolean).join(' ');

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={classNames}
      title="Download as PDF (opens print dialog)"
    >
      {isGenerating ? (
        <>
          <svg
            className="ceres-pdf-button__spinner"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle opacity={0.25} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              opacity={0.75}
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Preparing...</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ceres-pdf-button__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Download PDF</span>
        </>
      )}
    </button>
  );
}
