## 1. 時區格式化與資料

- [x] 1.1 在 `EpochConverterTool.tsx` 新增 `formatInTimeZone(date: Date, timeZone: string): string`，用 `Intl.DateTimeFormat('en-CA', { timeZone, hour12:false, ... })` 的 `formatToParts` 組出 `YYYY-MM-DD HH:MM:SS`，並用 try/catch 處理無效時區
- [x] 1.2 建立時區清單：常用時區陣列（UTC、Asia/Taipei、Asia/Tokyo、Asia/Shanghai、Asia/Singapore、America/New_York、America/Los_Angeles、Europe/London 等）置前，接續 `Intl.supportedValuesOf('timeZone')`（含 `typeof` fallback）去重

## 2. UI 與狀態

- [x] 2.1 新增 `const [tz, setTz] = useState('UTC')`
- [x] 2.2 將原 UTC Time 結果列改為：`<input list>` + `<datalist>` 時區選擇器（可搜尋）＋ 顯示 `formatInTimeZone(parsed.date, tz)` 的結果列；Local Time 列保留不動
- [x] 2.3 上方「目前時間」區塊與「日期 → Timestamp」區塊維持不變

## 3. i18n

- [x] 3.1 `messages/zh-TW.json` 與 `messages/en.json` 的 `tools.epoch` 新增 `selectedTimezone`、`timezonePlaceholder` 文案

## 4. 驗證

- [x] 4.1 `npm run build` 通過
- [x] 4.2 手動驗證：輸入秒/毫秒 timestamp，Local 列維持本地時間；選 Asia/Tokyo、America/New_York 等時區，結果列正確換算為 `YYYY-MM-DD HH:MM:SS` 24 小時制（含日光節約日期）；預設為 UTC

## 5. UX 重做：可搜尋 datalist → 精選分組 select + offset 標示

- [x] 5.1 移除 datalist 機制（`COMMON_TIMEZONES`/`ALL_TIMEZONES` 與 `<input list>`+`<datalist>`），改為精選分組 `TZ_GROUPS` 常數
- [x] 5.2 新增 `tzOffsetLabel(date, timeZone)`，用 `Intl.DateTimeFormat` 的 `shortOffset` 取得 `UTC+offset`（DST 正確、半小時時區如 `UTC+5:30` 正確）
- [x] 5.3 結果列改用原生 `<select>` + `<optgroup>`（區域分組），選項顯示「在地化城市名 (UTC+offset)」，value 為 IANA id，預設 UTC
- [x] 5.4 i18n：`tools.epoch.tz.regions.*` 與 `tools.epoch.tz.zones.*`（zh-TW/en），移除 `timezonePlaceholder`、`invalidTimezone`
- [x] 5.5 `npm run build` 通過；Node 驗證 offset（UTC+0、UTC+8、UTC+5:30、紐約夏 -4/冬 -5、雪梨南半球 DST）
