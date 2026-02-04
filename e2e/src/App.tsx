import { useState, useEffect } from 'react';
import {
  BadgePage,
  CalloutPage,
  CodeBlockPage,
  DataTablePage,
  ChartPage,
  PostCardPage,
  BackToTopButtonPage,
  StarFieldPage,
  TableOfContentsPage,
  PdfDownloadButtonPage,
  MarkdownRendererPage,
  MultiPanelChartPage,
  ShowcasePage,
} from './pages';

const routes: Record<string, () => JSX.Element> = {
  '#badge': BadgePage,
  '#callout': CalloutPage,
  '#codeblock': CodeBlockPage,
  '#datatable': DataTablePage,
  '#chart': ChartPage,
  '#postcard': PostCardPage,
  '#backtotop': BackToTopButtonPage,
  '#starfield': StarFieldPage,
  '#toc': TableOfContentsPage,
  '#pdfdownload': PdfDownloadButtonPage,
  '#markdown': MarkdownRendererPage,
  '#multipanelchart': MultiPanelChartPage,
  '#showcase': ShowcasePage,
};

function getHash() {
  return window.location.hash || '#showcase';
}

export function App() {
  const [hash, setHash] = useState(getHash);

  useEffect(() => {
    const onHashChange = () => setHash(getHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const Page = routes[hash] ?? ShowcasePage;

  return (
    <div className="ceres-root">
      <Page />
    </div>
  );
}
