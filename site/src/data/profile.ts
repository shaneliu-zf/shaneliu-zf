export const ABOUT = {
  lead: "資工 · 資安 · 法律 · 魔術 · 催眠 · 魔方 · 雜技 · 音樂",
  paragraphs: [
    "目前就讀國立清華大學資訊工程學系博士班一年級（碩逕博），在清大資訊安全實驗室 IS Lab 做研究，指導老師為孫宏民教授。",
    "大學就讀國立台北科技大學資訊工程系，同時修讀科技法律學程。",
    "除了寫程式與研究資安，我同時也在擔任魔術顧問、比魔術方塊競賽，空閒時玩玩雜技或音樂，以及學習各式各樣奇怪的東西。",
  ],
};

export const HIGHLIGHTS = [
  "TUPC 2023 全國科技大專校院程式競賽 冠軍",
  "ICPC 2024 台灣站 銅獎第一名",
  "AIS3 Junior 2026 講師，主題《CTF 入門導論》",
  "台灣好厲駭導師深度輔導模式入選",
  "COSCUP 2026 講者，主題《打造你自己的 Kotlin DSL》",
  "TMA 台灣國際魔術大賽 台灣代表選手",
  "出版個人純手法紙牌魔術教學《PTSD》",
  "與另一位催眠師合辦兩場催眠體驗坊",
  "夢想一號魔術方塊學院綜合能力認證 A+（900 分），排名第十五",
  "特殊選才錄取國立台北科技大學資訊工程學系唯一名額",
];

export type SkillGroup = {
  title: string;
  items: string[];
};

export const SKILLS: SkillGroup[] = [
  {
    title: "程式語言",
    items: ["C++", "Kotlin", "Python3", "Java", "PHP", "JavaScript", "Julia", "C#", "Swift", "Brainfuck", "Matlab"],
  },
  {
    title: "資訊工程",
    items: ["程式語言", "演算法", "資訊安全", "CTF", "Code Golf", "Android／iOS 開發", "網站全端開發及架設維護", "電腦科學"],
  },
  {
    title: "表演藝術",
    items: ["魔術（硬幣、撲克牌、心靈、千術、派對、廳堂）", "催眠", "腹語"],
  },
  {
    title: "雜技",
    items: ["溜溜球", "劍玉", "蝴蝶刀", "水晶球", "雜耍球", "雜耍棒"],
  },
  {
    title: "手部極限運動",
    items: ["魔術方塊", "競技疊杯", "寶樂珠", "花式切牌"],
  },
  {
    title: "收藏",
    items: ["硬幣收藏", "飾品做舊打磨"],
  },
  {
    title: "音樂",
    items: ["鋼琴（流行樂即興作曲）", "吉他（民謠、電吉他、古典）", "烏克麗麗"],
  },
  {
    title: "運動及武術",
    items: ["飄移板", "蛇板", "雙龍板", "直排輪（花式、競速）", "跆拳道", "武術（華山派）"],
  },
  {
    title: "其他",
    items: ["法律", "德州撲克", "TCG","心理學", "歷史", "寫作"],
  },
];

export type Domain = {
  key: string;
  kicker: string;
  title: string;
  note: string;
  href: string;
  accent: "blue" | "purple" | "green" | "amber";
};

export const DOMAINS: Domain[] = [
  {
    key: "cs",
    kicker: "Computer Science",
    title: "資工",
    note: "資訊工程、資訊安全、競賽、研究與專案",
    href: "/cs/",
    accent: "blue",
  },
  {
    key: "performance",
    kicker: "Performing Arts",
    title: "表演藝術",
    note: "魔術、催眠、腹語、演出、製作與舞台幕後",
    href: "/performance/",
    accent: "purple",
  },
  {
    key: "dexterity",
    kicker: "Dexterity",
    title: "手部極限運動",
    note: "魔術方塊、競技疊杯、花式切牌與各種手技",
    href: "/dexterity/",
    accent: "green",
  },
  {
    key: "other",
    kicker: "Everything Else",
    title: "其他",
    note: "音樂、文學、法律、TCG、收藏與更多興趣",
    href: "/other/",
    accent: "amber",
  },
];

export const CS_PROFILE = {
  fields: ["演算法", "資訊安全", "CTF", "Code Golf", "應用開發", "全端開發", "網站架設與維護"],
  stack: ["C++", "Kotlin", "Python3", "Java", "PHP", "JavaScript", "C#", "Swift"],
  github: {
    user: "shaneliu-zf",
    url: "https://github.com/shaneliu-zf",
    chart: "https://ghchart.rshah.org/6d8cb0/shaneliu-zf",
  },
  wakatime: {
    url: "https://wakatime.com/@87d21309-7a14-498a-9e82-1222281de88c",
    badge: "https://wakatime.com/badge/user/87d21309-7a14-498a-9e82-1222281de88c.svg",
    note: "2022/3/28 開始計算",
  },
  current: [
    "清大資訊安全實驗室 IS Lab",
    "IBM Application Consultant Intern",
    "AIS3 Junior / COSCUP 講者",
  ],
  achievements: [
    "TUPC 冠軍、金獎第三名",
    "ICPC 台灣站兩屆銅獎",
    "IThome 鐵人賽 2023 完賽",
    "BugkuCTF 最高 42 名",
  ],
  credentials: [
    { name: "iPAS 資訊安全工程師初級", org: "經濟部產業人才能力檢定" },
    { name: "iPAS 機器學習工程師", org: "經濟部產業人才能力檢定" },
    { name: "CPE 5 題／7 題，3%", org: "大學程式能力檢定委員會" },
    { name: "APCS 觀念四／實作四", org: "教育部智慧創新跨域人才培育計畫" },
  ],
};
