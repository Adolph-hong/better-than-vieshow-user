import { useState, useMemo, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import QRCode from "react-qr-code"
import OrderInfoCard from "@/components/shared/OrderInfoCard"
import OrderSummaryCard from "@/components/shared/OrderSummaryCard"
import { getOrder } from "@/services/orderAPI"
import type { OrderDetail } from "@/types/order"

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [[page], setPage] = useState([0, 0])
  const currentSeatIndex = page

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true)
        if (!id) throw new Error("無效的訂單編號")
        const response = await getOrder(id)
        if (response.success) {
          setTicket(response.data)
        } else {
          setError(response.message || "無法取得訂單詳情")
        }
      } catch (err) {
        console.error("Fetch ticket error:", err)
        setError("載入訂單時發生錯誤")
      } finally {
        setLoading(false)
      }
    }

    fetchTicket()
  }, [id])

  const seats = useMemo(() => {
    return ticket?.seats || []
  }, [ticket?.seats])

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

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const isFirst = currentSeatIndex === 0
  const isLast = currentSeatIndex === seats.length - 1

  const dragConstraints = {
    left: isLast ? -50 : -window.innerWidth,
    right: isFirst ? 50 : window.innerWidth,
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
        <p className="text-red-500 mb-4">{error || "找不到票卷"}</p>
        <button
          onClick={() => navigate("/tickets")}
          className="rounded-lg bg-[#11968D] px-4 py-2 text-white"
        >
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
            src={ticket.movie.posterUrl}
            alt={ticket.movie.title}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#0000004D]" />
          <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="absolute top-0 right-0 left-0 flex items-center px-4 py-[15px]">
          <button
            onClick={() => navigate("/tickets")}
            className="rounded-sm bg-white/30 p-2 backdrop-blur-sm"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold">票卷細節</h1>
          <div className="w-10" />
        </div>

        <div className="absolute -bottom-6 px-4">
          <h2 className="text-2xl font-bold">{ticket.movie.title}</h2>
          <p className="mt-1 text-sm text-[#CCCCCC]">
            {ticket.movie.rating} • {ticket.movie.duration} 分鐘
          </p>
        </div>
      </div>

      <div className="scrollbar-hide mt-8 flex w-full space-x-2 overflow-x-auto px-4">
        {seats.map((seat, index) => (
          <button
            key={seat.seatId}
            onClick={() => jumpToSeat(index)}
            className={`h-[28px] w-[46px] rounded-full text-sm font-medium transition-colors ${
              index === currentSeatIndex
                ? "bg-[#11968D] text-white"
                : "bg-[#222222] text-gray-400 hover:bg-[#333333]"
            }`}
          >
            {seat.rowName}{seat.columnNumber}
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
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            const dragThreshold = window.innerWidth * 0.15

            if (swipe < -swipeConfidenceThreshold || offset.x < -dragThreshold) {
              if (!isLast) paginate(1)
            } else if (swipe > swipeConfidenceThreshold || offset.x > dragThreshold) {
              if (!isFirst) paginate(-1)
            }
          }}
          style={{
            gap: "12px",
            width: "max-content",
            paddingRight: "28px",
          }}
        >
          {seats.map((seat) => {
            const seatQrValue = seat.ticketNumber

            return (
              <motion.div
                key={seat.seatId}
                className="relative w-[85vw] shrink-0 overflow-hidden rounded-[10px] bg-[#1A1A1A]"
              >
                <div className="absolute left-1/2 mt-4 -translate-x-1/2">
                  <span
                    className={`rounded-full px-3 py-[5.5px] text-sm text-white ${
                      ticket.status === "Paid"
                        ? "bg-[#11968D] text-black"
                        : "bg-[#777777] text-white"
                    }`}
                  >
                    {ticket.status === "Paid" ? "尚未使用" : "已過期"}
                  </span>
                </div>

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
                    className="h-px flex-1"
                    style={{
                      backgroundImage: "linear-gradient(to right, #777777 50%, transparent 50%)",
                      backgroundSize: "12px 1px",
                      backgroundRepeat: "repeat-x",
                    }}
                  />
                  <div className="-mr-3 h-6 w-6 rounded-l-full bg-black" />
                </div>

                <OrderInfoCard
                  date={ticket.showtime.date}
                  time={ticket.showtime.startTime}
                  theater={ticket.theater.name}
                  type={ticket.theater.type}
                  seats={`${seat.rowName}${seat.columnNumber}`}
                  className="rounded-none bg-transparent p-4"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-4 px-4 pb-[153px]">
        <OrderSummaryCard
          totalPrice={ticket.totalAmount}
          paymentMethod={ticket.paymentMethod || "未付款"}
          orderId={ticket.orderNumber}
        />
      </div>
    </div>
  )
}

export default TicketDetail
