## MODIFIED Requirements

### Requirement: 使用者可將 Unix timestamp 轉換為人類可讀日期時間
系統 SHALL 接受 Unix timestamp 輸入（秒或毫秒），並以固定格式 `YYYY-MM-DD HH:MM:SS`（24 小時制、零補位）顯示：(1) 使用者本地時區的時間（Local Time 列），以及 (2) 使用者透過時區下拉選單選定之任一時區的時間。

#### Scenario: 輸入秒級 timestamp
- **WHEN** 使用者輸入 10 位數的 Unix timestamp（秒）
- **THEN** 系統以 `YYYY-MM-DD HH:MM:SS` 24 小時制顯示對應的本地時間，以及選定時區的時間

#### Scenario: 輸入毫秒級 timestamp
- **WHEN** 使用者輸入 13 位數的 Unix timestamp（毫秒）
- **THEN** 系統自動識別為毫秒並以 `YYYY-MM-DD HH:MM:SS` 24 小時制顯示對應的本地時間與選定時區時間

#### Scenario: 選擇其他時區
- **WHEN** 使用者從時區下拉選單選定一個時區（如 `Asia/Tokyo`）
- **THEN** 選定時區列即時更新，以 `YYYY-MM-DD HH:MM:SS` 24 小時制顯示該 timestamp 在該時區的時間（正確處理日光節約時間）

#### Scenario: 時區選擇器預設值
- **WHEN** 使用者進入頁面尚未變更時區選擇
- **THEN** 時區選擇器 SHALL 預設為 `UTC`

#### Scenario: 下拉選單分組與 offset 標示
- **WHEN** 使用者展開時區下拉選單
- **THEN** 選單 SHALL 提供精選常用時區，依區域分組（通用／亞洲／歐洲／美洲／大洋洲），每個選項以在地化城市名稱顯示，並標示該時區當下的 `(UTC+offset)`（隨日光節約正確變動）

#### Scenario: 午夜與午後時間的 24 小時制呈現
- **WHEN** 對應時間落在午後（如下午 1 點）
- **THEN** 小時欄位 SHALL 以 24 小時制呈現（如 `13`），不使用 AM/PM

#### Scenario: 輸入無效值
- **WHEN** 使用者輸入非數字或超出有效範圍的值
- **THEN** 系統顯示錯誤提示，不渲染結果
