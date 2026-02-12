# Better Than 威秀 - 電影購票系統

> 本產品以提升整體電影購票流程的使用體驗為目標，打造一套前後台操作更直覺的電影購票系統。

## 📌 專案簡介

這是一個現代化的電影購票系統前台應用，提供流暢的購票體驗，包含電影搜尋、場次選擇、座位選擇、訂單確認等完整功能。採用 PWA 技術，支援行動裝置安裝使用。

## 🔗 相關連結

- **前台展示**：[前台 Demo 網址]
- **後台 Repository**：[後台 Repository 連結]
- **後台展示**：[後台 Demo 網址]

## 🛠️ 技術棧

### 核心框架
- **React 19** - 前端框架
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

## 📦 安裝與啟動

### 環境需求
- Node.js 18 或以上版本
- npm 或其他套件管理工具

### 安裝步驟

1. **複製專案**
```bash
git clone [repository-url]
cd better-than-vieshow-user
```

2. **安裝相依套件**
```bash
npm install
```

3. **設定環境變數**
```bash
cp .env.sample .env
```
編輯 `.env` 檔案，設定後端 API 位址：
```
VITE_API_BASE_URL=你的後端API網址
```

4. **啟動開發伺服器**
```bash
npm run dev
```
開發伺服器將在 `http://localhost:5173` 啟動

### 其他指令

```bash
# 建置正式版本
npm run build

# 預覽建置結果
npm run preview

# 程式碼檢查
npm run lint

# 自動修正程式碼問題
npm run lint:fix

# 格式化程式碼
npm run format
```

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
