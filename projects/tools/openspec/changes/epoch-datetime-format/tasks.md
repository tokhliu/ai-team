## 1. 實作固定格式時間函式

- [x] 1.1 在 `EpochConverterTool.tsx` 新增純函式 `formatDateTime(date: Date, utc: boolean): string`，回傳 `YYYY-MM-DD HH:MM:SS`（24 小時制、零補位；`utc` 為 true 時用 `getUTC*` 方法）
- [x] 1.2 改寫 `formatDate`，改用 `formatDateTime` 回傳 `{ local, utc }`，移除 `toLocaleString` 的 `timeZoneName` 與 `toUTCString()`

## 2. 套用至各顯示區塊

- [x] 2.1 「目前時間」區塊改用 `formatDateTime(new Date(now * 1000), false)`（透過 `formatDate(...).local`，內部已轉用 `formatDateTime`）
- [x] 2.2 「Timestamp → 日期」結果列：Local Time 用 `formatDateTime(parsed.date, false)`、UTC Time 用 `formatDateTime(parsed.date, true)`

## 3. 驗證

- [x] 3.1 `npm run build` 通過（型別與編譯無誤）
- [x] 3.2 手動驗證：輸入秒級/毫秒級 timestamp，本地與 UTC 皆呈現 `YYYY-MM-DD HH:MM:SS` 24 小時制；午後時間小時為 13~23；目前時間區塊格式正確
