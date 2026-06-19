# developer-tools Specification

## Purpose

提供一組 client-side 開發者輔助工具，涵蓋 JSON 格式化、編解碼、雜湊、正規表達式與色碼轉換等常用功能，所有運算皆在瀏覽器端完成，不上傳資料至伺服器。

## Requirements

### Requirement: JSON 格式化與壓縮工具
系統 SHALL 提供 JSON 的格式化（美化縮排）與壓縮（minify）功能。輸入非法 JSON 時 MUST 顯示具體的錯誤位置與說明。格式化縮排預設 2 空格，可切換為 4 空格或 Tab。

#### Scenario: 格式化有效 JSON
- **WHEN** 使用者輸入壓縮的 JSON 字串並點擊「格式化」
- **THEN** 輸出帶縮排的美化 JSON，並顯示節點數與大小資訊

#### Scenario: 輸入無效 JSON
- **WHEN** 使用者輸入格式錯誤的 JSON
- **THEN** 顯示錯誤提示，指出錯誤發生的行號與原因（如 "第 3 行：缺少右括號"）

#### Scenario: JSON 壓縮
- **WHEN** 使用者點擊「壓縮」
- **THEN** 輸出移除所有空白與換行的最小化 JSON

### Requirement: Base64 編解碼工具
系統 SHALL 支援文字與 Base64 的雙向轉換，以及檔案轉 Base64。文字編解碼 MUST 支援 UTF-8，檔案 Base64 MUST 顯示資料 URI 格式。

#### Scenario: 文字轉 Base64
- **WHEN** 使用者輸入文字並點擊「編碼」
- **THEN** 輸出對應的 Base64 字串

#### Scenario: Base64 轉文字
- **WHEN** 使用者輸入有效 Base64 字串並點擊「解碼」
- **THEN** 輸出原始文字

#### Scenario: 無效 Base64 解碼
- **WHEN** 使用者輸入非法 Base64 字串並嘗試解碼
- **THEN** 顯示錯誤提示 "無效的 Base64 字串"

### Requirement: URL 編解碼工具
系統 SHALL 提供 URL encode 與 decode 的雙向轉換，支援整段 URL 或部分參數值的編解碼。

#### Scenario: URL 編碼
- **WHEN** 使用者輸入含中文或特殊字元的文字
- **THEN** 輸出 percent-encoded 字串（如 "你好" → "%E4%BD%A0%E5%A5%BD"）

#### Scenario: URL 解碼
- **WHEN** 使用者輸入 percent-encoded 字串
- **THEN** 輸出解碼後的可讀文字

### Requirement: Hash 產生器工具
系統 SHALL 支援對輸入文字產生 MD5、SHA-1、SHA-256、SHA-512 雜湊值。所有雜湊計算 MUST 在 client-side 完成（使用 Web Crypto API 或純 JS 實作）。輸入變更時 MUST 即時重新計算所有雜湊值。

#### Scenario: 產生多種雜湊
- **WHEN** 使用者輸入任意文字
- **THEN** 頁面同時顯示該文字的 MD5、SHA-1、SHA-256、SHA-512 四種雜湊值（小寫十六進位）

#### Scenario: 空白輸入
- **WHEN** 輸入框為空
- **THEN** 顯示各演算法對空字串的雜湊值

### Requirement: 正規表達式測試器工具
系統 SHALL 提供正規表達式測試環境，包含：regex 輸入框（支援 flags：g、i、m、s）、測試文字輸入框、即時高亮顯示匹配結果、顯示所有匹配的捕獲群組。

#### Scenario: 有效 regex 匹配
- **WHEN** 使用者輸入 regex `/\d+/g` 並在測試文字中輸入 "abc123def456"
- **THEN** "123" 和 "456" 被高亮顯示，下方列出 2 個匹配結果

#### Scenario: 無效 regex
- **WHEN** 使用者輸入語法錯誤的 regex
- **THEN** 顯示 regex 錯誤訊息，測試文字不高亮

#### Scenario: 無匹配
- **WHEN** regex 在測試文字中無匹配
- **THEN** 顯示 "無匹配" 提示

### Requirement: 色碼轉換工具
系統 SHALL 支援 HEX、RGB、HSL、HSV 色彩格式的互轉。MUST 提供顏色預覽方塊（即時顯示所選顏色），支援從顏色選擇器（color picker）輸入。

#### Scenario: HEX 轉換為其他格式
- **WHEN** 使用者輸入 HEX 值 `#1a2b3c`
- **THEN** 頁面同時顯示對應的 RGB、HSL、HSV 值，以及顏色預覽方塊

#### Scenario: RGB 輸入轉換
- **WHEN** 使用者輸入 RGB 值 `rgb(255, 128, 0)`
- **THEN** 同步更新 HEX、HSL、HSV 欄位，顏色預覽即時更新

### Requirement: 開發者工具共用功能
所有開發者工具 SHALL 提供：一鍵複製輸出按鈕、清空按鈕、複製成功 toast 提示。

#### Scenario: 複製輸出
- **WHEN** 使用者點擊「複製」
- **THEN** 輸出內容複製至剪貼簿，顯示成功 toast 2 秒
