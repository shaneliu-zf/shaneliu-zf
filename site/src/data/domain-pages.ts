import { SKILLS, type SkillGroup } from "./profile";
import { readRepositoryMarkdown, renderRepositoryMarkdown } from "../lib/archive";
import { EXPERIENCES, type Experience } from "../lib/experiences";

export type DomainDocument = {
  label: string;
  source: string;
  html: string;
};

export type DomainPageData = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  accent: "purple" | "green" | "amber";
  skillTitles: string[];
  domains: string[];
  documents: DomainDocument[];
};

function extractSections(markdown: string, headings: string[]): string {
  const wanted = new Set(headings);
  const lines = markdown.split(/\r?\n/);
  const output: string[] = [];
  let include = false;

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      include = wanted.has(heading[1]);
    }
    if (include) output.push(line);
  }

  return output.join("\n");
}

function fullDocument(file: string, label: string, source: string): DomainDocument {
  return {
    label,
    source,
    html: renderRepositoryMarkdown(readRepositoryMarkdown(file)),
  };
}

function selectedDocument(
  file: string,
  label: string,
  source: string,
  headings: string[],
): DomainDocument {
  const markdown = extractSections(readRepositoryMarkdown(file), headings);
  return { label, source, html: renderRepositoryMarkdown(markdown) };
}

export const DOMAIN_PAGES: DomainPageData[] = [
  {
    slug: "performance",
    title: "表演藝術",
    eyebrow: "Magic · Hypnosis · Stage",
    description:
      "魔術、催眠、腹語，以及舞台前後的完整紀錄。包含十八年的學習時間線、演出、製作、燈控、出版校稿、講座與社群職務。",
    accent: "purple",
    skillTitles: ["表演藝術"],
    domains: ["magic", "hypnosis", "performance"],
    documents: [
      fullDocument("../docs/magic.md", "魔術與催眠完整紀錄", "docs/magic.md"),
      selectedDocument(
        "../docs/performance.md",
        "其他表演與教學",
        "docs/performance.md",
        ["表演經歷", "教學與講師"],
      ),
    ],
  },
  {
    slug: "dexterity",
    title: "手部極限運動",
    eyebrow: "Cubing · Juggling · Dexterity",
    description:
      "魔術方塊、競技疊杯、寶樂珠、花式切牌，以及溜溜球、劍玉、水晶球等需要精細控制的手技與雜技。",
    accent: "green",
    skillTitles: ["手部極限運動", "雜技"],
    domains: ["cubing"],
    documents: [
      fullDocument("../docs/cubing.md", "魔術方塊完整紀錄", "docs/cubing.md"),
      selectedDocument(
        "../docs/performance.md",
        "雜技與手部極限運動",
        "docs/performance.md",
        ["雜技與手部極限運動"],
      ),
    ],
  },
  {
    slug: "other",
    title: "其他",
    eyebrow: "Music · Writing · Law · More",
    description:
      "音樂、文學寫作、法律、TCG、板類運動、收藏與其他難以歸進單一分類，卻同樣認真投入過的領域。",
    accent: "amber",
    skillTitles: ["收藏", "音樂", "文學寫作", "TCG", "板類運動", "其他"],
    domains: ["law", "other"],
    documents: [
      selectedDocument(
        "../docs/performance.md",
        "其他才藝與興趣",
        "docs/performance.md",
        ["時間線", "音樂", "文學寫作", "遊戲與運動", "其他領域興趣"],
      ),
    ],
  },
];

export function getDomainPage(slug: string): DomainPageData | undefined {
  return DOMAIN_PAGES.find((page) => page.slug === slug);
}

export function getDomainSkills(page: DomainPageData): SkillGroup[] {
  return SKILLS.filter((skill) => page.skillTitles.includes(skill.title));
}

export function getDomainExperiences(page: DomainPageData): Experience[] {
  return EXPERIENCES.filter((experience) =>
    experience.domains.some((domain) => page.domains.includes(domain)),
  );
}
