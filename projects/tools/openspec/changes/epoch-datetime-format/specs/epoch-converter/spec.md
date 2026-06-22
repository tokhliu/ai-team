## MODIFIED Requirements

### Requirement: 使用者可將 Unix timestamp 轉換為人類可讀日期時間
系統 SHALL 接受 Unix timestamp 輸入（秒或毫秒），並以固定格式 `YYYY-MM-DD HH:MM:SS`（24 小時制、零補位）顯示對應的本地時間與 UTC 時間。

#### Scenario: 輸入秒級 timestamp
- **WHEN** 使用者輸入 10 位數的 Unix timestamp（秒）
- **THEN** 系統以 `YYYY-MM-DD HH:MM:SS` 24 小時制顯示對應的本地時間與 UTC 時間

#### Scenario: 輸入毫秒級 timestamp
- **WHEN** 使用者輸入 13 位數的 Unix timestamp（毫秒）
- **THEN** 系統自動識別為毫秒並以 `YYYY-MM-DD HH:MM:SS` 24 小時制顯示對應時間

#### Scenario: 午夜與午後時間的 24 小時制呈現
- **WHEN** 對應時間落在午後（如下午 1 點）
- **THEN** 小時欄位 SHALL 以 24 小時制呈現（如 `13`），不使用 AM/PM

#### Scenario: 輸入無效值
- **WHEN** 使用者輸入非數字或超出有效範圍的值
- **THEN** 系統顯示錯誤提示，不渲染結果

### Requirement: 顯示目前時間的 timestamp
系統 SHALL 在頁面顯示目前時間對應的 Unix timestamp，並每秒自動更新；同時以固定格式 `YYYY-MM-DD HH:MM:SS`（24 小時制、本地時區）顯示目前時間的人類可讀字串。

#### Scenario: 頁面載入時顯示目前時間
- **WHEN** 使用者進入 Epoch 轉換器頁面
- **THEN** 系統顯示目前的 Unix timestamp（秒）並每秒更新，且人類可讀時間以 `YYYY-MM-DD HH:MM:SS` 24 小時制呈現
