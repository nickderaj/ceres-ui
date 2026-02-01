import type { ReactNode } from 'react';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { CodeBlock } from '../CodeBlock';
import { Callout } from '../Callout';
import type { CalloutVariant } from '../Callout';
import { TableOfContents } from '../TableOfContents';
import { generateHeadingId } from './heading-utils';
import './MarkdownRenderer.css';

export interface MarkdownRendererProps {
  content: string;
  /** Additional or override component mappings for custom markdown tags. */
  components?: Partial<Components>;
  className?: string;
}

export function MarkdownRenderer({
  content,
  components: userComponents,
  className,
}: MarkdownRendererProps) {
  const defaultComponents: Components = {
    code({ className: codeClassName, children, ...props }) {
      const match = /language-(\w+)/.exec(codeClassName || '');
      const isInline = !match && !codeClassName;

      if (isInline) {
        return (
          <code className="ceres-code-inline" {...props}>
            {children}
          </code>
        );
      }

      return <CodeBlock language={match?.[1]}>{String(children).replace(/\n$/, '')}</CodeBlock>;
    },
    h1({ children }) {
      const id = generateHeadingId(children);
      return <h1 id={id}>{children}</h1>;
    },
    h2({ children }) {
      const id = generateHeadingId(children);
      return <h2 id={id}>{children}</h2>;
    },
    h3({ children }) {
      const id = generateHeadingId(children);
      return <h3 id={id}>{children}</h3>;
    },
    h4({ children }) {
      const id = generateHeadingId(children);
      return <h4 id={id}>{children}</h4>;
    },
    p({ children }) {
      return <p>{children}</p>;
    },
    a({ href, children }) {
      return (
        <a
          href={href}
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    ul({ children }) {
      return <ul>{children}</ul>;
    },
    ol({ children }) {
      return <ol>{children}</ol>;
    },
    li({ children }) {
      return <li>{children}</li>;
    },
    blockquote({ children }) {
      return <blockquote>{children}</blockquote>;
    },
    hr() {
      return <hr />;
    },
    table({ children }) {
      return (
        <div className="ceres-markdown__table-wrapper">
          <table>{children}</table>
        </div>
      );
    },
    thead({ children }) {
      return <thead>{children}</thead>;
    },
    th({ children }) {
      return <th>{children}</th>;
    },
    td({ children }) {
      return <td>{children}</td>;
    },
    pre({ children }) {
      return <div className="ceres-markdown__pre">{children}</div>;
    },
    'table-of-contents': ({ children }: { children?: ReactNode }) => {
      return <TableOfContents>{children}</TableOfContents>;
    },
    callout: ({
      variant,
      title,
      children,
    }: {
      variant?: string;
      title?: string;
      children?: ReactNode;
    }) => {
      return (
        <Callout variant={(variant as CalloutVariant) || 'note'} title={title}>
          {children}
        </Callout>
      );
    },
  } as Components;

  const mergedComponents: Components = {
    ...defaultComponents,
    ...userComponents,
  } as Components;

  const classNames = ['ceres-markdown', className].filter(Boolean).join(' ');

  return (
    <article className={classNames}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={mergedComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
