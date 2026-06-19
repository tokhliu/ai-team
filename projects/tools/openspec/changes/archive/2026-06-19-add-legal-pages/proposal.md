## Why

Google AdSense 已提出申請但尚未通過審核。目前網站缺少**隱私權政策頁**，這是 AdSense 政策的硬性要求（須揭露第三方/Google 廣告 cookie 的使用），也是工具站最常見的審核被拒原因。補上法務頁面可大幅提高通過機率，同時提升使用者信任。

## What Changes

- 新增**隱私權政策**頁面（`/[locale]/privacy`），內含 AdSense 必備揭露：第三方廠商與 Google 使用 cookie 投放廣告、Google 廣告 cookie（DoubleClick）、使用者可透過 Google 廣告設定停用個人化廣告，以及本站工具皆在瀏覽器端執行、不上傳資料的隱私說明。
- 新增**關於（About）**頁面（`/[locale]/about`）：說明 ToolVerse 的定位與隱私優先理念。
- 新增**聯絡（Contact）**頁面（`/[locale]/contact`）：提供聯絡方式（email），審核加分。
- 三頁皆**雙語**（zh-TW / en），透過現有 next-intl 機制。
- 新增**頁尾（Footer）**元件，於全站每頁顯示這三個頁面的連結，確保 Google 爬蟲可被動發現（內部連結）。
- 每頁設定 `generateMetadata`（title / description）以利 SEO 與被索引。

## Capabilities

### New Capabilities
- `legal-pages`: 隱私權政策、關於、聯絡三個靜態資訊頁面的內容要求與雙語、SEO metadata、AdSense 合規揭露條款。
- `site-footer`: 全站頁尾元件，提供法務頁面的內部連結與品牌資訊，使爬蟲與使用者皆可導覽至這些頁面。

### Modified Capabilities
<!-- 無既有 capability 的需求變更；本變更僅新增頁面與頁尾，不更動既有工具行為。 -->

## Impact

- **新增路由**：`src/app/[locale]/privacy/page.tsx`、`about/page.tsx`、`contact/page.tsx`
- **新增元件**：`src/components/layout/Footer.tsx`
- **修改**：`src/app/[locale]/layout.tsx`（在 `<main>` 下方掛入 `<Footer />`）
- **修改**：`messages/zh-TW.json`、`messages/en.json`（新增 footer 與三頁文案 keys）
- **無**資料庫、API、第三方相依變更；不影響既有 27+ 工具
- 上線後須在 AdSense 後台確認頁面可被存取，等待重新審核
