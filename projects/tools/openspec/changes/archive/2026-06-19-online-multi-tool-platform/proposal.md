## Why

開發者與一般用戶在日常工作中頻繁需要各式小工具（文字處理、圖片壓縮、JSON 格式化、單位換算等），卻需要在多個網站之間切換。本專案打造一個具有獨特品牌風格的中文多工具整合平台，讓使用者在單一網站完成所有常用工具需求。

## What Changes

- 新建一個完整的前端 Web 應用，採用 Next.js + Tailwind CSS 技術棧
- 提供 30+ 實用線上工具，依功能分類組織
- 設計獨特的深色系科技風 UI，有別於市面上常見的白底工具站
- 工具全部在 client-side 執行，無需後端 API，保護使用者隱私
- 支援全文搜尋、我的最愛、最近使用紀錄

## Capabilities

### New Capabilities

- `tool-catalog`: 工具總覽頁面，含分類瀏覽、關鍵字搜尋、熱門工具排行、我的最愛；支援繁體中文／英文雙語介面（next-intl）
- `text-tools`: 文字工具集 — 字數統計、大小寫轉換、全半形轉換、文字去重、換行處理、繁簡轉換
- `developer-tools`: 開發者工具集 — JSON 格式化/壓縮、Base64 編解碼、URL 編解碼、Hash 產生器（MD5/SHA1/SHA256）、正規表達式測試器、色碼轉換
- `image-tools`: 圖片工具集 — 圖片壓縮、尺寸調整、格式轉換（PNG/JPG/WebP）、圖片轉 Base64
- `unit-converter`: 單位換算工具集 — 長度、重量、溫度、面積、時間、資料大小
- `number-tools`: 數字工具集 — 進制轉換（二/八/十/十六進制）、隨機數產生器、數字格式化

### Modified Capabilities

## Impact

- 全新專案，不影響任何現有系統
- 技術依賴：Next.js 15、React 19、Tailwind CSS v4、TypeScript、next-intl（i18n）、browser-image-compression（Web Worker）
- 部署目標：Vercel（靜態站點，零後端成本）
- 預估工具數：30+ 個，分 6 大類
