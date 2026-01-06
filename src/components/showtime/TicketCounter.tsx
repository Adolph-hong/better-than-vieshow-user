import { Plus, Minus } from "lucide-react"

type TicketCounterProps = {
  count: number
  onIncrement: () => void
  onDecrement: () => void
  maxCount?: number
  minCount?: number
  availableSeats?: number
}

const TicketCounter = ({
  count,
  onIncrement,
  onDecrement,
  maxCount = 6,
  minCount = 0,
  availableSeats,
}: TicketCounterProps) => {
  // 判斷是否顯示剩餘座位提示（剩餘座位 < 6 且已達最大值時顯示）
  const showAvailableSeatsHint = availableSeats !== undefined && availableSeats < 6 && count >= maxCount
  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">人數</h2>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onDecrement}
          disabled={count <= minCount}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-colors duration-200 ${count <= minCount ? "cursor-not-allowed bg-[#232323]" : "cursor-pointer bg-[#11968D] text-white"} `}
          aria-label="Decrease ticket count"
        >
          <Minus />
        </button>

        <span className="w-[50px] text-center text-[40px] font-semibold">{count}</span>

        <button
          type="button"
          onClick={onIncrement}
          disabled={count >= maxCount}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-colors duration-200 ${count >= maxCount ? "cursor-not-allowed bg-[#232323]" : "cursor-pointer bg-[#11968D]"} `}
          aria-label="Increase ticket count"
        >
          <Plus />
        </button>

        {/* 提示訊息：優先顯示剩餘座位提示 */}
        {showAvailableSeatsHint ? (
          <span className="text-white">該場次剩餘 {availableSeats} 位</span>
        ) : count >= maxCount ? (
          <span className="text-white">最多選擇 {maxCount} 位</span>
        ) : null}
      </div>
    </div>
  )
}

export default TicketCounter
