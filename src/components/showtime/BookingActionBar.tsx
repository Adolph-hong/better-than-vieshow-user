import { Armchair } from "lucide-react"

type BookingActionBarProps = {
  totalPrice: number
  onBooking: () => void
  isDisabled?: boolean
}

const BookingActionBar = ({ totalPrice, onBooking, isDisabled = false }: BookingActionBarProps) => {
  return (
    <div className="w-full border-t border-[#CCCCCC] bg-black p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-white">總金額</span>
          <span className="text-lg font-semibold text-[#11968D]">NTD ${totalPrice}</span>
        </div>
        <button
          type="button"
          onClick={onBooking}
          disabled={isDisabled}
          className={`flex cursor-pointer items-center gap-2 rounded-xl py-[10px] pr-[64.5px] pl-[58.5px] font-bold text-white transition-colors ${
            isDisabled
              ? "cursor-not-allowed bg-gray-600"
              : "bg-[#11968D] hover:bg-[#0e7a73] active:bg-[#0b635d]"
          }`}
        >
          <Armchair />
          <span className="font-medium whitespace-nowrap">挑選座位</span>
        </button>
      </div>
    </div>
  )
}

export default BookingActionBar
