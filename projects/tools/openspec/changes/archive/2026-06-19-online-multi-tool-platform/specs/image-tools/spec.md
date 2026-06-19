## ADDED Requirements

### Requirement: 圖片壓縮工具
系統 SHALL 支援 JPEG 與 PNG 圖片的有損/無損壓縮，單檔上限 10MB。壓縮 MUST 在 client-side 使用 Web Worker 執行，不上傳至伺服器。MUST 顯示原始大小、壓縮後大小、壓縮率，並提供品質滑桿（1–100）。

#### Scenario: 壓縮 JPEG 圖片
- **WHEN** 使用者上傳 JPEG 圖片並調整品質至 80，點擊「壓縮」
- **THEN** 顯示壓縮進度條，完成後顯示原始大小、壓縮後大小、壓縮率，提供下載按鈕

#### Scenario: 超過大小限制
- **WHEN** 使用者嘗試上傳超過 10MB 的圖片
- **THEN** 顯示錯誤訊息 "檔案大小超過 10MB 限制"，不執行壓縮

#### Scenario: 不支援的格式
- **WHEN** 使用者上傳非圖片檔案
- **THEN** 顯示錯誤訊息 "不支援的格式，請上傳 JPEG 或 PNG"

### Requirement: 圖片尺寸調整工具
系統 SHALL 支援依寬度、高度或百分比調整圖片尺寸，預設鎖定長寬比。支援格式：JPEG、PNG、WebP。

#### Scenario: 鎖定比例縮放
- **WHEN** 使用者輸入新寬度 800px（原圖 1600x1200）且比例鎖定
- **THEN** 高度自動計算為 600px，預覽顯示調整後尺寸

#### Scenario: 自由調整尺寸
- **WHEN** 使用者解除比例鎖定，分別輸入寬高
- **THEN** 輸出圖片以指定的寬高輸出，不維持原比例

#### Scenario: 下載調整後圖片
- **WHEN** 調整完成，使用者點擊「下載」
- **THEN** 以原始檔名加上尺寸後綴（如 `photo_800x600.jpg`）下載

### Requirement: 圖片格式轉換工具
系統 SHALL 支援 JPEG、PNG、WebP 三種格式的互轉，並可調整輸出品質。

#### Scenario: PNG 轉 JPEG
- **WHEN** 使用者上傳 PNG 圖片，選擇輸出格式 JPEG，品質 90
- **THEN** 提供轉換後的 JPEG 檔案下載

#### Scenario: 轉換為 WebP
- **WHEN** 使用者選擇輸出格式 WebP
- **THEN** 輸出 WebP 格式，並顯示與原格式的大小比較

### Requirement: 圖片轉 Base64 工具
系統 SHALL 將上傳的圖片轉換為 Base64 Data URI 字串，並提供：完整 Data URI、僅 Base64 字串（不含前綴）、HTML `<img>` 標籤、CSS `background-image` 語法。

#### Scenario: 圖片轉 Base64
- **WHEN** 使用者上傳圖片
- **THEN** 自動產生並顯示 Data URI、純 Base64、HTML img tag、CSS background-image 四種格式，每個皆有獨立複製按鈕

#### Scenario: 圖片預覽
- **WHEN** 轉換完成
- **THEN** 顯示圖片預覽縮圖，確認轉換正確

### Requirement: 圖片工具拖曳上傳
所有圖片工具 SHALL 支援拖曳（drag & drop）上傳圖片，也支援點擊選擇檔案。

#### Scenario: 拖曳上傳
- **WHEN** 使用者將圖片拖曳至上傳區域並放開
- **THEN** 圖片被載入，顯示預覽，工具進入就緒狀態
