## ADDED Requirements

### Requirement: 全站頁尾與法務連結

系統 SHALL 在每個頁面顯示頁尾（Footer），並包含指向隱私權政策、關於、聯絡頁面的內部連結，連結 MUST 帶正確的語系前綴，使使用者與搜尋引擎爬蟲皆可導覽至這些頁面。

#### Scenario: 頁尾出現於所有頁面

- **WHEN** 使用者造訪任一頁面（首頁、工具頁或法務頁）
- **THEN** 頁尾顯示於主內容區下方，並在桌機與行動裝置皆可見

#### Scenario: 法務頁面內部連結

- **WHEN** 頁尾被渲染於語系 `<locale>`
- **THEN** 頁尾 SHALL 提供連向 `/<locale>/privacy`、`/<locale>/about`、`/<locale>/contact` 的連結，文字依當前語系顯示

#### Scenario: 品牌資訊

- **WHEN** 頁尾被渲染
- **THEN** 頁尾 SHALL 顯示 ToolVerse 品牌名稱與版權年份
