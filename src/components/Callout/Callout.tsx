import type { ReactNode } from 'react';
import './Callout.css';

export type CalloutVariant =
  | 'note'
  | 'important'
  | 'critical'
  | 'tip'
  | 'warning'
  | 'info'
  | 'wip';

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const defaultTitles: Record<CalloutVariant, string> = {
  note: 'Note',
  important: 'Important',
  critical: 'CRITICAL',
  tip: 'Tip',
  warning: 'Warning',
  info: 'Info',
  wip: 'Work in Progress',
};

export function Callout({ variant = 'note', title, children, className }: CalloutProps) {
  const displayTitle = title || defaultTitles[variant];

  const hasBlockElements =
    Array.isArray(children) &&
    children.some(
      (child) =>
        typeof child === 'object' &&
        child !== null &&
        'type' in child &&
        typeof child.type === 'string' &&
        ['ul', 'ol', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(child.type),
    );

  const classNames = [
    'ceres-callout',
    `ceres-callout--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {hasBlockElements ? (
        <>
          <strong className="ceres-callout__title ceres-callout__title--block">
            {displayTitle}:
          </strong>
          <div className="ceres-callout__content">{children}</div>
        </>
      ) : (
        <>
          <strong className="ceres-callout__title">{displayTitle}:</strong>{' '}
          <span className="ceres-callout__content">{children}</span>
        </>
      )}
    </div>
  );
}
