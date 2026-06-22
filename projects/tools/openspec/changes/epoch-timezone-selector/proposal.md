## Why

目前 Epoch 轉換器「Timestamp → 日期」結果固定顯示本地時間與 UTC 兩列，使用者若想知道某個 timestamp 在「其他時區」（如東京、紐約、倫敦）對應的時間，必須自己換算。提供可選擇時區的下拉選單，能讓使用者直接查看任一時區的對應時間，提升工具實用性。

## What Changes

- 「Timestamp → 日期」結果區**保留** Local Time 列（本地時區）
- 原本的 **UTC Time 列改為可搜尋的時區下拉選單**：使用者選定任一時區後，該列即時顯示該 timestamp 在選定時區的 `YYYY-MM-DD HH:MM:SS`（24 小時制）
- 下拉選單內容：常用時區排前面 + 全部 IANA 時區（來自 `Intl.supportedValuesOf('timeZone')`），支援打字搜尋過濾
- 時區選擇器**預設選 UTC**（取代原本的 UTC 列預設行為）
- 上方「目前時間」區塊**不變**，維持顯示本地時區

## Capabilities

### New Capabilities
<!-- 無新增 capability -->

### Modified Capabilities
- `epoch-converter`: 「將 Unix timestamp 轉換為人類可讀日期時間」需求變更 — UTC 固定列改為使用者可從下拉選單選定任一時區，並以該時區呈現 `YYYY-MM-DD HH:MM:SS`

## Impact

- 程式碼：`app/src/components/tools/dev/EpochConverterTool.tsx`（結果區渲染、新增時區選擇 state 與時區格式化函式）
- i18n：`messages/zh-TW.json`、`messages/en.json`（`tools.epoch` namespace 新增時區選擇器標籤）
- 無新增依賴（使用原生 `Intl` 與 `<datalist>`）；無破壞性變更（Local Time 列維持，僅 UTC 列升級為可選時區）
