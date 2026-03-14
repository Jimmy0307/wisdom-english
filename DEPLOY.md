# GitHub Pages 部署方式

## 第一次設定
1. 把整包專案推到 GitHub Repository。
2. 到 `Settings -> Pages`。
3. 在 `Build and deployment` 的 `Source` 選 `GitHub Actions`。
4. 之後每次 push 到 `main`，GitHub 會自動 build 並部署。

## 本地開發
```bash
npm install
npm run dev
```

## 正式建置
```bash
npm run build
```

## 維護規則
- 新圖片放在 `assets/images/`
- 新老師頁面放在 `teachers/`
- 新班別頁面放在 `courses/`
- 若新增新的 html 頁面，記得同步更新 `vite.config.js` 的 `rollupOptions.input`
