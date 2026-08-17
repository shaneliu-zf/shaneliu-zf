# 櫛雨沐晴 · 個人網站

從零打造的 Astro 靜態網站，Bento 風格。GitHub 主頁的 `readme.md` 與 `docs/` 維持不變，這裡是網頁版本。

## 開發

```bash
cd site
npm install
npm run dev      # 本機預覽
npm run build    # 產生 dist/
npm run preview  # 預覽 build 結果
```

若在 macOS 遇到 telemetry 權限錯誤，執行前加上 `ASTRO_TELEMETRY_DISABLED=1`。

## 路由

| 路徑 | 內容 |
| --- | --- |
| `/` | 跨域首頁，Bento 卡片、現況、亮點、身分表 |
| `/experiences/` | 完整經歷資料庫與 GitHub Markdown 全紀錄 |
| `/performance/` | 表演藝術：魔術、催眠、演出、製作與幕後 |
| `/dexterity/` | 手部極限運動：魔術方塊、雜技與手技 |
| `/other/` | 音樂、文字、法律、遊戲、運動與其他興趣 |
| `/blog/` | 導向既有個人網站 `https://shaneliu.studio-alvitr.com/` |
| `/cs/` | 資工頁，深色終端機風格 |
| `/rss.xml`、`/sitemap-index.xml` | 訂閱與網站地圖 |

## 改內容的地方

- `src/data/site.ts`：站名、導覽、外部連結
- `src/data/profile.ts`：首頁介紹、能力、領域卡片與資工頁資料
- `src/data/experiences.json`：經歷資料庫；包含領域、類型、日期、結果、角色、描述、連結與圖片
- `src/lib/experiences.ts`：驗證、排序、日期顯示與經歷總覽分組
- `src/content/blog/*.md`：文章。frontmatter 需要 `title`、`description`、`pubDate`、`domain`（`cs` / `magic` / `cubing` / `misc`），可選 `tags`、`updatedDate`、`draft`
- `src/styles/`：`base.css`（共用變數）、`home.css`、`cs.css`、`blog.css`

新增文章只要在 `src/content/blog/` 放一個 `.md`，檔名就是網址 slug，列表、資工頁、RSS 都會自動更新。
