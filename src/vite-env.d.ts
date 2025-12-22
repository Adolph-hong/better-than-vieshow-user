/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite-plugin-pwa/client" />
declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.svg?raw" {
  const content: string
  export default content
}
