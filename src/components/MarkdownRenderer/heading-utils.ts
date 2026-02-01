import type { ReactNode } from 'react';

export function getTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(getTextFromChildren).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return getTextFromChildren((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

export function generateHeadingId(children: ReactNode): string {
  const text = getTextFromChildren(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
