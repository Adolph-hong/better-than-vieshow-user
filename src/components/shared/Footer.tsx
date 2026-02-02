import { useLocation, useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { House, Ticket, GearSix } from "phosphor-react"
import light from "@/assets/icon/light.svg"
import ticket from "@/assets/icon/ticket.svg"

interface NavItem {
  icon: React.ElementType
  path: string
}
const navItems: NavItem[] = [
  { icon: House, path: "/" },
  { icon: Search, path: "/movie-search" },
  { icon: Ticket, path: "/tickets" },
  { icon: GearSix, path: "/settings" },
]

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <footer className="fixed bottom-4 left-1/2 z-100 flex -translate-x-1/2 gap-6 rounded-3xl bg-[#11968D] px-6 py-2">
      {navItems.map(({ icon: Icon, path }) => {
        const isActive = location.pathname === path
        return (
          <button
            key={path}
            type="button"
            className="relative flex h-8 w-8 cursor-pointer items-center justify-center border-none bg-transparent p-0"
            onClick={() => navigate(path)}
            aria-label={`Navigate to ${path}`}
          >
            {path === "/tickets" ? (
              <img
                src={ticket}
                alt="ticket"
                className={`z-10 h-6 w-6 ${isActive ? "brightness-0 invert filter" : ""}`}
              />
            ) : (
              <Icon
                size={24}
                weight="fill"
                className={`z-10 ${isActive ? "text-white" : "text-[#144D4A]"}`}
              />
            )}
            {isActive && (
              <div className="absolute -top-2 left-1/2 flex h-[41px] w-11 -translate-x-1/2 flex-col items-center">
                <div className="h-1.25 w-10 rounded-sm bg-white" />
                <img src={light} alt="light" className="-mt-0.5" />
              </div>
            )}
          </button>
        )
      })}
    </footer>
  )
}

export default Footer
