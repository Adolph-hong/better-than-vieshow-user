import type { ButtonHTMLAttributes, ReactNode } from "react"

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const AuthButton = ({ children, className, ...props }: AuthButtonProps) => {
  return (
    <button
      className={`w-full rounded-full bg-[#11968D] py-[14.5px] font-bold text-white cursor-pointer${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

export default AuthButton
