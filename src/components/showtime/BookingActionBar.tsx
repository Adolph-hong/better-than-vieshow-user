import { Armchair } from "lucide-react"

type BookingActionBarProps = {
  totalPrice: number
  onBooking: () => void
  isDisabled?: boolean
}

const BookingActionBar = ({ totalPrice, onBooking, isDisabled = false }: BookingActionBarProps) => {
  return (
    <div className="fixed bottom-3 left-0 z-50 flex w-full justify-center px-[42.5px]">
      <div className="flex w-full items-center justify-between rounded-full bg-[#D9D9D9] py-[6px] pr-1.5 pl-[18px]">
        <div>
          <span className="text-sm text-black">總金額：${totalPrice} 元</span>
        </div>
        <button
          type="button"
          onClick={onBooking}
          disabled={isDisabled}
          className={`flex items-center gap-2 rounded-full py-2 pr-[18px] pl-3 text-base font-bold text-white transition-colors ${isDisabled ? "cursor-not-allowed bg-gray-500" : "cursor-pointer bg-[#8E0000] active:bg-[#600000]"} `}
        >
          <Armchair />
          <span className="whitespace-nowrap">挑選座位</span>
        </button>
      </div>
    </div>
  )
}

export default BookingActionBar
