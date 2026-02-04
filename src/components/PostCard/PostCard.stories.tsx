import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from './PostCard';

const meta: Meta<typeof PostCard> = {
  component: PostCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  args: {
    title: 'Getting Started with React',
    date: '2025-01-15',
    description: 'A comprehensive guide to building modern web applications with React.',
    href: '#',
  },
};

export const WithTags: Story = {
  args: {
    title: 'Advanced TypeScript Patterns',
    date: '2025-02-01',
    description: 'Explore advanced type-level programming techniques in TypeScript.',
    tags: ['typescript', 'programming', 'advanced'],
    href: '#',
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
      <PostCard
        title="Getting Started with React"
        date="2025-01-15"
        description="A comprehensive guide to building modern web applications with React."
        href="#"
      />
      <PostCard
        title="Advanced TypeScript Patterns"
        date="2025-02-01"
        description="Explore advanced type-level programming techniques in TypeScript."
        tags={['typescript', 'programming']}
        href="#"
      />
      <PostCard
        title="CSS Custom Properties"
        date="2025-03-10"
        description="Learn how to use CSS custom properties for theming and dynamic styles."
        tags={['css', 'design']}
        href="#"
      />
    </div>
  ),
};
