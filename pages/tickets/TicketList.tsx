import { useNavigate } from "react-router-dom"
import DotIcon from "@/assets/icon/tickets-icon/dot.svg?react"
import ClockIcon from "@/assets/icon/tickets-icon/mdi_clock.svg?react"
import UserIcon from "@/assets/icon/tickets-icon/mdi_users.svg?react"
import TicketsGhostIcon from "@/assets/icon/tickets-icon/tickets-ghost.svg?react"
import { useTickets } from "@/context/TicketContext"

const TicketList = () => {
  const { tickets } = useTickets()
  const navigate = useNavigate()

  if (tickets.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <TicketsGhostIcon className="h-[240px] w-[240px]" />
        <div className="text-center">
          <p className="text-xl font-bold text-white">一張票卷都還沒有</p>
          <p className="mt-2 text-sm text-[#A5A5A5]">去首頁購買你的第一張電影票吧</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-[17px] pb-20">
      {tickets.map((ticket) => (
        <button
          key={ticket.id}
          type="button"
          onClick={() => navigate(`/tickets/${ticket.id}`)}
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

            {/* Status Overlay for Used/Expired */}
            {ticket.status !== "active" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                <span className="text-2xl font-bold text-white/90">
                  {ticket.status === "used" ? "已使用" : "已過期"}
                </span>
              </div>
            )}

            {/* Date Tag */}
            <div className="absolute top-4 right-4 flex flex-col rounded-lg bg-[#11968D] py-[6.5px] pr-3 pl-2 text-white">
              <div className="flex w-full justify-between font-medium">
                <span className="text-[10px]">2025</span>
                <span className="text-[10px]">
                  {(() => {
                    const match = ticket.date.match(/\((.)\)/)
                    return match ? `週${match[1]}` : ""
                  })()}
                </span>
              </div>
              <div className="text-center">
                {(() => {
                  const match = ticket.date.match(/^(\d{2})\/(\d{2})/)
                  const dateEl = match ? (
                    <>
                      {match[1]}
                      <span className="text-[10px]">月</span>
                      {match[2]}
                      <span className="text-[10px]">日</span>
                    </>
                  ) : (
                    ticket.date
                  )

                  const rawTime = ticket.time.replace(/\s/g, "")
                  const timeMatch = rawTime.match(/^(上午|中午|下午|晚上)(.*)/)
                  const timeEl = timeMatch ? (
                    <>
                      <span className="text-[10px]">{timeMatch[1]}</span>
                      {timeMatch[2]}
                    </>
                  ) : (
                    rawTime
                  )

                  return (
                    <>
                      {dateEl} {timeEl}
                    </>
                  )
                })()}
              </div>
            </div>

            {/* Movie Info */}
            <div className="absolute bottom-4 left-4 z-10">
              <h3 className="text-xl font-bold text-white">{ticket.movieTitle}</h3>
              <div className="mt-2 flex items-center space-x-4 text-xs text-[#A5A5A5]">
                <div className="flex items-center space-x-1">
                  <UserIcon />
                  <span>{ticket.participantCount} 人</span>
                  <DotIcon />
                  <ClockIcon />
                  <span>{ticket.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default TicketList
