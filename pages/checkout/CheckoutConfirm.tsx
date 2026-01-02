import { useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ClockLoader } from "react-spinners"
import { confirmLinePay } from "@/services/paymentAPI"
import toast from "react-hot-toast"

const CheckoutConfirm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const transactionId = searchParams.get("transactionId")
  const urlOrderId = searchParams.get("orderId")
  const hasCalledApi = useRef(false)

  useEffect(() => {
    if (hasCalledApi.current) return
    hasCalledApi.current = true

    const confirmPayment = async () => {
      // 嘗試從 sessionStorage 取得正確的 orderId (數字)
      const savedState = sessionStorage.getItem("checkout_state")
      let effectiveOrderId: any = urlOrderId

      if (savedState) {
        try {
          const checkoutData = JSON.parse(savedState)
          if (checkoutData.orderId) {
            effectiveOrderId = checkoutData.orderId
          }
        } catch (e) {
          console.error("Failed to parse saved state", e)
        }
      }

      if (!transactionId || !effectiveOrderId) {
        toast.error("無效的付款資訊")
        navigate("/checkout")
        return
      }

      try {
        const response = await confirmLinePay({
          transactionId,
          orderId: effectiveOrderId,
        })
        console.log("Line Pay Confirm Response:", response)

        // 兼容結構內容：如果有 success 且為 true，或是回傳內容包含 transactionId (扁平結構)
        const isSuccess = response.success || (response as any).transactionId

        if (isSuccess) {
          // 從 sessionStorage 恢復場次與電影資訊
          const savedState = sessionStorage.getItem("checkout_state")
          if (savedState) {
            const checkoutData = JSON.parse(savedState)
            sessionStorage.removeItem("checkout_state")
            
            toast.success("付款成功！")
            navigate("/payment/success", { state: checkoutData })
          } else {
            // 如果沒找到 state，只好回首頁（通常不會發生）
            toast.success("付款成功！")
            navigate("/")
          }
        } else {
          toast.error(response.message || "付款失敗")
          // 顯示失敗原因後跳回結帳頁
          setTimeout(() => {
            navigate("/checkout", { state: JSON.parse(sessionStorage.getItem("checkout_state") || "null") })
          }, 3000)
        }
      } catch (err) {
        console.error("Confirm Payment Error:", err)
        toast.error("確認付款時發生錯誤")
        setTimeout(() => {
          navigate("/checkout", { state: JSON.parse(sessionStorage.getItem("checkout_state") || "null") })
        }, 3000)
      }
    }

    confirmPayment()
  }, [transactionId, urlOrderId, navigate])

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
