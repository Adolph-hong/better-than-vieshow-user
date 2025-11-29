type DateOptionButtonProps = {
  date: string
  dayOfWeek: string
  isSelected?: boolean
  onClick?: () => void
}

const DateOptionButton = ({
  date,
  dayOfWeek,
  isSelected = false,
  onClick,
}: DateOptionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Select date ${date} ${dayOfWeek}`}
      className={`flex h-[64px] w-[64px] cursor-pointer flex-col items-center justify-center rounded-2xl transition-colors duration-200 ${isSelected ? "bg-[#D9D9D9] text-black" : "bg-[#464646] text-white"} `}
    >
      <div className="flex flex-col gap-1">
        <span className="font-normal">{date}</span>
        <span className="font-normal">({dayOfWeek})</span>
      </div>
    </button>
  )
}

export default DateOptionButton
