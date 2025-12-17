/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.svg?raw" {
  const content: string
  export default content
}
