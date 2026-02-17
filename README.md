# Better Than 威秀 - 電影購票系統

> 本產品以提升整體電影購票流程的使用體驗為目標，打造一套包含前後台操作更直覺的電影購票系統。

## 📌 專案簡介

這是一個現代化的電影購票系統前台應用，提供流暢的購票體驗，包含電影搜尋、場次選擇、座位選擇、訂單確認等完整功能。採用 PWA 技術，支援行動裝置安裝使用。

## 🔗 相關連結

- **前台展示**：[https://better-than-vieshow-user.vercel.app/]
- **後台 Repository**：[https://github.com/Adolph-hong/better-than-vieshow-admin]
- **後台展示**：[https://better-than-vieshow-admin.vercel.app/login]

## 測試帳號 (Demo 專用)
若您欲進入系統體驗完整流程，可使用以下測試資訊：
- **測試帳號**：`guest@test.com` 
- **測試密碼**：`Abcd1234`
> [!TIP]
> 為了最佳體驗，建議使用行動裝置模式或手機瀏覽器開啟 Demo 網址。

## 🛠️ 技術棧

### 核心框架
- **React 19** - 前端開發
- **TypeScript** - 型別安全
- **Vite** - 建置工具與開發伺服器

### UI/UX
- **Tailwind CSS 4** - 樣式框架
- **Framer Motion** - 動畫效果
- **Lucide React** / **Phosphor React** - 圖示庫
- **Swiper** - 輪播元件

### 功能套件
- **React Router DOM** - 路由管理
- **React Hot Toast** - 通知提示
- **React QR Code** - QR Code 生成
- **React Zoom Pan Pinch** - 圖片縮放互動
- **Vite PWA** - 漸進式網頁應用

### 開發工具
- **ESLint** - 程式碼檢查（Airbnb 規範）
- **Prettier** - 程式碼格式化

## 🎯 主要功能

- **電影搜尋** - 快速搜尋電影資訊
- **場次瀏覽** - 查看電影放映時間與影廳資訊
- **座位選擇** - 互動式座位圖選位
- **訂單管理** - 訂單確認與倒數計時鎖定
- **票券查詢** - 查看已購票券與 QR Code
- **PWA 支援** - 可安裝至手機主畫面使用

## 📁 專案結構

```
better-than-vieshow-user/
├── pages/              # 頁面元件
│   ├── auth/          # 登入/註冊
│   ├── checkout/      # 購票流程
│   └── tickets/       # 票券管理
├── src/
│   ├── components/    # 共用元件
│   ├── services/      # API 服務
│   ├── types/         # TypeScript 型別定義
│   ├── utils/         # 工具函式
│   └── context/       # React Context
└── public/            # 靜態資源
```

## 🚀 部署

專案已配置 Vercel 部署設定（`vercel.json`），可直接部署至 Vercel 平台。

## 📄 授權

本專案僅供學習與展示使用。
