import './Badge.css';

export interface BadgeProps {
  label: string;
  variant?: 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  bordered?: boolean;
  className?: string;
}

export function Badge({
  label,
  variant = 'neutral',
  size = 'sm',
  bordered = false,
  className,
}: BadgeProps) {
  const classNames = [
    'ceres-badge',
    `ceres-badge--${variant}`,
    `ceres-badge--${size}`,
    bordered ? 'ceres-badge--bordered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{label}</span>;
}
