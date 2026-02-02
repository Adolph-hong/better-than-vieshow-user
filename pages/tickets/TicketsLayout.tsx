import { Outlet } from "react-router-dom"

const TicketsLayout = () => {
  return (
    <div className="flex flex-col bg-black text-white">
      <div className="w-full px-4 pt-6">
        <h1 className="mb-6 text-center text-lg font-medium">我的票卷</h1>
        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default TicketsLayout
