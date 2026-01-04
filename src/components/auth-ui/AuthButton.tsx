import type { ButtonHTMLAttributes, ReactNode } from "react"
import { ClipLoader } from "react-spinners"

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
}

const AuthButton = ({ children, className, loading, disabled, ...props }: AuthButtonProps) => {
  return (
    <button
      className={`flex w-full items-center justify-center rounded-lg bg-[#11968D] py-2 text-white ${
        loading || disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      } ${className || ""}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <ClipLoader color="#ffffff" size={20} /> : children}
    </button>
  )
}

export default AuthButton
