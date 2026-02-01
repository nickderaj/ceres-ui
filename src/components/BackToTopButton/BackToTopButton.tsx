import { useSyncExternalStore } from 'react';
import './BackToTopButton.css';

export interface BackToTopButtonProps {
  /**
   * Override automatic visibility. When undefined, the button shows
   * automatically when the user scrolls past `scrollThreshold`.
   */
  visible?: boolean;
  /** Scroll distance (px) after which the button appears. Default 400. */
  scrollThreshold?: number;
  className?: string;
}

function subscribeToScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

function getScrollY() {
  return window.scrollY;
}

export function BackToTopButton({
  visible,
  scrollThreshold = 400,
  className,
}: BackToTopButtonProps) {
  const scrollY = useSyncExternalStore(subscribeToScroll, getScrollY);
  const isVisible = visible ?? scrollY > scrollThreshold;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  if (!isVisible) return null;

  const classNames = ['ceres-back-to-top', className].filter(Boolean).join(' ');

  return (
    <button onClick={scrollToTop} className={classNames} aria-label="Scroll to top">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ceres-back-to-top__icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
