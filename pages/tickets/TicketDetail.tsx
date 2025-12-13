import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import QRCode from "react-qr-code"
import OrderInfoCard from "@/components/shared/OrderInfoCard"
import OrderSummaryCard from "@/components/shared/OrderSummaryCard"
import { useTickets } from "@/context/TicketContext"

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTicket } = useTickets()
  const ticket = getTicket(id || "")
  const [[page], setPage] = useState([0, 0])
  const currentSeatIndex = page

  const seats = useMemo(() => {
    return ticket?.seatString ? ticket.seatString.split(",").map((s) => s.trim()) : []
  }, [ticket?.seatString])

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection
    if (newPage >= 0 && newPage < seats.length) {
      setPage([newPage, newDirection])
    }
  }

  const jumpToSeat = (index: number) => {
    if (index === currentSeatIndex) return
    setPage([index, index > currentSeatIndex ? 1 : -1])
  }

  if (!ticket) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p>找不到票卷</p>
        <button onClick={() => navigate("/tickets")} className="ml-4 text-[#4BCCBE]">
          返回列表
        </button>
      </div>
    )
  }

  const handlePrev = () => paginate(-1)
  const handleNext = () => paginate(1)

  return (
    <div className="text-white">
      <div className="relative h-[220px] w-full">
        <div className="absolute inset-0">
          <img
            src={ticket.posterUrl}
            alt={ticket.movieTitle}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#0000004D]" />
          <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="absolute top-0 right-0 left-0 flex items-center px-4 py-[15px]">
          <button
            onClick={() => navigate("/tickets")}
            className="rounded-sm bg-[#AAAAAA66] bg-white/30 p-2 backdrop-blur-sm"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold">票卷細節</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <div className="absolute -bottom-6 px-4">
          <h2 className="text-2xl font-bold">{ticket.movieTitle}</h2>
          <p className="mt-1 text-sm text-[#CCCCCC]">
            {ticket.rating} • {ticket.duration}
          </p>
        </div>
      </div>

      <div className="scrollbar-hide mt-8 flex w-full space-x-2 overflow-x-auto px-4">
        {seats.map((seat, index) => (
          <button
            key={seat}
            onClick={() => jumpToSeat(index)}
            className={`h-[28px] w-[46px] rounded-full text-sm font-medium transition-colors ${
              index === currentSeatIndex
                ? "bg-[#11968D] text-white"
                : "bg-[#222222] text-gray-400 hover:bg-[#333333]"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentSeatIndex === 0}
          className="text-[#F5F5F5] disabled:text-[#999999]"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-medium">
          <span className="text-xs font-normal">第</span> {currentSeatIndex + 1} / {seats.length}{" "}
          <span className="text-xs font-normal">票卷</span>
        </span>
        <button
          onClick={handleNext}
          disabled={currentSeatIndex === seats.length - 1}
          className="text-[#F5F5F5] disabled:text-[#999999]"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-3 overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: `calc(-${currentSeatIndex} * (85vw + 12px) + 28px)`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            gap: "12px",
            width: "max-content",
            paddingRight: "28px", // Balance the left padding visually at the end
          }}
        >
          {seats.map((seat) => {
            // Generate QR value for each seat
            const seatQrValue = `${ticket.id}-${seat}-${ticket.orderId}`

            return (
              <motion.div
                key={seat}
                className="relative w-[85vw] shrink-0 overflow-hidden rounded-[10px] bg-[#1A1A1A]"
              >
                <div className="absolute left-1/2 mt-4 -translate-x-1/2">
                  <span
                    className={`rounded-full px-3 py-[7px] text-xs text-white ${
                      ticket.status === "active"
                        ? "bg-[#11968D] text-black"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {ticket.status === "active" ? "尚未使用" : "已失效"}
                  </span>
                </div>

                {/* QR Code Area */}
                <div className="flex flex-col items-center pt-14">
                  <div className="bg-white p-[8.75px]">
                    <QRCode
                      value={seatQrValue}
                      size={122.5}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox="0 0 256 256"
                    />
                  </div>
                </div>

                <div className="relative mt-3 flex w-full items-center">
                  <div className="-ml-3 h-6 w-6 rounded-r-full bg-black" />
                  <div
                    className="h-[1px] flex-1"
                    style={{
                      backgroundImage: "linear-gradient(to right, #777777 50%, transparent 50%)",
                      backgroundSize: "12px 1px",
                      backgroundRepeat: "repeat-x",
                    }}
                  />
                  <div className="-mr-3 h-6 w-6 rounded-l-full bg-black" />
                </div>

                <OrderInfoCard
                  date={ticket.date}
                  time={ticket.time}
                  theater={ticket.theaterName}
                  type={ticket.ticketType}
                  seats={seat}
                  className="rounded-none bg-transparent p-4"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-4 px-4 pb-[153px]">
        <OrderSummaryCard
          totalPrice={ticket.finalTotalPrice}
          paymentMethod={ticket.paymentMethod}
          orderId={ticket.orderId}
        />
      </div>
    </div>
  )
}

export default TicketDetail
