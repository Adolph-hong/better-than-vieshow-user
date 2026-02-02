import type { ReactNode } from "react"
import { Loader2 } from "lucide-react"

type FooterButtonProps = {
  onClick?: () => void
  children: ReactNode
  variant?: "primary" | "outline"
  className?: string
  loading?: boolean
  disabled?: boolean
}

const FooterButton = ({
  onClick,
  children,
  variant = "primary",
  className = "",
  loading = false,
  disabled = false,
}: FooterButtonProps) => {
  const baseStyles = "w-full cursor-pointer rounded-lg py-2 text-center"
  const variants = {
    primary: "bg-[#11968D] text-white",
    outline: "border border-[#11968D] text-[#11968D] bg-transparent",
  }

  const combinedClassName =
    `${baseStyles} ${variants[variant]} ${className} ${(loading || disabled) ? "opacity-50 cursor-not-allowed" : ""}`.trim()

  return (
    <button
      type="button"
      onClick={loading || disabled ? undefined : onClick}
      className={combinedClassName}
      disabled={loading || disabled}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </div>
    </button>
  )
}

export default FooterButton
