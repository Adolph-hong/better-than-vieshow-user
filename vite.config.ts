import { fileURLToPath, URL } from "url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    host: true,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
