type OrderSummaryCardProps = {
  totalPrice: number
  paymentMethod: string
  orderId: string
  className?: string
}

const OrderSummaryCard = ({
  totalPrice,
  paymentMethod,
  orderId,
  className = "",
}: OrderSummaryCardProps) => {
  return (
    <div
      className={`w-full justify-between space-y-3 rounded-[10px] bg-[#222222] px-3 py-4 ${className}`}
    >
      <div className="flex justify-between">
        <p className="text-[#A5A5A5]">總金額</p>
        <p>${totalPrice}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-[#A5A5A5]">付款方式</p>
        <p>{paymentMethod}</p>
      </div>

      <div className="flex justify-between">
        <p className="text-[#A5A5A5]">訂單編號</p>
        <p>{orderId}</p>
      </div>
    </div>
  )
}

export default OrderSummaryCard

