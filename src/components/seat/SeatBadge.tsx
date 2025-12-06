import DeleteIcon from "@/assets/icon/checkout-flow/delete.svg?react"

type SeatBadgeProps = {
  seat: { row: string; column: number } | null
  onRemove?: () => void
}

const SeatBadge = ({ seat, onRemove }: SeatBadgeProps) => {
  // 固定尺寸的外框
  const baseClasses = "flex h-[32px] w-[72px] rounded-full items-center justify-center"

  if (seat) {
    // 已選座位：顯示座位編號 + X 按鈕
    return (
      <div className={`${baseClasses} gap-2 bg-[#11968D]`}>
        <span className="text-sm font-medium text-white">
          {seat.row}
          {seat.column}
        </span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`取消選擇 ${seat.row}${seat.column}`}
          >
            <DeleteIcon className="h-[18px] w-[18px]" />
          </button>
        )}
      </div>
    )
  }

  // 待選座位：虛線框 + 待選文字
  return (
    <div className={`${baseClasses} border border-dashed border-[#11968D]`}>
      <span className="text-sm text-[#11968D]">待選</span>
    </div>
  )
}

export default SeatBadge
