import { Plus, Minus } from "lucide-react"

type TicketCounterProps = {
  count: number
  onIncrement: () => void
  onDecrement: () => void
  maxCount?: number
  minCount?: number
}

const TicketCounter = ({
  count,
  onIncrement,
  onDecrement,
  maxCount = 6,
  minCount = 0,
}: TicketCounterProps) => {
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

        {count >= maxCount && <span className="-ml-4 text-white">最多選擇 {maxCount} 位</span>}
      </div>
    </div>
  )
}

export default TicketCounter
