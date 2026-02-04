import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const TypeScript: Story = {
  args: {
    language: 'typescript',
    children: `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  },
};

export const Python: Story = {
  args: {
    language: 'python',
    children: `def quicksort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
  },
};

export const JSON: Story = {
  args: {
    language: 'json',
    children: `{
  "name": "ceres-ui",
  "version": "0.1.0",
  "dependencies": {
    "react": "^19.0.0"
  }
}`,
  },
};

export const NoLanguage: Story = {
  args: {
    children: `plain text code block
without syntax highlighting`,
  },
};
