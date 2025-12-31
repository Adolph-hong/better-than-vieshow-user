import { StrictMode } from "react"
import { BrowserRouter } from "react-router-dom"
import { createRoot } from "react-dom/client"
import { registerSW } from "virtual:pwa-register"
import { Toaster } from "react-hot-toast"
import AppRouter from "./AppRouter"
import "./assets/style/index.css"

registerSW({ immediate: true })
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
      <Toaster position="top-center" />
    </BrowserRouter>
  </StrictMode>
)
