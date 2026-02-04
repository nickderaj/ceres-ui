import type { Meta, StoryObj } from '@storybook/react';
import { TableOfContents } from './TableOfContents';

const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

export const WithItems: Story = {
  args: {
    items: [
      { text: 'Introduction', href: '#introduction' },
      { text: 'Getting Started', href: '#getting-started' },
      { text: 'Configuration', href: '#configuration' },
      { text: 'API Reference', href: '#api-reference' },
      { text: 'Examples', href: '#examples' },
    ],
  },
};

export const WithChildren: Story = {
  render: () => (
    <TableOfContents>
      <li>
        <a href="#overview" className="ceres-toc__link">
          Overview
        </a>
      </li>
      <li>
        <a href="#installation" className="ceres-toc__link">
          Installation
        </a>
      </li>
      <li>
        <a href="#usage" className="ceres-toc__link">
          Usage
        </a>
      </li>
    </TableOfContents>
  ),
};
