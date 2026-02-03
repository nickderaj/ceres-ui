import { PostCard } from '@/components/PostCard';

export function PostCardPage() {
  return (
    <div
      data-testid="postcard-page"
      style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640 }}
    >
      <PostCard
        title="Building a Component Library"
        date="2025-01-15"
        description="A deep dive into creating reusable React components with CSS custom properties and theming support."
        tags={['react', 'css', 'design-systems']}
        href="#"
        onClick={(e) => e.preventDefault()}
      />
      <PostCard
        title="Understanding TypeScript Generics"
        date="2025-02-20"
        description="Learn how to use generics to write flexible, type-safe code in TypeScript."
        tags={['typescript', 'generics']}
        href="#"
        onClick={(e) => e.preventDefault()}
      />
    </div>
  );
}
