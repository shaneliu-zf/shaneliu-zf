import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { marked } from "marked";

export type ArchiveDocument = {
  id: string;
  label: string;
  source: string;
  html: string;
};

const SOURCES = [
  { id: "overview", label: "總覽", file: "../readme.md", source: "readme.md" },
  { id: "timeline", label: "跨領域大事年表", file: "../docs/timeline.md", source: "docs/timeline.md" },
  { id: "cs", label: "資訊工程", file: "../docs/cs.md", source: "docs/cs.md" },
  { id: "magic", label: "魔術與催眠", file: "../docs/magic.md", source: "docs/magic.md" },
  { id: "cubing", label: "魔術方塊", file: "../docs/cubing.md", source: "docs/cubing.md" },
  { id: "performance", label: "其他才藝與興趣", file: "../docs/performance.md", source: "docs/performance.md" },
  {
    id: "organizations",
    label: "組織、職務與活動",
    file: "../docs/orgs-and-events.md",
    source: "docs/orgs-and-events.md",
  },
  { id: "footprints", label: "網路足跡", file: "../docs/footprints.md", source: "docs/footprints.md" },
] as const;

const LOCAL_LINK_TARGETS: Record<string, string> = {
  "readme.md": "overview",
  "timeline.md": "timeline",
  "cs.md": "cs",
  "magic.md": "magic",
  "cubing.md": "cubing",
  "performance.md": "performance",
  "orgs-and-events.md": "organizations",
  "footprints.md": "footprints",
};

export function cleanMarkdown(markdown: string): string {
  return markdown
    .replace(/^>\s*回到\s+\[主頁\]\([^)]+\)\s*$/gm, "")
    .replace(/^>\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}

export function rewriteLocalLinks(html: string): string {
  return html.replace(/href="(?:\.\.\/)?(?:docs\/)?([^"#/]+\.md)(?:#[^"]*)?"/g, (match, filename) => {
    const target = LOCAL_LINK_TARGETS[filename];
    return target ? `href="#${target}"` : match;
  });
}

marked.use({
  gfm: true,
  breaks: false,
});

export function readRepositoryMarkdown(file: string): string {
  return readFileSync(resolve(process.cwd(), file), "utf8");
}

export function renderRepositoryMarkdown(markdown: string): string {
  return rewriteLocalLinks(String(marked.parse(cleanMarkdown(markdown))));
}

export const ARCHIVE_DOCUMENTS: ArchiveDocument[] = SOURCES.map((source) => {
  const markdown = readRepositoryMarkdown(source.file);
  const html = renderRepositoryMarkdown(markdown);
  return {
    id: source.id,
    label: source.label,
    source: source.source,
    html,
  };
});
