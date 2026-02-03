import { Callout } from '@/components/Callout';

export function CalloutPage() {
  return (
    <div
      data-testid="callout-page"
      style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640 }}
    >
      <Callout variant="note">This is a note callout with default title.</Callout>
      <Callout variant="important">This is an important callout.</Callout>
      <Callout variant="critical">This is a critical callout.</Callout>
      <Callout variant="tip">This is a tip callout.</Callout>
      <Callout variant="warning">This is a warning callout.</Callout>
      <Callout variant="info">This is an info callout.</Callout>
      <Callout variant="wip">This is a work-in-progress callout.</Callout>
    </div>
  );
}
