import { useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft, X } from "lucide-react"
import SeatIcon from "../src/assets/seat/seat.svg?react"

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
  room: string
  selectedSeats: SelectedSeat[]
  ticketType: string
  ticketCount: number
  price: number
  totalPrice: number
}

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null

  if (!state) {
    // Fallback if accessed directly without state
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
    genre,
    date,
    time,
    room,
    selectedSeats,
    ticketType,
    ticketCount,
    totalPrice, // This is just ticket price from previous page
  } = state

  const HANDLING_FEE = 20
  const finalTotalPrice = totalPrice + HANDLING_FEE

  return (
    <div className="min-h-screen w-full bg-black font-sans text-white">
      {/* Header */}
      <header className="relative flex items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full p-1 hover:bg-gray-800"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-medium">結帳</h1>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-full p-1 hover:bg-gray-800"
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      <main className="px-6 pb-24">
        {/* Movie Info */}
        <div className="mt-2 flex flex-col items-center">
          <div className="h-[160px] w-[120px] overflow-hidden">
            <img src={posterUrl} alt={movieTitle} className="h-full w-full object-cover" />
          </div>
          <h2 className="mt-3 text-xl font-bold">{movieTitle}</h2>
          <p className="mt-1 text-sm text-[#CCCCCC]">
            {genre} · {rating} · {duration}
          </p>
        </div>

        {/* Date & Time & Room */}
        <div className="mt-4 flex flex-col gap-2">
          <h3 className="text-sm font-medium">日期</h3>
          <p className="text-sm font-medium">
            {date} · {time} · {room}
          </p>
        </div>

        {/* Seats */}
        <div className="mt-6 flex flex-col gap-2">
          <h3 className="text-sm font-medium">座位</h3>
          <div className="space-y-3">
            {selectedSeats.map((seat) => (
              <div key={`${seat.row}-${seat.column}`} className="flex items-center gap-3">
                <SeatIcon className="h-[19px] w-6 fill-white" />
                <span>
                  {seat.row}排 · {seat.column}號
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mt-6">
          <h3 className="mb-2 font-medium">費用</h3>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex gap-16">
                <span>{ticketType}</span>
                <span>*{ticketCount}</span>
              </div>
              <span>${totalPrice}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>手續費</span>
              <span>${HANDLING_FEE}</span>
            </div>
            <div className="h-[1px] w-full bg-white" />
            <div className="flex items-center justify-between">
              <span>小記</span>
              <span>${finalTotalPrice}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Action */}
      <footer className="fixed right-0 bottom-0 left-0 px-[47.5px] py-3">
        <div className="rounded-full bg-[#FFFFFFBF] p-[6px]">
          <button
            type="button"
            onClick={() => {
              navigate("/payment/success", {
                state: {
                  movieTitle,
                  posterUrl,
                  rating,
                  duration,
                  genre,
                  finalTotalPrice,
                },
              })
            }}
            className="flex w-full items-center justify-center gap-1 rounded-full bg-[#24B91B] py-[10px] font-bold transition-colors hover:bg-green-600"
          >
            <span className="font-bold">LINE</span>
            <span className="flexitems-center rounded bg-white px-1 font-bold text-[#24B91B]">
              Pay
            </span>
            <span className="ml-11 font-medium">支付 NT ${finalTotalPrice}</span>
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Checkout
