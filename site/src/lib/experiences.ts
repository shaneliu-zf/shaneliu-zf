import rawDatabase from "../data/experiences.json";

export type ExperienceStatus = "upcoming" | "current" | "completed" | "cancelled";
export type DatePrecision = "day" | "month" | "year" | "unknown";

export type ExperienceLink = {
  label: string;
  url: string;
  type: "official" | "work" | "video" | "news" | "proof" | "social";
};

export type ExperienceImage = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  featured?: boolean;
};

export type Experience = {
  id: string;
  title: string;
  domains: string[];
  types: string[];
  startDate: string | null;
  endDate: string | null;
  datePrecision: DatePrecision;
  status: ExperienceStatus;
  result: string | null;
  roles: string[];
  organization: string | null;
  location: string | null;
  description: string;
  links: ExperienceLink[];
  images: ExperienceImage[];
  featured: boolean;
};

export type LearningTimelineStage = {
  stage: string;
  items: string[];
};

export type ExperienceDatabase = {
  version: number;
  taxonomies: {
    domains: Record<string, string>;
    types: Record<string, string>;
    roles: Record<string, string>;
  };
  learningTimeline: LearningTimelineStage[];
  experiences: Experience[];
};

function validateDatabase(input: unknown): ExperienceDatabase {
  if (!input || typeof input !== "object") {
    throw new Error("experiences.json 必須是一個物件");
  }

  const database = input as ExperienceDatabase;
  if (
    database.version !== 1 ||
    !database.taxonomies ||
    !Array.isArray(database.learningTimeline) ||
    !Array.isArray(database.experiences)
  ) {
    throw new Error("experiences.json 缺少 version、taxonomies、learningTimeline 或 experiences");
  }

  const ids = new Set<string>();
  for (const item of database.experiences) {
    if (
      !item.id ||
      !item.title ||
      !Array.isArray(item.types) ||
      item.types.length === 0 ||
      !Array.isArray(item.domains)
    ) {
      throw new Error("每筆經歷都必須有 id、title、types 與 domains");
    }
    if (ids.has(item.id)) {
      throw new Error(`經歷 id 重複：${item.id}`);
    }
    ids.add(item.id);

    for (const type of item.types) {
      if (!(type in database.taxonomies.types)) {
        throw new Error(`經歷 ${item.id} 使用未知類型：${type}`);
      }
    }
    for (const domain of item.domains) {
      if (!(domain in database.taxonomies.domains)) {
        throw new Error(`經歷 ${item.id} 使用未知領域：${domain}`);
      }
    }
    for (const role of item.roles) {
      if (!(role in database.taxonomies.roles)) {
        throw new Error(`經歷 ${item.id} 使用未知角色：${role}`);
      }
    }
  }

  return database;
}

export const EXPERIENCE_DB = validateDatabase(rawDatabase);

export const EXPERIENCES = [...EXPERIENCE_DB.experiences].sort((a, b) => {
  const dateA = a.startDate ?? "";
  const dateB = b.startDate ?? "";
  return dateB.localeCompare(dateA) || Number(b.featured) - Number(a.featured);
});

export const DOMAIN_OPTIONS = Object.entries(EXPERIENCE_DB.taxonomies.domains);
export const TYPE_OPTIONS = Object.entries(EXPERIENCE_DB.taxonomies.types);

export function hasType(item: Experience, type: string): boolean {
  return item.types.includes(type);
}

export function primaryType(item: Experience): string {
  return item.types[0];
}

export function getTypeLabels(item: Experience): string[] {
  return item.types.map((type) => EXPERIENCE_DB.taxonomies.types[type]);
}

export function formatExperienceDate(item: Experience): string {
  if (item.status === "current") {
    return item.startDate ? `${item.startDate} ~ 進行中` : "進行中";
  }
  if (!item.startDate) return "時間待補";
  if (!item.endDate || item.startDate === item.endDate) return item.startDate;
  return `${item.startDate} ~ ${item.endDate}`;
}

export function getRoleLabels(item: Experience): string[] {
  return item.roles.map((role) => EXPERIENCE_DB.taxonomies.roles[role]);
}

/** 學歷附註：有就顯示，沒有則空白。 */
export function getEducationNote(item: Experience): string {
  return (item.result?.trim() || item.description?.trim() || "").trim();
}

/** 演講一行：COSCUP 2026 講者，主題《打造你自己的 Kotlin DSL》 */
export function formatTalkSummary(item: Experience): string {
  const title = item.title.trim();
  const org = item.organization?.trim() || "";
  const result = item.result?.trim() || "";
  const year = item.startDate?.slice(0, 4) || "";

  // 標題已是完整職務句（沒有獨立講題）
  if (!org && result && (result === title || title.includes(result) || result.includes(title))) {
    return title;
  }

  // 活動名 + 講座類型（例如：築夢島 新竹交流會，近距離魔術講座）
  if (!org && result && !/講者|講師/.test(result)) {
    return `${title}，${result}`;
  }

  // 結果已含活動與身分（例如：COSCUP 2026 講者）
  if (result && /講者|講師/.test(result) && !["講者", "講師", "專業講師"].includes(result)) {
    return result.includes(title) ? result : `${result}，主題《${title}》`;
  }

  const role =
    result === "專業講師"
      ? "專業講師"
      : result === "講師" || item.roles.includes("instructor")
        ? "講師"
        : "講者";
  const head = [org || null, year || null, role].filter(Boolean).join(" ");
  if (head) return `${head}，主題《${title}》`;
  if (result) return `${result}，主題《${title}》`;
  return title;
}

/**
 * 經歷附註：沿用 GitHub 文件的寫法，只並列單位、結果與原始描述，
 * 不改寫成句子，也不重複標題已經有的資訊。
 */
export function describeExperience(item: Experience): string {
  const kind = primaryType(item);
  if (kind === "talk") return "";
  if (kind === "education") return getEducationNote(item);

  const title = item.title.trim();
  const parts: string[] = [];

  const push = (value: string | null | undefined) => {
    const text = (value ?? "").trim();
    if (!text) return;
    if (title.includes(text) || text.includes(title)) return;
    if (parts.some((part) => part.includes(text) || text.includes(part))) return;
    parts.push(text);
  };

  push(item.organization);
  push(item.result);
  push(item.description);

  return parts.join("・");
}

/** 標題加附註，用於只顯示一行的地方。 */
export function summarizeExperience(item: Experience): string {
  const kind = primaryType(item);
  if (kind === "talk") return formatTalkSummary(item);
  if (kind === "education") {
    const note = getEducationNote(item);
    return note ? `${item.title}・${note}` : item.title;
  }
  const note = describeExperience(item);
  return note ? `${item.title}・${note}` : item.title;
}

const ORGANIZER_ROLES = new Set([
  "organizer",
  "host",
  "staff",
  "founder",
  "administrator",
  "assistant",
  "director",
  "backstage",
  "judge",
  "scrambler",
  "leader",
  "speaker",
  "instructor",
]);

const ATTENDEE_ROLES = new Set(["attendee", "student", "member", "contestant"]);

function byDateDesc(a: Experience, b: Experience): number {
  const dateA = a.startDate ?? "";
  const dateB = b.startDate ?? "";
  return dateB.localeCompare(dateA) || a.title.localeCompare(b.title, "zh-Hant");
}

function isOrganizedEvent(item: Experience): boolean {
  if (item.id.startsWith("organized-event")) return true;
  if (!hasType(item, "event")) return false;
  return item.roles.some((role) => ORGANIZER_ROLES.has(role));
}

function isAttendedEvent(item: Experience): boolean {
  if (item.id.startsWith("attended-event")) return true;
  if (!hasType(item, "event") || isOrganizedEvent(item)) return false;
  return item.roles.length === 0 || item.roles.every((role) => ATTENDEE_ROLES.has(role));
}

/**
 * 年會／研討會等「活動型」社群彙總：細節已在舉辦／參與活動，
 * 不算長期組織職務（仍可出現在 CS 頁社群區塊）。
 */
const EPISODIC_COMMUNITY_IDS = new Set([
  "community-coscup",
  "community-sitcon",
  "community-hitcon",
  "community-wtm",
  "community-gdg",
]);

function isEpisodicCommunity(item: Experience): boolean {
  return EPISODIC_COMMUNITY_IDS.has(item.id);
}

function isCurrentOrganization(item: Experience): boolean {
  return (
    item.status === "current" &&
    item.types.some((type) => ["community", "work", "research", "teaching"].includes(type)) &&
    !isEpisodicCommunity(item)
  );
}

function isPastOrganization(item: Experience): boolean {
  return (
    item.status === "completed" &&
    (hasType(item, "community") || hasType(item, "work")) &&
    !isEpisodicCommunity(item)
  );
}

export type ExperienceArchiveSection = {
  id: string;
  title: string;
  items: Experience[];
};

/** 完整經歷頁上方的分類區塊；底部總表仍使用全部 EXPERIENCES。 */
export const EXPERIENCE_ARCHIVE_SECTIONS: ExperienceArchiveSection[] = [
  {
    id: "education",
    title: "學歷",
    items: EXPERIENCES.filter((item) => hasType(item, "education")).sort(byDateDesc),
  },
  {
    id: "certification",
    title: "證照",
    items: EXPERIENCES.filter((item) => hasType(item, "certification")).sort(byDateDesc),
  },
  {
    id: "competition",
    title: "競賽",
    items: EXPERIENCES.filter((item) => hasType(item, "competition")).sort(byDateDesc),
  },
  {
    id: "publication",
    title: "寫作／出版",
    items: EXPERIENCES.filter((item) => hasType(item, "publication")).sort(byDateDesc),
  },
  {
    id: "current-orgs",
    title: "現在所在組織及職務",
    items: EXPERIENCES.filter(isCurrentOrganization).sort(byDateDesc),
  },
  {
    id: "past-orgs",
    title: "過去所在組織及職務",
    items: EXPERIENCES.filter(isPastOrganization).sort(byDateDesc),
  },
  {
    id: "talks",
    title: "演講經歷",
    items: EXPERIENCES.filter((item) => hasType(item, "talk")).sort(byDateDesc),
  },
  {
    id: "organized-events",
    title: "舉辦活動",
    items: EXPERIENCES.filter(isOrganizedEvent).sort(byDateDesc),
  },
  {
    id: "performances",
    title: "表演經歷",
    items: EXPERIENCES.filter((item) => hasType(item, "performance")).sort(byDateDesc),
  },
  {
    id: "attended-events",
    title: "參與活動",
    items: EXPERIENCES.filter(isAttendedEvent).sort(byDateDesc),
  },
];
