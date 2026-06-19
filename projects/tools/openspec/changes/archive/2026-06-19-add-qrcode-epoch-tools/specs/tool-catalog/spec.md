## ADDED Requirements

### Requirement: 工具清單包含 QR Code 產生器與 Epoch 轉換器
系統 SHALL 在工具總覽首頁及 dev 分類頁面顯示兩個新工具。

#### Scenario: 首頁顯示新工具
- **WHEN** 使用者進入首頁
- **THEN** 工具清單中可見「QR Code 產生器」與「Epoch 轉換器」

#### Scenario: 搜尋新工具
- **WHEN** 使用者搜尋「qrcode」或「epoch」或「時間戳」
- **THEN** 對應工具出現在搜尋結果中
