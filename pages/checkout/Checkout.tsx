import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import CountdownTimer from "@/components/checkout/CountdownTimer"
import FooterButton from "@/components/checkout/FooterButton"
import TimeoutModal from "@/components/checkout/TimeoutModal"
import OrderInfoCard from "@/components/shared/OrderInfoCard"
import { requestLinePay } from "@/services/paymentAPI"
import toast from "react-hot-toast"

type SelectedSeat = {
  row: string
  column: number
}

type LocationState = {
  movieTitle: string
  posterUrl: string
  rating: string
  duration: string
  genre: string
  date: string
  time: string
  theaterName: string
  room?: string // Legacy support if needed
  selectedSeats: SelectedSeat[]
  ticketType: string
  ticketCount: number
  price: number
  totalPrice: number
  orderId: number
  showTimeId: number
}

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null

  const [isTimeout, setIsTimeout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const {
    movieTitle,
    posterUrl,
    rating,
    duration,
    date,
    time,
    theaterName,
    room,
    selectedSeats,
    ticketType,
    ticketCount,
    totalPrice,
  } = state

  const displayTheater = theaterName || room || "未知影廳"
  const HANDLING_FEE = 20
  const finalTotalPrice = totalPrice + HANDLING_FEE

  const sortedSeats = [...selectedSeats].sort((a, b) => {
    if (a.row === b.row) return a.column - b.column
    return a.row.localeCompare(b.row)
  })

  const seatString = sortedSeats.map((s) => `${s.row}${s.column}`).join(", ")

  return (
    <div className="w-full bg-black text-white">
      <header className="absolute top-0 right-0 left-0 z-20 flex items-center justify-center px-4 py-[15px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-4 rounded-lg bg-[rgba(170,170,170,0.4)] p-2 hover:bg-white/20"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">確認你的訂單</h1>
      </header>

      <div className="relative h-[230px] w-full">
        <div className="absolute inset-0">
          <img src={posterUrl} alt={movieTitle} className="h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/90" />
        </div>

        <div className="absolute -bottom-8 left-0 px-4">
          <h2 className="text-2xl font-semibold">{movieTitle}</h2>
          <p className="mt-1 text-sm text-[#BDBDBD]">
            {rating} · {duration}
          </p>
        </div>
      </div>

      <main className="mt-10 px-4">
        <CountdownTimer onTimeout={() => setIsTimeout(true)} />

        <OrderInfoCard
          date={date}
          time={time}
          theater={displayTheater}
          type={ticketType || "一般數位"}
          seats={seatString}
        />

        <div className="mt-3 rounded-[10px] bg-[#222222]">
          <div className="space-y-3 px-3 py-4">
            <div className="flex justify-between text-[#9E9E9E]">
              <span>
                {ticketType || "一般數位"} * {ticketCount}
              </span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between text-[#9E9E9E]">
              <span>手續費</span>
              <span>${HANDLING_FEE}</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-[10px] bg-[#383838] px-3 py-4">
            <span className="text-lg font-bold">總計</span>
            <span className="text-lg font-bold text-[#4BCCBE]">${finalTotalPrice}</span>
          </div>
        </div>

        <div className="mt-3 rounded-[10px] bg-[#222222] p-3">
          <span className="text-sm text-[#9E9E9E]">付款方式</span>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#11968D]">
              <div className="h-2.5 w-2.5 rounded-full bg-[#11968D]" />
            </div>
            <span>Line Pay</span>
          </div>
        </div>
      </main>

      <footer className="mt-3 mb-[101px] px-4">
        <FooterButton
          loading={isSubmitting}
          onClick={async () => {
            try {
              setIsSubmitting(true)
              // 儲存目前狀態到 sessionStorage，以便從 Line Pay 跳轉回來時重新取得資料
              sessionStorage.setItem(
                "checkout_state",
                JSON.stringify({
                  ...state,
                  seatString,
                  finalTotalPrice,
                })
              )

              const response = await requestLinePay({ orderId: state.orderId })
              console.log("Line Pay Request Response:", response)

              // 兼容不同可能的資料結構 (例如有沒有 data 包層，或是直接回傳扁平資料)
              const paymentUrl = response.data?.paymentUrl || (response as any).paymentUrl

              // 如果有支付連結，就代表請求成功（即使後端沒給 success: true 欄位）
              if (paymentUrl) {
                // 跳轉至 Line Pay 付款頁面
                window.location.href = paymentUrl
              } else {
                toast.error(response.message || "發起付款失敗，請聯繫客服")
              }
            } catch (err) {
              console.error("Line Pay Request Error:", err)
              toast.error("發生錯誤，請稍後再試")
            } finally {
              setIsSubmitting(false)
            }
          }}
        >
          {isSubmitting ? "跳轉至 Line Pay..." : "付款"}
        </FooterButton>
      </footer>

      <TimeoutModal isOpen={isTimeout} />
    </div>
  )
}

export default Checkout
