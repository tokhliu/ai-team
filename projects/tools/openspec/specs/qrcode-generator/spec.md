# qrcode-generator Specification

## Purpose

定義 QR Code 產生器工具的行為，提供由文字或 URL 即時產生 QR Code、調整尺寸與容錯等級，以及匯出為 PNG 檔案的功能。

## Requirements

### Requirement: 使用者可輸入文字或 URL 產生 QR Code
系統 SHALL 接受任意文字或 URL 輸入，並即時渲染對應的 QR Code 圖片於 Canvas 元素上。

#### Scenario: 輸入文字即時產生 QR Code
- **WHEN** 使用者在輸入框輸入任意文字
- **THEN** 系統即時更新 Canvas 上的 QR Code，無需點擊按鈕

#### Scenario: 輸入為空時的狀態
- **WHEN** 使用者清空輸入框
- **THEN** Canvas 區域顯示佔位提示，不顯示損壞的 QR Code

### Requirement: 使用者可調整 QR Code 尺寸
系統 SHALL 提供尺寸選項（128px / 256px / 512px），讓使用者選擇輸出大小。

#### Scenario: 切換尺寸
- **WHEN** 使用者選擇不同尺寸選項
- **THEN** Canvas 上的 QR Code 以新尺寸重新渲染

### Requirement: 使用者可調整容錯等級
系統 SHALL 提供四種容錯等級（L / M / Q / H），預設為 M。

#### Scenario: 切換容錯等級
- **WHEN** 使用者選擇不同容錯等級
- **THEN** QR Code 以新容錯等級重新渲染

### Requirement: 使用者可下載 QR Code 為 PNG
系統 SHALL 提供「下載 PNG」按鈕，將 Canvas 內容匯出為 PNG 檔案。

#### Scenario: 點擊下載
- **WHEN** 使用者點擊下載按鈕且輸入框不為空
- **THEN** 瀏覽器觸發下載，檔名為 `qrcode.png`

#### Scenario: 輸入為空時點擊下載
- **WHEN** 使用者在輸入框為空時點擊下載按鈕
- **THEN** 按鈕呈 disabled 狀態，不觸發下載
