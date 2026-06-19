# unit-converter Specification

## Purpose

提供一組單位換算工具，採用統一的即時換算 UI 模式，涵蓋長度、重量、溫度、面積、資料大小與時間等常見單位類別。

## Requirements

### Requirement: 單位換算通用介面
所有單位換算工具 SHALL 採用統一的 UI 模式：輸入值欄位 + 來源單位下拉選單 → 即時顯示所有目標單位的換算結果。輸入變更時 MUST 即時重新計算，不需點擊按鈕。

#### Scenario: 即時換算
- **WHEN** 使用者輸入數值或變更單位
- **THEN** 所有其他單位的換算結果即時更新，無需按下任何按鈕

#### Scenario: 輸入非數值
- **WHEN** 使用者輸入非數字內容
- **THEN** 所有換算結果顯示 "—"，不顯示錯誤訊息

### Requirement: 長度換算
系統 SHALL 支援以下長度單位互換：公里（km）、公尺（m）、公分（cm）、公釐（mm）、英里（mi）、碼（yd）、英尺（ft）、英寸（in）、海里（nmi）。

#### Scenario: 公尺換算至所有單位
- **WHEN** 使用者輸入 1 公尺
- **THEN** 頁面同時顯示 0.001 km、100 cm、1000 mm、0.000621 mi 等所有單位的換算結果

### Requirement: 重量換算
系統 SHALL 支援以下重量單位互換：公噸（t）、公斤（kg）、公克（g）、毫克（mg）、磅（lb）、盎司（oz）、台斤（斤）。

#### Scenario: 公斤換算至磅
- **WHEN** 使用者輸入 1 公斤
- **THEN** 顯示約 2.20462 磅

### Requirement: 溫度換算
系統 SHALL 支援攝氏（°C）、華氏（°F）、克耳文（K）三種溫度單位互換。

#### Scenario: 攝氏轉華氏
- **WHEN** 使用者輸入 100°C
- **THEN** 顯示 212°F 與 373.15K

#### Scenario: 絕對零度
- **WHEN** 使用者輸入 0 克耳文
- **THEN** 顯示 -273.15°C 與 -459.67°F

### Requirement: 面積換算
系統 SHALL 支援以下面積單位互換：平方公里（km²）、平方公尺（m²）、平方公分（cm²）、公頃（ha）、坪、甲、平方英里（mi²）、英畝（acre）。

#### Scenario: 坪換算
- **WHEN** 使用者輸入 1 坪
- **THEN** 顯示 3.305785 m²

### Requirement: 資料大小換算
系統 SHALL 支援以下資料大小單位互換：Bit、Byte、KB、MB、GB、TB、PB，採用二進位（1024 進位）標準，並提供十進位（1000 進位）切換選項。

#### Scenario: GB 轉換（二進位）
- **WHEN** 使用者輸入 1 GB（二進位模式）
- **THEN** 顯示 1024 MB、1,048,576 KB

#### Scenario: 切換進位標準
- **WHEN** 使用者切換為十進位模式
- **THEN** 1 GB 顯示為 1000 MB、1,000,000 KB

### Requirement: 時間換算
系統 SHALL 支援以下時間單位互換：年（year）、月（month，以 30 天計）、週（week）、天（day）、小時（hour）、分鐘（minute）、秒（second）、毫秒（millisecond）。

#### Scenario: 一年換算至秒
- **WHEN** 使用者輸入 1 年
- **THEN** 顯示 365 天、8760 小時、525,600 分鐘、31,536,000 秒
