## 1. 專案基礎建置

- [x] 1.1 以 `create-next-app` 建立 Next.js 15 專案（App Router、TypeScript、Tailwind CSS v4）
- [x] 1.2 安裝依賴套件：`next-intl`、`browser-image-compression`、`lucide-react`
- [x] 1.3 建立目錄結構：`src/app/[locale]/`、`src/components/`、`src/lib/tools/`、`messages/`
- [x] 1.4 設定 `next-intl` middleware 與 `next.config.ts`（locale routing：zh-TW、en）
- [x] 1.5 建立翻譯檔 `messages/zh-TW.json` 與 `messages/en.json`（含所有 UI 字串骨架）
- [x] 1.6 設定 `src/lib/tools-registry.ts`：定義所有工具的元資料（id、name、category、route、描述）

## 2. 設計系統與全域佈局

- [x] 2.1 設定 Tailwind CSS 自訂主題：深色調色盤（`#0a0a0a` 背景、`#00d4aa` accent）、Geist 字型
- [x] 2.2 建立根佈局 `src/app/[locale]/layout.tsx`：NextIntlClientProvider、HTML lang 屬性
- [x] 2.3 建立 `<Sidebar>` 元件：工具分類導航連結、品牌 Logo、語言切換下拉選單
- [x] 2.4 建立 `<TopBar>` 元件：搜尋框（全域搜尋）、語言切換（行動版）、我的最愛快捷鍵
- [x] 2.5 建立 `<ToolWrapper>` 共用容器：麵包屑、工具標題、描述、收藏按鈕
- [x] 2.6 建立 `<CopyButton>` 元件：一鍵複製 + toast 成功提示（2 秒自動消失）
- [x] 2.7 建立 `<Toast>` 通知元件（輕量實作，不引入額外通知套件）

## 3. 工具總覽首頁（tool-catalog）

- [x] 3.1 建立首頁路由 `src/app/[locale]/page.tsx`：讀取 tools-registry，依分類分組渲染
- [x] 3.2 建立 `<ToolCard>` 元件：工具名稱、描述、分類 icon、收藏切換按鈕
- [x] 3.3 實作即時搜尋功能：`useState` + 過濾 tools-registry，無結果時顯示提示
- [x] 3.4 實作我的最愛功能：`useFavorites` hook（localStorage 讀寫），首頁加入「我的最愛」篩選 Tab
- [x] 3.5 實作最近使用記錄：`useRecentTools` hook（localStorage，FIFO，上限 20 筆），首頁顯示「最近使用」區塊
- [x] 3.6 實作分類篩選側邊選單：點擊分類名稱只顯示該分類工具

## 4. 文字工具（text-tools）

- [x] 4.1 建立路由 `/tools/text/word-count`，實作 `<WordCountTool>`：即時統計中文字、英文單字、字元數、行數、段落數
- [x] 4.2 建立路由 `/tools/text/case-converter`，實作 `<CaseConverterTool>`：大寫、小寫、首字母大寫、句首大寫、交替大小寫
- [x] 4.3 建立路由 `/tools/text/fullwidth-converter`，實作 `<FullwidthConverterTool>`：全半形雙向轉換（數字、英文、標點）
- [x] 4.4 建立路由 `/tools/text/deduplicator`，實作 `<DeduplicatorTool>`：依行去重，含選項（忽略大小寫、忽略空白），顯示移除筆數
- [x] 4.5 建立路由 `/tools/text/line-break`，實作 `<LineBreakTool>`：移除多餘空行、移除所有換行、CRLF ↔ LF 互轉
- [x] 4.6 建立路由 `/tools/text/zh-converter`，實作 `<ZhConverterTool>`：動態載入繁簡字典（`next/dynamic`），載入中顯示骨架畫面

## 5. 開發者工具（developer-tools）

- [x] 5.1 建立路由 `/tools/dev/json-formatter`，實作 `<JsonFormatterTool>`：格式化（2/4 空格/Tab）、壓縮、錯誤行號提示
- [x] 5.2 建立路由 `/tools/dev/base64`，實作 `<Base64Tool>`：文字 ↔ Base64 編解碼（UTF-8）、無效 Base64 提示
- [x] 5.3 建立路由 `/tools/dev/url-encode`，實作 `<UrlEncodeTool>`：URL encode/decode 雙向轉換
- [x] 5.4 建立路由 `/tools/dev/hash`，實作 `<HashGeneratorTool>`：使用 Web Crypto API 計算 MD5（純 JS）、SHA-1、SHA-256、SHA-512，即時更新
- [x] 5.5 建立路由 `/tools/dev/regex-tester`，實作 `<RegexTesterTool>`：即時高亮匹配、顯示捕獲群組、flags 切換（g/i/m/s）、無效 regex 提示
- [x] 5.6 建立路由 `/tools/dev/color-converter`，實作 `<ColorConverterTool>`：HEX/RGB/HSL/HSV 互轉、顏色預覽方塊、color picker 輸入

## 6. 圖片工具（image-tools）

- [x] 6.1 建立路由 `/tools/image/compressor`，實作 `<ImageCompressorTool>`：使用 `browser-image-compression` + Web Worker，品質滑桿、大小比較、10MB 限制
- [x] 6.2 建立路由 `/tools/image/resizer`，實作 `<ImageResizerTool>`：寬高輸入、比例鎖定、Canvas API 縮放、自訂下載檔名
- [x] 6.3 建立路由 `/tools/image/converter`，實作 `<ImageConverterTool>`：JPEG/PNG/WebP 互轉、品質設定、大小比較
- [x] 6.4 建立路由 `/tools/image/to-base64`，實作 `<ImageToBase64Tool>`：產生 Data URI、純 Base64、HTML img tag、CSS background-image，各有獨立複製按鈕
- [x] 6.5 建立共用 `<ImageDropzone>` 元件：拖曳上傳 + 點擊選擇、圖片預覽縮圖、格式與大小驗證

## 7. 單位換算（unit-converter）

- [x] 7.1 建立通用 `<UnitConverterLayout>` 元件：單一輸入框 + 來源單位選單 → 即時顯示所有目標單位結果
- [x] 7.2 建立 `src/lib/tools/unit-converter/` 下的換算函式模組：length、weight、temperature、area、data-size、time
- [x] 7.3 建立路由 `/tools/convert/length`，實作長度換算（km/m/cm/mm/mi/yd/ft/in/nmi）
- [x] 7.4 建立路由 `/tools/convert/weight`，實作重量換算（t/kg/g/mg/lb/oz/台斤）
- [x] 7.5 建立路由 `/tools/convert/temperature`，實作溫度換算（°C/°F/K）
- [x] 7.6 建立路由 `/tools/convert/area`，實作面積換算（km²/m²/cm²/ha/坪/甲/mi²/acre）
- [x] 7.7 建立路由 `/tools/convert/data-size`，實作資料大小換算（Bit/Byte/KB/MB/GB/TB/PB），含二進位/十進位切換
- [x] 7.8 建立路由 `/tools/convert/time`，實作時間換算（年/月/週/天/時/分/秒/毫秒）

## 8. 數字工具（number-tools）

- [x] 8.1 建立路由 `/tools/number/base-converter`，實作 `<BaseConverterTool>`：二/八/十/十六進位即時同步、十六進位大小寫切換、負數與超大數警告
- [x] 8.2 建立路由 `/tools/number/random-generator`，實作 `<RandomGeneratorTool>`：整數範圍、UUID v4、隨機字串（自訂字元集）、批量產生（最多 100 組）
- [x] 8.3 建立路由 `/tools/number/number-format`，實作 `<NumberFormatTool>`：千分位格式化、小數位數控制、分隔符選擇、科學記號輸出

## 9. 多語系（i18n）完善

- [x] 9.1 完善 `messages/zh-TW.json`：填入所有工具的中文名稱、描述、UI 標籤、錯誤訊息
- [x] 9.2 完善 `messages/en.json`：填入對應的英文翻譯
- [x] 9.3 測試語言切換：所有路由在 `/zh-TW/` 與 `/en/` 下正確顯示對應語言
- [x] 9.4 設定 `<html lang>` 屬性隨 locale 動態更新（SEO + 無障礙）

## 10. SEO 與 Metadata

- [x] 10.1 為首頁設定 `generateMetadata`：title、description、og:image、og:title、og:description
- [x] 10.2 為每個工具頁面的 `page.tsx` 設定 `generateMetadata`（從 tools-registry 取得工具描述）
- [x] 10.3 建立 `src/app/sitemap.ts`：自動產生所有工具頁面的 sitemap（含 zh-TW/en 兩種語言路由）
- [x] 10.4 建立 `src/app/robots.ts`：允許爬蟲索引所有工具頁面

## 11. 品質驗收與部署

- [x] 11.1 執行 `next build`，確認零 TypeScript 錯誤、零編譯警告
- [x] 11.2 測試每個工具的核心功能（黃金路徑）：輸入 → 正確輸出 → 複製成功
- [x] 11.3 測試我的最愛與最近使用：操作後重整頁面，確認 localStorage 持久化正確
- [x] 11.4 測試語言切換：所有工具頁面在 zh-TW 與 en 間切換，確認路由與翻譯正確
- [x] 11.5 測試響應式佈局：375px（手機）、768px（平板）、1280px（桌機）三種寬度
- [ ] 11.6 部署至 Vercel：連結 GitHub Repo，設定生產環境，確認 Vercel 自動 CI 正常運作
