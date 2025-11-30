import { Fragment, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft, Check, Ticket, Loader2 } from "lucide-react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import SeatIcon from "../src/assets/seat/seat.svg?react"
import { fetchSeatMap, type Seat, type SeatMap } from "../src/mocks/movieData"

type SelectedSeat = {
  row: string
  column: number
} | null

type LocationState = {
  movieTitle: string
  date: string
  time: string
  price: number
  ticketCount: number
}

const SeatSelection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null

  const [loading, setLoading] = useState(true)
  const [seatMap, setSeatMap] = useState<SeatMap | null>(null)

  // Check if state exists, if not redirect or show loading
  // For this exercise, if no state, we can default or return early.
  // We'll initialize with defaults if missing to prevent crash, but ideally should redirect.
  const { movieTitle, date, time, price, ticketCount } = state || {
    movieTitle: "",
    date: "",
    time: "",
    price: 0,
    ticketCount: 0,
  }

  // If no ticket count (direct access), maybe default to 1 or redirect
  const effectiveTicketCount = ticketCount > 0 ? ticketCount : 1

  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>(
    Array(effectiveTicketCount).fill(null)
  )

  useEffect(() => {
    if (!state) {
      // Optional: Redirect back if accessed directly
      // navigate("/movie/showtime")
      // return
    }

    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchSeatMap()
        setSeatMap(data)
      } catch (error) {
        console.error("Failed to load seat map", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [state])

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "sold") return

    const seatKey = `${seat.row}${seat.column}`
    const currentIndex = selectedSeats.findIndex((s) => s && `${s.row}${s.column}` === seatKey)

    if (currentIndex !== -1) {
      // Unselect: remove the seat from the array
      const newSelected = [...selectedSeats]
      newSelected[currentIndex] = null
      setSelectedSeats(newSelected)
    } else {
      // Select: find first empty slot
      const emptyIndex = selectedSeats.findIndex((s) => s === null)
      if (emptyIndex !== -1) {
        const newSelected = [...selectedSeats]
        newSelected[emptyIndex] = { row: seat.row, column: seat.column }
        setSelectedSeats(newSelected)
      } else {
        // Optional: Replace the first one or last one if full?
        // Or just do nothing (current behavior is do nothing if full)
      }
    }
  }

  const getSeatStatus = (seat: Seat): "sold" | "available" | "selected" | "wheelchair" => {
    // Treat 'selected' in mock data as available for this user since we start fresh
    if (seat.status === "sold") return "sold"
    if (seat.type === "wheelchair") return "wheelchair"

    const isSelected = selectedSeats.some(
      (s) => s && s.row === seat.row && s.column === seat.column
    )
    return isSelected ? "selected" : "available"
  }

  const getSeatFillColor = (status: string) => {
    switch (status) {
      case "sold":
        return "#3A3A3A" // 已售出 - 深灰色
      case "selected":
        return "#A92828" // 已選擇 - 紅色
      case "wheelchair":
        return "#208716" // 輪椅座位 - 綠色
      default:
        return "#B5B5B5" // 可選座位 - 淺灰色
    }
  }

  const currentTotalPrice = selectedSeats.filter((s) => s !== null).length * price

  if (loading || !seatMap) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // 將座位按照行分組，並按column排序
  const seatsByRow: Record<string, Seat[]> = {}
  seatMap.seats.forEach((seat) => {
    if (!seatsByRow[seat.row]) {
      seatsByRow[seat.row] = []
    }
    seatsByRow[seat.row].push(seat)
  })

  // 對每行的座位按column排序
  Object.keys(seatsByRow).forEach((row) => {
    seatsByRow[row].sort((a, b) => a.column - b.column)
  })

  const ROW_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  const { verticalAisles = [], horizontalAisle } = seatMap // 走道位置

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* 背景模糊效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-90" />
      <div className="absolute inset-0 backdrop-blur-3xl" />

      {/* 內容區域 */}
      <div className="relative z-10">
        {/* 頂部導航欄 */}
        <div className="flex px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full transition-colors hover:bg-gray-800"
            aria-label="返回"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-medium">{movieTitle}</h1>
            <p className="font-medium text-[#787878]">
              {date} · {time}
            </p>
          </div>
          <div className="w-6" /> {/* 平衡左側按鈕 */}
        </div>

        {/* 螢幕指示器和座位地圖 */}
        <section className="px-4">
          <TransformWrapper centerOnInit initialScale={1} minScale={1} maxScale={3}>
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-max"
              contentStyle={{ width: "max-content" }}
            >
              <div className="mt-4">
                {/* 螢幕指示器 */}
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs">螢幕</p>
                  <div className="h-[2px] w-[240px] bg-[#D9D9D9]" />
                </div>

                {/* 座位地圖 */}
                <div className="mt-8 space-y-3">
                  {ROW_LABELS.map((row, rowIndex) => {
                    const rowSeats = seatsByRow[row] || []
                    // 橫向走道：在指定排之前插入（例如 horizontalAisle = 5 表示在第5排（F）之前插入，即在E之後）
                    const shouldAddHorizontalAisleBefore =
                      horizontalAisle !== undefined && rowIndex === horizontalAisle

                    return (
                      <Fragment key={row}>
                        {/* 橫向走道（在指定排之前插入） */}
                        {shouldAddHorizontalAisleBefore && (
                          <div key={`horizontal-aisle-${row}`} className="h-3" />
                        )}

                        <div className="flex items-center justify-center gap-2">
                          {rowSeats.map((seat) => {
                            const status = getSeatStatus(seat)
                            // 檢查是否需要在這個座位後插入垂直走道
                            const shouldAddVerticalAisle = verticalAisles.includes(seat.column)

                            return (
                              <Fragment key={`${seat.row}-${seat.column}`}>
                                <button
                                  type="button"
                                  onClick={() => handleSeatClick(seat)}
                                  disabled={status === "sold"}
                                  className={`${
                                    status === "sold"
                                      ? "cursor-not-allowed opacity-50"
                                      : "cursor-pointer hover:opacity-80"
                                  } transition-all`}
                                  aria-label={`${seat.row}排 ${seat.column}號`}
                                  title={`${seat.row}排 ${seat.column}號`}
                                >
                                  <SeatIcon
                                    fill={getSeatFillColor(status)}
                                    className="h-[19px] w-6"
                                  />
                                </button>
                                {/* 垂直走道（空白間距） */}
                                {shouldAddVerticalAisle && <div className="w-2" />}
                              </Fragment>
                            )
                          })}
                        </div>
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </section>

        {/* 圖例 */}
        <div className="mt-[38px] flex justify-center gap-8 text-[10px]">
          <div className="flex flex-col items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#3A3A3A]" />
            <span className="text-xs">已售出</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#888888]" />
            <span className="text-xs">可選座位</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#A92828]" />
            <span className="text-xs">已選擇</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#208716]" />
            <span className="text-xs">輪椅座位</span>
          </div>
        </div>

        {/* 座位選擇框 */}
        <div className="mt-[47px] flex gap-[18px] px-[49px]">
          {selectedSeats.map((seat, index) => {
            const seatId = seat ? `${seat.row}-${seat.column}` : `empty-${index}`
            return (
              <div
                key={`seat-selection-${seatId}`}
                className={`relative flex-1 rounded-sm border-1 p-3 ${
                  seat ? "border-[#830508]" : "border-gray-400 bg-transparent"
                }`}
              >
                {seat && (
                  <div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#830508] bg-[#830508]">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-xs font-normal">座位 {index + 1}</p>
                  <p className="text-xs font-normal">
                    {seat ? `${seat.row} 排 ${seat.column}號` : "尚未選取"}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* 底部總金額和確認按鈕 */}
        <footer className="px-[42.5px]">
          <div className="mx-auto mt-5 flex items-center justify-between rounded-[28px] bg-[#FFFFFFBF]">
            <div className="px-[18px] text-sm text-black">
              <p>總金額 : ${currentTotalPrice} 元</p>
            </div>
            <div className="px-[6px] py-[6px]">
              <button
                type="button"
                className="flex items-center gap-2 rounded-[28px] bg-[#830508] px-4 py-[8px] font-medium text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={selectedSeats.every((s) => s === null)}
                aria-label="確認票卷"
              >
                <Ticket className="h-6 w-6" />
                確認票卷
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default SeatSelection
