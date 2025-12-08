import { useNavigate, useLocation } from "react-router-dom"
import { Check } from "lucide-react"
import FooterButton from "@/components/checkout/FooterButton"
import OrderInfoCard from "@/components/checkout/OrderInfoCard"
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
    <div className="flex min-h-[100dvh] w-full flex-col bg-black text-white">
      {/* Content */}
      <div className="z-10 flex flex-1 flex-col items-center px-4 py-[105px]">
        {/* Success Icon */}
        <div className="rounded-full bg-[#4BCCBE]/40 p-[11.86px]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4BCCBE]">
            <Check className="h-10 w-10 stroke-[3] text-white" />
          </div>
        </div>

        <h1 className="mt-3 text-2xl font-bold">付款成功</h1>

        <section className="w-full">
          <OrderInfoCard
            title={movieTitle}
            date={date}
            time={time}
            theater={theaterName}
            type={ticketType}
            seats={seatString}
            className="mt-3"
          />
        </section>

        <section className="mt-3 w-full justify-between space-y-3 rounded-[10px] bg-[#222222] px-3 py-4">
          <div className="flex justify-between">
            <p className="text-[#A5A5A5]">總金額</p>
            <p>${finalTotalPrice}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-[#A5A5A5]">付款方式</p>
            <p>LIne Pay</p>
          </div>

          <div className="flex justify-between">
            <p className="text-[#A5A5A5]">訂單編號</p>
            <p>{generateOrderId()}</p>
          </div>
        </section>

        <footer className="mt-6 w-full space-y-2">
          <FooterButton variant="outline" onClick={() => navigate("/")}>
            返回首頁
          </FooterButton>
          <FooterButton>查看票卷</FooterButton>
        </footer>
      </div>
    </div>
  )
}

export default PaymentSuccess
