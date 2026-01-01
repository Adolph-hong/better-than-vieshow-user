import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { ClockLoader } from "react-spinners"

const CheckoutConfirm = () => {
  const [searchParams] = useSearchParams()
  const transactionId = searchParams.get("transactionId")
  const orderId = searchParams.get("orderId")

  useEffect(() => {
    // 這裡之後會用來呼叫 Line Pay Confirm API
    console.log("正在確認訂單:", { transactionId, orderId })
  }, [transactionId, orderId])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center gap-6">
        <ClockLoader color="#11968D" size={60} />
        <p className="text-lg font-medium">正在確認付款狀態…</p>
      </div>
    </div>
  )
}

export default CheckoutConfirm
