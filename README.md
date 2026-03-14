# Wisdom 唯思英文網站維護說明

這個網站目前已整理成「共用樣式 + 共用互動 + 各頁獨立內容」的結構，後續維護人員不需要重新理解整份 HTML，只要知道三個核心位置：

## 1. 專案結構

```text
wisdom-site/
├─ index.html                首頁
├─ about.html                關於我們
├─ teachers.html             師資列表
├─ training.html             師資培訓
├─ materials.html            自編教材
├─ contact.html              立即洽詢 / LINE Connect
├─ courses.html              課程規劃總覽
├─ courses/
│  ├─ junior-high.html       國中班
│  ├─ senior-high.html       高中班
│  └─ certification.html     檢定班
├─ teachers/
│  └─ claire.html            Claire 老師頁
└─ assets/
   ├─ css/
   │  └─ style.css           全站共用樣式
   ├─ js/
   │  └─ main.js             漢堡選單 / FAQ 收折等互動
   └─ images/
      ├─ logo-black.png      深色底用 Logo
      ├─ logo-white.png      深色區塊用 Logo
      └─ claire.jpg          老師照片
```

## 2. 後續最常改的地方

### A. 改首頁文案
直接打開 `index.html`，搜尋以下區塊：

```html
<section class="hero">
```

這一段就是首頁主視覺的標題、副標與按鈕。

### B. 改選單名稱或連結
所有頁面都各自有一份選單 HTML。
直接搜尋：

```html
<nav class="nav-links" data-nav-menu>
```

如果要新增選單，例如「最新消息」，做法如下：

```html
<a href="news.html" class="nav-link">最新消息</a>
```

然後再新增 `news.html`。

### C. 改顏色與整體風格
請到：

```text
assets/css/style.css
```

最上方的 `:root` 變數就是全站設計系統。

例如：

```css
:root {
  --bg: #171411;
  --paper: #24201c;
  --ink: #f4ede3;
  --accent: #b9834f;
}
```

- `--bg`：網站主背景色
- `--paper`：卡片底色
- `--ink`：主要文字顏色
- `--accent`：品牌主強調色

## 3. 如何新增一位老師

### 步驟 1：放照片
把圖片放進：

```text
assets/images/
```

例如：

```text
assets/images/teacher-amy.jpg
```

### 步驟 2：在 `teachers.html` 複製一個老師卡片

```html
<article class="card">
  <div class="photo-cover image-fill">
    <img src="assets/images/teacher-amy.jpg" alt="Amy 老師">
  </div>
  <h3 style="margin-top:16px;">Amy 老師</h3>
  <div class="muted">英文寫作｜閱讀分析｜檢定教學</div>
  <div class="pill-list">
    <span class="pill">寫作</span>
    <span class="pill">閱讀</span>
    <span class="pill">檢定</span>
  </div>
  <p class="muted" style="margin-top:14px;">
    擅長帶領學生建立寫作架構與長篇閱讀能力。
  </p>
  <div style="margin-top:18px;">
    <a class="btn btn-primary" href="teachers/amy.html">查看個人頁</a>
  </div>
</article>
```

### 步驟 3：新增 `teachers/amy.html`
可以直接複製 `teachers/claire.html` 再改內容。

## 4. 如何新增課程班別

### 步驟 1：在 `courses.html` 新增卡片

```html
<article class="card course-card">
  <span class="tag">SPECIAL CLASS</span>
  <h3 style="margin-top:14px;">寫作班</h3>
  <p class="muted">聚焦段落架構、句型變化與作文練習。</p>
  <div class="pill-list">
    <span class="pill">寫作</span>
    <span class="pill">句型</span>
    <span class="pill">作文</span>
  </div>
  <div style="margin-top:18px;">
    <a class="btn btn-primary" href="courses/writing.html">查看班別頁</a>
  </div>
</article>
```

### 步驟 2：新增 `courses/writing.html`
可以直接複製 `courses/junior-high.html`，再改成自己的文案。

## 5. 如何放圖片

建議所有圖片都放進：

```text
assets/images/
```

圖片插入範例：

```html
<div class="photo-cover image-fill">
  <img src="assets/images/sample-classroom.jpg" alt="教室照片">
</div>
```

如果只是想在文章中插圖，也可以這樣寫：

```html
<img src="assets/images/sample-book.jpg" alt="教材照片" style="border-radius:20px; border:1px solid var(--line);">
```

## 6. 如何放表格

網站已經有預設表格樣式，只要把表格包在 `.table-wrap` 裡面即可。

```html
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>項目</th>
        <th>內容</th>
        <th>備註</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>上課對象</td>
        <td>國一到國三</td>
        <td>可再細分</td>
      </tr>
      <tr>
        <td>授課方式</td>
        <td>小班 / 一對一</td>
        <td>依招生狀況調整</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 7. 如何新增 FAQ

首頁 FAQ 使用 `<details>` 做收折。
複製以下格式即可：

```html
<details class="faq-item">
  <summary>Q：這是新的問題嗎？<span data-faq-icon>＋</span></summary>
  <div class="answer">A：這裡填入答案內容。</div>
</details>
```

## 8. 如何改 LINE 連結

目前 LINE 連結統一使用：

```text
https://line.me/R/ti/p/@629ptzrt
```

若未來要更換帳號，請搜尋全站：

```text
@629ptzrt
```

以及：

```text
https://line.me/R/ti/p/@629ptzrt
```

全部替換即可。

## 9. 如何確認網站沒有壞掉

每次改完，至少檢查這幾頁：

- `index.html`
- `teachers.html`
- `teachers/claire.html`
- `courses.html`
- `courses/junior-high.html`
- `contact.html`

確認項目：

1. 選單可以點
2. LINE 按鈕會跳轉
3. 圖片正常顯示
4. 手機版開啟時選單可以展開
5. FAQ 可以收折

## 10. 建議的後續優化方向

### 短期可做
- 補上真實教室照片與教材照片
- 每個班別頁加入上課對象、時數、收費方式
- 補上家長回饋 / 學生成果案例

### 中期可做
- 新增「最新消息」頁面
- 新增報名表單或 Google Form 串接
- 加入 GA4 / Meta Pixel 做流量追蹤

### 長期可做
- 串接 CMS（例如 Sanity、Contentful、Notion API）
- 改為模板化輸出，讓非工程人員也能更新
- 加入部落格 / SEO 架構 / 結構化資料

## 11. 維護原則

後續不熟程式的人只要記住：

- **改文字**：改 HTML
- **改整體風格**：改 `assets/css/style.css`
- **改互動功能**：改 `assets/js/main.js`
- **新增圖片**：放進 `assets/images/`

這樣就不容易改壞整站。


---

## 最終上線版新增維護說明

### 1. 左上角品牌 Logo
目前導覽列使用的是：

```html
assets/images/logo-nav.png
```

這是一個已處理成「白底清晰版」的 Logo。
若未來要替換，只要保持檔名一致即可，不需要修改其他頁面。

---

### 2. 師資照片顯示邏輯
目前老師個人頁改為直接使用 `<img>` 顯示照片，而不是只靠 CSS 背景圖。
以 Claire 頁面為例：

```html
<div class="portrait">
  <img src="../assets/images/claire.jpg" alt="Claire 老師形象照">
</div>
```

#### 要替換照片時：
1. 把新照片放進 `assets/images/`
2. 照片檔名可沿用原名，或改成新檔名
3. 若改檔名，同步修改對應老師頁面的 `src`

範例：

```html
<img src="../assets/images/teacher-linda.jpg" alt="Linda 老師形象照">
```

---

### 3. 關於我們｜創辦人區塊
目前已預留：
- 創辦人照片
- 創辦人理念文字

照片位置：

```html
assets/images/founder-placeholder.jpg
```

頁面位置：

```html
about.html
```

替換範例：

```html
<div class="founder-photo">
  <img src="assets/images/founder-lucy.jpg" alt="創辦人形象照">
</div>
```

理念文字範例：

```html
<p class="muted">
  唯思英文成立的初衷，是希望讓學生不再把英文視為零碎的考試科目，
  而是能真正理解邏輯、建立方法、長期累積能力的學習系統。
</p>
```

---

### 4. 聯絡我們｜Email 維護方式
目前 `contact.html` 內保留兩個地方需要一起替換：

#### 按鈕：
```html
<a class="btn btn-ghost" href="mailto:hello@wisdomenglish.tw">寄送 Email</a>
```

#### 文字顯示：
```html
hello@wisdomenglish.tw
```

若正式信箱改成 `service@wisdomenglish.com`，請一起改成：

```html
<a class="btn btn-ghost" href="mailto:service@wisdomenglish.com">寄送 Email</a>
```

與：

```html
service@wisdomenglish.com
```

---

### 5. 若後續新增老師頁面
建議直接複製：

```html
teachers/claire.html
```

改成例如：

```html
teachers/linda.html
```

然後調整：
- 名字
- 照片
- 教學理念
- 教學經歷
- 證照
- 授課內容

老師清單頁 `teachers.html` 也要同步加上入口卡片。

---

### 6. 圖片最佳規格建議
為避免前台顯示失真，建議：

- 老師個人照：直式 1200 × 1600 px
- 創辦人照片：直式 1200 × 1400 px
- Logo：透明或白底 PNG
- 課程介紹圖：橫式 1600 × 900 px

格式建議：
- 照片用 `.jpg`
- Logo / 圖示用 `.png`

---

### 7. 上線前最後檢查清單
正式部署前，請確認以下項目：

- 所有頁面左上角 Logo 是否正常顯示
- 師資頁照片是否正常載入
- LINE 按鈕是否正確跳轉到 `@629ptzrt`
- Email 是否已替換為正式信箱
- 關於我們頁面是否已更新創辦人照片與理念
- 手機版選單是否可正常開合
- 新增頁面是否有同步更新導覽列

