## 1. 翻譯文案

- [x] 1.1 在 `messages/zh-TW.json` 新增 `footer`、`privacy`、`about`、`contact` 命名空間文案（隱私頁含 AdSense 揭露條款全文）
- [x] 1.2 在 `messages/en.json` 新增對應的英文文案，key 結構與 zh-TW 完全對齊

## 2. 頁尾元件

- [x] 2.1 建立 `src/components/layout/Footer.tsx`（`'use client'`，用 `useLocale`/`useTranslations`，輸出 privacy/about/contact 連結與品牌、版權年份）
- [x] 2.2 在 `src/app/[locale]/layout.tsx` 的 `<main>` 內底部掛入 `<Footer />`，確認不破壞既有 flex 版面

## 3. 法務頁面

- [x] 3.1 建立 `src/app/[locale]/privacy/page.tsx`（server component + `generateMetadata`，雙語標題/描述，渲染隱私權政策含 AdSense 揭露）
- [x] 3.2 建立 `src/app/[locale]/about/page.tsx`（server component + `generateMetadata`）
- [x] 3.3 建立 `src/app/[locale]/contact/page.tsx`（server component + `generateMetadata`，顯示聯絡 email）

## 4. 驗證與部署

- [x] 4.1 `npm run build` 通過，無型別/lint 錯誤
- [x] 4.2 本機確認 `/zh-TW/privacy`、`/en/privacy`、`/about`、`/contact` 皆可開啟，頁尾連結語系前綴正確
- [x] 4.3 透過 `deploy.sh` 部署，並於線上驗證三頁與頁尾可存取
