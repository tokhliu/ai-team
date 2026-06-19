# tool-catalog Specification

## Purpose

定義工具平台的目錄與導覽體驗，涵蓋首頁分類瀏覽、關鍵字搜尋、我的最愛、最近使用記錄、雙語介面與響應式佈局，作為各類工具的共同入口與導航框架。

## Requirements

### Requirement: 工具首頁與分類瀏覽
首頁 SHALL 展示所有工具，並依分類（文字工具、開發者工具、圖片工具、單位換算、數字工具）分組顯示。每個工具卡片 MUST 包含工具名稱、簡短描述、所屬分類 icon。

#### Scenario: 首頁載入顯示所有分類
- **WHEN** 使用者造訪首頁 `/`
- **THEN** 頁面顯示所有工具分類，每個分類下列出對應工具卡片

#### Scenario: 點擊工具卡片進入工具頁
- **WHEN** 使用者點擊任一工具卡片
- **THEN** 導航至 `/tools/[category]/[tool-name]` 對應工具頁面

### Requirement: 工具關鍵字搜尋
平台 SHALL 提供即時搜尋功能，使用者在搜尋框輸入文字時，MUST 即時過濾符合的工具（比對工具名稱與描述），不需按 Enter 送出。

#### Scenario: 搜尋有結果
- **WHEN** 使用者在搜尋框輸入 "json"
- **THEN** 只顯示名稱或描述含 "json" 的工具卡片，其他工具隱藏

#### Scenario: 搜尋無結果
- **WHEN** 使用者輸入不存在的關鍵字
- **THEN** 顯示 "找不到相關工具" 提示，並建議清除搜尋

#### Scenario: 清除搜尋
- **WHEN** 使用者清空搜尋框
- **THEN** 恢復顯示所有工具

### Requirement: 我的最愛（收藏工具）
使用者 SHALL 能夠將工具加入/移除我的最愛。收藏狀態 MUST 使用 localStorage 持久化，不需登入。首頁 MUST 提供 "我的最愛" 篩選檢視。

#### Scenario: 收藏工具
- **WHEN** 使用者點擊工具卡片上的收藏 icon
- **THEN** 工具被加入我的最愛，icon 變為已填滿狀態，localStorage 更新

#### Scenario: 取消收藏
- **WHEN** 使用者點擊已收藏工具的 icon
- **THEN** 工具從我的最愛移除，icon 恢復未填滿狀態

#### Scenario: 收藏狀態跨頁面保留
- **WHEN** 使用者收藏工具後重新整理頁面
- **THEN** 收藏狀態仍保留，與重整前一致

### Requirement: 最近使用記錄
平台 SHALL 自動記錄使用者最近使用的工具，上限 20 筆，採 FIFO 策略。首頁 MUST 在有記錄時顯示 "最近使用" 區塊。

#### Scenario: 自動記錄使用工具
- **WHEN** 使用者進入任一工具頁面
- **THEN** 該工具被加入最近使用清單的最前端

#### Scenario: 最近使用超過 20 筆
- **WHEN** 最近使用記錄已達 20 筆，使用者再使用新工具
- **THEN** 最舊的一筆記錄被移除，新工具加入最前端

### Requirement: 雙語介面（繁體中文 / 英文）
平台 SHALL 提供繁體中文與英文兩種語言介面，透過 URL locale prefix 切換（`/zh-TW/` 與 `/en/`）。語言切換元件 MUST 放置於導覽列，切換時保留當前工具頁面路由（僅切換語言）。預設語言根據瀏覽器 `Accept-Language` header 自動偵測。

#### Scenario: 自動偵測語言
- **WHEN** 使用者首次造訪平台，瀏覽器語言為 en-US
- **THEN** 自動導向 `/en/` 路由，介面顯示英文

#### Scenario: 手動切換語言
- **WHEN** 使用者在工具頁面 `/zh-TW/tools/text/word-count` 點擊語言切換至英文
- **THEN** 導向 `/en/tools/text/word-count`，頁面介面切換為英文，工具功能保持不變

#### Scenario: 持久化語言偏好
- **WHEN** 使用者手動切換語言後重新整理
- **THEN** 保持使用者上次選擇的語言（localStorage 記憶）

### Requirement: 響應式佈局
平台 MUST 在手機（375px）、平板（768px）、桌機（1280px+）三種寬度下正確顯示，工具卡片網格自動調整欄數。

#### Scenario: 手機版單欄顯示
- **WHEN** 瀏覽器寬度 < 640px
- **THEN** 工具卡片以單欄排列

#### Scenario: 桌機版多欄顯示
- **WHEN** 瀏覽器寬度 >= 1280px
- **THEN** 工具卡片以 4 欄排列

### Requirement: 工具清單包含 QR Code 產生器與 Epoch 轉換器
系統 SHALL 在工具總覽首頁及 dev 分類頁面顯示兩個新工具。

#### Scenario: 首頁顯示新工具
- **WHEN** 使用者進入首頁
- **THEN** 工具清單中可見「QR Code 產生器」與「Epoch 轉換器」

#### Scenario: 搜尋新工具
- **WHEN** 使用者搜尋「qrcode」或「epoch」或「時間戳」
- **THEN** 對應工具出現在搜尋結果中
