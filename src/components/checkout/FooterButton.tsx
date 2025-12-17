import type { ReactNode } from "react"

type FooterButtonProps = {
  onClick?: () => void
  children: ReactNode
  variant?: "primary" | "outline"
  className?: string
}

const FooterButton = ({
  onClick,
  children,
  variant = "primary",
  className = "",
}: FooterButtonProps) => {
  const baseStyles = "w-full cursor-pointer rounded-lg py-2 text-center"
  const variants = {
    primary: "bg-[#11968D] text-white",
    outline: "border border-[#11968D] text-[#11968D] bg-transparent",
  }

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`.trim()

  return (
    <button type="button" onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  )
}

export default FooterButton
