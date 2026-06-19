## Why

平台目前缺少兩個常用工具：QR Code 產生器與 Unix Epoch 時間轉換器。這兩個工具原本以獨立靜態頁面形式存在，現在整合進多工具平台，讓使用者在同一介面就能使用。

## What Changes

- 新增 `qrcode` 工具類別（或歸入 `dev` 分類），包含 QR Code 產生器
- 新增 `dev` 分類下的 Epoch 時間轉換器工具
- 更新 `tools-registry.ts` 加入兩個新工具的元資料
- 更新 `messages/zh-TW.json` 與 `messages/en.json` 加入對應翻譯

## Capabilities

### New Capabilities

- `qrcode-generator`: QR Code 產生器 — 輸入文字/URL，即時產生可下載的 QR Code 圖片，支援尺寸與容錯等級設定
- `epoch-converter`: Unix Epoch 時間轉換器 — Epoch 秒/毫秒 ↔ 人類可讀日期時間雙向轉換，顯示多時區結果與目前時間

### Modified Capabilities

- `tool-catalog`: 首頁工具清單需加入兩個新工具（tools-registry 新增條目）

## Impact

- `src/lib/tools-registry.ts`：新增 2 筆工具記錄
- `src/components/tools/dev/`：新增 `EpochConverterTool.tsx`
- `src/components/tools/dev/`：新增 `QrCodeGeneratorTool.tsx`
- `src/app/[locale]/tools/dev/epoch/page.tsx`：新路由
- `src/app/[locale]/tools/dev/qrcode/page.tsx`：新路由
- `messages/zh-TW.json`、`messages/en.json`：新增翻譯字串
- 新增套件依賴：`qrcode`（client-side QR Code 產生）
