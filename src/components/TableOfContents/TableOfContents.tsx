import type { ReactNode } from 'react';
import './TableOfContents.css';

export interface TableOfContentsItem {
  text: string;
  href: string;
}

export interface TableOfContentsProps {
  items?: TableOfContentsItem[];
  children?: ReactNode;
  className?: string;
}

export function TableOfContents({ items, children, className }: TableOfContentsProps) {
  const classNames = ['ceres-toc', className].filter(Boolean).join(' ');

  if (children) {
    return (
      <nav className={classNames}>
        <ol className="ceres-toc__list">{children}</ol>
      </nav>
    );
  }

  return (
    <nav className={classNames}>
      <ol className="ceres-toc__list">
        {items?.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="ceres-toc__link">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
