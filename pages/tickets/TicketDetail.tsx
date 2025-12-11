import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import QRCode from "react-qr-code"
import { useTickets } from "@/context/TicketContext"

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTicket } = useTickets()
  const ticket = getTicket(id || "")
  const [currentSeatIndex, setCurrentSeatIndex] = useState(0)

  const seats = useMemo(() => {
    return ticket?.seatString ? ticket.seatString.split(",").map((s) => s.trim()) : []
  }, [ticket?.seatString])

  if (!ticket) {
    // In a real app, might want to show a loading state or 404
    // For now, redirect back to list
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p>找不到票卷</p>
        <button onClick={() => navigate("/tickets")} className="ml-4 text-[#4BCCBE]">
          返回列表
        </button>
      </div>
    )
  }

  const currentSeat = seats[currentSeatIndex]

  const handlePrev = () => {
    setCurrentSeatIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setCurrentSeatIndex((prev) => (prev < seats.length - 1 ? prev + 1 : prev))
  }

  // Generate a consistent "random" value for the QR code based on ticket ID and seat
  const qrValue = `${ticket.id}-${currentSeat}-${ticket.orderId}`

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header / Background Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={ticket.posterUrl}
            alt={ticket.movieTitle}
            className="h-full w-full object-cover opacity-60 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 right-0 left-0 z-10 flex items-center px-4 pt-6 pb-4">
          <button
            onClick={() => navigate("/tickets")}
            className="rounded-full bg-white/20 p-2 backdrop-blur-md transition-colors hover:bg-white/30"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold">票卷細節</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Movie Info */}
        <div className="absolute right-0 bottom-4 left-0 px-4 text-center">
          <h2 className="text-3xl font-bold tracking-wide">{ticket.movieTitle}</h2>
          <p className="mt-2 text-sm text-gray-300">
            {ticket.rating} • {ticket.duration}
          </p>
        </div>
      </div>

      {/* Seat Selection Pills */}
      <div className="scrollbar-hide mt-4 flex w-full space-x-2 overflow-x-auto px-4 pb-2">
        {seats.map((seat, index) => (
          <button
            key={seat}
            onClick={() => setCurrentSeatIndex(index)}
            className={`min-w-[50px] rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              index === currentSeatIndex
                ? "bg-[#4BCCBE] text-black"
                : "bg-[#222222] text-gray-400 hover:bg-[#333333]"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      {/* Pager Controls */}
      <div className="mt-4 flex items-center justify-center space-x-8 text-sm font-medium">
        <button
          onClick={handlePrev}
          disabled={currentSeatIndex === 0}
          className="p-2 text-gray-400 disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span>
          第 {currentSeatIndex + 1} / {seats.length} 票卷
        </span>
        <button
          onClick={handleNext}
          disabled={currentSeatIndex === seats.length - 1}
          className="p-2 text-gray-400 disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Ticket Card */}
      <div className="mt-6 px-6">
        <div className="relative overflow-hidden rounded-2xl bg-[#1A1A1A]">
          {/* Status Badge */}
          <div className="absolute top-0 left-1/2 mt-4 -translate-x-1/2 transform">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                ticket.status === "active" ? "bg-[#4BCCBE] text-black" : "bg-gray-600 text-white"
              }`}
            >
              {ticket.status === "active" ? "尚未使用" : "已失效"}
            </span>
          </div>

          {/* QR Code Area */}
          <div className="flex flex-col items-center pt-16 pb-8">
            <div className="rounded-xl bg-white p-3">
              <QRCode
                value={qrValue}
                size={160}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox="0 0 256 256"
              />
            </div>
          </div>

          {/* Dotted Divider */}
          <div className="relative flex w-full items-center justify-between">
            <div className="h-4 w-2 rounded-r-full bg-black" />
            <div className="h-[1px] flex-1 border-t-2 border-dashed border-[#333333]" />
            <div className="h-4 w-2 rounded-l-full bg-black" />
          </div>

          {/* Ticket Info Details */}
          <div className="grid grid-cols-2 gap-y-4 px-6 py-6 text-sm">
            <div>
              <p className="text-[#A5A5A5]">日期</p>
              <p className="mt-1 font-medium text-white">
                {ticket.date} (
                {ticket.date.includes("六") || ticket.date.includes("日") ? "假日" : "平日"})
              </p>
            </div>
            <div>
              <p className="text-[#A5A5A5]">時間</p>
              <p className="mt-1 font-medium text-white">{ticket.time}</p>
            </div>
            <div>
              <p className="text-[#A5A5A5]">影廳</p>
              <p className="mt-1 font-medium text-white">{ticket.theaterName}</p>
            </div>
            <div>
              <p className="text-[#A5A5A5]">類型</p>
              <p className="mt-1 font-medium text-white">{ticket.ticketType}</p>
            </div>
            <div>
              <p className="text-[#A5A5A5]">座位</p>
              <p className="mt-1 text-xl font-bold text-white">{currentSeat}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="mt-6 px-4 pb-10">
        <div className="space-y-3 rounded-xl bg-[#222222] px-4 py-5">
          <div className="flex justify-between text-sm">
            <span className="text-[#A5A5A5]">總金額</span>
            <span className="font-medium text-white">${ticket.finalTotalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#A5A5A5]">付款方式</span>
            <span className="font-medium text-white">{ticket.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#A5A5A5]">訂單編號</span>
            <span className="font-medium text-white">{ticket.orderId}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
