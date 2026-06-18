# 圖片提示詞包模板

> 由圖片提示詞專家（image-prompt-expert）填寫。可依照文字描述、品牌需求或參考圖片需求產出。

---

# 圖片提示詞包：[專案名稱]

**建立日期：** [YYYY-MM-DD]
**目標工具：** [Midjourney / Flux / DALL-E 3 / Stable Diffusion / 其他]
**使用情境：** [社群媒體封面 / 縮圖 / 產品圖 / 行銷素材 / 其他]

---

## 整體風格基調

| 項目 | 設定 |
|---|---|
| 視覺風格 | [photorealistic / illustration / 3D render / watercolor / etc.] |
| 主色調 | [描述主要色彩方向] |
| 情緒氛圍 | [energetic / calm / professional / playful / etc.] |
| 光線偏好 | [golden hour / studio lighting / natural light / dramatic / etc.] |
| 參考藝術家/品牌 | [如有參考風格] |

---

## 圖片清單

### 圖片 01

**用途：** [YouTube 縮圖 / Instagram 貼文 / 封面圖 / 產品展示 / 其他]
**尺寸比例：** [16:9 / 9:16 / 1:1 / 4:5]
**目標解析度：** [1920x1080 / 1080x1080 / 其他]

**使用者原始描述：**
[使用者最初說的「我想要一張...」]

**提示詞（英文）：**
```
[主體描述], [動作/姿態], [環境/背景],
[光線描述], [構圖/鏡頭],
[風格關鍵字], [品質關鍵字]
```

**負面提示詞：**
```
blurry, low quality, distorted, watermark, ugly, deformed,
[其他不想要的元素]
```

**工具參數：**
- Midjourney：`--ar 16:9 --v 6 --style raw --q 2`
- Flux：[解析度設定]
- DALL-E 3：size=1792x1024
- SD：Steps: 30, CFG Scale: 7, Sampler: DPM++ 2M

**提示詞中文翻譯：**
[讓使用者理解提示詞內容]

**備選版本 A（不同風格）：**
```
[備選提示詞]
```

**備選版本 B（不同構圖）：**
```
[備選提示詞]
```

**生成提示：**
[任何需要注意的事項，例如：「這個工具對人臉處理較弱，建議生成後用 upscaler 優化」]

---

### 圖片 02

[重複以上格式]

---

### 圖片 03

[重複以上格式]

---

## 風格一致性指引
> 如果需要生成一系列風格一致的圖片

**Midjourney Style Reference：**
- 在第一張滿意的圖片後，用 `--sref [image URL]` 保持風格一致

**Flux 風格鎖定：**
- 在提示詞開頭加入：`In the style of [第一張圖的風格描述],`

**色彩一致性關鍵字：**
```
[列出確保色調一致的關鍵字]
```

---

## 後製建議
- [是否需要去背]
- [是否需要加文字]
- [其他後製建議]
