## Context

`EpochConverterTool.tsx`（client component）目前在「Timestamp → 日期」結果區固定渲染兩列：Local Time（`formatDateTime(date, false)`）與 UTC Time（`formatDateTime(date, true)`）。`formatDateTime` 使用原生 `Date` 的 `get*`／`getUTC*` 取值，僅支援「本地」與「UTC」兩種時區。本變更要讓 UTC 列升級為「任一可選時區」。

## Goals / Non-Goals

**Goals:**
- 保留 Local Time 列不變
- UTC 列改為「時區下拉選單 + 該時區轉換結果」，可搜尋、涵蓋全部 IANA 時區、預設 UTC
- 任一時區的轉換需正確（含日光節約），輸出固定 `YYYY-MM-DD HH:MM:SS` 24 小時制
- 零新依賴

**Non-Goals:**
- 不改動上方「目前時間」區塊（維持本地時區）
- 不改動「日期 → Timestamp」區塊
- 不做自訂 combobox UI（用原生 datalist 即可）
- 不記憶使用者上次選的時區（YAGNI；每次進頁預設 UTC）

## Decisions

- **可搜尋下拉**：用原生 `<input list="tz-list">` + `<datalist id="tz-list">`，options 來自 `Intl.supportedValuesOf('timeZone')`。原生 datalist 提供打字過濾，零依賴、跨瀏覽器支援良好。常用時區（UTC、Asia/Taipei、Asia/Tokyo、Asia/Shanghai、America/New_York、Europe/London 等）以陣列置於清單最前，其餘 IANA 時區接續。
- **時區狀態**：新增 `const [tz, setTz] = useState('UTC')`。
- **任意時區格式化**：新增 `formatInTimeZone(date: Date, timeZone: string): string`，用 `Intl.DateTimeFormat('en-CA', { timeZone, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false })` 的 `formatToParts`，依 part type 組出 `YYYY-MM-DD HH:MM:SS`。以 `formatToParts` 組裝避免 locale 差異與 `24:00` 邊界問題。
- **本地列**：沿用既有 `formatDateTime(date, false)`，不動。
- **輸入驗證**：若使用者在 `<input>` 打了不存在的時區字串，`Intl.DateTimeFormat` 會丟出 `RangeError` → 以 try/catch 包住，無效時顯示提示或退回不渲染該列。
- **i18n**：`tools.epoch` namespace 新增 `selectedTimezone`（列標籤）與 `timezonePlaceholder`（input placeholder），zh-TW / en 各一份。

## Risks / Trade-offs

- `Intl.supportedValuesOf` 與 `datalist` 在現代瀏覽器皆支援；極舊瀏覽器若無 `supportedValuesOf`，以 `typeof` 檢查並退回常用時區清單，避免整頁壞掉。
- datalist 在不同瀏覽器 UI 略有差異（部分需點擊箭頭或先聚焦才顯示全部），屬可接受的原生行為取捨，換得零依賴與輕量。
- 純前端顯示變更，無資料相容性風險。
