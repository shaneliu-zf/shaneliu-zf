export const SITE = {
  name: "劉承軒 / Shane Liu（櫛風）",
  shortName: "櫛雨沐晴",
  wordmark: { head: "櫛雨", tail: "沐晴" },
  tagline: "一個學了各種奇怪東西的人",
  role: "國立清華大學資訊工程學系博士班一年級",
  domainsLine: "資工 · 資安 · 法律 · 魔術 · 催眠 · 魔方 · 雜技 · 音樂 ……",
  description:
    "劉承軒（櫛風）的個人網站。資工博士生，同時是魔術師、催眠師與魔術方塊講師。這裡放的是完整的我，不是被裁切成一種身分的我。",
  blogUrl: "https://shaneliu.studio-alvitr.com/",
  locale: "zh-TW",
  language: "zh-Hant",
} as const;

export const NAV = [
  { label: "首頁", href: "/" },
  { label: "經歷", href: "/experiences/" },
  { label: "CS", href: "/cs/" },
  { label: "blog", href: SITE.blogUrl, external: true },
] as const;
