import { useLocation, useNavigate } from "react-router-dom"
import { Home, Search, Ticket, Settings, type LucideIcon } from "lucide-react"
import light from "@/assets/icon/light.svg"

interface NavItem {
  icon: LucideIcon
  path: string
}
interface bottomStyleProps {
  bottomStyle?: string
}

const navItems: NavItem[] = [
  { icon: Home, path: "/" },
  { icon: Search, path: "/movie-search" },
  { icon: Ticket, path: "/ticket" },
  { icon: Settings, path: "/settings" },
]

const Footer = ({ bottomStyle = "bottom-0"}: bottomStyleProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <footer className={`fixed ${bottomStyle} z-100 flex px-6 py-2 gap-3 bg-[#11968D] rounded-3xl`}>
      {navItems.map(({ icon: Icon, path }) => {
        const isActive = location.pathname === path
        return (
          <button
            key={path}
            type="button"
            className="relative flex items-center justify-center w-8 h-8 cursor-pointer bg-transparent border-none p-0"
            onClick={() => navigate(path)}
            aria-label={`Navigate to ${path}`}
          >
            <Icon className={`z-10 ${isActive ? "text-white" : "text-[#2B514E]"}`} />
            {isActive && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex w-11 h-[41px] flex-col items-center">
                <div className="w-10 h-1.25 bg-white rounded-sm" />
                <img src={light} alt="light" />
              </div>
            )}
          </button>
        )
      })}
    </footer>
  )
}

export default Footer