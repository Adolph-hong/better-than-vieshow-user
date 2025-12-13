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
    <div className={`rounded-[10px] bg-[#222222] p-3 ${className}`}>
      {title && <h1 className="mb-3 text-2xl font-bold text-white">{title}</h1>}
      <div className="grid grid-cols-2 gap-y-3">
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-[#A5A5A5]">日期</span>
          <span className="text-[15px] font-medium text-white">{date}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-[#A5A5A5]">時間</span>
          <span className="text-[15px] font-medium text-white">{time}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-[#A5A5A5]">影廳</span>
          <span className="text-[15px] font-medium text-white">{theater}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-[#A5A5A5]">類型</span>
          <span className="text-[15px] font-medium text-white">{type}</span>
        </div>
      </div>

      {seats && (
        <div className="mt-3 flex flex-col">
          <span className="text-[13px] font-bold text-[#A5A5A5]">座位</span>
          <span className="text-[15px] font-medium text-white">{seats}</span>
        </div>
      )}
    </div>
  )
}

export default OrderInfoCard
