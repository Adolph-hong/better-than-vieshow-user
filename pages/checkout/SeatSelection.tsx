import { Fragment, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft, Ticket, Loader2, Minimize2, Maximize2 } from "lucide-react"
import { PuffLoader } from "react-spinners"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import SeatIcon from "@/assets/seat/seat.svg?react"
import SeatBadge from "@/components/checkout/SeatBadge"
import BookingActionBar from "@/components/showtime/BookingActionBar"
import { getSeatData } from "@/services/seatAPI"
import { createOrder } from "@/services/orderAPI"
import { transformSeatData } from "@/utils/seatTransform"
import type { SeatMapData, Seat } from "@/types/seat"

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
  posterUrl?: string
  rating?: string
  duration?: string
  genre?: string
  ticketType?: string
  showTimeId: number
  selectedSeats?: SelectedSeat[]
}

const SeatSelection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [seatMap, setSeatMap] = useState<SeatMapData | null>(null)

  // Check if state exists, if not redirect or show loading
  // For this exercise, if no state, we can default or return early.
  // We'll initialize with defaults if missing to prevent crash, but ideally should redirect.
  const {
    movieTitle,
    date,
    time,
    price,
    ticketCount,
    posterUrl,
    rating,
    duration,
    genre,
    ticketType,
  } = state || {
    movieTitle: "",
    date: "",
    time: "",
    price: 0,
    ticketCount: 0,
    posterUrl: "",
    rating: "",
    duration: "",
    genre: "",
    ticketType: "",
    showTimeId: 0,
  }

  // If no ticket count (direct access), maybe default to 1 or redirect
  const effectiveTicketCount = ticketCount > 0 ? ticketCount : 1

  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>(
    state?.selectedSeats || Array(effectiveTicketCount).fill(null)
  )

  useEffect(() => {
    const loadData = async () => {
      if (!state || !state.showTimeId) {
        setError("缺少場次資訊")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const response = await getSeatData(state.showTimeId)
        const data = transformSeatData(response)
        if (data) {
          setSeatMap(data)
        } else {
          setError("座位資料格式錯誤")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "載入座位失敗")
        // eslint-disable-next-line no-console
        console.error("Failed to load seat map", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [state])

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "sold") return

    const seatKey = `${seat.row}${seat.column}`
    const currentIndex = selectedSeats.findIndex((s: SelectedSeat) => s && `${s.row}${s.column}` === seatKey)

    if (currentIndex !== -1) {
      // Unselect: remove the seat from the array
      const newSelected = [...selectedSeats]
      newSelected[currentIndex] = null
      setSelectedSeats(newSelected)
    } else {
      // Select: find first empty slot
      const emptyIndex = selectedSeats.findIndex((s: SelectedSeat) => s === null)
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

  const handleRemoveSeat = (index: number) => {
    const newSelected = [...selectedSeats]
    newSelected[index] = null
    setSelectedSeats(newSelected)
  }
  
  const handleConfirm = async () => {
    if (!state?.showTimeId || isSubmitting) return

    const selectedValidSeats = selectedSeats.filter((s): s is { row: string; column: number } => s !== null)
    if (selectedValidSeats.length === 0) return

    // Find seat IDs from seatMap
    const seatIds = selectedValidSeats.map((s) => {
      const seat = seatMap?.seats.find((sm) => sm.row === s.row && sm.column === s.column)
      return seat ? Number(seat.id) : null
    }).filter((id): id is number => id !== null)

    try {
      setIsSubmitting(true)
      const response = await createOrder({
        showTimeId: state.showTimeId,
        seatIds,
      })

      if (response.success) {
        navigate("/checkout", {
          state: {
            movieTitle,
            posterUrl,
            rating,
            duration,
            genre,
            date,
            time,
            theaterName: seatMap?.theaterName || "鳳廳",
            selectedSeats: selectedValidSeats,
            ticketType,
            ticketCount: selectedValidSeats.length,
            price,
            totalPrice: currentTotalPrice,
            orderId: response.data.orderId,
            showTimeId: state.showTimeId,
          },
        })
      } else {
        setError(response.message || "建立訂單失敗")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "建立訂單時發生錯誤")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSeatStatus = (seat: Seat): "sold" | "available" | "selected" | "wheelchair" => {
    // Treat 'selected' in mock data as available for this user since we start fresh
    if (seat.status === "sold") return "sold"
    if (seat.type === "wheelchair") return "wheelchair"

    const isSelected = selectedSeats.some(
      (s: SelectedSeat) => s && s.row === seat.row && s.column === seat.column
    )
    return isSelected ? "selected" : "available"
  }

  const getSeatFillColor = (status: string) => {
    if (status === "sold") return "#3A3A3A"
    if (status === "selected") return "#11968D"
    return "#B5B5B5"
  }

  const currentTotalPrice = effectiveTicketCount * price

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black text-white">
        <PuffLoader color="#11968D" size={50} />
        <p className="text-lg font-medium text-white">為您端上好座位...</p>
      </div>
    )
  }

  if (error || !seatMap) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <p className="text-red-500">錯誤: {error || "無法載入座位資料"}</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 rounded-lg bg-[#11968D] px-4 py-2 text-white"
        >
          返回上一頁
        </button>
      </div>
    )
  }

  // 將座位按照行分組，並按column排序
  const seatsByRow: Record<string, Seat[]> = {}
  seatMap.seats.forEach((seat: Seat) => {
    if (!seatsByRow[seat.row]) {
      seatsByRow[seat.row] = []
    }
    seatsByRow[seat.row].push(seat)
  })

  // 對每行的座位按column排序
  Object.keys(seatsByRow).forEach((row) => {
    seatsByRow[row].sort((a, b) => a.column - b.column)
  })

  const ROW_LABELS_CUSTOM = Array.from(new Set(seatMap.seats.map((s) => s.row))).sort()
  const verticalAisles: number[] = [] // API doesn't provide aisles, can be added if needed
  const horizontalAisle: number | undefined = undefined

  return (
    <div className="relative flex w-full flex-col overflow-hidden bg-black text-white">
      {/* 內容區域 */}
      <div className="relative z-10 flex-1">
        {/* 頂部導航欄 */}
        <div className="flex px-4 pt-[15px] pb-[14px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#AAAAAA66] transition-colors"
            aria-label="返回"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="-mt-2 flex-1 text-center">
            <h1 className="text-lg font-medium">{movieTitle}</h1>
            <p className="font-medium text-[#787878]">
              {date} · {time}
            </p>
          </div>
          <div className="w-8" /> {/* 平衡左側按鈕 */}
        </div>

        {/* 圖例 */}
        <div className="mt-3 flex justify-center gap-10 text-[10px]">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#3A3A3A]" />
            <span className="text-xs">已售出</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#888888]" />
            <span className="text-xs">可選座位</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#11968D]" />
            <span className="text-xs">已選擇</span>
          </div>
        </div>

        {/* 螢幕指示器和座位地圖 */}
        <section className="mt-4">
          <div className="mx-4 flex h-[400px] flex-col overflow-hidden bg-[#232323]">
            <TransformWrapper centerOnInit initialScale={1} minScale={1} maxScale={3}>
              {({ zoomIn, zoomOut }: { zoomIn: () => void; zoomOut: () => void }) => (
                <div className="relative h-full">
                  {/* 縮放按鈕 - 固定位置，不會跟著縮放 */}
                  <div className="absolute top-3 right-0 left-0 z-20 flex justify-between px-3">
                    {/* 放大按鈕 */}
                    <button
                      type="button"
                      onClick={() => zoomIn()}
                      className="flex h-10 w-10 items-center justify-center rounded-sm bg-[rgba(170,170,170,0.4)]"
                      aria-label="放大"
                    >
                      <Maximize2 className="h-6 w-6 text-white" />
                    </button>

                    {/* 縮小按鈕 */}
                    <button
                      type="button"
                      onClick={() => zoomOut()}
                      className="flex h-10 w-10 items-center justify-center rounded-sm bg-[rgba(170,170,170,0.4)]"
                      aria-label="縮小"
                    >
                      <Minimize2 className="h-6 w-6 text-[#D9D9D9]" />
                    </button>
                  </div>


                  <TransformComponent
                    wrapperClass="!w-full !h-full"
                    contentClass="!w-max"
                    contentStyle={{ width: "max-content", minHeight: "100%" }}
                  >
                    {/* 座位地圖 - 可拖曳 */}
                    <div className="relative min-h-full min-w-[628px] space-y-3 pt-[110px]">
                      {/* 螢幕指示器 */}
                      <div className="pointer-events-none absolute top-0 left-0 right-0 z-30 flex justify-center pt-[12px]">
                        {/* 螢幕橫槓 */}
                        <div className="h-2 w-[180px] rounded-lg bg-white" />
                      </div>
                      
                      {/* 投影光效 */}
                      <div
                        className="pointer-events-none absolute top-[20px] left-1/2 z-20 h-[194px] w-[628px] -translate-x-1/2"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)",
                          clipPath: "polygon(36% 0%, 64% 0%, 100% 100%, 0% 100%)",
                          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                        }}
                      />
                      {ROW_LABELS_CUSTOM.map((row, rowIndex) => {
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

                            <div className="relative z-3 flex items-center justify-center gap-2">
                              {rowSeats.map((seat) => {
                                const status = getSeatStatus(seat)
                                // 檢查是否需要在這個座位後插入垂直走道
                                const shouldAddVerticalAisle = verticalAisles.includes(seat.column)

                                // 如果是走道位置，渲染空白佔位符
                                if (seat.type === "Aisle") {
                                  return (
                                    <div 
                                      key={`${seat.row}-${seat.column}`} 
                                      className="h-[19px] w-6"
                                    />
                                  )
                                }

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
                  </TransformComponent>
                </div>
              )}
            </TransformWrapper>
          </div>
        </section>

        {/* 座位選擇框 */}
        <div className="mt-3 px-4">
          {/* 第一行：座位標題和剩餘待選數量 */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">座位</span>
            {selectedSeats.filter((s: SelectedSeat) => s === null).length > 0 && (
              <span className="text-sm text-white">
                尚有 {selectedSeats.filter((s: SelectedSeat) => s === null).length} 個待選座位
              </span>
            )}
          </div>

          {/* 第二行：座位按鈕區域 */}
          <div className="mt-2 flex flex-wrap items-center justify-start gap-3">
            {selectedSeats.map((seat: SelectedSeat, index: number) => (
              <SeatBadge
                key={seat ? `${seat.row}-${seat.column}` : `empty-${index}`}
                seat={seat}
                onRemove={() => handleRemoveSeat(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 底部總金額和確認按鈕 */}
      <footer className="mt-[108px]">
        <BookingActionBar
          totalPrice={currentTotalPrice}
          onBooking={handleConfirm}
          isDisabled={selectedSeats.some((s: SelectedSeat) => s === null) || isSubmitting}
          buttonIcon={isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <Ticket className="h-6 w-6" />}
          buttonText={isSubmitting ? "建立訂單中..." : "確認票卷"}
        />
      </footer>
    </div>
  )
}

export default SeatSelection
