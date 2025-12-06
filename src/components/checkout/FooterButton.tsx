import type { ReactNode } from "react"

type FooterButtonProps = {
  onClick: () => void
  children: ReactNode
}

const FooterButton = ({ onClick, children }: FooterButtonProps) => {
  return (
    <footer className="px-4">
      <button
        type="button"
        onClick={onClick}
        className="w-full cursor-pointer rounded-xl bg-[#11968D] py-[10px] text-center font-medium text-white transition-transform"
      >
        {children}
      </button>
    </footer>
  )
}

export default FooterButton
