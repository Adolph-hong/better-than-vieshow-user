import type { ReactNode } from "react"
import AuthLogo from "@/assets/icon/auth-logo.svg"

interface AuthLayoutProps {
  title: string
  children: ReactNode
  footer: ReactNode
  paddingTop?: string // 新增可選屬性
}

const AuthLayout = ({ title, children, footer, paddingTop = "pt-[190px]" }: AuthLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <header className={`flex items-center justify-center ${paddingTop}`}>
        <h1 className="flex flex-col items-center gap-1">
          <img src={AuthLogo} alt="Better Than Vieshow Logo" className="h-[32.21px] w-13" />
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-white">Better Than</span>
            <span className="text-sm font-semibold text-white">威秀</span>
          </div>
        </h1>
      </header>

      <section className="px-6">
        <form className="mt-[22px] flex flex-col rounded-xl bg-[#1F1F1F] px-4 pb-4">
          <h2 className="pt-4 text-center text-lg font-bold text-white">{title}</h2>
          {children}
        </form>
      </section>

      <footer className="mt-auto pb-6 text-center">{footer}</footer>
    </main>
  )
}

export default AuthLayout
