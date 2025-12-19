import { Outlet } from "react-router-dom"
import { TicketProvider } from "@/context/TicketContext"

const TicketFeatureLayout = () => {
  return (
    <TicketProvider>
      <Outlet />
    </TicketProvider>
  )
}

export default TicketFeatureLayout
