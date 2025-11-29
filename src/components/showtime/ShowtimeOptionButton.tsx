type ShowtimeOptionButtonProps = {
  time: string
  isSelected?: boolean
  onClick?: () => void
}

const ShowtimeOptionButton = ({ time, isSelected = false, onClick }: ShowtimeOptionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[40px] w-[104px] cursor-pointer items-center justify-center rounded-2xl transition-colors duration-200 ${isSelected ? "bg-[#D9D9D9] text-black" : "bg-[#424242] text-white"} `}
    >
      {time}
    </button>
  )
}

export default ShowtimeOptionButton
