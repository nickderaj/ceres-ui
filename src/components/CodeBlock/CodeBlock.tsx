import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { catppuccinMocha } from '../../styles/catppuccin-mocha';
import './CodeBlock.css';

export interface CodeBlockProps {
  language?: string;
  children: string;
  className?: string;
}

export function CodeBlock({ language, children, className }: CodeBlockProps) {
  const classNames = ['ceres-code-block', className].filter(Boolean).join(' ');

  return (
    <SyntaxHighlighter
      language={language}
      style={catppuccinMocha}
      className={classNames}
      customStyle={{
        borderRadius: '0.5rem',
        fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
        padding: '1rem',
        margin: 0,
        overflow: 'visible',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
      codeTagProps={{
        style: {
          fontFamily: 'var(--ceres-font-mono)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        },
      }}
    >
      {children.trim()}
    </SyntaxHighlighter>
  );
}
