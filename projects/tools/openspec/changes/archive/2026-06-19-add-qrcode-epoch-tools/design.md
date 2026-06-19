## Context

平台已有 25 個工具，分為 text、dev、image、convert、number 五個分類。新工具沿用現有 Next.js App Router + next-intl 架構，歸入 `dev` 分類，讓路由結構保持一致（`/tools/dev/qrcode`、`/tools/dev/epoch`）。

現有開發者工具已有 6 個：json-formatter、base64、url-encode、hash、regex-tester、color-converter。

## Goals / Non-Goals

**Goals:**
- 新增 QR Code 產生器：輸入文字/URL，即時渲染 QR Code，可下載 PNG
- 新增 Epoch 轉換器：Unix timestamp ↔ 人類可讀日期時間雙向轉換，顯示多時區
- 整合進現有分類、搜尋、我的最愛、最近使用等所有平台功能

**Non-Goals:**
- QR Code 掃描（需要相機 API，超出範圍）
- Epoch 工具不支援毫秒以下精度
- 不新增新的工具分類

## Decisions

**D1：QR Code 套件選擇 — 使用 `qrcode` npm 套件**
- `qrcode` 支援 Canvas、SVG、Data URL 輸出，純 client-side，無伺服器依賴
- 備選：`react-qr-code`（SVG-only，功能較少）、`qrcode.react`（React-specific wrapper，反而多一層）
- 選 `qrcode` 原生套件，直接操作 Canvas，與現有圖片工具風格一致

**D2：Epoch 工具不引入新套件**
- 使用 `Intl.DateTimeFormat` Web API 處理時區顯示，零依賴
- 備選：`date-fns`、`dayjs`（功能強但加大 bundle 大小，對此工具需求過重）

**D3：兩個工具都歸入 `dev` 分類**
- QR Code 和 Epoch 都是開發者日常使用的工具
- 不為這兩個工具建立新分類，避免分類過細

## Risks / Trade-offs

- `qrcode` 套件 Canvas 渲染在 SSR 時會失敗 → 用 `'use client'` 標記，與現有圖片工具相同做法
- Epoch 轉換依賴使用者系統時區 → 在 UI 上明確標示時區名稱，避免混淆

## Migration Plan

1. `npm install qrcode @types/qrcode`（只在 app/ 目錄下）
2. 新增 component 和 page 檔案
3. 更新 tools-registry、i18n messages
4. `npm run build` 驗證
5. `pm2 restart tools-app`
