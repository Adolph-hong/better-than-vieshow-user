import { useNavigate, useLocation } from "react-router-dom"
import { Check } from "lucide-react"

type LocationState = {
  movieTitle: string
  posterUrl: string
  rating: string
  duration: string
  genre: string
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

  const { movieTitle, posterUrl, rating, duration, genre, finalTotalPrice } = state

  return (
    <div className="flex min-h-screen w-full flex-col bg-black font-sans text-white">
      {/* Top Half: Poster Background */}
      <div className="relative h-[45vh] w-full">
        <img src={posterUrl} alt={movieTitle} className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Content */}
      <div className="z-10 -mt-10 flex flex-1 flex-col items-center px-3 py-3">
        {/* Success Icon */}
        <div className="rounded-full bg-[#830508]/40 p-[11.86px]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#830508E5]">
            <Check className="h-10 w-10 stroke-[3] text-white" />
          </div>
        </div>

        <h1 className="mt-3 text-2xl font-bold">付款成功</h1>

        {/* Ticket Info Card */}
        <div className="mt-10 w-full max-w-sm rounded-lg bg-[#222222] p-5">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-medium text-[#F2F2F2]">
              ${finalTotalPrice.toLocaleString()}
            </span>
            <div className="my-3 h-[1px] w-full bg-[#414141]" />
            <h2 className="font-bold text-[#F2F2F2]">{movieTitle}</h2>
            <p className="text-sm text-[#CCCCCC]">
              {genre} · {rating} · {duration}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <footer className="mt-[134px] w-full px-[77.5px]">
          <div className="w-full rounded-full bg-[#FFFFFFBF] p-[6px]">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 rounded-full border border-black bg-[#D9D9D9] px-3 py-2 font-medium whitespace-nowrap text-black transition-colors hover:bg-gray-300"
              >
                回到首頁
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 rounded-full bg-[#830508] px-3 py-2 font-medium whitespace-nowrap text-white transition-colors hover:bg-[#600000]"
              >
                查看票卷
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default PaymentSuccess
