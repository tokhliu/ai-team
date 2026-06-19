## ADDED Requirements

### Requirement: 隱私權政策頁面

系統 SHALL 提供位於 `/[locale]/privacy` 的隱私權政策頁面，並包含 Google AdSense 政策要求的廣告與 cookie 揭露內容。頁面 MUST 為雙語（zh-TW / en）並可被搜尋引擎索引。

#### Scenario: 存取隱私權政策頁

- **WHEN** 使用者造訪 `/zh-TW/privacy` 或 `/en/privacy`
- **THEN** 系統回傳對應語系的隱私權政策頁面，HTTP 200，並含可被索引的 `<title>` 與 `description` metadata

#### Scenario: AdSense 廣告揭露

- **WHEN** 使用者閱讀隱私權政策內容
- **THEN** 內容 MUST 揭露：第三方廠商（含 Google）使用 cookie 投放廣告、Google 廣告 cookie（DoubleClick）依造訪行為投放，以及使用者可透過 Google 廣告設定停用個人化廣告

#### Scenario: 工具資料隱私說明

- **WHEN** 使用者閱讀隱私權政策內容
- **THEN** 內容 SHALL 說明本站工具於瀏覽器端執行、不蒐集或上傳使用者輸入的內容

### Requirement: 關於頁面

系統 SHALL 提供位於 `/[locale]/about` 的關於頁面，雙語呈現 ToolVerse 的定位與隱私優先理念。

#### Scenario: 存取關於頁

- **WHEN** 使用者造訪 `/zh-TW/about` 或 `/en/about`
- **THEN** 系統回傳對應語系的關於頁面，HTTP 200，並含 SEO metadata

### Requirement: 聯絡頁面

系統 SHALL 提供位於 `/[locale]/contact` 的聯絡頁面，雙語呈現並提供聯絡方式（email）。

#### Scenario: 存取聯絡頁

- **WHEN** 使用者造訪 `/zh-TW/contact` 或 `/en/contact`
- **THEN** 系統回傳對應語系的聯絡頁面，HTTP 200，並顯示可聯絡的 email 與 SEO metadata
