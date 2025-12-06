import type { ReactNode } from "react"
import { Armchair } from "lucide-react"

type BookingActionBarProps = {
  totalPrice: number
  onBooking: () => void
  isDisabled?: boolean
  buttonIcon?: ReactNode
  buttonText?: string
}

const BookingActionBar = ({
  totalPrice,
  onBooking,
  isDisabled = false,
  buttonIcon = <Armchair />,
  buttonText = "挑選座位",
}: BookingActionBarProps) => {
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
          {buttonIcon}
          <span className="font-medium whitespace-nowrap">{buttonText}</span>
        </button>
      </div>
    </div>
  )
}

export default BookingActionBar
