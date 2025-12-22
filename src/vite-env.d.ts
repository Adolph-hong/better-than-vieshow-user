/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// 使用 declare global 強制擴充全域定義
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    // 這裡加其他變數
  }
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.svg?raw" {
  const content: string
  export default content
}
