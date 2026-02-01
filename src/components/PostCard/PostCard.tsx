import type { MouseEvent } from 'react';
import './PostCard.css';

export interface PostCardProps {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export function PostCard({
  title,
  date,
  description,
  tags,
  href,
  onClick,
  className,
}: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const classNames = ['ceres-post-card', className].filter(Boolean).join(' ');

  return (
    <a href={href} onClick={onClick} className={classNames}>
      <time className="ceres-post-card__date">{formattedDate}</time>
      <h2 className="ceres-post-card__title">{title}</h2>
      <p className="ceres-post-card__description">{description}</p>
      {tags && tags.length > 0 && (
        <div className="ceres-post-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="ceres-post-card__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
