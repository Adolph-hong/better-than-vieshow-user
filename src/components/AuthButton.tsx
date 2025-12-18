import type { ButtonHTMLAttributes, ReactNode } from "react"

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const AuthButton = ({ children, className, ...props }: AuthButtonProps) => {
  return (
    <button
      className={`w-full rounded-lg bg-[#11968D] py-2 text-white cursor-pointer${className || ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default AuthButton
