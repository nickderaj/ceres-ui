import { BackToTopButton } from '@/components/BackToTopButton';

export function BackToTopButtonPage() {
  return (
    <div data-testid="backtotop-page" style={{ padding: 24 }}>
      <p>The BackToTopButton below is forced visible for testing.</p>
      <BackToTopButton visible={true} />
    </div>
  );
}
