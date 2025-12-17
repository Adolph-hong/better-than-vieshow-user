type OrderInfoCardProps = {
  title?: string
  date: string
  time: string
  theater: string
  type: string
  seats?: string
  className?: string
}

const OrderInfoCard = ({
  title,
  date,
  time,
  theater,
  type,
  seats,
  className = "",
}: OrderInfoCardProps) => {
  return (
    <div className={`rounded-[10px] bg-[#232323] p-3 ${className}`}>
      {title && <h1 className="mb-3 text-2xl font-semibold text-white">{title}</h1>}
      <div className="grid grid-cols-2 gap-y-3">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#777777]">日期</span>
          <span>{date}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#777777]">時間</span>
          <span>{time}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#777777]">影廳</span>
          <span>{theater}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#777777]">類型</span>
          <span>{type}</span>
        </div>
      </div>

      {seats && (
        <div className="mt-3 flex flex-col">
          <span className="text-sm font-bold text-[#777777]">座位</span>
          <span>{seats}</span>
        </div>
      )}
    </div>
  )
}

export default OrderInfoCard
