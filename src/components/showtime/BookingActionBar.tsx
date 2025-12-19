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
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm">總金額</span>
          <span className="text-lg text-[#11968D]">NTD ${totalPrice}</span>
        </div>
        <button
          type="button"
          onClick={onBooking}
          disabled={isDisabled}
          className={`flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg py-2 text-white transition-colors ${
            isDisabled ? "cursor-not-allowed bg-[#0B635D] text-white/40" : "bg-[#11968D]"
          }`}
        >
          {buttonIcon}
          <span>{buttonText}</span>
        </button>
      </div>
    </div>
  )
}

export default BookingActionBar
