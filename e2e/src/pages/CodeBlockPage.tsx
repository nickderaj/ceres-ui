import { CodeBlock } from '@/components/CodeBlock';

const sampleCode = `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

function greet(user: User): string {
  return \`Hello, \${user.name}! You are an \${user.role}.\`;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'editor' },
];

users.forEach((u) => console.log(greet(u)));`;

export function CodeBlockPage() {
  return (
    <div data-testid="codeblock-page" style={{ padding: 24, maxWidth: 720 }}>
      <CodeBlock language="typescript">{sampleCode}</CodeBlock>
    </div>
  );
}
