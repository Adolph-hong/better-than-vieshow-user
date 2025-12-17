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
      className={`flex h-[64px] w-[72px] cursor-pointer flex-col items-center justify-center rounded-2xl transition-colors duration-200 ${isSelected ? "bg-[#11968D] text-white" : "bg-[#333333] text-white"} `}
    >
      <div className="flex flex-col gap-1">
        <span>{date}</span>
        <span className="text-sm">週{dayOfWeek}</span>
      </div>
    </button>
  )
}

export default DateOptionButton
