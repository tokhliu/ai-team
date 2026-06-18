# 影片提示詞包模板

> 由影片提示詞工程師（video-prompt-engineer）填寫。需先有影片腳本作為輸入。

---

# 影片提示詞包：[專案名稱]

**建立日期：** [YYYY-MM-DD]
**對應腳本：** [腳本標題]
**目標工具：** [Kling 3.0 / Runway Gen-4.5 / Veo 3.1 / Pika / 其他]

---

## 整體風格指引

| 項目 | 設定 |
|---|---|
| 視覺風格 | [cinematic / documentary / commercial / vlog / animated] |
| 主色調 | [warm / cool / neutral / high contrast] |
| 亮度氛圍 | [bright and airy / moody / dramatic / natural] |
| 攝影風格 | [handheld / stabilized / drone / static] |
| 參考風格 | [可提供參考影片/導演/品牌的視覺風格] |

---

## 分鏡提示詞

### 鏡頭 01 — Hook（0:00-0:03）

**腳本描述：**
[從腳本複製對應的畫面描述]

**主要提示詞（英文）：**
```
[A/An] [subject description], [action/pose], 
[environment/background setting],
[camera type]: [camera movement],
[lighting description],
[visual style], [quality keywords]
```

**時長：** 3 秒
**比例：** 9:16（直式）/ 16:9（橫式）

**負面提示詞（Negative Prompt）：**
```
blurry, low quality, distorted, watermark, text overlay,
[其他不想要的元素]
```

**備用提示詞：**
```
[備選版本，用不同角度或風格描述]
```

**注意事項：**
[任何特殊要求或已知的工具限制]

---

### 鏡頭 02 — 段落一（0:03-0:XX）

**腳本描述：**
[從腳本複製]

**主要提示詞（英文）：**
```
[提示詞]
```

**時長：** [X] 秒
**攝影機運動：** [slow push in / pan left / static / handheld]

**負面提示詞：**
```
[不想要的元素]
```

---

### 鏡頭 03 — 段落二（0:XX-0:XX）

[重複以上格式]

---

### 鏡頭 04 — CTA（最後 5 秒）

[重複以上格式]

---

## B-roll 素材提示詞（補充鏡頭）

> 用於填充剪輯空隙或強化氛圍的補充畫面

### B-roll 01
**用途：** [說明在腳本哪個位置使用]
**提示詞：**
```
[提示詞]
```

---

## 工具特定設定

### 如果使用 Kling 3.0
- 模式：[Standard / Pro]
- 特色：支援 15 秒長片段、跨鏡頭角色一致性、Avatar 2.0 說話人像
- 備注：[Kling 特有的注意事項]

### 如果使用 Runway Gen-4.5
- 模式：[Gen-4.5 Alpha / Turbo]
- 特色：Aleph 功能可文字指令修改場景；Runway Characters 可建立 AI 角色
- 備注：[Runway 特有的注意事項]

### 如果使用 Veo 3.1（Google）
- 輸出：最高 4K，支援橫式與直式
- 特色：原生音訊同步、Prompt 遵循度最高，適合敘事場景
- 備注：需透過 Google AI Studio 或 Vertex AI 存取

---

## 生成順序建議
1. 先生成 Hook 鏡頭，確認整體風格正確再繼續
2. [其他建議]
