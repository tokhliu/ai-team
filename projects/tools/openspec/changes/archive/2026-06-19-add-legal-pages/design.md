## Context

ToolVerse 是 Next.js 16 App Router + next-intl（zh-TW / en）的純前端工具站，27+ 工具皆在瀏覽器執行。已申請 Google AdSense，loader script 與 ads.txt 已上線，但缺少法務頁面。現有版面 `[locale]/layout.tsx` 為左側 `Sidebar` + 右側 `<main>`，無頁尾。頁面有兩種寫法：互動工具用 `'use client'`，而靜態內容適合用 server component 搭配 `generateMetadata`。

## Goals / Non-Goals

**Goals:**
- 新增隱私權政策、關於、聯絡三個雙語頁面，內容符合 AdSense 政策揭露要求。
- 每頁可被搜尋引擎索引（`generateMetadata`）。
- 全站每頁皆有頁尾連結指向這三頁，確保爬蟲可發現。
- 不影響既有工具與版面行為。

**Non-Goals:**
- 不做後端表單送出（Contact 僅提供 email，不接收 POST）。
- 不引入 CMS 或 markdown 渲染相依；內容直接以 JSX + 翻譯字串呈現。
- 不處理 cookie consent 同意橫幅（後續若投放歐盟流量再評估，列為 Open Question）。

## Decisions

- **頁面用 server component + `generateMetadata`**：靜態內容無互動需求，server component 可直接輸出 SEO metadata 與被索引的 HTML，優於 client component。與既有工具頁的 server wrapper 模式一致。
- **文案放 `messages/*.json`**：沿用既有 next-intl 機制做雙語，集中管理，避免在元件硬編兩種語言。新增 `footer`、`privacy`、`about`、`contact` 命名空間。
- **新增 `Footer` 元件並掛在 layout 的 `<main>` 內底部**：相較於塞進 `Sidebar`（桌機限定、`hidden lg:flex`），放在 `<main>` 內可在手機與桌機都顯示，且每頁都渲染，爬蟲必定找得到內部連結。Footer 為 `'use client'` 以使用 `useLocale` / `useTranslations` 產生正確 locale 前綴連結。
- **隱私權政策揭露條款**：明確涵蓋 (1) 第三方廠商含 Google 使用 cookie 投放廣告；(2) Google 廣告 cookie（DoubleClick）依造訪行為投放；(3) 使用者可於 Google 廣告設定停用個人化廣告；(4) 本站工具於瀏覽器端執行、不蒐集上傳使用者輸入內容。這是 AdSense 通過審核的關鍵。

## Risks / Trade-offs

- [審核仍可能因內容量或其他政策被拒] → 本變更聚焦補齊最常見缺項（隱私頁），其餘（內容原創性、導覽）站方已具備；無法 100% 保證通過。
- [硬編法務文字可能不夠完整嚴謹] → 提供涵蓋 AdSense 要求的標準範本文字；如需正式法務審閱可後續再修，不阻擋上線。
- [雙語文案需同步維護] → 兩語系 key 結構一致，於 tasks 內列出對齊檢查。

## Migration Plan

1. 新增元件、頁面、翻譯 key。
2. `npm run build` 驗證，本機確認三頁與頁尾連結正常。
3. 透過 `deploy.sh` 部署。
4. 線上確認 `/zh-TW/privacy`、`/about`、`/contact` 與各語系皆可存取。
5. 回 AdSense 後台等待/觸發重新審核。
- 回退：移除 Footer 掛載與三個路由即可，無資料遷移風險。

## Open Questions

- 是否需要 cookie consent 同意橫幅（GDPR）？目前列為非目標，待有歐盟流量或投放需求再評估。
- Contact 是否要真實可收信的 email 位址？需使用者提供；暫以 placeholder，上線前由使用者確認替換。
