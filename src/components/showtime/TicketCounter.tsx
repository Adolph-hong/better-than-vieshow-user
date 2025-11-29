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
      <h2 className="mb-[5px] text-[17px]">人數</h2>
      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={onDecrement}
          disabled={count <= minCount}
          className={`flex h-[36px] w-[36px] items-center justify-center rounded-full transition-colors duration-200 ${count <= minCount ? "cursor-not-allowed bg-[#424242] text-gray-500" : "cursor-pointer bg-[#830508] text-white active:bg-[#600000]"} `}
          aria-label="Decrease ticket count"
        >
          <Minus />
        </button>

        <span className="text-[40px] font-bold">{count}</span>

        <button
          type="button"
          onClick={onIncrement}
          disabled={count >= maxCount}
          className={`flex h-[36px] w-[36px] items-center justify-center rounded-full transition-colors duration-200 ${count >= maxCount ? "cursor-not-allowed bg-[#424242] text-gray-500" : "cursor-pointer bg-[#830508] text-white active:bg-[#550000]"} `}
          aria-label="Increase ticket count"
        >
          <Plus />
        </button>
      </div>
    </div>
  )
}

export default TicketCounter
