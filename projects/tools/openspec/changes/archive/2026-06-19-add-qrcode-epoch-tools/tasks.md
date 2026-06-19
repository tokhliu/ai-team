## 1. 安裝套件與更新 Registry

- [x] 1.1 在 `app/` 目錄下安裝 `qrcode` 與 `@types/qrcode`
- [x] 1.2 在 `src/lib/tools-registry.ts` 新增 `qrcode` 工具條目（category: 'dev', slug: 'qrcode', icon: 'QrCode'）
- [x] 1.3 在 `src/lib/tools-registry.ts` 新增 `epoch` 工具條目（category: 'dev', slug: 'epoch', icon: 'Clock4'）

## 2. 多語系翻譯

- [x] 2.1 在 `messages/zh-TW.json` 新增 `tools.qrcode.name`、`tools.qrcode.description` 及工具內所有 UI 標籤
- [x] 2.2 在 `messages/en.json` 新增對應英文翻譯

## 3. QR Code 產生器元件

- [x] 3.1 建立 `src/components/tools/dev/QrCodeGeneratorTool.tsx`：文字輸入框、Canvas 即時渲染、尺寸選項（128/256/512px）、容錯等級選項（L/M/Q/H）
- [x] 3.2 實作下載 PNG 功能：`canvas.toDataURL()` → 觸發瀏覽器下載，輸入為空時 disable 按鈕
- [x] 3.3 建立路由 `src/app/[locale]/tools/dev/qrcode/page.tsx`：包含 `generateMetadata` 與 `<QrCodeGeneratorTool />`

## 4. Epoch 轉換器元件

- [x] 4.1 建立 `src/components/tools/dev/EpochConverterTool.tsx`：顯示目前 timestamp（每秒更新）、timestamp → 日期時間轉換區塊、日期時間 → timestamp 轉換區塊
- [x] 4.2 實作自動識別秒/毫秒邏輯（10 位數 = 秒，13 位數 = 毫秒），顯示本地時間與 UTC 時間
- [x] 4.3 在各輸出旁整合 `<CopyButton>` 元件
- [x] 4.4 建立路由 `src/app/[locale]/tools/dev/epoch/page.tsx`：包含 `generateMetadata` 與 `<EpochConverterTool />`

## 5. 驗收

- [x] 5.1 執行 `npm run build`，確認零 TypeScript 錯誤
- [ ] 5.2 確認 QR Code 工具：輸入文字即時渲染、切換尺寸與容錯等級、下載 PNG 正常
- [ ] 5.3 確認 Epoch 工具：timestamp → 日期、日期 → timestamp、複製按鈕、目前時間每秒更新
- [ ] 5.4 確認首頁搜尋「qrcode」、「epoch」、「時間戳」均能找到對應工具
- [x] 5.5 執行 `pm2 restart tools-app` 部署上線
