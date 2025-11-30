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
          <div className="h-[180px] w-[135px] overflow-hidden rounded-md shadow-lg">
            <img src={posterUrl} alt={movieTitle} className="h-full w-full object-cover" />
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-wide">{movieTitle}</h2>
          <p className="mt-1 text-sm text-gray-400">
            {genre} · {rating} · {duration}
          </p>
        </div>

        {/* Date & Time & Room */}
        <div className="mt-8">
          <h3 className="text-sm text-gray-300">日期</h3>
          <p className="mt-1 text-base font-medium">
            {date} · {time} · {room}
          </p>
        </div>

        {/* Seats */}
        <div className="mt-6">
          <h3 className="mb-2 text-sm text-gray-300">座位</h3>
          <div className="space-y-2">
            {selectedSeats.map((seat) => (
              <div key={`${seat.row}-${seat.column}`} className="flex items-center gap-3">
                <SeatIcon className="h-5 w-5 fill-white" />
                <span className="text-base font-medium">
                  {seat.row}排 · {seat.column}號
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mt-8">
          <h3 className="mb-2 text-sm text-gray-300">費用</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-base">
              <div className="flex gap-8">
                <span>{ticketType}</span>
                <span>*{ticketCount}</span>
              </div>
              <span>${totalPrice}</span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span>手續費</span>
              <span>${HANDLING_FEE}</span>
            </div>
            <div className="my-3 h-[1px] w-full bg-gray-700" />
            <div className="flex items-center justify-between text-base font-bold">
              <span>小記</span>
              <span>${finalTotalPrice}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Action */}
      <footer className="fixed right-0 bottom-0 left-0 bg-black p-6">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00B900] py-3 font-bold text-white transition-colors hover:bg-[#009900]"
        >
          <span className="text-lg">LINE</span>
          <span className="flex h-4 items-center rounded bg-white px-1 text-xs font-extrabold text-[#00B900]">
            Pay
          </span>
          <span className="ml-2">支付 NT ${finalTotalPrice}</span>
        </button>
      </footer>
    </div>
  )
}

export default Checkout
