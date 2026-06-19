## Context

全新專案，無既有系統限制。目標是打造一個具有獨特品牌風格的中文多工具整合平台，以深色科技風 UI 區別於市場上常見的白底工具站（如 mytoolster、smallseotools）。所有工具在瀏覽器端執行，保護用戶隱私，同時降低基礎設施成本至零。

## Goals / Non-Goals

**Goals:**
- 以 Next.js 15 App Router 建立 SSG 靜態站點，部署至 Vercel
- 提供 30+ 工具，分 6 大類，全部 client-side 執行
- 深色科技風 UI（深灰/黑底 + 青綠色 accent），與競品形成明顯差異
- localStorage 實作我的最愛 + 最近使用，無需登入
- SEO 友善：每個工具有獨立頁面、meta title/description、結構化資料

**Non-Goals:**
- 使用者帳號系統 / 雲端儲存
- 需要後端 API 的工具（如 AI 生成、外部資料查詢）
- 付費牆或廣告系統
- 工具結果的伺服器端快取
- 兩種語言以上（MVP：繁體中文 + 英文）

## Decisions

### D1: Next.js 15 App Router + TypeScript
**Why**: App Router 支援 RSC 與靜態路由，`generateStaticParams` 可預先產生所有工具頁面，SEO 效果最佳。TypeScript 確保工具 I/O 型別安全。
**Alternatives considered**: Astro（更輕量但生態系較小）、Vite SPA（無 SSG，SEO 差）

### D2: 工具模組化架構
每個工具為獨立 React 元件，路由結構為 `/tools/[category]/[tool-name]`。
```
src/
  app/
    tools/[category]/[tool-name]/page.tsx  ← 路由頁面
  components/tools/[tool-name]/            ← 工具 UI 元件
  lib/tools/[tool-name]/                   ← 純函式邏輯（可單元測試）
```
工具邏輯與 UI 分離，純函式邏輯放 `lib/tools/` 方便測試。

### D3: 深色科技風設計系統
- 背景色：`#0a0a0a`（近黑）/ `#111111`（卡片）/ `#1a1a1a`（hover）
- Accent：`#00d4aa`（青綠，科技感）
- 文字：`#e5e5e5`（主）/ `#888888`（次）
- 字型：`Geist Mono`（數字/代碼）+ `Geist Sans`（正文）
- 組件：無圓角或極小圓角（2px），邊框使用 `1px solid #2a2a2a`

**Why**: 與競品白色系形成強烈對比，目標用戶（開發者、科技愛好者）偏好深色介面。

### D4: 圖片工具使用 Web Workers
圖片壓縮與格式轉換為 CPU 密集操作，使用 Web Workers 避免阻塞主執行緒，搭配 `browser-image-compression` 套件。

### D5: 工具元資料集中管理
所有工具的名稱、分類、描述、路由、icon 集中在 `src/lib/tools-registry.ts`，首頁和搜尋功能從此單一來源讀取，避免資料重複。

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| 圖片處理在低階裝置上卡頓 | Web Workers + 進度條 + 檔案大小上限（10MB）|
| 工具數量增加導致首頁載入慢 | 虛擬滾動（僅在工具數超過 50 時啟用）|
| 中文字型載入延遲 | 使用系統字型 fallback，Google Fonts 非同步載入 |
| localStorage 容量限制（5MB） | 我的最愛只存 tool ID（字串），最近使用限制最多 20 筆 |
| SEO：動態工具結果無法被索引 | 工具說明、使用方式為靜態內容，結果為動態，不影響主要 SEO 訴求 |

## Migration Plan

N/A — 全新專案，無既有資料需遷移。

部署流程：
1. `git push` → Vercel CI 自動觸發
2. `next build` 產生靜態頁面
3. 預覽網址驗收後 promote 至 production

回滾策略：Vercel 一鍵回滾至前一個 deployment。

## Decisions (Additional)

### D6: 繁簡轉換字典動態載入
繁簡轉換字典檔（~2MB）採動態載入（`next/dynamic` + `import()`），僅在使用者進入繁簡轉換工具頁面時下載，不影響其他頁面的初始載入效能。

### D7: i18n（繁體中文 + 英文雙語介面）
使用 `next-intl` 套件實作 i18n。路由結構採 locale prefix：`/zh-TW/tools/...` 與 `/en/tools/...`。翻譯檔存放於 `messages/zh-TW.json` 與 `messages/en.json`。工具邏輯層（lib/tools/）不含任何語言字串，僅 UI 層使用翻譯函式 `t()`。
