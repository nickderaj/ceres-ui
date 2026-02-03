import { StarField } from '@/components/StarField';

export function StarFieldPage() {
  return (
    <div
      data-testid="starfield-page"
      style={{ position: 'relative', width: '100vw', height: '100vh' }}
    >
      <StarField starCount={50} />
    </div>
  );
}
