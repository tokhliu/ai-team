## Context

`EpochConverterTool.tsx` 目前以兩種方式渲染時間：`formatDate` 內用 `date.toLocaleString(undefined, {...})`（含 `timeZoneName: 'short'`）產生本地時間字串，UTC 則用 `date.toUTCString()`（產生 `Sun, 22 Jun 2026 12:00:00 GMT` 樣式）。兩者格式都不是 `YYYY-MM-DD HH:MM:SS`。需求是統一改為固定的 24 小時制格式。

## Goals / Non-Goals

**Goals:**
- 「目前時間」與「Timestamp → 日期」的本地時間、UTC 時間皆以 `YYYY-MM-DD HH:MM:SS`（24 小時制、零補位）呈現
- 本地時間依使用者本地時區換算；UTC 時間依 UTC 換算，並標示為 UTC
- 不依賴外部日期函式庫，使用原生 `Date` 即可

**Non-Goals:**
- 不改動 timestamp 解析邏輯（秒/毫秒自動偵測）
- 不改動「日期 → Timestamp」的 datetime-local 輸入與秒/毫秒輸出
- 不新增時區選擇器

## Decisions

- 新增一個純函式 `formatDateTime(date, utc)`，回傳 `YYYY-MM-DD HH:MM:SS` 字串：
  - `utc === false`（本地）：取 `getFullYear / getMonth+1 / getDate / getHours / getMinutes / getSeconds`
  - `utc === true`：取對應的 `getUTC*` 方法
  - 每個欄位以 `String(n).padStart(2, '0')`（年用 4 位）零補位組合
- `formatDate` 改用 `formatDateTime`，回傳 `{ local, utc }`，兩者皆為固定格式字串
- 結果列：本地時間用 `formatDateTime(date, false)`；UTC 時間用 `formatDateTime(date, true)`，label 維持「UTC Time」即可清楚標示時區
- 移除 `toLocaleString` 的 `timeZoneName` 與 `toUTCString()` 用法
- 採原生 `getUTC*` / `get*` 而非 `Intl`：輸出格式固定、跨瀏覽器一致、無時區縮寫雜訊

## Risks / Trade-offs

- 移除時區縮寫後，本地時間不再顯示 `GMT+8` 之類標示。透過保留 label「Local Time / UTC Time」區分兩列，使用者仍可辨識，取捨後可接受。
- 純顯示變更，無資料相容性風險。
