import { useEffect, useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Check } from "lucide-react"
import FooterButton from "@/components/checkout/FooterButton"
import OrderInfoCard from "@/components/shared/OrderInfoCard"
import OrderSummaryCard from "@/components/shared/OrderSummaryCard"
import { useTickets } from "@/context/TicketContext"
import { generateOrderId } from "@/mocks/movieData"

type LocationState = {
  movieTitle: string
  posterUrl: string
  rating: string
  duration: string
  genre: string
  date: string
  time: string
  theaterName: string
  ticketType: string
  seatString: string
  finalTotalPrice: number
}

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null
  const { addTicket } = useTickets()
  const hasAddedTicket = useRef(false)

  // Generate order ID once per session on this page
  const [orderId] = useState(() => generateOrderId())

  useEffect(() => {
    if (!state || hasAddedTicket.current) return

    // Mark as added to prevent double addition in StrictMode
    hasAddedTicket.current = true

    const participantCount = state.seatString.split(",").length

    addTicket({
      movieTitle: state.movieTitle,
      posterUrl: state.posterUrl,
      rating: state.rating,
      duration: state.duration,
      genre: state.genre,
      date: state.date,
      time: state.time,
      theaterName: state.theaterName,
      ticketType: state.ticketType,
      seatString: state.seatString,
      finalTotalPrice: state.finalTotalPrice,
      orderId,
      paymentMethod: "Line Pay",
      participantCount,
    })
  }, [state, addTicket, orderId])

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p>無資料，請重新選擇</p>
        <button onClick={() => navigate("/")} className="ml-4 text-blue-500">
          回首頁
        </button>
      </div>
    )
  }

  const { movieTitle, date, time, theaterName, ticketType, seatString, finalTotalPrice } = state

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-black text-white">
      {/* Content */}
      <div className="z-10 flex flex-1 flex-col items-center justify-between px-4 py-6 sm:justify-center sm:py-0">
        <div className="flex w-full flex-col items-center justify-center gap-2 sm:gap-4">
        {/* Success Icon */}
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-[#4BCCBE]/40 p-[11.86px]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4BCCBE]">
              <Check className="h-10 w-10 stroke-[3] text-white" />
            </div>
          </div>

          <h1 className="mt-2 text-xl font-semibold sm:text-2xl">付款成功</h1>
        </div>

        <section className="w-full space-y-2">
          <OrderInfoCard
            title={movieTitle}
            date={date}
            time={time}
            theater={theaterName}
            type={ticketType}
            seats={seatString}
            className="mt-0"
          />

          <OrderSummaryCard
            totalPrice={finalTotalPrice}
            paymentMethod="Line Pay"
            orderId={orderId}
            className="mt-0"
          />
        </section>
        </div>

        <footer className="mt-2 w-full space-y-2 pb-2 sm:pb-0">
          <FooterButton variant="outline" onClick={() => navigate("/")}>
            返回首頁
          </FooterButton>
          <FooterButton onClick={() => navigate("/tickets")}>查看票卷</FooterButton>
        </footer>
      </div>
    </div>
  )
}

export default PaymentSuccess
