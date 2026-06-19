# epoch-converter Specification

## Purpose

定義 Epoch（Unix timestamp）轉換器工具的行為，提供 Unix timestamp 與人類可讀日期時間的雙向轉換、目前時間 timestamp 顯示，以及一鍵複製功能。

## Requirements

### Requirement: 使用者可將 Unix timestamp 轉換為人類可讀日期時間
系統 SHALL 接受 Unix timestamp 輸入（秒或毫秒），並顯示對應的本地時間、UTC 時間。

#### Scenario: 輸入秒級 timestamp
- **WHEN** 使用者輸入 10 位數的 Unix timestamp（秒）
- **THEN** 系統顯示對應的本地時間與 UTC 時間

#### Scenario: 輸入毫秒級 timestamp
- **WHEN** 使用者輸入 13 位數的 Unix timestamp（毫秒）
- **THEN** 系統自動識別為毫秒並顯示對應時間

#### Scenario: 輸入無效值
- **WHEN** 使用者輸入非數字或超出有效範圍的值
- **THEN** 系統顯示錯誤提示，不渲染結果

### Requirement: 使用者可將日期時間轉換為 Unix timestamp
系統 SHALL 提供日期時間輸入欄位（datetime-local input），並輸出對應的秒級與毫秒級 timestamp。

#### Scenario: 選擇日期時間
- **WHEN** 使用者透過 datetime-local 選擇器選擇日期與時間
- **THEN** 系統即時顯示對應的秒級 timestamp 與毫秒級 timestamp

### Requirement: 顯示目前時間的 timestamp
系統 SHALL 在頁面顯示目前時間對應的 Unix timestamp，並每秒自動更新。

#### Scenario: 頁面載入時顯示目前時間
- **WHEN** 使用者進入 Epoch 轉換器頁面
- **THEN** 系統顯示目前的 Unix timestamp（秒），每秒更新一次

### Requirement: 一鍵複製 timestamp
系統 SHALL 在每個 timestamp 輸出旁提供複製按鈕。

#### Scenario: 複製秒級 timestamp
- **WHEN** 使用者點擊秒級 timestamp 旁的複製按鈕
- **THEN** 系統將該值複製至剪貼簿，並顯示複製成功提示
