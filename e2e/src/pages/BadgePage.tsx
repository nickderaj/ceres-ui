import { Badge } from '@/components/Badge';

export function BadgePage() {
  return (
    <div
      data-testid="badge-page"
      style={{ padding: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}
    >
      <Badge label="Neutral SM" variant="neutral" size="sm" />
      <Badge label="Neutral MD" variant="neutral" size="md" />
      <Badge label="Success SM" variant="success" size="sm" />
      <Badge label="Success MD" variant="success" size="md" />
      <Badge label="Danger SM" variant="danger" size="sm" />
      <Badge label="Danger MD" variant="danger" size="md" />
      <Badge label="Bordered" variant="neutral" size="sm" bordered />
      <Badge label="Bordered Success" variant="success" size="md" bordered />
      <Badge label="Bordered Danger" variant="danger" size="sm" bordered />
    </div>
  );
}
