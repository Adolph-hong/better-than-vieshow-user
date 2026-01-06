import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DotIcon from "@/assets/icon/tickets-icon/dot.svg?react"
import TicketsGhostIcon from "@/assets/icon/tickets-icon/tickets-ghost.svg?react"
import Footer from "@/components/shared/Footer"
import { getOrders } from "@/services/orderAPI"
import type { OrderListItem } from "@/types/order"
import { UsersRound , Clock} from "lucide-react"
import { PuffLoader } from "react-spinners"

const TicketList = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<OrderListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      // 檢查是否已登入
      const token = localStorage.getItem("token")
      if (!token) {
        // 未登入，導向登入頁面
        navigate("/login")
        return
      }

      try {
        setLoading(true)
        const response = await getOrders()
        if (response.success) {
          // Sort by showTime descending (newest first)
          const sortedTickets = response.data.sort(
            (a, b) => new Date(b.showTime).getTime() - new Date(a.showTime).getTime()
          )
          setTickets(sortedTickets)
          console.log("Fetched tickets:", sortedTickets)
        } else {
          setError(response.message || "無法取得票券列表")
        }
      } catch (err) {
        console.error("Fetch tickets error:", err)
        setError("載入票券時發生錯誤")
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [navigate])

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center bg-black text-white pb-20">
        <PuffLoader color="#11968D" size={80} />
        <p className="text-lg font-medium text-white">為您端上票券列表...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex w-full h-full flex-col items-center justify-center bg-black text-white p-4 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-[#11968D] px-4 py-2 text-white"
        >
          重試
        </button>
        <Footer />
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <>
        <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
          <TicketsGhostIcon className="h-[240px] w-[240px]" />
          <div className="text-center">
            <p className="text-xl font-medium text-white">一張票卷都還沒有</p>
            <p className="mt-1 text-[#A5A5A5]">去首頁購買你的第一張電影票吧</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Format Date: "12月15日 週五"
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekMap = ["日", "一", "二", "三", "四", "五", "六"]
    const week = weekMap[date.getDay()]
    return { year, month, day, week }
  }

  // Format Time: "下午 4:30"
  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? "下午" : "上午"
    const displayHours = hours % 12 || 12
    const displayMinutes = minutes.toString().padStart(2, "0")
    return { period, timeStr: `${displayHours}:${displayMinutes}` }
  }

  // Convert minutes to "2小時 15分鐘"
  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h} 小時 ${m} 分鐘`
  }

  return (
    <>
      <div className="space-y-[17px] pb-24">
        {tickets.map((ticket) => {
          const { year, month, day, week } = formatDate(ticket.showTime)
          const { period, timeStr } = formatTime(ticket.showTime)
          
          return (
            <button
              key={ticket.orderId}
              type="button"
              onClick={() => navigate(`/tickets/${ticket.orderId}`)}
              className="relative w-full overflow-hidden rounded-xl bg-[#222222] text-left active:opacity-90"
            >
              {/* Background Image with Overlay */}
              <div className="relative h-[300px] w-full">
                <img
                  src={ticket.posterUrl}
                  alt={ticket.movieTitle}
                  className="h-full w-full object-cover object-[center_20%]"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Date Tag - Restored Original Style */}
                <div className="absolute top-4 right-4 flex flex-col rounded-lg bg-[#11968D] py-[6.5px] pr-3 pl-2 text-white">
                  <div className="flex w-full justify-between font-medium space-x-2">
                    <span className="text-[10px]">{year}</span>
                    <span className="text-[10px]">週{week}</span>
                  </div>
                  <div className="text-center text-sm font-medium mt-0.5">
                    {month}月{day}日 {period}{timeStr}
                  </div>
                </div>

                {/* Darken used/cancelled tickets */}
                {(ticket.isUsed === true || ticket.status !== "Paid") && (
                  <div className="absolute inset-0 bg-black/50" />
                )}

                {/* Status Overlay for Used/Expired */}
                {(ticket.isUsed === true || ticket.status !== "Paid") && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-full items-center justify-center bg-white/15 backdrop-blur-[1px]">
                      <span className="text-xl text-white font-semibold">
                        {ticket.isUsed === true ? "已使用" : ticket.status !== "Paid" ? "已取消" : ""}
                      </span>
                    </div>
                  </div>
                )}

                {/* Movie Info */}
                <div className="absolute bottom-4 left-4 z-10 w-full pr-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-md truncate w-[90%]">
                    {ticket.movieTitle}
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-[#A5A5A5] space-x-1">
                    <div className="flex items-center space-x-1">
                      <UsersRound className="h-4 w-4"/>
                      <span>{ticket.ticketCount} 人</span>
                    </div>
                    <DotIcon />
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4"/>
                      <span>{formatDuration(ticket.durationMinutes)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      <Footer />
    </>
  )
}

export default TicketList
