## Why

目前 Epoch 轉換器的時間顯示使用 `toLocaleString`（含時區縮寫）與 `toUTCString()`，輸出格式因瀏覽器/地區設定而異，且不是開發者熟悉的標準格式。統一改為 `YYYY-MM-DD HH:MM:SS` 24 小時制，可讀性與可預測性更佳，方便直接複製貼到日誌、資料庫或程式中比對。

## What Changes

- 「目前時間」區塊的人類可讀時間改為 `YYYY-MM-DD HH:MM:SS` 24 小時制
- 「Timestamp → 日期」結果的本地時間（Local）與 UTC 時間改為 `YYYY-MM-DD HH:MM:SS` 24 小時制
- 移除時區縮寫文字（如 `GMT+8`）與 `toUTCString()` 的 `Sun, 22 Jun 2026 ...` 樣式，改用固定格式；UTC 結果以固定格式呈現並標示為 UTC
- 「日期 → Timestamp」的 datetime-local 輸入與秒/毫秒輸出邏輯不變（不受影響）

## Capabilities

### New Capabilities
<!-- 無新增 capability -->

### Modified Capabilities
- `epoch-converter`: 「將 Unix timestamp 轉換為人類可讀日期時間」與「顯示目前時間」的輸出格式需求變更為固定的 `YYYY-MM-DD HH:MM:SS` 24 小時制

## Impact

- 程式碼：`app/src/components/tools/dev/EpochConverterTool.tsx`（`formatDate` 與結果列的時間渲染）
- 無新增依賴、無 API 變更、無破壞性變更（純顯示格式調整）
